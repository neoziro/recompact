import React from 'react'
import ReactDOM from 'react-dom'
import RecompactCounter from './RecompactCounter'
import RecomposeCounter from './RecomposeCounter'

const main = document.createElement('div')
document.body.appendChild(main)

ReactDOM.render(
  <div>
    <RecompactCounter />
    <RecomposeCounter />
  </div>,
  main,
)
