# dantil

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
* <a href="#dantil-logTrace">`dantil.logTrace`</a>
* <a href="#dantil-logWarning">`dantil.logWarning`</a>

<!-- /div -->

<!-- div -->

## `File System`
* <a href="#dantil-expandHomeDir">`dantil.expandHomeDir`</a>
* <a href="#dantil-redirectOutputToFile">`dantil.redirectOutputToFile`</a>
* <a href="#dantil-writeJSONFile">`dantil.writeJSONFile`</a>

<!-- /div -->

<!-- div -->

## `Number`
* <a href="#dantil-cleanNumber">`dantil.cleanNumber`</a>

<!-- /div -->

<!-- div -->

## `Profile`
* <a href="#dantil-assert">`dantil.assert`</a>
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
* <a href="#dantil-deleteModuleCache">`dantil.deleteModuleCache`</a>
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
<a href="#dantil-arraysEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L677 "View in source") [&#x24C9;][1]

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
<a href="#dantil-dir">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L333 "View in source") [&#x24C9;][1]

A version of `dantil.log()` that recurses indefinitely while formatting the object. This is useful for inspecting large, complicated objects.

#### Arguments
1. `values` *(...&#42;)*: The values to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-log"></a>`dantil.log(values)`
<a href="#dantil-log">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L316 "View in source") [&#x24C9;][1]

Prints the provided objects and values in color, recursing 2 times while formatting objects (which is identical to `console.log()`).
<br>
<br>
Prints objects on separate lines if multi-lined when formatted, else concatenates objects and values to print on the same line if shorter than 80 characters when concatenated.
<br>
<br>
Equally indents each line after the first line, if any. If the first argument has leading whitespace, prepends all remaining arguments with the same whitespace.

#### Arguments
1. `values` *(...&#42;)*: The values to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logError"></a>`dantil.logError(values)`
<a href="#dantil-logError">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L411 "View in source") [&#x24C9;][1]

Prints the provided values like `console.log()` prepended with red-colored "Error: ".

#### Arguments
1. `values` *(...&#42;)*: The values to print following "Error: ".

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logErrorAndPath"></a>`dantil.logErrorAndPath([getCallingLine], [values])`
<a href="#dantil-logErrorAndPath">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L454 "View in source") [&#x24C9;][1]

Prints an error message like `dantil.logError()` followed by the file path and line number from which the parent function was called.

#### Arguments
1. `[getCallingLine]` *(boolean)*: Specify getting the line where this is called instead of the line of the parent module.
2. `[values]` *(...&#42;)*: The optional values to print following "Error: ".

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logTrace"></a>`dantil.logTrace([msg])`
<a href="#dantil-logTrace">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L474 "View in source") [&#x24C9;][1]

Prints the stack trace to the current position. Removes parentheses surrounding file paths for the iTerm open-file-path shortcut.

#### Arguments
1. `[msg]` *(string)*: The optional message to print above the stack trace.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logWarning"></a>`dantil.logWarning(values)`
<a href="#dantil-logWarning">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L423 "View in source") [&#x24C9;][1]

Prints the provided values like `console.log()` prepended with yellow-colored "Warning: ".

#### Arguments
1. `values` *(...&#42;)*: The values to print following "Warning: ".

* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“File System” Methods`

<!-- div -->

### <a id="dantil-expandHomeDir"></a>`dantil.expandHomeDir(path)`
<a href="#dantil-expandHomeDir">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L300 "View in source") [&#x24C9;][1]

Replaces `'~'` in `path` (if present and at the path's start) with the home directory path.

#### Arguments
1. `path` *(string)*: The file path.

#### Returns
*(string)*:  Returns `path` with `'~'` *(if present)* replaced with the home directory path.

#### Example
```js
dantil.expandHomeDir('~/Desktop')
// => '/Users/Danny/Desktop'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-redirectOutputToFile"></a>`dantil.redirectOutputToFile(path, func)`
<a href="#dantil-redirectOutputToFile">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L234 "View in source") [&#x24C9;][1]

Synchronously writes the output of `func` to a file at `path` instead of the console. Overwrites the file if it already exists. Restores output to the console if an error is thrown.

#### Arguments
1. `path` *(string)*: The path where to write output.
2. `func` *(Function)*: The function producing output.

#### Returns
*(&#42;)*:  Returns the value returned by `func`, if any.

#### Example
```js
// Prints to console
console.log('Begin output to file')

// Redirects process output from console to '~/Desktop/out.txt'
dantil.redirectOutputToFile('~/Desktop/out.txt', function () {
  console.log('Numbers:')
  for (var i = 0; i < 100; ++i) {
    console.log(i)
  }
})
// => Restores output to console and prints "Output saved: ~/Desktop/out.txt"

// Prints to console (after restoring output)
console.log('Output to file complete')
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-writeJSONFile"></a>`dantil.writeJSONFile(path, obj)`
<a href="#dantil-writeJSONFile">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L275 "View in source") [&#x24C9;][1]

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
<a href="#dantil-cleanNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L712 "View in source") [&#x24C9;][1]

Removes any extraneous digits from `number`, which result from operations limited by JavaScript's floating point number precision, such as `0.1 * 0.2` (which does not equal `0.02`). This limitation results from being unable to map `0.1` to a finite binary floating point number.

#### Arguments
1. `number` *(number)*: The number to rid of any extraneous digits.

#### Returns
*(number)*:  Returns the cleaned number.

#### Example
```js
var number = 0.1 * 0.2
// => 0.020000000000000004

number = dantil.cleanFloat(number)
// => 0.02
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Profile” Methods`

<!-- div -->

### <a id="dantil-assert"></a>`dantil.assert([msg])`
<a href="#dantil-assert">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L498 "View in source") [&#x24C9;][1]

Prints the calling file path and line number, prepended by `msg`, to mark reaching a section of code.

#### Arguments
1. `[msg]` *(string)*: The optional message to prepend to the path and line number.

#### Example
```js
if (rareConditionIsTrue) {
  dantil.assert('Condition met')
  // => Prints "Condition met: /Users/Danny/test.js:9:12"
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-assertTrue"></a>`dantil.assertTrue(value, [msg])`
<a href="#dantil-assertTrue">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L515 "View in source") [&#x24C9;][1]

Prints the calling file path and line number, prepended by `msg`, if `value` is truthy.

#### Arguments
1. `value` *(boolean)*: The value to check if truthy.
2. `[msg]` *(string)*: The optional message to prepend to the path and line number.

#### Example
```js
dantil.assertTrue(myNumber > 100, 'Condition met')
// => Prints "Condition met: /Users/Danny/test.js:9:12" if `myNumber > 100`
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-count"></a>`dantil.count(label)`
<a href="#dantil-count">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L598 "View in source") [&#x24C9;][1]

Counts the number of times a section of code is reached, identified by `label`. Use `dantil.countEnd(label)` to print the counter's value. This is useful for profiling complex programs.

#### Arguments
1. `label` *(string)*: The counter identifier.

#### Example
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
}

dantil.countEnd('even')
// => Prints "even: 50" and resets the count for 'even' to 0
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-countEnd"></a>`dantil.countEnd(label)`
<a href="#dantil-countEnd">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L611 "View in source") [&#x24C9;][1]

Prints (and resets the value of) the number of calls of `dantil.count(label)`.

#### Arguments
1. `label` *(string)*: The counter identifier.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-countEndAll"></a>`dantil.countEndAll`
<a href="#dantil-countEndAll">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L638 "View in source") [&#x24C9;][1]

Prints (and resets) the values of all counters used on `dantil.count()`. Does not print counters that are never reached (and never have their keys initialized).

#### Example
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
  if (i % 2 === 1) dantil.count('odd')
  if (i > 100) dantil.count('never reached')
}

dantil.countEndAll()
// => Prints "even: 50, odd: 50" and resets all counts to 0
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-time"></a>`dantil.time(label)`
<a href="#dantil-time">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L549 "View in source") [&#x24C9;][1]

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
<a href="#dantil-timeEnd">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L561 "View in source") [&#x24C9;][1]

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
<a href="#dantil-dashedToCamelCase">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L730 "View in source") [&#x24C9;][1]

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

### <a id="dantil-deleteModuleCache"></a>`dantil.deleteModuleCache(paths)`
<a href="#dantil-deleteModuleCache">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L165 "View in source") [&#x24C9;][1]

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

### <a id="dantil-getPathAndLineNumber"></a>`dantil.getPathAndLineNumber([getCallingLine])`
<a href="#dantil-getPathAndLineNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L180 "View in source") [&#x24C9;][1]

Gets the file path and line number of the first frame in the stack of the parent module from where this function was called. This is useful for logging where an object is instantiated.

#### Arguments
1. `[getCallingLine]` *(boolean)*: Specify getting the line where this is called instead of the line of the parent module.

#### Returns
*(string)*:  Returns the file path and line number of calling line.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-illFormedOpts"></a>`dantil.illFormedOpts(schema, opts)`
<a href="#dantil-illFormedOpts">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L42 "View in source") [&#x24C9;][1]

Checks if options object `opts` adheres to `schema`. Simulates static function arguments (i.e., type checking and parameter count). Prints descriptive, helpful errors when `opts` is ill-formed.

#### Arguments
1. `schema` *(Object)*: The definition of required and optional properties for `opts`.
2. `opts` *(Object)*: The options object to check for conformity to `schema`.

#### Returns
*(boolean)*:  Returns `true` if `opts` is ill-formed, else `false`.

#### Example
```js
var schema = {
  num: Number,                                  // Must be of type `Number`
  list: { type: Array },                        // Must be of type `Array` (identical to previous parameter)
  strings: { type: Array, arrayType: String },  // Must be `Array` containing only String
  str: { type: String, optional: true },        // Parameter can be omitted
  val: [ 'red', 'yellow', 'blue' ]              // Must be one of predefined values
}

function myFunc(opts) {
  if (dantil.illFormedOpts(schema, opts)) {
    // => Prints descriptive, helpful error messages

    // Handle ill-formed `opts` how you choose
    throw new Error('ill-formed opts')
  }

  // ...stuff...
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-tryCatchWrapper"></a>`dantil.tryCatchWrapper(func, rethrow)`
<a href="#dantil-tryCatchWrapper">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L116 "View in source") [&#x24C9;][1]

Executes `func` within a `try` block. If an error is thrown, removes parentheses surrounding file paths in its stack trace for the iTerm open-file-path shortcut, and colors the error type name (e.g., `TypeError`) red.

#### Arguments
1. `func` *(Function)*: The function to execute within a `try` block.
2. `rethrow` *(boolean)*: Specify rethrowing an error *(after printing the stack trace)* if caught from `func`.

#### Returns
*(&#42;)*:  Returns the value returned by `func`, if any.

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
