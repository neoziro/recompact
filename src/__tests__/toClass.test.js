import PropTypes from 'prop-types'
/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, no-class-assign */
import React from 'react'
import { mount } from 'enzyme'
import { Dummy } from './utils'
import { compose, toClass, withContext } from '../'

test('toClass returns the base component if it is already a class', () => {
  class BaseComponent extends React.Component {
    render() {
      return <div />
    }
  }

  const TestComponent = toClass(BaseComponent)
  expect(TestComponent).toBe(BaseComponent)
})

test('toClass copies propTypes, displayName, contextTypes and defaultProps from base component', () => {
  const StatelessComponent = props => <div {...props} />

  StatelessComponent.displayName = 'Stateless'
  StatelessComponent.propTypes = { foo: PropTypes.string }
  StatelessComponent.contextTypes = { bar: PropTypes.object }
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' }

  const TestComponent = toClass(StatelessComponent)

  expect(TestComponent.displayName).toBe('Stateless')
  expect(TestComponent.propTypes).toEqual({ foo: PropTypes.string })
  expect(TestComponent.contextTypes).toEqual({ bar: PropTypes.object })
  expect(TestComponent.defaultProps).toEqual({ foo: 'bar', fizz: 'buzz' })
})

test('toClass passes defaultProps correctly', () => {
  const StatelessComponent = props => <Dummy {...props} />

  StatelessComponent.displayName = 'Stateless'
  StatelessComponent.propTypes = { foo: PropTypes.string }
  StatelessComponent.contextTypes = { bar: PropTypes.object }
  StatelessComponent.defaultProps = { foo: 'bar', fizz: 'buzz' }

  const TestComponent = toClass(StatelessComponent)

  const dummy = mount(<TestComponent />).find(Dummy)
  expect(dummy.prop('foo')).toBe('bar')
  expect(dummy.prop('fizz')).toBe('buzz')
})

test('toClass passes context and props correctly', () => {
  const store = {}

  class Provider extends React.Component {
    static propTypes = {
      children: PropTypes.node,
    }

    render() {
      return this.props.children
    }
  }

  Provider = compose(
    withContext({ store: PropTypes.object }, props => ({ store: props.store })),
  )(Provider)

  const StatelessComponent = (props, context) => (
    <Dummy props={props} context={context} />
  )

  StatelessComponent.contextTypes = { store: PropTypes.object }

  const TestComponent = toClass(StatelessComponent)

  const dummy = mount(
    <Provider store={store}>
      <TestComponent fizz="fizzbuzz" />
    </Provider>,
  ).find(Dummy)

  expect(dummy.prop('props').fizz).toBe('fizzbuzz')
  expect(dummy.prop('context').store).toBe(store)
})

test('toClass works with strings (DOM components)', () => {
  const Component = toClass('h3')
  const element = mount(<Component>Hello</Component>)
  expect(element.text()).toBe('Hello')
})
