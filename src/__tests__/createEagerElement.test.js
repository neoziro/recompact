/* eslint-disable react/prop-types */
import React from 'react'
import { createEagerElement } from '../'

describe('createEagerElement', () => {
  it('should create an element', () => {
    const Component = ({ children, className }) => (
      <div className={className}>{children}</div>
    )
    Component.defaultProps = { className: 'foo' }
    const element = createEagerElement(Component, { className: 'bar' }, 'hello')
    expect(element.type).toBe(Component)
    expect(element.props.className).toBe('bar')
    expect(element.props.children).toBe('hello')
  })

  it('should just call function if possible', () => {
    const Component = ({ children, className }) => (
      <div className={className}>{children}</div>
    )
    const element = createEagerElement(Component, { className: 'bar' }, 'hello')
    expect(element.type).toBe('div')
    expect(element.props.className).toBe('bar')
    expect(element.props.children).toBe('hello')
  })
})
