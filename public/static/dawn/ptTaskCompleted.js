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
/******/ 	return __webpack_require__(__webpack_require__.s = 162);
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
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_wks.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(/*! ./_shared */ 24)('wks')
  , uid        = __webpack_require__(/*! ./_uid */ 13)
  , Symbol     = __webpack_require__(/*! ./_global */ 0).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_descriptors.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ 10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_has.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 4 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_object-dp.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(/*! ./_an-object */ 7)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 30)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 20)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ 2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 5 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_hide.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(/*! ./_object-dp */ 4)
  , createDesc = __webpack_require__(/*! ./_property-desc */ 11);
module.exports = __webpack_require__(/*! ./_descriptors */ 2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 6 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-iobject.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ 50)
  , defined = __webpack_require__(/*! ./_defined */ 15);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 7 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_an-object.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 9);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 8 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_core.js ***!
  \********************************************/
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 9 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_is-object.js ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 10 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/library/modules/_fails.js ***!
  \*********************************************/
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_property-desc.js ***!
  \*****************************************************/
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 12 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_iterators.js ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 13 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_uid.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 14 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 35)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 22);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 15 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_defined.js ***!
  \***********************************************/
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 16 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_export.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(/*! ./_global */ 0)
  , core      = __webpack_require__(/*! ./_core */ 8)
  , ctx       = __webpack_require__(/*! ./_ctx */ 32)
  , hide      = __webpack_require__(/*! ./_hide */ 5)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
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
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
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
/* 17 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/_set-to-string-tag.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ 4).f
  , has = __webpack_require__(/*! ./_has */ 3)
  , TAG = __webpack_require__(/*! ./_wks */ 1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 18 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_shared-key.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ 24)('keys')
  , uid    = __webpack_require__(/*! ./_uid */ 13);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 19 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_to-integer.js ***!
  \**************************************************/
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 20 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/core-js/library/modules/_to-primitive.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ 9);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_library.js ***!
  \***********************************************/
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 24 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/modules/_shared.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ 0)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 25 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_cof.js ***!
  \*******************************************/
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 26 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_dom-create.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ 9)
  , document = __webpack_require__(/*! ./_global */ 0).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 27 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-pie.js ***!
  \**************************************************/
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 28 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_wks-define.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(/*! ./_global */ 0)
  , core           = __webpack_require__(/*! ./_core */ 8)
  , LIBRARY        = __webpack_require__(/*! ./_library */ 23)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 29)
  , defineProperty = __webpack_require__(/*! ./_object-dp */ 4).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 29 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_wks-ext.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ 1);

/***/ }),
/* 30 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_ie8-dom-define.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ 2) && !__webpack_require__(/*! ./_fails */ 10)(function(){
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 26)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 31 */,
/* 32 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/core-js/library/modules/_ctx.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ 38);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 33 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_iter-define.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(/*! ./_library */ 23)
  , $export        = __webpack_require__(/*! ./_export */ 16)
  , redefine       = __webpack_require__(/*! ./_redefine */ 36)
  , hide           = __webpack_require__(/*! ./_hide */ 5)
  , has            = __webpack_require__(/*! ./_has */ 3)
  , Iterators      = __webpack_require__(/*! ./_iterators */ 12)
  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 51)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 17)
  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 53)
  , ITERATOR       = __webpack_require__(/*! ./_wks */ 1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 34 */
/* no static exports found */
/* all exports used */
/*!*****************************************************!*\
  !*** ./~/core-js/library/modules/_object-create.js ***!
  \*****************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(/*! ./_an-object */ 7)
  , dPs         = __webpack_require__(/*! ./_object-dps */ 45)
  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 22)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 18)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ 26)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ 44).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ./~/core-js/library/modules/_object-keys-internal.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(/*! ./_has */ 3)
  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 6)
  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 49)(false)
  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 18)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 36 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_redefine.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ 5);

/***/ }),
/* 37 */,
/* 38 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_a-function.js ***!
  \**************************************************/
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 39 */
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
/* 40 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopn.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 35)
  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 41 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gops.js ***!
  \***************************************************/
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 42 */
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
/* 43 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-length.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ 19)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 44 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_html.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_global */ 0).document && document.documentElement;

/***/ }),
/* 45 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-dps.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(/*! ./_object-dp */ 4)
  , anObject = __webpack_require__(/*! ./_an-object */ 7)
  , getKeys  = __webpack_require__(/*! ./_object-keys */ 14);

module.exports = __webpack_require__(/*! ./_descriptors */ 2) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 46 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_to-object.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ 15);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 47 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/library/modules/es6.string.iterator.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(/*! ./_string-at */ 54)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ 33)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 48 */
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./~/core-js/library/modules/_add-to-unscopables.js ***!
  \**********************************************************/
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 49 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ./~/core-js/library/modules/_array-includes.js ***!
  \******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ 6)
  , toLength  = __webpack_require__(/*! ./_to-length */ 43)
  , toIndex   = __webpack_require__(/*! ./_to-index */ 55);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 50 */
/* no static exports found */
/* all exports used */
/*!***********************************************!*\
  !*** ./~/core-js/library/modules/_iobject.js ***!
  \***********************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ 25);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 51 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_iter-create.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(/*! ./_object-create */ 34)
  , descriptor     = __webpack_require__(/*! ./_property-desc */ 11)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 17)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ 5)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 52 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_iter-step.js ***!
  \*************************************************/
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 53 */
/* no static exports found */
/* all exports used */
/*!**************************************************!*\
  !*** ./~/core-js/library/modules/_object-gpo.js ***!
  \**************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(/*! ./_has */ 3)
  , toObject    = __webpack_require__(/*! ./_to-object */ 46)
  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 18)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 54 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_string-at.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 19)
  , defined   = __webpack_require__(/*! ./_defined */ 15);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 55 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_to-index.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ 19)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 56 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./~/core-js/library/modules/es6.array.iterator.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 48)
  , step             = __webpack_require__(/*! ./_iter-step */ 52)
  , Iterators        = __webpack_require__(/*! ./_iterators */ 12)
  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ 33)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 57 */
/* no static exports found */
/* all exports used */
/*!***********************************************************!*\
  !*** ./~/core-js/library/modules/es6.object.to-string.js ***!
  \***********************************************************/
/***/ (function(module, exports) {



/***/ }),
/* 58 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/web.dom.iterable.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ 56);
var global        = __webpack_require__(/*! ./_global */ 0)
  , hide          = __webpack_require__(/*! ./_hide */ 5)
  , Iterators     = __webpack_require__(/*! ./_iterators */ 12)
  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 59 */,
/* 60 */,
/* 61 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/babel-runtime/helpers/typeof.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 66);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(/*! ../core-js/symbol */ 65);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 62 */
/* no static exports found */
/* all exports used */
/*!********************************************!*\
  !*** ./~/core-js/library/modules/_meta.js ***!
  \********************************************/
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(/*! ./_uid */ 13)('meta')
  , isObject = __webpack_require__(/*! ./_is-object */ 9)
  , has      = __webpack_require__(/*! ./_has */ 3)
  , setDesc  = __webpack_require__(/*! ./_object-dp */ 4).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ 10)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */
/* no static exports found */
/* all exports used */
/*!*******************************************!*\
  !*** ./~/babel-runtime/core-js/symbol.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 67), __esModule: true };

/***/ }),
/* 66 */
/* no static exports found */
/* all exports used */
/*!****************************************************!*\
  !*** ./~/babel-runtime/core-js/symbol/iterator.js ***!
  \****************************************************/
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 68), __esModule: true };

/***/ }),
/* 67 */
/* no static exports found */
/* all exports used */
/*!**********************************************!*\
  !*** ./~/core-js/library/fn/symbol/index.js ***!
  \**********************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ 74);
__webpack_require__(/*! ../../modules/es6.object.to-string */ 57);
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 75);
__webpack_require__(/*! ../../modules/es7.symbol.observable */ 76);
module.exports = __webpack_require__(/*! ../../modules/_core */ 8).Symbol;

/***/ }),
/* 68 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/fn/symbol/iterator.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ 47);
__webpack_require__(/*! ../../modules/web.dom.iterable */ 58);
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 29).f('iterator');

/***/ }),
/* 69 */
/* no static exports found */
/* all exports used */
/*!*************************************************!*\
  !*** ./~/core-js/library/modules/_enum-keys.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ 14)
  , gOPS    = __webpack_require__(/*! ./_object-gops */ 41)
  , pIE     = __webpack_require__(/*! ./_object-pie */ 27);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 70 */
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./~/core-js/library/modules/_is-array.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ 25);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 71 */
/* no static exports found */
/* all exports used */
/*!*********************************************!*\
  !*** ./~/core-js/library/modules/_keyof.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(/*! ./_object-keys */ 14)
  , toIObject = __webpack_require__(/*! ./_to-iobject */ 6);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 72 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopd.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(/*! ./_object-pie */ 27)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 11)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 6)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 20)
  , has            = __webpack_require__(/*! ./_has */ 3)
  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 30)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ 2) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 73 */
/* no static exports found */
/* all exports used */
/*!*******************************************************!*\
  !*** ./~/core-js/library/modules/_object-gopn-ext.js ***!
  \*******************************************************/
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ 6)
  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 40).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


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
var global         = __webpack_require__(/*! ./_global */ 0)
  , has            = __webpack_require__(/*! ./_has */ 3)
  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 2)
  , $export        = __webpack_require__(/*! ./_export */ 16)
  , redefine       = __webpack_require__(/*! ./_redefine */ 36)
  , META           = __webpack_require__(/*! ./_meta */ 62).KEY
  , $fails         = __webpack_require__(/*! ./_fails */ 10)
  , shared         = __webpack_require__(/*! ./_shared */ 24)
  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 17)
  , uid            = __webpack_require__(/*! ./_uid */ 13)
  , wks            = __webpack_require__(/*! ./_wks */ 1)
  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 29)
  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 28)
  , keyOf          = __webpack_require__(/*! ./_keyof */ 71)
  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 69)
  , isArray        = __webpack_require__(/*! ./_is-array */ 70)
  , anObject       = __webpack_require__(/*! ./_an-object */ 7)
  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 6)
  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 20)
  , createDesc     = __webpack_require__(/*! ./_property-desc */ 11)
  , _create        = __webpack_require__(/*! ./_object-create */ 34)
  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 73)
  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 72)
  , $DP            = __webpack_require__(/*! ./_object-dp */ 4)
  , $keys          = __webpack_require__(/*! ./_object-keys */ 14)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ 40).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ 27).f  = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ 41).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 23)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
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
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
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
/*!*********************************************!*\
  !*** ./app/javascript/packs/common/ajax.js ***!
  \*********************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$http = $http;

var _serialize = __webpack_require__(/*! ./serialize */ 79);

var _utilities = __webpack_require__(/*! ./utilities */ 21);

var _csrf = __webpack_require__(/*! ./csrf */ 39);

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
  };
  // Adapter pattern
  return {
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
/* 78 */,
/* 79 */
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

var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 61);

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
/* 80 */,
/* 81 */,
/* 82 */
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./app/javascript/packs/modules/ptTaskLog.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PtTaskLog = PtTaskLog;
exports.exitPtTaskLog = exitPtTaskLog;

var _ajax = __webpack_require__(/*! ../common/ajax */ 77);

var _toggleScroll = __webpack_require__(/*! ../common/toggleScroll */ 42);

var _utilities = __webpack_require__(/*! ../common/utilities */ 21);

var vueApp = void 0;
var App = void 0;
var payload = {};
var callback = {
  apiQuerySuccess: function apiQuerySuccess(data) {
    var searchList = document.getElementsByClassName("api-search-result")[0];
    var dataObj = JSON.parse(data);
    var contentStr = "";
    var headStr = "\n    <div class=\"result-head\">\n      <span class=\"per-result-column per-result-input\">input</span>\n      <span class=\"per-result-column per-result-packageVersion\">packageVersion</span>\n      <span class=\"per-result-column per-result-ciPackageName\">ciPackageName</span>\n      <span class=\"per-result-column per-result-ciPackageVersion\">ciPackageVersion</span>\n      <span class=\"per-result-column per-result-status\">status</span>\n    </div>\n    ";
    contentStr += headStr;
    contentStr += '<div class="result-body">';
    for (var i = 0, Len = dataObj.length; i < Len; i++) {
      contentStr += "<div class='per-search-result'>\n        <span class=\"per-result-column per-result-input\">" + dataObj[i].input + "</span>\n        <span class=\"per-result-column per-result-packageVersion\">" + dataObj[i].packageVersion + "</span>\n        <span class=\"per-result-column per-result-ciPackageName\">" + dataObj[i].ciPackageName + "</span>\n        <span class=\"per-result-column per-result-ciPackageVersion\">" + dataObj[i].ciPackageVersion + "</span>\n        <span class=\"per-result-column per-result-status\">" + dataObj[i].status + "</span>\n      </div>";
    }
    contentStr += "</div>";
    searchList.innerHTML = contentStr;
    dataObj.length > 0 ? searchList.classList.remove("hide") : searchList.classList.add("hide");
  }
};

var debouncedApiQueryInput = (0, _utilities.debounce)(apiQuery, 100, false);
function listenApiQuery() {
  var apiQueryInput = document.getElementsByClassName("search-input")[0];
  var inWrapper = false;
  apiQueryInput.addEventListener("keyup", debouncedApiQueryInput);
  apiQueryInput.parentElement.addEventListener("mouseleave", function (ev) {
    if (!checkIfFocus.apply(apiQueryInput, ev)) {
      clearSearchResult();
    }
    inWrapper = false;
  });
  apiQueryInput.parentElement.addEventListener("mouseenter", function (ev) {
    inWrapper = true;
    (0, _toggleScroll.disableScroll)();
  });
  apiQueryInput.addEventListener("blur", function (ev) {
    if (!inWrapper) clearSearchResult();
  });
  apiQueryInput.addEventListener("focus", apiQuery);
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
  (0, _ajax.$http)(window.location.origin + "/plugins_instantsearch").get(payload).then(callback.apiQuerySuccess.bind(ev)).catch(callback.error);
}
function clearSearchResult() {
  var apiSearchResultEle = document.getElementsByClassName("api-search-result")[0];
  apiSearchResultEle.innerHTML = "";
  apiSearchResultEle.classList.add("hide");
  (0, _toggleScroll.enableScroll)();
}
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Vue.component("pt-task-log", {
  data: function data() {
    return {
      tasksInput: [],
      showLogs: false,
      showDetail: false,
      currentTask: {},
      steps: ["downloadTorrent", "addToTransmission", "downloadFiles", "findTargetFile", "convert", "rsync", "upload", "removeTorrentAndData"]
    };
  },
  template: "\n    <div class=\"pt-task-log-wrap\">\n      <div class=\"pt-tasks-container pt-tasks-wrap c-gap-top\" v-for=\"(task, idx) in tasksInput\">\n        <div :class=\"['c-border', 'c-center', 'c-padding', task.torrentSource ? task.torrentSource : '']\"\n        :data-id=\"task.torrent_base_info['torrentId']\"\n        :data-source=\"task.torrent_base_info['torrentSource']\"\n        :data-user-id=\"task.user_id\"\n        :data-source-id=\"task.source_id\"\n        :data-transmission-hash=\"task.transmission_hash\"\n        >\n          <div class=\"per-pt-task\">\n            <div class=\"pt-task-cover\" :style=\"{ backgroundImage: 'url(' + coverAddress(task) + ')' }\">\n            </div>\n            <div class=\"pt-task-info\">\n              <h3>{{ task.torrent_base_info['chsTitle'] }}</h3>\n              <h3>{{ task.torrent_base_info['engTitle'] }}</h3>\n              <div class=\"torrent-status-info\">\n                <span class=\"torrent-category c-pad-sm\">\u79CD\u5B50\u7C7B\u578B: {{ task.torrent_base_info['torrentCategory'] }}</span>\n                <span class=\"torrent-size c-pad-sm\">\u6587\u4EF6\u5927\u5C0F: <b>{{ task.torrent_base_info['torrentSize'] }}</b></span>\n                <span class=\"torrent-seeders c-pad-sm\">\u505A\u79CD\u6570\u91CF: <b>{{ task.torrent_base_info['peersCount'] }}</b></span>\n                <span class=\"torrent-downloading c-pad-sm\">\u6B63\u5728\u4E0B\u8F7D\u6570\u91CF: <b>{{ task.torrent_base_info['downloadingCount'] }}</b></span>\n                <span class=\"torrent-status c-pad-sm\"><b>{{ task.status }}</b></span>\n              </div>\n            </div>\n            <div class=\"pt-source-op\">\n              <span class=\"pt-source c-pad-sm c-center\">\u79CD\u5B50\u6765\u6E90: {{ task.torrent_base_info['torrentSource'] }}</span>\n              <span class=\"c-center c-gap-top c-pad-sm pt-torrent-detail c-pointer\"\n              :data-source=\"task.torrent_base_info['torrentSource']\"\n              :data-id=\"task.torrent_base_info['torrentId']\"\n              @click=\"showTorrentDetail(task)\">{{ task.showTorrentDetail ? '\u5173\u95ED\u79CD\u5B50\u8BE6\u60C5' : '\u663E\u793A\u79CD\u5B50\u8BE6\u60C5' }}</span>\n\n              <span class=\"c-center c-gap-top c-pad-sm c-pointer pt-task-progress\"\n              @click=\"toggleLog(task)\">{{ task.showLogs ? taskLogUnfoldedText : taskLogFoldedText }}</span>\n            </div>\n          </div>\n          <p v-if=\"task.showLogs && !task.logReceived\" class=\"c-center\">\u6B63\u5728\u5EFA\u7ACB\u65E5\u5FD7\u8FDE\u63A5...</p>\n          <div v-if=\"task.showLogs && taskType === 'completed' \" class=\"pt-task-qrcode\">\n            <img :src=\"qrcodeSrc(task)\" v-if=\"task.signUrl.length > 0\" />\n          </div>\n\n          <div v-if=\"task.showLogs && task.signUrl.length > 0\" class=\"pt-task-play-online c-gap-bottom\">\n            <a href=\"javascript:;\" @click=\"togglePlay(task)\">{{ task.playVideoOnline ? '\u5173\u95ED\u5728\u7EBF\u64AD\u653E' : '\u5728\u7EBF\u64AD\u653E' }}</a>\n          </div>\n          <div v-if=\"task.signUrl.length > 0 && task.showLogs && task.playVideoOnline\" class=\"pt-task-video c-gap-bottom\">\n            <video class=\"c-full-width\" :src=\"task.signUrl\" controls />\n          </div>\n\n          <template v-for=\"(el, idx) in steps\" v-if=\"task.showLogs\">\n            <div v-if=\"task.logDetail && task.logDetail.hasOwnProperty(el)\" class=\"pt-task-step-log\">\n              <div v-if=\"el === 'downloadFiles'\">\n                <span><b>\u8017\u65F6:</b> {{ duration(task.logDetail[el]) }}</span>\n                <span><b>\u79CD\u5B50\u540D</b>: {{ task.logDetail[el].name }}</span>\n                <span><b>\u5E73\u5747\u4E0B\u8F7D\u901F\u5EA6\uFF1A</b>{{ task.logDetail[el].avg_speed }}</span>\n                <span><b>\u4F53\u79EF\u5927\u5C0F\uFF1A</b>{{ task.logDetail[el].total_size }}</span>\n                <span><b>\u4E0B\u8F7D\u8017\u65F6\uFF1A</b>{{ task.logDetail[el].time_taken }}</span>\n                <span><b>\u8FDB\u5EA6\uFF1A</b>{{ task.logDetail[el].progress }}%</span>\n              </div>\n              <div v-else-if=\"el === 'findTargetFile'\">\n                <span><b>\u76EE\u6807\u6587\u4EF6\u8DEF\u5F84\uFF1A</b>{{ task.logDetail[el].fpath }}</span>\n                <span><b>\u8FDB\u5EA6\uFF1A</b>{{ task.logDetail[el].progress }}%</span>\n              </div>\n              <div v-else-if=\"el === 'convert'\">\n                <span><b>\u8017\u65F6:</b> {{ duration(task.logDetail[el]) }}</span>\n                <span><b>\u8F6C\u7801\u8F93\u51FA\u6587\u4EF6\u8DEF\u5F84\uFF1A</b>{{ task.logDetail[el].fpath }}</span>\n                <span><b>\u8FDB\u5EA6\uFF1A</b>{{ task.logDetail[el].progress }}%</span>\n              </div>\n              <div v-else-if=\"el === 'rsync'\">\n                <span><b>\u8017\u65F6:</b> {{ duration(task.logDetail[el]) }}</span>\n                <span><b>rsync\u540C\u6B65\u6587\u4EF6\uFF1A</b></span>\n                <span><b>\u8FDB\u5EA6\uFF1A</b>{{ task.logDetail[el].progress }}%</span>\n              </div>\n              <div v-else-if=\"el === 'upload'\">\n                <span><b>\u8017\u65F6:</b> {{ duration(task.logDetail[el]) }}</span>\n                <span><b>\u4E0A\u4F20\u963F\u91CC\u4E91OSS\u6587\u4EF6\u540D\uFF1A</b>{{ task.logDetail[el].fileName }}</span>\n                <span><b>\u8FDB\u5EA6\uFF1A</b>{{ task.logDetail[el].progress }}%</span>\n              </div>\n              <div v-else-if=\"el === 'removeTorrentAndData'\">\n                <span><b>\u4E0A\u4F20\u5B8C\u6210\u540E\u4ECEtransmission\u79FB\u9664\u79CD\u5B50\u53CA\u6570\u636E\u8FDB\u5EA6\uFF1A</b>{{ task.logDetail[el].progress }}%</span>\n              </div>\n              <div v-else>\n                <b>{{ el }}:</b> {{ task.logDetail[el].progress }}%\n              </div>\n            </div>\n          </template>\n        </div>\n      </div>\n      <div :class=\"['torrent-detail-wrap', showDetail ? '' : 'c-hide']\" ref=\"popupWrap\">\n        <div class=\"torrent-detail-bg\"></div>\n        <div class=\"torrent-detail-popup-wrap\">\n          <div class=\"torrent-detail-popup-inner-wrap\">\n            <div class=\"torrent-detail-popup\" ref=\"popup\"></div>\n          </div>\n          <span class=\"torrent-detail-popup-close c-center c-pointer\" @click=\"closeTorrentDetail\">\u5173\u95ED\u8BE6\u60C5</span>\n        </div>\n      </div>\n    </div>",
  computed: {
    taskLogFoldedText: function taskLogFoldedText() {
      return this.taskType === "completed" ? "显示任务结果" : "显示任务进度";
    },
    taskLogUnfoldedText: function taskLogUnfoldedText() {
      return this.taskType === "completed" ? "关闭任务结果" : "关闭任务进度";
    },
    taskType: function taskType() {
      var wlp = window.location.pathname;
      if (wlp.indexOf("pending_pt_task") !== -1) {
        return "pending";
      } else if (wlp.indexOf("completed_pt_task") !== -1) {
        return "completed";
      }
    }
  },
  methods: {
    duration: function duration(el) {
      return ((el.end_ts - el.start_ts) / (1000 * 60 * 60)).toFixed(3) + " \u5C0F\u65F6";
    },
    coverAddress: function coverAddress(task) {
      return task.cover || task.torrent_base_info && task.torrent_base_info["coverPic"];
    },
    closeTorrentDetail: function closeTorrentDetail(el) {
      this.showDetail = false;
      this.$refs.popup.innerHTML = "";
      this.currentTask.showTorrentDetail = false;
    },
    showTorrentDetail: function showTorrentDetail(el) {
      this.currentTask = el;
      el.showTorrentDetail = true;
      this.$refs.popup.innerHTML = el.torrent_detail;
      this.showDetail = true;
    },
    togglePlay: function togglePlay(el) {
      el.playVideoOnline = !el.playVideoOnline;
    },
    qrcodeSrc: function qrcodeSrc(el) {
      return "data:image/png;base64," + el.qrCode;
    },

    toggleLog: function toggleLog(item) {
      if (!item.showLogs) {
        if (this.taskType === "completed") {
          var _payload = {
            hash: item.transmission_hash
          };
          (0, _ajax.$http)(window.location.origin + "/pt_task_sign_url").get(_payload).then(function (res) {
            var obj = JSON.parse(res);
            item.signUrl = obj.signUrl;
            item.qrCode = obj.encodeImg;
          });
        }
        item.gc = App.cable.subscriptions.create({
          channel: "PtTaskLogChannel",
          hash: item.transmission_hash
        }, {
          connected: function connected() {
            this.perform("send_current_log", {
              hash: item.transmission_hash
            });
          },
          received: function received(data) {
            item.logReceived = true;
            item.log = data;
            item.logDetail = data.detail;
            if (data.detail && data.detail["removeTorrentAndData"] && data.detail.removeTorrentAndData.progress === 100) {
              item.status = "completed";
            }
            if (item.status === "failed" || item.status === "completed") {
              item.gc.unsubscribe();
            }
          }
        });
      } else {
        if (item.status === "failed" || item.status === "completed") {} else {
          item.gc.unsubscribe();
        }
      }
      item.showLogs = !item.showLogs;
    },
    subscribe: function subscribe(id) {}
  },
  mounted: function mounted() {
    var _this = this;

    var payload = {};
    var wlp = window.location.pathname;
    var apiPath = "";
    var pageFromQuery = getParameterByName("page");
    var queryPage = pageFromQuery ? pageFromQuery : 1;
    payload.page = queryPage;
    if (wlp.indexOf("pending_pt_task") !== -1) {
      apiPath = "/pending_pt_task_data";
    } else if (wlp.indexOf("completed_pt_task") !== -1) {
      apiPath = "/completed_pt_task_data";
    }
    (0, _ajax.$http)(window.location.origin + apiPath).get(payload).then(function (res) {
      var arr = JSON.parse(res);
      _this.tasksInput = arr.map(function (el) {
        el.torrent_base_info = JSON.parse(el.torrent_base_info);
        el.log = {};
        el.cover = el.cover == null ? "" : el.cover;
        el.showLogs = false;
        el.playVideoOnline = false;
        el.showTorrentDetail = false;
        el.qrCode = "";
        el.signUrl = "";
        el.logDetail = {};
        el.logReceived = false;
        return el;
      });
      /* use ActionCable to update status of pending plugin */
      var gc = _this.tasksInput;
      if (gc.length > 0) {
        var _loop = function _loop(i, length1) {
          if (gc[i]["status"] !== "failed" && gc[i]["status"] !== "completed") {
            gc[i]["gcp"] = App.cable.subscriptions.create({
              channel: "PtTaskStatusChannel",
              hash: gc[i]["transmission_hash"]
            }, {
              connected: function connected() {
                this.perform("send_current_status", {
                  hash: gc[i]["transmission_hash"]
                });
              },
              received: function received(data) {
                gc[i]["status"] = data.status;
                if (data.status === "failed" || data.status === "completed") {
                  gc[i]["gcp"].unsubscribe();
                }
              }
            });
          }
        };

        for (var i = 0, length1 = gc.length; i < length1; i++) {
          _loop(i, length1);
        }
      }
    }).catch(function (err) {
      return console.log(err);
    });
  }
});

function PtTaskLog() {
  App = {};

  App.cable = ActionCable.createConsumer();
  vueApp = new Vue({
    el: "#app"
  });

  // listenApiQuery();
}

function exitPtTaskLog() {
  if (vueApp) vueApp.$destroy();
  vueApp = null;
  App.cable.disconnect();
}

/***/ }),
/* 83 */,
/* 84 */,
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
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
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
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
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
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
/* no static exports found */
/* all exports used */
/*!*********************************************************!*\
  !*** ./app/javascript/packs/entries/ptTaskCompleted.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ptTaskLog = __webpack_require__(/*! ../modules/ptTaskLog */ 82);

(function () {
  A.init[A.gc.currentName] = _ptTaskLog.PtTaskLog;
  A.destroy[A.gc.currentName] = _ptTaskLog.exitPtTaskLog;
})();

/***/ })
/******/ ]);
//# sourceMappingURL=ptTaskCompleted.js.map