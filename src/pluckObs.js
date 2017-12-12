import createHelper from './createHelper'
import connectObs from './connectObs'

/**
 * Takes a list of observable names, find the corresponding observables
 * from the context and map them to the corresponding prop according the
 * convention i.e.: same name without a $ at the end.
 *
 * @static
 * @category Higher-order-components
 * @param {Function} observablesNames
 * @returns {HigherOrderComponent} A function that takes a component and returns a new component.
 */
const pluckObs = (...observableNames) =>
  connectObs(observables =>
    Object.assign(
      ...observableNames.map(observableName => ({
        [observableName.replace(/\$$/, '')]: observables[observableName],
      })),
    ),
  )

export default createHelper(pluckObs, 'pluckObs')
