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
	  this.$apiTree.appendChild(createLeaf('_data_root', 1, 0, initRectObj));
	
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
	    var parentIdx = '_data_root';
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
	  this.apiTree = new _tree.Tree('_data_root');
	  this.apiTree.add(1, '_data_root', this.apiTree.traverseBF);
	
	  this.operateDataRootChild();
	
	  return this.apiTree;
	};
	
	ApiDom.prototype.delNode = function (ctx) {
	  var currentLeaf = ctx.currentTarget.closest('.leaf');
	  var currentIdx = +ctx.currentTarget.parentNode.dataset.index;
	  var parentIdx = isNaN(+ctx.currentTarget.parentNode.dataset.parent) ? '_data_root' : +ctx.currentTarget.parentNode.dataset.parent;
	
	  var nodesArr = this.apiTree.traverseDescendants(currentIdx);
	  var idxArr = nodesArrToIdxArr(nodesArr);
	  this.apiTree.remove(currentIdx, parentIdx, this.apiTree.traverseBF);
	  this.removeNodesFromDom(idxArr);
	
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
	  parentIdx = isNaN(parentIdx) ? '_data_root' : parentIdx;
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
	
	function Node(data) {
	  this.data = data;
	  this.parent = null;
	  this.children = [];
	  // added later
	  this.childrenlevel = 1;
	  this.column = 0;
	  this.totaloffsetylevel = 0;
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
	      node.totaloffsetylevel = node.parent.totaloffsetylevel + calcOffY(node.parent.children, node.data);
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
	    if (node.data === toData) {
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
	    if (node.data === fromData) {
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
	    if (arr[i].data === data) {
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
	    if (node.data === nodedata) {
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
	    styleObj[node.data] = node.totaloffsetylevel;
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
	    if (node.data === nodeData) {
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
	  var dataRootNodes = this.traverseDirectChild('_data_root');
	  var rowLevelObj = {};
	  var headIdxArr = [];
	  for (var drn in dataRootNodes._storage) {
	    if (dataRootNodes._storage.hasOwnProperty(drn)) {
	      rowLevelObj[drn] = {};
	      rowLevelObj[drn]['head-idx'] = dataRootNodes._storage[drn].data;
	      headIdxArr.push(dataRootNodes._storage[drn].data);
	    };
	  }
	
	  function extractIdxFromQueue(queue) {
	    var childrenIdxArr = [];
	    for (var perNode in queue._storage) {
	      if (typeof parseInt(perNode) === 'number' && queue._storage[perNode].hasOwnProperty('data')) {
	        childrenIdxArr.push(queue._storage[perNode].data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmI0NGQ5MGU1NWQxZDJlZjdkMjgiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7NkNDdEN3QixDQUFxQjs7NENBQzFCLENBQW9COztnREFFakIsQ0FBd0I7O0FBQzlDLG1DQUFXLENBQUM7Ozs7OztBQU1aLEVBQUMsWUFBTTtBQUNMLE9BQUksTUFBTSxHQUFHO0FBQ1gsUUFBRyx1QkFBTTtBQUNULFdBQU0sRUFBRSw4QkFBUztJQUNsQixDQUFDO0FBQ0YsT0FBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDeEMsT0FBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ25DLFNBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixJQUN2RSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pCLFlBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxF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LENBQUMsQ0FBQyxDQUFDO0FBQzFDLE9BQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0UsVUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHdHQUF3RyxFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQzVJLFNBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQixTQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDcEIsV0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLFlBQUcsR0FBRyxLQUFLLENBQUM7UUFDYixNQUFNO0FBQ0wsWUFBRyxHQUFHLFFBQVEsQ0FBQztRQUNoQjtNQUNGLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25DLFVBQUcsR0FBRyxTQUFTLENBQUM7TUFDakIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDN0IsVUFBRyxHQUFHLE1BQU0sQ0FBQztNQUNkO0FBQ0QsWUFBTyxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3pELENBQUMsQ0FBQyIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYmI0NGQ5MGU1NWQxZDJlZjdkMjhcbiAqKi8iLCJpbXBvcnQge2RhdGFMaW5rc30gZnJvbSAnLi9tb2R1bGVzL2RhdGFMaW5rcyc7XG5pbXBvcnQge2hvbWV9IGZyb20gJy4vbW9kdWxlcy9ob21lcGFnZSc7XG5cbmltcG9ydCB7aW5pdFhocn0gZnJvbSAnLi9tb2R1bGVzL2FwaU9wZXJhdGlvbic7XG5kYXRhTGlua3MoKTtcbi8vIGFwaVRyZWUoKTtcbi8vIHZhciBwID0gbmV3IGRhd25TVkcoKTtcbi8vIHAuaW5pdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFpbnRlci10YXJnZXQnKSk7XG4vLyBwLnN0YXJ0KCk7XG5cbigoKSA9PiB7XG4gIGxldCByb3V0ZXMgPSB7XG4gICAgJy8nOiBob21lLFxuICAgICcvZGV2JzogW2luaXRYaHJdXG4gIH07XG4gIGxldCBwYXRoTmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgaWYgKHJvdXRlcy5oYXNPd25Qcm9wZXJ0eShwYXRoTmFtZSkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJvdXRlc1twYXRoTmFtZV0pID09PSAnW29iamVjdCBBcnJheV0nICYmXG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXNbcGF0aE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdXRlc1twYXRoTmFtZV1baV0uYXBwbHkobnVsbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0uYXBwbHkobnVsbCk7XG4gICAgfVxuICB9XG5cbn0pKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qc1xuICoqLyIsImltcG9ydCB7aGFuZGxlTWV0aG9kfSBmcm9tICcuLi9jb21tb24vaGFuZGxlTWV0aG9kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFMaW5rcygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzRGF0YUxpbmssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NEYXRhTGluayhlKSB7XG4gIHZhciBlID0gd2luZG93LmUgfHwgZTtcblxuICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKVxuICAgICAgcmV0dXJuO1xuXG4gIC8vIERvIHNvbWV0aGluZ1xuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdkZWxldGUnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgLy8gaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAncGF0Y2gnKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCwge1xuICAvLyAgICAgbnM6ICdhcGknLFxuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBzZWN0aW9uOiAnd2lzZScsXG4gIC8vICAgICAgIGlkOiAnMidcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qc1xuICoqLyIsImltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi4vY29tbW9uL2NzcmYnO1xuLyoqXG4gKiBbaGFuZGxlTWV0aG9kIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGxpbmsgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEhhbmRsZXMgXCJkYXRhLW1ldGhvZFwiIG9uIGxpbmtzIHN1Y2ggYXM6XG4gKiA8YSBocmVmPVwiL3VzZXJzLzVcIiBkYXRhLW1ldGhvZD1cImRlbGV0ZVwiIHJlbD1cIm5vZm9sbG93XCIgZGF0YS1jb25maXJtPVwiQXJlIHlvdSBzdXJlP1wiPkRlbGV0ZTwvYT5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1ldGhvZChsaW5rLCBvYmogPSB7fSkge1xuICB2YXIgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgbWV0aG9kID0gbGluay5kYXRhc2V0Lm1ldGhvZCxcbiAgICB0YXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGFyZ2V0JyksXG4gICAgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpLFxuICAgIGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgdmFyIHBhcmFtc09iaiA9IHtcbiAgICBocmVmOiBocmVmLFxuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIHRhcmdldDogdGFyZ2V0LFxuICAgIGNzcmZUb2tlbjogY3NyZlRva2VuLFxuICAgIGNzcmZQYXJhbTogY3NyZlBhcmFtXG4gIH07XG4gIHZhciBmb3JtRWxlID0gY3JlYXRlRm9ybShwYXJhbXNPYmosIG9iaik7XG4gIGFwcGVuZEZvcm1Ub0RvbShmb3JtRWxlKTtcbiAgc3VibWl0Rm9ybShmb3JtRWxlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGFyYW1zLCBvYmopIHtcbiAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZi5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsJ3Bvc3QnKTtcbiAgZi5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicscGFyYW1zLmhyZWYpO1xuICBpZiAocGFyYW1zLnRhcmdldCkge1xuICAgIGYuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBwYXJhbXMudGFyZ2V0KTtcbiAgfTtcblxuICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGkuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIGkuc2V0QXR0cmlidXRlKCduYW1lJywnX21ldGhvZCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5tZXRob2QpO1xuXG4gIHZhciBzO1xuICBpZiAocGFyYW1zLmNzcmZQYXJhbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwYXJhbXMuY3NyZlRva2VuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICFSUHMuaXNDcm9zc0RvbWFpbihwYXJhbXMuaHJlZikpIHtcbiAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAgIHMuc2V0QXR0cmlidXRlKCduYW1lJywgcGFyYW1zLmNzcmZQYXJhbSk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMuY3NyZlRva2VuKTtcbiAgfVxuICBmLmFwcGVuZENoaWxkKGkpO1xuXG4gIC8vIGZvciAobGV0IGtleSBpbiBvYmouZGF0YSkge1xuICAvLyAgIGlmIChvYmouZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gIC8vICAgICBsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCcnICsgb2JqLm5zICsgJ1snICsga2V5ICsgJ10nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsb2JqLmRhdGFba2V5XSk7XG4gIC8vICAgICBmLmFwcGVuZENoaWxkKHQpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGlmIChzKSB7XG4gICAgZi5hcHBlbmRDaGlsZChzKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZvcm1Ub0RvbShmb3JtKSB7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG59XG5mdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm0pIHtcbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9oYW5kbGVNZXRob2QuanNcbiAqKi8iLCJleHBvcnQgbGV0IHJvclBhcmFtcyA9IHtcbiAgLy8gVXAtdG8tZGF0ZSBDcm9zcy1TaXRlIFJlcXVlc3QgRm9yZ2VyeSB0b2tlblxuICBjc3JmVG9rZW46ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBVUkwgcGFyYW0gdGhhdCBtdXN0IGNvbnRhaW4gdGhlIENTUkYgdG9rZW5cbiAgY3NyZlBhcmFtOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi1wYXJhbV0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgcmVxdWVzdCBpcyBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LlxuICBpc0Nyb3NzRG9tYWluOiB1cmwgPT4ge1xuICAgIGxldCBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgb3JpZ2luQW5jaG9yLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuICAgIGxldCB1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICB0cnkge1xuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmw7XG4gICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCB0byBhIElFIGJ1Zy5cbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cbiAgICAgIC8vIElmIFVSTCBwcm90b2NvbCBpcyBmYWxzZSBvciBpcyBhIHN0cmluZyBjb250YWluaW5nIGEgc2luZ2xlIGNvbG9uXG4gICAgICAvLyAqYW5kKiBob3N0IGFyZSBmYWxzZSwgYXNzdW1lIGl0IGlzIG5vdCBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0XG4gICAgICAvLyAoc2hvdWxkIG9ubHkgYmUgdGhlIGNhc2UgZm9yIElFNyBhbmQgSUUgY29tcGF0aWJpbGl0eSBtb2RlKS5cbiAgICAgIC8vIE90aGVyd2lzZSwgZXZhbHVhdGUgcHJvdG9jb2wgYW5kIGhvc3Qgb2YgdGhlIFVSTCBhZ2FpbnN0IHRoZSBvcmlnaW5cbiAgICAgIC8vIHByb3RvY29sIGFuZCBob3N0LlxuICAgICAgcmV0dXJuICEoKCghdXJsQW5jaG9yLnByb3RvY29sIHx8IHVybEFuY2hvci5wcm90b2NvbCA9PT0gJzonKSAmJiAhdXJsQW5jaG9yLmhvc3QpIHx8XG4gICAgICAgIChvcmlnaW5BbmNob3IucHJvdG9jb2wgKyAnLy8nICsgb3JpZ2luQW5jaG9yLmhvc3QgPT09XG4gICAgICAgICAgdXJsQW5jaG9yLnByb3RvY29sICsgJy8vJyArIHVybEFuY2hvci5ob3N0KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY3NyZi5qc1xuICoqLyIsImltcG9ydCB7dHdlZXRCb3h9IGZyb20gJy4vdHdlZXRCb3gnO1xuZXhwb3J0IGZ1bmN0aW9uIGhvbWUoKSB7XG5cdHR3ZWV0Qm94KCk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9ob21lcGFnZS5qc1xuICoqLyIsImZ1bmN0aW9uIHNldEZvY3VzKGVsKSB7XG4gIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gIHJhbmdlLnNldFN0YXJ0KGVsLCAwKTtcbiAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0d2VldEJveCgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50O1xuICB2YXIgdGIgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHdlZXQtYm94JylbMF07XG4gIHZhciB0YmQgPSB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XG4gIHZhciB0YmRTdHJpbmcgPSAnPGRpdj48YnI+PC9kaXY+JztcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnY29uZGVuc2VkJyk7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0uaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGgpIHtcblxuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5hZGQoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAodGJkLmlubmVySFRNTCA9PT0gJ1doYXRcXCdzIGhhcHBlbmluZz8nKSB7XG5cbiAgICAgIHRiZC5pbm5lckhUTUwgPSAnPGJyPic7XG4gICAgfVxuICB9KTtcbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5pbm5lckhUTUwpIHtcbiAgICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgICAgfSBlbHNlIHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG5cbiAgICAgIH0sIDApO1xuICAgIH07XG4gIH0pO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9O1xuICAgIGlmICh0Yi5pbm5lckhUTUwgPT09ICc8YnI+Jykge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL3R3ZWV0Qm94LmpzXG4gKiovIiwiaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xuaW1wb3J0IHtodG1sfSBmcm9tICcuLi9jb21tb24vdGVtcGxhdGUnO1xuaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmltcG9ydCB7aW5zZXJ0QWZ0ZXIsIHN0clRvRG9tLCBkZWJvdW5jZX0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5pbXBvcnQge2ZsYXNofSBmcm9tICcuLi9jb21tb24vZmxhc2gnO1xuaW1wb3J0IHtBcGlEb219IGZyb20gJy4uL2FwaS10cmVlL3RyZWUtZG9tJztcblxubGV0IHJvb3RBUEkgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGlzJztcbmxldCBwYXlsb2FkID0ge307XG5sZXQgYXBpc0FyciA9IFtdO1xuXG52YXIgY2FsbGJhY2sgPSB7XG4gIGdldEFwaVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBhZGRBcGlUcmVlKEpTT04ucGFyc2UoZGF0YSksIHRoaXMpO1xuICB9LFxuICBnZXRBbGxBcGlzU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHJlbmRlckFsbEFwaXMoZGF0YSk7XG4gICAgYmluZGV2ZW50cygpO1xuICB9LFxuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBwb3N0U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIGRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBmdW5jdGlvbiBkZXN0b3J5QXBpTGkoKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQodGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhLCBkZXN0b3J5QXBpTGkuYmluZCh0aGlzKSk7XG4gIH0sXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRYaHIoKSB7XG4gIGdldEFsbEFwaXMoKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kRXZlbnQpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUFuZEZsYXNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGZsYXNoKGpzb25EYXRhLCBjYWxsYmFjayk7XG4gIHJldHVybiBqc29uRGF0YTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRm9sZExpKGNvbnRleHQpIHtcbiAgY29udGV4dC5jbGFzc0xpc3QudG9nZ2xlKCd1bmZvbGQnKTtcbn1cbmZ1bmN0aW9uIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbihldikge1xuICB0b2dnbGVGb2xkTGkodGhpcyk7XG4gIGlmICh0aGlzLm5leHRFbGVtZW50U2libGluZykge1xuICAgIHJldHVybjtcbiAgfTtcbiAgJGh0dHAocm9vdEFQSSArICcvJyArIHRoaXMucGFyZW50Tm9kZS5kYXRhc2V0LmFwaUlkKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFwaVN1Y2Nlc3MuYmluZCh0aGlzLnBhcmVudE5vZGUpKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuZnVuY3Rpb24gYmluZGV2ZW50cygpIHtcbiAgbGV0IGFwaUxpcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1saS1kZXNjcmlwdGlvbicpO1xuICBbXS5zbGljZS5jYWxsKGFwaUxpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEFwaVRyZWUoZGF0YSA9IHt9LCBjb250YWluZXJOb2RlLCBpc05ld0FwaSkge1xuICBsZXQgbmV3QXBpID0gbmV3IEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSk7XG4gIGFwaXNBcnIucHVzaChuZXdBcGkpO1xufVxuXG5sZXQgZGVib3VuY2VkTmV3QXBpQnRuID0gZGVib3VuY2UocHJvY2Vzc05ld0FwaUNsaWNrLCA1MDAsIHRydWUpO1xuZnVuY3Rpb24gcHJvY2Vzc05ld0FwaUNsaWNrKCkge1xuICBsZXQgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgbGV0IGJhc2VBcGlMaSA9IHN0clRvRG9tKG5ld0FwaUxpVHBsKCkpO1xuICBhcGlVbC5pbnNlcnRCZWZvcmUoYmFzZUFwaUxpLCBhcGlVbC5maXJzdENoaWxkKTtcbiAgYWRkQXBpVHJlZSh7fSwgYmFzZUFwaUxpLCB0cnVlKTtcbiAgdG9nZ2xlRm9sZExpKGJhc2VBcGlMaS5jaGlsZHJlblswXSk7XG4gIGJhc2VBcGlMaS5jaGlsZHJlblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24uY2FsbCh0aGlzLCBldik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBuZXdBcGlCdG4oKSB7XG4gIGxldCBuZXdBcGlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkZXInKVswXTtcbiAgbmV3QXBpRGl2LmNsYXNzTGlzdC5hZGQoJ25ldy1hcGknKTtcbiAgbmV3QXBpRGl2LmlubmVySFRNTCA9IGA8aW5wdXQgY2xhc3M9XCJhZGQtYXBpLWJ0blwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIm5ldyBBUElcIj5gO1xuICBuZXdBcGlEaXYuY2hpbGRyZW5bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWJvdW5jZWROZXdBcGlCdG4pO1xuICBpbnNlcnRBZnRlcihuZXdBcGlEaXYsIGhlYWRlcik7XG4gIHJldHVybiBuZXdBcGlEaXY7XG59XG5cbmZ1bmN0aW9uIG5ld0FwaUxpVHBsKGRhdGEgPSB7fSkge1xuICB2YXIgdHBsID0gYFxuICAgIDxsaSBjbGFzcz1cImFwaS1saVwiIGRhdGEtYXBpLWlkPVwiJHtkYXRhLmlkIHx8IG51bGx9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWxpLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLWNvbGxhcHNlXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi1kb3duXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPjwvc3ZnPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktdXJpXCI+JHtkYXRhLnVyaSB8fCAnKE5vIHVyaSknfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktbmFtZVwiPiR7ZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogJyhObyBuYW1lKSd9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9saT5cbiAgYDtcbiAgcmV0dXJuIHRwbDtcbn1cbmZ1bmN0aW9uIHJlbmRlckFsbEFwaXMoZGF0YSkge1xuICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgY29uc3QgdG1wbCA9IGRhdGEgPT4gaHRtbGBcbiAgICAgIDx1bCBjbGFzcz1cImFwaS11bFwiPlxuICAgICAgJHtkYXRhLm1hcChpdGVtID0+IGh0bWxgXG4gICAgICAgICR7bmV3QXBpTGlUcGwoaXRlbSl9XG4gICAgICBgKX1cbiAgICAgIDwvdWw+XG4gIGA7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZGVyJylbMF07XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpTGlzdEVsZS5pbm5lckhUTUwgPSB0bXBsKGRhdGEpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlCdG4oKSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbEFwaXMoKSB7XG4gICRodHRwKHJvb3RBUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QWxsQXBpc1N1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGJpbmRFdmVudChldikge1xuICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXBpLXNhdmUnKSkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAnc2VjdGlvbic6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zZWN0aW9uJylbMF0udmFsdWUsXG4gICAgICAndXJpJzogZXYudGFyZ2V0LnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlLFxuICAgICAgJ21ldGhvZCc6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tZXRob2QnKVswXS52YWx1ZVxuICAgIH07XG4gICAgaWYgKGV2LnRhcmdldC5kYXRhc2V0Lm1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUEFUQ0gnKSB7XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZClcbiAgICAgIC5wYXRjaChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2sucGF0Y2hTdWNjZXNzKVxuICAgICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICB9IGVsc2UgaWYgKGV2LnRhcmdldC5kYXRhc2V0Lm1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUE9TVCcpIHtcbiAgICAgICRodHRwKHJvb3RBUEkpXG4gICAgICAucG9zdChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2sucG9zdFN1Y2Nlc3MpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsLWRhdGFyb290LWNoaWxkJykpIHtcbiAgICBwb3B1cChldiwge30sIGRlbGV0ZUFwaS5iaW5kKHRoaXMsIGV2KSk7XG4gIH07XG4gIGZ1bmN0aW9uIGRlbGV0ZUFwaShldikge1xuICAgIGlmICghZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZCkge1xuICAgICAgZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZChldi50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgJGh0dHAocm9vdEFQSSArICcvJyArIGV2LnRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpLmRhdGFzZXQuaWQpXG4gICAgLmRlbGV0ZShwYXJhbXMpXG4gICAgLnRoZW4oY2FsbGJhY2suZGVsZXRlU3VjY2Vzcy5iaW5kKGV2KSlcbiAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzXG4gKiovIiwiLyoqXG4vLyBCLT4gSGVyZSB5b3UgZGVmaW5lIGl0cyBmdW5jdGlvbnMgYW5kIGl0cyBwYXlsb2FkXG52YXIgbWRuQVBJID0gJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL3NlYXJjaC5qc29uJztcbnZhciBwYXlsb2FkID0ge1xuICAndG9waWMnIDogJ2pzJyxcbiAgJ3EnICAgICA6ICdQcm9taXNlJ1xufTtcbnZhciBjYWxsYmFjayA9IHtcbiAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygxLCAnc3VjY2VzcycsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9LFxuICBlcnJvciA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygyLCAnZXJyb3InLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfVxufTtcbi8vIEVuZCBCXG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGxcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDEpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcywgY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDIpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLnRoZW4odW5kZWZpbmVkLCBjYWxsYmFjay5lcnJvcik7XG4gKi9cblxuLy8gQS0+ICRodHRwIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGluIG9yZGVyIHRvIGZvbGxvdyB0aGUgc3RhbmRhcmQgQWRhcHRlciBwYXR0ZXJuXG5pbXBvcnQge3NlcmlhbGl6ZX0gZnJvbSAnLi9zZXJpYWxpemUnO1xuaW1wb3J0IHtpc0VtcHR5LCBtZXJnZU9iaiwgYWRkUHJlZml4VG9PYmosIHdyYXBPYmp9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi9jc3JmJztcblxuZXhwb3J0IGZ1bmN0aW9uICRodHRwKHVybCkge1xuICAvLyBBIHNtYWxsIGV4YW1wbGUgb2Ygb2JqZWN0XG4gIHZhciBjb3JlID0ge1xuXG4gICAgLy8gTWV0aG9kIHRoYXQgcGVyZm9ybXMgdGhlIGFqYXggcmVxdWVzdFxuICAgIGFqYXg6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhcmdzID0ge30sIHByZWZpeCkge1xuICAgICAgLy8gZm9yIFJhaWxzXG4gICAgICAvLyB1cmwgPSB1cmwgKyAnLmpzb24nO1xuICAgICAgLy8gQ3JlYXRpbmcgYSBwcm9taXNlXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlcyB0aGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdQT1NUJyB8fCBtZXRob2QgPT09ICdQVVQnIHx8IG1ldGhvZCA9PT0gJ1BBVENIJyB8fCBtZXRob2QgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IEpTT04uc3RyaW5naWZ5KGV4dGVuZEdlbmVyYWxQYXJhbXMod3JhcE9iaihhcmdzLCBwcmVmaXgpKSk7XG4gICAgICAgICAgY2xpZW50Lm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgICAgIC8vIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgY2xpZW50LnNlbmQodXJpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IHNlcmlhbGl6ZShleHRlbmRHZW5lcmFsUGFyYW1zKGFkZFByZWZpeFRvT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCArICc/JyArIHVyaSk7XG4gICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbGllbnQub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVzb2x2ZVwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZXF1YWwgdG8gMnh4XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZWplY3RcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGRpZmZlcmVudCB0aGFuIDJ4eFxuICAgICAgICAgICAgcmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZXR1cm4gdGhlIHByb21pc2VcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgfTtcblxuICAvLyBBZGFwdGVyIHBhdHRlcm5cbiAgcmV0dXJuIHtcbiAgICAnZ2V0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdHRVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncG9zdCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUE9TVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwdXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BVVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwYXRjaCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUEFUQ0gnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAnZGVsZXRlJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdERUxFVEUnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRHZW5lcmFsUGFyYW1zKG9iaikge1xuICBsZXQgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICBsZXQgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpO1xuICBsZXQgZ2VuZXJhbE9iaiA9IHt9O1xuICBnZW5lcmFsT2JqLnV0ZjggPSAn4pyTJztcbiAgZ2VuZXJhbE9ialtjc3JmUGFyYW1dID0gY3NyZlRva2VuO1xuICByZXR1cm4gbWVyZ2VPYmoob2JqLCBnZW5lcmFsT2JqKTtcbn1cbi8vIEVuZCBBXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9hamF4LmpzXG4gKiovIiwiLyoqXG4gKiBbc2VyaWFsaXplIGNvbnZlcnRzIHJlY3Vyc2l2ZSBvYmplY3RzXVxuICogQHBhcmFtICB7W3R5cGVdfSBvYmogICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBwcmVmaXggW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICogY29uc29sZS5sb2coc2VyaWFsaXplKHtmb286IFwiaGkgdGhlcmVcIiwgYmFyOiB7IGJsYWg6IDEyMywgcXV1eDogWzEsIDIsIDNdIH19KSk7XG4gKiBmb289aGklMjB0aGVyZSZiYXIlNUJibGFoJTVEPTEyMyZiYXIlNUJxdXV4JTVEJTVCMCU1RD0xJmJhciU1QnF1dXglNUQlNUIxJTVEPTImYmFyJTVCcXV1eCU1RCU1QjIlNUQ9M1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT0gJ29iamVjdCcgP1xuICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zZXJpYWxpemUuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gaXNFbXB0eShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbi8qIGNvbnNpZGVyIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqKG9iajEgPSB7fSwgb2JqMikge1xuICBsZXQgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmoxKSk7XG4gIGZvciAobGV0IGtleSBpbiBvYmoyKSB7XG4gICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmoyW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkUHJlZml4VG9PYmoob2JqLCBwcmVmaXgpIHtcbiAgaWYgKCFwcmVmaXgpIHJldHVybiBvYmo7XG4gIGxldCBuZXdPYmogPSB7fTtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqWycnICsgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nXSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBPYmoob2JqLCB3cmFwcGVyKSB7XG4gIGlmICghd3JhcHBlcikgcmV0dXJuIG9iajtcbiAgdmFyIG5ld09iaiA9IHt9O1xuICBuZXdPYmpbd3JhcHBlcl0gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW3dyYXBwZXJdW2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xuICBsZXQgdG1wRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsZS5pbm5lckhUTUwgPSBzdHI7XG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XG4gIHJldHVybiByZXR1cm5Eb207XG59XG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4vLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuLypcbnZhciBteUVmZmljaWVudEZuID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gIC8vIEFsbCB0aGUgdGF4aW5nIHN0dWZmIHlvdSBkb1xufSwgMjUwKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG15RWZmaWNpZW50Rm4pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanNcbiAqKi8iLCJpbXBvcnQge2h0bWxFc2NhcGV9IGZyb20gJy4vaHRtbEVzY2FwZSc7XG5leHBvcnQgZnVuY3Rpb24gaHRtbChsaXRlcmFsU2VjdGlvbnMsIC4uLnN1YnN0cykge1xuICAvLyBVc2UgcmF3IGxpdGVyYWwgc2VjdGlvbnM6IHdlIGRvbuKAmXQgd2FudFxuICAvLyBiYWNrc2xhc2hlcyAoXFxuIGV0Yy4pIHRvIGJlIGludGVycHJldGVkXG4gIGxldCByYXcgPSBsaXRlcmFsU2VjdGlvbnMucmF3O1xuXG4gIGxldCByZXN1bHQgPSAnJztcblxuICBzdWJzdHMuZm9yRWFjaCgoc3Vic3QsIGkpID0+IHtcbiAgICAvLyBSZXRyaWV2ZSB0aGUgbGl0ZXJhbCBzZWN0aW9uIHByZWNlZGluZ1xuICAgIC8vIHRoZSBjdXJyZW50IHN1YnN0aXR1dGlvblxuICAgIGxldCBsaXQgPSByYXdbaV07XG5cbiAgICAvLyBJbiB0aGUgZXhhbXBsZSwgbWFwKCkgcmV0dXJucyBhbiBhcnJheTpcbiAgICAvLyBJZiBzdWJzdGl0dXRpb24gaXMgYW4gYXJyYXkgKGFuZCBub3QgYSBzdHJpbmcpLFxuICAgIC8vIHdlIHR1cm4gaXQgaW50byBhIHN0cmluZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0KSkge1xuICAgICAgc3Vic3QgPSBzdWJzdC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc3Vic3RpdHV0aW9uIGlzIHByZWNlZGVkIGJ5IGEgZG9sbGFyIHNpZ24sXG4gICAgLy8gd2UgZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBpdFxuICAgIGlmIChsaXQuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgc3Vic3QgPSBodG1sRXNjYXBlKHN1YnN0KTtcbiAgICAgIGxpdCA9IGxpdC5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHJlc3VsdCArPSBsaXQ7XG4gICAgcmVzdWx0ICs9IHN1YnN0O1xuICB9KTtcbiAgLy8gVGFrZSBjYXJlIG9mIGxhc3QgbGl0ZXJhbCBzZWN0aW9uXG4gIC8vIChOZXZlciBmYWlscywgYmVjYXVzZSBhbiBlbXB0eSB0ZW1wbGF0ZSBzdHJpbmdcbiAgLy8gcHJvZHVjZXMgb25lIGxpdGVyYWwgc2VjdGlvbiwgYW4gZW1wdHkgc3RyaW5nKVxuICByZXN1bHQgKz0gcmF3W3Jhdy5sZW5ndGggLSAxXTsgLy8gKEEpXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBodG1sRXNjYXBlKHN0cikge1xuXHRzdHIgPSAnJyArIHN0cjsgLy8gZm9yIG51bWJlcnMgZXRjLlxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykgLy8gZmlyc3QhXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL2AvZywgJyYjOTY7Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qc1xuICoqLyIsImltcG9ydCB7ZGlzYWJsZVNjcm9sbCwgZW5hYmxlU2Nyb2xsfSBmcm9tICcuL3RvZ2dsZVNjcm9sbCc7XG5leHBvcnQgZnVuY3Rpb24gcG9wdXAoZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgbGV0IHBvcHVwRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBvcHVwRWxlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWxheWVyJyk7XG4gIHBvcHVwRWxlLmlubmVySFRNTCA9IGdlbmVyYXRlUG9wdXBUcGwoKTtcbiAgcG9zaXRpb25Qb3B1cEVsZShwb3B1cEVsZSwgZXYpO1xuICBiaW5kUG9wdXBFdmVudHMocG9wdXBFbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cEVsZSk7XG4gIGRpc2FibGVTY3JvbGwoKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVQb3B1cFRwbChkYXRhKSB7XG4gIGxldCB0cGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLXNoYWRvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBvcHVwLXRleHRcIj5BcmUgeW91IHN1cmUgdG8gZGVsZXRlIHRoaXMgQVBJPzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtYnRuc1wiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicG9wdXAtYnRuIHBvcHVwLWNhbmNlbC1idG5cIj5jYW5jZWw8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY29uZmlybS1idG5cIj5jb25maXJtPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHRgO1xuICByZXR1cm4gdHBsO1xufVxuXG5mdW5jdGlvbiBiaW5kUG9wdXBFdmVudHMoZWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbmZpcm0tYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maXJtLmJpbmQodGhpcywgZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykpO1xufVxuXG5mdW5jdGlvbiBjb25maXJtKGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvblBvcHVwRWxlKGVsZSwgY29vcmRpbmF0ZXMpIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbnRlbnQnKVswXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGVzLnBhZ2VYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMucGFnZVkgKyAncHgsIDApJztcbn1cblxuZnVuY3Rpb24gY2xvc2VQb3B1cChldikge1xuICBpZiAoZXYudGFyZ2V0ID09PSBldi5jdXJyZW50VGFyZ2V0KSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBhcmVudE5vZGUpO1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanNcbiAqKi8iLCIvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwLFxuLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XG52YXIga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICBpZiAoZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIC8vIG9sZGVyIEZGXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub253aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2Rlcm4gc3RhbmRhcmRcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBvbGRlciBicm93c2VycywgSUVcbiAgd2luZG93Lm9udG91Y2htb3ZlICA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2JpbGVcbiAgZG9jdW1lbnQub25rZXlkb3duICA9IHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbndoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9udG91Y2htb3ZlID0gbnVsbDtcbiAgZG9jdW1lbnQub25rZXlkb3duID0gbnVsbDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanNcbiAqKi8iLCJpbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXNoKGRhdGEsIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSkge1xuICBsZXQgZmxhc2hFbGUgPSBzdHJUb0RvbShmbGFzaFRwbChkYXRhKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmxhc2hFbGUpO1xuICBzZXRUaW1lb3V0KGRlc3RvcnkuYmluZChudWxsLCBmbGFzaEVsZSwgY2FsbGJhY2spLCAyMDAwKTtcbn1cblxuZnVuY3Rpb24gZmxhc2hUcGwoZGF0YSkge1xuICBsZXQgc3RyID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJmbGFzaC1sYXllciAke2RhdGEuZXJyb3IgPyAnZXJyb3InIDogJ3N1Y2Nlc3MnfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj4ke2RhdGEuZXJyb3IgfHwgZGF0YS5tZXNzYWdlfTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgICA7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIGRlc3RvcnkoZWxlLCBjYWxsYmFjaykge1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICB9KTtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ2JsaW5rJyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9mbGFzaC5qc1xuICoqLyIsIi8qKlxuICogd2lkdGggb2Ygc2luZ2xlIHN2ZyBwYXRoOiAzMHB4XG4gKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge2dldFRyYW5zbGF0ZVgsIHhociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBsZXQgdHBsID1cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYXBpLWluZm9cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktdXJpXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cIlwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBPU1RcIj5QT1NUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQQVRDSFwiPlBBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8bGFiZWw+c2VjdGlvbjo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS1zZWN0aW9uXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIj5kZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS1kZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCIgZGF0YS1tZXRob2Q9XCIke3BhdGNoT3JQb3N0KGlzTmV3QXBpKX1cIiBkYXRhLWFjdGlvbj1cIi9hcGlzJHtzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpfVwiID4ke2lzTmV3QXBpID8gJ2NyZWF0ZScgOiAnc2F2ZSd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXRlc3RcIj50ZXN0PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtd3JhcHBlclwiPjxkaXYgY2xhc3M9XCJhcGktdHJlZS1mcmFtZVwiPjxzdmcgY2xhc3M9XCJhcGktc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvc3ZnPjwvZGl2PjxkaXYgY2xhc3M9XCJhcGktdHJlZVwiPjwvZGl2PjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1kYXRhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlld3MtY29udHJvbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtcmF3XCI+cmF3PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhLWhpZ2hsaWdodFwiPnN5bnRheEhpZ2hsaWdodDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhLXByZXZpZXdcIj5wcmV2aWV3PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhLXZpZXcganNvblwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxudmFyIGxlYWZDb250ZW50VHBsID0gJzxpIGNsYXNzPVwicmVtb3ZlLWNoaWxkXCI+LTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYta2V5XCIgcGxhY2Vob2xkZXI9XCJrZXlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ2YWx1ZVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInF1YW50aXR5XCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImFkZC1jaGlsZFwiPis8L2k+JztcblxudmFyIGluaXRSZWN0T2JqID0ge1xuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHdpZHRoOiAwLFxuICBoZWlnaHQ6IDBcbn07XG52YXIgcGVyU1ZHUGF0aFdpZHRoID0gMzA7XG52YXIgcm9vdE5vZGVXaWR0aCA9IHBlclNWR1BhdGhXaWR0aCArIDE1O1xuXG5mdW5jdGlvbiBwYXRjaE9yUG9zdChpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnUE9TVCcgOiAnUEFUQ0gnO1xufVxuZnVuY3Rpb24gc2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICcnIDogYC8ke2RhdGEuaWR9YDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSkge1xuICB2YXIgcGVyQXBpRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBlckFwaUVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Blci1hcGknKTtcbiAgcGVyQXBpRWxlLmRhdGFzZXQuaWQgPSBpc05ld0FwaSA/ICcnIDogZGF0YS5pZDtcbiAgcGVyQXBpRWxlLmlubmVySFRNTCA9IHBlckFwaVRwbChkYXRhLCBpc05ld0FwaSk7XG4gIHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUgPSBpc05ld0FwaSA/ICcnIDogZGF0YS51cmk7XG4gIHJldHVybiBwZXJBcGlFbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgdGhpcy5hcGlDb250YWluZXIgPSBjb250YWluZXJOb2RlO1xuXG4gIHRoaXMuYXBpQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSkpO1xuXG4gIHRoaXMuYXBpRWxlID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLWFwaScpWzBdO1xuICBcbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNBUEkoKTtcblxuICB0aGlzLmxlYWZJbmRleCA9IDE7XG5cbiAgdGhpcy4kYXBpVHJlZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZignX2RhdGFfcm9vdCcsIDEsIDAsIGluaXRSZWN0T2JqKSk7XG5cbiAgdGhpcy4kYXBpVHJlZUZyYW1lID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtZnJhbWUnKVswXTtcblxuICB0aGlzLmluaXRBcGlUcmVlKCk7XG5cbiAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuXG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9ICcnO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLnN0b3JlQXBpUmV0dXJuRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gZGF0YTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmNsaWNrKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5qc29uVmlldyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyICRwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgJHByZS5pbm5lckhUTUwgPSBkYXRhO1xuICB0aGlzLiRkYXRhVmlldy5pbm5lckhUTUwgPSAnJztcbiAgdGhpcy4kZGF0YVZpZXcuYXBwZW5kQ2hpbGQoJHByZSk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0FQSSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBuZXdseUNyZWF0ZWRBcGlOb2RlID0gdGhpcy5hcGlFbGU7XG5cbiAgdmFyICRhcGlTYXZlID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdO1xuICB2YXIgJGFwaVVyaSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdO1xuICB2YXIgJGFwaVRlc3QgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10ZXN0JylbMF07XG4gIHZhciAkYXBpTWV0aG9kID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF07XG5cbiAgdmFyICRkYXRhUmF3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXJhdycpWzBdO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtYmVhdXRpZnknKVswXTtcbiAgdmFyICRkYXRhSGlnaGxpZ2h0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWhpZ2hsaWdodCcpWzBdO1xuICB2YXIgJGRhdGFQcmV2aWV3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXByZXZpZXcnKVswXTtcblxuICB0aGlzLiRkYXRhVmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS12aWV3JylbMF07XG5cbiAgJGFwaVNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICB9KTtcblxuICAkYXBpVGVzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB4aHIoJGFwaU1ldGhvZC52YWx1ZSwgJGFwaVVyaS52YWx1ZSwgdGhpcy5zdG9yZUFwaVJldHVybkRhdGEuYmluZCh0aGF0KSk7XG4gIH0pO1xuXG4gICRkYXRhUmF3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcodGhpcy5hcGlSZXR1cm5EYXRhKTtcbiAgfSk7XG5cbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoYmVhdXRpZnlKU09OKEpTT04ucGFyc2UodGhpcy5hcGlSZXR1cm5EYXRhKSkpO1xuICB9KTtcblxuICAkZGF0YUhpZ2hsaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGhpZ2h0bGlnaHRKU09OKEpTT04ucGFyc2UodGhpcy5hcGlSZXR1cm5EYXRhKSkpO1xuICB9KTtcblxuICAkZGF0YVByZXZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldygnVGhpcyBmZWF0dXJlIGhhcyBub3QgYmVlbiBhY2NvbXBsaXNoZWQgeWV0LicpO1xuICB9KTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5vcGVyYXRlRGF0YVJvb3RDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBhZGRNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBhZGRNYXJrLmNsYXNzTmFtZSA9ICdhZGQtZGF0YXJvb3QtY2hpbGQnO1xuICBhZGRNYXJrLnRleHRDb250ZW50ID0gJysnO1xuICBhZGRNYXJrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoYXQubGVhZkluZGV4ICs9IDE7XG4gICAgICB2YXIgcGFyZW50SWR4ID0gJ19kYXRhX3Jvb3QnO1xuICAgICAgdmFyIG5vZGVMZXZlbCA9IDA7XG4gICAgICB0aGF0LmFwaVRyZWUuYWRkKHRoYXQubGVhZkluZGV4LCBwYXJlbnRJZHgsIHRoYXQuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICAgICAgdGhhdC4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkeCwgdGhhdC5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgaW5pdFJlY3RPYmopKTtcbiAgICAgIHZhciBvYmogPSB0aGF0LmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICAgICAgdGhhdC5zdHlsZU5vZGVzKG9iaik7XG4gICAgICB0aGF0LmJpbmRFdmVudHNUb01SQ0UoKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoYWRkTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxuICB2YXIgZGVsTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZGVsTWFyay5jbGFzc05hbWUgPSAnZGVsLWRhdGFyb290LWNoaWxkJztcbiAgZGVsTWFyay50ZXh0Q29udGVudCA9ICctJztcbiAgZGVsTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAvKiB0aGlzIEFQSSBpcyBkZWxldGVkLiAqL1xuXG4gICAgICAvLyB0aGF0LmFwaUNvbnRhaW5lci5yZW1vdmVDaGlsZChldi5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykpO1xuICAgIH0pO1xuICB0aGlzLiRhcGlUcmVlLmluc2VydEJlZm9yZShkZWxNYXJrLCB0aGlzLiRhcGlUcmVlLmZpcnN0Q2hpbGQpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmluaXRBcGlUcmVlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXBpVHJlZSA9IG5ldyBUcmVlKCdfZGF0YV9yb290Jyk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoMSwgJ19kYXRhX3Jvb3QnLCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgdGhpcy5vcGVyYXRlRGF0YVJvb3RDaGlsZCgpO1xuXG4gIHJldHVybiB0aGlzLmFwaVRyZWU7XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmRlbE5vZGUgPSBmdW5jdGlvbihjdHgpIHtcbiAgdmFyIGN1cnJlbnRMZWFmID0gY3R4LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICB2YXIgcGFyZW50SWR4ID0gaXNOYU4oK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQpID8gJ19kYXRhX3Jvb3QnIDogK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQ7XG5cbiAgdmFyIG5vZGVzQXJyID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGVzY2VuZGFudHMoY3VycmVudElkeCk7XG4gIHZhciBpZHhBcnIgPSBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKTtcbiAgdGhpcy5hcGlUcmVlLnJlbW92ZShjdXJyZW50SWR4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdGhpcy5yZW1vdmVOb2Rlc0Zyb21Eb20oaWR4QXJyKTtcblxuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZHgpO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0LmluZGV4KSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJGFwaVRyZWUucmVtb3ZlQ2hpbGQoYWxsTGVhdmVzW2ldKTtcbiAgICB9XG4gIH07XG59O1xuZnVuY3Rpb24gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycikge1xuICB2YXIgbm9kZXNBcnJMZW4gPSBub2Rlc0Fyci5sZW5ndGg7XG4gIHZhciBpZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlc0FyckxlbjsgaSsrKSB7XG4gICAgaWR4QXJyLnB1c2gobm9kZXNBcnJbaV0uZGF0YSk7XG4gIH07XG4gIHJldHVybiBpZHhBcnI7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDRSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGVhdmVzID0gdGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJyk7XG4gIHZhciBsZWF2ZXNMZW4gPSBsZWF2ZXMubGVuZ3RoO1xuICB2YXIgbmV3bHlDcmVhdGVkTGVhZiA9IGxlYXZlc1tsZWF2ZXNMZW4gLSAxXTtcbiAgdmFyICRhZGRDaGlsZCA9IG5ld2x5Q3JlYXRlZExlYWYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWNoaWxkJylbMF07XG4gICRhZGRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eCA9PiB7XG4gICAgdGhpcy5hZGRDaGlsZChjdHgpO1xuICB9KTtcblxuICB2YXIgJHJlbW92ZUNoaWxkID0gbmV3bHlDcmVhdGVkTGVhZi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZW1vdmUtY2hpbGQnKVswXTtcbiAgJHJlbW92ZUNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4ID0+IHtcbiAgICB0aGlzLmRlbE5vZGUoY3R4KTtcbiAgfSk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLnNldFBhcmVudE5vZGVWYWwgPSBmdW5jdGlvbihpZHgpIHtcbiAgdmFyIGxlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIHF1ZXVlID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcbiAgdmFyIHF1ZXVlTGVuID0gcXVldWUuX25ld2VzdEluZGV4IC0gcXVldWUuX29sZGVzdEluZGV4O1xuICBmb3IgKHZhciBpID0gMCwgeCA9IGxlYXZlcy5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBpZiAoK2xlYXZlc1tpXS5kYXRhc2V0LmluZGV4ID09PSBpZHgpIHtcbiAgICAgIGlmIChxdWV1ZUxlbiA+IDApIHtcbiAgICAgICAgbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICctLS0+JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnJztcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICB9O1xuICB9O1xufTtcbkFwaURvbS5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbihjdHgpIHtcbiAgdGhpcy5sZWFmSW5kZXggKz0gMTtcbiAgdmFyIHBhcmVudElkZXggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICB2YXIgbm9kZUxldmVsID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5sZXZlbCArIDE7XG5cbiAgLy8gYXBpVHJlZSBvcGVyYXRpb25cbiAgdGhpcy5hcGlUcmVlLmFkZCh0aGlzLmxlYWZJbmRleCwgcGFyZW50SWRleCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSkpO1xuICB2YXIgY2hpbGRyZW5Ob2RlcyA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKHBhcmVudElkZXgpO1xuXG4gIHZhciBjaGlsZHJlbklkeEFyciA9IFtdO1xuICBmb3IgKHZhciBwZXJOb2RlIGluIGNoaWxkcmVuTm9kZXMuX3N0b3JhZ2UpIHtcbiAgICBpZiAoKHR5cGVvZiBwYXJzZUludChwZXJOb2RlKSA9PT0gJ251bWJlcicpICYmIGNoaWxkcmVuTm9kZXMuX3N0b3JhZ2VbcGVyTm9kZV0uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xuICAgICAgY2hpbGRyZW5JZHhBcnIucHVzaChjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmRhdGEpO1xuICAgIH07XG4gIH1cblxuICB2YXIgY2hpbGRyZW5JZHhBcnJMZW4gPSBjaGlsZHJlbklkeEFyci5sZW5ndGg7XG5cbiAgY2xvbmVkUmVjdE9iai5yaWdodCAtPSAzMDtcblxuICBjbG9uZWRSZWN0T2JqLmJvdHRvbSA9IGNoaWxkcmVuSWR4QXJyTGVuID09PSAxID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkUmVjdE9iai5ib3R0b20gKyBjbG9uZWRSZWN0T2JqLmhlaWdodCAqIChjaGlsZHJlbklkeEFyckxlbiAtIDIpICsgKGNoaWxkcmVuSWR4QXJyTGVuIC0gMSkgKiAyMDtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkZXgsIHRoaXMubGVhZkluZGV4LCBub2RlTGV2ZWwsIGNsb25lZFJlY3RPYmopKTtcbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNFKCk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkZXgpO1xuXG59O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUxlYWZTcGFuKHBhcmVudElkLCBub2RlSW5kZXgsIG5vZGVMZXZlbCwgcmVjdE9iaikge1xuICB2YXIgbmV3TGVhZlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGVhZicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JywgcGFyZW50SWQpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBub2RlSW5kZXgpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGV2ZWwnLCBub2RlTGV2ZWwpO1xuICBuZXdMZWFmU3Bhbi5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArIE1hdGgucm91bmQocmVjdE9iai53aWR0aCAqIG5vZGVMZXZlbCArIHBlclNWR1BhdGhXaWR0aCAqIG5vZGVMZXZlbCkgKyAncHgsICcgKyBNYXRoLnJvdW5kKHJlY3RPYmouYm90dG9tKSArICdweCwgMCknO1xuICBuZXdMZWFmU3Bhbi5pbm5lckhUTUwgPSBsZWFmQ29udGVudFRwbDtcbiAgcmV0dXJuIG5ld0xlYWZTcGFuO1xufVxuZnVuY3Rpb24gY3JlYXRlTGVhZihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikge1xuICB2YXIgbmV3TGVhZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgbmV3TGVhZi5hcHBlbmRDaGlsZChnZW5lcmF0ZUxlYWZTcGFuKHBhcmVudElkeCwgbm9kZUlkeCwgbm9kZUxldmVsLCByZWN0T2JqKSk7XG4gIHJldHVybiBuZXdMZWFmO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zdHlsZU5vZGVzID0gZnVuY3Rpb24oc3R5bGVPYmopIHtcbiAgdmFyIGxlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGxlYWZJZHgsIG9mZnNldFksIG9yaWdpbmFsWCA9ICcnO1xuXG4gIHZhciBzdHlsZXNBcnIgPSBbXSwgeFZhbHVlLCB5VmFsdWU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZWF2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBvcmlnaW5hbFggPSBnZXRUcmFuc2xhdGVYKGxlYXZlc1tpXSk7XG4gICAgbGVhZklkeCA9ICsobGVhdmVzW2ldLmRhdGFzZXQuaW5kZXgpO1xuXG4gICAgZm9yICh2YXIgc3R5bGVPYmpJZHggaW4gc3R5bGVPYmopIHtcbiAgICAgIGlmICgrc3R5bGVPYmpJZHggPT09IGxlYWZJZHgpIHtcbiAgICAgICAgb2Zmc2V0WSA9IHN0eWxlT2JqW3N0eWxlT2JqSWR4XSAqIDUyO1xuICAgICAgfTtcbiAgICB9XG4gICAgc3R5bGVzQXJyLnB1c2goW29yaWdpbmFsWCwgb2Zmc2V0WV0pO1xuICB9O1xuXG4gIGZvciAodmFyIGogPSAwLCBzdHlsZXNBcnJMZW4gPSBzdHlsZXNBcnIubGVuZ3RoOyBqIDwgc3R5bGVzQXJyTGVuOyBqKyspIHtcbiAgICBsZWF2ZXNbal0uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBzdHlsZXNBcnJbal1bMF0gKyAncHgsICcgKyBzdHlsZXNBcnJbal1bMV0gKyAncHgsIDApJztcbiAgfVxuXG4gIHRoaXMuZGltZW5zaW9uQXJyID0gdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICB0aGlzLmRyYXdTVkcoKTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmFkZFNpYmxpbmcgPSBmdW5jdGlvbihjdHgpIHtcbiAgdGhpcy5sZWFmSW5kZXggKz0gMTtcbiAgdmFyIHBhcmVudElkeCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50O1xuICB2YXIgbm9kZUxldmVsID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5sZXZlbDtcbiAgcGFyZW50SWR4ID0gaXNOYU4ocGFyZW50SWR4KSA/ICdfZGF0YV9yb290JyA6IHBhcmVudElkeDtcbiAgdGhpcy5hcGlUcmVlLmFkZCh0aGlzLmxlYWZJbmRleCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHZhciByZWN0T2JqID0gdGhpcy5ub2RlTGVmdE9mZnNldChjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlKTtcbiAgdmFyIGNsb25lZFJlY3RPYmogPSBjbG9uZVJlY3RPYmoocmVjdE9iaik7XG4gIGNsb25lZFJlY3RPYmoucmlnaHQgPSBjbG9uZWRSZWN0T2JqLnJpZ2h0IC0gY2xvbmVkUmVjdE9iai53aWR0aDtcbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gKz0gMzA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZHgsIHRoaXMubGVhZkluZGV4LCBub2RlTGV2ZWwsIGNsb25lZFJlY3RPYmopKTtcbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuXG59O1xuXG4vKiB1dGlscyAqL1xuZnVuY3Rpb24gY2xvbmVSZWN0T2JqKG9iaikge1xuICByZXR1cm4ge1xuICAgIHRvcDogb2JqLnRvcCxcbiAgICBib3R0b206IG9iai5ib3R0b20sXG4gICAgbGVmdDogb2JqLmxlZnQsXG4gICAgcmlnaHQ6IG9iai5yaWdodCxcbiAgICB3aWR0aDogb2JqLndpZHRoLFxuICAgIGhlaWdodDogb2JqLmhlaWdodFxuICB9O1xufVxuXG4vKiBtYW5pcHVsYXRlIFNWRyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jbGVhclNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXTtcbiAgd2hpbGUgKHN2Zy5sYXN0Q2hpbGQpIHtcbiAgICBzdmcucmVtb3ZlQ2hpbGQoc3ZnLmxhc3RDaGlsZCk7XG4gIH1cbn07XG4vKipcbiAqIFtkcmF3U1ZHIGRlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gKi9cbkFwaURvbS5wcm90b3R5cGUuZHJhd1NWRyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyU1ZHKCk7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIHN2Z1BhcnRpYWxzID0gW107XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHN2Z1BhcnRpYWxzLnB1c2godGhhdC5jcmVhdGVTaW5nbGVTVkcobm9kZS5kYXRhLCBub2RlLmNvbHVtbiwgbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwsIChub2RlLnRvdGFsb2Zmc2V0eWxldmVsIC0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwpKSk7XG4gICAgfTtcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuXG4gIHZhciBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN2Z1BhcnRpYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZChzdmdQYXJ0aWFsc1tpXSk7XG4gIH1cbiAgdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5jcmVhdGVTaW5nbGVTVkcgPSBmdW5jdGlvbihpZHgsIGhvcmksIHBhcmVudFZlcnQsIGR2ZXJ0KSB7XG5cbiAgdmFyIHN2Z25zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgdmFyIG5ld1BhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnbnMsICdwYXRoJyk7XG4gIHZhciBjb250cm9sUmF0ZSA9IDAuMjtcbiAgdmFyIG14LCBteSwgcXgsIHF5LCBxeHgsIHF5eSwgdHgsIHR5O1xuICBob3JpID0gaG9yaSAtIDE7XG4gIGR2ZXJ0ID0gZHZlcnQ7XG4gIHBhcmVudFZlcnQgPSBwYXJlbnRWZXJ0O1xuXG4gIG14ID0gaG9yaSAqIDUwMTtcbiAgbXkgPSBwYXJlbnRWZXJ0ICogNTIgKyA4O1xuICBxeCA9IG14ICsgMTA7XG4gIHF5ID0gbXk7XG4gIHF4eCA9IG14ICsgMTU7XG4gIHF5eSA9IChteSArIChkdmVydCAvIDIpICogNTIpO1xuICB0eCA9IG14ICsgMzA7XG4gIHR5ID0gbXkgKyBkdmVydCAqIDUyO1xuXG4gIG5ld1BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCAnTSAnICsgbXggKyAnICcgKyBteSArICcgUSAnICsgcXggKyAnICcgKyBxeSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXh4ICsgJyAnICsgcXl5ICsgJyBUICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ICsgJyAnICsgdHkgKyAnJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdjbGFzcycsICdhcGktc3ZnLXBhdGgnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWR4JywgaWR4KTtcblxuICByZXR1cm4gbmV3UGF0aDtcbn07XG5cbi8qIGNhbGN1bGF0ZSBkaW1lbnNpb25zICovXG5BcGlEb20ucHJvdG90eXBlLmNhbGNEaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGltZW5zaW9uQXJyID0gdGhpcy5hcGlUcmVlLm1heExldmVscygpO1xuICB2YXIgaG9yaU1heCwgdmVydGljYWxNYXgsIGhvcmlBcnIgPSBbXSwgdmVydEFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgeCA9IHRoaXMuZGltZW5zaW9uQXJyLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGhvcmlBcnIucHVzaCh0aGlzLmRpbWVuc2lvbkFycltpXS5sZW5ndGgpO1xuICB9O1xuICBob3JpTWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaG9yaUFycik7XG4gIHZlcnRpY2FsTWF4ID0gdGhpcy5hcGlUcmVlLl9yb290LmNoaWxkcmVubGV2ZWw7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS53aWR0aCA9IGhvcmlNYXggKiA1MjAgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUuaGVpZ2h0ID0gdmVydGljYWxNYXggKiA1MiArICdweCc7XG4gIHRoaXMuZGltZW5zaW9uQXJyID0gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcbiAgcmV0dXJuIFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG5cbn07XG5cbi8qIGNhbGN1bGF0ZSBvZmZzZXQgKi9cblxuQXBpRG9tLnByb3RvdHlwZS5ub2RlTGVmdE9mZnNldCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHZhciBlbFJlY3RPYmplY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGJvZHlSZWN0T2JqID0gdGhpcy4kYXBpVHJlZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGNsb25lQm9keVJlY3RPYmogPSBjbG9uZVJlY3RPYmooYm9keVJlY3RPYmopO1xuICB2YXIgY2xvbmVFbFJlY3RPYmplY3QgPSBjbG9uZVJlY3RPYmooZWxSZWN0T2JqZWN0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QudG9wICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoudG9wKTtcbiAgY2xvbmVFbFJlY3RPYmplY3QuYm90dG9tICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoudG9wKTtcbiAgY2xvbmVFbFJlY3RPYmplY3QubGVmdCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLmxlZnQpO1xuICBjbG9uZUVsUmVjdE9iamVjdC5yaWdodCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLmxlZnQpO1xuICByZXR1cm4gY2xvbmVFbFJlY3RPYmplY3Q7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLWRvbS5qc1xuICoqLyIsIi8qKlxuICogW1RyZWUgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0ge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXG4gKlxuICogX3Jvb3QgcG9pbnRzIHRvIHRoZSByb290IG5vZGUgb2YgYSB0cmVlLlxuICogdHJhdmVyc2VERihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIERGUy5cbiAqIHRyYXZlcnNlQkYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBCRlMuXG4gKiBjb250YWlucyhkYXRhLCB0cmF2ZXJzYWwpIHNlYXJjaGVzIGZvciBhIG5vZGUgaW4gYSB0cmVlLlxuICogYWRkKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2UpIGFkZHMgYSBub2RlIHRvIGEgdHJlZS5cbiAqIHJlbW92ZShjaGlsZCwgcGFyZW50KSByZW1vdmVzIGEgbm9kZSBpbiBhIHRyZWUuXG4gKlxuICovXG5pbXBvcnQge1F1ZXVlfSBmcm9tICcuL3F1ZXVlJztcbmV4cG9ydCBmdW5jdGlvbiBUcmVlKGRhdGEpIHtcbiAgdmFyIG5vZGUgPSBuZXcgTm9kZShkYXRhKTtcbiAgdGhpcy5fcm9vdCA9IG5vZGU7XG59XG5cbmZ1bmN0aW9uIE5vZGUoZGF0YSkge1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgLy8gYWRkZWQgbGF0ZXJcbiAgdGhpcy5jaGlsZHJlbmxldmVsID0gMTtcbiAgdGhpcy5jb2x1bW4gPSAwO1xuICB0aGlzLnRvdGFsb2Zmc2V0eWxldmVsID0gMDtcbn1cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VERiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgLy8gdGhpcyBpcyBhIHJlY3Vyc2UgYW5kIGltbWVkaWF0ZWx5LWludm9raW5nIGZ1bmN0aW9uXG4gIChmdW5jdGlvbiByZWN1cnNlKGN1cnJlbnROb2RlKSB7XG4gICAgLy8gc3RlcCAyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBzdGVwIDNcbiAgICAgIHJlY3Vyc2UoY3VycmVudE5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIC8vIHN0ZXAgNFxuICAgIGNhbGxiYWNrKGN1cnJlbnROb2RlKTtcblxuICAgIC8vIHN0ZXAgMVxuICB9KSh0aGlzLl9yb290KTtcblxufTtcblxuLy8gZm9yIHRob3NlIG5vZGVzIHdobyBoYXZlIGNoaWxkcmVuXG5mdW5jdGlvbiBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkge1xuICB2YXIgdG90YWxDaGlsZHJlbkxldmVscyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHRvdGFsQ2hpbGRyZW5MZXZlbHMgKz0gbm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxDaGlsZHJlbkxldmVscztcbn1cblRyZWUucHJvdG90eXBlLmNhbGNDaGlsZHJlbkxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkgOiAxO1xuICAgIG5vZGUuY29sdW1uID0gbm9kZS5wYXJlbnQgPyAobm9kZS5wYXJlbnQuY29sdW1uICsgMSkgOiAwO1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VERihjYWxsYmFjayk7XG59O1xuXG5mdW5jdGlvbiBjYWxjT2ZmWShhcnIsIGRhdGEpIHtcbiAgdmFyIG5vZGVJZHggPSBmaW5kSW5kZXgoYXJyLCBkYXRhKTtcbiAgdmFyIHRvdGFsWSA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUlkeDsgaSsrKSB7XG4gICAgdG90YWxZICs9IGFycltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxZO1xufVxuXG5UcmVlLnByb3RvdHlwZS5jYWxjVG90YWxPZmZzZXRZTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxldmVsZ2FwID0gMDtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgbm9kZS50b3RhbG9mZnNldHlsZXZlbCA9IG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsICsgY2FsY09mZlkobm9kZS5wYXJlbnQuY2hpbGRyZW4sIG5vZGUuZGF0YSk7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXG4gICAgfTtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG59O1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZUJGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCk7XG5cbiAgcXVldWUuZW5xdWV1ZSh0aGlzLl9yb290KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjdXJyZW50VHJlZSk7XG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cbn07XG5cblRyZWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRyYXZlcnNhbCkge1xuICB0cmF2ZXJzYWwuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihkYXRhLCB0b0RhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgY2hpbGQgPSBuZXcgTm9kZShkYXRhKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLmRhdGEgPT09IHRvRGF0YSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhZGQgbm9kZSB0byBhIG5vbi1leGlzdGVudCBwYXJlbnQuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhLCBmcm9tRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciB0cmVlID0gdGhpcyxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjaGlsZFRvUmVtb3ZlID0gbnVsbCxcbiAgICAgIGluZGV4O1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5kYXRhID09PSBmcm9tRGF0YSkge1xuICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgaW5kZXggPSBmaW5kSW5kZXgocGFyZW50LmNoaWxkcmVuLCBkYXRhKTtcblxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgdG8gcmVtb3ZlIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZFRvUmVtb3ZlID0gcGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignUGFyZW50IGRvZXMgbm90IGV4aXN0LicpO1xuICB9XG5cbiAgdGhpcy5jYWxjQ2hpbGRyZW5MZXZlbCgpO1xuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xuXG4gIHJldHVybiBjaGlsZFRvUmVtb3ZlO1xufTtcblxuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgZGF0YSkge1xuICB2YXIgaW5kZXg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldLmRhdGEgPT09IGRhdGEpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qIHRyZWUgYWRkb24qL1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURpcmVjdENoaWxkID0gZnVuY3Rpb24obm9kZWRhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gIHBhcmVudCA9IG51bGwsXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5kYXRhID09PSBub2RlZGF0YSkge1xuICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShwYXJlbnQuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsYmFjayhwYXJlbnQpO1xuICAgIHBhcmVudCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufTtcblRyZWUucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlT2JqID0ge307XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzdHlsZU9ialtub2RlLmRhdGFdID0gbm9kZS50b3RhbG9mZnNldHlsZXZlbDtcbiAgfTtcbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxuICByZXR1cm4gc3R5bGVPYmo7XG59O1xuXG4vKipcbiAqIFt0cmF2ZXJzZURlc2NlbmRhbnRzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W2ludGVnZXJdfSBub2RlRGF0YSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbYXJyYXldfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEZXNjZW5kYW50cyA9IGZ1bmN0aW9uKG5vZGVEYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gbm9kZURhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgcXVldWUuZW5xdWV1ZShwYXJlbnQpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgdmFyIGRlc2NlbmRhbnRzQXJyID0gW107XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZGVzY2VuZGFudHNBcnIucHVzaChjdXJyZW50VHJlZSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjZW5kYW50c0Fycjtcbn07XG5cblRyZWUucHJvdG90eXBlLm1heExldmVscyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBkYXRhUm9vdE5vZGVzID0gdGhpcy50cmF2ZXJzZURpcmVjdENoaWxkKCdfZGF0YV9yb290Jyk7XG4gIHZhciByb3dMZXZlbE9iaiA9IHt9O1xuICB2YXIgaGVhZElkeEFyciA9IFtdO1xuICBmb3IgKHZhciBkcm4gaW4gZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZSkge1xuICAgIGlmIChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlLmhhc093blByb3BlcnR5KGRybikpIHtcbiAgICAgIHJvd0xldmVsT2JqW2Rybl0gPSB7fTtcbiAgICAgIHJvd0xldmVsT2JqW2Rybl1bJ2hlYWQtaWR4J10gPSBkYXRhUm9vdE5vZGVzLl9zdG9yYWdlW2Rybl0uZGF0YTtcbiAgICAgIGhlYWRJZHhBcnIucHVzaChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlW2Rybl0uZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3RJZHhGcm9tUXVldWUocXVldWUpIHtcbiAgICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgICBmb3IgKHZhciBwZXJOb2RlIGluIHF1ZXVlLl9zdG9yYWdlKSB7XG4gICAgICBpZiAoKHR5cGVvZiBwYXJzZUludChwZXJOb2RlKSA9PT0gJ251bWJlcicpICYmIHF1ZXVlLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgY2hpbGRyZW5JZHhBcnIucHVzaChxdWV1ZS5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbklkeEFycjtcbiAgfVxuXG4gIHZhciBsZXZlbE5leHRDb2xBcnIgPSBbXTtcblxuICBmdW5jdGlvbiBnZXRSb3dMZXZlbChpZHgpIHtcbiAgICB2YXIgZGlyZWN0Q2hpbGRyZW5RdWV1ZSA9IHRoYXQudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICAgIHZhciBkaXJlY3RDaGlsZHJlbkFyciA9IGV4dHJhY3RJZHhGcm9tUXVldWUoZGlyZWN0Q2hpbGRyZW5RdWV1ZSk7XG4gICAgcmV0dXJuIGRpcmVjdENoaWxkcmVuQXJyO1xuICB9XG5cbiAgdmFyIHVsdGltYXRlQXJyID0gW107XG4gIHZhciBwZXJIZWFkID0gW107XG5cbiAgZnVuY3Rpb24gbmV4dExldmVsQ2hpbGRyZW4oYXJyKSB7XG4gICAgdmFyIG5leHRMZXZlbENoaWxkcmVuQXJyID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwZXJOdW0gPSBnZXRSb3dMZXZlbChhcnJbaV0pO1xuICAgICAgbmV4dExldmVsQ2hpbGRyZW5BcnIgPSBuZXh0TGV2ZWxDaGlsZHJlbkFyci5jb25jYXQocGVyTnVtKTtcbiAgICB9O1xuICAgIGlmIChuZXh0TGV2ZWxDaGlsZHJlbkFyci5sZW5ndGgpIHtcbiAgICAgIHBlckhlYWQucHVzaChuZXh0TGV2ZWxDaGlsZHJlbkFyci5sZW5ndGgpO1xuICAgICAgbmV4dExldmVsQ2hpbGRyZW4obmV4dExldmVsQ2hpbGRyZW5BcnIpO1xuICAgIH07XG4gIH1cblxuICAoZnVuY3Rpb24gcmVjdXJzZShhcnIpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwZXJIZWFkID0gW107XG4gICAgICAvLyBsZXZlbCAxXG4gICAgICBsZXZlbE5leHRDb2xBcnIgPSBnZXRSb3dMZXZlbChhcnJbaV0pO1xuICAgICAgcGVySGVhZC5wdXNoKDEpO1xuICAgICAgaWYgKGxldmVsTmV4dENvbEFyci5sZW5ndGgpIHtcbiAgICAgICAgcGVySGVhZC5wdXNoKGxldmVsTmV4dENvbEFyci5sZW5ndGgpO1xuICAgICAgICBuZXh0TGV2ZWxDaGlsZHJlbihsZXZlbE5leHRDb2xBcnIpO1xuICAgICAgfTtcbiAgICAgIHVsdGltYXRlQXJyLnB1c2gocGVySGVhZCk7XG4gICAgfTtcbiAgfSkoaGVhZElkeEFycik7XG5cbiAgcmV0dXJuIHVsdGltYXRlQXJyO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanNcbiAqKi8iLCIvKipcbiAqIFtRdWV1ZSBkZXNjcmlwdGlvbl1cbiAqIGVucXVldWUoZGF0YSkgYWRkcyBkYXRhIHRvIGEgcXVldWUuXG4gKiBkZXF1ZXVlIHJlbW92ZXMgdGhlIG9sZGVzdCBhZGRlZCBkYXRhIHRvIGEgcXVldWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgdGhpcy5fb2xkZXN0SW5kZXggPSAxO1xuICB0aGlzLl9uZXdlc3RJbmRleCA9IDE7XG4gIHRoaXMuX3N0b3JhZ2UgPSB7fTtcbn1cblxuUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25ld2VzdEluZGV4IC0gdGhpcy5fb2xkZXN0SW5kZXg7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5fc3RvcmFnZVt0aGlzLl9uZXdlc3RJbmRleF0gPSBkYXRhO1xuICB0aGlzLl9uZXdlc3RJbmRleCsrO1xufTtcblxuUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZGVzdEluZGV4ID0gdGhpcy5fb2xkZXN0SW5kZXgsXG4gICAgICBuZXdlc3RJbmRleCA9IHRoaXMuX25ld2VzdEluZGV4LFxuICAgICAgZGVsZXRlZERhdGE7XG5cbiAgaWYgKG9sZGVzdEluZGV4ICE9PSBuZXdlc3RJbmRleCkge1xuICAgIGRlbGV0ZWREYXRhID0gdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgZGVsZXRlIHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIHRoaXMuX29sZGVzdEluZGV4Kys7XG5cbiAgICByZXR1cm4gZGVsZXRlZERhdGE7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPZkFycmF5KG51bUFycmF5KSB7XG4gIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihjbGFzc05hbWUpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksIHByZWZpeCA9ICcnO1xuICBwcmVmaXggPSAodWEuaW5kZXhPZignY2hyb21lJykgPj0gMCB8fCB3aW5kb3cub3BlbkRhdGFiYXNlKSA/ICctd2Via2l0LScgOiAodWEuaW5kZXhPZignZmlyZWZveCcpID49IDApID8gJy1tb3otJyA6IHdpbmRvdy5vcGVyYSA/ICctby0nIDogKGRvY3VtZW50LmFsbCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPT09IC0xKSA/ICctbXMtJyA6ICcnO1xuICByZXR1cm4gcHJlZml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsKSB7XG4gIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuXG4gIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbiAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcblxuICByZXN1bHRzLnB1c2goMCk7XG4gIHJldHVybiByZXN1bHRzLnNsaWNlKDUsIDgpOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4vLyAgIC8vIGNocm9tZSB3b24ndCB1c2UgcHJlZml4XG4vLyAgIC8vIHZhciBzdHlsZV9hdHRyID0gYnJvd3NlclByZWZpeCgpICsgJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciBzdHlsZV9hdHRyID0gJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZV9hdHRyKTtcbi8vICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuLy8gICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4vLyAgIGlmIChyZXN1bHRzWzFdID09PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuLy8gICByZXN1bHRzLnB1c2goMCk7XG4vLyAgIHJldHVybiArKHJlc3VsdHMuc2xpY2UoNSwgOClbMF0pOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykuc3BsaXQoJ3RyYW5zbGF0ZTNkJylbMV0uc3BsaXQoJywgJylbMF0uc2xpY2UoMSkuc3BsaXQoJ3B4JylbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVZKG9iaikge1xuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSB8fCBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICB2YXIgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICBpZiAobWF0KSByZXR1cm4gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbMTNdKTtcbiAgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgcmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGhyKG1ldGhvZCwgdXJsLCBjYWxsYmFjaywgcGFyYW1zT2JqID0ge30sIGlzQXN5bmMgPSB0cnVlKSB7XG4gIHZhciB4bWxodHRwO1xuXG4gIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgaWYgKHhtbGh0dHAuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBjYWxsYmFjayh4bWxodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKHhtbGh0dHAuc3RhdHVzID09IDQwMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIHdhcyBhbiBlcnJvciA0MDAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc29tZXRoaW5nIGVsc2Ugb3RoZXIgdGhhbiAyMDAgd2FzIHJldHVybmVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBjb21iVXJsID0gdXJsICsgc2VyaWFsaXplKHBhcmFtc09iaik7XG5cbiAgeG1saHR0cC5vcGVuKG1ldGhvZCwgY29tYlVybCwgaXNBc3luYyk7XG4gIHhtbGh0dHAuc2VuZChudWxsKTtcbn1cblxuLyoqXG4gKiBbc3RyaW5naWZ5IHdpdGggNCBzcGFjZXMgYXQgZWFjaCBsZXZlbF1cbiAqIEBwYXJhbSAge1tvYmplY3RdfSBqc09iaiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIFwiXFx0XCIpOyAvLyBzdHJpbmdpZnkgd2l0aCB0YWJzIGluc2VydGVkIGF0IGVhY2ggbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIFtoaWdodGxpZ2h0SlNPTiB3b3JrcyBvbiBKU09OIG9iamVjdCwgbm90IHN0cmluZ11cbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XG4gIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uLCB1bmRlZmluZWQsIDQpO1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICB2YXIgY2xzID0gJ251bWJlcic7XG4gICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAna2V5JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgfSBlbHNlIGlmICgvbnVsbC8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdudWxsJztcbiAgICB9XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=