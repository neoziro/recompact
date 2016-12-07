import {Observable} from 'rxjs/Observable';
import createHOCFromMapper, {isMapperComponent} from './createHOCFromMapper';
import createEagerFactory from '../createEagerFactory';
import createSymbol from './createSymbol';

const STATELESS_MAPPERS_INFO = createSymbol('statelessMappersInfo');

const createComponentFromStatelessMappers = (statelessMappers, childFactory) => {
  const Component = props =>
    childFactory(
      statelessMappers.reduce(
        (nextProps, mapper) => mapper(nextProps),
        props,
      ),
    );

  Component[STATELESS_MAPPERS_INFO] = {
    childFactory,
    statelessMappers,
  };

  return Component;
};

const createMapperFromStatelessMapper = statelessMapper =>
  (props$, obs) => [
    new Observable((observer) => {
      const subscription = props$.subscribe({
        next: props => observer.next(statelessMapper(props)),
        error: ::observer.error,
        complete: ::observer.complete,
      });

      return ::subscription.unsubscribe;
    }),
    obs,
  ];

export const isStatelessMapperComponent = BaseComponent =>
  typeof BaseComponent === 'function' && STATELESS_MAPPERS_INFO in BaseComponent;

export default statelessMapper => (BaseComponent) => {
  if (isMapperComponent(BaseComponent)) {
    const mapper = createMapperFromStatelessMapper(statelessMapper);

    // TODO: use createComponentFromMappers instead?
    return createHOCFromMapper(mapper)(BaseComponent);
  }

  if (isStatelessMapperComponent(BaseComponent)) {
    return createComponentFromStatelessMappers(
      [statelessMapper, ...BaseComponent[STATELESS_MAPPERS_INFO].statelessMappers],
      BaseComponent[STATELESS_MAPPERS_INFO].childFactory,
    );
  }

  return createComponentFromStatelessMappers(
    [statelessMapper],
    createEagerFactory(BaseComponent),
  );
};
