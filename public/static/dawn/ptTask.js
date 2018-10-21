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
/******/ 	return __webpack_require__(__webpack_require__.s = 153);
/******/ })
/************************************************************************/
/******/ ({

/***/ 126:
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./app/javascript/packs/modules/ptTask.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initPtTask = initPtTask;
exports.disposePtTask = disposePtTask;

var _utilities = __webpack_require__(/*! ../common/utilities */ 16);

var _inViewport = __webpack_require__(/*! ../common/inViewport */ 138);

var _inViewport2 = _interopRequireDefault(_inViewport);

var _toggleScroll = __webpack_require__(/*! ../common/toggleScroll */ 46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stack = [];
var torrentDetailEl = document.getElementsByClassName("torrent-detail-popup")[0];
var torrentDetailWrapEl = document.getElementsByClassName("torrent-detail-wrap")[0];
var searchInputEl = document.getElementById("pt-tasks-q");

var ptTasks = [];
function queryId(ev) {
  var q = searchInputEl.value;
  if (!q.length) {
    renderList([]);
    return;
  }
  stack.push(q);
  fetch("/pt_task_search?q=" + q, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    shouldContinue(data, q);
  });
}

function getTorrentDetail(_ref) {
  var id = _ref.id,
      source = _ref.source;

  if (id == null || source == null) {
    return;
  }
  fetch("/pt_task_torrent_detail?id=" + id + "&source=" + source, {
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (res) {
    return res.text();
  }).then(function (data) {
    torrentDetailEl.innerHTML = data;
    torrentDetailWrapEl.classList.remove("c-hide");
  });
}

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
function shouldContinue(data, q) {
  if (stack.length > 0 && q === stack[stack.length - 1]) {
    renderList(data);
  }
}
function renderList(arr) {
  var res = [];
  arr.forEach(function (el) {
    res.push("\n      <div class=\"per-pt-task c-border c-center c-padding " + (el.torrentSource ? el.torrentSource : "") + " " + (checkAvailability(el) ? "" : "not-available") + "\" data-id=\"" + el.torrentId + "\" data-source=\"" + el.torrentSource + "\">\n        <div class=\"pt-task-cover\" style=\"background-image: url(" + el.coverPic + "); \">\n        </div>\n        <div class=\"pt-task-info\">\n            <h3>" + el.chsTitle + "</h3>\n            <h3>" + el.engTitle + "</h3>\n            <div class=\"torrent-status-info\">\n                <span class=\"torrent-category c-pad-sm\">\u79CD\u5B50\u7C7B\u578B: " + el.torrentCategory + "</span>\n                <span class=\"torrent-size c-pad-sm\">\u6587\u4EF6\u5927\u5C0F: <b>" + el.torrentSize + "</b></span>\n                <span class=\"torrent-seeders c-pad-sm\">\u505A\u79CD\u6570\u91CF: <b>" + el.peersCount + "</b></span>\n                <span class=\"torrent-downloading c-pad-sm\">\u6B63\u5728\u4E0B\u8F7D\u6570\u91CF: <b>" + el.downloadingCount + "</b></span>\n            </div>\n        </div>\n        <div class=\"pt-source-op\">\n          <span class=\"pt-source c-pad-sm c-center\">\u79CD\u5B50\u6765\u6E90: " + el.torrentSource + "</span>\n          <span class=\"c-center c-gap-top c-pad-sm pt-torrent-detail c-pointer\"\n          data-source=\"" + el.torrentSource + "\"\n          data-id=\"" + el.torrentId + "\">\u79CD\u5B50\u8BE6\u60C5</span>\n          " + (checkAvailability(el) ? addTaskHtml(el) : "") + "\n        </div>\n      </div>\n    ");
  });
  resEle.innerHTML = res.join("");
  ptTasks = Array.prototype.slice.call(document.querySelectorAll(".per-pt-task.ttg"));
  checkInViewport();
  //   disableScroll();
}

function addTaskHtml(el) {
  return "<div class=\"add-pt-task c-pad-sm c-center c-gap-top c-pointer\" data-id='" + el.torrentId + "' data-source=\"" + el.torrentSource + "\">\u6DFB\u52A0\u5230\u4EFB\u52A1</div>";
}

function checkAvailability(el) {
  if (el.peersCount > 0 && validSize(el.torrentSize)) {
    return true;
  } else {
    return false;
  }
}

function validSize(str) {
  var regex = /(\d*\.*\d*)(.*)/;
  var res = regex.exec(str);
  if (res[2] === "GB") {
    if (+res[1] > 10) {
      return false;
    }
  }
  return true;
}

function delegateClick(ev) {
  var evt = ev.target;
  var apt = void 0,
      ptd = void 0,
      tdpc = void 0;
  // add pt task
  if (evt.classList.contains("add-pt-task")) {
    apt = evt;
  } else {
    apt = evt.closest(".add-pt-task");
  }
  if (apt) {
    goToTaskDetail(apt);
    return;
  }

  // torrentDetail
  if (evt.classList.contains("pt-torrent-detail")) {
    ptd = evt;
  } else {
    ptd = evt.closest(".pt-torrent-detail");
  }
  if (ptd) {
    showTorrentDetail(ptd);
    return;
  }

  // popup
  if (evt.classList.contains("torrent-detail-popup-close")) {
    tdpc = evt;
  } else {
    tdpc = evt.closest(".torrent-detail-popup-close");
  }
  if (tdpc) {
    closePopup(tdpc);
    return;
  }

  // disable link in popup
  if (evt.tagName === "A" && evt.closest(".torrent-detail-popup")) {
    forbidExtLink(ev);
    return;
  }
}

function forbidExtLink(ev) {
  ev.preventDefault();
  alert("external link disabled.");
}

function closePopup(el) {
  var wrapEl = el.closest(".torrent-detail-wrap");
  wrapEl.classList.add("c-hide");
}

function showTorrentDetail(el) {
  var _el$dataset = el.dataset,
      id = _el$dataset.id,
      source = _el$dataset.source;

  getTorrentDetail({ id: id, source: source });
}

function goToTaskDetail(task_id) {
  A.spf.navigate(window.location.origin + "/pt_tasks?id=" + task_id);
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

var ele = void 0;
var resEle = void 0;
var tdWrap = void 0;
var debouncedQueryId = (0, _utilities.debounce)(queryId, 400, true);
var debouncedCheckInViewport = (0, _utilities.debounce)(checkInViewport, 300, false);

function initPtTask() {
  ele = document.getElementById("pt-task-search-btn");
  resEle = document.getElementsByClassName("pt-tasks-search-result")[0];
  tdWrap = document.getElementsByClassName("torrent-detail-wrap")[0];
  ele.addEventListener("click", debouncedQueryId);
  resEle.addEventListener("click", delegateClick);
  tdWrap.addEventListener("click", delegateClick);
  window.addEventListener("scroll", debouncedCheckInViewport);
}
function disposePtTask() {
  ele.removeEventListener("click", debouncedQueryId);
  resEle.removeEventListener("click", delegateClick);
  tdWrap.removeEventListener("click", delegateClick);
  window.removeEventListener("scroll", debouncedCheckInViewport);
  (0, _toggleScroll.enableScroll)();
}

/***/ }),

/***/ 138:
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

/***/ }),

/***/ 153:
/* no static exports found */
/* all exports used */
/*!************************************************!*\
  !*** ./app/javascript/packs/entries/ptTask.js ***!
  \************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ptTask = __webpack_require__(/*! ../modules/ptTask */ 126);

(function () {
  A.init[A.gc.currentName] = _ptTask.initPtTask;
  A.destroy[A.gc.currentName] = _ptTask.disposePtTask;
})();

/***/ }),

/***/ 16:
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

/***/ 46:
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

/***/ })

/******/ });
//# sourceMappingURL=ptTask.js.map