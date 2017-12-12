import React from 'react'
import { mount, shallow } from 'enzyme'
import { Dummy } from './utils'
import { withHandlers } from '../'

describe('withHandlers', () => {
  it('passes immutable handlers', () => {
    const enhance = withHandlers({
      handler: () => () => null,
    })
    const EnhancedDummy = enhance(Dummy)
    expect(EnhancedDummy.displayName).toBe('withHandlers(Dummy)')

    const wrapper = shallow(<EnhancedDummy />)
    const handler = wrapper.prop('handler')

    wrapper.setProps({ foo: 'bar' })
    expect(wrapper.prop('foo')).toBe('bar')
    expect(wrapper.prop('handler')).toBe(handler)
  })

  it('caches handlers properly', () => {
    const handlerCreationSpy = jest.fn()
    const handlerCallSpy = jest.fn()

    const enhance = withHandlers({
      handler: props => {
        handlerCreationSpy(props)
        return val => {
          handlerCallSpy(val)
        }
      },
    })
    const EnhancedDummy = enhance(Dummy)

    const wrapper = shallow(<EnhancedDummy foo="bar" />)
    const handler = wrapper.prop('handler')

    // Don't create handler until it is called.
    expect(handlerCreationSpy).toHaveBeenCalledTimes(0)
    expect(handlerCallSpy).toHaveBeenCalledTimes(0)

    handler(1)
    expect(handlerCreationSpy).toHaveBeenCalledTimes(1)
    expect(handlerCreationSpy).toHaveBeenCalledWith({ foo: 'bar' })
    expect(handlerCallSpy).toHaveBeenCalledTimes(1)
    expect(handlerCallSpy).toHaveBeenCalledWith(1)

    // Props haven't changed; should use cached handler.
    handler(2)
    expect(handlerCreationSpy).toHaveBeenCalledTimes(1)
    expect(handlerCallSpy).toHaveBeenCalledTimes(2)
    expect(handlerCallSpy.mock.calls[1]).toEqual([2])

    wrapper.setProps({ foo: 'baz' })
    handler(3)

    // Props did change; handler should be recreated.
    expect(handlerCreationSpy).toHaveBeenCalledTimes(2)
    expect(handlerCreationSpy.mock.calls[1]).toEqual([{ foo: 'baz' }])
    expect(handlerCallSpy).toHaveBeenCalledTimes(3)
    expect(handlerCallSpy.mock.calls[2]).toEqual([3])
  })

  it('throws if handler is not a higher-order function', () => {
    /* eslint-disable no-console */
    const originalError = console.error
    console.error = jest.fn()

    const EnhancedDummy = withHandlers({
      foo: () => {},
    })(Dummy)

    const wrapper = shallow(<EnhancedDummy />)
    expect(() => wrapper.prop('foo').call()).toThrowError()

    expect(console.error).toBeCalledWith(
      // eslint-disable-line no-console
      'withHandlers(): Expected a map of higher-order functions. ' +
        'Refer to the docs for more info.',
    )

    console.error = originalError
    /* eslint-enable no-console */
  })

  it('allows handers to be a factory', () => {
    const enhance = withHandlers(initialProps => {
      let cache

      return {
        handler: () => () => {
          if (cache) {
            return cache
          }

          cache = { ...initialProps }

          return cache
        },
      }
    })

    const componentHandlers = []
    const componentHandlers2 = []

    const Component = enhance(({ handler }) => {
      componentHandlers.push(handler())
      return null
    })

    const Component2 = enhance(({ handler }) => {
      componentHandlers2.push(handler())
      return null
    })

    const wrapper = mount(<Component hello="foo" />)
    wrapper.setProps({ hello: 'bar' })
    expect(componentHandlers[0]).toBe(componentHandlers[1])

    // check that cache is not shared
    mount(<Component2 hello="foo" />)
    expect(componentHandlers[0]).toEqual(componentHandlers2[0])
    expect(componentHandlers[0]).not.toBe(componentHandlers2[0])
  })
})
