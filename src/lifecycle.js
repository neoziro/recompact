import { Component } from 'react'
import createEagerFactory from './createEagerFactory'
import createHelper from './createHelper'

const LIFECYCLE_METHODS = [
  'getDerivedStateFromProps',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'componentDidMount',
  'UNSAFE_componentWillReceiveProps',
  'componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'getSnapshotBeforeUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'componentDidCatch'
]

/**
 * A higher-order component that permits to hook a lifecycle method. Available methods are:
 * - componentWillMount
 * - componentDidMount
 * - componentWillReceiveProps
 * - shouldComponentUpdate
 * - componentWillUpdate
 * - componentDidUpdate
 * - componentWillUnmount
 * You should use this helper as an escape hatch, in
 * case you need to access component lifecycle methods.
 *
 * @static
 * @category Higher-order-components
 * @param {Object} spec Lifecycle spec
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 * @example
 *
 * // Create a hoc that will log when a component will mount
 * const logWhenMount = lifecycle({componentWillMount: () => console.log('will mount')});
 */
const lifecycle = spec => BaseComponent => {
  const factory = createEagerFactory(BaseComponent)

  if (
    process.env.NODE_ENV !== 'production' &&
    Object.prototype.hasOwnProperty.call(spec, 'render')
  ) {
    /* eslint-disable no-console */
    console.error(
      'lifecycle() does not support the render method; its behavior is to ' +
        'pass all props and state to the base component.',
    )
    /* eslint-enable no-console */
  }

  class Lifecycle extends Component {
    render() {
      return factory({
        ...this.props,
        ...this.state,
      })
    }
  }

  Object.entries(spec).forEach(([name, impl]) => {
    if (!LIFECYCLE_METHODS.includes(name)) {
      /* eslint-disable no-console */
      console.error(
        `lifecycle() does not support "${name}" method, only lifecycle methods are supported.`,
      )
      /* eslint-enable no-console */
    } else {
      Lifecycle.prototype[name] = impl
    }
  })

  return Lifecycle
}

export default createHelper(lifecycle, 'lifecycle')
