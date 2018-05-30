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
/******/ 	__webpack_require__.p = "/static/dawn/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 141);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_global.js ***!
  \**********************************************/
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_descriptors.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 9)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_object-dp.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ 11);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 34);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 17);
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_wks.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ 26)('wks');
var uid = __webpack_require__(/*! ./_uid */ 15);
var Symbol = __webpack_require__(/*! ./_global */ 0).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_has.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_hide.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 2);
var createDesc = __webpack_require__(/*! ./_property-desc */ 12);
module.exports = __webpack_require__(/*! ./_descriptors */ 1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_core.js ***!
  \********************************************/
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-iobject.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 63);
var defined = __webpack_require__(/*! ./_defined */ 19);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_is-object.js ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/library/modules/_fails.js ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 10 */,
/* 11 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_an-object.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_property-desc.js ***!
  \*****************************************************/
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 13 */,
/* 14 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_export.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 0);
var core = __webpack_require__(/*! ./_core */ 6);
var ctx = __webpack_require__(/*! ./_ctx */ 39);
var hide = __webpack_require__(/*! ./_hide */ 5);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_uid.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_iterators.js ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 17 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/library/modules/_to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./app/javascript/packs/common/utilities.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;
exports.cloneObj = cloneObj;
exports.mergeObj = mergeObj;
exports.addPrefixToObj = addPrefixToObj;
exports.wrapObj = wrapObj;
exports.strToDom = strToDom;
exports.insertAfter = insertAfter;
exports.debounce = debounce;
exports.isStrictMode = isStrictMode;
exports.generateUUID = generateUUID;
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/* consider Object.assign(target, ...sources) */
function mergeObj() {
  var obj1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var obj2 = arguments[1];

  var newObj = JSON.parse(JSON.stringify(obj1));
  for (var key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      newObj[key] = obj2[key];
    }
  }
  return newObj;
}
function addPrefixToObj(obj, prefix) {
  if (!prefix) return obj;
  var newObj = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj['' + prefix + '[' + key + ']'] = obj[key];
    }
  }
  return newObj;
}
function wrapObj(obj, wrapper) {
  if (!wrapper) return obj;
  var newObj = {};
  newObj[wrapper] = {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[wrapper][key] = obj[key];
    }
  }
  return newObj;
}

function strToDom(str) {
  var tmpEle = document.createElement('div');
  tmpEle.innerHTML = str;
  var returnDom = tmpEle.children[0];
  return returnDom;
}
/**
 * [insertAfter description: According to MDN if the element is last (and so nextSibling is null) the newNode will be appended as expected]
 * @param  {[type]} newNode       [description]
 * @param  {[type]} referenceNode [description]
 * @return {undefined}               [description]
 */
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
/*
var myEfficientFn = debounce(function() {
  // All the taxing stuff you do
}, 250);

window.addEventListener('resize', myEfficientFn);
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function isStrictMode() {
  var isStrict = function () {
    return !this;
  }();
  return isStrict;
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_defined.js ***!
  \***********************************************/
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_enum-bug-keys.js ***!
  \*****************************************************/
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 21 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_library.js ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 22 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 44);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 20);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 23 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-pie.js ***!
  \**************************************************/
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/_set-to-string-tag.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 2).f;
var has = __webpack_require__(/*! ./_has */ 4);
var TAG = __webpack_require__(/*! ./_wks */ 3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_shared-key.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 26)('keys');
var uid = __webpack_require__(/*! ./_uid */ 15);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_shared.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 0);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-integer.js ***!
  \**************************************************/
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_wks-define.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 0);
var core = __webpack_require__(/*! ./_core */ 6);
var LIBRARY = __webpack_require__(/*! ./_library */ 21);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 29);
var defineProperty = __webpack_require__(/*! ./_object-dp */ 2).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_wks-ext.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 3);


/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./app/javascript/packs/common/csrf.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rorParams = exports.rorParams = {
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
/* 31 */,
/* 32 */,
/* 33 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_dom-create.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 8);
var document = __webpack_require__(/*! ./_global */ 0).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_ie8-dom-define.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 1) && !__webpack_require__(/*! ./_fails */ 9)(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 33)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_cof.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 38 */,
/* 39 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_ctx.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 46);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 40 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_iter-define.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ 21);
var $export = __webpack_require__(/*! ./_export */ 14);
var redefine = __webpack_require__(/*! ./_redefine */ 45);
var hide = __webpack_require__(/*! ./_hide */ 5);
var has = __webpack_require__(/*! ./_has */ 4);
var Iterators = __webpack_require__(/*! ./_iterators */ 16);
var $iterCreate = __webpack_require__(/*! ./_iter-create */ 65);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 24);
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 69);
var ITERATOR = __webpack_require__(/*! ./_wks */ 3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 41 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_object-create.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ 11);
var dPs = __webpack_require__(/*! ./_object-dps */ 50);
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 20);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 25)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 62).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 42 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopn.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ 44);
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 20).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 43 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gops.js ***!
  \***************************************************/
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 44 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys-internal.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ 4);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 7);
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 60)(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 25)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 45 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_redefine.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ 5);


/***/ }),
/* 46 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_a-function.js ***!
  \**************************************************/
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 47 */,
/* 48 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/babel-runtime/helpers/typeof.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 56);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(/*! ../core-js/symbol */ 55);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 49 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_meta.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ 15)('meta');
var isObject = __webpack_require__(/*! ./_is-object */ 8);
var has = __webpack_require__(/*! ./_has */ 4);
var setDesc = __webpack_require__(/*! ./_object-dp */ 2).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 9)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 50 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-dps.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ 2);
var anObject = __webpack_require__(/*! ./_an-object */ 11);
var getKeys = __webpack_require__(/*! ./_object-keys */ 22);

module.exports = __webpack_require__(/*! ./_descriptors */ 1) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 51 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-length.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 27);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 52 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-object.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 19);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 53 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/library/modules/es6.string.iterator.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ 70)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 40)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 54 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./app/javascript/packs/common/toggleScroll.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableScroll = disableScroll;
exports.enableScroll = enableScroll;
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disableScroll() {
  if (window.addEventListener) // older FF
    {
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}

/***/ }),
/* 55 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/babel-runtime/core-js/symbol.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 57), __esModule: true };

/***/ }),
/* 56 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/babel-runtime/core-js/symbol/iterator.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 58), __esModule: true };

/***/ }),
/* 57 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/fn/symbol/index.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ 74);
__webpack_require__(/*! ../../modules/es6.object.to-string */ 73);
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 75);
__webpack_require__(/*! ../../modules/es7.symbol.observable */ 76);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Symbol;


/***/ }),
/* 58 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/fn/symbol/iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ 53);
__webpack_require__(/*! ../../modules/web.dom.iterable */ 77);
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 29).f('iterator');


/***/ }),
/* 59 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/library/modules/_add-to-unscopables.js ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 60 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_array-includes.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 7);
var toLength = __webpack_require__(/*! ./_to-length */ 51);
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ 71);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 61 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_enum-keys.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 22);
var gOPS = __webpack_require__(/*! ./_object-gops */ 43);
var pIE = __webpack_require__(/*! ./_object-pie */ 23);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 62 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_html.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ 0).document;
module.exports = document && document.documentElement;


/***/ }),
/* 63 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_iobject.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 37);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 64 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_is-array.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 37);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 65 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_iter-create.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ 41);
var descriptor = __webpack_require__(/*! ./_property-desc */ 12);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 24);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 5)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 66 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_iter-step.js ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 67 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopd.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ 23);
var createDesc = __webpack_require__(/*! ./_property-desc */ 12);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 7);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 17);
var has = __webpack_require__(/*! ./_has */ 4);
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 34);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 68 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopn-ext.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 7);
var gOPN = __webpack_require__(/*! ./_object-gopn */ 42).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 69 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-gpo.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ 4);
var toObject = __webpack_require__(/*! ./_to-object */ 52);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ 25)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 70 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_string-at.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 27);
var defined = __webpack_require__(/*! ./_defined */ 19);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 71 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/_to-absolute-index.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 27);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 72 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/es6.array.iterator.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 59);
var step = __webpack_require__(/*! ./_iter-step */ 66);
var Iterators = __webpack_require__(/*! ./_iterators */ 16);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 7);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 40)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 73 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.to-string.js ***!
  \***********************************************************/
/***/ (function(module, exports) {



/***/ }),
/* 74 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/es6.symbol.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ 0);
var has = __webpack_require__(/*! ./_has */ 4);
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ 1);
var $export = __webpack_require__(/*! ./_export */ 14);
var redefine = __webpack_require__(/*! ./_redefine */ 45);
var META = __webpack_require__(/*! ./_meta */ 49).KEY;
var $fails = __webpack_require__(/*! ./_fails */ 9);
var shared = __webpack_require__(/*! ./_shared */ 26);
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 24);
var uid = __webpack_require__(/*! ./_uid */ 15);
var wks = __webpack_require__(/*! ./_wks */ 3);
var wksExt = __webpack_require__(/*! ./_wks-ext */ 29);
var wksDefine = __webpack_require__(/*! ./_wks-define */ 28);
var enumKeys = __webpack_require__(/*! ./_enum-keys */ 61);
var isArray = __webpack_require__(/*! ./_is-array */ 64);
var anObject = __webpack_require__(/*! ./_an-object */ 11);
var toIObject = __webpack_require__(/*! ./_to-iobject */ 7);
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ 17);
var createDesc = __webpack_require__(/*! ./_property-desc */ 12);
var _create = __webpack_require__(/*! ./_object-create */ 41);
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ 68);
var $GOPD = __webpack_require__(/*! ./_object-gopd */ 67);
var $DP = __webpack_require__(/*! ./_object-dp */ 2);
var $keys = __webpack_require__(/*! ./_object-keys */ 22);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 42).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 23).f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 43).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ 21)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 5)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 75 */
/* no static exports found */
/* all exports used */
/*!****************************************************************!*\
  !*** ./~/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \****************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 28)('asyncIterator');


/***/ }),
/* 76 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/library/modules/es7.symbol.observable.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ 28)('observable');


/***/ }),
/* 77 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/web.dom.iterable.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ 72);
var global = __webpack_require__(/*! ./_global */ 0);
var hide = __webpack_require__(/*! ./_hide */ 5);
var Iterators = __webpack_require__(/*! ./_iterators */ 16);
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 78 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./app/javascript/packs/common/ajax.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$http = $http;

var _serialize = __webpack_require__(/*! ./serialize */ 84);

var _utilities = __webpack_require__(/*! ./utilities */ 18);

var _csrf = __webpack_require__(/*! ./csrf */ 30);

function $http(url) {
  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax: function ajax(method, url) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var prefix = arguments[3];

      // for Rails
      // url = url + '.json';
      // Creating a promise
      var promise = new Promise(function (resolve, reject) {
        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();

        if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
          var uri = JSON.stringify(extendGeneralParams((0, _utilities.wrapObj)(args, prefix)));
          client.open(method, url);
          // client.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          client.setRequestHeader('Content-type', 'application/json');
          client.send(uri);
        } else if (method === 'GET') {
          var _uri = (0, _serialize.serialize)(extendGeneralParams((0, _utilities.addPrefixToObj)(args, prefix)));
          client.open(method, url + '?' + _uri);
          client.setRequestHeader('Content-type', 'application/json');
          client.send();
        };

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.responseText);
          }
        };
        client.onerror = function (err) {
          reject(this.responseText);
        };
      });

      // Return the promise
      return promise;
    }
    // Adapter pattern
  };return {
    'get': function get(args, prefix) {
      return core.ajax('GET', url, args, prefix);
    },
    'post': function post(args, prefix) {
      return core.ajax('POST', url, args, prefix);
    },
    'put': function put(args, prefix) {
      return core.ajax('PUT', url, args, prefix);
    },
    'patch': function patch(args, prefix) {
      return core.ajax('PATCH', url, args, prefix);
    },
    'delete': function _delete(args, prefix) {
      return core.ajax('DELETE', url, args, prefix);
    }
  };
} /**
  // B-> Here you define its functions and its payload
  var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
  var payload = {
    'topic' : 'js',
    'q'     : 'Promise'
  };
  var callback = {
    success : function(data){
       console.log(1, 'success', JSON.parse(data));
    },
    error : function(data){
       console.log(2, 'error', JSON.parse(data));
    }
  };
  // End B
  // Executes the method call
  $http(mdnAPI)
    .get(payload)
    .then(callback.success)
    .catch(callback.error);
  // Executes the method call but an alternative way (1) to handle Promise Reject case
  $http(mdnAPI)
    .get(payload)
    .then(callback.success, callback.error);
  // Executes the method call but an alternative way (2) to handle Promise Reject case
  $http(mdnAPI)
    .get(payload)
    .then(callback.success)
    .then(undefined, callback.error);
   */
// A-> $http function is implemented in order to follow the standard Adapter pattern


function extendGeneralParams(obj) {
  var csrfParam = _csrf.rorParams.csrfParam();
  var csrfToken = _csrf.rorParams.csrfToken();
  var generalObj = {};
  generalObj.utf8 = '✓';
  generalObj.format = 'json';
  generalObj[csrfParam] = csrfToken;
  return (0, _utilities.mergeObj)(obj, generalObj);
}
// End A

/***/ }),
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./app/javascript/packs/common/flash.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flash = flash;
exports.parseAndFlash = parseAndFlash;

var _utilities = __webpack_require__(/*! ./utilities */ 18);

function flash(data) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

  var flashEle = (0, _utilities.strToDom)(flashTpl(data));
  document.body.appendChild(flashEle);
  setTimeout(destory.bind(null, flashEle, callback), 2000);
}

function flashTpl(data) {
  var str = '\n\t\t<div class="flash-layer ' + (data.error ? 'error' : 'success') + '">\n\t\t\t<div class="message">' + (data.error || data.message) + '</div>\n\t\t</div>\n\t';
  return str;
}

function destory(ele, callback) {
  ele.addEventListener('animationend', function () {
    document.body.removeChild(ele);
  });
  ele.classList.add('blink');
  callback();
}

function parseAndFlash(data, callback) {
  var jsonData = JSON.parse(data);
  flash(jsonData, callback);
  return jsonData;
}

/***/ }),
/* 83 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./app/javascript/packs/common/popup.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popup = popup;

var _toggleScroll = __webpack_require__(/*! ./toggleScroll */ 54);

function popup(ev, params, callback) {
  var popupEle = document.createElement('div');
  popupEle.classList.add('popup-layer');
  popupEle.innerHTML = generatePopupTpl();
  positionPopupEle(popupEle, ev);
  bindPopupEvents(popupEle, ev, params, callback);
  document.body.appendChild(popupEle);
  (0, _toggleScroll.disableScroll)();
}

function generatePopupTpl(data) {
  var tpl = '\n    <div class="popup-shadow">\n      <div class="popup-content">\n\t\t\t\t<div class="popup-text">Are you sure to delete this API?</div>\n\t\t\t\t<div class="popup-btns">\n\t\t\t\t\t<span class="popup-btn popup-cancel-btn">cancel</span>\n\t\t\t\t\t<span class="popup-btn popup-confirm-btn">confirm</span>\n\t\t\t\t</div>\n      </div>\n    </div>\n\t';
  return tpl;
}

function bindPopupEvents(ele, ev, params, callback) {
  ele.getElementsByClassName('popup-cancel-btn')[0].addEventListener('click', closePopup);
  ele.getElementsByClassName('popup-shadow')[0].addEventListener('click', closePopup);
  ele.getElementsByClassName('popup-confirm-btn')[0].addEventListener('click', confirm.bind(this, ev, ele, params, callback));
}

function confirm(ev, ele, params, callback) {
  callback();
  document.body.removeChild(ele);
}

function positionPopupEle(ele, coordinates) {
  ele.getElementsByClassName('popup-content')[0].style.transform = 'translate3d(' + coordinates.clientX + 'px, ' + coordinates.clientY + 'px, 0)';
}

function closePopup(ev) {
  if (ev.target !== ev.currentTarget) return;
  var popLayer = ev.target.closest('.popup-layer');
  if (popLayer) {
    document.body.removeChild(popLayer);
    (0, _toggleScroll.enableScroll)();
  }
}

/***/ }),
/* 84 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./app/javascript/packs/common/serialize.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 48);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.serialize = serialize;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [serialize converts recursive objects]
 * @param  {[type]} obj    [description]
 * @param  {[type]} prefix [description]
 * @return {[type]}        [description]
 * console.log(serialize({foo: "hi there", bar: { blah: 123, quux: [1, 2, 3] }}));
 * foo=hi%20there&bar%5Bblah%5D=123&bar%5Bquux%5D%5B0%5D=1&bar%5Bquux%5D%5B1%5D=2&bar%5Bquux%5D%5B2%5D=3
 */
function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p,
          v = obj[p];
      str.push((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}

/***/ }),
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./app/javascript/packs/api-tree/tree.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = Tree;

var _queue = __webpack_require__(/*! ./queue */ 130);

function Tree(data) {
  var node = new Node(data);
  this._root = node;
} /**
   * [Tree description]
   * @param {[type]} data [description]
   *
   * _root points to the root node of a tree.
   * traverseDF(callback) traverses nodes of a tree with DFS.
   * traverseBF(callback) traverses nodes of a tree with BFS.
   * contains(data, traversal) searches for a node in a tree.
   * add(data, toData, traverse) adds a node to a tree.
   * remove(child, parent) removes a node in a tree.
   *
   */


function Node(data) {
  this.nodeId = data.nodeId; // leaf index, starts from 0(root node)
  this.parent = null;
  this.children = [];
  // added later
  this.childrenlevel = 1; // rows of descendants of current node
  this.column = 0; // which column the current node sits in, starts from 0( root node sits in)
  this.totaloffsetylevel = 0; // total vertical offset to the current tree
  this.data = data.data || {};
}

Tree.prototype.traverseDF = function (callback) {
  // this is a recurse and immediately-invoking function
  (function recurse(currentNode) {
    // step 2
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      // step 3
      recurse(currentNode.children[i]);
    }

    // step 4
    callback(currentNode);

    // step 1
  })(this._root);
};

// for those nodes who have children
function calcChildrenLevels(node) {
  var totalChildrenLevels = 0;
  for (var i = 0; i < node.children.length; i++) {
    totalChildrenLevels += node.children[i].childrenlevel;
  };
  return totalChildrenLevels;
}
Tree.prototype.calcChildrenLevel = function () {
  var callback = function callback(node) {
    node.childrenlevel = node.children.length > 0 ? calcChildrenLevels(node) : 1;
    node.column = node.parent ? node.parent.column + 1 : 0;
  };

  this.traverseDF(callback);
};

function calcOffY(arr, data) {
  var nodeIdx = findIndex(arr, data);
  var totalY = 0;
  for (var i = 0; i < nodeIdx; i++) {
    totalY += arr[i].childrenlevel;
  };
  return totalY;
}

Tree.prototype.calcTotalOffsetYLevel = function () {
  var levelgap = 0;
  var callback = function callback(node) {
    if (node.parent) {
      node.totaloffsetylevel = node.parent.totaloffsetylevel + calcOffY(node.parent.children, node.nodeId);
    } else if (node.parent === null) {};
  };

  this.traverseBF(callback);
};

Tree.prototype.traverseBF = function (callback) {
  var queue = new _queue.Queue();

  queue.enqueue(this._root);

  var currentTree = queue.dequeue();

  while (currentTree) {
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

Tree.prototype.contains = function (callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function (data, toData, traversal) {
  var child = new Node(data),
      parent = null,
      callback = function callback(node) {
    if (node.nodeId === toData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error('Cannot add node to a non-existent parent.');
  }

  this.calcChildrenLevel();
  this.calcTotalOffsetYLevel();
  this.checkDataHasChild();
  return child;
};

Tree.prototype.remove = function (data, fromData, traversal) {
  var tree = this,
      parent = null,
      childToRemove = null,
      index;

  var callback = function callback(node) {
    if (node.nodeId === fromData) {
      parent = node;
    }
  };

  this.contains(callback, traversal);

  if (parent) {
    index = findIndex(parent.children, data);

    if (index === undefined) {
      throw new Error('Node to remove does not exist.');
    } else {
      childToRemove = parent.children.splice(index, 1);
    }
  } else {
    throw new Error('Parent does not exist.');
  }

  this.calcChildrenLevel();
  this.calcTotalOffsetYLevel();
  this.checkDataHasChild();
  return childToRemove;
};

function findIndex(arr, data) {
  var index;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].nodeId === data) {
      index = i;
    }
  }

  return index;
}

/* tree addon */

Tree.prototype.traverseDirectChild = function (nodedata) {
  var queue = new _queue.Queue(),
      parent = null,
      callback = function callback(node) {
    if (node.nodeId === nodedata) {
      parent = node;
    }
  };

  this.contains(callback, this.traverseBF);

  while (parent) {
    for (var i = 0, length = parent.children.length; i < length; i++) {
      queue.enqueue(parent.children[i]);
    }
    callback(parent);
    parent = null;
  }
  return queue;
};
Tree.prototype.applyStyle = function () {
  var styleObj = {};
  var callback = function callback(node) {
    styleObj[node.nodeId] = node.totaloffsetylevel;
  };
  this.traverseBF(callback);

  return styleObj;
};

/**
 * [traverseDescendants description]
 * @param  {[integer]} nodeData [description]
 * @return {[array]}         [description]
 */
Tree.prototype.traverseDescendants = function (nodeData) {
  var queue = new _queue.Queue(),
      parent = null,
      callback = function callback(node) {
    if (node.nodeId === nodeData) {
      parent = node;
    }
  };

  this.contains(callback, this.traverseBF);

  queue.enqueue(parent);

  var currentTree = queue.dequeue();
  var descendantsArr = [];

  while (currentTree) {
    descendantsArr.push(currentTree);
    for (var i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    currentTree = queue.dequeue();
  }

  return descendantsArr;
};

Tree.prototype.checkDataHasChild = function () {
  var callback = function callback(node) {
    node.data.hasChild = node.children.length > 0;
  };
  this.traverseBF(callback);
};

/* get Max nodeId from tree */
Tree.prototype.maxId = function () {
  var maxNodeId = 0;
  var callback = function callback(node) {
    if (node.nodeId > maxNodeId) maxNodeId = node.nodeId;
  };
  this.traverseBF(callback);
  return maxNodeId;
};

/* tree depth */
Tree.prototype.depth = function () {
  var depthArr = [];
  var callback = function callback(node) {
    var depth = 0;
    if (node.children.length === 0) {
      while (node.parent !== null) {
        depth += 1;
        node = node.parent;
      }
      depthArr.push(depth);
    }
  };
  this.traverseDF(callback);
  return depthArr;
};

Tree.prototype.dimensions = function () {
  var horiMax = void 0,
      verticalMax = void 0,
      horiArr = [];
  horiArr = this.depth();
  horiMax = Math.max.apply(null, horiArr);
  verticalMax = this._root.childrenlevel;
  return [horiMax, verticalMax];
};

/***/ }),
/* 108 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./app/javascript/packs/common/twoWayDataBinding.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twoWayDataBinding = twoWayDataBinding;
function twoWayDataBinding(data, domContext) {
  /* Instatiate an empty `model` object. */
  var model = {};
  /* Iterate over the keys of the supplied `data` object. */
  Object.keys(data).forEach(function (key) {
    /* Store our value inside the `forEach` closure. */
    var value = data[key];
    Object.defineProperty(model, key, {
      /* We want our property to appear in `for..in` loops. */
      enumerable: true,
      get: function get() {
        /* This doesn't need to do much, only return the `value` from our closure. */
        return value;
      },
      set: function set(val) {
        /* Overwrite our closures `value` with the new `val`. */
        value = val;
        /* Select all nodes with `bind` and `model` attributes. */
        selectorToArray('[bind=' + key + ']', domContext).concat(selectorToArray('[model=' + key + ']', domContext)).forEach(function (el) {
          /* If element has `bind` attribute, set it's `textContent`. */
          if (el.getAttribute('bind') && !el.hasAttribute('bind-toggle-class')) el.textContent = value;
          if (el.hasAttribute('bind-toggle-class')) {
            if (value === true || value === 'true') {
              el.classList.add('toggle-true');
            } else if (value === false || value === 'false') {
              el.classList.remove('toggle-true');
            } else if (value && ('' + value).length > 0 && !hasActiveEle(elAndDescendants(el))) {
              el.classList.add('toggle-true');
            }
          }
          if (el.hasAttribute('bind-attr-href')) {
            el.setAttribute('href', value);
          }
          /* If element has `model` attribute, set it's `value`. */

          if (el.getAttribute('model') && el !== document.activeElement) {
            el.value = value;
          }
        });
      }
    });
    /* Set our model objects property value to the same value. */
    model[key] = value;
    /* Add change handlers to inputs on the page. */
    selectorToArray('[model=' + key + ']', domContext).forEach(function (el) {
      /* Our handler simply sets our models `key` to the element's value. */
      function handler() {
        model[key] = el.value;
      }
      /* Bind a `keyup` handler so we get live feedback on each key press. */
      // el.addEventListener('keyup', handler);
      /* Bind a `change` handler which is fired when the element is blurred. */
      el.addEventListener('input', handler);
    });
  });
  /* Return our new model object. */
  return model;
}

/* include domContext itsself */
function selectorToArray(selector, domContext) {
  var arr = Array.prototype.slice.call(domContext.querySelectorAll(selector));
  if (domContext.matches(selector)) {
    arr.push(domContext);
  }
  return arr;
}

function elAndDescendants(el) {
  var resultArr = [];
  (function loop(ele) {
    var childrenEles = ele.children;
    if (ele.childElementCount) {
      for (var i = childrenEles.length - 1; i >= 0; i--) {
        loop(childrenEles[i]);
      }
    }
    resultArr.push(ele);
  })(el);
  return resultArr;
}
function hasActiveEle(arr) {
  var bol = false;
  if (arr.length === 0) return;
  for (var i = arr.length - 1; i >= 0; i--) {
    if (bol === true) break;
    bol = arr[i] === document.activeElement;
  }
  return bol;
}

/***/ }),
/* 109 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./app/javascript/packs/global/constant.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootAPI = exports.rootAPI = window.location.origin + '/apis';

/***/ }),
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./app/javascript/packs/modules/apiOperation.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = __webpack_require__(/*! babel-runtime/helpers/taggedTemplateLiteral */ 159);

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  '], ['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  ']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n        ', '\n      '], ['\n        ', '\n      ']);

exports.initApiOperation = initApiOperation;
exports.disposeApiOperation = disposeApiOperation;

var _ajax = __webpack_require__(/*! ../common/ajax */ 78);

var _constant = __webpack_require__(/*! ../global/constant */ 109);

var _template = __webpack_require__(/*! ../common/template */ 140);

var _popup = __webpack_require__(/*! ../common/popup */ 83);

var _slide = __webpack_require__(/*! ../common/slide */ 139);

var _utilities = __webpack_require__(/*! ../common/utilities */ 18);

var _flash = __webpack_require__(/*! ../common/flash */ 82);

var _treeDom = __webpack_require__(/*! ../api-tree/treeDom */ 132);

var _twoWayDataBinding = __webpack_require__(/*! ../common/twoWayDataBinding */ 108);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var payload = {};
var apisArr = [];

var callback = {
  getApiSuccess: function getApiSuccess(data) {
    addApiTree(JSON.parse(data), this, false);
  },
  getAllApisSuccess: function getAllApisSuccess(data) {
    var dataBak = data;
    var JSONBak = JSON.parse(dataBak);
    if (JSONBak.length === 0) {
      newApiBtn();
      return;
    }
    renderAllApis(data);
    bindevents();
    listenApiQuery();
  },
  patchSuccess: function patchSuccess(data) {
    (0, _flash.parseAndFlash)(data);
  },
  postSuccess: function postSuccess(data) {
    (0, _flash.parseAndFlash)(data);
  },
  deleteSuccess: function deleteSuccess(data) {
    function destoryApiLi() {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
    }
    (0, _flash.parseAndFlash)(data, destoryApiLi.bind(this));
  },
  apiQuerySuccess: function apiQuerySuccess(data) {
    var searchList = document.getElementsByClassName('api-search-result')[0];
    var dataObj = JSON.parse(data);
    var contentStr = '';
    for (var i = 0, Len = dataObj.length; i < Len; i++) {
      contentStr += '<div class=\'per-search-result\'>\n        <span class="per-result-column per-result-uri">' + dataObj[i].uri + '</span>\n        <span class="per-result-column per-result-section">' + dataObj[i].section + '</span>\n        <span class="per-result-column per-result-method">' + dataObj[i].method + '</span>\n        <span class="per-result-column per-result-description">' + dataObj[i].description + '</span>\n      </div>';
    }
    searchList.innerHTML = contentStr;
    dataObj.length > 0 ? searchList.classList.remove('hide') : searchList.classList.add('hide');
  },
  success: function success(data) {
    console.log(data);
  },
  error: function error(data) {
    if (!data.data) {
      newApiBtn();
      return;
    }
    (0, _flash.parseAndFlash)(data);
  }
};
function initApiOperation() {
  getAllApis();
}

function disposeApiOperation() {}

var debouncedApiQueryInput = (0, _utilities.debounce)(apiQuery, 100, false);
function listenApiQuery() {
  var apiQueryInput = document.getElementsByClassName('api-query')[0];
  var inWrapper = false;
  apiQueryInput.addEventListener('keyup', debouncedApiQueryInput);
  apiQueryInput.parentElement.addEventListener('mouseleave', function (ev) {
    if (!checkIfFocus.apply(apiQueryInput, ev)) {
      clearSearchResult();
    };
    inWrapper = false;
  });
  apiQueryInput.parentElement.addEventListener('mouseenter', function (ev) {
    inWrapper = true;
  });
  apiQueryInput.addEventListener('blur', function (ev) {
    if (!inWrapper) clearSearchResult();
  });
  apiQueryInput.addEventListener('focus', apiQuery);
}
function checkIfFocus(ev) {
  return this === document.activeElement;
}
function apiQuery(ev) {
  if (ev.target.value.length <= 0) {
    clearSearchResult();
    return;
  }
  payload = { q: ev.target.value };
  (0, _ajax.$http)(window.location.origin + '/instantsearch').get(payload).then(callback.apiQuerySuccess.bind(ev)).catch(callback.error);
}
function clearSearchResult() {
  var apiSearchResultEle = document.getElementsByClassName('api-search-result')[0];
  apiSearchResultEle.innerHTML = '';
  apiSearchResultEle.classList.add('hide');
}
function toggleFoldLi(context, ev) {
  if (!ev) {
    context.classList.toggle('unfold');
    return;
  }
  if (!ev.target.classList.contains('api-li-wiki')) {
    context.classList.toggle('unfold');
  }
}
function bindEventToApiLiDescription(ev) {
  toggleFoldLi(this, ev);
  if (this.nextElementSibling) {
    return;
  };
  (0, _ajax.$http)(_constant.rootAPI + '/' + this.parentNode.dataset.apiId).get(payload).then(callback.getApiSuccess.bind(this.parentNode)).catch(callback.error);
}
function bindevents() {
  var apiLis = document.getElementsByClassName('api-li-summary');
  [].slice.call(apiLis).forEach(function (element, index) {
    element.addEventListener('click', function (ev) {
      bindEventToApiLiDescription.call(this, ev);
    });
  });
}
function addApiTree() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var containerNode = arguments[1];
  var isNewApi = arguments[2];

  var newApi = new _treeDom.ApiDom(data, containerNode, isNewApi);
  apisArr.push(newApi);
}

var debouncedNewApiBtn = (0, _utilities.debounce)(processNewApiClick, 500, true);
var debouncedEnvBtn = (0, _utilities.debounce)(processOpenEnvSettings, 500, true);
function processOpenEnvSettings(ev, el) {
  var params = {
    content: slideContent()
  };
  (0, _slide.slide)(ev, params);
}
function slideContent() {
  var tplStr = '\n    <ul>\n      <li>\n        <label>host:</label>\n        <input class="c-input" type="text" />\n        <label>account:</label>\n        <input class="c-input" type="text" />\n        <label>label:</label>\n        <input class="c-input" type="text" />\n        <input class="" type="button" value="check availability" />\n      </li>\n    </ul>\n  ';
  return tplStr;
}
function processNewApiClick() {
  var apiUl = document.getElementsByClassName('api-ul')[0];
  if (!apiUl) {
    createApiUl();
    apiUl = document.getElementsByClassName('api-ul')[0];
  }
  var baseApiLi = (0, _utilities.strToDom)(newApiLiTpl());
  apiUl.insertBefore(baseApiLi, apiUl.firstChild);
  addApiTree({}, baseApiLi, true);
  toggleFoldLi(baseApiLi.children[0]);
  baseApiLi.children[0].addEventListener('click', function (ev) {
    bindEventToApiLiDescription.call(this, ev);
  });
}

function createApiUl() {
  var apiListEle = document.createElement('div');
  var apiUlEle = document.createElement('ul');
  var newApiDiv = document.getElementsByClassName('api-add-query')[0];
  apiListEle.classList.add('api-ul-wrapper');
  apiUlEle.classList.add('api-ul');
  apiListEle.appendChild(apiUlEle);
  (0, _utilities.insertAfter)(apiListEle, newApiDiv);
}
function newApiBtn() {
  var newApiDiv = void 0;
  // let header = document.getElementsByClassName('api-header-pre-mark')[0];
  // let newApiStr = `
  //   <div class="api-add-query">
  //     <span class="add-api-btn">new API</span>
  //     <div class="api-search-wrapper">
  //       <input class="api-query" type="search" placeholder="search">
  //       <div class="api-search-result hide"></div>
  //     </div>
  //     <a class="c-hide icon-text-link c-float-right dev-env-settings" href="javascript:;"><span class="icon-text-icon"><svg class="icon icon-settings icon-fit"><use xlink:href="#icon-settings"></use></svg></span><span class="icon-text-text">环境同步数据配置</span></a>
  //   </div>
  // `;
  // newApiDiv = strToDom(newApiStr);
  newApiDiv = document.getElementsByClassName('api-add-query')[0];
  newApiDiv.getElementsByClassName('add-api-btn')[0].addEventListener('click', debouncedNewApiBtn);
  newApiDiv.getElementsByClassName('dev-env-settings')[0].addEventListener('click', debouncedEnvBtn);
  // insertAfter(newApiDiv, header);
  return newApiDiv;
}

function newApiLiTpl() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var tpl = '\n    <li class="api-li" data-api-id="' + (data.id || null) + '">\n      <div class="api-li-summary">\n        <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>\n        <span class="api-li-uri" bind="uri">' + (data.uri || '(No uri)') + '</span>\n        <span class="api-li-des" bind="description">' + (data.description ? data.description : '(No description)') + '</span>\n        <a href="' + data.wikiLink + '" class="api-li-wiki" bind-attr-href="wikiLink" bind="wikiLink" target="_blank">' + (data.wikiLink ? data.wikiLink : '(No wikiLink)') + '</a>\n      </div>\n    </li>\n  ';
  return tpl;
}
function renderAllApis(data) {
  data = JSON.parse(data);
  var tmpl = function tmpl(data) {
    return (0, _template.html)(_templateObject, data.map(function (item) {
      return (0, _template.html)(_templateObject2, newApiLiTpl(item));
    }));
  };
  var apiListEle = document.createElement('div');
  apiListEle.classList.add('api-ul-wrapper');
  apiListEle.innerHTML = tmpl(data);
  (0, _utilities.insertAfter)(apiListEle, newApiBtn());
}

function getAllApis() {
  (0, _ajax.$http)(_constant.rootAPI).get(payload).then(callback.getAllApisSuccess).catch(callback.error);
}

/***/ }),
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./app/javascript/packs/api-tree/jsonTreeConverter.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToTree = jsonToTree;
exports.treeToJson = treeToJson;

var _tree = __webpack_require__(/*! ./tree */ 107);

function jsonToTree(nodesArr) {
  var hashTable = {};
  var tree = void 0;
  for (var i = 0, nodesLen = nodesArr.length; i < nodesLen; i++) {
    hashTable[nodesArr[i]['parentId']] ? hashTable[nodesArr[i]['parentId']].push(nodesArr[i]) : hashTable[nodesArr[i]['parentId']] = [nodesArr[i]];
  }
  // node 的子节点的ID总是大于node的ID
  var modKeysArr = removeEleFromArr(Object.keys(hashTable), 'null').map(Number).sort(sortNumber);
  var rootNodeData = hashTable['null'][0];
  tree = new _tree.Tree(rootNodeData);

  for (var j = 0, keysLen = modKeysArr.length; j < keysLen; j++) {
    if (hashTable.hasOwnProperty(modKeysArr[j])) {
      for (var k = 0, keyArrLen = hashTable[modKeysArr[j]].length; k < keyArrLen; k++) {
        tree.add(hashTable[modKeysArr[j]][k], +modKeysArr[j], tree.traverseBF);
      }
    }
  }
  return tree;
}

function removeEleFromArr(arr, ele) {
  var index = arr.indexOf(ele);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

/* By default the sort method sorts elements alphabetically. */
function sortNumber(a, b) {
  return a - b;
}

function treeToJson(tree) {}

/***/ }),
/* 130 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./app/javascript/packs/api-tree/queue.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = Queue;
/**
 * [Queue description]
 * enqueue(data) adds data to a queue.
 * dequeue removes the oldest added data to a queue.
 */
function Queue() {
  this._oldestIndex = 1;
  this._newestIndex = 1;
  this._storage = {};
}

Queue.prototype.size = function () {
  return this._newestIndex - this._oldestIndex;
};

Queue.prototype.enqueue = function (data) {
  this._storage[this._newestIndex] = data;
  this._newestIndex++;
};

Queue.prototype.dequeue = function () {
  var oldestIndex = this._oldestIndex,
      newestIndex = this._newestIndex,
      deletedData;

  if (oldestIndex !== newestIndex) {
    deletedData = this._storage[oldestIndex];
    delete this._storage[oldestIndex];
    this._oldestIndex++;

    return deletedData;
  }
};

/***/ }),
/* 131 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./app/javascript/packs/api-tree/treeDataCollect.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectApiData = collectApiData;

var _utilities = __webpack_require__(/*! ../common/utilities */ 18);

function collectApiData(tree, opEle) {
  var perApiEle = opEle.closest('.per-api');
  // let treeEle = perApiEle.getElementsByClassName('api-tree')[0];
  return (0, _utilities.mergeObj)(collectInfo(perApiEle), collectDataFromTree(tree));
}

function collectInfo(perApiEle) {
  var infoEle = perApiEle.getElementsByClassName('api-info')[0];
  var ModesRowEle = perApiEle.getElementsByClassName('api-modes-row')[0];
  var infoData = {};
  infoData = {
    'section': infoEle.getElementsByClassName('api-section')[0].value,
    'uri': infoEle.getElementsByClassName('api-uri')[0].value,
    'method': infoEle.getElementsByClassName('api-method')[0].value,
    'description': infoEle.getElementsByClassName('api-description')[0].value,
    'wikiLink': infoEle.getElementsByClassName('api-wiki-input')[0].value,
    'mode': getModeVal(ModesRowEle),
    'debugAddr': getDebugAddr(ModesRowEle)
  };

  return infoData;
}

function getModeVal(ModesRowEle) {
  var radios = ModesRowEle.getElementsByClassName('api-mode');
  var modeVal;
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      modeVal = radios[i].value;
      break;
    }
  }
  return modeVal;
}

function getDebugAddr(ModesRowEle) {
  return ModesRowEle.getElementsByClassName('mode-debugging-addr')[0].value;
}

function collectTree(treeEle) {
  var leaves = [].slice.call(treeEle.getElementsByClassName('leaf'));
  var treeDataArr = [];
  var treeDataObj = {};
  var leafData = void 0;
  for (var i = 0, leavesLen = leaves.length; i < leavesLen; i++) {
    leafData = {};
    leafData.parentId = leaves[i].dataset.parent;
    leafData.nodeId = leaves[i].dataset.index;
    leafData.key = leaves[i].getElementsByClassName('leaf-key')[0].value;
    leafData.value = leaves[i].getElementsByClassName('leaf-value')[0].value;
    leafData.quantity = leaves[i].getElementsByClassName('leaf-quantity')[0].value;
    treeDataArr.push(leafData);
  };
  treeDataObj.nodes = treeDataArr;
  return treeDataObj;
}

function collectDataFromTree(apiTree) {
  var tree = apiTree;
  var nodesArr = [];
  var treeDataObj = {};
  var dimensionsArr = [];
  var callback = function callback(node) {
    if (node === null) return;
    var nodeData = {};
    nodeData.nodeId = node.nodeId;
    nodeData.column = node.column;
    nodeData.parentId = node.parent === null ? null : node.parent.nodeId;
    nodeData.childrenlevel = node.childrenlevel;
    nodeData.totaloffsetylevel = node.totaloffsetylevel;
    nodeData.data = node.data;
    nodeData.data.hasChild = node.children.length > 0;
    nodesArr.push(nodeData);
  };
  tree.traverseDF(callback);
  dimensionsArr = tree.dimensions();
  treeDataObj.dimensions = {};
  treeDataObj.dimensions.hUnit = dimensionsArr[0];
  treeDataObj.dimensions.vUnit = dimensionsArr[1];
  treeDataObj.nodes = nodesArr;
  return treeDataObj;
}

/***/ }),
/* 132 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./app/javascript/packs/api-tree/treeDom.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * width of single svg path: 30px
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiDom = ApiDom;

var _tree = __webpack_require__(/*! ./tree */ 107);

var _ajax = __webpack_require__(/*! ../common/ajax */ 78);

var _popup = __webpack_require__(/*! ../common/popup */ 83);

var _constant = __webpack_require__(/*! ../global/constant */ 109);

var _flash = __webpack_require__(/*! ../common/flash */ 82);

var _treeDataCollect = __webpack_require__(/*! ./treeDataCollect */ 131);

var _utilities = __webpack_require__(/*! ./utilities */ 133);

var _jsonTreeConverter = __webpack_require__(/*! ./jsonTreeConverter */ 129);

var _twoWayDataBinding = __webpack_require__(/*! ../common/twoWayDataBinding */ 108);

var _callbacks = __webpack_require__(/*! ../common/callbacks */ 134);

var _scroll = __webpack_require__(/*! ../common/scroll */ 138);

var _utilities2 = __webpack_require__(/*! ../common/utilities */ 18);

function perApiTpl(data) {
  var isNewApi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var apiUUID = (0, _utilities2.generateUUID)();
  var tpl = '<div class="api-info">\n          <label class="api-label">API:</label>\n          <input class="api-uri" placeholder="" value="" model="uri" /> \n          <label class="api-label">method:</label>\n          <select class="api-method" model="method">\n              <option value="GET">GET</option>\n              <option value="POST">POST</option>\n              <option value="PATCH">PATCH</option>\n              <option value="DELETE">DELETE</option>\n          </select>\n          <label>section:</label>\n          <input class="api-section" type="text" model="section" />\n          <label for="">description:</label>\n          <input class="api-description" type="text" model="description" />\n          <span class="api-save" data-method="' + patchOrPost(isNewApi) + '" data-action="/apis' + saveOrCreate(data, isNewApi) + '" >' + (isNewApi ? 'create' : 'save') + '</span>\n          <span class="api-respond-preview-btn">preview</span>\n          <span class="api-wiki" bind-toggle-class bind="wikiLink">\n            <label class="api-wiki-label">Wiki: </label>\n            <input class="api-wiki-input" type="text" model="wikiLink" />\n          </span>\n      </div>\n      <div class="api-modes-row">\n        <label class="api-mode-label"><input class="api-mode" type="radio" name="' + apiUUID + '-mode" value="0">\u5F00\u53D1</label>\n        <label class="api-mode-label api-mode-debug"><input class="api-mode" type="radio" name="' + apiUUID + '-mode" value="1">\u8054\u8C03<input class="mode-debugging-addr" type="text" /></label>\n        <label class="api-mode-label"><input class="api-mode" type="radio" name="' + apiUUID + '-mode" value="2">\u7EBF\u4E0A</label>\n      </div>\n      <div class="api-tree-wrapper">\n        <div class="api-tree-content-wrapper">\n          <div class="api-tree-content">\n            <div class="api-tree-frame">\n              <svg class="api-svg" width="100%" height="100%"></svg>\n            </div>\n            <div class="api-tree"></div>\n          </div>\n        </div>\n      </div>\n      <div class="api-respond-preview">\n          <div class="preview-control-wrapper">\n            <div class="preview-control">\n                <span class="per-preview-type preview-raw">raw</span>\n                <span class="per-preview-type preview-beautify">beautify</span>\n                <span class="per-preview-type preview-highlight">syntaxHighlight</span>\n            </div>\n          </div>\n          <div class="data-view json">\n          </div>\n      </div>';
  return tpl;
}

function leafTpl() {
  var leafContentTpl = '\n    <i class="remove-child">-</i>\n    <input type="text" class="leaf-key" placeholder="key" model="dataName" />\n    <i class="gap-mark">---</i>\n    <input type="text" class="leaf-value" placeholder="value" model="dataValue" />\n    <select class="leaf-value-type" model="dataType">\n        <option value="String">String</option>\n        <option value="Integer">Integer</option>\n        <option value="Float">Float</option>\n        <option value="Boolean">Boolean</option>\n        <option value="Array">Array</option>\n        <option value="Hash">Hash</option>\n        <option value="Regex">Regex(string)</option>\n        <option value="Fixed">Fixed(string)</option>\n        <option value="Null">Null</option>\n    </select>\n    <i class="gap-mark">---</i>\n    <i class="add-child">+</i>\n    <input type="text" class="leaf-quantity" placeholder="quantity" model="dataQuantity" />\n    <span class="leaf-hide-quantity"></span>\n  ';
  return leafContentTpl;
}

/* default getBoundingRectObj */
var initRectObj = {
  right: 0,
  bottom: 0,
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

var leafDataPlaceHolder = {
  dataName: '',
  dataType: 'String',
  dataValue: '',
  dataQuantity: '1',
  hasChild: false

  /*
  single leaf width: 460px;
   */
};var perLeafWidth = 460;
var perLeafHeight = 22;
var leavesVerticalGap = 30;
var perSVGPathWidth = 30;
var rootNodeWidth = perSVGPathWidth + 14;
var callback = {
  patchSuccess: function patchSuccess(data) {
    this.apiRawData = data;
    this.apiDataObj = JSON.parse(data).data;
    (0, _flash.parseAndFlash)(data);
  },
  postSuccess: function postSuccess(data) {
    this.apiRawData = data;
    this.apiDataObj = JSON.parse(data).data;
    (0, _flash.parseAndFlash)(data);
    this.apiContainer.getElementsByClassName('api-save')[0].textContent = 'save';
    this.apiContainer.getElementsByClassName('api-save')[0].dataset.method = 'PATCH';
  },
  deleteSuccess: function deleteSuccess(data) {
    function destoryApiLi() {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
    }
    (0, _flash.parseAndFlash)(data, destoryApiLi.bind(this));
  },
  success: function success(data) {},
  error: function error(data) {
    (0, _flash.parseAndFlash)(data);
  },
  apiRespondSuccess: function apiRespondSuccess(data) {
    var jsonObj = JSON.parse(data);
    this.previewData = data;
    this.previewDataObj = jsonObj;
    switchPreview(this.previewDataObj, _utilities.hightlightJSON, this.eventContext, 'highlight');
  }
};

function patchOrPost(isNewApi) {
  return isNewApi ? 'POST' : 'PATCH';
}

function saveOrCreate(data, isNewApi) {
  return isNewApi ? '' : '/' + data.id;
}

function createPerApi(data, isNewApi) {
  var perApiEle = document.createElement('div');
  perApiEle.setAttribute('class', 'per-api');
  perApiEle.dataset.id = isNewApi ? '' : data.id;
  perApiEle.innerHTML = perApiTpl(data, isNewApi);
  perApiEle.getElementsByClassName('api-uri')[0].value = isNewApi ? '' : data.uri;
  return perApiEle;
}
function createNewApiInitData() {
  var initData = {
    nodeId: 0,
    parentId: null,
    data: leafDataPlaceHolder
  };
  var firstChildData = {
    nodeId: 1,
    parentId: 0,
    data: leafDataPlaceHolder
  };
  return {
    mode: '0',
    debugAddr: '',
    nodes: [initData, firstChildData]
  };
}

function ApiDom(data, containerNode) {
  var isNewApi = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (isNewApi) {
    data = createNewApiInitData();
  }
  this.apiDataObj = data;
  this.apiContainer = containerNode;
  var perApiEle = createPerApi(data, isNewApi);
  this.apiContainer.appendChild(perApiEle);

  var apiBindData = (0, _twoWayDataBinding.twoWayDataBinding)(data, this.apiContainer);
  data = apiBindData;

  this.apiEle = this.apiContainer.getElementsByClassName('per-api')[0];

  this.leafIndex = 1;

  this.$apiTree = this.apiEle.getElementsByClassName('api-tree')[0];
  this.$apiTreeFrame = this.apiEle.getElementsByClassName('api-tree-frame')[0];
  this.$apiTreeContent = this.apiEle.getElementsByClassName('api-tree-content')[0];
  // if (isNewApi) {
  //   this.initApiTree();
  //   this.calcDimensions();
  // } else {
  this.renderExistTree(data);
  // }

  this.apiReturnData = '';

  this.apiEle.addEventListener('click', bindEvent.bind(this));
  this.setModeVal(data.mode);
  this.setDebugAddr(data.debugAddr);
  this.scrollBar = (0, _scroll.scrollBarH)({
    wrapper: this.apiContainer.getElementsByClassName('api-tree-wrapper')[0],
    content: this.apiContainer.getElementsByClassName('api-tree-content-wrapper')[0],
    overflowEle: this.apiContainer.getElementsByClassName('api-tree-content')[0]
  });
}

ApiDom.prototype.renderExistTree = function (data) {
  var docFrag = document.createDocumentFragment();

  var perTWDBArr = [];
  if (data.nodes && data.nodes.length) {
    var nodesArr = data.nodes;
    var nodeData = {};
    var leaf = void 0;
    var leafData = {};
    var perTWDB = void 0;
    for (var i = 0, len = nodesArr.length; i < len; i++) {
      leaf = undefined;
      leaf = generateLeaf(data.nodes[i]);
      if (data.nodes[i].data === undefined || data.nodes[i].data === '') {
        data.nodes[i].data = leafDataPlaceHolder;
      };
      if (data.nodes[i].parentId === null || data.nodes[i].parentId === 'null') leaf.classList.add('root-leaf');
      perTWDB = (0, _twoWayDataBinding.twoWayDataBinding)(data.nodes[i].data, leaf);
      data.nodes[i].data = perTWDB;
      perTWDBArr.push(perTWDB);
      docFrag.appendChild(leaf);
    }
    this.leafIndex += len - 2;
  }
  this.apiTree = (0, _jsonTreeConverter.jsonToTree)(data.nodes);
  this.$apiTree.appendChild(docFrag);
  this.calcDimensions();
  this.drawSVG();
};

function generateLeaf(nodeData) {
  var newLeafSpan = document.createElement('span');
  newLeafSpan.setAttribute('class', 'leaf');
  newLeafSpan.setAttribute('bind', 'hasChild');
  newLeafSpan.setAttribute('bind-toggle-class', '');
  newLeafSpan.dataset.parentId = nodeData.parentId;
  newLeafSpan.dataset.nodeId = nodeData.nodeId;
  newLeafSpan.innerHTML = leafTpl();
  newLeafSpan.style['transform'] = 'translate3d(' + Math.round((perLeafWidth + perSVGPathWidth) * (nodeData.column - 1)) + 'px, ' + Math.round(nodeData.totaloffsetylevel * (perLeafHeight + leavesVerticalGap)) + 'px, 0)';
  return newLeafSpan;
}
ApiDom.prototype.setDebugAddr = function (val) {
  this.apiContainer.getElementsByClassName('mode-debugging-addr')[0].value = val;
};
ApiDom.prototype.setModeVal = function (val) {
  var radios = this.apiContainer.getElementsByClassName('api-mode');
  for (var i = 0, length = radios.length; i < length; i++) {
    if (val === radios[i].value) {
      radios[i].setAttribute('checked', true);
      break;
    } else {
      radios[i].setAttribute('checked', false);
    }
  }
};
function bindEvent(ev) {
  /* _$this is ApiDom, while this is its wrapper(object). */
  var _this = this;
  var evTargetClassList = ev.target.classList;
  var eventContext = { _ev: ev, domContainer: ev.target.closest('.api-li') };
  this.eventContext = eventContext;
  if (evTargetClassList.contains('api-save')) {
    var params = (0, _treeDataCollect.collectApiData)(_this.apiTree, _this.$apiTree);
    if (this.apiDataObj.id) {
      (0, _ajax.$http)(_constant.rootAPI + '/' + this.apiDataObj.id).patch(params, 'api').then(callback.patchSuccess.bind(this)).catch(callback.error);
    } else if (!this.apiDataObj.id) {
      (0, _ajax.$http)(_constant.rootAPI).post(params, 'api').then(callback.postSuccess.bind(this)).catch(callback.error);
    }
    return null;
  };

  if (evTargetClassList.contains('add-child')) {
    _this.addChild(ev);
    return null;
  };

  if (evTargetClassList.contains('remove-child')) {
    if (ev.target.parentElement.classList.contains('root-leaf')) {
      (0, _popup.popup)(ev, {}, deleteApi.bind(_this, ev));
    } else {
      _this.delNode(ev);
    }
    return null;
  };

  if (evTargetClassList.contains('api-respond-preview-btn')) {
    if (!this.apiDataObj.id) {
      (0, _flash.flash)({ error: 'Save first.' });
      return null;
    };
    var _params = { dawn_uri: this.apiDataObj.uri };
    var context = {};
    (0, _ajax.$http)(window.location.origin + '/apiresponse').get(_params).then(callback.apiRespondSuccess.bind(this)).catch(callback.error);
    return null;
  };

  if (evTargetClassList.contains('api-wiki-label')) {
    ev.target.closest('.api-wiki').classList.toggle('toggle-true');
  }
  if (evTargetClassList.contains('preview-raw')) {
    return switchPreview(this.previewDataObj, JSON.stringify, this.eventContext, 'raw');
  };

  if (evTargetClassList.contains('preview-beautify')) {
    return switchPreview(this.previewDataObj, _utilities.beautifyJSON, this.eventContext, 'beautify');
  };

  if (evTargetClassList.contains('preview-highlight')) {
    return switchPreview(this.previewDataObj, _utilities.hightlightJSON, this.eventContext, 'highlight');
  };
}

function switchPreview(dataObj, fn, previewContext, previewType) {
  var previewStr = fn.call(null, dataObj);
  jsonView.call(previewContext.domContainer, previewStr);
  switchPreviewStatus(previewContext, previewType);
  return null;
}

function switchPreviewStatus(previewContext, applyType) {
  var previewTypes = ['raw', 'beautify', 'highlight'];
  var apiRespondPreviewEle = previewContext.domContainer.getElementsByClassName('api-respond-preview')[0];
  var apiRespondPreviewEleClassArr = apiRespondPreviewEle.className.trim().split(' ');
  apiRespondPreviewEleClassArr.forEach(function (element, index, array) {
    var idx = previewTypes.indexOf(element);
    if (idx > -1) {
      array.splice(array.indexOf(element), 1);
    }
  });
  var previewTypeElesArr = [].slice.call(previewContext.domContainer.getElementsByClassName('per-preview-type'));
  previewTypeElesArr.forEach(function (element, index) {
    element.classList.remove('active');
  });
  previewContext.domContainer.getElementsByClassName('preview-' + applyType)[0].classList.add('active');
  apiRespondPreviewEle.className = apiRespondPreviewEleClassArr.join(' ');
  apiRespondPreviewEle.classList.add(applyType);
}

function apiSave() {}
function addLeafChild() {}
function removeLeafChild() {}
function apiTest() {}
function jsonView(data) {
  var $pre = document.createElement('pre');
  $pre.innerHTML = data;
  var $dataViewEle = this.getElementsByClassName('data-view')[0];
  $dataViewEle.innerHTML = '';
  $dataViewEle.appendChild($pre);
}

function deleteApi(ev) {
  if (!this.apiDataObj.id) {
    ev.target.closest('.api-ul').removeChild(ev.target.closest('.api-li'));
    return null;
  };

  var params = {};
  console.log(_constant.rootAPI);
  (0, _ajax.$http)(_constant.rootAPI + '/' + this.apiDataObj.id).delete(params).then(_callbacks.callbacks.deleteSuccess.bind(ev)).catch(_callbacks.callbacks.error);
}

ApiDom.prototype.storeApiReturnData = function (data) {
  this.apiReturnData = data;
  this.$dataBeautify.click();
};

ApiDom.prototype.initApiTree = function () {
  var initData = {
    nodeId: 0,
    data: leafDataPlaceHolder
  };
  var firstChildData = {
    nodeId: 1,
    data: leafDataPlaceHolder
  };
  this.apiTree = new _tree.Tree(initData);
  this.apiTree.add(firstChildData, 0, this.apiTree.traverseBF);

  var treeDocFrag = document.createDocumentFragment();

  var callback = function callback(node) {
    var leafEle = void 0;
    var leafBindData = void 0;
    node.parentId = node.parent ? node.parent.nodeId : null;
    leafEle = generateLeaf(node);
    leafBindData = (0, _twoWayDataBinding.twoWayDataBinding)(leafDataPlaceHolder, leafEle);
    node.data = leafBindData;
    if (node.parentId === null || node.parentId === 'null') leafEle.classList.add('root-leaf');
    treeDocFrag.appendChild(leafEle);
  };

  this.apiTree.traverseBF(callback);
  this.$apiTree.appendChild(treeDocFrag);

  return this.apiTree;
};

ApiDom.prototype.delNode = function (ctx) {
  var currentLeaf = ctx.target.closest('.leaf');
  var currentIdx = +ctx.target.parentNode.dataset.nodeId;
  var parentIdx = +ctx.target.parentNode.dataset.parentId === 0 ? 0 : +ctx.target.parentNode.dataset.parentId;

  var nodesArr = this.apiTree.traverseDescendants(currentIdx);
  var idxArr = nodesArrToIdxArr(nodesArr);
  this.apiTree.remove(currentIdx, parentIdx, this.apiTree.traverseBF);
  this.removeNodesFromDom(idxArr);

  var obj = this.apiTree.applyStyle();
  this.styleNodes(obj);
  this.setParentNodeVal(parentIdx);
  this.scrollBar.render();
};
ApiDom.prototype.removeNodesFromDom = function (arr) {
  var allLeaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
  var allLeavesLen = allLeaves.length;
  for (var i = 0; i < allLeavesLen; i++) {
    if (arr.indexOf(+allLeaves[i].dataset.nodeId) !== -1) {
      this.$apiTree.removeChild(allLeaves[i]);
    }
  };
};
function nodesArrToIdxArr(nodesArr) {
  var nodesArrLen = nodesArr.length;
  var idxArr = [];
  for (var i = 0; i < nodesArrLen; i++) {
    idxArr.push(nodesArr[i].nodeId);
  };
  return idxArr;
}

ApiDom.prototype.setParentNodeVal = function (idx) {
  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
  var queue = this.apiTree.traverseDirectChild(idx);
  var queueLen = queue._newestIndex - queue._oldestIndex;
  for (var i = 0, x = leaves.length; i < x; i++) {
    if (+leaves[i].dataset.nodeId === idx) {
      if (queueLen > 0) {
        // leaves[i].getElementsByClassName('leaf-value')[0].value = '';
      } else {
          // leaves[i].getElementsByClassName('leaf-value')[0].value = '';
        };
      break;
    };
  };
};

ApiDom.prototype.addChild = function (ctx) {
  this.leafIndex = this.apiTree.maxId() + 1;
  var parentIdex = +ctx.target.parentNode.dataset.nodeId;

  var leafChild = createLeaf(parentIdex, this.leafIndex);
  var childModel = (0, _twoWayDataBinding.twoWayDataBinding)(leafDataPlaceHolder, leafChild);
  var leafData = {
    nodeId: this.leafIndex,
    data: childModel
  };
  this.apiTree.add(leafData, parentIdex, this.apiTree.traverseBF);
  this.$apiTree.appendChild(leafChild);
  var obj = this.apiTree.applyStyle();
  this.styleNodes(obj);
  this.setParentNodeVal(parentIdex);
  this.scrollBar.render();
};

function generateLeafSpan(parentId, nodeIndex) {
  var newLeafSpan = document.createElement('span');
  newLeafSpan.setAttribute('class', 'leaf');
  newLeafSpan.setAttribute('bind', 'hasChild');
  newLeafSpan.setAttribute('bind-toggle-class', '');
  newLeafSpan.dataset.parentId = parentId;
  newLeafSpan.dataset.nodeId = nodeIndex;
  newLeafSpan.innerHTML = leafTpl();
  return newLeafSpan;
}
function createLeaf(parentIdx, nodeIdx) {
  return generateLeafSpan(parentIdx, nodeIdx);
}
ApiDom.prototype.styleNodes = function () {
  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));

  var leavesHash = {};
  for (var i = 0, leavesLen = leaves.length; i < leavesLen; i++) {
    leavesHash[leaves[i].dataset.nodeId] = leaves[i];
  }
  var callback = function callback(node) {
    if (node.nodeId <= 0) return;
    leavesHash[node.nodeId].style['transform'] = 'translate3d(' + Math.round((perLeafWidth + perSVGPathWidth) * (node.column - 1)) + 'px, ' + Math.round(node.totaloffsetylevel * (perLeafHeight + leavesVerticalGap)) + 'px, 0)';
  };
  this.apiTree.traverseBF(callback);
  this.dimensionArr = this.calcDimensions();
  this.drawSVG();
};

/* utils */
function cloneRectObj(obj) {
  return {
    top: obj.top,
    bottom: obj.bottom,
    left: obj.left,
    right: obj.right,
    width: obj.width,
    height: obj.height
  };
}

/* manipulate SVG */
ApiDom.prototype.clearSVG = function () {
  var svg = this.$apiTreeFrame.getElementsByClassName('api-svg')[0];
  while (svg.lastChild) {
    svg.removeChild(svg.lastChild);
  }
};
/**
 * [drawSVG description]
 * @return {[type]} [description]
 */
ApiDom.prototype.drawSVG = function () {
  this.clearSVG();
  var that = this;
  var svgPartials = [];
  var callback = function callback(node) {
    if (node.parent !== null) {
      svgPartials.push(that.createSingleSVG(node.nodeId, node.column, node.parent.totaloffsetylevel, node.totaloffsetylevel - node.parent.totaloffsetylevel));
    };
  };
  this.apiTree.traverseDF(callback);

  var docFrag = document.createDocumentFragment();
  for (var i = 0; i < svgPartials.length; i++) {
    docFrag.appendChild(svgPartials[i]);
  }
  this.$apiTreeFrame.getElementsByClassName('api-svg')[0].appendChild(docFrag);
};

ApiDom.prototype.createSingleSVG = function (idx, hori, parentVert, dvert) {
  var svgns = 'http://www.w3.org/2000/svg';
  var newPath = document.createElementNS(svgns, 'path');
  var controlRate = 0.2;
  var mx, my, qx, qy, qxx, qyy, tx, ty;
  hori = hori - 1;
  dvert = dvert;
  parentVert = parentVert;

  mx = hori * 490; /* single leaf width plus single svg path width */
  my = parentVert * 52 + 8;
  qx = mx + 10;
  qy = my;
  qxx = mx + 15;
  qyy = my + dvert / 2 * 52;
  tx = mx + 30;
  ty = my + dvert * 52;

  newPath.setAttributeNS(null, 'd', 'M ' + mx + ' ' + my + ' Q ' + qx + ' ' + qy + ', ' + qxx + ' ' + qyy + ' T ' + tx + ' ' + ty + '');
  newPath.setAttribute('class', 'api-svg-path');
  newPath.setAttribute('data-idx', idx);

  return newPath;
};

/* calculate dimensions */
ApiDom.prototype.calcDimensions = function () {
  var horiMax,
      verticalMax,
      horiArr = [],
      vertArr = [];

  horiArr = this.apiTree.depth();
  horiMax = Math.max.apply(null, horiArr);
  verticalMax = this.apiTree._root.childrenlevel;
  this.$apiTreeFrame.style.width = horiMax * 520 + 'px';
  this.$apiTreeContent.style.width = horiMax * 520 + 'px';
  this.$apiTreeFrame.style.height = verticalMax * 52 - (verticalMax > 1 ? 10 : 0) + 'px';
  this.$apiTreeContent.style.height = verticalMax * 52 - (verticalMax > 1 ? 10 : 0) + 'px';
  return [horiMax, verticalMax];
};

/* calculate offset */

ApiDom.prototype.nodeLeftOffset = function (el) {
  var elRectObject = el.getBoundingClientRect();
  var bodyRectObj = this.$apiTree.getBoundingClientRect();
  var cloneBodyRectObj = cloneRectObj(bodyRectObj);
  var cloneElRectObject = cloneRectObj(elRectObject);
  cloneElRectObject.top += Math.abs(cloneBodyRectObj.top);
  cloneElRectObject.bottom += Math.abs(cloneBodyRectObj.top);
  cloneElRectObject.left += Math.abs(cloneBodyRectObj.left);
  cloneElRectObject.right += Math.abs(cloneBodyRectObj.left);
  return cloneElRectObject;
};

/***/ }),
/* 133 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./app/javascript/packs/api-tree/utilities.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 48);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getMaxOfArray = getMaxOfArray;
exports.hasClass = hasClass;
exports.browserPrefix = browserPrefix;
exports.getTransform = getTransform;
exports.getTranslateX = getTranslateX;
exports.getTranslateY = getTranslateY;
exports.beautifyJSON = beautifyJSON;
exports.hightlightJSON = hightlightJSON;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

function browserPrefix() {
  var ua = navigator.userAgent.toLowerCase(),
      prefix = '';
  prefix = ua.indexOf('chrome') >= 0 || window.openDatabase ? '-webkit-' : ua.indexOf('firefox') >= 0 ? '-moz-' : window.opera ? '-o-' : document.all && navigator.userAgent.indexOf('Opera') === -1 ? '-ms-' : '';
  return prefix;
}

function getTransform(el) {
  var transform = window.getComputedStyle(el, null).getPropertyValue('-webkit-transform');
  var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);

  if (!results) return [0, 0, 0];
  if (results[1] == '3d') return results.slice(2, 5);

  results.push(0);
  return results.slice(5, 8); // returns the [X,Y,Z,1] values
}

// export function getTranslateX(el) {
//   // chrome won't use prefix
//   // var style_attr = browserPrefix() + 'transform';
//   var style_attr = 'transform';
//   var transform = window.getComputedStyle(el, null).getPropertyValue(style_attr);
//   var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
//   if (!results) return [0, 0, 0];
//   if (results[1] === '3d') return results.slice(2,5);
//   results.push(0);
//   return +(results.slice(5, 8)[0]); // returns the [X,Y,Z,1] values
// }

function getTranslateX(el) {
  return el.getAttribute('style').split('translate3d')[1].split(', ')[0].slice(1).split('px')[0];
}

function getTranslateY(obj) {
  if (!window.getComputedStyle) return;
  var style = getComputedStyle(obj),
      transform = style.transform || style.webkitTransform || style.mozTransform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
}

function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p,
          v = obj[p];
      str.push((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}

/**
 * [stringify with 4 spaces at each level]
 * @param  {[object]} jsObj [description]
 * @return {[string]}       [description]
 * JSON.stringify(jsObj, null, "\t"); // stringify with tabs inserted at each level
 */
function beautifyJSON(jsObj) {
  return JSON.stringify(jsObj, null, 4);
}

/**
 * [hightlightJSON works on JSON object, not string]
 * @param  {JSON object} json [description]
 * @return {string}      [description]
 */
function hightlightJSON(json) {
  json = JSON.stringify(json, undefined, 4);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

/***/ }),
/* 134 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./app/javascript/packs/common/callbacks.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbacks = undefined;

var _flash = __webpack_require__(/*! ./flash */ 82);

var callbacks = exports.callbacks = {
  deleteSuccess: function deleteSuccess(data) {
    function destoryApiLi() {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
    }
    (0, _flash.parseAndFlash)(data, destoryApiLi.bind(this));
  },
  success: function success(data) {},
  error: function error(data) {
    (0, _flash.parseAndFlash)(data);
  }
};

/***/ }),
/* 135 */,
/* 136 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./app/javascript/packs/common/htmlEscape.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
          value: true
});
exports.htmlEscape = htmlEscape;
function htmlEscape(str) {
          str = '' + str; // for numbers etc.
          return str.replace(/&/g, '&amp;') // first!
          .replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/`/g, '&#96;');
}

/***/ }),
/* 137 */,
/* 138 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./app/javascript/packs/common/scroll.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollBarH = scrollBarH;

var _utilities = __webpack_require__(/*! ./utilities */ 18);

function generateScrollStr() {
  var scrollStr = '\n    <div class="opui-scroll-ctrl-scroll">\n        <div class="opui-scroll-axis"></div>\n        <div class="opui-scroll-slider">\n            <div class="opui-scroll-s-top"></div>\n            <div class="opui-scroll-s-bottom"></div>\n            <div class="opui-scroll-s-block"></div>\n        </div>\n    </div>\n    ';
  return scrollStr;
}

function scrollBarH(b) {
  return new a(b);
}

function a(x) {
  var q = this;
  this.options = x;
  var newScrollStr = generateScrollStr();
  var newScrollEle = (0, _utilities.strToDom)(newScrollStr);
  var Y = x.scrollbar || newScrollEle,
      j = x.content,
      N = x.overflowEle,
      i = x.initPos || 0,
      M = x.initDom || null,
      U = x.mousewheel || true,
      l = x.mousewheellock || false,
      H = x.wheeldelta || 1,
      z = x.ctrlblock || 0,
      J = x.step || 0.1,
      r = x.length,
      I = x.scale || 0,
      G = x.theme || '',
      ad = x.refresh || false;
  var S = 0,
      T = 0,
      h = 0,
      V = function V(ag) {
    var af = parseInt(S - T);
    if (af > 0) {
      var ag = ag.value;
      j.scrollLeft = af * ag;
    }
  },
      v = newScrollEle.getElementsByClassName('opui-scroll-axis')[0],
      g = newScrollEle.getElementsByClassName('opui-scroll-slider')[0],
      u = newScrollEle.getElementsByClassName('opui-scroll-s-top')[0],
      F = newScrollEle.getElementsByClassName('opui-scroll-s-bottom')[0],
      ae = newScrollEle.getElementsByClassName('opui-scroll-s-block')[0],
      W = 0,
      Q = z || 0,
      k = 0,
      R = Q,
      m = 0,
      C = 0,
      L = 0,
      d = 0,
      t = null,
      b = null,
      ab,
      P,
      D;
  var y = function y() {
    X = false;
    c = false;
  };

  if (!x.scrollbar) {
    x.wrapper.appendChild(newScrollEle);
  }
  j.classList.add('opui-scroll-ctrl-content');
  Y.classList.add('opui-scroll-ctrl-scroll');
  this.render = function (ag) {
    if (!ad) {
      clearInterval(D);
    }
    try {
      T = j.offsetWidth;
      h = Y.offsetWidth;
      S = N.offsetWidth;
    } catch (ah) {}
    W = ag || r || T - 2;
    Y.style.width = W + 'px';
    v.style.width = W + 'px';
    if (W >= 0 && S >= 0) {
      if (S <= W + 2) {
        Y.style.display = 'none';
      } else {
        Y.style.display = 'block';
      }
      if (I != S / W) {
        I = S / W;
        o(I);
        Z(q.memOffsetX);
      }
      var af = 0;
      if (M) {
        if (M.offsetLeft + M.scrollWidth >= S) {
          af = 1;
        } else {
          if (M.offsetLeft + M.scrollWidth <= T) {
            af = 0;
          } else {
            af = M.offsetLeft / S;
          }
        }
        console.log(af);
        Z(af);
      }
      if (i) {
        console.log(i);
        Z(i);
      }
    }
  };

  D = setInterval(this.render, 50);
  // Y.innerHTML = '';

  g.onDragstart = function () {
    return false;
  };

  g.addEventListener('mouseover', function () {
    g.classList.add('opui-scroll-slider-hover');
    Y.classList.add('opui-scroll-ctrl-scroll-hover');
  });
  g.addEventListener('mousedown', function () {
    g.classList.add('opui-scroll-slider-touch');
    Y.classList.add('opui-scroll-ctrl-scroll-touch');
  });
  g.addEventListener('mouseout', function () {
    g.classList.remove('opui-scroll-slider-hover');
  });
  g.addEventListener('mouseup', function () {
    g.classList.remove('opui-scroll-slider-touch');
  });
  Y.addEventListener('mouseover', function () {
    Y.classList.add('opui-scroll-ctrl-scroll-hover');
  });
  Y.addEventListener('mousedown', function () {
    Y.classList.add('opui-scroll-ctrl-scroll-touch');
  });
  Y.addEventListener('mouseout', function () {
    Y.classList.remove('opui-scroll-ctrl-scroll-hover');
  });
  Y.addEventListener('mouseup', function () {
    Y.classList.remove('opui-scroll-ctrl-scroll-touch');
  });
  v.addEventListener('click', s);
  if (U && !this.onwheel) {
    if (!j.classList.contains('opui-scroll-onwheel')) {
      j.addEventListener('DOMMouseScroll', p);
      j.addEventListener('mousewheel', p);
      j.classList.add('opui-scroll-onwheel');
    }
  }
  if (j) {
    j.addEventListener('scroll', function () {
      if (!d) {
        Z(j.scrollLeft / (j.scrollWidth - j.offsetWidth), 1);
      }
    });
  }

  g.addEventListener('mousedown', function (af) {
    t = document.onselectstart;
    document.onselectstart = function () {
      return false;
    };

    b = window.setInterval(n, 40);
    N.style['-moz-user-select'] = 'none';
    N.style['-webkit-user-select'] = 'none';

    L = af.clientX - g.offsetLeft;
    document.addEventListener('mousemove', f);
    document.addEventListener('mouseup', aa);
    d = 1;
    af.preventDefault();
    return false;
  });
  function K(ag, ah, af) {
    if (af) {
      ag = ag > af ? af : ag;
    }
    return ag >= ah ? ag : ah;
  }
  function n() {
    V.call(window, {
      value: C,
      scale: I
    });
  }
  function O() {
    if (ab) {
      clearInterval(ab);
    }
    E();
    ab = setInterval(function () {
      if (X) {
        E();
      } else {
        clearInterval(ab);
      }
    }, 100);
  }
  function ac() {
    if (P) {
      clearInterval(P);
    }
    B();
    P = setInterval(function () {
      if (c) {
        B();
      } else {
        clearInterval(P);
      }
    }, 100);
  }
  function E() {
    var af = C - J;
    af = af < 0 ? 0 : af;
    Z(af);
  }
  function B() {
    var af = C + J;
    af = af > 1 ? 1 : af;
    Z(af);
  }
  function f(af) {
    af = window.event || af;
    var ag = K(af.clientX - L, R, m);
    C = (ag - R) / (m - R);
    g.style.left = ag + 'px';
    q.memOffsetX = ag;
    return false;
  }
  function aa() {
    Y.classList.remove('opui-scroll-ctrl-scroll-hover');
    Y.classList.remove('opui-scroll-ctrl-scroll-touch');
    g.classList.remove('opui-scroll-slider-hover');
    g.classList.remove('opui-scroll-slider-touch');
    N.style['-moz-user-select'] = '';
    N.style['-webkit-user-select'] = '';
    if (b) {
      window.clearInterval(b);
    }
    if (t) {
      document.onselectstart = t;
    } else {
      document.onselectstart = function () {
        return true;
      };
    }
    document.removeEventListener('mousemove', f);
    document.removeEventListener('mouseup', aa);
    g.classList.add('opui-scroll-slider');
    d = 0;
    return false;
  }
  function s(af) {
    Z((af.offsetX || af.layerX) / W);
  }
  function Z(ah, af) {
    ah = ah < 0 ? 0 : ah;
    ah = ah > 1 ? 1 : ah;
    C = ah;
    var ag = (m - R) * C + R;
    g.style.left = ag + 'px';
    q.memOffsetX = ag;
    if (!af) {
      n();
    }
  }
  function p(af) {
    // af.preventDefault();
    // af = af.originalEvent;
    // if (af) {
    //   this.onwheel = 1;
    //   var ai = (-af.wheelDelta || (af.detail && af.detail * 40) || 0) / H;
    //   var ah = ai;
    //   var ag = ah > 0 ? j.scrollLeft + 2 : j.scrollLeft - 2;
    //   N.style.zoom = '1';
    //   if (ag > 0 && (ag < (N.offsetWidth - j.offsetWidth + 5) || (N.offsetWidth - j.scrollWidth < 0 && ah < 0))) {
    //     j.scrollLeft += ah;
    //     C = j.scrollLeft / (j.scrollWidth - j.offsetWidth);
    //   } else {
    //     if (!l || Y.style.display == 'none') {
    //       document.documentElement.scrollLeft += ah;
    //       document.body.scrollLeft += ah;
    //     }
    //   }
    // }
  }
  function o(af) {
    I = af > 10 ? 10 : af;
    if (I <= 1) {
      g.style.display = 'none';
      return;
    }
    g.style.display = 'block';
    var ag = W - 2 * Q;
    k = parseInt(ag / I);
    k = k < 15 ? 15 : k;
    m = W - Q - k;
    g.style.width = k + 'px';
  }
  if (I > 1) {
    o(I);
  }
  var debouncedWindowResize = (0, _utilities.debounce)(reRender, 200, false);
  window.addEventListener('resize', debouncedWindowResize);
  function reRender() {
    q.render();
  }
  this.dispose = function () {
    if (t) {
      document.onselectstart = t;
    } else {
      document.onselectstart = function () {
        return true;
      };
    }
    document.removeEventListener('mousemove', f);
    document.removeEventListener('mouseup', aa);
    document.removeEventListener('mouseup', y);
    if (b) {
      clearInterval(b);
    }
    if (ab) {
      clearInterval(ab);
    }
    if (P) {
      clearInterval(P);
    }
    if (D) {
      clearInterval(D);
    }
  };
}

/***/ }),
/* 139 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./app/javascript/packs/common/slide.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slide = slide;

var _popup = __webpack_require__(/*! ../common/popup */ 83);

function slide(ev, params, callback) {
  var slideEle = document.createElement('div');
  slideEle.classList.add('slide-layer');
  slideEle.innerHTML = generateSlideTpl(params.content);
  positionSlideEle(slideEle, ev);
  bindSlideEvents(slideEle, ev, params, callback);
  document.body.appendChild(slideEle);
}

function generateSlideTpl(content) {
  var tpl = '\n    <div class="slide-shadow">\n      <div class="slide-content">\n\t\t\t\t<div class="slide-text">' + content + '</div>\n\t\t\t\t<div class="slide-btns">\n\t\t\t\t\t<span class="slide-btn slide-cancel-btn">cancel</span>\n\t\t\t\t\t<span class="slide-btn slide-confirm-btn">confirm</span>\n\t\t\t\t</div>\n      </div>\n    </div>\n\t';
  return tpl;
}

function bindSlideEvents(ele, ev, params, callback) {
  ele.getElementsByClassName('slide-cancel-btn')[0].addEventListener('click', closeSlide);
  ele.getElementsByClassName('slide-shadow')[0].addEventListener('click', clickShadow);
  ele.getElementsByClassName('slide-confirm-btn')[0].addEventListener('click', confirm.bind(this, ev, ele, params, callback));
}

function confirm(ev, ele, params, callback) {
  callback();
  document.body.removeChild(ele);
}

function positionSlideEle(ele, coordinates) {
  // ele.getElementsByClassName('slide-content')[0].style.transform = 'translate3d(' + coordinates.clientX + 'px, ' + coordinates.clientY + 'px, 0)';
}

function clickShadow(ev) {
  if (ev.target !== ev.currentTarget) return;
  (0, _popup.popup)(ev, undefined, closeSlide.bind(this, ev));
}

function closeSlide(ev) {
  var popLayer = ev.target.closest('.slide-layer');
  if (popLayer) {
    document.body.removeChild(popLayer);
  }
}

/***/ }),
/* 140 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./app/javascript/packs/common/template.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = html;

var _htmlEscape = __webpack_require__(/*! ./htmlEscape */ 136);

function html(literalSections) {
  // Use raw literal sections: we don’t want
  // backslashes (\n etc.) to be interpreted
  var raw = literalSections.raw;

  var result = '';

  for (var _len = arguments.length, substs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    substs[_key - 1] = arguments[_key];
  }

  substs.forEach(function (subst, i) {
    // Retrieve the literal section preceding
    // the current substitution
    var lit = raw[i];

    // In the example, map() returns an array:
    // If substitution is an array (and not a string),
    // we turn it into a string
    if (Array.isArray(subst)) {
      subst = subst.join('');
    }

    // If the substitution is preceded by a dollar sign,
    // we escape special characters in it
    if (lit.endsWith('$')) {
      subst = (0, _htmlEscape.htmlEscape)(subst);
      lit = lit.slice(0, -1);
    }
    result += lit;
    result += subst;
  });
  // Take care of last literal section
  // (Never fails, because an empty template string
  // produces one literal section, an empty string)
  result += raw[raw.length - 1]; // (A)

  return result;
}

/***/ }),
/* 141 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./app/javascript/packs/entries/apiOperation.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _apiOperation = __webpack_require__(/*! ../modules/apiOperation */ 117);

(function () {
  A.init[A.gc.currentName] = _apiOperation.initApiOperation;
  A.destroy[A.gc.currentName] = _apiOperation.disposeApiOperation;
})();

/***/ }),
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/* no static exports found */
/* all exports used */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/core-js/object/define-properties.js ***!
  \*************************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-properties */ 165), __esModule: true };

/***/ }),
/* 158 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/babel-runtime/core-js/object/freeze.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/freeze */ 166), __esModule: true };

/***/ }),
/* 159 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/babel-runtime/helpers/taggedTemplateLiteral.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperties = __webpack_require__(/*! ../core-js/object/define-properties */ 157);

var _defineProperties2 = _interopRequireDefault(_defineProperties);

var _freeze = __webpack_require__(/*! ../core-js/object/freeze */ 158);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (strings, raw) {
  return (0, _freeze2.default)((0, _defineProperties2.default)(strings, {
    raw: {
      value: (0, _freeze2.default)(raw)
    }
  }));
};

/***/ }),
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/library/fn/object/define-properties.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-properties */ 175);
var $Object = __webpack_require__(/*! ../../modules/_core */ 6).Object;
module.exports = function defineProperties(T, D) {
  return $Object.defineProperties(T, D);
};


/***/ }),
/* 166 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/fn/object/freeze.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.freeze */ 176);
module.exports = __webpack_require__(/*! ../../modules/_core */ 6).Object.freeze;


/***/ }),
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-sap.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ 14);
var core = __webpack_require__(/*! ./_core */ 6);
var fails = __webpack_require__(/*! ./_fails */ 9);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 173 */,
/* 174 */,
/* 175 */
/* no static exports found */
/* all exports used */
/*!*******************************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.define-properties.js ***!
  \*******************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ 14);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 1), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ 50) });


/***/ }),
/* 176 */
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.freeze.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ 8);
var meta = __webpack_require__(/*! ./_meta */ 49).onFreeze;

__webpack_require__(/*! ./_object-sap */ 172)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ })
/******/ ]);
//# sourceMappingURL=apiOperation.js.map