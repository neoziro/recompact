import React from 'react'
import { mount } from 'enzyme'
import { branch, compose, identity, withProps, withState } from '../'

describe('branch', () => {
  it('should test props and applies one of two HoCs, for true and false', () => {
    const SayMyName = compose(
      withState('isBad', 'updateIsBad', false),
      branch(
        props => props.isBad,
        withProps({ name: 'Heisenberg' }),
        withProps({ name: 'Walter' }),
      ),
    )(({ isBad, name, updateIsBad }) => (
      <div>
        <div className="isBad">{isBad ? 'true' : 'false'}</div>
        <div className="name">{name}</div>
        <button onClick={() => updateIsBad(b => !b)}>Toggle</button>
      </div>
    ))

    const wrapper = mount(<SayMyName />)
    const getIsBad = () => wrapper.find('.isBad').text()
    const getName = () => wrapper.find('.name').text()
    const toggle = wrapper.find('button')

    expect(getIsBad()).toBe('false')
    expect(getName()).toBe('Walter')

    toggle.simulate('click')

    expect(getIsBad()).toBe('true')
    expect(getName()).toBe('Heisenberg')
  })

  it('should be possible to stop the chain', () => {
    const Nothing = compose(
      branch(({ foo }) => !foo, () => () => null, identity),
      withProps({ foo: 'bar' }),
    )('div')

    const wrapper = mount(<Nothing />)
    expect(wrapper.find('div').exists()).toBeFalsy()
  })
})
