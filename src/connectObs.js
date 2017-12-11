import createObservable from './utils/createObservable'
import asyncThrow from './utils/asyncThrow'
import createHelper from './createHelper'
import withObs from './withObs'
import { config as obsConfig } from './setObservableConfig'

const checkObsMap = obsMap => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof obsMap !== 'object') {
      throw new Error(
        'connectObs(): The observable mapper must return a plain object, got ' +
          `'${obsMap}' instead`,
      )
    }
  }
}

const checkObserver = (observer, name) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!observer || !observer.next) {
      throw new Error(
        `connectObs(): Expected '${name}' to be an Observer, got ` +
          `'${observer}' instead.`,
      )
    }
  }
}

const checkObservable = (observable, name) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!observable || !observable.subscribe) {
      throw new Error(
        `connectObs(): Expected '${name}' to be an Observable, got ` +
          `'${observable}' instead.`,
      )
    }
  }
}

/**
 * Connect observables to props using a map.
 *
 * - The function take one argument, an object containing context observables
 * and a special observable `props$` that emits owner props.
 * - The property is updated at each emission of a new value by the associated
 * Observable.
 * - Properties matching `/^on[A-Z]/` are mapped to the `next` method of
 * the associated Observer.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} obsMapper The function that takes observables and returns map.
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * connectObs(({change$, value$}) => ({
 *   onChange: change$,
 *   value: value$,
 * }))('input');
 */
const connectObs = obsMapper =>
  withObs(observables => {
    const nextProps$ = createObservable(observer => {
      const obsMap = obsMapper(observables)
      const obsProps = {}
      const obsSubscriptions = []
      let props

      checkObsMap(obsMap)

      const update = () => {
        if (props) {
          observer.next({
            ...props,
            ...obsProps,
          })
        }
      }

      Object.keys(obsMap).forEach(key => {
        if (key.match(/^on[A-Z]/)) {
          const observable = obsMap[key]
          checkObserver(observable, key)
          obsProps[key] = observable.next.bind(observable)
        } else {
          const observable = obsConfig.toESObservable(obsMap[key])
          checkObservable(observable, key)
          obsProps[key] = undefined
          const subscription = observable.subscribe({
            next(value) {
              obsProps[key] = value
              update()
            },
            error: asyncThrow,
          })

          obsSubscriptions.push(subscription)
        }
      })

      const propsSubscription = obsConfig
        .toESObservable(observables.props$)
        .subscribe({
          next(nextProps) {
            props = nextProps
            update()
          },
          error: asyncThrow,
        })

      return () => {
        propsSubscription.unsubscribe()
        obsSubscriptions.forEach(subscription => {
          subscription.unsubscribe()
        })
      }
    })

    return { props$: nextProps$ }
  })

export default createHelper(connectObs, 'connectObs')
