# dantil

A Node.js utility library.

In addition to [much](#dantil-illFormedOpts) [original](#dantil-redirectOutputToFile) [functionality](#dantil-getModuleCallerPathAndLineNumber), includes [many](#dantil-log) [improved](#dantil-time) [alternatives](#dantil-tryCatchWrapper) [to](#dantil-assertEqual) native functions.
#### Usage
```javascript
var dantil = require('dantil')
```

<!-- div class="toc-container" -->

<!-- div -->

## `Array`
* <a href="#dantil-arraysEqual">`dantil.arraysEqual`</a>

<!-- /div -->

<!-- div -->

## `Console`
* <a href="#dantil-dir">`dantil.dir`</a>
* <a href="#dantil-log">`dantil.log`</a>
* <a href="#dantil-logError">`dantil.logError`</a>
* <a href="#dantil-logErrorAndPath">`dantil.logErrorAndPath`</a>
* <a href="#dantil-logPathAndObject">`dantil.logPathAndObject`</a>
* <a href="#dantil-logSuccess">`dantil.logSuccess`</a>
* <a href="#dantil-logTrace">`dantil.logTrace`</a>
* <a href="#dantil-logWarning">`dantil.logWarning`</a>
* <a href="#dantil-stylize">`dantil.stylize`</a>

<!-- /div -->

<!-- div -->

## `File System`
* <a href="#dantil-expandHomeDir">`dantil.expandHomeDir`</a>
* <a href="#dantil-outputToFile">`dantil.outputToFile`</a>
* <a href="#dantil-writeJSONFile">`dantil.writeJSONFile`</a>

<!-- /div -->

<!-- div -->

## `Number`
* <a href="#dantil-cleanNumber">`dantil.cleanNumber`</a>

<!-- /div -->

<!-- div -->

## `Profile`
* <a href="#dantil-assert">`dantil.assert`</a>
* <a href="#dantil-assertEqual">`dantil.assertEqual`</a>
* <a href="#dantil-assertTrue">`dantil.assertTrue`</a>
* <a href="#dantil-count">`dantil.count`</a>
* <a href="#dantil-countEnd">`dantil.countEnd`</a>
* <a href="#dantil-countEndAll">`dantil.countEndAll`</a>
* <a href="#dantil-time">`dantil.time`</a>
* <a href="#dantil-timeEnd">`dantil.timeEnd`</a>

<!-- /div -->

<!-- div -->

## `String`
* <a href="#dantil-dashedToCamelCase">`dantil.dashedToCamelCase`</a>

<!-- /div -->

<!-- div -->

## `Utility`
* <a href="#dantil-colors">`dantil.colors`</a>
* <a href="#dantil-deleteModuleCache">`dantil.deleteModuleCache`</a>
* <a href="#dantil-getModuleCallerPathAndLineNumber">`dantil.getModuleCallerPathAndLineNumber`</a>
* <a href="#dantil-getPathAndLineNumber">`dantil.getPathAndLineNumber`</a>
* <a href="#dantil-illFormedOpts">`dantil.illFormedOpts`</a>
* <a href="#dantil-tryCatchWrapper">`dantil.tryCatchWrapper`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Array” Methods`

<!-- div -->

### <a id="dantil-arraysEqual"></a>`dantil.arraysEqual(a, b)`
<a href="#dantil-arraysEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1012 "View in source") [&#x24C9;][1]

Performs a shallow comparison between two arrays to determine if they are equivalent.

#### Arguments
1. `a` *(Array)*: The array to compare.
2. `b` *(Array)*: The other array to compare.

#### Returns
*(boolean)*:  Returns `true` if the arrays are equivalent, else `false`.

#### Example
```js
dantil.arraysEqual([], [])
// => true

dantil.arraysEqual([1, 2, 3, 'danny'], [1, 2, 3, 'danny'])
// => true

dantil.arraysEqual([ false, true ], [ true ])
// => false

// A shallow comparison will not compare object properties
var objA = { prop: 'val' }
var objB = { prop: 'val' }
dantil.arraysEqual([ 1, 2, objA ], [ 1, 2, objB ])
// => false

// Rather, objects are only equal if they are the same instance
dantil.arraysEqual([ objA, objB ], [ objA, objB ])
// => true
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Console” Methods`

<!-- div -->

### <a id="dantil-dir"></a>`dantil.dir(values)`
<a href="#dantil-dir">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L499 "View in source") [&#x24C9;][1]

A version of `dantil.log()` that recurses indefinitely while formatting the object. This is useful for inspecting large, complicated objects.

#### Arguments
1. `values` *(...&#42;)*: The values and objects to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-log"></a>`dantil.log(values)`
<a href="#dantil-log">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L482 "View in source") [&#x24C9;][1]

Pretty-prints the provided values and objects in color, recursing 2 times while formatting objects (which is identical to `console.log()`).
<br>
<br>
Formats plain `Object`s and `Array`s with multi-line string representations on separate lines. Concatenates and formats all other successive values on the same line.
<br>
<br>
If the first argument is of a complex type (e.g., `Object`, `Array`), left-aligns all remaining lines. Otherwise, equally indents each line after the first line, if any. If the first argument has leading whitespace, prepends all remaining arguments with the same whitespace excluding line breaks.

#### Arguments
1. `values` *(...&#42;)*: The values and objects to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logError"></a>`dantil.logError(values)`
<a href="#dantil-logError">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L610 "View in source") [&#x24C9;][1]

Prints the provided values like `dantil.log()` prepended with red-colored "Error: ".

#### Arguments
1. `values` *(...&#42;)*: The values to print following "Error: ".

#### Example
```js
dantil.logError('Property undefined:', obj)
// => Prints "Error: Value undefined: { property: undefined }"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logErrorAndPath"></a>`dantil.logErrorAndPath([logThisLine], [values])`
<a href="#dantil-logErrorAndPath">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L680 "View in source") [&#x24C9;][1]

Prints an error message like `dantil.logError()` followed by the file path and line number of the function call that invoked the currently executing module.

#### Arguments
1. `[logThisLine]` *(boolean)*: Specify logging the line where this function is called instead of the line which invoked the currently executing module.
2. `[values]` *(...&#42;)*: The optional values and objects to print following "Error: ".

#### Example
```js
// The contents of 'foo.js':

dantil.logErrorAndPath('Property undefined:', obj)
// => Prints "Error: Value undefined: { property: undefined }
//              /Users/Danny/foo.js:1"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logPathAndObject"></a>`dantil.logPathAndObject(object, printLeadingNewline, logThisLine)`
<a href="#dantil-logPathAndObject">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L720 "View in source") [&#x24C9;][1]

Prints `object` preceded by the file path and line number of the function call that invoked the currently executing module.

#### Arguments
1. `object` *(Object)*: The object to print.
2. `printLeadingNewline` *(boolean)*: Specify printing a leading newline.
3. `logThisLine` *(boolean)*: Specify logging the line where this function is called instead of the line which invoked the currently executing module.

#### Example
```js
// The contents of 'foo.js':

var obj = {
  values: [1, 2, 3],
  name: 'danny'
}

dantil.logPathAndObject(obj)
// => Prints "/Users/Danny/foo.js:6
//              { values: [ 1, 2, 3 ], name: 'danny' }"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logSuccess"></a>`dantil.logSuccess(values)`
<a href="#dantil-logSuccess">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L642 "View in source") [&#x24C9;][1]

Prints the provided values like `dantil.log()` prepended with green-colored "Success: ".

#### Arguments
1. `values` *(...&#42;)*: The values to print following "Success: ".

#### Example
```js
dantil.logSuccess(tests.length, 'tests passed')
// => Prints "Success: 47 tests passed"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logTrace"></a>`dantil.logTrace([message])`
<a href="#dantil-logTrace">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L734 "View in source") [&#x24C9;][1]

Prints the stack trace to the current position. Removes parentheses surrounding file paths for the iTerm open-file-path shortcut.

#### Arguments
1. `[message]` *(string)*: The optional message to print above the stack trace.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logWarning"></a>`dantil.logWarning(values)`
<a href="#dantil-logWarning">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L626 "View in source") [&#x24C9;][1]

Prints the provided values like `dantil.log()` prepended with yellow-colored "Warning: ".

#### Arguments
1. `values` *(...&#42;)*: The values to print following "Warning: ".

#### Example
```js
dantil.logWarning('Values unused:', obj)
// => Prints "Warning: Value unused: { property: undefined }"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-stylize"></a>`dantil.stylize(object, [options])`
<a href="#dantil-stylize">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L585 "View in source") [&#x24C9;][1]

Formats `object` in color for pretty-printing, recursing `options.depth` times while formatting. This is identical to Node's `util.inspect()`, but disables colors if the terminal does not support color.

#### Arguments
1. `object` *(&#42;)*: The object or value to stylize.
2. `[options]` *(Object)*: The options object.
3. `[options.depth=2]` *(number)*: The number of times to recurse while formating `object`. Pass `null` to recurse indefinitely.

#### Returns
*(string)*:  Returns a stylized string representation of `object`.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“File System” Methods`

<!-- div -->

### <a id="dantil-expandHomeDir"></a>`dantil.expandHomeDir(path)`
<a href="#dantil-expandHomeDir">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L466 "View in source") [&#x24C9;][1]

Replaces `'~'` in `path` (if present and at the path's start) with the home directory path.

#### Arguments
1. `path` *(string)*: The file path.

#### Returns
*(string)*:  Returns `path` with `'~'`, if present, replaced with the home directory path.

#### Example
```js
dantil.expandHomeDir('~/Desktop')
// => '/Users/Danny/Desktop'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-outputToFile"></a>`dantil.outputToFile(path, func)`
<a href="#dantil-outputToFile">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L390 "View in source") [&#x24C9;][1]

Synchronously writes the output of `func` to a file at `path` instead of the console. Overwrites the file if it already exists. Restores output to the console if an error is thrown.

#### Arguments
1. `path` *(string)*: The path where to write output.
2. `func` *(Function)*: The function producing output.

#### Returns
*(&#42;)*:  Returns the value returned by `func`, if any.

#### Example
```js
// Print to console
console.log('Begin output to file')

// Redirect process output from console to '~/Desktop/out.txt'
dantil.outputToFile('~/Desktop/out.txt', function () {
  console.log('Numbers:')
  for (var i = 0; i < 100; ++i) {
    console.log(i)
  }
})
// => Restores output to console and prints "Output saved: ~/Desktop/out.txt"

// Print to console (after restoring output)
console.log('Output to file complete')
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-writeJSONFile"></a>`dantil.writeJSONFile(path, obj)`
<a href="#dantil-writeJSONFile">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L441 "View in source") [&#x24C9;][1]

Writes `obj` to a JSON file at `path`.

#### Arguments
1. `path` *(string)*: The file path to write to.
2. `obj` *(Object)*: The object to save to `path`.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Number” Methods`

<!-- div -->

### <a id="dantil-cleanNumber"></a>`dantil.cleanNumber(number)`
<a href="#dantil-cleanNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1047 "View in source") [&#x24C9;][1]

Removes any extraneous digits from `number`, which result from operations limited by JavaScript's floating point number precision, such as `0.1 * 0.2` (which does not equal `0.02`). This limitation results from being unable to map `0.1` to a finite binary floating point number.

#### Arguments
1. `number` *(number)*: The number to rid of any extraneous digits.

#### Returns
*(number)*:  Returns the cleaned number.

#### Example
```js
var number = 0.1 * 0.2
// => 0.020000000000000004

number = dantil.cleanNumber(number)
// => 0.02
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Profile” Methods`

<!-- div -->

### <a id="dantil-assert"></a>`dantil.assert([message])`
<a href="#dantil-assert">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L760 "View in source") [&#x24C9;][1]

Prints the calling file path and line number, prepended by `message`, to mark reaching a section of code.

#### Arguments
1. `[message]` *(string)*: The optional message to prepend to the path and line number.

#### Example
```js
// The contents of 'foo.js':

if (rareConditionIsTrue) {
  dantil.assert('Condition met')
  // => Prints "Condition met: /Users/Danny/foo.js:2"
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-assertEqual"></a>`dantil.assertEqual(value, other, [message])`
<a href="#dantil-assertEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L833 "View in source") [&#x24C9;][1]

Tests shallow, coercive equality with the equal comparison operator (`==`). Prints an error and the file path and line number if the test fails, unlike Node's `assert.equal()` which throws an error.

#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.
3. `[message]` *(string)*: The optional message to print if the test fails.

#### Returns
*(boolean)*:  Returns `true` if the values are equivalent, else `false`.

#### Example
```js
// The contents of 'foo.js':

dantil.assertEqual(false, 0)
// => true

dantil.assertEqual(20, 21)
// => false
// => Prints "AssertionError: 20 == 21
//              /Users/Danny/foo.js:5"

dantil.assertEqual({ prop: 'value' }, { prop: 'value' })
// => false
// => Prints "AssertionError: { prop: 'value' } == { prop: 'value' }
//              /Users/Danny/foo.js:9"

dantil.assertEqual([ 3, 1, 4 ], [ 1, 5, 9 ], 'Array test failed')
// => false
// => Prints "AssertionError: Array test failed
//              /Users/Danny/foo.js:14"

if (dantil.assertEqual(myArray.length, 100)) {
  // => true

  // ...stuff...
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-assertTrue"></a>`dantil.assertTrue(value, [message])`
<a href="#dantil-assertTrue">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L786 "View in source") [&#x24C9;][1]

Tests if `value` is truthy. If so, prints the calling file path and line number, prepended by `message`.

#### Arguments
1. `value` *(boolean)*: The value to check if truthy.
2. `[message]` *(string)*: The optional message to prepend to the path and line number.

#### Returns
*(boolean)*:  Returns `true` if `value` is truthy, else `false`.

#### Example
```js
// The contents of 'foo.js':

dantil.assertTrue(100 < Infinity, 'Condition met')
// => true
// => Prints "Condition met: /Users/Danny/foo.js:1"

if (dantil.assertTrue(rareConditionIsTrue)) {
  // => true
  // => Prints "Reached: /Users/Danny/foo.js:5"
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-count"></a>`dantil.count(label)`
<a href="#dantil-count">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L931 "View in source") [&#x24C9;][1]

Counts the number of times a section of code is reached, identified by `label`. Use `dantil.countEnd(label)` to print the counter's value. This is useful for profiling complex programs.

#### Arguments
1. `label` *(string)*: The counter identifier.

#### Example
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
}

dantil.countEnd('even')
// => Prints "even: 50"
// => Resets the count for 'even' to 0
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-countEnd"></a>`dantil.countEnd(label)`
<a href="#dantil-countEnd">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L944 "View in source") [&#x24C9;][1]

Prints (and resets the value of) the number of calls of `dantil.count(label)`.

#### Arguments
1. `label` *(string)*: The counter identifier.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-countEndAll"></a>`dantil.countEndAll`
<a href="#dantil-countEndAll">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L973 "View in source") [&#x24C9;][1]

Prints (and resets) the values of all counters used on `dantil.count()`. Does not print counters that are never reached (and never have their keys initialized).

#### Example
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
  if (i % 2 === 1) dantil.count('odd')
  if (i > 100) dantil.count('never reached')
}

dantil.countEndAll()
// => Resets all counts to 0
// => Prints "even: 50
//            odd: 50"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-time"></a>`dantil.time(label)`
<a href="#dantil-time">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L881 "View in source") [&#x24C9;][1]

Starts a high-resolution timer (with precision in microseconds) identified by `label`. Use `dantil.timeEnd(label)` to print the timer's current value.

#### Arguments
1. `label` *(string)*: The identifier of the timer.

#### Example
```js
// Start timer
dantil.time('my test')

// ...stuff...

dantil.timeEnd('my test')
// => Prints "my test: 13.264ms"

// ...more stuff...

dantil.timeEnd('my test')
// => Prints "my test: 31.183ms"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-timeEnd"></a>`dantil.timeEnd(label)`
<a href="#dantil-timeEnd">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L893 "View in source") [&#x24C9;][1]

Prints the current high-resolution value of a timer initiated with `dantil.time(label)`.

#### Arguments
1. `label` *(string)*: The identifier of the timer.

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“String” Methods`

<!-- div -->

### <a id="dantil-dashedToCamelCase"></a>`dantil.dashedToCamelCase(dashedString)`
<a href="#dantil-dashedToCamelCase">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1065 "View in source") [&#x24C9;][1]

Converts dash-separated `string` to camel case.

#### Arguments
1. `dashedString` *(string)*: The dash-separated string to convert.

#### Returns
*(string)*:  Returns the camel cased string.

#### Example
```js
dantil.camelCase('my-long-variable-name')
// => 'myLongVariableName'
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Utility” Methods`

<!-- div -->

### <a id="dantil-colors"></a>`dantil.colors`
<a href="#dantil-colors">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L362 "View in source") [&#x24C9;][1]

(Object): Stylizes strings for printing to the console using the [chalk](https://github.com/chalk/chalk) module.

#### Example
```js
console.log(dantil.colors.red('Error'))
// => Prints red-colored "Error"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-deleteModuleCache"></a>`dantil.deleteModuleCache(paths)`
<a href="#dantil-deleteModuleCache">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L195 "View in source") [&#x24C9;][1]

Deletes the modules identified by the provided paths from cache, forcing them to be reloaded at next `require()` call. Without removing a module from cache, subsequent `require()` calls to the same module will not enable changes to its file(s). This is useful for enabling changes on a server without restarting the server.

#### Arguments
1. `paths` *(...string)*: The paths of modules to remove from cache.

#### Example
```js
// Load module
var myModule = require('./myModule.js')

// Remove module from cache
dantil.deleteModuleCache('./myModule.js')

// Load module again, enabling changes to './myModule.js'
myModule = require('./myModule.js')
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-getModuleCallerPathAndLineNumber"></a>`dantil.getModuleCallerPathAndLineNumber()`
<a href="#dantil-getModuleCallerPathAndLineNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L286 "View in source") [&#x24C9;][1]

Gets the file path and line number of the function call that invoked the currently executing module. Returns the path and line number in the format "path:line-number".
<br>
<br>
This is not necessarily the caller of the currently executing function, which can be another function within the same module. Nor is it necessarily this module's parent which instantiated the module. Rather, it is the most recent function call in the stack outside the currently executing module.
<br>
<br>
Returns `undefined` if there is no other module in the stack below where this function was called.

#### Returns
*(string)*:  Returns the file path and line number in the format "path:line-number".

#### Example
```js
// The contents of 'main.js':

var child = require('./child.js')
child.func()

var grandchild = require('./grandchild.js')
grandchild.foo()

// Try to get the frame of the nonexistant function call that invoked this module.
dantil.getModuleCallerPathAndLineNumber()
// => undefined
```

```javascript
// The contents of 'child.js':

var grandchild = require('./grandchild.js')

exports.func = function () {
  // Get the frame of the invocation of the current execution of this module.
  dantil.getModuleCallerPathAndLineNumber()
  // => '/Users/Danny/main.js:2'

  // Call another function within the same module, though retrieves the same frame.
  subFunc()

  // Call a function in another module.
  grandchild.bar()
}

function subFunc() {
  // Get the frame of the invocation of the current execution of this module (which
  // is not the frame that invoked this function).
  dantil.getModuleCallerPathAndLineNumber()
  // => '/Users/Danny/main.js:2'
}
```

```javascript
// The contents of 'grandchild.js':

exports.foo = function () {
  dantil.getModuleCallerPathAndLineNumber()
  // => '/Users/Danny/main.js:5'
}

exports.bar = function () {
  dantil.getModuleCallerPathAndLineNumber()
  // => '/Users/Danny/child.js:13'
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-getPathAndLineNumber"></a>`dantil.getPathAndLineNumber()`
<a href="#dantil-getPathAndLineNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L215 "View in source") [&#x24C9;][1]

Gets the file path and line number of where this function is invoked in the format "path:line-number".

#### Returns
*(string)*:  Returns the file path and line number in the format "path:line-number".

#### Example
```js
// The contents of 'foo.js':

dantil.getPathAndLineNumber()
// => '/Users/Danny/foo.js:1'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-illFormedOpts"></a>`dantil.illFormedOpts(schema, options)`
<a href="#dantil-illFormedOpts">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L56 "View in source") [&#x24C9;][1]

Checks if options object `options` adheres to `schema`. Simulates static function arguments (i.e., type checking and parameter count). Prints descriptive, helpful errors when `options` is ill-formed.

#### Arguments
1. `schema` *(Object)*: The definition of required and optional properties for `options`.
2. `options` *(Object)*: The options object to check for conformity to `schema`.

#### Returns
*(boolean)*:  Returns `true` if `options` is ill-formed, else `false`.

#### Example
```js
var schema = {
  // Must be of type `Number`.
  num: Number,

  // Must be of type `Number` (identical to previous parameter).
  otherNum: { type: Number },

  // Must be of type `Array` or `Object`.
  args: [ Array, Object ],

  // Must be of type `Array` or `Object` (identical to previous parameter).
  otherArgs: { type: [ Array, Object ] },

  // Must be `Array` containing only strings.
  strings: { type: Array, arrayType: String },

  // Parameter can be omitted.
  str: { type: String, optional: true },

  // Must be one of predefined values.
  val: { values: [ 'red', 'yellow', 'blue' ] }
}

function myFunc(options) {
  if (dantil.illFormedOpts(schema, options)) {
    // => Prints descriptive, helpful error messages

    // Handle ill-formed `options` how you choose
    throw new Error('ill-formed options')
  }

  // ...stuff...
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-tryCatchWrapper"></a>`dantil.tryCatchWrapper(func, [exitProcessIfFailure])`
<a href="#dantil-tryCatchWrapper">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L146 "View in source") [&#x24C9;][1]

Executes `func` within a `try` block. If an error is thrown, removes parentheses surrounding file paths in its stack trace for the iTerm open-file-path shortcut, and colors the error type name (e.g., `TypeError`) red.

#### Arguments
1. `func` *(Function)*: The function to execute within a `try` block.
2. `[exitProcessIfFailure]` *(boolean)*: Specify ending the process with 'failure' code `1` after catching an error from `func` and printing its stack trace. The shell that executed Node will see the exit code as `1`.

#### Returns
*(&#42;)*:  Returns the return value of `func`, if any.

#### Example
```js
dantil.tryCatchWrapper(function () {
  // ...stuff...
  throw new Error('test failed')
})
// => Catches thrown error and prints a formatted stack trace
```
* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #array "Jump back to the TOC."
