/**
 * @license
 * dantil 0.0.1 - A Node.js utility library.
 * Copyright 2015 Danny Nemer
 * Available under MIT license <http://opensource.org/licenses/MIT>
 */

var fs = require('fs')
var util = require('util')

/**
 * Checks if options object `options` adheres to `schema`. Simulates static function arguments (i.e., type checking and parameter count). Prints descriptive, helpful errors when `options` is ill-formed.
 *
 * @static
 * @memberOf dantil
 * @category Utility
 * @param {Object} schema The definition of required and optional properties for `options`.
 * @param {Object} options The options object to check for conformity to `schema`.
 * @returns {boolean} Returns `true` if `options` is ill-formed, else `false`.
 * @example
 *
 * var schema = {
 *   num: Number,                                  // Must be of type `Number`
 *   list: { type: Array },                        // Must be of type `Array` (identical to previous parameter)
 *   strings: { type: Array, arrayType: String },  // Must be `Array` containing only String
 *   str: { type: String, optional: true },        // Parameter can be omitted
 *   val: [ 'red', 'yellow', 'blue' ]              // Must be one of predefined values
 * }
 *
 * function myFunc(options) {
 *   if (dantil.illFormedOpts(schema, options)) {
 *     // => Prints descriptive, helpful error messages
 *
 *     // Handle ill-formed `options` how you choose
 *     throw new Error('ill-formed options')
 *   }
 *
 *   // ...stuff...
 * }
 */
exports.illFormedOpts = function (schema, options) {
  // Check if missing an options parameter required by schema.
  for (var prop in schema) {
    var val = schema[prop]

    if (!val.optional && !options.hasOwnProperty(prop)) {
      exports.logErrorAndPath('Missing \'' + prop + '\' property')
      return true
    }
  }

  // Check if passed parameters conform to schema.
  for (var prop in options) {
    // Unrecognized property.
    if (!schema.hasOwnProperty(prop)) {
      exports.logErrorAndPath('Unrecognized property:', prop)
      return true
    }

    var optsVal = options[prop]
    var schemaVal = schema[prop]
    var schemaPropType = schemaVal.type || schemaVal

    // Accidentally passed an `undefined` object; e.g., `undefined`, `[]`, `[ 1, undefined ]`.
    if (optsVal === undefined || (Array.isArray(optsVal) && (optsVal.length === 0 || optsVal.indexOf(undefined) !== -1))) {
      exports.logErrorAndPath('undefined ' + prop + ':', optsVal)
      return true
    }

    // Schema contains an `Array` of predefined accepted values.
    if (Array.isArray(schemaPropType)) {
      // Unrecognized value for parameter with predefined values.
      if (schemaPropType.indexOf(optsVal) === -1) {
        exports.logError('Unrecognized value for ' + prop + ':', optsVal)
        exports.log('       Accepted values for ' + prop + ':', schemaPropType)
        exports.log('  ' + exports.getModuleCallerPathAndLineNumber())
        return true
      }
    } else {
      // Passed value of incorrect type; e.g., `num: String`, `str: Array`.
      if (optsVal.constructor !== schemaPropType) {
        exports.logErrorAndPath('\'' + prop + '\' not of type ' + schemaPropType.name + ':', optsVal)
        return true
      }

      // Passed Array contains elements not of `arrayType` (if `arrayType` is defined).
      if (Array.isArray(optsVal) && schemaVal.arrayType && !optsVal.every(function (el) { return el.constructor === schemaVal.arrayType })) {
        exports.logErrorAndPath('\'' + prop + '\' not an array of type ' + schemaVal.arrayType.name + ':', optsVal)
        return true
      }
    }
  }

  // No errors
  return false
}

/**
 * Executes `func` within a `try` block. If an error is thrown, removes parentheses surrounding file paths in its stack trace for the iTerm open-file-path shortcut, and colors the error type name (e.g., `TypeError`) red.
 *
 * @static
 * @memberOf dantil
 * @category Utility
 * @param {Function} func The function to execute within a `try` block.
 * @param {boolean} rethrow Specify rethrowing a caught error from `func` after printing the stack trace.
 * @returns {*} Returns the value returned by `func`, if any.
 * @example
 *
 * dantil.tryCatchWrapper(function () {
 *   // ...stuff...
 *   throw new Error('test failed')
 * })
 * // => Catches thrown error and prints a formatted stack trace
 */
exports.tryCatchWrapper = function (func, rethrow) {
  try {
    return func()
  } catch (e) {
    // Print leading blank line.
    exports.log()

    if (e.stack) {
      // Error message without source code (if present).
      var message = e.message.split('\n').pop()

      e.stack.split('\n').forEach(function (stackLine) {
        if (e.message.indexOf(stackLine) !== -1) {
          exports.log(stackLine)
        } else if (stackLine.indexOf(message) !== -1) {
          // Color error type name red.
          exports.log(stackLine.replace(e.name, exports.colors.red(e.name)))
          message = null
        } else {
          // Remove parentheses surrounding file paths for the iTerm open-file-path shortcut.
          exports.log(stackLine.replace(/[()]/g, ''))
        }
      })
    } else {
      exports.log(e)
    }

    if (rethrow) throw e
  }
}

/**
 * Deletes the modules identified by the provided paths from cache, forcing them to be reloaded at next `require()` call. Without removing a module from cache, subsequent `require()` calls to the same module will not enable changes to its file(s). This is useful for enabling changes on a server without restarting the server.
 *
 * @static
 * @memberOf dantil
 * @category Utility
 * @param {...string} paths The paths of modules to remove from cache.
 * @example
 *
 * // Load module
 * var myModule = require('./myModule.js')
 *
 * // Remove module from cache
 * dantil.deleteModuleCache('./myModule.js')
 *
 * // Load module again, enabling changes to './myModule.js'
 * myModule = require('./myModule.js')
 */
exports.deleteModuleCache = function () {
  Array.prototype.slice.call(arguments).forEach(function (path) {
    delete require.cache[fs.realpathSync(path)]
  })
}

/**
 * Gets the file path and line number of where this function was called in the format "path:line-number".
 *
 * @static
 * @memberOf dantil
 * @category Utility
 * @returns {string} Returns the file path and line number in the format "path:line-number".
 * @example
 *
 * // The contents of 'foo.js':
 *
 * dantil.getPathAndLineNumber()
 * // => '/Users/Danny/foo.js:1'
 */
exports.getPathAndLineNumber = function () {
  return getFormattedStackFrame(function (stack) {
    // Get the frame for where this function was called.
    return stack[0]
  })
}

/**
 * Gets the file path and line number of the function call that invoked the currently executing module. Returns the path and line number in the format "path:line-number".
 *
 * This is not necessarily the caller of the currently executing function, which can be another function within the same module. Nor is it necessarily this module's parent which instantiated the module. Rather, it is the most recent function call in the stack outside the currently executing module.
 *
 * Returns `undefined` if there is no other module in the stack below where this function was called.
 *
 * @static
 * @memberOf dantil
 * @category Utility
 * @returns {string} Returns the file path and line number in the format "path:line-number".
 * @example
 *
 * // The contents of 'main.js':
 *
 * var child = require('./child.js')
 * child.func()
 *
 * var grandchild = require('./grandchild.js')
 * grandchild.foo()
 *
 * // Try to get the frame of the nonexistant function call that invoked this module.
 * dantil.getModuleCallerPathAndLineNumber()
 * // => undefined
 * ```
 *
 * ```javascript
 * // The contents of 'child.js':
 *
 * var grandchild = require('./grandchild.js')
 *
 * exports.func = function () {
 *   // Get the frame of the invocation of the current execution of this module.
 *   dantil.getModuleCallerPathAndLineNumber()
 *   // => '/Users/Danny/main.js:2'
 *
 *   // Call another function within the same module, though the retrieved frame will be
 *   // the same.
 *   subFunc()
 *
 *   // Call a function in another module.
 *   grandchild.bar()
 * }
 *
 * function subFunc() {
 *   // Get the frame of the invocation of the current execution of this module (which
 *   // is not the frame that invoked this function).
 *   dantil.getModuleCallerPathAndLineNumber()
 *   // => '/Users/Danny/main.js:2'
 * }
 * ```
 *
 * ```javascript
 * // The contents of 'grandchild.js':
 *
 * exports.foo = function () {
 *   dantil.getModuleCallerPathAndLineNumber()
 *   // => '/Users/Danny/main.js:5'
 * }
 *
 * exports.bar = function () {
 *   dantil.getModuleCallerPathAndLineNumber()
 *   // => '/Users/Danny/child.js:13'
 * }
 */
exports.getModuleCallerPathAndLineNumber = function () {
  return getFormattedStackFrame(function (stack) {
    var thisModuleName

    for (var f = 0, stackLen = stack.length; f < stackLen; ++f) {
      var frame = stack[f]

      // Get the module name of where this function was called.
      if (!thisModuleName) {
        thisModuleName = frame.getFileName()
        continue
      }

      // Stop when finding the frame of the most recent module after where this function was called.
      if (thisModuleName !== frame.getFileName()) {
        return frame
      }
    }

    // Return `undefined` if there is no other module in the stack below where this function was called.
    return undefined
  })
}

/**
 * Passes a structured stack trace as an `Array` of `CallSite` objects, without frames for native Node functions and this file, to the provided `getFrameFunc(stack)`, which returns a single frame from the `Array`. Returns the file path and line number of the returned frame in the format "path:line-number".
 *
 * @private
 * @param {Function} getFrameFunc The function passed the structured stack trace and returns a single stack frame.
 * @returns {String} Returns the file path and line number of the frame returned by `getFrameFunc` in the format "path:line-number".
 */
function getFormattedStackFrame(getFrameFunc) {
  var origStackTraceLimit = Error.stackTraceLimit
  var origPrepareStackTrace = Error.prepareStackTrace

  // Collect all stack frames.
  Error.stackTraceLimit = Infinity

  // Get a structured stack trace as an `Array` of `CallSite` objects, each of which represents a stack frame, with frames for native Node functions and this file removed.
  Error.prepareStackTrace = function (error, structuredStackTrace) {
    return structuredStackTrace.filter(function (frame) {
      var filePath = frame.getFileName()

      // Avoid frames for native Node functions, such as `require()`.
      if (!/\//.test(filePath)) return false

      // Avoid frames from within this file (i.e., 'dantil.js').
      if (filePath === __filename) return false

      return true
    })
  }

  // Get the stack frame.
  var frame = getFrameFunc(Error().stack)

  // Restore stack trace configuration after collecting stack trace.
  Error.stackTraceLimit = origStackTraceLimit
  Error.prepareStackTrace = origPrepareStackTrace

  // Return the path and line number of the frame in the format "path:line-number" if a frame was found, else return `false`.
  return frame && frame.getFileName() + ':' + frame.getLineNumber()
}

/**
 * Stylizes strings for printing to the console using the [chalk](https://github.com/chalk/chalk) module.
 *
 * @static
 * @memberOf dantil
 * @category Utility
 * @type Object
 * @example
 *
 * console.log(dantil.colors.red('Error'))
 * // => Prints red-colored "Error"
 */
exports.colors = require('chalk')

/**
 * Synchronously writes the output of `func` to a file at `path` instead of the console. Overwrites the file if it already exists. Restores output to the console if an error is thrown.
 *
 * @static
 * @memberOf dantil
 * @category File System
 * @param {string} path The path where to write output.
 * @param {Function} func The function producing output.
 * @returns {*} Returns the value returned by `func`, if any.
 * @example
 *
 * // Print to console
 * console.log('Begin output to file')
 *
 * // Redirect process output from console to '~/Desktop/out.txt'
 * dantil.redirectOutputToFile('~/Desktop/out.txt', function () {
 *   console.log('Numbers:')
 *   for (var i = 0; i < 100; ++i) {
 *     console.log(i)
 *   }
 * })
 * // => Restores output to console and prints "Output saved: ~/Desktop/out.txt"
 *
 * // Print to console (after restoring output)
 * console.log('Output to file complete')
 */
exports.redirectOutputToFile = function (path, func) {
  // Expand '~' if present.
  path = exports.expandHomeDir(path)

  // Create file if does not exist, overwrite existing file if exists, or throw an error if `path` is a directory.
  fs.writeFileSync(path)

  // Redirect `process.stdout` to `path`.
  var writable = fs.createWriteStream(path)
  var oldWrite = process.stdout.write
  process.stdout.write = function () {
    writable.write.apply(writable, arguments)
  }

  try {
    // Write output to `path`.
    var returnVal = func()

    // Restore `process.stdout`.
    process.stdout.write = oldWrite

    exports.log('Output saved:', fs.realpathSync(path))

    return returnVal
  } catch (e) {
    // Restore `process.stdout`.
    process.stdout.write = oldWrite

    throw e
  }
}

/**
 * Writes `obj` to a JSON file at `path`.
 *
 * @static
 * @memberOf dantil
 * @category File System
 * @param {string} path The file path to write to.
 * @param {Object} obj The object to save to `path`.
 */
exports.writeJSONFile = function (path, obj) {
  // Expand '~' if present.
  path = exports.expandHomeDir(path)

  fs.writeFileSync(path, JSON.stringify(obj, function (key, val) {
    // Convert RegExp to strings for `JSON.stringify()`.
    return val instanceof RegExp ? val.source : val
  }, '\t'))

  exports.log('File saved:', fs.realpathSync(path))
}

/**
 * Replaces `'~'` in `path` (if present and at the path's start) with the home directory path.
 *
 * @static
 * @memberOf dantil
 * @category File System
 * @param {string} path The file path.
 * @returns {string} Returns `path` with `'~'`, if present, replaced with the home directory path.
 * @example
 *
 * dantil.expandHomeDir('~/Desktop')
 * // => '/Users/Danny/Desktop'
 */
exports.expandHomeDir = function (path) {
  return path.replace(/^~/, process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'])
}

/**
 * Pretty-prints the provided values and objects in color, recursing 2 times while formatting objects (which is identical to `console.log()`).
 *
 * Prints objects on separate lines if multi-lined when formatted, else concatenates values and objects to print on the same line if less than 80 characters when concatenated.
 *
 * Equally indents each line after the first line, if any. If the first argument has leading whitespace, prepends all remaining arguments with the same whitespace excluding line breaks.
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {...*} values The values and objects to print.
 */
exports.log = function () {
  if (arguments.length) {
    prettyPrint(arguments, { colors: true })
  } else {
    // Print a blank line when called with no arguments
    console.log()
  }
}

/**
 * A version of `dantil.log()` that recurses indefinitely while formatting the object. This is useful for inspecting large, complicated objects.
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {...*} values The values and objects to print.
 */
exports.dir = function () {
  prettyPrint(arguments, { depth: null, colors: true })

  // Print trailing blank line
  console.log()
}

/**
 * Pretty-prints the provided values and objects in color, recursing 2 times while formatting objects (which is identical to `console.log()`).
 *
 * Prints objects on separate lines if multi-lined when formatted, else concatenates values and objects to print on the same line if less than 80 characters when concatenated.
 *
 * Equally indents each line after the first line, if any. If the first argument has leading whitespace, prepends all remaining arguments with the same whitespace excluding line breaks.
 *
 * @private
 * @param {Object} args The `arguments` object (passed to the callee) with the values and objects to print.
 * @param {Object} options The options object defined for `util.inspect()`.
 */
function prettyPrint(args, options) {
  var formattedArgs = []
  var indent = '  '

  Array.prototype.slice.call(args).forEach(function (arg, i, args) {
    var prevArg = args[i - 1]

    // Print strings passed as arguments (i.e., not Object properties) without styling.
    // - This also preserves any already-stylized arguments.
    var formattedArg = typeof arg === 'string' ? arg : stylize(arg, options)

    // Print objects on separate lines if multi-lined when formatted
    if (i === 0) {
      // Extend indent for successive lines with the first argument's leading whitespace, if any.
      if (typeof arg === 'string') {
        // Get the substring of leading whitespace characters from the start of the string, up to the first non-whitespace character, if any.
        arg = arg.substring(0, arg.search(/[^\s]/))

        // Get the substring after the last line break before the first first non-whitespace character, if any.
        arg = arg.substring(arg.lastIndexOf('\n') + 1)

        // JavaScript will not properly indent if '\t' is appended to spaces (i.e., reverse order as here).
        indent = arg + indent
      }

      formattedArgs.push(formattedArg)
    } else if (/,\n/.test(formattedArg)) {
      // Indent lines after the first line.
      formattedArgs.push(indent + formattedArg.replace(/,\n/g, ',\n' + indent))
    } else {
      var prevFormattedArgIdx = formattedArgs.length - 1
      var prevFormattedArg = formattedArgs[prevFormattedArgIdx]

      // Concatenate other values and objects to print on the same line if less than 80 characters when  concatenated.
      if (getStylizedStringLength(prevFormattedArg) + getStylizedStringLength(formattedArg) + 1 > 80) {
        // Indent lines after the first line.
        formattedArgs.push(indent + formattedArg)
      } else {
        formattedArgs[prevFormattedArgIdx] += ' ' + formattedArg
      }
    }
  })

  formattedArgs.forEach(function (formattedArg) {
    console.log(formattedArg)
  })
}

/**
 * Identical to `util.inspect()`, but disables colors if the terminal does not support color.
 *
 * @private
 * @param {*} object The object or value to stylize.
 * @param {Object} options The options object defined for `util.inspect()`.
 * @returns {string} Returns a stylized string representation of `object`.
 */
function stylize(object, options) {
  if (!exports.colors.supportsColor) {
    options.colors = false
  }

  return util.inspect(object, options)
}

/**
 * Gets the length of stylized `string` without the ANSI escape codes (for color and formatting).
 *
 * @private
 * @param {string} string The stylized string to measure.
 * @returns {number} Returns the length of `string` without ANSI escape codes.
 */
function getStylizedStringLength(string) {
  return exports.colors.stripColor(string).length
}

/**
 * Prints the provided values like `dantil.log()` prepended with red-colored "Error: ".
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {...*} values The values to print following "Error: ".
 * @example
 *
 * dantil.logError('Property undefined:', obj)
 * // => Prints "Error: Value undefined: { property: undefined }"
 */
exports.logError = function () {
  printWithColoredLabel('Error', 'red', arguments)
}

/**
 * Prints the provided values like `dantil.log()` prepended with yellow-colored "Warning: ".
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {...*} values The values to print following "Warning: ".
 * @example
 *
 * dantil.logWarning('Values unused:', obj)
 * // => Prints "Warning: Value unused: { property: undefined }"
 */
exports.logWarning = function () {
  printWithColoredLabel('Warning', 'yellow', arguments)
}

/**
 * Prints the provided values like `dantil.log()` prepended with green-colored "Success: ".
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {...*} values The values to print following "Success: ".
 * @example
 *
 * dantil.logSuccess(tests.length, 'tests passed')
 * // => Prints "Success: 47 tests passed"
 */
exports.logSuccess = function () {
  printWithColoredLabel('Success', 'green', arguments)
}

/**
 * Prints `args` like `dantil.log()`, but prepends with `label` colored `color` (e.g., "Error: ").
 *
 * @private
 * @param {string} label The label to prepend to `args` (e.g., "Error").
 * @param {string} color The color to stylize `label`.
 * @param {Array} args The values to print following `label`.
 */
function printWithColoredLabel(label, color, args) {
  // Temporarily remove ':' to avoid coloring it.
  if (label[label.length - 1] === ':') {
    label = label.slice(0, -1)
  }

  // Color `label` and append with `args`.
  exports.log.apply(null, [ exports.colors[color](label) + ':' ].concat(Array.prototype.slice.call(args)))
}

/**
 * Prints an error message like `dantil.logError()` followed by the file path and line number of the function call that invoked the currently executing module.
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {boolean} [logThisLine] Specify logging the line where this function is called instead of the line which invoked the currently executing module.
 * @param {...*} [values] The optional values and objects to print following "Error: ".
 * @example
 *
 * // The contents of 'foo.js':
 *
 * dantil.logErrorAndPath('Property undefined:', obj)
 * // => Prints "Error: Value undefined: { property: undefined }
 * //              /Users/Danny/foo.js:1"
 */
exports.logErrorAndPath = function (logThisLine) {
  var args
  var stackLine

  if (logThisLine === true) {
    args = Array.prototype.slice.call(arguments, 1)
    stackLine = exports.getPathAndLineNumber()
  } else {
    args = Array.prototype.slice.call(arguments)
    stackLine = exports.getModuleCallerPathAndLineNumber()
  }

  if (args.length > 0) {
    exports.logError.apply(null, args)
    exports.log('  ' + stackLine)
  } else {
    exports.logError(stackLine)
  }
}

/**
 * Prints the stack trace to the current position. Removes parentheses surrounding file paths for the iTerm open-file-path shortcut.
 *
 * @static
 * @memberOf dantil
 * @category Console
 * @param {string} [message] The optional message to print above the stack trace.
 */
exports.logTrace = function (message) {
  exports.log('Trace' + (message ? ': ' + message : ''))

  // Get stack without lines for `Error` and this file.
  var stack = Error().stack.split('\n').slice(3).join('\n')

  // Remove parentheses surrounding file paths for the iTerm open-file-path shortcut.
  exports.log(stack.replace(/[()]/gm, ''))
}

/**
 * Prints the calling file path and line number, prepended by `message`, to mark reaching a section of code.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {string} [message] The optional message to prepend to the path and line number.
 * @example
 *
 * // The contents of 'foo.js':
 *
 * if (rareConditionIsTrue) {
 *   dantil.assert('Condition met')
 *   // => Prints "Condition met: /Users/Danny/foo.js:2"
 * }
 */
exports.assert = function (message) {
  exports.log(exports.colors.red(message || 'Reached') + ':', exports.getPathAndLineNumber(true))
}

/**
 * Prints the calling file path and line number, prepended by `message`, if `value` is truthy.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {boolean} value The value to check if truthy.
 * @param {string} [message] The optional message to prepend to the path and line number.
 * @example
 *
 * // The contents of 'foo.js':
 *
 * dantil.assertTrue(myNumber > 100, 'Condition met')
 * // => If `myNumber > 100`, prints "Condition met: /Users/Danny/foo.js:1"
 */
exports.assertTrue = function (value, message) {
  if (value) exports.assert(message)
}

/**
 * Tests shallow, coercive equality with the equal comparison operator (`==`). Prints an error and the file path and line number if the test fails, unlike Node's `assert.equal()` which throws an error.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {*} actual The value to compare.
 * @param {*} expected The expected value to compare.
 * @param {string} [message] The optional message to print if the test fails.
 */
exports.assertEqual = function (actual, expected, message) {
  if (actual != expected) {
    var label = exports.colors.red('AssertionError') + ':'

    if (message) {
      exports.log(label, message)
    } else {
      // Use `util.inspect()` to stylize strings.
      var inspectOpts = { colors: true }
      exports.log(label, stylize(actual, inspectOpts), '==', stylize(expected, inspectOpts))
    }

    exports.log('  ' + exports.getPathAndLineNumber())
  }
}

 /**
  * Used as a key-value map for `dantil.time()`.
  *
  * @private
  * @type Map
  */
var _times = new Map()

/**
 * Starts a high-resolution timer (with precision in microseconds) identified by `label`. Use `dantil.timeEnd(label)` to print the timer's current value.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {string} label The identifier of the timer.
 * @example
 *
 * // Start timer
 * dantil.time('my test')
 *
 * // ...stuff...
 *
 * dantil.timeEnd('my test')
 * // => Prints "my test: 13.264ms"
 *
 * // ...more stuff...
 *
 * dantil.timeEnd('my test')
 * // => Prints "my test: 31.183ms"
 */
exports.time = function (label) {
  _times.set(label, process.hrtime())
}

/**
 * Prints the current high-resolution value of a timer initiated with `dantil.time(label)`.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {string} label The identifier of the timer.
 */
exports.timeEnd = function (label) {
  var time = _times.get(label)

  if (!time) {
    throw new Error('No such label:', label)
  }

  var durationTuple = process.hrtime(time)
  var duration = durationTuple[0] * 1e3 + durationTuple[1] / 1e6

  exports.log(label + ':', duration.toFixed(3) + 'ms')
}

/**
 * Used as a key-value map for `dantil.count()`.
 *
 * @private
 * @type Map
 */
var _counts = new Map()

/**
 * Counts the number of times a section of code is reached, identified by `label`. Use `dantil.countEnd(label)` to print the counter's value. This is useful for profiling complex programs.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {string} label The counter identifier.
 * @example
 *
 * for (var i = 0; i < 100; ++i) {
 *   if (i % 2 === 0) dantil.count('even')
 * }
 *
 * // Reset the count for 'even' to 0
 * dantil.countEnd('even')
 * // => Prints "even: 50"
 */
exports.count = function (label) {
  var val = _counts.get(label) || 0
  _counts.set(label, val + 1)
}

/**
 * Prints (and resets the value of) the number of calls of `dantil.count(label)`.
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @param {string} label The counter identifier.
 */
exports.countEnd = function (label) {
  // Print even if count is 0 to acknowledge never being reached.
  var count = _counts.get(label) || 0

  exports.log(label + ':', count)

  // Reset count.
  _counts.delete(label)
}

/**
 * Prints (and resets) the values of all counters used on `dantil.count()`. Does not print counters that are never reached (and never have their keys initialized).
 *
 * @static
 * @memberOf dantil
 * @category Profile
 * @example
 *
 * for (var i = 0; i < 100; ++i) {
 *   if (i % 2 === 0) dantil.count('even')
 *   if (i % 2 === 1) dantil.count('odd')
 *   if (i > 100) dantil.count('never reached')
 * }
 *
 * // Reset all counts to 0
 * dantil.countEndAll()
 * // => Prints "even: 50
 * //            odd: 50"
 */
exports.countEndAll = function () {
  _counts.forEach(function(count, label) {
    exports.log(label + ':', count)
  })

  // Reset all counts.
  _counts.clear()
}

/**
 * Performs a shallow comparison between two arrays to determine if they are equivalent.
 *
 * @static
 * @memberOf dantil
 * @category Array
 * @param {Array} a The array to compare.
 * @param {Array} b The other array to compare.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 * @example
 *
 * dantil.arraysEqual([], [])
 * // => true
 *
 * dantil.arraysEqual([1, 2, 3, 'danny'], [1, 2, 3, 'danny'])
 * // => true
 *
 * dantil.arraysEqual([ false, true ], [ true ])
 * // => false
 *
 * // A shallow comparison will not compare object properties
 * var objA = { prop: 'val' }
 * var objB = { prop: 'val' }
 * dantil.arraysEqual([ 1, 2, objA ], [ 1, 2, objB ])
 * // => false
 *
 * // Rather, objects are only equal if they are the same instance
 * dantil.arraysEqual([ objA, objB ], [ objA, objB ])
 * // => true
 */
exports.arraysEqual = function (a, b) {
  // Arrays are identical (or, both are `undefined`).
  if (a === b) return true

  // One of two is `undefined`.
  if (!a || !b) return false

  var aLength = a.length

  // Lengths are different.
  if (aLength !== b.length) return false

  for (var i = 0; i < aLength; ++i) {
    if (a[i] !== b[i]) return false
  }

  return true
}

/**
 * Removes any extraneous digits from `number`, which result from operations limited by JavaScript's floating point number precision, such as `0.1 * 0.2` (which does not equal `0.02`). This limitation results from being unable to map `0.1` to a finite binary floating point number.
 *
 * @static
 * @memberOf dantil
 * @category Number
 * @param {number} number The number to rid of any extraneous digits.
 * @returns {number} Returns the cleaned number.
 * @example
 *
 * var number = 0.1 * 0.2
 * // => 0.020000000000000004
 *
 * number = dantil.cleanNumber(number)
 * // => 0.02
 */
exports.cleanNumber = function (number) {
  // JavaScript's floating point number precision 13 digits after the decimal point.
  return Number(number.toFixed(13))
}

/**
 * Converts dash-separated `string` to camel case.
 *
 * @static
 * @memberOf dantil
 * @category String
 * @param {string} dashedString The dash-separated string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * dantil.camelCase('my-long-variable-name')
 * // => 'myLongVariableName'
 */
exports.dashedToCamelCase = function (dashedString) {
  return dashedString.replace(/-(\w)/g, function (match, group1) {
    return group1.toUpperCase()
  })
}