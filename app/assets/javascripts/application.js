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
	
	function fcp() {}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjUwMWUxZTJmYTU2MDM3MWVkNzIiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvZ2xvYmFsL2NvbnN0YW50LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zbGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2pzb25UcmVlQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZmlzQ2lQbHVnaW5zLmpzIl0sIm5hbWVzIjpbInJvdXRlcyIsInBhdGhOYW1lIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImhhc093blByb3BlcnR5IiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJjYWxsIiwibGVuZ3RoIiwiaSIsImFwcGx5IiwiZGF0YUxpbmtzIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicHJvY2Vzc0RhdGFMaW5rIiwiZSIsInRhcmdldCIsInRhZ05hbWUiLCJkYXRhc2V0IiwibWV0aG9kIiwicHJldmVudERlZmF1bHQiLCJoYW5kbGVNZXRob2QiLCJsaW5rIiwib2JqIiwiaHJlZiIsImdldEF0dHJpYnV0ZSIsImNzcmZUb2tlbiIsImNzcmZQYXJhbSIsInBhcmFtc09iaiIsImZvcm1FbGUiLCJjcmVhdGVGb3JtIiwiYXBwZW5kRm9ybVRvRG9tIiwic3VibWl0Rm9ybSIsInBhcmFtcyIsImYiLCJjcmVhdGVFbGVtZW50Iiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0QXR0cmlidXRlIiwicyIsInVuZGVmaW5lZCIsImlzQ3Jvc3NEb21haW4iLCJhcHBlbmRDaGlsZCIsImZvcm0iLCJib2R5Iiwic3VibWl0Iiwicm9yUGFyYW1zIiwicXVlcnlTZWxlY3RvciIsIm9yaWdpbkFuY2hvciIsInVybEFuY2hvciIsInVybCIsInByb3RvY29sIiwiaG9zdCIsImhvbWUiLCJ0d2VldEJveCIsInNldEZvY3VzIiwiZWwiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsIiwiZ2V0U2VsZWN0aW9uIiwic2V0U3RhcnQiLCJjb2xsYXBzZSIsInJlbW92ZUFsbFJhbmdlcyIsImFkZFJhbmdlIiwiZG9jIiwidGIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwidGJkIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0YmRTdHJpbmciLCJldiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImlubmVyVGV4dCIsInRyaW0iLCJhZGQiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCIsInNldFRpbWVvdXQiLCJpbml0WGhyIiwicGF5bG9hZCIsImFwaXNBcnIiLCJjYWxsYmFjayIsImdldEFwaVN1Y2Nlc3MiLCJkYXRhIiwiYWRkQXBpVHJlZSIsIkpTT04iLCJwYXJzZSIsImdldEFsbEFwaXNTdWNjZXNzIiwiZGF0YUJhayIsIkpTT05CYWsiLCJuZXdBcGlCdG4iLCJyZW5kZXJBbGxBcGlzIiwiYmluZGV2ZW50cyIsImxpc3RlbkFwaVF1ZXJ5IiwicGF0Y2hTdWNjZXNzIiwicG9zdFN1Y2Nlc3MiLCJkZWxldGVTdWNjZXNzIiwiZGVzdG9yeUFwaUxpIiwiY2xvc2VzdCIsInJlbW92ZUNoaWxkIiwiYmluZCIsImFwaVF1ZXJ5U3VjY2VzcyIsInNlYXJjaExpc3QiLCJkYXRhT2JqIiwiY29udGVudFN0ciIsIkxlbiIsInVyaSIsInNlY3Rpb24iLCJkZXNjcmlwdGlvbiIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJnZXRBbGxBcGlzIiwiZGVib3VuY2VkQXBpUXVlcnlJbnB1dCIsImFwaVF1ZXJ5IiwiYXBpUXVlcnlJbnB1dCIsImluV3JhcHBlciIsInBhcmVudEVsZW1lbnQiLCJjaGVja0lmRm9jdXMiLCJjbGVhclNlYXJjaFJlc3VsdCIsImFjdGl2ZUVsZW1lbnQiLCJ2YWx1ZSIsInEiLCJvcmlnaW4iLCJnZXQiLCJ0aGVuIiwiY2F0Y2giLCJhcGlTZWFyY2hSZXN1bHRFbGUiLCJ0b2dnbGVGb2xkTGkiLCJjb250ZXh0IiwidG9nZ2xlIiwiY29udGFpbnMiLCJiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJwYXJlbnROb2RlIiwiYXBpSWQiLCJhcGlMaXMiLCJzbGljZSIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJjb250YWluZXJOb2RlIiwiaXNOZXdBcGkiLCJuZXdBcGkiLCJwdXNoIiwiZGVib3VuY2VkTmV3QXBpQnRuIiwicHJvY2Vzc05ld0FwaUNsaWNrIiwiZGVib3VuY2VkRW52QnRuIiwicHJvY2Vzc09wZW5FbnZTZXR0aW5ncyIsImNvbnRlbnQiLCJzbGlkZUNvbnRlbnQiLCJ0cGxTdHIiLCJhcGlVbCIsImNyZWF0ZUFwaVVsIiwiYmFzZUFwaUxpIiwibmV3QXBpTGlUcGwiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiY2hpbGRyZW4iLCJhcGlMaXN0RWxlIiwiYXBpVWxFbGUiLCJuZXdBcGlEaXYiLCJoZWFkZXIiLCJuZXdBcGlTdHIiLCJ0cGwiLCJpZCIsIndpa2lMaW5rIiwidG1wbCIsIm1hcCIsIml0ZW0iLCIkaHR0cCIsImNvcmUiLCJhamF4IiwiYXJncyIsInByZWZpeCIsInByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNsaWVudCIsIlhNTEh0dHBSZXF1ZXN0Iiwic3RyaW5naWZ5IiwiZXh0ZW5kR2VuZXJhbFBhcmFtcyIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIm9ubG9hZCIsInN0YXR1cyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0Iiwib25lcnJvciIsImVyciIsImdlbmVyYWxPYmoiLCJ1dGY4IiwiZm9ybWF0Iiwic2VyaWFsaXplIiwic3RyIiwicCIsImsiLCJ2IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsImlzRW1wdHkiLCJjbG9uZU9iaiIsIm1lcmdlT2JqIiwiYWRkUHJlZml4VG9PYmoiLCJ3cmFwT2JqIiwic3RyVG9Eb20iLCJpbnNlcnRBZnRlciIsImRlYm91bmNlIiwiaXNTdHJpY3RNb2RlIiwiZ2VuZXJhdGVVVUlEIiwia2V5cyIsIm9iajEiLCJvYmoyIiwibmV3T2JqIiwia2V5Iiwid3JhcHBlciIsInRtcEVsZSIsInJldHVybkRvbSIsIm5ld05vZGUiLCJyZWZlcmVuY2VOb2RlIiwibmV4dFNpYmxpbmciLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJhcmd1bWVudHMiLCJsYXRlciIsImNhbGxOb3ciLCJjbGVhclRpbWVvdXQiLCJpc1N0cmljdCIsInJlcGxhY2UiLCJjIiwiciIsIk1hdGgiLCJyYW5kb20iLCJyb290QVBJIiwiaHRtbCIsImxpdGVyYWxTZWN0aW9ucyIsInJhdyIsInJlc3VsdCIsInN1YnN0cyIsInN1YnN0IiwibGl0IiwiQXJyYXkiLCJpc0FycmF5IiwiZW5kc1dpdGgiLCJodG1sRXNjYXBlIiwicG9wdXAiLCJwb3B1cEVsZSIsImdlbmVyYXRlUG9wdXBUcGwiLCJwb3NpdGlvblBvcHVwRWxlIiwiYmluZFBvcHVwRXZlbnRzIiwiZWxlIiwiY2xvc2VQb3B1cCIsImNvbmZpcm0iLCJjb29yZGluYXRlcyIsInRyYW5zZm9ybSIsImNsaWVudFgiLCJjbGllbnRZIiwiY3VycmVudFRhcmdldCIsInBvcExheWVyIiwiZGlzYWJsZVNjcm9sbCIsImVuYWJsZVNjcm9sbCIsImV2ZW50IiwicmV0dXJuVmFsdWUiLCJwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMiLCJrZXlDb2RlIiwib253aGVlbCIsIm9ubW91c2V3aGVlbCIsIm9udG91Y2htb3ZlIiwib25rZXlkb3duIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNsaWRlIiwic2xpZGVFbGUiLCJnZW5lcmF0ZVNsaWRlVHBsIiwicG9zaXRpb25TbGlkZUVsZSIsImJpbmRTbGlkZUV2ZW50cyIsImNsb3NlU2xpZGUiLCJjbGlja1NoYWRvdyIsImZsYXNoIiwicGFyc2VBbmRGbGFzaCIsImZsYXNoRWxlIiwiZmxhc2hUcGwiLCJkZXN0b3J5IiwibWVzc2FnZSIsImpzb25EYXRhIiwiQXBpRG9tIiwicGVyQXBpVHBsIiwiYXBpVVVJRCIsInBhdGNoT3JQb3N0Iiwic2F2ZU9yQ3JlYXRlIiwibGVhZlRwbCIsImxlYWZDb250ZW50VHBsIiwiaW5pdFJlY3RPYmoiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsImxlYWZEYXRhUGxhY2VIb2xkZXIiLCJkYXRhTmFtZSIsImRhdGFUeXBlIiwiZGF0YVZhbHVlIiwiZGF0YVF1YW50aXR5IiwiaGFzQ2hpbGQiLCJwZXJMZWFmV2lkdGgiLCJwZXJMZWFmSGVpZ2h0IiwibGVhdmVzVmVydGljYWxHYXAiLCJwZXJTVkdQYXRoV2lkdGgiLCJyb290Tm9kZVdpZHRoIiwiYXBpUmF3RGF0YSIsImFwaURhdGFPYmoiLCJhcGlDb250YWluZXIiLCJhcGlSZXNwb25kU3VjY2VzcyIsImpzb25PYmoiLCJwcmV2aWV3RGF0YSIsInByZXZpZXdEYXRhT2JqIiwic3dpdGNoUHJldmlldyIsImV2ZW50Q29udGV4dCIsImNyZWF0ZVBlckFwaSIsInBlckFwaUVsZSIsImNyZWF0ZU5ld0FwaUluaXREYXRhIiwiaW5pdERhdGEiLCJub2RlSWQiLCJwYXJlbnRJZCIsImZpcnN0Q2hpbGREYXRhIiwibW9kZSIsImRlYnVnQWRkciIsIm5vZGVzIiwiYXBpQmluZERhdGEiLCJhcGlFbGUiLCJsZWFmSW5kZXgiLCIkYXBpVHJlZSIsIiRhcGlUcmVlRnJhbWUiLCIkYXBpVHJlZUNvbnRlbnQiLCJyZW5kZXJFeGlzdFRyZWUiLCJhcGlSZXR1cm5EYXRhIiwiYmluZEV2ZW50Iiwic2V0TW9kZVZhbCIsInNldERlYnVnQWRkciIsInNjcm9sbEJhciIsIm92ZXJmbG93RWxlIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJwZXJUV0RCQXJyIiwibm9kZXNBcnIiLCJub2RlRGF0YSIsImxlYWYiLCJsZWFmRGF0YSIsInBlclRXREIiLCJsZW4iLCJnZW5lcmF0ZUxlYWYiLCJhcGlUcmVlIiwiY2FsY0RpbWVuc2lvbnMiLCJkcmF3U1ZHIiwibmV3TGVhZlNwYW4iLCJyb3VuZCIsImNvbHVtbiIsInRvdGFsb2Zmc2V0eWxldmVsIiwidmFsIiwicmFkaW9zIiwiX3RoaXMiLCJldlRhcmdldENsYXNzTGlzdCIsIl9ldiIsImRvbUNvbnRhaW5lciIsInBhdGNoIiwicG9zdCIsImFkZENoaWxkIiwiZGVsZXRlQXBpIiwiZGVsTm9kZSIsImRhd25fdXJpIiwiZm4iLCJwcmV2aWV3Q29udGV4dCIsInByZXZpZXdUeXBlIiwicHJldmlld1N0ciIsImpzb25WaWV3Iiwic3dpdGNoUHJldmlld1N0YXR1cyIsImFwcGx5VHlwZSIsInByZXZpZXdUeXBlcyIsImFwaVJlc3BvbmRQcmV2aWV3RWxlIiwiYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0FyciIsImNsYXNzTmFtZSIsInNwbGl0IiwiYXJyYXkiLCJpZHgiLCJpbmRleE9mIiwic3BsaWNlIiwicHJldmlld1R5cGVFbGVzQXJyIiwiYXBpU2F2ZSIsImFkZExlYWZDaGlsZCIsInJlbW92ZUxlYWZDaGlsZCIsImFwaVRlc3QiLCIkcHJlIiwiJGRhdGFWaWV3RWxlIiwiZGVsZXRlIiwic3RvcmVBcGlSZXR1cm5EYXRhIiwiJGRhdGFCZWF1dGlmeSIsImNsaWNrIiwiaW5pdEFwaVRyZWUiLCJ0cmF2ZXJzZUJGIiwidHJlZURvY0ZyYWciLCJub2RlIiwibGVhZkVsZSIsImxlYWZCaW5kRGF0YSIsInBhcmVudCIsImN0eCIsImN1cnJlbnRMZWFmIiwiY3VycmVudElkeCIsInBhcmVudElkeCIsInRyYXZlcnNlRGVzY2VuZGFudHMiLCJpZHhBcnIiLCJub2Rlc0FyclRvSWR4QXJyIiwicmVtb3ZlTm9kZXNGcm9tRG9tIiwiYXBwbHlTdHlsZSIsInN0eWxlTm9kZXMiLCJzZXRQYXJlbnROb2RlVmFsIiwicmVuZGVyIiwiYXJyIiwiYWxsTGVhdmVzIiwiYWxsTGVhdmVzTGVuIiwibm9kZXNBcnJMZW4iLCJsZWF2ZXMiLCJxdWV1ZSIsInRyYXZlcnNlRGlyZWN0Q2hpbGQiLCJxdWV1ZUxlbiIsIl9uZXdlc3RJbmRleCIsIl9vbGRlc3RJbmRleCIsIngiLCJtYXhJZCIsInBhcmVudElkZXgiLCJsZWFmQ2hpbGQiLCJjcmVhdGVMZWFmIiwiY2hpbGRNb2RlbCIsImdlbmVyYXRlTGVhZlNwYW4iLCJub2RlSW5kZXgiLCJub2RlSWR4IiwibGVhdmVzSGFzaCIsImxlYXZlc0xlbiIsImRpbWVuc2lvbkFyciIsImNsb25lUmVjdE9iaiIsImNsZWFyU1ZHIiwic3ZnIiwibGFzdENoaWxkIiwidGhhdCIsInN2Z1BhcnRpYWxzIiwiY3JlYXRlU2luZ2xlU1ZHIiwidHJhdmVyc2VERiIsImhvcmkiLCJwYXJlbnRWZXJ0IiwiZHZlcnQiLCJzdmducyIsIm5ld1BhdGgiLCJjcmVhdGVFbGVtZW50TlMiLCJjb250cm9sUmF0ZSIsIm14IiwibXkiLCJxeCIsInF5IiwicXh4IiwicXl5IiwidHgiLCJ0eSIsInNldEF0dHJpYnV0ZU5TIiwiaG9yaU1heCIsInZlcnRpY2FsTWF4IiwiaG9yaUFyciIsInZlcnRBcnIiLCJkZXB0aCIsIm1heCIsIl9yb290IiwiY2hpbGRyZW5sZXZlbCIsIm5vZGVMZWZ0T2Zmc2V0IiwiZWxSZWN0T2JqZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keVJlY3RPYmoiLCJjbG9uZUJvZHlSZWN0T2JqIiwiY2xvbmVFbFJlY3RPYmplY3QiLCJhYnMiLCJUcmVlIiwiTm9kZSIsInJlY3Vyc2UiLCJjdXJyZW50Tm9kZSIsImNhbGNDaGlsZHJlbkxldmVscyIsInRvdGFsQ2hpbGRyZW5MZXZlbHMiLCJjYWxjQ2hpbGRyZW5MZXZlbCIsImNhbGNPZmZZIiwiZmluZEluZGV4IiwidG90YWxZIiwiY2FsY1RvdGFsT2Zmc2V0WUxldmVsIiwibGV2ZWxnYXAiLCJlbnF1ZXVlIiwiY3VycmVudFRyZWUiLCJkZXF1ZXVlIiwidHJhdmVyc2FsIiwidG9EYXRhIiwiY2hpbGQiLCJFcnJvciIsImNoZWNrRGF0YUhhc0NoaWxkIiwiZnJvbURhdGEiLCJ0cmVlIiwiY2hpbGRUb1JlbW92ZSIsIm5vZGVkYXRhIiwic3R5bGVPYmoiLCJkZXNjZW5kYW50c0FyciIsIm1heE5vZGVJZCIsImRlcHRoQXJyIiwiZGltZW5zaW9ucyIsIlF1ZXVlIiwiX3N0b3JhZ2UiLCJzaXplIiwib2xkZXN0SW5kZXgiLCJuZXdlc3RJbmRleCIsImRlbGV0ZWREYXRhIiwiY29sbGVjdEFwaURhdGEiLCJvcEVsZSIsImNvbGxlY3RJbmZvIiwiY29sbGVjdERhdGFGcm9tVHJlZSIsImluZm9FbGUiLCJNb2Rlc1Jvd0VsZSIsImluZm9EYXRhIiwiZ2V0TW9kZVZhbCIsImdldERlYnVnQWRkciIsIm1vZGVWYWwiLCJjaGVja2VkIiwiY29sbGVjdFRyZWUiLCJ0cmVlRWxlIiwidHJlZURhdGFBcnIiLCJ0cmVlRGF0YU9iaiIsInF1YW50aXR5IiwiZGltZW5zaW9uc0FyciIsImhVbml0IiwidlVuaXQiLCJnZXRNYXhPZkFycmF5IiwiaGFzQ2xhc3MiLCJicm93c2VyUHJlZml4IiwiZ2V0VHJhbnNmb3JtIiwiZ2V0VHJhbnNsYXRlWCIsImdldFRyYW5zbGF0ZVkiLCJiZWF1dGlmeUpTT04iLCJoaWdodGxpZ2h0SlNPTiIsIm51bUFycmF5IiwiZWxlbSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJvcGVuRGF0YWJhc2UiLCJvcGVyYSIsImFsbCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwicmVzdWx0cyIsIm1hdGNoIiwid2Via2l0VHJhbnNmb3JtIiwibW96VHJhbnNmb3JtIiwibWF0IiwicGFyc2VGbG9hdCIsImpzT2JqIiwianNvbiIsImNscyIsInRlc3QiLCJqc29uVG9UcmVlIiwidHJlZVRvSnNvbiIsImhhc2hUYWJsZSIsIm5vZGVzTGVuIiwibW9kS2V5c0FyciIsInJlbW92ZUVsZUZyb21BcnIiLCJOdW1iZXIiLCJzb3J0Iiwic29ydE51bWJlciIsInJvb3ROb2RlRGF0YSIsImoiLCJrZXlzTGVuIiwia2V5QXJyTGVuIiwiYSIsImIiLCJ0d29XYXlEYXRhQmluZGluZyIsImRvbUNvbnRleHQiLCJtb2RlbCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsInNldCIsInNlbGVjdG9yVG9BcnJheSIsImNvbmNhdCIsImhhc0F0dHJpYnV0ZSIsImhhc0FjdGl2ZUVsZSIsImVsQW5kRGVzY2VuZGFudHMiLCJoYW5kbGVyIiwic2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWF0Y2hlcyIsInJlc3VsdEFyciIsImxvb3AiLCJjaGlsZHJlbkVsZXMiLCJjaGlsZEVsZW1lbnRDb3VudCIsImJvbCIsImNhbGxiYWNrcyIsInNjcm9sbEJhckgiLCJnZW5lcmF0ZVNjcm9sbFN0ciIsInNjcm9sbFN0ciIsIm9wdGlvbnMiLCJuZXdTY3JvbGxTdHIiLCJuZXdTY3JvbGxFbGUiLCJZIiwic2Nyb2xsYmFyIiwiTiIsImluaXRQb3MiLCJNIiwiaW5pdERvbSIsIlUiLCJtb3VzZXdoZWVsIiwibCIsIm1vdXNld2hlZWxsb2NrIiwiSCIsIndoZWVsZGVsdGEiLCJ6IiwiY3RybGJsb2NrIiwiSiIsInN0ZXAiLCJJIiwic2NhbGUiLCJHIiwidGhlbWUiLCJhZCIsInJlZnJlc2giLCJTIiwiVCIsImgiLCJWIiwiYWciLCJhZiIsInBhcnNlSW50Iiwic2Nyb2xsTGVmdCIsImciLCJ1IiwiRiIsImFlIiwiVyIsIlEiLCJSIiwibSIsIkMiLCJMIiwiZCIsInQiLCJhYiIsIlAiLCJEIiwieSIsIlgiLCJjbGVhckludGVydmFsIiwib2Zmc2V0V2lkdGgiLCJhaCIsIm8iLCJaIiwibWVtT2Zmc2V0WCIsIm9mZnNldExlZnQiLCJzY3JvbGxXaWR0aCIsInNldEludGVydmFsIiwib25EcmFnc3RhcnQiLCJvbnNlbGVjdHN0YXJ0IiwibiIsImFhIiwiSyIsIk8iLCJFIiwiYWMiLCJCIiwib2Zmc2V0WCIsImxheWVyWCIsImRlYm91bmNlZFdpbmRvd1Jlc2l6ZSIsInJlUmVuZGVyIiwiZGlzcG9zZSIsImZjcCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFFQTs7QUFFQTs7QUFEQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDLFlBQU07QUFDTCxPQUFJQSxTQUFTO0FBQ1gsd0JBRFc7QUFFWCxhQUFRLHVCQUZHO0FBR1g7QUFIVyxJQUFiO0FBS0EsT0FBSUMsV0FBV0MsT0FBT0MsUUFBUCxDQUFnQkMsUUFBL0I7QUFDQSxPQUFJSixPQUFPSyxjQUFQLENBQXNCSixRQUF0QixDQUFKLEVBQXFDO0FBQ25DLFNBQUlLLE9BQU9DLFNBQVAsQ0FBaUJDLFFBQWpCLENBQTBCQyxJQUExQixDQUErQlQsT0FBT0MsUUFBUCxDQUEvQixNQUFxRCxnQkFBckQsSUFDRkQs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QUFDeEIsU0FBSTVCLENBQUosRUFBTztBQUNMOW5CLGdCQUFTOG9CLGFBQVQsR0FBeUJoQixDQUF6QjtBQUNELE1BRkQsTUFFTztBQUNMOW5CLGdCQUFTOG9CLGFBQVQsR0FBeUIsWUFBVztBQUNsQyxnQkFBTyxJQUFQO0FBQ0QsUUFGRDtBQUdEO0FBQ0Q5b0IsY0FBU3dRLG1CQUFULENBQTZCLFdBQTdCLEVBQTBDbFAsQ0FBMUM7QUFDQXRCLGNBQVN3USxtQkFBVCxDQUE2QixTQUE3QixFQUF3Q3dZLEVBQXhDO0FBQ0FocEIsY0FBU3dRLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDMFgsQ0FBeEM7QUFDQSxTQUFJekUsQ0FBSixFQUFPO0FBQ0wyRSxxQkFBYzNFLENBQWQ7QUFDRDtBQUNELFNBQUlzRSxFQUFKLEVBQVE7QUFDTksscUJBQWNMLEVBQWQ7QUFDRDtBQUNELFNBQUlDLENBQUosRUFBTztBQUNMSSxxQkFBY0osQ0FBZDtBQUNEO0FBQ0QsU0FBSUMsQ0FBSixFQUFPO0FBQ0xHLHFCQUFjSCxDQUFkO0FBQ0Q7QUFDRixJQXZCRDtBQXdCRCxFOzs7Ozs7Ozs7Ozs7OztTQ3pVZTBCLEcsR0FBQUEsRzs7QUFGaEI7O0FBRU8sVUFBU0EsR0FBVCxHQUFlLENBQ3JCLEMiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNTAxZTFlMmZhNTYwMzcxZWQ3MiIsImltcG9ydCB7ZGF0YUxpbmtzfSBmcm9tICcuL21vZHVsZXMvZGF0YUxpbmtzJztcbmltcG9ydCB7aG9tZX0gZnJvbSAnLi9tb2R1bGVzL2hvbWVwYWdlJztcblxuaW1wb3J0IHtpbml0WGhyfSBmcm9tICcuL21vZHVsZXMvYXBpT3BlcmF0aW9uJztcbmRhdGFMaW5rcygpO1xuaW1wb3J0IHtmY3B9IGZyb20gJy4vbW9kdWxlcy9maXNDaVBsdWdpbnMnO1xuLy8gYXBpVHJlZSgpO1xuLy8gdmFyIHAgPSBuZXcgZGF3blNWRygpO1xuLy8gcC5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWludGVyLXRhcmdldCcpKTtcbi8vIHAuc3RhcnQoKTtcblxuKCgpID0+IHtcbiAgbGV0IHJvdXRlcyA9IHtcbiAgICAnLyc6IGhvbWUsXG4gICAgJy9kZXYnOiBbaW5pdFhocl0sXG4gICAgJy9maXNfY2lfcGx1Z2lucy9uZXcnOiBmY3BcbiAgfTtcbiAgbGV0IHBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHBhdGhOYW1lKSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocm91dGVzW3BhdGhOYW1lXSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiZcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm91dGVzW3BhdGhOYW1lXVtpXS5hcHBseShudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVzW3BhdGhOYW1lXS5hcHBseShudWxsKTtcbiAgICB9XG4gIH1cblxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBwbGljYXRpb24uanMiLCJpbXBvcnQge2hhbmRsZU1ldGhvZH0gZnJvbSAnLi4vY29tbW9uL2hhbmRsZU1ldGhvZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhTGlua3MoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc0RhdGFMaW5rLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRGF0YUxpbmsoZSkge1xuICB2YXIgZSA9IHdpbmRvdy5lIHx8IGU7XG5cbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgIT09ICdBJylcbiAgICAgIHJldHVybjtcblxuICAvLyBEbyBzb21ldGhpbmdcbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAnZGVsZXRlJykge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBoYW5kbGVNZXRob2QoZS50YXJnZXQpO1xuICB9XG4gIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ1BBVENIJykge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBoYW5kbGVNZXRob2QoZS50YXJnZXQpO1xuICB9XG4gIC8vIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ3BhdGNoJykge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICBoYW5kbGVNZXRob2QoZS50YXJnZXQsIHtcbiAgLy8gICAgIG5zOiAnYXBpJyxcbiAgLy8gICAgIGRhdGE6IHtcbiAgLy8gICAgICAgc2VjdGlvbjogJ3dpc2UnLFxuICAvLyAgICAgICBpZDogJzInXG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZGF0YUxpbmtzLmpzIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb24vY3NyZic7XG4vKipcbiAqIFtoYW5kbGVNZXRob2QgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbGluayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSGFuZGxlcyBcImRhdGEtbWV0aG9kXCIgb24gbGlua3Mgc3VjaCBhczpcbiAqIDxhIGhyZWY9XCIvdXNlcnMvNVwiIGRhdGEtbWV0aG9kPVwiZGVsZXRlXCIgcmVsPVwibm9mb2xsb3dcIiBkYXRhLWNvbmZpcm09XCJBcmUgeW91IHN1cmU/XCI+RGVsZXRlPC9hPlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWV0aG9kKGxpbmssIG9iaiA9IHt9KSB7XG4gIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICBtZXRob2QgPSBsaW5rLmRhdGFzZXQubWV0aG9kLFxuICAgIHRhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCksXG4gICAgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICB2YXIgcGFyYW1zT2JqID0ge1xuICAgIGhyZWY6IGhyZWYsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY3NyZlRva2VuOiBjc3JmVG9rZW4sXG4gICAgY3NyZlBhcmFtOiBjc3JmUGFyYW1cbiAgfTtcbiAgdmFyIGZvcm1FbGUgPSBjcmVhdGVGb3JtKHBhcmFtc09iaiwgb2JqKTtcbiAgYXBwZW5kRm9ybVRvRG9tKGZvcm1FbGUpO1xuICBzdWJtaXRGb3JtKGZvcm1FbGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybShwYXJhbXMsIG9iaikge1xuICB2YXIgZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywncG9zdCcpO1xuICBmLnNldEF0dHJpYnV0ZSgnYWN0aW9uJyxwYXJhbXMuaHJlZik7XG4gIGlmIChwYXJhbXMudGFyZ2V0KSB7XG4gICAgZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIHBhcmFtcy50YXJnZXQpO1xuICB9O1xuXG4gIHZhciBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdfbWV0aG9kJyk7XG4gIGkuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLm1ldGhvZCk7XG5cbiAgdmFyIHM7XG4gIGlmIChwYXJhbXMuY3NyZlBhcmFtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5jc3JmVG9rZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgIVJQcy5pc0Nyb3NzRG9tYWluKHBhcmFtcy5ocmVmKSkge1xuICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwYXJhbXMuY3NyZlBhcmFtKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5jc3JmVG9rZW4pO1xuICB9XG4gIGYuYXBwZW5kQ2hpbGQoaSk7XG5cbiAgLy8gZm9yIChsZXQga2V5IGluIG9iai5kYXRhKSB7XG4gIC8vICAgaWYgKG9iai5kYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgLy8gICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgnbmFtZScsJycgKyBvYmoubnMgKyAnWycgKyBrZXkgKyAnXScpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxvYmouZGF0YVtrZXldKTtcbiAgLy8gICAgIGYuYXBwZW5kQ2hpbGQodCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgaWYgKHMpIHtcbiAgICBmLmFwcGVuZENoaWxkKHMpO1xuICB9O1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kRm9ybVRvRG9tKGZvcm0pIHtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdEZvcm0oZm9ybSkge1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9oYW5kbGVNZXRob2QuanMiLCJleHBvcnQgbGV0IHJvclBhcmFtcyA9IHtcbiAgLy8gVXAtdG8tZGF0ZSBDcm9zcy1TaXRlIFJlcXVlc3QgRm9yZ2VyeSB0b2tlblxuICBjc3JmVG9rZW46ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBVUkwgcGFyYW0gdGhhdCBtdXN0IGNvbnRhaW4gdGhlIENTUkYgdG9rZW5cbiAgY3NyZlBhcmFtOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi1wYXJhbV0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgcmVxdWVzdCBpcyBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LlxuICBpc0Nyb3NzRG9tYWluOiB1cmwgPT4ge1xuICAgIGxldCBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgb3JpZ2luQW5jaG9yLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuICAgIGxldCB1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICB0cnkge1xuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmw7XG4gICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCB0byBhIElFIGJ1Zy5cbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cbiAgICAgIC8vIElmIFVSTCBwcm90b2NvbCBpcyBmYWxzZSBvciBpcyBhIHN0cmluZyBjb250YWluaW5nIGEgc2luZ2xlIGNvbG9uXG4gICAgICAvLyAqYW5kKiBob3N0IGFyZSBmYWxzZSwgYXNzdW1lIGl0IGlzIG5vdCBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0XG4gICAgICAvLyAoc2hvdWxkIG9ubHkgYmUgdGhlIGNhc2UgZm9yIElFNyBhbmQgSUUgY29tcGF0aWJpbGl0eSBtb2RlKS5cbiAgICAgIC8vIE90aGVyd2lzZSwgZXZhbHVhdGUgcHJvdG9jb2wgYW5kIGhvc3Qgb2YgdGhlIFVSTCBhZ2FpbnN0IHRoZSBvcmlnaW5cbiAgICAgIC8vIHByb3RvY29sIGFuZCBob3N0LlxuICAgICAgcmV0dXJuICEoKCghdXJsQW5jaG9yLnByb3RvY29sIHx8IHVybEFuY2hvci5wcm90b2NvbCA9PT0gJzonKSAmJiAhdXJsQW5jaG9yLmhvc3QpIHx8XG4gICAgICAgIChvcmlnaW5BbmNob3IucHJvdG9jb2wgKyAnLy8nICsgb3JpZ2luQW5jaG9yLmhvc3QgPT09XG4gICAgICAgICAgdXJsQW5jaG9yLnByb3RvY29sICsgJy8vJyArIHVybEFuY2hvci5ob3N0KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJpbXBvcnQge3R3ZWV0Qm94fSBmcm9tICcuL3R3ZWV0Qm94JztcbmV4cG9ydCBmdW5jdGlvbiBob21lKCkge1xuXHR0d2VldEJveCgpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2hvbWVwYWdlLmpzIiwiZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoZWwsIDApO1xuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWV0Qm94KCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gIHZhciB0YiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0d2VldC1ib3gnKVswXTtcbiAgaWYgKCF0YikgcmV0dXJuIG51bGw7XG4gIHZhciB0YmQgPSB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XG4gIHZhciB0YmRTdHJpbmcgPSAnPGRpdj48YnI+PC9kaXY+JztcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnY29uZGVuc2VkJyk7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0uaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGgpIHtcblxuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5hZGQoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAodGJkLmlubmVySFRNTCA9PT0gJ1doYXRcXCdzIGhhcHBlbmluZz8nKSB7XG5cbiAgICAgIHRiZC5pbm5lckhUTUwgPSAnPGJyPic7XG4gICAgfVxuICB9KTtcbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5pbm5lckhUTUwpIHtcbiAgICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgICAgfSBlbHNlIHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG5cbiAgICAgIH0sIDApO1xuICAgIH07XG4gIH0pO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9O1xuICAgIGlmICh0Yi5pbm5lckhUTUwgPT09ICc8YnI+Jykge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy90d2VldEJveC5qcyIsImltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmltcG9ydCB7cm9vdEFQSX0gZnJvbSAnLi4vZ2xvYmFsL2NvbnN0YW50JztcbmltcG9ydCB7aHRtbH0gZnJvbSAnLi4vY29tbW9uL3RlbXBsYXRlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge3NsaWRlfSBmcm9tICcuLi9jb21tb24vc2xpZGUnO1xuaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmltcG9ydCB7Zmxhc2gsIHBhcnNlQW5kRmxhc2h9IGZyb20gJy4uL2NvbW1vbi9mbGFzaCc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZURvbSc7XG5pbXBvcnQge3R3b1dheURhdGFCaW5kaW5nfSBmcm9tICcuLi9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcnO1xuXG5sZXQgcGF5bG9hZCA9IHt9O1xubGV0IGFwaXNBcnIgPSBbXTtcblxudmFyIGNhbGxiYWNrID0ge1xuICBnZXRBcGlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgYWRkQXBpVHJlZShKU09OLnBhcnNlKGRhdGEpLCB0aGlzLCBmYWxzZSk7XG4gIH0sXG4gIGdldEFsbEFwaXNTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IGRhdGFCYWsgPSBkYXRhO1xuICAgIGxldCBKU09OQmFrID0gSlNPTi5wYXJzZShkYXRhQmFrKTtcbiAgICBpZiAoSlNPTkJhay5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ld0FwaUJ0bigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJBbGxBcGlzKGRhdGEpO1xuICAgIGJpbmRldmVudHMoKTtcbiAgICBsaXN0ZW5BcGlRdWVyeSgpO1xuICB9LFxuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBwb3N0U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIGRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBmdW5jdGlvbiBkZXN0b3J5QXBpTGkoKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQodGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhLCBkZXN0b3J5QXBpTGkuYmluZCh0aGlzKSk7XG4gIH0sXG4gIGFwaVF1ZXJ5U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBzZWFyY2hMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlYXJjaC1yZXN1bHQnKVswXTtcbiAgICBsZXQgZGF0YU9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgbGV0IGNvbnRlbnRTdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMCwgTGVuID0gZGF0YU9iai5sZW5ndGg7IGkgPCBMZW47IGkrKykge1xuICAgICAgY29udGVudFN0ciArPSBgPGRpdiBjbGFzcz0ncGVyLXNlYXJjaC1yZXN1bHQnPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1yZXN1bHQtY29sdW1uIHBlci1yZXN1bHQtdXJpXCI+JHtkYXRhT2JqW2ldLnVyaX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1zZWN0aW9uXCI+JHtkYXRhT2JqW2ldLnNlY3Rpb259PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1yZXN1bHQtY29sdW1uIHBlci1yZXN1bHQtbWV0aG9kXCI+JHtkYXRhT2JqW2ldLm1ldGhvZH08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1kZXNjcmlwdGlvblwiPiR7ZGF0YU9ialtpXS5kZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBzZWFyY2hMaXN0LmlubmVySFRNTCA9IGNvbnRlbnRTdHI7XG4gICAgZGF0YU9iai5sZW5ndGggPiAwID8gc2VhcmNoTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykgOiBzZWFyY2hMaXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgICAgXG4gIH0sXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuZGF0YSkge1xuICAgICAgbmV3QXBpQnRuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZ2V0QWxsQXBpcygpO1xufVxuXG5sZXQgZGVib3VuY2VkQXBpUXVlcnlJbnB1dCA9IGRlYm91bmNlKGFwaVF1ZXJ5LCAxMDAsIGZhbHNlKTtcbmZ1bmN0aW9uIGxpc3RlbkFwaVF1ZXJ5KCkge1xuICBsZXQgYXBpUXVlcnlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1xdWVyeScpWzBdO1xuICBsZXQgaW5XcmFwcGVyID0gZmFsc2U7XG4gIGFwaVF1ZXJ5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBkZWJvdW5jZWRBcGlRdWVyeUlucHV0KTtcbiAgYXBpUXVlcnlJbnB1dC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihldikge1xuICAgIGlmICghY2hlY2tJZkZvY3VzLmFwcGx5KGFwaVF1ZXJ5SW5wdXQsIGV2KSkge1xuICAgICAgY2xlYXJTZWFyY2hSZXN1bHQoKTtcbiAgICB9O1xuICAgIGluV3JhcHBlciA9IGZhbHNlO1xuICB9KTtcbiAgYXBpUXVlcnlJbnB1dC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldikge1xuICAgIGluV3JhcHBlciA9IHRydWU7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbihldikge1xuICAgIGlmICghaW5XcmFwcGVyKSBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICB9KTtcbiAgYXBpUXVlcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFwaVF1ZXJ5KTtcbn1cbmZ1bmN0aW9uIGNoZWNrSWZGb2N1cyhldikge1xuICByZXR1cm4gdGhpcyA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGFwaVF1ZXJ5KGV2KSB7XG4gIGlmIChldi50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDApIHtcbiAgICBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBwYXlsb2FkID0ge3E6IGV2LnRhcmdldC52YWx1ZX07XG4gICRodHRwKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2luc3RhbnRzZWFyY2gnKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmFwaVF1ZXJ5U3VjY2Vzcy5iaW5kKGV2KSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGNsZWFyU2VhcmNoUmVzdWx0KCkge1xuICBsZXQgYXBpU2VhcmNoUmVzdWx0RWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlYXJjaC1yZXN1bHQnKVswXTtcbiAgYXBpU2VhcmNoUmVzdWx0RWxlLmlubmVySFRNTCA9ICcnO1xuICBhcGlTZWFyY2hSZXN1bHRFbGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufVxuZnVuY3Rpb24gdG9nZ2xlRm9sZExpKGNvbnRleHQsIGV2KSB7XG4gIGlmICghZXYpIHtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1saS13aWtpJykpIHtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24oZXYpIHtcbiAgdG9nZ2xlRm9sZExpKHRoaXMsIGV2KTtcbiAgaWYgKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9O1xuICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5wYXJlbnROb2RlLmRhdGFzZXQuYXBpSWQpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QXBpU3VjY2Vzcy5iaW5kKHRoaXMucGFyZW50Tm9kZSkpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5mdW5jdGlvbiBiaW5kZXZlbnRzKCkge1xuICBsZXQgYXBpTGlzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWxpLXN1bW1hcnknKTtcbiAgW10uc2xpY2UuY2FsbChhcGlMaXMpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRBcGlUcmVlKGRhdGEgPSB7fSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgbGV0IG5ld0FwaSA9IG5ldyBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpO1xuICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcbn1cblxubGV0IGRlYm91bmNlZE5ld0FwaUJ0biA9IGRlYm91bmNlKHByb2Nlc3NOZXdBcGlDbGljaywgNTAwLCB0cnVlKTtcbmxldCBkZWJvdW5jZWRFbnZCdG4gPSBkZWJvdW5jZShwcm9jZXNzT3BlbkVudlNldHRpbmdzLCA1MDAsIHRydWUpO1xuZnVuY3Rpb24gcHJvY2Vzc09wZW5FbnZTZXR0aW5ncyhldiwgZWwpIHtcbiAgbGV0IHBhcmFtcyA9IHtcbiAgICBjb250ZW50OiBzbGlkZUNvbnRlbnQoKVxuICB9O1xuICBzbGlkZShldiwgcGFyYW1zKTtcbn1cbmZ1bmN0aW9uIHNsaWRlQ29udGVudCgpIHtcbiAgbGV0IHRwbFN0ciA9IGBcbiAgICA8dWw+XG4gICAgICA8bGk+XG4gICAgICAgIDxsYWJlbD5ob3N0OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxsYWJlbD5hY2NvdW50OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxsYWJlbD5sYWJlbDo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjLWlucHV0XCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJjaGVjayBhdmFpbGFiaWxpdHlcIiAvPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICBgO1xuICByZXR1cm4gdHBsU3RyO1xufVxuZnVuY3Rpb24gcHJvY2Vzc05ld0FwaUNsaWNrKCkge1xuICBsZXQgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgaWYgKCFhcGlVbCkge1xuICAgIGNyZWF0ZUFwaVVsKCk7XG4gICAgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgfVxuICBsZXQgYmFzZUFwaUxpID0gc3RyVG9Eb20obmV3QXBpTGlUcGwoKSk7XG4gIGFwaVVsLmluc2VydEJlZm9yZShiYXNlQXBpTGksIGFwaVVsLmZpcnN0Q2hpbGQpO1xuICBhZGRBcGlUcmVlKHt9LCBiYXNlQXBpTGksIHRydWUpO1xuICB0b2dnbGVGb2xkTGkoYmFzZUFwaUxpLmNoaWxkcmVuWzBdKTtcbiAgYmFzZUFwaUxpLmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXBpVWwoKSB7XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBhcGlVbEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGxldCBuZXdBcGlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktYWRkLXF1ZXJ5JylbMF07XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpVWxFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsJyk7XG4gIGFwaUxpc3RFbGUuYXBwZW5kQ2hpbGQoYXBpVWxFbGUpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlEaXYpO1xufVxuZnVuY3Rpb24gbmV3QXBpQnRuKCkge1xuICBsZXQgbmV3QXBpRGl2O1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWRlcicpWzBdO1xuICBsZXQgbmV3QXBpU3RyID0gYFxuICAgIDxkaXYgY2xhc3M9XCJhcGktYWRkLXF1ZXJ5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFkZC1hcGktYnRuXCI+bmV3IEFQSTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktc2VhcmNoLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXF1ZXJ5XCIgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwic2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcGktc2VhcmNoLXJlc3VsdCBoaWRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxhIGNsYXNzPVwiYy1oaWRlIGljb24tdGV4dC1saW5rIGMtZmxvYXQtcmlnaHQgZGV2LWVudi1zZXR0aW5nc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48c3BhbiBjbGFzcz1cImljb24tdGV4dC1pY29uXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi1zZXR0aW5ncyBpY29uLWZpdFwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXNldHRpbmdzXCI+PC91c2U+PC9zdmc+PC9zcGFuPjxzcGFuIGNsYXNzPVwiaWNvbi10ZXh0LXRleHRcIj7njq/looPlkIzmraXmlbDmja7phY3nva48L3NwYW4+PC9hPlxuICAgIDwvZGl2PlxuICBgO1xuICBuZXdBcGlEaXYgPSBzdHJUb0RvbShuZXdBcGlTdHIpO1xuICBuZXdBcGlEaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWFwaS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlZE5ld0FwaUJ0bik7XG4gIG5ld0FwaURpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkZXYtZW52LXNldHRpbmdzJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWJvdW5jZWRFbnZCdG4pO1xuICBpbnNlcnRBZnRlcihuZXdBcGlEaXYsIGhlYWRlcik7XG4gIHJldHVybiBuZXdBcGlEaXY7XG59XG5cbmZ1bmN0aW9uIG5ld0FwaUxpVHBsKGRhdGEgPSB7fSkge1xuICB2YXIgdHBsID0gYFxuICAgIDxsaSBjbGFzcz1cImFwaS1saVwiIGRhdGEtYXBpLWlkPVwiJHtkYXRhLmlkIHx8IG51bGx9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWxpLXN1bW1hcnlcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktY29sbGFwc2VcIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS11cmlcIiBiaW5kPVwidXJpXCI+JHtkYXRhLnVyaSB8fCAnKE5vIHVyaSknfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktZGVzXCIgYmluZD1cImRlc2NyaXB0aW9uXCI+JHtkYXRhLmRlc2NyaXB0aW9uID8gZGF0YS5kZXNjcmlwdGlvbiA6ICcoTm8gZGVzY3JpcHRpb24pJ308L3NwYW4+XG4gICAgICAgIDxhIGhyZWY9XCIke2RhdGEud2lraUxpbmt9XCIgY2xhc3M9XCJhcGktbGktd2lraVwiIGJpbmQtYXR0ci1ocmVmPVwid2lraUxpbmtcIiBiaW5kPVwid2lraUxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2RhdGEud2lraUxpbmsgPyBkYXRhLndpa2lMaW5rIDogJyhObyB3aWtpTGluayknfTwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIGA7XG4gIHJldHVybiB0cGw7XG59XG5mdW5jdGlvbiByZW5kZXJBbGxBcGlzKGRhdGEpIHtcbiAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGNvbnN0IHRtcGwgPSBkYXRhID0+IGh0bWxgXG4gICAgICA8dWwgY2xhc3M9XCJhcGktdWxcIj5cbiAgICAgICR7ZGF0YS5tYXAoaXRlbSA9PiBodG1sYFxuICAgICAgICAke25ld0FwaUxpVHBsKGl0ZW0pfVxuICAgICAgYCl9XG4gICAgICA8L3VsPlxuICBgO1xuICBsZXQgYXBpTGlzdEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhcGlMaXN0RWxlLmNsYXNzTGlzdC5hZGQoJ2FwaS11bC13cmFwcGVyJyk7XG4gIGFwaUxpc3RFbGUuaW5uZXJIVE1MID0gdG1wbChkYXRhKTtcbiAgaW5zZXJ0QWZ0ZXIoYXBpTGlzdEVsZSwgbmV3QXBpQnRuKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxBcGlzKCkge1xuICAkaHR0cChyb290QVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFsbEFwaXNTdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2FwaU9wZXJhdGlvbi5qcyIsIi8qKlxuLy8gQi0+IEhlcmUgeW91IGRlZmluZSBpdHMgZnVuY3Rpb25zIGFuZCBpdHMgcGF5bG9hZFxudmFyIG1kbkFQSSA9ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9zZWFyY2guanNvbic7XG52YXIgcGF5bG9hZCA9IHtcbiAgJ3RvcGljJyA6ICdqcycsXG4gICdxJyAgICAgOiAnUHJvbWlzZSdcbn07XG52YXIgY2FsbGJhY2sgPSB7XG4gIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMSwgJ3N1Y2Nlc3MnLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfSxcbiAgZXJyb3IgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG4vLyBFbmQgQlxuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgxKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MsIGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgyKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC50aGVuKHVuZGVmaW5lZCwgY2FsbGJhY2suZXJyb3IpO1xuICovXG4vLyBBLT4gJGh0dHAgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBzdGFuZGFyZCBBZGFwdGVyIHBhdHRlcm5cbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL3NlcmlhbGl6ZSc7XG5pbXBvcnQge2lzRW1wdHksIG1lcmdlT2JqLCBhZGRQcmVmaXhUb09iaiwgd3JhcE9ian0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuL2NzcmYnO1xuXG5leHBvcnQgZnVuY3Rpb24gJGh0dHAodXJsKSB7XG4gIC8vIEEgc21hbGwgZXhhbXBsZSBvZiBvYmplY3RcbiAgdmFyIGNvcmUgPSB7XG5cbiAgICAvLyBNZXRob2QgdGhhdCBwZXJmb3JtcyB0aGUgYWpheCByZXF1ZXN0XG4gICAgYWpheDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFyZ3MgPSB7fSwgcHJlZml4KSB7XG4gICAgICAvLyBmb3IgUmFpbHNcbiAgICAgIC8vIHVybCA9IHVybCArICcuanNvbic7XG4gICAgICAvLyBDcmVhdGluZyBhIHByb21pc2VcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGVzIHRoZSBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnIHx8IG1ldGhvZCA9PT0gJ1BVVCcgfHwgbWV0aG9kID09PSAnUEFUQ0gnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICBsZXQgdXJpID0gSlNPTi5zdHJpbmdpZnkoZXh0ZW5kR2VuZXJhbFBhcmFtcyh3cmFwT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgLy8gY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCh1cmkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gc2VyaWFsaXplKGV4dGVuZEdlbmVyYWxQYXJhbXMoYWRkUHJlZml4VG9PYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsICsgJz8nICsgdXJpKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZXNvbHZlXCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBlcXVhbCB0byAyeHhcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlamVjdFwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZGlmZmVyZW50IHRoYW4gMnh4XG4gICAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuICAvLyBBZGFwdGVyIHBhdHRlcm5cbiAgcmV0dXJuIHtcbiAgICAnZ2V0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdHRVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncG9zdCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUE9TVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwdXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BVVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwYXRjaCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUEFUQ0gnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAnZGVsZXRlJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdERUxFVEUnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRHZW5lcmFsUGFyYW1zKG9iaikge1xuICBsZXQgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICBsZXQgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpO1xuICBsZXQgZ2VuZXJhbE9iaiA9IHt9O1xuICBnZW5lcmFsT2JqLnV0ZjggPSAn4pyTJztcbiAgZ2VuZXJhbE9iai5mb3JtYXQgPSAnanNvbic7XG4gIGdlbmVyYWxPYmpbY3NyZlBhcmFtXSA9IGNzcmZUb2tlbjtcbiAgcmV0dXJuIG1lcmdlT2JqKG9iaiwgZ2VuZXJhbE9iaik7XG59XG4vLyBFbmQgQVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanMiLCIvKipcbiAqIFtzZXJpYWxpemUgY29udmVydHMgcmVjdXJzaXZlIG9iamVjdHNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG9iaiAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHByZWZpeCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBjb25zb2xlLmxvZyhzZXJpYWxpemUoe2ZvbzogXCJoaSB0aGVyZVwiLCBiYXI6IHsgYmxhaDogMTIzLCBxdXV4OiBbMSwgMiwgM10gfX0pKTtcbiAqIGZvbz1oaSUyMHRoZXJlJmJhciU1QmJsYWglNUQ9MTIzJmJhciU1QnF1dXglNUQlNUIwJTVEPTEmYmFyJTVCcXV1eCU1RCU1QjElNUQ9MiZiYXIlNUJxdXV4JTVEJTVCMiU1RD0zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zZXJpYWxpemUuanMiLCJleHBvcnQgZnVuY3Rpb24gaXNFbXB0eShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbi8qIGNvbnNpZGVyIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqKG9iajEgPSB7fSwgb2JqMikge1xuICBsZXQgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmoxKSk7XG4gIGZvciAobGV0IGtleSBpbiBvYmoyKSB7XG4gICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmoyW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkUHJlZml4VG9PYmoob2JqLCBwcmVmaXgpIHtcbiAgaWYgKCFwcmVmaXgpIHJldHVybiBvYmo7XG4gIGxldCBuZXdPYmogPSB7fTtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqWycnICsgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nXSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBPYmoob2JqLCB3cmFwcGVyKSB7XG4gIGlmICghd3JhcHBlcikgcmV0dXJuIG9iajtcbiAgdmFyIG5ld09iaiA9IHt9O1xuICBuZXdPYmpbd3JhcHBlcl0gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW3dyYXBwZXJdW2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xuICBsZXQgdG1wRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsZS5pbm5lckhUTUwgPSBzdHI7XG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XG4gIHJldHVybiByZXR1cm5Eb207XG59XG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4vLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuLypcbnZhciBteUVmZmljaWVudEZuID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gIC8vIEFsbCB0aGUgdGF4aW5nIHN0dWZmIHlvdSBkb1xufSwgMjUwKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG15RWZmaWNpZW50Rm4pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpY3RNb2RlKCkge1xuICB2YXIgaXNTdHJpY3QgPSAoZnVuY3Rpb24oKSB7IHJldHVybiAhdGhpczsgfSkoKTtcbiAgcmV0dXJuIGlzU3RyaWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsImV4cG9ydCBjb25zdCByb290QVBJID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpcyc7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2dsb2JhbC9jb25zdGFudC5qcyIsImltcG9ydCB7aHRtbEVzY2FwZX0gZnJvbSAnLi9odG1sRXNjYXBlJztcbmV4cG9ydCBmdW5jdGlvbiBodG1sKGxpdGVyYWxTZWN0aW9ucywgLi4uc3Vic3RzKSB7XG4gIC8vIFVzZSByYXcgbGl0ZXJhbCBzZWN0aW9uczogd2UgZG9u4oCZdCB3YW50XG4gIC8vIGJhY2tzbGFzaGVzIChcXG4gZXRjLikgdG8gYmUgaW50ZXJwcmV0ZWRcbiAgbGV0IHJhdyA9IGxpdGVyYWxTZWN0aW9ucy5yYXc7XG5cbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIHN1YnN0cy5mb3JFYWNoKChzdWJzdCwgaSkgPT4ge1xuICAgIC8vIFJldHJpZXZlIHRoZSBsaXRlcmFsIHNlY3Rpb24gcHJlY2VkaW5nXG4gICAgLy8gdGhlIGN1cnJlbnQgc3Vic3RpdHV0aW9uXG4gICAgbGV0IGxpdCA9IHJhd1tpXTtcblxuICAgIC8vIEluIHRoZSBleGFtcGxlLCBtYXAoKSByZXR1cm5zIGFuIGFycmF5OlxuICAgIC8vIElmIHN1YnN0aXR1dGlvbiBpcyBhbiBhcnJheSAoYW5kIG5vdCBhIHN0cmluZyksXG4gICAgLy8gd2UgdHVybiBpdCBpbnRvIGEgc3RyaW5nXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3QpKSB7XG4gICAgICBzdWJzdCA9IHN1YnN0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBzdWJzdGl0dXRpb24gaXMgcHJlY2VkZWQgYnkgYSBkb2xsYXIgc2lnbixcbiAgICAvLyB3ZSBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGl0XG4gICAgaWYgKGxpdC5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICBzdWJzdCA9IGh0bWxFc2NhcGUoc3Vic3QpO1xuICAgICAgbGl0ID0gbGl0LnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmVzdWx0ICs9IGxpdDtcbiAgICByZXN1bHQgKz0gc3Vic3Q7XG4gIH0pO1xuICAvLyBUYWtlIGNhcmUgb2YgbGFzdCBsaXRlcmFsIHNlY3Rpb25cbiAgLy8gKE5ldmVyIGZhaWxzLCBiZWNhdXNlIGFuIGVtcHR5IHRlbXBsYXRlIHN0cmluZ1xuICAvLyBwcm9kdWNlcyBvbmUgbGl0ZXJhbCBzZWN0aW9uLCBhbiBlbXB0eSBzdHJpbmcpXG4gIHJlc3VsdCArPSByYXdbcmF3Lmxlbmd0aCAtIDFdOyAvLyAoQSlcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qcyIsImV4cG9ydCBmdW5jdGlvbiBodG1sRXNjYXBlKHN0cikge1xuXHRzdHIgPSAnJyArIHN0cjsgLy8gZm9yIG51bWJlcnMgZXRjLlxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykgLy8gZmlyc3QhXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL2AvZywgJyYjOTY7Jyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2h0bWxFc2NhcGUuanMiLCJpbXBvcnQge2Rpc2FibGVTY3JvbGwsIGVuYWJsZVNjcm9sbH0gZnJvbSAnLi90b2dnbGVTY3JvbGwnO1xuZXhwb3J0IGZ1bmN0aW9uIHBvcHVwKGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGxldCBwb3B1cEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwb3B1cEVsZS5jbGFzc0xpc3QuYWRkKCdwb3B1cC1sYXllcicpO1xuICBwb3B1cEVsZS5pbm5lckhUTUwgPSBnZW5lcmF0ZVBvcHVwVHBsKCk7XG4gIHBvc2l0aW9uUG9wdXBFbGUocG9wdXBFbGUsIGV2KTtcbiAgYmluZFBvcHVwRXZlbnRzKHBvcHVwRWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBFbGUpO1xuICBkaXNhYmxlU2Nyb2xsKCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUG9wdXBUcGwoZGF0YSkge1xuICBsZXQgdHBsID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1zaGFkb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC10ZXh0XCI+QXJlIHlvdSBzdXJlIHRvIGRlbGV0ZSB0aGlzIEFQST88L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBvcHVwLWJ0bnNcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jYW5jZWwtYnRuXCI+Y2FuY2VsPC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicG9wdXAtYnRuIHBvcHVwLWNvbmZpcm0tYnRuXCI+Y29uZmlybTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxuZnVuY3Rpb24gYmluZFBvcHVwRXZlbnRzKGVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNhbmNlbC1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbmZpcm0tYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maXJtLmJpbmQodGhpcywgZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykpO1xufVxuXG5mdW5jdGlvbiBjb25maXJtKGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvblBvcHVwRWxlKGVsZSwgY29vcmRpbmF0ZXMpIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbnRlbnQnKVswXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGVzLmNsaWVudFggKyAncHgsICcgKyBjb29yZGluYXRlcy5jbGllbnRZICsgJ3B4LCAwKSc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlUG9wdXAoZXYpIHtcbiAgaWYgKGV2LnRhcmdldCAhPT0gZXYuY3VycmVudFRhcmdldCkgcmV0dXJuO1xuICBsZXQgcG9wTGF5ZXIgPSBldi50YXJnZXQuY2xvc2VzdCgnLnBvcHVwLWxheWVyJyk7XG4gIGlmIChwb3BMYXllcikge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9wTGF5ZXIpO1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzIiwiLy8gbGVmdDogMzcsIHVwOiAzOCwgcmlnaHQ6IDM5LCBkb3duOiA0MCxcbi8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxudmFyIGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgaWYgKGUucHJldmVudERlZmF1bHQpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKGUpIHtcbiAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSAvLyBvbGRlciBGRlxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ud2hlZWwgPSBwcmV2ZW50RGVmYXVsdDsgLy8gbW9kZXJuIHN0YW5kYXJkXG4gIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBwcmV2ZW50RGVmYXVsdDsgLy8gb2xkZXIgYnJvd3NlcnMsIElFXG4gIHdpbmRvdy5vbnRvdWNobW92ZSAgPSBwcmV2ZW50RGVmYXVsdDsgLy8gbW9iaWxlXG4gIGRvY3VtZW50Lm9ua2V5ZG93biAgPSBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBudWxsO1xuICB3aW5kb3cub253aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbnRvdWNobW92ZSA9IG51bGw7XG4gIGRvY3VtZW50Lm9ua2V5ZG93biA9IG51bGw7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qcyIsImltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5leHBvcnQgZnVuY3Rpb24gc2xpZGUoZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgbGV0IHNsaWRlRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNsaWRlRWxlLmNsYXNzTGlzdC5hZGQoJ3NsaWRlLWxheWVyJyk7XG4gIHNsaWRlRWxlLmlubmVySFRNTCA9IGdlbmVyYXRlU2xpZGVUcGwocGFyYW1zLmNvbnRlbnQpO1xuICBwb3NpdGlvblNsaWRlRWxlKHNsaWRlRWxlLCBldik7XG4gIGJpbmRTbGlkZUV2ZW50cyhzbGlkZUVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNsaWRlRWxlKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVTbGlkZVRwbChjb250ZW50KSB7XG4gIGxldCB0cGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInNsaWRlLXNoYWRvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInNsaWRlLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInNsaWRlLXRleHRcIj4ke2NvbnRlbnR9PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzbGlkZS1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJzbGlkZS1idG4gc2xpZGUtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInNsaWRlLWJ0biBzbGlkZS1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRTbGlkZUV2ZW50cyhlbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jYW5jZWwtYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVNsaWRlKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlLXNoYWRvdycpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tTaGFkb3cpO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGUtY29uZmlybS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm0uYmluZCh0aGlzLCBldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm0oZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBjYWxsYmFjaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uU2xpZGVFbGUoZWxlLCBjb29yZGluYXRlcykge1xuICAvLyBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGUtY29udGVudCcpWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZXMuY2xpZW50WCArICdweCwgJyArIGNvb3JkaW5hdGVzLmNsaWVudFkgKyAncHgsIDApJztcbn1cblxuZnVuY3Rpb24gY2xpY2tTaGFkb3coZXYpIHtcbiAgaWYgKGV2LnRhcmdldCAhPT0gZXYuY3VycmVudFRhcmdldCkgcmV0dXJuO1xuICBwb3B1cChldiwgdW5kZWZpbmVkLCBjbG9zZVNsaWRlLmJpbmQodGhpcywgZXYpKTtcbn1cblxuZnVuY3Rpb24gY2xvc2VTbGlkZShldikge1xuICBsZXQgcG9wTGF5ZXIgPSBldi50YXJnZXQuY2xvc2VzdCgnLnNsaWRlLWxheWVyJyk7XG4gIGlmIChwb3BMYXllcikge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocG9wTGF5ZXIpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NsaWRlLmpzIiwiaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb219IGZyb20gJy4vdXRpbGl0aWVzJztcbmV4cG9ydCBmdW5jdGlvbiBmbGFzaChkYXRhLCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge30pIHtcbiAgbGV0IGZsYXNoRWxlID0gc3RyVG9Eb20oZmxhc2hUcGwoZGF0YSkpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZsYXNoRWxlKTtcbiAgc2V0VGltZW91dChkZXN0b3J5LmJpbmQobnVsbCwgZmxhc2hFbGUsIGNhbGxiYWNrKSwgMjAwMCk7XG59XG5cbmZ1bmN0aW9uIGZsYXNoVHBsKGRhdGEpIHtcbiAgbGV0IHN0ciA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiZmxhc2gtbGF5ZXIgJHtkYXRhLmVycm9yID8gJ2Vycm9yJyA6ICdzdWNjZXNzJ31cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+JHtkYXRhLmVycm9yIHx8IGRhdGEubWVzc2FnZX08L2Rpdj5cblx0XHQ8L2Rpdj5cblx0YCAgO1xuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBkZXN0b3J5KGVsZSwgY2FsbGJhY2spIHtcbiAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgfSk7XG4gIGVsZS5jbGFzc0xpc3QuYWRkKCdibGluaycpO1xuICBjYWxsYmFjaygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VBbmRGbGFzaChkYXRhLCBjYWxsYmFjaykge1xuICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBmbGFzaChqc29uRGF0YSwgY2FsbGJhY2spO1xuICByZXR1cm4ganNvbkRhdGE7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9mbGFzaC5qcyIsIi8qKlxuICogd2lkdGggb2Ygc2luZ2xlIHN2ZyBwYXRoOiAzMHB4XG4gKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge3Jvb3RBUEl9IGZyb20gJy4uL2dsb2JhbC9jb25zdGFudCc7XG5pbXBvcnQge2ZsYXNoLCBwYXJzZUFuZEZsYXNofSBmcm9tICcuLi9jb21tb24vZmxhc2gnO1xuaW1wb3J0IHtjb2xsZWN0QXBpRGF0YX0gZnJvbSAnLi90cmVlRGF0YUNvbGxlY3QnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGVYLCB4aHIsIGJlYXV0aWZ5SlNPTiwgaGlnaHRsaWdodEpTT059IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7anNvblRvVHJlZX0gZnJvbSAnLi9qc29uVHJlZUNvbnZlcnRlcic7XG5pbXBvcnQge3R3b1dheURhdGFCaW5kaW5nfSBmcm9tICcuLi9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcnO1xuaW1wb3J0IHtjYWxsYmFja3N9IGZyb20gJy4uL2NvbW1vbi9jYWxsYmFja3MnO1xuaW1wb3J0IHtzY3JvbGxCYXJIfSBmcm9tICcuLi9jb21tb24vc2Nyb2xsJztcbmltcG9ydCB7Z2VuZXJhdGVVVUlEfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcblxuZnVuY3Rpb24gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpID0gZmFsc2UpIHtcbiAgbGV0IGFwaVVVSUQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgbGV0IHRwbCA9XG4gICAgICBgPGRpdiBjbGFzcz1cImFwaS1pbmZvXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+QVBJOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXVyaVwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJcIiBtb2RlbD1cInVyaVwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCIgbW9kZWw9XCJtZXRob2RcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkdFVFwiPkdFVDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUE9TVFwiPlBPU1Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBBVENIXCI+UEFUQ0g8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRFTEVURVwiPkRFTEVURTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxsYWJlbD5zZWN0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiB0eXBlPVwidGV4dFwiIG1vZGVsPVwic2VjdGlvblwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPmRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLWRlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiBtb2RlbD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCIgZGF0YS1tZXRob2Q9XCIke3BhdGNoT3JQb3N0KGlzTmV3QXBpKX1cIiBkYXRhLWFjdGlvbj1cIi9hcGlzJHtzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpfVwiID4ke2lzTmV3QXBpID8gJ2NyZWF0ZScgOiAnc2F2ZSd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXJlc3BvbmQtcHJldmlldy1idG5cIj5wcmV2aWV3PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXdpa2lcIiBiaW5kLXRvZ2dsZS1jbGFzcyBiaW5kPVwid2lraUxpbmtcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS13aWtpLWxhYmVsXCI+V2lraTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS13aWtpLWlucHV0XCIgdHlwZT1cInRleHRcIiBtb2RlbD1cIndpa2lMaW5rXCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbW9kZXMtcm93XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIwXCI+5byA5Y+RPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLW1vZGUtbGFiZWwgYXBpLW1vZGUtZGVidWdcIj48aW5wdXQgY2xhc3M9XCJhcGktbW9kZVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCIke2FwaVVVSUR9LW1vZGVcIiB2YWx1ZT1cIjFcIj7ogZTosIM8aW5wdXQgY2xhc3M9XCJtb2RlLWRlYnVnZ2luZy1hZGRyXCIgdHlwZT1cInRleHRcIiAvPjwvbGFiZWw+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIyXCI+57q/5LiKPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtZnJhbWVcIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1yZXNwb25kLXByZXZpZXdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250cm9sLXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3LWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcHJldmlldy10eXBlIHByZXZpZXctYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1oaWdobGlnaHRcIj5zeW50YXhIaWdobGlnaHQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3IGpzb25cIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGxlYWZUcGwoKSB7XG4gIGxldCBsZWFmQ29udGVudFRwbCA9IGBcbiAgICA8aSBjbGFzcz1cInJlbW92ZS1jaGlsZFwiPi08L2k+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLWtleVwiIHBsYWNlaG9sZGVyPVwia2V5XCIgbW9kZWw9XCJkYXRhTmFtZVwiIC8+XG4gICAgPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgbW9kZWw9XCJkYXRhVmFsdWVcIiAvPlxuICAgIDxzZWxlY3QgY2xhc3M9XCJsZWFmLXZhbHVlLXR5cGVcIiBtb2RlbD1cImRhdGFUeXBlXCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdHJpbmdcIj5TdHJpbmc8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkludGVnZXJcIj5JbnRlZ2VyPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJGbG9hdFwiPkZsb2F0PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCb29sZWFuXCI+Qm9vbGVhbjwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQXJyYXlcIj5BcnJheTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGFzaFwiPkhhc2g8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJlZ2V4XCI+UmVnZXgoc3RyaW5nKTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRml4ZWRcIj5GaXhlZChzdHJpbmcpPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJOdWxsXCI+TnVsbDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICAgIDxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+XG4gICAgPGkgY2xhc3M9XCJhZGQtY2hpbGRcIj4rPC9pPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1xdWFudGl0eVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiBtb2RlbD1cImRhdGFRdWFudGl0eVwiIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJsZWFmLWhpZGUtcXVhbnRpdHlcIj48L3NwYW4+XG4gIGA7XG4gIHJldHVybiBsZWFmQ29udGVudFRwbDtcbn1cblxuLyogZGVmYXVsdCBnZXRCb3VuZGluZ1JlY3RPYmogKi9cbmxldCBpbml0UmVjdE9iaiA9IHtcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgbGVmdDogMCxcbiAgdG9wOiAwLFxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwXG59O1xuXG5sZXQgbGVhZkRhdGFQbGFjZUhvbGRlciA9IHtcbiAgZGF0YU5hbWU6ICcnLFxuICBkYXRhVHlwZTogJ1N0cmluZycsXG4gIGRhdGFWYWx1ZTogJycsXG4gIGRhdGFRdWFudGl0eTogJzEnLFxuICBoYXNDaGlsZDogZmFsc2Vcbn07XG5cbi8qXG5zaW5nbGUgbGVhZiB3aWR0aDogNDYwcHg7XG4gKi9cbmNvbnN0IHBlckxlYWZXaWR0aCA9IDQ2MDtcbmNvbnN0IHBlckxlYWZIZWlnaHQgPSAyMjtcbmNvbnN0IGxlYXZlc1ZlcnRpY2FsR2FwID0gMzA7XG5jb25zdCBwZXJTVkdQYXRoV2lkdGggPSAzMDtcbnZhciByb290Tm9kZVdpZHRoID0gcGVyU1ZHUGF0aFdpZHRoICsgMTQ7XG52YXIgY2FsbGJhY2sgPSB7XG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuYXBpUmF3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5hcGlEYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKS5kYXRhO1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIHBvc3RTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5hcGlSYXdEYXRhID0gZGF0YTtcbiAgICB0aGlzLmFwaURhdGFPYmogPSBKU09OLnBhcnNlKGRhdGEpLmRhdGE7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgICB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdLnRleHRDb250ZW50ID0gJ3NhdmUnO1xuICAgIHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zYXZlJylbMF0uZGF0YXNldC5tZXRob2QgPSAnUEFUQ0gnO1xuICB9LFxuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgYXBpUmVzcG9uZFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQganNvbk9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgdGhpcy5wcmV2aWV3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5wcmV2aWV3RGF0YU9iaiA9IGpzb25PYmo7XG4gICAgc3dpdGNoUHJldmlldyh0aGlzLnByZXZpZXdEYXRhT2JqLCBoaWdodGxpZ2h0SlNPTiwgdGhpcy5ldmVudENvbnRleHQsICdoaWdobGlnaHQnKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcGF0Y2hPclBvc3QoaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJ1BPU1QnIDogJ1BBVENIJztcbn1cblxuZnVuY3Rpb24gc2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICcnIDogYC8ke2RhdGEuaWR9YDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGVyQXBpKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHZhciBwZXJBcGlFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGVyQXBpRWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGVyLWFwaScpO1xuICBwZXJBcGlFbGUuZGF0YXNldC5pZCA9IGlzTmV3QXBpID8gJycgOiBkYXRhLmlkO1xuICBwZXJBcGlFbGUuaW5uZXJIVE1MID0gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpKTtcbiAgcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSA9IGlzTmV3QXBpID8gJycgOiBkYXRhLnVyaTtcbiAgcmV0dXJuIHBlckFwaUVsZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU5ld0FwaUluaXREYXRhKCkge1xuICBsZXQgaW5pdERhdGEgPSB7XG4gICAgbm9kZUlkOiAwLFxuICAgIHBhcmVudElkOiBudWxsLFxuICAgIGRhdGE6IGxlYWZEYXRhUGxhY2VIb2xkZXJcbiAgfTtcbiAgbGV0IGZpcnN0Q2hpbGREYXRhID0ge1xuICAgIG5vZGVJZDogMSxcbiAgICBwYXJlbnRJZDogMCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIHJldHVybiB7XG4gICAgbW9kZTogJzAnLFxuICAgIGRlYnVnQWRkcjogJycsXG4gICAgbm9kZXM6IFtpbml0RGF0YSwgZmlyc3RDaGlsZERhdGFdXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBpZiAoaXNOZXdBcGkpIHtcbiAgICBkYXRhID0gY3JlYXRlTmV3QXBpSW5pdERhdGEoKTtcbiAgfVxuICB0aGlzLmFwaURhdGFPYmogPSBkYXRhO1xuICB0aGlzLmFwaUNvbnRhaW5lciA9IGNvbnRhaW5lck5vZGU7XG4gIGxldCBwZXJBcGlFbGUgPSBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpO1xuICB0aGlzLmFwaUNvbnRhaW5lci5hcHBlbmRDaGlsZChwZXJBcGlFbGUpO1xuXG4gIGxldCBhcGlCaW5kRGF0YSA9IHR3b1dheURhdGFCaW5kaW5nKGRhdGEsIHRoaXMuYXBpQ29udGFpbmVyKTtcbiAgZGF0YSA9IGFwaUJpbmREYXRhO1xuXG4gIHRoaXMuYXBpRWxlID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLWFwaScpWzBdO1xuXG4gIHRoaXMubGVhZkluZGV4ID0gMTtcblxuICB0aGlzLiRhcGlUcmVlID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtZnJhbWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZUNvbnRlbnQgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50JylbMF07XG4gIC8vIGlmIChpc05ld0FwaSkge1xuICAvLyAgIHRoaXMuaW5pdEFwaVRyZWUoKTtcbiAgLy8gICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIC8vIH0gZWxzZSB7XG4gIHRoaXMucmVuZGVyRXhpc3RUcmVlKGRhdGEpO1xuICAvLyB9XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG5cbiAgdGhpcy5hcGlFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kRXZlbnQuYmluZCh0aGlzKSk7XG4gIHRoaXMuc2V0TW9kZVZhbChkYXRhLm1vZGUpO1xuICB0aGlzLnNldERlYnVnQWRkcihkYXRhLmRlYnVnQWRkcik7XG4gIHRoaXMuc2Nyb2xsQmFyID0gc2Nyb2xsQmFySCh7XG4gICAgd3JhcHBlcjogdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtd3JhcHBlcicpWzBdLFxuICAgIGNvbnRlbnQ6IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWNvbnRlbnQtd3JhcHBlcicpWzBdLFxuICAgIG92ZXJmbG93RWxlOiB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50JylbMF1cbiAgfSk7XG59XG5cbkFwaURvbS5wcm90b3R5cGUucmVuZGVyRXhpc3RUcmVlID0gZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBsZXQgcGVyVFdEQkFyciA9IFtdO1xuICBpZiAoZGF0YS5ub2RlcyAmJiBkYXRhLm5vZGVzLmxlbmd0aCkge1xuICAgIGxldCBub2Rlc0FyciA9IGRhdGEubm9kZXM7XG4gICAgbGV0IG5vZGVEYXRhID0ge307XG4gICAgbGV0IGxlYWY7XG4gICAgbGV0IGxlYWZEYXRhID0ge307XG4gICAgbGV0IHBlclRXREI7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGVzQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZWFmID0gdW5kZWZpbmVkO1xuICAgICAgbGVhZiA9IGdlbmVyYXRlTGVhZihkYXRhLm5vZGVzW2ldKTtcbiAgICAgIGlmIChkYXRhLm5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLm5vZGVzW2ldLmRhdGEgPT09IFwiXCIpIHtcbiAgICAgICAgZGF0YS5ub2Rlc1tpXS5kYXRhID0gbGVhZkRhdGFQbGFjZUhvbGRlcjtcbiAgICAgIH07XG4gICAgICBpZiAoZGF0YS5ub2Rlc1tpXS5wYXJlbnRJZCA9PT0gbnVsbCB8fCBkYXRhLm5vZGVzW2ldLnBhcmVudElkID09PSAnbnVsbCcpIGxlYWYuY2xhc3NMaXN0LmFkZCgncm9vdC1sZWFmJyk7XG4gICAgICBwZXJUV0RCID0gdHdvV2F5RGF0YUJpbmRpbmcoZGF0YS5ub2Rlc1tpXS5kYXRhLCBsZWFmKTtcbiAgICAgIGRhdGEubm9kZXNbaV0uZGF0YSA9IHBlclRXREI7XG4gICAgICBwZXJUV0RCQXJyLnB1c2gocGVyVFdEQik7XG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGxlYWYpO1xuICAgIH1cbiAgICB0aGlzLmxlYWZJbmRleCArPSAobGVuIC0gMik7XG4gIH1cbiAgdGhpcy5hcGlUcmVlID0ganNvblRvVHJlZShkYXRhLm5vZGVzKTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcbiAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICB0aGlzLmRyYXdTVkcoKTtcbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmKG5vZGVEYXRhKSB7XG4gIHZhciBuZXdMZWFmU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZWFmJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnYmluZCcsICdoYXNDaGlsZCcpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJywgJycpO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0LnBhcmVudElkID0gbm9kZURhdGEucGFyZW50SWQ7XG4gIG5ld0xlYWZTcGFuLmRhdGFzZXQubm9kZUlkID0gbm9kZURhdGEubm9kZUlkO1xuICBuZXdMZWFmU3Bhbi5pbm5lckhUTUwgPSBsZWFmVHBsKCk7XG4gIG5ld0xlYWZTcGFuLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKHBlckxlYWZXaWR0aCArIHBlclNWR1BhdGhXaWR0aCkgKiAobm9kZURhdGEuY29sdW1uIC0gMSkpICsgJ3B4LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQobm9kZURhdGEudG90YWxvZmZzZXR5bGV2ZWwgKiAocGVyTGVhZkhlaWdodCArIGxlYXZlc1ZlcnRpY2FsR2FwKSkgKyAncHgsIDApJztcbiAgcmV0dXJuIG5ld0xlYWZTcGFuO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zZXREZWJ1Z0FkZHIgPSBmdW5jdGlvbih2YWwpIHtcbiAgdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZS1kZWJ1Z2dpbmctYWRkcicpWzBdLnZhbHVlID0gdmFsO1xufTtcbkFwaURvbS5wcm90b3R5cGUuc2V0TW9kZVZhbCA9IGZ1bmN0aW9uKHZhbCkge1xuICB2YXIgcmFkaW9zID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1vZGUnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHJhZGlvcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICh2YWwgPT09IHJhZGlvc1tpXS52YWx1ZSkge1xuICAgICAgcmFkaW9zW2ldLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhZGlvc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gYmluZEV2ZW50KGV2KSB7XG4gIC8qIF8kdGhpcyBpcyBBcGlEb20sIHdoaWxlIHRoaXMgaXMgaXRzIHdyYXBwZXIob2JqZWN0KS4gKi9cbiAgbGV0IF90aGlzID0gdGhpcztcbiAgbGV0IGV2VGFyZ2V0Q2xhc3NMaXN0ID0gZXYudGFyZ2V0LmNsYXNzTGlzdDtcbiAgbGV0IGV2ZW50Q29udGV4dCA9IHtfZXY6IGV2LCBkb21Db250YWluZXI6IGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJyl9O1xuICB0aGlzLmV2ZW50Q29udGV4dCA9IGV2ZW50Q29udGV4dDtcbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktc2F2ZScpKSB7XG4gICAgbGV0IHBhcmFtcyA9IGNvbGxlY3RBcGlEYXRhKF90aGlzLmFwaVRyZWUsIF90aGlzLiRhcGlUcmVlKTtcbiAgICBpZiAodGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5hcGlEYXRhT2JqLmlkKVxuICAgICAgLnBhdGNoKHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wYXRjaFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfSBlbHNlIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICAkaHR0cChyb290QVBJKVxuICAgICAgLnBvc3QocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnBvc3RTdWNjZXNzLmJpbmQodGhpcykpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1jaGlsZCcpKSB7XG4gICAgX3RoaXMuYWRkQ2hpbGQoZXYpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLWNoaWxkJykpIHtcbiAgICBpZiAoZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb290LWxlYWYnKSkge1xuICAgICAgcG9wdXAoZXYsIHt9LCBkZWxldGVBcGkuYmluZChfdGhpcywgZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXMuZGVsTm9kZShldik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXJlc3BvbmQtcHJldmlldy1idG4nKSkge1xuICAgIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICBmbGFzaCh7ZXJyb3I6ICdTYXZlIGZpcnN0Lid9KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgbGV0IHBhcmFtcyA9IHtkYXduX3VyaTogdGhpcy5hcGlEYXRhT2JqLnVyaX07XG4gICAgbGV0IGNvbnRleHQgPSB7fTtcbiAgICAkaHR0cCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGlyZXNwb25zZScpXG4gICAgLmdldChwYXJhbXMpXG4gICAgLnRoZW4oY2FsbGJhY2suYXBpUmVzcG9uZFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXdpa2ktbGFiZWwnKSkge1xuICAgIGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLXdpa2knKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUtdHJ1ZScpO1xuICB9XG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1yYXcnKSkge1xuICAgIHJldHVybiBzd2l0Y2hQcmV2aWV3KHRoaXMucHJldmlld0RhdGFPYmosIEpTT04uc3RyaW5naWZ5LCB0aGlzLmV2ZW50Q29udGV4dCwgJ3JhdycpO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1iZWF1dGlmeScpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgYmVhdXRpZnlKU09OLCB0aGlzLmV2ZW50Q29udGV4dCwgJ2JlYXV0aWZ5Jyk7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2aWV3LWhpZ2hsaWdodCcpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgaGlnaHRsaWdodEpTT04sIHRoaXMuZXZlbnRDb250ZXh0LCAnaGlnaGxpZ2h0Jyk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gc3dpdGNoUHJldmlldyhkYXRhT2JqLCBmbiwgcHJldmlld0NvbnRleHQsIHByZXZpZXdUeXBlKSB7XG4gIGxldCBwcmV2aWV3U3RyID0gZm4uY2FsbChudWxsLCBkYXRhT2JqKTtcbiAganNvblZpZXcuY2FsbChwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIsIHByZXZpZXdTdHIpO1xuICBzd2l0Y2hQcmV2aWV3U3RhdHVzKHByZXZpZXdDb250ZXh0LCBwcmV2aWV3VHlwZSk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hQcmV2aWV3U3RhdHVzKHByZXZpZXdDb250ZXh0LCBhcHBseVR5cGUpIHtcbiAgbGV0IHByZXZpZXdUeXBlcyA9IFsncmF3JywgJ2JlYXV0aWZ5JywgJ2hpZ2hsaWdodCddO1xuICBsZXQgYXBpUmVzcG9uZFByZXZpZXdFbGUgPSBwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXJlc3BvbmQtcHJldmlldycpWzBdO1xuICBsZXQgYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0FyciA9IGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoJyAnKTtcbiAgYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xuICAgIGxldCBpZHggPSBwcmV2aWV3VHlwZXMuaW5kZXhPZihlbGVtZW50KTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIGFycmF5LnNwbGljZShhcnJheS5pbmRleE9mKGVsZW1lbnQpLCAxKTtcbiAgICB9XG4gIH0pO1xuICBsZXQgcHJldmlld1R5cGVFbGVzQXJyID0gW10uc2xpY2UuY2FsbChwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLXByZXZpZXctdHlwZScpKTtcbiAgcHJldmlld1R5cGVFbGVzQXJyLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICB9KTtcbiAgcHJldmlld0NvbnRleHQuZG9tQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ByZXZpZXctJyArIGFwcGx5VHlwZSlbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTmFtZSA9IGFwaVJlc3BvbmRQcmV2aWV3RWxlQ2xhc3NBcnIuam9pbignICcpO1xuICBhcGlSZXNwb25kUHJldmlld0VsZS5jbGFzc0xpc3QuYWRkKGFwcGx5VHlwZSk7XG59XG5cbmZ1bmN0aW9uIGFwaVNhdmUoKSB7XG5cbn1cbmZ1bmN0aW9uIGFkZExlYWZDaGlsZCgpIHtcblxufVxuZnVuY3Rpb24gcmVtb3ZlTGVhZkNoaWxkKCkge1xuXG59XG5mdW5jdGlvbiBhcGlUZXN0KCkge1xuXG59XG5mdW5jdGlvbiBqc29uVmlldyhkYXRhKSB7XG4gIHZhciAkcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICRwcmUuaW5uZXJIVE1MID0gZGF0YTtcbiAgbGV0ICRkYXRhVmlld0VsZSA9IHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS12aWV3JylbMF07XG4gICRkYXRhVmlld0VsZS5pbm5lckhUTUwgPSAnJztcbiAgJGRhdGFWaWV3RWxlLmFwcGVuZENoaWxkKCRwcmUpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVBcGkoZXYpIHtcbiAgaWYgKCF0aGlzLmFwaURhdGFPYmouaWQpIHtcbiAgICBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGxldCBwYXJhbXMgPSB7fTtcbiAgY29uc29sZS5sb2cocm9vdEFQSSk7XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLmFwaURhdGFPYmouaWQpXG4gIC5kZWxldGUocGFyYW1zKVxuICAudGhlbihjYWxsYmFja3MuZGVsZXRlU3VjY2Vzcy5iaW5kKGV2KSlcbiAgLmNhdGNoKGNhbGxiYWNrcy5lcnJvcik7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuaW5pdEFwaVRyZWUgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGluaXREYXRhID0ge1xuICAgIG5vZGVJZDogMCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIGxldCBmaXJzdENoaWxkRGF0YSA9IHtcbiAgICBub2RlSWQ6IDEsXG4gICAgZGF0YTogbGVhZkRhdGFQbGFjZUhvbGRlclxuICB9O1xuICB0aGlzLmFwaVRyZWUgPSBuZXcgVHJlZShpbml0RGF0YSk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoZmlyc3RDaGlsZERhdGEsIDAsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICBsZXQgdHJlZURvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCBsZWFmRWxlO1xuICAgIGxldCBsZWFmQmluZERhdGE7XG4gICAgbm9kZS5wYXJlbnRJZCA9IG5vZGUucGFyZW50ID8gbm9kZS5wYXJlbnQubm9kZUlkIDogbnVsbDtcbiAgICBsZWFmRWxlID0gZ2VuZXJhdGVMZWFmKG5vZGUpO1xuICAgIGxlYWZCaW5kRGF0YSA9IHR3b1dheURhdGFCaW5kaW5nKGxlYWZEYXRhUGxhY2VIb2xkZXIsIGxlYWZFbGUpO1xuICAgIG5vZGUuZGF0YSA9IGxlYWZCaW5kRGF0YTtcbiAgICBpZiAobm9kZS5wYXJlbnRJZCA9PT0gbnVsbCB8fCBub2RlLnBhcmVudElkID09PSAnbnVsbCcpIGxlYWZFbGUuY2xhc3NMaXN0LmFkZCgncm9vdC1sZWFmJyk7XG4gICAgdHJlZURvY0ZyYWcuYXBwZW5kQ2hpbGQobGVhZkVsZSk7XG4gIH07XG5cbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKHRyZWVEb2NGcmFnKTtcblxuICByZXR1cm4gdGhpcy5hcGlUcmVlO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5kZWxOb2RlID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBjdXJyZW50TGVhZiA9IGN0eC50YXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubm9kZUlkO1xuICB2YXIgcGFyZW50SWR4ID0gKCtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnRJZCA9PT0gMCkgPyAwIDogK2N0eC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudElkO1xuXG4gIHZhciBub2Rlc0FyciA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURlc2NlbmRhbnRzKGN1cnJlbnRJZHgpO1xuICB2YXIgaWR4QXJyID0gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycik7XG4gIHRoaXMuYXBpVHJlZS5yZW1vdmUoY3VycmVudElkeCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMucmVtb3ZlTm9kZXNGcm9tRG9tKGlkeEFycik7XG5cbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWR4KTtcbiAgdGhpcy5zY3JvbGxCYXIucmVuZGVyKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0Lm5vZGVJZCkgIT09IC0xKSB7XG4gICAgICB0aGlzLiRhcGlUcmVlLnJlbW92ZUNoaWxkKGFsbExlYXZlc1tpXSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpIHtcbiAgdmFyIG5vZGVzQXJyTGVuID0gbm9kZXNBcnIubGVuZ3RoO1xuICB2YXIgaWR4QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXNBcnJMZW47IGkrKykge1xuICAgIGlkeEFyci5wdXNoKG5vZGVzQXJyW2ldLm5vZGVJZCk7XG4gIH07XG4gIHJldHVybiBpZHhBcnI7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc2V0UGFyZW50Tm9kZVZhbCA9IGZ1bmN0aW9uKGlkeCkge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgcXVldWUgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICB2YXIgcXVldWVMZW4gPSBxdWV1ZS5fbmV3ZXN0SW5kZXggLSBxdWV1ZS5fb2xkZXN0SW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gbGVhdmVzLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGlmICgrbGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkID09PSBpZHgpIHtcbiAgICAgIGlmIChxdWV1ZUxlbiA+IDApIHtcbiAgICAgICAgLy8gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIH07XG4gIH07XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ID0gdGhpcy5hcGlUcmVlLm1heElkKCkgKyAxO1xuICB2YXIgcGFyZW50SWRleCA9ICtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5ub2RlSWQ7XG5cbiAgbGV0IGxlYWZDaGlsZCA9IGNyZWF0ZUxlYWYocGFyZW50SWRleCwgdGhpcy5sZWFmSW5kZXgpO1xuICBsZXQgY2hpbGRNb2RlbCA9IHR3b1dheURhdGFCaW5kaW5nKGxlYWZEYXRhUGxhY2VIb2xkZXIsIGxlYWZDaGlsZCk7XG4gIGxldCBsZWFmRGF0YSA9IHtcbiAgICBub2RlSWQ6IHRoaXMubGVhZkluZGV4LFxuICAgIGRhdGE6IGNoaWxkTW9kZWxcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLmFkZChsZWFmRGF0YSwgcGFyZW50SWRleCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGxlYWZDaGlsZCk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkZXgpO1xuICB0aGlzLnNjcm9sbEJhci5yZW5kZXIoKTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWQsIG5vZGVJbmRleCkge1xuICB2YXIgbmV3TGVhZlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGVhZicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQnLCAnaGFzQ2hpbGQnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdiaW5kLXRvZ2dsZS1jbGFzcycsICcnKTtcbiAgbmV3TGVhZlNwYW4uZGF0YXNldC5wYXJlbnRJZCA9IHBhcmVudElkO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0Lm5vZGVJZCA9IG5vZGVJbmRleDtcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZlRwbCgpO1xuICByZXR1cm4gbmV3TGVhZlNwYW47XG59XG5mdW5jdGlvbiBjcmVhdGVMZWFmKHBhcmVudElkeCwgbm9kZUlkeCkge1xuICByZXR1cm4gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgpO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zdHlsZU5vZGVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG5cbiAgbGV0IGxlYXZlc0hhc2ggPSB7fTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYXZlc0hhc2hbbGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkXSA9IGxlYXZlc1tpXTtcbiAgfVxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZUlkIDw9IDApIHJldHVybjtcbiAgICBsZWF2ZXNIYXNoW25vZGUubm9kZUlkXS5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKHBlckxlYWZXaWR0aCArIHBlclNWR1BhdGhXaWR0aCkgKiAobm9kZS5jb2x1bW4gLSAxKSkgKyAncHgsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgKiAocGVyTGVhZkhlaWdodCArIGxlYXZlc1ZlcnRpY2FsR2FwKSkgKyAncHgsIDApJztcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuXG4vKiB1dGlscyAqL1xuZnVuY3Rpb24gY2xvbmVSZWN0T2JqKG9iaikge1xuICByZXR1cm4ge1xuICAgIHRvcDogb2JqLnRvcCxcbiAgICBib3R0b206IG9iai5ib3R0b20sXG4gICAgbGVmdDogb2JqLmxlZnQsXG4gICAgcmlnaHQ6IG9iai5yaWdodCxcbiAgICB3aWR0aDogb2JqLndpZHRoLFxuICAgIGhlaWdodDogb2JqLmhlaWdodFxuICB9O1xufVxuXG4vKiBtYW5pcHVsYXRlIFNWRyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jbGVhclNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXTtcbiAgd2hpbGUgKHN2Zy5sYXN0Q2hpbGQpIHtcbiAgICBzdmcucmVtb3ZlQ2hpbGQoc3ZnLmxhc3RDaGlsZCk7XG4gIH1cbn07XG4vKipcbiAqIFtkcmF3U1ZHIGRlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gKi9cbkFwaURvbS5wcm90b3R5cGUuZHJhd1NWRyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyU1ZHKCk7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIHN2Z1BhcnRpYWxzID0gW107XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHN2Z1BhcnRpYWxzLnB1c2godGhhdC5jcmVhdGVTaW5nbGVTVkcobm9kZS5ub2RlSWQsIG5vZGUuY29sdW1uLCBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCwgKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgLSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCkpKTtcbiAgICB9O1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG5cbiAgdmFyIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3ZnUGFydGlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHN2Z1BhcnRpYWxzW2ldKTtcbiAgfVxuICB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmNyZWF0ZVNpbmdsZVNWRyA9IGZ1bmN0aW9uKGlkeCwgaG9yaSwgcGFyZW50VmVydCwgZHZlcnQpIHtcblxuICB2YXIgc3ZnbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICB2YXIgbmV3UGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmducywgJ3BhdGgnKTtcbiAgdmFyIGNvbnRyb2xSYXRlID0gMC4yO1xuICB2YXIgbXgsIG15LCBxeCwgcXksIHF4eCwgcXl5LCB0eCwgdHk7XG4gIGhvcmkgPSBob3JpIC0gMTtcbiAgZHZlcnQgPSBkdmVydDtcbiAgcGFyZW50VmVydCA9IHBhcmVudFZlcnQ7XG5cbiAgbXggPSBob3JpICogNDkwOyAvKiBzaW5nbGUgbGVhZiB3aWR0aCBwbHVzIHNpbmdsZSBzdmcgcGF0aCB3aWR0aCAqL1xuICBteSA9IHBhcmVudFZlcnQgKiA1MiArIDg7XG4gIHF4ID0gbXggKyAxMDtcbiAgcXkgPSBteTtcbiAgcXh4ID0gbXggKyAxNTtcbiAgcXl5ID0gKG15ICsgKGR2ZXJ0IC8gMikgKiA1Mik7XG4gIHR4ID0gbXggKyAzMDtcbiAgdHkgPSBteSArIGR2ZXJ0ICogNTI7XG5cbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsICdNICcgKyBteCArICcgJyArIG15ICsgJyBRICcgKyBxeCArICcgJyArIHF5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxeHggKyAnICcgKyBxeXkgKyAnIFQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggKyAnICcgKyB0eSArICcnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FwaS1zdmctcGF0aCcpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1pZHgnLCBpZHgpO1xuXG4gIHJldHVybiBuZXdQYXRoO1xufTtcblxuLyogY2FsY3VsYXRlIGRpbWVuc2lvbnMgKi9cbkFwaURvbS5wcm90b3R5cGUuY2FsY0RpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcblxuICBob3JpQXJyID0gdGhpcy5hcGlUcmVlLmRlcHRoKCk7XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLmFwaVRyZWUuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVDb250ZW50LnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyIC0gKHZlcnRpY2FsTWF4ID4gMSA/IDEwIDogMCkgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlQ29udGVudC5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyIC0gKHZlcnRpY2FsTWF4ID4gMSA/IDEwIDogMCkgKyAncHgnO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcblxufTtcblxuLyogY2FsY3VsYXRlIG9mZnNldCAqL1xuXG5BcGlEb20ucHJvdG90eXBlLm5vZGVMZWZ0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpIHtcbiAgdmFyIGVsUmVjdE9iamVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgYm9keVJlY3RPYmogPSB0aGlzLiRhcGlUcmVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgY2xvbmVCb2R5UmVjdE9iaiA9IGNsb25lUmVjdE9iaihib2R5UmVjdE9iaik7XG4gIHZhciBjbG9uZUVsUmVjdE9iamVjdCA9IGNsb25lUmVjdE9iaihlbFJlY3RPYmplY3QpO1xuICBjbG9uZUVsUmVjdE9iamVjdC50b3AgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5ib3R0b20gKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5sZWZ0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnJpZ2h0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIHJldHVybiBjbG9uZUVsUmVjdE9iamVjdDtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwiLyoqXG4gKiBbVHJlZSBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqXG4gKiBfcm9vdCBwb2ludHMgdG8gdGhlIHJvb3Qgbm9kZSBvZiBhIHRyZWUuXG4gKiB0cmF2ZXJzZURGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggREZTLlxuICogdHJhdmVyc2VCRihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIEJGUy5cbiAqIGNvbnRhaW5zKGRhdGEsIHRyYXZlcnNhbCkgc2VhcmNoZXMgZm9yIGEgbm9kZSBpbiBhIHRyZWUuXG4gKiBhZGQoZGF0YSwgdG9EYXRhLCB0cmF2ZXJzZSkgYWRkcyBhIG5vZGUgdG8gYSB0cmVlLlxuICogcmVtb3ZlKGNoaWxkLCBwYXJlbnQpIHJlbW92ZXMgYSBub2RlIGluIGEgdHJlZS5cbiAqXG4gKi9cbmltcG9ydCB7UXVldWV9IGZyb20gJy4vcXVldWUnO1xuZXhwb3J0IGZ1bmN0aW9uIFRyZWUoZGF0YSkge1xuICB2YXIgbm9kZSA9IG5ldyBOb2RlKGRhdGEpO1xuICB0aGlzLl9yb290ID0gbm9kZTtcbn1cblxuZnVuY3Rpb24gTm9kZShkYXRhKSB7XG4gIHRoaXMubm9kZUlkID0gZGF0YS5ub2RlSWQ7IC8vIGxlYWYgaW5kZXgsIHN0YXJ0cyBmcm9tIDAocm9vdCBub2RlKVxuICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgLy8gYWRkZWQgbGF0ZXJcbiAgdGhpcy5jaGlsZHJlbmxldmVsID0gMTsgLy8gcm93cyBvZiBkZXNjZW5kYW50cyBvZiBjdXJyZW50IG5vZGVcbiAgdGhpcy5jb2x1bW4gPSAwOyAvLyB3aGljaCBjb2x1bW4gdGhlIGN1cnJlbnQgbm9kZSBzaXRzIGluLCBzdGFydHMgZnJvbSAwKCByb290IG5vZGUgc2l0cyBpbilcbiAgdGhpcy50b3RhbG9mZnNldHlsZXZlbCA9IDA7IC8vIHRvdGFsIHZlcnRpY2FsIG9mZnNldCB0byB0aGUgY3VycmVudCB0cmVlIFxuICB0aGlzLmRhdGEgPSBkYXRhLmRhdGEgfHwge307XG59XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlREYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIC8vIHRoaXMgaXMgYSByZWN1cnNlIGFuZCBpbW1lZGlhdGVseS1pbnZva2luZyBmdW5jdGlvblxuICAoZnVuY3Rpb24gcmVjdXJzZShjdXJyZW50Tm9kZSkge1xuICAgIC8vIHN0ZXAgMlxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgLy8gc3RlcCAzXG4gICAgICByZWN1cnNlKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICAvLyBzdGVwIDRcbiAgICBjYWxsYmFjayhjdXJyZW50Tm9kZSk7XG5cbiAgICAvLyBzdGVwIDFcbiAgfSkodGhpcy5fcm9vdCk7XG5cbn07XG5cbi8vIGZvciB0aG9zZSBub2RlcyB3aG8gaGF2ZSBjaGlsZHJlblxuZnVuY3Rpb24gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIHtcbiAgdmFyIHRvdGFsQ2hpbGRyZW5MZXZlbHMgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB0b3RhbENoaWxkcmVuTGV2ZWxzICs9IG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsQ2hpbGRyZW5MZXZlbHM7XG59XG5UcmVlLnByb3RvdHlwZS5jYWxjQ2hpbGRyZW5MZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbm9kZS5jaGlsZHJlbmxldmVsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIDogMTtcbiAgICBub2RlLmNvbHVtbiA9IG5vZGUucGFyZW50ID8gKG5vZGUucGFyZW50LmNvbHVtbiArIDEpIDogMDtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xufTtcblxuZnVuY3Rpb24gY2FsY09mZlkoYXJyLCBkYXRhKSB7XG4gIHZhciBub2RlSWR4ID0gZmluZEluZGV4KGFyciwgZGF0YSk7XG4gIHZhciB0b3RhbFkgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVJZHg7IGkrKykge1xuICAgIHRvdGFsWSArPSBhcnJbaV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsWTtcbn1cblxuVHJlZS5wcm90b3R5cGUuY2FsY1RvdGFsT2Zmc2V0WUxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZXZlbGdhcCA9IDA7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgIG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgPSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCArIGNhbGNPZmZZKG5vZGUucGFyZW50LmNoaWxkcmVuLCBub2RlLm5vZGVJZCk7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXG4gICAgfTtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG59O1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZUJGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCk7XG5cbiAgcXVldWUuZW5xdWV1ZSh0aGlzLl9yb290KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjdXJyZW50VHJlZSk7XG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cbn07XG5cblRyZWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRyYXZlcnNhbCkge1xuICB0cmF2ZXJzYWwuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihkYXRhLCB0b0RhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgY2hpbGQgPSBuZXcgTm9kZShkYXRhKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZUlkID09PSB0b0RhdGEpIHtcbiAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICBjaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWRkIG5vZGUgdG8gYSBub24tZXhpc3RlbnQgcGFyZW50LicpO1xuICB9XG5cbiAgdGhpcy5jYWxjQ2hpbGRyZW5MZXZlbCgpO1xuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xuICB0aGlzLmNoZWNrRGF0YUhhc0NoaWxkKCk7XG4gIHJldHVybiBjaGlsZFxufTtcblxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZGF0YSwgZnJvbURhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgdHJlZSA9IHRoaXMsXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgY2hpbGRUb1JlbW92ZSA9IG51bGwsXG4gICAgICBpbmRleDtcblxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZUlkID09PSBmcm9tRGF0YSkge1xuICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgaW5kZXggPSBmaW5kSW5kZXgocGFyZW50LmNoaWxkcmVuLCBkYXRhKTtcblxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgdG8gcmVtb3ZlIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZFRvUmVtb3ZlID0gcGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignUGFyZW50IGRvZXMgbm90IGV4aXN0LicpO1xuICB9XG5cbiAgdGhpcy5jYWxjQ2hpbGRyZW5MZXZlbCgpO1xuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xuICB0aGlzLmNoZWNrRGF0YUhhc0NoaWxkKCk7XG4gIHJldHVybiBjaGlsZFRvUmVtb3ZlO1xufTtcblxuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgZGF0YSkge1xuICB2YXIgaW5kZXg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldLm5vZGVJZCA9PT0gZGF0YSkge1xuICAgICAgaW5kZXggPSBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbmRleDtcbn1cblxuLyogdHJlZSBhZGRvbiovXG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGlyZWN0Q2hpbGQgPSBmdW5jdGlvbihub2RlZGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgcGFyZW50ID0gbnVsbCxcbiAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gbm9kZWRhdGEpIHtcbiAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUocGFyZW50LmNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbGJhY2socGFyZW50KTtcbiAgICBwYXJlbnQgPSBudWxsO1xuICB9XG4gIHJldHVybiBxdWV1ZTtcbn07XG5UcmVlLnByb3RvdHlwZS5hcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdHlsZU9iaiA9IHt9O1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgc3R5bGVPYmpbbm9kZS5ub2RlSWRdID0gbm9kZS50b3RhbG9mZnNldHlsZXZlbDtcbiAgfTtcbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxuICByZXR1cm4gc3R5bGVPYmo7XG59O1xuXG4vKipcbiAqIFt0cmF2ZXJzZURlc2NlbmRhbnRzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W2ludGVnZXJdfSBub2RlRGF0YSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbYXJyYXldfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEZXNjZW5kYW50cyA9IGZ1bmN0aW9uKG5vZGVEYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgaWYgKG5vZGUubm9kZUlkID09PSBub2RlRGF0YSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICBxdWV1ZS5lbnF1ZXVlKHBhcmVudCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB2YXIgZGVzY2VuZGFudHNBcnIgPSBbXTtcblxuICB3aGlsZSAoY3VycmVudFRyZWUpIHtcbiAgICBkZXNjZW5kYW50c0Fyci5wdXNoKGN1cnJlbnRUcmVlKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUoY3VycmVudFRyZWUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGRlc2NlbmRhbnRzQXJyO1xufTtcblxuVHJlZS5wcm90b3R5cGUuY2hlY2tEYXRhSGFzQ2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGUuZGF0YS5oYXNDaGlsZCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IHRydWUgOiBmYWxzZTtcbiAgfTtcbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcbn07XG5cbi8qIGdldCBNYXggbm9kZUlkIGZyb20gdHJlZSAqL1xuVHJlZS5wcm90b3R5cGUubWF4SWQgPSBmdW5jdGlvbigpIHtcbiAgbGV0IG1heE5vZGVJZCA9IDA7XG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlSWQgPiBtYXhOb2RlSWQpIG1heE5vZGVJZCA9IG5vZGUubm9kZUlkO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICByZXR1cm4gbWF4Tm9kZUlkO1xufTtcblxuLyogdHJlZSBkZXB0aCAqL1xuVHJlZS5wcm90b3R5cGUuZGVwdGggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRlcHRoQXJyID0gW107XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBsZXQgZGVwdGggPSAwO1xuICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgd2hpbGUgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIGRlcHRoICs9IDE7XG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgIH1cbiAgICAgIGRlcHRoQXJyLnB1c2goZGVwdGgpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbiAgcmV0dXJuIGRlcHRoQXJyO1xufTtcblxuVHJlZS5wcm90b3R5cGUuZGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICBsZXQgaG9yaU1heCwgdmVydGljYWxNYXgsIGhvcmlBcnIgPSBbXTtcbiAgaG9yaUFyciA9IHRoaXMuZGVwdGgoKTtcbiAgaG9yaU1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhvcmlBcnIpO1xuICB2ZXJ0aWNhbE1heCA9IHRoaXMuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgcmV0dXJuIFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwiLyoqXG4gKiBbUXVldWUgZGVzY3JpcHRpb25dXG4gKiBlbnF1ZXVlKGRhdGEpIGFkZHMgZGF0YSB0byBhIHF1ZXVlLlxuICogZGVxdWV1ZSByZW1vdmVzIHRoZSBvbGRlc3QgYWRkZWQgZGF0YSB0byBhIHF1ZXVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUXVldWUoKSB7XG4gIHRoaXMuX29sZGVzdEluZGV4ID0gMTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXggPSAxO1xuICB0aGlzLl9zdG9yYWdlID0ge307XG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9uZXdlc3RJbmRleCAtIHRoaXMuX29sZGVzdEluZGV4O1xufTtcblxuUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuX3N0b3JhZ2VbdGhpcy5fbmV3ZXN0SW5kZXhdID0gZGF0YTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXgrKztcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRlc3RJbmRleCA9IHRoaXMuX29sZGVzdEluZGV4LFxuICAgICAgbmV3ZXN0SW5kZXggPSB0aGlzLl9uZXdlc3RJbmRleCxcbiAgICAgIGRlbGV0ZWREYXRhO1xuXG4gIGlmIChvbGRlc3RJbmRleCAhPT0gbmV3ZXN0SW5kZXgpIHtcbiAgICBkZWxldGVkRGF0YSA9IHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIGRlbGV0ZSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICB0aGlzLl9vbGRlc3RJbmRleCsrO1xuXG4gICAgcmV0dXJuIGRlbGV0ZWREYXRhO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzIiwiaW1wb3J0IHttZXJnZU9ian0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdEFwaURhdGEodHJlZSwgb3BFbGUpIHtcbiAgbGV0IHBlckFwaUVsZSA9IG9wRWxlLmNsb3Nlc3QoJy5wZXItYXBpJyk7XG4gIC8vIGxldCB0cmVlRWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHJldHVybiBtZXJnZU9iaihjb2xsZWN0SW5mbyhwZXJBcGlFbGUpLCBjb2xsZWN0RGF0YUZyb21UcmVlKHRyZWUpKTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEluZm8ocGVyQXBpRWxlKSB7XG4gIGxldCBpbmZvRWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1pbmZvJylbMF07XG4gIGxldCBNb2Rlc1Jvd0VsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbW9kZXMtcm93JylbMF07XG4gIGxldCBpbmZvRGF0YSA9IHt9O1xuICBpbmZvRGF0YSA9IHtcbiAgICAnc2VjdGlvbic6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlY3Rpb24nKVswXS52YWx1ZSxcbiAgICAndXJpJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUsXG4gICAgJ21ldGhvZCc6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdLnZhbHVlLFxuICAgICdkZXNjcmlwdGlvbic6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWRlc2NyaXB0aW9uJylbMF0udmFsdWUsXG4gICAgJ3dpa2lMaW5rJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktd2lraS1pbnB1dCcpWzBdLnZhbHVlLFxuICAgICdtb2RlJzogZ2V0TW9kZVZhbChNb2Rlc1Jvd0VsZSksXG4gICAgJ2RlYnVnQWRkcic6IGdldERlYnVnQWRkcihNb2Rlc1Jvd0VsZSlcbiAgfTtcblxuICByZXR1cm4gaW5mb0RhdGE7XG59XG5cbmZ1bmN0aW9uIGdldE1vZGVWYWwoTW9kZXNSb3dFbGUpIHtcbiAgdmFyIHJhZGlvcyA9IE1vZGVzUm93RWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tb2RlJyk7XG4gIHZhciBtb2RlVmFsO1xuICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcmFkaW9zLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJhZGlvc1tpXS5jaGVja2VkKSB7XG4gICAgICBtb2RlVmFsID0gcmFkaW9zW2ldLnZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtb2RlVmFsO1xufVxuXG5mdW5jdGlvbiBnZXREZWJ1Z0FkZHIoTW9kZXNSb3dFbGUpIHtcbiAgcmV0dXJuIE1vZGVzUm93RWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGUtZGVidWdnaW5nLWFkZHInKVswXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdFRyZWUodHJlZUVsZSkge1xuXHRsZXQgbGVhdmVzID0gW10uc2xpY2UuY2FsbCh0cmVlRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7IFxuICBsZXQgdHJlZURhdGFBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBsZWFmRGF0YTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYWZEYXRhID0ge307XG4gICAgbGVhZkRhdGEucGFyZW50SWQgPSBsZWF2ZXNbaV0uZGF0YXNldC5wYXJlbnQ7XG4gICAgbGVhZkRhdGEubm9kZUlkID0gbGVhdmVzW2ldLmRhdGFzZXQuaW5kZXg7XG4gICAgbGVhZkRhdGEua2V5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYta2V5JylbMF0udmFsdWU7XG4gICAgbGVhZkRhdGEudmFsdWUgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlO1xuICAgIGxlYWZEYXRhLnF1YW50aXR5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtcXVhbnRpdHknKVswXS52YWx1ZTtcbiAgICB0cmVlRGF0YUFyci5wdXNoKGxlYWZEYXRhKTtcbiAgfTtcbiAgdHJlZURhdGFPYmoubm9kZXMgPSB0cmVlRGF0YUFycjtcbiAgcmV0dXJuIHRyZWVEYXRhT2JqO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RGF0YUZyb21UcmVlKGFwaVRyZWUpIHtcbiAgbGV0IHRyZWUgPSBhcGlUcmVlO1xuICBsZXQgbm9kZXNBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBkaW1lbnNpb25zQXJyID0gW107XG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCBub2RlRGF0YSA9IHt9O1xuICAgIG5vZGVEYXRhLm5vZGVJZCA9IG5vZGUubm9kZUlkO1xuICAgIG5vZGVEYXRhLmNvbHVtbiA9IG5vZGUuY29sdW1uO1xuICAgIG5vZGVEYXRhLnBhcmVudElkID0gbm9kZS5wYXJlbnQgPT09IG51bGwgPyBudWxsIDogbm9kZS5wYXJlbnQubm9kZUlkO1xuICAgIG5vZGVEYXRhLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVubGV2ZWw7XG4gICAgbm9kZURhdGEudG90YWxvZmZzZXR5bGV2ZWwgPSAgbm9kZS50b3RhbG9mZnNldHlsZXZlbDtcbiAgICBub2RlRGF0YS5kYXRhID0gbm9kZS5kYXRhO1xuICAgIG5vZGVEYXRhLmRhdGEuaGFzQ2hpbGQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgbm9kZXNBcnIucHVzaChub2RlRGF0YSk7XG4gIH07XG4gIHRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG4gIGRpbWVuc2lvbnNBcnIgPSB0cmVlLmRpbWVuc2lvbnMoKTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucyA9IHt9O1xuICB0cmVlRGF0YU9iai5kaW1lbnNpb25zLmhVbml0ID0gZGltZW5zaW9uc0FyclswXTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucy52VW5pdCA9IGRpbWVuc2lvbnNBcnJbMV07XG4gIHRyZWVEYXRhT2JqLm5vZGVzID0gbm9kZXNBcnI7XG4gIHJldHVybiB0cmVlRGF0YU9iajtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWVEYXRhQ29sbGVjdC5qcyIsImV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPZkFycmF5KG51bUFycmF5KSB7XG4gIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihjbGFzc05hbWUpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksIHByZWZpeCA9ICcnO1xuICBwcmVmaXggPSAodWEuaW5kZXhPZignY2hyb21lJykgPj0gMCB8fCB3aW5kb3cub3BlbkRhdGFiYXNlKSA/ICctd2Via2l0LScgOiAodWEuaW5kZXhPZignZmlyZWZveCcpID49IDApID8gJy1tb3otJyA6IHdpbmRvdy5vcGVyYSA/ICctby0nIDogKGRvY3VtZW50LmFsbCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPT09IC0xKSA/ICctbXMtJyA6ICcnO1xuICByZXR1cm4gcHJlZml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsKSB7XG4gIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuXG4gIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbiAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcblxuICByZXN1bHRzLnB1c2goMCk7XG4gIHJldHVybiByZXN1bHRzLnNsaWNlKDUsIDgpOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4vLyAgIC8vIGNocm9tZSB3b24ndCB1c2UgcHJlZml4XG4vLyAgIC8vIHZhciBzdHlsZV9hdHRyID0gYnJvd3NlclByZWZpeCgpICsgJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciBzdHlsZV9hdHRyID0gJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZV9hdHRyKTtcbi8vICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuLy8gICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4vLyAgIGlmIChyZXN1bHRzWzFdID09PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuLy8gICByZXN1bHRzLnB1c2goMCk7XG4vLyAgIHJldHVybiArKHJlc3VsdHMuc2xpY2UoNSwgOClbMF0pOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykuc3BsaXQoJ3RyYW5zbGF0ZTNkJylbMV0uc3BsaXQoJywgJylbMF0uc2xpY2UoMSkuc3BsaXQoJ3B4JylbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVZKG9iaikge1xuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSB8fCBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICB2YXIgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICBpZiAobWF0KSByZXR1cm4gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbMTNdKTtcbiAgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgcmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cbi8qKlxuICogW3N0cmluZ2lmeSB3aXRoIDQgc3BhY2VzIGF0IGVhY2ggbGV2ZWxdXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCBcIlxcdFwiKTsgLy8gc3RyaW5naWZ5IHdpdGggdGFicyBpbnNlcnRlZCBhdCBlYWNoIGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWF1dGlmeUpTT04oanNPYmopIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXG4gKiBAcGFyYW0gIHtKU09OIG9iamVjdH0ganNvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaHRsaWdodEpTT04oanNvbikge1xuICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcbiAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICByZXR1cm4ganNvbi5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgdmFyIGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIiwiaW1wb3J0IHtUcmVlfSBmcm9tICcuL3RyZWUnO1xuZXhwb3J0IGZ1bmN0aW9uIGpzb25Ub1RyZWUobm9kZXNBcnIpIHtcbiAgbGV0IGhhc2hUYWJsZSA9IHt9O1xuICBsZXQgdHJlZTtcbiAgZm9yIChsZXQgaSA9IDAsIG5vZGVzTGVuID0gbm9kZXNBcnIubGVuZ3RoOyBpIDwgbm9kZXNMZW47IGkrKykge1xuICAgIGhhc2hUYWJsZVtub2Rlc0FycltpXVsncGFyZW50SWQnXV0gPyBoYXNoVGFibGVbbm9kZXNBcnJbaV1bJ3BhcmVudElkJ11dLnB1c2gobm9kZXNBcnJbaV0pIDogaGFzaFRhYmxlW25vZGVzQXJyW2ldWydwYXJlbnRJZCddXSA9IFtub2Rlc0FycltpXV07XG4gIH1cbiAgLy8gbm9kZSDnmoTlrZDoioLngrnnmoRJROaAu+aYr+Wkp+S6jm5vZGXnmoRJRFxuICBsZXQgbW9kS2V5c0FyciA9IHJlbW92ZUVsZUZyb21BcnIoT2JqZWN0LmtleXMoaGFzaFRhYmxlKSwgJ251bGwnKS5tYXAoTnVtYmVyKS5zb3J0KHNvcnROdW1iZXIpO1xuICBsZXQgcm9vdE5vZGVEYXRhID0gaGFzaFRhYmxlWydudWxsJ11bMF07XG4gIHRyZWUgPSBuZXcgVHJlZShyb290Tm9kZURhdGEpO1xuXG4gIGZvciAobGV0IGogPSAwLCBrZXlzTGVuID0gbW9kS2V5c0Fyci5sZW5ndGg7IGogPCBrZXlzTGVuOyBqKyspIHtcbiAgICBpZiAoaGFzaFRhYmxlLmhhc093blByb3BlcnR5KG1vZEtleXNBcnJbal0pKSB7XG4gICAgICBmb3IgKGxldCBrID0gMCwga2V5QXJyTGVuID0gaGFzaFRhYmxlW21vZEtleXNBcnJbal1dLmxlbmd0aDsgayA8IGtleUFyckxlbjsgaysrKSB7XG4gICAgICAgIHRyZWUuYWRkKGhhc2hUYWJsZVttb2RLZXlzQXJyW2pdXVtrXSwgK21vZEtleXNBcnJbal0sIHRyZWUudHJhdmVyc2VCRik7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cmVlO1xufVxuXG5mdW5jdGlvbiByZW1vdmVFbGVGcm9tQXJyKGFyciwgZWxlKSB7XG4gIHZhciBpbmRleCA9IGFyci5pbmRleE9mKGVsZSk7XG4gIGlmIChpbmRleCA+IC0xKSB7XG4gICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLyogQnkgZGVmYXVsdCB0aGUgc29ydCBtZXRob2Qgc29ydHMgZWxlbWVudHMgYWxwaGFiZXRpY2FsbHkuICovXG5mdW5jdGlvbiBzb3J0TnVtYmVyKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSBiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJlZVRvSnNvbih0cmVlKSB7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvanNvblRyZWVDb252ZXJ0ZXIuanMiLCJleHBvcnQgZnVuY3Rpb24gdHdvV2F5RGF0YUJpbmRpbmcoZGF0YSwgZG9tQ29udGV4dCkge1xuICAvKiBJbnN0YXRpYXRlIGFuIGVtcHR5IGBtb2RlbGAgb2JqZWN0LiAqL1xuICB2YXIgbW9kZWwgPSB7fTtcbiAgLyogSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIG9mIHRoZSBzdXBwbGllZCBgZGF0YWAgb2JqZWN0LiAqL1xuICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIC8qIFN0b3JlIG91ciB2YWx1ZSBpbnNpZGUgdGhlIGBmb3JFYWNoYCBjbG9zdXJlLiAqL1xuICAgIHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIGtleSwge1xuICAgICAgLyogV2Ugd2FudCBvdXIgcHJvcGVydHkgdG8gYXBwZWFyIGluIGBmb3IuLmluYCBsb29wcy4gKi9cbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiBUaGlzIGRvZXNuJ3QgbmVlZCB0byBkbyBtdWNoLCBvbmx5IHJldHVybiB0aGUgYHZhbHVlYCBmcm9tIG91ciBjbG9zdXJlLiAqL1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgLyogT3ZlcndyaXRlIG91ciBjbG9zdXJlcyBgdmFsdWVgIHdpdGggdGhlIG5ldyBgdmFsYC4gKi9cbiAgICAgICAgdmFsdWUgPSB2YWw7XG4gICAgICAgIC8qIFNlbGVjdCBhbGwgbm9kZXMgd2l0aCBgYmluZGAgYW5kIGBtb2RlbGAgYXR0cmlidXRlcy4gKi9cbiAgICAgICAgc2VsZWN0b3JUb0FycmF5KCdbYmluZD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KS5jb25jYXQoc2VsZWN0b3JUb0FycmF5KCdbbW9kZWw9JyArIGtleSArICddJywgZG9tQ29udGV4dCkpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAvKiBJZiBlbGVtZW50IGhhcyBgYmluZGAgYXR0cmlidXRlLCBzZXQgaXQncyBgdGV4dENvbnRlbnRgLiAqL1xuICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JpbmQnKSAmJiAhZWwuaGFzQXR0cmlidXRlKCdiaW5kLXRvZ2dsZS1jbGFzcycpKSBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJykpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndG9nZ2xlLXRydWUnKTsgXG4gICAgICAgICAgICB9ZWxzZSBpZih2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGUtdHJ1ZScpO1xuICAgICAgICAgICAgfWVsc2UgaWYodmFsdWUgJiYgKCcnICsgdmFsdWUpLmxlbmd0aCA+IDAgJiYgIWhhc0FjdGl2ZUVsZShlbEFuZERlc2NlbmRhbnRzKGVsKSkpIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndG9nZ2xlLXRydWUnKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtYXR0ci1ocmVmJykpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogSWYgZWxlbWVudCBoYXMgYG1vZGVsYCBhdHRyaWJ1dGUsIHNldCBpdCdzIGB2YWx1ZWAuICovXG5cbiAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdtb2RlbCcpICYmIGVsICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogU2V0IG91ciBtb2RlbCBvYmplY3RzIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBzYW1lIHZhbHVlLiAqL1xuICAgIG1vZGVsW2tleV0gPSB2YWx1ZTtcbiAgICAvKiBBZGQgY2hhbmdlIGhhbmRsZXJzIHRvIGlucHV0cyBvbiB0aGUgcGFnZS4gKi9cbiAgICBzZWxlY3RvclRvQXJyYXkoJ1ttb2RlbD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAvKiBPdXIgaGFuZGxlciBzaW1wbHkgc2V0cyBvdXIgbW9kZWxzIGBrZXlgIHRvIHRoZSBlbGVtZW50J3MgdmFsdWUuICovXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICBtb2RlbFtrZXldID0gZWwudmFsdWU7XG4gICAgICB9XG4gICAgICAvKiBCaW5kIGEgYGtleXVwYCBoYW5kbGVyIHNvIHdlIGdldCBsaXZlIGZlZWRiYWNrIG9uIGVhY2gga2V5IHByZXNzLiAqL1xuICAgICAgLy8gZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVyKTtcbiAgICAgIC8qIEJpbmQgYSBgY2hhbmdlYCBoYW5kbGVyIHdoaWNoIGlzIGZpcmVkIHdoZW4gdGhlIGVsZW1lbnQgaXMgYmx1cnJlZC4gKi9cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlcik7XG4gICAgfSk7XG4gIH0pO1xuICAvKiBSZXR1cm4gb3VyIG5ldyBtb2RlbCBvYmplY3QuICovXG4gIHJldHVybiBtb2RlbDtcbn1cblxuLyogaW5jbHVkZSBkb21Db250ZXh0IGl0c3NlbGYgKi9cbmZ1bmN0aW9uIHNlbGVjdG9yVG9BcnJheShzZWxlY3RvciwgZG9tQ29udGV4dCkge1xuICBsZXQgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9tQ29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gIGlmIChkb21Db250ZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgYXJyLnB1c2goZG9tQ29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gZWxBbmREZXNjZW5kYW50cyhlbCkge1xuICBsZXQgcmVzdWx0QXJyID0gW107XG4gIChmdW5jdGlvbiBsb29wKGVsZSkge1xuICAgIGxldCBjaGlsZHJlbkVsZXMgPSBlbGUuY2hpbGRyZW47XG4gICAgaWYgKGVsZS5jaGlsZEVsZW1lbnRDb3VudCkge1xuICAgICAgZm9yICh2YXIgaSA9IGNoaWxkcmVuRWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBsb29wKGNoaWxkcmVuRWxlc1tpXSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0QXJyLnB1c2goZWxlKTtcbiAgfSkoZWwpO1xuICByZXR1cm4gcmVzdWx0QXJyO1xufVxuZnVuY3Rpb24gaGFzQWN0aXZlRWxlKGFycikge1xuICBsZXQgYm9sID0gZmFsc2U7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGZvciAodmFyIGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoYm9sID09PSB0cnVlKSBicmVhaztcbiAgICBib2wgPSBhcnJbaV0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGJvbDtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3R3b1dheURhdGFCaW5kaW5nLmpzIiwiaW1wb3J0IHtmbGFzaCwgcGFyc2VBbmRGbGFzaH0gZnJvbSAnLi9mbGFzaCc7XG5leHBvcnQgbGV0IGNhbGxiYWNrcyA9IHtcbiAgZGVsZXRlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGZ1bmN0aW9uIGRlc3RvcnlBcGlMaSgpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZCh0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIH1cbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEsIGRlc3RvcnlBcGlMaS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJpbXBvcnQge3N0clRvRG9tLCBkZWJvdW5jZX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVNjcm9sbFN0cigpIHtcbiAgbGV0IHNjcm9sbFN0ciA9IGBcbiAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtY3RybC1zY3JvbGxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLWF4aXNcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXNsaWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXMtdG9wXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtcy1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1zLWJsb2NrXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG4gIHJldHVybiBzY3JvbGxTdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxCYXJIKGIpIHtcbiAgcmV0dXJuIG5ldyBhKGIpO1xufVxuXG5mdW5jdGlvbiBhKHgpIHtcbiAgdmFyIHEgPSB0aGlzO1xuICB0aGlzLm9wdGlvbnMgPSB4O1xuICBsZXQgbmV3U2Nyb2xsU3RyID0gZ2VuZXJhdGVTY3JvbGxTdHIoKTtcbiAgbGV0IG5ld1Njcm9sbEVsZSA9IHN0clRvRG9tKG5ld1Njcm9sbFN0cik7XG4gIHZhciBZID0geC5zY3JvbGxiYXIgfHwgbmV3U2Nyb2xsRWxlXG4gICAgLCBqID0geC5jb250ZW50XG4gICAgLCBOID0geC5vdmVyZmxvd0VsZVxuICAgICwgaSA9IHguaW5pdFBvcyB8fCAwXG4gICAgLCBNID0geC5pbml0RG9tIHx8IG51bGxcbiAgICAsIFUgPSB4Lm1vdXNld2hlZWwgfHwgdHJ1ZVxuICAgICwgbCA9IHgubW91c2V3aGVlbGxvY2sgfHwgZmFsc2VcbiAgICAsIEggPSB4LndoZWVsZGVsdGEgfHwgMVxuICAgICwgeiA9IHguY3RybGJsb2NrIHx8IDBcbiAgICAsIEogPSB4LnN0ZXAgfHwgMC4xXG4gICAgLCByID0geC5sZW5ndGhcbiAgICAsIEkgPSB4LnNjYWxlIHx8IDBcbiAgICAsIEcgPSB4LnRoZW1lIHx8ICcnXG4gICAgLCBhZCA9IHgucmVmcmVzaCB8fCBmYWxzZTtcbiAgdmFyIFMgPSAwLCBUID0gMCwgaCA9IDAsIFYgPSBmdW5jdGlvbihhZykge1xuICAgIHZhciBhZiA9IHBhcnNlSW50KFMgLSBUKTtcbiAgICBpZiAoYWYgPiAwKSB7XG4gICAgICB2YXIgYWcgPSBhZy52YWx1ZTtcbiAgICAgIGouc2Nyb2xsTGVmdCA9IGFmICogYWc7XG4gICAgfVxuICB9XG4gICxcbiAgICB2ID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLWF4aXMnKVswXSxcbiAgZyA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1zbGlkZXInKVswXSxcbiAgdSA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1zLXRvcCcpWzBdLFxuICBGID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXMtYm90dG9tJylbMF0sXG4gIGFlID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXMtYmxvY2snKVswXSxcbiAgVyA9IDAsIFEgPSB6IHx8IDAsIGsgPSAwLCBSID0gUSwgbSA9IDAsIEMgPSAwLCBMID0gMCwgZCA9IDAsIHQgPSBudWxsICwgYiA9IG51bGwgLCBhYiwgUCwgRDtcbiAgdmFyIHkgPSBmdW5jdGlvbigpIHtcbiAgICBYID0gZmFsc2U7XG4gICAgYyA9IGZhbHNlO1xuICB9XG4gIDtcbiAgaWYgKCF4LnNjcm9sbGJhcikge1xuICAgIHgud3JhcHBlci5hcHBlbmRDaGlsZChuZXdTY3JvbGxFbGUpO1xuICB9XG4gIGouY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1jb250ZW50Jyk7XG4gIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwnKTtcbiAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbihhZykge1xuICAgIGlmICghYWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoRCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBUID0gai5vZmZzZXRXaWR0aDtcbiAgICAgIGggPSBZLm9mZnNldFdpZHRoO1xuICAgICAgUyA9IE4ub2Zmc2V0V2lkdGg7XG4gICAgfSBjYXRjaCAoYWgpIHt9XG4gICAgVyA9IGFnIHx8IHIgfHwgVCAtIDI7XG4gICAgWS5zdHlsZS53aWR0aCA9IFcgKyAncHgnO1xuICAgIHYuc3R5bGUud2lkdGggPSBXICsgJ3B4JztcbiAgICBpZiAoVyA+PSAwICYmIFMgPj0gMCkge1xuICAgICAgaWYgKFMgPD0gVyArIDIpIHtcbiAgICAgICAgWS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgWS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH1cbiAgICAgIGlmIChJICE9IChTIC8gVykpIHtcbiAgICAgICAgSSA9IFMgLyBXO1xuICAgICAgICBvKEkpO1xuICAgICAgICBaKHEubWVtT2Zmc2V0WCk7XG4gICAgICB9XG4gICAgICB2YXIgYWYgPSAwO1xuICAgICAgaWYgKE0pIHtcbiAgICAgICAgaWYgKE0ub2Zmc2V0TGVmdCArIE0uc2Nyb2xsV2lkdGggPj0gUykge1xuICAgICAgICAgIGFmID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoTS5vZmZzZXRMZWZ0ICsgTS5zY3JvbGxXaWR0aCA8PSBUKSB7XG4gICAgICAgICAgICBhZiA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmID0gTS5vZmZzZXRMZWZ0IC8gUztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYWYpO1xuICAgICAgICBaKGFmKTtcbiAgICAgIH1cbiAgICAgIGlmIChpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICBaKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICA7XG4gIEQgPSBzZXRJbnRlcnZhbCh0aGlzLnJlbmRlciwgNTApO1xuICAvLyBZLmlubmVySFRNTCA9ICcnO1xuXG4gIGcub25EcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtc2xpZGVyLWhvdmVyJyk7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICB9KTtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLXNsaWRlci10b3VjaCcpO1xuICAgIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgfSk7XG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci1ob3ZlcicpO1xuICB9KTtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XG4gICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1zbGlkZXItdG91Y2gnKTtcbiAgfSk7XG4gIFkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLXRvdWNoJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICB9KTtcbiAgdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHMpO1xuICBpZiAoVSAmJiAhdGhpcy5vbndoZWVsKSB7XG4gICAgaWYgKCFqLmNsYXNzTGlzdC5jb250YWlucygnb3B1aS1zY3JvbGwtb253aGVlbCcpKSB7XG4gICAgICBqLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcCk7XG4gICAgICBqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBwKTtcbiAgICAgIGouY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtb253aGVlbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaikge1xuICAgIGouYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWQpIHtcbiAgICAgICAgWihqLnNjcm9sbExlZnQgLyAoai5zY3JvbGxXaWR0aCAtIGoub2Zmc2V0V2lkdGgpLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oYWYpIHtcbiAgICB0ID0gZG9jdW1lbnQub25zZWxlY3RzdGFydDtcbiAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIDtcbiAgICBiID0gd2luZG93LnNldEludGVydmFsKG4sIDQwKTtcbiAgICBOLnN0eWxlWyctbW96LXVzZXItc2VsZWN0J10gPSAnbm9uZSc7XG4gICAgTi5zdHlsZVsnLXdlYmtpdC11c2VyLXNlbGVjdCddID0gJ25vbmUnO1xuXG4gICAgTCA9IGFmLmNsaWVudFggLSBnLm9mZnNldExlZnQ7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGFhKTtcbiAgICBkID0gMTtcbiAgICBhZi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIGZ1bmN0aW9uIEsoYWcsIGFoLCBhZikge1xuICAgIGlmIChhZikge1xuICAgICAgYWcgPSBhZyA+IGFmID8gYWYgOiBhZztcbiAgICB9XG4gICAgcmV0dXJuIGFnID49IGFoID8gYWcgOiBhaDtcbiAgfVxuICBmdW5jdGlvbiBuKCkge1xuICAgIFYuY2FsbCh3aW5kb3csIHtcbiAgICAgIHZhbHVlOiBDLFxuICAgICAgc2NhbGU6IElcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBPKCkge1xuICAgIGlmIChhYikge1xuICAgICAgY2xlYXJJbnRlcnZhbChhYik7XG4gICAgfVxuICAgIEUoKTtcbiAgICBhYiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKFgpIHtcbiAgICAgICAgRSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChhYik7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfVxuICBmdW5jdGlvbiBhYygpIHtcbiAgICBpZiAoUCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChQKTtcbiAgICB9XG4gICAgQigpO1xuICAgIFAgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjKSB7XG4gICAgICAgIEIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoUCk7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfVxuICBmdW5jdGlvbiBFKCkge1xuICAgIHZhciBhZiA9IEMgLSBKO1xuICAgIGFmID0gKGFmIDwgMCkgPyAwIDogYWY7XG4gICAgWihhZik7XG4gIH1cbiAgZnVuY3Rpb24gQigpIHtcbiAgICB2YXIgYWYgPSBDICsgSjtcbiAgICBhZiA9IChhZiA+IDEpID8gMSA6IGFmO1xuICAgIFooYWYpO1xuICB9XG4gIGZ1bmN0aW9uIGYoYWYpIHtcbiAgICBhZiA9IHdpbmRvdy5ldmVudCB8fCBhZjtcbiAgICB2YXIgYWcgPSBLKGFmLmNsaWVudFggLSBMLCBSLCBtKTtcbiAgICBDID0gKGFnIC0gUikgLyAobSAtIFIpO1xuICAgIGcuc3R5bGUubGVmdCA9IGFnICsgJ3B4JztcbiAgICBxLm1lbU9mZnNldFggPSBhZztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gYWEoKSB7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICAgIFkuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci1ob3ZlcicpO1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLXRvdWNoJyk7XG4gICAgTi5zdHlsZVsnLW1vei11c2VyLXNlbGVjdCddID0gJyc7XG4gICAgTi5zdHlsZVsnLXdlYmtpdC11c2VyLXNlbGVjdCddID0gJyc7XG4gICAgaWYgKGIpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGIpO1xuICAgIH1cbiAgICBpZiAodCkge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYWEpO1xuICAgIGcuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtc2xpZGVyJyk7XG4gICAgZCA9IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHMoYWYpIHtcbiAgICBaKChhZi5vZmZzZXRYIHx8IGFmLmxheWVyWCkgLyBXKTtcbiAgfVxuICBmdW5jdGlvbiBaKGFoLCBhZikge1xuICAgIGFoID0gYWggPCAwID8gMCA6IGFoO1xuICAgIGFoID0gYWggPiAxID8gMSA6IGFoO1xuICAgIEMgPSBhaDtcbiAgICB2YXIgYWcgPSAobSAtIFIpICogQyArIFI7XG4gICAgZy5zdHlsZS5sZWZ0ID0gYWcgKyAncHgnO1xuICAgIHEubWVtT2Zmc2V0WCA9IGFnO1xuICAgIGlmICghYWYpIHtcbiAgICAgIG4oKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcChhZikge1xuICAgIC8vIGFmLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gYWYgPSBhZi5vcmlnaW5hbEV2ZW50O1xuICAgIC8vIGlmIChhZikge1xuICAgIC8vICAgdGhpcy5vbndoZWVsID0gMTtcbiAgICAvLyAgIHZhciBhaSA9ICgtYWYud2hlZWxEZWx0YSB8fCAoYWYuZGV0YWlsICYmIGFmLmRldGFpbCAqIDQwKSB8fCAwKSAvIEg7XG4gICAgLy8gICB2YXIgYWggPSBhaTtcbiAgICAvLyAgIHZhciBhZyA9IGFoID4gMCA/IGouc2Nyb2xsTGVmdCArIDIgOiBqLnNjcm9sbExlZnQgLSAyO1xuICAgIC8vICAgTi5zdHlsZS56b29tID0gJzEnO1xuICAgIC8vICAgaWYgKGFnID4gMCAmJiAoYWcgPCAoTi5vZmZzZXRXaWR0aCAtIGoub2Zmc2V0V2lkdGggKyA1KSB8fCAoTi5vZmZzZXRXaWR0aCAtIGouc2Nyb2xsV2lkdGggPCAwICYmIGFoIDwgMCkpKSB7XG4gICAgLy8gICAgIGouc2Nyb2xsTGVmdCArPSBhaDtcbiAgICAvLyAgICAgQyA9IGouc2Nyb2xsTGVmdCAvIChqLnNjcm9sbFdpZHRoIC0gai5vZmZzZXRXaWR0aCk7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBpZiAoIWwgfHwgWS5zdHlsZS5kaXNwbGF5ID09ICdub25lJykge1xuICAgIC8vICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ICs9IGFoO1xuICAgIC8vICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArPSBhaDtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuICBmdW5jdGlvbiBvKGFmKSB7XG4gICAgSSA9IChhZiA+IDEwKSA/IDEwIDogYWY7XG4gICAgaWYgKEkgPD0gMSkge1xuICAgICAgZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHZhciBhZyA9IFcgLSAyICogUTtcbiAgICBrID0gcGFyc2VJbnQoYWcgLyBJKTtcbiAgICBrID0gKGsgPCAxNSkgPyAxNSA6IGs7XG4gICAgbSA9IFcgLSBRIC0gaztcbiAgICBnLnN0eWxlLndpZHRoID0gayArICdweCc7XG4gIH1cbiAgaWYgKEkgPiAxKSB7XG4gICAgbyhJKTtcbiAgfVxuICBsZXQgZGVib3VuY2VkV2luZG93UmVzaXplID0gZGVib3VuY2UocmVSZW5kZXIsIDIwMCwgZmFsc2UpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VkV2luZG93UmVzaXplKTtcbiAgZnVuY3Rpb24gcmVSZW5kZXIoKSB7XG4gICAgcS5yZW5kZXIoKTtcbiAgfVxuICB0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodCkge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYWEpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB5KTtcbiAgICBpZiAoYikge1xuICAgICAgY2xlYXJJbnRlcnZhbChiKTtcbiAgICB9XG4gICAgaWYgKGFiKSB7XG4gICAgICBjbGVhckludGVydmFsKGFiKTtcbiAgICB9XG4gICAgaWYgKFApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoUCk7XG4gICAgfVxuICAgIGlmIChEKSB7XG4gICAgICBjbGVhckludGVydmFsKEQpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2Nyb2xsLmpzIiwiaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZjcCgpIHtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2Zpc0NpUGx1Z2lucy5qcyJdLCJzb3VyY2VSb290IjoiIn0=