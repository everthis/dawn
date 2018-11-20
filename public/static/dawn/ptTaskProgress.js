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
/******/ 	return __webpack_require__(__webpack_require__.s = 164);
/******/ })
/************************************************************************/
/******/ ({

/***/ 135:
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./app/javascript/packs/modules/ptTaskProgress.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPtTaskProgress = initPtTaskProgress;
exports.disposePtTaskProgress = disposePtTaskProgress;

var _utilities = __webpack_require__(/*! ../common/utilities */ 21);

var _inViewport = __webpack_require__(/*! ../common/inViewport */ 87);

var _inViewport2 = _interopRequireDefault(_inViewport);

var _toggleScroll = __webpack_require__(/*! ../common/toggleScroll */ 42);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ptTasks = Array.prototype.slice.call(document.querySelectorAll(".per-pt-task.ttg"));

var ptTasksWrapEl = document.getElementsByClassName("pt-tasks-wrap")[0];
function getTtgCover(el) {
  var id = el.dataset.id;
  var source = el.dataset.source;
  var coverEl = Array.prototype.slice.call(el.children).filter(function (el) {
    return el.classList.contains("pt-task-cover");
  })[0];
  if (coverEl.style.backgroundImage.indexOf("ttg_logo") === -1) {
    return;
  }
  return fetch("/pt_task_ttg_cover?id=" + id + "&source=" + source, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.text();
  }).then(function (data) {
    if (data == null || data === "null" || data === "") {
      return;
    }
    coverEl.style.backgroundImage = "url(" + data + ")";
  });
}
function checkInViewport(ev) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ptTasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if ((0, _inViewport2.default)(el)) {
        getTtgCover(el);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
function delegateClick(ev) {
  console.log("clickclick");
  var evt = ev.target;
  var ptp = void 0;
  // add pt task
  if (evt.classList.contains("pt-task-progress")) {
    ptp = evt;
  } else {
    ptp = evt.closest(".pt-task-progress");
  }
  if (ptp) {
    checkTaskProgress(ptp.closest(".per-pt-task"));
    return;
  }

  // disable link in popup
  if (evt.tagName === "A" && evt.closest(".torrent-detail-popup")) {
    forbidExtLink(ev);
    return;
  }
}

function checkTaskProgress(el) {
  var _el$dataset = el.dataset,
      id = _el$dataset.id,
      source = _el$dataset.source,
      hash = _el$dataset.transmissionHash;

  return fetch("/check_task_progress?id=" + id + "&source=" + source + "&hash=" + hash, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.text();
  }).then(function (data) {
    if (data == null || data === "null" || data === "") {
      return;
    }
  });
}
var debouncedCheckInViewport = (0, _utilities.debounce)(checkInViewport, 300, false);

function initPtTaskProgress() {
  checkInViewport();
  ptTasksWrapEl.addEventListener("click", delegateClick);
  window.addEventListener("scroll", debouncedCheckInViewport);
}
function disposePtTaskProgress() {
  window.removeEventListener("scroll", debouncedCheckInViewport);
}

/***/ }),

/***/ 164:
/* no static exports found */
/* all exports used */
/*!********************************************************!*\
  !*** ./app/javascript/packs/entries/ptTaskProgress.js ***!
  \********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ptTaskProgress = __webpack_require__(/*! ../modules/ptTaskProgress */ 135);

(function () {
  A.init[A.gc.currentName] = _ptTaskProgress.initPtTaskProgress;
  A.destroy[A.gc.currentName] = _ptTaskProgress.disposePtTaskProgress;
})();

/***/ }),

/***/ 21:
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

/***/ 42:
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

/***/ 87:
/* no static exports found */
/* all exports used */
/*!***************************************************!*\
  !*** ./app/javascript/packs/common/inViewport.js ***!
  \***************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isInViewport;
function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();
  return bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth);
}

/***/ })

/******/ });
//# sourceMappingURL=ptTaskProgress.js.map