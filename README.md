# dantil

A Node.js utility library.

In addition to [much](#dantil-illFormedOpts) [original](#dantil-stdoutToFile) [functionality](#dantil-getModuleCallerPathAndLineNumber), includes [many](#dantil-log) [improved](#dantil-time) [alternatives](#dantil-tryCatchWrapper) [to](#dantil-assertEqual) native functions.

#### Installation
```shell
npm install dannynemer/dantil
```

#### Usage
```js
var dantil = require('dantil')
```

<!-- div class="toc-container" -->

<!-- div -->

## `Utility`
* <a href="#dantil-illFormedOpts">`dantil.illFormedOpts`</a>
* <a href="#dantil-tryCatchWrapper">`dantil.tryCatchWrapper`</a>
* <a href="#dantil-deleteModuleCache">`dantil.deleteModuleCache`</a>
* <a href="#dantil-getPathAndLineNumber">`dantil.getPathAndLineNumber`</a>
* <a href="#dantil-getModuleCallerPathAndLineNumber">`dantil.getModuleCallerPathAndLineNumber`</a>
* <a href="#dantil-colors">`dantil.colors`</a>

<!-- /div -->

<!-- div -->

## `File System`
* <a href="#dantil-stdoutToFile">`dantil.stdoutToFile`</a>
* <a href="#dantil-writeJSONFile">`dantil.writeJSONFile`</a>
* <a href="#dantil-pathAndLineNumbersOf">`dantil.pathAndLineNumbersOf`</a>
* <a href="#dantil-firstPathAndLineNumberOf">`dantil.firstPathAndLineNumberOf`</a>
* <a href="#dantil-expandHomeDir">`dantil.expandHomeDir`</a>
* <a href="#dantil-realpathSync">`dantil.realpathSync`</a>

<!-- /div -->

<!-- div -->

## `Console`
* <a href="#dantil-log">`dantil.log`</a>
* <a href="#dantil-dir">`dantil.dir`</a>
* <a href="#dantil-logWithLine">`dantil.logWithLine`</a>
* <a href="#dantil-dirWithLine">`dantil.dirWithLine`</a>
* <a href="#dantil-logStderr">`dantil.logStderr`</a>
* <a href="#dantil-stylize">`dantil.stylize`</a>
* <a href="#dantil-logError">`dantil.logError`</a>
* <a href="#dantil-logWarning">`dantil.logWarning`</a>
* <a href="#dantil-logSuccess">`dantil.logSuccess`</a>
* <a href="#dantil-logErrorAndPath">`dantil.logErrorAndPath`</a>
* <a href="#dantil-logPathAndObject">`dantil.logPathAndObject`</a>
* <a href="#dantil-logTrace">`dantil.logTrace`</a>
* <a href="#dantil-logLine">`dantil.logLine`</a>
* <a href="#dantil-logLineIf">`dantil.logLineIf`</a>
* <a href="#dantil-prettifyStackTrace">`dantil.prettifyStackTrace`</a>

<!-- /div -->

<!-- div -->

## `Profiling`
* <a href="#dantil-assertEqual">`dantil.assertEqual`</a>
* <a href="#dantil-time">`dantil.time`</a>
* <a href="#dantil-timeEnd">`dantil.timeEnd`</a>
* <a href="#dantil-count">`dantil.count`</a>
* <a href="#dantil-countEnd">`dantil.countEnd`</a>
* <a href="#dantil-countEndAll">`dantil.countEndAll`</a>

<!-- /div -->

<!-- div -->

## `Lang`
* <a href="#dantil-isDeepEqual">`dantil.isDeepEqual`</a>

<!-- /div -->

<!-- div -->

## `Array`
* <a href="#dantil-arraysEqual">`dantil.arraysEqual`</a>

<!-- /div -->

<!-- div -->

## `Object`
* <a href="#dantil-objectsEqual">`dantil.objectsEqual`</a>
* <a href="#dantil-deleteUndefinedObjectProps">`dantil.deleteUndefinedObjectProps`</a>
* <a href="#dantil-diffObjects">`dantil.diffObjects`</a>

<!-- /div -->

<!-- div -->

## `Number`
* <a href="#dantil-cleanFloat">`dantil.cleanFloat`</a>

<!-- /div -->

<!-- div -->

## `String`
* <a href="#dantil-diffStrings">`dantil.diffStrings`</a>
* <a href="#dantil-format">`dantil.format`</a>
* <a href="#dantil-kebabToCamelCase">`dantil.kebabToCamelCase`</a>
* <a href="#dantil-camelToKebabCase">`dantil.camelToKebabCase`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Utility” Methods`

<!-- div -->

### <a id="dantil-illFormedOpts"></a>`dantil.illFormedOpts(schema, options)`
<a href="#dantil-illFormedOpts">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L52 "View in source") [&#x24C9;][1]

Checks if `options` adheres to `schema` using the [`ill-formed-opts`] (https://github.com/DannyNemer/ill-formed-opts) module, thereby simulating static function arguments (i.e., type checking and parameter count). Prints descriptive, helpful errors messages when `options` is ill-formed, including the line number of the offending function call.

#### Arguments
1. `schema` *(Object)*: The definition of required and optional properties for `options`.
2. `options` *(Object)*: The options object to check for conformity to `schema`.

#### Returns
*(boolean)*:  Returns `true` if `options` is ill-formed, else `false`.

#### Example
```js
var schema = {
  // Optionally accept an `boolean` for 'silent'.
  silent: Boolean,
  // Optionally accept an `Array` of `string`s for 'args'.
  args: { type: Array, arrayType: String },
  // Require `string` 'modulePath'.
  modulePath: { type: String, required: true },
  // Optionally accept one of predefined values for 'stdio'.
  stdio: { values: [ 'pipe', 'ignore', 0, 1, 2 ] }
}

function myFork(options) {
  if (illFormedOpts(schema, options)) {
    // => Prints descriptive, helpful error message

    throw new Error('Ill-formed options')
  }

  // ...stuff...
}
```
```js
myFork({ modulePath: './myModule.js', stdio: 'out' })
// => Prints: Error: Unrecognized value for 'stdio': 'out'
//                   Acceptable values for 'stdio': [ 'pipe', 'ignore', 0, 1, 2 ]
//
//            /Users/Danny/foo.js:22
//              { modulePath: './myModule.js', stdio: 'out' }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-tryCatchWrapper"></a>`dantil.tryCatchWrapper(func, [exitProcessIfFailure])`
<a href="#dantil-tryCatchWrapper">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L71 "View in source") [&#x24C9;][1]

Invokes `func` within a `try` block. If an exception is thrown, removes parentheses surrounding file paths in its stack trace for iTerm's open-file-path shortcut, collects 15 stack frames instead of 10 (the default), and colors the error type name (e.g., `TypeError`) red.

#### Arguments
1. `func` *(Function)*: The function invoked within a `try` block.
2. `[exitProcessIfFailure]` *(boolean)*: Specify ending the process with 'failure' code `1` *(after printing its stack trace)* should `func` throw an exception. The shell that executed Node will see an exit code of `1`.

#### Returns
*(&#42;)*:  Returns the return value of `func`, if any.

#### Example
```js
dantil.tryCatchWrapper(function () {
  // ...stuff...
  throw new Error('test failed')
})
// => Catches thrown exception and prints a formatted stack trace
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-deleteModuleCache"></a>`dantil.deleteModuleCache([paths])`
<a href="#dantil-deleteModuleCache">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L132 "View in source") [&#x24C9;][1]

Deletes the modules identified by the provided paths from cache, forcing them to be reloaded at next `require()` call. Without removing a module from cache, subsequent `require()` calls to the same module will not enable changes to its file(s). This is useful for enabling changes on a server without restarting the server.

#### Arguments
1. `[paths]` *(...string)*: The paths of modules to remove from cache.

#### Example
```js
var myModule = require('./myModule.js')
// => Loads module

dantil.deleteModuleCache('./myModule.js')
// => Removes module from cache

myModule = require('./myModule.js')
// => Loads module again, enabling changes to './myModule.js'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-getPathAndLineNumber"></a>`dantil.getPathAndLineNumber()`
<a href="#dantil-getPathAndLineNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L152 "View in source") [&#x24C9;][1]

Gets the file path and line number in the format `filePath:lineNumber` of where this function is invoked.

#### Returns
*(string)*:  Returns the file path and line number in the format `filePath:lineNumber`.

#### Example
```js
// The contents of 'foo.js':

dantil.getPathAndLineNumber()
// => '/Users/Danny/foo.js:1'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-getModuleCallerPathAndLineNumber"></a>`dantil.getModuleCallerPathAndLineNumber()`
<a href="#dantil-getModuleCallerPathAndLineNumber">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L223 "View in source") [&#x24C9;][1]

Gets the file path and line number of the function call that invoked the currently executing module. Returns the path and line number in the format `filePath:lineNumber`.
<br>
<br>
This is not necessarily the caller of the currently executing function, which can be another function within the same module. Nor is it necessarily this module's parent which instantiated the module. Rather, it is the most recent function call in the stack outside the currently executing module.
<br>
<br>
Returns `undefined` if there is no other module in the stack below where this function was called.

#### Returns
*(string)*:  Returns the file path and line number in the format `filePath:lineNumber`.

#### Example
```js
// The contents of 'main.js':

var child = require('./child.js')
child.func()

var grandchild = require('./grandchild.js')
grandchild.foo()

// Try to get the frame of the nonexistent function call that invoked this module.
dantil.getModuleCallerPathAndLineNumber()
// => undefined
```

```js
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

```js
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

### <a id="dantil-colors"></a>`dantil.colors`
<a href="#dantil-colors">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L300 "View in source") [&#x24C9;][1]

(Object): Stylizes strings for printing to the console using the [`chalk`](https://github.com/chalk/chalk) module.

#### Example
```js
console.log(dantil.colors.red('Error'))
// => Prints red-colored "Error"
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“File System” Methods`

<!-- div -->

### <a id="dantil-stdoutToFile"></a>`dantil.stdoutToFile(path, func)`
<a href="#dantil-stdoutToFile">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L328 "View in source") [&#x24C9;][1]

Invokes `func` while synchronously writing the process's `stdout` to a file at `path` instead of the console. Creates the file if it does not exist or truncates the file to zero length if it does exist. Restores `stdout` to the console when `func` completes or if an exception is thrown.

#### Arguments
1. `path` *(string)*: The path where to write `stdout`.
2. `func` *(Function)*: The function to invoke while writing output to `path`.

#### Returns
*(&#42;)*:  Returns the value returned by `func`, if any.

#### Example
```js
// Print to console.
console.log('Begin output to file')

// Redirect `stdout` from console to '~/Desktop/out.txt'.
dantil.stdoutToFile('~/Desktop/out.txt', function () {
  console.log('Numbers:')
  for (var i = 0; i < 100; ++i) {
    console.log(i)
  }
})
// => Restores `stdout` to console and prints "Output saved: ~/Desktop/out.txt"

// Print to console (after restoring `stdout`).
console.log('Output to file complete')
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-writeJSONFile"></a>`dantil.writeJSONFile(path, obj)`
<a href="#dantil-writeJSONFile">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L389 "View in source") [&#x24C9;][1]

Stringifies and writes `obj` to a JSON file at `path`.

#### Arguments
1. `path` *(string)*: The file path to write to.
2. `obj` *(Object)*: The object to save to `path`.

#### Example
```js
var obj = {
  name: 'foo',
  value: 7,
  list: [ 'apple', 'orange' ]
}

dantil.writeJSONFile('./myObj.json', obj)
// => Writes file and prints "File saved: /Users/Danny/myObj.json"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-pathAndLineNumbersOf"></a>`dantil.pathAndLineNumbersOf(filePath, value, stringify)`
<a href="#dantil-pathAndLineNumbersOf">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L431 "View in source") [&#x24C9;][1]

Gets the file path and line number in the format `filePath:lineNumber` of each occurrence of `value` in the source file at `filePath`. This is useful for error reporting.

#### Arguments
1. `filePath` *(string)*: The path of the source file to search.
2. `value` *(&#42;)*: The value to search for.
3. `stringify` *(boolean)*: Specify converting `value` to a string representation before searching.

#### Returns
*(Array)*:  Returns the file path and line number of each matched line.

#### Example
```js
// The contents of 'foo.js':

var list = [
  { name: 'lorem', value: 2 },
  { name: 'lorem ipsum', value: 5 },
  { name: 'ipsum', value: 3 }
]
```

```js
// The contents of 'bar.js':

dantil.pathAndLineNumbersOf('./foo.js', 'ipsum')
// => [ '/Users/Danny/foo.js:4', '/Users/Danny/foo.js:3' ]

dantil.pathAndLineNumbersOf('./foo.js', 'ipsum', true)
// => [ '/Users/Danny/foo.js:4' ]
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-firstPathAndLineNumberOf"></a>`dantil.firstPathAndLineNumberOf(filePath, value, stringify)`
<a href="#dantil-firstPathAndLineNumberOf">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L471 "View in source") [&#x24C9;][1]

Gets the file path and line number in the format `filePath:lineNumber` of the first occurrence of `value` in the source file at `filePath`. This is useful for error reporting.

#### Arguments
1. `filePath` *(string)*: The path of the source file to search.
2. `value` *(&#42;)*: The value to search for.
3. `stringify` *(boolean)*: Specify converting `value` to a string representation before searching.

#### Returns
*(string|undefined)*:  Returns the file path and line number of the matched line, else `undefined`.

#### Example
```js
// The contents of 'foo.js':

var list = [
  { name: 'lorem', value: 2 },
  { name: 'lorem ipsum', value: 5 },
  { name: 'ipsum', value: 3 }
]
```

```js
// The contents of 'bar.js':

dantil.firstPathAndLineNumberOf('./foo.js', 'ipsum')
// => '/Users/Danny/foo.js:3',

dantil.firstPathAndLineNumberOf('./foo.js', 'ipsum', true)
// => '/Users/Danny/foo.js:4'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-expandHomeDir"></a>`dantil.expandHomeDir(path)`
<a href="#dantil-expandHomeDir">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L530 "View in source") [&#x24C9;][1]

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

### <a id="dantil-realpathSync"></a>`dantil.realpathSync(path)`
<a href="#dantil-realpathSync">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L547 "View in source") [&#x24C9;][1]

Synchronously resolves `path` to an absolute path. Similar to Node's `fs.realpathSync()`, but also expands `'~'` if found in `path` (using `dantil.expandHomeDir()`).

#### Arguments
1. `path` *(string)*: The path to resolve.

#### Returns
*(string)*:  Returns the absolute path.

#### Example
```js
dantil.realpathSync('~/Desktop/../../Danny')
// => '/Users/Danny'
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Console” Methods`

<!-- div -->

### <a id="dantil-log"></a>`dantil.log([values])`
<a href="#dantil-log">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L579 "View in source") [&#x24C9;][1]

Pretty-prints the provided values and objects to `stdout`, in color, recursing 2 times while formatting objects (which is the behavior of `console.log()`).
<br>
<br>
Formats plain `Object`s and `Array`s with multi-line string representations on separate lines. Concatenates and formats all other consecutive values on the same line.
<br>
<br>
If the first argument is of a complex type (e.g., `Object`, `Array`), left-aligns all remaining lines. Otherwise, equally indents each line after the first line, if any. If the first argument has leading whitespace, prepends all remaining arguments with the same whitespace excluding line breaks. If the first argument is entirely whitespace, excludes that argument from output and indents all remaining arguments with that whitespace.

#### Arguments
1. `[values]` *(...&#42;)*: The values and objects to print.

#### Example
```js
dantil.log({
  name: 'Danny',
  value: 3,
  terms: [ 'confident', 'farseeing', 'capable', 'prudent' ],
  exitFunc: process.exit,
  deepObject: {
    nestedArray: [ [ 1 ] ],
    nestedObject: { obj: { str: 'string', num: 2, bool: true, arr: [ 1, 2, 3, 4, 5, 6, 7 ] } }
  }
})
```
Output:
<br><img src="https://raw.githubusercontent.com/DannyNemer/dantil/master/doc/img/dantil-log-example.jpg" alt="dantil.log() example output"/>
```
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-dir"></a>`dantil.dir([values])`
<a href="#dantil-dir">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L607 "View in source") [&#x24C9;][1]

A version of `dantil.log()` that recurses indefinitely while formatting objects. This is useful for inspecting large, complicated objects.

#### Arguments
1. `[values]` *(...&#42;)*: The values and objects to print.

#### Example
```js
dantil.dir({
  name: 'Danny',
  value: 3,
  terms: [ 'confident', 'farseeing', 'capable', 'prudent' ],
  exitFunc: process.exit,
  deepObject: {
    nestedArray: [ [ 1 ] ],
    nestedObject: { obj: { str: 'string', num: 2, bool: true, arr: [ 1, 2, 3, 4, 5, 6, 7 ] } }
  }
})
```
Output:
<br><img src="https://raw.githubusercontent.com/DannyNemer/dantil/master/doc/img/dantil-dir-example.jpg" alt="dantil.dir() example output"/>
```
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logWithLine"></a>`dantil.logWithLine([values])`
<a href="#dantil-logWithLine">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L620 "View in source") [&#x24C9;][1]

Prints the provided values like `dantil.log()`, along with the calling file path and line number.

#### Arguments
1. `[values]` *(...&#42;)*: The values and objects to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-dirWithLine"></a>`dantil.dirWithLine([values])`
<a href="#dantil-dirWithLine">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L633 "View in source") [&#x24C9;][1]

Prints the provided values like `dantil.dir()`, along with the calling file path and line number.

#### Arguments
1. `[values]` *(...&#42;)*: The values and objects to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logStderr"></a>`dantil.logStderr([values])`
<a href="#dantil-logStderr">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L646 "View in source") [&#x24C9;][1]

A version of `dantil.log()` that prints to `stderr`.

#### Arguments
1. `[values]` *(...&#42;)*: The values and objects to print.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-stylize"></a>`dantil.stylize(object, [options])`
<a href="#dantil-stylize">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L760 "View in source") [&#x24C9;][1]

Formats `object` in color for pretty-printing, recursing `options.depth` times while formatting. This is similar to Node's `util.inspect()`, but prints in color by default if the terminal supports color.

#### Arguments
1. `object` *(&#42;)*: The object or value to stylize.
2. `[options]` *(Object)*: The options object.
3. `[options.colors=true]` *(boolean)*: Specify coloring the string for pretty-printing.
4. `[options.depth=2]` *(number)*: The number of times to recurse while formating `object`. Pass `null` to recurse indefinitely.

#### Returns
*(string)*:  Returns a stylized string representation of `object`.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logError"></a>`dantil.logError([values])`
<a href="#dantil-logError">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L785 "View in source") [&#x24C9;][1]

Prints the provided values to `stdout` like `dantil.log()`, prepended with red-colored "Error: ".

#### Arguments
1. `[values]` *(...&#42;)*: The values to print following "Error: ".

#### Example
```js
dantil.logError('Property undefined:', obj)
// => Prints "Error: Value undefined: { property: undefined }"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logWarning"></a>`dantil.logWarning([values])`
<a href="#dantil-logWarning">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L802 "View in source") [&#x24C9;][1]

Prints the provided values to `stdout` like `dantil.log()` prepended with yellow-colored "Warning: ".

#### Arguments
1. `[values]` *(...&#42;)*: The values to print following "Warning: ".

#### Example
```js
dantil.logWarning('Values unused:', obj)
// => Prints "Warning: Value unused: { property: undefined }"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logSuccess"></a>`dantil.logSuccess([values])`
<a href="#dantil-logSuccess">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L819 "View in source") [&#x24C9;][1]

Prints the provided values to `stdout` like `dantil.log()` prepended with green-colored "Success: ".

#### Arguments
1. `[values]` *(...&#42;)*: The values to print following "Success: ".

#### Example
```js
dantil.logSuccess(tests.length, 'tests passed')
// => Prints "Success: 47 tests passed"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logErrorAndPath"></a>`dantil.logErrorAndPath([logThisLine], [values])`
<a href="#dantil-logErrorAndPath">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L860 "View in source") [&#x24C9;][1]

Prints an error message like `dantil.logError()` followed by the file path and line number of the function call that invoked the currently executing module.

#### Arguments
1. `[logThisLine]` *(boolean)*: Specify logging the line where this function is called instead of the line which invoked the currently executing module.
2. `[values]` *(...&#42;)*: The optional values and objects to print following "Error: ".

#### Example
```js
// The contents of 'foo.js':

dantil.logErrorAndPath('Property undefined:', obj)
// => Prints: Error: Value undefined: { property: undefined }
//              /Users/Danny/foo.js:1
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logPathAndObject"></a>`dantil.logPathAndObject(object, logThisLine)`
<a href="#dantil-logPathAndObject">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L901 "View in source") [&#x24C9;][1]

Prints `object` preceded by the file path and line number of the function call that invoked the currently executing module. Surrounds output with a leading newline and a trailing newline.

#### Arguments
1. `object` *(Object)*: The object to print.
2. `logThisLine` *(boolean)*: Specify logging the line where this function is called instead of the line which invoked the currently executing module.

#### Example
```js
// The contents of 'foo.js':

var obj = {
  values: [1, 2, 3],
  name: 'danny'
}

dantil.logPathAndObject(obj)
// => Prints: /Users/Danny/foo.js:6
//              { values: [ 1, 2, 3 ], name: 'danny' }
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logTrace"></a>`dantil.logTrace([message])`
<a href="#dantil-logTrace">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L926 "View in source") [&#x24C9;][1]

Prints the stack trace to the current position. Removes parentheses surrounding file paths for iTerm's open-file-path shortcut.

#### Arguments
1. `[message]` *(string)*: The optional message to print above the stack trace.

#### Example
```js
if (obscureCondition) {
  dantil.logTrace('Reached obscure condition')
  // => Prints: Trace: Reached obscure condition
  //               at Object.<anonymous> /Users/Danny/test.js:4:9
  //               at Module._compile (module.js:460:26)
  //               ...
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logLine"></a>`dantil.logLine([message])`
<a href="#dantil-logLine">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L956 "View in source") [&#x24C9;][1]

Prints the calling file path and line number, prepended by optional `message`. This is useful for marking reaching a section of code.

#### Arguments
1. `[message]` *(string)*: The optional message to prepend to the path and line number.

#### Example
```js
// The contents of 'foo.js':

if (rareConditionIsTrue) {
  dantil.logLine('Condition met')
  // => Prints "Condition met: /Users/Danny/foo.js:2"
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-logLineIf"></a>`dantil.logLineIf(value, [message])`
<a href="#dantil-logLineIf">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L976 "View in source") [&#x24C9;][1]

If `value` is truthy, prints the calling file path and line number, prepended by optional `message`. This is useful for marking reaching a section of code.

#### Arguments
1. `value` *(boolean)*: The value to check if truthy.
2. `[message]` *(string)*: The optional message to prepend to the path and line number.

#### Example
```js
// The contents of 'foo.js':

var myCondition = true
dantil.logLineIf(myCondition, 'Condition met')
// => Prints "Condition met: /Users/Danny/foo.js:1"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-prettifyStackTrace"></a>`dantil.prettifyStackTrace`
<a href="#dantil-prettifyStackTrace">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L999 "View in source") [&#x24C9;][1]

Modifies V8's default stack trace format (when printing) to color function names and not surround file paths with parentheses. The latter is useful for iTerm's open-file-path shortcut (which the parentheses would otherwise break).

#### Example
```js
dantil.prettifyStackTrace()
// => Prettifies all subsequent stack traces
```
Before:
<br><img src="https://raw.githubusercontent.com/DannyNemer/dantil/master/doc/img/dantil-prettifyStackTrace-example-before.jpg" alt="Before invoking dantil.prettifyStackTrace()"/>
After:
<br><img src="https://raw.githubusercontent.com/DannyNemer/dantil/master/doc/img/dantil-prettifyStackTrace-example-after.jpg" alt="After invoking dantil.prettifyStackTrace()"/>
```
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Profiling” Methods`

<!-- div -->

### <a id="dantil-assertEqual"></a>`dantil.assertEqual(value, other, [message])`
<a href="#dantil-assertEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1064 "View in source") [&#x24C9;][1]

Tests shallow, coercive equality with the equal comparison operator (`==`). If the test fails, prints an error message and the file path and line number to `stderr`. In contrast, Node's `assert.equal()` throws an exception.

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
// => Prints: AssertionError: 20 == 21
//              /Users/Danny/foo.js:5

dantil.assertEqual({ prop: 'value' }, { prop: 'value' })
// => false
// => Prints: AssertionError: { prop: 'value' } == { prop: 'value' }
//              /Users/Danny/foo.js:9

dantil.assertEqual([ 3, 1, 4 ], [ 1, 5, 9 ], 'Array test failed')
// => false
// => Prints: AssertionError: Array test failed: [ 3, 1, 4 ] == [ 1, 5, 9 ]
//              /Users/Danny/foo.js:14

if (dantil.assertEqual(myArray.length, 100)) {
  // => true

  // ...stuff...
}
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-time"></a>`dantil.time(label)`
<a href="#dantil-time">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1108 "View in source") [&#x24C9;][1]

Starts a high-resolution timer (with precision in microseconds) identified by `label`. Use `dantil.timeEnd(label)` to print the timer's current value.

#### Arguments
1. `label` *(string)*: The timer identifier.

#### Example
```js
// Start timer
dantil.time('my test')

// ...stuff...

dantil.timeEnd('my test')
// => Prints "my test: 13.264 ms"

// ...more stuff...

dantil.timeEnd('my test')
// => Prints "my test: 31.183 ms"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-timeEnd"></a>`dantil.timeEnd(label)`
<a href="#dantil-timeEnd">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1118 "View in source") [&#x24C9;][1]

Prints the current high-resolution value of a timer initiated with `dantil.time(label)`.

#### Arguments
1. `label` *(string)*: The timer identifier.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-count"></a>`dantil.count(label)`
<a href="#dantil-count">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1145 "View in source") [&#x24C9;][1]

Counts the number of times a section of code is reached, identified by `label`. Use `dantil.countEnd(label)` to print the counter's value. This is useful for profiling complex programs.

#### Arguments
1. `label` *(string)*: The counter identifier.

#### Example
```js
for (var i = 0; i < 100; ++i) {
  if (i % 2 === 0) dantil.count('even')
}

dantil.countEnd('even')
// => Resets the count for 'even' to 0
// => Prints "even: 50"
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-countEnd"></a>`dantil.countEnd(label)`
<a href="#dantil-countEnd">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1155 "View in source") [&#x24C9;][1]

Prints (and resets the value of) the number of calls of `dantil.count(label)`.

#### Arguments
1. `label` *(string)*: The counter identifier.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-countEndAll"></a>`dantil.countEndAll`
<a href="#dantil-countEndAll">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1176 "View in source") [&#x24C9;][1]

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

<!-- /div -->

<!-- div -->

## `“Lang” Methods`

<!-- div -->

### <a id="dantil-isDeepEqual"></a>`dantil.isDeepEqual(value, other, [customizer], [thisArg])`
<a href="#dantil-isDeepEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1211 "View in source") [&#x24C9;][1]

Performs a deep comparison between two values to determine if they are equivalent using lodash's [`_.isEqual`](https://www.npmjs.com/package/lodash.isequal) method.

#### Arguments
1. `value` *(&#42;)*: The value to compare.
2. `other` *(&#42;)*: The other value to compare.
3. `[customizer]` *(Function)*: The function to customize value comparisons.
4. `[thisArg]` *(&#42;)*: The `this` binding of `customizer`.

#### Returns
*(boolean)*:  Returns `true` if the values are equivalent, else `false`.

#### Example
```js
var object = { 'user': 'fred' }
var other = { 'user': 'fred' }

object == other
// => false

dantil.isEqualDeep(object, other)
// => true

// Using a customizer callback.
var array = [ 'hello', 'goodbye' ]
var other = [ 'hi', 'goodbye' ]

dantil.isEqualDeep(array, other, function (value, other) {
  if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
    return true
  }
})
// => true
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Array” Methods`

<!-- div -->

### <a id="dantil-arraysEqual"></a>`dantil.arraysEqual(a, b, [predicate])`
<a href="#dantil-arraysEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1251 "View in source") [&#x24C9;][1]

Performs a shallow comparison between two arrays to determine if they are equivalent.
<br>
<br>
If `predicate` is provided, checks if returns truthy when invoked per index with the values of both arrays at that index as arguments: (elementA, elementB).

#### Arguments
1. `a` *(Array)*: The array to compare.
2. `b` *(Array)*: The other array to compare.
3. `[predicate]` *(Function)*: The function invoked per index.

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

// A shallow comparison will compare complex type references, not their contents.
var objA = { prop: 'val' }
var objB = { prop: 'val' }
var objC = { prop: undefined }
dantil.arraysEqual([ objA, objC ], [ objB, objC ])
// => false

// Compare elements at each index using `dantil.objectsEqual`.
dantil.arraysEqual([ objA, objC ], [ objB, objC ], dantil.objectsEqual)
// => true

// Rather, objects are only equal if they are the same instance.
dantil.arraysEqual([ objA, objB ], [ objA, objB ])
// => true
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Object” Methods`

<!-- div -->

### <a id="dantil-objectsEqual"></a>`dantil.objectsEqual(a, b)`
<a href="#dantil-objectsEqual">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1308 "View in source") [&#x24C9;][1]

Performs a shallow comparison between two objects to determine if they are equivalent.

#### Arguments
1. `a` *(Object)*: The object to compare.
2. `b` *(Object)*: The other object to compare.

#### Returns
*(boolean)*:  Returns `true` if the objects are equivalent, else `false`.

#### Example
```js
dantil.objectsEqual({}, {})
// => true

dantil.objectsEqual({ name: 'danny', val: 1 }, { name: 'danny', val: 1 })
// => true

dantil.objectsEqual({ name: 'danny' }, { val: 1 })
// => false

// A shallow comparison will compare complex type references, not their contents.
var objA = { prop: 'val' }
var objB = { prop: 'val' }
dantil.objectsEqual({ name: 'danny', obj: objA }, { name: 'danny', obj: objB })
// => false

// Rather, objects are only equal if they are the same instance.
dantil.objectsEqual({ a: objA, b: objB }, { a: objA, b: objB })
// => true
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-deleteUndefinedObjectProps"></a>`dantil.deleteUndefinedObjectProps(object)`
<a href="#dantil-deleteUndefinedObjectProps">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1332 "View in source") [&#x24C9;][1]

Recursively deletes all properties of `object` defined as `undefined`. This is useful for object comparisons and pretty-printing.

#### Arguments
1. `object` *(Object)*: The `Object` to purge of properties defined as `undefined`.

#### Returns
*(Object)*:  Returns `object` without `undefined` properties.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-diffObjects"></a>`dantil.diffObjects(object, other)`
<a href="#dantil-diffObjects">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1387 "View in source") [&#x24C9;][1]

Compares two objects line by line and stylizes the differences for printing.

#### Arguments
1. `object` *(Object)*: The object to compare.
2. `other` *(Object)*: The other object to compare.

#### Returns
*(string)*:  Returns a string of the differences stylized for printing.

#### Example
```js
var objA = {
  name: 'dantil',
  version: 0.1,
  sagan: [
    'There is perhaps no better demonstration of the folly of human',
    'underscores our responsibility to deal more kindly with one another,',
    'and to preserve and cherish the pale blue dot, the only home we\'ve',
    'ever known.'
  ]
}

var objB = {
  name: 'dantil',
  version: 0.2,
  sagan: [
    'There is perhaps no better demonstration of the folly of human',
    'conceits than this distant image of our tiny world. To me, it',
    'underscores our responsibility to deal more kindly with one another,',
    'ever known.'
  ]
}

// Compare objects and generate string with differences stylized.
var diff = dantil.diffObjects(objA, objB)
console.log(diff)
```
Output:
<br><img src="https://raw.githubusercontent.com/DannyNemer/dantil/master/doc/img/dantil-diffObjects-example.jpg" alt="dantil.diffObjects() example output"/>
```
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Number” Methods`

<!-- div -->

### <a id="dantil-cleanFloat"></a>`dantil.cleanFloat(number)`
<a href="#dantil-cleanFloat">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1421 "View in source") [&#x24C9;][1]

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

## `“String” Methods`

<!-- div -->

### <a id="dantil-diffStrings"></a>`dantil.diffStrings(expected, actual)`
<a href="#dantil-diffStrings">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1436 "View in source") [&#x24C9;][1]

Compares two strings word by word and stylizes the differences for printing.

#### Arguments
1. `expected` *(string)*: The string to compare.
2. `actual` *(string)*: The other string to compare.

#### Returns
*(Object)*:  Returns an object with `expected` and `actual` as properties for the strings with their differences stylized for printing.

* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-format"></a>`dantil.format(string, [placeholderVals])`
<a href="#dantil-format">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1474 "View in source") [&#x24C9;][1]

Formats a string in a `printf()`-like format using Node's `util.format()`.

#### Arguments
1. `string` *(string)*: The string to format containing zero or more placeholders. Each placeholder is replaced with the converted value from its corresponding argument.
2. `[placeholderVals]` *(...string)*: The values to replace the corresponding placeholders in `string`.

#### Returns
*(string)*:  Returns the formatted string.

#### Example
```js
dantil.format('%s:%s %d', 'foo', 'bar', 22)
// => 'foo:bar 22'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-kebabToCamelCase"></a>`dantil.kebabToCamelCase(kebabCasedString)`
<a href="#dantil-kebabToCamelCase">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1489 "View in source") [&#x24C9;][1]

Converts kebab cased `string` to camel case.

#### Arguments
1. `kebabCasedString` *(string)*: The kebab cased string to convert.

#### Returns
*(string)*:  Returns the camel cased string.

#### Example
```js
dantil.kebabToCamelCase('my-long-variable-name')
// => 'myLongVariableName'
```
* * *

<!-- /div -->

<!-- div -->

### <a id="dantil-camelToKebabCase"></a>`dantil.camelToKebabCase(camelCasedString)`
<a href="#dantil-camelToKebabCase">#</a> [&#x24C8;](https://github.com/DannyNemer/dantil/blob/master/dantil.js#L1508 "View in source") [&#x24C9;][1]

Converts camel cased `string` to kebab case.

#### Arguments
1. `camelCasedString` *(string)*: The camel cased string to convert.

#### Returns
*(string)*:  Returns the kebab cased string.

#### Example
```js
dantil.camelToKebabCase('myLongVariableName')
// => 'my-long-variable-name'
```
* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #utility "Jump back to the TOC."
