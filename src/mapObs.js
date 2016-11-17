/* eslint-disable no-console */
import {Component, PropTypes} from 'react';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import createEagerFactory from 'recompose/createEagerFactory';
import createHelper from './createHelper';
import createSymbol from './utils/createSymbol';

const throwError = (error) => {
  throw error;
};

const MAPPERS_INFO = createSymbol('mappersInfo');
const OBSERVABLES = createSymbol('observables');

const createComponentFromMappers = (mappers, childFactory) =>
  class extends Component {
    static [MAPPERS_INFO] = {mappers, childFactory};
    static contextTypes = {[OBSERVABLES]: PropTypes.object};
    static childContextTypes = {[OBSERVABLES]: PropTypes.object};

    props$ = new BehaviorSubject(this.props);

    getChildContext() {
      return this.childContext;
    }

    componentWillMount() {
      const {
        props$: childProps$,
        ...childObservables
      } = mappers.reduce(
        (observables, mapper) => ({
          props$: this.props$,
          ...mapper(observables),
        }),
        {
          ...this.context[OBSERVABLES],
          props$: this.props$,
        },
      );

      this.subscription = childProps$.subscribe({
        next: childProps => this.setState({childProps}),
        error: throwError,
      });

      this.childContext = {[OBSERVABLES]: childObservables};
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps);
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.state
        && this.state.childProps !== nextState.childProps;
    }

    render() {
      if (!this.state) {
        return null;
      }

      return this.constructor[MAPPERS_INFO].childFactory(this.state.childProps);
    }
  };

export default createHelper(mapper => (BaseComponent) => {
  if (BaseComponent[MAPPERS_INFO]) {
    return createComponentFromMappers(
      [mapper, ...BaseComponent[MAPPERS_INFO].mappers],
      BaseComponent[MAPPERS_INFO].childFactory,
    );
  }

  return createComponentFromMappers(
    [mapper],
    createEagerFactory(BaseComponent),
  );
}, 'mapObs');
