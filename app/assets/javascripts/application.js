/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************************************!*\
  !*** ./front-end/javascripts/application.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dataLinks = __webpack_require__(/*! ./modules/dataLinks */ 1);
	
	var _homepage = __webpack_require__(/*! ./modules/homepage */ 4);
	
	var _apiOperation = __webpack_require__(/*! ./modules/apiOperation */ 6);
	
	var _fisCiPlugins = __webpack_require__(/*! ./modules/fisCiPlugins */ 26);
	
	(0, _dataLinks.dataLinks)();
	
	// apiTree();
	// var p = new dawnSVG();
	// p.init(document.getElementById('painter-target'));
	// p.start();
	
	(function () {
	  var routes = {
	    '/': _homepage.home,
	    '/dev': [_apiOperation.initXhr],
	    '/fis_ci_plugins/new': _fisCiPlugins.fcp
	  };
	  var pathName = window.location.pathname;
	  if (routes.hasOwnProperty(pathName)) {
	    if (Object.prototype.toString.call(routes[pathName]) === '[object Array]' && routes[pathName].length) {
	      for (var i = 0; i < routes[pathName].length; i++) {
	        routes[pathName][i].apply(null);
	      }
	    } else {
	      routes[pathName].apply(null);
	    }
	  }
	})();

/***/ },
/* 1 */
/*!****************************************************!*\
  !*** ./front-end/javascripts/modules/dataLinks.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.dataLinks = dataLinks;
	
	var _handleMethod = __webpack_require__(/*! ../common/handleMethod */ 2);
	
	function dataLinks() {
	  document.addEventListener('click', processDataLink, false);
	}
	function processDataLink(e) {
	  var e = window.e || e;
	
	  if (e.target.tagName !== 'A') return;
	
	  // Do something
	  if (e.target.dataset.method === 'delete') {
	    e.preventDefault();
	    (0, _handleMethod.handleMethod)(e.target);
	  }
	  if (e.target.dataset.method === 'PATCH') {
	    e.preventDefault();
	    (0, _handleMethod.handleMethod)(e.target);
	  }
	  // if (e.target.dataset.method === 'patch') {
	  //   e.preventDefault();
	  //   handleMethod(e.target, {
	  //     ns: 'api',
	  //     data: {
	  //       section: 'wise',
	  //       id: '2'
	  //     }
	  //   });
	  // }
	}

/***/ },
/* 2 */
/*!******************************************************!*\
  !*** ./front-end/javascripts/common/handleMethod.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.handleMethod = handleMethod;
	
	var _csrf = __webpack_require__(/*! ../common/csrf */ 3);
	
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

/***/ },
/* 3 */
/*!**********************************************!*\
  !*** ./front-end/javascripts/common/csrf.js ***!
  \**********************************************/
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 4 */
/*!***************************************************!*\
  !*** ./front-end/javascripts/modules/homepage.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.home = home;
	
	var _tweetBox = __webpack_require__(/*! ./tweetBox */ 5);
	
	function home() {
		(0, _tweetBox.tweetBox)();
	}

/***/ },
/* 5 */
/*!***************************************************!*\
  !*** ./front-end/javascripts/modules/tweetBox.js ***!
  \***************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tweetBox = tweetBox;
	function setFocus(el) {
	  var range = document.createRange();
	  var sel = window.getSelection();
	  range.setStart(el, 0);
	  range.collapse(true);
	  sel.removeAllRanges();
	  sel.addRange(range);
	}
	function tweetBox() {
	  var doc = document;
	  var tb = doc.getElementsByClassName('tweet-box')[0];
	  if (!tb) return null;
	  var tbd = tb.getElementsByTagName('div')[0];
	  var tbdString = '<div><br></div>';
	
	  tb.addEventListener('focus', function (ev) {
	    tb.classList.remove('condensed');
	    if (tb.getElementsByTagName('div') && tb.getElementsByTagName('div')[0].innerText.trim().length) {
	
	      tb.classList.remove('showPlaceholder');
	    } else {
	      tb.classList.add('showPlaceholder');
	    }
	    if (tbd.innerHTML === 'What\'s happening?') {
	
	      tbd.innerHTML = '<br>';
	    }
	  });
	  tb.addEventListener('keyup', function (ev) {
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
	  });
	
	  tb.addEventListener('keydown', function (ev) {
	    if (tb.getElementsByTagName('div')[0] && tb.getElementsByTagName('div')[0].textContent) {
	      tb.classList.remove('showPlaceholder');
	    };
	    if (tb.innerHTML === '<br>') {
	      tb.innerHTML = tbdString;
	      setFocus(tb.getElementsByTagName('div')[0]);
	    }
	  });
	}

/***/ },
/* 6 */
/*!*******************************************************!*\
  !*** ./front-end/javascripts/modules/apiOperation.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _templateObject = _taggedTemplateLiteral(['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  '], ['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  ']),
	    _templateObject2 = _taggedTemplateLiteral(['\n        ', '\n      '], ['\n        ', '\n      ']);
	
	exports.initXhr = initXhr;
	
	var _ajax = __webpack_require__(/*! ../common/ajax */ 7);
	
	var _constant = __webpack_require__(/*! ../global/constant */ 10);
	
	var _template = __webpack_require__(/*! ../common/template */ 11);
	
	var _popup = __webpack_require__(/*! ../common/popup */ 13);
	
	var _slide = __webpack_require__(/*! ../common/slide */ 15);
	
	var _utilities = __webpack_require__(/*! ../common/utilities */ 9);
	
	var _flash = __webpack_require__(/*! ../common/flash */ 16);
	
	var _treeDom = __webpack_require__(/*! ../api-tree/treeDom */ 17);
	
	var _twoWayDataBinding = __webpack_require__(/*! ../common/twoWayDataBinding */ 23);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
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
	function initXhr() {
	  getAllApis();
	}
	
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
	  var header = document.getElementsByTagName('header')[0];
	  var newApiStr = '\n    <div class="api-add-query">\n      <span class="add-api-btn">new API</span>\n      <div class="api-search-wrapper">\n        <input class="api-query" type="search" placeholder="search">\n        <div class="api-search-result hide"></div>\n      </div>\n      <a class="c-hide icon-text-link c-float-right dev-env-settings" href="javascript:;"><span class="icon-text-icon"><svg class="icon icon-settings icon-fit"><use xlink:href="#icon-settings"></use></svg></span><span class="icon-text-text">\u73AF\u5883\u540C\u6B65\u6570\u636E\u914D\u7F6E</span></a>\n    </div>\n  ';
	  newApiDiv = (0, _utilities.strToDom)(newApiStr);
	  newApiDiv.getElementsByClassName('add-api-btn')[0].addEventListener('click', debouncedNewApiBtn);
	  newApiDiv.getElementsByClassName('dev-env-settings')[0].addEventListener('click', debouncedEnvBtn);
	  (0, _utilities.insertAfter)(newApiDiv, header);
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

/***/ },
/* 7 */
/*!**********************************************!*\
  !*** ./front-end/javascripts/common/ajax.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.$http = $http;
	
	var _serialize = __webpack_require__(/*! ./serialize */ 8);
	
	var _utilities = __webpack_require__(/*! ./utilities */ 9);
	
	var _csrf = __webpack_require__(/*! ./csrf */ 3);
	
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

/***/ },
/* 8 */
/*!***************************************************!*\
  !*** ./front-end/javascripts/common/serialize.js ***!
  \***************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.serialize = serialize;
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
	      str.push((typeof v === 'undefined' ? 'undefined' : _typeof(v)) == 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
	    }
	  }
	  return str.join('&');
	}

/***/ },
/* 9 */
/*!***************************************************!*\
  !*** ./front-end/javascripts/common/utilities.js ***!
  \***************************************************/
/***/ function(module, exports) {

	'use strict';
	
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

/***/ },
/* 10 */
/*!**************************************************!*\
  !*** ./front-end/javascripts/global/constant.js ***!
  \**************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var rootAPI = exports.rootAPI = window.location.origin + '/apis';

/***/ },
/* 11 */
/*!**************************************************!*\
  !*** ./front-end/javascripts/common/template.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.html = html;
	
	var _htmlEscape = __webpack_require__(/*! ./htmlEscape */ 12);
	
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

/***/ },
/* 12 */
/*!****************************************************!*\
  !*** ./front-end/javascripts/common/htmlEscape.js ***!
  \****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.htmlEscape = htmlEscape;
	function htmlEscape(str) {
	  str = '' + str; // for numbers etc.
	  return str.replace(/&/g, '&amp;') // first!
	  .replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/`/g, '&#96;');
	}

/***/ },
/* 13 */
/*!***********************************************!*\
  !*** ./front-end/javascripts/common/popup.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.popup = popup;
	
	var _toggleScroll = __webpack_require__(/*! ./toggleScroll */ 14);
	
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

/***/ },
/* 14 */
/*!******************************************************!*\
  !*** ./front-end/javascripts/common/toggleScroll.js ***!
  \******************************************************/
/***/ function(module, exports) {

	'use strict';
	
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
	  if (e.preventDefault) e.preventDefault();
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
	    window.addEventListener('DOMMouseScroll', preventDefault, false);
	  window.onwheel = preventDefault; // modern standard
	  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
	  window.ontouchmove = preventDefault; // mobile
	  document.onkeydown = preventDefaultForScrollKeys;
	}
	
	function enableScroll() {
	  if (window.removeEventListener) window.removeEventListener('DOMMouseScroll', preventDefault, false);
	  window.onmousewheel = document.onmousewheel = null;
	  window.onwheel = null;
	  window.ontouchmove = null;
	  document.onkeydown = null;
	}

/***/ },
/* 15 */
/*!***********************************************!*\
  !*** ./front-end/javascripts/common/slide.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.slide = slide;
	
	var _popup = __webpack_require__(/*! ../common/popup */ 13);
	
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

/***/ },
/* 16 */
/*!***********************************************!*\
  !*** ./front-end/javascripts/common/flash.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.flash = flash;
	exports.parseAndFlash = parseAndFlash;
	
	var _utilities = __webpack_require__(/*! ./utilities */ 9);
	
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

/***/ },
/* 17 */
/*!***************************************************!*\
  !*** ./front-end/javascripts/api-tree/treeDom.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * width of single svg path: 30px
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ApiDom = ApiDom;
	
	var _tree = __webpack_require__(/*! ./tree */ 18);
	
	var _ajax = __webpack_require__(/*! ../common/ajax */ 7);
	
	var _popup = __webpack_require__(/*! ../common/popup */ 13);
	
	var _constant = __webpack_require__(/*! ../global/constant */ 10);
	
	var _flash = __webpack_require__(/*! ../common/flash */ 16);
	
	var _treeDataCollect = __webpack_require__(/*! ./treeDataCollect */ 20);
	
	var _utilities = __webpack_require__(/*! ./utilities */ 21);
	
	var _jsonTreeConverter = __webpack_require__(/*! ./jsonTreeConverter */ 22);
	
	var _twoWayDataBinding = __webpack_require__(/*! ../common/twoWayDataBinding */ 23);
	
	var _callbacks = __webpack_require__(/*! ../common/callbacks */ 24);
	
	var _scroll = __webpack_require__(/*! ../common/scroll */ 25);
	
	var _utilities2 = __webpack_require__(/*! ../common/utilities */ 9);
	
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
	};
	
	/*
	single leaf width: 460px;
	 */
	var perLeafWidth = 460;
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
	      if (data.nodes[i].data === undefined || data.nodes[i].data === "") {
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

/***/ },
/* 18 */
/*!************************************************!*\
  !*** ./front-end/javascripts/api-tree/tree.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tree = Tree;
	
	var _queue = __webpack_require__(/*! ./queue */ 19);
	
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
	
	/* tree addon*/
	
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
	    node.data.hasChild = node.children.length > 0 ? true : false;
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

/***/ },
/* 19 */
/*!*************************************************!*\
  !*** ./front-end/javascripts/api-tree/queue.js ***!
  \*************************************************/
/***/ function(module, exports) {

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

/***/ },
/* 20 */
/*!***********************************************************!*\
  !*** ./front-end/javascripts/api-tree/treeDataCollect.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.collectApiData = collectApiData;
	
	var _utilities = __webpack_require__(/*! ../common/utilities */ 9);
	
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
	    nodeData.data.hasChild = node.children.length > 0 ? true : false;
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

/***/ },
/* 21 */
/*!*****************************************************!*\
  !*** ./front-end/javascripts/api-tree/utilities.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.getMaxOfArray = getMaxOfArray;
	exports.hasClass = hasClass;
	exports.browserPrefix = browserPrefix;
	exports.getTransform = getTransform;
	exports.getTranslateX = getTranslateX;
	exports.getTranslateY = getTranslateY;
	exports.beautifyJSON = beautifyJSON;
	exports.hightlightJSON = hightlightJSON;
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
	      str.push((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
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

/***/ },
/* 22 */
/*!*************************************************************!*\
  !*** ./front-end/javascripts/api-tree/jsonTreeConverter.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jsonToTree = jsonToTree;
	exports.treeToJson = treeToJson;
	
	var _tree = __webpack_require__(/*! ./tree */ 18);
	
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

/***/ },
/* 23 */
/*!***********************************************************!*\
  !*** ./front-end/javascripts/common/twoWayDataBinding.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	'use strict';
	
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
	            if (value === true || value === "true") {
	              el.classList.add('toggle-true');
	            } else if (value === false || value === "false") {
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
	    bol = arr[i] === document.activeElement ? true : false;
	  }
	  return bol;
	}

/***/ },
/* 24 */
/*!***************************************************!*\
  !*** ./front-end/javascripts/common/callbacks.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.callbacks = undefined;
	
	var _flash = __webpack_require__(/*! ./flash */ 16);
	
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

/***/ },
/* 25 */
/*!************************************************!*\
  !*** ./front-end/javascripts/common/scroll.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.scrollBarH = scrollBarH;
	
	var _utilities = __webpack_require__(/*! ./utilities */ 9);
	
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

/***/ },
/* 26 */
/*!*******************************************************!*\
  !*** ./front-end/javascripts/modules/fisCiPlugins.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.fcp = fcp;
	
	var _ajax = __webpack_require__(/*! ../common/ajax */ 7);
	
	function fcp() {
		console.log('fcp');
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjRmZWM5OThjMWFlY2JlYzZiY2QiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvZ2xvYmFsL2NvbnN0YW50LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zbGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2pzb25UcmVlQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZmlzQ2lQbHVnaW5zLmpzIl0sIm5hbWVzIjpbInJvdXRlcyIsInBhdGhOYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImhhc093blByb3BlcnR5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibGVuZ3RoIiwiaSIsImFwcGx5IiwiZGF0YUxpbmtzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJvY2Vzc0RhdGFMaW5rIiwiZSIsInRhcmdldCIsInRhZ05hbWUiLCJkYXRhc2V0IiwibWV0aG9kIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVNZXRob2QiLCJsaW5rIiwib2JqIiwiaHJlZiIsImdldEF0dHJpYnV0ZSIsImNzcmZUb2tlbiIsImNzcmZQYXJhbSIsInBhcmFtc09iaiIsImZvcm1FbGUiLCJjcmVhdGVGb3JtIiwiYXBwZW5kRm9ybVRvRG9tIiwic3VibWl0Rm9ybSIsInBhcmFtcyIsImYiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0QXR0cmlidXRlIiwicyIsInVuZGVmaW5lZCIsImlzQ3Jvc3NEb21haW4iLCJhcHBlbmRDaGlsZCIsImZvcm0iLCJib2R5Iiwic3VibWl0Iiwicm9yUGFyYW1zIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbkFuY2hvciIsInVybEFuY2hvciIsInVybCIsInByb3RvY29sIiwiaG9zdCIsImhvbWUiLCJ0d2VldEJveCIsInNldEZvY3VzIiwiZWwiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsIiwiZ2V0U2VsZWN0aW9uIiwic2V0U3RhcnQiLCJjb2xsYXBzZSIsInJlbW92ZUFsbFJhbmdlcyIsImFkZFJhbmdlIiwiZG9jIiwidGIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGJkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0YmRTdHJpbmciLCJldiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImlubmVyVGV4dCIsInRyaW0iLCJhZGQiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCIsInNldFRpbWVvdXQiLCJpbml0WGhyIiwicGF5bG9hZCIsImFwaXNBcnIiLCJjYWxsYmFjayIsImdldEFwaVN1Y2Nlc3MiLCJkYXRhIiwiYWRkQXBpVHJlZSIsIkpTT04iLCJwYXJzZSIsImdldEFsbEFwaXNTdWNjZXNzIiwiZGF0YUJhayIsIkpTT05CYWsiLCJuZXdBcGlCdG4iLCJyZW5kZXJBbGxBcGlzIiwiYmluZGV2ZW50cyIsImxpc3RlbkFwaVF1ZXJ5IiwicGF0Y2hTdWNjZXNzIiwicG9zdFN1Y2Nlc3MiLCJkZWxldGVTdWNjZXNzIiwiZGVzdG9yeUFwaUxpIiwiY2xvc2VzdCIsInJlbW92ZUNoaWxkIiwiYmluZCIsImFwaVF1ZXJ5U3VjY2VzcyIsInNlYXJjaExpc3QiLCJkYXRhT2JqIiwiY29udGVudFN0ciIsIkxlbiIsInVyaSIsInNlY3Rpb24iLCJkZXNjcmlwdGlvbiIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJnZXRBbGxBcGlzIiwiZGVib3VuY2VkQXBpUXVlcnlJbnB1dCIsImFwaVF1ZXJ5IiwiYXBpUXVlcnlJbnB1dCIsImluV3JhcHBlciIsInBhcmVudEVsZW1lbnQiLCJjaGVja0lmRm9jdXMiLCJjbGVhclNlYXJjaFJlc3VsdCIsImFjdGl2ZUVsZW1lbnQiLCJ2YWx1ZSIsInEiLCJvcmlnaW4iLCJnZXQiLCJ0aGVuIiwiY2F0Y2giLCJhcGlTZWFyY2hSZXN1bHRFbGUiLCJ0b2dnbGVGb2xkTGkiLCJjb250ZXh0IiwidG9nZ2xlIiwiY29udGFpbnMiLCJiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwiYXBpSWQiLCJhcGlMaXMiLCJzbGljZSIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJjb250YWluZXJOb2RlIiwiaXNOZXdBcGkiLCJuZXdBcGkiLCJwdXNoIiwiZGVib3VuY2VkTmV3QXBpQnRuIiwicHJvY2Vzc05ld0FwaUNsaWNrIiwiZGVib3VuY2VkRW52QnRuIiwicHJvY2Vzc09wZW5FbnZTZXR0aW5ncyIsImNvbnRlbnQiLCJzbGlkZUNvbnRlbnQiLCJ0cGxTdHIiLCJhcGlVbCIsImNyZWF0ZUFwaVVsIiwiYmFzZUFwaUxpIiwibmV3QXBpTGlUcGwiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiY2hpbGRyZW4iLCJhcGlMaXN0RWxlIiwiYXBpVWxFbGUiLCJuZXdBcGlEaXYiLCJoZWFkZXIiLCJuZXdBcGlTdHIiLCJ0cGwiLCJpZCIsIndpa2lMaW5rIiwidG1wbCIsIm1hcCIsIml0ZW0iLCIkaHR0cCIsImNvcmUiLCJhamF4IiwiYXJncyIsInByZWZpeCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNsaWVudCIsIlhNTEh0dHBSZXF1ZXN0Iiwic3RyaW5naWZ5IiwiZXh0ZW5kR2VuZXJhbFBhcmFtcyIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIm9ubG9hZCIsInN0YXR1cyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0Iiwib25lcnJvciIsImVyciIsImdlbmVyYWxPYmoiLCJ1dGY4IiwiZm9ybWF0Iiwic2VyaWFsaXplIiwic3RyIiwicCIsImsiLCJ2IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImlzRW1wdHkiLCJjbG9uZU9iaiIsIm1lcmdlT2JqIiwiYWRkUHJlZml4VG9PYmoiLCJ3cmFwT2JqIiwic3RyVG9Eb20iLCJpbnNlcnRBZnRlciIsImRlYm91bmNlIiwiaXNTdHJpY3RNb2RlIiwiZ2VuZXJhdGVVVUlEIiwia2V5cyIsIm9iajEiLCJvYmoyIiwibmV3T2JqIiwia2V5Iiwid3JhcHBlciIsInRtcEVsZSIsInJldHVybkRvbSIsIm5ld05vZGUiLCJyZWZlcmVuY2VOb2RlIiwibmV4dFNpYmxpbmciLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJhcmd1bWVudHMiLCJsYXRlciIsImNhbGxOb3ciLCJjbGVhclRpbWVvdXQiLCJpc1N0cmljdCIsInJlcGxhY2UiLCJjIiwiciIsIk1hdGgiLCJyYW5kb20iLCJyb290QVBJIiwiaHRtbCIsImxpdGVyYWxTZWN0aW9ucyIsInJhdyIsInJlc3VsdCIsInN1YnN0cyIsInN1YnN0IiwibGl0IiwiQXJyYXkiLCJpc0FycmF5IiwiZW5kc1dpdGgiLCJodG1sRXNjYXBlIiwicG9wdXAiLCJwb3B1cEVsZSIsImdlbmVyYXRlUG9wdXBUcGwiLCJwb3NpdGlvblBvcHVwRWxlIiwiYmluZFBvcHVwRXZlbnRzIiwiZWxlIiwiY2xvc2VQb3B1cCIsImNvbmZpcm0iLCJjb29yZGluYXRlcyIsInRyYW5zZm9ybSIsImNsaWVudFgiLCJjbGllbnRZIiwiY3VycmVudFRhcmdldCIsInBvcExheWVyIiwiZGlzYWJsZVNjcm9sbCIsImVuYWJsZVNjcm9sbCIsImV2ZW50IiwicmV0dXJuVmFsdWUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwib253aGVlbCIsIm9ubW91c2V3aGVlbCIsIm9udG91Y2htb3ZlIiwib25rZXlkb3duIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRlIiwic2xpZGVFbGUiLCJnZW5lcmF0ZVNsaWRlVHBsIiwicG9zaXRpb25TbGlkZUVsZSIsImJpbmRTbGlkZUV2ZW50cyIsImNsb3NlU2xpZGUiLCJjbGlja1NoYWRvdyIsImZsYXNoIiwicGFyc2VBbmRGbGFzaCIsImZsYXNoRWxlIiwiZmxhc2hUcGwiLCJkZXN0b3J5IiwibWVzc2FnZSIsImpzb25EYXRhIiwiQXBpRG9tIiwicGVyQXBpVHBsIiwiYXBpVVVJRCIsInBhdGNoT3JQb3N0Iiwic2F2ZU9yQ3JlYXRlIiwibGVhZlRwbCIsImxlYWZDb250ZW50VHBsIiwiaW5pdFJlY3RPYmoiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsImxlYWZEYXRhUGxhY2VIb2xkZXIiLCJkYXRhTmFtZSIsImRhdGFUeXBlIiwiZGF0YVZhbHVlIiwiZGF0YVF1YW50aXR5IiwiaGFzQ2hpbGQiLCJwZXJMZWFmV2lkdGgiLCJwZXJMZWFmSGVpZ2h0IiwibGVhdmVzVmVydGljYWxHYXAiLCJwZXJTVkdQYXRoV2lkdGgiLCJyb290Tm9kZVdpZHRoIiwiYXBpUmF3RGF0YSIsImFwaURhdGFPYmoiLCJhcGlDb250YWluZXIiLCJhcGlSZXNwb25kU3VjY2VzcyIsImpzb25PYmoiLCJwcmV2aWV3RGF0YSIsInByZXZpZXdEYXRhT2JqIiwic3dpdGNoUHJldmlldyIsImV2ZW50Q29udGV4dCIsImNyZWF0ZVBlckFwaSIsInBlckFwaUVsZSIsImNyZWF0ZU5ld0FwaUluaXREYXRhIiwiaW5pdERhdGEiLCJub2RlSWQiLCJwYXJlbnRJZCIsImZpcnN0Q2hpbGREYXRhIiwibW9kZSIsImRlYnVnQWRkciIsIm5vZGVzIiwiYXBpQmluZERhdGEiLCJhcGlFbGUiLCJsZWFmSW5kZXgiLCIkYXBpVHJlZSIsIiRhcGlUcmVlRnJhbWUiLCIkYXBpVHJlZUNvbnRlbnQiLCJyZW5kZXJFeGlzdFRyZWUiLCJhcGlSZXR1cm5EYXRhIiwiYmluZEV2ZW50Iiwic2V0TW9kZVZhbCIsInNldERlYnVnQWRkciIsInNjcm9sbEJhciIsIm92ZXJmbG93RWxlIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJwZXJUV0RCQXJyIiwibm9kZXNBcnIiLCJub2RlRGF0YSIsImxlYWYiLCJsZWFmRGF0YSIsInBlclRXREIiLCJsZW4iLCJnZW5lcmF0ZUxlYWYiLCJhcGlUcmVlIiwiY2FsY0RpbWVuc2lvbnMiLCJkcmF3U1ZHIiwibmV3TGVhZlNwYW4iLCJyb3VuZCIsImNvbHVtbiIsInRvdGFsb2Zmc2V0eWxldmVsIiwidmFsIiwicmFkaW9zIiwiX3RoaXMiLCJldlRhcmdldENsYXNzTGlzdCIsIl9ldiIsImRvbUNvbnRhaW5lciIsInBhdGNoIiwicG9zdCIsImFkZENoaWxkIiwiZGVsZXRlQXBpIiwiZGVsTm9kZSIsImRhd25fdXJpIiwiZm4iLCJwcmV2aWV3Q29udGV4dCIsInByZXZpZXdUeXBlIiwicHJldmlld1N0ciIsImpzb25WaWV3Iiwic3dpdGNoUHJldmlld1N0YXR1cyIsImFwcGx5VHlwZSIsInByZXZpZXdUeXBlcyIsImFwaVJlc3BvbmRQcmV2aWV3RWxlIiwiYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0FyciIsImNsYXNzTmFtZSIsInNwbGl0IiwiYXJyYXkiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwicHJldmlld1R5cGVFbGVzQXJyIiwiYXBpU2F2ZSIsImFkZExlYWZDaGlsZCIsInJlbW92ZUxlYWZDaGlsZCIsImFwaVRlc3QiLCIkcHJlIiwiJGRhdGFWaWV3RWxlIiwiZGVsZXRlIiwic3RvcmVBcGlSZXR1cm5EYXRhIiwiJGRhdGFCZWF1dGlmeSIsImNsaWNrIiwiaW5pdEFwaVRyZWUiLCJ0cmF2ZXJzZUJGIiwidHJlZURvY0ZyYWciLCJub2RlIiwibGVhZkVsZSIsImxlYWZCaW5kRGF0YSIsInBhcmVudCIsImN0eCIsImN1cnJlbnRMZWFmIiwiY3VycmVudElkeCIsInBhcmVudElkeCIsInRyYXZlcnNlRGVzY2VuZGFudHMiLCJpZHhBcnIiLCJub2Rlc0FyclRvSWR4QXJyIiwicmVtb3ZlTm9kZXNGcm9tRG9tIiwiYXBwbHlTdHlsZSIsInN0eWxlTm9kZXMiLCJzZXRQYXJlbnROb2RlVmFsIiwicmVuZGVyIiwiYXJyIiwiYWxsTGVhdmVzIiwiYWxsTGVhdmVzTGVuIiwibm9kZXNBcnJMZW4iLCJsZWF2ZXMiLCJxdWV1ZSIsInRyYXZlcnNlRGlyZWN0Q2hpbGQiLCJxdWV1ZUxlbiIsIl9uZXdlc3RJbmRleCIsIl9vbGRlc3RJbmRleCIsIngiLCJtYXhJZCIsInBhcmVudElkZXgiLCJsZWFmQ2hpbGQiLCJjcmVhdGVMZWFmIiwiY2hpbGRNb2RlbCIsImdlbmVyYXRlTGVhZlNwYW4iLCJub2RlSW5kZXgiLCJub2RlSWR4IiwibGVhdmVzSGFzaCIsImxlYXZlc0xlbiIsImRpbWVuc2lvbkFyciIsImNsb25lUmVjdE9iaiIsImNsZWFyU1ZHIiwic3ZnIiwibGFzdENoaWxkIiwidGhhdCIsInN2Z1BhcnRpYWxzIiwiY3JlYXRlU2luZ2xlU1ZHIiwidHJhdmVyc2VERiIsImhvcmkiLCJwYXJlbnRWZXJ0IiwiZHZlcnQiLCJzdmducyIsIm5ld1BhdGgiLCJjcmVhdGVFbGVtZW50TlMiLCJjb250cm9sUmF0ZSIsIm14IiwibXkiLCJxeCIsInF5IiwicXh4IiwicXl5IiwidHgiLCJ0eSIsInNldEF0dHJpYnV0ZU5TIiwiaG9yaU1heCIsInZlcnRpY2FsTWF4IiwiaG9yaUFyciIsInZlcnRBcnIiLCJkZXB0aCIsIm1heCIsIl9yb290IiwiY2hpbGRyZW5sZXZlbCIsIm5vZGVMZWZ0T2Zmc2V0IiwiZWxSZWN0T2JqZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keVJlY3RPYmoiLCJjbG9uZUJvZHlSZWN0T2JqIiwiY2xvbmVFbFJlY3RPYmplY3QiLCJhYnMiLCJUcmVlIiwiTm9kZSIsInJlY3Vyc2UiLCJjdXJyZW50Tm9kZSIsImNhbGNDaGlsZHJlbkxldmVscyIsInRvdGFsQ2hpbGRyZW5MZXZlbHMiLCJjYWxjQ2hpbGRyZW5MZXZlbCIsImNhbGNPZmZZIiwiZmluZEluZGV4IiwidG90YWxZIiwiY2FsY1RvdGFsT2Zmc2V0WUxldmVsIiwibGV2ZWxnYXAiLCJlbnF1ZXVlIiwiY3VycmVudFRyZWUiLCJkZXF1ZXVlIiwidHJhdmVyc2FsIiwidG9EYXRhIiwiY2hpbGQiLCJFcnJvciIsImNoZWNrRGF0YUhhc0NoaWxkIiwiZnJvbURhdGEiLCJ0cmVlIiwiY2hpbGRUb1JlbW92ZSIsIm5vZGVkYXRhIiwic3R5bGVPYmoiLCJkZXNjZW5kYW50c0FyciIsIm1heE5vZGVJZCIsImRlcHRoQXJyIiwiZGltZW5zaW9ucyIsIlF1ZXVlIiwiX3N0b3JhZ2UiLCJzaXplIiwib2xkZXN0SW5kZXgiLCJuZXdlc3RJbmRleCIsImRlbGV0ZWREYXRhIiwiY29sbGVjdEFwaURhdGEiLCJvcEVsZSIsImNvbGxlY3RJbmZvIiwiY29sbGVjdERhdGFGcm9tVHJlZSIsImluZm9FbGUiLCJNb2Rlc1Jvd0VsZSIsImluZm9EYXRhIiwiZ2V0TW9kZVZhbCIsImdldERlYnVnQWRkciIsIm1vZGVWYWwiLCJjaGVja2VkIiwiY29sbGVjdFRyZWUiLCJ0cmVlRWxlIiwidHJlZURhdGFBcnIiLCJ0cmVlRGF0YU9iaiIsInF1YW50aXR5IiwiZGltZW5zaW9uc0FyciIsImhVbml0IiwidlVuaXQiLCJnZXRNYXhPZkFycmF5IiwiaGFzQ2xhc3MiLCJicm93c2VyUHJlZml4IiwiZ2V0VHJhbnNmb3JtIiwiZ2V0VHJhbnNsYXRlWCIsImdldFRyYW5zbGF0ZVkiLCJiZWF1dGlmeUpTT04iLCJoaWdodGxpZ2h0SlNPTiIsIm51bUFycmF5IiwiZWxlbSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJvcGVuRGF0YWJhc2UiLCJvcGVyYSIsImFsbCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwicmVzdWx0cyIsIm1hdGNoIiwid2Via2l0VHJhbnNmb3JtIiwibW96VHJhbnNmb3JtIiwibWF0IiwicGFyc2VGbG9hdCIsImpzT2JqIiwianNvbiIsImNscyIsInRlc3QiLCJqc29uVG9UcmVlIiwidHJlZVRvSnNvbiIsImhhc2hUYWJsZSIsIm5vZGVzTGVuIiwibW9kS2V5c0FyciIsInJlbW92ZUVsZUZyb21BcnIiLCJOdW1iZXIiLCJzb3J0Iiwic29ydE51bWJlciIsInJvb3ROb2RlRGF0YSIsImoiLCJrZXlzTGVuIiwia2V5QXJyTGVuIiwiYSIsImIiLCJ0d29XYXlEYXRhQmluZGluZyIsImRvbUNvbnRleHQiLCJtb2RlbCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsInNldCIsInNlbGVjdG9yVG9BcnJheSIsImNvbmNhdCIsImhhc0F0dHJpYnV0ZSIsImhhc0FjdGl2ZUVsZSIsImVsQW5kRGVzY2VuZGFudHMiLCJoYW5kbGVyIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWF0Y2hlcyIsInJlc3VsdEFyciIsImxvb3AiLCJjaGlsZHJlbkVsZXMiLCJjaGlsZEVsZW1lbnRDb3VudCIsImJvbCIsImNhbGxiYWNrcyIsInNjcm9sbEJhckgiLCJnZW5lcmF0ZVNjcm9sbFN0ciIsInNjcm9sbFN0ciIsIm9wdGlvbnMiLCJuZXdTY3JvbGxTdHIiLCJuZXdTY3JvbGxFbGUiLCJZIiwic2Nyb2xsYmFyIiwiTiIsImluaXRQb3MiLCJNIiwiaW5pdERvbSIsIlUiLCJtb3VzZXdoZWVsIiwibCIsIm1vdXNld2hlZWxsb2NrIiwiSCIsIndoZWVsZGVsdGEiLCJ6IiwiY3RybGJsb2NrIiwiSiIsInN0ZXAiLCJJIiwic2NhbGUiLCJHIiwidGhlbWUiLCJhZCIsInJlZnJlc2giLCJTIiwiVCIsImgiLCJWIiwiYWciLCJhZiIsInBhcnNlSW50Iiwic2Nyb2xsTGVmdCIsImciLCJ1IiwiRiIsImFlIiwiVyIsIlEiLCJSIiwibSIsIkMiLCJMIiwiZCIsInQiLCJhYiIsIlAiLCJEIiwieSIsIlgiLCJjbGVhckludGVydmFsIiwib2Zmc2V0V2lkdGgiLCJhaCIsIm8iLCJaIiwibWVtT2Zmc2V0WCIsIm9mZnNldExlZnQiLCJzY3JvbGxXaWR0aCIsInNldEludGVydmFsIiwib25EcmFnc3RhcnQiLCJvbnNlbGVjdHN0YXJ0IiwibiIsImFhIiwiSyIsIk8iLCJFIiwiYWMiLCJCIiwib2Zmc2V0WCIsImxheWVyWCIsImRlYm91bmNlZFdpbmRvd1Jlc2l6ZSIsInJlUmVuZGVyIiwiZGlzcG9zZSIsImZjcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDLFlBQU07QUFDTCxPQUFJQSxTQUFTO0FBQ1gsd0JBRFc7QUFFWCxhQUFRLHVCQUZHO0FBR1g7QUFIVyxJQUFiO0FBS0EsT0FBSUMsV0FBV0MsT0FBT0MsUUFBUCxDQUFnQkMsUUFBL0I7QUFDQSxPQUFJSixPQUFPSyxjQUFQLENBQXNCSixRQUF0QixDQUFKLEVBQXFDO0FBQ25DLFNBQUlLLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQlQsT0FBT0MsUUFBUCxDQUEvQixNQUFxRCxnQkFBckQsSUFDRkQs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QUFDeEIsU0FBSTVCLENBQUosRUFBTztBQUNMOW5CLGdCQUFTOG9CLGFBQVQsR0FBeUJoQixDQUF6QjtBQUNELE1BRkQsTUFFTztBQUNMOW5CLGdCQUFTOG9CLGFBQVQsR0FBeUIsWUFBVztBQUNsQyxnQkFBTyxJQUFQO0FBQ0QsUUFGRDtBQUdEO0FBQ0Q5b0IsY0FBU3dRLG1CQUFULENBQTZCLFdBQTdCLEVBQTBDbFAsQ0FBMUM7QUFDQXRCLGNBQVN3USxtQkFBVCxDQUE2QixTQUE3QixFQUF3Q3dZLEVBQXhDO0FBQ0FocEIsY0FBU3dRLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDMFgsQ0FBeEM7QUFDQSxTQUFJekUsQ0FBSixFQUFPO0FBQ0wyRSxxQkFBYzNFLENBQWQ7QUFDRDtBQUNELFNBQUlzRSxFQUFKLEVBQVE7QUFDTksscUJBQWNMLEVBQWQ7QUFDRDtBQUNELFNBQUlDLENBQUosRUFBTztBQUNMSSxxQkFBY0osQ0FBZDtBQUNEO0FBQ0QsU0FBSUMsQ0FBSixFQUFPO0FBQ0xHLHFCQUFjSCxDQUFkO0FBQ0Q7QUFDRixJQXZCRDtBQXdCRCxFOzs7Ozs7Ozs7Ozs7OztTQ3pVZTBCLEcsR0FBQUEsRzs7QUFGaEI7O0FBRU8sVUFBU0EsR0FBVCxHQUFlO0FBQ3JCdmpCLFVBQVFDLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsRSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDI0ZmVjOTk4YzFhZWNiZWM2YmNkIiwiaW1wb3J0IHtkYXRhTGlua3N9IGZyb20gJy4vbW9kdWxlcy9kYXRhTGlua3MnO1xuaW1wb3J0IHtob21lfSBmcm9tICcuL21vZHVsZXMvaG9tZXBhZ2UnO1xuXG5pbXBvcnQge2luaXRYaHJ9IGZyb20gJy4vbW9kdWxlcy9hcGlPcGVyYXRpb24nO1xuZGF0YUxpbmtzKCk7XG5pbXBvcnQge2ZjcH0gZnJvbSAnLi9tb2R1bGVzL2Zpc0NpUGx1Z2lucyc7XG4vLyBhcGlUcmVlKCk7XG4vLyB2YXIgcCA9IG5ldyBkYXduU1ZHKCk7XG4vLyBwLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhaW50ZXItdGFyZ2V0JykpO1xuLy8gcC5zdGFydCgpO1xuXG4oKCkgPT4ge1xuICBsZXQgcm91dGVzID0ge1xuICAgICcvJzogaG9tZSxcbiAgICAnL2Rldic6IFtpbml0WGhyXSxcbiAgICAnL2Zpc19jaV9wbHVnaW5zL25ldyc6IGZjcFxuICB9O1xuICBsZXQgcGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChyb3V0ZXMuaGFzT3duUHJvcGVydHkocGF0aE5hbWUpKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyb3V0ZXNbcGF0aE5hbWVdKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuICAgICAgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZXNbcGF0aE5hbWVdW2ldLmFwcGx5KG51bGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmFwcGx5KG51bGwpO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyIsImltcG9ydCB7aGFuZGxlTWV0aG9kfSBmcm9tICcuLi9jb21tb24vaGFuZGxlTWV0aG9kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFMaW5rcygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzRGF0YUxpbmssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NEYXRhTGluayhlKSB7XG4gIHZhciBlID0gd2luZG93LmUgfHwgZTtcblxuICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKVxuICAgICAgcmV0dXJuO1xuXG4gIC8vIERvIHNvbWV0aGluZ1xuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdkZWxldGUnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAnUEFUQ0gnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgLy8gaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAncGF0Y2gnKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCwge1xuICAvLyAgICAgbnM6ICdhcGknLFxuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBzZWN0aW9uOiAnd2lzZScsXG4gIC8vICAgICAgIGlkOiAnMidcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9kYXRhTGlua3MuanMiLCJpbXBvcnQge3JvclBhcmFtcyBhcyBSUHN9IGZyb20gJy4uL2NvbW1vbi9jc3JmJztcbi8qKlxuICogW2hhbmRsZU1ldGhvZCBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBsaW5rIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKiBIYW5kbGVzIFwiZGF0YS1tZXRob2RcIiBvbiBsaW5rcyBzdWNoIGFzOlxuICogPGEgaHJlZj1cIi91c2Vycy81XCIgZGF0YS1tZXRob2Q9XCJkZWxldGVcIiByZWw9XCJub2ZvbGxvd1wiIGRhdGEtY29uZmlybT1cIkFyZSB5b3Ugc3VyZT9cIj5EZWxldGU8L2E+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVNZXRob2QobGluaywgb2JqID0ge30pIHtcbiAgdmFyIGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgIG1ldGhvZCA9IGxpbmsuZGF0YXNldC5tZXRob2QsXG4gICAgdGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpLFxuICAgIGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKSxcbiAgICBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIHZhciBwYXJhbXNPYmogPSB7XG4gICAgaHJlZjogaHJlZixcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICBjc3JmVG9rZW46IGNzcmZUb2tlbixcbiAgICBjc3JmUGFyYW06IGNzcmZQYXJhbVxuICB9O1xuICB2YXIgZm9ybUVsZSA9IGNyZWF0ZUZvcm0ocGFyYW1zT2JqLCBvYmopO1xuICBhcHBlbmRGb3JtVG9Eb20oZm9ybUVsZSk7XG4gIHN1Ym1pdEZvcm0oZm9ybUVsZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb3JtKHBhcmFtcywgb2JqKSB7XG4gIHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGYuc2V0QXR0cmlidXRlKCdtZXRob2QnLCdwb3N0Jyk7XG4gIGYuc2V0QXR0cmlidXRlKCdhY3Rpb24nLHBhcmFtcy5ocmVmKTtcbiAgaWYgKHBhcmFtcy50YXJnZXQpIHtcbiAgICBmLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgcGFyYW1zLnRhcmdldCk7XG4gIH07XG5cbiAgdmFyIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICBpLnNldEF0dHJpYnV0ZSgnbmFtZScsJ19tZXRob2QnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMubWV0aG9kKTtcblxuICB2YXIgcztcbiAgaWYgKHBhcmFtcy5jc3JmUGFyYW0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcGFyYW1zLmNzcmZUb2tlbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAhUlBzLmlzQ3Jvc3NEb21haW4ocGFyYW1zLmhyZWYpKSB7XG4gICAgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgnbmFtZScsIHBhcmFtcy5jc3JmUGFyYW0pO1xuICAgIHMuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLmNzcmZUb2tlbik7XG4gIH1cbiAgZi5hcHBlbmRDaGlsZChpKTtcblxuICAvLyBmb3IgKGxldCBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgLy8gICBpZiAob2JqLmRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAvLyAgICAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCduYW1lJywnJyArIG9iai5ucyArICdbJyArIGtleSArICddJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndmFsdWUnLG9iai5kYXRhW2tleV0pO1xuICAvLyAgICAgZi5hcHBlbmRDaGlsZCh0KTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICBpZiAocykge1xuICAgIGYuYXBwZW5kQ2hpbGQocyk7XG4gIH07XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRGb3JtVG9Eb20oZm9ybSkge1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xufVxuZnVuY3Rpb24gc3VibWl0Rm9ybShmb3JtKSB7XG4gIGZvcm0uc3VibWl0KCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY3NyZi5qcyIsImltcG9ydCB7dHdlZXRCb3h9IGZyb20gJy4vdHdlZXRCb3gnO1xuZXhwb3J0IGZ1bmN0aW9uIGhvbWUoKSB7XG5cdHR3ZWV0Qm94KCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJmdW5jdGlvbiBzZXRGb2N1cyhlbCkge1xuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICByYW5nZS5zZXRTdGFydChlbCwgMCk7XG4gIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbC5hZGRSYW5nZShyYW5nZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdHdlZXRCb3goKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIHRiID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3R3ZWV0LWJveCcpWzBdO1xuICBpZiAoIXRiKSByZXR1cm4gbnVsbDtcbiAgdmFyIHRiZCA9IHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgdmFyIHRiZFN0cmluZyA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdjb25kZW5zZWQnKTtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCkge1xuXG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuY2xhc3NMaXN0LmFkZCgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICh0YmQuaW5uZXJIVE1MID09PSAnV2hhdFxcJ3MgaGFwcGVuaW5nPycpIHtcblxuICAgICAgdGJkLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICB9XG4gIH0pO1xuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmlubmVySFRNTCkge1xuICAgICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgICB9IGVsc2Uge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcblxuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH07XG4gICAgaWYgKHRiLmlubmVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL3R3ZWV0Qm94LmpzIiwiaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xuaW1wb3J0IHtyb290QVBJfSBmcm9tICcuLi9nbG9iYWwvY29uc3RhbnQnO1xuaW1wb3J0IHtodG1sfSBmcm9tICcuLi9jb21tb24vdGVtcGxhdGUnO1xuaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmltcG9ydCB7c2xpZGV9IGZyb20gJy4uL2NvbW1vbi9zbGlkZSc7XG5pbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbSwgZGVib3VuY2V9IGZyb20gJy4uL2NvbW1vbi91dGlsaXRpZXMnO1xuaW1wb3J0IHtmbGFzaCwgcGFyc2VBbmRGbGFzaH0gZnJvbSAnLi4vY29tbW9uL2ZsYXNoJztcbmltcG9ydCB7QXBpRG9tfSBmcm9tICcuLi9hcGktdHJlZS90cmVlRG9tJztcbmltcG9ydCB7dHdvV2F5RGF0YUJpbmRpbmd9IGZyb20gJy4uL2NvbW1vbi90d29XYXlEYXRhQmluZGluZyc7XG5cbmxldCBwYXlsb2FkID0ge307XG5sZXQgYXBpc0FyciA9IFtdO1xuXG52YXIgY2FsbGJhY2sgPSB7XG4gIGdldEFwaVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBhZGRBcGlUcmVlKEpTT04ucGFyc2UoZGF0YSksIHRoaXMsIGZhbHNlKTtcbiAgfSxcbiAgZ2V0QWxsQXBpc1N1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgZGF0YUJhayA9IGRhdGE7XG4gICAgbGV0IEpTT05CYWsgPSBKU09OLnBhcnNlKGRhdGFCYWspO1xuICAgIGlmIChKU09OQmFrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV3QXBpQnRuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbmRlckFsbEFwaXMoZGF0YSk7XG4gICAgYmluZGV2ZW50cygpO1xuICAgIGxpc3RlbkFwaVF1ZXJ5KCk7XG4gIH0sXG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIHBvc3RTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgZGVsZXRlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGZ1bmN0aW9uIGRlc3RvcnlBcGlMaSgpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZCh0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIH1cbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEsIGRlc3RvcnlBcGlMaS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgYXBpUXVlcnlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IHNlYXJjaExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VhcmNoLXJlc3VsdCcpWzBdO1xuICAgIGxldCBkYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsZXQgY29udGVudFN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwLCBMZW4gPSBkYXRhT2JqLmxlbmd0aDsgaSA8IExlbjsgaSsrKSB7XG4gICAgICBjb250ZW50U3RyICs9IGA8ZGl2IGNsYXNzPSdwZXItc2VhcmNoLXJlc3VsdCc+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC11cmlcIj4ke2RhdGFPYmpbaV0udXJpfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcmVzdWx0LWNvbHVtbiBwZXItcmVzdWx0LXNlY3Rpb25cIj4ke2RhdGFPYmpbaV0uc2VjdGlvbn08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1tZXRob2RcIj4ke2RhdGFPYmpbaV0ubWV0aG9kfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcmVzdWx0LWNvbHVtbiBwZXItcmVzdWx0LWRlc2NyaXB0aW9uXCI+JHtkYXRhT2JqW2ldLmRlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIHNlYXJjaExpc3QuaW5uZXJIVE1MID0gY29udGVudFN0cjtcbiAgICBkYXRhT2JqLmxlbmd0aCA+IDAgPyBzZWFyY2hMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSA6IHNlYXJjaExpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAgICBcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICghZGF0YS5kYXRhKSB7XG4gICAgICBuZXdBcGlCdG4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0WGhyKCkge1xuICBnZXRBbGxBcGlzKCk7XG59XG5cbmxldCBkZWJvdW5jZWRBcGlRdWVyeUlucHV0ID0gZGVib3VuY2UoYXBpUXVlcnksIDEwMCwgZmFsc2UpO1xuZnVuY3Rpb24gbGlzdGVuQXBpUXVlcnkoKSB7XG4gIGxldCBhcGlRdWVyeUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXF1ZXJ5JylbMF07XG4gIGxldCBpbldyYXBwZXIgPSBmYWxzZTtcbiAgYXBpUXVlcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGRlYm91bmNlZEFwaVF1ZXJ5SW5wdXQpO1xuICBhcGlRdWVyeUlucHV0LnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKCFjaGVja0lmRm9jdXMuYXBwbHkoYXBpUXVlcnlJbnB1dCwgZXYpKSB7XG4gICAgICBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICAgIH07XG4gICAgaW5XcmFwcGVyID0gZmFsc2U7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaW5XcmFwcGVyID0gdHJ1ZTtcbiAgfSk7XG4gIGFwaVF1ZXJ5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKCFpbldyYXBwZXIpIGNsZWFyU2VhcmNoUmVzdWx0KCk7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYXBpUXVlcnkpO1xufVxuZnVuY3Rpb24gY2hlY2tJZkZvY3VzKGV2KSB7XG4gIHJldHVybiB0aGlzID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xufVxuZnVuY3Rpb24gYXBpUXVlcnkoZXYpIHtcbiAgaWYgKGV2LnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMCkge1xuICAgIGNsZWFyU2VhcmNoUmVzdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHBheWxvYWQgPSB7cTogZXYudGFyZ2V0LnZhbHVlfTtcbiAgJGh0dHAod2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvaW5zdGFudHNlYXJjaCcpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suYXBpUXVlcnlTdWNjZXNzLmJpbmQoZXYpKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuZnVuY3Rpb24gY2xlYXJTZWFyY2hSZXN1bHQoKSB7XG4gIGxldCBhcGlTZWFyY2hSZXN1bHRFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VhcmNoLXJlc3VsdCcpWzBdO1xuICBhcGlTZWFyY2hSZXN1bHRFbGUuaW5uZXJIVE1MID0gJyc7XG4gIGFwaVNlYXJjaFJlc3VsdEVsZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG59XG5mdW5jdGlvbiB0b2dnbGVGb2xkTGkoY29udGV4dCwgZXYpIHtcbiAgaWYgKCFldikge1xuICAgIGNvbnRleHQuY2xhc3NMaXN0LnRvZ2dsZSgndW5mb2xkJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXBpLWxpLXdpa2knKSkge1xuICAgIGNvbnRleHQuY2xhc3NMaXN0LnRvZ2dsZSgndW5mb2xkJyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbihldikge1xuICB0b2dnbGVGb2xkTGkodGhpcywgZXYpO1xuICBpZiAodGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICByZXR1cm47XG4gIH07XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLnBhcmVudE5vZGUuZGF0YXNldC5hcGlJZClcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5nZXRBcGlTdWNjZXNzLmJpbmQodGhpcy5wYXJlbnROb2RlKSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGJpbmRldmVudHMoKSB7XG4gIGxldCBhcGlMaXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbGktc3VtbWFyeScpO1xuICBbXS5zbGljZS5jYWxsKGFwaUxpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEFwaVRyZWUoZGF0YSA9IHt9LCBjb250YWluZXJOb2RlLCBpc05ld0FwaSkge1xuICBsZXQgbmV3QXBpID0gbmV3IEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSk7XG4gIGFwaXNBcnIucHVzaChuZXdBcGkpO1xufVxuXG5sZXQgZGVib3VuY2VkTmV3QXBpQnRuID0gZGVib3VuY2UocHJvY2Vzc05ld0FwaUNsaWNrLCA1MDAsIHRydWUpO1xubGV0IGRlYm91bmNlZEVudkJ0biA9IGRlYm91bmNlKHByb2Nlc3NPcGVuRW52U2V0dGluZ3MsIDUwMCwgdHJ1ZSk7XG5mdW5jdGlvbiBwcm9jZXNzT3BlbkVudlNldHRpbmdzKGV2LCBlbCkge1xuICBsZXQgcGFyYW1zID0ge1xuICAgIGNvbnRlbnQ6IHNsaWRlQ29udGVudCgpXG4gIH07XG4gIHNsaWRlKGV2LCBwYXJhbXMpO1xufVxuZnVuY3Rpb24gc2xpZGVDb250ZW50KCkge1xuICBsZXQgdHBsU3RyID0gYFxuICAgIDx1bD5cbiAgICAgIDxsaT5cbiAgICAgICAgPGxhYmVsPmhvc3Q6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYy1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPGxhYmVsPmFjY291bnQ6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYy1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPGxhYmVsPmxhYmVsOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIlwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cImNoZWNrIGF2YWlsYWJpbGl0eVwiIC8+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGA7XG4gIHJldHVybiB0cGxTdHI7XG59XG5mdW5jdGlvbiBwcm9jZXNzTmV3QXBpQ2xpY2soKSB7XG4gIGxldCBhcGlVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11bCcpWzBdO1xuICBpZiAoIWFwaVVsKSB7XG4gICAgY3JlYXRlQXBpVWwoKTtcbiAgICBhcGlVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11bCcpWzBdO1xuICB9XG4gIGxldCBiYXNlQXBpTGkgPSBzdHJUb0RvbShuZXdBcGlMaVRwbCgpKTtcbiAgYXBpVWwuaW5zZXJ0QmVmb3JlKGJhc2VBcGlMaSwgYXBpVWwuZmlyc3RDaGlsZCk7XG4gIGFkZEFwaVRyZWUoe30sIGJhc2VBcGlMaSwgdHJ1ZSk7XG4gIHRvZ2dsZUZvbGRMaShiYXNlQXBpTGkuY2hpbGRyZW5bMF0pO1xuICBiYXNlQXBpTGkuY2hpbGRyZW5bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcGlVbCgpIHtcbiAgbGV0IGFwaUxpc3RFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGFwaVVsRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGV0IG5ld0FwaURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1hZGQtcXVlcnknKVswXTtcbiAgYXBpTGlzdEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwtd3JhcHBlcicpO1xuICBhcGlVbEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwnKTtcbiAgYXBpTGlzdEVsZS5hcHBlbmRDaGlsZChhcGlVbEVsZSk7XG4gIGluc2VydEFmdGVyKGFwaUxpc3RFbGUsIG5ld0FwaURpdik7XG59XG5mdW5jdGlvbiBuZXdBcGlCdG4oKSB7XG4gIGxldCBuZXdBcGlEaXY7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZGVyJylbMF07XG4gIGxldCBuZXdBcGlTdHIgPSBgXG4gICAgPGRpdiBjbGFzcz1cImFwaS1hZGQtcXVlcnlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRkLWFwaS1idG5cIj5uZXcgQVBJPC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1zZWFyY2gtd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktcXVlcnlcIiB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJzZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFwaS1zZWFyY2gtcmVzdWx0IGhpZGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGEgY2xhc3M9XCJjLWhpZGUgaWNvbi10ZXh0LWxpbmsgYy1mbG9hdC1yaWdodCBkZXYtZW52LXNldHRpbmdzXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjxzcGFuIGNsYXNzPVwiaWNvbi10ZXh0LWljb25cIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXNldHRpbmdzIGljb24tZml0XCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tc2V0dGluZ3NcIj48L3VzZT48L3N2Zz48L3NwYW4+PHNwYW4gY2xhc3M9XCJpY29uLXRleHQtdGV4dFwiPueOr+Wig+WQjOatpeaVsOaNrumFjee9rjwvc3Bhbj48L2E+XG4gICAgPC9kaXY+XG4gIGA7XG4gIG5ld0FwaURpdiA9IHN0clRvRG9tKG5ld0FwaVN0cik7XG4gIG5ld0FwaURpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGQtYXBpLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVib3VuY2VkTmV3QXBpQnRuKTtcbiAgbmV3QXBpRGl2LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Rldi1lbnYtc2V0dGluZ3MnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlZEVudkJ0bik7XG4gIGluc2VydEFmdGVyKG5ld0FwaURpdiwgaGVhZGVyKTtcbiAgcmV0dXJuIG5ld0FwaURpdjtcbn1cblxuZnVuY3Rpb24gbmV3QXBpTGlUcGwoZGF0YSA9IHt9KSB7XG4gIHZhciB0cGwgPSBgXG4gICAgPGxpIGNsYXNzPVwiYXBpLWxpXCIgZGF0YS1hcGktaWQ9XCIke2RhdGEuaWQgfHwgbnVsbH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbGktc3VtbWFyeVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1jb2xsYXBzZVwiPjxzdmcgY2xhc3M9XCJpY29uIGljb24tZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLXVyaVwiIGJpbmQ9XCJ1cmlcIj4ke2RhdGEudXJpIHx8ICcoTm8gdXJpKSd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1kZXNcIiBiaW5kPVwiZGVzY3JpcHRpb25cIj4ke2RhdGEuZGVzY3JpcHRpb24gPyBkYXRhLmRlc2NyaXB0aW9uIDogJyhObyBkZXNjcmlwdGlvbiknfTwvc3Bhbj5cbiAgICAgICAgPGEgaHJlZj1cIiR7ZGF0YS53aWtpTGlua31cIiBjbGFzcz1cImFwaS1saS13aWtpXCIgYmluZC1hdHRyLWhyZWY9XCJ3aWtpTGlua1wiIGJpbmQ9XCJ3aWtpTGlua1wiIHRhcmdldD1cIl9ibGFua1wiPiR7ZGF0YS53aWtpTGluayA/IGRhdGEud2lraUxpbmsgOiAnKE5vIHdpa2lMaW5rKSd9PC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9saT5cbiAgYDtcbiAgcmV0dXJuIHRwbDtcbn1cbmZ1bmN0aW9uIHJlbmRlckFsbEFwaXMoZGF0YSkge1xuICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgY29uc3QgdG1wbCA9IGRhdGEgPT4gaHRtbGBcbiAgICAgIDx1bCBjbGFzcz1cImFwaS11bFwiPlxuICAgICAgJHtkYXRhLm1hcChpdGVtID0+IGh0bWxgXG4gICAgICAgICR7bmV3QXBpTGlUcGwoaXRlbSl9XG4gICAgICBgKX1cbiAgICAgIDwvdWw+XG4gIGA7XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpTGlzdEVsZS5pbm5lckhUTUwgPSB0bXBsKGRhdGEpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlCdG4oKSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbEFwaXMoKSB7XG4gICRodHRwKHJvb3RBUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QWxsQXBpc1N1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwiLyoqXG4vLyBCLT4gSGVyZSB5b3UgZGVmaW5lIGl0cyBmdW5jdGlvbnMgYW5kIGl0cyBwYXlsb2FkXG52YXIgbWRuQVBJID0gJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL3NlYXJjaC5qc29uJztcbnZhciBwYXlsb2FkID0ge1xuICAndG9waWMnIDogJ2pzJyxcbiAgJ3EnICAgICA6ICdQcm9taXNlJ1xufTtcbnZhciBjYWxsYmFjayA9IHtcbiAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygxLCAnc3VjY2VzcycsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9LFxuICBlcnJvciA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygyLCAnZXJyb3InLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfVxufTtcbi8vIEVuZCBCXG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGxcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDEpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcywgY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDIpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLnRoZW4odW5kZWZpbmVkLCBjYWxsYmFjay5lcnJvcik7XG4gKi9cbi8vIEEtPiAkaHR0cCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBpbiBvcmRlciB0byBmb2xsb3cgdGhlIHN0YW5kYXJkIEFkYXB0ZXIgcGF0dGVyblxuaW1wb3J0IHtzZXJpYWxpemV9IGZyb20gJy4vc2VyaWFsaXplJztcbmltcG9ydCB7aXNFbXB0eSwgbWVyZ2VPYmosIGFkZFByZWZpeFRvT2JqLCB3cmFwT2JqfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQge3JvclBhcmFtcyBhcyBSUHN9IGZyb20gJy4vY3NyZic7XG5cbmV4cG9ydCBmdW5jdGlvbiAkaHR0cCh1cmwpIHtcbiAgLy8gQSBzbWFsbCBleGFtcGxlIG9mIG9iamVjdFxuICB2YXIgY29yZSA9IHtcblxuICAgIC8vIE1ldGhvZCB0aGF0IHBlcmZvcm1zIHRoZSBhamF4IHJlcXVlc3RcbiAgICBhamF4OiBmdW5jdGlvbihtZXRob2QsIHVybCwgYXJncyA9IHt9LCBwcmVmaXgpIHtcbiAgICAgIC8vIGZvciBSYWlsc1xuICAgICAgLy8gdXJsID0gdXJsICsgJy5qc29uJztcbiAgICAgIC8vIENyZWF0aW5nIGEgcHJvbWlzZVxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgdGhlIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICBpZiAobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJyB8fCBtZXRob2QgPT09ICdQQVRDSCcgfHwgbWV0aG9kID09PSAnREVMRVRFJykge1xuICAgICAgICAgIGxldCB1cmkgPSBKU09OLnN0cmluZ2lmeShleHRlbmRHZW5lcmFsUGFyYW1zKHdyYXBPYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgICAvLyBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgICAgICAgIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIGNsaWVudC5zZW5kKHVyaSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgIGxldCB1cmkgPSBzZXJpYWxpemUoZXh0ZW5kR2VuZXJhbFBhcmFtcyhhZGRQcmVmaXhUb09iaihhcmdzLCBwcmVmaXgpKSk7XG4gICAgICAgICAgY2xpZW50Lm9wZW4obWV0aG9kLCB1cmwgKyAnPycgKyB1cmkpO1xuICAgICAgICAgIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xpZW50Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlc29sdmVcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGVxdWFsIHRvIDJ4eFxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVqZWN0XCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBkaWZmZXJlbnQgdGhhbiAyeHhcbiAgICAgICAgICAgIHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjbGllbnQub25lcnJvciA9IGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy8gUmV0dXJuIHRoZSBwcm9taXNlXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gIH07XG4gIC8vIEFkYXB0ZXIgcGF0dGVyblxuICByZXR1cm4ge1xuICAgICdnZXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0dFVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwb3N0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQT1NUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3B1dCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUFVUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3BhdGNoJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQQVRDSCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0RFTEVURScsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4dGVuZEdlbmVyYWxQYXJhbXMob2JqKSB7XG4gIGxldCBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIGxldCBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCk7XG4gIGxldCBnZW5lcmFsT2JqID0ge307XG4gIGdlbmVyYWxPYmoudXRmOCA9ICfinJMnO1xuICBnZW5lcmFsT2JqLmZvcm1hdCA9ICdqc29uJztcbiAgZ2VuZXJhbE9ialtjc3JmUGFyYW1dID0gY3NyZlRva2VuO1xuICByZXR1cm4gbWVyZ2VPYmoob2JqLCBnZW5lcmFsT2JqKTtcbn1cbi8vIEVuZCBBXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIi8qKlxuICogW3NlcmlhbGl6ZSBjb252ZXJ0cyByZWN1cnNpdmUgb2JqZWN0c11cbiAqIEBwYXJhbSAge1t0eXBlXX0gb2JqICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcHJlZml4IFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIGNvbnNvbGUubG9nKHNlcmlhbGl6ZSh7Zm9vOiBcImhpIHRoZXJlXCIsIGJhcjogeyBibGFoOiAxMjMsIHF1dXg6IFsxLCAyLCAzXSB9fSkpO1xuICogZm9vPWhpJTIwdGhlcmUmYmFyJTVCYmxhaCU1RD0xMjMmYmFyJTVCcXV1eCU1RCU1QjAlNUQ9MSZiYXIlNUJxdXV4JTVEJTVCMSU1RD0yJmJhciU1QnF1dXglNUQlNUIyJTVEPTNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xvbmVPYmoob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuLyogY29uc2lkZXIgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmoob2JqMSA9IHt9LCBvYmoyKSB7XG4gIGxldCBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iajEpKTtcbiAgZm9yIChsZXQga2V5IGluIG9iajIpIHtcbiAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9iajJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcmVmaXhUb09iaihvYmosIHByZWZpeCkge1xuICBpZiAoIXByZWZpeCkgcmV0dXJuIG9iajtcbiAgbGV0IG5ld09iaiA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbJycgKyBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSddID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcE9iaihvYmosIHdyYXBwZXIpIHtcbiAgaWYgKCF3cmFwcGVyKSByZXR1cm4gb2JqO1xuICB2YXIgbmV3T2JqID0ge307XG4gIG5ld09ialt3cmFwcGVyXSA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbd3JhcHBlcl1ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9Eb20oc3RyKSB7XG4gIGxldCB0bXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWxlLmlubmVySFRNTCA9IHN0cjtcbiAgbGV0IHJldHVybkRvbSA9IHRtcEVsZS5jaGlsZHJlblswXTtcbiAgcmV0dXJuIHJldHVybkRvbTtcbn1cbi8qKlxuICogW2luc2VydEFmdGVyIGRlc2NyaXB0aW9uOiBBY2NvcmRpbmcgdG8gTUROIGlmIHRoZSBlbGVtZW50IGlzIGxhc3QgKGFuZCBzbyBuZXh0U2libGluZyBpcyBudWxsKSB0aGUgbmV3Tm9kZSB3aWxsIGJlIGFwcGVuZGVkIGFzIGV4cGVjdGVkXVxuICogQHBhcmFtICB7W3R5cGVdfSBuZXdOb2RlICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXJlbmNlTm9kZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9ICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICByZWZlcmVuY2VOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUubmV4dFNpYmxpbmcpO1xufVxuXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4vLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4vLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbi8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4vKlxudmFyIG15RWZmaWNpZW50Rm4gPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgLy8gQWxsIHRoZSB0YXhpbmcgc3R1ZmYgeW91IGRvXG59LCAyNTApO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbXlFZmZpY2llbnRGbik7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgdmFyIHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmljdE1vZGUoKSB7XG4gIHZhciBpc1N0cmljdCA9IChmdW5jdGlvbigpIHsgcmV0dXJuICF0aGlzOyB9KSgpO1xuICByZXR1cm4gaXNTdHJpY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcbiAgICBsZXQgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdXRpbGl0aWVzLmpzIiwiZXhwb3J0IGNvbnN0IHJvb3RBUEkgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGlzJztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvZ2xvYmFsL2NvbnN0YW50LmpzIiwiaW1wb3J0IHtodG1sRXNjYXBlfSBmcm9tICcuL2h0bWxFc2NhcGUnO1xuZXhwb3J0IGZ1bmN0aW9uIGh0bWwobGl0ZXJhbFNlY3Rpb25zLCAuLi5zdWJzdHMpIHtcbiAgLy8gVXNlIHJhdyBsaXRlcmFsIHNlY3Rpb25zOiB3ZSBkb27igJl0IHdhbnRcbiAgLy8gYmFja3NsYXNoZXMgKFxcbiBldGMuKSB0byBiZSBpbnRlcnByZXRlZFxuICBsZXQgcmF3ID0gbGl0ZXJhbFNlY3Rpb25zLnJhdztcblxuICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgc3Vic3RzLmZvckVhY2goKHN1YnN0LCBpKSA9PiB7XG4gICAgLy8gUmV0cmlldmUgdGhlIGxpdGVyYWwgc2VjdGlvbiBwcmVjZWRpbmdcbiAgICAvLyB0aGUgY3VycmVudCBzdWJzdGl0dXRpb25cbiAgICBsZXQgbGl0ID0gcmF3W2ldO1xuXG4gICAgLy8gSW4gdGhlIGV4YW1wbGUsIG1hcCgpIHJldHVybnMgYW4gYXJyYXk6XG4gICAgLy8gSWYgc3Vic3RpdHV0aW9uIGlzIGFuIGFycmF5IChhbmQgbm90IGEgc3RyaW5nKSxcbiAgICAvLyB3ZSB0dXJuIGl0IGludG8gYSBzdHJpbmdcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJzdCkpIHtcbiAgICAgIHN1YnN0ID0gc3Vic3Quam9pbignJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHN1YnN0aXR1dGlvbiBpcyBwcmVjZWRlZCBieSBhIGRvbGxhciBzaWduLFxuICAgIC8vIHdlIGVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gaXRcbiAgICBpZiAobGl0LmVuZHNXaXRoKCckJykpIHtcbiAgICAgIHN1YnN0ID0gaHRtbEVzY2FwZShzdWJzdCk7XG4gICAgICBsaXQgPSBsaXQuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbGl0O1xuICAgIHJlc3VsdCArPSBzdWJzdDtcbiAgfSk7XG4gIC8vIFRha2UgY2FyZSBvZiBsYXN0IGxpdGVyYWwgc2VjdGlvblxuICAvLyAoTmV2ZXIgZmFpbHMsIGJlY2F1c2UgYW4gZW1wdHkgdGVtcGxhdGUgc3RyaW5nXG4gIC8vIHByb2R1Y2VzIG9uZSBsaXRlcmFsIHNlY3Rpb24sIGFuIGVtcHR5IHN0cmluZylcbiAgcmVzdWx0ICs9IHJhd1tyYXcubGVuZ3RoIC0gMV07IC8vIChBKVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGh0bWxFc2NhcGUoc3RyKSB7XG5cdHN0ciA9ICcnICsgc3RyOyAvLyBmb3IgbnVtYmVycyBldGMuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvJi9nLCAnJmFtcDsnKSAvLyBmaXJzdCFcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvYC9nLCAnJiM5NjsnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsImltcG9ydCB7ZGlzYWJsZVNjcm9sbCwgZW5hYmxlU2Nyb2xsfSBmcm9tICcuL3RvZ2dsZVNjcm9sbCc7XG5leHBvcnQgZnVuY3Rpb24gcG9wdXAoZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgbGV0IHBvcHVwRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBvcHVwRWxlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWxheWVyJyk7XG4gIHBvcHVwRWxlLmlubmVySFRNTCA9IGdlbmVyYXRlUG9wdXBUcGwoKTtcbiAgcG9zaXRpb25Qb3B1cEVsZShwb3B1cEVsZSwgZXYpO1xuICBiaW5kUG9wdXBFdmVudHMocG9wdXBFbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cEVsZSk7XG4gIGRpc2FibGVTY3JvbGwoKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVQb3B1cFRwbChkYXRhKSB7XG4gIGxldCB0cGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLXNoYWRvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBvcHVwLXRleHRcIj5BcmUgeW91IHN1cmUgdG8gZGVsZXRlIHRoaXMgQVBJPzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtYnRuc1wiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicG9wdXAtYnRuIHBvcHVwLWNhbmNlbC1idG5cIj5jYW5jZWw8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY29uZmlybS1idG5cIj5jb25maXJtPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHRgO1xuICByZXR1cm4gdHBsO1xufVxuXG5mdW5jdGlvbiBiaW5kUG9wdXBFdmVudHMoZWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY2FuY2VsLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1zaGFkb3cnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29uZmlybS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm0uYmluZCh0aGlzLCBldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm0oZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBjYWxsYmFjaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uUG9wdXBFbGUoZWxlLCBjb29yZGluYXRlcykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29udGVudCcpWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZXMuY2xpZW50WCArICdweCwgJyArIGNvb3JkaW5hdGVzLmNsaWVudFkgKyAncHgsIDApJztcbn1cblxuZnVuY3Rpb24gY2xvc2VQb3B1cChldikge1xuICBpZiAoZXYudGFyZ2V0ICE9PSBldi5jdXJyZW50VGFyZ2V0KSByZXR1cm47XG4gIGxldCBwb3BMYXllciA9IGV2LnRhcmdldC5jbG9zZXN0KCcucG9wdXAtbGF5ZXInKTtcbiAgaWYgKHBvcExheWVyKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3BMYXllcik7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanMiLCIvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwLFxuLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XG52YXIga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICBpZiAoZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIC8vIG9sZGVyIEZGXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub253aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2Rlcm4gc3RhbmRhcmRcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBvbGRlciBicm93c2VycywgSUVcbiAgd2luZG93Lm9udG91Y2htb3ZlICA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2JpbGVcbiAgZG9jdW1lbnQub25rZXlkb3duICA9IHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbndoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9udG91Y2htb3ZlID0gbnVsbDtcbiAgZG9jdW1lbnQub25rZXlkb3duID0gbnVsbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwiaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmV4cG9ydCBmdW5jdGlvbiBzbGlkZShldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgc2xpZGVFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2xpZGVFbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGUtbGF5ZXInKTtcbiAgc2xpZGVFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVTbGlkZVRwbChwYXJhbXMuY29udGVudCk7XG4gIHBvc2l0aW9uU2xpZGVFbGUoc2xpZGVFbGUsIGV2KTtcbiAgYmluZFNsaWRlRXZlbnRzKHNsaWRlRWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVFbGUpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNsaWRlVHBsKGNvbnRlbnQpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2xpZGUtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwic2xpZGUtdGV4dFwiPiR7Y29udGVudH08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInNsaWRlLWJ0bnNcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInNsaWRlLWJ0biBzbGlkZS1jYW5jZWwtYnRuXCI+Y2FuY2VsPC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwic2xpZGUtYnRuIHNsaWRlLWNvbmZpcm0tYnRuXCI+Y29uZmlybTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxuZnVuY3Rpb24gYmluZFNsaWRlRXZlbnRzKGVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlLWNhbmNlbC1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlU2xpZGUpO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGUtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1NoYWRvdyk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25TbGlkZUVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIC8vIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5jbGllbnRYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMuY2xpZW50WSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbGlja1NoYWRvdyhldikge1xuICBpZiAoZXYudGFyZ2V0ICE9PSBldi5jdXJyZW50VGFyZ2V0KSByZXR1cm47XG4gIHBvcHVwKGV2LCB1bmRlZmluZWQsIGNsb3NlU2xpZGUuYmluZCh0aGlzLCBldikpO1xufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlKGV2KSB7XG4gIGxldCBwb3BMYXllciA9IGV2LnRhcmdldC5jbG9zZXN0KCcuc2xpZGUtbGF5ZXInKTtcbiAgaWYgKHBvcExheWVyKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3BMYXllcik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2xpZGUuanMiLCJpbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXNoKGRhdGEsIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSkge1xuICBsZXQgZmxhc2hFbGUgPSBzdHJUb0RvbShmbGFzaFRwbChkYXRhKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmxhc2hFbGUpO1xuICBzZXRUaW1lb3V0KGRlc3RvcnkuYmluZChudWxsLCBmbGFzaEVsZSwgY2FsbGJhY2spLCAyMDAwKTtcbn1cblxuZnVuY3Rpb24gZmxhc2hUcGwoZGF0YSkge1xuICBsZXQgc3RyID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJmbGFzaC1sYXllciAke2RhdGEuZXJyb3IgPyAnZXJyb3InIDogJ3N1Y2Nlc3MnfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj4ke2RhdGEuZXJyb3IgfHwgZGF0YS5tZXNzYWdlfTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgICA7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIGRlc3RvcnkoZWxlLCBjYWxsYmFjaykge1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICB9KTtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ2JsaW5rJyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZEZsYXNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGZsYXNoKGpzb25EYXRhLCBjYWxsYmFjayk7XG4gIHJldHVybiBqc29uRGF0YTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIiwiLyoqXG4gKiB3aWR0aCBvZiBzaW5nbGUgc3ZnIHBhdGg6IDMwcHhcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtUcmVlfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xuaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmltcG9ydCB7cm9vdEFQSX0gZnJvbSAnLi4vZ2xvYmFsL2NvbnN0YW50JztcbmltcG9ydCB7Zmxhc2gsIHBhcnNlQW5kRmxhc2h9IGZyb20gJy4uL2NvbW1vbi9mbGFzaCc7XG5pbXBvcnQge2NvbGxlY3RBcGlEYXRhfSBmcm9tICcuL3RyZWVEYXRhQ29sbGVjdCc7XG5pbXBvcnQge2dldFRyYW5zbGF0ZVgsIHhociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtqc29uVG9UcmVlfSBmcm9tICcuL2pzb25UcmVlQ29udmVydGVyJztcbmltcG9ydCB7dHdvV2F5RGF0YUJpbmRpbmd9IGZyb20gJy4uL2NvbW1vbi90d29XYXlEYXRhQmluZGluZyc7XG5pbXBvcnQge2NhbGxiYWNrc30gZnJvbSAnLi4vY29tbW9uL2NhbGxiYWNrcyc7XG5pbXBvcnQge3Njcm9sbEJhckh9IGZyb20gJy4uL2NvbW1vbi9zY3JvbGwnO1xuaW1wb3J0IHtnZW5lcmF0ZVVVSUR9IGZyb20gJy4uL2NvbW1vbi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBsZXQgYXBpVVVJRCA9IGdlbmVyYXRlVVVJRCgpO1xuICBsZXQgdHBsID1cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYXBpLWluZm9cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktdXJpXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cIlwiIG1vZGVsPVwidXJpXCIgLz4gXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+bWV0aG9kOjwvbGFiZWw+XG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImFwaS1tZXRob2RcIiBtb2RlbD1cIm1ldGhvZFwiPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiR0VUXCI+R0VUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQT1NUXCI+UE9TVDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUEFUQ0hcIj5QQVRDSDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiREVMRVRFXCI+REVMRVRFPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGxhYmVsPnNlY3Rpb246PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktc2VjdGlvblwiIHR5cGU9XCJ0ZXh0XCIgbW9kZWw9XCJzZWN0aW9uXCIgLz5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiXCI+ZGVzY3JpcHRpb246PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktZGVzY3JpcHRpb25cIiB0eXBlPVwidGV4dFwiIG1vZGVsPVwiZGVzY3JpcHRpb25cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXNhdmVcIiBkYXRhLW1ldGhvZD1cIiR7cGF0Y2hPclBvc3QoaXNOZXdBcGkpfVwiIGRhdGEtYWN0aW9uPVwiL2FwaXMke3NhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSl9XCIgPiR7aXNOZXdBcGkgPyAnY3JlYXRlJyA6ICdzYXZlJ308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktcmVzcG9uZC1wcmV2aWV3LWJ0blwiPnByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktd2lraVwiIGJpbmQtdG9nZ2xlLWNsYXNzIGJpbmQ9XCJ3aWtpTGlua1wiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLXdpa2ktbGFiZWxcIj5XaWtpOiA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXdpa2ktaW5wdXRcIiB0eXBlPVwidGV4dFwiIG1vZGVsPVwid2lraUxpbmtcIiAvPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1tb2Rlcy1yb3dcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLW1vZGUtbGFiZWxcIj48aW5wdXQgY2xhc3M9XCJhcGktbW9kZVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCIke2FwaVVVSUR9LW1vZGVcIiB2YWx1ZT1cIjBcIj7lvIDlj5E8L2xhYmVsPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbW9kZS1sYWJlbCBhcGktbW9kZS1kZWJ1Z1wiPjxpbnB1dCBjbGFzcz1cImFwaS1tb2RlXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cIiR7YXBpVVVJRH0tbW9kZVwiIHZhbHVlPVwiMVwiPuiBlOiwgzxpbnB1dCBjbGFzcz1cIm1vZGUtZGVidWdnaW5nLWFkZHJcIiB0eXBlPVwidGV4dFwiIC8+PC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLW1vZGUtbGFiZWxcIj48aW5wdXQgY2xhc3M9XCJhcGktbW9kZVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCIke2FwaVVVSUR9LW1vZGVcIiB2YWx1ZT1cIjJcIj7nur/kuIo8L2xhYmVsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtY29udGVudC13cmFwcGVyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLWNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS1mcmFtZVwiPlxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzPVwiYXBpLXN2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48L3N2Zz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLXJlc3BvbmQtcHJldmlld1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3LWNvbnRyb2wtd3JhcHBlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZXZpZXctY29udHJvbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXByZXZpZXctdHlwZSBwcmV2aWV3LXJhd1wiPnJhdzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1iZWF1dGlmeVwiPmJlYXV0aWZ5PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXByZXZpZXctdHlwZSBwcmV2aWV3LWhpZ2hsaWdodFwiPnN5bnRheEhpZ2hsaWdodDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhLXZpZXcganNvblwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxuZnVuY3Rpb24gbGVhZlRwbCgpIHtcbiAgbGV0IGxlYWZDb250ZW50VHBsID0gYFxuICAgIDxpIGNsYXNzPVwicmVtb3ZlLWNoaWxkXCI+LTwvaT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYta2V5XCIgcGxhY2Vob2xkZXI9XCJrZXlcIiBtb2RlbD1cImRhdGFOYW1lXCIgLz5cbiAgICA8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi12YWx1ZVwiIHBsYWNlaG9sZGVyPVwidmFsdWVcIiBtb2RlbD1cImRhdGFWYWx1ZVwiIC8+XG4gICAgPHNlbGVjdCBjbGFzcz1cImxlYWYtdmFsdWUtdHlwZVwiIG1vZGVsPVwiZGF0YVR5cGVcIj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlN0cmluZ1wiPlN0cmluZzwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSW50ZWdlclwiPkludGVnZXI8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZsb2F0XCI+RmxvYXQ8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkJvb2xlYW5cIj5Cb29sZWFuPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJBcnJheVwiPkFycmF5PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJIYXNoXCI+SGFzaDwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUmVnZXhcIj5SZWdleChzdHJpbmcpPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJGaXhlZFwiPkZpeGVkKHN0cmluZyk8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk51bGxcIj5OdWxsPC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICAgPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT5cbiAgICA8aSBjbGFzcz1cImFkZC1jaGlsZFwiPis8L2k+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXF1YW50aXR5XCIgcGxhY2Vob2xkZXI9XCJxdWFudGl0eVwiIG1vZGVsPVwiZGF0YVF1YW50aXR5XCIgLz5cbiAgICA8c3BhbiBjbGFzcz1cImxlYWYtaGlkZS1xdWFudGl0eVwiPjwvc3Bhbj5cbiAgYDtcbiAgcmV0dXJuIGxlYWZDb250ZW50VHBsO1xufVxuXG4vKiBkZWZhdWx0IGdldEJvdW5kaW5nUmVjdE9iaiAqL1xubGV0IGluaXRSZWN0T2JqID0ge1xuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHdpZHRoOiAwLFxuICBoZWlnaHQ6IDBcbn07XG5cbmxldCBsZWFmRGF0YVBsYWNlSG9sZGVyID0ge1xuICBkYXRhTmFtZTogJycsXG4gIGRhdGFUeXBlOiAnU3RyaW5nJyxcbiAgZGF0YVZhbHVlOiAnJyxcbiAgZGF0YVF1YW50aXR5OiAnMScsXG4gIGhhc0NoaWxkOiBmYWxzZVxufTtcblxuLypcbnNpbmdsZSBsZWFmIHdpZHRoOiA0NjBweDtcbiAqL1xuY29uc3QgcGVyTGVhZldpZHRoID0gNDYwO1xuY29uc3QgcGVyTGVhZkhlaWdodCA9IDIyO1xuY29uc3QgbGVhdmVzVmVydGljYWxHYXAgPSAzMDtcbmNvbnN0IHBlclNWR1BhdGhXaWR0aCA9IDMwO1xudmFyIHJvb3ROb2RlV2lkdGggPSBwZXJTVkdQYXRoV2lkdGggKyAxNDtcbnZhciBjYWxsYmFjayA9IHtcbiAgcGF0Y2hTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5hcGlSYXdEYXRhID0gZGF0YTtcbiAgICB0aGlzLmFwaURhdGFPYmogPSBKU09OLnBhcnNlKGRhdGEpLmRhdGE7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgcG9zdFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB0aGlzLmFwaVJhd0RhdGEgPSBkYXRhO1xuICAgIHRoaXMuYXBpRGF0YU9iaiA9IEpTT04ucGFyc2UoZGF0YSkuZGF0YTtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICAgIHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zYXZlJylbMF0udGV4dENvbnRlbnQgPSAnc2F2ZSc7XG4gICAgdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXS5kYXRhc2V0Lm1ldGhvZCA9ICdQQVRDSCc7XG4gIH0sXG4gIGRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBmdW5jdGlvbiBkZXN0b3J5QXBpTGkoKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQodGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhLCBkZXN0b3J5QXBpTGkuYmluZCh0aGlzKSk7XG4gIH0sXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBhcGlSZXNwb25kU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBqc29uT2JqID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICB0aGlzLnByZXZpZXdEYXRhID0gZGF0YTtcbiAgICB0aGlzLnByZXZpZXdEYXRhT2JqID0ganNvbk9iajtcbiAgICBzd2l0Y2hQcmV2aWV3KHRoaXMucHJldmlld0RhdGFPYmosIGhpZ2h0bGlnaHRKU09OLCB0aGlzLmV2ZW50Q29udGV4dCwgJ2hpZ2hsaWdodCcpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBwYXRjaE9yUG9zdChpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnUE9TVCcgOiAnUEFUQ0gnO1xufVxuXG5mdW5jdGlvbiBzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJycgOiBgLyR7ZGF0YS5pZH1gO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpIHtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5kYXRhc2V0LmlkID0gaXNOZXdBcGkgPyAnJyA6IGRhdGEuaWQ7XG4gIHBlckFwaUVsZS5pbm5lckhUTUwgPSBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkpO1xuICBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlID0gaXNOZXdBcGkgPyAnJyA6IGRhdGEudXJpO1xuICByZXR1cm4gcGVyQXBpRWxlO1xufVxuZnVuY3Rpb24gY3JlYXRlTmV3QXBpSW5pdERhdGEoKSB7XG4gIGxldCBpbml0RGF0YSA9IHtcbiAgICBub2RlSWQ6IDAsXG4gICAgcGFyZW50SWQ6IG51bGwsXG4gICAgZGF0YTogbGVhZkRhdGFQbGFjZUhvbGRlclxuICB9O1xuICBsZXQgZmlyc3RDaGlsZERhdGEgPSB7XG4gICAgbm9kZUlkOiAxLFxuICAgIHBhcmVudElkOiAwLFxuICAgIGRhdGE6IGxlYWZEYXRhUGxhY2VIb2xkZXJcbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBtb2RlOiAnMCcsXG4gICAgZGVidWdBZGRyOiAnJyxcbiAgICBub2RlczogW2luaXREYXRhLCBmaXJzdENoaWxkRGF0YV1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSA9IGZhbHNlKSB7XG4gIGlmIChpc05ld0FwaSkge1xuICAgIGRhdGEgPSBjcmVhdGVOZXdBcGlJbml0RGF0YSgpO1xuICB9XG4gIHRoaXMuYXBpRGF0YU9iaiA9IGRhdGE7XG4gIHRoaXMuYXBpQ29udGFpbmVyID0gY29udGFpbmVyTm9kZTtcbiAgbGV0IHBlckFwaUVsZSA9IGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSk7XG4gIHRoaXMuYXBpQ29udGFpbmVyLmFwcGVuZENoaWxkKHBlckFwaUVsZSk7XG5cbiAgbGV0IGFwaUJpbmREYXRhID0gdHdvV2F5RGF0YUJpbmRpbmcoZGF0YSwgdGhpcy5hcGlDb250YWluZXIpO1xuICBkYXRhID0gYXBpQmluZERhdGE7XG5cbiAgdGhpcy5hcGlFbGUgPSB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZXItYXBpJylbMF07XG5cbiAgdGhpcy5sZWFmSW5kZXggPSAxO1xuXG4gIHRoaXMuJGFwaVRyZWUgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1mcmFtZScpWzBdO1xuICB0aGlzLiRhcGlUcmVlQ29udGVudCA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWNvbnRlbnQnKVswXTtcbiAgLy8gaWYgKGlzTmV3QXBpKSB7XG4gIC8vICAgdGhpcy5pbml0QXBpVHJlZSgpO1xuICAvLyAgIHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgLy8gfSBlbHNlIHtcbiAgdGhpcy5yZW5kZXJFeGlzdFRyZWUoZGF0YSk7XG4gIC8vIH1cblxuICB0aGlzLmFwaVJldHVybkRhdGEgPSAnJztcblxuICB0aGlzLmFwaUVsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJpbmRFdmVudC5iaW5kKHRoaXMpKTtcbiAgdGhpcy5zZXRNb2RlVmFsKGRhdGEubW9kZSk7XG4gIHRoaXMuc2V0RGVidWdBZGRyKGRhdGEuZGVidWdBZGRyKTtcbiAgdGhpcy5zY3JvbGxCYXIgPSBzY3JvbGxCYXJIKHtcbiAgICB3cmFwcGVyOiB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS13cmFwcGVyJylbMF0sXG4gICAgY29udGVudDogdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtY29udGVudC13cmFwcGVyJylbMF0sXG4gICAgb3ZlcmZsb3dFbGU6IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWNvbnRlbnQnKVswXVxuICB9KTtcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5yZW5kZXJFeGlzdFRyZWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIGxldCBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gIGxldCBwZXJUV0RCQXJyID0gW107XG4gIGlmIChkYXRhLm5vZGVzICYmIGRhdGEubm9kZXMubGVuZ3RoKSB7XG4gICAgbGV0IG5vZGVzQXJyID0gZGF0YS5ub2RlcztcbiAgICBsZXQgbm9kZURhdGEgPSB7fTtcbiAgICBsZXQgbGVhZjtcbiAgICBsZXQgbGVhZkRhdGEgPSB7fTtcbiAgICBsZXQgcGVyVFdEQjtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbm9kZXNBcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGxlYWYgPSB1bmRlZmluZWQ7XG4gICAgICBsZWFmID0gZ2VuZXJhdGVMZWFmKGRhdGEubm9kZXNbaV0pO1xuICAgICAgaWYgKGRhdGEubm9kZXNbaV0uZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEubm9kZXNbaV0uZGF0YSA9PT0gXCJcIikge1xuICAgICAgICBkYXRhLm5vZGVzW2ldLmRhdGEgPSBsZWFmRGF0YVBsYWNlSG9sZGVyO1xuICAgICAgfTtcbiAgICAgIGlmIChkYXRhLm5vZGVzW2ldLnBhcmVudElkID09PSBudWxsIHx8IGRhdGEubm9kZXNbaV0ucGFyZW50SWQgPT09ICdudWxsJykgbGVhZi5jbGFzc0xpc3QuYWRkKCdyb290LWxlYWYnKTtcbiAgICAgIHBlclRXREIgPSB0d29XYXlEYXRhQmluZGluZyhkYXRhLm5vZGVzW2ldLmRhdGEsIGxlYWYpO1xuICAgICAgZGF0YS5ub2Rlc1tpXS5kYXRhID0gcGVyVFdEQjtcbiAgICAgIHBlclRXREJBcnIucHVzaChwZXJUV0RCKTtcbiAgICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQobGVhZik7XG4gICAgfVxuICAgIHRoaXMubGVhZkluZGV4ICs9IChsZW4gLSAyKTtcbiAgfVxuICB0aGlzLmFwaVRyZWUgPSBqc29uVG9UcmVlKGRhdGEubm9kZXMpO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIHRoaXMuZHJhd1NWRygpO1xufTtcblxuXG5mdW5jdGlvbiBnZW5lcmF0ZUxlYWYobm9kZURhdGEpIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdiaW5kJywgJ2hhc0NoaWxkJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnYmluZC10b2dnbGUtY2xhc3MnLCAnJyk7XG4gIG5ld0xlYWZTcGFuLmRhdGFzZXQucGFyZW50SWQgPSBub2RlRGF0YS5wYXJlbnRJZDtcbiAgbmV3TGVhZlNwYW4uZGF0YXNldC5ub2RlSWQgPSBub2RlRGF0YS5ub2RlSWQ7XG4gIG5ld0xlYWZTcGFuLmlubmVySFRNTCA9IGxlYWZUcGwoKTtcbiAgbmV3TGVhZlNwYW4uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZCgocGVyTGVhZldpZHRoICsgcGVyU1ZHUGF0aFdpZHRoKSAqIChub2RlRGF0YS5jb2x1bW4gLSAxKSkgKyAncHgsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChub2RlRGF0YS50b3RhbG9mZnNldHlsZXZlbCAqIChwZXJMZWFmSGVpZ2h0ICsgbGVhdmVzVmVydGljYWxHYXApKSArICdweCwgMCknO1xuICByZXR1cm4gbmV3TGVhZlNwYW47XG59XG5BcGlEb20ucHJvdG90eXBlLnNldERlYnVnQWRkciA9IGZ1bmN0aW9uKHZhbCkge1xuICB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlLWRlYnVnZ2luZy1hZGRyJylbMF0udmFsdWUgPSB2YWw7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5zZXRNb2RlVmFsID0gZnVuY3Rpb24odmFsKSB7XG4gIHZhciByYWRpb3MgPSB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbW9kZScpO1xuICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcmFkaW9zLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHZhbCA9PT0gcmFkaW9zW2ldLnZhbHVlKSB7XG4gICAgICByYWRpb3NbaV0uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICBicmVhaztcbiAgICB9IGVsc2Uge1xuICAgICAgcmFkaW9zW2ldLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiBiaW5kRXZlbnQoZXYpIHtcbiAgLyogXyR0aGlzIGlzIEFwaURvbSwgd2hpbGUgdGhpcyBpcyBpdHMgd3JhcHBlcihvYmplY3QpLiAqL1xuICBsZXQgX3RoaXMgPSB0aGlzO1xuICBsZXQgZXZUYXJnZXRDbGFzc0xpc3QgPSBldi50YXJnZXQuY2xhc3NMaXN0O1xuICBsZXQgZXZlbnRDb250ZXh0ID0ge19ldjogZXYsIGRvbUNvbnRhaW5lcjogZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKX07XG4gIHRoaXMuZXZlbnRDb250ZXh0ID0gZXZlbnRDb250ZXh0O1xuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1zYXZlJykpIHtcbiAgICBsZXQgcGFyYW1zID0gY29sbGVjdEFwaURhdGEoX3RoaXMuYXBpVHJlZSwgX3RoaXMuJGFwaVRyZWUpO1xuICAgIGlmICh0aGlzLmFwaURhdGFPYmouaWQpIHtcbiAgICAgICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLmFwaURhdGFPYmouaWQpXG4gICAgICAucGF0Y2gocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnBhdGNoU3VjY2Vzcy5iaW5kKHRoaXMpKVxuICAgICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmFwaURhdGFPYmouaWQpIHtcbiAgICAgICRodHRwKHJvb3RBUEkpXG4gICAgICAucG9zdChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2sucG9zdFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYWRkLWNoaWxkJykpIHtcbiAgICBfdGhpcy5hZGRDaGlsZChldik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdyZW1vdmUtY2hpbGQnKSkge1xuICAgIGlmIChldi50YXJnZXQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3Jvb3QtbGVhZicpKSB7XG4gICAgICBwb3B1cChldiwge30sIGRlbGV0ZUFwaS5iaW5kKF90aGlzLCBldikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfdGhpcy5kZWxOb2RlKGV2KTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktcmVzcG9uZC1wcmV2aWV3LWJ0bicpKSB7XG4gICAgaWYgKCF0aGlzLmFwaURhdGFPYmouaWQpIHtcbiAgICAgIGZsYXNoKHtlcnJvcjogJ1NhdmUgZmlyc3QuJ30pO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBsZXQgcGFyYW1zID0ge2Rhd25fdXJpOiB0aGlzLmFwaURhdGFPYmoudXJpfTtcbiAgICBsZXQgY29udGV4dCA9IHt9O1xuICAgICRodHRwKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXJlc3BvbnNlJylcbiAgICAuZ2V0KHBhcmFtcylcbiAgICAudGhlbihjYWxsYmFjay5hcGlSZXNwb25kU3VjY2Vzcy5iaW5kKHRoaXMpKVxuICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktd2lraS1sYWJlbCcpKSB7XG4gICAgZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktd2lraScpLmNsYXNzTGlzdC50b2dnbGUoJ3RvZ2dsZS10cnVlJyk7XG4gIH1cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2aWV3LXJhdycpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgSlNPTi5zdHJpbmdpZnksIHRoaXMuZXZlbnRDb250ZXh0LCAncmF3Jyk7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2aWV3LWJlYXV0aWZ5JykpIHtcbiAgICByZXR1cm4gc3dpdGNoUHJldmlldyh0aGlzLnByZXZpZXdEYXRhT2JqLCBiZWF1dGlmeUpTT04sIHRoaXMuZXZlbnRDb250ZXh0LCAnYmVhdXRpZnknKTtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ3ByZXZpZXctaGlnaGxpZ2h0JykpIHtcbiAgICByZXR1cm4gc3dpdGNoUHJldmlldyh0aGlzLnByZXZpZXdEYXRhT2JqLCBoaWdodGxpZ2h0SlNPTiwgdGhpcy5ldmVudENvbnRleHQsICdoaWdobGlnaHQnKTtcbiAgfTtcblxufVxuXG5mdW5jdGlvbiBzd2l0Y2hQcmV2aWV3KGRhdGFPYmosIGZuLCBwcmV2aWV3Q29udGV4dCwgcHJldmlld1R5cGUpIHtcbiAgbGV0IHByZXZpZXdTdHIgPSBmbi5jYWxsKG51bGwsIGRhdGFPYmopO1xuICBqc29uVmlldy5jYWxsKHByZXZpZXdDb250ZXh0LmRvbUNvbnRhaW5lciwgcHJldmlld1N0cik7XG4gIHN3aXRjaFByZXZpZXdTdGF0dXMocHJldmlld0NvbnRleHQsIHByZXZpZXdUeXBlKTtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFByZXZpZXdTdGF0dXMocHJldmlld0NvbnRleHQsIGFwcGx5VHlwZSkge1xuICBsZXQgcHJldmlld1R5cGVzID0gWydyYXcnLCAnYmVhdXRpZnknLCAnaGlnaGxpZ2h0J107XG4gIGxldCBhcGlSZXNwb25kUHJldmlld0VsZSA9IHByZXZpZXdDb250ZXh0LmRvbUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktcmVzcG9uZC1wcmV2aWV3JylbMF07XG4gIGxldCBhcGlSZXNwb25kUHJldmlld0VsZUNsYXNzQXJyID0gYXBpUmVzcG9uZFByZXZpZXdFbGUuY2xhc3NOYW1lLnRyaW0oKS5zcGxpdCgnICcpO1xuICBhcGlSZXNwb25kUHJldmlld0VsZUNsYXNzQXJyLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgsIGFycmF5KSB7XG4gICAgbGV0IGlkeCA9IHByZXZpZXdUeXBlcy5pbmRleE9mKGVsZW1lbnQpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgYXJyYXkuc3BsaWNlKGFycmF5LmluZGV4T2YoZWxlbWVudCksIDEpO1xuICAgIH1cbiAgfSk7XG4gIGxldCBwcmV2aWV3VHlwZUVsZXNBcnIgPSBbXS5zbGljZS5jYWxsKHByZXZpZXdDb250ZXh0LmRvbUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZXItcHJldmlldy10eXBlJykpO1xuICBwcmV2aWV3VHlwZUVsZXNBcnIuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gIH0pO1xuICBwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJldmlldy0nICsgYXBwbHlUeXBlKVswXS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgYXBpUmVzcG9uZFByZXZpZXdFbGUuY2xhc3NOYW1lID0gYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0Fyci5qb2luKCcgJyk7XG4gIGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTGlzdC5hZGQoYXBwbHlUeXBlKTtcbn1cblxuZnVuY3Rpb24gYXBpU2F2ZSgpIHtcblxufVxuZnVuY3Rpb24gYWRkTGVhZkNoaWxkKCkge1xuXG59XG5mdW5jdGlvbiByZW1vdmVMZWFmQ2hpbGQoKSB7XG5cbn1cbmZ1bmN0aW9uIGFwaVRlc3QoKSB7XG5cbn1cbmZ1bmN0aW9uIGpzb25WaWV3KGRhdGEpIHtcbiAgdmFyICRwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgJHByZS5pbm5lckhUTUwgPSBkYXRhO1xuICBsZXQgJGRhdGFWaWV3RWxlID0gdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXZpZXcnKVswXTtcbiAgJGRhdGFWaWV3RWxlLmlubmVySFRNTCA9ICcnO1xuICAkZGF0YVZpZXdFbGUuYXBwZW5kQ2hpbGQoJHByZSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUFwaShldikge1xuICBpZiAoIXRoaXMuYXBpRGF0YU9iai5pZCkge1xuICAgIGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQoZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgbGV0IHBhcmFtcyA9IHt9O1xuICBjb25zb2xlLmxvZyhyb290QVBJKTtcbiAgJGh0dHAocm9vdEFQSSArICcvJyArIHRoaXMuYXBpRGF0YU9iai5pZClcbiAgLmRlbGV0ZShwYXJhbXMpXG4gIC50aGVuKGNhbGxiYWNrcy5kZWxldGVTdWNjZXNzLmJpbmQoZXYpKVxuICAuY2F0Y2goY2FsbGJhY2tzLmVycm9yKTtcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5zdG9yZUFwaVJldHVybkRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9IGRhdGE7XG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5jbGljaygpO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5pbml0QXBpVHJlZSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgaW5pdERhdGEgPSB7XG4gICAgbm9kZUlkOiAwLFxuICAgIGRhdGE6IGxlYWZEYXRhUGxhY2VIb2xkZXJcbiAgfTtcbiAgbGV0IGZpcnN0Q2hpbGREYXRhID0ge1xuICAgIG5vZGVJZDogMSxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIHRoaXMuYXBpVHJlZSA9IG5ldyBUcmVlKGluaXREYXRhKTtcbiAgdGhpcy5hcGlUcmVlLmFkZChmaXJzdENoaWxkRGF0YSwgMCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gIGxldCB0cmVlRG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbGV0IGxlYWZFbGU7XG4gICAgbGV0IGxlYWZCaW5kRGF0YTtcbiAgICBub2RlLnBhcmVudElkID0gbm9kZS5wYXJlbnQgPyBub2RlLnBhcmVudC5ub2RlSWQgOiBudWxsO1xuICAgIGxlYWZFbGUgPSBnZW5lcmF0ZUxlYWYobm9kZSk7XG4gICAgbGVhZkJpbmREYXRhID0gdHdvV2F5RGF0YUJpbmRpbmcobGVhZkRhdGFQbGFjZUhvbGRlciwgbGVhZkVsZSk7XG4gICAgbm9kZS5kYXRhID0gbGVhZkJpbmREYXRhO1xuICAgIGlmIChub2RlLnBhcmVudElkID09PSBudWxsIHx8IG5vZGUucGFyZW50SWQgPT09ICdudWxsJykgbGVhZkVsZS5jbGFzc0xpc3QuYWRkKCdyb290LWxlYWYnKTtcbiAgICB0cmVlRG9jRnJhZy5hcHBlbmRDaGlsZChsZWFmRWxlKTtcbiAgfTtcblxuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRihjYWxsYmFjayk7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQodHJlZURvY0ZyYWcpO1xuXG4gIHJldHVybiB0aGlzLmFwaVRyZWU7XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmRlbE5vZGUgPSBmdW5jdGlvbihjdHgpIHtcbiAgdmFyIGN1cnJlbnRMZWFmID0gY3R4LnRhcmdldC5jbG9zZXN0KCcubGVhZicpO1xuICB2YXIgY3VycmVudElkeCA9ICtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5ub2RlSWQ7XG4gIHZhciBwYXJlbnRJZHggPSAoK2N0eC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudElkID09PSAwKSA/IDAgOiArY3R4LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50SWQ7XG5cbiAgdmFyIG5vZGVzQXJyID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGVzY2VuZGFudHMoY3VycmVudElkeCk7XG4gIHZhciBpZHhBcnIgPSBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKTtcbiAgdGhpcy5hcGlUcmVlLnJlbW92ZShjdXJyZW50SWR4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdGhpcy5yZW1vdmVOb2Rlc0Zyb21Eb20oaWR4QXJyKTtcblxuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZHgpO1xuICB0aGlzLnNjcm9sbEJhci5yZW5kZXIoKTtcbn07XG5BcGlEb20ucHJvdG90eXBlLnJlbW92ZU5vZGVzRnJvbURvbSA9IGZ1bmN0aW9uKGFycikge1xuICB2YXIgYWxsTGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgYWxsTGVhdmVzTGVuID0gYWxsTGVhdmVzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxMZWF2ZXNMZW47IGkrKykge1xuICAgIGlmIChhcnIuaW5kZXhPZigrYWxsTGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJGFwaVRyZWUucmVtb3ZlQ2hpbGQoYWxsTGVhdmVzW2ldKTtcbiAgICB9XG4gIH07XG59O1xuZnVuY3Rpb24gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycikge1xuICB2YXIgbm9kZXNBcnJMZW4gPSBub2Rlc0Fyci5sZW5ndGg7XG4gIHZhciBpZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlc0FyckxlbjsgaSsrKSB7XG4gICAgaWR4QXJyLnB1c2gobm9kZXNBcnJbaV0ubm9kZUlkKTtcbiAgfTtcbiAgcmV0dXJuIGlkeEFycjtcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5zZXRQYXJlbnROb2RlVmFsID0gZnVuY3Rpb24oaWR4KSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBxdWV1ZSA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gIHZhciBxdWV1ZUxlbiA9IHF1ZXVlLl9uZXdlc3RJbmRleCAtIHF1ZXVlLl9vbGRlc3RJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSBsZWF2ZXMubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaWYgKCtsZWF2ZXNbaV0uZGF0YXNldC5ub2RlSWQgPT09IGlkeCkge1xuICAgICAgaWYgKHF1ZXVlTGVuID4gMCkge1xuICAgICAgICAvLyBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbihjdHgpIHtcbiAgdGhpcy5sZWFmSW5kZXggPSB0aGlzLmFwaVRyZWUubWF4SWQoKSArIDE7XG4gIHZhciBwYXJlbnRJZGV4ID0gK2N0eC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5vZGVJZDtcblxuICBsZXQgbGVhZkNoaWxkID0gY3JlYXRlTGVhZihwYXJlbnRJZGV4LCB0aGlzLmxlYWZJbmRleCk7XG4gIGxldCBjaGlsZE1vZGVsID0gdHdvV2F5RGF0YUJpbmRpbmcobGVhZkRhdGFQbGFjZUhvbGRlciwgbGVhZkNoaWxkKTtcbiAgbGV0IGxlYWZEYXRhID0ge1xuICAgIG5vZGVJZDogdGhpcy5sZWFmSW5kZXgsXG4gICAgZGF0YTogY2hpbGRNb2RlbFxuICB9O1xuICB0aGlzLmFwaVRyZWUuYWRkKGxlYWZEYXRhLCBwYXJlbnRJZGV4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQobGVhZkNoaWxkKTtcbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWRleCk7XG4gIHRoaXMuc2Nyb2xsQmFyLnJlbmRlcigpO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZCwgbm9kZUluZGV4KSB7XG4gIHZhciBuZXdMZWFmU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZWFmJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnYmluZCcsICdoYXNDaGlsZCcpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJywgJycpO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0LnBhcmVudElkID0gcGFyZW50SWQ7XG4gIG5ld0xlYWZTcGFuLmRhdGFzZXQubm9kZUlkID0gbm9kZUluZGV4O1xuICBuZXdMZWFmU3Bhbi5pbm5lckhUTUwgPSBsZWFmVHBsKCk7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxlYWYocGFyZW50SWR4LCBub2RlSWR4KSB7XG4gIHJldHVybiBnZW5lcmF0ZUxlYWZTcGFuKHBhcmVudElkeCwgbm9kZUlkeCk7XG59XG5BcGlEb20ucHJvdG90eXBlLnN0eWxlTm9kZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcblxuICBsZXQgbGVhdmVzSGFzaCA9IHt9O1xuICBmb3IgKGxldCBpID0gMCwgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDsgaSA8IGxlYXZlc0xlbjsgaSsrKSB7XG4gICAgbGVhdmVzSGFzaFtsZWF2ZXNbaV0uZGF0YXNldC5ub2RlSWRdID0gbGVhdmVzW2ldO1xuICB9XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlSWQgPD0gMCkgcmV0dXJuO1xuICAgIGxlYXZlc0hhc2hbbm9kZS5ub2RlSWRdLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZCgocGVyTGVhZldpZHRoICsgcGVyU1ZHUGF0aFdpZHRoKSAqIChub2RlLmNvbHVtbiAtIDEpKSArICdweCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQobm9kZS50b3RhbG9mZnNldHlsZXZlbCAqIChwZXJMZWFmSGVpZ2h0ICsgbGVhdmVzVmVydGljYWxHYXApKSArICdweCwgMCknO1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRihjYWxsYmFjayk7XG4gIHRoaXMuZGltZW5zaW9uQXJyID0gdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICB0aGlzLmRyYXdTVkcoKTtcbn07XG5cbi8qIHV0aWxzICovXG5mdW5jdGlvbiBjbG9uZVJlY3RPYmoob2JqKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBvYmoudG9wLFxuICAgIGJvdHRvbTogb2JqLmJvdHRvbSxcbiAgICBsZWZ0OiBvYmoubGVmdCxcbiAgICByaWdodDogb2JqLnJpZ2h0LFxuICAgIHdpZHRoOiBvYmoud2lkdGgsXG4gICAgaGVpZ2h0OiBvYmouaGVpZ2h0XG4gIH07XG59XG5cbi8qIG1hbmlwdWxhdGUgU1ZHICovXG5BcGlEb20ucHJvdG90eXBlLmNsZWFyU1ZHID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdmcgPSB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdO1xuICB3aGlsZSAoc3ZnLmxhc3RDaGlsZCkge1xuICAgIHN2Zy5yZW1vdmVDaGlsZChzdmcubGFzdENoaWxkKTtcbiAgfVxufTtcbi8qKlxuICogW2RyYXdTVkcgZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAqL1xuQXBpRG9tLnByb3RvdHlwZS5kcmF3U1ZHID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2xlYXJTVkcoKTtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgc3ZnUGFydGlhbHMgPSBbXTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgc3ZnUGFydGlhbHMucHVzaCh0aGF0LmNyZWF0ZVNpbmdsZVNWRyhub2RlLm5vZGVJZCwgbm9kZS5jb2x1bW4sIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsLCAobm9kZS50b3RhbG9mZnNldHlsZXZlbCAtIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsKSkpO1xuICAgIH07XG4gIH07XG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZURGKGNhbGxiYWNrKTtcblxuICB2YXIgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdmdQYXJ0aWFscy5sZW5ndGg7IGkrKykge1xuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoc3ZnUGFydGlhbHNbaV0pO1xuICB9XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF0uYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuY3JlYXRlU2luZ2xlU1ZHID0gZnVuY3Rpb24oaWR4LCBob3JpLCBwYXJlbnRWZXJ0LCBkdmVydCkge1xuXG4gIHZhciBzdmducyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIHZhciBuZXdQYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z25zLCAncGF0aCcpO1xuICB2YXIgY29udHJvbFJhdGUgPSAwLjI7XG4gIHZhciBteCwgbXksIHF4LCBxeSwgcXh4LCBxeXksIHR4LCB0eTtcbiAgaG9yaSA9IGhvcmkgLSAxO1xuICBkdmVydCA9IGR2ZXJ0O1xuICBwYXJlbnRWZXJ0ID0gcGFyZW50VmVydDtcblxuICBteCA9IGhvcmkgKiA0OTA7IC8qIHNpbmdsZSBsZWFmIHdpZHRoIHBsdXMgc2luZ2xlIHN2ZyBwYXRoIHdpZHRoICovXG4gIG15ID0gcGFyZW50VmVydCAqIDUyICsgODtcbiAgcXggPSBteCArIDEwO1xuICBxeSA9IG15O1xuICBxeHggPSBteCArIDE1O1xuICBxeXkgPSAobXkgKyAoZHZlcnQgLyAyKSAqIDUyKTtcbiAgdHggPSBteCArIDMwO1xuICB0eSA9IG15ICsgZHZlcnQgKiA1MjtcblxuICBuZXdQYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgJ00gJyArIG14ICsgJyAnICsgbXkgKyAnIFEgJyArIHF4ICsgJyAnICsgcXkgKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF4eCArICcgJyArIHF5eSArICcgVCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCArICcgJyArIHR5ICsgJycpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXBpLXN2Zy1wYXRoJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdkYXRhLWlkeCcsIGlkeCk7XG5cbiAgcmV0dXJuIG5ld1BhdGg7XG59O1xuXG4vKiBjYWxjdWxhdGUgZGltZW5zaW9ucyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jYWxjRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9yaU1heCwgdmVydGljYWxNYXgsIGhvcmlBcnIgPSBbXSwgdmVydEFyciA9IFtdO1xuXG4gIGhvcmlBcnIgPSB0aGlzLmFwaVRyZWUuZGVwdGgoKTtcbiAgaG9yaU1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhvcmlBcnIpO1xuICB2ZXJ0aWNhbE1heCA9IHRoaXMuYXBpVHJlZS5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUud2lkdGggPSBob3JpTWF4ICogNTIwICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUNvbnRlbnQuc3R5bGUud2lkdGggPSBob3JpTWF4ICogNTIwICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgLSAodmVydGljYWxNYXggPiAxID8gMTAgOiAwKSArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVDb250ZW50LnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgLSAodmVydGljYWxNYXggPiAxID8gMTAgOiAwKSArICdweCc7XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuXG59O1xuXG4vKiBjYWxjdWxhdGUgb2Zmc2V0ICovXG5cbkFwaURvbS5wcm90b3R5cGUubm9kZUxlZnRPZmZzZXQgPSBmdW5jdGlvbihlbCkge1xuICB2YXIgZWxSZWN0T2JqZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBib2R5UmVjdE9iaiA9IHRoaXMuJGFwaVRyZWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBjbG9uZUJvZHlSZWN0T2JqID0gY2xvbmVSZWN0T2JqKGJvZHlSZWN0T2JqKTtcbiAgdmFyIGNsb25lRWxSZWN0T2JqZWN0ID0gY2xvbmVSZWN0T2JqKGVsUmVjdE9iamVjdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnRvcCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmJvdHRvbSArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmxlZnQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QucmlnaHQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgcmV0dXJuIGNsb25lRWxSZWN0T2JqZWN0O1xufTtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWVEb20uanMiLCIvKipcbiAqIFtUcmVlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICpcbiAqIF9yb290IHBvaW50cyB0byB0aGUgcm9vdCBub2RlIG9mIGEgdHJlZS5cbiAqIHRyYXZlcnNlREYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBERlMuXG4gKiB0cmF2ZXJzZUJGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggQkZTLlxuICogY29udGFpbnMoZGF0YSwgdHJhdmVyc2FsKSBzZWFyY2hlcyBmb3IgYSBub2RlIGluIGEgdHJlZS5cbiAqIGFkZChkYXRhLCB0b0RhdGEsIHRyYXZlcnNlKSBhZGRzIGEgbm9kZSB0byBhIHRyZWUuXG4gKiByZW1vdmUoY2hpbGQsIHBhcmVudCkgcmVtb3ZlcyBhIG5vZGUgaW4gYSB0cmVlLlxuICpcbiAqL1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSAnLi9xdWV1ZSc7XG5leHBvcnQgZnVuY3Rpb24gVHJlZShkYXRhKSB7XG4gIHZhciBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gIHRoaXMuX3Jvb3QgPSBub2RlO1xufVxuXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcbiAgdGhpcy5ub2RlSWQgPSBkYXRhLm5vZGVJZDsgLy8gbGVhZiBpbmRleCwgc3RhcnRzIGZyb20gMChyb290IG5vZGUpXG4gIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAvLyBhZGRlZCBsYXRlclxuICB0aGlzLmNoaWxkcmVubGV2ZWwgPSAxOyAvLyByb3dzIG9mIGRlc2NlbmRhbnRzIG9mIGN1cnJlbnQgbm9kZVxuICB0aGlzLmNvbHVtbiA9IDA7IC8vIHdoaWNoIGNvbHVtbiB0aGUgY3VycmVudCBub2RlIHNpdHMgaW4sIHN0YXJ0cyBmcm9tIDAoIHJvb3Qgbm9kZSBzaXRzIGluKVxuICB0aGlzLnRvdGFsb2Zmc2V0eWxldmVsID0gMDsgLy8gdG90YWwgdmVydGljYWwgb2Zmc2V0IHRvIHRoZSBjdXJyZW50IHRyZWUgXG4gIHRoaXMuZGF0YSA9IGRhdGEuZGF0YSB8fCB7fTtcbn1cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VERiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgLy8gdGhpcyBpcyBhIHJlY3Vyc2UgYW5kIGltbWVkaWF0ZWx5LWludm9raW5nIGZ1bmN0aW9uXG4gIChmdW5jdGlvbiByZWN1cnNlKGN1cnJlbnROb2RlKSB7XG4gICAgLy8gc3RlcCAyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBzdGVwIDNcbiAgICAgIHJlY3Vyc2UoY3VycmVudE5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIC8vIHN0ZXAgNFxuICAgIGNhbGxiYWNrKGN1cnJlbnROb2RlKTtcblxuICAgIC8vIHN0ZXAgMVxuICB9KSh0aGlzLl9yb290KTtcblxufTtcblxuLy8gZm9yIHRob3NlIG5vZGVzIHdobyBoYXZlIGNoaWxkcmVuXG5mdW5jdGlvbiBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkge1xuICB2YXIgdG90YWxDaGlsZHJlbkxldmVscyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHRvdGFsQ2hpbGRyZW5MZXZlbHMgKz0gbm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxDaGlsZHJlbkxldmVscztcbn1cblRyZWUucHJvdG90eXBlLmNhbGNDaGlsZHJlbkxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkgOiAxO1xuICAgIG5vZGUuY29sdW1uID0gbm9kZS5wYXJlbnQgPyAobm9kZS5wYXJlbnQuY29sdW1uICsgMSkgOiAwO1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VERihjYWxsYmFjayk7XG59O1xuXG5mdW5jdGlvbiBjYWxjT2ZmWShhcnIsIGRhdGEpIHtcbiAgdmFyIG5vZGVJZHggPSBmaW5kSW5kZXgoYXJyLCBkYXRhKTtcbiAgdmFyIHRvdGFsWSA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUlkeDsgaSsrKSB7XG4gICAgdG90YWxZICs9IGFycltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxZO1xufVxuXG5UcmVlLnByb3RvdHlwZS5jYWxjVG90YWxPZmZzZXRZTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxldmVsZ2FwID0gMDtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgbm9kZS50b3RhbG9mZnNldHlsZXZlbCA9IG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsICsgY2FsY09mZlkobm9kZS5wYXJlbnQuY2hpbGRyZW4sIG5vZGUubm9kZUlkKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cbiAgICB9O1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbn07XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlQkYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKTtcblxuICBxdWV1ZS5lbnF1ZXVlKHRoaXMuX3Jvb3QpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcblxuICB3aGlsZSAoY3VycmVudFRyZWUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUoY3VycmVudFRyZWUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGN1cnJlbnRUcmVlKTtcbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxufTtcblxuVHJlZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihjYWxsYmFjaywgdHJhdmVyc2FsKSB7XG4gIHRyYXZlcnNhbC5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5cblRyZWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciBjaGlsZCA9IG5ldyBOb2RlKGRhdGEpLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IHRvRGF0YSkge1xuICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhZGQgbm9kZSB0byBhIG5vbi1leGlzdGVudCBwYXJlbnQuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG4gIHRoaXMuY2hlY2tEYXRhSGFzQ2hpbGQoKTtcbiAgcmV0dXJuIGNoaWxkXG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhLCBmcm9tRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciB0cmVlID0gdGhpcyxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjaGlsZFRvUmVtb3ZlID0gbnVsbCxcbiAgICAgIGluZGV4O1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlSWQgPT09IGZyb21EYXRhKSB7XG4gICAgICBwYXJlbnQgPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBpbmRleCA9IGZpbmRJbmRleChwYXJlbnQuY2hpbGRyZW4sIGRhdGEpO1xuXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSB0byByZW1vdmUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZG9lcyBub3QgZXhpc3QuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG4gIHRoaXMuY2hlY2tEYXRhSGFzQ2hpbGQoKTtcbiAgcmV0dXJuIGNoaWxkVG9SZW1vdmU7XG59O1xuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBkYXRhKSB7XG4gIHZhciBpbmRleDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0ubm9kZUlkID09PSBkYXRhKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKiB0cmVlIGFkZG9uKi9cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEaXJlY3RDaGlsZCA9IGZ1bmN0aW9uKG5vZGVkYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICBwYXJlbnQgPSBudWxsLFxuICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZUlkID09PSBub2RlZGF0YSkge1xuICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShwYXJlbnQuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsYmFjayhwYXJlbnQpO1xuICAgIHBhcmVudCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufTtcblRyZWUucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlT2JqID0ge307XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzdHlsZU9ialtub2RlLm5vZGVJZF0gPSBub2RlLnRvdGFsb2Zmc2V0eWxldmVsO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG4gIHJldHVybiBzdHlsZU9iajtcbn07XG5cbi8qKlxuICogW3RyYXZlcnNlRGVzY2VuZGFudHMgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbaW50ZWdlcl19IG5vZGVEYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1thcnJheV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURlc2NlbmRhbnRzID0gZnVuY3Rpb24obm9kZURhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVEYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHF1ZXVlLmVucXVldWUocGFyZW50KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIHZhciBkZXNjZW5kYW50c0FyciA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGRlc2NlbmRhbnRzQXJyLnB1c2goY3VycmVudFRyZWUpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cblxuICByZXR1cm4gZGVzY2VuZGFudHNBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jaGVja0RhdGFIYXNDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbm9kZS5kYXRhLmhhc0NoaWxkID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xufTtcblxuLyogZ2V0IE1heCBub2RlSWQgZnJvbSB0cmVlICovXG5UcmVlLnByb3RvdHlwZS5tYXhJZCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbWF4Tm9kZUlkID0gMDtcbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVJZCA+IG1heE5vZGVJZCkgbWF4Tm9kZUlkID0gbm9kZS5ub2RlSWQ7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG4gIHJldHVybiBtYXhOb2RlSWQ7XG59O1xuXG4vKiB0cmVlIGRlcHRoICovXG5UcmVlLnByb3RvdHlwZS5kZXB0aCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGVwdGhBcnIgPSBbXTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCBkZXB0aCA9IDA7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICB3aGlsZSAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgZGVwdGggKz0gMTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgfVxuICAgICAgZGVwdGhBcnIucHVzaChkZXB0aCk7XG4gICAgfVxuICB9O1xuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuICByZXR1cm4gZGVwdGhBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5kaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG4gIGxldCBob3JpTWF4LCB2ZXJ0aWNhbE1heCwgaG9yaUFyciA9IFtdO1xuICBob3JpQXJyID0gdGhpcy5kZXB0aCgpO1xuICBob3JpTWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaG9yaUFycik7XG4gIHZlcnRpY2FsTWF4ID0gdGhpcy5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanMiLCIvKipcbiAqIFtRdWV1ZSBkZXNjcmlwdGlvbl1cbiAqIGVucXVldWUoZGF0YSkgYWRkcyBkYXRhIHRvIGEgcXVldWUuXG4gKiBkZXF1ZXVlIHJlbW92ZXMgdGhlIG9sZGVzdCBhZGRlZCBkYXRhIHRvIGEgcXVldWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgdGhpcy5fb2xkZXN0SW5kZXggPSAxO1xuICB0aGlzLl9uZXdlc3RJbmRleCA9IDE7XG4gIHRoaXMuX3N0b3JhZ2UgPSB7fTtcbn1cblxuUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25ld2VzdEluZGV4IC0gdGhpcy5fb2xkZXN0SW5kZXg7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5fc3RvcmFnZVt0aGlzLl9uZXdlc3RJbmRleF0gPSBkYXRhO1xuICB0aGlzLl9uZXdlc3RJbmRleCsrO1xufTtcblxuUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZGVzdEluZGV4ID0gdGhpcy5fb2xkZXN0SW5kZXgsXG4gICAgICBuZXdlc3RJbmRleCA9IHRoaXMuX25ld2VzdEluZGV4LFxuICAgICAgZGVsZXRlZERhdGE7XG5cbiAgaWYgKG9sZGVzdEluZGV4ICE9PSBuZXdlc3RJbmRleCkge1xuICAgIGRlbGV0ZWREYXRhID0gdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgZGVsZXRlIHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIHRoaXMuX29sZGVzdEluZGV4Kys7XG5cbiAgICByZXR1cm4gZGVsZXRlZERhdGE7XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvcXVldWUuanMiLCJpbXBvcnQge21lcmdlT2JqfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0QXBpRGF0YSh0cmVlLCBvcEVsZSkge1xuICBsZXQgcGVyQXBpRWxlID0gb3BFbGUuY2xvc2VzdCgnLnBlci1hcGknKTtcbiAgLy8gbGV0IHRyZWVFbGUgPSBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgcmV0dXJuIG1lcmdlT2JqKGNvbGxlY3RJbmZvKHBlckFwaUVsZSksIGNvbGxlY3REYXRhRnJvbVRyZWUodHJlZSkpO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0SW5mbyhwZXJBcGlFbGUpIHtcbiAgbGV0IGluZm9FbGUgPSBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWluZm8nKVswXTtcbiAgbGV0IE1vZGVzUm93RWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tb2Rlcy1yb3cnKVswXTtcbiAgbGV0IGluZm9EYXRhID0ge307XG4gIGluZm9EYXRhID0ge1xuICAgICdzZWN0aW9uJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VjdGlvbicpWzBdLnZhbHVlLFxuICAgICd1cmknOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSxcbiAgICAnbWV0aG9kJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF0udmFsdWUsXG4gICAgJ2Rlc2NyaXB0aW9uJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktZGVzY3JpcHRpb24nKVswXS52YWx1ZSxcbiAgICAnd2lraUxpbmsnOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS13aWtpLWlucHV0JylbMF0udmFsdWUsXG4gICAgJ21vZGUnOiBnZXRNb2RlVmFsKE1vZGVzUm93RWxlKSxcbiAgICAnZGVidWdBZGRyJzogZ2V0RGVidWdBZGRyKE1vZGVzUm93RWxlKVxuICB9O1xuXG4gIHJldHVybiBpbmZvRGF0YTtcbn1cblxuZnVuY3Rpb24gZ2V0TW9kZVZhbChNb2Rlc1Jvd0VsZSkge1xuICB2YXIgcmFkaW9zID0gTW9kZXNSb3dFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1vZGUnKTtcbiAgdmFyIG1vZGVWYWw7XG4gIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSByYWRpb3MubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocmFkaW9zW2ldLmNoZWNrZWQpIHtcbiAgICAgIG1vZGVWYWwgPSByYWRpb3NbaV0udmFsdWU7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1vZGVWYWw7XG59XG5cbmZ1bmN0aW9uIGdldERlYnVnQWRkcihNb2Rlc1Jvd0VsZSkge1xuICByZXR1cm4gTW9kZXNSb3dFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZS1kZWJ1Z2dpbmctYWRkcicpWzBdLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0VHJlZSh0cmVlRWxlKSB7XG5cdGxldCBsZWF2ZXMgPSBbXS5zbGljZS5jYWxsKHRyZWVFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTsgXG4gIGxldCB0cmVlRGF0YUFyciA9IFtdO1xuICBsZXQgdHJlZURhdGFPYmogPSB7fTtcbiAgbGV0IGxlYWZEYXRhO1xuICBmb3IgKGxldCBpID0gMCwgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDsgaSA8IGxlYXZlc0xlbjsgaSsrKSB7XG4gICAgbGVhZkRhdGEgPSB7fTtcbiAgICBsZWFmRGF0YS5wYXJlbnRJZCA9IGxlYXZlc1tpXS5kYXRhc2V0LnBhcmVudDtcbiAgICBsZWFmRGF0YS5ub2RlSWQgPSBsZWF2ZXNbaV0uZGF0YXNldC5pbmRleDtcbiAgICBsZWFmRGF0YS5rZXkgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi1rZXknKVswXS52YWx1ZTtcbiAgICBsZWFmRGF0YS52YWx1ZSA9IGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWU7XG4gICAgbGVhZkRhdGEucXVhbnRpdHkgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi1xdWFudGl0eScpWzBdLnZhbHVlO1xuICAgIHRyZWVEYXRhQXJyLnB1c2gobGVhZkRhdGEpO1xuICB9O1xuICB0cmVlRGF0YU9iai5ub2RlcyA9IHRyZWVEYXRhQXJyO1xuICByZXR1cm4gdHJlZURhdGFPYmo7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3REYXRhRnJvbVRyZWUoYXBpVHJlZSkge1xuICBsZXQgdHJlZSA9IGFwaVRyZWU7XG4gIGxldCBub2Rlc0FyciA9IFtdO1xuICBsZXQgdHJlZURhdGFPYmogPSB7fTtcbiAgbGV0IGRpbWVuc2lvbnNBcnIgPSBbXTtcbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlID09PSBudWxsKSByZXR1cm47XG4gICAgbGV0IG5vZGVEYXRhID0ge307XG4gICAgbm9kZURhdGEubm9kZUlkID0gbm9kZS5ub2RlSWQ7XG4gICAgbm9kZURhdGEuY29sdW1uID0gbm9kZS5jb2x1bW47XG4gICAgbm9kZURhdGEucGFyZW50SWQgPSBub2RlLnBhcmVudCA9PT0gbnVsbCA/IG51bGwgOiBub2RlLnBhcmVudC5ub2RlSWQ7XG4gICAgbm9kZURhdGEuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW5sZXZlbDtcbiAgICBub2RlRGF0YS50b3RhbG9mZnNldHlsZXZlbCA9ICBub2RlLnRvdGFsb2Zmc2V0eWxldmVsO1xuICAgIG5vZGVEYXRhLmRhdGEgPSBub2RlLmRhdGE7XG4gICAgbm9kZURhdGEuZGF0YS5oYXNDaGlsZCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgICBub2Rlc0Fyci5wdXNoKG5vZGVEYXRhKTtcbiAgfTtcbiAgdHJlZS50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbiAgZGltZW5zaW9uc0FyciA9IHRyZWUuZGltZW5zaW9ucygpO1xuICB0cmVlRGF0YU9iai5kaW1lbnNpb25zID0ge307XG4gIHRyZWVEYXRhT2JqLmRpbWVuc2lvbnMuaFVuaXQgPSBkaW1lbnNpb25zQXJyWzBdO1xuICB0cmVlRGF0YU9iai5kaW1lbnNpb25zLnZVbml0ID0gZGltZW5zaW9uc0FyclsxXTtcbiAgdHJlZURhdGFPYmoubm9kZXMgPSBub2Rlc0FycjtcbiAgcmV0dXJuIHRyZWVEYXRhT2JqO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGdldE1heE9mQXJyYXkobnVtQXJyYXkpIHtcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxlbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKGNsYXNzTmFtZSkgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXgoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgcHJlZml4ID0gJyc7XG4gIHByZWZpeCA9ICh1YS5pbmRleE9mKCdjaHJvbWUnKSA+PSAwIHx8IHdpbmRvdy5vcGVuRGF0YWJhc2UpID8gJy13ZWJraXQtJyA6ICh1YS5pbmRleE9mKCdmaXJlZm94JykgPj0gMCkgPyAnLW1vei0nIDogd2luZG93Lm9wZXJhID8gJy1vLScgOiAoZG9jdW1lbnQuYWxsICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA9PT0gLTEpID8gJy1tcy0nIDogJyc7XG4gIHJldHVybiBwcmVmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oZWwpIHtcbiAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG5cbiAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuICBpZiAocmVzdWx0c1sxXSA9PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuXG4gIHJlc3VsdHMucHVzaCgwKTtcbiAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoNSwgOCk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbi8vICAgLy8gY2hyb21lIHdvbid0IHVzZSBwcmVmaXhcbi8vICAgLy8gdmFyIHN0eWxlX2F0dHIgPSBicm93c2VyUHJlZml4KCkgKyAndHJhbnNmb3JtJztcbi8vICAgdmFyIHN0eWxlX2F0dHIgPSAndHJhbnNmb3JtJztcbi8vICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlX2F0dHIpO1xuLy8gICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG4vLyAgIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbi8vICAgaWYgKHJlc3VsdHNbMV0gPT09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG4vLyAgIHJlc3VsdHMucHVzaCgwKTtcbi8vICAgcmV0dXJuICsocmVzdWx0cy5zbGljZSg1LCA4KVswXSk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5zcGxpdCgndHJhbnNsYXRlM2QnKVsxXS5zcGxpdCgnLCAnKVswXS5zbGljZSgxKS5zcGxpdCgncHgnKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVkob2JqKSB7XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxuICAgICAgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtIHx8IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gIHZhciBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gIGlmIChtYXQpIHJldHVybiBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVsxM10pO1xuICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICByZXR1cm4gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbNV0pIDogMDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuLyoqXG4gKiBbc3RyaW5naWZ5IHdpdGggNCBzcGFjZXMgYXQgZWFjaCBsZXZlbF1cbiAqIEBwYXJhbSAge1tvYmplY3RdfSBqc09iaiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIFwiXFx0XCIpOyAvLyBzdHJpbmdpZnkgd2l0aCB0YWJzIGluc2VydGVkIGF0IGVhY2ggbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIFtoaWdodGxpZ2h0SlNPTiB3b3JrcyBvbiBKU09OIG9iamVjdCwgbm90IHN0cmluZ11cbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XG4gIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uLCB1bmRlZmluZWQsIDQpO1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICB2YXIgY2xzID0gJ251bWJlcic7XG4gICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAna2V5JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgfSBlbHNlIGlmICgvbnVsbC8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdudWxsJztcbiAgICB9XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJpbXBvcnQge1RyZWV9IGZyb20gJy4vdHJlZSc7XG5leHBvcnQgZnVuY3Rpb24ganNvblRvVHJlZShub2Rlc0Fycikge1xuICBsZXQgaGFzaFRhYmxlID0ge307XG4gIGxldCB0cmVlO1xuICBmb3IgKGxldCBpID0gMCwgbm9kZXNMZW4gPSBub2Rlc0Fyci5sZW5ndGg7IGkgPCBub2Rlc0xlbjsgaSsrKSB7XG4gICAgaGFzaFRhYmxlW25vZGVzQXJyW2ldWydwYXJlbnRJZCddXSA/IGhhc2hUYWJsZVtub2Rlc0FycltpXVsncGFyZW50SWQnXV0ucHVzaChub2Rlc0FycltpXSkgOiBoYXNoVGFibGVbbm9kZXNBcnJbaV1bJ3BhcmVudElkJ11dID0gW25vZGVzQXJyW2ldXTtcbiAgfVxuICAvLyBub2RlIOeahOWtkOiKgueCueeahElE5oC75piv5aSn5LqObm9kZeeahElEXG4gIGxldCBtb2RLZXlzQXJyID0gcmVtb3ZlRWxlRnJvbUFycihPYmplY3Qua2V5cyhoYXNoVGFibGUpLCAnbnVsbCcpLm1hcChOdW1iZXIpLnNvcnQoc29ydE51bWJlcik7XG4gIGxldCByb290Tm9kZURhdGEgPSBoYXNoVGFibGVbJ251bGwnXVswXTtcbiAgdHJlZSA9IG5ldyBUcmVlKHJvb3ROb2RlRGF0YSk7XG5cbiAgZm9yIChsZXQgaiA9IDAsIGtleXNMZW4gPSBtb2RLZXlzQXJyLmxlbmd0aDsgaiA8IGtleXNMZW47IGorKykge1xuICAgIGlmIChoYXNoVGFibGUuaGFzT3duUHJvcGVydHkobW9kS2V5c0FycltqXSkpIHtcbiAgICAgIGZvciAobGV0IGsgPSAwLCBrZXlBcnJMZW4gPSBoYXNoVGFibGVbbW9kS2V5c0FycltqXV0ubGVuZ3RoOyBrIDwga2V5QXJyTGVuOyBrKyspIHtcbiAgICAgICAgdHJlZS5hZGQoaGFzaFRhYmxlW21vZEtleXNBcnJbal1dW2tdLCArbW9kS2V5c0FycltqXSwgdHJlZS50cmF2ZXJzZUJGKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRyZWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZUZyb21BcnIoYXJyLCBlbGUpIHtcbiAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoZWxlKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBCeSBkZWZhdWx0IHRoZSBzb3J0IG1ldGhvZCBzb3J0cyBlbGVtZW50cyBhbHBoYWJldGljYWxseS4gKi9cbmZ1bmN0aW9uIHNvcnROdW1iZXIoYSwgYikge1xuICByZXR1cm4gYSAtIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmVlVG9Kc29uKHRyZWUpIHtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9qc29uVHJlZUNvbnZlcnRlci5qcyIsImV4cG9ydCBmdW5jdGlvbiB0d29XYXlEYXRhQmluZGluZyhkYXRhLCBkb21Db250ZXh0KSB7XG4gIC8qIEluc3RhdGlhdGUgYW4gZW1wdHkgYG1vZGVsYCBvYmplY3QuICovXG4gIHZhciBtb2RlbCA9IHt9O1xuICAvKiBJdGVyYXRlIG92ZXIgdGhlIGtleXMgb2YgdGhlIHN1cHBsaWVkIGBkYXRhYCBvYmplY3QuICovXG4gIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgLyogU3RvcmUgb3VyIHZhbHVlIGluc2lkZSB0aGUgYGZvckVhY2hgIGNsb3N1cmUuICovXG4gICAgdmFyIHZhbHVlID0gZGF0YVtrZXldO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwga2V5LCB7XG4gICAgICAvKiBXZSB3YW50IG91ciBwcm9wZXJ0eSB0byBhcHBlYXIgaW4gYGZvci4uaW5gIGxvb3BzLiAqL1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIFRoaXMgZG9lc24ndCBuZWVkIHRvIGRvIG11Y2gsIG9ubHkgcmV0dXJuIHRoZSBgdmFsdWVgIGZyb20gb3VyIGNsb3N1cmUuICovXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAvKiBPdmVyd3JpdGUgb3VyIGNsb3N1cmVzIGB2YWx1ZWAgd2l0aCB0aGUgbmV3IGB2YWxgLiAqL1xuICAgICAgICB2YWx1ZSA9IHZhbDtcbiAgICAgICAgLyogU2VsZWN0IGFsbCBub2RlcyB3aXRoIGBiaW5kYCBhbmQgYG1vZGVsYCBhdHRyaWJ1dGVzLiAqL1xuICAgICAgICBzZWxlY3RvclRvQXJyYXkoJ1tiaW5kPScgKyBrZXkgKyAnXScsIGRvbUNvbnRleHQpLmNvbmNhdChzZWxlY3RvclRvQXJyYXkoJ1ttb2RlbD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgIC8qIElmIGVsZW1lbnQgaGFzIGBiaW5kYCBhdHRyaWJ1dGUsIHNldCBpdCdzIGB0ZXh0Q29udGVudGAuICovXG4gICAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnYmluZCcpICYmICFlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJykpIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYmluZC10b2dnbGUtY2xhc3MnKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtdHJ1ZScpOyBcbiAgICAgICAgICAgIH1lbHNlIGlmKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZS10cnVlJyk7XG4gICAgICAgICAgICB9ZWxzZSBpZih2YWx1ZSAmJiAoJycgKyB2YWx1ZSkubGVuZ3RoID4gMCAmJiAhaGFzQWN0aXZlRWxlKGVsQW5kRGVzY2VuZGFudHMoZWwpKSkge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtdHJ1ZScpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYmluZC1hdHRyLWhyZWYnKSkge1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBJZiBlbGVtZW50IGhhcyBgbW9kZWxgIGF0dHJpYnV0ZSwgc2V0IGl0J3MgYHZhbHVlYC4gKi9cblxuICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ21vZGVsJykgJiYgZWwgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBTZXQgb3VyIG1vZGVsIG9iamVjdHMgcHJvcGVydHkgdmFsdWUgdG8gdGhlIHNhbWUgdmFsdWUuICovXG4gICAgbW9kZWxba2V5XSA9IHZhbHVlO1xuICAgIC8qIEFkZCBjaGFuZ2UgaGFuZGxlcnMgdG8gaW5wdXRzIG9uIHRoZSBwYWdlLiAqL1xuICAgIHNlbGVjdG9yVG9BcnJheSgnW21vZGVsPScgKyBrZXkgKyAnXScsIGRvbUNvbnRleHQpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgIC8qIE91ciBoYW5kbGVyIHNpbXBseSBzZXRzIG91ciBtb2RlbHMgYGtleWAgdG8gdGhlIGVsZW1lbnQncyB2YWx1ZS4gKi9cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBlbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIC8qIEJpbmQgYSBga2V5dXBgIGhhbmRsZXIgc28gd2UgZ2V0IGxpdmUgZmVlZGJhY2sgb24gZWFjaCBrZXkgcHJlc3MuICovXG4gICAgICAvLyBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZXIpO1xuICAgICAgLyogQmluZCBhIGBjaGFuZ2VgIGhhbmRsZXIgd2hpY2ggaXMgZmlyZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBibHVycmVkLiAqL1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVyKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8qIFJldHVybiBvdXIgbmV3IG1vZGVsIG9iamVjdC4gKi9cbiAgcmV0dXJuIG1vZGVsO1xufVxuXG4vKiBpbmNsdWRlIGRvbUNvbnRleHQgaXRzc2VsZiAqL1xuZnVuY3Rpb24gc2VsZWN0b3JUb0FycmF5KHNlbGVjdG9yLCBkb21Db250ZXh0KSB7XG4gIGxldCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Db250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgaWYgKGRvbUNvbnRleHQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICBhcnIucHVzaChkb21Db250ZXh0KTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBlbEFuZERlc2NlbmRhbnRzKGVsKSB7XG4gIGxldCByZXN1bHRBcnIgPSBbXTtcbiAgKGZ1bmN0aW9uIGxvb3AoZWxlKSB7XG4gICAgbGV0IGNoaWxkcmVuRWxlcyA9IGVsZS5jaGlsZHJlbjtcbiAgICBpZiAoZWxlLmNoaWxkRWxlbWVudENvdW50KSB7XG4gICAgICBmb3IgKHZhciBpID0gY2hpbGRyZW5FbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGxvb3AoY2hpbGRyZW5FbGVzW2ldKVxuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHRBcnIucHVzaChlbGUpO1xuICB9KShlbCk7XG4gIHJldHVybiByZXN1bHRBcnI7XG59XG5mdW5jdGlvbiBoYXNBY3RpdmVFbGUoYXJyKSB7XG4gIGxldCBib2wgPSBmYWxzZTtcbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHJldHVybjtcbiAgZm9yICh2YXIgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChib2wgPT09IHRydWUpIGJyZWFrO1xuICAgIGJvbCA9IGFycltpXSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYm9sO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanMiLCJpbXBvcnQge2ZsYXNoLCBwYXJzZUFuZEZsYXNofSBmcm9tICcuL2ZsYXNoJztcbmV4cG9ydCBsZXQgY2FsbGJhY2tzID0ge1xuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NhbGxiYWNrcy5qcyIsImltcG9ydCB7c3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2Nyb2xsU3RyKCkge1xuICBsZXQgc2Nyb2xsU3RyID0gYFxuICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtYXhpc1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtc2xpZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtcy10b3BcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1zLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXMtYmxvY2tcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcbiAgcmV0dXJuIHNjcm9sbFN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEJhckgoYikge1xuICByZXR1cm4gbmV3IGEoYik7XG59XG5cbmZ1bmN0aW9uIGEoeCkge1xuICB2YXIgcSA9IHRoaXM7XG4gIHRoaXMub3B0aW9ucyA9IHg7XG4gIGxldCBuZXdTY3JvbGxTdHIgPSBnZW5lcmF0ZVNjcm9sbFN0cigpO1xuICBsZXQgbmV3U2Nyb2xsRWxlID0gc3RyVG9Eb20obmV3U2Nyb2xsU3RyKTtcbiAgdmFyIFkgPSB4LnNjcm9sbGJhciB8fCBuZXdTY3JvbGxFbGVcbiAgICAsIGogPSB4LmNvbnRlbnRcbiAgICAsIE4gPSB4Lm92ZXJmbG93RWxlXG4gICAgLCBpID0geC5pbml0UG9zIHx8IDBcbiAgICAsIE0gPSB4LmluaXREb20gfHwgbnVsbFxuICAgICwgVSA9IHgubW91c2V3aGVlbCB8fCB0cnVlXG4gICAgLCBsID0geC5tb3VzZXdoZWVsbG9jayB8fCBmYWxzZVxuICAgICwgSCA9IHgud2hlZWxkZWx0YSB8fCAxXG4gICAgLCB6ID0geC5jdHJsYmxvY2sgfHwgMFxuICAgICwgSiA9IHguc3RlcCB8fCAwLjFcbiAgICAsIHIgPSB4Lmxlbmd0aFxuICAgICwgSSA9IHguc2NhbGUgfHwgMFxuICAgICwgRyA9IHgudGhlbWUgfHwgJydcbiAgICAsIGFkID0geC5yZWZyZXNoIHx8IGZhbHNlO1xuICB2YXIgUyA9IDAsIFQgPSAwLCBoID0gMCwgViA9IGZ1bmN0aW9uKGFnKSB7XG4gICAgdmFyIGFmID0gcGFyc2VJbnQoUyAtIFQpO1xuICAgIGlmIChhZiA+IDApIHtcbiAgICAgIHZhciBhZyA9IGFnLnZhbHVlO1xuICAgICAgai5zY3JvbGxMZWZ0ID0gYWYgKiBhZztcbiAgICB9XG4gIH1cbiAgLFxuICAgIHYgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtYXhpcycpWzBdLFxuICBnID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXNsaWRlcicpWzBdLFxuICB1ID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXMtdG9wJylbMF0sXG4gIEYgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtcy1ib3R0b20nKVswXSxcbiAgYWUgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtcy1ibG9jaycpWzBdLFxuICBXID0gMCwgUSA9IHogfHwgMCwgayA9IDAsIFIgPSBRLCBtID0gMCwgQyA9IDAsIEwgPSAwLCBkID0gMCwgdCA9IG51bGwgLCBiID0gbnVsbCAsIGFiLCBQLCBEO1xuICB2YXIgeSA9IGZ1bmN0aW9uKCkge1xuICAgIFggPSBmYWxzZTtcbiAgICBjID0gZmFsc2U7XG4gIH1cbiAgO1xuICBpZiAoIXguc2Nyb2xsYmFyKSB7XG4gICAgeC53cmFwcGVyLmFwcGVuZENoaWxkKG5ld1Njcm9sbEVsZSk7XG4gIH1cbiAgai5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLWNvbnRlbnQnKTtcbiAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbCcpO1xuICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKGFnKSB7XG4gICAgaWYgKCFhZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChEKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIFQgPSBqLm9mZnNldFdpZHRoO1xuICAgICAgaCA9IFkub2Zmc2V0V2lkdGg7XG4gICAgICBTID0gTi5vZmZzZXRXaWR0aDtcbiAgICB9IGNhdGNoIChhaCkge31cbiAgICBXID0gYWcgfHwgciB8fCBUIC0gMjtcbiAgICBZLnN0eWxlLndpZHRoID0gVyArICdweCc7XG4gICAgdi5zdHlsZS53aWR0aCA9IFcgKyAncHgnO1xuICAgIGlmIChXID49IDAgJiYgUyA+PSAwKSB7XG4gICAgICBpZiAoUyA8PSBXICsgMikge1xuICAgICAgICBZLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBZLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfVxuICAgICAgaWYgKEkgIT0gKFMgLyBXKSkge1xuICAgICAgICBJID0gUyAvIFc7XG4gICAgICAgIG8oSSk7XG4gICAgICAgIFoocS5tZW1PZmZzZXRYKTtcbiAgICAgIH1cbiAgICAgIHZhciBhZiA9IDA7XG4gICAgICBpZiAoTSkge1xuICAgICAgICBpZiAoTS5vZmZzZXRMZWZ0ICsgTS5zY3JvbGxXaWR0aCA+PSBTKSB7XG4gICAgICAgICAgYWYgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNLm9mZnNldExlZnQgKyBNLnNjcm9sbFdpZHRoIDw9IFQpIHtcbiAgICAgICAgICAgIGFmID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWYgPSBNLm9mZnNldExlZnQgLyBTO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhhZik7XG4gICAgICAgIFooYWYpO1xuICAgICAgfVxuICAgICAgaWYgKGkpIHtcbiAgICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICAgIFooaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIDtcbiAgRCA9IHNldEludGVydmFsKHRoaXMucmVuZGVyLCA1MCk7XG4gIC8vIFkuaW5uZXJIVE1MID0gJyc7XG5cbiAgZy5vbkRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICA7XG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgZy5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1zbGlkZXItaG92ZXInKTtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gIH0pO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtc2xpZGVyLXRvdWNoJyk7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICB9KTtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLWhvdmVyJyk7XG4gIH0pO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci10b3VjaCcpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgfSk7XG4gIFkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLXRvdWNoJyk7XG4gIH0pO1xuICB2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcyk7XG4gIGlmIChVICYmICF0aGlzLm9ud2hlZWwpIHtcbiAgICBpZiAoIWouY2xhc3NMaXN0LmNvbnRhaW5zKCdvcHVpLXNjcm9sbC1vbndoZWVsJykpIHtcbiAgICAgIGouYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwKTtcbiAgICAgIGouYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHApO1xuICAgICAgai5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1vbndoZWVsJyk7XG4gICAgfVxuICB9XG4gIGlmIChqKSB7XG4gICAgai5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghZCkge1xuICAgICAgICBaKGouc2Nyb2xsTGVmdCAvIChqLnNjcm9sbFdpZHRoIC0gai5vZmZzZXRXaWR0aCksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihhZikge1xuICAgIHQgPSBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0O1xuICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgO1xuICAgIGIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwobiwgNDApO1xuICAgIE4uc3R5bGVbJy1tb3otdXNlci1zZWxlY3QnXSA9ICdub25lJztcbiAgICBOLnN0eWxlWyctd2Via2l0LXVzZXItc2VsZWN0J10gPSAnbm9uZSc7XG5cbiAgICBMID0gYWYuY2xpZW50WCAtIGcub2Zmc2V0TGVmdDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYWEpO1xuICAgIGQgPSAxO1xuICAgIGFmLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgZnVuY3Rpb24gSyhhZywgYWgsIGFmKSB7XG4gICAgaWYgKGFmKSB7XG4gICAgICBhZyA9IGFnID4gYWYgPyBhZiA6IGFnO1xuICAgIH1cbiAgICByZXR1cm4gYWcgPj0gYWggPyBhZyA6IGFoO1xuICB9XG4gIGZ1bmN0aW9uIG4oKSB7XG4gICAgVi5jYWxsKHdpbmRvdywge1xuICAgICAgdmFsdWU6IEMsXG4gICAgICBzY2FsZTogSVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIE8oKSB7XG4gICAgaWYgKGFiKSB7XG4gICAgICBjbGVhckludGVydmFsKGFiKTtcbiAgICB9XG4gICAgRSgpO1xuICAgIGFiID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoWCkge1xuICAgICAgICBFKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKGFiKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG4gIGZ1bmN0aW9uIGFjKCkge1xuICAgIGlmIChQKSB7XG4gICAgICBjbGVhckludGVydmFsKFApO1xuICAgIH1cbiAgICBCKCk7XG4gICAgUCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgQigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChQKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG4gIGZ1bmN0aW9uIEUoKSB7XG4gICAgdmFyIGFmID0gQyAtIEo7XG4gICAgYWYgPSAoYWYgPCAwKSA/IDAgOiBhZjtcbiAgICBaKGFmKTtcbiAgfVxuICBmdW5jdGlvbiBCKCkge1xuICAgIHZhciBhZiA9IEMgKyBKO1xuICAgIGFmID0gKGFmID4gMSkgPyAxIDogYWY7XG4gICAgWihhZik7XG4gIH1cbiAgZnVuY3Rpb24gZihhZikge1xuICAgIGFmID0gd2luZG93LmV2ZW50IHx8IGFmO1xuICAgIHZhciBhZyA9IEsoYWYuY2xpZW50WCAtIEwsIFIsIG0pO1xuICAgIEMgPSAoYWcgLSBSKSAvIChtIC0gUik7XG4gICAgZy5zdHlsZS5sZWZ0ID0gYWcgKyAncHgnO1xuICAgIHEubWVtT2Zmc2V0WCA9IGFnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBhYSgpIHtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLWhvdmVyJyk7XG4gICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1zbGlkZXItdG91Y2gnKTtcbiAgICBOLnN0eWxlWyctbW96LXVzZXItc2VsZWN0J10gPSAnJztcbiAgICBOLnN0eWxlWyctd2Via2l0LXVzZXItc2VsZWN0J10gPSAnJztcbiAgICBpZiAoYikge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoYik7XG4gICAgfVxuICAgIGlmICh0KSB7XG4gICAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGYpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBhYSk7XG4gICAgZy5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1zbGlkZXInKTtcbiAgICBkID0gMDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gcyhhZikge1xuICAgIFooKGFmLm9mZnNldFggfHwgYWYubGF5ZXJYKSAvIFcpO1xuICB9XG4gIGZ1bmN0aW9uIFooYWgsIGFmKSB7XG4gICAgYWggPSBhaCA8IDAgPyAwIDogYWg7XG4gICAgYWggPSBhaCA+IDEgPyAxIDogYWg7XG4gICAgQyA9IGFoO1xuICAgIHZhciBhZyA9IChtIC0gUikgKiBDICsgUjtcbiAgICBnLnN0eWxlLmxlZnQgPSBhZyArICdweCc7XG4gICAgcS5tZW1PZmZzZXRYID0gYWc7XG4gICAgaWYgKCFhZikge1xuICAgICAgbigpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwKGFmKSB7XG4gICAgLy8gYWYucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBhZiA9IGFmLm9yaWdpbmFsRXZlbnQ7XG4gICAgLy8gaWYgKGFmKSB7XG4gICAgLy8gICB0aGlzLm9ud2hlZWwgPSAxO1xuICAgIC8vICAgdmFyIGFpID0gKC1hZi53aGVlbERlbHRhIHx8IChhZi5kZXRhaWwgJiYgYWYuZGV0YWlsICogNDApIHx8IDApIC8gSDtcbiAgICAvLyAgIHZhciBhaCA9IGFpO1xuICAgIC8vICAgdmFyIGFnID0gYWggPiAwID8gai5zY3JvbGxMZWZ0ICsgMiA6IGouc2Nyb2xsTGVmdCAtIDI7XG4gICAgLy8gICBOLnN0eWxlLnpvb20gPSAnMSc7XG4gICAgLy8gICBpZiAoYWcgPiAwICYmIChhZyA8IChOLm9mZnNldFdpZHRoIC0gai5vZmZzZXRXaWR0aCArIDUpIHx8IChOLm9mZnNldFdpZHRoIC0gai5zY3JvbGxXaWR0aCA8IDAgJiYgYWggPCAwKSkpIHtcbiAgICAvLyAgICAgai5zY3JvbGxMZWZ0ICs9IGFoO1xuICAgIC8vICAgICBDID0gai5zY3JvbGxMZWZ0IC8gKGouc2Nyb2xsV2lkdGggLSBqLm9mZnNldFdpZHRoKTtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIGlmICghbCB8fCBZLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnKSB7XG4gICAgLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgKz0gYWg7XG4gICAgLy8gICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICs9IGFoO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG4gIGZ1bmN0aW9uIG8oYWYpIHtcbiAgICBJID0gKGFmID4gMTApID8gMTAgOiBhZjtcbiAgICBpZiAoSSA8PSAxKSB7XG4gICAgICBnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdmFyIGFnID0gVyAtIDIgKiBRO1xuICAgIGsgPSBwYXJzZUludChhZyAvIEkpO1xuICAgIGsgPSAoayA8IDE1KSA/IDE1IDogaztcbiAgICBtID0gVyAtIFEgLSBrO1xuICAgIGcuc3R5bGUud2lkdGggPSBrICsgJ3B4JztcbiAgfVxuICBpZiAoSSA+IDEpIHtcbiAgICBvKEkpO1xuICB9XG4gIGxldCBkZWJvdW5jZWRXaW5kb3dSZXNpemUgPSBkZWJvdW5jZShyZVJlbmRlciwgMjAwLCBmYWxzZSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRXaW5kb3dSZXNpemUpO1xuICBmdW5jdGlvbiByZVJlbmRlcigpIHtcbiAgICBxLnJlbmRlcigpO1xuICB9XG4gIHRoaXMuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0KSB7XG4gICAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGYpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBhYSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHkpO1xuICAgIGlmIChiKSB7XG4gICAgICBjbGVhckludGVydmFsKGIpO1xuICAgIH1cbiAgICBpZiAoYWIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoYWIpO1xuICAgIH1cbiAgICBpZiAoUCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChQKTtcbiAgICB9XG4gICAgaWYgKEQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoRCk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zY3JvbGwuanMiLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmNwKCkge1xyXG5cdGNvbnNvbGUubG9nKCdmY3AnKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2Zpc0NpUGx1Z2lucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=