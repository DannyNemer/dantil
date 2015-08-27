<a name="module_danny-util"></a>
## danny-util
Project-agnostic utility functions for Node.js.

**Example**  
```js
var dannyUtil = require('./danny-util/danny-util.js')
```

* [danny-util](#module_danny-util)
  * [.illFormedOpts(schema, opts)](#module_danny-util.illFormedOpts) ⇒ <code>Boolean</code>
  * [.redirectOutputToFile(path, callback)](#module_danny-util.redirectOutputToFile) ⇒ <code>Mixed</code>
  * [.writeJSONFile(path, obj)](#module_danny-util.writeJSONFile)
  * [.expandHomeDir(path)](#module_danny-util.expandHomeDir) ⇒ <code>String</code>
  * [.tryCatchWrapper(callback, rethrow)](#module_danny-util.tryCatchWrapper) ⇒ <code>Mixed</code>
  * [.deleteModuleCache(...pathN)](#module_danny-util.deleteModuleCache)
  * [.getLine(getCallingLine)](#module_danny-util.getLine) ⇒ <code>String</code>
  * [.log([...valN])](#module_danny-util.log)
  * [.dir([...valN])](#module_danny-util.dir)
  * [.logError(...valN)](#module_danny-util.logError)
  * [.logWarning(...valN)](#module_danny-util.logWarning)
  * [.logErrorAndLine([...valN])](#module_danny-util.logErrorAndLine)
  * [.logTrace([msg])](#module_danny-util.logTrace)
  * [.assert([msg])](#module_danny-util.assert)
  * [.assertTrue(value, [msg])](#module_danny-util.assertTrue)
  * [.time(label)](#module_danny-util.time)
  * [.timeEnd(label)](#module_danny-util.timeEnd)
  * [.count(label)](#module_danny-util.count)
  * [.countEnd(label)](#module_danny-util.countEnd)
  * [.countEndAll()](#module_danny-util.countEndAll)
  * [.arraysEqual(a, b)](#module_danny-util.arraysEqual) ⇒ <code>Boolean</code>
  * [.cleanNumber(number)](#module_danny-util.cleanNumber) ⇒ <code>Number</code>
  * [.dashedToCamelCase(dashedString)](#module_danny-util.dashedToCamelCase) ⇒ <code>String</code>

<a name="module_danny-util.illFormedOpts"></a>
### dannyUtil.illFormedOpts(schema, opts) ⇒ <code>Boolean</code>
Checks if an options object adheres to a schema. Simulates static function arguments (i.e., type checking and parameter count). Prints descriptive, helpful errors when `opts` is ill-formed.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Boolean</code> - `true` if `opts` is ill-formed, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Object</code> | Definition of required or optional properties and their expected values in `opts`. |
| opts | <code>Object</code> | The options object to check if conforms to `schema`. |

**Example**  
```js
var schema = {
  num: Number,                                  // Must be of type `Number`
  list: { type: Array },                        // Must be of type `Array` (identical to previous parameter)
  strings: { type: Array, arrayType: String },  // Must be `Array` containing only String
  str: { type: String, optional: true },        // Parameter can be omitted
  val: [ 'red', 'yellow', 'blue' ]              // Must be one of predefined values
}

function myFunc(opts) {
  if (dannyUtil.illFormedOpts(schema, opts)) {
    // Prints descriptive, helpful error messages
    // Handle ill-formed `opts` how you choose
    throw new Error('ill-formed opts')
  }

  // ...stuff...
}
```
<a name="module_danny-util.redirectOutputToFile"></a>
### dannyUtil.redirectOutputToFile(path, callback) ⇒ <code>Mixed</code>
Synchronously writes the output of a function to a file instead of the console. Overwrites the file if it already exists. Restores output to console if an error is thrown.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Mixed</code> - The value returned by `callback`, if any.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | The path where to write output. |
| callback | <code>function</code> | The function producing output. |

**Example**  
```js
// Prints to console
console.log('Begin output to file')

// Redirects process output from console to file
dannyUtil.redirectOutputToFile('~/Desktop/out.txt', function () {
  // Writes to '~/Desktop/out.txt'
  console.log('Numbers:')
  for (var i = 0; i < 100; ++i) {
    console.log(i)
  }
})
// Restores output to console and prints: "Output saved to: ~/Desktop/out.txt"

// Prints to console (after restoring output)
console.log('Output to file complete')
```
<a name="module_danny-util.writeJSONFile"></a>
### dannyUtil.writeJSONFile(path, obj)
Writes an object to a JSON file.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | The path to write file. |
| obj | <code>Object</code> | The object to save to file. |

<a name="module_danny-util.expandHomeDir"></a>
### dannyUtil.expandHomeDir(path) ⇒ <code>String</code>
Replaces `'~'` in a path (if present and at the path's start) with the home directory path.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>String</code> - `path` with '~' (if present) replaced with the home directory path.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | The file path. |

**Example**  
```js
dannyUtil.expandHomeDir('~/Desktop') // -> '/Users/Danny/Desktop'
```
<a name="module_danny-util.tryCatchWrapper"></a>
### dannyUtil.tryCatchWrapper(callback, rethrow) ⇒ <code>Mixed</code>
Executes the passed function within a `try` block. If an error is thrown, removes parentheses surrounding file paths in its stack trace for the iTerm open-file-path shortcut, and colors the error type name (e.g., `TypeError`) red.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Mixed</code> - The value returned by `callback`, if any.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function to execute within a `try` block. |
| rethrow | <code>Boolean</code> | Specify rethrowing an error (after printing the stack trace) if caught from `callback`. |

**Example**  
```js
// Catches thrown error and prints a formatted stack trace
dannyUtil.tryCatchWrapper(function () {
  // ...stuff...
  throw new Error('test failed')
})
```
<a name="module_danny-util.deleteModuleCache"></a>
### dannyUtil.deleteModuleCache(...pathN)
Deletes modules from cache, forcing them to be reloaded at next `require()` call. Without removing a module from cache, subsequent `require()` calls to the same module will not enable changes to its file(s). This is useful for enabling changes on a server without restarting the server.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...pathN | <code>String</code> | The paths of modules to remove from cache. |

**Example**  
```js
// Load module
var myModule = require('./myModule.js')

// Remove module from cache
dannyUtil.deleteModuleCache('./myModule.js')

// Load module again, enabling changes to './myModule.js'
myModule = require('./myModule.js')
```
<a name="module_danny-util.getLine"></a>
### dannyUtil.getLine(getCallingLine) ⇒ <code>String</code>
Gets the file path and line number of the first item in the stack of the parent module from where this function was called. This is useful for logging where an object is instantiated.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>String</code> - The file path and line number of calling line.  

| Param | Type | Description |
| --- | --- | --- |
| getCallingLine | <code>Boolean</code> | Specify getting the line where `getLine()` is called instead of the line of the parent module. |

<a name="module_danny-util.log"></a>
### dannyUtil.log([...valN])
Prints objects in color (on separate lines), recursing 2 times while formatting the object (which is identical to `console.log()`).

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [...valN] | <code>Mixed</code> | The values to print. |

<a name="module_danny-util.dir"></a>
### dannyUtil.dir([...valN])
Prints objects in color (on separate lines), recursing indefinitely while formatting the object. This is useful for inspecting large, complicated objects.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [...valN] | <code>Mixed</code> | The values to print. |

<a name="module_danny-util.logError"></a>
### dannyUtil.logError(...valN)
Prints like `console.log()` prepended with red-colored "Error: ".

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...valN | <code>Mixed</code> | The values to print following "Error: ". |

<a name="module_danny-util.logWarning"></a>
### dannyUtil.logWarning(...valN)
Prints like `console.log()` prepended with yellow-colored "Warning: ".

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...valN | <code>Mixed</code> | The values to print following "Warning: ". |

<a name="module_danny-util.logErrorAndLine"></a>
### dannyUtil.logErrorAndLine([...valN])
Prints error message like `dannyUtil.logError()` followed by the file path and line number from which the parent function was called .

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [...valN] | <code>Mixed</code> | The optional values to print following "Error: ". |

<a name="module_danny-util.logTrace"></a>
### dannyUtil.logTrace([msg])
Prints the stack trace to the current position. Removes parentheses surrounding file paths for the iTerm open-file-path shortcut.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The optional message to print above the stack trace. |

<a name="module_danny-util.assert"></a>
### dannyUtil.assert([msg])
Prints calling file path and line number to mark reaching a section of code, prepended by `msg`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The optional message to prepend line. |

**Example**  
```js
if (rareConditionIsTrue) {
  // Prints: "Condition met: /Users/Danny/test.js:9:12"
  dannyUtil.assert('Condition met')
}
```
<a name="module_danny-util.assertTrue"></a>
### dannyUtil.assertTrue(value, [msg])
Prints calling file path and line number if `value` is truthy, prepended by `msg`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | The value to check if truthy. |
| [msg] | <code>String</code> | The optional message to prepend line. |

**Example**  
```js
// If `myNumber > 100` is `true`, prints: "Condition met: /Users/Danny/test.js:9:12"
dannyUtil.assertTrue(myNumber > 100, 'Condition met')
```
<a name="module_danny-util.time"></a>
### dannyUtil.time(label)
Starts a high-resolution timer (with precision in microseconds) identified by `label`. Use `dannyUtil.timeEnd(label)` to print the timer's current value.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the timer. |

**Example**  
```js
// Start timer
dannyUtil.time('my test')

// ...stuff...

// Prints "my test: 13.264ms"
dannyUtil.timeEnd('my test')

// ...more stuff...

// Prints "my test: 31.183ms"
dannyUtil.timeEnd('my test')
```
<a name="module_danny-util.timeEnd"></a>
### dannyUtil.timeEnd(label)
Prints the current high-resolution value of a timer initiated with `dannyUtil.time(label)`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the timer. |

<a name="module_danny-util.count"></a>
### dannyUtil.count(label)
Counts the number of times a section of code is reached, identified by `label`. Use `dannyUtil.countEnd(label)` to print value. This is useful for profiling complex programs.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The id to refer to a section of code. |

**Example**  
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dannyUtil.count('even')
}

// Prints "even: 50"; resets count for 'even' to 0
dannyUtil.countEnd('even')
```
<a name="module_danny-util.countEnd"></a>
### dannyUtil.countEnd(label)
Prints (and clears the value of) the number of calls of `dannyUtil.count(label)`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The id to refer to calls to `dannyUtil.count()`. |

<a name="module_danny-util.countEndAll"></a>
### dannyUtil.countEndAll()
Prints (and clears) the values of all counters used on `dannyUtil.count()`. Will not print counters that are never reached (and never have their keys initialized).

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Example**  
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dannyUtil.count('even')
  if (i % 2 === 1) dannyUtil.count('odd')
  if (i > 100) dannyUtil.count('never reached')
}

// Prints: "even: 50
//          odd: 50"
// Resets all counts to 0
dannyUtil.countEndAll()
```
<a name="module_danny-util.arraysEqual"></a>
### dannyUtil.arraysEqual(a, b) ⇒ <code>Boolean</code>
Performs a shallow comparison between two arrays to determine if they are equivalent.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Boolean</code> - `true` if the arrays are equivalent, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | The array to compare. |
| b | <code>Array</code> | The other array to compare. |

**Example**  
```js
dannyUtil.arraysEqual([], []) // -> true

dannyUtil.arraysEqual([1, 2, 3, 'danny'], [1, 2, 3, 'danny']) // -> true

dannyUtil.arraysEqual([ false, true ], [ true ]) // -> false

// A shallow comparison will not compare object properties
var objA = { prop: 'val' }
var objB = { prop: 'val' }
dannyUtil.arraysEqual([ 1, 2, objA ], [ 1, 2, objB ]) // -> false

// Rather, objects are only equal if they are the same instance
dannyUtil.arraysEqual([ objA, objB ], [ objA, objB ]) // -> true
```
<a name="module_danny-util.cleanNumber"></a>
### dannyUtil.cleanNumber(number) ⇒ <code>Number</code>
Removes extraneous digits from numbers resulting from operations limited by JavaScript's floating point number precision, such as `0.1 * 0.2` (which does not equal `0.02`). This limitation results from being unable to map `0.1` to a finite binary floating point number.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Number</code> - The number trimmed.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | The number to trim. |

**Example**  
```js
var number = 0.1 * 0.2 // -> 0.020000000000000004
number = dannyUtil.cleanFloat(number) // -> 0.02
```
<a name="module_danny-util.dashedToCamelCase"></a>
### dannyUtil.dashedToCamelCase(dashedString) ⇒ <code>String</code>
Converts a dash-separated string to camelCase.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>String</code> - The input string in camelCase.  

| Param | Type | Description |
| --- | --- | --- |
| dashedString | <code>String</code> | The dash-separated string to convert. |

**Example**  
```js
dannyUtil.camelCase('my-long-variable-name') // -> 'myLongVariableName'
```
