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
/******/ 	return __webpack_require__(__webpack_require__.s = 145);
/******/ })
/************************************************************************/
/******/ ({

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _handleMethod = __webpack_require__(47);

(function () {
  var cname = A.gc.currentName;

  function documentation() {}
  function exitDocumentation() {}
  function detachDocumentation() {
    A.spf.script.unload(cname);
  }
  A.init[cname] = documentation;
  A.destroy[cname] = exitDocumentation;
  // A.detach[cname] = detachDocumentation;
})();

/***/ }),

/***/ 30:
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

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMethod = handleMethod;

var _csrf = __webpack_require__(30);

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