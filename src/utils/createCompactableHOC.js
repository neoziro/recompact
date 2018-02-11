/* eslint-disable no-param-reassign */

import { isMapperComponent as isCompacted } from './createHOCFromMapper'

const compactable = Symbol('compactable')
export { compactable as compactableSymbol }
const isCompactable = Component =>
  typeof Component === 'function' && Component[compactable]

export default (
  createCompactableComponent,
  createComponent,
) => BaseComponent => {
  if (isCompactable(BaseComponent)) {
    BaseComponent = BaseComponent[compactable]
  }

  const Component = createComponent(BaseComponent)
  Component[compactable] = createCompactableComponent(BaseComponent)

  if (isCompacted(BaseComponent)) {
    return Component[compactable]
  }

  return Component
}
