// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Debugging and console logging functions.
 * This module is designed to be removed completely by the compiler
 * for production builds.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfDebug');

import {spfBase, SPF_DEBUG} from '../base';

let spfDebug = {};



/**
 * Log to the browser console using "debug", the low priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.debug = function(var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.DEBUG)) {
    spfDebug.log(spfDebug.Level.DEBUG, 'spf', arguments);
  }
};


/**
 * Log to the browser console using "info", the medium priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.info = function(var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.INFO)) {
    spfDebug.log(spfDebug.Level.INFO, 'spf', arguments);
  }
};


/**
 * Log to the browser console using "warn", the high priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.warn = function(var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.WARN)) {
    spfDebug.log(spfDebug.Level.WARN, 'spf', arguments);
  }
};


/**
 * Log to the browser console using "error", the critical priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.error = function(var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.ERROR)) {
    spfDebug.log(spfDebug.Level.ERROR, 'spf', arguments);
  }
};


/**
 * Log to the browser console the specified method.  If the method does not
 * exist, fallback to using "log" and prefix the message with the intended
 * method.  Note that in the fallback, all logged items will be converted to
 * strings before output for compatibility.
 *
 * @param {string} method The console method to use when logging.
 * @param {string} prefix The string prefix to prepend to the logged items.
 * @param {{length: number}} args List of items to log.
 */
spfDebug.log = function(method, prefix, args) {
  if (!SPF_DEBUG || !window.console) {
    return;
  }
  args = Array.prototype.slice.call(args);
  var current = spfBase.now();
  var overall = spfDebug.formatDuration(spfDebug.start_, current);
  if (spfDebug.split_) {
    var split = spfDebug.formatDuration(spfDebug.split_, current);
    args.unshift(overall + '/' + split + ':');
  } else {
    args.unshift(overall + ':');
  }
  if (spfDebug.direct_) {
    args.unshift('[' + prefix + ']');
    // Note that passing null for execution context throws an Error in Chrome.
    window.console[method].apply(window.console, args);
  } else {
    args.unshift('[' + prefix + ' - ' + method + ']');
    window.console.log(args.join(' '));
  }
};


/**
 * Reset the timer used for logging duration.  Call to log split times
 * since last reset in addition to overall duration.
 */
spfDebug.reset = function() {
  spfDebug.split_ = spfBase.now();
};


/**
 * Formats two millisecond timestamps into a duration string.
 * See {@link spfBase.now} for timestamp generation.
 *
 * @param {number} start The starting millisecond timestamp.
 * @param {number} end The ending millisecond timestamp.
 * @return {string} The formatted duration string.
 */
spfDebug.formatDuration = function(start, end) {
  var dur = (end - start) / 1000;
  if (dur.toFixed) {
    dur = dur.toFixed(3);
  }
  return dur + 's';
};


/**
 * Checks whether a logging level is enabled for output.
 *
 * @param {spfDebug.Level} level The logging level.
 * @return {boolean} True if the logging level is enabled.
 */
spfDebug.isLevelEnabled = function(level) {
  return (spfDebug.levels_[level] >= spfDebug.levels_[spfDebug.OUTPUT]);
};


/**
 * The timestamp of when debugging was initialized, for overall duration.
 * @private {number}
 */
spfDebug.start_ = spfBase.now();


/**
 * The timestamp of when debugging was reset, for split durations.
 * @private {number}
 */
spfDebug.split_ = 0;


/**
 * Whether to support direct console logging.  This mode allows logging of
 * objects directly to the console without casting to a string.
 * Note: IE does not support direct logging, but also does not support the
 * debug method, so this property will be false in IE.
 * @private {boolean}
 */
spfDebug.direct_ = !!(window.console && window.console.debug);


/**
 * A map of logging output levels to corresponding numeric values.
 * @private {Object.<string, number>}
 * @const
 */
spfDebug.levels_ = {
  'debug': 1,
  'info': 2,
  'warn': 3,
  'error': 4
};


/**
 * The level of logging output, corresponding to browser console logging
 * functions: "debug", "info", "warn", "error".
 * @enum {string}
 */
spfDebug.Level = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};


/**
 * @define {string} OUTPUT is provided to control the level of output
 * from debugging code.  Valid values correspond to browser console logging
 * functions: "debug", "info", "warn", and "error", and can be set by the
 * compiler when "--define spfDebug.OUTPUT='warn'" or similar is specified.
 */
spfDebug.OUTPUT = 'debug';

export default spfDebug;
