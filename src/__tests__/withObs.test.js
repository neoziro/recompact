import React from 'react'
import Rx from 'rxjs'
import { mount, shallow } from 'enzyme'
import { compose, setObservableConfig, withObs } from '../'
import rxjsObservableConfig from '../rxjsObservableConfig'

describe('withObs', () => {
  beforeEach(() => {
    setObservableConfig(rxjsObservableConfig)
  })

  afterEach(() => {
    setObservableConfig({
      toESObservable: undefined,
      fromESObservable: undefined,
    })
  })

  it('should merge observables and map props$', () => {
    const baseFoo$ = Rx.Observable.of('foo')
    const Component = compose(
      withObs(() => ({ foo$: baseFoo$ })),
      withObs(() => ({})),
      withObs(({ props$, foo$ }) => ({
        props$: props$.combineLatest(foo$, (_, foo) => ({ className: foo })),
      })),
    )('div')

    const wrapper = mount(<Component />)
    expect(wrapper.find('div').prop('className')).toBe('foo')
  })

  it('should be possible to provide some symbols', () => {
    const FOO$ = Symbol('foo$')
    const baseFoo$ = Rx.Observable.of('foo')
    const Component = compose(
      withObs(() => ({ [FOO$]: baseFoo$ })),
      withObs(() => ({})),
      withObs(({ props$, [FOO$]: foo$ }) => ({
        props$: props$.combineLatest(foo$, (_, foo) => ({ className: foo })),
      })),
    )('div')

    const wrapper = mount(<Component />)
    expect(wrapper.find('div').prop('className')).toBe('foo')
  })

  it('should share props$', () => {
    let count = 0

    const Component = compose(
      withObs(() => ({
        props$: Rx.Observable.create((observer) => {
          count += 1
          observer.next({})
        }),
      })),
      withObs(({ props$ }) => {
        props$.subscribe()
        props$.subscribe()
        return { props$ }
      }),
    )('div')

    mount(<Component />)
    expect(count).toBe(1)
  })

  it('should complete props$ when unmounted', () => {
    const spy = jest.fn()
    const Component = compose(
      withObs(({ props$ }) => ({
        props$: props$.last().do(spy),
      })),
    )('div')

    const wrapper = mount(<Component />)
    expect(spy).not.toHaveBeenCalled()
    wrapper.unmount()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should be merged with other hoc', () => {
    const Component = compose(
      withObs(() => ({})),
      withObs(() => ({})),
      withObs(() => ({})),
    )('div')

    const wrapper = shallow(<Component />)
    expect(wrapper.instance().constructor.displayName).toBe('withObs(withObs(withObs(div)))')
    expect(wrapper.equals(<div />)).toBeTruthy()
  })
})
