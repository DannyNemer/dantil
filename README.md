<a name="module_dantil"></a>
## dantil
A Node.js utility library.

**Example**  
```js
var dantil = require('./dantil/dantil.js')
```

* [dantil](#module_dantil)
  * [.illFormedOpts(schema, opts)](#module_dantil.illFormedOpts) ⇒ <code>Boolean</code>
  * [.redirectOutputToFile(path, callback)](#module_dantil.redirectOutputToFile) ⇒ <code>Mixed</code>
  * [.writeJSONFile(path, obj)](#module_dantil.writeJSONFile)
  * [.expandHomeDir(path)](#module_dantil.expandHomeDir) ⇒ <code>String</code>
  * [.tryCatchWrapper(callback, rethrow)](#module_dantil.tryCatchWrapper) ⇒ <code>Mixed</code>
  * [.deleteModuleCache(...pathN)](#module_dantil.deleteModuleCache)
  * [.getLine([getCallingLine])](#module_dantil.getLine) ⇒ <code>String</code>
  * [.log([...valN])](#module_dantil.log)
  * [.dir([...valN])](#module_dantil.dir)
  * [.logError(...valN)](#module_dantil.logError)
  * [.logWarning(...valN)](#module_dantil.logWarning)
  * [.logErrorAndLine([getCallingLine], [...valN])](#module_dantil.logErrorAndLine)
  * [.logTrace([msg])](#module_dantil.logTrace)
  * [.assert([msg])](#module_dantil.assert)
  * [.assertTrue(value, [msg])](#module_dantil.assertTrue)
  * [.time(label)](#module_dantil.time)
  * [.timeEnd(label)](#module_dantil.timeEnd)
  * [.count(label)](#module_dantil.count)
  * [.countEnd(label)](#module_dantil.countEnd)
  * [.countEndAll()](#module_dantil.countEndAll)
  * [.arraysEqual(a, b)](#module_dantil.arraysEqual) ⇒ <code>Boolean</code>
  * [.cleanNumber(number)](#module_dantil.cleanNumber) ⇒ <code>Number</code>
  * [.dashedToCamelCase(dashedString)](#module_dantil.dashedToCamelCase) ⇒ <code>String</code>

<a name="module_dantil.illFormedOpts"></a>
### dantil.illFormedOpts(schema, opts) ⇒ <code>Boolean</code>
Checks if an options object adheres to a schema. Simulates static function arguments (i.e., type checking and parameter count). Prints descriptive, helpful errors when `opts` is ill-formed.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
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
  if (dantil.illFormedOpts(schema, opts)) {
    // Prints descriptive, helpful error messages
    // Handle ill-formed `opts` how you choose
    throw new Error('ill-formed opts')
  }

  // ...stuff...
}
```
<a name="module_dantil.redirectOutputToFile"></a>
### dantil.redirectOutputToFile(path, callback) ⇒ <code>Mixed</code>
Synchronously writes the output of a function to a file instead of the console. Overwrites the file if it already exists. Restores output to console if an error is thrown.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
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
dantil.redirectOutputToFile('~/Desktop/out.txt', function () {
  // Writes to '~/Desktop/out.txt'
  console.log('Numbers:')
  for (var i = 0; i < 100; ++i) {
    console.log(i)
  }
})
// Restores output to console and prints: "Output saved: ~/Desktop/out.txt"

// Prints to console (after restoring output)
console.log('Output to file complete')
```
<a name="module_dantil.writeJSONFile"></a>
### dantil.writeJSONFile(path, obj)
Writes an object to a JSON file.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | The path to write file. |
| obj | <code>Object</code> | The object to save to file. |

<a name="module_dantil.expandHomeDir"></a>
### dantil.expandHomeDir(path) ⇒ <code>String</code>
Replaces `'~'` in a path (if present and at the path's start) with the home directory path.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Returns**: <code>String</code> - `path` with `'~'` (if present) replaced with the home directory path.  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | The file path. |

**Example**  
```js
dantil.expandHomeDir('~/Desktop') // -> '/Users/Danny/Desktop'
```
<a name="module_dantil.tryCatchWrapper"></a>
### dantil.tryCatchWrapper(callback, rethrow) ⇒ <code>Mixed</code>
Executes the passed function within a `try` block. If an error is thrown, removes parentheses surrounding file paths in its stack trace for the iTerm open-file-path shortcut, and colors the error type name (e.g., `TypeError`) red.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Returns**: <code>Mixed</code> - The value returned by `callback`, if any.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function to execute within a `try` block. |
| rethrow | <code>Boolean</code> | Specify rethrowing an error (after printing the stack trace) if caught from `callback`. |

**Example**  
```js
// Catches thrown error and prints a formatted stack trace
dantil.tryCatchWrapper(function () {
  // ...stuff...
  throw new Error('test failed')
})
```
<a name="module_dantil.deleteModuleCache"></a>
### dantil.deleteModuleCache(...pathN)
Deletes modules from cache, forcing them to be reloaded at next `require()` call. Without removing a module from cache, subsequent `require()` calls to the same module will not enable changes to its file(s). This is useful for enabling changes on a server without restarting the server.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...pathN | <code>String</code> | The paths of modules to remove from cache. |

**Example**  
```js
// Load module
var myModule = require('./myModule.js')

// Remove module from cache
dantil.deleteModuleCache('./myModule.js')

// Load module again, enabling changes to './myModule.js'
myModule = require('./myModule.js')
```
<a name="module_dantil.getLine"></a>
### dantil.getLine([getCallingLine]) ⇒ <code>String</code>
Gets the file path and line number of the first frame in the stack of the parent module from where this function was called. This is useful for logging where an object is instantiated.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Returns**: <code>String</code> - The file path and line number of calling line.  

| Param | Type | Description |
| --- | --- | --- |
| [getCallingLine] | <code>Boolean</code> | Specify getting the line where `getLine()` is called instead of the line of the parent module. |

<a name="module_dantil.log"></a>
### dantil.log([...valN])
Prints objects in color, recursing 2 times while formatting the object (which is identical to `console.log()`).

Prints objects on separate lines if multi-lined when formatted, else concatenates objects and values to print on the same line if shorter than 80 characters when concatenated.

Equally indents each line after the first line, if any. If the first argument has leading whitespace, prepends all remaining arguments with the same whitespace.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [...valN] | <code>Mixed</code> | The values to print. |

<a name="module_dantil.dir"></a>
### dantil.dir([...valN])
A version of `dantil.log()` that recurses indefinitely while formatting the object. This is useful for inspecting large, complicated objects.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [...valN] | <code>Mixed</code> | The values to print. |

<a name="module_dantil.logError"></a>
### dantil.logError(...valN)
Prints like `console.log()` prepended with red-colored "Error: ".

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...valN | <code>Mixed</code> | The values print following "Error: ". |

<a name="module_dantil.logWarning"></a>
### dantil.logWarning(...valN)
Prints like `console.log()` prepended with yellow-colored "Warning: ".

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...valN | <code>Mixed</code> | The values print following "Warning: ". |

<a name="module_dantil.logErrorAndLine"></a>
### dantil.logErrorAndLine([getCallingLine], [...valN])
Prints error message like `dantil.logError()` followed by the file path and line number from which the parent function was called .

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [getCallingLine] | <code>Boolean</code> | Specify getting the line where `getLine()` is called instead of the line of the parent module. |
| [...valN] | <code>Mixed</code> | The optional values to print following "Error: ". |

<a name="module_dantil.logTrace"></a>
### dantil.logTrace([msg])
Prints the stack trace to the current position. Removes parentheses surrounding file paths for the iTerm open-file-path shortcut.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The optional message to print above the stack trace. |

<a name="module_dantil.assert"></a>
### dantil.assert([msg])
Prints calling file path and line number to mark reaching a section of code, prepended by `msg`.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The optional message to prepend line. |

**Example**  
```js
if (rareConditionIsTrue) {
  // Prints: "Condition met: /Users/Danny/test.js:9:12"
  dantil.assert('Condition met')
}
```
<a name="module_dantil.assertTrue"></a>
### dantil.assertTrue(value, [msg])
Prints calling file path and line number if `value` is truthy, prepended by `msg`.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | The value to check if truthy. |
| [msg] | <code>String</code> | The optional message to prepend line. |

**Example**  
```js
// If `myNumber > 100` is `true`, prints: "Condition met: /Users/Danny/test.js:9:12"
dantil.assertTrue(myNumber > 100, 'Condition met')
```
<a name="module_dantil.time"></a>
### dantil.time(label)
Starts a high-resolution timer (with precision in microseconds) identified by `label`. Use `dantil.timeEnd(label)` to print the timer's current value.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the timer. |

**Example**  
```js
// Start timer
dantil.time('my test')

// ...stuff...

// Prints "my test: 13.264ms"
dantil.timeEnd('my test')

// ...more stuff...

// Prints "my test: 31.183ms"
dantil.timeEnd('my test')
```
<a name="module_dantil.timeEnd"></a>
### dantil.timeEnd(label)
Prints the current high-resolution value of a timer initiated with `dantil.time(label)`.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the timer. |

<a name="module_dantil.count"></a>
### dantil.count(label)
Counts the number of times a section of code is reached, identified by `label`. Use `dantil.countEnd(label)` to print value. This is useful for profiling complex programs.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The id to refer to a section of code. |

**Example**  
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
}

// Prints "even: 50"; resets count for 'even' to 0
dantil.countEnd('even')
```
<a name="module_dantil.countEnd"></a>
### dantil.countEnd(label)
Prints (and resets the value of) the number of calls of `dantil.count(label)`.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the counter. |

<a name="module_dantil.countEndAll"></a>
### dantil.countEndAll()
Prints (and resets) the values of all counters used on `dantil.count()`. Will not print counters that are never reached (and never have their keys initialized).

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Example**  
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
  if (i % 2 === 1) dantil.count('odd')
  if (i > 100) dantil.count('never reached')
}

// Prints: "even: 50
//          odd: 50"
// Resets all counts to 0
dantil.countEndAll()
```
<a name="module_dantil.arraysEqual"></a>
### dantil.arraysEqual(a, b) ⇒ <code>Boolean</code>
Performs a shallow comparison between two arrays to determine if they are equivalent.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Returns**: <code>Boolean</code> - `true` if the arrays are equivalent, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | The array to compare. |
| b | <code>Array</code> | The other array to compare. |

**Example**  
```js
dantil.arraysEqual([], []) // -> true

dantil.arraysEqual([1, 2, 3, 'danny'], [1, 2, 3, 'danny']) // -> true

dantil.arraysEqual([ false, true ], [ true ]) // -> false

// A shallow comparison will not compare object properties
var objA = { prop: 'val' }
var objB = { prop: 'val' }
dantil.arraysEqual([ 1, 2, objA ], [ 1, 2, objB ]) // -> false

// Rather, objects are only equal if they are the same instance
dantil.arraysEqual([ objA, objB ], [ objA, objB ]) // -> true
```
<a name="module_dantil.cleanNumber"></a>
### dantil.cleanNumber(number) ⇒ <code>Number</code>
Removes extraneous digits from numbers resulting from operations limited by JavaScript's floating point number precision, such as `0.1 * 0.2` (which does not equal `0.02`). This limitation results from being unable to map `0.1` to a finite binary floating point number.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Returns**: <code>Number</code> - The number trimmed.  

| Param | Type | Description |
| --- | --- | --- |
| number | <code>Number</code> | The number to trim. |

**Example**  
```js
var number = 0.1 * 0.2 // -> 0.020000000000000004
number = dantil.cleanFloat(number) // -> 0.02
```
<a name="module_dantil.dashedToCamelCase"></a>
### dantil.dashedToCamelCase(dashedString) ⇒ <code>String</code>
Converts a dash-separated string to camelCase.

**Kind**: static method of <code>[dantil](#module_dantil)</code>  
**Returns**: <code>String</code> - The input string in camelCase.  

| Param | Type | Description |
| --- | --- | --- |
| dashedString | <code>String</code> | The dash-separated string to convert. |

**Example**  
```js
dantil.camelCase('my-long-variable-name') // -> 'myLongVariableName'
```
