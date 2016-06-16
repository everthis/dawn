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
	
	(0, _dataLinks.dataLinks)();
	// apiTree();
	// var p = new dawnSVG();
	// p.init(document.getElementById('painter-target'));
	// p.start();
	
	(function () {
	  var routes = {
	    '/': _homepage.home,
	    '/dev': [_apiOperation.initXhr]
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
	  var obj = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
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
	  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
	  var newApiStr = '\n    <div class="api-add-query">\n      <span class="add-api-btn">new API</span>\n      <div class="api-search-wrapper">\n        <input class="api-query" type="search" placeholder="search">\n        <div class="api-search-result hide"></div>\n      </div>\n      <a class="c-hide icon-text-link c-float-right dev-env-settings" href="javascript:;"><span class="icon-text-icon"><svg class="icon icon-settings icon-fit"><use xlink:href="#icon-settings"></use></svg></span><span class="icon-text-text">环境同步数据配置</span></a>\n    </div>\n  ';
	  newApiDiv = (0, _utilities.strToDom)(newApiStr);
	  newApiDiv.getElementsByClassName('add-api-btn')[0].addEventListener('click', debouncedNewApiBtn);
	  newApiDiv.getElementsByClassName('dev-env-settings')[0].addEventListener('click', debouncedEnvBtn);
	  (0, _utilities.insertAfter)(newApiDiv, header);
	  return newApiDiv;
	}
	
	function newApiLiTpl() {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
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
	      var args = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	  var obj1 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
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
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];
	
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
	  var isNewApi = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var apiUUID = (0, _utilities2.generateUUID)();
	  var tpl = '<div class="api-info">\n          <label class="api-label">API:</label>\n          <input class="api-uri" placeholder="" value="" model="uri" /> \n          <label class="api-label">method:</label>\n          <select class="api-method" model="method">\n              <option value="GET">GET</option>\n              <option value="POST">POST</option>\n              <option value="PATCH">PATCH</option>\n              <option value="DELETE">DELETE</option>\n          </select>\n          <label>section:</label>\n          <input class="api-section" type="text" model="section" />\n          <label for="">description:</label>\n          <input class="api-description" type="text" model="description" />\n          <span class="api-save" data-method="' + patchOrPost(isNewApi) + '" data-action="/apis' + saveOrCreate(data, isNewApi) + '" >' + (isNewApi ? 'create' : 'save') + '</span>\n          <span class="api-respond-preview-btn">preview</span>\n          <span class="api-wiki" bind-toggle-class bind="wikiLink">\n            <label class="api-wiki-label">Wiki: </label>\n            <input class="api-wiki-input" type="text" model="wikiLink" />\n          </span>\n      </div>\n      <div class="api-modes-row">\n        <label class="api-mode-label"><input class="api-mode" type="radio" name="' + apiUUID + '-mode" value="0">开发</label>\n        <label class="api-mode-label api-mode-debug"><input class="api-mode" type="radio" name="' + apiUUID + '-mode" value="1">联调<input class="mode-debugging-addr" type="text" /></label>\n        <label class="api-mode-label"><input class="api-mode" type="radio" name="' + apiUUID + '-mode" value="2">线上</label>\n      </div>\n      <div class="api-tree-wrapper">\n        <div class="api-tree-content-wrapper">\n          <div class="api-tree-content">\n            <div class="api-tree-frame">\n              <svg class="api-svg" width="100%" height="100%"></svg>\n            </div>\n            <div class="api-tree"></div>\n          </div>\n        </div>\n      </div>\n      <div class="api-respond-preview">\n          <div class="preview-control-wrapper">\n            <div class="preview-control">\n                <span class="per-preview-type preview-raw">raw</span>\n                <span class="per-preview-type preview-beautify">beautify</span>\n                <span class="per-preview-type preview-highlight">syntaxHighlight</span>\n            </div>\n          </div>\n          <div class="data-view json">\n          </div>\n      </div>';
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
	  var isNewApi = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
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
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2Q0OWI2Mzk1Yzk4MTRlZmU2MDAiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvZ2xvYmFsL2NvbnN0YW50LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdGVtcGxhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zbGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2pzb25UcmVlQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zY3JvbGwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFDQTs7QUFFQTs7QUFDQTs7Ozs7O0FBTUEsRUFBQyxZQUFNO0FB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Y2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNkNDliNjM5NWM5ODE0ZWZlNjAwXG4gKiovIiwiaW1wb3J0IHtkYXRhTGlua3N9IGZyb20gJy4vbW9kdWxlcy9kYXRhTGlua3MnO1xuaW1wb3J0IHtob21lfSBmcm9tICcuL21vZHVsZXMvaG9tZXBhZ2UnO1xuXG5pbXBvcnQge2luaXRYaHJ9IGZyb20gJy4vbW9kdWxlcy9hcGlPcGVyYXRpb24nO1xuZGF0YUxpbmtzKCk7XG4vLyBhcGlUcmVlKCk7XG4vLyB2YXIgcCA9IG5ldyBkYXduU1ZHKCk7XG4vLyBwLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhaW50ZXItdGFyZ2V0JykpO1xuLy8gcC5zdGFydCgpO1xuXG4oKCkgPT4ge1xuICBsZXQgcm91dGVzID0ge1xuICAgICcvJzogaG9tZSxcbiAgICAnL2Rldic6IFtpbml0WGhyXVxuICB9O1xuICBsZXQgcGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChyb3V0ZXMuaGFzT3duUHJvcGVydHkocGF0aE5hbWUpKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyb3V0ZXNbcGF0aE5hbWVdKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuICAgICAgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZXNbcGF0aE5hbWVdW2ldLmFwcGx5KG51bGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmFwcGx5KG51bGwpO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzXG4gKiovIiwiaW1wb3J0IHtoYW5kbGVNZXRob2R9IGZyb20gJy4uL2NvbW1vbi9oYW5kbGVNZXRob2QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0YUxpbmtzKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NEYXRhTGluaywgZmFsc2UpO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0RhdGFMaW5rKGUpIHtcbiAgdmFyIGUgPSB3aW5kb3cuZSB8fCBlO1xuXG4gIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnQScpXG4gICAgICByZXR1cm47XG5cbiAgLy8gRG8gc29tZXRoaW5nXG4gIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0KTtcbiAgfVxuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdQQVRDSCcpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0KTtcbiAgfVxuICAvLyBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdwYXRjaCcpIHtcbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0LCB7XG4gIC8vICAgICBuczogJ2FwaScsXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIHNlY3Rpb246ICd3aXNlJyxcbiAgLy8gICAgICAgaWQ6ICcyJ1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZGF0YUxpbmtzLmpzXG4gKiovIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb24vY3NyZic7XG4vKipcbiAqIFtoYW5kbGVNZXRob2QgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbGluayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSGFuZGxlcyBcImRhdGEtbWV0aG9kXCIgb24gbGlua3Mgc3VjaCBhczpcbiAqIDxhIGhyZWY9XCIvdXNlcnMvNVwiIGRhdGEtbWV0aG9kPVwiZGVsZXRlXCIgcmVsPVwibm9mb2xsb3dcIiBkYXRhLWNvbmZpcm09XCJBcmUgeW91IHN1cmU/XCI+RGVsZXRlPC9hPlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWV0aG9kKGxpbmssIG9iaiA9IHt9KSB7XG4gIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICBtZXRob2QgPSBsaW5rLmRhdGFzZXQubWV0aG9kLFxuICAgIHRhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCksXG4gICAgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICB2YXIgcGFyYW1zT2JqID0ge1xuICAgIGhyZWY6IGhyZWYsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY3NyZlRva2VuOiBjc3JmVG9rZW4sXG4gICAgY3NyZlBhcmFtOiBjc3JmUGFyYW1cbiAgfTtcbiAgdmFyIGZvcm1FbGUgPSBjcmVhdGVGb3JtKHBhcmFtc09iaiwgb2JqKTtcbiAgYXBwZW5kRm9ybVRvRG9tKGZvcm1FbGUpO1xuICBzdWJtaXRGb3JtKGZvcm1FbGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybShwYXJhbXMsIG9iaikge1xuICB2YXIgZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywncG9zdCcpO1xuICBmLnNldEF0dHJpYnV0ZSgnYWN0aW9uJyxwYXJhbXMuaHJlZik7XG4gIGlmIChwYXJhbXMudGFyZ2V0KSB7XG4gICAgZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIHBhcmFtcy50YXJnZXQpO1xuICB9O1xuXG4gIHZhciBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdfbWV0aG9kJyk7XG4gIGkuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLm1ldGhvZCk7XG5cbiAgdmFyIHM7XG4gIGlmIChwYXJhbXMuY3NyZlBhcmFtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5jc3JmVG9rZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgIVJQcy5pc0Nyb3NzRG9tYWluKHBhcmFtcy5ocmVmKSkge1xuICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwYXJhbXMuY3NyZlBhcmFtKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5jc3JmVG9rZW4pO1xuICB9XG4gIGYuYXBwZW5kQ2hpbGQoaSk7XG5cbiAgLy8gZm9yIChsZXQga2V5IGluIG9iai5kYXRhKSB7XG4gIC8vICAgaWYgKG9iai5kYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgLy8gICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgnbmFtZScsJycgKyBvYmoubnMgKyAnWycgKyBrZXkgKyAnXScpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxvYmouZGF0YVtrZXldKTtcbiAgLy8gICAgIGYuYXBwZW5kQ2hpbGQodCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgaWYgKHMpIHtcbiAgICBmLmFwcGVuZENoaWxkKHMpO1xuICB9O1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kRm9ybVRvRG9tKGZvcm0pIHtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdEZvcm0oZm9ybSkge1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qc1xuICoqLyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jc3JmLmpzXG4gKiovIiwiaW1wb3J0IHt0d2VldEJveH0gZnJvbSAnLi90d2VldEJveCc7XG5leHBvcnQgZnVuY3Rpb24gaG9tZSgpIHtcblx0dHdlZXRCb3goKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2hvbWVwYWdlLmpzXG4gKiovIiwiZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoZWwsIDApO1xuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWV0Qm94KCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gIHZhciB0YiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0d2VldC1ib3gnKVswXTtcbiAgaWYgKCF0YikgcmV0dXJuIG51bGw7XG4gIHZhciB0YmQgPSB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XG4gIHZhciB0YmRTdHJpbmcgPSAnPGRpdj48YnI+PC9kaXY+JztcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnY29uZGVuc2VkJyk7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0uaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGgpIHtcblxuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5hZGQoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAodGJkLmlubmVySFRNTCA9PT0gJ1doYXRcXCdzIGhhcHBlbmluZz8nKSB7XG5cbiAgICAgIHRiZC5pbm5lckhUTUwgPSAnPGJyPic7XG4gICAgfVxuICB9KTtcbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5pbm5lckhUTUwpIHtcbiAgICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgICAgfSBlbHNlIHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG5cbiAgICAgIH0sIDApO1xuICAgIH07XG4gIH0pO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9O1xuICAgIGlmICh0Yi5pbm5lckhUTUwgPT09ICc8YnI+Jykge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL3R3ZWV0Qm94LmpzXG4gKiovIiwiaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xuaW1wb3J0IHtyb290QVBJfSBmcm9tICcuLi9nbG9iYWwvY29uc3RhbnQnO1xuaW1wb3J0IHtodG1sfSBmcm9tICcuLi9jb21tb24vdGVtcGxhdGUnO1xuaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmltcG9ydCB7c2xpZGV9IGZyb20gJy4uL2NvbW1vbi9zbGlkZSc7XG5pbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbSwgZGVib3VuY2V9IGZyb20gJy4uL2NvbW1vbi91dGlsaXRpZXMnO1xuaW1wb3J0IHtmbGFzaCwgcGFyc2VBbmRGbGFzaH0gZnJvbSAnLi4vY29tbW9uL2ZsYXNoJztcbmltcG9ydCB7QXBpRG9tfSBmcm9tICcuLi9hcGktdHJlZS90cmVlRG9tJztcbmltcG9ydCB7dHdvV2F5RGF0YUJpbmRpbmd9IGZyb20gJy4uL2NvbW1vbi90d29XYXlEYXRhQmluZGluZyc7XG5cbmxldCBwYXlsb2FkID0ge307XG5sZXQgYXBpc0FyciA9IFtdO1xuXG52YXIgY2FsbGJhY2sgPSB7XG4gIGdldEFwaVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBhZGRBcGlUcmVlKEpTT04ucGFyc2UoZGF0YSksIHRoaXMsIGZhbHNlKTtcbiAgfSxcbiAgZ2V0QWxsQXBpc1N1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgZGF0YUJhayA9IGRhdGE7XG4gICAgbGV0IEpTT05CYWsgPSBKU09OLnBhcnNlKGRhdGFCYWspO1xuICAgIGlmIChKU09OQmFrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV3QXBpQnRuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlbmRlckFsbEFwaXMoZGF0YSk7XG4gICAgYmluZGV2ZW50cygpO1xuICAgIGxpc3RlbkFwaVF1ZXJ5KCk7XG4gIH0sXG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIHBvc3RTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgZGVsZXRlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGZ1bmN0aW9uIGRlc3RvcnlBcGlMaSgpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZCh0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIH1cbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEsIGRlc3RvcnlBcGlMaS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgYXBpUXVlcnlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IHNlYXJjaExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VhcmNoLXJlc3VsdCcpWzBdO1xuICAgIGxldCBkYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICBsZXQgY29udGVudFN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwLCBMZW4gPSBkYXRhT2JqLmxlbmd0aDsgaSA8IExlbjsgaSsrKSB7XG4gICAgICBjb250ZW50U3RyICs9IGA8ZGl2IGNsYXNzPSdwZXItc2VhcmNoLXJlc3VsdCc+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC11cmlcIj4ke2RhdGFPYmpbaV0udXJpfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcmVzdWx0LWNvbHVtbiBwZXItcmVzdWx0LXNlY3Rpb25cIj4ke2RhdGFPYmpbaV0uc2VjdGlvbn08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1tZXRob2RcIj4ke2RhdGFPYmpbaV0ubWV0aG9kfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcmVzdWx0LWNvbHVtbiBwZXItcmVzdWx0LWRlc2NyaXB0aW9uXCI+JHtkYXRhT2JqW2ldLmRlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgIDwvZGl2PmA7XG4gICAgfVxuICAgIHNlYXJjaExpc3QuaW5uZXJIVE1MID0gY29udGVudFN0cjtcbiAgICBkYXRhT2JqLmxlbmd0aCA+IDAgPyBzZWFyY2hMaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSA6IHNlYXJjaExpc3QuY2xhc3NMaXN0LmFkZCgnaGlkZScpOyAgICBcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICghZGF0YS5kYXRhKSB7XG4gICAgICBuZXdBcGlCdG4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0WGhyKCkge1xuICBnZXRBbGxBcGlzKCk7XG59XG5cbmxldCBkZWJvdW5jZWRBcGlRdWVyeUlucHV0ID0gZGVib3VuY2UoYXBpUXVlcnksIDEwMCwgZmFsc2UpO1xuZnVuY3Rpb24gbGlzdGVuQXBpUXVlcnkoKSB7XG4gIGxldCBhcGlRdWVyeUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXF1ZXJ5JylbMF07XG4gIGxldCBpbldyYXBwZXIgPSBmYWxzZTtcbiAgYXBpUXVlcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGRlYm91bmNlZEFwaVF1ZXJ5SW5wdXQpO1xuICBhcGlRdWVyeUlucHV0LnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKCFjaGVja0lmRm9jdXMuYXBwbHkoYXBpUXVlcnlJbnB1dCwgZXYpKSB7XG4gICAgICBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICAgIH07XG4gICAgaW5XcmFwcGVyID0gZmFsc2U7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaW5XcmFwcGVyID0gdHJ1ZTtcbiAgfSk7XG4gIGFwaVF1ZXJ5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKCFpbldyYXBwZXIpIGNsZWFyU2VhcmNoUmVzdWx0KCk7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYXBpUXVlcnkpO1xufVxuZnVuY3Rpb24gY2hlY2tJZkZvY3VzKGV2KSB7XG4gIHJldHVybiB0aGlzID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xufVxuZnVuY3Rpb24gYXBpUXVlcnkoZXYpIHtcbiAgaWYgKGV2LnRhcmdldC52YWx1ZS5sZW5ndGggPD0gMCkge1xuICAgIGNsZWFyU2VhcmNoUmVzdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHBheWxvYWQgPSB7cTogZXYudGFyZ2V0LnZhbHVlfTtcbiAgJGh0dHAod2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvaW5zdGFudHNlYXJjaCcpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suYXBpUXVlcnlTdWNjZXNzLmJpbmQoZXYpKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuZnVuY3Rpb24gY2xlYXJTZWFyY2hSZXN1bHQoKSB7XG4gIGxldCBhcGlTZWFyY2hSZXN1bHRFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VhcmNoLXJlc3VsdCcpWzBdO1xuICBhcGlTZWFyY2hSZXN1bHRFbGUuaW5uZXJIVE1MID0gJyc7XG4gIGFwaVNlYXJjaFJlc3VsdEVsZS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG59XG5mdW5jdGlvbiB0b2dnbGVGb2xkTGkoY29udGV4dCwgZXYpIHtcbiAgaWYgKCFldikge1xuICAgIGNvbnRleHQuY2xhc3NMaXN0LnRvZ2dsZSgndW5mb2xkJyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXBpLWxpLXdpa2knKSkge1xuICAgIGNvbnRleHQuY2xhc3NMaXN0LnRvZ2dsZSgndW5mb2xkJyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbihldikge1xuICB0b2dnbGVGb2xkTGkodGhpcywgZXYpO1xuICBpZiAodGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICByZXR1cm47XG4gIH07XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLnBhcmVudE5vZGUuZGF0YXNldC5hcGlJZClcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5nZXRBcGlTdWNjZXNzLmJpbmQodGhpcy5wYXJlbnROb2RlKSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGJpbmRldmVudHMoKSB7XG4gIGxldCBhcGlMaXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbGktc3VtbWFyeScpO1xuICBbXS5zbGljZS5jYWxsKGFwaUxpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEFwaVRyZWUoZGF0YSA9IHt9LCBjb250YWluZXJOb2RlLCBpc05ld0FwaSkge1xuICBsZXQgbmV3QXBpID0gbmV3IEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSk7XG4gIGFwaXNBcnIucHVzaChuZXdBcGkpO1xufVxuXG5sZXQgZGVib3VuY2VkTmV3QXBpQnRuID0gZGVib3VuY2UocHJvY2Vzc05ld0FwaUNsaWNrLCA1MDAsIHRydWUpO1xubGV0IGRlYm91bmNlZEVudkJ0biA9IGRlYm91bmNlKHByb2Nlc3NPcGVuRW52U2V0dGluZ3MsIDUwMCwgdHJ1ZSk7XG5mdW5jdGlvbiBwcm9jZXNzT3BlbkVudlNldHRpbmdzKGV2LCBlbCkge1xuICBsZXQgcGFyYW1zID0ge1xuICAgIGNvbnRlbnQ6IHNsaWRlQ29udGVudCgpXG4gIH07XG4gIHNsaWRlKGV2LCBwYXJhbXMpO1xufVxuZnVuY3Rpb24gc2xpZGVDb250ZW50KCkge1xuICBsZXQgdHBsU3RyID0gYFxuICAgIDx1bD5cbiAgICAgIDxsaT5cbiAgICAgICAgPGxhYmVsPmhvc3Q6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYy1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPGxhYmVsPmFjY291bnQ6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYy1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgPGxhYmVsPmxhYmVsOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cIlwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cImNoZWNrIGF2YWlsYWJpbGl0eVwiIC8+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIGA7XG4gIHJldHVybiB0cGxTdHI7XG59XG5mdW5jdGlvbiBwcm9jZXNzTmV3QXBpQ2xpY2soKSB7XG4gIGxldCBhcGlVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11bCcpWzBdO1xuICBpZiAoIWFwaVVsKSB7XG4gICAgY3JlYXRlQXBpVWwoKTtcbiAgICBhcGlVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11bCcpWzBdO1xuICB9XG4gIGxldCBiYXNlQXBpTGkgPSBzdHJUb0RvbShuZXdBcGlMaVRwbCgpKTtcbiAgYXBpVWwuaW5zZXJ0QmVmb3JlKGJhc2VBcGlMaSwgYXBpVWwuZmlyc3RDaGlsZCk7XG4gIGFkZEFwaVRyZWUoe30sIGJhc2VBcGlMaSwgdHJ1ZSk7XG4gIHRvZ2dsZUZvbGRMaShiYXNlQXBpTGkuY2hpbGRyZW5bMF0pO1xuICBiYXNlQXBpTGkuY2hpbGRyZW5bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcGlVbCgpIHtcbiAgbGV0IGFwaUxpc3RFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGFwaVVsRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGV0IG5ld0FwaURpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1hZGQtcXVlcnknKVswXTtcbiAgYXBpTGlzdEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwtd3JhcHBlcicpO1xuICBhcGlVbEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwnKTtcbiAgYXBpTGlzdEVsZS5hcHBlbmRDaGlsZChhcGlVbEVsZSk7XG4gIGluc2VydEFmdGVyKGFwaUxpc3RFbGUsIG5ld0FwaURpdik7XG59XG5mdW5jdGlvbiBuZXdBcGlCdG4oKSB7XG4gIGxldCBuZXdBcGlEaXY7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZGVyJylbMF07XG4gIGxldCBuZXdBcGlTdHIgPSBgXG4gICAgPGRpdiBjbGFzcz1cImFwaS1hZGQtcXVlcnlcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiYWRkLWFwaS1idG5cIj5uZXcgQVBJPC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1zZWFyY2gtd3JhcHBlclwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktcXVlcnlcIiB0eXBlPVwic2VhcmNoXCIgcGxhY2Vob2xkZXI9XCJzZWFyY2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFwaS1zZWFyY2gtcmVzdWx0IGhpZGVcIj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGEgY2xhc3M9XCJjLWhpZGUgaWNvbi10ZXh0LWxpbmsgYy1mbG9hdC1yaWdodCBkZXYtZW52LXNldHRpbmdzXCIgaHJlZj1cImphdmFzY3JpcHQ6O1wiPjxzcGFuIGNsYXNzPVwiaWNvbi10ZXh0LWljb25cIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLXNldHRpbmdzIGljb24tZml0XCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tc2V0dGluZ3NcIj48L3VzZT48L3N2Zz48L3NwYW4+PHNwYW4gY2xhc3M9XCJpY29uLXRleHQtdGV4dFwiPueOr+Wig+WQjOatpeaVsOaNrumFjee9rjwvc3Bhbj48L2E+XG4gICAgPC9kaXY+XG4gIGA7XG4gIG5ld0FwaURpdiA9IHN0clRvRG9tKG5ld0FwaVN0cik7XG4gIG5ld0FwaURpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGQtYXBpLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVib3VuY2VkTmV3QXBpQnRuKTtcbiAgbmV3QXBpRGl2LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Rldi1lbnYtc2V0dGluZ3MnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlZEVudkJ0bik7XG4gIGluc2VydEFmdGVyKG5ld0FwaURpdiwgaGVhZGVyKTtcbiAgcmV0dXJuIG5ld0FwaURpdjtcbn1cblxuZnVuY3Rpb24gbmV3QXBpTGlUcGwoZGF0YSA9IHt9KSB7XG4gIHZhciB0cGwgPSBgXG4gICAgPGxpIGNsYXNzPVwiYXBpLWxpXCIgZGF0YS1hcGktaWQ9XCIke2RhdGEuaWQgfHwgbnVsbH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbGktc3VtbWFyeVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1jb2xsYXBzZVwiPjxzdmcgY2xhc3M9XCJpY29uIGljb24tZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLXVyaVwiIGJpbmQ9XCJ1cmlcIj4ke2RhdGEudXJpIHx8ICcoTm8gdXJpKSd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1kZXNcIiBiaW5kPVwiZGVzY3JpcHRpb25cIj4ke2RhdGEuZGVzY3JpcHRpb24gPyBkYXRhLmRlc2NyaXB0aW9uIDogJyhObyBkZXNjcmlwdGlvbiknfTwvc3Bhbj5cbiAgICAgICAgPGEgaHJlZj1cIiR7ZGF0YS53aWtpTGlua31cIiBjbGFzcz1cImFwaS1saS13aWtpXCIgYmluZC1hdHRyLWhyZWY9XCJ3aWtpTGlua1wiIGJpbmQ9XCJ3aWtpTGlua1wiIHRhcmdldD1cIl9ibGFua1wiPiR7ZGF0YS53aWtpTGluayA/IGRhdGEud2lraUxpbmsgOiAnKE5vIHdpa2lMaW5rKSd9PC9hPlxuICAgICAgPC9kaXY+XG4gICAgPC9saT5cbiAgYDtcbiAgcmV0dXJuIHRwbDtcbn1cbmZ1bmN0aW9uIHJlbmRlckFsbEFwaXMoZGF0YSkge1xuICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgY29uc3QgdG1wbCA9IGRhdGEgPT4gaHRtbGBcbiAgICAgIDx1bCBjbGFzcz1cImFwaS11bFwiPlxuICAgICAgJHtkYXRhLm1hcChpdGVtID0+IGh0bWxgXG4gICAgICAgICR7bmV3QXBpTGlUcGwoaXRlbSl9XG4gICAgICBgKX1cbiAgICAgIDwvdWw+XG4gIGA7XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpTGlzdEVsZS5pbm5lckhUTUwgPSB0bXBsKGRhdGEpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlCdG4oKSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbEFwaXMoKSB7XG4gICRodHRwKHJvb3RBUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QWxsQXBpc1N1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9hcGlPcGVyYXRpb24uanNcbiAqKi8iLCIvKipcbi8vIEItPiBIZXJlIHlvdSBkZWZpbmUgaXRzIGZ1bmN0aW9ucyBhbmQgaXRzIHBheWxvYWRcbnZhciBtZG5BUEkgPSAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvc2VhcmNoLmpzb24nO1xudmFyIHBheWxvYWQgPSB7XG4gICd0b3BpYycgOiAnanMnLFxuICAncScgICAgIDogJ1Byb21pc2UnXG59O1xudmFyIGNhbGxiYWNrID0ge1xuICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDEsICdzdWNjZXNzJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH0sXG4gIGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDIsICdlcnJvcicsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9XG59O1xuLy8gRW5kIEJcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbFxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMSkgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzLCBjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMikgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAudGhlbih1bmRlZmluZWQsIGNhbGxiYWNrLmVycm9yKTtcbiAqL1xuLy8gQS0+ICRodHRwIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGluIG9yZGVyIHRvIGZvbGxvdyB0aGUgc3RhbmRhcmQgQWRhcHRlciBwYXR0ZXJuXG5pbXBvcnQge3NlcmlhbGl6ZX0gZnJvbSAnLi9zZXJpYWxpemUnO1xuaW1wb3J0IHtpc0VtcHR5LCBtZXJnZU9iaiwgYWRkUHJlZml4VG9PYmosIHdyYXBPYmp9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi9jc3JmJztcblxuZXhwb3J0IGZ1bmN0aW9uICRodHRwKHVybCkge1xuICAvLyBBIHNtYWxsIGV4YW1wbGUgb2Ygb2JqZWN0XG4gIHZhciBjb3JlID0ge1xuXG4gICAgLy8gTWV0aG9kIHRoYXQgcGVyZm9ybXMgdGhlIGFqYXggcmVxdWVzdFxuICAgIGFqYXg6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhcmdzID0ge30sIHByZWZpeCkge1xuICAgICAgLy8gZm9yIFJhaWxzXG4gICAgICAvLyB1cmwgPSB1cmwgKyAnLmpzb24nO1xuICAgICAgLy8gQ3JlYXRpbmcgYSBwcm9taXNlXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlcyB0aGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdQT1NUJyB8fCBtZXRob2QgPT09ICdQVVQnIHx8IG1ldGhvZCA9PT0gJ1BBVENIJyB8fCBtZXRob2QgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IEpTT04uc3RyaW5naWZ5KGV4dGVuZEdlbmVyYWxQYXJhbXMod3JhcE9iaihhcmdzLCBwcmVmaXgpKSk7XG4gICAgICAgICAgY2xpZW50Lm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgICAgIC8vIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgY2xpZW50LnNlbmQodXJpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IHNlcmlhbGl6ZShleHRlbmRHZW5lcmFsUGFyYW1zKGFkZFByZWZpeFRvT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCArICc/JyArIHVyaSk7XG4gICAgICAgICAgY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbGllbnQub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVzb2x2ZVwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZXF1YWwgdG8gMnh4XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZWplY3RcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGRpZmZlcmVudCB0aGFuIDJ4eFxuICAgICAgICAgICAgcmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgcmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZXR1cm4gdGhlIHByb21pc2VcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgfTtcbiAgLy8gQWRhcHRlciBwYXR0ZXJuXG4gIHJldHVybiB7XG4gICAgJ2dldCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnR0VUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3Bvc3QnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BPU1QnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncHV0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQVVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncGF0Y2gnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BBVENIJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnREVMRVRFJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kR2VuZXJhbFBhcmFtcyhvYmopIHtcbiAgbGV0IGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgbGV0IGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKTtcbiAgbGV0IGdlbmVyYWxPYmogPSB7fTtcbiAgZ2VuZXJhbE9iai51dGY4ID0gJ+Kckyc7XG4gIGdlbmVyYWxPYmouZm9ybWF0ID0gJ2pzb24nO1xuICBnZW5lcmFsT2JqW2NzcmZQYXJhbV0gPSBjc3JmVG9rZW47XG4gIHJldHVybiBtZXJnZU9iaihvYmosIGdlbmVyYWxPYmopO1xufVxuLy8gRW5kIEFcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanNcbiAqKi8iLCIvKipcbiAqIFtzZXJpYWxpemUgY29udmVydHMgcmVjdXJzaXZlIG9iamVjdHNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG9iaiAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHByZWZpeCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBjb25zb2xlLmxvZyhzZXJpYWxpemUoe2ZvbzogXCJoaSB0aGVyZVwiLCBiYXI6IHsgYmxhaDogMTIzLCBxdXV4OiBbMSwgMiwgM10gfX0pKTtcbiAqIGZvbz1oaSUyMHRoZXJlJmJhciU1QmJsYWglNUQ9MTIzJmJhciU1QnF1dXglNUQlNUIwJTVEPTEmYmFyJTVCcXV1eCU1RCU1QjElNUQ9MiZiYXIlNUJxdXV4JTVEJTVCMiU1RD0zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xvbmVPYmoob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuLyogY29uc2lkZXIgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmoob2JqMSA9IHt9LCBvYmoyKSB7XG4gIGxldCBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iajEpKTtcbiAgZm9yIChsZXQga2V5IGluIG9iajIpIHtcbiAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9iajJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcmVmaXhUb09iaihvYmosIHByZWZpeCkge1xuICBpZiAoIXByZWZpeCkgcmV0dXJuIG9iajtcbiAgbGV0IG5ld09iaiA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbJycgKyBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSddID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcE9iaihvYmosIHdyYXBwZXIpIHtcbiAgaWYgKCF3cmFwcGVyKSByZXR1cm4gb2JqO1xuICB2YXIgbmV3T2JqID0ge307XG4gIG5ld09ialt3cmFwcGVyXSA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbd3JhcHBlcl1ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9Eb20oc3RyKSB7XG4gIGxldCB0bXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWxlLmlubmVySFRNTCA9IHN0cjtcbiAgbGV0IHJldHVybkRvbSA9IHRtcEVsZS5jaGlsZHJlblswXTtcbiAgcmV0dXJuIHJldHVybkRvbTtcbn1cbi8qKlxuICogW2luc2VydEFmdGVyIGRlc2NyaXB0aW9uOiBBY2NvcmRpbmcgdG8gTUROIGlmIHRoZSBlbGVtZW50IGlzIGxhc3QgKGFuZCBzbyBuZXh0U2libGluZyBpcyBudWxsKSB0aGUgbmV3Tm9kZSB3aWxsIGJlIGFwcGVuZGVkIGFzIGV4cGVjdGVkXVxuICogQHBhcmFtICB7W3R5cGVdfSBuZXdOb2RlICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXJlbmNlTm9kZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9ICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICByZWZlcmVuY2VOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUubmV4dFNpYmxpbmcpO1xufVxuXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4vLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4vLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbi8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4vKlxudmFyIG15RWZmaWNpZW50Rm4gPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgLy8gQWxsIHRoZSB0YXhpbmcgc3R1ZmYgeW91IGRvXG59LCAyNTApO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbXlFZmZpY2llbnRGbik7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgdmFyIHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmljdE1vZGUoKSB7XG4gIHZhciBpc1N0cmljdCA9IChmdW5jdGlvbigpIHsgcmV0dXJuICF0aGlzOyB9KSgpO1xuICByZXR1cm4gaXNTdHJpY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7XG4gIHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcbiAgICBsZXQgciA9IE1hdGgucmFuZG9tKCkgKiAxNiB8IDAsIHYgPSBjID09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCk7XG4gICAgcmV0dXJuIHYudG9TdHJpbmcoMTYpO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanNcbiAqKi8iLCJleHBvcnQgY29uc3Qgcm9vdEFQSSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXMnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2dsb2JhbC9jb25zdGFudC5qc1xuICoqLyIsImltcG9ydCB7aHRtbEVzY2FwZX0gZnJvbSAnLi9odG1sRXNjYXBlJztcbmV4cG9ydCBmdW5jdGlvbiBodG1sKGxpdGVyYWxTZWN0aW9ucywgLi4uc3Vic3RzKSB7XG4gIC8vIFVzZSByYXcgbGl0ZXJhbCBzZWN0aW9uczogd2UgZG9u4oCZdCB3YW50XG4gIC8vIGJhY2tzbGFzaGVzIChcXG4gZXRjLikgdG8gYmUgaW50ZXJwcmV0ZWRcbiAgbGV0IHJhdyA9IGxpdGVyYWxTZWN0aW9ucy5yYXc7XG5cbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIHN1YnN0cy5mb3JFYWNoKChzdWJzdCwgaSkgPT4ge1xuICAgIC8vIFJldHJpZXZlIHRoZSBsaXRlcmFsIHNlY3Rpb24gcHJlY2VkaW5nXG4gICAgLy8gdGhlIGN1cnJlbnQgc3Vic3RpdHV0aW9uXG4gICAgbGV0IGxpdCA9IHJhd1tpXTtcblxuICAgIC8vIEluIHRoZSBleGFtcGxlLCBtYXAoKSByZXR1cm5zIGFuIGFycmF5OlxuICAgIC8vIElmIHN1YnN0aXR1dGlvbiBpcyBhbiBhcnJheSAoYW5kIG5vdCBhIHN0cmluZyksXG4gICAgLy8gd2UgdHVybiBpdCBpbnRvIGEgc3RyaW5nXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3QpKSB7XG4gICAgICBzdWJzdCA9IHN1YnN0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBzdWJzdGl0dXRpb24gaXMgcHJlY2VkZWQgYnkgYSBkb2xsYXIgc2lnbixcbiAgICAvLyB3ZSBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGl0XG4gICAgaWYgKGxpdC5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICBzdWJzdCA9IGh0bWxFc2NhcGUoc3Vic3QpO1xuICAgICAgbGl0ID0gbGl0LnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmVzdWx0ICs9IGxpdDtcbiAgICByZXN1bHQgKz0gc3Vic3Q7XG4gIH0pO1xuICAvLyBUYWtlIGNhcmUgb2YgbGFzdCBsaXRlcmFsIHNlY3Rpb25cbiAgLy8gKE5ldmVyIGZhaWxzLCBiZWNhdXNlIGFuIGVtcHR5IHRlbXBsYXRlIHN0cmluZ1xuICAvLyBwcm9kdWNlcyBvbmUgbGl0ZXJhbCBzZWN0aW9uLCBhbiBlbXB0eSBzdHJpbmcpXG4gIHJlc3VsdCArPSByYXdbcmF3Lmxlbmd0aCAtIDFdOyAvLyAoQSlcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGh0bWxFc2NhcGUoc3RyKSB7XG5cdHN0ciA9ICcnICsgc3RyOyAvLyBmb3IgbnVtYmVycyBldGMuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvJi9nLCAnJmFtcDsnKSAvLyBmaXJzdCFcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvYC9nLCAnJiM5NjsnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzXG4gKiovIiwiaW1wb3J0IHtkaXNhYmxlU2Nyb2xsLCBlbmFibGVTY3JvbGx9IGZyb20gJy4vdG9nZ2xlU2Nyb2xsJztcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cChldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgcG9wdXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcG9wdXBFbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtbGF5ZXInKTtcbiAgcG9wdXBFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVQb3B1cFRwbCgpO1xuICBwb3NpdGlvblBvcHVwRWxlKHBvcHVwRWxlLCBldik7XG4gIGJpbmRQb3B1cEV2ZW50cyhwb3B1cEVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwRWxlKTtcbiAgZGlzYWJsZVNjcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBvcHVwVHBsKGRhdGEpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtdGV4dFwiPkFyZSB5b3Ugc3VyZSB0byBkZWxldGUgdGhpcyBBUEk/PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRQb3B1cEV2ZW50cyhlbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jYW5jZWwtYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLXNoYWRvdycpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Qb3B1cEVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5jbGllbnRYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMuY2xpZW50WSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2KSB7XG4gIGlmIChldi50YXJnZXQgIT09IGV2LmN1cnJlbnRUYXJnZXQpIHJldHVybjtcbiAgbGV0IHBvcExheWVyID0gZXYudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cC1sYXllcicpO1xuICBpZiAocG9wTGF5ZXIpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcExheWVyKTtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzXG4gKiovIiwiLy8gbGVmdDogMzcsIHVwOiAzOCwgcmlnaHQ6IDM5LCBkb3duOiA0MCxcbi8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxudmFyIGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgaWYgKGUucHJldmVudERlZmF1bHQpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKGUpIHtcbiAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSAvLyBvbGRlciBGRlxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ud2hlZWwgPSBwcmV2ZW50RGVmYXVsdDsgLy8gbW9kZXJuIHN0YW5kYXJkXG4gIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBwcmV2ZW50RGVmYXVsdDsgLy8gb2xkZXIgYnJvd3NlcnMsIElFXG4gIHdpbmRvdy5vbnRvdWNobW92ZSAgPSBwcmV2ZW50RGVmYXVsdDsgLy8gbW9iaWxlXG4gIGRvY3VtZW50Lm9ua2V5ZG93biAgPSBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBudWxsO1xuICB3aW5kb3cub253aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbnRvdWNobW92ZSA9IG51bGw7XG4gIGRvY3VtZW50Lm9ua2V5ZG93biA9IG51bGw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzXG4gKiovIiwiaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmV4cG9ydCBmdW5jdGlvbiBzbGlkZShldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgc2xpZGVFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2xpZGVFbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGUtbGF5ZXInKTtcbiAgc2xpZGVFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVTbGlkZVRwbChwYXJhbXMuY29udGVudCk7XG4gIHBvc2l0aW9uU2xpZGVFbGUoc2xpZGVFbGUsIGV2KTtcbiAgYmluZFNsaWRlRXZlbnRzKHNsaWRlRWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVFbGUpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNsaWRlVHBsKGNvbnRlbnQpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2xpZGUtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwic2xpZGUtdGV4dFwiPiR7Y29udGVudH08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInNsaWRlLWJ0bnNcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInNsaWRlLWJ0biBzbGlkZS1jYW5jZWwtYnRuXCI+Y2FuY2VsPC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwic2xpZGUtYnRuIHNsaWRlLWNvbmZpcm0tYnRuXCI+Y29uZmlybTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxuZnVuY3Rpb24gYmluZFNsaWRlRXZlbnRzKGVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlLWNhbmNlbC1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlU2xpZGUpO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGUtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1NoYWRvdyk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25TbGlkZUVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIC8vIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5jbGllbnRYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMuY2xpZW50WSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbGlja1NoYWRvdyhldikge1xuICBpZiAoZXYudGFyZ2V0ICE9PSBldi5jdXJyZW50VGFyZ2V0KSByZXR1cm47XG4gIHBvcHVwKGV2LCB1bmRlZmluZWQsIGNsb3NlU2xpZGUuYmluZCh0aGlzLCBldikpO1xufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlKGV2KSB7XG4gIGxldCBwb3BMYXllciA9IGV2LnRhcmdldC5jbG9zZXN0KCcuc2xpZGUtbGF5ZXInKTtcbiAgaWYgKHBvcExheWVyKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3BMYXllcik7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zbGlkZS5qc1xuICoqLyIsImltcG9ydCB7aW5zZXJ0QWZ0ZXIsIHN0clRvRG9tfSBmcm9tICcuL3V0aWxpdGllcyc7XG5leHBvcnQgZnVuY3Rpb24gZmxhc2goZGF0YSwgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9KSB7XG4gIGxldCBmbGFzaEVsZSA9IHN0clRvRG9tKGZsYXNoVHBsKGRhdGEpKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmbGFzaEVsZSk7XG4gIHNldFRpbWVvdXQoZGVzdG9yeS5iaW5kKG51bGwsIGZsYXNoRWxlLCBjYWxsYmFjayksIDIwMDApO1xufVxuXG5mdW5jdGlvbiBmbGFzaFRwbChkYXRhKSB7XG4gIGxldCBzdHIgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImZsYXNoLWxheWVyICR7ZGF0YS5lcnJvciA/ICdlcnJvcicgOiAnc3VjY2Vzcyd9XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPiR7ZGF0YS5lcnJvciB8fCBkYXRhLm1lc3NhZ2V9PC9kaXY+XG5cdFx0PC9kaXY+XG5cdGAgIDtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gZGVzdG9yeShlbGUsIGNhbGxiYWNrKSB7XG4gIGVsZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBmdW5jdGlvbigpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG4gIH0pO1xuICBlbGUuY2xhc3NMaXN0LmFkZCgnYmxpbmsnKTtcbiAgY2FsbGJhY2soKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQW5kRmxhc2goZGF0YSwgY2FsbGJhY2spIHtcbiAgbGV0IGpzb25EYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgZmxhc2goanNvbkRhdGEsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGpzb25EYXRhO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9mbGFzaC5qc1xuICoqLyIsIi8qKlxuICogd2lkdGggb2Ygc2luZ2xlIHN2ZyBwYXRoOiAzMHB4XG4gKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge3Jvb3RBUEl9IGZyb20gJy4uL2dsb2JhbC9jb25zdGFudCc7XG5pbXBvcnQge2ZsYXNoLCBwYXJzZUFuZEZsYXNofSBmcm9tICcuLi9jb21tb24vZmxhc2gnO1xuaW1wb3J0IHtjb2xsZWN0QXBpRGF0YX0gZnJvbSAnLi90cmVlRGF0YUNvbGxlY3QnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGVYLCB4aHIsIGJlYXV0aWZ5SlNPTiwgaGlnaHRsaWdodEpTT059IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7anNvblRvVHJlZX0gZnJvbSAnLi9qc29uVHJlZUNvbnZlcnRlcic7XG5pbXBvcnQge3R3b1dheURhdGFCaW5kaW5nfSBmcm9tICcuLi9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcnO1xuaW1wb3J0IHtjYWxsYmFja3N9IGZyb20gJy4uL2NvbW1vbi9jYWxsYmFja3MnO1xuaW1wb3J0IHtzY3JvbGxCYXJIfSBmcm9tICcuLi9jb21tb24vc2Nyb2xsJztcbmltcG9ydCB7Z2VuZXJhdGVVVUlEfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcblxuZnVuY3Rpb24gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpID0gZmFsc2UpIHtcbiAgbGV0IGFwaVVVSUQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgbGV0IHRwbCA9XG4gICAgICBgPGRpdiBjbGFzcz1cImFwaS1pbmZvXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+QVBJOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXVyaVwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJcIiBtb2RlbD1cInVyaVwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCIgbW9kZWw9XCJtZXRob2RcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkdFVFwiPkdFVDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUE9TVFwiPlBPU1Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBBVENIXCI+UEFUQ0g8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRFTEVURVwiPkRFTEVURTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxsYWJlbD5zZWN0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiB0eXBlPVwidGV4dFwiIG1vZGVsPVwic2VjdGlvblwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPmRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLWRlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiBtb2RlbD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCIgZGF0YS1tZXRob2Q9XCIke3BhdGNoT3JQb3N0KGlzTmV3QXBpKX1cIiBkYXRhLWFjdGlvbj1cIi9hcGlzJHtzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpfVwiID4ke2lzTmV3QXBpID8gJ2NyZWF0ZScgOiAnc2F2ZSd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXJlc3BvbmQtcHJldmlldy1idG5cIj5wcmV2aWV3PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXdpa2lcIiBiaW5kLXRvZ2dsZS1jbGFzcyBiaW5kPVwid2lraUxpbmtcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS13aWtpLWxhYmVsXCI+V2lraTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS13aWtpLWlucHV0XCIgdHlwZT1cInRleHRcIiBtb2RlbD1cIndpa2lMaW5rXCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbW9kZXMtcm93XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIwXCI+5byA5Y+RPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLW1vZGUtbGFiZWwgYXBpLW1vZGUtZGVidWdcIj48aW5wdXQgY2xhc3M9XCJhcGktbW9kZVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCIke2FwaVVVSUR9LW1vZGVcIiB2YWx1ZT1cIjFcIj7ogZTosIM8aW5wdXQgY2xhc3M9XCJtb2RlLWRlYnVnZ2luZy1hZGRyXCIgdHlwZT1cInRleHRcIiAvPjwvbGFiZWw+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIyXCI+57q/5LiKPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtZnJhbWVcIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1yZXNwb25kLXByZXZpZXdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250cm9sLXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3LWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcHJldmlldy10eXBlIHByZXZpZXctYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1oaWdobGlnaHRcIj5zeW50YXhIaWdobGlnaHQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3IGpzb25cIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGxlYWZUcGwoKSB7XG4gIGxldCBsZWFmQ29udGVudFRwbCA9IGBcbiAgICA8aSBjbGFzcz1cInJlbW92ZS1jaGlsZFwiPi08L2k+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLWtleVwiIHBsYWNlaG9sZGVyPVwia2V5XCIgbW9kZWw9XCJkYXRhTmFtZVwiIC8+XG4gICAgPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgbW9kZWw9XCJkYXRhVmFsdWVcIiAvPlxuICAgIDxzZWxlY3QgY2xhc3M9XCJsZWFmLXZhbHVlLXR5cGVcIiBtb2RlbD1cImRhdGFUeXBlXCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdHJpbmdcIj5TdHJpbmc8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkludGVnZXJcIj5JbnRlZ2VyPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJGbG9hdFwiPkZsb2F0PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCb29sZWFuXCI+Qm9vbGVhbjwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQXJyYXlcIj5BcnJheTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGFzaFwiPkhhc2g8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJlZ2V4XCI+UmVnZXgoc3RyaW5nKTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRml4ZWRcIj5GaXhlZChzdHJpbmcpPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJOdWxsXCI+TnVsbDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICAgIDxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+XG4gICAgPGkgY2xhc3M9XCJhZGQtY2hpbGRcIj4rPC9pPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1xdWFudGl0eVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiBtb2RlbD1cImRhdGFRdWFudGl0eVwiIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJsZWFmLWhpZGUtcXVhbnRpdHlcIj48L3NwYW4+XG4gIGA7XG4gIHJldHVybiBsZWFmQ29udGVudFRwbDtcbn1cblxuLyogZGVmYXVsdCBnZXRCb3VuZGluZ1JlY3RPYmogKi9cbmxldCBpbml0UmVjdE9iaiA9IHtcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgbGVmdDogMCxcbiAgdG9wOiAwLFxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwXG59O1xuXG5sZXQgbGVhZkRhdGFQbGFjZUhvbGRlciA9IHtcbiAgZGF0YU5hbWU6ICcnLFxuICBkYXRhVHlwZTogJ1N0cmluZycsXG4gIGRhdGFWYWx1ZTogJycsXG4gIGRhdGFRdWFudGl0eTogJzEnLFxuICBoYXNDaGlsZDogZmFsc2Vcbn07XG5cbi8qXG5zaW5nbGUgbGVhZiB3aWR0aDogNDYwcHg7XG4gKi9cbmNvbnN0IHBlckxlYWZXaWR0aCA9IDQ2MDtcbmNvbnN0IHBlckxlYWZIZWlnaHQgPSAyMjtcbmNvbnN0IGxlYXZlc1ZlcnRpY2FsR2FwID0gMzA7XG5jb25zdCBwZXJTVkdQYXRoV2lkdGggPSAzMDtcbnZhciByb290Tm9kZVdpZHRoID0gcGVyU1ZHUGF0aFdpZHRoICsgMTQ7XG52YXIgY2FsbGJhY2sgPSB7XG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuYXBpUmF3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5hcGlEYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKS5kYXRhO1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIHBvc3RTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5hcGlSYXdEYXRhID0gZGF0YTtcbiAgICB0aGlzLmFwaURhdGFPYmogPSBKU09OLnBhcnNlKGRhdGEpLmRhdGE7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgICB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdLnRleHRDb250ZW50ID0gJ3NhdmUnO1xuICAgIHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zYXZlJylbMF0uZGF0YXNldC5tZXRob2QgPSAnUEFUQ0gnO1xuICB9LFxuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgYXBpUmVzcG9uZFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQganNvbk9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgdGhpcy5wcmV2aWV3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5wcmV2aWV3RGF0YU9iaiA9IGpzb25PYmo7XG4gICAgc3dpdGNoUHJldmlldyh0aGlzLnByZXZpZXdEYXRhT2JqLCBoaWdodGxpZ2h0SlNPTiwgdGhpcy5ldmVudENvbnRleHQsICdoaWdobGlnaHQnKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcGF0Y2hPclBvc3QoaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJ1BPU1QnIDogJ1BBVENIJztcbn1cblxuZnVuY3Rpb24gc2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICcnIDogYC8ke2RhdGEuaWR9YDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGVyQXBpKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHZhciBwZXJBcGlFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGVyQXBpRWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGVyLWFwaScpO1xuICBwZXJBcGlFbGUuZGF0YXNldC5pZCA9IGlzTmV3QXBpID8gJycgOiBkYXRhLmlkO1xuICBwZXJBcGlFbGUuaW5uZXJIVE1MID0gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpKTtcbiAgcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSA9IGlzTmV3QXBpID8gJycgOiBkYXRhLnVyaTtcbiAgcmV0dXJuIHBlckFwaUVsZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU5ld0FwaUluaXREYXRhKCkge1xuICBsZXQgaW5pdERhdGEgPSB7XG4gICAgbm9kZUlkOiAwLFxuICAgIHBhcmVudElkOiBudWxsLFxuICAgIGRhdGE6IGxlYWZEYXRhUGxhY2VIb2xkZXJcbiAgfTtcbiAgbGV0IGZpcnN0Q2hpbGREYXRhID0ge1xuICAgIG5vZGVJZDogMSxcbiAgICBwYXJlbnRJZDogMCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIHJldHVybiB7XG4gICAgbW9kZTogJzAnLFxuICAgIGRlYnVnQWRkcjogJycsXG4gICAgbm9kZXM6IFtpbml0RGF0YSwgZmlyc3RDaGlsZERhdGFdXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBpZiAoaXNOZXdBcGkpIHtcbiAgICBkYXRhID0gY3JlYXRlTmV3QXBpSW5pdERhdGEoKTtcbiAgfVxuICB0aGlzLmFwaURhdGFPYmogPSBkYXRhO1xuICB0aGlzLmFwaUNvbnRhaW5lciA9IGNvbnRhaW5lck5vZGU7XG4gIGxldCBwZXJBcGlFbGUgPSBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpO1xuICB0aGlzLmFwaUNvbnRhaW5lci5hcHBlbmRDaGlsZChwZXJBcGlFbGUpO1xuXG4gIGxldCBhcGlCaW5kRGF0YSA9IHR3b1dheURhdGFCaW5kaW5nKGRhdGEsIHRoaXMuYXBpQ29udGFpbmVyKTtcbiAgZGF0YSA9IGFwaUJpbmREYXRhO1xuXG4gIHRoaXMuYXBpRWxlID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLWFwaScpWzBdO1xuXG4gIHRoaXMubGVhZkluZGV4ID0gMTtcblxuICB0aGlzLiRhcGlUcmVlID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtZnJhbWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZUNvbnRlbnQgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50JylbMF07XG4gIC8vIGlmIChpc05ld0FwaSkge1xuICAvLyAgIHRoaXMuaW5pdEFwaVRyZWUoKTtcbiAgLy8gICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIC8vIH0gZWxzZSB7XG4gIHRoaXMucmVuZGVyRXhpc3RUcmVlKGRhdGEpO1xuICAvLyB9XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG5cbiAgdGhpcy5hcGlFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kRXZlbnQuYmluZCh0aGlzKSk7XG4gIHRoaXMuc2V0TW9kZVZhbChkYXRhLm1vZGUpO1xuICB0aGlzLnNldERlYnVnQWRkcihkYXRhLmRlYnVnQWRkcik7XG4gIHRoaXMuc2Nyb2xsQmFyID0gc2Nyb2xsQmFySCh7XG4gICAgd3JhcHBlcjogdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtd3JhcHBlcicpWzBdLFxuICAgIGNvbnRlbnQ6IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWNvbnRlbnQtd3JhcHBlcicpWzBdLFxuICAgIG92ZXJmbG93RWxlOiB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50JylbMF1cbiAgfSk7XG59XG5cbkFwaURvbS5wcm90b3R5cGUucmVuZGVyRXhpc3RUcmVlID0gZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBsZXQgcGVyVFdEQkFyciA9IFtdO1xuICBpZiAoZGF0YS5ub2RlcyAmJiBkYXRhLm5vZGVzLmxlbmd0aCkge1xuICAgIGxldCBub2Rlc0FyciA9IGRhdGEubm9kZXM7XG4gICAgbGV0IG5vZGVEYXRhID0ge307XG4gICAgbGV0IGxlYWY7XG4gICAgbGV0IGxlYWZEYXRhID0ge307XG4gICAgbGV0IHBlclRXREI7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGVzQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZWFmID0gdW5kZWZpbmVkO1xuICAgICAgbGVhZiA9IGdlbmVyYXRlTGVhZihkYXRhLm5vZGVzW2ldKTtcbiAgICAgIGlmIChkYXRhLm5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLm5vZGVzW2ldLmRhdGEgPT09IFwiXCIpIHtcbiAgICAgICAgZGF0YS5ub2Rlc1tpXS5kYXRhID0gbGVhZkRhdGFQbGFjZUhvbGRlcjtcbiAgICAgIH07XG4gICAgICBpZiAoZGF0YS5ub2Rlc1tpXS5wYXJlbnRJZCA9PT0gbnVsbCB8fCBkYXRhLm5vZGVzW2ldLnBhcmVudElkID09PSAnbnVsbCcpIGxlYWYuY2xhc3NMaXN0LmFkZCgncm9vdC1sZWFmJyk7XG4gICAgICBwZXJUV0RCID0gdHdvV2F5RGF0YUJpbmRpbmcoZGF0YS5ub2Rlc1tpXS5kYXRhLCBsZWFmKTtcbiAgICAgIGRhdGEubm9kZXNbaV0uZGF0YSA9IHBlclRXREI7XG4gICAgICBwZXJUV0RCQXJyLnB1c2gocGVyVFdEQik7XG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGxlYWYpO1xuICAgIH1cbiAgICB0aGlzLmxlYWZJbmRleCArPSAobGVuIC0gMik7XG4gIH1cbiAgdGhpcy5hcGlUcmVlID0ganNvblRvVHJlZShkYXRhLm5vZGVzKTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcbiAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICB0aGlzLmRyYXdTVkcoKTtcbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmKG5vZGVEYXRhKSB7XG4gIHZhciBuZXdMZWFmU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZWFmJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnYmluZCcsICdoYXNDaGlsZCcpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJywgJycpO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0LnBhcmVudElkID0gbm9kZURhdGEucGFyZW50SWQ7XG4gIG5ld0xlYWZTcGFuLmRhdGFzZXQubm9kZUlkID0gbm9kZURhdGEubm9kZUlkO1xuICBuZXdMZWFmU3Bhbi5pbm5lckhUTUwgPSBsZWFmVHBsKCk7XG4gIG5ld0xlYWZTcGFuLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKHBlckxlYWZXaWR0aCArIHBlclNWR1BhdGhXaWR0aCkgKiAobm9kZURhdGEuY29sdW1uIC0gMSkpICsgJ3B4LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQobm9kZURhdGEudG90YWxvZmZzZXR5bGV2ZWwgKiAocGVyTGVhZkhlaWdodCArIGxlYXZlc1ZlcnRpY2FsR2FwKSkgKyAncHgsIDApJztcbiAgcmV0dXJuIG5ld0xlYWZTcGFuO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zZXREZWJ1Z0FkZHIgPSBmdW5jdGlvbih2YWwpIHtcbiAgdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZS1kZWJ1Z2dpbmctYWRkcicpWzBdLnZhbHVlID0gdmFsO1xufTtcbkFwaURvbS5wcm90b3R5cGUuc2V0TW9kZVZhbCA9IGZ1bmN0aW9uKHZhbCkge1xuICB2YXIgcmFkaW9zID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1vZGUnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHJhZGlvcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICh2YWwgPT09IHJhZGlvc1tpXS52YWx1ZSkge1xuICAgICAgcmFkaW9zW2ldLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhZGlvc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gYmluZEV2ZW50KGV2KSB7XG4gIC8qIF8kdGhpcyBpcyBBcGlEb20sIHdoaWxlIHRoaXMgaXMgaXRzIHdyYXBwZXIob2JqZWN0KS4gKi9cbiAgbGV0IF90aGlzID0gdGhpcztcbiAgbGV0IGV2VGFyZ2V0Q2xhc3NMaXN0ID0gZXYudGFyZ2V0LmNsYXNzTGlzdDtcbiAgbGV0IGV2ZW50Q29udGV4dCA9IHtfZXY6IGV2LCBkb21Db250YWluZXI6IGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJyl9O1xuICB0aGlzLmV2ZW50Q29udGV4dCA9IGV2ZW50Q29udGV4dDtcbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktc2F2ZScpKSB7XG4gICAgbGV0IHBhcmFtcyA9IGNvbGxlY3RBcGlEYXRhKF90aGlzLmFwaVRyZWUsIF90aGlzLiRhcGlUcmVlKTtcbiAgICBpZiAodGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5hcGlEYXRhT2JqLmlkKVxuICAgICAgLnBhdGNoKHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wYXRjaFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfSBlbHNlIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICAkaHR0cChyb290QVBJKVxuICAgICAgLnBvc3QocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnBvc3RTdWNjZXNzLmJpbmQodGhpcykpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1jaGlsZCcpKSB7XG4gICAgX3RoaXMuYWRkQ2hpbGQoZXYpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLWNoaWxkJykpIHtcbiAgICBpZiAoZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb290LWxlYWYnKSkge1xuICAgICAgcG9wdXAoZXYsIHt9LCBkZWxldGVBcGkuYmluZChfdGhpcywgZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXMuZGVsTm9kZShldik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXJlc3BvbmQtcHJldmlldy1idG4nKSkge1xuICAgIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICBmbGFzaCh7ZXJyb3I6ICdTYXZlIGZpcnN0Lid9KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgbGV0IHBhcmFtcyA9IHtkYXduX3VyaTogdGhpcy5hcGlEYXRhT2JqLnVyaX07XG4gICAgbGV0IGNvbnRleHQgPSB7fTtcbiAgICAkaHR0cCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGlyZXNwb25zZScpXG4gICAgLmdldChwYXJhbXMpXG4gICAgLnRoZW4oY2FsbGJhY2suYXBpUmVzcG9uZFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXdpa2ktbGFiZWwnKSkge1xuICAgIGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLXdpa2knKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUtdHJ1ZScpO1xuICB9XG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1yYXcnKSkge1xuICAgIHJldHVybiBzd2l0Y2hQcmV2aWV3KHRoaXMucHJldmlld0RhdGFPYmosIEpTT04uc3RyaW5naWZ5LCB0aGlzLmV2ZW50Q29udGV4dCwgJ3JhdycpO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1iZWF1dGlmeScpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgYmVhdXRpZnlKU09OLCB0aGlzLmV2ZW50Q29udGV4dCwgJ2JlYXV0aWZ5Jyk7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2aWV3LWhpZ2hsaWdodCcpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgaGlnaHRsaWdodEpTT04sIHRoaXMuZXZlbnRDb250ZXh0LCAnaGlnaGxpZ2h0Jyk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gc3dpdGNoUHJldmlldyhkYXRhT2JqLCBmbiwgcHJldmlld0NvbnRleHQsIHByZXZpZXdUeXBlKSB7XG4gIGxldCBwcmV2aWV3U3RyID0gZm4uY2FsbChudWxsLCBkYXRhT2JqKTtcbiAganNvblZpZXcuY2FsbChwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIsIHByZXZpZXdTdHIpO1xuICBzd2l0Y2hQcmV2aWV3U3RhdHVzKHByZXZpZXdDb250ZXh0LCBwcmV2aWV3VHlwZSk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hQcmV2aWV3U3RhdHVzKHByZXZpZXdDb250ZXh0LCBhcHBseVR5cGUpIHtcbiAgbGV0IHByZXZpZXdUeXBlcyA9IFsncmF3JywgJ2JlYXV0aWZ5JywgJ2hpZ2hsaWdodCddO1xuICBsZXQgYXBpUmVzcG9uZFByZXZpZXdFbGUgPSBwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXJlc3BvbmQtcHJldmlldycpWzBdO1xuICBsZXQgYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0FyciA9IGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoJyAnKTtcbiAgYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xuICAgIGxldCBpZHggPSBwcmV2aWV3VHlwZXMuaW5kZXhPZihlbGVtZW50KTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIGFycmF5LnNwbGljZShhcnJheS5pbmRleE9mKGVsZW1lbnQpLCAxKTtcbiAgICB9XG4gIH0pO1xuICBsZXQgcHJldmlld1R5cGVFbGVzQXJyID0gW10uc2xpY2UuY2FsbChwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLXByZXZpZXctdHlwZScpKTtcbiAgcHJldmlld1R5cGVFbGVzQXJyLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICB9KTtcbiAgcHJldmlld0NvbnRleHQuZG9tQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ByZXZpZXctJyArIGFwcGx5VHlwZSlbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTmFtZSA9IGFwaVJlc3BvbmRQcmV2aWV3RWxlQ2xhc3NBcnIuam9pbignICcpO1xuICBhcGlSZXNwb25kUHJldmlld0VsZS5jbGFzc0xpc3QuYWRkKGFwcGx5VHlwZSk7XG59XG5cbmZ1bmN0aW9uIGFwaVNhdmUoKSB7XG5cbn1cbmZ1bmN0aW9uIGFkZExlYWZDaGlsZCgpIHtcblxufVxuZnVuY3Rpb24gcmVtb3ZlTGVhZkNoaWxkKCkge1xuXG59XG5mdW5jdGlvbiBhcGlUZXN0KCkge1xuXG59XG5mdW5jdGlvbiBqc29uVmlldyhkYXRhKSB7XG4gIHZhciAkcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICRwcmUuaW5uZXJIVE1MID0gZGF0YTtcbiAgbGV0ICRkYXRhVmlld0VsZSA9IHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS12aWV3JylbMF07XG4gICRkYXRhVmlld0VsZS5pbm5lckhUTUwgPSAnJztcbiAgJGRhdGFWaWV3RWxlLmFwcGVuZENoaWxkKCRwcmUpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVBcGkoZXYpIHtcbiAgaWYgKCF0aGlzLmFwaURhdGFPYmouaWQpIHtcbiAgICBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGxldCBwYXJhbXMgPSB7fTtcbiAgY29uc29sZS5sb2cocm9vdEFQSSk7XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLmFwaURhdGFPYmouaWQpXG4gIC5kZWxldGUocGFyYW1zKVxuICAudGhlbihjYWxsYmFja3MuZGVsZXRlU3VjY2Vzcy5iaW5kKGV2KSlcbiAgLmNhdGNoKGNhbGxiYWNrcy5lcnJvcik7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuaW5pdEFwaVRyZWUgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGluaXREYXRhID0ge1xuICAgIG5vZGVJZDogMCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIGxldCBmaXJzdENoaWxkRGF0YSA9IHtcbiAgICBub2RlSWQ6IDEsXG4gICAgZGF0YTogbGVhZkRhdGFQbGFjZUhvbGRlclxuICB9O1xuICB0aGlzLmFwaVRyZWUgPSBuZXcgVHJlZShpbml0RGF0YSk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoZmlyc3RDaGlsZERhdGEsIDAsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICBsZXQgdHJlZURvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCBsZWFmRWxlO1xuICAgIGxldCBsZWFmQmluZERhdGE7XG4gICAgbm9kZS5wYXJlbnRJZCA9IG5vZGUucGFyZW50ID8gbm9kZS5wYXJlbnQubm9kZUlkIDogbnVsbDtcbiAgICBsZWFmRWxlID0gZ2VuZXJhdGVMZWFmKG5vZGUpO1xuICAgIGxlYWZCaW5kRGF0YSA9IHR3b1dheURhdGFCaW5kaW5nKGxlYWZEYXRhUGxhY2VIb2xkZXIsIGxlYWZFbGUpO1xuICAgIG5vZGUuZGF0YSA9IGxlYWZCaW5kRGF0YTtcbiAgICBpZiAobm9kZS5wYXJlbnRJZCA9PT0gbnVsbCB8fCBub2RlLnBhcmVudElkID09PSAnbnVsbCcpIGxlYWZFbGUuY2xhc3NMaXN0LmFkZCgncm9vdC1sZWFmJyk7XG4gICAgdHJlZURvY0ZyYWcuYXBwZW5kQ2hpbGQobGVhZkVsZSk7XG4gIH07XG5cbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKHRyZWVEb2NGcmFnKTtcblxuICByZXR1cm4gdGhpcy5hcGlUcmVlO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5kZWxOb2RlID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBjdXJyZW50TGVhZiA9IGN0eC50YXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubm9kZUlkO1xuICB2YXIgcGFyZW50SWR4ID0gKCtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnRJZCA9PT0gMCkgPyAwIDogK2N0eC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudElkO1xuXG4gIHZhciBub2Rlc0FyciA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURlc2NlbmRhbnRzKGN1cnJlbnRJZHgpO1xuICB2YXIgaWR4QXJyID0gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycik7XG4gIHRoaXMuYXBpVHJlZS5yZW1vdmUoY3VycmVudElkeCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMucmVtb3ZlTm9kZXNGcm9tRG9tKGlkeEFycik7XG5cbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWR4KTtcbiAgdGhpcy5zY3JvbGxCYXIucmVuZGVyKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0Lm5vZGVJZCkgIT09IC0xKSB7XG4gICAgICB0aGlzLiRhcGlUcmVlLnJlbW92ZUNoaWxkKGFsbExlYXZlc1tpXSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpIHtcbiAgdmFyIG5vZGVzQXJyTGVuID0gbm9kZXNBcnIubGVuZ3RoO1xuICB2YXIgaWR4QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXNBcnJMZW47IGkrKykge1xuICAgIGlkeEFyci5wdXNoKG5vZGVzQXJyW2ldLm5vZGVJZCk7XG4gIH07XG4gIHJldHVybiBpZHhBcnI7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc2V0UGFyZW50Tm9kZVZhbCA9IGZ1bmN0aW9uKGlkeCkge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgcXVldWUgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICB2YXIgcXVldWVMZW4gPSBxdWV1ZS5fbmV3ZXN0SW5kZXggLSBxdWV1ZS5fb2xkZXN0SW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gbGVhdmVzLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGlmICgrbGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkID09PSBpZHgpIHtcbiAgICAgIGlmIChxdWV1ZUxlbiA+IDApIHtcbiAgICAgICAgLy8gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIH07XG4gIH07XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ID0gdGhpcy5hcGlUcmVlLm1heElkKCkgKyAxO1xuICB2YXIgcGFyZW50SWRleCA9ICtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5ub2RlSWQ7XG5cbiAgbGV0IGxlYWZDaGlsZCA9IGNyZWF0ZUxlYWYocGFyZW50SWRleCwgdGhpcy5sZWFmSW5kZXgpO1xuICBsZXQgY2hpbGRNb2RlbCA9IHR3b1dheURhdGFCaW5kaW5nKGxlYWZEYXRhUGxhY2VIb2xkZXIsIGxlYWZDaGlsZCk7XG4gIGxldCBsZWFmRGF0YSA9IHtcbiAgICBub2RlSWQ6IHRoaXMubGVhZkluZGV4LFxuICAgIGRhdGE6IGNoaWxkTW9kZWxcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLmFkZChsZWFmRGF0YSwgcGFyZW50SWRleCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGxlYWZDaGlsZCk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkZXgpO1xuICB0aGlzLnNjcm9sbEJhci5yZW5kZXIoKTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWQsIG5vZGVJbmRleCkge1xuICB2YXIgbmV3TGVhZlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGVhZicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQnLCAnaGFzQ2hpbGQnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdiaW5kLXRvZ2dsZS1jbGFzcycsICcnKTtcbiAgbmV3TGVhZlNwYW4uZGF0YXNldC5wYXJlbnRJZCA9IHBhcmVudElkO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0Lm5vZGVJZCA9IG5vZGVJbmRleDtcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZlRwbCgpO1xuICByZXR1cm4gbmV3TGVhZlNwYW47XG59XG5mdW5jdGlvbiBjcmVhdGVMZWFmKHBhcmVudElkeCwgbm9kZUlkeCkge1xuICByZXR1cm4gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgpO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zdHlsZU5vZGVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG5cbiAgbGV0IGxlYXZlc0hhc2ggPSB7fTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYXZlc0hhc2hbbGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkXSA9IGxlYXZlc1tpXTtcbiAgfVxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZUlkIDw9IDApIHJldHVybjtcbiAgICBsZWF2ZXNIYXNoW25vZGUubm9kZUlkXS5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKHBlckxlYWZXaWR0aCArIHBlclNWR1BhdGhXaWR0aCkgKiAobm9kZS5jb2x1bW4gLSAxKSkgKyAncHgsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgKiAocGVyTGVhZkhlaWdodCArIGxlYXZlc1ZlcnRpY2FsR2FwKSkgKyAncHgsIDApJztcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuXG4vKiB1dGlscyAqL1xuZnVuY3Rpb24gY2xvbmVSZWN0T2JqKG9iaikge1xuICByZXR1cm4ge1xuICAgIHRvcDogb2JqLnRvcCxcbiAgICBib3R0b206IG9iai5ib3R0b20sXG4gICAgbGVmdDogb2JqLmxlZnQsXG4gICAgcmlnaHQ6IG9iai5yaWdodCxcbiAgICB3aWR0aDogb2JqLndpZHRoLFxuICAgIGhlaWdodDogb2JqLmhlaWdodFxuICB9O1xufVxuXG4vKiBtYW5pcHVsYXRlIFNWRyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jbGVhclNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXTtcbiAgd2hpbGUgKHN2Zy5sYXN0Q2hpbGQpIHtcbiAgICBzdmcucmVtb3ZlQ2hpbGQoc3ZnLmxhc3RDaGlsZCk7XG4gIH1cbn07XG4vKipcbiAqIFtkcmF3U1ZHIGRlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gKi9cbkFwaURvbS5wcm90b3R5cGUuZHJhd1NWRyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyU1ZHKCk7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIHN2Z1BhcnRpYWxzID0gW107XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHN2Z1BhcnRpYWxzLnB1c2godGhhdC5jcmVhdGVTaW5nbGVTVkcobm9kZS5ub2RlSWQsIG5vZGUuY29sdW1uLCBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCwgKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgLSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCkpKTtcbiAgICB9O1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG5cbiAgdmFyIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3ZnUGFydGlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHN2Z1BhcnRpYWxzW2ldKTtcbiAgfVxuICB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmNyZWF0ZVNpbmdsZVNWRyA9IGZ1bmN0aW9uKGlkeCwgaG9yaSwgcGFyZW50VmVydCwgZHZlcnQpIHtcblxuICB2YXIgc3ZnbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICB2YXIgbmV3UGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmducywgJ3BhdGgnKTtcbiAgdmFyIGNvbnRyb2xSYXRlID0gMC4yO1xuICB2YXIgbXgsIG15LCBxeCwgcXksIHF4eCwgcXl5LCB0eCwgdHk7XG4gIGhvcmkgPSBob3JpIC0gMTtcbiAgZHZlcnQgPSBkdmVydDtcbiAgcGFyZW50VmVydCA9IHBhcmVudFZlcnQ7XG5cbiAgbXggPSBob3JpICogNDkwOyAvKiBzaW5nbGUgbGVhZiB3aWR0aCBwbHVzIHNpbmdsZSBzdmcgcGF0aCB3aWR0aCAqL1xuICBteSA9IHBhcmVudFZlcnQgKiA1MiArIDg7XG4gIHF4ID0gbXggKyAxMDtcbiAgcXkgPSBteTtcbiAgcXh4ID0gbXggKyAxNTtcbiAgcXl5ID0gKG15ICsgKGR2ZXJ0IC8gMikgKiA1Mik7XG4gIHR4ID0gbXggKyAzMDtcbiAgdHkgPSBteSArIGR2ZXJ0ICogNTI7XG5cbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsICdNICcgKyBteCArICcgJyArIG15ICsgJyBRICcgKyBxeCArICcgJyArIHF5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxeHggKyAnICcgKyBxeXkgKyAnIFQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggKyAnICcgKyB0eSArICcnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FwaS1zdmctcGF0aCcpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1pZHgnLCBpZHgpO1xuXG4gIHJldHVybiBuZXdQYXRoO1xufTtcblxuLyogY2FsY3VsYXRlIGRpbWVuc2lvbnMgKi9cbkFwaURvbS5wcm90b3R5cGUuY2FsY0RpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcblxuICBob3JpQXJyID0gdGhpcy5hcGlUcmVlLmRlcHRoKCk7XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLmFwaVRyZWUuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVDb250ZW50LnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyIC0gKHZlcnRpY2FsTWF4ID4gMSA/IDEwIDogMCkgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlQ29udGVudC5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyIC0gKHZlcnRpY2FsTWF4ID4gMSA/IDEwIDogMCkgKyAncHgnO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcblxufTtcblxuLyogY2FsY3VsYXRlIG9mZnNldCAqL1xuXG5BcGlEb20ucHJvdG90eXBlLm5vZGVMZWZ0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpIHtcbiAgdmFyIGVsUmVjdE9iamVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgYm9keVJlY3RPYmogPSB0aGlzLiRhcGlUcmVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgY2xvbmVCb2R5UmVjdE9iaiA9IGNsb25lUmVjdE9iaihib2R5UmVjdE9iaik7XG4gIHZhciBjbG9uZUVsUmVjdE9iamVjdCA9IGNsb25lUmVjdE9iaihlbFJlY3RPYmplY3QpO1xuICBjbG9uZUVsUmVjdE9iamVjdC50b3AgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5ib3R0b20gKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5sZWZ0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnJpZ2h0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIHJldHVybiBjbG9uZUVsUmVjdE9iamVjdDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWVEb20uanNcbiAqKi8iLCIvKipcbiAqIFtUcmVlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICpcbiAqIF9yb290IHBvaW50cyB0byB0aGUgcm9vdCBub2RlIG9mIGEgdHJlZS5cbiAqIHRyYXZlcnNlREYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBERlMuXG4gKiB0cmF2ZXJzZUJGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggQkZTLlxuICogY29udGFpbnMoZGF0YSwgdHJhdmVyc2FsKSBzZWFyY2hlcyBmb3IgYSBub2RlIGluIGEgdHJlZS5cbiAqIGFkZChkYXRhLCB0b0RhdGEsIHRyYXZlcnNlKSBhZGRzIGEgbm9kZSB0byBhIHRyZWUuXG4gKiByZW1vdmUoY2hpbGQsIHBhcmVudCkgcmVtb3ZlcyBhIG5vZGUgaW4gYSB0cmVlLlxuICpcbiAqL1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSAnLi9xdWV1ZSc7XG5leHBvcnQgZnVuY3Rpb24gVHJlZShkYXRhKSB7XG4gIHZhciBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gIHRoaXMuX3Jvb3QgPSBub2RlO1xufVxuXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcbiAgdGhpcy5ub2RlSWQgPSBkYXRhLm5vZGVJZDsgLy8gbGVhZiBpbmRleCwgc3RhcnRzIGZyb20gMChyb290IG5vZGUpXG4gIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAvLyBhZGRlZCBsYXRlclxuICB0aGlzLmNoaWxkcmVubGV2ZWwgPSAxOyAvLyByb3dzIG9mIGRlc2NlbmRhbnRzIG9mIGN1cnJlbnQgbm9kZVxuICB0aGlzLmNvbHVtbiA9IDA7IC8vIHdoaWNoIGNvbHVtbiB0aGUgY3VycmVudCBub2RlIHNpdHMgaW4sIHN0YXJ0cyBmcm9tIDAoIHJvb3Qgbm9kZSBzaXRzIGluKVxuICB0aGlzLnRvdGFsb2Zmc2V0eWxldmVsID0gMDsgLy8gdG90YWwgdmVydGljYWwgb2Zmc2V0IHRvIHRoZSBjdXJyZW50IHRyZWUgXG4gIHRoaXMuZGF0YSA9IGRhdGEuZGF0YSB8fCB7fTtcbn1cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VERiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgLy8gdGhpcyBpcyBhIHJlY3Vyc2UgYW5kIGltbWVkaWF0ZWx5LWludm9raW5nIGZ1bmN0aW9uXG4gIChmdW5jdGlvbiByZWN1cnNlKGN1cnJlbnROb2RlKSB7XG4gICAgLy8gc3RlcCAyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBzdGVwIDNcbiAgICAgIHJlY3Vyc2UoY3VycmVudE5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIC8vIHN0ZXAgNFxuICAgIGNhbGxiYWNrKGN1cnJlbnROb2RlKTtcblxuICAgIC8vIHN0ZXAgMVxuICB9KSh0aGlzLl9yb290KTtcblxufTtcblxuLy8gZm9yIHRob3NlIG5vZGVzIHdobyBoYXZlIGNoaWxkcmVuXG5mdW5jdGlvbiBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkge1xuICB2YXIgdG90YWxDaGlsZHJlbkxldmVscyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHRvdGFsQ2hpbGRyZW5MZXZlbHMgKz0gbm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxDaGlsZHJlbkxldmVscztcbn1cblRyZWUucHJvdG90eXBlLmNhbGNDaGlsZHJlbkxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkgOiAxO1xuICAgIG5vZGUuY29sdW1uID0gbm9kZS5wYXJlbnQgPyAobm9kZS5wYXJlbnQuY29sdW1uICsgMSkgOiAwO1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VERihjYWxsYmFjayk7XG59O1xuXG5mdW5jdGlvbiBjYWxjT2ZmWShhcnIsIGRhdGEpIHtcbiAgdmFyIG5vZGVJZHggPSBmaW5kSW5kZXgoYXJyLCBkYXRhKTtcbiAgdmFyIHRvdGFsWSA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUlkeDsgaSsrKSB7XG4gICAgdG90YWxZICs9IGFycltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxZO1xufVxuXG5UcmVlLnByb3RvdHlwZS5jYWxjVG90YWxPZmZzZXRZTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxldmVsZ2FwID0gMDtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgbm9kZS50b3RhbG9mZnNldHlsZXZlbCA9IG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsICsgY2FsY09mZlkobm9kZS5wYXJlbnQuY2hpbGRyZW4sIG5vZGUubm9kZUlkKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cbiAgICB9O1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbn07XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlQkYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKTtcblxuICBxdWV1ZS5lbnF1ZXVlKHRoaXMuX3Jvb3QpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcblxuICB3aGlsZSAoY3VycmVudFRyZWUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUoY3VycmVudFRyZWUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGN1cnJlbnRUcmVlKTtcbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxufTtcblxuVHJlZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihjYWxsYmFjaywgdHJhdmVyc2FsKSB7XG4gIHRyYXZlcnNhbC5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5cblRyZWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciBjaGlsZCA9IG5ldyBOb2RlKGRhdGEpLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IHRvRGF0YSkge1xuICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhZGQgbm9kZSB0byBhIG5vbi1leGlzdGVudCBwYXJlbnQuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG4gIHRoaXMuY2hlY2tEYXRhSGFzQ2hpbGQoKTtcbiAgcmV0dXJuIGNoaWxkXG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhLCBmcm9tRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciB0cmVlID0gdGhpcyxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjaGlsZFRvUmVtb3ZlID0gbnVsbCxcbiAgICAgIGluZGV4O1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlSWQgPT09IGZyb21EYXRhKSB7XG4gICAgICBwYXJlbnQgPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBpbmRleCA9IGZpbmRJbmRleChwYXJlbnQuY2hpbGRyZW4sIGRhdGEpO1xuXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSB0byByZW1vdmUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZG9lcyBub3QgZXhpc3QuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG4gIHRoaXMuY2hlY2tEYXRhSGFzQ2hpbGQoKTtcbiAgcmV0dXJuIGNoaWxkVG9SZW1vdmU7XG59O1xuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBkYXRhKSB7XG4gIHZhciBpbmRleDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0ubm9kZUlkID09PSBkYXRhKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKiB0cmVlIGFkZG9uKi9cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEaXJlY3RDaGlsZCA9IGZ1bmN0aW9uKG5vZGVkYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICBwYXJlbnQgPSBudWxsLFxuICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZUlkID09PSBub2RlZGF0YSkge1xuICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShwYXJlbnQuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsYmFjayhwYXJlbnQpO1xuICAgIHBhcmVudCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufTtcblRyZWUucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlT2JqID0ge307XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzdHlsZU9ialtub2RlLm5vZGVJZF0gPSBub2RlLnRvdGFsb2Zmc2V0eWxldmVsO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG4gIHJldHVybiBzdHlsZU9iajtcbn07XG5cbi8qKlxuICogW3RyYXZlcnNlRGVzY2VuZGFudHMgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbaW50ZWdlcl19IG5vZGVEYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1thcnJheV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURlc2NlbmRhbnRzID0gZnVuY3Rpb24obm9kZURhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVEYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHF1ZXVlLmVucXVldWUocGFyZW50KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIHZhciBkZXNjZW5kYW50c0FyciA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGRlc2NlbmRhbnRzQXJyLnB1c2goY3VycmVudFRyZWUpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cblxuICByZXR1cm4gZGVzY2VuZGFudHNBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jaGVja0RhdGFIYXNDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbm9kZS5kYXRhLmhhc0NoaWxkID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xufTtcblxuLyogZ2V0IE1heCBub2RlSWQgZnJvbSB0cmVlICovXG5UcmVlLnByb3RvdHlwZS5tYXhJZCA9IGZ1bmN0aW9uKCkge1xuICBsZXQgbWF4Tm9kZUlkID0gMDtcbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVJZCA+IG1heE5vZGVJZCkgbWF4Tm9kZUlkID0gbm9kZS5ub2RlSWQ7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG4gIHJldHVybiBtYXhOb2RlSWQ7XG59O1xuXG4vKiB0cmVlIGRlcHRoICovXG5UcmVlLnByb3RvdHlwZS5kZXB0aCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGVwdGhBcnIgPSBbXTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCBkZXB0aCA9IDA7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICB3aGlsZSAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgZGVwdGggKz0gMTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgfVxuICAgICAgZGVwdGhBcnIucHVzaChkZXB0aCk7XG4gICAgfVxuICB9O1xuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuICByZXR1cm4gZGVwdGhBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5kaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG4gIGxldCBob3JpTWF4LCB2ZXJ0aWNhbE1heCwgaG9yaUFyciA9IFtdO1xuICBob3JpQXJyID0gdGhpcy5kZXB0aCgpO1xuICBob3JpTWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaG9yaUFycik7XG4gIHZlcnRpY2FsTWF4ID0gdGhpcy5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qc1xuICoqLyIsIi8qKlxuICogW1F1ZXVlIGRlc2NyaXB0aW9uXVxuICogZW5xdWV1ZShkYXRhKSBhZGRzIGRhdGEgdG8gYSBxdWV1ZS5cbiAqIGRlcXVldWUgcmVtb3ZlcyB0aGUgb2xkZXN0IGFkZGVkIGRhdGEgdG8gYSBxdWV1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFF1ZXVlKCkge1xuICB0aGlzLl9vbGRlc3RJbmRleCA9IDE7XG4gIHRoaXMuX25ld2VzdEluZGV4ID0gMTtcbiAgdGhpcy5fc3RvcmFnZSA9IHt9O1xufVxuXG5RdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbmV3ZXN0SW5kZXggLSB0aGlzLl9vbGRlc3RJbmRleDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl9zdG9yYWdlW3RoaXMuX25ld2VzdEluZGV4XSA9IGRhdGE7XG4gIHRoaXMuX25ld2VzdEluZGV4Kys7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkZXN0SW5kZXggPSB0aGlzLl9vbGRlc3RJbmRleCxcbiAgICAgIG5ld2VzdEluZGV4ID0gdGhpcy5fbmV3ZXN0SW5kZXgsXG4gICAgICBkZWxldGVkRGF0YTtcblxuICBpZiAob2xkZXN0SW5kZXggIT09IG5ld2VzdEluZGV4KSB7XG4gICAgZGVsZXRlZERhdGEgPSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICBkZWxldGUgdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgdGhpcy5fb2xkZXN0SW5kZXgrKztcblxuICAgIHJldHVybiBkZWxldGVkRGF0YTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzXG4gKiovIiwiaW1wb3J0IHttZXJnZU9ian0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdEFwaURhdGEodHJlZSwgb3BFbGUpIHtcbiAgbGV0IHBlckFwaUVsZSA9IG9wRWxlLmNsb3Nlc3QoJy5wZXItYXBpJyk7XG4gIC8vIGxldCB0cmVlRWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHJldHVybiBtZXJnZU9iaihjb2xsZWN0SW5mbyhwZXJBcGlFbGUpLCBjb2xsZWN0RGF0YUZyb21UcmVlKHRyZWUpKTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEluZm8ocGVyQXBpRWxlKSB7XG4gIGxldCBpbmZvRWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1pbmZvJylbMF07XG4gIGxldCBNb2Rlc1Jvd0VsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbW9kZXMtcm93JylbMF07XG4gIGxldCBpbmZvRGF0YSA9IHt9O1xuICBpbmZvRGF0YSA9IHtcbiAgICAnc2VjdGlvbic6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlY3Rpb24nKVswXS52YWx1ZSxcbiAgICAndXJpJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUsXG4gICAgJ21ldGhvZCc6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdLnZhbHVlLFxuICAgICdkZXNjcmlwdGlvbic6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWRlc2NyaXB0aW9uJylbMF0udmFsdWUsXG4gICAgJ3dpa2lMaW5rJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktd2lraS1pbnB1dCcpWzBdLnZhbHVlLFxuICAgICdtb2RlJzogZ2V0TW9kZVZhbChNb2Rlc1Jvd0VsZSksXG4gICAgJ2RlYnVnQWRkcic6IGdldERlYnVnQWRkcihNb2Rlc1Jvd0VsZSlcbiAgfTtcblxuICByZXR1cm4gaW5mb0RhdGE7XG59XG5cbmZ1bmN0aW9uIGdldE1vZGVWYWwoTW9kZXNSb3dFbGUpIHtcbiAgdmFyIHJhZGlvcyA9IE1vZGVzUm93RWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tb2RlJyk7XG4gIHZhciBtb2RlVmFsO1xuICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcmFkaW9zLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJhZGlvc1tpXS5jaGVja2VkKSB7XG4gICAgICBtb2RlVmFsID0gcmFkaW9zW2ldLnZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtb2RlVmFsO1xufVxuXG5mdW5jdGlvbiBnZXREZWJ1Z0FkZHIoTW9kZXNSb3dFbGUpIHtcbiAgcmV0dXJuIE1vZGVzUm93RWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGUtZGVidWdnaW5nLWFkZHInKVswXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdFRyZWUodHJlZUVsZSkge1xuXHRsZXQgbGVhdmVzID0gW10uc2xpY2UuY2FsbCh0cmVlRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7IFxuICBsZXQgdHJlZURhdGFBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBsZWFmRGF0YTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYWZEYXRhID0ge307XG4gICAgbGVhZkRhdGEucGFyZW50SWQgPSBsZWF2ZXNbaV0uZGF0YXNldC5wYXJlbnQ7XG4gICAgbGVhZkRhdGEubm9kZUlkID0gbGVhdmVzW2ldLmRhdGFzZXQuaW5kZXg7XG4gICAgbGVhZkRhdGEua2V5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYta2V5JylbMF0udmFsdWU7XG4gICAgbGVhZkRhdGEudmFsdWUgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlO1xuICAgIGxlYWZEYXRhLnF1YW50aXR5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtcXVhbnRpdHknKVswXS52YWx1ZTtcbiAgICB0cmVlRGF0YUFyci5wdXNoKGxlYWZEYXRhKTtcbiAgfTtcbiAgdHJlZURhdGFPYmoubm9kZXMgPSB0cmVlRGF0YUFycjtcbiAgcmV0dXJuIHRyZWVEYXRhT2JqO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RGF0YUZyb21UcmVlKGFwaVRyZWUpIHtcbiAgbGV0IHRyZWUgPSBhcGlUcmVlO1xuICBsZXQgbm9kZXNBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBkaW1lbnNpb25zQXJyID0gW107XG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCBub2RlRGF0YSA9IHt9O1xuICAgIG5vZGVEYXRhLm5vZGVJZCA9IG5vZGUubm9kZUlkO1xuICAgIG5vZGVEYXRhLmNvbHVtbiA9IG5vZGUuY29sdW1uO1xuICAgIG5vZGVEYXRhLnBhcmVudElkID0gbm9kZS5wYXJlbnQgPT09IG51bGwgPyBudWxsIDogbm9kZS5wYXJlbnQubm9kZUlkO1xuICAgIG5vZGVEYXRhLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVubGV2ZWw7XG4gICAgbm9kZURhdGEudG90YWxvZmZzZXR5bGV2ZWwgPSAgbm9kZS50b3RhbG9mZnNldHlsZXZlbDtcbiAgICBub2RlRGF0YS5kYXRhID0gbm9kZS5kYXRhO1xuICAgIG5vZGVEYXRhLmRhdGEuaGFzQ2hpbGQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgbm9kZXNBcnIucHVzaChub2RlRGF0YSk7XG4gIH07XG4gIHRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG4gIGRpbWVuc2lvbnNBcnIgPSB0cmVlLmRpbWVuc2lvbnMoKTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucyA9IHt9O1xuICB0cmVlRGF0YU9iai5kaW1lbnNpb25zLmhVbml0ID0gZGltZW5zaW9uc0FyclswXTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucy52VW5pdCA9IGRpbWVuc2lvbnNBcnJbMV07XG4gIHRyZWVEYXRhT2JqLm5vZGVzID0gbm9kZXNBcnI7XG4gIHJldHVybiB0cmVlRGF0YU9iajtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGdldE1heE9mQXJyYXkobnVtQXJyYXkpIHtcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxlbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKGNsYXNzTmFtZSkgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXgoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgcHJlZml4ID0gJyc7XG4gIHByZWZpeCA9ICh1YS5pbmRleE9mKCdjaHJvbWUnKSA+PSAwIHx8IHdpbmRvdy5vcGVuRGF0YWJhc2UpID8gJy13ZWJraXQtJyA6ICh1YS5pbmRleE9mKCdmaXJlZm94JykgPj0gMCkgPyAnLW1vei0nIDogd2luZG93Lm9wZXJhID8gJy1vLScgOiAoZG9jdW1lbnQuYWxsICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA9PT0gLTEpID8gJy1tcy0nIDogJyc7XG4gIHJldHVybiBwcmVmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oZWwpIHtcbiAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG5cbiAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuICBpZiAocmVzdWx0c1sxXSA9PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuXG4gIHJlc3VsdHMucHVzaCgwKTtcbiAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoNSwgOCk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbi8vICAgLy8gY2hyb21lIHdvbid0IHVzZSBwcmVmaXhcbi8vICAgLy8gdmFyIHN0eWxlX2F0dHIgPSBicm93c2VyUHJlZml4KCkgKyAndHJhbnNmb3JtJztcbi8vICAgdmFyIHN0eWxlX2F0dHIgPSAndHJhbnNmb3JtJztcbi8vICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlX2F0dHIpO1xuLy8gICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG4vLyAgIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbi8vICAgaWYgKHJlc3VsdHNbMV0gPT09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG4vLyAgIHJlc3VsdHMucHVzaCgwKTtcbi8vICAgcmV0dXJuICsocmVzdWx0cy5zbGljZSg1LCA4KVswXSk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5zcGxpdCgndHJhbnNsYXRlM2QnKVsxXS5zcGxpdCgnLCAnKVswXS5zbGljZSgxKS5zcGxpdCgncHgnKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVkob2JqKSB7XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxuICAgICAgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtIHx8IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gIHZhciBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gIGlmIChtYXQpIHJldHVybiBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVsxM10pO1xuICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICByZXR1cm4gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbNV0pIDogMDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuLyoqXG4gKiBbc3RyaW5naWZ5IHdpdGggNCBzcGFjZXMgYXQgZWFjaCBsZXZlbF1cbiAqIEBwYXJhbSAge1tvYmplY3RdfSBqc09iaiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIFwiXFx0XCIpOyAvLyBzdHJpbmdpZnkgd2l0aCB0YWJzIGluc2VydGVkIGF0IGVhY2ggbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIFtoaWdodGxpZ2h0SlNPTiB3b3JrcyBvbiBKU09OIG9iamVjdCwgbm90IHN0cmluZ11cbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XG4gIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uLCB1bmRlZmluZWQsIDQpO1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICB2YXIgY2xzID0gJ251bWJlcic7XG4gICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAna2V5JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgfSBlbHNlIGlmICgvbnVsbC8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdudWxsJztcbiAgICB9XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qc1xuICoqLyIsImltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmV4cG9ydCBmdW5jdGlvbiBqc29uVG9UcmVlKG5vZGVzQXJyKSB7XG4gIGxldCBoYXNoVGFibGUgPSB7fTtcbiAgbGV0IHRyZWU7XG4gIGZvciAobGV0IGkgPSAwLCBub2Rlc0xlbiA9IG5vZGVzQXJyLmxlbmd0aDsgaSA8IG5vZGVzTGVuOyBpKyspIHtcbiAgICBoYXNoVGFibGVbbm9kZXNBcnJbaV1bJ3BhcmVudElkJ11dID8gaGFzaFRhYmxlW25vZGVzQXJyW2ldWydwYXJlbnRJZCddXS5wdXNoKG5vZGVzQXJyW2ldKSA6IGhhc2hUYWJsZVtub2Rlc0FycltpXVsncGFyZW50SWQnXV0gPSBbbm9kZXNBcnJbaV1dO1xuICB9XG4gIC8vIG5vZGUg55qE5a2Q6IqC54K555qESUTmgLvmmK/lpKfkuo5ub2Rl55qESURcbiAgbGV0IG1vZEtleXNBcnIgPSByZW1vdmVFbGVGcm9tQXJyKE9iamVjdC5rZXlzKGhhc2hUYWJsZSksICdudWxsJykubWFwKE51bWJlcikuc29ydChzb3J0TnVtYmVyKTtcbiAgbGV0IHJvb3ROb2RlRGF0YSA9IGhhc2hUYWJsZVsnbnVsbCddWzBdO1xuICB0cmVlID0gbmV3IFRyZWUocm9vdE5vZGVEYXRhKTtcblxuICBmb3IgKGxldCBqID0gMCwga2V5c0xlbiA9IG1vZEtleXNBcnIubGVuZ3RoOyBqIDwga2V5c0xlbjsgaisrKSB7XG4gICAgaWYgKGhhc2hUYWJsZS5oYXNPd25Qcm9wZXJ0eShtb2RLZXlzQXJyW2pdKSkge1xuICAgICAgZm9yIChsZXQgayA9IDAsIGtleUFyckxlbiA9IGhhc2hUYWJsZVttb2RLZXlzQXJyW2pdXS5sZW5ndGg7IGsgPCBrZXlBcnJMZW47IGsrKykge1xuICAgICAgICB0cmVlLmFkZChoYXNoVGFibGVbbW9kS2V5c0FycltqXV1ba10sICttb2RLZXlzQXJyW2pdLCB0cmVlLnRyYXZlcnNlQkYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJlZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlRnJvbUFycihhcnIsIGVsZSkge1xuICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZihlbGUpO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qIEJ5IGRlZmF1bHQgdGhlIHNvcnQgbWV0aG9kIHNvcnRzIGVsZW1lbnRzIGFscGhhYmV0aWNhbGx5LiAqL1xuZnVuY3Rpb24gc29ydE51bWJlcihhLCBiKSB7XG4gIHJldHVybiBhIC0gYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyZWVUb0pzb24odHJlZSkge1xuXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvanNvblRyZWVDb252ZXJ0ZXIuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gdHdvV2F5RGF0YUJpbmRpbmcoZGF0YSwgZG9tQ29udGV4dCkge1xuICAvKiBJbnN0YXRpYXRlIGFuIGVtcHR5IGBtb2RlbGAgb2JqZWN0LiAqL1xuICB2YXIgbW9kZWwgPSB7fTtcbiAgLyogSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIG9mIHRoZSBzdXBwbGllZCBgZGF0YWAgb2JqZWN0LiAqL1xuICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgIC8qIFN0b3JlIG91ciB2YWx1ZSBpbnNpZGUgdGhlIGBmb3JFYWNoYCBjbG9zdXJlLiAqL1xuICAgIHZhciB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIGtleSwge1xuICAgICAgLyogV2Ugd2FudCBvdXIgcHJvcGVydHkgdG8gYXBwZWFyIGluIGBmb3IuLmluYCBsb29wcy4gKi9cbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvKiBUaGlzIGRvZXNuJ3QgbmVlZCB0byBkbyBtdWNoLCBvbmx5IHJldHVybiB0aGUgYHZhbHVlYCBmcm9tIG91ciBjbG9zdXJlLiAqL1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgLyogT3ZlcndyaXRlIG91ciBjbG9zdXJlcyBgdmFsdWVgIHdpdGggdGhlIG5ldyBgdmFsYC4gKi9cbiAgICAgICAgdmFsdWUgPSB2YWw7XG4gICAgICAgIC8qIFNlbGVjdCBhbGwgbm9kZXMgd2l0aCBgYmluZGAgYW5kIGBtb2RlbGAgYXR0cmlidXRlcy4gKi9cbiAgICAgICAgc2VsZWN0b3JUb0FycmF5KCdbYmluZD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KS5jb25jYXQoc2VsZWN0b3JUb0FycmF5KCdbbW9kZWw9JyArIGtleSArICddJywgZG9tQ29udGV4dCkpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAvKiBJZiBlbGVtZW50IGhhcyBgYmluZGAgYXR0cmlidXRlLCBzZXQgaXQncyBgdGV4dENvbnRlbnRgLiAqL1xuICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2JpbmQnKSAmJiAhZWwuaGFzQXR0cmlidXRlKCdiaW5kLXRvZ2dsZS1jbGFzcycpKSBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJykpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndG9nZ2xlLXRydWUnKTsgXG4gICAgICAgICAgICB9ZWxzZSBpZih2YWx1ZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2dnbGUtdHJ1ZScpO1xuICAgICAgICAgICAgfWVsc2UgaWYodmFsdWUgJiYgKCcnICsgdmFsdWUpLmxlbmd0aCA+IDAgJiYgIWhhc0FjdGl2ZUVsZShlbEFuZERlc2NlbmRhbnRzKGVsKSkpIHtcbiAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndG9nZ2xlLXRydWUnKTsgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtYXR0ci1ocmVmJykpIHtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnaHJlZicsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyogSWYgZWxlbWVudCBoYXMgYG1vZGVsYCBhdHRyaWJ1dGUsIHNldCBpdCdzIGB2YWx1ZWAuICovXG5cbiAgICAgICAgICBpZiAoZWwuZ2V0QXR0cmlidXRlKCdtb2RlbCcpICYmIGVsICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogU2V0IG91ciBtb2RlbCBvYmplY3RzIHByb3BlcnR5IHZhbHVlIHRvIHRoZSBzYW1lIHZhbHVlLiAqL1xuICAgIG1vZGVsW2tleV0gPSB2YWx1ZTtcbiAgICAvKiBBZGQgY2hhbmdlIGhhbmRsZXJzIHRvIGlucHV0cyBvbiB0aGUgcGFnZS4gKi9cbiAgICBzZWxlY3RvclRvQXJyYXkoJ1ttb2RlbD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAvKiBPdXIgaGFuZGxlciBzaW1wbHkgc2V0cyBvdXIgbW9kZWxzIGBrZXlgIHRvIHRoZSBlbGVtZW50J3MgdmFsdWUuICovXG4gICAgICBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICBtb2RlbFtrZXldID0gZWwudmFsdWU7XG4gICAgICB9XG4gICAgICAvKiBCaW5kIGEgYGtleXVwYCBoYW5kbGVyIHNvIHdlIGdldCBsaXZlIGZlZWRiYWNrIG9uIGVhY2gga2V5IHByZXNzLiAqL1xuICAgICAgLy8gZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBoYW5kbGVyKTtcbiAgICAgIC8qIEJpbmQgYSBgY2hhbmdlYCBoYW5kbGVyIHdoaWNoIGlzIGZpcmVkIHdoZW4gdGhlIGVsZW1lbnQgaXMgYmx1cnJlZC4gKi9cbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgaGFuZGxlcik7XG4gICAgfSk7XG4gIH0pO1xuICAvKiBSZXR1cm4gb3VyIG5ldyBtb2RlbCBvYmplY3QuICovXG4gIHJldHVybiBtb2RlbDtcbn1cblxuLyogaW5jbHVkZSBkb21Db250ZXh0IGl0c3NlbGYgKi9cbmZ1bmN0aW9uIHNlbGVjdG9yVG9BcnJheShzZWxlY3RvciwgZG9tQ29udGV4dCkge1xuICBsZXQgYXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9tQ29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG4gIGlmIChkb21Db250ZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgYXJyLnB1c2goZG9tQ29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gZWxBbmREZXNjZW5kYW50cyhlbCkge1xuICBsZXQgcmVzdWx0QXJyID0gW107XG4gIChmdW5jdGlvbiBsb29wKGVsZSkge1xuICAgIGxldCBjaGlsZHJlbkVsZXMgPSBlbGUuY2hpbGRyZW47XG4gICAgaWYgKGVsZS5jaGlsZEVsZW1lbnRDb3VudCkge1xuICAgICAgZm9yICh2YXIgaSA9IGNoaWxkcmVuRWxlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBsb29wKGNoaWxkcmVuRWxlc1tpXSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0QXJyLnB1c2goZWxlKTtcbiAgfSkoZWwpO1xuICByZXR1cm4gcmVzdWx0QXJyO1xufVxuZnVuY3Rpb24gaGFzQWN0aXZlRWxlKGFycikge1xuICBsZXQgYm9sID0gZmFsc2U7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGZvciAodmFyIGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAoYm9sID09PSB0cnVlKSBicmVhaztcbiAgICBib2wgPSBhcnJbaV0gPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPyB0cnVlIDogZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGJvbDtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanNcbiAqKi8iLCJpbXBvcnQge2ZsYXNoLCBwYXJzZUFuZEZsYXNofSBmcm9tICcuL2ZsYXNoJztcbmV4cG9ydCBsZXQgY2FsbGJhY2tzID0ge1xuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfVxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY2FsbGJhY2tzLmpzXG4gKiovIiwiaW1wb3J0IHtzdHJUb0RvbSwgZGVib3VuY2V9IGZyb20gJy4vdXRpbGl0aWVzJztcblxuZnVuY3Rpb24gZ2VuZXJhdGVTY3JvbGxTdHIoKSB7XG4gIGxldCBzY3JvbGxTdHIgPSBgXG4gICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1heGlzXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1zbGlkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1zLXRvcFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXMtYm90dG9tXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtcy1ibG9ja1wiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgO1xuICByZXR1cm4gc2Nyb2xsU3RyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2Nyb2xsQmFySChiKSB7XG4gIHJldHVybiBuZXcgYShiKTtcbn1cblxuZnVuY3Rpb24gYSh4KSB7XG4gIHZhciBxID0gdGhpcztcbiAgdGhpcy5vcHRpb25zID0geDtcbiAgbGV0IG5ld1Njcm9sbFN0ciA9IGdlbmVyYXRlU2Nyb2xsU3RyKCk7XG4gIGxldCBuZXdTY3JvbGxFbGUgPSBzdHJUb0RvbShuZXdTY3JvbGxTdHIpO1xuICB2YXIgWSA9IHguc2Nyb2xsYmFyIHx8IG5ld1Njcm9sbEVsZVxuICAgICwgaiA9IHguY29udGVudFxuICAgICwgTiA9IHgub3ZlcmZsb3dFbGVcbiAgICAsIGkgPSB4LmluaXRQb3MgfHwgMFxuICAgICwgTSA9IHguaW5pdERvbSB8fCBudWxsXG4gICAgLCBVID0geC5tb3VzZXdoZWVsIHx8IHRydWVcbiAgICAsIGwgPSB4Lm1vdXNld2hlZWxsb2NrIHx8IGZhbHNlXG4gICAgLCBIID0geC53aGVlbGRlbHRhIHx8IDFcbiAgICAsIHogPSB4LmN0cmxibG9jayB8fCAwXG4gICAgLCBKID0geC5zdGVwIHx8IDAuMVxuICAgICwgciA9IHgubGVuZ3RoXG4gICAgLCBJID0geC5zY2FsZSB8fCAwXG4gICAgLCBHID0geC50aGVtZSB8fCAnJ1xuICAgICwgYWQgPSB4LnJlZnJlc2ggfHwgZmFsc2U7XG4gIHZhciBTID0gMCwgVCA9IDAsIGggPSAwLCBWID0gZnVuY3Rpb24oYWcpIHtcbiAgICB2YXIgYWYgPSBwYXJzZUludChTIC0gVCk7XG4gICAgaWYgKGFmID4gMCkge1xuICAgICAgdmFyIGFnID0gYWcudmFsdWU7XG4gICAgICBqLnNjcm9sbExlZnQgPSBhZiAqIGFnO1xuICAgIH1cbiAgfVxuICAsXG4gICAgdiA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1heGlzJylbMF0sXG4gIGcgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtc2xpZGVyJylbMF0sXG4gIHUgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtcy10b3AnKVswXSxcbiAgRiA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1zLWJvdHRvbScpWzBdLFxuICBhZSA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1zLWJsb2NrJylbMF0sXG4gIFcgPSAwLCBRID0geiB8fCAwLCBrID0gMCwgUiA9IFEsIG0gPSAwLCBDID0gMCwgTCA9IDAsIGQgPSAwLCB0ID0gbnVsbCAsIGIgPSBudWxsICwgYWIsIFAsIEQ7XG4gIHZhciB5ID0gZnVuY3Rpb24oKSB7XG4gICAgWCA9IGZhbHNlO1xuICAgIGMgPSBmYWxzZTtcbiAgfVxuICA7XG4gIGlmICgheC5zY3JvbGxiYXIpIHtcbiAgICB4LndyYXBwZXIuYXBwZW5kQ2hpbGQobmV3U2Nyb2xsRWxlKTtcbiAgfVxuICBqLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtY29udGVudCcpO1xuICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsJyk7XG4gIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oYWcpIHtcbiAgICBpZiAoIWFkKSB7XG4gICAgICBjbGVhckludGVydmFsKEQpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgVCA9IGoub2Zmc2V0V2lkdGg7XG4gICAgICBoID0gWS5vZmZzZXRXaWR0aDtcbiAgICAgIFMgPSBOLm9mZnNldFdpZHRoO1xuICAgIH0gY2F0Y2ggKGFoKSB7fVxuICAgIFcgPSBhZyB8fCByIHx8IFQgLSAyO1xuICAgIFkuc3R5bGUud2lkdGggPSBXICsgJ3B4JztcbiAgICB2LnN0eWxlLndpZHRoID0gVyArICdweCc7XG4gICAgaWYgKFcgPj0gMCAmJiBTID49IDApIHtcbiAgICAgIGlmIChTIDw9IFcgKyAyKSB7XG4gICAgICAgIFkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9XG4gICAgICBpZiAoSSAhPSAoUyAvIFcpKSB7XG4gICAgICAgIEkgPSBTIC8gVztcbiAgICAgICAgbyhJKTtcbiAgICAgICAgWihxLm1lbU9mZnNldFgpO1xuICAgICAgfVxuICAgICAgdmFyIGFmID0gMDtcbiAgICAgIGlmIChNKSB7XG4gICAgICAgIGlmIChNLm9mZnNldExlZnQgKyBNLnNjcm9sbFdpZHRoID49IFMpIHtcbiAgICAgICAgICBhZiA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKE0ub2Zmc2V0TGVmdCArIE0uc2Nyb2xsV2lkdGggPD0gVCkge1xuICAgICAgICAgICAgYWYgPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZiA9IE0ub2Zmc2V0TGVmdCAvIFM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGFmKTtcbiAgICAgICAgWihhZik7XG4gICAgICB9XG4gICAgICBpZiAoaSkge1xuICAgICAgICBjb25zb2xlLmxvZyhpKTtcbiAgICAgICAgWihpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgO1xuICBEID0gc2V0SW50ZXJ2YWwodGhpcy5yZW5kZXIsIDUwKTtcbiAgLy8gWS5pbm5lckhUTUwgPSAnJztcblxuICBnLm9uRHJhZ3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIDtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLXNsaWRlci1ob3ZlcicpO1xuICAgIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtaG92ZXInKTtcbiAgfSk7XG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgZy5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1zbGlkZXItdG91Y2gnKTtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLXRvdWNoJyk7XG4gIH0pO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1zbGlkZXItaG92ZXInKTtcbiAgfSk7XG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLXRvdWNoJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtaG92ZXInKTtcbiAgfSk7XG4gIFkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgIFkuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtaG92ZXInKTtcbiAgfSk7XG4gIFkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xuICAgIFkuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgfSk7XG4gIHYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzKTtcbiAgaWYgKFUgJiYgIXRoaXMub253aGVlbCkge1xuICAgIGlmICghai5jbGFzc0xpc3QuY29udGFpbnMoJ29wdWktc2Nyb2xsLW9ud2hlZWwnKSkge1xuICAgICAgai5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHApO1xuICAgICAgai5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgcCk7XG4gICAgICBqLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLW9ud2hlZWwnKTtcbiAgICB9XG4gIH1cbiAgaWYgKGopIHtcbiAgICBqLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFkKSB7XG4gICAgICAgIFooai5zY3JvbGxMZWZ0IC8gKGouc2Nyb2xsV2lkdGggLSBqLm9mZnNldFdpZHRoKSwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGFmKSB7XG4gICAgdCA9IGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQ7XG4gICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICA7XG4gICAgYiA9IHdpbmRvdy5zZXRJbnRlcnZhbChuLCA0MCk7XG4gICAgTi5zdHlsZVsnLW1vei11c2VyLXNlbGVjdCddID0gJ25vbmUnO1xuICAgIE4uc3R5bGVbJy13ZWJraXQtdXNlci1zZWxlY3QnXSA9ICdub25lJztcblxuICAgIEwgPSBhZi5jbGllbnRYIC0gZy5vZmZzZXRMZWZ0O1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGYpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBhYSk7XG4gICAgZCA9IDE7XG4gICAgYWYucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICBmdW5jdGlvbiBLKGFnLCBhaCwgYWYpIHtcbiAgICBpZiAoYWYpIHtcbiAgICAgIGFnID0gYWcgPiBhZiA/IGFmIDogYWc7XG4gICAgfVxuICAgIHJldHVybiBhZyA+PSBhaCA/IGFnIDogYWg7XG4gIH1cbiAgZnVuY3Rpb24gbigpIHtcbiAgICBWLmNhbGwod2luZG93LCB7XG4gICAgICB2YWx1ZTogQyxcbiAgICAgIHNjYWxlOiBJXG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gTygpIHtcbiAgICBpZiAoYWIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoYWIpO1xuICAgIH1cbiAgICBFKCk7XG4gICAgYWIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChYKSB7XG4gICAgICAgIEUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoYWIpO1xuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cbiAgZnVuY3Rpb24gYWMoKSB7XG4gICAgaWYgKFApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoUCk7XG4gICAgfVxuICAgIEIoKTtcbiAgICBQID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoYykge1xuICAgICAgICBCKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKFApO1xuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cbiAgZnVuY3Rpb24gRSgpIHtcbiAgICB2YXIgYWYgPSBDIC0gSjtcbiAgICBhZiA9IChhZiA8IDApID8gMCA6IGFmO1xuICAgIFooYWYpO1xuICB9XG4gIGZ1bmN0aW9uIEIoKSB7XG4gICAgdmFyIGFmID0gQyArIEo7XG4gICAgYWYgPSAoYWYgPiAxKSA/IDEgOiBhZjtcbiAgICBaKGFmKTtcbiAgfVxuICBmdW5jdGlvbiBmKGFmKSB7XG4gICAgYWYgPSB3aW5kb3cuZXZlbnQgfHwgYWY7XG4gICAgdmFyIGFnID0gSyhhZi5jbGllbnRYIC0gTCwgUiwgbSk7XG4gICAgQyA9IChhZyAtIFIpIC8gKG0gLSBSKTtcbiAgICBnLnN0eWxlLmxlZnQgPSBhZyArICdweCc7XG4gICAgcS5tZW1PZmZzZXRYID0gYWc7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIGFhKCkge1xuICAgIFkuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtaG92ZXInKTtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLXRvdWNoJyk7XG4gICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1zbGlkZXItaG92ZXInKTtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci10b3VjaCcpO1xuICAgIE4uc3R5bGVbJy1tb3otdXNlci1zZWxlY3QnXSA9ICcnO1xuICAgIE4uc3R5bGVbJy13ZWJraXQtdXNlci1zZWxlY3QnXSA9ICcnO1xuICAgIGlmIChiKSB7XG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChiKTtcbiAgICB9XG4gICAgaWYgKHQpIHtcbiAgICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSB0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGFhKTtcbiAgICBnLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLXNsaWRlcicpO1xuICAgIGQgPSAwO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBzKGFmKSB7XG4gICAgWigoYWYub2Zmc2V0WCB8fCBhZi5sYXllclgpIC8gVyk7XG4gIH1cbiAgZnVuY3Rpb24gWihhaCwgYWYpIHtcbiAgICBhaCA9IGFoIDwgMCA/IDAgOiBhaDtcbiAgICBhaCA9IGFoID4gMSA/IDEgOiBhaDtcbiAgICBDID0gYWg7XG4gICAgdmFyIGFnID0gKG0gLSBSKSAqIEMgKyBSO1xuICAgIGcuc3R5bGUubGVmdCA9IGFnICsgJ3B4JztcbiAgICBxLm1lbU9mZnNldFggPSBhZztcbiAgICBpZiAoIWFmKSB7XG4gICAgICBuKCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHAoYWYpIHtcbiAgICAvLyBhZi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGFmID0gYWYub3JpZ2luYWxFdmVudDtcbiAgICAvLyBpZiAoYWYpIHtcbiAgICAvLyAgIHRoaXMub253aGVlbCA9IDE7XG4gICAgLy8gICB2YXIgYWkgPSAoLWFmLndoZWVsRGVsdGEgfHwgKGFmLmRldGFpbCAmJiBhZi5kZXRhaWwgKiA0MCkgfHwgMCkgLyBIO1xuICAgIC8vICAgdmFyIGFoID0gYWk7XG4gICAgLy8gICB2YXIgYWcgPSBhaCA+IDAgPyBqLnNjcm9sbExlZnQgKyAyIDogai5zY3JvbGxMZWZ0IC0gMjtcbiAgICAvLyAgIE4uc3R5bGUuem9vbSA9ICcxJztcbiAgICAvLyAgIGlmIChhZyA+IDAgJiYgKGFnIDwgKE4ub2Zmc2V0V2lkdGggLSBqLm9mZnNldFdpZHRoICsgNSkgfHwgKE4ub2Zmc2V0V2lkdGggLSBqLnNjcm9sbFdpZHRoIDwgMCAmJiBhaCA8IDApKSkge1xuICAgIC8vICAgICBqLnNjcm9sbExlZnQgKz0gYWg7XG4gICAgLy8gICAgIEMgPSBqLnNjcm9sbExlZnQgLyAoai5zY3JvbGxXaWR0aCAtIGoub2Zmc2V0V2lkdGgpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgaWYgKCFsIHx8IFkuc3R5bGUuZGlzcGxheSA9PSAnbm9uZScpIHtcbiAgICAvLyAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCArPSBhaDtcbiAgICAvLyAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgKz0gYWg7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgIH1cbiAgICAvLyB9XG4gIH1cbiAgZnVuY3Rpb24gbyhhZikge1xuICAgIEkgPSAoYWYgPiAxMCkgPyAxMCA6IGFmO1xuICAgIGlmIChJIDw9IDEpIHtcbiAgICAgIGcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB2YXIgYWcgPSBXIC0gMiAqIFE7XG4gICAgayA9IHBhcnNlSW50KGFnIC8gSSk7XG4gICAgayA9IChrIDwgMTUpID8gMTUgOiBrO1xuICAgIG0gPSBXIC0gUSAtIGs7XG4gICAgZy5zdHlsZS53aWR0aCA9IGsgKyAncHgnO1xuICB9XG4gIGlmIChJID4gMSkge1xuICAgIG8oSSk7XG4gIH1cbiAgbGV0IGRlYm91bmNlZFdpbmRvd1Jlc2l6ZSA9IGRlYm91bmNlKHJlUmVuZGVyLCAyMDAsIGZhbHNlKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlZFdpbmRvd1Jlc2l6ZSk7XG4gIGZ1bmN0aW9uIHJlUmVuZGVyKCkge1xuICAgIHEucmVuZGVyKCk7XG4gIH1cbiAgdGhpcy5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHQpIHtcbiAgICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSB0O1xuICAgIH0gZWxzZSB7XG4gICAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfTtcbiAgICB9XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZik7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGFhKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgeSk7XG4gICAgaWYgKGIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoYik7XG4gICAgfVxuICAgIGlmIChhYikge1xuICAgICAgY2xlYXJJbnRlcnZhbChhYik7XG4gICAgfVxuICAgIGlmIChQKSB7XG4gICAgICBjbGVhckludGVydmFsKFApO1xuICAgIH1cbiAgICBpZiAoRCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChEKTtcbiAgICB9XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2Nyb2xsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==