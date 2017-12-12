import React from 'react'
import {
  setDisplayName,
  compose,
  pure,
  withState,
  renameProp,
  withHandlers,
} from '../src'

export default compose(
  setDisplayName('RecompactCounter'),
  pure,
  withState('value', 'onChange', 1),
  renameProp('value', 'count'),
  withHandlers({
    onIncrement: ({ count, onChange }) => () => onChange(count + 1),
  }),
)(({ onIncrement, count }) => <button onClick={onIncrement}>{count}</button>)
