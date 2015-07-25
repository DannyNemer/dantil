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
  * [.arraysMatch(a, b)](#module_danny-util.arraysMatch) ⇒ <code>Boolean</code>
  * [.log([...valN])](#module_danny-util.log)
  * [.assert([msg])](#module_danny-util.assert)
  * [.assertTrue(value, [msg])](#module_danny-util.assertTrue)
  * [.count(key)](#module_danny-util.count)
  * [.printCount(key)](#module_danny-util.printCount)
  * [.printCounts()](#module_danny-util.printCounts)
  * [.printErr([msg], [...valN])](#module_danny-util.printErr)
  * [.printWarning([msg], [...valN])](#module_danny-util.printWarning)
  * [.printErrWithLine([msg], [...valN])](#module_danny-util.printErrWithLine)
  * [.logTrace([msg])](#module_danny-util.logTrace)
  * [.writeJSONFile(path, obj)](#module_danny-util.writeJSONFile)
  * [.tryCatchWrapper(callback)](#module_danny-util.tryCatchWrapper) ⇒ <code>Mixed</code>
  * [.deleteModuleCache(...pathN)](#module_danny-util.deleteModuleCache)

<a name="module_danny-util.illFormedOpts"></a>
### dannyUtil.illFormedOpts(schema, opts) ⇒ <code>Boolean</code>
Check if an `opts` object matches a `schema`.
Simulates static function arguments (i.e., type checking and parameter count).
Prints descriptive, helpful errors when `opts` is ill-formed.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Boolean</code> - Whether `opts` is ill-formed.  

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>Object</code> | Definition of required or optional properties and their expected values in `opts`. |
| opts | <code>Object</code> | The options object to check if conforms to `schema`. |

**Example**  
```js
// Example `schema`:
{
  num: Number,                                  // Must be of type `Number`
  list: { type: Array },                        // Must be of type `Array` (identical to previous parameter)
  strings: { type: Array, arrayType: String },  // Must be `Array` containing only String
  str: { type: String, optional: true },        // Parameter can be omitted
  val: [ 'red', 'yellow', 'blue' ]              // Must be one of predefined values
}
```
<a name="module_danny-util.getLine"></a>
### dannyUtil.getLine(getCallingLine) ⇒ <code>String</code>
Get file path and line number of the first item in the stack of the parent module from where this function was called.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>String</code> - File path and line number of calling line.  

| Param | Type | Description |
| --- | --- | --- |
| getCallingLine | <code>Boolean</code> | If true, return line of where this function was called (i.e., not parent module). |

<a name="module_danny-util.arraysMatch"></a>
### dannyUtil.arraysMatch(a, b) ⇒ <code>Boolean</code>
Compare shallow-level elements in a pair of arrays.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Boolean</code> - Whether arrays contain identical contents.  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Array</code> | Array to compare. |
| b | <code>Array</code> | Array to compare. |

<a name="module_danny-util.log"></a>
### dannyUtil.log([...valN])
Print-print objects (on separate lines).

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [...valN] | <code>Mixed</code> | Values to print. |

<a name="module_danny-util.assert"></a>
### dannyUtil.assert([msg])
Print calling file path and line number to mark reaching a section of code, prepended by `msg`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | Optional message to prepend line. |

<a name="module_danny-util.assertTrue"></a>
### dannyUtil.assertTrue(value, [msg])
Print calling file path and line number if `value` is truthy, prepended by `msg`.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Boolean</code> | Value to check if truthy. |
| [msg] | <code>String</code> | Optional message to prepend line. |

<a name="module_danny-util.count"></a>
### dannyUtil.count(key)
Count number of times a section of code is reached, identified by `key`.
Use `printCount(key)` to print value.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Id to refer to a section of code. |

<a name="module_danny-util.printCount"></a>
### dannyUtil.printCount(key)
Print number of calls of `count()` with `key`.
Reset the count of calls to `key` when called.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>String</code> | Id to refer to calls to `count()`. |

<a name="module_danny-util.printCounts"></a>
### dannyUtil.printCounts()
Print values of all counters used on `count()`.
Will not print counters that are never reached (and never have their keys initialized).
Reset all counts.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
<a name="module_danny-util.printErr"></a>
### dannyUtil.printErr([msg], [...valN])
Print like `console.log()`, but color first argument red, prepend message with "Err:".

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | Error message to color red and append to "Err:". |
| [...valN] | <code>Mixed</code> | Values to print following error message. |

<a name="module_danny-util.printWarning"></a>
### dannyUtil.printWarning([msg], [...valN])
Print like `console.log()`, but color first argument yellow, prepend with 'Warning:'.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | Warning message to color yellow and append to 'Warning:'. |
| [...valN] | <code>Mixed</code> | Values to print following warning message. |

<a name="module_danny-util.printErrWithLine"></a>
### dannyUtil.printErrWithLine([msg], [...valN])
Print error message like `printErr()` and line from which the parent function was called (using `getLine()`).

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | Error message to color red and append to 'Err:'. |
| [...valN] | <code>Mixed</code> | Values to print following error message. |

<a name="module_danny-util.logTrace"></a>
### dannyUtil.logTrace([msg])
Print stack trace to the current position.
Remove parentheses from stack for iTerm open-file-path shortcut.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| [msg] | <code>String</code> | Optional message to print above stack. |

<a name="module_danny-util.writeJSONFile"></a>
### dannyUtil.writeJSONFile(path, obj)
Write an object to a JSON file.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| path | <code>String</code> | Path to write file. |
| obj | <code>Object</code> | Object to save to file. |

<a name="module_danny-util.tryCatchWrapper"></a>
### dannyUtil.tryCatchWrapper(callback) ⇒ <code>Mixed</code>
Execute the passed function within a `try` block.
Remove parentheses from error stack for iTerm open-file-path shortcut.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  
**Returns**: <code>Mixed</code> - Value returned by `callback`.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | Function to execute within `try` block. |

<a name="module_danny-util.deleteModuleCache"></a>
### dannyUtil.deleteModuleCache(...pathN)
Delete modules from cache, forcing them to be reloaded at next `require()` call.
Useful for debugging code on a server without restarting the server.

**Kind**: static method of <code>[danny-util](#module_danny-util)</code>  

| Param | Type | Description |
| --- | --- | --- |
| ...pathN | <code>String</code> | Paths of modules to remove from cache. |

