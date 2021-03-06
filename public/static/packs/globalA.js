/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* exports provided: SPF_DEBUG, SPF_BOOTLOADER, SPF_TRACING, spfBase */
/* exports used: SPF_BOOTLOADER, spfBase, SPF_DEBUG */
/*!******************************************!*\
  !*** ./app/javascript/packs/spf/base.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SPF_DEBUG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SPF_BOOTLOADER; });
/* unused harmony export SPF_TRACING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return spfBase; });
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview The base SPF functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// A general note on the SPF framework.
//
// SPF is an independent framework intended to be compiled using the Closure
// Compiler, but it has no dependencies on the Closure Library.  Each file has
// goog.provide and goog.require statements for automatic dependency management
// by the compiler, but these primitives are processed and removed during
// compilation.  For testing and development, these functions are stubbed in
// stub.js.
//
// A general note on browser compatibility.
//
// SPF aims to be broadly compatible with the most common browsers, as long as
// that support does not require an inordinate amount of code.  In addition,
// the primary functionality of SPF -- pushstate-based navigation -- requires
// advanced browser functionality not found in older browsers.  In practice,
// this means that the common library functions are supported in IE 8+, with
// all functions supported in IE 10+.

// goog.provide('spf');

var spfBase = {};

/** @define {boolean} Compiler flag to build the bootstrap script loader. */
var SPF_BOOTLOADER = false;

/** @define {boolean} Compiler flag to include debugging code. */
var SPF_DEBUG = false;

/** @define {boolean} Compiler flag to include tracing code. */
var SPF_TRACING = false;

/**
 * Creates a new function that, when called, has its `this` set to the
 * provided value, with a given sequence of arguments preceding any provided
 * when the new function is called.
 *
 * @param {?function(this:T, ...)} fn A function to partially apply.
 * @param {T} self Specifies the object which this should point to when the
 *     function is run.
 * @param {...*} var_args Additional arguments that are partially applied to the
 *     function.
 * @return {!Function} A partially-applied form of the function bind() was
 *     invoked on.
 * @template T
 */
spfBase.bind = function (fn, self, var_args) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function () {
    // Clone the args and append additional ones.
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(self, newArgs);
  };
};

/**
 * Executes a function inside a try/catch to gracefully handle failures.
 *
 * @param {Function} fn Function to be executed.
 * @param {...*} var_args Arguments to apply to the function.
 * @return {*} The function result or Error if execution failed.
 */
spfBase.execute = function (fn, var_args) {
  if (fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    try {
      return fn.apply(null, args);
    } catch (err) {
      return err;
    }
  }
};

/**
 * Dispatches a custom event.
 *
 * @param {spfBase.EventName} name The custom event name.
 * @param {!Object=} opt_detail The custom event detail (data).
 * @return {boolean} False if the event was canceled.
 */
spfBase.dispatch = function (name, opt_detail) {
  if (document.createEvent) {
    var evt = document.createEvent('CustomEvent');
    var bubbles = true;
    var cancelable = true;
    evt.initCustomEvent(name, bubbles, cancelable, opt_detail);
    return document.dispatchEvent(evt);
  }
  return true;
};

/**
 * Gets the current timestamp.
 *
 * @return {number} A value representing the number of milliseconds
 *     between midnight, January 1, 1970 and the current time.  On browsers
 *     that support DOMHighResTimestamp, this value is a floating point number;
 *     otherwise, it is an integer.
 */
spfBase.now = function () {
  if (window.performance && window.performance.timing && window.performance.now) {
    return function () {
      return window.performance.timing.navigationStart + window.performance.now();
    };
  }
  return function () {
    return new Date().getTime();
  };
}();

/**
 * Gets a UID.
 *
 * @return {number} A unique number.
 */
spfBase.uid = function () {
  // Special case to not use spfBase.state directly to avoid circular dependencies.
  var state = window['_spf_state'] = window['_spf_state'] || {};
  var uid = parseInt(state['uid'], 10) || 0;
  uid++;
  return state['uid'] = uid;
};

/**
 * An empty no-op function.
 */
spfBase.nullFunction = function () {};

/**
 * @enum {string}
 */
spfBase.EventName = {
  CLICK: 'spfclick',
  CSS_BEFORE_UNLOAD: 'spfcssbeforeunload',
  CSS_UNLOAD: 'spfcssunload',
  DONE: 'spfdone',
  ERROR: 'spferror',
  HISTORY: 'spfhistory',
  JS_BEFORE_UNLOAD: 'spfjsbeforeunload',
  JS_UNLOAD: 'spfjsunload',
  PART_DONE: 'spfpartdone',
  PART_PROCESS: 'spfpartprocess',
  PROCESS: 'spfprocess',
  READY: 'spfready',
  RELOAD: 'spfreload',
  REQUEST: 'spfrequest'

  /** Type definition for a parsed script resource in a SPF response fragment.
   *
   * @typedef {{
   *   url: (string|undefined),
   *   text: (string|undefined),
   *   name: (string|undefined),
   *   async: (boolean|undefined)
   * }}
   */
};spfBase.ScriptResource;

/** Type definition for a parsed style resource in a SPF response fragment.
 *
 * @typedef {{
 *   url: (string|undefined),
 *   text: (string|undefined),
 *   name: (string|undefined)
 * }}
 */
spfBase.StyleResource;

/** Type definition for a parsed link resource in a SPF response fragment.
 *
 * @typedef {{
 *   url: (string|undefined),
 *   rel: (string|undefined)
 * }}
 */
spfBase.LinkResource;

/**
 * Type definition for a fragment of a SPF response.  Either a string of HTML or
 * an object with the resources parsed out of the HTML.
 *
 * @typedef {string|{
 *   html: (string|undefined),
 *   scripts: (Array.<spf.ScriptResource>|undefined),
 *   styles: (Array.<spf.StyleResource>|undefined),
 *   links: (Array.<spf.LinkResource>|undefined)
 * }}
 */
spfBase.ResponseFragment;

/**
 * Type definition for a single SPF response object.
 * - attr: Map of Element IDs to maps of attibute names to attribute values
 *       to set on the Elements.
 * - body: Map of Element IDs to HTML strings containing content with which
 *       to update the Elements.
 * - cacheKey: Key used to cache this response.
 * - cacheType: String of the type of caching to use for this response.
 * - foot: HTML string containing <script> tags of JS to execute.
 * - head: HTML string containing <link> and <style> tags of CSS to install.
 * - name: String of the general name of this type of response. This will be
 *       used to generate "from" and "to" CSS classes for animation.
 * - redirect: String of a URL to request instead.
 * - reload: Boolean to indicate the page should be reloaded.
 * - timing: Map of timing attributes to timestamp numbers.
 * - title: String of the new Document title.
 * - url: String of the correct URL for the current request. This will replace
 *       the current URL in history.
 *
 * @typedef {{
 *   attr: (Object.<string, Object.<string, string>>|undefined),
 *   body: (Object.<string, spf.ResponseFragment>|undefined),
 *   cacheKey: (string|undefined),
 *   cacheType: (string|undefined),
 *   foot: (spf.ResponseFragment|undefined),
 *   head: (spf.ResponseFragment|undefined),
 *   name: (string|undefined),
 *   redirect: (string|undefined),
 *   reload: (boolean|undefined),
 *   timing: (Object.<string, number>|undefined),
 *   title: (string|undefined),
 *   url: (string|undefined)
 * }}
 */
spfBase.SingleResponse;

/**
 * Type definition for a multipart SPF response object.
 * - cacheKey: Key used to cache this response.
 * - cacheType: String of the type of caching to use for this response.
 * - parts: List of response objects.
 * - timing: Map of timing attributes to timestamp numbers.
 * - type: The string "multipart".
 *
 * @typedef {{
 *   cacheKey: (string|undefined),
 *   cacheType: (string|undefined),
 *   parts: (Array.<spf.SingleResponse>|undefined),
 *   timing: (Object.<string, number>|undefined),
 *   type: string
 * }}
 */
spfBase.MultipartResponse;

/**
 * Type definition for the configuration options for requesting a URL.
 * - headers: optional map of headers to send with the request.
 * - method: optional method with which to send the request; defaults to "GET".
 * - onDone: optional callback when either repsonse is done being processed.
 * - onError: optional callback if an error occurs.
 * - onPartDone: optional callback when part of a multipart response is done
 *       being processed.
 * - onPartProcess: optional callback when part of a multipart response will be
 *       pocessed.
 * - onProcess: optional callback when a single response will be processed.
 * - onRequest: optional callback when a request will be made.
 * - postData: optional data to send with a request.  Only used if the method
 *       is set to "POST".
 * - withCredentials: optional flag to send credentials if true.
 *
 * @typedef {{
 *   headers: (Object.<string>|undefined),
 *   method: (string|undefined),
 *   onDone: (function(spf.EventDetail)|undefined),
 *   onError: (function(spf.EventDetail)|undefined),
 *   onPartDone: (function(spf.EventDetail)|undefined),
 *   onPartProcess: (function(spf.EventDetail)|undefined),
 *   onProcess: (function(spf.EventDetail)|undefined),
 *   onRequest: (function(spf.EventDetail)|undefined),
 *   postData: (ArrayBuffer|Blob|Document|FormData|null|string|undefined),
 *   withCredentials: (boolean|undefined)
 * }}
 */
spfBase.RequestOptions;

/**
 * Type definition for custom event detail (data), also used for callbacks.
 * - err: optional error that occurred; defined for "error" events
 * - name: optional name of the script or stylesheet that will be unloaded;
 *       defined for "jsbeforeunload", "jsunload", "cssbeforeunload",
 *       and "cssunload" events.
 * - part: optional part of a multipart response; defined for "partprocess"
 *       and "partdone" events.
 * - previous: optional URL of the previous page; defined for "history" and
 *       "request" events.
 * - reason: optional reason code and text; defined for the "reload" event.
 * - referer: optional URL of the referer page; defined for "history" and
 *       "request" events.
 * - response: optional complete response; defined for "process" and
 *       "done" events.
 * - target: optional target element; defined for "click" events.
 * - url: optional URL of the request; defined for "error", "reload", "click",
 *       "history", "request", "partprocess", "partdone", "process", and "done"
 *       events - or - optional URL of the script/stylesheet that will be
 *       unloaded; defined for "jsbeforeunload", "jsunload", "cssbeforeunload",
 *       and "cssunload" events.
 *
 * @typedef {{
 *   err: (Error|undefined),
 *   name: (string|undefined),
 *   part: (spf.SingleResponse|undefined),
 *   previous: (string|undefined),
 *   reason: (string|undefined),
 *   referer: (string|undefined),
 *   target: (Element|undefined),
 *   response: (spf.SingleResponse|spf.MultipartResponse|undefined),
 *   url: (string|undefined)
 * }}
 */
spfBase.EventDetail;

/**
 * Type definition for a task scheduler optionally used by spf.tasks.
 * - addTask: Function to add a new task to the scheduler. It returns a key
 *       which can be used to cancel its execution.
 * - cancelTask: Function which cancels a previously scheduled task.
 *
 * @typedef {{
 *   addTask: (function(!Function): number),
 *   cancelTask: (function(number))
 * }}
 */
spfBase.TaskScheduler;



/***/ }),
/* 1 */,
/* 2 */
/* exports provided: rorParams */
/* exports used: rorParams */
/*!*********************************************!*\
  !*** ./app/javascript/packs/common/csrf.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rorParams; });
var rorParams = {
  // Up-to-date Cross-Site Request Forgery token
  csrfToken: function csrfToken() {
    return document.querySelector('meta[name=csrf-token]').getAttribute('content');
  },
  // URL param that must contain the CSRF token
  csrfParam: function csrfParam() {
    return document.querySelector('meta[name=csrf-param]').getAttribute('content');
  },
  // Determines if the request is a cross domain request.
  isCrossDomain: function isCrossDomain(url) {
    var originAnchor = document.createElement('a');
    originAnchor.href = location.href;
    var urlAnchor = document.createElement('a');

    try {
      urlAnchor.href = url;
      // This is a workaround to a IE bug.
      urlAnchor.href = urlAnchor.href;

      // If URL protocol is false or is a string containing a single colon
      // *and* host are false, assume it is not a cross-domain request
      // (should only be the case for IE7 and IE compatibility mode).
      // Otherwise, evaluate protocol and host of the URL against the origin
      // protocol and host.
      return !((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host || originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host);
    } catch (e) {
      // If there is an error parsing the URL, assume it is crossDomain.
      return true;
    }
  }
};

/***/ }),
/* 3 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/array/array.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/**
 * @fileoverview Array manipulation functions.
 *
 */

// goog.provide('spfArray');


var spfArray = {};

/**
 * @typedef {Array|NodeList|Arguments|{length: number}}
 */
spfArray.ArrayLike;

/**
 * Compatible Array#forEach implementation.
 *
 * @param {Array.<ITEM>|spfArray.ArrayLike} arr The array.
 * @param {?function(this:THIS, ITEM, number, ?) : ?} fn The function to
 *   execute for each item.  The function is executed with three arguments:
 *   the item value, the item index, and the array.
 * @param {THIS=} opt_obj The value to use as "this" in the function.
 * @template THIS, ITEM
 */
spfArray.each = function (arr, fn, opt_obj) {
  // When built for the bootloader, optimize for size over speed.
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] && arr.forEach) {
    arr.forEach(fn, opt_obj);
    return;
  }
  for (var i = 0, l = arr.length; i < l; i++) {
    if (i in arr) {
      fn.call(opt_obj, arr[i], i, arr);
    }
  }
};

/**
 * Compatible Array#every implementation.
 *
 * @param {Array.<ITEM>|spfArray.ArrayLike} arr The array.
 * @param {?function(this:THIS, ITEM, number, ?) : boolean} fn The function to
 *   execute for each item.  The function is executed with three arguments:
 *   the item value, the item index, and the array; it should return true
 *   or false.
 * @param {THIS=} opt_obj The value to use as "this" in the function.
 * @return {boolean} Whether the result of every execution was truthy.
 * @template THIS, ITEM
 */
spfArray.every = function (arr, fn, opt_obj) {
  // When built for the bootloader, optimize for size over speed.
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] && arr.every) {
    return arr.every(fn, opt_obj);
  }
  for (var i = 0, l = arr.length; i < l; i++) {
    if (i in arr && !fn.call(opt_obj, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};

/**
 * Compatible Array#some implementation.
 *
 * @param {Array.<ITEM>|spfArray.ArrayLike} arr The array.
 * @param {?function(this:THIS, ITEM, number, ?) : boolean} fn The function to
 *   execute for each item.  The function is executed with three arguments:
 *   the item value, the item index, and the array; it should return true
 *   or false.
 * @param {THIS=} opt_obj The value to use as "this" in the function.
 * @return {boolean} Whether the result of any execution was truthy.
 * @template THIS, ITEM
 */
spfArray.some = function (arr, fn, opt_obj) {
  // When built for the bootloader, optimize for size over speed.
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] && arr.some) {
    return arr.some(fn, opt_obj);
  }
  for (var i = 0, l = arr.length; i < l; i++) {
    if (i in arr && fn.call(opt_obj, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};

/**
 * Compatible Array#filter implementation.
 *
 * @param {Array.<ITEM>|spfArray.ArrayLike} arr The array.
 * @param {?function(this:THIS, ITEM, number, ?) : RESULT} fn The function to
 *   execute for each item.  The function is executed with three arguments:
 *   the item value, the item index, and the array; it should return the
 *   new result.
 * @param {THIS=} opt_obj The value to use as "this" in the function.
 * @return {!Array.<RESULT>} A new array of filtered results.
 * @template THIS, ITEM, RESULT
 */
spfArray.filter = function (arr, fn, opt_obj) {
  // When built for the bootloader, optimize for size over speed.
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] && arr.filter) {
    return arr.filter(fn, opt_obj);
  }
  var res = [];
  spfArray.each(arr, function (a, i, arr) {
    if (fn.call(opt_obj, a, i, arr)) {
      res.push(a);
    }
  });
  return res;
};

/**
 * Compatible Array#indexOf implementation.
 *
 * @param {Array.<ITEM>|spfArray.ArrayLike} arr The array.
 * @param {ITEM} val The value to find.
 * @param {number=} opt_fromIndex The starting index to search from.
 * @return {number} The index of the first matching element.
 * @template ITEM
 */
spfArray.indexOf = function (arr, val, opt_fromIndex) {
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] && arr.indexOf) {
    return arr.indexOf(val, opt_fromIndex);
  }
  var start = opt_fromIndex || 0;
  for (var i = start; i < arr.length; i++) {
    if (i in arr && arr[i] === val) {
      return i;
    }
  }
  return -1;
};

/**
 * Compatible Array#map implementation.
 *
 * @param {Array.<ITEM>|spfArray.ArrayLike} arr The array.
 * @param {?function(this:THIS, ITEM, number, ?) : RESULT} fn The function to
 *   execute for each item.  The function is executed with three arguments:
 *   the item value, the item index, and the array; it should return the
 *   new result.
 * @param {THIS=} opt_obj The value to use as "this" in the function.
 * @return {Array.<RESULT>} A new array of mapped results.
 * @template THIS, ITEM, RESULT
 */
spfArray.map = function (arr, fn, opt_obj) {
  // When built for the bootloader, optimize for size over speed.
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] && arr.map) {
    return arr.map(fn, opt_obj);
  }
  var res = [];
  res.length = arr.length;
  spfArray.each(arr, function (a, i, arr) {
    res[i] = fn.call(opt_obj, a, i, arr);
  });
  return res;
};

/**
 * Converts to an array if needed.
 *
 * @param {?} val The value.
 * @return {Array} An array.
 */
spfArray.toArray = function (val) {
  return spfArray.isArray(val) ? val : [val];
};

/**
 * Simple Array.isArray implementation.
 *
 * @param {?} val Value to test.
 * @return {boolean} Whether the value is an array.
 */
spfArray.isArray = function (val) {
  // When built for the bootloader, optimize for size over complete accuracy.
  if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
    // This test will fail if a fake object like "{push: 1}" is passed in, but
    // for the bootloader, this is an acceptable trade off.
    return !!(val && val.push);
  }
  return Object.prototype.toString.call(val) == '[object Array]';
};

/* harmony default export */ __webpack_exports__["a"] = (spfArray);

/***/ }),
/* 4 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./app/javascript/packs/spf/state.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for handling the SPF state.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfState');

var spfState = {};

/**
 * Checks whether a current state value exists.
 *
 * @param {spfState.Key} key The state key.
 * @return {boolean} Whether the state value exists.
 */
spfState.has = function (key) {
  return key in spfState.values_;
};

/**
 * Gets a current state value.
 *
 * @param {spfState.Key} key The state key.
 * @return {*} The state value.
 */
spfState.get = function (key) {
  return spfState.values_[key];
};

/**
 * Sets a current state value.
 *
 * @param {spfState.Key} key The state key.
 * @param {T} value The state value.
 * @return {T} The state value.
 * @template T
 */
spfState.set = function (key, value) {
  spfState.values_[key] = value;
  return value;
};

/**
 * @enum {string}
 */
spfState.Key = {
  ASYNC_DEFERS: 'async-defers',
  ASYNC_LISTENER: 'async-listener',
  CACHE_COUNTER: 'cache-counter',
  CACHE_MAX: 'cache-max',
  CACHE_STORAGE: 'cache-storage',
  CONFIG_VALUES: 'config',
  HISTORY_CALLBACK: 'history-callback',
  HISTORY_ERROR_CALLBACK: 'history-error-callback',
  HISTORY_IGNORE_POP: 'history-ignore-pop',
  HISTORY_INIT: 'history-init',
  HISTORY_LISTENER: 'history-listener',
  HISTORY_TIMESTAMP: 'history-timestamp',
  HISTORY_URL: 'history-url',
  NAV_COUNTER: 'nav-counter',
  NAV_INIT: 'nav-init',
  NAV_INIT_TIME: 'nav-init-time',
  NAV_CLICK_LISTENER: 'nav-listener',
  NAV_MOUSEDOWN_LISTENER: 'nav-mousedown-listener',
  NAV_SCROLL_LISTENER: 'nav-scroll-listener',
  NAV_SCROLL_TEMP_POSITION: 'nav-scroll-position',
  NAV_SCROLL_TEMP_URL: 'nav-scroll-url',
  NAV_PREFETCHES: 'nav-prefetches',
  NAV_PROMOTE: 'nav-promote',
  NAV_PROMOTE_TIME: 'nav-promote-time',
  NAV_REQUEST: 'nav-request',
  PUBSUB_SUBS: 'ps-s',
  RESOURCE_NAME: 'rsrc-n',
  RESOURCE_PATHS_PREFIX: 'rsrc-p-',
  RESOURCE_STATUS: 'rsrc-s',
  RESOURCE_URL: 'rsrc-u',
  SCRIPT_DEPS: 'js-d',
  SCRIPT_URL: 'js-u',
  TASKS_UID: 'uid'

  /**
   * Current state values.  Globally exported to maintain continuity
   * across revisions.
   * @private {Object}
   */
};spfState.values_ = {};
spfState['_spf_state'] = spfState.values_;

/* harmony default export */ __webpack_exports__["a"] = (spfState);

/***/ }),
/* 5 */,
/* 6 */
/* exports provided: default */
/* exports used: default */
/*!********************************************!*\
  !*** ./app/javascript/packs/spf/config.js ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__state__ = __webpack_require__(/*! ./state */ 4);
// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for handling the SPF config.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */


var spfConfig = {};

/**
 * Type definition for a SPF config value.
 *
 * Function type temporarily needed for experimental-html-handler.
 * TODO(philharnish): Remove "Function".
 *
 * @typedef {string|number|boolean|Function|null}
 */
spfConfig.Value;

/**
 * Default configuration values.
 * @type {!Object.<spfConfig.Value>}
 */
spfConfig.defaults = {
  'animation-class': 'fnpu-animate',
  'animation-duration': 425,
  'cache-lifetime': 10 * 60 * 1000, // 10 minute cache lifetime (ms).
  'cache-max': 50, // 50 items.
  'cache-unified': false,
  'link-class': 'fnpu-link',
  'nolink-class': 'fnpu-nolink',
  'navigate-limit': 20, // 20 navigations per session.
  'navigate-lifetime': 24 * 60 * 60 * 1000, // 1 day session lifetime (ms).
  'reload-identifier': null, // Always a param, no '?' needed.
  'request-timeout': 0, // No request timeout.
  'url-identifier': '?fnpu=__type__'

  /**
   * Initialize the configuration with an optional object.  If values are not
   * provided, the defaults are used if they exist.
   *
   * @param {Object.<spfConfig.Value>=} opt_config Optional configuration object.
   */
};spfConfig.init = function (opt_config) {
  var config = opt_config || {};
  // Set primary configs; each has a default.
  for (var key in spfConfig.defaults) {
    var value = key in config ? config[key] : spfConfig.defaults[key];
    spfConfig.set(key, value);
  }
  // Set advanced and experimental configs; none have defaults.
  for (var key in config) {
    if (!(key in spfConfig.defaults)) {
      spfConfig.set(key, config[key]);
    }
  }
};

/**
 * Checks whether a current configuration value exists.
 *
 * @param {string} name The configuration name.
 * @return {boolean} Whether the configuration value exists.
 */
spfConfig.has = function (name) {
  return name in spfConfig.values;
};

/**
 * Gets a current configuration value.
 *
 * @param {string} name The configuration name.
 * @return {spfConfig.Value|undefined} The configuration value.
 */
spfConfig.get = function (name) {
  return spfConfig.values[name];
};

/**
 * Sets a current configuration value.
 *
 * @param {string} name The configuration name.
 * @param {spfConfig.Value} value The configuration value.
 * @return {spfConfig.Value} The configuration value.
 */
spfConfig.set = function (name, value) {
  spfConfig.values[name] = value;
  return value;
};

/**
 * Removes all data from the config.
 */
spfConfig.clear = function () {
  for (var key in spfConfig.values) {
    delete spfConfig.values[key];
  }
};

/**
 * The config storage object.
 * @type {!Object.<spfConfig.Value>}
 */
spfConfig.values = {};

// Automatic initialization for spfConfig.values.
if (!__WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].Key.CONFIG_VALUES)) {
  __WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].Key.CONFIG_VALUES, spfConfig.values);
}
spfConfig.values = /** @type {!Object.<spfConfig.Value>} */__WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_0__state__["a" /* default */].Key.CONFIG_VALUES);

/* harmony default export */ __webpack_exports__["a"] = (spfConfig);

/***/ }),
/* 7 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./app/javascript/packs/spf/string/string.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview String manipulation functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */


var spfString = {};

// goog.provide('spfString');

// goog.require('spf');

/**
 * Checks whether a string contains a given substring.
 *
 * @param {string} str The string to test.
 * @param {string} substr The substring to test for.
 * @return {boolean} True if `str` contains `substr`.
 */
spfString.contains = function (str, substr) {
  return str.indexOf(substr) != -1;
};

/**
 * Fast prefix-checker.
 *
 * @param {string} str The string to check.
 * @param {string} prefix A string to look for at the start of `str`.
 * @param {number=} opt_offset Offset from index 0 at which to check.
 * @return {boolean} True if `str` begins with `prefix`.
 */
spfString.startsWith = function (str, prefix, opt_offset) {
  var idx = opt_offset || 0;
  return str.lastIndexOf(prefix, idx) == idx;
};

/**
 * Fast suffix-checker.
 *
 * @param {string} str The string to check.
 * @param {string} suffix A string to look for at the end of `str`.
 * @return {boolean} True if `str` ends with `suffix`.
 */
spfString.endsWith = function (str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
};

/**
 * Simple check for if a value is a string.
 *
 * @param {?} val Value to test.
 * @return {boolean} Whether the value is a string.
 */
spfString.isString = function (val) {
  // When built for the bootloader, optimize for size over complete accuracy.
  if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
    // The return value for typeof will be one of the following:
    // * number
    // * string
    // * boolean
    // * function
    // * object
    // * undefined
    // Match "string" to provide an identity test.
    // This test will fail if a string object like "new String()" is passed in,
    // but for the bootloader, this is an acceptable trade off.
    return typeof val === 'string';
  }
  return Object.prototype.toString.call(val) == '[object String]';
};

/**
 * Removes leading and trailing whitespace.
 *
 * @param {string} str The string to trim.
 * @return {string} The trimmed string.
 */
spfString.trim = function () {
  if (String.prototype.trim) {
    return function (str) {
      return str.trim();
    };
  } else {
    return function (str) {
      return str.replace(/^\s+|\s+$/g, '');
    };
  }
}();

/**
 * Partitions a string by dividing it at the first occurance of a separator and
 * returning an array of 3 parts: the part before the separator, the separator
 * itself, and the part after the separator.  If the separator is not found,
 * the last two items will be empty strings.
 *
 * @param {string} str The string to partition.
 * @param {string} sep The separator.
 * @return {!Array.<string>} The partitioned string result.
 */
spfString.partition = function (str, sep) {
  var arr = str.split(sep);
  var nosep = arr.length == 1;
  return [arr[0], nosep ? '' : sep, nosep ? '' : arr.slice(1).join(sep)];
};

/**
 * String hash function similar to java.lang.String.hashCode().
 * The hash code for a string is computed as
 * s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
 * where s[i] is the ith character of the string and n is the length of
 * the string. We mod the result to make it between 0 (inclusive) and 2^32
 * (exclusive).
 *
 * @param {string} str A string.
 * @return {number} Hash value for `str`, between 0 (inclusive) and 2^32
 *  (exclusive). The empty string returns 0.
 */
spfString.hashcode = function (str) {
  str = str || '';
  var result = 0;
  for (var i = 0, l = str.length; i < l; ++i) {
    result = 31 * result + str.charCodeAt(i);
    // Normalize to 4 byte range, 0 ... 2^32.
    result %= 0x100000000;
  }
  return result;
};

/**
 * Converts a string from camelCase to selector-case (e.g. from
 * "multiPartString" to "multi-part-string"), useful for converting JS
 * style and dataset properties to equivalent CSS selectors and HTML keys.
 *
 * @param {string} str The string in camelCase form.
 * @return {string} The string in selector-case form.
 */
spfString.toSelectorCase = function (str) {
  return String(str).replace(/([A-Z])/g, '-$1').toLowerCase();
};

/* harmony default export */ __webpack_exports__["a"] = (spfString);

/***/ }),
/* 8 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/debug/debug.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
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



var spfDebug = {};

/**
 * Log to the browser console using "debug", the low priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.debug = function (var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.DEBUG)) {
    spfDebug.log(spfDebug.Level.DEBUG, 'spf', arguments);
  }
};

/**
 * Log to the browser console using "info", the medium priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.info = function (var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.INFO)) {
    spfDebug.log(spfDebug.Level.INFO, 'spf', arguments);
  }
};

/**
 * Log to the browser console using "warn", the high priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.warn = function (var_args) {
  if (spfDebug.isLevelEnabled(spfDebug.Level.WARN)) {
    spfDebug.log(spfDebug.Level.WARN, 'spf', arguments);
  }
};

/**
 * Log to the browser console using "error", the critical priority method.
 *
 * @param {...*} var_args Items to log.
 */
spfDebug.error = function (var_args) {
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
spfDebug.log = function (method, prefix, args) {
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] || !window.console) {
    return;
  }
  args = Array.prototype.slice.call(args);
  var current = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
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
spfDebug.reset = function () {
  spfDebug.split_ = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
};

/**
 * Formats two millisecond timestamps into a duration string.
 * See {@link spfBase.now} for timestamp generation.
 *
 * @param {number} start The starting millisecond timestamp.
 * @param {number} end The ending millisecond timestamp.
 * @return {string} The formatted duration string.
 */
spfDebug.formatDuration = function (start, end) {
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
spfDebug.isLevelEnabled = function (level) {
  return spfDebug.levels_[level] >= spfDebug.levels_[spfDebug.OUTPUT];
};

/**
 * The timestamp of when debugging was initialized, for overall duration.
 * @private {number}
 */
spfDebug.start_ = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();

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

  /**
   * The level of logging output, corresponding to browser console logging
   * functions: "debug", "info", "warn", "error".
   * @enum {string}
   */
};spfDebug.Level = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'

  /**
   * @define {string} OUTPUT is provided to control the level of output
   * from debugging code.  Valid values correspond to browser console logging
   * functions: "debug", "info", "warn", and "error", and can be set by the
   * compiler when "--define spfDebug.OUTPUT='warn'" or similar is specified.
   */
};spfDebug.OUTPUT = 'debug';

/* harmony default export */ __webpack_exports__["a"] = (spfDebug);

/***/ }),
/* 9 */
/* exports provided: handleMethod */
/* exports used: handleMethod */
/*!******************************************************!*\
  !*** ./app/javascript/packs/common/handleMethod2.js ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleMethod;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_csrf__ = __webpack_require__(/*! ../common/csrf */ 2);

/**
 * [handleMethod description]
 * @param  {HTMLElement} link [description]
 * @return {[type]}      [description]
 * Handles "data-method" on links such as:
 * <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
 */
function handleMethod(link, linkMethod) {
  var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var href = link.getAttribute('href'),
      method = linkMethod,
      target = link.getAttribute('target'),
      csrfToken = __WEBPACK_IMPORTED_MODULE_0__common_csrf__["a" /* rorParams */].csrfToken(),
      csrfParam = __WEBPACK_IMPORTED_MODULE_0__common_csrf__["a" /* rorParams */].csrfParam();
  var paramsObj = {
    href: href,
    method: method,
    target: target,
    csrfToken: csrfToken,
    csrfParam: csrfParam
  };
  var formEle = createForm(paramsObj, obj);
  // appendFormToDom(formEle);
  return formEle;
  // submitForm(formEle);
}
function createForm(params, obj) {
  var f = document.createElement('form');
  f.style.display = 'none';
  f.setAttribute('method', 'post');
  f.setAttribute('action', params.href);
  if (params.target) {
    f.setAttribute('target', params.target);
  };

  var i = document.createElement('input');
  i.setAttribute('type', 'hidden');
  i.setAttribute('name', '_method');
  i.setAttribute('value', params.method);

  var s;
  if (params.csrfParam !== undefined && params.csrfToken !== undefined && !__WEBPACK_IMPORTED_MODULE_0__common_csrf__["a" /* rorParams */].isCrossDomain(params.href)) {
    s = document.createElement('input');
    s.setAttribute('type', 'hidden');
    s.setAttribute('name', params.csrfParam);
    s.setAttribute('value', params.csrfToken);
  }
  f.appendChild(i);

  // for (let key in obj.data) {
  //   if (obj.data.hasOwnProperty(key)) {
  //     let t = document.createElement('input');
  //     t.setAttribute('type','hidden');
  //     t.setAttribute('name','' + obj.ns + '[' + key + ']');
  //     t.setAttribute('value',obj.data[key]);
  //     f.appendChild(t);
  //   }
  // }

  if (s) {
    f.appendChild(s);
  };
  return f;
}

function appendFormToDom(form) {
  document.body.appendChild(form);
}
function submitForm(form) {
  form.submit();
}

/***/ }),
/* 10 */,
/* 11 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./app/javascript/packs/spf/dom/dom.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/**
 * @fileoverview Basic DOM manipulation functions.
 *
 */

// goog.provide('spfDom');


var spfDom = {};

/**
 * Gets nodes matching a selector.
 *
 * Note: IE8 does not support CSS3 selectors, and unsupported browsers will
 * return an empty Array.
 *
 * @param {string} selector Selector to match.
 * @param {(Document|Element)=} opt_root Optional document or element to query.
 * @return {Array.<Node>|NodeList} nodes Matching nodes.
 */
spfDom.query = function (selector, opt_root) {
  var root = opt_root || document;
  if (root.querySelectorAll) {
    return root.querySelectorAll(selector);
  }
  return [];
};

/**
 * Inserts a new node before an existing reference node (i.e. as the previous
 * sibling). If the reference node has no parent, then does nothing.
 *
 * @param {Node} newNode Node to insert.
 * @param {Node} refNode Reference node to insert before.
 */
spfDom.insertSiblingBefore = function (newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode);
};

/**
 * Inserts a new node after an existing reference node (i.e. as the next
 * sibling). If the reference node has no parent, then does nothing.
 *
 * @param {Node} newNode Node to insert.
 * @param {Node} refNode Reference node to insert after.
 */
spfDom.insertSiblingAfter = function (newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
};

/**
 * Unpacks an element. That is, removes it and replace it with its children.
 * Does nothing if the element is not in the document.
 *
 * @param {Element} element The element to flatten.
 * @return {Element|undefined} The original element, detached from the document
 *     tree, sans children; or undefined, if the element was not in the document
 *     to begin with.
 */
spfDom.unpackElement = function (element) {
  var child,
      parent = element.parentNode;
  if (parent && parent.nodeType != 11) {
    // 11 = document fragment
    // Use IE DOM function (supported by Opera too) if available
    if (element.removeNode) {
      return (/** @type {Element} */element.removeNode(false)
      );
    } else {
      // Move all children of the original node up one level.
      while (child = element.firstChild) {
        parent.insertBefore(child, element);
      }
      // Detach the original element.
      return (/** @type {Element} */parent.removeChild(element)
      );
    }
  }
};

/**
 * Packs an element. That is, adds a new child and places its previous
 * children inside of the new one.
 *
 * @param {Element} element The element to pack.
 * @param {Element} container The new container of the existing children.
 */
spfDom.packElement = function (element, container) {
  if (container) {
    var child;
    // Move all children of the original node down one level.
    while (child = element.firstChild) {
      container.appendChild(child);
    }
    // Attach the new parent.
    element.appendChild(container);
  }
};

/**
 * Walks up the DOM hierarchy returning the first ancestor that passes the
 * matcher function.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @param {function(Node) : boolean} matcher A function that returns true if
 *     the passed node matches the desired criteria.
 * @param {Node=} opt_parent The DOM node to end with.  If provided, it will
 *     be the highest point in the hierarchy walked.  If not provided, the
 *     full hierarchy will be walked.
 * @return {Node} DOM node that matched the matcher, or null if there was
 *     no match.
 */
spfDom.getAncestor = function (element, matcher, opt_parent) {
  while (element) {
    if (matcher(element)) {
      // Found a match, return it.
      return element;
    }
    if (opt_parent && element == opt_parent) {
      // Reached the parent, return null.
      return null;
    }
    // Walk up the hierarchy.
    element = element.parentNode;
  }
  // Reached the root, return null.
  return null;
};

/**
 * Set attributes on an element from a map of attribute name/value pairs.
 *
 * NOTE: IE7 and earlier will need HTML attribute names specified as JS
 * properties instead (e.g. set "bgColor" as well as "bgcolor") and
 * does not support adding inline event handlers (e.g. setting "onclick"
 * is unsupported).  Event handlers should be added directly instead.
 *
 * @param {Element} element The element to update.
 * @param {Object.<string, string>} attributes The map of name/value pairs.
 */
spfDom.setAttributes = function (element, attributes) {
  for (var name in attributes) {
    var value = attributes[name];
    if (name == 'class') {
      element.className = value;
    } else if (name == 'style') {
      element.style.cssText = value;
    } else {
      element.setAttribute(name, value);
      // Updating the "value" attribute of an input via `el.setAttribute` does
      // not change what is displayed, and assigning directly via `el.value` is
      // needed.  But, _only_ updating via `el.value` means that calls to
      // `el.getAttribute` will return the original value.  So, do both.
      if (name == 'value') {
        element[name] = value;
      }
    }
  }
};

/**
 * Installs an empty iframe in the page.
 *
 * @param {string=} opt_id Id of the iframe element.
 * @param {Document=} opt_document Content document element.
 * @param {Function=} opt_callback Callback function to execute onload.
 * @return {!HTMLIFrameElement}
 */
spfDom.createIframe = function (opt_id, opt_document, opt_callback) {
  var id = opt_id || '';
  var doc = opt_document || document;
  var iframeEl = doc.createElement('iframe');
  iframeEl.id = id;
  iframeEl.src = 'javascript:""';
  iframeEl.style.display = 'none';
  if (opt_callback) {
    iframeEl.onload = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(opt_callback, null, iframeEl);
  }
  doc.body.appendChild(iframeEl);
  return (/** @type {!HTMLIFrameElement} */iframeEl
  );
};

/* harmony default export */ __webpack_exports__["a"] = (spfDom);

/***/ }),
/* 12 */
/* exports provided: default */
/* exports used: default */
/*!*****************************************************!*\
  !*** ./app/javascript/packs/spf/history/history.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__debug_debug__ = __webpack_require__(/*! ../debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom_dom__ = __webpack_require__(/*! ../dom/dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__state__ = __webpack_require__(/*! ../state */ 4);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for detecting and creating history entries
 * using the HTML5 history modification API.  It enables browser history
 * (e.g. back/forward) and URL updates without leaving the current page,
 * as long as the url is within the same domain.
 * See {@link http://www.w3.org/TR/html5/history.html}.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfHistory');







var spfHistory = {};

/**
 * Initialize pushstate-based HTML5 History management.
 *
 * @param {function(string, Object=)} callback The function to handle
 *     a history event. The first parameter will be the URL
 *     the user is browsing to.  The second parameter will be an optional
 *     state object associated with that URL.
 * @param {function(string, Error)} errorCallback The function to handle
 *     errors. The first parameter will be the URL with the error.  The
 *     second parameter will be the error object.
 */
spfHistory.init = function (callback, errorCallback) {
  if (!__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_INIT) && window.addEventListener) {
    var url = spfHistory.getCurrentUrl_();
    window.addEventListener('popstate', spfHistory.pop_, false);
    // Whether history is initialized.
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_INIT, true);
    // A callback to handle history events.
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_CALLBACK, callback);
    // A callback to handle errors.
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_ERROR_CALLBACK, errorCallback);
    // The event listener.
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_LISTENER, spfHistory.pop_);
    // The URL of the current history entry, used to detect returning to the
    // the first state.
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_URL, url);
    // The timestamp of the current history entry, used to distinguish
    // between backward and forward state changes.
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_TIMESTAMP, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now());
    // Set the initial referer to properly send referer on back button.
    var historyState = { 'spf-referer': document.referrer };
    try {
      spfHistory.replace(url, historyState);
    } catch (err) {
      // If history.replaceState was null an error will be thrown.
      if (errorCallback) {
        errorCallback(url, err);
      }
    }
  }
};

/**
 * Dispose pushstate-based HTML5 History management.
 */
spfHistory.dispose = function () {
  if (__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_INIT)) {
    if (window.removeEventListener) {
      window.removeEventListener('popstate', /** @type {function(Event)} */__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_LISTENER), false);
    }
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_INIT, false);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_CALLBACK, null);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_ERROR_CALLBACK, null);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_LISTENER, null);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_URL, null);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_TIMESTAMP, 0);
  }
};

/**
 * Add a history entry.
 *
 * @param {?string=} opt_url The URL associated with this entry to display in
 *     the browser.  This can be either a relative or an absolute URL, and if
 *     omitted, the current browser URL will be used.
 * @param {Object=} opt_state The state object associated with this history
 *     entry.  When the user returns to this entry, the "state" property of the
 *     event will contain a copy of this object.
 * @param {boolean=} opt_doCallback Whether to do the history event callback.
 * @throws {Error} If the state object is too large. For example, Firefox will
 *     pass the object to JSON.stringify and impose a 640k character limit.
 * @throws {Error} If the URL is not in the same domain, a SECURITY_ERR
 *     (code == 18) is thrown.
 * @throws {Error} If window.history.pushState is not a function.
 */
spfHistory.add = function (opt_url, opt_state, opt_doCallback) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].info('history.add ', opt_url);
  spfHistory.push_(false, opt_url, opt_state, opt_doCallback);
};

/**
 * Replace the current history entry, merging any newly provided state values
 * with existing ones.
 *
 * @param {?string=} opt_url The URL associated with this entry to display in
 *     the browser.  This can be either a relative or an absolute URL, and if
 *     omitted, the current browser URL will be used.
 * @param {Object=} opt_state The state object associated with this history
 *     entry.  When the user returns to this entry, the "state" property of the
 *     event will contain a copy of this object.
 * @param {boolean=} opt_doCallback Whether to do the history event callback.
 * @throws {Error} If the state object is too large. For example, Firefox will
 *     pass the object to JSON.stringify and impose a 640k character limit.
 * @throws {Error} If the URL is not in the same domain, a SECURITY_ERR
 *     (code == 18) is thrown.
 * @throws {Error} If window.history.replaceState is not a function.
 */
spfHistory.replace = function (opt_url, opt_state, opt_doCallback) {
  var state = null;
  // Set the existing state values.
  var currentState = spfHistory.getCurrentState_();
  if (currentState) {
    state = {};
    for (var key in currentState) {
      state[key] = currentState[key];
    }
  }
  // Update the state values with new ones.
  if (opt_state) {
    state = state || {};
    for (var key in opt_state) {
      state[key] = opt_state[key];
    }
  }
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].info('history.replace ', opt_url);
  spfHistory.push_(true, opt_url, state, opt_doCallback);
};

/**
 * Remove the latest history state from the stack.
 * NOTE: If this is called without a state having been pushed, it will result in
 * a back action to the last page. Use with care.
 */
spfHistory.removeCurrentEntry = function () {
  __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_IGNORE_POP, true);
  window.history.back();
};

/**
 * See {@link #add} or {@link #replace}.
 *
 * @param {boolean} replace Whether to replace the previous entry.
 * @param {?string=} opt_url The URL associated with this entry.
 * @param {Object=} opt_state The state object associated with this entry.
 * @param {boolean=} opt_doCallback Whether to do the history event callback.
 * @private
 */
spfHistory.push_ = function (replace, opt_url, opt_state, opt_doCallback) {
  if (!opt_url && !opt_state) {
    return;
  }
  var url = opt_url || spfHistory.getCurrentUrl_();
  var state = opt_state || {};
  var timestamp = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
  __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_TIMESTAMP, timestamp);
  state['spf-timestamp'] = timestamp;
  if (replace) {
    spfHistory.doReplaceState_(state, '', url);
    __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('    replaceState:  ', 'url=', url, 'state=', state);
  } else {
    spfHistory.doPushState_(state, '', url);
    __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('    pushState:  ', 'url=', url, 'state=', state);
  }
  __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_URL, url);
  if (opt_doCallback) {
    var callback = /** @type {function(string, Object=)} */__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_CALLBACK);
    if (callback) {
      callback(url, state);
    }
  }
};

/**
 * Handles popstate events when the active history entry changes.
 *
 * @param {Event} evt The popstate event.
 * @private
 */
spfHistory.pop_ = function (evt) {
  var url = spfHistory.getCurrentUrl_();
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].info('history.pop ', 'url=', url, 'evt=', evt);
  // Skip a pop event and reset flag if the ignore state is set.
  if (__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_IGNORE_POP)) {
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_IGNORE_POP, false);
    return;
  }
  // Avoid the initial event on first load, and ignore events for history
  // entries that are not handled by SPF (e.g. when navigating within a page
  // using links with hash-only URLs, there are no associated states).
  if (!evt.state) {
    return;
  }
  var state = evt.state;
  var timestamp = state['spf-timestamp'];
  // If the URL is the same and a state is present, the browser has left
  // and returned to first load via back/forward.  In this case, reset
  // the state to the original.
  if (url == __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_URL)) {
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_TIMESTAMP, timestamp);
    spfHistory.doReplaceState_(state, '', url);
    __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('    replaceState:  ', 'url=', url, 'state=', state);
  } else {
    var current = parseInt(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_TIMESTAMP), 10);
    state['spf-back'] = timestamp < current;
    state['spf-current'] = __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_URL);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_TIMESTAMP, timestamp);
    __WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_URL, url);
    var callback = /** @type {function(string, Object=)} */__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_4__state__["a" /* default */].Key.HISTORY_CALLBACK);
    if (callback) {
      callback(url, state);
    }
  }
};

/**
 * @return {string} The location href.
 * @private
 */
spfHistory.getCurrentUrl_ = function () {
  return window.location.href;
};

/**
 * @return {Object} The current history state object.
 * @private
 */
spfHistory.getCurrentState_ = function () {
  return (/** @type {Object} */window.history.state
  );
};

/**
 * @param {*} data New state.
 * @param {string} title The title for a new session history entry.
 * @param {string=} opt_url The URL for a new session history entry.
 * @private
 */
spfHistory.doPushState_ = function (data, title, opt_url) {
  // It is common for third party code to interfere with pushState.
  // This check makes sure that pushState is a function when called to
  // avoid js errors and a state where the back arrow stops working.
  var iframe = spfHistory.getIframe();
  var pushState = iframe.contentWindow.history.pushState;
  if (typeof pushState === 'function') {
    pushState.call(window.history, data, title, opt_url);
  } else {
    throw new Error('history.pushState is not a function.');
  }
};

/**
 * @param {*} data New state.
 * @param {string} title The title for a session history entry.
 * @param {string=} opt_url The URL for a new session history entry.
 * @private
 */
spfHistory.doReplaceState_ = function (data, title, opt_url) {
  var iframe = spfHistory.getIframe();
  var replaceState = iframe.contentWindow.history.replaceState;
  if (typeof replaceState === 'function') {
    replaceState.call(window.history, data, title, opt_url);
  } else {
    throw new Error('history.replaceState is not a function');
  }
};

/**
 * @return {!HTMLIFrameElement} The history iframe.
 */
spfHistory.getIframe = function () {
  var frame = document.getElementById('history-iframe');
  if (!frame) {
    frame = __WEBPACK_IMPORTED_MODULE_3__dom_dom__["a" /* default */].createIframe('history-iframe');
  }
  return (/** @type {!HTMLIFrameElement} */frame
  );
};

/* harmony default export */ __webpack_exports__["a"] = (spfHistory);

/***/ }),
/* 13 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./app/javascript/packs/spf/url/url.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__string_string__ = __webpack_require__(/*! ../string/string */ 7);
// Copyright 2013 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview URL manipulation functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 * @suppress {missingProperties}
 */





var spfUrl = {};
// goog.provide('spfUrl');

// goog.require('spfArray');
// goog.require('spfConfig');
// goog.require('spfString');

/**
 * See {@link https://developer.mozilla.org/en-US/docs/Web/API/URLUtils}.
 *
 * @typedef {{
 *   href: string,
 *   protocol: string,
 *   host: string,
 *   hostname: string,
 *   port: string,
 *   pathname: string,
 *   search: string,
 *   hash: string,
 *   username: string,
 *   password: string,
 *   origin: string
 * }}
 */
spfUrl.URLUtils;

/**
 * Returns a URLUtils compatible object for a given url. For the interface, see
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/URLUtils}.
 *
 * @param {string} url A relative or absolute URL.
 * @return {spfUrl.URLUtils} The URLUtils object.
 */
spfUrl.utils = function (url) {
  var aEl = document.createElement('a');
  // If the URL is relative, IE will not populate host/port parameters.
  aEl.href = url;
  // Assigning the absolute URL back to the href value solves this IE bug.
  aEl.href = aEl.href;
  var utils = {
    href: aEl.href,
    protocol: aEl.protocol,
    host: aEl.host,
    hostname: aEl.hostname,
    port: aEl.port,
    pathname: aEl.pathname,
    search: aEl.search,
    hash: aEl.hash,
    username: aEl.username,
    password: aEl.password
    // The origin is the combination of scheme, domain, and port.
  };utils.origin = utils.protocol + '//' + utils.host;
  // IE does not include the leading slash on a path. So if the path is
  // available, but no leading slash is present, prepend one.
  if (!utils.pathname || utils.pathname[0] != '/') {
    utils.pathname = '/' + utils.pathname;
  }
  return utils;
};

/**
 * Converts a relative URL to absolute based on the current document domain.
 *
 * @param {string} relative A relative URL.
 * @param {boolean=} opt_keepHash  Whether to keep any hash in the URL,
 *     if one exists.  Defaults to false.
 * @return {string} An absolute URL (with hash removed, if possible).
 */
spfUrl.absolute = function (relative, opt_keepHash) {
  var utils = spfUrl.utils(relative);
  return opt_keepHash ? utils.href : spfUrl.unhash(utils.href);
};

/**
 * Returns the path portion of a given URL.
 *
 * @param {string} url A relative or absolute URL.
 * @return {string} The path portion of the URL.
 */
spfUrl.path = function (url) {
  var utils = spfUrl.utils(url);
  return utils.pathname;
};

/**
 * Returns the origin of a given URL (scheme + domain + port).
 *
 * @param {string} url A relative or absolute URL.
 * @return {string} The origin of the URL.
 */
spfUrl.origin = function (url) {
  var utils = spfUrl.utils(url);
  return utils.origin;
};

/**
 * Adds the SPF identifier to a URL, to be used in requests.  If the
 * identifier contains `__type__` then that value will be replaced
 * with the value of `opt_type`.
 *
 * @param {string} url A URL.
 * @param {string=} opt_type An optional type for identification.
 * @return {string} An identified URL.
 */
spfUrl.identify = function (url, opt_type) {
  var ident = /** @type {string} */__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].get('url-identifier') || '';
  if (ident) {
    var type = opt_type || '';
    ident = ident.replace('__type__', type);

    // Split the URL.
    var hashParts = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].partition(url, '#');
    var queryParts = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].partition(hashParts[0], '?');
    var path = queryParts[0];
    var querySep = queryParts[1];
    var queryVal = queryParts[2];
    var hashSep = hashParts[1];
    var hashVal = hashParts[2];

    // Inject the identifier.
    if (__WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].startsWith(ident, '?')) {
      // If using a query-based identifier, append the identifier to the
      // existing query string.
      // For "?ident":
      //     /path -> path?ident
      //     /path?query -> path?query&ident
      if (querySep) {
        ident = ident.replace('?', '&');
      }
      queryVal += ident;
    } else if (__WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].startsWith(ident, '.')) {
      // If using an extension-based identifier, replace the existing
      // extension with the identifier.  If no extension exists, the
      // identifier is appended.  However, if the URL specifies a directory
      // (i.e. it ends with "/"), then append "index" to the URL first.
      // For ".ident":
      //     /path -> /path.ident
      //     /path.ext -> /path.ident
      //     /path/ -> /path/index.ident
      if (__WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].endsWith(path, '/')) {
        ident = 'index' + ident;
      } else {
        var ext = path.lastIndexOf('.');
        if (ext > -1) {
          path = path.substring(0, ext);
        }
      }
      path += ident;
    } else {
      // Finally, if using any other identifier, just append the identifier,
      // preventing duplicate "/" in the URL.
      // For "/ident":
      //     /path -> /path/ident
      //     /path/ -> /path/ident
      // For "_ident":
      //     /path -> /path_ident
      //     /path/ -> /path/_ident
      if (__WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].endsWith(path, '/') && __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].startsWith(ident, '/')) {
        ident = ident.substring(1);
      }
      path += ident;
    }

    // Re-assemble the URL.
    url = path + querySep + queryVal + hashSep + hashVal;
  }
  return url;
};

/**
 * Appends the parameters to the url. Any existing parameters or hashes are
 * maintained.
 *
 * @param {string} url A URL.
 * @param {!Object.<string, string>} parameters An object with new parameters
 *    as key/value pairs.
 * @return {string} A new URL with the parameters included.
 */
spfUrl.appendParameters = function (url, parameters) {
  var result = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].partition(url, '#');
  url = result[0];
  var delim = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].contains(url, '?') ? '&' : '?';
  for (var key in parameters) {
    url += delim + key;
    if (parameters[key]) {
      url += '=' + parameters[key];
    }
    delim = '&';
  }
  // Reattach the hash.
  return url + result[1] + result[2];
};

/**
 * Removes a list of parameters from a given url.
 *
 * @param {string} url A URL.
 * @param {!Array.<string>} parameters A list of parameter keys to remove.
 * @return {string} A new URL with the parameters removed.
 */
spfUrl.removeParameters = function (url, parameters) {
  var result = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].partition(url, '#');
  url = result[0];
  __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].each(parameters, function (param) {
    // Strip all parameters matching the param key.
    var regex = new RegExp('([?&])' + param + '(?:=[^&]*)?(?:(?=[&])|$)', 'g');
    url = url.replace(regex, function (_, delim) {
      return delim == '?' ? delim : '';
    });
  });
  // Remove an unecessary trailing question marks.
  if (__WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].endsWith(url, '?')) {
    url = url.slice(0, -1);
  }
  // Reattach the hash.
  return url + result[1] + result[2];
};

/**
 * Appends a configurable set of parameters that should persist across URLs.
 *
 * @param {string} url A URL.
 * @return {string} A new URL with the persistent parameters included.
 */
spfUrl.appendPersistentParameters = function (url) {
  // Get the param config of the form "abc=def&foo=bar"
  var parameterConfig = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].get('advanced-persistent-parameters') || '';
  var result = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].partition(url, '#');
  url = result[0];
  var delim = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].contains(url, '?') ? '&' : '?';
  // Append the persistent parameters to the URL.
  url += parameterConfig ? delim + parameterConfig : '';
  // Reattach the hash.
  return url + result[1] + result[2];
};

/**
 * Converts an absolute URL to protocol-relative (e.g. no http: or https:).
 * Has no effect on relative URLs.
 *
 * @param {string} url An absolute URL.
 * @return {string} An protocol-relative URL, if possible.
 */
spfUrl.unprotocol = function (url) {
  return url.replace(/^[a-zA-Z]+:\/\//, '//');
};

/**
 * Removes a hash from a URL.
 *
 * @param {string} url A URL.
 * @return {string}  A URL without a hash, if possible.
 */
spfUrl.unhash = function (url) {
  var res = __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].partition(url, '#');
  return res[0];
};

/* harmony default export */ __webpack_exports__["a"] = (spfUrl);

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/cache/cache.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(/*! ../state */ 4);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Data caching functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfCache');





var spfCache = {};

/**
 * Gets data from the cache.  If the data age exceeds the data lifetime, no
 * data is returned.
 *
 * If data is successfully returned from cache, the data's moved to the top of
 * the cache, making it less likely to be garbage collected.
 *
 * @param {string} key Key for the data object.
 * @return {*} The data, if it exists.
 */
spfCache.get = function (key) {
  var storage = spfCache.storage_();
  if (!(key in storage)) {
    return;
  }
  var unit = storage[key];
  // If the data is valid, return it.
  if (spfCache.valid_(unit)) {
    spfCache.updateCount_(unit);
    return unit['data'];
  }
  // Otherwise, the data should be removed from the cache.
  spfCache.remove(key);
};

/**
 * Sets data in the cache if the both the specified lifetime and the
 * globally configured maximum allow it.
 *
 * @param {string} key Key for the data object.
 * @param {*} data The data.
 * @param {?number=} opt_lifetime Lifetime for the data object.
 *     Defaults to forever if not specified or if null is specified. If a
 *     lifetime of less than 1 is specified, the data is not set in the cache.
 */
spfCache.set = function (key, data, opt_lifetime) {
  var lifetime = parseInt(opt_lifetime, 10);
  var max = parseInt(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].get('cache-max'), 10);
  if (lifetime <= 0 || max <= 0) {
    return;
  }
  var storage = spfCache.storage_();
  storage[key] = spfCache.create_(key, data, lifetime);
  // When setting data in the cache, trigger an asynchronous garbage collection
  // run to prevent unnecessary memory growth.
  setTimeout(spfCache.collect, 1000);
};

/**
 * Removes data from the cache.
 *
 * @param {string} key Key for the data object.
 */
spfCache.remove = function (key) {
  var storage = spfCache.storage_();
  if (key in storage) {
    delete storage[key];
  }
};

/**
 * Removes all data from the cache.
 */
spfCache.clear = function () {
  spfCache.storage_({});
};

/**
 * Removes expired data from the cache (aka garbage collection). Invalid data
 * and data with an age exceeding the data lifetime will be removed.
 */
spfCache.collect = function () {
  var storage = spfCache.storage_();
  for (var key in storage) {
    var unit = storage[key];
    // If invalid data exists, remove.
    if (!spfCache.valid_(unit)) {
      delete storage[key];
    }
  }
  // Trim the oldest entries if the cache is still above the max size.
  spfCache.trim_();
};

// TODO(nicksay): Make count non-optional with next release.
/**
 * Type definition for a SPF cache unit object.
 * - data: The data to cache.
 * - life: Lifetime of the data (milliseconds).
 * - time: Timestamp when the data was stored (milliseconds).
 * - count: The counter for the cached data.
 *
 * @typedef {{
 *   data: *,
 *   life: number,
 *   time: number,
 *   count: number
 * }}
 */
spfCache.Unit;

/**
 * @param {spfCache.Unit} unit The cache unit.
 * @return {boolean}
 * @private
 */
spfCache.valid_ = function (unit) {
  // Ensure valid data is availabe.
  if (!(unit && 'data' in unit)) {
    return false;
  }
  // A lifetime of NaN is considered forever.  If the age is less than the
  // lifetime, then the unit is valid.  Note that if the timestamp is
  // missing, the unit will not be valid.
  var lifetime = unit['life'];
  lifetime = isNaN(lifetime) ? Infinity : lifetime;
  var timestamp = unit['time'];
  var age = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now() - timestamp;
  return age < lifetime;
};

/**
 * Trim down the cache units to fit under the cache maximum, based on the
 * lowest count value (oldest entry).
 *
 * @private
 */
spfCache.trim_ = function () {
  var storage = spfCache.storage_();
  var max = parseInt(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].get('cache-max'), 10);
  max = isNaN(max) ? Infinity : max;
  var extra = Object.keys(storage).length - max;
  // If the current cache is smaller than the max, no trimming is needed.
  if (extra <= 0) {
    return;
  }

  // Remove the smallest element 'extra' times to trim the cache down to size.
  for (var i = 0; i < extra; i++) {
    var min = { count: Infinity };
    for (var key in storage) {
      if (storage[key].count < min.count) {
        min.key = key;
        min.count = storage[key].count;
      }
    }
    delete storage[min.key];
  }
};

/**
 * @param {string} key Key for the data object.
 * @param {*} data The data.
 * @param {number} lifetime Lifetime for the data object.
 * @return {!spfCache.Unit}
 * @private
 */
spfCache.create_ = function (key, data, lifetime) {
  var unit = { 'data': data, 'life': lifetime, 'time': __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now(), 'count': 0 };
  spfCache.updateCount_(unit);
  return unit;
};

/**
 * Update the count of the given unit and the global cache counter to the
 * latest.
 * @param {spfCache.Unit} unit The cache unit.
 * @private
 */
spfCache.updateCount_ = function (unit) {
  var count = parseInt(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.CACHE_COUNTER), 10) || 0;
  count++;
  __WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.CACHE_COUNTER, count);

  unit.count = count;
};

/**
 * @param {!Object.<string, spfCache.Unit>=} opt_storage Optional storage
 *     object to overwrite the current value.
 * @return {!Object.<string, spfCache.Unit>} Current storage object.
 * @private
 */
spfCache.storage_ = function (opt_storage) {
  if (opt_storage || !__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.CACHE_STORAGE)) {
    return (/** @type {!Object.<string, spfCache.Unit>} */__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.CACHE_STORAGE, opt_storage || {})
    );
  }
  return (/** @type {!Object.<string, spfCache.Unit>} */__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.CACHE_STORAGE)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (spfCache);

/***/ }),
/* 19 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./app/javascript/packs/spf/dom/classlist.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/**
 * @fileoverview Element class manipulation functions.
 * See {@link http://www.w3.org/TR/html5/dom.html#classes}.
 *
 */

// goog.provide('spfDomClasslist');


var spfDomClasslist = {};

/**
 * Returns an array of class names on a node.
 *
 * @param {Node|EventTarget} node DOM node to evaluate.
 * @return {{length: number}} Array-like object of class names on the node.
 */
spfDomClasslist.get = function (node) {
  if (node.classList) {
    return node.classList;
  } else {
    return node.className && node.className.match(/\S+/g) || [];
  }
};

/**
 * Returns true if a node has a class.
 *
 * @param {Node|EventTarget} node DOM node to test.
 * @param {string} cls Class name to test for.
 * @return {boolean} Whether node has the class.
 */
spfDomClasslist.contains = function (node, cls) {
  if (!cls) {
    return false;
  } else if (node.classList) {
    return node.classList.contains(cls);
  } else {
    var classes = spfDomClasslist.get(node);
    return __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].some(classes, function (item) {
      return item == cls;
    });
  }
};

/**
 * Adds a class to a node. Does not add multiples.
 *
 * @param {Node|EventTarget} node DOM node to add class to.
 * @param {string} cls Class name to add.
 */
spfDomClasslist.add = function (node, cls) {
  if (cls) {
    if (node.classList) {
      node.classList.add(cls);
    } else if (!spfDomClasslist.contains(node, cls)) {
      node.className += ' ' + cls;
    }
  }
};

/**
 * Removes a class from a node.
 *
 * @param {Node|EventTarget} node DOM node to remove class from.
 * @param {string} cls Class name to remove.
 */
spfDomClasslist.remove = function (node, cls) {
  if (cls) {
    if (node.classList) {
      node.classList.remove(cls);
    } else {
      var classes = spfDomClasslist.get(node);
      var newClasses = __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].filter(classes, function (item) {
        return item != cls;
      });
      node.className = newClasses.join(' ');
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (spfDomClasslist);

/***/ }),
/* 20 */
/* exports provided: default */
/* exports used: default */
/*!**************************************************!*\
  !*** ./app/javascript/packs/spf/net/resource.js ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__debug_debug__ = __webpack_require__(/*! ../debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dom_dom__ = __webpack_require__(/*! ../dom/dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dom_classlist__ = __webpack_require__(/*! ../dom/classlist */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__ = __webpack_require__(/*! ../pubsub/pubsub */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__state__ = __webpack_require__(/*! ../state */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__string_string__ = __webpack_require__(/*! ../string/string */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tasks_tasks__ = __webpack_require__(/*! ../tasks/tasks */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__url_url__ = __webpack_require__(/*! ../url/url */ 13);
// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for loading and unloading external resources such
 * as scripts and stylesheets.
 * See {@link spfBase.net.script} and {@link spfBase.net.style}.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfNetResource');
// goog.provide('spfNetResource.name');
// goog.provide('spfNetResource.status');
// goog.provide('spfNetResource.url');












var spfNetResource = {};
spfNetResource.status = spfNetResource.status || {};
spfNetResource.name = spfNetResource.name || {};
spfNetResource.url = spfNetResource.url || {};

/**
 * Loads a resource asynchronously and optionally defines a name to use for
 * dependency management and unloading.  See {@link #unload} to remove
 * previously loaded resources.
 *
 * NOTE: Automatic unloading of stylesheets depends on "onload" support and is
 * best effort.  Chrome 19, Safari 6, Firefox 9, Opera and IE 5.5 are supported.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource to load.
 * @param {string} name Name to identify the resource.
 * @param {Function=} opt_fn Optional callback function to execute when the
 *     resource is loaded.
 */
spfNetResource.load = function (type, url, name, opt_fn) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('resource.load', type, url, name);
  var isJS = type == spfNetResource.Type.JS;

  url = spfNetResource.canonicalize(type, url);

  // Calling load without a name or with an empty string for a name isn't
  // officially supported, but if it happens, use a pseudonym to allow the
  // the resource to load and fire the callback.
  var pseudonym = name || '^' + url;
  var topic = spfNetResource.key(type, pseudonym);
  var prevUrl;

  // If a name is provided with a different URL, then also unload the previous
  // version after the resource is loaded.
  //
  // NOTE: When built for the bootloader, automatic unloading of scripts is not
  // supported.  If someone is attempting to load a new version of a script
  // before loading the main SPF code, then this should be an error.  Automatic
  // unloading of scripts is primarily intended for navigation between versions.
  if (name && !__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
    // If loading a new resource for a name, handle unloading the previous one.
    prevUrl = spfNetResource.url.get(type, name);
    if (prevUrl && url != prevUrl) {
      var evt = isJS ? __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.JS_BEFORE_UNLOAD : __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.CSS_BEFORE_UNLOAD;
      __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(evt, { 'name': name, 'url': prevUrl });
      spfNetResource.unloadPrepare_(type, name, prevUrl);
      // Wait until the new resource has finished loading before destroying
      // the previous one to avoid flashes of unstyled content w/ CSS.
      var unloadComplete = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNetResource.unloadComplete_, null, type, name, prevUrl);
      __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__["a" /* default */].subscribe(topic, unloadComplete);
    }
  }

  // Associate the name/pseudonym with the resource for tracking name changes.
  // Associate the resource with the name/pseudonym for unloading + callbacks.
  var prevName = spfNetResource.name.get(type, url);
  if (prevName && pseudonym != prevName) {
    // If changing names for this resource, remove the existing
    // name-to-resource and resource-to-name mappings (which are re-set just
    // below), and then transfer any callbacks.
    spfNetResource.url.clear(type, prevName);
    spfNetResource.name.clear(type, url);
    var prevTopic = spfNetResource.key(type, prevName);
    __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__["a" /* default */].rename(prevTopic, topic);
  }
  spfNetResource.name.set(type, url, pseudonym);
  spfNetResource.url.set(type, pseudonym, url);

  // Subscribe the callback to execute when the url is loaded.
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  subscribing callback', topic);
  __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__["a" /* default */].subscribe(topic, opt_fn);
  var check = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNetResource.check, null, type);

  // If a status exists, the resource is already loading or loaded.
  // Otherwise, create the resource.
  if (spfNetResource.status.get(type, url)) {
    if (prevName && pseudonym != prevName) {
      // If changing names for this resource and it's already loaded, find
      // it and update the name attribute to keep the DOM in sync.
      var el = spfNetResource.find(type, url);
      if (el) {
        el.setAttribute('name', name || '');
      }
    }
    check();
  } else {
    // If prevUrl is defined and the type is CSS, the styleshet will be loaded
    // in-place. This works because previous elements aren't destroyed until
    // loading is complete.
    var el = spfNetResource.create(type, url, check, undefined, undefined, prevUrl);
    if (el && name) {
      el.setAttribute('name', name);
    }
  }
};

/**
 * Unloads resources identified by dependency name.  See {@link #load}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 */
spfNetResource.unload = function (type, name) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].warn('resource.unload', type, name);
  var url = spfNetResource.url.get(type, name);
  spfNetResource.unloadPrepare_(type, name, url);
  spfNetResource.unloadComplete_(type, name, url);
};

/**
 * See {@link #unload}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @param {string|undefined} url The URL.
 * @private
 */
spfNetResource.unloadPrepare_ = function (type, name, url) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  > resource.unloadPrepare_', type, url);
  // Clear the dependency name to URL mapping.
  spfNetResource.url.clear(type, name);
  // Clear the URL to dependency name mapping.
  if (url) {
    spfNetResource.name.clear(type, url);
  }
  var topic = spfNetResource.key(type, name);
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  clearing callbacks for', topic);
  // Clear any pending callbacks for the dependency name.
  __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__["a" /* default */].clear(topic);
};

/**
 * See {@link #unload}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @param {string|undefined} url The URL.
 * @private
 */
spfNetResource.unloadComplete_ = function (type, name, url) {
  var isJS = type == spfNetResource.Type.JS;
  if (url) {
    __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  > resource.unloadComplete_', type, url);
    var evt = isJS ? __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.JS_UNLOAD : __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.CSS_UNLOAD;
    __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(evt, { 'name': name, 'url': url });
    spfNetResource.destroy(type, url);
  }
};

/**
 * Executes any pending callbacks possible by checking if any URLs for names
 * of a given type have loaded.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 */
spfNetResource.check = function (type) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('resource.check', type);
  var prefix = spfNetResource.key(type, '');
  for (var topic in __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__["a" /* default */].subscriptions) {
    if (topic.indexOf(prefix) == 0) {
      var names = topic.substring(prefix.length).split('|');
      var loaded = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNetResource.url.loaded, null, type);
      var ready = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].every(names, loaded);
      __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug(' ', topic, '->', names, '=', ready);
      if (ready) {
        __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  publishing', topic);
        // Because check evaluates the pubsub.subscriptions array to determine
        // if urls for names are loaded, there is a potential subscribe/publish
        // infinite loop:
        //     require_ -> load (subscribe) -> check (publish) ->
        //     load (subscribe) -> <loop forever> ...
        // To avoid this, use flush instead of publish + clear to ensure that
        // previously subscribed functions are removed before execution:
        //     require_ -> load (subscribe) -> check (flush) -> <no loop>
        __WEBPACK_IMPORTED_MODULE_5__pubsub_pubsub__["a" /* default */].flush(topic);
      }
    }
  }
};

/**
 * Adds a resource to the page by creating an element and appending it to
 * the document.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {Function=} opt_callback Callback for when the resource has loaded.
 * @param {Document=} opt_document Optional document to use.
 * @param {string=} opt_statusGroup Optional group to use in status tracking.
 * @param {string=} opt_prevUrl Optional URL of the previous version of this
 *     resource. Used for stylesheets to load new versions in-place to prevent
*      changing the order of the cascade.
 * @return {Element} The dynamically created element.
 */
spfNetResource.create = function (type, url, opt_callback, opt_document, opt_statusGroup, opt_prevUrl) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('resource.create', type, url, 'loading');
  // When built for the bootloader, always assume JS is being loaded.
  var isJS = __WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */] || type == spfNetResource.Type.JS;
  url = spfNetResource.canonicalize(type, url);
  spfNetResource.status.set(spfNetResource.State.LOADING, type, url, opt_statusGroup);
  var tag = isJS ? 'script' : 'link';
  var doc = opt_document || document;
  var el = doc.createElement(tag);
  var next = function next() {
    __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('resource.create', type, url, 'done');
    // Only update status if the resource has not been removed in the interim.
    if (spfNetResource.status.get(type, url, opt_statusGroup)) {
      __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('resource.create', type, url, 'loaded');
      spfNetResource.status.set(spfNetResource.State.LOADED, type, url, opt_statusGroup);
    }
    if (isJS && el && el.parentNode && doc == document && !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */]) {
      // Remove scripts afterwards to avoid unnecessary increased DOM size.
      el.parentNode.removeChild(el);
    }
    // IE 10 has a bug where it will synchronously call load handlers for
    // cached resources, force this to be async for consistency.
    if (opt_callback) {
      setTimeout(opt_callback, 0);
    }
    return null;
  };
  if (!url) {
    return next();
  }
  var label = spfNetResource.label(url);
  el.className = spfNetResource.key(type, label);
  // Chrome, Safari, Firefox, Opera and IE 9 support script onload.
  // Chrome 19, Safari 6, Firefox 9, Opera and IE 5.5 support stylesheet onload.
  // To support scripts IE 8 and below, use script onreadystatechange.
  if ('onload' in el) {
    el.onerror = el.onload = next;
  } else {
    el.onreadystatechange = function () {
      // For IE 8 and below, script readyState will be one of the following:
      // * uninitialized
      // * loading
      // * loaded
      // * interactive
      // * complete
      // Match either "loaded" or "complete" to provide the equivalent of
      // script onload.  (Note that "interactive" can be skipped).
      if (/^c|loade/.test(el.readyState)) {
        next();
      }
    };
  }
  // For scripts, set the onload and onreadystatechange handlers before
  // setting the src to avoid potential IE bug where handlers are not called.
  // Prefer placing resources in the head instead of the body to avoid errors
  // when called from the head in the first place.
  var targetEl = doc.getElementsByTagName('head')[0] || doc.body;
  if (isJS) {
    el.async = true;
    el.src = url;
    // Use insertBefore for JS to avoid IE execution errors.
    targetEl.insertBefore(el, targetEl.firstChild);
  } else {
    el.rel = 'stylesheet';
    el.href = url;
    // If this stylesheet already exists under a different URL,
    // reload it in-place to prevent changing the order of the cascade.
    // It is only reloaded it in-place if it already exists in the head,
    // otherwise the new element is appended.
    var prevEl = opt_prevUrl ? spfNetResource.find(type, opt_prevUrl, targetEl) : null;
    if (prevEl) {
      targetEl.insertBefore(el, prevEl);
    } else {
      targetEl.appendChild(el);
    }
  }
  return el;
};

/**
 * Removes a resource by removing a previously created element that was
 * appended to the document.  See {@link #create}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {Document=} opt_document Optional document to use.
 */
spfNetResource.destroy = function (type, url, opt_document) {
  url = spfNetResource.canonicalize(type, url);
  var el = spfNetResource.find(type, url, opt_document);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  spfNetResource.status.clear(type, url);
};

/**
 * Finds a previously created element.
 * See {@link #create}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {(Document|Element)=} opt_root Optional document or element to
 *     search in.
 * @return {!Node|undefined} The found element, or undefined if not found.
 */
spfNetResource.find = function (type, url, opt_root) {
  var label = spfNetResource.label(url);
  var cls = spfNetResource.key(type, label);
  var selector = '.' + cls;
  var els = __WEBPACK_IMPORTED_MODULE_3__dom_dom__["a" /* default */].query(selector, opt_root);
  return els[0];
};

/**
 * Discovers existing resources in the document and registers them as loaded.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @return {Array.<Node>|NodeList} The newly found elements.
 */
spfNetResource.discover = function (type) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('resource.discover', type);
  var isJS = type == spfNetResource.Type.JS;
  var selector = isJS ? 'script[src]' : 'link[rel~="stylesheet"]';
  var els = [];
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(__WEBPACK_IMPORTED_MODULE_3__dom_dom__["a" /* default */].query(selector), function (el) {
    var url = isJS ? el.src : el.href;
    url = spfNetResource.canonicalize(type, url);
    // Ignore if already loading or loaded.
    if (!spfNetResource.status.get(type, url)) {
      spfNetResource.status.set(spfNetResource.State.LOADED, type, url);
      var label = spfNetResource.label(url);
      var cls = spfNetResource.key(type, label);
      __WEBPACK_IMPORTED_MODULE_4__dom_classlist__["a" /* default */].add(el, cls);
      var name = el.getAttribute('name');
      if (name) {
        spfNetResource.name.set(type, url, name);
        spfNetResource.url.set(type, name, url);
      }
      els.push(el);
      __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  found', url, cls, name);
    }
  });

  var contentSelector = isJS ? 'script[name]' : 'style[name]';
  var str = '';
  var id = '';
  var name = '';
  var label = '';
  var cls = '';
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(__WEBPACK_IMPORTED_MODULE_3__dom_dom__["a" /* default */].query(contentSelector), function (el) {
    name = el.getAttribute('name');
    if (name) {
      str = el.innerText.replace(/(\r\n|\n|\r)/gm, '');

      // Use a hashcode to identify the resource instead of a URL.
      id = 'hash-' + __WEBPACK_IMPORTED_MODULE_7__string_string__["a" /* default */].hashcode(str.replace(/\s/g, ''));

      // Ignore if already loading or loaded.
      if (!spfNetResource.status.get(type, id)) {
        spfNetResource.status.set(spfNetResource.State.LOADED, type, id);

        spfNetResource.url.set(type, name, id);

        label = spfNetResource.label(id);
        cls = spfNetResource.key(type, label);
        el.className = cls;
        el.setAttribute('name', name);

        els.push(el);
      }
    }
  });

  return els;
};

/**
 * Prefetches a resource by creating a dummy element and appending it to an
 * iframe document.  The resource will be requested but not loaded. Use to
 * prime the browser cache and avoid needing to request the resource when
 * subsequently loaded.  See {@link #get}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {boolean=} opt_force Whether to force fetching the resource even if
 *     it has already been fetched before; useful for preconnect when the
 *     connection keep-alive is shorter than repeat attempt intervals.
 */
spfNetResource.prefetch = function (type, url, opt_force) {
  if (!url) {
    return;
  }
  url = spfNetResource.canonicalize(type, url);
  // Skip fetching if the element is already loaded on the page, unless
  // opt_force is specified.
  if (!opt_force && spfNetResource.status.get(type, url)) {
    return;
  }
  // If opt_force is specified, tracking whether the element exists is unneeded,
  // and if prefetching an image (e.g. for URL preconnection), the standard DOM
  // logic is also unneeded.  In this case, use the simpler/faster Image object.
  if (opt_force && type == spfNetResource.Type.IMG) {
    spfNetResource.preconnect_(url);
    return;
  }
  var label = spfNetResource.label(url);
  var id = spfNetResource.key(type, label);
  var key = spfNetResource.key(type, 'prefetch');
  var el = /** @type {HTMLIFrameElement} */document.getElementById(key);
  if (!el) {
    el = __WEBPACK_IMPORTED_MODULE_3__dom_dom__["a" /* default */].createIframe(key, null, function (el) {
      // Use the title attribute as the iframe's loaded flag.
      el.title = key;
      __WEBPACK_IMPORTED_MODULE_8__tasks_tasks__["a" /* default */].run(key, true);
    });
  } else {
    // Return if the resource is already prefetched, unless opt_force is
    // specified.
    if (!opt_force && el.contentWindow.document.getElementById(id)) {
      return;
    }
  }
  // Firefox needs the iframe to be fully created in the DOM before continuing.
  // So delay adding elements to the iframe until onload.
  var next = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNetResource.prefetch_, null, el, type, url, id, key);
  if (!el.title) {
    __WEBPACK_IMPORTED_MODULE_8__tasks_tasks__["a" /* default */].add(key, next);
  } else {
    next();
  }
};

/**
 * See {@link #prefetch}.
 *
 * @param {HTMLIFrameElement} el The iframe to load resources in.
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {string} id The computed unique id of the resource.
 * @param {string} group The group value to use when tracking these resources.
 * @private
 */
spfNetResource.prefetch_ = function (el, type, url, id, group) {
  var isJS = type == spfNetResource.Type.JS;
  var isCSS = type == spfNetResource.Type.CSS;
  var doc = el.contentWindow.document;
  // If an element with a given id already exists, remove it before prefetching
  // the resource to avoid growing the overall DOM size.  Since `prefetch`
  // already checks for the element's existence before calling this method,
  // this is to prevent repeated calls with `opt_force` from always generating
  // new nodes.
  var fetchEl = doc.getElementById(id);
  if (fetchEl) {
    fetchEl.parentNode.removeChild(fetchEl);
  }
  if (isJS) {
    fetchEl = doc.createElement('object');
    if (spfNetResource.IS_IE) {
      // IE needs a <script> in order to complete the request, but
      // fortunately will not execute it unless in the DOM.  Attempting to
      // use an <object> like other browsers will cause the download to hang.
      // The <object> will just be a placeholder for the request made.
      var extraElForIE = doc.createElement('script');
      extraElForIE.src = url;
    } else {
      // Otherwise scripts need to be prefetched as objects to avoid execution.
      fetchEl.data = url;
    }
    fetchEl.id = id;
    doc.body.appendChild(fetchEl);
  } else if (isCSS) {
    // Stylesheets can be prefetched in the same way as loaded.
    fetchEl = spfNetResource.create(type, url, null, doc, group);
    fetchEl.id = id;
  } else {
    // For establishing a preconnection, use an image request.
    fetchEl = doc.createElement('img');
    if (spfNetResource.IS_IE) {
      // IE needs page-level cache busting to properly re-request images, but
      // not network-level.  Use URL hashes to trick it into re-sending.
      url = url + '#' + __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
    }
    fetchEl.src = url;
    fetchEl.id = id;
    doc.body.appendChild(fetchEl);
  }
};

/**
 * See {@link #prefetch}.
 *
 * @param {string} url URL of the resource.
 * @private
 */
spfNetResource.preconnect_ = function (url) {
  // For establishing a preconnection, use an image request.  When the DOM logic
  // is not needed to track status, use the simpler/faster object approach.
  var img = new Image();
  if (spfNetResource.IS_IE) {
    // IE needs page-level cache busting to properly re-request images, but
    // not network-level.  Use URL hashes to trick it into re-sending.
    url = url + '#' + __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
  }
  img.src = url;
};

/**
 * Evaluates resource text and defines a name to use for management.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} text The text of the resource.
 * @param {string} name Name to identify the resource.
 */
spfNetResource.eval = function (type, text, name) {
  var isJS = type == spfNetResource.Type.JS;
  var previous = spfNetResource.url.get(type, name);
  // Use a hashcode to identify the resource instead of a URL.
  var id = 'hash-' + __WEBPACK_IMPORTED_MODULE_7__string_string__["a" /* default */].hashcode(text.replace(/\s/g, ''));
  spfNetResource.url.set(type, name, id);
  var complete = spfNetResource.status.loaded(type, id);
  if (complete) {
    return;
  }
  var el = spfNetResource.exec(type, text);
  if (!el) {
    return;
  }
  spfNetResource.status.set(spfNetResource.State.LOADED, type, id);
  if (el && (!isJS || __WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */])) {
    // Script elements are removed after execution, so only modify attributes
    // if a style or in debug mode.
    var label = spfNetResource.label(id);
    var cls = spfNetResource.key(type, label);
    el.className = cls;
    el.setAttribute('name', name);
  }
  previous = previous && previous[0];
  if (previous) {
    spfNetResource.destroy(type, previous);
  }
};

/**
 * Executes resource text by creating an element and appending it to
 * the document.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} text The text of the resource.
 * @return {Element} The dynamically created element.
 */
spfNetResource.exec = function (type, text) {
  text = __WEBPACK_IMPORTED_MODULE_7__string_string__["a" /* default */].trim(text);
  if (!text) {
    return null;
  }
  var isJS = type == spfNetResource.Type.JS;
  var targetEl = document.getElementsByTagName('head')[0] || document.body;
  var el;
  if (isJS) {
    el = document.createElement('script');
    el.text = text;
    // Place the scripts in the head instead of the body to avoid errors
    // when called from the head in the first place.
    targetEl.appendChild(el);
    if (!__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */]) {
      // Remove scripts afterwards to avoid unnecessary increased DOM size.
      targetEl.removeChild(el);
    }
  } else {
    el = document.createElement('style');
    // IE requires the style element to be in the document before accessing
    // the StyleSheet object.
    targetEl.appendChild(el);
    if ('styleSheet' in el) {
      el.styleSheet.cssText = text;
    } else {
      el.appendChild(document.createTextNode(text));
    }
  }
  return el;
};

/**
 * Sets the path prefix or replacement map to use when resolving relative URLs.
 * See {@link #canonicalize}.
 *
 * Note: The order in which replacements are made is not guaranteed.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string|Object.<string>} paths The paths.
 */
spfNetResource.path = function (type, paths) {
  var key = /** @type {spfState.Key} */__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_PATHS_PREFIX + type;
  __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(key, paths);
};

/**
 * Convert a resource URL to the "canonical" version in three steps:
 *   1: replacing path segments (see {@link #path})
 *   2: appending a file type extension
 *   3: converting to absolute (see {@link spfUrl.absolute})
 * Absolute URLs (i.e. those that start with http://) are ignored for all
 * three steps.  Protocol-relative URLs (i.e. those that start with //)
 * are ignored for steps 1 and 2.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The initial url.
 * @return {string} The adjusted url.
 */
spfNetResource.canonicalize = function (type, url) {
  var key = /** @type {spfState.Key} */__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_PATHS_PREFIX + type;
  if (url) {
    var index = url.indexOf('//');
    if (index < 0) {
      // Relative URL: "//" not found.
      if (__WEBPACK_IMPORTED_MODULE_7__string_string__["a" /* default */].startsWith(url, 'hash-')) {
        // Ignore hashcode IDs.
        return url;
      }
      var paths = __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].get(key) || '';
      if (__WEBPACK_IMPORTED_MODULE_7__string_string__["a" /* default */].isString(paths)) {
        url = paths + url;
      } else {
        for (var p in paths) {
          url = url.replace(p, paths[p]);
        }
      }
      // Images don't have a standard extension format.
      if (type != spfNetResource.Type.IMG) {
        url = url.indexOf('.' + type) < 0 ? url + '.' + type : url;
      }
      url = __WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].absolute(url);
    } else if (index == 0) {
      // Protocol-Relative URL: "//" found at start.
      url = __WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].absolute(url);
    }
  }
  return url;
};

/**
 * Build the full resource key.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} label The resource label.
 * @param {string=} opt_group An optional group name for the resource.
 * @return {string} The compound key.
 */
spfNetResource.key = function (type, label, opt_group) {
  return type + '-' + label + (opt_group ? '-' + opt_group : '');
};

/**
 * Convert a URL to an internal "label" for use in identifying it.
 *
 * @param {?} url The resource URL.
 * @return {string} The label.
 */
spfNetResource.label = function (url) {
  return url ? String(url).replace(/[^\w]/g, '') : '';
};

/**
 * Sets the loading status for a resource URL.
 *
 * @param {spfNetResource.State} status The loading status.
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @param {string=} opt_group Optional group.
 */
spfNetResource.status.set = function (status, type, url, opt_group) {
  var key = spfNetResource.key(type, url, opt_group);
  spfNetResource.status_[key] = status;
};

/**
 * Returns the loading status for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @param {string=} opt_group Optional group.
 * @return {spfNetResource.State|undefined} The loading status.
 */
spfNetResource.status.get = function (type, url, opt_group) {
  var key = spfNetResource.key(type, url, opt_group);
  return spfNetResource.status_[key];
};

/**
 * Clears the previously set loading status for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 */
spfNetResource.status.clear = function (type, url) {
  var key = spfNetResource.key(type, url);
  delete spfNetResource.status_[key];
};

/**
 * Checks to see if the status for a resource URL is "loaded".
 * URLs that are empty strings are always "loaded".
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @return {boolean} Whether the URL is loaded.
 */
spfNetResource.status.loaded = function (type, url) {
  var status = spfNetResource.status.get(type, url);
  return url == '' || status == spfNetResource.State.LOADED;
};

/**
 * Sets the dependency name for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @param {string} name The dependency name.
 */
spfNetResource.name.set = function (type, url, name) {
  var key = spfNetResource.key(type, url);
  spfNetResource.name_[key] = name;
};

/**
 * Returns the dependency name currently set for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @return {string|undefined} The dependency name.
 */
spfNetResource.name.get = function (type, url) {
  var key = spfNetResource.key(type, url);
  return spfNetResource.name_[key];
};

/**
 * Clears the previously set dependency name for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 */
spfNetResource.name.clear = function (type, url) {
  var key = spfNetResource.key(type, url);
  delete spfNetResource.name_[key];
};

/**
 * Sets the resource URL for a dependency name.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @param {string} url The URL.
 */
spfNetResource.url.set = function (type, name, url) {
  var key = spfNetResource.key(type, name);
  spfNetResource.url_[key] = url;
};

/**
 * Returns the resource URL currently set for a dependency name.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @return {string|undefined} The URL.
 */
spfNetResource.url.get = function (type, name) {
  var key = spfNetResource.key(type, name);
  var url = spfNetResource.url_[key];
  return url;
};

/**
 * Clears the previously set resource URL for a dependency name.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 */
spfNetResource.url.clear = function (type, name) {
  var key = spfNetResource.key(type, name);
  delete spfNetResource.url_[key];
};

/**
 * Checks to see if the resource URL for a dependency name has been loaded.
 * Dependency names that are empty strings are always "loaded".
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @return {boolean}
 */
spfNetResource.url.loaded = function (type, name) {
  var url = spfNetResource.url.get(type, name);
  return url != undefined && spfNetResource.status.loaded(type, url);
};

/**
 * Map a URL to a resource status.
 * @type {!Object.<spfNetResource.State>}
 * @private
 */
spfNetResource.status_ = {};

/**
 * Map a URL to a dependency name.
 * @type {!Object.<string>}
 * @private
 */
spfNetResource.name_ = {};

/**
 * Map a dependency name to a URL.
 * @type {!Object.<string>}
 * @private
 */
spfNetResource.url_ = {};

/**
 * Whether the browser is Internet Explorer; valid for MSIE 8+ aka Trident 4+.
 * @type {boolean}
 * @const
 */
spfNetResource.IS_IE = __WEBPACK_IMPORTED_MODULE_7__string_string__["a" /* default */].contains(navigator.userAgent, ' Trident/');

/**
 * The loading state of a resource.
 * @enum {number}
 */
spfNetResource.State = {
  LOADING: 1,
  LOADED: 2

  /**
   * Supported resource types.
   * @enum {string}
   */
};spfNetResource.Type = {
  CSS: 'css',
  IMG: 'img',
  JS: 'js'

  // Automatic initiazation for spfNetResource.status_.
  // When built for the bootloader, unconditionally set in state.
};if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_STATUS, spfNetResource.status_);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_STATUS)) {
    __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_STATUS, spfNetResource.status_);
  }
  spfNetResource.status_ =
  /** @type {!Object.<spfNetResource.State>} */__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_STATUS);
}

// Automatic initiazation for spfNetResource.name_.
// When built for the bootloader, unconditionally set the map in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_NAME, spfNetResource.name_);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_NAME)) {
    __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_NAME, spfNetResource.name_);
  }
  spfNetResource.name_ = /** @type {!Object.<string>} */__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_NAME);
}

// Automatic initiazation for spfNetResource.url_.
// When built for the bootloader, unconditionally set the map in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_URL, spfNetResource.url_);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_URL)) {
    __WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_URL, spfNetResource.url_);
  }
  spfNetResource.url_ = /** @type {!Object.<string>} */__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_6__state__["a" /* default */].Key.RESOURCE_URL);
}

/* harmony default export */ __webpack_exports__["a"] = (spfNetResource);

/***/ }),
/* 21 */
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./app/javascript/packs/spf/net/script.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__debug_debug__ = __webpack_require__(/*! ../debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__net_resource__ = __webpack_require__(/*! ../net/resource */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pubsub_pubsub__ = __webpack_require__(/*! ../pubsub/pubsub */ 41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__state__ = __webpack_require__(/*! ../state */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__string_string__ = __webpack_require__(/*! ../string/string */ 7);
// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for dynamically loading scripts without blocking.
 *
 * Provides asynchronous loading and dependency management, loosely similar to
 * $script.js {@link https://github.com/ded/script.js/} but with enhancements.
 * Designed to be built as both a standlone bootstrap script loader in the
 * document head and also built as part of the main SPF code. When both the
 * bootstrap and main code is loaded on the same page, the main code extends
 * the bootstrap code for seamless script loading.
 *
 * Unconditionally load a script:
 *     spfNetScript.get(url, function() {
 *       // url is loaded
 *     });
 *
 * Conditionally load a script only if not already loaded:
 *     spfNetScript.load(url, 'name', function() {
 *       // url is loaded
 *     });
 * Or:
 *     spfNetScript.load(url, 'name');
 *     spfNetScript.ready('name', function() {
 *       // url is loaded
 *     });
 *
 * @author nicksay@google.com (Alex Nicksay)
 */








// goog.provide('spfNetScript');
var spfNetScript = {};

/**
 * Loads a script asynchronously and defines a name to use for dependency
 * management and unloading.  See {@link #ready} to wait for named scripts to
 * be loaded and {@link #unload} to remove previously loaded scripts.
 *
 * - Subsequent calls to load the same URL will not reload the script.  To
 *   reload a script, unload it first with {@link #unload}.  To unconditionally
 *   load a script, see {@link #get}.
 *
 * - A name must be specified to identify the same script at different URLs.
 *   (For example, "main-A.js" and "main-B.js" are both "main".)  When a name
 *   is specified, all other scripts with the same name will be unloaded
 *   before the callback is executed.  This allows switching between
 *   versions of the same script at different URLs.
 *
 * - A callback can be specified to execute once the script has loaded.  The
 *   callback will be executed each time, even if the script is not reloaded.
 *
 * @param {string} url URL of the script to load.
 * @param {string} name Name to identify the script.
 * @param {Function=} opt_fn Optional callback function to execute when the
 *     script is loaded.
 */
spfNetScript.load = function (url, name, opt_fn) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].load(type, url, name, opt_fn);
};

/**
 * Unloads scripts identified by name.  See {@link #load}.
 *
 * NOTE: Unloading a script will prevent execution of ALL pending callbacks
 * but is NOT guaranteed to stop the browser loading a pending URL.
 *
 * @param {string} name The name.
 */
spfNetScript.unload = function (name) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].unload(type, name);
};

/**
 * Discovers existing scripts in the document and registers them as loaded.
 */
spfNetScript.discover = function () {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].discover(type);
};

/**
 * Unconditionally loads a script by dynamically creating an element and
 * appending it to the document without regard for dependencies or whether it
 * has been loaded before.  A script directly loaded by this method cannot
 * be unloaded by name.  Compare to {@link #load}.
 *
 * @param {string} url URL of the script to load.
 * @param {Function=} opt_fn Function to execute when loaded.
 */
spfNetScript.get = function (url, opt_fn) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].create(type, url, opt_fn);
};

/**
 * Prefetchs one or more scripts; the scripts will be requested but not loaded.
 * Use to prime the browser cache and avoid needing to request the script when
 * subsequently loaded.  See {@link #load}.
 *
 * @param {string|Array.<string>} urls One or more URLs of scripts to prefetch.
 */
spfNetScript.prefetch = function (urls) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  // Convert to an array if needed.
  urls = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(urls);
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(urls, function (url) {
    __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].prefetch(type, url);
  });
};

/**
 * Waits for one or more scripts identified by name to be loaded and executes
 * the callback function.  See {@link #load} or {@link #done} to define names.
 * If an empty name is provided, it will be considered loaded immediately.
 *
 * @param {string|Array.<string>} names One or more names.
 * @param {Function=} opt_fn Callback function to execute when the
 *     scripts have loaded.
 * @param {Function=} opt_require Callback function to execute if names
 *     are specified that have not yet been defined/loaded.
 */
spfNetScript.ready = function (names, opt_fn, opt_require) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;

  // Convert to an array if needed.
  names = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(names);
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('script.ready', names);

  // Filter out empty names.
  names = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].filter(names, function (name) {
    return !!name;
  });

  // Find unknown names.
  var unknown = [];
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(names, function (name) {
    if (__WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].url.get(type, name) == undefined) {
      unknown.push(name);
    }
  });

  // Check if all urls for the names are loaded.
  var known = !unknown.length;
  if (opt_fn) {
    var loaded = spf.bind(__WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].url.loaded, null, type);
    var ready = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].every(names, loaded);
    if (known && ready) {
      // If ready, execute the callback.
      opt_fn();
    } else {
      // Otherwise, wait for them to be loaded.
      var topic = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].key(type, names.sort().join('|'));
      __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  subscribing', topic);
      __WEBPACK_IMPORTED_MODULE_4__pubsub_pubsub__["a" /* default */].subscribe(topic, opt_fn);
    }
  }
  // If provided, call the require function to allow lazy-loading.
  if (opt_require && !known) {
    opt_require(unknown);
  }
};

/**
 * Notifies any waiting callbacks that `name` has completed loading.
 * Use with {@link #ready} for arbitrary readiness not directly tied to scripts.
 *
 * @param {string} name The ready name.
 */
spfNetScript.done = function (name) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].url.set(type, name, ''); // No associated URL.
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].check(type);
};

/**
 * "Ignores" a script load by canceling execution of a pending callback.
 *
 * Stops waiting for one or more scripts identified by name to be loaded and
 * cancels the pending callback execution.  The callback must have been
 * registered by {@link #load} or {@link #ready}.  If the callback was
 * registered by {@link #ready} and more than one name was provided, the same
 * names must be used here.
 *
 * @param {string|Array.<string>} names One or more names.
 * @param {Function} fn Callback function to cancel.
 */
spfNetScript.ignore = function (names, fn) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  // Convert to an array if needed.
  names = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(names);
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('script.ignore', names);
  var topic = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].key(type, names.sort().join('|'));
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('  unsubscribing', topic);
  __WEBPACK_IMPORTED_MODULE_4__pubsub_pubsub__["a" /* default */].unsubscribe(topic, fn);
};

/**
 * Recursively loads scripts identified by name, first loading
 * any dependendent scripts.  Use {@link #declare} to define dependencies.
 *
 * @param {string|Array.<string>} names One or more names.
 * @param {Function=} opt_fn Callback function to execute when the
 *     scripts have loaded.
 */
spfNetScript.require = function (names, opt_fn) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('script.require', names);

  // When built for the bootloader, automatic unloading of scripts is not
  // supported.  If someone is attempting to load a new version of a script
  // before loading the main SPF code, then this should be an error.  Automatic
  // unloading of scripts is primarily intended for navigation between versions.
  if (!__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
    // Convert to an array if needed.
    names = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(names);
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(names, function (name) {
      if (name) {
        var url = spfNetScript.url_[name] || name;
        url = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].canonicalize(type, url);
        var previous = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].url.get(type, name);
        if (previous && url != previous) {
          spfNetScript.unrequire(name);
        }
      }
    });
  }

  spfNetScript.ready(names, opt_fn, spfNetScript.require_);
};

/**
 * See {@link #require}.
 *
 * @param {Array.<string>} names The names.
 * @private
 */
spfNetScript.require_ = function (names) {
  // Iterate and check if there are declared dependencies.
  // If so, check if the deps are ready and if not recurse.
  // If not, load the scripts for that name.
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(names, function (name) {
    var deps = spfNetScript.deps_[name];
    var url = spfNetScript.url_[name] || name;
    var next = function next() {
      spfNetScript.load(url, name);
    };
    if (deps) {
      spfNetScript.require(deps, next);
    } else {
      next();
    }
  });
};

/**
 * Recursively unloads scripts identified by name, first unloading
 * any dependendent scripts.  Use {@link #declare} to define dependencies.
 *
 * @param {string|Array.<string>} names One or more names.
 */
spfNetScript.unrequire = function (names) {
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].debug('script.unrequire', names);
  // Convert to an array if needed.
  names = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(names);
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(names, function (name) {
    var descendants = [];
    for (var dep in spfNetScript.deps_) {
      var list = spfNetScript.deps_[dep];
      list = __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(list);
      __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(list, function (l) {
        if (l == name) {
          descendants.push(dep);
        }
      });
    }
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(descendants, function (descend) {
      spfNetScript.unrequire(descend);
    });
    spfNetScript.unload(name);
  });
};

/**
 * Evaluates script text and defines a name to use for management.
 *
 * - Subsequent calls to evaluate the same text will not re-evaluate the script.
 *   To unconditionally evalute a script, see {@link #exec}.
 *
 * @param {string} text The text of the script.
 * @param {string} name Name to identify the script.
 * @return {undefined}
 */
spfNetScript.eval = function (text, name) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  var el = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].eval(type, text, name);
};

/**
 * Unconditionally evaluates script text.  See {@link #eval}.
 *
 * @param {string} text The text of the script.
 */
spfNetScript.exec = function (text) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  var el = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].exec(type, text);
};

/**
 * Sets the dependency map and optional URL map used when requiring scripts.
 * See {@link #require}.
 *
 * @param {Object.<(string|Array.<string>)>} deps The dependency map.
 * @param {Object.<string>=} opt_urls The optional URL map.
 */
spfNetScript.declare = function (deps, opt_urls) {
  if (deps) {
    for (var name in deps) {
      spfNetScript.deps_[name] = deps[name];
    }
    if (opt_urls) {
      for (var name in opt_urls) {
        spfNetScript.url_[name] = opt_urls[name];
      }
    }
  }
};

/**
 * Sets the path prefix or replacement map to use when resolving relative URLs.
 *
 * Note: The order in which replacements are made is not guaranteed.
 *
 * @param {string|Object.<string>} paths The paths.
 */
spfNetScript.path = function (paths) {
  var type = __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].Type.JS;
  __WEBPACK_IMPORTED_MODULE_3__net_resource__["a" /* default */].path(type, paths);
};

/**
 * Map of dependencies used for {@link #require}.
 * @type {!Object.<(string|Array.<string>)>}
 * @private
 */
spfNetScript.deps_ = {};
// When built for the bootloader, unconditionally set the map in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_DEPS, spfNetScript.deps_);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_DEPS)) {
    __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_DEPS, spfNetScript.deps_);
  }
  spfNetScript.deps_ = /** @type {!Object.<(string|Array.<string>)>} */__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_DEPS);
}

/**
 * Map of dependency names to URLs for {@link #require}, used for custom
 * resolution before URL canonicalization.
 * @type {!Object.<string>}
 * @private
 */
spfNetScript.url_ = {};
// When built for the bootloader, unconditionally set the map in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_URL, spfNetScript.url_);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_URL)) {
    __WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_URL, spfNetScript.url_);
  }
  spfNetScript.url_ = /** @type {!Object.<string>} */__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_5__state__["a" /* default */].Key.SCRIPT_URL);
}

/* harmony default export */ __webpack_exports__["a"] = (spfNetScript);

/***/ }),
/* 22 */
/* exports provided: default */
/* exports used: default */
/*!***********************************************!*\
  !*** ./app/javascript/packs/spf/net/style.js ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__net_resource__ = __webpack_require__(/*! ../net/resource */ 20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__string_string__ = __webpack_require__(/*! ../string/string */ 7);
// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for dynamically loading stylesheets.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfNetStyle');





var spfNetStyle = {};

/**
 * Loads a stylesheet asynchronously and defines a name to use for dependency
 * management and unloading.  See {@link #unload} to remove previously loaded
 * stylesheets.
 *
 * - Subsequent calls to load the same URL will not reload the stylesheet.  To
 *   reload a stylesheet, unload it first with {@link #unload}.  To
 *   unconditionally load a stylesheet, see {@link #get}.
 *
 * - A name must be specified to identify the same stylesheet at different URLs.
 *   (For example, "main-A.css" and "main-B.css" are both "main".)  When a name
 *   is specified, all other stylesheets with the same name will be unloaded.
 *   This allows switching between versions of the same stylesheet at different
 *   URLs.
 *
 * - A callback can be specified to execute once the stylesheet has loaded.  The
 *   callback will be executed each time, even if the stylesheet is not
 *   reloaded.  NOTE: Unlike scripts, this callback is best effort and is
 *   supported in the following browser versions: IE 6, Chrome 19, Firefox 9,
 *   Safari 6.
 *
 * @param {string} url URL of the stylesheet to load.
 * @param {string} name Name to identify the stylesheet.
 * @param {Function=} opt_fn Optional callback function to execute when the
 *     stylesheet is loaded.
 */
spfNetStyle.load = function (url, name, opt_fn) {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].load(type, url, name, opt_fn);
};

/**
 * Unloads a stylesheet identified by dependency name.  See {@link #load}.
 *
 * @param {string} name The dependency name.
 */
spfNetStyle.unload = function (name) {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].unload(type, name);
};

/**
 * Discovers existing stylesheets in the document and registers them as loaded.
 */
spfNetStyle.discover = function () {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].discover(type);
};

/**
 * Unconditionally loads a stylesheet by dynamically creating an element and
 * appending it to the document without regard for whether it has been loaded
 * before. A stylesheet directly loaded by this method cannot be unloaded by
 * name.  Compare to {@link #load}.
 *
 * @param {string} url URL of the stylesheet to load.
 * @param {Function=} opt_fn Function to execute when loaded.
 */
spfNetStyle.get = function (url, opt_fn) {
  // NOTE: Callback execution depends on onload support and is best effort.
  // Chrome 19, Safari 6, Firefox 9, Opera and IE 5.5 support stylesheet onload.
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].create(type, url, opt_fn);
};

/**
 * Prefetchs one or more stylesheets; the stylesheets will be requested but not
 * loaded.  Use to prime the browser cache and avoid needing to request the
 * stylesheet when subsequently loaded.  See {@link #load}.
 *
 * @param {string|Array.<string>} urls One or more stylesheet URLs to prefetch.
 */
spfNetStyle.prefetch = function (urls) {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  // Convert to an array if needed.
  urls = __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].toArray(urls);
  __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].each(urls, function (url) {
    __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].prefetch(type, url);
  });
};

/**
 * Evaluates style text and defines a name to use for management.
 *
 * - Subsequent calls to evaluate the same text will not re-evaluate the style.
 *   To unconditionally evalute a style, see {@link #exec}.
 *
 * @param {string} text The text of the style.
 * @param {string} name Name to identify the style.
 * @return {undefined}
 */
spfNetStyle.eval = function (text, name) {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].eval(type, text, name);
};

/**
 * Unconditionally evaluates style text.  See {@link #eval}.
 *
 * @param {string} text The text of the style.
 */
spfNetStyle.exec = function (text) {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].exec(type, text);
};

/**
 * Sets the path prefix or replacement map to use when resolving relative URLs.
 *
 * Note: The order in which replacements are made is not guaranteed.
 *
 * @param {string|Object.<string>} paths The paths.
 */
spfNetStyle.path = function (paths) {
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.CSS;
  __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].path(type, paths);
};

/* harmony default export */ __webpack_exports__["a"] = (spfNetStyle);

/***/ }),
/* 23 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/tasks/tasks.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(/*! ../state */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__string_string__ = __webpack_require__(/*! ../string/string */ 7);
// Copyright 2013 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Simple asynchronous queued task execution.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */





var spfTasks = {};

// goog.provide('spfTasks');

// goog.require('spf');
// goog.require('spfConfig');
// goog.require('spfState');
// goog.require('spfString');
// goog.require('spfTracing');

/**
 * Adds a task to a queue to be executed asynchronously.
 *
 * @param {string} key The key to identify the task queue.
 * @param {!Function} fn The function to execute for this task.
 * @param {number=} opt_delay The time in milliseconds to wait before executing
 *     the function; defaults to 0.
 * @return {number} The number of tasks in the queue afterwards.
 */
spfTasks.add = function (key, fn, opt_delay) {
  var queues = spfTasks.queues_;
  var queue = queues[key];
  if (key && fn) {
    if (!queue) {
      queue = queues[key] = spfTasks.createQueue_();
    }
    var task = spfTasks.createTask_(fn, opt_delay || 0);
    return queue.items.push(task);
  }
  return queue && queue.items.length || 0;
};

/**
 * Runs queued tasks, if not already running.
 *
 * @param {string} key The key to identify the task queue.
 * @param {boolean=} opt_sync Whether to execute the queued tasks synchronously;
 *     defaults to false.
 */
spfTasks.run = function (key, opt_sync) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    var active = !!queue.scheduledKey || !!queue.timeoutKey;
    var suspended = !(queue.semaphore > 0);
    if (!suspended && (opt_sync || !active)) {
      spfTasks.do_(key, opt_sync);
    }
  }
};

/**
 * Suspends execution of a running task queue.
 * See {@link #resume}.
 *
 * Queue execution is controlled by values similar to POSIX Semaphores.  Each
 * `suspend` decrements a value, and each `resume` increments it.
 * Queue execution only continues when the values are positive, so while
 * `suspend` may be called multiple times, it must be matched by an equal
 * number of `resume` calls.
 *
 * @param {string} key The key to identify the task queue.
 */
spfTasks.suspend = function (key) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    queue.semaphore--;
  }
};

/**
 * Resumes execution of a running task queue.
 * See {@link #suspend}.
 *
 * Queue execution is controlled by values similar to POSIX Semaphores.  Each
 * `suspend` decrements a value, and each `resume` increments it.
 * Queue execution only continues when the values are positive, so while
 * `suspend` may be called multiple times, it much be matched by an equal
 * number of `resume` calls.
 *
 * @param {string} key The key to identify the task queue.
 * @param {boolean=} opt_sync Whether to execute the queued tasks synchronously;
 *     defaults to false.
 */
spfTasks.resume = function (key, opt_sync) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    queue.semaphore++;
    spfTasks.run(key, opt_sync);
  }
};

/**
 * Cancels execution of a running task queue.
 *
 * @param {string} key The key to identify the task queue.
 */
spfTasks.cancel = function (key) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    spfTasks.clearAsyncTasks_(queue);
    delete spfTasks.queues_[key];
  }
};

/**
 * Cancels execution of all current task queues, optionally limited to
 * with a given key prefix and optionally skipping the given key.
 *
 * @param {string=} opt_keyPrefix The prefix of the tasks to be canceled.
 * @param {string=} opt_skipKey The key of the task queue that should not
 *     be canceled.
 */
spfTasks.cancelAllExcept = function (opt_keyPrefix, opt_skipKey) {
  var keyPrefix = opt_keyPrefix || '';
  for (var key in spfTasks.queues_) {
    if (opt_skipKey != key && __WEBPACK_IMPORTED_MODULE_3__string_string__["a" /* default */].startsWith(key, keyPrefix)) {
      spfTasks.cancel(key);
    }
  }
};

/**
 * Gets a unique key for an object.  Mutates the object to store the key so
 * that multiple calls for the same object will return the same key.
 *
 * @param {Object} obj The object to get a unique key for.
 * @return {string} The unique key.
 */
spfTasks.key = function (obj) {
  var uid = parseInt(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.TASKS_UID), 10) || 0;
  uid++;
  return obj['spf-key'] || (obj['spf-key'] = '' + __WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.TASKS_UID, uid));
};

/**
 * @param {string} key The key to identify the task queue.
 * @param {boolean=} opt_sync Whether to execute the queued tasks synchronously;
 *     defaults to false.
 * @private
 */
spfTasks.do_ = function (key, opt_sync) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    spfTasks.clearAsyncTasks_(queue);
    if (queue.semaphore > 0 && queue.items.length) {
      var task = queue.items[0];
      if (task) {
        var next = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfTasks.do_, null, key, opt_sync);
        var step = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (nextFn, taskFn) {
          taskFn();
          nextFn();
        }, null, next);
        if (opt_sync) {
          queue.items.shift();
          step(task.fn);
        } else {
          spfTasks.scheduleTask_(queue, task, step);
        }
      }
    }
  }
};

/**
 * Schedule a task for asynchronous execution.
 * @param {!spfTasks.Queue} queue The current queue being executed.
 * @param {!spfTasks.Task} task The task to be scheduled.
 * @param {!Function} step The task execution function.
 * @private
 */
spfTasks.scheduleTask_ = function (queue, task, step) {
  if (task.delay) {
    // For a delay an empty step is run, and the task's functionality is saved
    // for the next step.
    var fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(step, null, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].nullFunction);
    queue.timeoutKey = setTimeout(fn, task.delay);
    // Instead of removing the task from the queue, set it's delay to 0 so it
    // will be processed traditionally on the next step.
    task.delay = 0;
  } else {
    queue.items.shift();
    var fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(step, null, task.fn);
    var scheduler = /** @type {spfBase.TaskScheduler} */__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].get('advanced-task-scheduler');
    var addTask = scheduler && scheduler['addTask'];
    if (addTask) {
      queue.scheduledKey = addTask(fn);
    } else {
      queue.timeoutKey = setTimeout(fn, 0);
    }
  }
};

/**
 * Clear the current asynchronous tasks.
 * @param {!spfTasks.Queue} queue The queue.
 * @private
 */
spfTasks.clearAsyncTasks_ = function (queue) {
  if (queue.scheduledKey) {
    var scheduler = /** @type {spfBase.TaskScheduler} */__WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].get('advanced-task-scheduler');
    var cancelTask = scheduler && scheduler['cancelTask'];
    if (cancelTask) {
      cancelTask(queue.scheduledKey);
    }
    queue.scheduledKey = 0;
  }
  if (queue.timeoutKey) {
    clearTimeout(queue.timeoutKey);
    queue.timeoutKey = 0;
  }
};

/**
 * Type definition for a SPF task.
 * - fn: The function to execute.
 * - delay: The time in milliseconds to wait before executing the function.
 *
 * @typedef {{
 *   fn: !Function,
 *   delay: number
 * }}
 */
spfTasks.Task;

/**
 * Type definition for a SPF task queue.
 * - items: The ordered list of tasks.
 * - scheduledKey: A key to track the current scheduled task.
 * - timeoutKey: A key to track the current task delayed by a timeout.
 * - semaphore: A POSIX Semaphore style value used to control suspending and
 *     resuming a running queue.
 *
 * @typedef {{
 *   items: !Array.<spfTasks.Task>,
 *   scheduledKey: number,
 *   timeoutKey: number,
 *   semaphore: number
 * }}
 */
spfTasks.Queue;

/**
 * @return {spfTasks.Queue}
 * @private
 */
spfTasks.createQueue_ = function () {
  return { items: [], scheduledKey: 0, timeoutKey: 0, semaphore: 1 };
};

/**
 * @param {!Function} fn The function to execute.
 * @param {number} delay The time in milliseconds to wait before executing
 *     the function.
 * @return {spfTasks.Task}
 * @private
 */
spfTasks.createTask_ = function (fn, delay) {
  return { fn: fn, delay: delay };
};

/**
 * @type {!Object.<string, spfTasks.Queue>}
 * @private
 */
spfTasks.queues_ = {};

/* harmony default export */ __webpack_exports__["a"] = (spfTasks);

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/dom/dataset.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @fileoverview Element dataset manipulation functions.
 * See {@link http://www.w3.org/TR/html5/Overview.html#dom-dataset}.
 *
 */

// goog.provide('spfDomDataset');

var spfDomDataset = {};

/**
 * Gets a custom data attribute from a node. The key should be in
 * camelCase format (e.g "keyName" for the "data-key-name" attribute).
 *
 * @param {Node} node DOM node to get the custom data attribute from.
 * @param {string} key Key for the custom data attribute.
 * @return {?string} The attribute value, if it exists.
 */
spfDomDataset.get = function (node, key) {
  if (node.dataset) {
    return node.dataset[key];
  } else {
    return node.getAttribute('data-' + spf.string.toSelectorCase(key));
  }
};

/**
 * Sets a custom data attribute on a node. The key should be in
 * camelCase format (e.g "keyName" for the "data-key-name" attribute).
 *
 * @param {Node} node DOM node to set the custom data attribute on.
 * @param {string} key Key for the custom data attribute.
 * @param {string} val Value for the custom data attribute.
 */
spfDomDataset.set = function (node, key, val) {
  if (node.dataset) {
    node.dataset[key] = val;
  } else {
    node.setAttribute('data-' + spf.string.toSelectorCase(key), val);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (spfDomDataset);

/***/ }),
/* 39 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./app/javascript/packs/spf/nav/nav.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cache_cache__ = __webpack_require__(/*! ../cache/cache */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__debug_debug__ = __webpack_require__(/*! ../debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_dom__ = __webpack_require__(/*! ../dom/dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dom_classlist__ = __webpack_require__(/*! ../dom/classlist */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dom_dataset__ = __webpack_require__(/*! ../dom/dataset */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__history_history__ = __webpack_require__(/*! ../history/history */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__nav_request__ = __webpack_require__(/*! ../nav/request */ 79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__nav_response__ = __webpack_require__(/*! ../nav/response */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__state__ = __webpack_require__(/*! ../state */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__string_string__ = __webpack_require__(/*! ../string/string */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__ = __webpack_require__(/*! ../tasks/tasks */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__url_url__ = __webpack_require__(/*! ../url/url */ 13);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions to handle pushstate-based navigation.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

















var spfNav = {};
// goog.provide('spfNav');

/**
 * Initializes (enables) pushState navigation.
 */
spfNav.init = function () {
  // Initialize history management.
  __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].init(spfNav.handleHistory_, spfNav.dispatchError_);
  // If already initialized, or running in an unsupported environment, return.
  if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT) || !document.addEventListener) {
    return;
  }
  // Set some basic state.
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT, true);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT_TIME, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now());
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_COUNTER, 0);
  // Handle clicks for navigating when a spf-link element click happens.
  document.addEventListener('click', spfNav.handleClick_, false);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_CLICK_LISTENER, spfNav.handleClick_);
  // Handle mousedowns for prefetching when a spf-link element click starts.
  if (__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('experimental-prefetch-mousedown') && !spfNav.isTouchCapablePlatform_()) {
    document.addEventListener('mousedown', spfNav.handleMouseDown_, false);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_MOUSEDOWN_LISTENER, spfNav.handleMouseDown_);
  }
  // Handle scrolls for preventing early scrolling during history changes.
  document.addEventListener('scroll', spfNav.handleScroll_, false);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_LISTENER, spfNav.handleScroll_);
};

/**
 * Disposes (disables) pushState navigation.
 */
spfNav.dispose = function () {
  spfNav.cancel();
  if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT)) {
    if (document.removeEventListener) {
      var handleClick = /** @type {function(Event)} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_CLICK_LISTENER);
      document.removeEventListener('click', handleClick, false);
      var handleMouseDown = /** @type {function(Event)} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_MOUSEDOWN_LISTENER);
      document.removeEventListener('mousedown', handleMouseDown, false);
      var handleScroll = /** @type {function(Event)} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_LISTENER);
      document.removeEventListener('scroll', handleScroll, false);
    }
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_CLICK_LISTENER, null);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_MOUSEDOWN_LISTENER, null);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_LISTENER, null);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_POSITION, null);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_URL, null);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT, false);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT_TIME, null);
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_COUNTER, null);
  }
  __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].dispose();
};

/**
 * Walks up the DOM hierarchy, returning the first ancestor that has the
 * link class.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @return {Node} DOM node with the link class or null if not found.
 * @private
 */
spfNav.getAncestorWithLinkClass_ = function (element) {
  return __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].getAncestor(element, function (node) {
    return __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].contains(node, /** @type {string} */__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('link-class'));
  });
};

/**
 * Walks up the DOM hierarchy, returning the first ancestor that has the
 * nolink class.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @return {Node} DOM node with the nolink class or null if not found.
 * @private
 */
spfNav.getAncestorWithNoLinkClass_ = function (element) {
  return __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].getAncestor(element, function (node) {
    return __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].contains(node, /** @type {string} */__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('nolink-class'));
  });
};

/**
 * Walks up the DOM hierarchy, returning the first ancestor with a href.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @param {Node} parent The DOM node to end with.
 * @return {Node} DOM node with a href or null if not found.
 * @private
 */
spfNav.getAncestorWithHref_ = function (element, parent) {
  return __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].getAncestor(element, function (node) {
    // Images in IE10 can have an href.
    return node.href && node.tagName.toLowerCase() != 'img';
  }, parent);
};

/**
 * Given a mouse event, try to get the corresponding navigation URL.
 *
 * @param {Event} evt The click event.
 * @return {?string} Navigation url of event if applicable.
 * @private
 */
spfNav.getEventURL_ = function (evt) {
  // Ignore clicks with modifier keys.
  if (evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    ignoring click with modifier key');
    return null;
  }
  // Ignore clicks with alternate buttons (left = 0, middle = 1, right = 2).
  if (evt.button > 0) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    ignoring click with alternate button');
    return null;
  }
  // Ignore clicks on targets without the link class or not within
  // a container with the link class.
  var linkEl = spfNav.getAncestorWithLinkClass_(evt.target);
  if (!linkEl) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    ignoring click without link class');
    return null;
  }
  // Ignore clicks on targets with the nolink class or within
  // a container with the nolink class.
  if (__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('nolink-class')) {
    var nolinkEl = spfNav.getAncestorWithNoLinkClass_(evt.target);
    if (nolinkEl) {
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    ignoring click with nolink class');
      return null;
    }
  }
  var target = spfNav.getAncestorWithHref_(evt.target, linkEl);
  // Ignore clicks on targets without an href.
  if (!target) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    ignoring click without href parent');
    return null;
  }
  return target.href;
};

/**
 * Whether this URL is allowed for navigation, according to same-origin security
 * policy.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @return {boolean}
 * @private
 */
spfNav.isAllowed_ = function (url) {
  // If the destination is not same-origin, cancel.
  // TODO(nicksay): Add CORS origin whitelist.
  var destination = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].origin(url);
  if (destination != __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].origin(window.location.href)) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('destination not same-origin');
    return false;
  }
  return true;
};

/**
 * Whether this URL is eligible for navigation, according to the configured
 * limits and lifetime.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @return {boolean}
 * @private
 */
spfNav.isEligible_ = function (url) {
  // If navigation is requested but SPF is not initialized, cancel.
  if (!__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT)) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('navigation not initialized');
    return false;
  }
  // If a session limit has been set and reached, cancel.
  var count = parseInt(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_COUNTER), 10) || 0;
  count++;
  var limit = parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('navigate-limit'), 10);
  limit = isNaN(limit) ? Infinity : limit;
  if (count > limit) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('navigation limit reached');
    return false;
  }
  // If a session lifetime has been set and reached, cancel.
  var timestamp = parseInt(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_INIT_TIME), 10);
  timestamp--;
  var age = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now() - timestamp;
  var lifetime = parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('navigate-lifetime'), 10);
  lifetime = isNaN(lifetime) ? Infinity : lifetime;
  if (age > lifetime) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('navigation lifetime reached');
    return false;
  }
  return true;
};

/**
 * Whether this URL should be handled for navigation (i.e. not same-page
 * hash-based navigation).
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {string=} opt_current The current page URL, without the SPF
 *     identifier.
 * @return {boolean}
 * @private
 */
spfNav.isNavigable_ = function (url, opt_current) {
  var current = opt_current || window.location.href;
  // Check for transitions between hash URLs.  If the destination
  // contains a hash and the page is the same, navigation is not handled.
  if (__WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].contains(url, '#')) {
    var absoluteUrl = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
    var absoluteCurrent = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(current);
    if (absoluteUrl == absoluteCurrent) {
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    not handling hash-based navigation');
      return false;
    }
  }
  return true;
};

/**
 * Handles page click events on SPF links, adds pushState history entries for
 * them, and navigates.
 *
 * @param {Event} evt The click event.
 * @private
 */
spfNav.handleClick_ = function (evt) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.handleClick ', 'evt=', evt);
  // Allow other click handlers to cancel navigation.
  if (evt.defaultPrevented) {
    return;
  }
  var url = spfNav.getEventURL_(evt);
  // Ignore clicks without a URL.
  if (!url) {
    return;
  }
  url = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].appendPersistentParameters(url);
  // Ignore clicks if the URL is not allowed (e.g. cross-domain).
  if (!spfNav.isAllowed_(url)) {
    return;
  }
  // Ignore clicks if the URL is not eligible (e.g. limit reached).
  if (!spfNav.isEligible_(url)) {
    return;
  }
  // Ignore clicks if the "click" event is canceled.
  if (!spfNav.dispatchClick_(url, evt.target)) {
    return;
  }

  // Navigate to the URL.
  var options = spfNav.createOptions_();
  var info = new spfNav.Info();
  spfNav.navigate_(url, options, info);
  // Prevent the default browser navigation to avoid reloads.
  evt.preventDefault();
};

/**
 * Handles page mousedown events on SPF links and prefetches them if possible.
 *
 * @param {Event} evt The mousedown event.
 * @private
 */
spfNav.handleMouseDown_ = function (evt) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.handleMouseDown ', 'evt=', evt);
  var url = spfNav.getEventURL_(evt);
  // Ignore clicks without a URL.
  if (!url) {
    return;
  }
  // Allow other mousedown handlers to run before issuing a prefetch request.
  setTimeout(function () {
    spfNav.prefetch( /** @type {string} */url);
  }, 0);
};

/**
 * Handles page scroll events to ensure history entry changes do not
 * prematurally scroll the page before content is updated.
 *
 * @param {Event} evt The scroll event.
 * @private
 */
spfNav.handleScroll_ = function (evt) {
  var position = spfNav.getScrollTempPosition_();
  spfNav.clearScrollTempPosition_();
  if (position) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    returning to saved scroll temp position', position);
    window.scroll.apply(null, position);
  }
};

/**
 * Handles when the active history entry changes.
 *
 * @param {string} url The URL the user is browsing to.
 * @param {Object=} opt_state An optional state object associated with the URL.
 * @private
 */
spfNav.handleHistory_ = function (url, opt_state) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.handleHistory ', '(url=', url, 'state=', opt_state, ')');
  var info = new spfNav.Info({
    current: opt_state && opt_state['spf-current'],
    history: true,
    position: opt_state && opt_state['spf-position'],
    referer: opt_state && opt_state['spf-referer'],
    reverse: !!(opt_state && opt_state['spf-back'])
  });
  // If the reload-identifier is present, remove it to prevent confusing data.
  var reloadId = /** @type {?string} */__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('reload-identifier');
  if (reloadId) {
    url = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].removeParameters(url, [reloadId]);
  }
  // Reload if the URL is not allowed (e.g. cross-domain).
  if (!spfNav.isAllowed_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.FORBIDDEN);
    return;
  }
  // Reload if the URL is not eligible (e.g. limit reached).
  if (!spfNav.isEligible_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.INELIGIBLE);
    return;
  }
  // Ignore the change if the "history" event is canceled.
  if (!spfNav.dispatchHistory_(url, info.referer, info.current)) {
    return;
  }
  // If navigating for this history change and a scroll position is set, ensure
  // the browser doesn't scroll too early.  The browser default behavior is to
  // scroll to the position when pushState was called just after a popState
  // event is fired.  This is okay only if using history to move around a single
  // page or if all content can be rendered synchronously during the popState
  // event handling.  Since navigation content updates have at least one
  // asynchronous break, avoid this by saving the current page position and
  // scrolling immediately back to it when the browser scrolls early.
  // The proper position will be set once content is updated.
  if (info.position) {
    spfNav.setScrollTempPosition_();
  }
  // Navigate to the URL.
  // NOTE: The persistent parameters are not appended here because they should
  // already be set on the URL if necessary.
  var options = spfNav.createOptions_();
  spfNav.navigate_(url, options, info);
};

/**
 * Navigates to a URL.
 *
 * A pushState history entry is added for the URL, and if successful, the
 * navigation is performed.  If not, the browser is reloaded to the URL.
 * During the navigation, first the content is requested.  If the reponse is
 * sucessfully parsed, it is processed.  If not, the browser is reloaded to
 * the URL.  Only a single navigation request can be in flight at once.  If a
 * second URL is navigated to while a first is still pending, the first will be
 * cancelled.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions=} opt_options Optional request options object.
 */
spfNav.navigate = function (url, opt_options) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.navigate ', '(url=', url, 'options=', opt_options, ')');
  // Ignore navigation to an empty URL.
  if (!url) {
    return;
  }
  url = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].appendPersistentParameters(url);
  // Reload if the URL is not allowed (e.g. cross-domain).
  if (!spfNav.isAllowed_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.FORBIDDEN);
    return;
  }
  // Reload if the URL is not eligible (e.g. limit reached).
  if (!spfNav.isEligible_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.INELIGIBLE);
    return;
  }
  // Navigate to the URL.
  var options = spfNav.createOptions_(opt_options);
  var info = new spfNav.Info();
  spfNav.navigate_(url, options, info);
};

/**
 * Performs navigation to a URL.
 * See {@link #navigate}, {@link #handleClick}, and {@link #handleHistory}.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private.
 */
spfNav.navigate_ = function (url, options, info) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].info('nav.navigate_ ', url, options, info);

  // Abort previous navigation, if needed.
  spfNav.cancel();

  // If the URL is not navigable, attempt to scroll to support hash navigation.
  if (!spfNav.isNavigable_(url, info.current)) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('non-navigable, just scroll');
    // Add a history entry beforehand to save current position, if needed.
    if (!info.history) {
      var handleError = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigateError_, null, options);
      spfNav.navigateAddHistory_(url, info.referer, handleError);
    }
    // Then attempt to scroll.
    spfNav.navigateScroll_(url, info);
    return;
  }

  // Reload if the "request" event is canceled.
  if (!spfNav.dispatchRequest_(url, info.referer, info.current, options)) {
    spfNav.reload(url, spfNav.ReloadReason.REQUEST_CANCELED);
    return;
  }

  // Set the navigation counter.
  var count = (parseInt(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_COUNTER), 10) || 0) + 1;
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_COUNTER, count);

  // Abort all ongoing prefetch requests, except for the navigation one if it
  // exists.  This will reduce network contention for the navigation request
  // by eliminating concurrent reqeuests that will not be used.
  spfNav.cancelAllPrefetchesExcept(url);
  // Cancel all preprocessing being done for completed single or ongoing
  // multipart prefetch response, except for the navigation one if it exists.
  // If the navigation one is a completed single response, the task will be
  // canceled in spfNav.navigatePromotePrefetch_.  If it is an ongoing
  // multipart response, allow it to continue processing until the completed.
  var absoluteUrl = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
  var preprocessKey = spfNav.preprocessKey(absoluteUrl);
  __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].cancelAllExcept('preprocess', preprocessKey);

  // Set the current nav request to be the prefetch, if it exists.
  var prefetches = spfNav.prefetches_();
  var prefetchXhr = prefetches[absoluteUrl];
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_REQUEST, prefetchXhr);
  // Make sure there is no current nav promotion set.
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE, null);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE_TIME, null);

  // Check the prefetch XHR.  If it is not done, promote the prefetch
  // to navigate.  Otherwise, navigate immediately.
  if (prefetchXhr && prefetchXhr.readyState != 4) {
    // Begin the prefetch promotion process.
    spfNav.navigatePromotePrefetch_(url, options, info);
  } else {
    spfNav.navigateSendRequest_(url, options, info);
  }
};

/**
 * Promotes a prefetch request to a navigation after it completes.
 * See {@link navigate}.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.navigatePromotePrefetch_ = function (url, options, info) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.navigatePromotePrefetch_ ', url);
  var preprocessKey = spfNav.preprocessKey(url);
  var promoteKey = spfNav.promoteKey(url);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE, url);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE_TIME, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now());
  __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].cancel(preprocessKey);
  __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(promoteKey, true);

  // After starting the promote tasks, check for new navigation that needs
  // a history entry added.
  if (!info.history) {
    var handleError = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigateError_, null, options);
    spfNav.navigateAddHistory_(url, info.referer, handleError);
  }
};

/**
 * Send the navigation request.
 * See {@link navigate}.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.navigateSendRequest_ = function (url, options, info) {
  var handleError = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigateError_, null, options);
  var handlePart = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigatePart_, null, options, info);
  var handleSuccess = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigateSuccess_, null, options, info);

  // Before sending a new navigation request, clear previous resource timings
  // to avoid (1) hitting buffer size limits or (2) accidentally getting timings
  // for a previous request in Chrome, where the API is asynchronous and the
  // latest values will not be available immediately.
  // Only do this for navigations to avoid removing unrelated resource timings
  // during prefetch or load calls.
  // As an advanced option, allow timings to persist if desired.
  if (!__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('advanced-navigate-persist-timing')) {
    spfNav.clearResourceTimings_();
  }

  info.type = 'navigate';
  if (info.history) {
    info.type += info.reverse ? '-back' : '-forward';
  }

  var xhr = __WEBPACK_IMPORTED_MODULE_9__nav_request__["a" /* default */].send(url, {
    method: options['method'],
    headers: options['headers'],
    onPart: handlePart,
    onError: handleError,
    onSuccess: handleSuccess,
    postData: options['postData'],
    type: info.type,
    current: info.current,
    referer: info.referer
  });
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_REQUEST, xhr);

  // After the request has been sent, check for new navigation that needs
  // a history entry added.  Do this after sending the XHR to have the
  // correct referer for regular navigation (but not history navigation).
  if (!info.history) {
    spfNav.navigateAddHistory_(url, info.referer, handleError);
  }
};

/**
 * Scrolls to a target specified by a URL hash, a position specified in the
 * navigation info object, or the top of the page if the window has not yet
 * been scrolled as part of this navigation.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.navigateScroll_ = function (url, info) {
  // If a position is defined, scroll to it.
  if (info.position) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    clearing scroll temp position');
    spfNav.clearScrollTempPosition_();
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    scrolling to position', info.position);
    window.scroll.apply(null, info.position);
    info.scrolled = true;
    return;
  }
  var result = __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].partition(url, '#');
  // If a non-empty hash is found, attempt to scroll the element into view.
  // Otherwise, scroll to the top of the page.
  if (result[2]) {
    var el = document.getElementById(result[2]);
    if (el) {
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    clearing scroll temp position');
      spfNav.clearScrollTempPosition_();
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    scrolling into view', result[2]);
      el.scrollIntoView();
      info.scrolled = true;
    }
  } else if (!info.scrolled) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    clearing scroll temp position');
    spfNav.clearScrollTempPosition_();
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    scrolling to top');
    window.scroll(0, 0);
    info.scrolled = true;
  }
};

/**
 * Add the navigate state to the history.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {string} referer The Referrer URL, without the SPF identifier.
 * @param {function(string, Error)} handleError The error handler.
 * @private
 */
spfNav.navigateAddHistory_ = function (url, referer, handleError) {
  try {
    // Before adding the new history entry, update the existing one with the
    // current scroll position (and timestamp, always done automatically).
    var position = [window.pageXOffset, window.pageYOffset];
    var updateState = { 'spf-position': position };
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    updating history to scroll position', position);
    __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].replace(null, updateState);
    // Add the new history entry, unless the URL is the same as the current.
    // (This can happen when clicking a hash-based target multiple times.)
    if (__WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url, true) != window.location.href) {
      var newState = { 'spf-referer': referer };
      __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].add(url, newState);
    }
  } catch (err) {
    // Abort the navigation.
    spfNav.cancel();
    // An error is thrown if the state object is too large or if the
    // URL is not in the same domain.
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].error('error caught, redirecting ', '(url=', url, 'err=', err, ')');
    handleError(url, err);
  }
};

/**
 * Handles a navigation error.
 * See {@link navigate}.
 *
 * @param {spfBase.RequestOptions} options Request options object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {Error} err The Error object.
 * @param {XMLHttpRequest=} opt_xhr The XMLHttpRequest for current error
 * @private
 */
spfNav.handleNavigateError_ = function (options, url, err, opt_xhr) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('navigate error', '(url=', url, ')');
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_REQUEST, null);
  // Ignore the error if the "error" event is canceled, but otherwise,
  // reload the page.
  if (!spfNav.dispatchError_(url, err, options, undefined, opt_xhr)) {
    return;
  }
  spfNav.reload(url, spfNav.ReloadReason.ERROR, err);
};

/**
 * Handles a navigation partial response.
 * See {@link navigate}.
 *
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object.
 * @private
 */
spfNav.handleNavigatePart_ = function (options, info, url, partial) {
  // Reload if the "part process" event is canceled.
  if (!spfNav.dispatchPartProcess_(url, partial, options)) {
    spfNav.reload(url, spfNav.ReloadReason.PART_PROCESS_CANCELED);
    return;
  }

  // Check for reload responses.
  if (partial['reload']) {
    spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED);
    return;
  }

  // Check for redirect responses.
  if (partial['redirect']) {
    spfNav.handleNavigateRedirect_(options, partial['redirect']);
    return;
  }

  try {
    __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].process(url, partial, info, function () {
      spfNav.dispatchPartDone_(url, partial, options);
    });
  } catch (err) {
    // If an exception is caught during processing, log, execute the error
    // handler, and bail.
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    failed to process part', partial);
    spfNav.handleNavigateError_(options, url, err);
  }
};

/**
 * Handles a navigation complete response.
 * See {@link navigate}.
 *
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @private
 */
spfNav.handleNavigateSuccess_ = function (options, info, url, response) {
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_REQUEST, null);

  // If this is a navigation from a promotion, manually set the
  // navigation start time.
  if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE) == info.original) {
    var timing = response['timing'] || {};
    timing['navigationStart'] = __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE_TIME);
    timing['spfPrefetched'] = true;
  }

  // If a multipart response was received, all processing is already done,
  // so don't fire the "process" event/callbacks.
  var multipart = response['type'] == 'multipart';
  if (!multipart) {
    // Reload if the "process" event is canceled.
    if (!spfNav.dispatchProcess_(url, response, options)) {
      spfNav.reload(url, spfNav.ReloadReason.PROCESS_CANCELED);
      return;
    }

    // Check for reload responses.
    if (response['reload']) {
      spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED);
      return;
    }

    // Check for redirect responses.
    if (response['redirect']) {
      spfNav.handleNavigateRedirect_(options, response['redirect']);
      return;
    }
  }

  // Process the requested response.
  try {
    // If a multipart response was received, all processing is already done,
    // so an empty object is used to ensure events/callbacks are properly
    // queued after existing ones from any ongoing part prcoessing.
    var r = /** @type {spfBase.SingleResponse} */multipart ? {} : response;
    __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].process(url, r, info, function () {
      // After processing is complete, save the name for future use.
      var name = response['name'] || '';
      if (multipart) {
        var parts = response['parts'];
        __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(parts, function (part) {
          name = part['name'] || name;
        });
      }
      __WEBPACK_IMPORTED_MODULE_7__dom_dataset__["a" /* default */].set(document.body, 'spfName', name);
      // If this navigation was from history, attempt to scroll to the previous
      // position after all processing is complete.  This should not be done
      // earlier because the prevous position might rely on page width/height
      // that is changed during the processing.
      // Fallback to scrolling to the top if neither a hash target nor a
      // history position exists and the window was not previously scrolled
      // during response processing.
      spfNav.navigateScroll_(url, info);
      spfNav.dispatchDone_(url, response, options);
    });
  } catch (err) {
    // If an exception is caught during processing, log, execute the error
    // handler and bail.
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    failed to process response', response);
    spfNav.handleNavigateError_(options, url, err);
  }
};

/**
 * Handles a redirect responses on navigation requests.
 *
 * @param {spfBase.RequestOptions} options Request options object.
 * @param {string} redirectUrl The new URL to be redirected to.
 * @private
 */
spfNav.handleNavigateRedirect_ = function (options, redirectUrl) {
  //
  // TODO(nicksay): Figure out navigate callbacks + redirects.
  //
  // Replace the current history entry with the redirect,
  // executing the callback to trigger the next navigation.
  try {
    // Persist the url hash to mirror browser redirects.
    redirectUrl = redirectUrl + window.location.hash;
    __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].replace(redirectUrl, null, true);
  } catch (err) {
    spfNav.cancel();
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].error('error caught, reloading ', '(url=', redirectUrl, 'err=', err, ')');
    spfNav.handleNavigateError_(options, redirectUrl, err);
  }
};

/**
 * Cancels the current navigation request, if any.
 */
spfNav.cancel = function () {
  var xhr = /** @type {XMLHttpRequest} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_REQUEST);
  if (xhr) {
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('aborting previous navigate ', 'xhr=', xhr);
    xhr.abort();
    __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_REQUEST, null);
  }
};

/**
 * Executes an external callback and checks whether the callback was canceled
 * with an explicit return value of `false`.
 *
 * @param {Function|undefined} fn Callback function to be executed.
 * @param {...*} var_args Arguments to apply to the function.
 * @return {boolean} False if the callback was canceled by explicitly returning
 *     false to stop the operation; true otherwise.
 */
spfNav.callback = function (fn, var_args) {
  var val;
  if (fn) {
    var args = Array.prototype.slice.call(arguments);
    args[0] = fn;
    val = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].execute.apply(null, args);
    if (val instanceof Error) {
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].error('error in callback (url=', window.location.href, 'err=', val, ')');
    }
  }
  return val !== false;
};

/**
 * Reloads the page with a URL, to be used when navigation fails or is disabled.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNav.ReloadReason} reason The reason code causing the reload.
 * @param {Error=} opt_err An optional error object used in the dispatched
 *    reason.
 */
spfNav.reload = function (url, reason, opt_err) {
  var err = opt_err ? opt_err.message : '';
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn('reloading (', 'url=', url, 'reason=', reason, 'error=', err, ')');
  spfNav.cancel();
  spfNav.cancelAllPrefetchesExcept();
  // Dispatch the reload event to notify the app that a reload is required.
  var logReason = reason;
  if (err) {
    logReason += ' Message: ' + err;
  }
  spfNav.dispatchReload_(url, logReason);
  var current = window.location.href;
  // If the url has already changed, clear its entry to prevent browser
  // inconsistency with history management for 301 responses on reloads. Chrome
  // will identify that the starting url was the same, and replace the current
  // history state, whereas Firefox will set a new state with the post 301
  // value.
  if (__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('experimental-remove-history') && current == url) {
    __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].removeCurrentEntry();
  }
  // Delay the reload until after the history state has had time to clear.
  setTimeout(function () {
    var reloadId = /** @type {?string} */__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('reload-identifier');
    if (reloadId) {
      var params = {};
      params[reloadId] = encodeURIComponent(reason);
      url = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].appendParameters(url, params);
    }
    window.location.href = url;
    // If the new url only differs by a hash then just assigning to
    // `location.href` is not enough to trigger a reload.  If this is the case,
    // explicitly calling `location.reload()` is required, but it can't be done
    // every time because an immediate call to `location.reload()` will cancel
    // the navgation started by the assignment to `location.href`.  The
    // `isNavigable_` function checks for hash-based navgiation that won't
    // trigger, so use it here to determine whether to call `location.reload()`.
    if (!spfNav.isNavigable_(url, current)) {
      window.location.reload();
    }
  }, 0);
};

/**
 * Loads a URL.
 *
 * Similar to {@link spfNav.navigate}, but intended for traditional content
 * updates, not page navigation.  Not subject to restrictions on the number of
 * simultaneous requests.
 *
 * @param {string} url The URL to load, without the SPF identifier.
 * @param {spfBase.RequestOptions=} opt_options Optional request options object.
 */
spfNav.load = function (url, opt_options) {
  url = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].appendPersistentParameters(url);
  var options = spfNav.createOptions_(opt_options);
  var info = new spfNav.Info();
  spfNav.load_(url, options, info);
};

/**
 * Loads a URL.
 * See {@link #load}.
 *
 * @param {string} url The URL to load, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.load_ = function (url, options, info) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].info('nav.load ', url, options, info);

  info.original = info.original || url;

  // Abort the load if the "request" callback is canceled.
  // Note: pass "true" to only execute callbacks and not dispatch events.
  if (!spfNav.dispatchRequest_(url, undefined, undefined, options, true)) {
    return;
  }

  var handleError = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleLoadError_, null, false, options, info);
  var handlePart = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleLoadPart_, null, false, options, info);
  var handleSuccess = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleLoadSuccess_, null, false, options, info);

  info.type = 'load';

  __WEBPACK_IMPORTED_MODULE_9__nav_request__["a" /* default */].send(url, {
    method: options['method'],
    headers: options['headers'],
    onPart: handlePart,
    onError: handleError,
    onSuccess: handleSuccess,
    postData: options['postData'],
    type: info.type,
    withCredentials: options['withCredentials']
  });
};

/**
 * Prefetches a URL.
 *
 * Use to prime the SPF request cache with the content and the browser cache
 * with script and stylesheet URLs.  If the response is successfully parsed, it
 * is preprocessed to prefetch scripts and stylesheets as well.
 *
 * @param {string} url The URL to prefetch, without the SPF identifier.
 * @param {spfBase.RequestOptions=} opt_options Optional request options object.
 */
spfNav.prefetch = function (url, opt_options) {
  url = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].appendPersistentParameters(url);
  var options = spfNav.createOptions_(opt_options);
  var info = new spfNav.Info();
  spfNav.prefetch_(url, options, info);
};

/**
 * Prefetches a URL.
 * See {@link #prefetch}.
 *
 * @param {string} url The URL to prefetch, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.prefetch_ = function (url, options, info) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].info('nav.prefetch ', url, options, info);
  info.original = info.original || url;

  // Abort the prefetch if the "request" callback is canceled.
  // Note: pass "true" to only execute callbacks and not dispatch events.
  if (!spfNav.dispatchRequest_(url, undefined, undefined, options, true)) {
    return;
  }

  var handleError = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleLoadError_, null, true, options, info);
  var handlePart = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleLoadPart_, null, true, options, info);
  var handleSuccess = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleLoadSuccess_, null, true, options, info);

  info.type = 'prefetch';

  var xhr = __WEBPACK_IMPORTED_MODULE_9__nav_request__["a" /* default */].send(url, {
    method: options['method'],
    headers: options['headers'],
    onPart: handlePart,
    onError: handleError,
    onSuccess: handleSuccess,
    postData: options['postData'],
    type: info.type,
    current: info.current
  });
  spfNav.addPrefetch(url, xhr);
};

/**
 * Handles a load or prefetch error.
 * See {@link load} and {@link prefetch}.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {Error} err The Error object.
 * @private
 */
spfNav.handleLoadError_ = function (isPrefetch, options, info, url, err) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].warn(isPrefetch ? 'prefetch' : 'load', 'error', '(url=', url, ')');

  if (isPrefetch) {
    spfNav.removePrefetch(url);
  }

  // If a prefetch has been promoted to a navigate, use the navigate error
  // handler.  Otherwise, execute the "error" callback.
  if (isPrefetch && __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE) == info.original) {
    spfNav.handleNavigateError_(options, url, err);
  } else {
    // Note: pass "true" to only execute callbacks and not dispatch events.
    spfNav.dispatchError_(url, err, options, true);
  }
};

/**
 * Handles a load or prefetch partial response.
 * See {@link load} and {@link prefetch}.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object.
 * @private
 */
spfNav.handleLoadPart_ = function (isPrefetch, options, info, url, partial) {
  // Abort the load/prefetch if the "part process" callback is canceled.
  // Note: pass "true" to only execute callbacks and not dispatch events.
  if (!spfNav.dispatchPartProcess_(url, partial, options, true)) {
    return;
  }

  // Check for reload responses.
  // For a load, abort; for a promoted prefetch, reload immediately; for a
  // prefetch, ignore and the reload will be processed when a navigate occurs.
  if (partial['reload']) {
    if (!isPrefetch) {
      return;
    }
    if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE) == info.original) {
      spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED);
      return;
    }
  }

  // Check for redirect responses.
  if (partial['redirect']) {
    spfNav.handleLoadRedirect_(isPrefetch, options, info, partial['redirect']);
    return;
  }

  if (isPrefetch) {
    // Add the navigate part function as a task to be invoked on
    // prefetch promotion.
    // TODO(nicksay): Honor history/reverse/position during promotion in
    // reponse to a popState. (This is an edge case.)
    var fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigatePart_, null, options, info, url, partial);
    var promoteKey = spfNav.promoteKey(info.original);
    __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(promoteKey, fn);
    // If the prefetch has been promoted, run the promotion task after
    // adding it and do not perform any preprocessing.
    if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE) == info.original) {
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(promoteKey, true);
      return;
    }
  }

  var processFn = isPrefetch ? __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].preprocess : __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].process;
  processFn(url, partial, info, function () {
    // Note: pass "true" to only execute callbacks and not dispatch events.
    spfNav.dispatchPartDone_(url, partial, options, true);
  });
};

/**
 * Handles a load or prefetch complete response.
 * See {@link load} and {@link prefetch}.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @private
 */
spfNav.handleLoadSuccess_ = function (isPrefetch, options, info, url, response) {
  // If a multipart response was received, all processing is already done,
  // so don't execute the "process" callback.
  var multipart = response['type'] == 'multipart';
  if (!multipart) {
    // Abort the load/prefetch if the "process" callback is canceled.
    // Note: pass "true" to only execute callbacks and not dispatch events.
    if (!spfNav.dispatchProcess_(url, response, options, true)) {
      spfNav.reload(url, spfNav.ReloadReason.PROCESS_CANCELED);
      return;
    }

    // Check for reload responses.
    // For a load, abort; for a promoted prefetch, reload immediately; for a
    // prefetch, ignore and the reload will be processed when a navigate occurs.
    if (response['reload']) {
      if (!isPrefetch) {
        return;
      }
      if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE) == info.original) {
        spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED);
        return;
      }
    }

    // Check for redirect responses.
    if (response['redirect']) {
      spfNav.handleLoadRedirect_(isPrefetch, options, info, response['redirect']);
      return;
    }
  }

  var promoteKey = spfNav.promoteKey(info.original);
  if (isPrefetch) {
    // Remove the prefetch xhr from the set of currently active
    // prefetches upon successful prefetch.
    spfNav.removePrefetch(url);
    // If the prefetch has been promoted, run the promotion task after
    // adding it and do not perform any preprocessing. If it has not
    // been promoted, remove the task queues becuase a subsequent
    // request will hit the cache.
    if (__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PROMOTE) == info.original) {
      // TODO(nicksay): Honor history/reverse/position during promotion in
      // reponse to a popState. (This is an edge case.)
      var fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNav.handleNavigateSuccess_, null, options, info, url, response);
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(promoteKey, fn);
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(promoteKey, true);
      return;
    } else {
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].cancel(promoteKey);
    }
  }

  // Process the requested response.
  var processFn = isPrefetch ? __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].preprocess : __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].process;
  try {
    // If a multipart response was received, all processing is already done,
    // so an empty object is used to ensure the callback is properly
    // queued after existing ones from any ongoing part prcoessing.
    var r = /** @type {spfBase.SingleResponse} */multipart ? {} : response;
    processFn(url, r, info, function () {
      // Note: pass "true" to only execute callbacks and not dispatch events.
      spfNav.dispatchDone_(url, response, options, true);
    });
  } catch (err) {
    // If an exception is caught during processing, log, execute the error
    // handler and bail.
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    failed to process response', response);
    spfNav.handleLoadError_(isPrefetch, options, info, url, err);
  }
};

/**
 * Handles a redirect response on load requests.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} redirectUrl The new URL to be redirected to.
 * @private
 */
spfNav.handleLoadRedirect_ = function (isPrefetch, options, info, redirectUrl) {
  var redirectFn = isPrefetch ? spfNav.prefetch_ : spfNav.load_;
  // Note that POST is not propagated with redirects.
  // Only copy callback keys to into a new object to enforce this.
  var keys = [spfNav.Callback.ERROR, spfNav.Callback.REQUEST, spfNav.Callback.PART_PROCESS, spfNav.Callback.PART_DONE, spfNav.Callback.PROCESS, spfNav.Callback.DONE];
  var redirectOpts = /** @type {spfBase.RequestOptions} */{};
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(keys, function (key) {
    redirectOpts[key] = options[key];
  });
  redirectFn(redirectUrl, redirectOpts, info);
};

/**
 * Process a SPF response on the current page outside of a navigation flow.
 *
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The SPF response
 *     object to process.
 * @param {function((spfBase.SingleResponse|spfBase.MultipartResponse))=} opt_callback
 *     Function to execute when processing is done; the argument is
 *     the `response`.
 */
spfNav.process = function (response, opt_callback) {
  var url = window.location.href;
  var multipart = response['type'] == 'multipart';
  var done = function done(index, max, _, resp) {
    if (index == max && opt_callback) {
      opt_callback(resp);
    }
  };
  if (multipart) {
    var parts = response['parts'];
    var max = parts.length - 1;
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(parts, function (part, index) {
      var fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(done, null, index, max);
      __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].process(url, part, null, fn);
    });
  } else {
    response = /** @type {spfBase.SingleResponse} */response;
    var fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(done, null, 0, 0);
    __WEBPACK_IMPORTED_MODULE_10__nav_response__["a" /* default */].process(url, response, null, fn);
  }
};

/**
 * Dispatches the "error" event with the following custom event detail:
 *   url: The current URL.
 *   err: The Error object.
 *
 * If a local "onError" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The history URL.
 * @param {Error} err The Error object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @param {XMLHttpRequest=} opt_xhr The XMLHttpRequest for current error
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchError_ = function (url, err, opt_options, opt_noEvents, opt_xhr) {
  var detail = { 'url': url, 'err': err, 'xhr': opt_xhr };
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  var fn = options[spfNav.Callback.ERROR];
  var proceed = spfNav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.ERROR, detail);
  }
  return proceed;
};

/**
 * Dispatches the "reload" event with the following custom event detail:
 *   url: The current URL.
 *   reason: The reason code and text explaining the reload.
 *
 * @param {string} url The target URL which is being reloaded.
 * @param {string} reason The reason code causing the reload.
 * @private
 */
spfNav.dispatchReload_ = function (url, reason) {
  var detail = { 'url': url, 'reason': reason };
  __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.RELOAD, detail);
};

/**
 * Dispatches the "click" event with the following custom event detail:
 *   url: The click URL, without the SPF identifier.
 *   target: The click target.
 *
 * @param {string} url The click URL, without the SPF identifier.
 * @param {EventTarget} target The click target.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchClick_ = function (url, target) {
  var detail = { 'url': url, 'target': target };
  return __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.CLICK, detail);
};

/**
 * Dispatches the "history" event with the following custom event detail:
 *   url: The click URL, without the SPF identifier.
 *   referer: The referring page URL, without the SPF identifier.
 *   previous: The previously visible page URL, without the SPF identifier.
 *
 * @param {string} url The click URL, without the SPF identifier.
 * @param {string=} opt_referer The referer URL.
 * @param {string=} opt_previous The previously visible URL.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchHistory_ = function (url, opt_referer, opt_previous) {
  var detail = { 'url': url, 'referer': opt_referer, 'previous': opt_previous };
  return __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.HISTORY, detail);
};

/**
 * Dispatches the "request" event with the follow custom event detail:
 *   url: The URL to request, without the SPF identifier.
 *   referer: The referring page URL, without the SPF identifier.
 *   previous: The previously visible page URL, without the SPF identifier.
 *
 * If a local "onRequest" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The URL to request, without the SPF identifier.
 * @param {string|undefined} referer The referer URL.
 * @param {string|undefined} previous The previously visible URL.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchRequest_ = function (url, referer, previous, opt_options, opt_noEvents) {
  var detail = { 'url': url, 'referer': referer, 'previous': previous };
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  var fn = options[spfNav.Callback.REQUEST];
  var proceed = spfNav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.REQUEST, detail);
  }
  return proceed;
};

/**
 * Dispatches the "part process" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   part: The partial response object, a part of a multipart response.
 *
 * If a local "onPartProcess" callback is provided, it is executed first with
 * the same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object,
 *     part of a multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchPartProcess_ = function (url, partial, opt_options, opt_noEvents) {
  var detail = { 'url': url, 'part': partial };
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  var fn = options[spfNav.Callback.PART_PROCESS];
  var proceed = spfNav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.PART_PROCESS, detail);
  }
  return proceed;
};

/**
 * Dispatches the "part done" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   part: The partial response object, a part of a multipart response.
 *
 * If a local "onPartDone" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object,
 *     part of a multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchPartDone_ = function (url, partial, opt_options, opt_noEvents) {
  var detail = { 'url': url, 'part': partial };
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  var fn = options[spfNav.Callback.PART_DONE];
  var proceed = spfNav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.PART_DONE, detail);
  }
  return proceed;
};

/**
 * Dispatches the "process" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   response: The response object, either a single or multipart response.
 *
 * If a local "onProcess" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchProcess_ = function (url, response, opt_options, opt_noEvents) {
  var detail = { 'url': url, 'response': response };
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  var fn = options[spfNav.Callback.PROCESS];
  var proceed = spfNav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.PROCESS, detail);
  }
  return proceed;
};

/**
 * Dispatches the "done" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   response: The response object, either a single or multipart response.
 *
 * If a local "onDone" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchDone_ = function (url, response, opt_options, opt_noEvents) {
  var detail = { 'url': url, 'response': response };
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  var fn = options[spfNav.Callback.DONE];
  var proceed = spfNav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.DONE, detail);
  }
  return proceed;
};

/**
 * Generate the promote key given a url.
 *
 * @param {string} url The url of the request.
 * @return {string} The promote key.
 */
spfNav.promoteKey = function (url) {
  return 'promote ' + __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
};

/**
 * Generate the preprocess key given a url.
 *
 * @param {string} url The url of the request.
 * @return {string} The preprocess key.
 */
spfNav.preprocessKey = function (url) {
  return 'preprocess ' + __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
};

/**
 * Add a prefetch request to the set of ongoing prefetches.
 *
 * @param {string} url The url of the prefetch request.
 * @param {XMLHttpRequest} xhr The prefetch request object.
 */
spfNav.addPrefetch = function (url, xhr) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.addPrefetch ', url, xhr);
  var absoluteUrl = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
  var prefetches = spfNav.prefetches_();
  prefetches[absoluteUrl] = xhr;
};

/**
 * Cancels a single prefetch request and removes it from the set.
 *
 * @param {string} url The url of the prefetch to be aborted.
 */
spfNav.removePrefetch = function (url) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.removePrefetch ', url);
  var absoluteUrl = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
  var prefetches = spfNav.prefetches_();
  var prefetchXhr = prefetches[absoluteUrl];
  if (prefetchXhr) {
    prefetchXhr.abort();
  }
  delete prefetches[absoluteUrl];
};

/**
 * Cancels all ongoing prefetch requests, optionally skipping the given url.
 *
 * @param {string=} opt_skipUrl A url of the request that should not
 *     be canceled.
 */
spfNav.cancelAllPrefetchesExcept = function (opt_skipUrl) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('nav.cancelAllPrefetchesExcept', opt_skipUrl);
  var prefetches = spfNav.prefetches_();
  var absoluteUrl = opt_skipUrl && __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(opt_skipUrl);
  for (var key in prefetches) {
    if (absoluteUrl != key) {
      spfNav.removePrefetch(key);
    }
  }
};

/**
 * Clears all resource timings for the page.
 *
 * @private
 */
spfNav.clearResourceTimings_ = function () {
  var clearResourceTimings = window.performance && (window.performance.clearResourceTimings || window.performance['webkitClearResourceTimings'] || window.performance['mozClearResourceTimings'] || window.performance['msClearResourceTimings'] || window.performance['oClearResourceTimings']);
  if (clearResourceTimings) {
    return __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(clearResourceTimings, window.performance);
  }
  return __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].nullFunction;
}();

/**
 * @param {!Object.<string, XMLHttpRequest>=} opt_reqs
 *     Optional set of requests to overwrite the current value.
 * @return {!Object.<string, XMLHttpRequest>} Current map
 *     of requests.
 * @private
 */
spfNav.prefetches_ = function (opt_reqs) {
  if (opt_reqs || !__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PREFETCHES)) {
    return (/** @type {!Object.<string, XMLHttpRequest>} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PREFETCHES, opt_reqs || {})
    );
  }
  return (/** @type {!Object.<string, XMLHttpRequest>} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_PREFETCHES)
  );
};

/**
 * @return {Array.<number>} The saved scroll position.
 * @private
 */
spfNav.getScrollTempPosition_ = function () {
  var position = /** @type {?Array.<number>} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_POSITION) || null;
  var url = /** @type {?string} */__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_URL) || '';
  if (position && url == window.location.href) {
    return position;
  }
  return null;
};

/**
 * @private
 */
spfNav.setScrollTempPosition_ = function () {
  var position = [window.pageXOffset, window.pageYOffset];
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    saving scroll temp position', position);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_POSITION, position);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_URL, window.location.href);
};

/**
 * @private
 */
spfNav.clearScrollTempPosition_ = function () {
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_POSITION, null);
  __WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_11__state__["a" /* default */].Key.NAV_SCROLL_TEMP_URL, null);
};

/**
 * Detects touch-capable platforms.
 *
 * @return {boolean} True if this is a touch capable platform.
 * @private
 */
spfNav.isTouchCapablePlatform_ = function () {
  return 'ontouchstart' in window || window.navigator['maxTouchPoints'] > 0 || window.navigator['msMaxTouchPoints'] > 0;
};

/**
 * @param {spfBase.RequestOptions=} opt_options The request options object.
 * @return {spfBase.RequestOptions}
 * @private
 */
spfNav.createOptions_ = function (opt_options) {
  var options = opt_options || /** @type {spfBase.RequestOptions} */{};
  return options;
};

/**
 * Type definition for an object literal argument to {@link spfNav.Info}.
 *
 * @typedef {{
 *   current: (string|undefined),
 *   history: (boolean|undefined),
 *   original: (string|undefined),
 *   position: (Array.<number>|undefined),
 *   referer: (string|undefined),
 *   reverse: (boolean|undefined),
 *   scrolled: (boolean|undefined),
 *   type: (string|undefined)
 * }}
 * @private
 */
spfNav.Info_;

/**
 * Data to track information about an SPF navigation.
 *
 * @param {(spfNav.Info|spfNav.Info_)=} opt_info A navigation info object.
 * @constructor
 * @struct
 */
spfNav.Info = function (opt_info) {
  opt_info = opt_info || /** @type {spfNav.Info_} */{};
  /**
   * The current page URL. This differs from `referer` in that is always
   * represents the current visible page regardless of history state.
   * @type {string}
   */
  // The current URL will have already changed for history events, so for this
  // case, the opt_info.current value from the history state should be used.
  this.current = opt_info.history && opt_info.current ? opt_info.current : window.location.href;
  /**
   * Whether this navigation is part of a history change. True when navigation
   * is in response to a popState event.
   * @type {boolean}
   */
  this.history = !!opt_info.history;
  /**
   * The original request URL. This may differ than the regular URL for
   * redirect responses.
   * @type {string}
   */
  this.original = opt_info.original || '';
  /**
   * The window position to scroll to during navigation, in [x, y] format.
   * Should be defined when navigation is in response to a popState event and a
   * value exists in the history state object.
   * @type {Array.<number>}
   */
  this.position = opt_info.position || null;
  /**
   * The referring page URL.
   * @type {string}
   */
  // The referer is stored in the history entry state object to allow the
  // correct value to be sent to the server during back/forward.
  // Compare against "undefined" to allow empty referer values in history.
  this.referer = opt_info.referer != undefined ? opt_info.referer : window.location.href;
  /**
   * Whether this navigation is going "backwards". True when navigation
   * is in response to a popState event and the "back" button is clicked.
   * @type {boolean}
   */
  this.reverse = !!opt_info.reverse;
  /**
   * Whether the window has been scrolled to `position` or to the top during
   * this navigation request.
   * @type {boolean}
   */
  this.scrolled = !!opt_info.scrolled;
  /**
   * The type of request, one of the following: "navigate", "navigate-back",
   * "navigate-forward", "load", "prefetch".  If not yet determined (i.e. before
   * the request is sent), it will be an empty string.
   * @type {string}
   */
  this.type = opt_info.type || '';
};

/**
 * @enum {string}
 */
spfNav.Callback = {
  ERROR: 'onError',
  REQUEST: 'onRequest',
  PART_PROCESS: 'onPartProcess',
  PART_DONE: 'onPartDone',
  PROCESS: 'onProcess',
  DONE: 'onDone'

  /**
   * @enum {string}
   */
};spfNav.ReloadReason = {
  INELIGIBLE: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '1' : '1: Navigation not initialized or limit reached.',
  REQUEST_CANCELED: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '2' : '2: Navigation canceled by the request event.',
  PART_PROCESS_CANCELED: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '3' : '3: Navigation canceled by the partprocess event.',
  PROCESS_CANCELED: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '4' : '4: Navigation canceled by the process event.',
  RESPONSE_RECEIVED: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '5' : '5: Reload response received.',
  FORBIDDEN: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '9' : '9: Destination forbidden by same-origin security.',
  ERROR: !__WEBPACK_IMPORTED_MODULE_0__base__["c" /* SPF_DEBUG */] ? '10' : '10: An uncaught error occurred processing.'
};

/* harmony default export */ __webpack_exports__["a"] = (spfNav);

/***/ }),
/* 40 */
/* exports provided: default */
/* exports used: default */
/*!**************************************************!*\
  !*** ./app/javascript/packs/spf/nav/response.js ***!
  \**************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(/*! ../state */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__debug_debug__ = __webpack_require__(/*! ../debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dom_dom__ = __webpack_require__(/*! ../dom/dom */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dom_classlist__ = __webpack_require__(/*! ../dom/classlist */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dom_dataset__ = __webpack_require__(/*! ../dom/dataset */ 38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__history_history__ = __webpack_require__(/*! ../history/history */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__net_connect__ = __webpack_require__(/*! ../net/connect */ 80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__net_script__ = __webpack_require__(/*! ../net/script */ 21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__net_style__ = __webpack_require__(/*! ../net/style */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__string_string__ = __webpack_require__(/*! ../string/string */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__ = __webpack_require__(/*! ../tasks/tasks */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__url_url__ = __webpack_require__(/*! ../url/url */ 13);
// Copyright 2013 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Navigation-related response functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

















var spfNavResponse = {};
// goog.provide('spfNavResponse');

/**
 * Parses text for an SPF response.  If `opt_multipart` is true, attempts
 * to parse the text for one or more (in)complete multipart SPF responses.
 *
 * @param {string} text Text to parse.
 * @param {boolean=} opt_multipart Whether to attempt to parse the text for
 *     one or more multipart SPF response sections.
 * @param {boolean=} opt_lastDitch Whether to parse the text as the final
 *     one, potentially handling malformed but valid responses.  Requires
 *     `opt_multipart` to be true.
 * @throws {Error} If the `text` contains invalid JSON, or when
 *     `opt_multipart` is true, if a section of a multipart response
 *     contains invalid JSON.
 * @return {{parts: Array.<spfBase.SingleResponse>, extra: string}}
 */
spfNavResponse.parse = function (text, opt_multipart, opt_lastDitch) {
  if (opt_multipart) {
    var beginToken = spfNavResponse.Token.BEGIN;
    var delimToken = spfNavResponse.Token.DELIMITER;
    var endToken = spfNavResponse.Token.END;
    var lastDitchHalfToken = '\r\n';
    var parts = [];
    var chunk;
    var start = 0;
    // With a last-ditch effort, append the token CRLF chars to the text, which
    // might allow parsing the final section of a response that ends with a
    // closing bracket but not the CRLF required of a well-formed END token.
    // As a side-effect, this will also successfully parse a response section
    // that ends with a comma (because the CRLF will create a well-formed
    // DELIMITER token).  If the last character is not a comma or closing
    // bracket, this last-ditch effort will have no effect.
    if (opt_lastDitch) {
      text += lastDitchHalfToken;
    }
    var finish = text.indexOf(beginToken, start);
    if (finish > -1) {
      start = finish + beginToken.length;
    }
    while ((finish = text.indexOf(delimToken, start)) > -1) {
      chunk = __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].trim(text.substring(start, finish));
      start = finish + delimToken.length;
      if (chunk) {
        parts.push(JSON.parse(chunk));
      }
    }
    finish = text.indexOf(endToken, start);
    if (finish > -1) {
      chunk = __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].trim(text.substring(start, finish));
      start = finish + endToken.length;
      if (chunk) {
        parts.push(JSON.parse(chunk));
      }
    }
    var extra = '';
    if (text.length > start) {
      extra = text.substring(start);
      if (opt_lastDitch && __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].endsWith(extra, lastDitchHalfToken)) {
        extra = extra.substring(0, extra.length - lastDitchHalfToken.length);
      }
    }
    parts = spfNavResponse.extract(parts);
    return {
      parts: /** @type {Array.<spfBase.SingleResponse>} */parts,
      extra: extra
    };
  } else {
    var response = JSON.parse(text);
    var parts = spfNavResponse.extract(__WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].toArray(response));
    return {
      parts: /** @type {Array.<spfBase.SingleResponse>} */parts,
      extra: ''
    };
  }
};

/**
 * Processes a SPF response.
 *
 * @param {string} url The URL of the response being processed.
 * @param {spfBase.SingleResponse} response The SPF response object to process.
 * @param {spfBase.nav.Info=} opt_info The navigation info object.
 * @param {function(string, spfBase.SingleResponse)=} opt_callback Function to
 *     execute when processing is done; the first argument is `url`,
 *     the second argument is `response`.
 */
spfNavResponse.process = function (url, response, opt_info, opt_callback) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].info('nav.response.process ', response, opt_info);

  var isNavigate = opt_info && __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].startsWith(opt_info.type, 'navigate');
  var isReverse = opt_info && opt_info.reverse;
  var hasPosition = opt_info && !!opt_info.position;
  var hasScrolled = opt_info && opt_info.scrolled;

  var name = response['name'] || '';

  // Convert the URL to absolute, to be used for finding the task queue.
  var key = 'process ' + __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);
  var sync = !__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('experimental-process-async');

  // NOTE: when adding tasks to a queue, use bind to avoid name/scope errors.
  var fn;
  var num = 0;

  // Initialize the timing object if needed.
  if (!response['timing']) {
    response['timing'] = {};
  }

  // Update title (immediate).
  if (response['title']) {
    document.title = response['title'];
  }

  // Add the new history state (immediate), if needed.
  // Only navigation requests should process URL changes.
  if (isNavigate && response['url']) {
    var fullUrl = __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(response['url']);
    // Update the history state if the url doesn't match.
    if (fullUrl != spfNavResponse.getCurrentUrl_()) {
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  update history with response url');
      // Add the URL to the history stack, including hash.
      __WEBPACK_IMPORTED_MODULE_8__history_history__["a" /* default */].replace(response['url'] + window.location.hash);
    }
  }

  // Install head scripts and styles (single task), if needed.
  if (response['head']) {
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (head, timing) {
      // Extract scripts and styles from the fragment.
      var extracted = spfNavResponse.extract_(head);
      // Install links.
      spfNavResponse.installLinks_(extracted);
      // Install styles.
      spfNavResponse.installStyles_(extracted);
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    head css');
      // Install scripts.
      // Suspend main queue to allow JS execution to occur sequentially.
      // TODO(nicksay): Consider using a sub-queue for JS execution.
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].suspend(key);
      spfNavResponse.installScripts_(extracted, function () {
        timing['spfProcessHead'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
        __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    head js');
        // Resume main queue after JS.
        __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].resume(key, sync);
        __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task done: head');
      });
    }, null, response['head'], response['timing']);
    num = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task queued: head', num);
  }

  // Update attributes (single task), if needed.
  if (response['attr']) {
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (attrs, timing) {
      for (var id in attrs) {
        var el = document.getElementById(id);
        if (el) {
          __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].setAttributes(el, attrs[id]);
          __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    attr set', id);
        }
      }
      timing['spfProcessAttr'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task done: attr');
    }, null, response['attr'], response['timing']);
    num = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task queued: attr', num);
  }

  // Update content (one task per fragment or three tasks if animated).
  var fragments = response['body'] || {};
  var numBeforeFragments = num;
  for (var id in fragments) {
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (id, body, timing) {
      var el = document.getElementById(id);
      if (el) {
        // Scroll to the top before the first content update, if needed.
        // Only non-history navigation requests scroll to the top immediately.
        // Other history navigation requests handle scrolling after all
        // processing is done to avoid jumping to the top and back down to the
        // saved position afterwards.
        if (isNavigate && !hasPosition && !hasScrolled) {
          __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.NAV_SCROLL_TEMP_POSITION, null);
          __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.NAV_SCROLL_TEMP_URL, null);
          __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    scrolling to top');
          window.scroll(0, 0);
          hasScrolled = true;
          if (opt_info) {
            opt_info.scrolled = true;
          }
        }
        // Extract scripts and styles from the fragment.
        var extracted = spfNavResponse.extract_(body);
        // Install styles.
        spfNavResponse.installStyles_(extracted);
        // Set up scripts to be installed after the html is updated.
        var installScripts = function installScripts() {
          // Install scripts.
          // Suspend main queue to allow JS execution to occur sequentially.
          // TODO(nicksay): Consider using a sub-queue for JS execution.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].suspend(key);
          spfNavResponse.installScripts_(extracted, function () {
            // Resume main queue after JS.
            __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].resume(key, sync);
            __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task done: body', id);
          });
        };

        var animationClass = /** @type {string} */__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('animation-class');
        var noAnimation = !spfNavResponse.CAN_ANIMATE_ || !__WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].contains(el, animationClass);
        if (noAnimation) {
          var htmlHandler = /** @type {Function} */__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('experimental-html-handler');
          if (htmlHandler) {
            // Suspend main queue for the experimental HTML handler.
            __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].suspend(key);
            htmlHandler(extracted['html'], el, function () {
              installScripts();
              // Resume main queue after the experimental HTML handler.
              __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].resume(key, sync);
            });
          } else {
            el.innerHTML = extracted['html'];
            installScripts();
          }
        } else {
          var animation = new spfNavResponse.Animation_(el, extracted['html'], animationClass, name, parseInt(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].get('animation-duration'), 10), !!isReverse);
          // Suspend main queue while the animation is running.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].suspend(key);
          // Finish a previous animation on this sub-queue, if needed.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(animation.key, true);
          // Animation task 1: insert new, delay = 0.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(animation.key, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavResponse.prepareAnimation_, null, animation), 0);
          __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process queued prepare animation', id);
          // Animation task 2: switch, delay = 17ms = 1 frame @ 60fps.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(animation.key, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavResponse.runAnimation_, null, animation), 17);
          __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process queued run animation', id);
          // Animation task 3: remove old, delay = config.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(animation.key, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavResponse.completeAnimation_, null, animation), animation.duration);
          __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process queued complete animation', id);
          // Resume main queue after animation is done.
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(animation.key, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function () {
            installScripts();
            __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].resume(key, sync);
          }, null), 0);
          __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(animation.key);
        }
      }
    }, null, id, fragments[id], response['timing']);
    num = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task queued: body', id, num);
  }
  var numAfterFragments = num;
  var numFragments = numAfterFragments - numBeforeFragments;

  // Install foot scripts and styles (single task), if needed.
  if (response['foot']) {
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (foot, timing, numFragments) {
      // Use the page scripts task as a signal that the content is updated,
      // only recording the content completion time if fragments were processed.
      if (numFragments) {
        timing['spfProcessBody'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
      }
      // Extract scripts and styles from the fragment.
      var extracted = spfNavResponse.extract_(foot);
      // Install styles.
      spfNavResponse.installStyles_(extracted);
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    foot css');
      // Install scripts.
      // Suspend main queue to allow JS execution to occur sequentially.
      // TODO(nicksay): Consider using a sub-queue for JS execution.
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].suspend(key);
      spfNavResponse.installScripts_(extracted, function () {
        timing['spfProcessFoot'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
        __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    foot js');
        __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].resume(key, sync); // Resume main queue after JS.
        __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task done: foot');
      });
    }, null, response['foot'], response['timing'], numFragments);
    num = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task queued: foot', num);
  } else if (numFragments) {
    // If a page scripts task is unnecessary and fragments were processed,
    // add a task to record the completion time.  Doing this only if page
    // scripts won't be installed prevents unnecessary task execution and
    // potential delays.
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (timing) {
      timing['spfProcessBody'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task done: timing-for-body');
    }, null, response['timing']);
    num = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task queued: timing-for-body', num);
  }

  // Execute callback.
  if (opt_callback) {
    num = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(opt_callback, null, url, response));
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process task queued: callback', num);
  }

  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process run', key, sync);
  __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(key, sync);
};

/**
 * Preprocesses a SPF response.

 * Similar to {@link #process} but instead of page content being updated,
 * script and stylesheet URLs are prefetched.
 *
 * @param {string} url The URL of the response being preprocessed.
 * @param {spfBase.SingleResponse} response The SPF response object to preprocess.
 * @param {spfBase.nav.Info=} opt_info The navigation info object.
 * @param {function(string, spfBase.SingleResponse)=} opt_callback Function to
 *     execute when preprocessing is done; the first argument is `url`,
 *     the second argument is `response`.
 */
spfNavResponse.preprocess = function (url, response, opt_info, opt_callback) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].info('nav.response.preprocess ', response);
  // Convert the URL to absolute, to be used for finding the task queue.
  var key = 'preprocess ' + __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(url);

  // NOTE: when adding tasks to a queue, use bind to avoid name/scope errors.
  var fn;

  // Preinstall page styles (single task), if needed.
  if (response['head']) {
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (head) {
      var extracted = spfNavResponse.extract_(head);
      spfNavResponse.preinstallLinks_(extracted);
      spfNavResponse.preinstallStyles_(extracted);
      spfNavResponse.preinstallScripts_(extracted);
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task done: head');
    }, null, response['head']);
    __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task queued: head');
  }

  // Preinstall fragment scripts and styles (one task per fragment).
  var fragments = response['body'] || {};
  for (var id in fragments) {
    if (fragments[id]) {
      fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (id, body) {
        var extracted = spfNavResponse.extract_(body);
        spfNavResponse.preinstallStyles_(extracted);
        spfNavResponse.preinstallScripts_(extracted);
        __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('    body js', id);
        __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task done: body', id);
      }, null, id, fragments[id]);
      __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task queued: body', id);
    }
  }

  // Preinstall page scripts (single task).
  if (response['foot']) {
    fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(function (foot) {
      var extracted = spfNavResponse.extract_(foot);
      spfNavResponse.preinstallStyles_(extracted);
      spfNavResponse.preinstallScripts_(extracted);
      __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task done: foot');
    }, null, response['foot']);
    __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, fn);
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task queued: foot');
  }

  // Execute callback.
  if (opt_callback) {
    __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].add(key, __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(opt_callback, null, url, response));
    __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  preprocess task queued: callback');
  }

  // The preprocessing queue is always run async.
  __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].run(key);
};

/**
 * @param {spfNavResponse.Animation_} data The animation data.
 * @private
 */
spfNavResponse.prepareAnimation_ = function (data) {
  // Add the start class to put elements in their beginning states.
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.dirClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.fromClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.toClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.startClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.startClassDeprecated);
  // Pack the existing content into a temporary container.
  data.oldEl = document.createElement('div');
  data.oldEl.className = data.oldClass;
  __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].packElement(data.element, data.oldEl);
  // Place the new content into a temporary container as a sibling.
  data.newEl = document.createElement('div');
  data.newEl.className = data.newClass;
  data.newEl.innerHTML = data.html;
  if (data.reverse) {
    __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].insertSiblingBefore(data.newEl, data.oldEl);
  } else {
    __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].insertSiblingAfter(data.newEl, data.oldEl);
  }
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process done prepare animation', data.element.id);
};

/**
 * @param {spfNavResponse.Animation_} data The animation data.
 * @private
 */
spfNavResponse.runAnimation_ = function (data) {
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.startClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.startClassDeprecated);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.endClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].add(data.element, data.endClassDeprecated);
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process done run animation', data.element.id);
};

/**
 * @param {spfNavResponse.Animation_} data The animation data.
 * @private
 */
spfNavResponse.completeAnimation_ = function (data) {
  // Remove the old content.
  data.element.removeChild(data.oldEl);
  // Unpack the new content from the temporary container.
  __WEBPACK_IMPORTED_MODULE_5__dom_dom__["a" /* default */].unpackElement(data.newEl);
  // Remove the end class to put elements back in normal state.
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.endClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.endClassDeprecated);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.fromClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.toClass);
  __WEBPACK_IMPORTED_MODULE_6__dom_classlist__["a" /* default */].remove(data.element, data.dirClass);
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('  process done complete animation', data.element.id);
};

/**
 * Extracts all resources from HTML in a SPF response.
 *
 * @param {T} response The SPF response object to extract.
 * @return {T} The response, updated to have resources extracted from HTML
 *     strings.  This does not create a new object and modifies the passed
 *     response in-place.
 * @template T
 */
spfNavResponse.extract = function (response) {
  __WEBPACK_IMPORTED_MODULE_4__debug_debug__["a" /* default */].debug('spfNavResponse.extract', response);
  var parts = __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].toArray(response);
  __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].each(parts, function (part) {
    if (part) {
      if (part['head']) {
        part['head'] = spfNavResponse.extract_(part['head']);
      }
      if (part['body']) {
        for (var id in part['body']) {
          part['body'][id] = spfNavResponse.extract_(part['body'][id]);
        }
      }
      if (part['foot']) {
        part['foot'] = spfNavResponse.extract_(part['foot']);
      }
    }
  });
  return response;
};

/**
 * Extracts resources from an HTML string:
 *   - JS: <script> and <script src>
 *   - CSS: <style> and <link rel=stylesheet>
 *
 * @param {spfBase.ResponseFragment|spfNavResponse.Extraction_} frag The response
 *     fragment (either a HTML string to parse or a pre-parsed object), or a
 *     previous extraction result.
 * @return {!spfNavResponse.Extraction_}
 * @private
 */
spfNavResponse.extract_ = function (frag) {
  var result = new spfNavResponse.Extraction_();
  if (!frag) {
    return result;
  }

  // If the fragment isn't a string, it's a pre-parsed object.  Use the
  // provided values to populate the result instead.
  if (!__WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].isString(frag)) {
    // Add the parsed scripts to the result.
    if (frag['scripts']) {
      __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].each(frag['scripts'], function (script) {
        result['scripts'].push({ url: script['url'] || '',
          text: script['text'] || '',
          name: script['name'] || '',
          async: script['async'] || false });
      });
    }
    // Add the parsed styles to the result.
    if (frag['styles']) {
      __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].each(frag['styles'], function (style) {
        result['styles'].push({ url: style['url'] || '',
          text: style['text'] || '',
          name: style['name'] || '' });
      });
    }
    // Add the parsed links to the result.
    if (frag['links']) {
      __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].each(frag['links'], function (link) {
        if (link['rel'] == 'spf-preconnect') {
          result['links'].push({ url: link['url'] || '',
            rel: link['rel'] || '' });
        }
      });
    }
    result['html'] = frag['html'] || '';
    return result;
  }

  // Re-assure the compiler that the fragment is a string at this point.
  frag = /** @type {string} */frag;

  // Parse scripts and styles and add them to the result.
  frag = frag.replace(spfNavResponse.ElementRegEx.SCRIPT_STYLE, function (full, tag, attr, text) {
    // A script tag can be either an inline or external style.
    // Parse the name, src, and async attributes.
    if (tag == 'script') {
      var name = attr.match(spfNavResponse.AttributeRegEx.NAME);
      name = name ? name[1] : '';
      var url = attr.match(spfNavResponse.AttributeRegEx.SRC);
      url = url ? url[1] : '';
      var async = spfNavResponse.AttributeRegEx.ASYNC.test(attr);
      var type = spfNavResponse.AttributeRegEx.TYPE.exec(attr);
      var inject = !type || __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].contains(type[1], '/javascript') || __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].contains(type[1], '/x-javascript') || __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].contains(type[1], '/ecmascript');
      if (inject) {
        result['scripts'].push({ url: url, text: text, name: name, async: async });
        return '';
      } else {
        return full;
      }
    }
    // A style tag is an inline style.  Parse the name attribute.
    if (tag == 'style') {
      var name = attr.match(spfNavResponse.AttributeRegEx.NAME);
      name = name ? name[1] : '';
      var type = spfNavResponse.AttributeRegEx.TYPE.exec(attr);
      var inject = !type || __WEBPACK_IMPORTED_MODULE_12__string_string__["a" /* default */].contains(type[1], 'text/css');
      if (inject) {
        result['styles'].push({ url: '', text: text, name: name });
        return '';
      } else {
        return full;
      }
    }
    // An unexpected tag was matched.  Do nothing.
    return full;
  });

  // Parse links and add them to the result.
  frag = frag.replace(spfNavResponse.ElementRegEx.LINK, function (full, attr) {
    var rel = attr.match(spfNavResponse.AttributeRegEx.REL);
    rel = rel ? rel[1] : '';
    // A rel=stylesheet tag is an external style.
    // Parse the name and href attributes.
    if (rel == 'stylesheet') {
      var name = attr.match(spfNavResponse.AttributeRegEx.NAME);
      name = name ? name[1] : '';
      var url = attr.match(spfNavResponse.AttributeRegEx.HREF);
      url = url ? url[1] : '';
      result['styles'].push({ url: url, text: '', name: name });
      return '';
    }
    // A rel=spf-preconnect tag indicates early connection.
    // Parse the href attribute.
    if (rel == 'spf-preconnect') {
      var url = attr.match(spfNavResponse.AttributeRegEx.HREF);
      url = url ? url[1] : '';
      result['links'].push({ url: url, rel: rel });
      return '';
    }
    // An unknown link was matched.  Do nothing.
    return full;
  });

  // The result html is what's left after parsing.
  result['html'] = frag;

  return result;
};

/**
 * Installs scripts that have been extracted from an HTML string.
 * See {@link spfNetScript.load}, {@link spfNetScript.eval}, and
 * {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @param {Function=} opt_callback Callback function to execute after
 *     all scripts are loaded.
 * @private
 */
spfNavResponse.installScripts_ = function (result, opt_callback) {
  if (result['scripts'].length <= 0) {
    opt_callback && opt_callback();
    return;
  }
  // Load or evaluate the scripts in order or asynchronously.
  var index = -1;
  var next = function next() {
    index++;
    if (index < result['scripts'].length) {
      var item = result['scripts'][index];
      var fn = function fn() {};
      if (item.url) {
        if (item.name) {
          fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(__WEBPACK_IMPORTED_MODULE_10__net_script__["a" /* default */].load, null, item.url, item.name);
        } else {
          fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(__WEBPACK_IMPORTED_MODULE_10__net_script__["a" /* default */].get, null, item.url);
        }
      } else if (item.text) {
        if (item.name) {
          fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(__WEBPACK_IMPORTED_MODULE_10__net_script__["a" /* default */].eval, null, item.text, item.name);
        } else {
          fn = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(__WEBPACK_IMPORTED_MODULE_10__net_script__["a" /* default */].exec, null, item.text);
        }
      }
      if (item.url && !item.async) {
        fn(next);
      } else {
        fn();
        next();
      }
    } else {
      opt_callback && opt_callback();
    }
  };
  next();
};

/**
 * Prefetches scripts that have been extracted from an HTML string.
 * See {@link spfNetScript.prefetch} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.preinstallScripts_ = function (result) {
  if (result['scripts'].length <= 0) {
    return;
  }
  // Prefetch the scripts.
  var urls = __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].map(result['scripts'], function (item) {
    return item.url;
  });
  __WEBPACK_IMPORTED_MODULE_10__net_script__["a" /* default */].prefetch(urls);
};

/**
 * Installs styles that have been extracted from an HTML string.
 * See {@link spfNetStyle.load}, {@link spfNetStyle.eval}, and
 * {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.installStyles_ = function (result) {
  if (result['styles'].length <= 0) {
    return;
  }
  // Install the styles.
  __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].each(result['styles'], function (item) {
    if (item.url) {
      if (item.name) {
        __WEBPACK_IMPORTED_MODULE_11__net_style__["a" /* default */].load(item.url, item.name);
      } else {
        __WEBPACK_IMPORTED_MODULE_11__net_style__["a" /* default */].get(item.url);
      }
    } else if (item.text) {
      if (item.name) {
        __WEBPACK_IMPORTED_MODULE_11__net_style__["a" /* default */].eval(item.text, item.name);
      } else {
        __WEBPACK_IMPORTED_MODULE_11__net_style__["a" /* default */].exec(item.text);
      }
    }
  });
};

/**
 * Prefetches styles that have been extracted from an HTML string.
 * See {@link spfNetStyle.prefetch} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.preinstallStyles_ = function (result) {
  if (result['styles'].length <= 0) {
    return;
  }
  // Prefetch the styles.
  var urls = __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].map(result['styles'], function (item) {
    return item.url;
  });
  __WEBPACK_IMPORTED_MODULE_11__net_style__["a" /* default */].prefetch(urls);
};

/**
 * Installs links (i.e. DNS) that have extracted from an HTML string.
 * See {@link spfNetConnect.preconnect} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.installLinks_ = function (result) {
  // Currently, only preconnect links are supported.
  spfNavResponse.preinstallLinks_(result);
};

/**
 * Prefetches links (i.e. DNS) that have been extracted from an HTML string.
 * See {@link spfNetConnect.preconnect} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.preinstallLinks_ = function (result) {
  if (result['links'].length <= 0) {
    return;
  }
  // Preconnect.
  var urls = __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].map(result['links'], function (item) {
    return item.rel == 'spf-preconnect' ? item.url : '';
  });
  __WEBPACK_IMPORTED_MODULE_9__net_connect__["a" /* default */].preconnect(urls);
};

/**
 * Provides the current (absolute) URL from the window.
 * @return {string} Get the current window's URL.
 * @private
 */
spfNavResponse.getCurrentUrl_ = function () {
  return __WEBPACK_IMPORTED_MODULE_14__url_url__["a" /* default */].absolute(window.location.href);
};

/**
 * A container for holding data during an animated content update.
 * See {@link #process}.
 *
 * @param {!Element} el The element being updated.
 * @param {string} html The new content for the element.
 * @param {string} cls The animation class name.
 * @param {string} name The page name.
 * @param {number} duration The animation duration.
 * @param {boolean} reverse Whether this is a "back" animation.
 * @constructor
 * @struct
 * @private
 */
spfNavResponse.Animation_ = function (el, html, cls, name, duration, reverse) {
  /** @type {!Element} */
  this.element = el;
  /** @type {string} */
  this.html = html;
  /** @type {number} */
  this.duration = duration;
  /** @type {boolean} */
  this.reverse = reverse;

  var prevName = __WEBPACK_IMPORTED_MODULE_7__dom_dataset__["a" /* default */].get(document.body, 'spfName') || '';

  /** @type {string} */
  this.key = __WEBPACK_IMPORTED_MODULE_13__tasks_tasks__["a" /* default */].key(el);
  /** @type {string} */
  this.fromClass = prevName && cls + '-from-' + prevName;
  /** @type {string} */
  this.toClass = name && cls + '-to-' + name;
  /** @type {Element} */
  this.oldEl = null;
  /** @type {string} */
  this.oldClass = cls + '-old';
  /** @type {Element} */
  this.newEl = null;
  /** @type {string} */
  this.newClass = cls + '-new';
  /** @type {string} */
  this.dirClass = cls + (reverse ? '-reverse' : '-forward');
  /** @type {string} */
  this.startClass = cls + '-start';
  /** @type {string} */
  this.startClassDeprecated = this.dirClass + '-start';
  /** @type {string} */
  this.endClass = cls + '-end';
  /** @type {string} */
  this.endClassDeprecated = this.dirClass + '-end';
};

/**
 * A container for holding the results from parsing and extracting resources
 * from an HTML string.  See {@link #extract_}.
 *
 * Note: This container should be accessed as a dict (obj['foo']) not as a
 * struct (obj.foo) to ensure consistency when accessing parsed responses
 * cached by previous versions of SPF.
 *
 * @constructor
 * @dict
 * @private
 */
// TODO(nicksay): Consider a shared interface for spfNavResponse.Extraction_
// and spfBase.ResponseFragment.
spfNavResponse.Extraction_ = function () {
  /** @type {string} */
  this['html'] = '';
  /** @type {!Array.<{url:string, text:string, name:string, async:boolean}>} */
  this['scripts'] = [];
  /** @type {!Array.<{url:string, text:string, name:string}>} */
  this['styles'] = [];
  /** @type {!Array.<{url:string, rel:string}>} */
  this['links'] = [];
};

/**
 * Whether the browser supports animation via CSS Transitions.
 * @private {boolean}
 */
spfNavResponse.CAN_ANIMATE_ = function () {
  var testEl = document.createElement('div');
  if ('transition' in testEl.style) {
    return true;
  }
  var prefixes = ['webkit', 'Moz', 'Ms', 'O', 'Khtml'];
  return __WEBPACK_IMPORTED_MODULE_2__array_array__["a" /* default */].some(prefixes, function (prefix) {
    return prefix + 'Transition' in testEl.style;
  });
}();

/**
 * Regular expressions used to extract resource elements in HTML strings.
 *
 * @enum {RegExp}
 */
spfNavResponse.ElementRegEx = {
  LINK: /\x3clink([\s\S]*?)\x3e/ig,
  SCRIPT_STYLE: /\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig

  /**
   * Regular expressions used to extract attributes in HTML strings.
   * @enum {RegExp}
   */
};spfNavResponse.AttributeRegEx = {
  ASYNC: /(?:\s|^)async(?:\s|=|$)/i,
  HREF: /(?:\s|^)href\s*=\s*["']?([^\s"']+)/i,
  NAME: /(?:\s|^)name\s*=\s*["']?([^\s"']+)/i,
  REL: /(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i,
  SRC: /(?:\s|^)src\s*=\s*["']?([^\s"']+)/i,
  TYPE: /(?:\s|^)type\s*=\s*["']([^"']+)["']/i

  /**
   * Tokens used when parsing multipart responses.
   * @enum {string}
   */
};spfNavResponse.Token = {
  BEGIN: '[\r\n',
  DELIMITER: ',\r\n',
  END: ']\r\n'
};

/* harmony default export */ __webpack_exports__["a"] = (spfNavResponse);

/***/ }),
/* 41 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./app/javascript/packs/spf/pubsub/pubsub.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__state__ = __webpack_require__(/*! ../state */ 4);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Simple publish/subscribe instance used as a "dispatch"
 * for centralized notifications.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */





var spfPubsub = {};
// goog.provide('spfPubsub');

// goog.require('spf');
// goog.require('spfArray');
// goog.require('spfState');

/**
 * Subscribes a function to a topic.  The function is invoked in the global
 * scope.  Subscribing the same function to the same topic multiple
 * times will result in multiple function invocations while publishing.
 *
 * @param {string} topic Topic to subscribe to. Passing an empty string does
 *     nothing.
 * @param {Function|undefined} fn Function to be invoked when a message is
 *     published to the given topic. Passing `null` or `undefined`
 *     does nothing.
 */
spfPubsub.subscribe = function (topic, fn) {
  if (topic && fn) {
    if (!(topic in spfPubsub.subscriptions)) {
      spfPubsub.subscriptions[topic] = [];
    }
    spfPubsub.subscriptions[topic].push(fn);
  }
};

/**
 * Unsubscribes a function from a topic. Only deletes the first match found.
 *
 * @param {string} topic Topic to unsubscribe from. Passing an empty string does
 *     nothing.
 * @param {Function|undefined} fn Function to unsubscribe. Passing `null`
 *     or `undefined` does nothing.
 */
spfPubsub.unsubscribe = function (topic, fn) {
  if (topic in spfPubsub.subscriptions && fn) {
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].every(spfPubsub.subscriptions[topic], function (subFn, i, arr) {
      if (subFn == fn) {
        arr[i] = null;
        return false;
      }
      return true;
    });
  }
};

/**
 * Publishes a topic.  Calls functions subscribed to the topic in
 * the order in which they were added.  If any of the functions throws an
 * uncaught error, publishing is aborted.
 *
 * @param {string} topic Topic to publish. Passing an empty string does
 *     nothing.
 */
spfPubsub.publish = function (topic) {
  spfPubsub.publish_(topic);
};

/**
 * Simulaneously publishes and clears a topic.  Calls functions subscribed to
 * topic in the order in which they were added, unsubscribing each beforehand.
 * If any of the functions throws an uncaught error, publishing is aborted.
 * See {#publish} and {#clear}.
 *
 * @param {string} topic Topic to publish. Passing an empty string does
 *     nothing.
 */
spfPubsub.flush = function (topic) {
  spfPubsub.publish_(topic, true);
};

/**
 * See {@link #publish} or {@link #flush}.
 *
 * @param {string} topic Topic to publish.
 * @param {boolean=} opt_unsub Whether to unsubscribe functions beforehand.
 * @private
 */
spfPubsub.publish_ = function (topic, opt_unsub) {
  if (topic in spfPubsub.subscriptions) {
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(spfPubsub.subscriptions[topic], function (subFn, i, arr) {
      if (opt_unsub) {
        arr[i] = null;
      }
      if (subFn) {
        subFn();
      }
    });
  }
};

/**
 * Renames a topic.  All functions subscribed to the old topic will then
 * be subscribed to the new topic instead.
 *
 * @param {string} oldTopic The old name for the topic. Passing an empty string
 *     does nothing.
 * @param {string} newTopic The new name for the topic. Passing an empty string
 *     does nothing.
 */
spfPubsub.rename = function (oldTopic, newTopic) {
  if (oldTopic && newTopic && oldTopic in spfPubsub.subscriptions) {
    var existing = spfPubsub.subscriptions[newTopic] || [];
    spfPubsub.subscriptions[newTopic] = existing.concat(spfPubsub.subscriptions[oldTopic]);
    spfPubsub.clear(oldTopic);
  }
};

/**
 * Clears the subscription list for a topic.
 *
 * @param {string} topic Topic to clear.
 */
spfPubsub.clear = function (topic) {
  delete spfPubsub.subscriptions[topic];
};

/**
 * Map of subscriptions.
 * @type {!Object.<Array>}
 */
spfPubsub.subscriptions = {};

// Automatic initialization for spfPubsub.subscriptions.
// When built for the bootloader, unconditionally set in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.PUBSUB_SUBS, spfPubsub.subscriptions);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.PUBSUB_SUBS)) {
    __WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.PUBSUB_SUBS, spfPubsub.subscriptions);
  }
  spfPubsub.subscriptions = /** @type {!Object.<Array>} */__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_2__state__["a" /* default */].Key.PUBSUB_SUBS);
}

/* harmony default export */ __webpack_exports__["a"] = (spfPubsub);

/***/ }),
/* 42 */,
/* 43 */
/* no static exports found */
/*!****************************************************!*\
  !*** ./app/javascript/packs/common/ActionCable.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      'message_types': {
        'welcome': 'welcome',
        'ping': 'ping',
        'confirmation': 'confirm_subscription',
        'rejection': 'reject_subscription'
      },
      'default_mount_path': '/cable',
      'protocols': ['actioncable-v1-json', 'actioncable-unsupported']
    },
    createConsumer: function createConsumer(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig('url')) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function getConfig(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute('content') : void 0;
    },
    createWebSocketURL: function createWebSocketURL(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement('a');
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace('http', 'ws');
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function startDebugging() {
      return this.debugging = true;
    },
    stopDebugging: function stopDebugging() {
      return this.debugging = null;
    },
    log: function log() {
      var messages;
      messages = arguments.length >= 1 ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ['[ActionCable]'].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== 'undefined' && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== 'undefined' && module !== null) {
    module.exports = this.ActionCable;
  }
}).call(window);
(function () {
  var bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  ActionCable.ConnectionMonitor = function () {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function () {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener('visibilitychange', this.visibilityDidChange);
        return ActionCable.log('ConnectionMonitor started. pollInterval = ' + this.getPollInterval() + ' ms');
      }
    };

    ConnectionMonitor.prototype.stop = function () {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener('visibilitychange', this.visibilityDidChange);
        return ActionCable.log('ConnectionMonitor stopped');
      }
    };

    ConnectionMonitor.prototype.isRunning = function () {
      return this.startedAt != null && this.stoppedAt == null;
    };

    ConnectionMonitor.prototype.recordPing = function () {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function () {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log('ConnectionMonitor recorded connect');
    };

    ConnectionMonitor.prototype.recordDisconnect = function () {
      this.disconnectedAt = now();
      return ActionCable.log('ConnectionMonitor recorded disconnect');
    };

    ConnectionMonitor.prototype.startPolling = function () {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function () {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function () {
      return this.pollTimeout = setTimeout(function (_this) {
        return function () {
          _this.reconnectIfStale();
          return _this.poll();
        };
      }(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function () {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function () {
      if (this.connectionIsStale()) {
        ActionCable.log('ConnectionMonitor detected stale connection. reconnectAttempts = ' + this.reconnectAttempts + ', pollInterval = ' + this.getPollInterval() + ' ms, time disconnected = ' + secondsSince(this.disconnectedAt) + ' s, stale threshold = ' + this.constructor.staleThreshold + ' s');
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log('ConnectionMonitor skipping reopening recent disconnect');
        } else {
          ActionCable.log('ConnectionMonitor reopening');
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function () {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function () {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function () {
      if (document.visibilityState === 'visible') {
        return setTimeout(function (_this) {
          return function () {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log('ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = ' + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        }(this), 200);
      }
    };

    now = function now() {
      return new Date().getTime();
    };

    secondsSince = function secondsSince(time) {
      return (now() - time) / 1000;
    };

    clamp = function clamp(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;
  }();
}).call(window);
(function () {
  var i,
      message_types,
      protocols,
      ref,
      supportedProtocols,
      unsupportedProtocol,
      slice = [].slice,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = protocols.length >= 2 ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = function () {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function (data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function () {
      if (this.isActive()) {
        ActionCable.log('Attempted to open WebSocket, but existing socket is ' + this.getState());
        throw new Error('Existing connection must be closed before opening');
      } else {
        ActionCable.log('Opening WebSocket, current state is ' + this.getState() + ', subprotocols: ' + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function (arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function () {
      var error, error1;
      ActionCable.log('Reopening WebSocket, current state is ' + this.getState());
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log('Failed to reopen WebSocket', error);
        } finally {
          ActionCable.log('Reopening WebSocket in ' + this.constructor.reopenDelay + 'ms');
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function () {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function () {
      return this.isState('open');
    };

    Connection.prototype.isActive = function () {
      return this.isState('open', 'connecting');
    };

    Connection.prototype.isProtocolSupported = function () {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function () {
      var ref1, states;
      states = arguments.length >= 1 ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function () {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function () {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket['on' + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function () {
      var eventName;
      for (eventName in this.events) {
        this.webSocket['on' + eventName] = function () {};
      }
    };

    Connection.prototype.events = {
      message: function message(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, 'connected');
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, 'received', message);
        }
      },
      open: function open() {
        ActionCable.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log('Protocol is unsupported. Stopping monitor and disconnecting.');
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function close(event) {
        ActionCable.log('WebSocket onclose event');
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll('disconnected', {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function error() {
        return ActionCable.log('WebSocket onerror event');
      }
    };

    return Connection;
  }();
}).call(window);
(function () {
  var slice = [].slice;

  ActionCable.Subscriptions = function () {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function (channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = (typeof channel === 'undefined' ? 'undefined' : _typeof(channel)) === 'object' ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function (subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, 'initialized');
      this.sendCommand(subscription, 'subscribe');
      return subscription;
    };

    Subscriptions.prototype.remove = function (subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, 'unsubscribe');
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function (identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, 'rejected');
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function (subscription) {
      var s;
      this.subscriptions = function () {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }.call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function (identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function () {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, 'subscribe'));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function () {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = arguments.length >= 2 ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function () {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = arguments.length >= 3 ? slice.call(arguments, 2) : [];
      if (typeof subscription === 'string') {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === 'function' ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function (subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;
  }();
}).call(window);
(function () {
  ActionCable.Subscription = function () {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function (action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function (data) {
      return this.consumer.send({
        command: 'message',
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function () {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function extend(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;
  }();
}).call(window);
(function () {
  ActionCable.Consumer = function () {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function (data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function () {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function () {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function () {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;
  }();
}).call(window);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../../~/webpack/buildin/module.js */ 85)(module)))

/***/ }),
/* 44 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************!*\
  !*** ./app/javascript/packs/common/loadingBar.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoadingBar = function () {
  function LoadingBar(options) {
    _classCallCheck(this, LoadingBar);

    options = options || {};
    this.height = options.height;
    this.width = options.width;
    this.type = options.type || 'normal';
    this.percent = options.percent || 0;
    this.show = false;
    this.timer = null;
    this.loadingEle = null;
  }

  _createClass(LoadingBar, [{
    key: 'init',
    value: function init(options) {
      var container = document.getElementById('loadingBar-container');
      var bar = document.createElement('div');
      bar.id = 'loadingBar';
      bar.className = 'app-loading-bar';

      var inner = document.createElement('span');
      inner.className = 'app-loading-bar-inner app-loading-bar-inner-color-primary';

      this.loadingEle = inner;
      bar.appendChild(inner);

      container.appendChild(bar);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      if (this.timer) return;
      this.percent = 0;
      this.init();
      this.timer = setInterval(function () {
        _this.percent += Math.floor(Math.random() * 3 + 5);
        if (_this.percent > 95) {
          clearInterval(_this.timer);
        }
        _this.update({
          percent: _this.percent,
          type: 'normal',
          show: true
        });
      }, 200);
    }
  }, {
    key: 'update',
    value: function update(options) {
      this.percent = options.percent;
      this.type = options.type;
      this.show = options.show;
      if (this.type === 'error') this.loadingEle.style.backgroundColor = 'red';
      this.loadingEle.style.width = this.percent + '%';
    }
  }, {
    key: 'finish',
    value: function finish() {
      this.update({
        percent: 100,
        type: 'normal',
        show: true
      });
    }
  }, {
    key: 'error',
    value: function error() {
      this.update({
        percent: 100,
        type: 'error',
        show: true
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      clearInterval(this.timer);
      var loadingBarEle = document.getElementById('loadingBar');
      loadingBarEle.parentElement.removeChild(loadingBarEle);
    }
  }]);

  return LoadingBar;
}();

/* harmony default export */ __webpack_exports__["a"] = (LoadingBar);

/***/ }),
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */
/* exports provided: dataLinks */
/* exports used: dataLinks */
/*!***************************************************!*\
  !*** ./app/javascript/packs/modules/dataLinks.js ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = dataLinks;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_handleMethod__ = __webpack_require__(/*! ../common/handleMethod */ 62);


function dataLinks() {
  document.addEventListener('click', processDataLink, false);
}
function processDataLink(ev) {
  var e = window.e || ev;

  if (e.target.tagName !== 'A') return;

  if (e.target.dataset.method === 'delete') {
    e.preventDefault();
    if (e.target.getAttribute('href') === '/logout') {
      if (A.destroy[A.gc.currentName]) A.destroy[A.gc.currentName].apply(null);
    };
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_handleMethod__["a" /* handleMethod */])(e.target);
  }
  if (e.target.dataset.method === 'PATCH') {
    e.preventDefault();
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_handleMethod__["a" /* handleMethod */])(e.target);
  }
}

/***/ }),
/* 50 */
/* exports provided: processFormSubmit, formSubmit */
/* exports used: formSubmit */
/*!****************************************************!*\
  !*** ./app/javascript/packs/modules/formSubmit.js ***!
  \****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export processFormSubmit */
/* harmony export (immutable) */ __webpack_exports__["a"] = formSubmit;
var hmInstance = void 0;
var fd = void 0,
    fa = void 0;

function processFormSubmit(ev) {
  var e = window.e || ev;
  var tt = e.target;

  if (tt.tagName === 'INPUT' && tt.classList.contains('c-form-submit') && tt.getAttribute('type') === 'submit' && tt.getAttribute('name') === 'commit') {
    e.preventDefault();
    var f = tt.closest('form');
    var _fa = f.action;
    var fm = f.method;
    var _fd = new FormData(f);
    window.A.spf.load(_fa, {
      method: fm,
      postData: _fd,
      onProcess: function onProcess(evt) {
        // exitProcessPostLink();
        if (A.fnpuLoad[A.gc.currentName] && A.fnpuLoad[A.gc.currentName]['process'] && typeof A.fnpuLoad[A.gc.currentName]['process'] === 'function') {
          A.fnpuLoad[A.gc.currentName]['process'].apply(null);
        }
      },
      onDone: function onDone(evt) {
        // processPostLink();
        if (A.fnpuLoad[A.gc.currentName] && A.fnpuLoad[A.gc.currentName]['done'] && typeof A.fnpuLoad[A.gc.currentName]['done'] === 'function') {
          A.fnpuLoad[A.gc.currentName]['done'].apply(null);
        }
        if (evt.response && evt.response.status === 'success' && evt.response.url) window.A.spf.navigate(evt.response.url);
      }
    });
  };
}
function formSubmit() {
  document.addEventListener('click', processFormSubmit, false);
}
function exitProcessPostLink() {
  document.removeEventListener('click', processDataLink, false);
}

/***/ }),
/* 51 */,
/* 52 */
/* exports provided: processDataLink, processPostLink */
/* exports used: processPostLink */
/*!*****************************************************!*\
  !*** ./app/javascript/packs/modules/postHandler.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export processDataLink */
/* harmony export (immutable) */ __webpack_exports__["a"] = processPostLink;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_handleMethod2__ = __webpack_require__(/*! ../common/handleMethod2 */ 9);


var hmInstance = void 0;
var fd = void 0,
    fa = void 0;

function processDataLink(ev) {
  var e = window.e || ev;

  if (e.target.tagName !== 'A') return;

  if (e.target.dataset.method === 'fnpu_delete') {
    e.preventDefault();
    hmInstance = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common_handleMethod2__["a" /* handleMethod */])(e.target, 'delete');
    fa = e.target.getAttribute('href');
    fd = new FormData(hmInstance);
    window.A.spf.load(fa, {
      method: 'POST',
      postData: fd,
      onProcess: function onProcess(evt) {
        // exitProcessPostLink();
        if (A.fnpuLoad[A.gc.currentName] && A.fnpuLoad[A.gc.currentName]['process'] && typeof A.fnpuLoad[A.gc.currentName]['process'] === 'function') {
          A.fnpuLoad[A.gc.currentName]['process'].apply(null);
        }
      },
      onDone: function onDone(evt) {
        // processPostLink();
        if (A.fnpuLoad[A.gc.currentName] && A.fnpuLoad[A.gc.currentName]['done'] && typeof A.fnpuLoad[A.gc.currentName]['done'] === 'function') {
          A.fnpuLoad[A.gc.currentName]['done'].apply(null);
        }
      }
    });
  }
}
function processPostLink() {
  document.addEventListener('click', processDataLink, false);
}
function exitProcessPostLink() {
  document.removeEventListener('click', processDataLink, false);
}

/***/ }),
/* 53 */,
/* 54 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./app/javascript/packs/spf/entry.js ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ./base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(/*! ./main */ 78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(/*! ./config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_cache__ = __webpack_require__(/*! ./cache/cache */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__debug_debug__ = __webpack_require__(/*! ./debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__history_history__ = __webpack_require__(/*! ./history/history */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nav_nav__ = __webpack_require__(/*! ./nav/nav */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__net_style__ = __webpack_require__(/*! ./net/style */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__net_script__ = __webpack_require__(/*! ./net/script */ 21);










var spfEntry = {};
// Create the API by exporting aliased functions.
// Core API functions are available on the top-level namespace.
// Extra API functions are available on second-level namespaces.
/** @private {!Object} */
spfEntry.api_ = {
  'init': __WEBPACK_IMPORTED_MODULE_1__main__["a" /* default */].init,
  'dispose': __WEBPACK_IMPORTED_MODULE_1__main__["a" /* default */].dispose,
  'navigate': __WEBPACK_IMPORTED_MODULE_6__nav_nav__["a" /* default */].navigate,
  'load': __WEBPACK_IMPORTED_MODULE_6__nav_nav__["a" /* default */].load,
  'prefetch': __WEBPACK_IMPORTED_MODULE_6__nav_nav__["a" /* default */].prefetch,
  'process': __WEBPACK_IMPORTED_MODULE_6__nav_nav__["a" /* default */].process
  /** @private {!Object} */
};spfEntry.extra_ = {
  'cache': {
    // Cache API.
    // * Remove one entry.
    'remove': __WEBPACK_IMPORTED_MODULE_3__cache_cache__["a" /* default */].remove,
    // * Clear all entries.
    'clear': __WEBPACK_IMPORTED_MODULE_3__cache_cache__["a" /* default */].clear
  },
  'script': {
    // The bootloader API.
    // * Load scripts.
    'load': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].load,
    'get': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].get,
    // * Wait until ready.
    'ready': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].ready,
    'done': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].done,
    // * Load in depedency order.
    'require': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].require,
    // * Set dependencies and paths.
    'declare': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].declare,
    'path': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].path,
    // Extended script loading API.
    // * Unload scripts.
    'unload': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].unload,
    // * Ignore ready.
    'ignore': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].ignore,
    // * Unload in depedency order.
    'unrequire': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].unrequire,
    // * Prefetch.
    'prefetch': __WEBPACK_IMPORTED_MODULE_8__net_script__["a" /* default */].prefetch
  },
  'style': {
    // Style loading API.
    // * Load styles.
    'load': __WEBPACK_IMPORTED_MODULE_7__net_style__["a" /* default */].load,
    'get': __WEBPACK_IMPORTED_MODULE_7__net_style__["a" /* default */].get,
    // * Unload styles.
    'unload': __WEBPACK_IMPORTED_MODULE_7__net_style__["a" /* default */].unload,
    // * Set paths.
    'path': __WEBPACK_IMPORTED_MODULE_7__net_style__["a" /* default */].path,
    // * Prefetch.
    'prefetch': __WEBPACK_IMPORTED_MODULE_7__net_style__["a" /* default */].prefetch
  }
  // For a production/debug build, isolate access to the API.
  // For a development build, mixin the API to the existing namespace.
};var spfEs = {};

for (var fn1 in spfEntry.api_) {
  spfEs[fn1] = spfEntry.api_[fn1];
}
// Use two-stage exporting to allow aliasing the intermediate namespaces
// created by the bootloader (e.g. s = spf.script; s.load(...)).
for (var ns in spfEntry.extra_) {
  for (var fn2 in spfEntry.extra_[ns]) {
    spfEs[ns] = spfEs[ns] || {};
    spfEs[ns][fn2] = spfEntry.extra_[ns][fn2];
  }
}

/* harmony default export */ __webpack_exports__["a"] = (spfEs);

/***/ }),
/* 55 */
/* no static exports found */
/*!*************************************!*\
  !*** ./app/stylesheet/globalA.scss ***!
  \*************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/* exports provided: handleMethod */
/* exports used: handleMethod */
/*!*****************************************************!*\
  !*** ./app/javascript/packs/common/handleMethod.js ***!
  \*****************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = handleMethod;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_csrf__ = __webpack_require__(/*! ../common/csrf */ 2);

/**
 * [handleMethod description]
 * @param  {HTMLElement} link [description]
 * @return {[type]}      [description]
 * Handles "data-method" on links such as:
 * <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
 */
function handleMethod(link) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var href = link.getAttribute('href'),
      method = link.dataset.method,
      target = link.getAttribute('target'),
      csrfToken = __WEBPACK_IMPORTED_MODULE_0__common_csrf__["a" /* rorParams */].csrfToken(),
      csrfParam = __WEBPACK_IMPORTED_MODULE_0__common_csrf__["a" /* rorParams */].csrfParam();
  var paramsObj = {
    href: href,
    method: method,
    target: target,
    csrfToken: csrfToken,
    csrfParam: csrfParam
  };
  var formEle = createForm(paramsObj, obj);
  appendFormToDom(formEle);
  submitForm(formEle);
}
function createForm(params, obj) {
  var f = document.createElement('form');
  f.style.display = 'none';
  f.setAttribute('method', 'post');
  f.setAttribute('action', params.href);
  if (params.target) {
    f.setAttribute('target', params.target);
  };

  var i = document.createElement('input');
  i.setAttribute('type', 'hidden');
  i.setAttribute('name', '_method');
  i.setAttribute('value', params.method);

  var s;
  if (params.csrfParam !== undefined && params.csrfToken !== undefined && !__WEBPACK_IMPORTED_MODULE_0__common_csrf__["a" /* rorParams */].isCrossDomain(params.href)) {
    s = document.createElement('input');
    s.setAttribute('type', 'hidden');
    s.setAttribute('name', params.csrfParam);
    s.setAttribute('value', params.csrfToken);
  }
  f.appendChild(i);

  // for (let key in obj.data) {
  //   if (obj.data.hasOwnProperty(key)) {
  //     let t = document.createElement('input');
  //     t.setAttribute('type','hidden');
  //     t.setAttribute('name','' + obj.ns + '[' + key + ']');
  //     t.setAttribute('value',obj.data[key]);
  //     f.appendChild(t);
  //   }
  // }

  if (s) {
    f.appendChild(s);
  };
  return f;
}

function appendFormToDom(form) {
  document.body.appendChild(form);
}
function submitForm(form) {
  form.submit();
}

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./app/javascript/packs/entries/globalA.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheet_globalA_scss__ = __webpack_require__(/*! ../../../stylesheet/globalA.scss */ 55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__stylesheet_globalA_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__stylesheet_globalA_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_ActionCable__ = __webpack_require__(/*! ../common/ActionCable */ 43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_ActionCable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__common_ActionCable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__spf_entry__ = __webpack_require__(/*! ../spf/entry */ 54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_dataLinks__ = __webpack_require__(/*! ../modules/dataLinks */ 49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_formSubmit__ = __webpack_require__(/*! ../modules/formSubmit */ 50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_postHandler__ = __webpack_require__(/*! ../modules/postHandler */ 52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__common_loadingBar__ = __webpack_require__(/*! ../common/loadingBar */ 44);












var A = window.A || {};
window.A = A;
A.spf = __WEBPACK_IMPORTED_MODULE_2__spf_entry__["a" /* default */];
var app = window.A.app || {};

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_dataLinks__["a" /* dataLinks */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_formSubmit__["a" /* formSubmit */])();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_postHandler__["a" /* processPostLink */])();

/**
 * Initialize the app.
 */
app.init = function () {
  app.start_ = +new Date();
  if (window.addEventListener) {
    window.addEventListener('spfclick', app.onClick);
    window.addEventListener('spfhistory', app.onHistory);
    window.addEventListener('spfrequest', app.onRequest);
    window.addEventListener('spfpartprocess', app.onPartProcess);
    window.addEventListener('spfpartdone', app.onPartDone);
    window.addEventListener('spfprocess', app.onProcess);
    window.addEventListener('spfdone', app.onDone);
    window.addEventListener('spferror', app.onError);

    window.addEventListener('spfjsbeforeunload', app.onScriptBeforeUnload);
    window.addEventListener('spfjsunload', app.onScriptUnload);
    window.addEventListener('spfcssbeforeunload', app.onStyleBeforeUnload);
    window.addEventListener('spfcssunload', app.onStyleUnload);
  }
  app.enabled = A.spf.init();
};

/**
 * Dispose the demo app.
 */
app.dispose = function () {
  app.start_ = 0;
  app.enabled = false;
  if (window.removeEventListener) {
    window.removeEventListener('spfclick', app.onClick);
    window.removeEventListener('spfhistory', app.onHistory);
    window.removeEventListener('spfrequest', app.onRequest);
    window.removeEventListener('spfpartprocess', app.onPartProcess);
    window.removeEventListener('spfpartdone', app.onPartDone);
    window.removeEventListener('spfprocess', app.onProcess);
    window.removeEventListener('spfdone', app.onDone);
    window.removeEventListener('spferror', app.onError);

    window.removeEventListener('spfjsbeforeunload', app.onScriptBeforeUnload);
    window.removeEventListener('spfjsunload', app.onScriptUnload);
    window.removeEventListener('spfcssbeforeunload', app.onStyleBeforeUnload);
    window.removeEventListener('spfcssunload', app.onStyleUnload);
  }
};

/**
 * Simple central logging function for the demo app.
 * @param {string} msg Message to log.
 */
app.log = function (msg) {
  if (window.console) {
    // window.console.log('[app] ' + msg);
  }
};

/**
 * Event handler for when a navigate click occurs.
 * @param {CustomEvent} evt The event.
 */
app.onClick = function (evt) {
  app.log('globalA--navigate click ' + evt.detail.url);
};

/**
 * Event handler for when a navigate history change occurs.
 * @param {CustomEvent} evt The event.
 */
app.onHistory = function (evt) {
  app.log('globalA--navigate history ' + evt.detail.url);
};

/**
 * Event handler for when navigate requests are going to be sent.
 * @param {CustomEvent} evt The event.
 */
app.onRequest = function (evt) {
  if (!app.ins) {
    app.ins = new __WEBPACK_IMPORTED_MODULE_6__common_loadingBar__["a" /* default */]();
    app.ins.start();
  }
  app.log('globalA--navigate request ' + evt.detail.url);
  // If debug logging is enabled, reset the relative times when each new
  // request is sent.
  if (A.spf.debug) {
    A.spf.debug.reset();
  }
};

/**
 * Event handler for when parts of navigate responses are going to be processed.
 * @param {CustomEvent} evt The event.
 */
app.onPartProcess = function (evt) {
  app.log('globalA--navigate part process ' + evt.detail.url);
};

/**
 * Event handler for when parts of navigate responses are done being processed.
 * @param {CustomEvent} evt The event.
 */
app.onPartDone = function (evt) {
  app.log('globalA--navigate part done ' + evt.detail.url);
};

/**
 * Event handler for when navigate responses are going to be processed.
 * @param {CustomEvent} evt The event.
 */
app.onProcess = function (evt) {
  if (A.detach[A.gc.currentName]) A.detach[A.gc.currentName].apply(null);
  if (A.destroy[A.gc.currentName]) A.destroy[A.gc.currentName].apply(null);
  app.destroy(A.gc.currentName);
  A.gc.currentName = evt.detail.response.name;
  app.log('globalA--navigate process ' + evt.detail.url);
};

/**
 * Event handler for when navigate responses are done being processed.
 * @param {CustomEvent} evt The event.
 */
app.onDone = function (evt) {
  if (app.ins) {
    app.ins.finish();
    setTimeout(function () {
      app.ins.destroy();app.ins = null;
    }, 100);
  }
  if (A.init[A.gc.currentName]) A.init[A.gc.currentName].apply(null);
};

/**
 * Event handler for navigate errors.
 * @param {CustomEvent} evt The event.
 */
app.onError = function (evt) {
  if (app.ins) {
    app.ins.error();
    setTimeout(function () {
      app.ins.destroy();app.ins = null;
    }, 1000);
  }
  app.log('globalA--navigate error ' + evt.detail.url);
};

/**
 * Event handler for script before unload.
 * @param {CustomEvent} evt The event.
 */
app.onScriptBeforeUnload = function (evt) {
  var name = evt.detail.name;
  app.log('globalA--script before unload ' + name);
};

/**
 * Event handler for script unload.
 * @param {CustomEvent} evt The event.
 */
app.onScriptUnload = function (evt) {
  var name = evt.detail.name;
  var urls = evt.detail.urls;
  app.log('globalA--script unload ' + name + ' ' + urls);
};

/**
 * Event handler for style before unload.
 * @param {CustomEvent} evt The event.
 */
app.onStyleBeforeUnload = function (evt) {
  var name = evt.detail.name;
  app.log('globalA--style before unload ' + name);
};

/**
 * Event handler for style unload.
 * @param {CustomEvent} evt The event.
 */
app.onStyleUnload = function (evt) {
  var name = evt.detail.name;
  var urls = evt.detail.urls;
  app.log('globalA--style unload ' + name + ' ' + urls);
};

/**
 * [destroy entry]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
app.destroy = function (name) {
  A.spf.style.unload(name);
  // A.spf.script.unload(name);
};

/**
 * Whether SPF is enabled for the demo app.
 * @type {boolean}
  */
app.enabled = false;

/**
 * The timestamp of when the demo app started.
 * @type {number}
 * @private
 */
app.start_ = 0;

/**
 * The timer counting since last page load.
 * @type {number}
 * @private
 */
app.timer_ = 0;

A.app = app;

/***/ }),
/* 75 */,
/* 76 */,
/* 77 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/async/async.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(/*! ../state */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__string_string__ = __webpack_require__(/*! ../string/string */ 7);
/**
 * @fileoverview Fast asynchronous function execution.
 *
 * This package provides functions to defer execution on the main thread
 * without using setTimeout, though setTimeout is used as a fallback in browsers
 * that do not support other methods.  Using these methods is advantageous when
 * one wants to schedule a callback faster than the setTimeout clamped minimum
 * allows (e.g. when doing `setTimeout(fn, 0)`)  The clamped minimum for
 * setTimeout is often 10ms, though when WebKit browsers are in a background
 * tab, setTimeout calls deprioritized to execute with a 1s delay.  In these
 * cases, this package provides an alternative.
 *
 */





// goog.provide('spfAsync');

var spfAsync = {};

/**
 * Defers execution of a function to the next slot on the main thread.
 *
 * @param {!Function} fn The function to defer.
 */
spfAsync.defer = function (fn) {
  var uid = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].uid();
  spfAsync.defers_[uid] = fn;
  if (spfAsync.POSTMESSAGE_SUPPORTED_) {
    window.postMessage(spfAsync.PREFIX_ + uid, '*');
  } else {
    window.setTimeout(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfAsync.run_, null, uid), 0);
  }
};

/**
 * Handles a message event and triggers execution function.
 *
 * @param {Event} evt The click event.
 * @private
 */
spfAsync.handleMessage_ = function (evt) {
  if (evt.data && __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].isString(evt.data) && __WEBPACK_IMPORTED_MODULE_2__string_string__["a" /* default */].startsWith(evt.data, spfAsync.PREFIX_)) {
    var uid = evt.data.substring(spfAsync.PREFIX_.length);
    spfAsync.run_(uid);
  }
};

/**
 * Executes a previously deferred function.
 *
 * @param {string|number} uid The UID associated with the function.
 * @private
 */
spfAsync.run_ = function (uid) {
  var fn = spfAsync.defers_[uid];
  if (fn) {
    delete spfAsync.defers_[uid];
    fn();
  }
};

/**
 * Adds a function as a listener for message events.
 *
 * @param {!Function} fn The function to add as a listener.
 * @private
 */
spfAsync.addListener_ = function (fn) {
  if (window.addEventListener) {
    window.addEventListener('message', fn, false);
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', fn);
  }
};

/**
 * Removes a function as a listener for message events.
 *
 * @param {!Function} fn The function to remove as a listener.
 * @private
 */
spfAsync.removeListener_ = function (fn) {
  if (window.removeEventListener) {
    window.removeEventListener('message', fn, false);
  } else if (window.detachEvent) {
    window.detachEvent('onmessage', fn);
  }
};

/**
 * Whether the browser supports asynchronous postMessage calls.
 *
 * @private {boolean}
 */
spfAsync.POSTMESSAGE_SUPPORTED_ = function () {
  if (!window.postMessage) {
    return false;
  }
  // Use postMessage where available.  But, ensure that postMessage is
  // asynchronous; the implementation in IE8 is synchronous, which defeats
  // the purpose.  To detect this, use a temporary "onmessage" listener.
  var supported = true;
  var listener = function listener() {
    supported = false;
  };
  // Add the listener, dispatch a message event, and remove the listener.
  spfAsync.addListener_(listener);
  window.postMessage('', '*');
  spfAsync.removeListener_(listener);
  // Return the status.  If the postMessage implementation is correctly
  // asynchronous, then the value of the `supported` variable will be
  // true, but if the postMessage implementation is synchronous, the
  // temporary listener will have executed and set the `supported`
  // variable to false.
  return supported;
}();

/**
 * The prefix to use for message event data to avoid conflicts.
 *
 * @private {string}
 */
spfAsync.PREFIX_ = 'spf:';

/**
 * Map of deferred function calls.
 * @private {!Object.<!Function>}
 */
spfAsync.defers_ = {};

// Automatic initialization for spfAsync.defers_.
// When built for the bootloader, unconditionally set in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_DEFERS, spfAsync.defers_);
} else {
  if (!__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_DEFERS)) {
    __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_DEFERS, spfAsync.defers_);
  }
  spfAsync.defers_ = /** @type {!Object.<!Function>} */__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_DEFERS);
}

// Automatic initialization for spfState.Key.ASYNC_LISTENER.
// When built for the bootloader, unconditionally set in state.
if (__WEBPACK_IMPORTED_MODULE_0__base__["a" /* SPF_BOOTLOADER */]) {
  if (spfAsync.POSTMESSAGE_SUPPORTED_) {
    spfAsync.addListener_(spfAsync.handleMessage_);
    __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_LISTENER, spfAsync.handleMessage_);
  }
} else {
  if (spfAsync.POSTMESSAGE_SUPPORTED_) {
    if (__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].has(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_LISTENER)) {
      spfAsync.removeListener_( /** @type {function(Event)} */__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_LISTENER));
    }
    spfAsync.addListener_(spfAsync.handleMessage_);
    __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */].Key.ASYNC_LISTENER, spfAsync.handleMessage_);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (spfAsync);

/***/ }),
/* 78 */
/* exports provided: default */
/* exports used: default */
/*!******************************************!*\
  !*** ./app/javascript/packs/spf/main.js ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ./base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(/*! ./config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__debug_debug__ = __webpack_require__(/*! ./debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__history_history__ = __webpack_require__(/*! ./history/history */ 12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_nav__ = __webpack_require__(/*! ./nav/nav */ 39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__net_style__ = __webpack_require__(/*! ./net/style */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__net_script__ = __webpack_require__(/*! ./net/script */ 21);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview The primary SPF entry point.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */









var spfMain = {};

/**
 * Initializes SPF.
 *
 * @param {Object=} opt_config Optional global configuration object.
 * @return {boolean} Whether SPF was successfully initialized.  If the HTML5
 *     history modification API is not supported, returns false.
 */
spfMain.init = function (opt_config) {
  var enable = spfMain.canInit_();
  __WEBPACK_IMPORTED_MODULE_2__debug_debug__["a" /* default */].info('main.init ', 'enable=', enable);
  __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].init(opt_config);
  if (enable) {
    __WEBPACK_IMPORTED_MODULE_4__nav_nav__["a" /* default */].init();
  }
  // Signal that the API is ready with custom event.  Only supported in IE 9+.
  __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].dispatch(__WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].EventName.READY);

  return enable;
};

/**
 * Checks to see if SPF can be initialized.
 *
 * @return {boolean}
 * @private
 */
spfMain.canInit_ = function () {
  return !!(typeof window.history.pushState === 'function' || __WEBPACK_IMPORTED_MODULE_3__history_history__["a" /* default */].getIframe().contentWindow.history.pushState);
};

/**
 * Disposes SPF.
 */
spfMain.dispose = function () {
  var enable = !!(typeof History !== 'undefined' && History.prototype.pushState);
  if (enable) {
    __WEBPACK_IMPORTED_MODULE_4__nav_nav__["a" /* default */].dispose();
  }
  __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].clear();
};

/**
 * Discovers existing script and style elements in the document and registers
 * them as loaded, once during initial code execution and again when the
 * document is ready to catch any resources in the page after SPF is included.
 * @private
 */
spfMain.discover_ = function () {
  __WEBPACK_IMPORTED_MODULE_6__net_script__["a" /* default */].discover();
  __WEBPACK_IMPORTED_MODULE_5__net_style__["a" /* default */].discover();
  if (document.readyState == 'complete') {
    // Since IE 8+ is supported for common library functions such as script
    // and style loading, use both standard and legacy event handlers to
    // discover existing resources.
    if (document.removeEventListener) {
      document.removeEventListener('DOMContentLoaded', spfMain.discover_, false);
    } else if (document.detachEvent) {
      document.detachEvent('onreadystatechange', spfMain.discover_);
    }
  }
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', spfMain.discover_, false);
} else if (document.attachEvent) {
  document.attachEvent('onreadystatechange', spfMain.discover_);
}
spfMain.discover_();

/* harmony default export */ __webpack_exports__["a"] = (spfMain);

/***/ }),
/* 79 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/nav/request.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__async_async__ = __webpack_require__(/*! ../async/async */ 77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cache_cache__ = __webpack_require__(/*! ../cache/cache */ 18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(/*! ../config */ 6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__debug_debug__ = __webpack_require__(/*! ../debug/debug */ 8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nav_response__ = __webpack_require__(/*! ../nav/response */ 40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__net_xhr__ = __webpack_require__(/*! ../net/xhr */ 81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__string_string__ = __webpack_require__(/*! ../string/string */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__url_url__ = __webpack_require__(/*! ../url/url */ 13);
// Copyright 2013 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Navigation-related request functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */












var spfNavRequest = {};
// goog.provide('spfNavRequest');

/**
 * Type definition for the configuration options for an SPF request.
 * - method: optional method with which to send the request; defaults to "GET".
 * - headers: optional map of headers to send with the request.
 * - onPart: optional callback to execute with the parts of a multipart
 *       response.  The first argumet is the requested URL; the second argument
 *       is the partial response object.  If valid
 *       "X-SPF-Response-Type: multipart" and "Transfer-Encoding: chunked"
 *       headers are sent, then this callback be executed on-the-fly as chunks
 *       are received.
 * - onError: optional callback to execute if the request fails. The first
 *       argument is the requested URL; the second argument is the Error that
 *       occurred. If the type of request is "navigate", the second argument
 *       might be false if the request was canceled in response to the global
 *       "navigate-received" callback. The third argument is the XMLHttpRequest
 *       object for error
 * - onSuccess: optional callback to execute if the request succeeds.  The first
 *       argument is the requested URL; the second is the response object.  The
 *       response object will be either a complete single response object or
 *       a complete multipart response object.
 * - postData: optional data to send with the request.  Only used if the method
 *       is set to "POST".
 * - current: optional current page URL, without the SPF identifier.
 * - referer: optional referrer URL, without the SPF identifier.
 * - type: optional type of request (e.g. "navigate", "load", etc), used to
 *       alter the URL identifier and XHR header and used to determine whether
 *       the global "navigation received" callback is executed; defaults to
 *       "request".
 * - withCredentials: optional flag to send credentials if true.
 *
 * @typedef {{
 *   method: (string|undefined),
 *   headers: (Object.<string>|undefined),
 *   onPart: (function(string, spfBase.SingleResponse)|undefined),
 *   onError: (function(string,
 *                   (Error|boolean),
 *                   (XMLHttpRequest|null|undefined))|undefined),
 *   onSuccess: (function(string,
 *                   (spfBase.SingleResponse|spfBase.MultipartResponse))|undefined),
 *   postData: spfNetXhr.PostData,
 *   current: (string|null|undefined),
 *   referer: (string|null|undefined),
 *   type: (string|undefined),
 *   withCredentials: (boolean|undefined)
 * }}
 */
spfNavRequest.Options;

/**
 * Requests a URL using the SPF protocol and parses the response.  If
 * successful, the URL and response object are passed to the optional
 * `onSuccess` callback.  If not, the URL is passed to the optional
 * `onError` callback.  If chunked response are being used, the
 * URL and each partial response object will be passed to the optional
 * `onPart` callback as they are received.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNavRequest.Options=} opt_options Configuration options.
 * @return {XMLHttpRequest} The XHR of the current request.
 */
spfNavRequest.send = function (url, opt_options) {
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.send ', url, opt_options);
  var options = opt_options || /** @type {spfNavRequest.Options} */{};
  options.method = ((options.method || 'GET') + '').toUpperCase();
  options.type = options.type || 'request';
  // Add the SPF identifier, to be used for sending the request.
  var requestUrl = __WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].absolute(__WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].identify(url, options.type));
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    request url ', requestUrl);
  // Record a the time before sending the request or loading from cache.
  // The startTime is consistent with W3C PerformanceResourceTiming for XHRs.
  var timing = {};
  // Keep actual absolute SPF request url info.
  timing['spfUrl'] = requestUrl;
  timing['startTime'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
  // Try to find a cached response for the request before sending a new XHR.
  // Record fetchStart time before loading from cache. If no cached response
  // is found, this value will be replaced with the one provided by the XHR.
  timing['fetchStart'] = timing['startTime'];
  var cacheKey = spfNavRequest.getCacheKey_(url, options.current, null, options.type, false);
  // Use the absolute URL without identifier to allow cached responses
  // from prefetching to apply to navigation.
  var cached = spfNavRequest.getCacheObject_(cacheKey, options.current);
  timing['spfPrefetched'] = !!cached && cached.type == 'prefetch';
  timing['spfCached'] = !!cached;
  if (cached) {
    var response = /** @type {spfBase.SingleResponse|spfBase.MultipartResponse} */cached.response;
    // To ensure a similar execution pattern as an XHR, ensure the
    // cache response is returned asynchronously.
    var handleCache = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavRequest.handleResponseFromCache_, null, url, options, timing, cached.key, response);
    // When WebKit browsers are in a background tab, setTimeout calls are
    // deprioritized to execute with a 1s delay.  Avoid this by using
    // postMessage to schedule execution; see spfAsync.delay for details.
    __WEBPACK_IMPORTED_MODULE_2__async_async__["a" /* default */].defer(handleCache);
    // Return null because no XHR is made.
    return null;
  } else {
    __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    sending XHR');
    var headers = {};
    // Set headers provided by global config first.
    var configHeaders = /** @type {Object.<string>} */__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('request-headers');
    if (configHeaders) {
      for (var key in configHeaders) {
        var value = configHeaders[key];
        // Treat undefined and null values as equivalent to an empty string.
        // Note that undefined == null.
        headers[key] = value == null ? '' : value;
      }
    }
    // Set headers provided by options second, to allow overrides.
    if (options.headers) {
      for (var key in options.headers) {
        var value = options.headers[key];
        // Treat undefined and null values as equivalent to an empty string.
        // Note that undefined == null.
        headers[key] = value == null ? '' : value;
      }
    }
    // Allow empty referrer values in history.
    // Note that undefined == null.
    if (options.referer != null) {
      headers['X-SPF-Referer'] = options.referer;
    }
    if (options.current != null) {
      headers['X-SPF-Previous'] = options.current;
    }
    // As an advanced option, allow request identification via a header.  This
    // will allow removal of the default identification via URL:
    //     GET /path
    //     Accept: application/json
    //     X-SPF-Request: navigate
    // instead of:
    //     GET /path?spf=navigate
    // But, it comes with 2 extra restrictions:
    // (1) The server MUST return a `Vary` header on some value that is
    // different between SPF requests and default browser requests to avoid
    // caching problems.  The best way to manage this is usually via the
    // `Accept` header.  Since JSON is used for transport of SPF responses,
    // a request that sends a value of `application/json` will work and will
    // be different than standard requests.  A list of defaults used by
    // various browser can be found at
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation.
    // For the quest shown above, the response should then include:
    //      Vary: Accept
    // (2) The server MUST use SPF-based redirection, as custom headers (i.e.
    // the `X-SPF-Request` header) are typically not propgated by browsers
    // during 30X HTTP redirection.
    var headerId = /** @type {?string} */__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('advanced-header-identifier');
    if (headerId) {
      headers['X-SPF-Request'] = headerId.replace('__type__', options.type);
      headers['Accept'] = 'application/json';
    }
    var chunking = new spfNavRequest.Chunking_();
    var handleHeaders = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavRequest.handleHeadersFromXHR_, null, url, chunking);
    var handleChunk = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavRequest.handleChunkFromXHR_, null, url, options, timing, chunking);
    var handleComplete = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].bind(spfNavRequest.handleCompleteFromXHR_, null, url, options, timing, chunking);
    var xhrOpts = {
      headers: headers,
      timeoutMs: /** @type {number} */__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('request-timeout'),
      onHeaders: handleHeaders,
      onChunk: handleChunk,
      onDone: handleComplete,
      onTimeout: handleComplete
    };

    if (options.withCredentials) {
      xhrOpts.withCredentials = options.withCredentials;
    }

    // As an advanced option, allow XHR requests to enforce JSON responses.
    // This can make response parsing more efficient by reducing contention on
    // the main thread (especially for very large responses), but as a
    // side-effect, it removes the ability to parse chunked multipart responses
    // on-the-fly.
    if (__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('advanced-response-type-json')) {
      xhrOpts.responseType = 'json';
    }
    var xhr;
    if (options.method == 'POST') {
      xhr = __WEBPACK_IMPORTED_MODULE_7__net_xhr__["a" /* default */].post(requestUrl, options.postData, xhrOpts);
    } else {
      xhr = __WEBPACK_IMPORTED_MODULE_7__net_xhr__["a" /* default */].get(requestUrl, xhrOpts);
    }
    // Return the XHR being made.
    return xhr;
  }
};

/**
 * Handles a cached response.
 * See {@link #send}.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNavRequest.Options} options Configuration options
 * @param {Object} timing Timing data.
 * @param {string} cacheKey The cache key.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The cached SPF
 *     response object.
 * @private
 */
spfNavRequest.handleResponseFromCache_ = function (url, options, timing, cacheKey, response) {
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.handleResponseFromCache_ ', url, response);
  var updateCache = false;
  // Record the timing information.
  // Record responseStart and responseEnd times after loading from cache.
  timing['responseStart'] = timing['responseEnd'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
  // Also record navigationStart for navigate requests, consistent with
  // W3C PerformanceTiming for page loads.
  if (options.type && __WEBPACK_IMPORTED_MODULE_8__string_string__["a" /* default */].startsWith(options.type, 'navigate')) {
    timing['navigationStart'] = timing['startTime'];
    // If this cached response was a navigate and a unified cache is not being
    // used, then it was from prefetch-based caching and is only eligible to
    // be used once.
    if (!__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('cache-unified')) {
      __WEBPACK_IMPORTED_MODULE_3__cache_cache__["a" /* default */].remove(cacheKey);
      // Ensure the response will be stored in the history-based caching.
      updateCache = true;
    }
  }
  if (options.onPart && response['type'] == 'multipart') {
    var parts = response['parts'];
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(parts, function (part) {
      if (!part['timing']) {
        part['timing'] = {};
      }
      part['timing']['spfCached'] = !!timing['spfCached'];
      part['timing']['spfPrefetched'] = !!timing['spfPrefetched'];
      options.onPart(url, part);
    });
  }
  spfNavRequest.done_(url, options, timing, response, updateCache);
};

/**
 * Handles received headers from an XHR.
 * See {@link #send}.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNavRequest.Chunking_} chunking Chunking data.
 * @param {XMLHttpRequest} xhr The XHR of the current request.
 * @private
 */
spfNavRequest.handleHeadersFromXHR_ = function (url, chunking, xhr) {
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.handleHeadersFromXHR_ ', url, xhr);
  var responseType = xhr.getResponseHeader('X-SPF-Response-Type') || '';
  var multipart = __WEBPACK_IMPORTED_MODULE_8__string_string__["a" /* default */].contains(responseType.toLowerCase(), 'multipart');
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    response is', (multipart ? '' : 'non-') + 'multipart');
  chunking.multipart = multipart;
};

/**
 * Handles a request chunk from an XHR as it arrives.
 * See {@link #send}.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNavRequest.Options} options Configuration options
 * @param {Object} timing Timing data.
 * @param {spfNavRequest.Chunking_} chunking Chunking data.
 * @param {XMLHttpRequest} xhr The XHR of the current request.
 * @param {string} chunk The current request chunk.
 * @param {boolean=} opt_lastDitch Whether to parse the chunk as the final
 *     one, potentially handling malformed but valid responses.
 * @private
 */
spfNavRequest.handleChunkFromXHR_ = function (url, options, timing, chunking, xhr, chunk, opt_lastDitch) {
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.handleChunkFromXHR_ ', url, { 'extra': chunking.extra, 'chunk': chunk });
  // Processing chunks as they arrive requires multipart responses.
  if (!chunking.multipart) {
    __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    skipping non-multipart response');
    return;
  }
  var text = chunking.extra + chunk;
  var parsed;
  try {
    parsed = __WEBPACK_IMPORTED_MODULE_6__nav_response__["a" /* default */].parse(text, true, opt_lastDitch);
  } catch (err) {
    __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    JSON parse failed', text);
    xhr.abort();
    if (options.onError) {
      options.onError(url, err, xhr);
    }
    return;
  }
  if (options.onPart) {
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(parsed.parts, function (part) {
      __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    parsed part', part);
      if (!part['timing']) {
        part['timing'] = {};
      }
      part['timing']['spfCached'] = !!timing['spfCached'];
      part['timing']['spfPrefetched'] = !!timing['spfPrefetched'];
      options.onPart(url, part);
    });
  }
  chunking.complete = chunking.complete.concat(parsed.parts);
  chunking.extra = parsed.extra;
};

/**
 * Handles a request from an XHR.  Called for both chunked and regular requests.
 * See {@link #send}.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNavRequest.Options} options Configuration options
 * @param {Object} timing Timing data.
 * @param {spfNavRequest.Chunking_} chunking Chunking data.
 * @param {XMLHttpRequest} xhr The XHR of the current request.
 * @private
 */
spfNavRequest.handleCompleteFromXHR_ = function (url, options, timing, chunking, xhr) {
  if (xhr.responseType == 'json') {
    __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.handleCompleteFromXHR_ ', url, xhr.response);
  } else {
    __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.handleCompleteFromXHR_ ', url, { 'extra': chunking.extra, 'complete': xhr.responseText });
  }

  // Record the timing information from the XHR.
  if (xhr['timing']) {
    for (var t in xhr['timing']) {
      timing[t] = xhr['timing'][t];
    }
  }

  // Record timings from Resource Timing API.
  if (xhr['resourceTiming']) {
    if (options.type == 'load') {
      // Record relative timings.
      for (var key in xhr['resourceTiming']) {
        timing[key] = xhr['resourceTiming'][key];
      }
    } else if (window.performance && window.performance.timing) {
      // Normalize relative Resource Timing values as
      // Navigation Timing absolute values using navigationStart as base.
      var navigationStart = window.performance.timing.navigationStart;

      // Use resource timing data (RT) only if RT.startTime is later than
      // the one provided by SPF when request was initiated.
      // This is specifically affecting Chrome 40+. See http://crbug.com/375388
      var startTime = navigationStart + xhr['resourceTiming']['startTime'];
      if (startTime >= timing['startTime']) {
        for (var metric in xhr['resourceTiming']) {
          var value = xhr['resourceTiming'][metric];
          if (value !== undefined && (__WEBPACK_IMPORTED_MODULE_8__string_string__["a" /* default */].endsWith(metric, 'Start') || __WEBPACK_IMPORTED_MODULE_8__string_string__["a" /* default */].endsWith(metric, 'End') || metric == 'startTime')) {
            timing[metric] = navigationStart + Math.round(value);
          }
        }
      }
    }
  }

  // Also record navigationStart for all requests but load type, consistent with
  // W3C PerformanceTiming for page loads.
  if (options.type != 'load') {
    timing['navigationStart'] = timing['startTime'];
  }

  if (chunking.complete.length) {
    // If a multipart response was parsed on-the-fly via chunking, it should be
    // done.  However, check to see if there is any extra content, which could
    // occur if the server failed to end a reponse with a token.
    chunking.extra = __WEBPACK_IMPORTED_MODULE_8__string_string__["a" /* default */].trim(chunking.extra);
    if (chunking.extra) {
      // If extra content exists, parse it as a last-ditch effort.
      spfNavRequest.handleChunkFromXHR_(url, options, timing, chunking, xhr, '', true);
    }
  }

  var parts;
  if (xhr.responseType == 'json') {
    // If using the JSON `responseType`, parsing is complete and no chunking
    // has been handled on-the-fly.
    if (!xhr.response) {
      __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    JSON parse failed');
      if (options.onError) {
        options.onError(url, new Error('JSON response parsing failed'), xhr);
      }
      return;
    }
    parts = __WEBPACK_IMPORTED_MODULE_6__nav_response__["a" /* default */].extract(__WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].toArray(xhr.response));
  } else {
    // Otherwise, parsing may need to be done.  Always attempt a full parse with
    // error handling. A multipart response parsed on-the-fly via chunking may
    // be invalid JSON if the response is truncated early.  (If truncated just
    // after a token, the chunking.extra value will be empty and no additional
    // chunk parsing will be done, but the overall response will stil be
    // invalid.)
    try {
      var parsed = __WEBPACK_IMPORTED_MODULE_6__nav_response__["a" /* default */].parse(xhr.responseText);
      parts = parsed.parts;
    } catch (err) {
      __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    JSON parse failed');
      if (options.onError) {
        options.onError(url, err, xhr);
      }
      return;
    }
  }

  if (options.onPart && parts.length > 1) {
    // Only execute callbacks for parts that have not already been processed.
    // In case there is an edge case where some parts were parsed on-the-fly
    // but the entire response needed a full parse here, start iteration where
    // the chunk processing left off.  This is mostly a safety measure and
    // the number of chunks processed here should be 0.
    for (var i = chunking.complete.length; i < parts.length; i++) {
      __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('    parsed part', parts[i]);
      var part = parts[i];
      if (!part['timing']) {
        part['timing'] = {};
      }
      part['timing']['spfCached'] = !!timing['spfCached'];
      part['timing']['spfPrefetched'] = !!timing['spfPrefetched'];
      options.onPart(url, part);
    }
  }
  var response;
  if (parts.length > 1) {
    var cacheType;
    __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].each(parts, function (part) {
      if (part['cacheType']) {
        cacheType = part['cacheType'];
      }
    });
    response = /** @type {spfBase.MultipartResponse} */{
      'parts': parts,
      'type': 'multipart'
    };
    if (cacheType) {
      response['cacheType'] = cacheType;
    }
  } else if (parts.length == 1) {
    response = /** @type {spfBase.SingleResponse} */parts[0];
  } else {
    response = /** @type {spfBase.SingleResponse} */{};
  }
  spfNavRequest.done_(url, options, timing, response, true);
};

/**
 * Finishes a request.
 * See {@link #send}.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNavRequest.Options} options Configuration options.
 * @param {Object} timing Timing data.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The received SPF
 *   response object.
 * @param {boolean} cache Whether to store the response in the cache.
 * @private
 */
spfNavRequest.done_ = function (url, options, timing, response, cache) {
  __WEBPACK_IMPORTED_MODULE_5__debug_debug__["a" /* default */].debug('nav.request.done_', url, options, timing, response, cache);
  if (cache && options.method != 'POST') {
    // Cache the response for future requests.
    var cacheKey = spfNavRequest.getCacheKey_(url, options.current, response['cacheType'], options.type, true);
    if (cacheKey) {
      response['cacheKey'] = cacheKey;
      spfNavRequest.setCacheObject_(cacheKey, response, options.type || '');
    }
  }
  // Set the timing for the response (avoid caching stale timing values).
  response['timing'] = timing;
  if (options.onSuccess) {
    options.onSuccess(url, response);
  }
};

/**
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {string|null|undefined} opt_current The current page's URL. Some
 *     responses are only cacheable for limited origin URLs.
 * @param {string|null|undefined} opt_cacheType The type of cache used for
 *     this request (e.g. "global", "path", "url").
 * @param {string=} opt_requestType Type of request (e.g. "navigate", "load",
 *     etc).
 * @param {boolean=} opt_set Whether getting or setting the cache.
 * @return {string} The cache key for the URL.
 * @private
 */
spfNavRequest.getCacheKey_ = function (url, opt_current, opt_cacheType, opt_requestType, opt_set) {
  // Use the absolute URL without identifier to ensure consistent caching.
  var absoluteUrl = __WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].absolute(url);
  var cacheKey;
  if (__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('cache-unified')) {
    // If using a unified cache, the key is just the URL to allow cached
    // responses from prefetching to apply to navigation, etc.  This also
    // means that load requests are cached unless they are sent via POST.
    cacheKey = absoluteUrl;
  } else {
    // Otherwise, caching is split between history and prefetching by using
    // a key prefix.  Regular non-history navigation is only eligible for
    // prefetch-based caching.
    if (opt_requestType == 'navigate-back' || opt_requestType == 'navigate-forward') {
      // For back/forward, get and set to history cache.
      cacheKey = 'history ' + absoluteUrl;
    } else if (opt_requestType == 'navigate') {
      // For navigation, get from prefetch cache, but set to history cache.
      cacheKey = (opt_set ? 'history ' : 'prefetch ') + absoluteUrl;
    } else if (opt_requestType == 'prefetch') {
      // For prefetching, never get, only set to prefetch cache.
      cacheKey = opt_set ? 'prefetch ' + absoluteUrl : '';
    }
  }

  if (opt_current && opt_cacheType == 'url') {
    cacheKey += ' previous ' + opt_current;
  } else if (opt_current && opt_cacheType == 'path') {
    cacheKey += ' previous ' + __WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].path(opt_current);
  }

  return cacheKey || '';
};

/**
 * Get an object from cache if available.
 *
 * @param {string} cacheKey The base cache key for the requested URL.
 * @param {string|null|undefined} opt_current The current page's URL. Some
 *     responses are only cacheable for limited origin URLs.
 * @return {Object.<string, *>} The response object if found in the cache.
 * @private
 */
spfNavRequest.getCacheObject_ = function (cacheKey, opt_current) {
  var keys = [];
  if (opt_current) {
    keys.push(cacheKey + ' previous ' + opt_current);
    keys.push(cacheKey + ' previous ' + __WEBPACK_IMPORTED_MODULE_9__url_url__["a" /* default */].path(opt_current));
  }
  keys.push(cacheKey);

  var cacheValue = null;

  // Find the first cached object and break loop early when found.
  __WEBPACK_IMPORTED_MODULE_1__array_array__["a" /* default */].some(keys, function (key) {
    var obj = __WEBPACK_IMPORTED_MODULE_3__cache_cache__["a" /* default */].get(key);
    if (obj) {
      cacheValue = {
        key: key,
        response: obj['response'],
        type: obj['type']
      };
    }
    return !!obj;
  });

  return cacheValue;
};

/**
 * Set a response object into cache with the given key.
 *
 * @param {string} cacheKey The base cache key for the requested URL.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The received SPF
 *     response object.
 * @param {string} type The type of request this cache entry was set with.
 * @private
 */
spfNavRequest.setCacheObject_ = function (cacheKey, response, type) {
  var cacheValue = {
    'response': response,
    'type': type
  };
  __WEBPACK_IMPORTED_MODULE_3__cache_cache__["a" /* default */].set(cacheKey, cacheValue, /** @type {number} */__WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].get('cache-lifetime'));
};

/**
 * Container for holding data to track chunking for an SPF request.
 *
 * @constructor
 * @struct
 * @private
 */
spfNavRequest.Chunking_ = function () {
  /**
   * Whether the request is multipart.
   * @type {boolean}
   */
  this.multipart = false;
  /**
   * Any extra text from a previous chunk that was not successfully
   * parsed on its own, usually due to an incomplete part split across
   * chunk boundaries; combined with the text of a current chunk to complete.
   * @type {string}
   */
  this.extra = '';
  /**
   * Complete parts that have been successfully parsed.
   * @type {!Array}
   */
  this.complete = [];
};

/* harmony default export */ __webpack_exports__["a"] = (spfNavRequest);

/***/ }),
/* 80 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************!*\
  !*** ./app/javascript/packs/spf/net/connect.js ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__array_array__ = __webpack_require__(/*! ../array/array */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__net_resource__ = __webpack_require__(/*! ../net/resource */ 20);
// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for handling connections (i.e. pre-resolving DNS
 * and establishing the TCP AND TLS handshake).
 *
 * @author nicksay@google.com (Alex Nicksay)
 */




var spfNetConnect = {};
// goog.provide('spfNetConnect');

/**
 * Preconnects to a URL.
 * Use to both resolve DNS and establish connections before requests are made.
 *
 * @param {string|Array.<string>} urls One or more URLs to preconnect.
 */
spfNetConnect.preconnect = function (urls) {
  // Use an <img> tag to handle the preconnect in a compatible manner.
  var type = __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].Type.IMG;
  // Convert to an array if needed.
  urls = __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].toArray(urls);
  __WEBPACK_IMPORTED_MODULE_0__array_array__["a" /* default */].each(urls, function (url) {
    // When preconnecting, always fetch the image and make the request.
    // This is necessary to consistenly establish connections to repeat
    // URLs when the keep-alive time is shorter than the interval between
    // attempts.
    __WEBPACK_IMPORTED_MODULE_1__net_resource__["a" /* default */].prefetch(type, url, true); // Force repeat fetching.
  });
};

/* harmony default export */ __webpack_exports__["a"] = (spfNetConnect);

/***/ }),
/* 81 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************!*\
  !*** ./app/javascript/packs/spf/net/xhr.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(/*! ../base */ 0);
// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Streamlined XMLHttpRequest handling functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfNetXhr');


var spfNetXhr = {};

// goog.require('spf');

/**
 * Type definition for the configuration options for an XMLHttpRequest.
 * - headers: map of header key/value pairs.
 * - onChunk: optional callback to execute as chunks of the XHR response
 *      are received.  Only called if a valid "Transfer-Encoding: chunked"
 *      header is received.  Each execution of the callback will pass the
 *      current chunk in addition to the XHR object.
 * - onDone: optional callback to execute once the XHR response has been
 *      been completely received .
 * - onHeaders: optional callback to execute once the XHR response headers
 *      have been received.
 * - onTimeout: optional callback to execute if the XHR times out.  Only called
 *      if a timeout is configured.
 * - responseType: type to create from the XHR response.
 * - timeoutMs: number of milliseconds after which the request will be timed
 *      out by the client. Default is to allow the browser to handle timeouts.
 * - withCredentials: optional flag to send credentials if true.
 *
 * @typedef {{
 *   headers: (Object.<string>|undefined),
 *   onChunk: (function(XMLHttpRequest, string)|undefined),
 *   onDone: (function(XMLHttpRequest)|undefined),
 *   onHeaders: (function(XMLHttpRequest)|undefined),
 *   onTimeout: (function(XMLHttpRequest)|undefined),
 *   responseType: (string|undefined),
 *   timeoutMs: (number|undefined),
 *   withCredentials: (boolean|undefined)
 * }}
 */
spfNetXhr.Options;

/**
 * Type definition for POST data.
 * @typedef {(ArrayBuffer|Blob|Document|FormData|null|string|undefined)}
 */
spfNetXhr.PostData;

/**
 * Sends an XMLHttpRequest object as asynchronous GET request.
 *
 * @param {string} url The URL to send the XHR to.
 * @param {spfNetXhr.Options=} opt_options Configuration options for the XHR.
 * @return {XMLHttpRequest} The XHR object being sent.
 */
spfNetXhr.get = function (url, opt_options) {
  return spfNetXhr.send('GET', url, null, opt_options);
};

/**
 * Sends an XMLHttpRequest object as asynchronous POST request.
 *
 * @param {string} url The URL to send the XHR to.
 * @param {spfNetXhr.PostData} data The data to send with the XHR.
 * @param {spfNetXhr.Options=} opt_options Configuration options for the XHR.
 * @return {XMLHttpRequest} The XHR object being sent.
 */
spfNetXhr.post = function (url, data, opt_options) {
  return spfNetXhr.send('POST', url, data, opt_options);
};

/**
 * Sends an XMLHttpRequest object.
 *
 * @param {string} method The HTTP method for the XHR.
 * @param {string} url The URL to send the XHR to.
 * @param {spfNetXhr.PostData} data The data to send with the XHR.
 * @param {spfNetXhr.Options=} opt_options Configuration options for the XHR.
 * @return {XMLHttpRequest} The XHR object being sent.
 */
spfNetXhr.send = function (method, url, data, opt_options) {
  var options = opt_options || {};
  var chunked = false;
  var offset = 0;
  var timer;

  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr['timing'] = {};

  // Overload the abort method to handle the timer.
  var xhr_abort = xhr.abort;
  xhr.abort = function () {
    clearTimeout(timer);
    xhr.onreadystatechange = null;
    xhr_abort.call(xhr);
  };

  xhr.onreadystatechange = function () {
    var timing = xhr['timing'];
    if (xhr.readyState == spfNetXhr.State.HEADERS_RECEIVED) {
      // Record responseStart time when first byte is received.
      timing['responseStart'] = timing['responseStart'] || __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
      // Determine whether to process chunks as they arrive.
      chunked = spfNetXhr.isChunked_(xhr);
      if (options.onHeaders) {
        options.onHeaders(xhr);
      }
    } else if (xhr.readyState == spfNetXhr.State.LOADING) {
      if (chunked && options.onChunk) {
        var chunk = xhr.responseText.substring(offset);
        offset = xhr.responseText.length;
        options.onChunk(xhr, chunk);
      }
    } else if (xhr.readyState == spfNetXhr.State.DONE) {
      // Record responseEnd time when full response is received.
      timing['responseEnd'] = timing['responseEnd'] || __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
      // Record Resource Timing relative timings (where available) to later be
      // converted into Navigation Timing absolute timings.
      if (window.performance && window.performance.getEntriesByName) {
        // Get always the latest entry available just in case old entries were
        // not cleared out by performance.clearResourceTimings.
        xhr['resourceTiming'] = window.performance.getEntriesByName(url).pop();
      }
      // If processing chunks as they arrive and the state was transitioned
      // at response end to DONE without a LOADING, process the final chunk now.
      if (chunked && options.onChunk && xhr.responseText.length > offset) {
        var chunk = xhr.responseText.substring(offset);
        offset = xhr.responseText.length;
        options.onChunk(xhr, chunk);
      }
      clearTimeout(timer);
      if (options.onDone) {
        options.onDone(xhr);
      }
    }
  };

  // If requested, attempt to use the JSON `responseType` to optimize parsing.
  // If the browser supports `responseType` but not the `"json"` type, then
  // the property will remain unset.
  // NOTE: This removes the ability to handle chunked responses on the fly.
  if ('responseType' in xhr && options.responseType == 'json') {
    xhr.responseType = 'json';
  }

  if (options.withCredentials) {
    xhr.withCredentials = options.withCredentials;
  }

  // For POST, default to `Content-Type: application/x-www-form-urlencoded`
  // unless a custom header was given.
  var isFormData = 'FormData' in window && data instanceof FormData;
  var addContentTypeFormUrlEncoded = method == 'POST' && !isFormData;
  if (options.headers) {
    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
      if (key.toLowerCase() == 'content-type') {
        addContentTypeFormUrlEncoded = false;
      }
    }
  }
  if (addContentTypeFormUrlEncoded) {
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  }

  // Set the timer if a timeout value was specified.
  if (options.timeoutMs > 0) {
    timer = setTimeout(function () {
      xhr.abort();
      if (options.onTimeout) {
        options.onTimeout(xhr);
      }
    }, options.timeoutMs);
  }

  // Record fetchStart time when request is sent.
  xhr['timing']['fetchStart'] = __WEBPACK_IMPORTED_MODULE_0__base__["b" /* spfBase */].now();
  xhr.send(data);

  return xhr;
};

/**
 * Determines whether to process chunks as they arrive; should be called when
 * the XHR headers are received.  See {@link #send}.
 *
 * @param {XMLHttpRequest} xhr The XHR object being sent.
 * @return {boolean}
 * @private
 */
spfNetXhr.isChunked_ = function (xhr) {
  if (xhr.responseType == 'json') {
    return false;
  }
  // Determine whether to process chunks as they arrive.
  // This is only possible with chunked transfer encoding.
  // Note: handle Transfer-Encoding header values like:
  //   "chunked"  (standard)
  //   "Chunked"  (non-standard)
  //   "chunked, chunked"  (multiple headers sent)
  var encoding = xhr.getResponseHeader('Transfer-Encoding') || '';
  if (encoding.toLowerCase().indexOf('chunked') > -1) {
    return true;
  }
  // SPDY inherently uses chunked transfer and does not define a header.
  // Firefox provides a synthetic header which can be used instead.
  // For Chrome, a non-standard JS function must be used to determine if
  // the primary document was loaded with SPDY.  If the primary document
  // was loaded with SPDY, then most likely the XHR will be as well.
  var firefoxSpdy = xhr.getResponseHeader('X-Firefox-Spdy');
  var loadTimes = window.chrome && chrome.loadTimes && chrome.loadTimes();
  var chromeSpdy = loadTimes && loadTimes.wasFetchedViaSpdy;
  return !!(firefoxSpdy || chromeSpdy);
};

/**
 * @enum {number}
 */
spfNetXhr.State = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
};
/* harmony default export */ __webpack_exports__["a"] = (spfNetXhr);

/***/ }),
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */
/* no static exports found */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
//# sourceMappingURL=globalA.js.map