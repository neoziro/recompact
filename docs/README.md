# <a href="https://github.com/neoziro/recompact/">recompact</a> <span>v3.3.0</span>

<!-- div class="toc-container" -->

<!-- div -->

## `Config`
* <a href="#setconfigoptions">`setConfig`</a>

<!-- /div -->

<!-- div -->

## `Higher-order-components`
* <a href="#branchtest-left-rightidentity">`branch`</a>
* <a href="#connectobsobsmapper">`connectObs`</a>
* <a href="#debuglabel-selector">`debug`</a>
* <a href="#defaultpropsdefaultprops">`defaultProps`</a>
* <a href="#flattenpropspaths" class="alias">`flattenProp` -> `flattenProps`</a>
* <a href="#flattenproppropname">`flattenProp`</a>
* <a href="#flattenpropspaths">`flattenProps`</a>
* <a href="#getcontextcontexttypes">`getContext`</a>
* <a href="#lifecyclespec">`lifecycle`</a>
* <a href="#mappropspropsmapper">`mapProps`</a>
* <a href="#mappropsstreampropsstreammapper">`mapPropsStream`</a>
* <a href="#nestcomponents">`nest`</a>
* <a href="#omitpropspaths">`omitProps`</a>
* <a href="#onlyupdateforkeyspropkeys">`onlyUpdateForKeys`</a>
* <a href="#onlyupdateforproptypes">`onlyUpdateForPropTypes`</a>
* <a href="#pickpropspaths">`pickProps`</a>
* <a href="#pluckobsobservablesnames">`pluckObs`</a>
* <a href="#pure">`pure`</a>
* <a href="#renamepropoldname-newname">`renameProp`</a>
* <a href="#renamepropsnamemap">`renameProps`</a>
* <a href="#rendercomponentcomponent">`renderComponent`</a>
* <a href="#rendernothing">`renderNothing`</a>
* <a href="#setdisplaynamedisplayname">`setDisplayName`</a>
* <a href="#setproptypesproptypes">`setPropTypes`</a>
* <a href="#setstatickey-value">`setStatic`</a>
* <a href="#shouldupdatetest">`shouldUpdate`</a>
* <a href="#toclass">`toClass`</a>
* <a href="#withcontextchildcontexttypes-getchildcontext">`withContext`</a>
* <a href="#withhandlershandlerfactories">`withHandlers`</a>
* <a href="#withobsobsmapper">`withObs`</a>
* <a href="#withpropspropsmapper">`withProps`</a>
* <a href="#withpropsonchangeshouldmaporkeys-createprops">`withPropsOnChange`</a>
* <a href="#withreducerstatename-dispatchname-reducer-initialstate">`withReducer`</a>
* <a href="#withstatestatename-stateupdatername-initialstate">`withState`</a>
* <a href="#withstatehandlersinitialstate-stateupdaters">`withStateHandlers`</a>
* <a href="#wrapdisplaynamecomponent-wrappername">`wrapDisplayName`</a>

<!-- /div -->

<!-- div -->

## `Utilities`
* <a href="#componentfrompropprop">`componentFromProp`</a>
* <a href="#composefuncs">`compose`</a>
* <a href="#createeagerelementtype-props-children">`createEagerElement`</a>
* <a href="#createeagerfactorytype">`createEagerFactory`</a>
* <a href="#createeventhandler">`createEventHandler`</a>
* <a href="#createhelperhoc-helpername-noargsfalse">`createHelper`</a>
* <a href="#createsinkcallback">`createSink`</a>
* <a href="#getdisplaynamecomponent">`getDisplayName`</a>
* <a href="#hoiststaticshoc">`hoistStatics`</a>
* <a href="#identityvalue">`identity`</a>
* <a href="#isclasscomponentvalue">`isClassComponent`</a>
* <a href="#isreferentiallytransparentfunctioncomponentvalue">`isReferentiallyTransparentFunctionComponent`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Config” Methods`

<!-- div -->

<h3 id="setconfigoptions"><code>setConfig(options)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/setConfig.js#L15)

Set the config of Recompact.

#### Arguments
1. `options` *(Object)*:

#### Example
```js
setConfig({observablesKey: 'observables'});
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Higher-order-components” Methods`

<!-- div -->

<h3 id="branchtest-left-rightidentity"><code>branch(test, left, [right=identity])</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/branch.js#L24)

Accepts a test function and two higher-order components. The test function
is passed the props from the owner. If it returns true, the left higher-order
component is applied to BaseComponent; otherwise, the right higher-order
component is applied *(defaults to identity)*.

#### Arguments
1. `test` *(Function)*: The test to apply.
2. `left` *(HigherOrderComponent)*: The higher-order component applied if the result of the test is true.
3. `[right=identity]` *(HigherOrderComponent)*: The higher-order component applied if the result of the test is false.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Add the logic or rendering nothing if the prop `count` equals to `0`.
branch(({count}) => count === 0, renderNothing)(MyComponent);
```
---

<!-- /div -->

<!-- div -->

<h3 id="connectobsobsmapper"><code>connectObs(obsMapper)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/connectObs.js#L61)

Connect observables to props using a map.
* The function take one argument, an object containing context observables
and a special observable `props$` that emits owner props.
* The property is updated at each emission of a new value by the associated
Observable.
* Properties matching `/^on[A-Z]/` are mapped to the `next` method of
the associated Observer.

#### Arguments
1. `obsMapper` *(Function)*: The function that takes observables and returns map.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
connectObs(({change$, value$}) => ({
  onChange: change$,
  value: value$,
}))('input');
```
---

<!-- /div -->

<!-- div -->

<h3 id="debuglabel-selector"><code>debug(label, selector)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/debug.js#L23)

Display the flow of props.
Very useful for debugging higher-order component stack.

#### Arguments
1. `label` *(&#42;)*: A label displayed in console.
2. `selector` *(Function)*: A props selector.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
recompact.compose(
  recompact.withProps({ foo: 'bar' }),
  recompact.debug(),
  recompact.renameProp('foo', 'className'),
  recompact.debug(),
)('input')
```
---

<!-- /div -->

<!-- div -->

<h3 id="defaultpropsdefaultprops"><code>defaultProps(defaultProps)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/defaultProps.js#L19)

Specify props values that will be used if the prop is `undefined`.

#### Arguments
1. `defaultProps` *(Object)*: Default props.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Button = defaultProps({type: 'button'})('button');
<Button /> // will render <button type="button" />
```
---

<!-- /div -->

<!-- div -->

<h3 id="flattenproppropname"><code>flattenProp(propName)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/flattenProp.js#L18)

Flattens a prop so that its fields are spread out into the props object.

#### Arguments
1. `propName` *(String)*: Name of the prop to flatten.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Button = flattenProp('props')('button');
<Button props={{type: 'submit'}} /> // will render <button type="submit" />
```
---

<!-- /div -->

<!-- div -->

<h3 id="flattenpropspaths"><code>flattenProps(paths)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/flattenProps.js#L18)

Flattens one or several props so that its fields are spread out into the props object.

#### Aliases
*flattenProp*

#### Arguments
1. `paths` *(String|String&#91;&#93;)*: The property paths to flatten.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Button = flattenProps(['a', 'b'])('button');
// Will render <button type="submit" className="btn" />
<Button a={{type: 'submit'}} b={{className: 'btn'}} />
```
---

<!-- /div -->

<!-- div -->

<h3 id="getcontextcontexttypes"><code>getContext(contextTypes)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/getContext.js#L19)

Gets values from context and passes them along as props.

#### Arguments
1. `contextTypes` *(Object)*: Context types to inject as props.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Create a component that will bring back to home when clicked
const HomeButton = compose(
  withContext({router: PropTypes.object.isRequired}),
  withHandlers({onClick: ({router}) => () => router.push('/')}),
)('button');
```
---

<!-- /div -->

<!-- div -->

<h3 id="lifecyclespec"><code>lifecycle(spec)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/lifecycle.js#L36)

A higher-order component that permits to hook a lifecycle method. Available methods are:<br>
* componentWillMount
* componentDidMount
* componentWillReceiveProps
* shouldComponentUpdate
* componentWillUpdate
* componentDidUpdate
* componentWillUnmount

You should use this helper as an escape hatch, in
case you need to access component lifecycle methods.

#### Arguments
1. `spec` *(Object)*: Lifecycle spec

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Create a hoc that will log when a component will mount
const logWhenMount = lifecycle({componentWillMount: () => console.log('will mount')});
```
---

<!-- /div -->

<!-- div -->

<h3 id="mappropspropsmapper"><code>mapProps(propsMapper)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/mapProps.js#L19)

Accepts a function that maps owner props to a new collection of props that
are passed to the base component.

#### Arguments
1. `propsMapper` *(Function)*: The function that returns new props.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Add a new prop computed from owner props
mapProps(({count}) => ({moreThanFive: count > 5}))(MyComponent);
```
---

<!-- /div -->

<!-- div -->

<h3 id="mappropsstreampropsstreammapper"><code>mapPropsStream(propsStreamMapper)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/mapPropsStream.js#L18)

Accepts a function that maps an observable stream of owner props to a stream
of child props, rather than directly to a stream of React nodes.
The child props are then passed to a base component.

#### Arguments
1. `propsStreamMapper` *(Function)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Delay rendering of 1s
const delayRendering = mapPropsStream(props$ => props$.delay(1000));
```
---

<!-- /div -->

<!-- div -->

<h3 id="nestcomponents"><code>nest(components)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/nest.js#L17)

Composes components by nesting each one inside the previous.

#### Arguments
1. `components` *(...(ReactClass|ReactFunctionalComponent))*:

#### Returns
*(ReactFunctionalComponent)*:

#### Example
```js
// Delay rendering of 1s
const DivButton = nest('div', 'button');
// will render <div className="foo"><button className="foo" /></div>
<DivButton className="foo" />
```
---

<!-- /div -->

<!-- div -->

<h3 id="omitpropspaths"><code>omitProps(paths)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/omitProps.js#L17)

Same as lodash `omit` but for props.

#### Arguments
1. `paths` *(String|String&#91;&#93;)*: The property paths to omit.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const withoutValue = omitProps('value');
```
---

<!-- /div -->

<!-- div -->

<h3 id="onlyupdateforkeyspropkeys"><code>onlyUpdateForKeys(propKeys)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/onlyUpdateForKeys.js#L24)

Prevents the component from updating unless a prop corresponding to one of the
given keys has updated. Uses `shallowEqual()` to test for changes.
This is a much better optimization than the popular approach of using PureRenderMixin,
`shouldPureComponentUpdate()`, or `pure()` helper, because those
tools compare *every* prop, whereas `onlyUpdateForKeys()` only cares about the
props that you specify.

#### Arguments
1. `propKeys` *(String&#91;&#93;)*: The property keys that will induce a re-render.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
onlyUpdateForKeys(['value'])
```
---

<!-- /div -->

<!-- div -->

<h3 id="onlyupdateforproptypes"><code>onlyUpdateForPropTypes()</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/onlyUpdateForPropTypes.js#L22)

Works like `onlyUpdateForKeys()`, but prop keys are inferred from the `propTypes`
of the base component. Useful in conjunction with `setPropTypes()`.
If the base component does not have any `propTypes`, the component will never
receive any updates. This probably isn't the expected behavior, so a warning
is printed to the console.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Button = ({className}) => <button className={className} />;
Button.propTypes = {className: PropTypes.string};
const EnhancedButton = onlyUpdateForPropTypes(Button);
```
---

<!-- /div -->

<!-- div -->

<h3 id="pickpropspaths"><code>pickProps(paths)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/pickProps.js#L17)

Same as lodash `pick` but for props.

#### Arguments
1. `paths` *(String|String&#91;&#93;)*: The property paths to pick.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const onlyWithValue = pickProps('value');
```
---

<!-- /div -->

<!-- div -->

<h3 id="pluckobsobservablesnames"><code>pluckObs(observablesNames)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/pluckObs.js#L14)

Takes a list of observable names, find the corresponding observables
from the context and map them to the corresponding prop according the
convention i.e.: same name without a $ at the end.

#### Arguments
1. `observablesNames` *(Function)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

---

<!-- /div -->

<!-- div -->

<h3 id="pure"><code>pure()</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/pure.js#L16)

Prevents the component from updating unless a prop has changed.
Uses `shallowEqual()` to test for changes.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
pure('button')
```
---

<!-- /div -->

<!-- div -->

<h3 id="renamepropoldname-newname"><code>renameProp(oldName, newName)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/renameProp.js#L17)

Renames a single prop.

#### Arguments
1. `oldName` *(String)*:
2. `newName` *(String)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
renameProp('data', 'value')
```
---

<!-- /div -->

<!-- div -->

<h3 id="renamepropsnamemap"><code>renameProps(nameMap)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/renameProps.js#L28)

Renames multiple props, using a map of old prop names to new prop names.

#### Arguments
1. `nameMap` *(Object)*: A map with old prop as key and new prop as value.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
renameProps({data: 'value'})
```
---

<!-- /div -->

<!-- div -->

<h3 id="rendercomponentcomponent"><code>renderComponent(Component)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/renderComponent.js#L19)

Takes a component and returns a higher-order component version of that component.
This is useful in combination with another helper that expects a higher-order
component, like `branch`.

#### Arguments
1. `Component` *(ReactClass|ReactFunctionalComponent|String)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const renderLoaderIfLoading = branch(
  ({loading} => loading),
  renderComponent(Loader),
)
```
---

<!-- /div -->

<!-- div -->

<h3 id="rendernothing"><code>renderNothing()</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/renderNothing.js#L17)

A higher-order component that always renders `null`.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const renderNothingIfNoRules = branch(
  ({rules} => rules.length === 0),
  renderNothing,
)
```
---

<!-- /div -->

<!-- div -->

<h3 id="setdisplaynamedisplayname"><code>setDisplayName(displayName)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/setDisplayName.js#L14)

Assigns to the `displayName` property on the base component.

#### Arguments
1. `displayName` *(String)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
setDisplayName('AnotherDisplayName')(MyComponent);
```
---

<!-- /div -->

<!-- div -->

<h3 id="setproptypesproptypes"><code>setPropTypes(propTypes)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/setPropTypes.js#L14)

Assigns to the `propTypes` property on the base component.

#### Arguments
1. `propTypes` *(Object)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
setPropTypes({children: PropTypes.node})(MyComponent);
```
---

<!-- /div -->

<!-- div -->

<h3 id="setstatickey-value"><code>setStatic(key, value)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/setStatic.js#L13)

Assigns a value to a static property on the base component.

#### Arguments
1. `key` *(String)*:
2. `value` *(String)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
setStatic({defaultProps: {type: 'button'}})('button');
```
---

<!-- /div -->

<!-- div -->

<h3 id="shouldupdatetest"><code>shouldUpdate(test)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/shouldUpdate.js#L21)

Higher-order component version of
[`shouldComponentUpdate()`](https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate).
The test function accepts both the current props and the next props.

#### Arguments
1. `test` *(Function)*: Receive two arguments, props and nextProps

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Pure
shouldUpdate((props, nextProps) => shallowEqual(props, nextProps))
```
---

<!-- /div -->

<!-- div -->

<h3 id="toclass"><code>toClass()</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/toClass.js#L20)

Takes a function component and wraps it in a class. This can be used as a
fallback for libraries that need to add a ref to a component, like Relay.
If the base component is already a class, it returns the given component.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Component = toClass(() => <div />);
<Component ref="foo" /> // A ref can be used because Component is a class
```
---

<!-- /div -->

<!-- div -->

<h3 id="withcontextchildcontexttypes-getchildcontext"><code>withContext(childContextTypes, getChildContext)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withContext.js#L20)

Provides context to the component's children. `childContextTypes` is an object
of React prop types. `getChildContext()` is a function that returns
the child context. Use along with `getContext()`.

#### Arguments
1. `childContextTypes` *(Object)*:
2. `getChildContext` *(Function)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
// Provide window in the context, useful for testing
const withWindow = withContext({window: PropTypes.object.isRequired}, () => {window})
```
---

<!-- /div -->

<!-- div -->

<h3 id="withhandlershandlerfactories"><code>withHandlers(handlerFactories)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withHandlers.js#L46)

Takes an object map of handler creators or a factory function. These are
higher-order functions that accept a set of props and return a function handler:
This allows the handler to access the current props via closure, without needing
to change its signature.
Handlers are passed to the base component as immutable props, whose identities
are preserved across renders. This avoids a common pitfall where functional
components create handlers inside the body of the function, which results in a
new handler on every render and breaks downstream `shouldComponentUpdate()`
optimizations that rely on prop equality.

#### Arguments
1. `handlerFactories` *(Function|Object)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const enhance = compose(
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value)
    },
    onSubmit: props => event => {
      event.preventDefault()
      submitForm(props.value)
    }
  })
)

const Form = enhance(({ value, onChange, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <label>Value
      <input type="text" value={value} onChange={onChange} />
    </label>
  </form>
)
```
---

<!-- /div -->

<!-- div -->

<h3 id="withobsobsmapper"><code>withObs(obsMapper)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withObs.js#L24)

Takes observables from the context and special observable `props$` and map them
to a new set of observables.

#### Arguments
1. `obsMapper` *(Function)*: The function that take previous observables and returns new ones.

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const withFullName$ = mapObs(({firstName$, props$}) => ({
 fullName$: Observable.combineLatest(
   firstName$,
   props$.pluck('lastName'),
   (firstName, lastName) => `${firstName} ${lastName}`
  )
}))
```
---

<!-- /div -->

<!-- div -->

<h3 id="withpropspropsmapper"><code>withProps(propsMapper)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withProps.js#L23)

Like `mapProps()`, except the newly created props are merged with the owner props.
Instead of a function, you can also pass a props object directly. In this form,
it is similar to `defaultProps()`, except the provided props take precedence over
props from the owner.

#### Arguments
1. `propsMapper` *(Function|Object)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Button = withProps({type: 'button'})('button');
const XButton = withProps(({type}) => {type: `x${type}`})('button');
```
---

<!-- /div -->

<!-- div -->

<h3 id="withpropsonchangeshouldmaporkeys-createprops"><code>withPropsOnChange(shouldMapOrKeys, createProps)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withPropsOnChange.js#L27)

Like `withProps()`, except the new props are only created when one of the owner
props specified by `shouldMapOrKeys` changes. This helps ensure that expensive
computations inside `createProps()` are only executed when necessary.
Instead of an array of prop keys, the first parameter can also be a function
that returns a boolean, given the current props and the next props. This allows
you to customize when `createProps()` should be called.

#### Arguments
1. `shouldMapOrKeys` *(Function|String|String&#91;&#93;)*:
2. `createProps` *(Function)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const withEmptyProp = withPropsOnChange('count', ({count}) => ({empty: count === 0}));
```
---

<!-- /div -->

<!-- div -->

<h3 id="withreducerstatename-dispatchname-reducer-initialstate"><code>withReducer(stateName, dispatchName, reducer, initialState)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withReducer.js#L46)

Similar to `withState()`, but state updates are applied using a reducer function.
A reducer is a function that receives a state and an action, and returns a new state.
Passes two additional props to the base component: a state value, and a
dispatch method. The dispatch method sends an action to the reducer, and
the new state is applied.

#### Arguments
1. `stateName` *(String)*:
2. `dispatchName` *(String)*:
3. `reducer` *(Function)*:
4. `initialState` *(&#42;)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const counterReducer = (count, action) => {
  switch (action.type) {
  case INCREMENT:
    return count + 1
  case DECREMENT:
    return count - 1
  default:
    return count
  }
}

const enhance = withReducer('counter', 'dispatch', counterReducer, 0)
const Counter = enhance(({ counter, dispatch }) =>
  <div>
    Count: {counter}
    <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
    <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
  </div>
)
```
---

<!-- /div -->

<!-- div -->

<h3 id="withstatestatename-stateupdatername-initialstate"><code>withState(stateName, stateUpdaterName, initialState)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withState.js#L43)

Passes two additional props to the base component: a state value, and a function
to update that state value. The state updater has the following signature:
```js
stateUpdater<T>((prevValue: T) => T): void
stateUpdater(newValue: any): void
```
The first form accepts a function which maps the previous state value to a new
state value. You'll likely want to use this state updater along with `withHandlers()`
or `withProps()` to create specific updater functions. For example, to create an
HoC that adds basic counting functionality to a component:
```js
const addCounting = compose( withState('counter', 'setCounter', `0`), withProps(({ setCounter }) => *({ increment: () => setCounter(n => n + `1`), decrement: () => setCounter(n => n - `1`), reset: () => setCounter(0) }))*
)
```
The second form accepts a single value, which is used as the new state.
An initial state value is required. It can be either the state value itself,
or a function that returns an initial state given the initial props.

#### Arguments
1. `stateName` *(String)*:
2. `stateUpdaterName` *(String)*:
3. `initialState` *(&#42;|Function)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

---

<!-- /div -->

<!-- div -->

<h3 id="withstatehandlersinitialstate-stateupdaters"><code>withStateHandlers(initialState, stateUpdaters)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/withStateHandlers.js#L45)

Passes state object properties and immutable updater functions in a form of
`(...payload: any[]) => Object` to the base component.
Every state updater function accepts state, props and payload and must return
a new state or undefined. The new state is shallowly merged with the previous
state.

#### Arguments
1. `initialState` *(Function|Object)*:
2. `stateUpdaters` *(Object)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
const Counter = withStateHandlers(
  ({ initialCounter = 0 }) => ({
    counter: initialCounter,
  }),
  {
    incrementOn: ({ counter }) => (value) => ({
      counter: counter + value,
    }),
    decrementOn: ({ counter }) => (value) => ({
      counter: counter - value,
    }),
    resetCounter: (_, { initialCounter = 0 }) => () => ({
      counter: initialCounter,
    }),
  }
)(
  ({ counter, incrementOn, decrementOn, resetCounter }) =>
    <div>
      <Button onClick={() => incrementOn(2)}>Inc</Button>
      <Button onClick={() => decrementOn(3)}>Dec</Button>
      <Button onClick={resetCounter}>Reset</Button>
    </div>
)
```
---

<!-- /div -->

<!-- div -->

<h3 id="wrapdisplaynamecomponent-wrappername"><code>wrapDisplayName(component, wrapperName)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/wrapDisplayName.js#L19)

Returns a wrapped version of a React component's display name. For instance,
if the display name of `component` is `'Post'`, and `wrapperName` is `'mapProps'`,
the return value is `'mapProps(Post)'`. Most Recompose higher-order components
use `wrapDisplayName()`.

#### Arguments
1. `component` *(ReactClass|ReactFunctionalComponent)*: Component
2. `wrapperName` *(String)*: Wrapper name

#### Returns
*(String)*: Returns a wrapped displayName of the component.

#### Example
```js
// Create a hoc that will log when a component will mount
wrapDisplayName(Button, 'wrap'); // will return wrap(Button)
```
---

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Utilities” Methods`

<!-- div -->

<h3 id="componentfrompropprop"><code>componentFromProp(prop)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/componentFromProp.js#L21)

Creates a component that accepts a component as a prop and renders it
with the remaining props.

#### Arguments
1. `prop` *(String)*: The prop to render as Component.

#### Returns
*(ReactFunctionalComponent)*: Returns a Component.

#### Example
```js
const enhance = defaultProps({component: 'button'});
const Button = enhance(componentFromProp('component'));

<Button foo="bar" /> // renders <button foo="bar" />
<Button component="a" foo="bar" />  // renders <a foo="bar" />
<Button component={Link} foo="bar" />  // renders <Link foo="bar" />
```
---

<!-- /div -->

<!-- div -->

<h3 id="composefuncs"><code>compose([funcs])</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/compose.js#L17)

This method is similar to lodash `flowRight`. It permits to easily compose
several high order components.

#### Arguments
1. `[funcs]` *(...Function)*: The functions to invoke.

#### Returns
*(Function)*: Returns the new composite function.

#### Example
```js
const enhance = compose(pure, withProps({foo: 'bar'}));
const Component = enhance(MyComponent);
```
---

<!-- /div -->

<!-- div -->

<h3 id="createeagerelementtype-props-children"><code>createEagerElement(type, [props], [children])</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/createEagerElement.js#L22)

React elements are lazily evaluated. But when a higher-order component
renders a functional component, the laziness doesn't have any real benefit.
createEagerElement() is a replacement for React.createElement() that checks
if the given component is referentially transparent. If so, rather than
returning a React element, it calls the functional component with the given
props and returns its output.

#### Arguments
1. `type` *(ReactClass|ReactFunctionalComponent|String)*: The type of component to render.
2. `[props]` *(Object)*: The props of the component.
3. `[children]` *(ReactNode)*: The children of the component.

#### Returns
*(ReactElement)*: Returns a element.

#### Example
```js
createEagerElement('div', {className: 'foo'});
```
---

<!-- /div -->

<!-- div -->

<h3 id="createeagerfactorytype"><code>createEagerFactory(type)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/createEagerFactory.js#L18)

The factory form of `createEagerElement()`.
Given a component, it returns a [factory](https://facebook.github.io/react/docs/react-api.html#createfactory).

#### Arguments
1. `type` *(ReactClass|ReactFunctionalComponent|String)*: The type of component to render.

#### Returns
*(Function): Returns a function that take two arguments (props, children)* and create
an element of the given type.

#### Example
```js
const div = createFactory('div');
div({className: 'foo'});
```
---

<!-- /div -->

<!-- div -->

<h3 id="createeventhandler"><code>createEventHandler()</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/createEventHandler.js#L36)

Returns an object with properties handler and stream. stream is an observable
sequence, and handler is a function that pushes new values onto the sequence.
Useful for creating event handlers like onClick.

#### Returns
*(Object)*: eventHandler

#### Example
```js
const {handler, stream} = createEventHandler();
```
---

<!-- /div -->

<!-- div -->

<h3 id="createhelperhoc-helpername-noargsfalse"><code>createHelper(hoc, helperName, [noArgs=false])</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/createHelper.js#L22)

Utility method that gives to higher-order components a comprehensive display name.

#### Arguments
1. `hoc` *(HigherOrderComponent)*: Higher-order component to wrap.
2. `helperName` *(String)*: Name used to create displayName.
3. `[noArgs=false]` *(Boolean)*: Indicate if the higher-order component has some arguments.

#### Returns
*(HigherOrderComponent)*: Returns a wrapped hoc.

#### Example
```js
const pluckOnChangeTargetValue = createHelper(
  withHandlers({
    onChange: ({onChange}) => ({target: {value}}) => onChange(value),
  }),
  'pluckOnChangeTargetValue',
);

const Input = pluckOnChangeTargetValue('input');
<Input /> // Will have "pluckOnChangeTargetValue(input)" as displayName
```
---

<!-- /div -->

<!-- div -->

<h3 id="createsinkcallback"><code>createSink(callback)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/createSink.js#L18)

Creates a component that renders nothing *(null)* but calls a callback when
receiving new props.

#### Arguments
1. `callback` *(Function)*: Function called when new props are received.

#### Returns
*(ReactClass)*: Returns a ReactClass.

#### Example
```js
const LocationUpdater = createSink(({hash}) => {
  window.location.hash = hash;
});
<LocationUpdater hash="foo" /> // Will add "#foo" in the url
```
---

<!-- /div -->

<!-- div -->

<h3 id="getdisplaynamecomponent"><code>getDisplayName(component)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/getDisplayName.js#L15)

Returns the display name of a React component. Falls back to 'Component'.

#### Arguments
1. `component` *(ReactClass|ReactFunctionalComponent)*:

#### Returns
*(String)*: Returns the display name of the provided component.

#### Example
```js
const MyButton = () => <button />;
MyButton.displayName = 'MyButton';

getDisplayName(MyComponent); // Will return "MyButton"
```
---

<!-- /div -->

<!-- div -->

<h3 id="hoiststaticshoc"><code>hoistStatics(hoc)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/hoistStatics.js#L21)

Augments a higher-order component so that when used, it copies non-react
static properties from the base component to the new component. This is
helpful when using Recompose with libraries like Relay.
Note that this only hoists non-react statics. The following static properties
will not be hoisted: childContextTypes, contextTypes, defaultProps, displayName,
getDefaultProps, mixins, propTypes, and type. The following native static methods
will also be ignored: name, length, prototype, caller, arguments, and arity

#### Arguments
1. `hoc` *(HigherOrderComponent)*:

#### Returns
*(HigherOrderComponent)*: A function that takes a component and returns a new component.

#### Example
```js
hoistStatics(withProps({foo: 'bar'}));
```
---

<!-- /div -->

<!-- div -->

<h3 id="identityvalue"><code>identity(value)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/identity.js#L13)

This method is similar to lodash `identity`. It returns the first argument it receives.

#### Arguments
1. `value` *(&#42;)*: Any value

#### Returns
*(&#42;)*: Returns `value`

#### Example
```js
identity(Component) === Component
```
---

<!-- /div -->

<!-- div -->

<h3 id="isclasscomponentvalue"><code>isClassComponent(value)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/isClassComponent.js#L18)

Returns true if the given value is a React component class.

#### Arguments
1. `value` *(&#42;)*: Any value

#### Returns
*(Boolean)*: Returns true if the given value is a React component class.

#### Example
```js
const Nothing = () => null;
const Nothing2 = class extends Component { render() { return null; } };
const Nothing3 = React.createClass({ render() { return null; } });
isClassComponent(Nothing); // false
isClassComponent(Nothing2); // true
isClassComponent(Nothing3); // true
```
---

<!-- /div -->

<!-- div -->

<h3 id="isreferentiallytransparentfunctioncomponentvalue"><code>isReferentiallyTransparentFunctionComponent(value)</code></h3>

[&#x24C8;](https://github.com/neoziro/recompact/blob/v3.3.0/src/isReferentiallyTransparentFunctionComponent.js#L20)

Returns true if the given value is a referentially transparent function component.
A referentially transparent function component is a component without any other
thing expect taking some props and returning a component.
This method is useful to apply some optimization.

#### Arguments
1. `value` *(&#42;)*: Any value

#### Returns
*(Boolean)*: Returns true if the given value is a referentially
transparent function component.

#### Example
```js
const Button = () => <button />;
isReferentiallyTransparentFunctionComponent(Button); // true
```
---

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #config "Jump back to the TOC."
