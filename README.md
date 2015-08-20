<a name="module_danny-util"></a>
## danny-util
Project-agnostic utility functions for Node.js.

**Example**  
```js
var dannyUtil = require('./danny-util/danny-util.js')
```

* [danny-util](#module_danny-util)
  * [.illFormedOpts(schema, opts)](#module_danny-util.illFormedOpts) ⇒ <code>Boolean</code>
  * [.getLine(getCallingLine)](#module_danny-util.getLine) ⇒ <code>String</code>
  * [.arraysEqual(a, b)](#module_danny-util.arraysEqual) ⇒ <code>Boolean</code>
  * [.log([...valN])](#module_danny-util.log)
  * [.dir([...valN])](#module_danny-util.dir)
  * [.time(label)](#module_danny-util.time)
  * [.timeEnd(label)](#module_danny-util.timeEnd)
  * [.assert([msg])](#module_danny-util.assert)
  * [.assertTrue(value, [msg])](#module_danny-util.assertTrue)
  * [.count(label)](#module_danny-util.count)
  * [.countEnd(label)](#module_danny-util.countEnd)
  * [.countEndAll()](#module_danny-util.countEndAll)
  * [.printErr([msg], [...valN])](#module_danny-util.printErr)
  * [.printWarning([msg], [...valN])](#module_danny-util.printWarning)
  * [.printErrWithLine([msg], [...valN])](#module_danny-util.printErrWithLine)
  * [.logTrace([msg])](#module_danny-util.logTrace)
  * [.writeJSONFile(path, obj)](#module_danny-util.writeJSONFile)
  * [.tryCatchWrapper(callback)](#module_danny-util.tryCatchWrapper) ⇒ <code>Mixed</code>
  * [.deleteModuleCache(...pathN)](#module_danny-util.deleteModuleCache)
  * [.cleanNumber(number)](#module_danny-util.cleanNumber) ⇒ <code>Number</code>
  * [.dashedToCamelCase(dashedString)](#module_danny-util.dashedToCamelCase) ⇒ <code>String</code>

<a name="module_danny-util.illFormedOpts"></a>
### dannyUtil.illFormedOpts(schema, opts) ⇒ <code>Boolean</code>
Checks if an `opts` object adheres to a `schema`.
Simulates static function arguments (i.e., type checking and parameter count).
Prints descriptive, helpful errors when `opts` is ill-formed.

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
    // Descriptive, helpful errors are printed to console
    // Handle ill-formed `opts` how you choose
    throw new Error('ill-formed opts')
  }

  // ...stuff...
}
```
<a name="module_danny-util.getLine"></a>
### dannyUtil.getLine(getCallingLine) ⇒ <code>String</code>
Gets the file path and line number of the first item in the stack of the parent module from where this function was called. This is useful for logging where an object is instantiated.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>String</code> - The file path and line number of calling line.  

| Param | Type | Description |
| --- | --- | --- |
| getCallingLine | <code>Boolean</code> | If `true`, return line of where this function was called, else the line of the parent module. |

<a name="module_danny-util.arraysEqual"></a>
### dannyUtil.arraysEqual(a, b) ⇒ <code>Boolean</code>
Performs a shallow comparison between two arrays to determine if they are equivalent.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Boolean</code> - `true` if the arrays are equivalent, else `false`.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | The array to compare. |
| b | <code>Array</code> | The other array to compare. |

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

<a name="module_danny-util.time"></a>
### dannyUtil.time(label)
Starts a high-resolution timer (with precision in nanoseconds) identified by `label`. Use `dannyUtil.timeEnd(label)` to print the timer's current value.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the timer. |

**Example**  
```js
// Start timer
dannyUtil.time('my test')

// ...stuff...

// Prints "my test: 23.264491ms"
dannyUtil.timeEnd('my test')

// ...more stuff...

// Prints "my test: 36.183837ms"
dannyUtil.timeEnd('my test')
```
<a name="module_danny-util.timeEnd"></a>
### dannyUtil.timeEnd(label)
Prints the current high-resolution value of a timer initiated with `dannyUtil.time(label)`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The identifier of the timer. |

<a name="module_danny-util.assert"></a>
### dannyUtil.assert([msg])
Prints calling file path and line number to mark reaching a section of code, prepended by `msg`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The optional message to prepend line. |

<a name="module_danny-util.assertTrue"></a>
### dannyUtil.assertTrue(value, [msg])
Prints calling file path and line number if `value` is truthy, prepended by `msg`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | The value to check if truthy. |
| [msg] | <code>String</code> | The optional message to prepend line. |

<a name="module_danny-util.count"></a>
### dannyUtil.count(label)
Counts the number of times a section of code is reached, identified by `label`.
Use `countEnd(label)` to print value.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The id to refer to a section of code. |

<a name="module_danny-util.countEnd"></a>
### dannyUtil.countEnd(label)
Prints the number of calls of `count()` with `label`.
Resets the count of calls to `label` when called.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | The id to refer to calls to `count()`. |

<a name="module_danny-util.countEndAll"></a>
### dannyUtil.countEndAll()
Prints the values of all counters used on `count()`.
Will not print counters that are never reached (and never have their keys initialized).
Reset all counts.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
<a name="module_danny-util.printErr"></a>
### dannyUtil.printErr([msg], [...valN])
Prints like `console.log()`, but color first argument red, prepend message with "Err:".

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The error message to color red and append to "Err:". |
| [...valN] | <code>Mixed</code> | The values to print following error message. |

<a name="module_danny-util.printWarning"></a>
### dannyUtil.printWarning([msg], [...valN])
Prints like `console.log()`, but color first argument yellow, prepend with "Warning:".

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The warning message to color yellow and append to "Warning:". |
| [...valN] | <code>Mixed</code> | The values to print following warning message. |

<a name="module_danny-util.printErrWithLine"></a>
### dannyUtil.printErrWithLine([msg], [...valN])
Prints error message like `printErr()` and line from which the parent function was called (using `getLine()`).

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The error message to color red and append to "Err:". |
| [...valN] | <code>Mixed</code> | The values to print following error message. |

<a name="module_danny-util.logTrace"></a>
### dannyUtil.logTrace([msg])
Prints stack trace to the current position.
Removes parentheses from stack for iTerm open-file-path shortcut.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | The optional message to print above stack. |

<a name="module_danny-util.writeJSONFile"></a>
### dannyUtil.writeJSONFile(path, obj)
Writes an object to a JSON file.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | The path to write file. |
| obj | <code>Object</code> | The object to save to file. |

<a name="module_danny-util.tryCatchWrapper"></a>
### dannyUtil.tryCatchWrapper(callback) ⇒ <code>Mixed</code>
Executes the passed function within a `try` block.
Removes parentheses from error stack for iTerm open-file-path shortcut.
Colors error type name red (e.g., 'ReferenceError').

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Mixed</code> - The value returned by `callback`.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The function to execute within `try` block. |

<a name="module_danny-util.deleteModuleCache"></a>
### dannyUtil.deleteModuleCache(...pathN)
Deletes modules from cache, forcing them to be reloaded at next `require()` call. Without removing a module from cache, subsequent `require()` calls to the same module will not enable changes to its file(s).
This is useful for debugging code on a server without restarting the server.

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
<a name="module_danny-util.cleanNumber"></a>
### dannyUtil.cleanNumber(number) ⇒ <code>Number</code>
Remove extraneous digits from numbers resulting from operations limited by JavaScript's floating point number precision, such as `0.1 * 0.2` (which does not equal `0.02`). This limitation results from being unable to map `0.1` to a finite binary floating point number.

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
Convert a dash-separated string to camelCase.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>String</code> - The input string in camelCase.  

| Param | Type | Description |
| --- | --- | --- |
| dashedString | <code>String</code> | The dash-separated string to convert. |

**Example**  
```js
dannyUtil.camelCase('my-long-variable-name') // -> 'myLongVariableName'
```
