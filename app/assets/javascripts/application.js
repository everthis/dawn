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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _modulesDataLinks = __webpack_require__(1);
	
	var _modulesHomepage = __webpack_require__(4);
	
	var _modulesApiOperation = __webpack_require__(6);
	
	(0, _modulesDataLinks.dataLinks)();
	// apiTree();
	// var p = new dawnSVG();
	// p.init(document.getElementById('painter-target'));
	// p.start();
	
	(function () {
	  var routes = {
	    '/': _modulesHomepage.home,
	    '/dev': [_modulesApiOperation.initXhr]
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.dataLinks = dataLinks;
	
	var _commonHandleMethod = __webpack_require__(2);
	
	function dataLinks() {
	  document.addEventListener('click', processDataLink, false);
	}
	
	function processDataLink(e) {
	  var e = window.e || e;
	
	  if (e.target.tagName !== 'A') return;
	
	  // Do something
	  if (e.target.dataset.method === 'delete') {
	    e.preventDefault();
	    (0, _commonHandleMethod.handleMethod)(e.target);
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.handleMethod = handleMethod;
	
	var _commonCsrf = __webpack_require__(3);
	
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
	      csrfToken = _commonCsrf.rorParams.csrfToken(),
	      csrfParam = _commonCsrf.rorParams.csrfParam();
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
	  if (params.csrfParam !== undefined && params.csrfToken !== undefined && !_commonCsrf.rorParams.isCrossDomain(params.href)) {
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
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var rorParams = {
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
	exports.rorParams = rorParams;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.home = home;
	
	var _tweetBox = __webpack_require__(5);
	
	function home() {
		(0, _tweetBox.tweetBox)();
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.initXhr = initXhr;
	
	var _templateObject = _taggedTemplateLiteral(['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  '], ['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  ']),
	    _templateObject2 = _taggedTemplateLiteral(['\n        ', '\n      '], ['\n        ', '\n      ']);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	var _commonAjax = __webpack_require__(7);
	
	var _commonTemplate = __webpack_require__(10);
	
	var _commonPopup = __webpack_require__(12);
	
	var _commonUtilities = __webpack_require__(9);
	
	var _commonFlash = __webpack_require__(14);
	
	var _apiTreeTreeDom = __webpack_require__(15);
	
	var rootAPI = window.location.origin + '/apis';
	var payload = {};
	var apisArr = [];
	
	var callback = {
	  getApiSuccess: function getApiSuccess(data) {
	    addApiTree(JSON.parse(data), this);
	  },
	  getAllApisSuccess: function getAllApisSuccess(data) {
	    renderAllApis(data);
	    bindevents();
	  },
	  patchSuccess: function patchSuccess(data) {
	    parseAndFlash(data);
	  },
	  postSuccess: function postSuccess(data) {
	    parseAndFlash(data);
	  },
	  deleteSuccess: function deleteSuccess(data) {
	    function destoryApiLi() {
	      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
	    }
	    parseAndFlash(data, destoryApiLi.bind(this));
	  },
	  success: function success(data) {
	    console.log(data);
	  },
	  error: function error(data) {
	    parseAndFlash(data);
	  }
	};
	
	function initXhr() {
	  getAllApis();
	  document.addEventListener('click', bindEvent);
	}
	
	function parseAndFlash(data, callback) {
	  var jsonData = JSON.parse(data);
	  (0, _commonFlash.flash)(jsonData, callback);
	  return jsonData;
	}
	
	function toggleFoldLi(context) {
	  context.classList.toggle('unfold');
	}
	function bindEventToApiLiDescription(ev) {
	  toggleFoldLi(this);
	  if (this.nextElementSibling) {
	    return;
	  };
	  (0, _commonAjax.$http)(rootAPI + '/' + this.parentNode.dataset.apiId).get(payload).then(callback.getApiSuccess.bind(this.parentNode))['catch'](callback.error);
	}
	function bindevents() {
	  var apiLis = document.getElementsByClassName('api-li-description');
	  [].slice.call(apiLis).forEach(function (element, index) {
	    element.addEventListener('click', function (ev) {
	      bindEventToApiLiDescription.call(this, ev);
	    });
	  });
	}
	function addApiTree(data, containerNode, isNewApi) {
	  if (data === undefined) data = {};
	
	  var newApi = new _apiTreeTreeDom.ApiDom(data, containerNode, isNewApi);
	  apisArr.push(newApi);
	}
	
	var debouncedNewApiBtn = (0, _commonUtilities.debounce)(processNewApiClick, 500, true);
	function processNewApiClick() {
	  var apiUl = document.getElementsByClassName('api-ul')[0];
	  var baseApiLi = (0, _commonUtilities.strToDom)(newApiLiTpl());
	  apiUl.insertBefore(baseApiLi, apiUl.firstChild);
	  addApiTree({}, baseApiLi, true);
	  toggleFoldLi(baseApiLi.children[0]);
	  baseApiLi.children[0].addEventListener('click', function (ev) {
	    bindEventToApiLiDescription.call(this, ev);
	  });
	}
	function newApiBtn() {
	  var newApiDiv = document.createElement('div');
	  var header = document.getElementsByTagName('header')[0];
	  newApiDiv.classList.add('new-api');
	  newApiDiv.innerHTML = '<input class="add-api-btn" type="button" value="new API">';
	  newApiDiv.children[0].addEventListener('click', debouncedNewApiBtn);
	  (0, _commonUtilities.insertAfter)(newApiDiv, header);
	  return newApiDiv;
	}
	
	function newApiLiTpl() {
	  var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var tpl = '\n    <li class="api-li" data-api-id="' + (data.id || null) + '">\n      <div class="api-li-description">\n        <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>\n        <span class="api-li-uri">' + (data.uri || '(No uri)') + '</span>\n        <span class="api-li-name">' + (data.name ? data.name : '(No name)') + '</span>\n      </div>\n    </li>\n  ';
	  return tpl;
	}
	function renderAllApis(data) {
	  data = JSON.parse(data);
	  var tmpl = function tmpl(data) {
	    return (0, _commonTemplate.html)(_templateObject, data.map(function (item) {
	      return (0, _commonTemplate.html)(_templateObject2, newApiLiTpl(item));
	    }));
	  };
	  var header = document.getElementsByTagName('header')[0];
	  var apiListEle = document.createElement('div');
	  apiListEle.classList.add('api-ul-wrapper');
	  apiListEle.innerHTML = tmpl(data);
	  (0, _commonUtilities.insertAfter)(apiListEle, newApiBtn());
	}
	
	function getAllApis() {
	  (0, _commonAjax.$http)(rootAPI).get(payload).then(callback.getAllApisSuccess)['catch'](callback.error);
	}
	
	function bindEvent(ev) {
	  if (ev.target.classList.contains('api-save')) {
	    var params = {
	      'section': ev.target.parentNode.getElementsByClassName('api-section')[0].value,
	      'uri': ev.target.parentNode.getElementsByClassName('api-uri')[0].value,
	      'method': ev.target.parentNode.getElementsByClassName('api-method')[0].value
	    };
	    if (ev.target.dataset.method.toUpperCase() === 'PATCH') {
	      (0, _commonAjax.$http)(rootAPI + '/' + ev.target.closest('.per-api').dataset.id).patch(params, 'api').then(callback.patchSuccess)['catch'](callback.error);
	    } else if (ev.target.dataset.method.toUpperCase() === 'POST') {
	      (0, _commonAjax.$http)(rootAPI).post(params, 'api').then(callback.postSuccess)['catch'](callback.error);
	    }
	  };
	
	  if (ev.target.classList.contains('del-dataroot-child')) {
	    (0, _commonPopup.popup)(ev, {}, deleteApi.bind(this, ev));
	  };
	  function deleteApi(ev) {
	    if (!ev.target.closest('.per-api').dataset.id) {
	      ev.target.closest('.api-ul').removeChild(ev.target.closest('.api-li'));
	      return null;
	    };
	
	    var params = {};
	    (0, _commonAjax.$http)(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)['delete'](params).then(callback.deleteSuccess.bind(ev))['catch'](callback.error);
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
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
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.$http = $http;
	
	var _serialize = __webpack_require__(8);
	
	var _utilities = __webpack_require__(9);
	
	var _csrf = __webpack_require__(3);
	
	function $http(url) {
	  // A small example of object
	  var core = {
	
	    // Method that performs the ajax request
	    ajax: function ajax(method, url, args, prefix) {
	      if (args === undefined) args = {};
	
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
	          var uri = (0, _serialize.serialize)(extendGeneralParams((0, _utilities.addPrefixToObj)(args, prefix)));
	          client.open(method, url + '?' + uri);
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
	        client.onerror = function () {
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
	}
	
	function extendGeneralParams(obj) {
	  var csrfParam = _csrf.rorParams.csrfParam();
	  var csrfToken = _csrf.rorParams.csrfToken();
	  var generalObj = {};
	  generalObj.utf8 = '✓';
	  generalObj[csrfParam] = csrfToken;
	  return (0, _utilities.mergeObj)(obj, generalObj);
	}
	// End A

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * [serialize converts recursive objects]
	 * @param  {[type]} obj    [description]
	 * @param  {[type]} prefix [description]
	 * @return {[type]}        [description]
	 * console.log(serialize({foo: "hi there", bar: { blah: 123, quux: [1, 2, 3] }}));
	 * foo=hi%20there&bar%5Bblah%5D=123&bar%5Bquux%5D%5B0%5D=1&bar%5Bquux%5D%5B1%5D=2&bar%5Bquux%5D%5B2%5D=3
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.serialize = serialize;
	
	function serialize(obj, prefix) {
	  var str = [];
	  for (var p in obj) {
	    if (obj.hasOwnProperty(p)) {
	      var k = prefix ? prefix + '[' + p + ']' : p,
	          v = obj[p];
	      str.push(typeof v == 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
	    }
	  }
	  return str.join('&');
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
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
	
	function isEmpty(obj) {
	  return Object.keys(obj).length === 0;
	}
	
	function cloneObj(obj) {
	  return JSON.parse(JSON.stringify(obj));
	}
	
	/* consider Object.assign(target, ...sources) */
	
	function mergeObj(obj1, obj2) {
	  if (obj1 === undefined) obj1 = {};
	
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
	}
	
	;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.html = html;
	
	var _htmlEscape = __webpack_require__(11);
	
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
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.htmlEscape = htmlEscape;
	
	function htmlEscape(str) {
	  str = '' + str; // for numbers etc.
	  return str.replace(/&/g, '&amp;') // first!
	  .replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/`/g, '&#96;');
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.popup = popup;
	
	var _toggleScroll = __webpack_require__(13);
	
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
	  ele.getElementsByClassName('popup-shadow')[0].addEventListener('click', closePopup);
	  ele.getElementsByClassName('popup-confirm-btn')[0].addEventListener('click', confirm.bind(this, ev, ele, params, callback));
	}
	
	function confirm(ev, ele, params, callback) {
	  callback();
	  document.body.removeChild(ele);
	}
	
	function positionPopupEle(ele, coordinates) {
	  ele.getElementsByClassName('popup-content')[0].style.transform = 'translate3d(' + coordinates.pageX + 'px, ' + coordinates.pageY + 'px, 0)';
	}
	
	function closePopup(ev) {
	  if (ev.target === ev.currentTarget) {
	    document.body.removeChild(this.parentNode);
	    (0, _toggleScroll.enableScroll)();
	  }
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.disableScroll = disableScroll;
	exports.enableScroll = enableScroll;
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.flash = flash;
	
	var _utilities = __webpack_require__(9);
	
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

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * width of single svg path: 30px
	 */
	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.ApiDom = ApiDom;
	
	var _tree = __webpack_require__(16);
	
	var _commonPopup = __webpack_require__(12);
	
	var _utilities = __webpack_require__(18);
	
	function perApiTpl(data) {
	  var isNewApi = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var tpl = '<div class="api-info">\n          <label class="api-label">API:</label>\n          <input class="api-uri" placeholder="" value="" /> \n          <label class="api-label">method:</label>\n          <select class="api-method">\n              <option value="GET" selected>GET</option>\n              <option value="POST">POST</option>\n              <option value="PATCH">PATCH</option>\n              <option value="DELETE">DELETE</option>\n          </select>\n          <label>section:</label>\n          <input class="api-section" type="text" />\n          <label for="">description:</label>\n          <input class="api-description" type="text" />\n          <span class="api-save" data-method="' + patchOrPost(isNewApi) + '" data-action="/apis' + saveOrCreate(data, isNewApi) + '" >' + (isNewApi ? 'create' : 'save') + '</span>\n          <span class="api-test">test</span>\n      </div>\n      <div class="api-tree-wrapper"><div class="api-tree-frame"><svg class="api-svg" width="100%" height="100%"></svg></div><div class="api-tree"></div></div>\n      <div class="api-data">\n          <div class="data-views-control">\n              <span class="data-raw">raw</span>\n              <span class="data-beautify">beautify</span>\n              <span class="data-highlight">syntaxHighlight</span>\n              <span class="data-preview">preview</span>\n          </div>\n          <div class="data-view json">\n          </div>\n      </div>';
	  return tpl;
	}
	
	var leafContentTpl = '<i class="remove-child">-</i>' + '<input type="text" class="leaf-key" placeholder="key" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="value" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="quantity" />' + '<i class="add-child">+</i>';
	
	var initRectObj = {
	  right: 0,
	  bottom: 0,
	  left: 0,
	  top: 0,
	  width: 0,
	  height: 0
	};
	var perSVGPathWidth = 30;
	var rootNodeWidth = perSVGPathWidth + 15;
	
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
	
	function ApiDom(data, containerNode, isNewApi) {
	  this.apiContainer = containerNode;
	
	  this.apiContainer.appendChild(createPerApi(data, isNewApi));
	
	  this.apiEle = this.apiContainer.getElementsByClassName('per-api')[0];
	
	  this.bindEventsToMRCAPI();
	
	  this.leafIndex = 1;
	
	  this.$apiTree = this.apiEle.getElementsByClassName('api-tree')[0];
	  this.$apiTree.appendChild(createLeaf(0, 1, 0, initRectObj));
	
	  this.$apiTreeFrame = this.apiEle.getElementsByClassName('api-tree-frame')[0];
	
	  this.initApiTree();
	
	  this.calcDimensions();
	
	  this.bindEventsToMRCE();
	
	  this.apiReturnData = '';
	}
	
	ApiDom.prototype.storeApiReturnData = function (data) {
	  this.apiReturnData = data;
	  this.$dataBeautify.click();
	};
	ApiDom.prototype.jsonView = function (data) {
	  var $pre = document.createElement('pre');
	  $pre.innerHTML = data;
	  this.$dataView.innerHTML = '';
	  this.$dataView.appendChild($pre);
	};
	ApiDom.prototype.bindEventsToMRCAPI = function () {
	  var _this = this;
	
	  var that = this;
	  var newlyCreatedApiNode = this.apiEle;
	
	  var $apiSave = newlyCreatedApiNode.getElementsByClassName('api-save')[0];
	  var $apiUri = newlyCreatedApiNode.getElementsByClassName('api-uri')[0];
	  var $apiTest = newlyCreatedApiNode.getElementsByClassName('api-test')[0];
	  var $apiMethod = newlyCreatedApiNode.getElementsByClassName('api-method')[0];
	
	  var $dataRaw = newlyCreatedApiNode.getElementsByClassName('data-raw')[0];
	  this.$dataBeautify = newlyCreatedApiNode.getElementsByClassName('data-beautify')[0];
	  var $dataHighlight = newlyCreatedApiNode.getElementsByClassName('data-highlight')[0];
	  var $dataPreview = newlyCreatedApiNode.getElementsByClassName('data-preview')[0];
	
	  this.$dataView = newlyCreatedApiNode.getElementsByClassName('data-view')[0];
	
	  $apiSave.addEventListener('click', function (ev) {});
	
	  $apiTest.addEventListener('click', function (ev) {
	    (0, _utilities.xhr)($apiMethod.value, $apiUri.value, _this.storeApiReturnData.bind(that));
	  });
	
	  $dataRaw.addEventListener('click', function (ev) {
	    _this.jsonView(_this.apiReturnData);
	  });
	
	  this.$dataBeautify.addEventListener('click', function (ev) {
	    _this.jsonView((0, _utilities.beautifyJSON)(JSON.parse(_this.apiReturnData)));
	  });
	
	  $dataHighlight.addEventListener('click', function (ev) {
	    _this.jsonView((0, _utilities.hightlightJSON)(JSON.parse(_this.apiReturnData)));
	  });
	
	  $dataPreview.addEventListener('click', function (ev) {
	    _this.jsonView('This feature has not been accomplished yet.');
	  });
	};
	
	ApiDom.prototype.operateDataRootChild = function () {
	  var that = this;
	  var addMark = document.createElement('span');
	  addMark.className = 'add-dataroot-child';
	  addMark.textContent = '+';
	  addMark.addEventListener('click', function (ev) {
	    that.leafIndex += 1;
	    var parentIdx = 0;
	    var nodeLevel = 0;
	    that.apiTree.add(that.leafIndex, parentIdx, that.apiTree.traverseBF);
	
	    that.$apiTree.appendChild(createLeaf(parentIdx, that.leafIndex, nodeLevel, initRectObj));
	    var obj = that.apiTree.applyStyle();
	    that.styleNodes(obj);
	    that.bindEventsToMRCE();
	  });
	  this.$apiTree.insertBefore(addMark, this.$apiTree.firstChild);
	
	  var delMark = document.createElement('span');
	  delMark.className = 'del-dataroot-child';
	  delMark.textContent = '-';
	  delMark.addEventListener('click', function (ev) {
	    /* this API is deleted. */
	
	    // that.apiContainer.removeChild(ev.currentTarget.closest('.per-api'));
	  });
	  this.$apiTree.insertBefore(delMark, this.$apiTree.firstChild);
	};
	
	ApiDom.prototype.initApiTree = function () {
	  this.apiTree = new _tree.Tree(0);
	  this.apiTree.add(1, 0, this.apiTree.traverseBF);
	
	  this.operateDataRootChild();
	
	  return this.apiTree;
	};
	
	ApiDom.prototype.delNode = function (ctx) {
	  var currentLeaf = ctx.currentTarget.closest('.leaf');
	  var currentIdx = +ctx.currentTarget.parentNode.dataset.index;
	  var parentIdx = +ctx.currentTarget.parentNode.dataset.parent === 0 ? 0 : +ctx.currentTarget.parentNode.dataset.parent;
	
	  var nodesArr = this.apiTree.traverseDescendants(currentIdx);
	  var idxArr = nodesArrToIdxArr(nodesArr);
	  this.apiTree.remove(currentIdx, parentIdx, this.apiTree.traverseBF);
	  this.removeNodesFromDom(idxArr);
	
	  console.log(this.apiTree);
	
	  var obj = this.apiTree.applyStyle();
	  this.styleNodes(obj);
	  this.setParentNodeVal(parentIdx);
	};
	ApiDom.prototype.removeNodesFromDom = function (arr) {
	  var allLeaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
	  var allLeavesLen = allLeaves.length;
	  for (var i = 0; i < allLeavesLen; i++) {
	    if (arr.indexOf(+allLeaves[i].dataset.index) !== -1) {
	      this.$apiTree.removeChild(allLeaves[i]);
	    }
	  };
	};
	function nodesArrToIdxArr(nodesArr) {
	  var nodesArrLen = nodesArr.length;
	  var idxArr = [];
	  for (var i = 0; i < nodesArrLen; i++) {
	    idxArr.push(nodesArr[i].data);
	  };
	  return idxArr;
	}
	
	ApiDom.prototype.bindEventsToMRCE = function () {
	  var _this2 = this;
	
	  var leaves = this.$apiTree.getElementsByClassName('leaf');
	  var leavesLen = leaves.length;
	  var newlyCreatedLeaf = leaves[leavesLen - 1];
	  var $addChild = newlyCreatedLeaf.getElementsByClassName('add-child')[0];
	  $addChild.addEventListener('click', function (ctx) {
	    _this2.addChild(ctx);
	  });
	
	  var $removeChild = newlyCreatedLeaf.getElementsByClassName('remove-child')[0];
	  $removeChild.addEventListener('click', function (ctx) {
	    _this2.delNode(ctx);
	  });
	};
	ApiDom.prototype.setParentNodeVal = function (idx) {
	  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
	  var queue = this.apiTree.traverseDirectChild(idx);
	  var queueLen = queue._newestIndex - queue._oldestIndex;
	  for (var i = 0, x = leaves.length; i < x; i++) {
	    if (+leaves[i].dataset.index === idx) {
	      if (queueLen > 0) {
	        leaves[i].getElementsByClassName('leaf-value')[0].value = '--->';
	      } else {
	        leaves[i].getElementsByClassName('leaf-value')[0].value = '';
	      };
	      break;
	    };
	  };
	};
	ApiDom.prototype.addChild = function (ctx) {
	  this.leafIndex += 1;
	  var parentIdex = +ctx.currentTarget.parentNode.dataset.index;
	  var nodeLevel = +ctx.currentTarget.parentNode.dataset.level + 1;
	
	  // apiTree operation
	  this.apiTree.add(this.leafIndex, parentIdex, this.apiTree.traverseBF);
	
	  var clonedRectObj = cloneRectObj(this.nodeLeftOffset(ctx.currentTarget.parentNode));
	  var childrenNodes = this.apiTree.traverseDirectChild(parentIdex);
	
	  var childrenIdxArr = [];
	  for (var perNode in childrenNodes._storage) {
	    if (typeof parseInt(perNode) === 'number' && childrenNodes._storage[perNode].hasOwnProperty('data')) {
	      childrenIdxArr.push(childrenNodes._storage[perNode].data);
	    };
	  }
	
	  var childrenIdxArrLen = childrenIdxArr.length;
	
	  clonedRectObj.right -= 30;
	
	  clonedRectObj.bottom = childrenIdxArrLen === 1 ? clonedRectObj.bottom + clonedRectObj.height * (childrenIdxArrLen - 2) : clonedRectObj.bottom + clonedRectObj.height * (childrenIdxArrLen - 2) + (childrenIdxArrLen - 1) * 20;
	  this.$apiTree.appendChild(createLeaf(parentIdex, this.leafIndex, nodeLevel, clonedRectObj));
	  this.bindEventsToMRCE();
	  var obj = this.apiTree.applyStyle();
	  console.log(this.apiTree);
	  this.styleNodes(obj);
	  this.setParentNodeVal(parentIdex);
	};
	
	function generateLeafSpan(parentId, nodeIndex, nodeLevel, rectObj) {
	  var newLeafSpan = document.createElement('span');
	  newLeafSpan.setAttribute('class', 'leaf');
	  newLeafSpan.setAttribute('data-parent', parentId);
	  newLeafSpan.setAttribute('data-index', nodeIndex);
	  newLeafSpan.setAttribute('data-level', nodeLevel);
	  newLeafSpan.style['transform'] = 'translate3d(' + Math.round(rectObj.width * nodeLevel + perSVGPathWidth * nodeLevel) + 'px, ' + Math.round(rectObj.bottom) + 'px, 0)';
	  newLeafSpan.innerHTML = leafContentTpl;
	  return newLeafSpan;
	}
	function createLeaf(parentIdx, nodeIdx, nodeLevel, rectObj) {
	  var newLeaf = document.createDocumentFragment();
	  newLeaf.appendChild(generateLeafSpan(parentIdx, nodeIdx, nodeLevel, rectObj));
	  return newLeaf;
	}
	ApiDom.prototype.styleNodes = function (styleObj) {
	  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
	  var leafIdx,
	      offsetY,
	      originalX = '';
	
	  var stylesArr = [],
	      xValue,
	      yValue;
	
	  for (var i = 0; i < leaves.length; i++) {
	    originalX = (0, _utilities.getTranslateX)(leaves[i]);
	    leafIdx = +leaves[i].dataset.index;
	
	    for (var styleObjIdx in styleObj) {
	      if (+styleObjIdx === leafIdx) {
	        offsetY = styleObj[styleObjIdx] * 52;
	      };
	    }
	    stylesArr.push([originalX, offsetY]);
	  };
	
	  for (var j = 0, stylesArrLen = stylesArr.length; j < stylesArrLen; j++) {
	    leaves[j].style['transform'] = 'translate3d(' + stylesArr[j][0] + 'px, ' + stylesArr[j][1] + 'px, 0)';
	  }
	
	  this.dimensionArr = this.calcDimensions();
	  this.drawSVG();
	};
	ApiDom.prototype.addSibling = function (ctx) {
	  this.leafIndex += 1;
	  var parentIdx = +ctx.currentTarget.parentNode.dataset.parent;
	  var nodeLevel = +ctx.currentTarget.parentNode.dataset.level;
	  parentIdx = +parentIdx === 0 ? 0 : parentIdx;
	  this.apiTree.add(this.leafIndex, parentIdx, this.apiTree.traverseBF);
	  var rectObj = this.nodeLeftOffset(ctx.currentTarget.parentNode);
	  var clonedRectObj = cloneRectObj(rectObj);
	  clonedRectObj.right = clonedRectObj.right - clonedRectObj.width;
	  clonedRectObj.bottom += 30;
	  this.$apiTree.appendChild(createLeaf(parentIdx, this.leafIndex, nodeLevel, clonedRectObj));
	  var obj = this.apiTree.applyStyle();
	  this.styleNodes(obj);
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
	      svgPartials.push(that.createSingleSVG(node.data, node.column, node.parent.totaloffsetylevel, node.totaloffsetylevel - node.parent.totaloffsetylevel));
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
	
	  mx = hori * 501;
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
	  this.dimensionArr = this.apiTree.maxLevels();
	  var horiMax,
	      verticalMax,
	      horiArr = [],
	      vertArr = [];
	  for (var i = 0, x = this.dimensionArr.length; i < x; i++) {
	    horiArr.push(this.dimensionArr[i].length);
	  };
	  horiMax = Math.max.apply(null, horiArr);
	  verticalMax = this.apiTree._root.childrenlevel;
	  this.$apiTreeFrame.style.width = horiMax * 520 + 'px';
	  this.$apiTreeFrame.style.height = verticalMax * 52 + 'px';
	  this.dimensionArr = [horiMax, verticalMax];
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/**
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
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.Tree = Tree;
	
	var _queue = __webpack_require__(17);
	
	function Tree(data) {
	  var node = new Node(data);
	  this._root = node;
	}
	
	function Node(nodeId) {
	  this.nodeId = nodeId; // leaf index, starts from 0(root node)
	  this.parent = null;
	  this.children = [];
	  // added later
	  this.childrenlevel = 1; // rows of descendants of current node
	  this.column = 0; // which column the current node sits in, starts from 0( root node sits in)
	  this.totaloffsetylevel = 0; // total vertical offset to the current tree
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
	
	Tree.prototype.maxLevels = function () {
	  var that = this;
	  var dataRootNodes = this.traverseDirectChild(0);
	  var rowLevelObj = {};
	  var headIdxArr = [];
	  for (var drn in dataRootNodes._storage) {
	    if (dataRootNodes._storage.hasOwnProperty(drn)) {
	      rowLevelObj[drn] = {};
	      rowLevelObj[drn]['head-idx'] = dataRootNodes._storage[drn].nodeId;
	      headIdxArr.push(dataRootNodes._storage[drn].nodeId);
	    };
	  }
	
	  function extractIdxFromQueue(queue) {
	    var childrenIdxArr = [];
	    for (var perNode in queue._storage) {
	      if (typeof parseInt(perNode) === 'number' && queue._storage[perNode].hasOwnProperty('data')) {
	        childrenIdxArr.push(queue._storage[perNode].nodeId);
	      };
	    }
	    return childrenIdxArr;
	  }
	
	  var levelNextColArr = [];
	
	  function getRowLevel(idx) {
	    var directChildrenQueue = that.traverseDirectChild(idx);
	    var directChildrenArr = extractIdxFromQueue(directChildrenQueue);
	    return directChildrenArr;
	  }
	
	  var ultimateArr = [];
	  var perHead = [];
	
	  function nextLevelChildren(arr) {
	    var nextLevelChildrenArr = [];
	    for (var i = 0; i < arr.length; i++) {
	      var perNum = getRowLevel(arr[i]);
	      nextLevelChildrenArr = nextLevelChildrenArr.concat(perNum);
	    };
	    if (nextLevelChildrenArr.length) {
	      perHead.push(nextLevelChildrenArr.length);
	      nextLevelChildren(nextLevelChildrenArr);
	    };
	  }
	
	  (function recurse(arr) {
	
	    for (var i = 0; i < arr.length; i++) {
	      perHead = [];
	      // level 1
	      levelNextColArr = getRowLevel(arr[i]);
	      perHead.push(1);
	      if (levelNextColArr.length) {
	        perHead.push(levelNextColArr.length);
	        nextLevelChildren(levelNextColArr);
	      };
	      ultimateArr.push(perHead);
	    };
	  })(headIdxArr);
	
	  return ultimateArr;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	/**
	 * [Queue description]
	 * enqueue(data) adds data to a queue.
	 * dequeue removes the oldest added data to a queue.
	 */
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Queue = Queue;
	
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
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getMaxOfArray = getMaxOfArray;
	exports.hasClass = hasClass;
	exports.browserPrefix = browserPrefix;
	exports.getTransform = getTransform;
	exports.getTranslateX = getTranslateX;
	exports.getTranslateY = getTranslateY;
	exports.xhr = xhr;
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
	      str.push(typeof v === 'object' ? serialize(v, k) : encodeURIComponent(k) + '=' + encodeURIComponent(v));
	    }
	  }
	  return str.join('&');
	}
	
	function xhr(method, url, callback) {
	  var paramsObj = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	  var isAsync = arguments.length <= 4 || arguments[4] === undefined ? true : arguments[4];
	
	  var xmlhttp;
	
	  xmlhttp = new XMLHttpRequest();
	
	  xmlhttp.onreadystatechange = function () {
	    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
	      if (xmlhttp.status == 200) {
	        callback(xmlhttp.responseText);
	      } else if (xmlhttp.status == 400) {
	        throw new Error('There was an error 400');
	      } else {
	        throw new Error('something else other than 200 was returned');
	      }
	    }
	  };
	
	  var combUrl = url + serialize(paramsObj);
	
	  xmlhttp.open(method, combUrl, isAsync);
	  xmlhttp.send(null);
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWNlZDk1MTA5Yzc0NDU2YjI2YjkiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7NkNDdEN3QixDQUFxQjs7NENBQzFCLENBQW9COztnREFFakIsQ0FBd0I7O0FBQzlDLG1DQUFXLENBQUM7Ozs7OztBQU1aLEVBQUMsWUFBTTtBQUNMLE9BQUksTUFBTSxHQUFHO0FBQ1gsUUFBRyx1QkFBTTtBQUNULFdBQU0sRUFBRSw4QkFBUztJQUNsQixDQUFDO0FBQ0YsT0FBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDeEMsT0FBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ25DLFNBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixJQUN2RSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pCLFlBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxF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RUFDdkM7Ozs7Ozs7O0FBT00sVUFBUyxjQUFjLENBQUMsSUFBSSxFQUFFO0FBQ25DLE9BQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUMsT0FBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRSxVQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0dBQXdHLEVBQUUsVUFBUyxLQUFLLEVBQUU7QUFDNUksU0FBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25CLFNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNwQixXQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDcEIsWUFBRyxHQUFHLEtBQUssQ0FBQztRQUNiLE1BQU07QUFDTCxZQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ2hCO01BQ0YsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbkMsVUFBRyxHQUFHLFNBQVMsQ0FBQztNQUNqQixNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3QixVQUFHLEdBQUcsTUFBTSxDQUFDO01BQ2Q7QUFDRCxZQUFPLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDekQsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxY2VkOTUxMDljNzQ0NTZiMjZiOVxuICoqLyIsImltcG9ydCB7ZGF0YUxpbmtzfSBmcm9tICcuL21vZHVsZXMvZGF0YUxpbmtzJztcbmltcG9ydCB7aG9tZX0gZnJvbSAnLi9tb2R1bGVzL2hvbWVwYWdlJztcblxuaW1wb3J0IHtpbml0WGhyfSBmcm9tICcuL21vZHVsZXMvYXBpT3BlcmF0aW9uJztcbmRhdGFMaW5rcygpO1xuLy8gYXBpVHJlZSgpO1xuLy8gdmFyIHAgPSBuZXcgZGF3blNWRygpO1xuLy8gcC5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWludGVyLXRhcmdldCcpKTtcbi8vIHAuc3RhcnQoKTtcblxuKCgpID0+IHtcbiAgbGV0IHJvdXRlcyA9IHtcbiAgICAnLyc6IGhvbWUsXG4gICAgJy9kZXYnOiBbaW5pdFhocl1cbiAgfTtcbiAgbGV0IHBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHBhdGhOYW1lKSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocm91dGVzW3BhdGhOYW1lXSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiZcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm91dGVzW3BhdGhOYW1lXVtpXS5hcHBseShudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVzW3BhdGhOYW1lXS5hcHBseShudWxsKTtcbiAgICB9XG4gIH1cblxufSkoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzXG4gKiovIiwiaW1wb3J0IHtoYW5kbGVNZXRob2R9IGZyb20gJy4uL2NvbW1vbi9oYW5kbGVNZXRob2QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0YUxpbmtzKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NEYXRhTGluaywgZmFsc2UpO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0RhdGFMaW5rKGUpIHtcbiAgdmFyIGUgPSB3aW5kb3cuZSB8fCBlO1xuXG4gIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnQScpXG4gICAgICByZXR1cm47XG5cbiAgLy8gRG8gc29tZXRoaW5nXG4gIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0KTtcbiAgfVxuICAvLyBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdwYXRjaCcpIHtcbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0LCB7XG4gIC8vICAgICBuczogJ2FwaScsXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIHNlY3Rpb246ICd3aXNlJyxcbiAgLy8gICAgICAgaWQ6ICcyJ1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZGF0YUxpbmtzLmpzXG4gKiovIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb24vY3NyZic7XG4vKipcbiAqIFtoYW5kbGVNZXRob2QgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbGluayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSGFuZGxlcyBcImRhdGEtbWV0aG9kXCIgb24gbGlua3Mgc3VjaCBhczpcbiAqIDxhIGhyZWY9XCIvdXNlcnMvNVwiIGRhdGEtbWV0aG9kPVwiZGVsZXRlXCIgcmVsPVwibm9mb2xsb3dcIiBkYXRhLWNvbmZpcm09XCJBcmUgeW91IHN1cmU/XCI+RGVsZXRlPC9hPlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWV0aG9kKGxpbmssIG9iaiA9IHt9KSB7XG4gIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICBtZXRob2QgPSBsaW5rLmRhdGFzZXQubWV0aG9kLFxuICAgIHRhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCksXG4gICAgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICB2YXIgcGFyYW1zT2JqID0ge1xuICAgIGhyZWY6IGhyZWYsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY3NyZlRva2VuOiBjc3JmVG9rZW4sXG4gICAgY3NyZlBhcmFtOiBjc3JmUGFyYW1cbiAgfTtcbiAgdmFyIGZvcm1FbGUgPSBjcmVhdGVGb3JtKHBhcmFtc09iaiwgb2JqKTtcbiAgYXBwZW5kRm9ybVRvRG9tKGZvcm1FbGUpO1xuICBzdWJtaXRGb3JtKGZvcm1FbGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybShwYXJhbXMsIG9iaikge1xuICB2YXIgZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywncG9zdCcpO1xuICBmLnNldEF0dHJpYnV0ZSgnYWN0aW9uJyxwYXJhbXMuaHJlZik7XG4gIGlmIChwYXJhbXMudGFyZ2V0KSB7XG4gICAgZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIHBhcmFtcy50YXJnZXQpO1xuICB9O1xuXG4gIHZhciBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdfbWV0aG9kJyk7XG4gIGkuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLm1ldGhvZCk7XG5cbiAgdmFyIHM7XG4gIGlmIChwYXJhbXMuY3NyZlBhcmFtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5jc3JmVG9rZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgIVJQcy5pc0Nyb3NzRG9tYWluKHBhcmFtcy5ocmVmKSkge1xuICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwYXJhbXMuY3NyZlBhcmFtKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5jc3JmVG9rZW4pO1xuICB9XG4gIGYuYXBwZW5kQ2hpbGQoaSk7XG5cbiAgLy8gZm9yIChsZXQga2V5IGluIG9iai5kYXRhKSB7XG4gIC8vICAgaWYgKG9iai5kYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgLy8gICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgnbmFtZScsJycgKyBvYmoubnMgKyAnWycgKyBrZXkgKyAnXScpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxvYmouZGF0YVtrZXldKTtcbiAgLy8gICAgIGYuYXBwZW5kQ2hpbGQodCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgaWYgKHMpIHtcbiAgICBmLmFwcGVuZENoaWxkKHMpO1xuICB9O1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kRm9ybVRvRG9tKGZvcm0pIHtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdEZvcm0oZm9ybSkge1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qc1xuICoqLyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jc3JmLmpzXG4gKiovIiwiaW1wb3J0IHt0d2VldEJveH0gZnJvbSAnLi90d2VldEJveCc7XG5leHBvcnQgZnVuY3Rpb24gaG9tZSgpIHtcblx0dHdlZXRCb3goKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2hvbWVwYWdlLmpzXG4gKiovIiwiZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoZWwsIDApO1xuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWV0Qm94KCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gIHZhciB0YiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0d2VldC1ib3gnKVswXTtcbiAgdmFyIHRiZCA9IHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgdmFyIHRiZFN0cmluZyA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdjb25kZW5zZWQnKTtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCkge1xuXG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuY2xhc3NMaXN0LmFkZCgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICh0YmQuaW5uZXJIVE1MID09PSAnV2hhdFxcJ3MgaGFwcGVuaW5nPycpIHtcblxuICAgICAgdGJkLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICB9XG4gIH0pO1xuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmlubmVySFRNTCkge1xuICAgICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgICB9IGVsc2Uge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcblxuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH07XG4gICAgaWYgKHRiLmlubmVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanNcbiAqKi8iLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XG5pbXBvcnQge2h0bWx9IGZyb20gJy4uL2NvbW1vbi90ZW1wbGF0ZSc7XG5pbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmltcG9ydCB7Zmxhc2h9IGZyb20gJy4uL2NvbW1vbi9mbGFzaCc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZS1kb20nO1xuXG5sZXQgcm9vdEFQSSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXMnO1xubGV0IHBheWxvYWQgPSB7fTtcbmxldCBhcGlzQXJyID0gW107XG5cbnZhciBjYWxsYmFjayA9IHtcbiAgZ2V0QXBpU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGFkZEFwaVRyZWUoSlNPTi5wYXJzZShkYXRhKSwgdGhpcyk7XG4gIH0sXG4gIGdldEFsbEFwaXNTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmVuZGVyQWxsQXBpcyhkYXRhKTtcbiAgICBiaW5kZXZlbnRzKCk7XG4gIH0sXG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIHBvc3RTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgZGVsZXRlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGZ1bmN0aW9uIGRlc3RvcnlBcGlMaSgpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZCh0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIH1cbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEsIGRlc3RvcnlBcGlMaS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZ2V0QWxsQXBpcygpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJpbmRFdmVudCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQW5kRmxhc2goZGF0YSwgY2FsbGJhY2spIHtcbiAgbGV0IGpzb25EYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgZmxhc2goanNvbkRhdGEsIGNhbGxiYWNrKTtcbiAgcmV0dXJuIGpzb25EYXRhO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVGb2xkTGkoY29udGV4dCkge1xuICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xufVxuZnVuY3Rpb24gYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uKGV2KSB7XG4gIHRvZ2dsZUZvbGRMaSh0aGlzKTtcbiAgaWYgKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9O1xuICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5wYXJlbnROb2RlLmRhdGFzZXQuYXBpSWQpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QXBpU3VjY2Vzcy5iaW5kKHRoaXMucGFyZW50Tm9kZSkpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5mdW5jdGlvbiBiaW5kZXZlbnRzKCkge1xuICBsZXQgYXBpTGlzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWxpLWRlc2NyaXB0aW9uJyk7XG4gIFtdLnNsaWNlLmNhbGwoYXBpTGlzKS5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24uY2FsbCh0aGlzLCBldik7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkQXBpVHJlZShkYXRhID0ge30sIGNvbnRhaW5lck5vZGUsIGlzTmV3QXBpKSB7XG4gIGxldCBuZXdBcGkgPSBuZXcgQXBpRG9tKGRhdGEsIGNvbnRhaW5lck5vZGUsIGlzTmV3QXBpKTtcbiAgYXBpc0Fyci5wdXNoKG5ld0FwaSk7XG59XG5cbmxldCBkZWJvdW5jZWROZXdBcGlCdG4gPSBkZWJvdW5jZShwcm9jZXNzTmV3QXBpQ2xpY2ssIDUwMCwgdHJ1ZSk7XG5mdW5jdGlvbiBwcm9jZXNzTmV3QXBpQ2xpY2soKSB7XG4gIGxldCBhcGlVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11bCcpWzBdO1xuICBsZXQgYmFzZUFwaUxpID0gc3RyVG9Eb20obmV3QXBpTGlUcGwoKSk7XG4gIGFwaVVsLmluc2VydEJlZm9yZShiYXNlQXBpTGksIGFwaVVsLmZpcnN0Q2hpbGQpO1xuICBhZGRBcGlUcmVlKHt9LCBiYXNlQXBpTGksIHRydWUpO1xuICB0b2dnbGVGb2xkTGkoYmFzZUFwaUxpLmNoaWxkcmVuWzBdKTtcbiAgYmFzZUFwaUxpLmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG5ld0FwaUJ0bigpIHtcbiAgbGV0IG5ld0FwaURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWRlcicpWzBdO1xuICBuZXdBcGlEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LWFwaScpO1xuICBuZXdBcGlEaXYuaW5uZXJIVE1MID0gYDxpbnB1dCBjbGFzcz1cImFkZC1hcGktYnRuXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwibmV3IEFQSVwiPmA7XG4gIG5ld0FwaURpdi5jaGlsZHJlblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlZE5ld0FwaUJ0bik7XG4gIGluc2VydEFmdGVyKG5ld0FwaURpdiwgaGVhZGVyKTtcbiAgcmV0dXJuIG5ld0FwaURpdjtcbn1cblxuZnVuY3Rpb24gbmV3QXBpTGlUcGwoZGF0YSA9IHt9KSB7XG4gIHZhciB0cGwgPSBgXG4gICAgPGxpIGNsYXNzPVwiYXBpLWxpXCIgZGF0YS1hcGktaWQ9XCIke2RhdGEuaWQgfHwgbnVsbH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbGktZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktY29sbGFwc2VcIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS11cmlcIj4ke2RhdGEudXJpIHx8ICcoTm8gdXJpKSd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1uYW1lXCI+JHtkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnKE5vIG5hbWUpJ308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuICBgO1xuICByZXR1cm4gdHBsO1xufVxuZnVuY3Rpb24gcmVuZGVyQWxsQXBpcyhkYXRhKSB7XG4gIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBjb25zdCB0bXBsID0gZGF0YSA9PiBodG1sYFxuICAgICAgPHVsIGNsYXNzPVwiYXBpLXVsXCI+XG4gICAgICAke2RhdGEubWFwKGl0ZW0gPT4gaHRtbGBcbiAgICAgICAgJHtuZXdBcGlMaVRwbChpdGVtKX1cbiAgICAgIGApfVxuICAgICAgPC91bD5cbiAgYDtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkZXInKVswXTtcbiAgbGV0IGFwaUxpc3RFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYXBpTGlzdEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwtd3JhcHBlcicpO1xuICBhcGlMaXN0RWxlLmlubmVySFRNTCA9IHRtcGwoZGF0YSk7XG4gIGluc2VydEFmdGVyKGFwaUxpc3RFbGUsIG5ld0FwaUJ0bigpKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsQXBpcygpIHtcbiAgJGh0dHAocm9vdEFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5nZXRBbGxBcGlzU3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cblxuZnVuY3Rpb24gYmluZEV2ZW50KGV2KSB7XG4gIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktc2F2ZScpKSB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICdzZWN0aW9uJzogZXYudGFyZ2V0LnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlY3Rpb24nKVswXS52YWx1ZSxcbiAgICAgICd1cmknOiBldi50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUsXG4gICAgICAnbWV0aG9kJzogZXYudGFyZ2V0LnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdLnZhbHVlXG4gICAgfTtcbiAgICBpZiAoZXYudGFyZ2V0LmRhdGFzZXQubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQQVRDSCcpIHtcbiAgICAgICRodHRwKHJvb3RBUEkgKyAnLycgKyBldi50YXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKS5kYXRhc2V0LmlkKVxuICAgICAgLnBhdGNoKHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wYXRjaFN1Y2Nlc3MpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoZXYudGFyZ2V0LmRhdGFzZXQubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQT1NUJykge1xuICAgICAgJGh0dHAocm9vdEFQSSlcbiAgICAgIC5wb3N0KHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wb3N0U3VjY2VzcylcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWwtZGF0YXJvb3QtY2hpbGQnKSkge1xuICAgIHBvcHVwKGV2LCB7fSwgZGVsZXRlQXBpLmJpbmQodGhpcywgZXYpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZGVsZXRlQXBpKGV2KSB7XG4gICAgaWYgKCFldi50YXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKS5kYXRhc2V0LmlkKSB7XG4gICAgICBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAkaHR0cChyb290QVBJICsgJy8nICsgZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZClcbiAgICAuZGVsZXRlKHBhcmFtcylcbiAgICAudGhlbihjYWxsYmFjay5kZWxldGVTdWNjZXNzLmJpbmQoZXYpKVxuICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9hcGlPcGVyYXRpb24uanNcbiAqKi8iLCIvKipcbi8vIEItPiBIZXJlIHlvdSBkZWZpbmUgaXRzIGZ1bmN0aW9ucyBhbmQgaXRzIHBheWxvYWRcbnZhciBtZG5BUEkgPSAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvc2VhcmNoLmpzb24nO1xudmFyIHBheWxvYWQgPSB7XG4gICd0b3BpYycgOiAnanMnLFxuICAncScgICAgIDogJ1Byb21pc2UnXG59O1xudmFyIGNhbGxiYWNrID0ge1xuICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDEsICdzdWNjZXNzJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH0sXG4gIGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDIsICdlcnJvcicsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9XG59O1xuLy8gRW5kIEJcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbFxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMSkgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzLCBjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMikgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAudGhlbih1bmRlZmluZWQsIGNhbGxiYWNrLmVycm9yKTtcbiAqL1xuXG4vLyBBLT4gJGh0dHAgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBzdGFuZGFyZCBBZGFwdGVyIHBhdHRlcm5cbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL3NlcmlhbGl6ZSc7XG5pbXBvcnQge2lzRW1wdHksIG1lcmdlT2JqLCBhZGRQcmVmaXhUb09iaiwgd3JhcE9ian0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuL2NzcmYnO1xuXG5leHBvcnQgZnVuY3Rpb24gJGh0dHAodXJsKSB7XG4gIC8vIEEgc21hbGwgZXhhbXBsZSBvZiBvYmplY3RcbiAgdmFyIGNvcmUgPSB7XG5cbiAgICAvLyBNZXRob2QgdGhhdCBwZXJmb3JtcyB0aGUgYWpheCByZXF1ZXN0XG4gICAgYWpheDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFyZ3MgPSB7fSwgcHJlZml4KSB7XG4gICAgICAvLyBmb3IgUmFpbHNcbiAgICAgIC8vIHVybCA9IHVybCArICcuanNvbic7XG4gICAgICAvLyBDcmVhdGluZyBhIHByb21pc2VcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGVzIHRoZSBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnIHx8IG1ldGhvZCA9PT0gJ1BVVCcgfHwgbWV0aG9kID09PSAnUEFUQ0gnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICBsZXQgdXJpID0gSlNPTi5zdHJpbmdpZnkoZXh0ZW5kR2VuZXJhbFBhcmFtcyh3cmFwT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgLy8gY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCh1cmkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gc2VyaWFsaXplKGV4dGVuZEdlbmVyYWxQYXJhbXMoYWRkUHJlZml4VG9PYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsICsgJz8nICsgdXJpKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZXNvbHZlXCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBlcXVhbCB0byAyeHhcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlamVjdFwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZGlmZmVyZW50IHRoYW4gMnh4XG4gICAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFkYXB0ZXIgcGF0dGVyblxuICByZXR1cm4ge1xuICAgICdnZXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0dFVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwb3N0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQT1NUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3B1dCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUFVUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3BhdGNoJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQQVRDSCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0RFTEVURScsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4dGVuZEdlbmVyYWxQYXJhbXMob2JqKSB7XG4gIGxldCBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIGxldCBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCk7XG4gIGxldCBnZW5lcmFsT2JqID0ge307XG4gIGdlbmVyYWxPYmoudXRmOCA9ICfinJMnO1xuICBnZW5lcmFsT2JqW2NzcmZQYXJhbV0gPSBjc3JmVG9rZW47XG4gIHJldHVybiBtZXJnZU9iaihvYmosIGdlbmVyYWxPYmopO1xufVxuLy8gRW5kIEFcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanNcbiAqKi8iLCIvKipcbiAqIFtzZXJpYWxpemUgY29udmVydHMgcmVjdXJzaXZlIG9iamVjdHNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG9iaiAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHByZWZpeCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBjb25zb2xlLmxvZyhzZXJpYWxpemUoe2ZvbzogXCJoaSB0aGVyZVwiLCBiYXI6IHsgYmxhaDogMTIzLCBxdXV4OiBbMSwgMiwgM10gfX0pKTtcbiAqIGZvbz1oaSUyMHRoZXJlJmJhciU1QmJsYWglNUQ9MTIzJmJhciU1QnF1dXglNUQlNUIwJTVEPTEmYmFyJTVCcXV1eCU1RCU1QjElNUQ9MiZiYXIlNUJxdXV4JTVEJTVCMiU1RD0zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xvbmVPYmoob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuLyogY29uc2lkZXIgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmoob2JqMSA9IHt9LCBvYmoyKSB7XG4gIGxldCBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iajEpKTtcbiAgZm9yIChsZXQga2V5IGluIG9iajIpIHtcbiAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9iajJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcmVmaXhUb09iaihvYmosIHByZWZpeCkge1xuICBpZiAoIXByZWZpeCkgcmV0dXJuIG9iajtcbiAgbGV0IG5ld09iaiA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbJycgKyBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSddID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcE9iaihvYmosIHdyYXBwZXIpIHtcbiAgaWYgKCF3cmFwcGVyKSByZXR1cm4gb2JqO1xuICB2YXIgbmV3T2JqID0ge307XG4gIG5ld09ialt3cmFwcGVyXSA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbd3JhcHBlcl1ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9Eb20oc3RyKSB7XG4gIGxldCB0bXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWxlLmlubmVySFRNTCA9IHN0cjtcbiAgbGV0IHJldHVybkRvbSA9IHRtcEVsZS5jaGlsZHJlblswXTtcbiAgcmV0dXJuIHJldHVybkRvbTtcbn1cbi8qKlxuICogW2luc2VydEFmdGVyIGRlc2NyaXB0aW9uOiBBY2NvcmRpbmcgdG8gTUROIGlmIHRoZSBlbGVtZW50IGlzIGxhc3QgKGFuZCBzbyBuZXh0U2libGluZyBpcyBudWxsKSB0aGUgbmV3Tm9kZSB3aWxsIGJlIGFwcGVuZGVkIGFzIGV4cGVjdGVkXVxuICogQHBhcmFtICB7W3R5cGVdfSBuZXdOb2RlICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXJlbmNlTm9kZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9ICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICByZWZlcmVuY2VOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUubmV4dFNpYmxpbmcpO1xufVxuXG4vLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4vLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4vLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbi8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4vKlxudmFyIG15RWZmaWNpZW50Rm4gPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgLy8gQWxsIHRoZSB0YXhpbmcgc3R1ZmYgeW91IGRvXG59LCAyNTApO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgbXlFZmZpY2llbnRGbik7XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgdmFyIHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICBpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgfTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qc1xuICoqLyIsImltcG9ydCB7aHRtbEVzY2FwZX0gZnJvbSAnLi9odG1sRXNjYXBlJztcbmV4cG9ydCBmdW5jdGlvbiBodG1sKGxpdGVyYWxTZWN0aW9ucywgLi4uc3Vic3RzKSB7XG4gIC8vIFVzZSByYXcgbGl0ZXJhbCBzZWN0aW9uczogd2UgZG9u4oCZdCB3YW50XG4gIC8vIGJhY2tzbGFzaGVzIChcXG4gZXRjLikgdG8gYmUgaW50ZXJwcmV0ZWRcbiAgbGV0IHJhdyA9IGxpdGVyYWxTZWN0aW9ucy5yYXc7XG5cbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIHN1YnN0cy5mb3JFYWNoKChzdWJzdCwgaSkgPT4ge1xuICAgIC8vIFJldHJpZXZlIHRoZSBsaXRlcmFsIHNlY3Rpb24gcHJlY2VkaW5nXG4gICAgLy8gdGhlIGN1cnJlbnQgc3Vic3RpdHV0aW9uXG4gICAgbGV0IGxpdCA9IHJhd1tpXTtcblxuICAgIC8vIEluIHRoZSBleGFtcGxlLCBtYXAoKSByZXR1cm5zIGFuIGFycmF5OlxuICAgIC8vIElmIHN1YnN0aXR1dGlvbiBpcyBhbiBhcnJheSAoYW5kIG5vdCBhIHN0cmluZyksXG4gICAgLy8gd2UgdHVybiBpdCBpbnRvIGEgc3RyaW5nXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3QpKSB7XG4gICAgICBzdWJzdCA9IHN1YnN0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBzdWJzdGl0dXRpb24gaXMgcHJlY2VkZWQgYnkgYSBkb2xsYXIgc2lnbixcbiAgICAvLyB3ZSBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGl0XG4gICAgaWYgKGxpdC5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICBzdWJzdCA9IGh0bWxFc2NhcGUoc3Vic3QpO1xuICAgICAgbGl0ID0gbGl0LnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmVzdWx0ICs9IGxpdDtcbiAgICByZXN1bHQgKz0gc3Vic3Q7XG4gIH0pO1xuICAvLyBUYWtlIGNhcmUgb2YgbGFzdCBsaXRlcmFsIHNlY3Rpb25cbiAgLy8gKE5ldmVyIGZhaWxzLCBiZWNhdXNlIGFuIGVtcHR5IHRlbXBsYXRlIHN0cmluZ1xuICAvLyBwcm9kdWNlcyBvbmUgbGl0ZXJhbCBzZWN0aW9uLCBhbiBlbXB0eSBzdHJpbmcpXG4gIHJlc3VsdCArPSByYXdbcmF3Lmxlbmd0aCAtIDFdOyAvLyAoQSlcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGh0bWxFc2NhcGUoc3RyKSB7XG5cdHN0ciA9ICcnICsgc3RyOyAvLyBmb3IgbnVtYmVycyBldGMuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvJi9nLCAnJmFtcDsnKSAvLyBmaXJzdCFcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvYC9nLCAnJiM5NjsnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzXG4gKiovIiwiaW1wb3J0IHtkaXNhYmxlU2Nyb2xsLCBlbmFibGVTY3JvbGx9IGZyb20gJy4vdG9nZ2xlU2Nyb2xsJztcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cChldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgcG9wdXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcG9wdXBFbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtbGF5ZXInKTtcbiAgcG9wdXBFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVQb3B1cFRwbCgpO1xuICBwb3NpdGlvblBvcHVwRWxlKHBvcHVwRWxlLCBldik7XG4gIGJpbmRQb3B1cEV2ZW50cyhwb3B1cEVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwRWxlKTtcbiAgZGlzYWJsZVNjcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBvcHVwVHBsKGRhdGEpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtdGV4dFwiPkFyZSB5b3Ugc3VyZSB0byBkZWxldGUgdGhpcyBBUEk/PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRQb3B1cEV2ZW50cyhlbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1zaGFkb3cnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29uZmlybS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm0uYmluZCh0aGlzLCBldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm0oZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBjYWxsYmFjaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uUG9wdXBFbGUoZWxlLCBjb29yZGluYXRlcykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29udGVudCcpWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZXMucGFnZVggKyAncHgsICcgKyBjb29yZGluYXRlcy5wYWdlWSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2KSB7XG4gIGlmIChldi50YXJnZXQgPT09IGV2LmN1cnJlbnRUYXJnZXQpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucGFyZW50Tm9kZSk7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qc1xuICoqLyIsIi8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDAsXG4vLyBzcGFjZWJhcjogMzIsIHBhZ2V1cDogMzMsIHBhZ2Vkb3duOiAzNCwgZW5kOiAzNSwgaG9tZTogMzZcbnZhciBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikgLy8gb2xkZXIgRkZcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbndoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG1vZGVybiBzdGFuZGFyZFxuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG9sZGVyIGJyb3dzZXJzLCBJRVxuICB3aW5kb3cub250b3VjaG1vdmUgID0gcHJldmVudERlZmF1bHQ7IC8vIG1vYmlsZVxuICBkb2N1bWVudC5vbmtleWRvd24gID0gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9ud2hlZWwgPSBudWxsO1xuICB3aW5kb3cub250b3VjaG1vdmUgPSBudWxsO1xuICBkb2N1bWVudC5vbmtleWRvd24gPSBudWxsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qc1xuICoqLyIsImltcG9ydCB7aW5zZXJ0QWZ0ZXIsIHN0clRvRG9tfSBmcm9tICcuL3V0aWxpdGllcyc7XG5leHBvcnQgZnVuY3Rpb24gZmxhc2goZGF0YSwgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9KSB7XG4gIGxldCBmbGFzaEVsZSA9IHN0clRvRG9tKGZsYXNoVHBsKGRhdGEpKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmbGFzaEVsZSk7XG4gIHNldFRpbWVvdXQoZGVzdG9yeS5iaW5kKG51bGwsIGZsYXNoRWxlLCBjYWxsYmFjayksIDIwMDApO1xufVxuXG5mdW5jdGlvbiBmbGFzaFRwbChkYXRhKSB7XG4gIGxldCBzdHIgPSBgXG5cdFx0PGRpdiBjbGFzcz1cImZsYXNoLWxheWVyICR7ZGF0YS5lcnJvciA/ICdlcnJvcicgOiAnc3VjY2Vzcyd9XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwibWVzc2FnZVwiPiR7ZGF0YS5lcnJvciB8fCBkYXRhLm1lc3NhZ2V9PC9kaXY+XG5cdFx0PC9kaXY+XG5cdGAgIDtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gZGVzdG9yeShlbGUsIGNhbGxiYWNrKSB7XG4gIGVsZS5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBmdW5jdGlvbigpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG4gIH0pO1xuICBlbGUuY2xhc3NMaXN0LmFkZCgnYmxpbmsnKTtcbiAgY2FsbGJhY2soKTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzXG4gKiovIiwiLyoqXG4gKiB3aWR0aCBvZiBzaW5nbGUgc3ZnIHBhdGg6IDMwcHhcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtUcmVlfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmltcG9ydCB7Z2V0VHJhbnNsYXRlWCwgeGhyLCBiZWF1dGlmeUpTT04sIGhpZ2h0bGlnaHRKU09OfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmZ1bmN0aW9uIHBlckFwaVRwbChkYXRhLCBpc05ld0FwaSA9IGZhbHNlKSB7XG4gIGxldCB0cGwgPVxuICAgICAgYDxkaXYgY2xhc3M9XCJhcGktaW5mb1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPkFQSTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS11cmlcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwiXCIgLz4gXG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+bWV0aG9kOjwvbGFiZWw+XG4gICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImFwaS1tZXRob2RcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkdFVFwiIHNlbGVjdGVkPkdFVDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUE9TVFwiPlBPU1Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBBVENIXCI+UEFUQ0g8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRFTEVURVwiPkRFTEVURTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxsYWJlbD5zZWN0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPmRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLWRlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXNhdmVcIiBkYXRhLW1ldGhvZD1cIiR7cGF0Y2hPclBvc3QoaXNOZXdBcGkpfVwiIGRhdGEtYWN0aW9uPVwiL2FwaXMke3NhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSl9XCIgPiR7aXNOZXdBcGkgPyAnY3JlYXRlJyA6ICdzYXZlJ308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktdGVzdFwiPnRlc3Q8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS13cmFwcGVyXCI+PGRpdiBjbGFzcz1cImFwaS10cmVlLWZyYW1lXCI+PHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+PC9kaXY+PGRpdiBjbGFzcz1cImFwaS10cmVlXCI+PC9kaXY+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWRhdGFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3cy1jb250cm9sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1iZWF1dGlmeVwiPmJlYXV0aWZ5PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtcHJldmlld1wiPnByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICByZXR1cm4gdHBsO1xufVxuXG52YXIgbGVhZkNvbnRlbnRUcGwgPSAnPGkgY2xhc3M9XCJyZW1vdmUtY2hpbGRcIj4tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1rZXlcIiBwbGFjZWhvbGRlcj1cImtleVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi12YWx1ZVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiYWRkLWNoaWxkXCI+KzwvaT4nO1xuXG52YXIgaW5pdFJlY3RPYmogPSB7XG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMFxufTtcbnZhciBwZXJTVkdQYXRoV2lkdGggPSAzMDtcbnZhciByb290Tm9kZVdpZHRoID0gcGVyU1ZHUGF0aFdpZHRoICsgMTU7XG5cbmZ1bmN0aW9uIHBhdGNoT3JQb3N0KGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICdQT1NUJyA6ICdQQVRDSCc7XG59XG5mdW5jdGlvbiBzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJycgOiBgLyR7ZGF0YS5pZH1gO1xufVxuZnVuY3Rpb24gY3JlYXRlUGVyQXBpKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHZhciBwZXJBcGlFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGVyQXBpRWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGVyLWFwaScpO1xuICBwZXJBcGlFbGUuZGF0YXNldC5pZCA9IGlzTmV3QXBpID8gJycgOiBkYXRhLmlkO1xuICBwZXJBcGlFbGUuaW5uZXJIVE1MID0gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpKTtcbiAgcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSA9IGlzTmV3QXBpID8gJycgOiBkYXRhLnVyaTtcbiAgcmV0dXJuIHBlckFwaUVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSkge1xuICB0aGlzLmFwaUNvbnRhaW5lciA9IGNvbnRhaW5lck5vZGU7XG5cbiAgdGhpcy5hcGlDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlUGVyQXBpKGRhdGEsIGlzTmV3QXBpKSk7XG5cbiAgdGhpcy5hcGlFbGUgPSB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZXItYXBpJylbMF07XG4gIFxuICB0aGlzLmJpbmRFdmVudHNUb01SQ0FQSSgpO1xuXG4gIHRoaXMubGVhZkluZGV4ID0gMTtcblxuICB0aGlzLiRhcGlUcmVlID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKDAsIDEsIDAsIGluaXRSZWN0T2JqKSk7XG5cbiAgdGhpcy4kYXBpVHJlZUZyYW1lID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtZnJhbWUnKVswXTtcblxuICB0aGlzLmluaXRBcGlUcmVlKCk7XG5cbiAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuXG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9ICcnO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLnN0b3JlQXBpUmV0dXJuRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gZGF0YTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmNsaWNrKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5qc29uVmlldyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyICRwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgJHByZS5pbm5lckhUTUwgPSBkYXRhO1xuICB0aGlzLiRkYXRhVmlldy5pbm5lckhUTUwgPSAnJztcbiAgdGhpcy4kZGF0YVZpZXcuYXBwZW5kQ2hpbGQoJHByZSk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0FQSSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBuZXdseUNyZWF0ZWRBcGlOb2RlID0gdGhpcy5hcGlFbGU7XG5cbiAgdmFyICRhcGlTYXZlID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdO1xuICB2YXIgJGFwaVVyaSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdO1xuICB2YXIgJGFwaVRlc3QgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10ZXN0JylbMF07XG4gIHZhciAkYXBpTWV0aG9kID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF07XG5cbiAgdmFyICRkYXRhUmF3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXJhdycpWzBdO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtYmVhdXRpZnknKVswXTtcbiAgdmFyICRkYXRhSGlnaGxpZ2h0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWhpZ2hsaWdodCcpWzBdO1xuICB2YXIgJGRhdGFQcmV2aWV3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXByZXZpZXcnKVswXTtcblxuICB0aGlzLiRkYXRhVmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS12aWV3JylbMF07XG5cbiAgJGFwaVNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICB9KTtcblxuICAkYXBpVGVzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB4aHIoJGFwaU1ldGhvZC52YWx1ZSwgJGFwaVVyaS52YWx1ZSwgdGhpcy5zdG9yZUFwaVJldHVybkRhdGEuYmluZCh0aGF0KSk7XG4gIH0pO1xuXG4gICRkYXRhUmF3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcodGhpcy5hcGlSZXR1cm5EYXRhKTtcbiAgfSk7XG5cbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoYmVhdXRpZnlKU09OKEpTT04ucGFyc2UodGhpcy5hcGlSZXR1cm5EYXRhKSkpO1xuICB9KTtcblxuICAkZGF0YUhpZ2hsaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGhpZ2h0bGlnaHRKU09OKEpTT04ucGFyc2UodGhpcy5hcGlSZXR1cm5EYXRhKSkpO1xuICB9KTtcblxuICAkZGF0YVByZXZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldygnVGhpcyBmZWF0dXJlIGhhcyBub3QgYmVlbiBhY2NvbXBsaXNoZWQgeWV0LicpO1xuICB9KTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5vcGVyYXRlRGF0YVJvb3RDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBhZGRNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBhZGRNYXJrLmNsYXNzTmFtZSA9ICdhZGQtZGF0YXJvb3QtY2hpbGQnO1xuICBhZGRNYXJrLnRleHRDb250ZW50ID0gJysnO1xuICBhZGRNYXJrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoYXQubGVhZkluZGV4ICs9IDE7XG4gICAgICB2YXIgcGFyZW50SWR4ID0gMDtcbiAgICAgIHZhciBub2RlTGV2ZWwgPSAwO1xuICAgICAgdGhhdC5hcGlUcmVlLmFkZCh0aGF0LmxlYWZJbmRleCwgcGFyZW50SWR4LCB0aGF0LmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgICAgIHRoYXQuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZHgsIHRoYXQubGVhZkluZGV4LCBub2RlTGV2ZWwsIGluaXRSZWN0T2JqKSk7XG4gICAgICB2YXIgb2JqID0gdGhhdC5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgICAgIHRoYXQuc3R5bGVOb2RlcyhvYmopO1xuICAgICAgdGhhdC5iaW5kRXZlbnRzVG9NUkNFKCk7XG4gICAgfSk7XG4gIHRoaXMuJGFwaVRyZWUuaW5zZXJ0QmVmb3JlKGFkZE1hcmssIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG5cbiAgdmFyIGRlbE1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRlbE1hcmsuY2xhc3NOYW1lID0gJ2RlbC1kYXRhcm9vdC1jaGlsZCc7XG4gIGRlbE1hcmsudGV4dENvbnRlbnQgPSAnLSc7XG4gIGRlbE1hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgLyogdGhpcyBBUEkgaXMgZGVsZXRlZC4gKi9cblxuICAgICAgLy8gdGhhdC5hcGlDb250YWluZXIucmVtb3ZlQ2hpbGQoZXYuY3VycmVudFRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoZGVsTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5pbml0QXBpVHJlZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFwaVRyZWUgPSBuZXcgVHJlZSgwKTtcbiAgdGhpcy5hcGlUcmVlLmFkZCgxLCAwLCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgdGhpcy5vcGVyYXRlRGF0YVJvb3RDaGlsZCgpO1xuXG4gIHJldHVybiB0aGlzLmFwaVRyZWU7XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmRlbE5vZGUgPSBmdW5jdGlvbihjdHgpIHtcbiAgdmFyIGN1cnJlbnRMZWFmID0gY3R4LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICB2YXIgcGFyZW50SWR4ID0gKCtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50ID09PSAwKSA/IDAgOiArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcblxuICB2YXIgbm9kZXNBcnIgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEZXNjZW5kYW50cyhjdXJyZW50SWR4KTtcbiAgdmFyIGlkeEFyciA9IG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpO1xuICB0aGlzLmFwaVRyZWUucmVtb3ZlKGN1cnJlbnRJZHgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB0aGlzLnJlbW92ZU5vZGVzRnJvbURvbShpZHhBcnIpO1xuXG4gIGNvbnNvbGUubG9nKHRoaXMuYXBpVHJlZSk7XG5cbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWR4KTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUucmVtb3ZlTm9kZXNGcm9tRG9tID0gZnVuY3Rpb24oYXJyKSB7XG4gIHZhciBhbGxMZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBhbGxMZWF2ZXNMZW4gPSBhbGxMZWF2ZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbExlYXZlc0xlbjsgaSsrKSB7XG4gICAgaWYgKGFyci5pbmRleE9mKCthbGxMZWF2ZXNbaV0uZGF0YXNldC5pbmRleCkgIT09IC0xKSB7XG4gICAgICB0aGlzLiRhcGlUcmVlLnJlbW92ZUNoaWxkKGFsbExlYXZlc1tpXSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpIHtcbiAgdmFyIG5vZGVzQXJyTGVuID0gbm9kZXNBcnIubGVuZ3RoO1xuICB2YXIgaWR4QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXNBcnJMZW47IGkrKykge1xuICAgIGlkeEFyci5wdXNoKG5vZGVzQXJyW2ldLmRhdGEpO1xuICB9O1xuICByZXR1cm4gaWR4QXJyO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxlYXZlcyA9IHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpO1xuICB2YXIgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDtcbiAgdmFyIG5ld2x5Q3JlYXRlZExlYWYgPSBsZWF2ZXNbbGVhdmVzTGVuIC0gMV07XG4gIHZhciAkYWRkQ2hpbGQgPSBuZXdseUNyZWF0ZWRMZWFmLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZC1jaGlsZCcpWzBdO1xuICAkYWRkQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHggPT4ge1xuICAgIHRoaXMuYWRkQ2hpbGQoY3R4KTtcbiAgfSk7XG5cbiAgdmFyICRyZW1vdmVDaGlsZCA9IG5ld2x5Q3JlYXRlZExlYWYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVtb3ZlLWNoaWxkJylbMF07XG4gICRyZW1vdmVDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eCA9PiB7XG4gICAgdGhpcy5kZWxOb2RlKGN0eCk7XG4gIH0pO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5zZXRQYXJlbnROb2RlVmFsID0gZnVuY3Rpb24oaWR4KSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBxdWV1ZSA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gIHZhciBxdWV1ZUxlbiA9IHF1ZXVlLl9uZXdlc3RJbmRleCAtIHF1ZXVlLl9vbGRlc3RJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSBsZWF2ZXMubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaWYgKCtsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCA9PT0gaWR4KSB7XG4gICAgICBpZiAocXVldWVMZW4gPiAwKSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnLS0tPic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZGV4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWwgKyAxO1xuXG4gIC8vIGFwaVRyZWUgb3BlcmF0aW9uXG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkZXgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaih0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpKTtcbiAgdmFyIGNoaWxkcmVuTm9kZXMgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChwYXJlbnRJZGV4KTtcblxuICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgcGVyTm9kZSBpbiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2goY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyTGVuID0gY2hpbGRyZW5JZHhBcnIubGVuZ3RoO1xuXG4gIGNsb25lZFJlY3RPYmoucmlnaHQgLT0gMzA7XG5cbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gPSBjaGlsZHJlbklkeEFyckxlbiA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSArIChjaGlsZHJlbklkeEFyckxlbiAtIDEpICogMjA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZGV4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgY29uc29sZS5sb2codGhpcy5hcGlUcmVlKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZGV4KTtcblxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZCwgbm9kZUluZGV4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcsIHBhcmVudElkKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jywgbm9kZUluZGV4KTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWxldmVsJywgbm9kZUxldmVsKTtcbiAgbmV3TGVhZlNwYW4uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBNYXRoLnJvdW5kKHJlY3RPYmoud2lkdGggKiBub2RlTGV2ZWwgKyBwZXJTVkdQYXRoV2lkdGggKiBub2RlTGV2ZWwpICsgJ3B4LCAnICsgTWF0aC5yb3VuZChyZWN0T2JqLmJvdHRvbSkgKyAncHgsIDApJztcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZkNvbnRlbnRUcGw7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxlYWYocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIG5ld0xlYWYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikpO1xuICByZXR1cm4gbmV3TGVhZjtcbn1cbkFwaURvbS5wcm90b3R5cGUuc3R5bGVOb2RlcyA9IGZ1bmN0aW9uKHN0eWxlT2JqKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBsZWFmSWR4LCBvZmZzZXRZLCBvcmlnaW5hbFggPSAnJztcblxuICB2YXIgc3R5bGVzQXJyID0gW10sIHhWYWx1ZSwgeVZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVhdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3JpZ2luYWxYID0gZ2V0VHJhbnNsYXRlWChsZWF2ZXNbaV0pO1xuICAgIGxlYWZJZHggPSArKGxlYXZlc1tpXS5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAodmFyIHN0eWxlT2JqSWR4IGluIHN0eWxlT2JqKSB7XG4gICAgICBpZiAoK3N0eWxlT2JqSWR4ID09PSBsZWFmSWR4KSB7XG4gICAgICAgIG9mZnNldFkgPSBzdHlsZU9ialtzdHlsZU9iaklkeF0gKiA1MjtcbiAgICAgIH07XG4gICAgfVxuICAgIHN0eWxlc0Fyci5wdXNoKFtvcmlnaW5hbFgsIG9mZnNldFldKTtcbiAgfTtcblxuICBmb3IgKHZhciBqID0gMCwgc3R5bGVzQXJyTGVuID0gc3R5bGVzQXJyLmxlbmd0aDsgaiA8IHN0eWxlc0FyckxlbjsgaisrKSB7XG4gICAgbGVhdmVzW2pdLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgc3R5bGVzQXJyW2pdWzBdICsgJ3B4LCAnICsgc3R5bGVzQXJyW2pdWzFdICsgJ3B4LCAwKSc7XG4gIH1cblxuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5hZGRTaWJsaW5nID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWw7XG4gIHBhcmVudElkeCA9ICgrcGFyZW50SWR4ID09PSAwKSA/IDAgOiBwYXJlbnRJZHg7XG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB2YXIgcmVjdE9iaiA9IHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSk7XG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHJlY3RPYmopO1xuICBjbG9uZWRSZWN0T2JqLnJpZ2h0ID0gY2xvbmVkUmVjdE9iai5yaWdodCAtIGNsb25lZFJlY3RPYmoud2lkdGg7XG4gIGNsb25lZFJlY3RPYmouYm90dG9tICs9IDMwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWR4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcblxufTtcblxuLyogdXRpbHMgKi9cbmZ1bmN0aW9uIGNsb25lUmVjdE9iaihvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9iai50b3AsXG4gICAgYm90dG9tOiBvYmouYm90dG9tLFxuICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgd2lkdGg6IG9iai53aWR0aCxcbiAgICBoZWlnaHQ6IG9iai5oZWlnaHRcbiAgfTtcbn1cblxuLyogbWFuaXB1bGF0ZSBTVkcgKi9cbkFwaURvbS5wcm90b3R5cGUuY2xlYXJTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF07XG4gIHdoaWxlIChzdmcubGFzdENoaWxkKSB7XG4gICAgc3ZnLnJlbW92ZUNoaWxkKHN2Zy5sYXN0Q2hpbGQpO1xuICB9XG59O1xuLyoqXG4gKiBbZHJhd1NWRyBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5BcGlEb20ucHJvdG90eXBlLmRyYXdTVkcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclNWRygpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBzdmdQYXJ0aWFscyA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBzdmdQYXJ0aWFscy5wdXNoKHRoYXQuY3JlYXRlU2luZ2xlU1ZHKG5vZGUuZGF0YSwgbm9kZS5jb2x1bW4sIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsLCAobm9kZS50b3RhbG9mZnNldHlsZXZlbCAtIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsKSkpO1xuICAgIH07XG4gIH07XG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZURGKGNhbGxiYWNrKTtcblxuICB2YXIgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdmdQYXJ0aWFscy5sZW5ndGg7IGkrKykge1xuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoc3ZnUGFydGlhbHNbaV0pO1xuICB9XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF0uYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuY3JlYXRlU2luZ2xlU1ZHID0gZnVuY3Rpb24oaWR4LCBob3JpLCBwYXJlbnRWZXJ0LCBkdmVydCkge1xuXG4gIHZhciBzdmducyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIHZhciBuZXdQYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z25zLCAncGF0aCcpO1xuICB2YXIgY29udHJvbFJhdGUgPSAwLjI7XG4gIHZhciBteCwgbXksIHF4LCBxeSwgcXh4LCBxeXksIHR4LCB0eTtcbiAgaG9yaSA9IGhvcmkgLSAxO1xuICBkdmVydCA9IGR2ZXJ0O1xuICBwYXJlbnRWZXJ0ID0gcGFyZW50VmVydDtcblxuICBteCA9IGhvcmkgKiA1MDE7XG4gIG15ID0gcGFyZW50VmVydCAqIDUyICsgODtcbiAgcXggPSBteCArIDEwO1xuICBxeSA9IG15O1xuICBxeHggPSBteCArIDE1O1xuICBxeXkgPSAobXkgKyAoZHZlcnQgLyAyKSAqIDUyKTtcbiAgdHggPSBteCArIDMwO1xuICB0eSA9IG15ICsgZHZlcnQgKiA1MjtcblxuICBuZXdQYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgJ00gJyArIG14ICsgJyAnICsgbXkgKyAnIFEgJyArIHF4ICsgJyAnICsgcXkgKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF4eCArICcgJyArIHF5eSArICcgVCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCArICcgJyArIHR5ICsgJycpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXBpLXN2Zy1wYXRoJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdkYXRhLWlkeCcsIGlkeCk7XG5cbiAgcmV0dXJuIG5ld1BhdGg7XG59O1xuXG4vKiBjYWxjdWxhdGUgZGltZW5zaW9ucyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jYWxjRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuYXBpVHJlZS5tYXhMZXZlbHMoKTtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSB0aGlzLmRpbWVuc2lvbkFyci5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBob3JpQXJyLnB1c2godGhpcy5kaW1lbnNpb25BcnJbaV0ubGVuZ3RoKTtcbiAgfTtcbiAgaG9yaU1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhvcmlBcnIpO1xuICB2ZXJ0aWNhbE1heCA9IHRoaXMuYXBpVHJlZS5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUud2lkdGggPSBob3JpTWF4ICogNTIwICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgKyAncHgnO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuXG59O1xuXG4vKiBjYWxjdWxhdGUgb2Zmc2V0ICovXG5cbkFwaURvbS5wcm90b3R5cGUubm9kZUxlZnRPZmZzZXQgPSBmdW5jdGlvbihlbCkge1xuICB2YXIgZWxSZWN0T2JqZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBib2R5UmVjdE9iaiA9IHRoaXMuJGFwaVRyZWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBjbG9uZUJvZHlSZWN0T2JqID0gY2xvbmVSZWN0T2JqKGJvZHlSZWN0T2JqKTtcbiAgdmFyIGNsb25lRWxSZWN0T2JqZWN0ID0gY2xvbmVSZWN0T2JqKGVsUmVjdE9iamVjdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnRvcCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmJvdHRvbSArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmxlZnQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QucmlnaHQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgcmV0dXJuIGNsb25lRWxSZWN0T2JqZWN0O1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanNcbiAqKi8iLCIvKipcbiAqIFtUcmVlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICpcbiAqIF9yb290IHBvaW50cyB0byB0aGUgcm9vdCBub2RlIG9mIGEgdHJlZS5cbiAqIHRyYXZlcnNlREYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBERlMuXG4gKiB0cmF2ZXJzZUJGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggQkZTLlxuICogY29udGFpbnMoZGF0YSwgdHJhdmVyc2FsKSBzZWFyY2hlcyBmb3IgYSBub2RlIGluIGEgdHJlZS5cbiAqIGFkZChkYXRhLCB0b0RhdGEsIHRyYXZlcnNlKSBhZGRzIGEgbm9kZSB0byBhIHRyZWUuXG4gKiByZW1vdmUoY2hpbGQsIHBhcmVudCkgcmVtb3ZlcyBhIG5vZGUgaW4gYSB0cmVlLlxuICpcbiAqL1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSAnLi9xdWV1ZSc7XG5leHBvcnQgZnVuY3Rpb24gVHJlZShkYXRhKSB7XG4gIHZhciBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gIHRoaXMuX3Jvb3QgPSBub2RlO1xufVxuXG5mdW5jdGlvbiBOb2RlKG5vZGVJZCkge1xuICB0aGlzLm5vZGVJZCA9IG5vZGVJZDsgLy8gbGVhZiBpbmRleCwgc3RhcnRzIGZyb20gMChyb290IG5vZGUpXG4gIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAvLyBhZGRlZCBsYXRlclxuICB0aGlzLmNoaWxkcmVubGV2ZWwgPSAxOyAvLyByb3dzIG9mIGRlc2NlbmRhbnRzIG9mIGN1cnJlbnQgbm9kZVxuICB0aGlzLmNvbHVtbiA9IDA7IC8vIHdoaWNoIGNvbHVtbiB0aGUgY3VycmVudCBub2RlIHNpdHMgaW4sIHN0YXJ0cyBmcm9tIDAoIHJvb3Qgbm9kZSBzaXRzIGluKVxuICB0aGlzLnRvdGFsb2Zmc2V0eWxldmVsID0gMDsgLy8gdG90YWwgdmVydGljYWwgb2Zmc2V0IHRvIHRoZSBjdXJyZW50IHRyZWUgXG59XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlREYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIC8vIHRoaXMgaXMgYSByZWN1cnNlIGFuZCBpbW1lZGlhdGVseS1pbnZva2luZyBmdW5jdGlvblxuICAoZnVuY3Rpb24gcmVjdXJzZShjdXJyZW50Tm9kZSkge1xuICAgIC8vIHN0ZXAgMlxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgLy8gc3RlcCAzXG4gICAgICByZWN1cnNlKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICAvLyBzdGVwIDRcbiAgICBjYWxsYmFjayhjdXJyZW50Tm9kZSk7XG5cbiAgICAvLyBzdGVwIDFcbiAgfSkodGhpcy5fcm9vdCk7XG5cbn07XG5cbi8vIGZvciB0aG9zZSBub2RlcyB3aG8gaGF2ZSBjaGlsZHJlblxuZnVuY3Rpb24gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIHtcbiAgdmFyIHRvdGFsQ2hpbGRyZW5MZXZlbHMgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB0b3RhbENoaWxkcmVuTGV2ZWxzICs9IG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsQ2hpbGRyZW5MZXZlbHM7XG59XG5UcmVlLnByb3RvdHlwZS5jYWxjQ2hpbGRyZW5MZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbm9kZS5jaGlsZHJlbmxldmVsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIDogMTtcbiAgICBub2RlLmNvbHVtbiA9IG5vZGUucGFyZW50ID8gKG5vZGUucGFyZW50LmNvbHVtbiArIDEpIDogMDtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xufTtcblxuZnVuY3Rpb24gY2FsY09mZlkoYXJyLCBkYXRhKSB7XG4gIHZhciBub2RlSWR4ID0gZmluZEluZGV4KGFyciwgZGF0YSk7XG4gIHZhciB0b3RhbFkgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVJZHg7IGkrKykge1xuICAgIHRvdGFsWSArPSBhcnJbaV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsWTtcbn1cblxuVHJlZS5wcm90b3R5cGUuY2FsY1RvdGFsT2Zmc2V0WUxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZXZlbGdhcCA9IDA7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgIG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgPSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCArIGNhbGNPZmZZKG5vZGUucGFyZW50LmNoaWxkcmVuLCBub2RlLm5vZGVJZCk7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXG4gICAgfTtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG59O1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZUJGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCk7XG5cbiAgcXVldWUuZW5xdWV1ZSh0aGlzLl9yb290KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjdXJyZW50VHJlZSk7XG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cbn07XG5cblRyZWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRyYXZlcnNhbCkge1xuICB0cmF2ZXJzYWwuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihkYXRhLCB0b0RhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgY2hpbGQgPSBuZXcgTm9kZShkYXRhKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gdG9EYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQucGFyZW50ID0gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFkZCBub2RlIHRvIGEgbm9uLWV4aXN0ZW50IHBhcmVudC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcbn07XG5cblRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGRhdGEsIGZyb21EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIHRyZWUgPSB0aGlzLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBudWxsLFxuICAgICAgaW5kZXg7XG5cbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVJZCA9PT0gZnJvbURhdGEpIHtcbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIGluZGV4ID0gZmluZEluZGV4KHBhcmVudC5jaGlsZHJlbiwgZGF0YSk7XG5cbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIHRvIHJlbW92ZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRUb1JlbW92ZSA9IHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkb2VzIG5vdCBleGlzdC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcblxuICByZXR1cm4gY2hpbGRUb1JlbW92ZTtcbn07XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIGRhdGEpIHtcbiAgdmFyIGluZGV4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycltpXS5ub2RlSWQgPT09IGRhdGEpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qIHRyZWUgYWRkb24qL1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURpcmVjdENoaWxkID0gZnVuY3Rpb24obm9kZWRhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gIHBhcmVudCA9IG51bGwsXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVkYXRhKSB7XG4gICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICB9XG4gICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKHBhcmVudC5jaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIGNhbGxiYWNrKHBhcmVudCk7XG4gICAgcGFyZW50ID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59O1xuVHJlZS5wcm90b3R5cGUuYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3R5bGVPYmogPSB7fTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHN0eWxlT2JqW25vZGUubm9kZUlkXSA9IG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqO1xufTtcblxuLyoqXG4gKiBbdHJhdmVyc2VEZXNjZW5kYW50cyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1tpbnRlZ2VyXX0gbm9kZURhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W2FycmF5XX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGVzY2VuZGFudHMgPSBmdW5jdGlvbihub2RlRGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gbm9kZURhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgcXVldWUuZW5xdWV1ZShwYXJlbnQpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgdmFyIGRlc2NlbmRhbnRzQXJyID0gW107XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZGVzY2VuZGFudHNBcnIucHVzaChjdXJyZW50VHJlZSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjZW5kYW50c0Fycjtcbn07XG5cblRyZWUucHJvdG90eXBlLm1heExldmVscyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBkYXRhUm9vdE5vZGVzID0gdGhpcy50cmF2ZXJzZURpcmVjdENoaWxkKDApO1xuICB2YXIgcm93TGV2ZWxPYmogPSB7fTtcbiAgdmFyIGhlYWRJZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgZHJuIGluIGRhdGFSb290Tm9kZXMuX3N0b3JhZ2UpIHtcbiAgICBpZiAoZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShkcm4pKSB7XG4gICAgICByb3dMZXZlbE9ialtkcm5dID0ge307XG4gICAgICByb3dMZXZlbE9ialtkcm5dWydoZWFkLWlkeCddID0gZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLm5vZGVJZDtcbiAgICAgIGhlYWRJZHhBcnIucHVzaChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlW2Rybl0ubm9kZUlkKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdElkeEZyb21RdWV1ZShxdWV1ZSkge1xuICAgIHZhciBjaGlsZHJlbklkeEFyciA9IFtdO1xuICAgIGZvciAodmFyIHBlck5vZGUgaW4gcXVldWUuX3N0b3JhZ2UpIHtcbiAgICAgIGlmICgodHlwZW9mIHBhcnNlSW50KHBlck5vZGUpID09PSAnbnVtYmVyJykgJiYgcXVldWUuX3N0b3JhZ2VbcGVyTm9kZV0uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xuICAgICAgICBjaGlsZHJlbklkeEFyci5wdXNoKHF1ZXVlLl9zdG9yYWdlW3Blck5vZGVdLm5vZGVJZCk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW5JZHhBcnI7XG4gIH1cblxuICB2YXIgbGV2ZWxOZXh0Q29sQXJyID0gW107XG5cbiAgZnVuY3Rpb24gZ2V0Um93TGV2ZWwoaWR4KSB7XG4gICAgdmFyIGRpcmVjdENoaWxkcmVuUXVldWUgPSB0aGF0LnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcbiAgICB2YXIgZGlyZWN0Q2hpbGRyZW5BcnIgPSBleHRyYWN0SWR4RnJvbVF1ZXVlKGRpcmVjdENoaWxkcmVuUXVldWUpO1xuICAgIHJldHVybiBkaXJlY3RDaGlsZHJlbkFycjtcbiAgfVxuXG4gIHZhciB1bHRpbWF0ZUFyciA9IFtdO1xuICB2YXIgcGVySGVhZCA9IFtdO1xuXG4gIGZ1bmN0aW9uIG5leHRMZXZlbENoaWxkcmVuKGFycikge1xuICAgIHZhciBuZXh0TGV2ZWxDaGlsZHJlbkFyciA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGVyTnVtID0gZ2V0Um93TGV2ZWwoYXJyW2ldKTtcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuQXJyID0gbmV4dExldmVsQ2hpbGRyZW5BcnIuY29uY2F0KHBlck51bSk7XG4gICAgfTtcbiAgICBpZiAobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKSB7XG4gICAgICBwZXJIZWFkLnB1c2gobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKTtcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuKG5leHRMZXZlbENoaWxkcmVuQXJyKTtcbiAgICB9O1xuICB9XG5cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoYXJyKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgcGVySGVhZCA9IFtdO1xuICAgICAgLy8gbGV2ZWwgMVxuICAgICAgbGV2ZWxOZXh0Q29sQXJyID0gZ2V0Um93TGV2ZWwoYXJyW2ldKTtcbiAgICAgIHBlckhlYWQucHVzaCgxKTtcbiAgICAgIGlmIChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKSB7XG4gICAgICAgIHBlckhlYWQucHVzaChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKTtcbiAgICAgICAgbmV4dExldmVsQ2hpbGRyZW4obGV2ZWxOZXh0Q29sQXJyKTtcbiAgICAgIH07XG4gICAgICB1bHRpbWF0ZUFyci5wdXNoKHBlckhlYWQpO1xuICAgIH07XG4gIH0pKGhlYWRJZHhBcnIpO1xuXG4gIHJldHVybiB1bHRpbWF0ZUFycjtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzXG4gKiovIiwiLyoqXG4gKiBbUXVldWUgZGVzY3JpcHRpb25dXG4gKiBlbnF1ZXVlKGRhdGEpIGFkZHMgZGF0YSB0byBhIHF1ZXVlLlxuICogZGVxdWV1ZSByZW1vdmVzIHRoZSBvbGRlc3QgYWRkZWQgZGF0YSB0byBhIHF1ZXVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUXVldWUoKSB7XG4gIHRoaXMuX29sZGVzdEluZGV4ID0gMTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXggPSAxO1xuICB0aGlzLl9zdG9yYWdlID0ge307XG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9uZXdlc3RJbmRleCAtIHRoaXMuX29sZGVzdEluZGV4O1xufTtcblxuUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuX3N0b3JhZ2VbdGhpcy5fbmV3ZXN0SW5kZXhdID0gZGF0YTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXgrKztcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRlc3RJbmRleCA9IHRoaXMuX29sZGVzdEluZGV4LFxuICAgICAgbmV3ZXN0SW5kZXggPSB0aGlzLl9uZXdlc3RJbmRleCxcbiAgICAgIGRlbGV0ZWREYXRhO1xuXG4gIGlmIChvbGRlc3RJbmRleCAhPT0gbmV3ZXN0SW5kZXgpIHtcbiAgICBkZWxldGVkRGF0YSA9IHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIGRlbGV0ZSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICB0aGlzLl9vbGRlc3RJbmRleCsrO1xuXG4gICAgcmV0dXJuIGRlbGV0ZWREYXRhO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvcXVldWUuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gZ2V0TWF4T2ZBcnJheShudW1BcnJheSkge1xuICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBlbGVtLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoY2xhc3NOYW1lKSA+IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLCBwcmVmaXggPSAnJztcbiAgcHJlZml4ID0gKHVhLmluZGV4T2YoJ2Nocm9tZScpID49IDAgfHwgd2luZG93Lm9wZW5EYXRhYmFzZSkgPyAnLXdlYmtpdC0nIDogKHVhLmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwKSA/ICctbW96LScgOiB3aW5kb3cub3BlcmEgPyAnLW8tJyA6IChkb2N1bWVudC5hbGwgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpID09PSAtMSkgPyAnLW1zLScgOiAnJztcbiAgcmV0dXJuIHByZWZpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybShlbCkge1xuICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJyk7XG4gIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKVxcKSkvKTtcblxuICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4gIGlmIChyZXN1bHRzWzFdID09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG5cbiAgcmVzdWx0cy5wdXNoKDApO1xuICByZXR1cm4gcmVzdWx0cy5zbGljZSg1LCA4KTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWChlbCkge1xuLy8gICAvLyBjaHJvbWUgd29uJ3QgdXNlIHByZWZpeFxuLy8gICAvLyB2YXIgc3R5bGVfYXR0ciA9IGJyb3dzZXJQcmVmaXgoKSArICd0cmFuc2Zvcm0nO1xuLy8gICB2YXIgc3R5bGVfYXR0ciA9ICd0cmFuc2Zvcm0nO1xuLy8gICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVfYXR0cik7XG4vLyAgIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKVxcKSkvKTtcbi8vICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuLy8gICBpZiAocmVzdWx0c1sxXSA9PT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcbi8vICAgcmVzdWx0cy5wdXNoKDApO1xuLy8gICByZXR1cm4gKyhyZXN1bHRzLnNsaWNlKDUsIDgpWzBdKTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWChlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdzdHlsZScpLnNwbGl0KCd0cmFuc2xhdGUzZCcpWzFdLnNwbGl0KCcsICcpWzBdLnNsaWNlKDEpLnNwbGl0KCdweCcpWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWShvYmopIHtcbiAgaWYgKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgcmV0dXJuO1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG9iaiksXG4gICAgICB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gfHwgc3R5bGUud2Via2l0VHJhbnNmb3JtIHx8IHN0eWxlLm1velRyYW5zZm9ybTtcbiAgdmFyIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKTtcbiAgaWYgKG1hdCkgcmV0dXJuIHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzEzXSk7XG4gIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gIHJldHVybiBtYXQgPyBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVs1XSkgOiAwO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PT0gJ29iamVjdCcgP1xuICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhocihtZXRob2QsIHVybCwgY2FsbGJhY2ssIHBhcmFtc09iaiA9IHt9LCBpc0FzeW5jID0gdHJ1ZSkge1xuICB2YXIgeG1saHR0cDtcblxuICB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoeG1saHR0cC5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgIGlmICh4bWxodHRwLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY2FsbGJhY2soeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBlbHNlIGlmICh4bWxodHRwLnN0YXR1cyA9PSA0MDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3IgNDAwJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbWV0aGluZyBlbHNlIG90aGVyIHRoYW4gMjAwIHdhcyByZXR1cm5lZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgY29tYlVybCA9IHVybCArIHNlcmlhbGl6ZShwYXJhbXNPYmopO1xuXG4gIHhtbGh0dHAub3BlbihtZXRob2QsIGNvbWJVcmwsIGlzQXN5bmMpO1xuICB4bWxodHRwLnNlbmQobnVsbCk7XG59XG5cbi8qKlxuICogW3N0cmluZ2lmeSB3aXRoIDQgc3BhY2VzIGF0IGVhY2ggbGV2ZWxdXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCBcIlxcdFwiKTsgLy8gc3RyaW5naWZ5IHdpdGggdGFicyBpbnNlcnRlZCBhdCBlYWNoIGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWF1dGlmeUpTT04oanNPYmopIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXG4gKiBAcGFyYW0gIHtKU09OIG9iamVjdH0ganNvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaHRsaWdodEpTT04oanNvbikge1xuICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcbiAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICByZXR1cm4ganNvbi5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgdmFyIGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9