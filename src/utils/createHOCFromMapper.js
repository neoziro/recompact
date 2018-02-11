/* eslint-disable no-console */
import { Component } from 'react'
import createBehaviorSubject from './createBehaviorSubject'
import createSymbol from './createSymbol'
import asyncThrow from './asyncThrow'
import createEagerFactory from '../createEagerFactory'
import { getConfig } from '../setConfig'
import { config as obsConfig } from '../setObservableConfig'

const MAPPERS_INFO = createSymbol('mappersInfo')
export { MAPPERS_INFO as mappersInfoSymbol }
const observablePropType = () => {}

const createComponentFromMappers = (mappers, childFactory) => {
  const { observablesKey: OBSERVABLES } = getConfig()
  const CONTEXT_TYPES = { [OBSERVABLES]: observablePropType }

  return class extends Component {
    static [MAPPERS_INFO] = { mappers, childFactory }
    static contextTypes = CONTEXT_TYPES
    static childContextTypes = CONTEXT_TYPES

    props$ = createBehaviorSubject(this.props)

    componentWillMount() {
      let childProps$ = this.props$
      let childObservables = this.context[OBSERVABLES]
      for (let i = 0; i < mappers.length; i += 1) {
        ;[childProps$, childObservables] = mappers[i](
          childProps$,
          childObservables,
        )
      }

      this.childPropsSubscription = obsConfig
        .toESObservable(childProps$)
        .subscribe({
          next: childProps => {
            this.setState({ childProps })
          },
          error: error => {
            asyncThrow(error)
            this.setState({
              childProps: this.state ? this.state.childProps : {},
            })
          },
        })

      this.childContext = { [OBSERVABLES]: childObservables }
    }

    getChildContext() {
      return this.childContext
    }

    componentWillReceiveProps(nextProps) {
      this.props$.next(nextProps)
    }

    componentWillUnmount() {
      this.childPropsSubscription.unsubscribe()
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        nextState &&
        (!this.state || this.state.childProps !== nextState.childProps)
      )
    }

    render() {
      if (!this.state) {
        return null
      }

      return this.constructor[MAPPERS_INFO].childFactory(this.state.childProps)
    }
  }
}

export const isMapperComponent = BaseComponent =>
  typeof BaseComponent === 'function' && BaseComponent[MAPPERS_INFO]

export default mapper => BaseComponent => {
  if (isMapperComponent(BaseComponent)) {
    return createComponentFromMappers(
      [mapper, ...BaseComponent[MAPPERS_INFO].mappers],
      BaseComponent[MAPPERS_INFO].childFactory,
    )
  }

  return createComponentFromMappers([mapper], createEagerFactory(BaseComponent))
}
