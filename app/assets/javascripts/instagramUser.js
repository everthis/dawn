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
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 149);
/******/ })
/************************************************************************/
/******/ ({

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initInstagramUser = initInstagramUser;
exports.disposeInstagramUser = disposeInstagramUser;

var _utilities = __webpack_require__(18);

var _toggleScroll = __webpack_require__(54);

function queryId(ev) {
  var q = ev.target.value;
  if (!q.length) {
    renderList([]);
    return;
  }
  fetch('/queryInstagramUserId?q=' + q, {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (res) {
    return res.json();
  }).then(renderList);
}
function renderList(arr) {
  var res = [];
  maskEle.classList.remove('c-hide');
  arr.forEach(function (el) {
    res.push('\n      <div class="instagram_user c-border c-center c-padding" data-id="' + el.user_id + '">\n        <div class="avatar" style="background-image: url(\'' + el.profile_pic_url + '\'); background-size: cover;"></div>\n        <div class="user_name">' + el.user_name + '</div>\n        <div class="media_count">media_count: ' + el.media_count + '</div>\n        <div class="type">\n        </div>\n        <div class="user_id">user_id: ' + el.user_id + '</div>\n      </div>\n    ');
  });
  resEle.innerHTML = res.join('');
  (0, _toggleScroll.disableScroll)();
}
function hideMask(ev) {
  renderList([]);
  maskEle.classList.add('c-hide');
  (0, _toggleScroll.enableScroll)();
}
function delegateClick(ev) {
  var evt = ev.target;
  var te = void 0;
  if (evt.classList.contains('instagram_user')) {
    te = evt;
  } else {
    te = evt.closest('.instagram_user');
  }
  if (!te) return;
  var ins_user_id = +te.dataset.id;
  A.spf.navigate(window.location.origin + '/instagram_images?owner_id=' + ins_user_id);
}

var ele = void 0;
var resEle = void 0;
var maskEle = void 0;
var searchEle = void 0;
var insWrap = void 0;
var debouncedQueryId = (0, _utilities.debounce)(queryId, 100, false);

function initInstagramUser() {
  ele = document.getElementById('ins_user_q');
  resEle = document.getElementsByClassName('ins-search-result')[0];
  searchEle = document.getElementsByClassName('ins-search')[0];
  maskEle = document.getElementsByClassName('ins-mask')[0];
  insWrap = document.getElementsByClassName('instagram_users_wrap')[0];
  ele.addEventListener('keyup', debouncedQueryId);
  ele.addEventListener('focus', debouncedQueryId);
  maskEle.addEventListener('click', hideMask);
  resEle.addEventListener('click', delegateClick);
  insWrap.addEventListener('click', delegateClick);
}
function disposeInstagramUser() {
  ele.removeEventListener('keyup', debouncedQueryId);
  ele.removeEventListener('focus', debouncedQueryId);
  maskEle.removeEventListener('click', hideMask);
  resEle.removeEventListener('click', delegateClick);
  insWrap.removeEventListener('click', delegateClick);
  (0, _toggleScroll.enableScroll)();
}

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _instagramUser = __webpack_require__(123);

(function () {
  A.init[A.gc.currentName] = _instagramUser.initInstagramUser;
  A.destroy[A.gc.currentName] = _instagramUser.disposeInstagramUser;
})();

/***/ }),

/***/ 18:
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

/***/ 54:
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

/***/ })

/******/ });