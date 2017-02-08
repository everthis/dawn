/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 78);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tweetBox = __webpack_require__(58);

var _handleMethod = __webpack_require__(8);

var cname = A.gc.currentName;
var hmInstance = void 0;
var fd = void 0,
    fa = void 0;

function processDataLink(ev) {
  var e = window.e || ev;

  if (e.target.tagName !== 'A') return;

  if (e.target.dataset.method === 'fnpu_delete') {
    e.preventDefault();
    hmInstance = (0, _handleMethod.handleMethod)(e.target, "delete");
    fa = e.target.getAttribute('href');
    fd = new FormData(hmInstance);
    window.A.spf.load(fa, {
      method: "POST",
      postData: fd,
      onProcess: function onProcess(evt) {
        disposeHomepage();
      },
      onDone: function onDone(evt) {
        initHomepage();
      }
    });
  }
}
function bindClick() {
  document.addEventListener('click', processDataLink, false);
}
function removeBindClick() {
  document.removeEventListener('click', processDataLink, false);
}

function initHomepage() {
  // bindClick();
  (0, _tweetBox.tweetBox)();
}

function disposeHomepage() {
  // removeBindClick();
  (0, _tweetBox.exitTweetBox)();
}

(function () {
  A.fnpuLoad[A.gc.currentName] = {
    process: disposeHomepage,
    done: initHomepage
  };
  A.init[A.gc.currentName] = initHomepage;
  A.destroy[A.gc.currentName] = disposeHomepage;
})();

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweetBox = tweetBox;
exports.exitTweetBox = exitTweetBox;
var f = void 0,
    fa = void 0,
    fd = void 0,
    tb = void 0,
    tbdString = void 0,
    tbd = void 0,
    tbt = void 0,
    tbtpd = void 0,
    postText = void 0,
    submitBtn = void 0,
    inputs = void 0,
    label = void 0,
    labelVal = void 0,
    fileName = void 0;
var $micropost_picture = void 0;
var doc = document;
function setFocus(el) {
  var range = document.createRange();
  var sel = window.getSelection();
  range.setStart(el, 0);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
function bindKeyDown() {
  if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
    tb.classList.remove('showPlaceholder');
  };
  if (tb.innerHTML === '<br>') {
    tb.innerHTML = tbdString;
    setFocus(tb.getElementsByTagName('div')[0]);
  }
}

function bindKeyUp() {
  if (tb.innerHTML) {
    if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
      tb.classList.remove('showPlaceholder');
    } else {};
  } else {
    tb.innerHTML = tbdString;
    setTimeout(function () {

      setFocus(tb.getElementsByTagName('div')[0]);
    }, 0);
  };
}

function bindFocus() {
  tb.classList.remove('condensed');
  if (tb.getElementsByTagName('div') && tb.getElementsByTagName('div')[0].innerText.trim().length) {

    tb.classList.remove('showPlaceholder');
  } else {
    tb.classList.add('showPlaceholder');
  }
  if (tbd.innerHTML === tbtpd) {

    tbd.innerHTML = '<br>';
  }
}

function bindImgInputChange() {
  var size_in_megabytes = this.files[0].size / 1024 / 1024;
  if (size_in_megabytes > 5) {
    alert('Maximum file size is 5MB. Please choose a smaller file.');
  }
}

function bindSubmitBtn(ev) {
  ev.preventDefault();
  if (tbt.textContent.trim() === tbtpd) {
    postText.value = '';
  } else {
    postText.value = tbt.textContent.trim();
  }
  fa = f.action;
  fd = new FormData(f);
  window.A.spf.load(fa, {
    method: "POST",
    postData: fd,
    onProcess: function onProcess(evt) {
      exitTweetBox();
    },
    onDone: function onDone(evt) {
      tweetBox();
    }
  });
}

function bindImgUpload(e) {
  fileName = '';
  if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

  if (fileName) label.getElementsByTagName('span')[0].innerHTML = fileName;else label.getElementsByTagName('span')[0].innerHTML = labelVal;
}

function changeSubmitBtnBehavior() {}

function tweetBox() {
  tb = doc.getElementsByClassName('tweet-box')[0];
  if (!tb) return null;
  tbd = tb.getElementsByTagName('div')[0];
  tbdString = '<div><br></div>';
  f = doc.getElementById('new_micropost');
  $micropost_picture = doc.getElementById('micropost_picture');
  tbt = doc.getElementsByClassName('tweet-box-text')[0];
  tbtpd = tbt.dataset.placeholderDefault;
  postText = doc.getElementsByClassName('new-post-text')[0];
  submitBtn = doc.getElementsByClassName('btn-submit')[0];
  inputs = doc.getElementsByClassName('micropost-input-file')[0];
  label = inputs.nextElementSibling, labelVal = label.innerHTML;

  tb.addEventListener('focus', bindFocus);
  tb.addEventListener('keyup', bindKeyUp);
  tb.addEventListener('keydown', bindKeyDown);
  $micropost_picture.addEventListener('change', bindImgInputChange.bind($micropost_picture));
  submitBtn.addEventListener('click', bindSubmitBtn);
  inputs.addEventListener('change', bindImgUpload.bind(inputs));
}

function exitTweetBox() {
  tb.removeEventListener('focus', bindFocus);
  tb.removeEventListener('keyup', bindKeyUp);
  tb.removeEventListener('keydown', bindKeyDown);
  $micropost_picture.removeEventListener('change', bindImgInputChange.bind(this));
  submitBtn.removeEventListener('click', bindSubmitBtn);
  inputs.removeEventListener('change', bindImgUpload.bind(this));
}

/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(36);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMethod = handleMethod;

var _csrf = __webpack_require__(1);

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
      csrfToken = _csrf.rorParams.csrfToken(),
      csrfParam = _csrf.rorParams.csrfParam();
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
  if (params.csrfParam !== undefined && params.csrfToken !== undefined && !_csrf.rorParams.isCrossDomain(params.href)) {
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

/***/ })

/******/ });