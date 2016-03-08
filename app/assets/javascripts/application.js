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
	
	var _apiTreeTreeDataCollect = __webpack_require__(19);
	
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
	    // let params = {
	    //   'section': ev.target.parentNode.getElementsByClassName('api-section')[0].value,
	    //   'uri': ev.target.parentNode.getElementsByClassName('api-uri')[0].value,
	    //   'method': ev.target.parentNode.getElementsByClassName('api-method')[0].value
	    // };
	    var params = (0, _apiTreeTreeDataCollect.collectApiData)(ev.target);
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
	
	var leafContentTpl = '<i class="remove-child">-</i>' + '<input type="text" class="leaf-key" placeholder="key" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="value" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-quantity" placeholder="quantity" />' + '<i class="add-child">+</i>';
	
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
	    idxArr.push(nodesArr[i].nodeId);
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.collectApiData = collectApiData;
	
	var _commonUtilities = __webpack_require__(9);
	
	function collectApiData(opEle) {
	  var perApiEle = opEle.closest('.per-api');
	  var infoEle = perApiEle.getElementsByClassName('api-info')[0];
	  var treeEle = perApiEle.getElementsByClassName('api-tree')[0];
	  return (0, _commonUtilities.mergeObj)(collectInfo(infoEle), collectTree(treeEle));
	}
	
	function collectInfo(infoEle) {
	  var infoData = {};
	  infoData = {
	    'section': infoEle.getElementsByClassName('api-section')[0].value,
	    'uri': infoEle.getElementsByClassName('api-uri')[0].value,
	    'method': infoEle.getElementsByClassName('api-method')[0].value,
	    'description': infoEle.getElementsByClassName('api-description')[0].value
	  };
	
	  return infoData;
	}
	
	function collectTree(treeEle) {
	  var leaves = [].slice.call(treeEle.getElementsByClassName('leaf'));
	  var treeDataArr = [];
	  var treeDataObj = {};
	  var leafData = undefined;
	  for (var i = 0, leavesLen = leaves.length; i < leavesLen; i++) {
	    leafData = {};
	    leafData.parentId = leaves[i].dataset.parent;
	    leafData.nodeId = leaves[i].dataset.index;
	    leafData.key = leaves[i].getElementsByClassName('leaf-key')[0].value;
	    leafData.value = leaves[i].getElementsByClassName('leaf-value')[0].value;
	    leafData.quantity = leaves[i].getElementsByClassName('leaf-quantity')[0].value;
	    treeDataArr.push(leafData);
	  };
	  treeDataObj.data = JSON.stringify(treeDataArr);
	  return treeDataObj;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNWY5MDI1NWNkZWM1ODYxM2M5OWYiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRGF0YUNvbGxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs2Q0N0Q3dCLENBQXFCOzs0Q0FDMUIsQ0FBb0I7O2dEQUVqQixDQUF3Qjs7QUFDOUMsbUNBQVcsQ0FBQzs7Ozs7O0FBTVosRUFBQyxZQUFNO0FBQ0wsT0FBSSxNQUFNLEdBQUc7QUFDWCxRQUFHLHVCQUFNO0FBQ1QsV0FBTSxFQUFFLDhCQUFTO0lBQ2xCLENBQUM7QUFDRixPQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUN4QyxPQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDbkMsU0FBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLElBQ3ZFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDekIsWUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDaEQsZUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQztNQUNGLE1BQU07QUFDTCxhQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzlCO0lBQ0Y7RUFFRixHQUFHLEM7Ozs7Ozs7Ozs7Ozs7K0NDM0J1QixDQUF3Qjs7QUFFNUMsVUFBUyxTQUFTLEdBQUc7QUFDMUIsV0FBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7RUFDNUQ7O0FBQ0QsVUFBUyxlQUFlLENBQUMsQ0FBQyxFQUFFO0FBQzFCLE9BQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUV0QixPQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFDeEIsT0FBTzs7O0FBR1gsT0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQ3hDLE1BQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQiwyQ0FBYSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0NmNEIsQ0FBZ0I7Ozs7Ozs7Ozs7QUFReEMsVUFBUyxZQUFZLENBQUMsSUFBSSxFQUFZO09BQVYsR0FBRyx5REFBRyxFQUFFOztBQUN6QyxPQUFJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztPQUNsQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO09BQzVCLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQztPQUNwQyxTQUFTLEdBQUcsc0JBQUksU0FBUyxFQUFFO09BQzNCLFNBQVMsR0FBRyxzQkFBSSxTQUFTLEVBQUUsQ0FBQztBQUM5QixPQUFJLFNBQVMsR0FBRztBQUNkLFNBQUksRUFBRSxJQUFJO0FBQ1YsV0FBTSxFQUFFLE1BQU07QUFDZCxXQUFNLEVBQUUsTUFBTTtBQUNkLGNBQVMsRUFBRSxTQUFTO0FBQ3BCLGNBQVMsRUFBRSxTQUFTO0lBQ3JCLENBQUM7QUFDRixPQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3pDLGtCQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekIsYUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBQ3JCOztBQUNELFVBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFDL0IsT0FBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxJQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDekIsSUFBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDaEMsSUFBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLE9BQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUNqQixNQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQzs7QUFFRixPQUFJLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLElBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLElBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLElBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdEMsT0FBSSxDQUFDLENBQUM7QUFDTixPQUFJLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUM5QixNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFDOUIsQ0FBQyxzQkFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ25DLE1BQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLE1BQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hDLE1BQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6QyxNQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUM7QUFDRCxJQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUFZakIsT0FBSSxDQUFDLEVBQUU7QUFDTCxNQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7QUFDRixVQUFPLENBQUMsQ0FBQztFQUNWOztBQUVELFVBQVMsZUFBZSxDQUFDLElBQUksRUFBRTtBQUM3QixXQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNqQztBQUNELFVBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUN4QixPQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztBQ3RFVCxLQUFJLFNBQVMsR0FBRzs7QUFFckIsWUFBUyxFQUFFO1lBQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFBQTs7QUFFeEYsWUFBUyxFQUFFO1lBQU0sUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUM7SUFBQTs7QUFFeEYsZ0JBQWEsRUFBRSwwQkFBRyxFQUFJO0FBQ3BCLFNBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0MsaUJBQVksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUNsQyxTQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU1QyxTQUFJO0FBQ0YsZ0JBQVMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDOztBQUVyQixnQkFBUyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0FBT2hDLGNBQU8sRUFBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQzdFLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJLEtBQy9DLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUUsQ0FBQztNQUNsRCxDQUFDLE9BQU8sQ0FBQyxFQUFFOztBQUVWLGNBQU8sSUFBSSxDQUFDO01BQ2I7SUFDRjtFQUNGLENBQUM7Ozs7Ozs7Ozs7Ozs7O3FDQzdCcUIsQ0FBWTs7QUFDNUIsVUFBUyxJQUFJLEdBQUc7QUFDdEIsMkJBQVUsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ0ZaLFVBQVMsUUFBUSxDQUFDLEVBQUUsRUFBRTtBQUNwQixPQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDbkMsT0FBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ2hDLFFBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLFFBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckIsTUFBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3RCLE1BQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDckI7O0FBQ00sVUFBUyxRQUFRLEdBQUc7QUFDekIsT0FBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25CLE9BQUksRUFBRSxHQUFHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxPQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsT0FBSSxTQUFTLEdBQUcsaUJBQWlCLENBQUM7O0FBRWxDLEtBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxFQUFFLEVBQUU7QUFDeEMsT0FBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakMsU0FBSSxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUU7O0FBRS9GLFNBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7TUFDeEMsTUFBTTtBQUNMLFNBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7TUFDckM7QUFDRCxTQUFJLEdBQUcsQ0FBQyxTQUFTLEtBQUssb0JBQW9CLEVBQUU7O0FBRTFDLFVBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO01BQ3hCO0lBQ0YsQ0FBQyxDQUFDO0FBQ0gsS0FBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLEVBQUUsRUFBRTtBQUN4QyxTQUFJLEVBQUUsQ0FBQyxTQUFTLEVBQUU7QUFDaEIsV0FBSSxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRTtBQUN0RixXQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sRUFBRSxDQUFDO01BQ1gsTUFBTTtBQUNMLFNBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLGlCQUFVLENBQUMsWUFBVzs7QUFFcEIsaUJBQVEsQ0FBQyxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDO01BQ1AsQ0FBQztJQUNILENBQUMsQ0FBQzs7QUFFSCxLQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQzFDLFNBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7QUFDdEYsU0FBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztNQUN4QyxDQUFDO0FBQ0YsU0FBSSxFQUFFLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtBQUMzQixTQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUN6QixlQUFRLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDN0M7SUFDRixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNDbERlLENBQWdCOzsyQ0FDakIsRUFBb0I7O3dDQUNuQixFQUFpQjs7NENBQ1MsQ0FBcUI7O3dDQUMvQyxFQUFpQjs7MkNBQ2hCLEVBQXNCOzttREFDZCxFQUE2Qjs7QUFFMUQsS0FBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQy9DLEtBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixLQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLEtBQUksUUFBUSxHQUFHO0FBQ2IsZ0JBQWEsRUFBRSx1QkFBUyxJQUFJLEVBQUU7QUFDNUIsZUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEM7QUFDRCxvQkFBaUIsRUFBRSwyQkFBUyxJQUFJLEVBQUU7QUFDaEMsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixlQUFVLEVBQUUsQ0FBQztJQUNkO0FBQ0QsZUFBWSxFQUFFLHNCQUFTLElBQUksRUFBRTtBQUMzQixrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCO0FBQ0QsY0FBVyxFQUFFLHFCQUFTLElBQUksRUFBRTtBQUMxQixrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCO0FBQ0QsZ0JBQWEsRUFBRSx1QkFBUyxJQUFJLEVBQUU7QUFDNUIsY0FBUyxZQUFZLEdBQUc7QUFDdEIsV0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7TUFDNUU7QUFDRCxrQkFBYSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUM7QUFDRCxVQUFPLEVBQUUsaUJBQVMsSUFBSSxFQUFFO0FBQ3RCLFlBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkI7QUFDRCxRQUFLLEVBQUUsZUFBUyxJQUFJLEVBQUU7QUFDcEIsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQjtFQUNGLENBQUM7O0FBQ0ssVUFBUyxPQUFPLEdBQUc7QUFDeEIsYUFBVSxFQUFFLENBQUM7QUFDYixXQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQy9DOztBQUVELFVBQVMsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDckMsT0FBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQywyQkFBTSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDMUIsVUFBTyxRQUFRLENBQUM7RUFDakI7O0FBRUQsVUFBUyxZQUFZLENBQUMsT0FBTyxFQUFFO0FBQzdCLFVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3BDO0FBQ0QsVUFBUywyQkFBMkIsQ0FBQyxFQUFFLEVBQUU7QUFDdkMsZUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLE9BQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQzNCLFlBQU87SUFDUixDQUFDO0FBQ0YsMEJBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDbkQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FDN0MsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDeEI7QUFDRCxVQUFTLFVBQVUsR0FBRztBQUNwQixPQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuRSxLQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFlBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxFQUFFLEVBQUU7QUFDN0Msa0NBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztNQUM1QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtBQUNELFVBQVMsVUFBVSxDQUFDLElBQUksRUFBTyxhQUFhLEVBQUUsUUFBUSxFQUFFO09BQXBDLElBQUksZ0JBQUosSUFBSSxHQUFHLEVBQUU7O0FBQzNCLE9BQUksTUFBTSxHQUFHLDJCQUFXLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkQsVUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN0Qjs7QUFFRCxLQUFJLGtCQUFrQixHQUFHLCtCQUFTLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqRSxVQUFTLGtCQUFrQixHQUFHO0FBQzVCLE9BQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RCxPQUFJLFNBQVMsR0FBRywrQkFBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFFBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoRCxhQUFVLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoQyxlQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLFlBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQ3pELGdDQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDO0VBQ047QUFDRCxVQUFTLFNBQVMsR0FBRztBQUNuQixPQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlDLE9BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxZQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxZQUFTLENBQUMsU0FBUyw4REFBOEQsQ0FBQztBQUNsRixZQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BFLHFDQUFZLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvQixVQUFPLFNBQVMsQ0FBQztFQUNsQjs7QUFFRCxVQUFTLFdBQVcsR0FBWTtPQUFYLElBQUkseURBQUcsRUFBRTs7QUFDNUIsT0FBSSxHQUFHLCtDQUM2QixJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksMk1BR2xCLElBQUksQ0FBQyxHQUFHLElBQUksVUFBVSxxREFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsMENBR3BFLENBQUM7QUFDRixVQUFPLEdBQUcsQ0FBQztFQUNaO0FBQ0QsVUFBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQzNCLE9BQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLE9BQU0sSUFBSSxHQUFHLFNBQVAsSUFBSSxDQUFHLElBQUk7dURBRVgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFJOzBEQUNYLFdBQVcsQ0FBQyxJQUFJLENBQUM7TUFDcEIsQ0FBQztJQUVMLENBQUM7QUFDRixPQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsT0FBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyxhQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzNDLGFBQVUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLHFDQUFZLFVBQVUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0VBQ3RDOztBQUVELFVBQVMsVUFBVSxHQUFHO0FBQ3BCLDBCQUFNLE9BQU8sQ0FBQyxDQUNiLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FDWixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQzNCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3hCOztBQUVELFVBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUNyQixPQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTs7Ozs7O0FBTTVDLFNBQUksTUFBTSxHQUFHLDRDQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxTQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7QUFDdEQsOEJBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQzlELEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQ3RCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3hCLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO0FBQzVELDhCQUFNLE9BQU8sQ0FBQyxDQUNiLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQ3JCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3hCO0lBQ0YsQ0FBQzs7QUFFRixPQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO0FBQ3RELDZCQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0FBQ0YsWUFBUyxTQUFTLENBQUMsRUFBRSxFQUFFO0FBQ3JCLFNBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO0FBQzdDLFNBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLGNBQU8sSUFBSSxDQUFDO01BQ2IsQ0FBQzs7QUFFRixTQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsNEJBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQ3hELENBQUMsTUFBTSxDQUFDLENBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQ2hDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0N0SXFCLENBQWE7O3NDQUNvQixDQUFhOztpQ0FDdkMsQ0FBUTs7QUFFaEMsVUFBUyxLQUFLLENBQUMsR0FBRyxFQUFFOztBQUV6QixPQUFJLElBQUksR0FBRzs7O0FBR1QsU0FBSSxFQUFFLGNBQVMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQU8sTUFBTSxFQUFFO1dBQW5CLElBQUksZ0JBQUosSUFBSSxHQUFHLEVBQUU7Ozs7O0FBSW5DLFdBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU0sRUFBRTs7O0FBR2xELGFBQUksTUFBTSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7O0FBRWxDLGFBQUksTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxPQUFPLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUN0RixlQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLHdCQUFRLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsaUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUV6QixpQkFBTSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVELGlCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ2xCLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO0FBQzNCLGVBQUksR0FBRyxHQUFHLDBCQUFVLG1CQUFtQixDQUFDLCtCQUFlLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkUsaUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDckMsaUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztVQUNmLENBQUM7O0FBRUYsZUFBTSxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3pCLGVBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7O0FBRTNDLG9CQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLE1BQU07O0FBRUwsbUJBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0I7VUFDRixDQUFDO0FBQ0YsZUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQzFCLGlCQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1VBQzNCLENBQUM7UUFDSCxDQUFDLENBQUM7OztBQUdILGNBQU8sT0FBTyxDQUFDO01BQ2hCO0lBQ0YsQ0FBQzs7O0FBR0YsVUFBTztBQUNMLFVBQUssRUFBRSxhQUFTLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDNUIsY0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO01BQzVDO0FBQ0QsV0FBTSxFQUFFLGNBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUM3QixjQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7TUFDN0M7QUFDRCxVQUFLLEVBQUUsYUFBUyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQzVCLGNBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztNQUM1QztBQUNELFlBQU8sRUFBRSxlQUFTLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDOUIsY0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO01BQzlDO0FBQ0QsYUFBUSxFQUFFLGlCQUFTLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDL0IsY0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO01BQy9DO0lBQ0YsQ0FBQztFQUNIOztBQUVELFVBQVMsbUJBQW1CLENBQUMsR0FBRyxFQUFFO0FBQ2hDLE9BQUksU0FBUyxHQUFHLGdCQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ2hDLE9BQUksU0FBUyxHQUFHLGdCQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ2hDLE9BQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNwQixhQUFVLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUN0QixhQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLFVBQU8seUJBQVMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0VBQ2xDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckdNLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDckMsT0FBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2IsUUFBSyxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7QUFDakIsU0FBSSxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3pCLFdBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztXQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsVUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLEdBQzNCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQ2Ysa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDeEQ7SUFDRjtBQUNELFVBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJoQixVQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDM0IsVUFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7RUFDdEM7O0FBQ00sVUFBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQzVCLFVBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDeEM7Ozs7QUFFTSxVQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQU8sSUFBSSxFQUFFO09BQWpCLElBQUksZ0JBQUosSUFBSSxHQUFHLEVBQUU7O0FBQ2hDLE9BQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzlDLFFBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO0FBQ3BCLFNBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM1QixhQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ3pCO0lBQ0Y7QUFDRCxVQUFPLE1BQU0sQ0FBQztFQUNmOztBQUNNLFVBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUU7QUFDMUMsT0FBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUN4QixPQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDbkIsU0FBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzNCLGFBQU0sQ0FBQyxFQUFFLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO01BQ2xEO0lBQ0Y7QUFDRCxVQUFPLE1BQU0sQ0FBQztFQUNmOztBQUNNLFVBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDcEMsT0FBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEdBQUcsQ0FBQztBQUN6QixPQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsU0FBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUNuQixTQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDM0IsYUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNqQztJQUNGO0FBQ0QsVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFFTSxVQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7QUFDNUIsT0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxTQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUN2QixPQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25DLFVBQU8sU0FBUyxDQUFDO0VBQ2xCOzs7Ozs7Ozs7QUFPTSxVQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFO0FBQ2xELGdCQUFhLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0VBQzNFOzs7Ozs7Ozs7Ozs7OztBQWFNLFVBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQzlDLE9BQUksT0FBTyxDQUFDO0FBQ1osVUFBTyxZQUFXO0FBQ2hCLFNBQUksT0FBTyxHQUFHLElBQUk7U0FBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO0FBQ3JDLFNBQUksS0FBSyxHQUFHLFNBQVIsS0FBSyxHQUFjO0FBQ3JCLGNBQU8sR0FBRyxJQUFJLENBQUM7QUFDZixXQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO01BQzNDLENBQUM7QUFDRixTQUFJLE9BQU8sR0FBRyxTQUFTLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDcEMsaUJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0QixZQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxTQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0VBQ0g7O0FBQUEsRTs7Ozs7Ozs7Ozs7Ozt1Q0M5RXdCLEVBQWM7O0FBQ2hDLFVBQVMsSUFBSSxDQUFDLGVBQWUsRUFBYTs7O0FBRy9DLE9BQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUM7O0FBRTlCLE9BQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7cUNBTHVCLE1BQU07QUFBTixXQUFNOzs7QUFPN0MsU0FBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxDQUFDLEVBQUs7OztBQUczQixTQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7O0FBS2pCLFNBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QixZQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztNQUN4Qjs7OztBQUlELFNBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNyQixZQUFLLEdBQUcsNEJBQVcsS0FBSyxDQUFDLENBQUM7QUFDMUIsVUFBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDeEI7QUFDRCxXQUFNLElBQUksR0FBRyxDQUFDO0FBQ2QsV0FBTSxJQUFJLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUM7Ozs7QUFJSCxTQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7O0FBRTlCLFVBQU8sTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2xDVCxVQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7QUFDL0IsTUFBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDZCxVQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztJQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUNyQixPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUN0QixPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozt5Q0NQTSxFQUFnQjs7QUFDbkQsVUFBUyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDMUMsT0FBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM3QyxXQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN0QyxXQUFRLENBQUMsU0FBUyxHQUFHLGdCQUFnQixFQUFFLENBQUM7QUFDeEMsbUJBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9CLGtCQUFlLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDaEQsV0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMscUNBQWUsQ0FBQztFQUNqQjs7QUFFRCxVQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUM5QixPQUFJLEdBQUcsc1dBVVAsQ0FBQztBQUNELFVBQU8sR0FBRyxDQUFDO0VBQ1o7O0FBRUQsVUFBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQ2xELE1BQUcsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDcEYsTUFBRyxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDN0g7O0FBRUQsVUFBUyxPQUFPLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQzFDLFdBQVEsRUFBRSxDQUFDO0FBQ1gsV0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDaEM7O0FBRUQsVUFBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsV0FBVyxFQUFFO0FBQzFDLE1BQUcsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGNBQWMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztFQUM3STs7QUFFRCxVQUFTLFVBQVUsQ0FBQyxFQUFFLEVBQUU7QUFDdEIsT0FBSSxFQUFFLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUU7QUFDbEMsYUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLHNDQUFjLENBQUM7SUFDaEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxQ0gsS0FBSSxJQUFJLEdBQUcsRUFBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUM7O0FBRXhDLFVBQVMsY0FBYyxDQUFDLENBQUMsRUFBRTtBQUN6QixJQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDdEIsT0FBSSxDQUFDLENBQUMsY0FBYyxFQUNoQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdkIsSUFBQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7RUFDdkI7O0FBRUQsVUFBUywyQkFBMkIsQ0FBQyxDQUFDLEVBQUU7QUFDdEMsT0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ25CLG1CQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsWUFBTyxLQUFLLENBQUM7SUFDZDtFQUNGOztBQUVNLFVBQVMsYUFBYSxHQUFHO0FBQzlCLE9BQUksTUFBTSxDQUFDLGdCQUFnQjtBQUN2QixXQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JFLFNBQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0FBQ2hDLFNBQU0sQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUM7QUFDN0QsU0FBTSxDQUFDLFdBQVcsR0FBSSxjQUFjLENBQUM7QUFDckMsV0FBUSxDQUFDLFNBQVMsR0FBSSwyQkFBMkIsQ0FBQztFQUNuRDs7QUFFTSxVQUFTLFlBQVksR0FBRztBQUM3QixPQUFJLE1BQU0sQ0FBQyxtQkFBbUIsRUFDMUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4RSxTQUFNLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0FBQ25ELFNBQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLFNBQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFdBQVEsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztzQ0NqQ1EsQ0FBYTs7QUFDMUMsVUFBUyxLQUFLLENBQUMsSUFBSSxFQUE0QjtPQUExQixRQUFRLHlEQUFHLFlBQVcsRUFBRTs7QUFDbEQsT0FBSSxRQUFRLEdBQUcseUJBQVMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDeEMsV0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsYUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUMxRDs7QUFFRCxVQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDdEIsT0FBSSxHQUFHLHVDQUNtQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxTQUFTLHlDQUNsQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLDRCQUVsRCxDQUFHO0FBQ0gsVUFBTyxHQUFHLENBQUM7RUFDWjs7QUFFRCxVQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFO0FBQzlCLE1BQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBVztBQUM5QyxhQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7QUFDSCxNQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixXQUFRLEVBQUUsQ0FBQzs7Ozs7Ozs7OztBQ2xCYixhQUFZLENBQUM7Ozs7OztpQ0FDTSxFQUFROzt3Q0FDUCxFQUFpQjs7c0NBQzBCLEVBQWE7O0FBRTVFLFVBQVMsU0FBUyxDQUFDLElBQUksRUFBb0I7T0FBbEIsUUFBUSx5REFBRyxLQUFLOztBQUN2QyxPQUFJLEdBQUcsaXNCQWV1QyxXQUFXLENBQUMsUUFBUSxDQUFDLDRCQUF1QixZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxZQUFNLFFBQVEsR0FBRyxRQUFRLEdBQUcsTUFBTSxxbkJBYTdJLENBQUM7QUFDWixVQUFPLEdBQUcsQ0FBQztFQUNaOztBQUVELEtBQUksY0FBYyxHQUFHLCtCQUErQixHQUMvQiwwREFBMEQsR0FDMUQsNkJBQTZCLEdBQzdCLDhEQUE4RCxHQUM5RCw2QkFBNkIsR0FDN0Isb0VBQW9FLEdBQ3BFLDRCQUE0QixDQUFDOztBQUVsRCxLQUFJLFdBQVcsR0FBRztBQUNoQixRQUFLLEVBQUUsQ0FBQztBQUNSLFNBQU0sRUFBRSxDQUFDO0FBQ1QsT0FBSSxFQUFFLENBQUM7QUFDUCxNQUFHLEVBQUUsQ0FBQztBQUNOLFFBQUssRUFBRSxDQUFDO0FBQ1IsU0FBTSxFQUFFLENBQUM7RUFDVixDQUFDO0FBQ0YsS0FBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLEtBQUksYUFBYSxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUM7O0FBRXpDLFVBQVMsV0FBVyxDQUFDLFFBQVEsRUFBRTtBQUM3QixVQUFPLFFBQVEsR0FBRyxNQUFNLEdBQUcsT0FBTyxDQUFDO0VBQ3BDO0FBQ0QsVUFBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxVQUFPLFFBQVEsR0FBRyxFQUFFLFNBQU8sSUFBSSxDQUFDLEVBQUksQ0FBQztFQUN0QztBQUNELFVBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDcEMsT0FBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5QyxZQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztBQUMzQyxZQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxRQUFRLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDL0MsWUFBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELFlBQVMsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ2hGLFVBQU8sU0FBUyxDQUFDO0VBQ2xCOztBQUVNLFVBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFO0FBQ3BELE9BQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDOztBQUVsQyxPQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7O0FBRTVELE9BQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckUsT0FBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7O0FBRTFCLE9BQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOztBQUVuQixPQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEUsT0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7O0FBRTVELE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUU3RSxPQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7O0FBRW5CLE9BQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFdEIsT0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7O0FBRXhCLE9BQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0VBQ3pCOztBQUVELE9BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDbkQsT0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDMUIsT0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztFQUM1QixDQUFDO0FBQ0YsT0FBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDekMsT0FBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QyxPQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixPQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDOUIsT0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7RUFFbEMsQ0FBQztBQUNGLE9BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsWUFBVzs7O0FBQy9DLE9BQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixPQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRXRDLE9BQUksUUFBUSxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLE9BQUksT0FBTyxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLE9BQUksUUFBUSxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLE9BQUksVUFBVSxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUU3RSxPQUFJLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RSxPQUFJLENBQUMsYUFBYSxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLE9BQUksY0FBYyxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckYsT0FBSSxZQUFZLEdBQUcsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWpGLE9BQUksQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRTVFLFdBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxFQUFFLEVBQUUsRUFDL0MsQ0FBQyxDQUFDOztBQUVILFdBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBRSxFQUFJO0FBQ3ZDLHlCQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFLLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUMsQ0FBQzs7QUFFSCxXQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUUsRUFBSTtBQUN2QyxXQUFLLFFBQVEsQ0FBQyxNQUFLLGFBQWEsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQzs7QUFFSCxPQUFJLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFFLEVBQUk7QUFDakQsV0FBSyxRQUFRLENBQUMsNkJBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDLENBQUM7O0FBRUgsaUJBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBRSxFQUFJO0FBQzdDLFdBQUssUUFBUSxDQUFDLCtCQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQyxDQUFDOztBQUVILGVBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBRSxFQUFJO0FBQzNDLFdBQUssUUFBUSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDO0VBRUosQ0FBQzs7QUFFRixPQUFNLENBQUMsU0FBUyxDQUFDLG9CQUFvQixHQUFHLFlBQVc7QUFDakQsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLE9BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsVUFBTyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUN6QyxVQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUMxQixVQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQzNDLFNBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ3BCLFNBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNsQixTQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbEIsU0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFckUsU0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLFNBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixTQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUN6QixDQUFDLENBQUM7QUFDTCxPQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFOUQsT0FBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM3QyxVQUFPLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0FBQ3pDLFVBQU8sQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQzFCLFVBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxFQUFFLEVBQUU7Ozs7SUFJNUMsQ0FBQyxDQUFDO0FBQ0wsT0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7RUFFL0QsQ0FBQzs7QUFFRixPQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxZQUFXO0FBQ3hDLE9BQUksQ0FBQyxPQUFPLEdBQUcsZUFBUyxDQUFDLENBQUMsQ0FBQztBQUMzQixPQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWhELE9BQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDOztBQUU1QixVQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7RUFDckIsQ0FBQzs7QUFFRixPQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUN2QyxPQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRCxPQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDN0QsT0FBSSxTQUFTLEdBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOztBQUV4SCxPQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVELE9BQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLE9BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRSxPQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWhDLFVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUxQixPQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLE9BQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsT0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0VBRWxDLENBQUM7QUFDRixPQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQ2xELE9BQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDekYsT0FBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNwQyxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLFNBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDbkQsV0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDekM7SUFDRixDQUFDO0VBQ0gsQ0FBQztBQUNGLFVBQVMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO0FBQ2xDLE9BQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsT0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsV0FBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztBQUNGLFVBQU8sTUFBTSxDQUFDO0VBQ2Y7O0FBRUQsT0FBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxZQUFXOzs7QUFDN0MsT0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxRCxPQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzlCLE9BQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxPQUFJLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxZQUFTLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQUcsRUFBSTtBQUN6QyxZQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUM7O0FBRUgsT0FBSSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsZUFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxhQUFHLEVBQUk7QUFDNUMsWUFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0VBRUosQ0FBQztBQUNGLE9BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDaEQsT0FBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN0RixPQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xELE9BQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN2RCxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdDLFNBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDcEMsV0FBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO0FBQ2hCLGVBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ2xFLE1BQU07QUFDTCxlQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM5RCxDQUFDO0FBQ0YsYUFBTTtNQUNQLENBQUM7SUFDSCxDQUFDO0VBQ0gsQ0FBQztBQUNGLE9BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQ3hDLE9BQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ3BCLE9BQUksVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUM3RCxPQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDOzs7QUFHaEUsT0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFdEUsT0FBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLE9BQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWpFLE9BQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN4QixRQUFLLElBQUksT0FBTyxJQUFJLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDMUMsU0FBSyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUssYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDckcscUJBQWMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUMzRCxDQUFDO0lBQ0g7O0FBRUQsT0FBSSxpQkFBaUIsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDOztBQUU5QyxnQkFBYSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7O0FBRTFCLGdCQUFhLENBQUMsTUFBTSxHQUFHLGlCQUFpQixLQUFLLENBQUMsR0FDckIsYUFBYSxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxJQUFJLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxHQUN2RSxhQUFhLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzVILE9BQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUM1RixPQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztBQUN4QixPQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLFVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFCLE9BQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsT0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBRW5DLENBQUM7O0FBRUYsVUFBUyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFDakUsT0FBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqRCxjQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMxQyxjQUFXLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsRCxjQUFXLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNsRCxjQUFXLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNsRCxjQUFXLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxHQUFHLGVBQWUsR0FBRyxTQUFTLENBQUMsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQ3ZLLGNBQVcsQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO0FBQ3ZDLFVBQU8sV0FBVyxDQUFDO0VBQ3BCO0FBQ0QsVUFBUyxVQUFVLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQzFELE9BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2hELFVBQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM5RSxVQUFPLE9BQU8sQ0FBQztFQUNoQjtBQUNELE9BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVMsUUFBUSxFQUFFO0FBQy9DLE9BQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdEYsT0FBSSxPQUFPO09BQUUsT0FBTztPQUFFLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRXJDLE9BQUksU0FBUyxHQUFHLEVBQUU7T0FBRSxNQUFNO09BQUUsTUFBTSxDQUFDOztBQUVuQyxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN0QyxjQUFTLEdBQUcsOEJBQWMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsWUFBTyxHQUFHLENBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFNLENBQUM7O0FBRXJDLFVBQUssSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO0FBQ2hDLFdBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxFQUFFO0FBQzVCLGdCQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0QyxDQUFDO01BQ0g7QUFDRCxjQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7QUFFRixRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RFLFdBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUN2Rzs7QUFFRCxPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMxQyxPQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7RUFDaEIsQ0FBQztBQUNGLE9BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQzFDLE9BQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ3BCLE9BQUksU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztBQUM3RCxPQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDNUQsWUFBUyxHQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsR0FBSSxDQUFDLEdBQUcsU0FBUyxDQUFDO0FBQy9DLE9BQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDckUsT0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hFLE9BQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQyxnQkFBYSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7QUFDaEUsZ0JBQWEsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDO0FBQzNCLE9BQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUMzRixPQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLE9BQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7RUFFdEIsQ0FBQzs7O0FBR0YsVUFBUyxZQUFZLENBQUMsR0FBRyxFQUFFO0FBQ3pCLFVBQU87QUFDTCxRQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUc7QUFDWixXQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07QUFDbEIsU0FBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO0FBQ2QsVUFBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO0FBQ2hCLFVBQUssRUFBRSxHQUFHLENBQUMsS0FBSztBQUNoQixXQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07SUFDbkIsQ0FBQztFQUNIOzs7QUFHRCxPQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxZQUFXO0FBQ3JDLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEUsVUFBTyxHQUFHLENBQUMsU0FBUyxFQUFFO0FBQ3BCLFFBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDO0VBQ0YsQ0FBQzs7Ozs7QUFLRixPQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3BDLE9BQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoQixPQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsT0FBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE9BQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUM1QixTQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO0FBQ3hCLGtCQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUcsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUUsQ0FBQyxDQUFDO01BQ3pKLENBQUM7SUFDSCxDQUFDO0FBQ0YsT0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWxDLE9BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2hELFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzNDLFlBQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckM7QUFDRCxPQUFJLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUU5RSxDQUFDOztBQUVGLE9BQU0sQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFVBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFOztBQUV4RSxPQUFJLEtBQUssR0FBRyw0QkFBNEIsQ0FBQztBQUN6QyxPQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN0RCxPQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDdEIsT0FBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0FBQ3JDLE9BQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLFFBQUssR0FBRyxLQUFLLENBQUM7QUFDZCxhQUFVLEdBQUcsVUFBVSxDQUFDOztBQUV4QixLQUFFLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNoQixLQUFFLEdBQUcsVUFBVSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDekIsS0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDYixLQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ1IsTUFBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDZCxNQUFHLEdBQUksRUFBRSxHQUFJLEtBQUssR0FBRyxDQUFDLEdBQUksRUFBRyxDQUFDO0FBQzlCLEtBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2IsS0FBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVyQixVQUFPLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQ25ELEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FDdEIsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDdkQsVUFBTyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUMsVUFBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRXRDLFVBQU8sT0FBTyxDQUFDO0VBQ2hCLENBQUM7OztBQUdGLE9BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLFlBQVc7QUFDM0MsT0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQzdDLE9BQUksT0FBTztPQUFFLFdBQVc7T0FBRSxPQUFPLEdBQUcsRUFBRTtPQUFFLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDckQsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEQsWUFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLENBQUM7QUFDRixVQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLGNBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7QUFDL0MsT0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ3RELE9BQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUMxRCxPQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzNDLFVBQU8sQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7RUFFL0IsQ0FBQzs7OztBQUlGLE9BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxHQUFHLFVBQVMsRUFBRSxFQUFFO0FBQzdDLE9BQUksWUFBWSxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQzlDLE9BQUksV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLEVBQUUsQ0FBQztBQUN4RCxPQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqRCxPQUFJLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuRCxvQkFBaUIsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4RCxvQkFBaUIsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzRCxvQkFBaUIsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxRCxvQkFBaUIsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzRCxVQUFPLGlCQUFpQixDQUFDO0VBQzFCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDaGJtQixFQUFTOztBQUN0QixVQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDekIsT0FBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsT0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7RUFDbkI7O0FBRUQsVUFBUyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ3BCLE9BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLE9BQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ25CLE9BQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVuQixPQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztBQUN2QixPQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNoQixPQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0VBQzVCOztBQUVELEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFVBQVMsUUFBUSxFQUFFOzs7QUFHN0MsSUFBQyxTQUFTLE9BQU8sQ0FBQyxXQUFXLEVBQUU7O0FBRTdCLFVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztBQUVyRSxjQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ2xDOzs7QUFHRCxhQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7OztJQUd2QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUVoQixDQUFDOzs7QUFHRixVQUFTLGtCQUFrQixDQUFDLElBQUksRUFBRTtBQUNoQyxPQUFJLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUM1QixRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0Msd0JBQW1CLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDdkQsQ0FBQztBQUNGLFVBQU8sbUJBQW1CLENBQUM7RUFDNUI7QUFDRCxLQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFlBQVc7QUFDNUMsT0FBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQVksSUFBSSxFQUFFO0FBQzVCLFNBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3RSxTQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDOztBQUVGLE9BQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7RUFDM0IsQ0FBQzs7QUFFRixVQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFO0FBQzNCLE9BQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkMsT0FBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxXQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUNoQyxDQUFDO0FBQ0YsVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFFRCxLQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixHQUFHLFlBQVc7QUFDaEQsT0FBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLE9BQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUM1QixTQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZixXQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQ3RHLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRSxFQUVoQyxDQUFDO0lBQ0gsQ0FBQzs7QUFFRixPQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBRTNCLENBQUM7O0FBRUYsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBUyxRQUFRLEVBQUU7QUFDN0MsT0FBSSxLQUFLLEdBQUcsa0JBQVcsQ0FBQzs7QUFFeEIsUUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7O0FBRTFCLE9BQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFbEMsVUFBTyxXQUFXLEVBQUU7QUFDbEIsVUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckUsWUFBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDeEM7O0FBRUQsYUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3RCLGdCQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CO0VBQ0YsQ0FBQzs7QUFFRixLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxVQUFTLFFBQVEsRUFBRSxTQUFTLEVBQUU7QUFDdEQsWUFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDaEMsQ0FBQzs7QUFFRixLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxVQUFTLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFO0FBQ3JELE9BQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztPQUN0QixNQUFNLEdBQUcsSUFBSTtPQUNYLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBWSxJQUFJLEVBQUU7QUFDeEIsU0FBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtBQUMxQixhQUFNLEdBQUcsSUFBSSxDQUFDO01BQ2Y7SUFDRixDQUFDOztBQUVSLE9BQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDOztBQUVuQyxPQUFJLE1BQU0sRUFBRTtBQUNWLFdBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVCLFVBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLE1BQU07QUFDTCxXQUFNLElBQUksS0FBSyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7SUFDOUQ7O0FBRUQsT0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDekIsT0FBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7RUFDOUIsQ0FBQzs7QUFFRixLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFTLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFO0FBQzFELE9BQUksSUFBSSxHQUFHLElBQUk7T0FDWCxNQUFNLEdBQUcsSUFBSTtPQUNiLGFBQWEsR0FBRyxJQUFJO09BQ3BCLEtBQUssQ0FBQzs7QUFFVixPQUFJLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBWSxJQUFJLEVBQUU7QUFDNUIsU0FBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUM1QixhQUFNLEdBQUcsSUFBSSxDQUFDO01BQ2Y7SUFDRixDQUFDOztBQUVGLE9BQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDOztBQUVuQyxPQUFJLE1BQU0sRUFBRTtBQUNWLFVBQUssR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFekMsU0FBSSxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQ3ZCLGFBQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztNQUNuRCxNQUFNO0FBQ0wsb0JBQWEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7TUFDbEQ7SUFDRixNQUFNO0FBQ0wsV0FBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzNDOztBQUVELE9BQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3pCLE9BQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDOztBQUU3QixVQUFPLGFBQWEsQ0FBQztFQUN0QixDQUFDOztBQUVGLFVBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDNUIsT0FBSSxLQUFLLENBQUM7O0FBRVYsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsU0FBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtBQUMxQixZQUFLLEdBQUcsQ0FBQyxDQUFDO01BQ1g7SUFDRjs7QUFFRCxVQUFPLEtBQUssQ0FBQztFQUNkOzs7O0FBSUQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsR0FBRyxVQUFTLFFBQVEsRUFBRTtBQUN0RCxPQUFJLEtBQUssR0FBRyxrQkFBVztPQUN2QixNQUFNLEdBQUcsSUFBSTtPQUNYLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBWSxJQUFJLEVBQUU7QUFDeEIsU0FBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUM1QixhQUFNLEdBQUcsSUFBSSxDQUFDO01BQ2Y7SUFDRixDQUFDOztBQUVKLE9BQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFekMsVUFBTyxNQUFNLEVBQUU7QUFDYixVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRSxZQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNuQztBQUNELGFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQixXQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2Y7QUFDRCxVQUFPLEtBQUssQ0FBQztFQUNkLENBQUM7QUFDRixLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxZQUFXO0FBQ3JDLE9BQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixPQUFJLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBWSxJQUFJLEVBQUU7QUFDNUIsYUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsQ0FBQztBQUNGLE9BQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTFCLFVBQU8sUUFBUSxDQUFDO0VBQ2pCLENBQUM7Ozs7Ozs7QUFPRixLQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLFVBQVMsUUFBUSxFQUFFO0FBQ3RELE9BQUksS0FBSyxHQUFHLGtCQUFXO09BQ25CLE1BQU0sR0FBRyxJQUFJO09BQ1gsUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUN4QixTQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQzVCLGFBQU0sR0FBRyxJQUFJLENBQUM7TUFDZjtJQUNGLENBQUM7O0FBRVIsT0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUV6QyxRQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV0QixPQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDbEMsT0FBSSxjQUFjLEdBQUcsRUFBRSxDQUFDOztBQUV4QixVQUFPLFdBQVcsRUFBRTtBQUNsQixtQkFBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqQyxVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyRSxZQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN4Qzs7QUFFRCxnQkFBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMvQjs7QUFFRCxVQUFPLGNBQWMsQ0FBQztFQUN2QixDQUFDOztBQUVGLEtBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFlBQVc7QUFDcEMsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLE9BQUksYUFBYSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRCxPQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsT0FBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLFFBQUssSUFBSSxHQUFHLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtBQUN0QyxTQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzlDLGtCQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLGtCQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDbEUsaUJBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUNyRCxDQUFDO0lBQ0g7O0FBRUQsWUFBUyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUU7QUFDbEMsU0FBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLFVBQUssSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtBQUNsQyxXQUFLLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUM3Rix1QkFBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELENBQUM7TUFDSDtBQUNELFlBQU8sY0FBYyxDQUFDO0lBQ3ZCOztBQUVELE9BQUksZUFBZSxHQUFHLEVBQUUsQ0FBQzs7QUFFekIsWUFBUyxXQUFXLENBQUMsR0FBRyxFQUFFO0FBQ3hCLFNBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELFNBQUksaUJBQWlCLEdBQUcsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRSxZQUFPLGlCQUFpQixDQUFDO0lBQzFCOztBQUVELE9BQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixPQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLFlBQVMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO0FBQzlCLFNBQUksb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0FBQzlCLFVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLFdBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQywyQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7TUFDNUQsQ0FBQztBQUNGLFNBQUksb0JBQW9CLENBQUMsTUFBTSxFQUFFO0FBQy9CLGNBQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUMsd0JBQWlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztNQUN6QyxDQUFDO0lBQ0g7O0FBRUQsSUFBQyxTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7O0FBRXJCLFVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLGNBQU8sR0FBRyxFQUFFLENBQUM7O0FBRWIsc0JBQWUsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdEMsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixXQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFDMUIsZ0JBQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLDBCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7QUFDRixrQkFBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztNQUMzQixDQUFDO0lBQ0gsRUFBRSxVQUFVLENBQUMsQ0FBQzs7QUFFZixVQUFPLFdBQVcsQ0FBQztFQUNwQixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2U00sVUFBUyxLQUFLLEdBQUc7QUFDdEIsT0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsT0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsT0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7RUFDcEI7O0FBRUQsTUFBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUNoQyxVQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztFQUM5QyxDQUFDOztBQUVGLE1BQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQ3ZDLE9BQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN4QyxPQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7RUFDckIsQ0FBQzs7QUFFRixNQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ25DLE9BQUksV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZO09BQy9CLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWTtPQUMvQixXQUFXLENBQUM7O0FBRWhCLE9BQUksV0FBVyxLQUFLLFdBQVcsRUFBRTtBQUMvQixnQkFBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekMsWUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xDLFNBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7QUFFcEIsWUFBTyxXQUFXLENBQUM7SUFDcEI7RUFDRixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDTSxVQUFTLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDdEMsVUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDdkM7O0FBRU0sVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN4QyxVQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMxRDs7QUFFTSxVQUFTLGFBQWEsR0FBRztBQUM5QixPQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtPQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDeEQsU0FBTSxHQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUksVUFBVSxHQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBSSxRQUFRLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdk4sVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFFTSxVQUFTLFlBQVksQ0FBQyxFQUFFLEVBQUU7QUFDL0IsT0FBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3hGLE9BQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsMktBQTJLLENBQUMsQ0FBQzs7QUFFM00sT0FBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixPQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbEQsVUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixVQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVCOzs7Ozs7Ozs7Ozs7OztBQWNNLFVBQVMsYUFBYSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxVQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hHOztBQUVNLFVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUNqQyxPQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLE9BQU87QUFDckMsT0FBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO09BQzdCLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztBQUMvRSxPQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDaEQsT0FBSSxHQUFHLEVBQUUsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25ELE1BQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDMUMsVUFBTyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEQ7O0FBRUQsVUFBUyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUM5QixPQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixRQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUNqQixTQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekIsV0FBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1dBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxVQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsR0FDNUIsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FDZixrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN4RDtJQUNGO0FBQ0QsVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3RCOzs7Ozs7Ozs7QUFTTSxVQUFTLFlBQVksQ0FBQyxLQUFLLEVBQUU7QUFDbEMsVUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkM7Ozs7Ozs7O0FBT00sVUFBUyxjQUFjLENBQUMsSUFBSSxFQUFFO0FBQ25DLE9BQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUMsT0FBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRSxVQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0dBQXdHLEVBQUUsVUFBUyxLQUFLLEVBQUU7QUFDNUksU0FBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25CLFNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNwQixXQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDcEIsWUFBRyxHQUFHLEtBQUssQ0FBQztRQUNiLE1BQU07QUFDTCxZQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ2hCO01BQ0YsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbkMsVUFBRyxHQUFHLFNBQVMsQ0FBQztNQUNqQixNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3QixVQUFHLEdBQUcsTUFBTSxDQUFDO01BQ2Q7QUFDRCxZQUFPLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDekQsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs0Q0NqR2tCLENBQXFCOztBQUNyQyxVQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUU7QUFDcEMsT0FBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQyxPQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUQsT0FBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlELFVBQU8sK0JBQVMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0VBQzdEOztBQUVELFVBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUM1QixPQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsV0FBUSxHQUFHO0FBQ1QsY0FBUyxFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ2pFLFVBQUssRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUN6RCxhQUFRLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDL0Qsa0JBQWEsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0lBQzFFLENBQUM7O0FBRUYsVUFBTyxRQUFRLENBQUM7RUFDakI7O0FBRUQsVUFBUyxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQzdCLE9BQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLE9BQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixPQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsT0FBSSxRQUFRLGFBQUM7QUFDYixRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdELGFBQVEsR0FBRyxFQUFFLENBQUM7QUFDZCxhQUFRLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzdDLGFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDMUMsYUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3JFLGFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN6RSxhQUFRLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDL0UsZ0JBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUIsQ0FBQztBQUNGLGNBQVcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvQyxVQUFPLFdBQVcsQ0FBQyIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWY5MDI1NWNkZWM1ODYxM2M5OWZcbiAqKi8iLCJpbXBvcnQge2RhdGFMaW5rc30gZnJvbSAnLi9tb2R1bGVzL2RhdGFMaW5rcyc7XG5pbXBvcnQge2hvbWV9IGZyb20gJy4vbW9kdWxlcy9ob21lcGFnZSc7XG5cbmltcG9ydCB7aW5pdFhocn0gZnJvbSAnLi9tb2R1bGVzL2FwaU9wZXJhdGlvbic7XG5kYXRhTGlua3MoKTtcbi8vIGFwaVRyZWUoKTtcbi8vIHZhciBwID0gbmV3IGRhd25TVkcoKTtcbi8vIHAuaW5pdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFpbnRlci10YXJnZXQnKSk7XG4vLyBwLnN0YXJ0KCk7XG5cbigoKSA9PiB7XG4gIGxldCByb3V0ZXMgPSB7XG4gICAgJy8nOiBob21lLFxuICAgICcvZGV2JzogW2luaXRYaHJdXG4gIH07XG4gIGxldCBwYXRoTmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgaWYgKHJvdXRlcy5oYXNPd25Qcm9wZXJ0eShwYXRoTmFtZSkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJvdXRlc1twYXRoTmFtZV0pID09PSAnW29iamVjdCBBcnJheV0nICYmXG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXNbcGF0aE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdXRlc1twYXRoTmFtZV1baV0uYXBwbHkobnVsbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0uYXBwbHkobnVsbCk7XG4gICAgfVxuICB9XG5cbn0pKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qc1xuICoqLyIsImltcG9ydCB7aGFuZGxlTWV0aG9kfSBmcm9tICcuLi9jb21tb24vaGFuZGxlTWV0aG9kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFMaW5rcygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzRGF0YUxpbmssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NEYXRhTGluayhlKSB7XG4gIHZhciBlID0gd2luZG93LmUgfHwgZTtcblxuICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKVxuICAgICAgcmV0dXJuO1xuXG4gIC8vIERvIHNvbWV0aGluZ1xuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdkZWxldGUnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgLy8gaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAncGF0Y2gnKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCwge1xuICAvLyAgICAgbnM6ICdhcGknLFxuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBzZWN0aW9uOiAnd2lzZScsXG4gIC8vICAgICAgIGlkOiAnMidcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qc1xuICoqLyIsImltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi4vY29tbW9uL2NzcmYnO1xuLyoqXG4gKiBbaGFuZGxlTWV0aG9kIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGxpbmsgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEhhbmRsZXMgXCJkYXRhLW1ldGhvZFwiIG9uIGxpbmtzIHN1Y2ggYXM6XG4gKiA8YSBocmVmPVwiL3VzZXJzLzVcIiBkYXRhLW1ldGhvZD1cImRlbGV0ZVwiIHJlbD1cIm5vZm9sbG93XCIgZGF0YS1jb25maXJtPVwiQXJlIHlvdSBzdXJlP1wiPkRlbGV0ZTwvYT5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1ldGhvZChsaW5rLCBvYmogPSB7fSkge1xuICB2YXIgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgbWV0aG9kID0gbGluay5kYXRhc2V0Lm1ldGhvZCxcbiAgICB0YXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGFyZ2V0JyksXG4gICAgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpLFxuICAgIGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgdmFyIHBhcmFtc09iaiA9IHtcbiAgICBocmVmOiBocmVmLFxuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIHRhcmdldDogdGFyZ2V0LFxuICAgIGNzcmZUb2tlbjogY3NyZlRva2VuLFxuICAgIGNzcmZQYXJhbTogY3NyZlBhcmFtXG4gIH07XG4gIHZhciBmb3JtRWxlID0gY3JlYXRlRm9ybShwYXJhbXNPYmosIG9iaik7XG4gIGFwcGVuZEZvcm1Ub0RvbShmb3JtRWxlKTtcbiAgc3VibWl0Rm9ybShmb3JtRWxlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGFyYW1zLCBvYmopIHtcbiAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZi5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsJ3Bvc3QnKTtcbiAgZi5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicscGFyYW1zLmhyZWYpO1xuICBpZiAocGFyYW1zLnRhcmdldCkge1xuICAgIGYuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBwYXJhbXMudGFyZ2V0KTtcbiAgfTtcblxuICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGkuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIGkuc2V0QXR0cmlidXRlKCduYW1lJywnX21ldGhvZCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5tZXRob2QpO1xuXG4gIHZhciBzO1xuICBpZiAocGFyYW1zLmNzcmZQYXJhbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwYXJhbXMuY3NyZlRva2VuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICFSUHMuaXNDcm9zc0RvbWFpbihwYXJhbXMuaHJlZikpIHtcbiAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAgIHMuc2V0QXR0cmlidXRlKCduYW1lJywgcGFyYW1zLmNzcmZQYXJhbSk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMuY3NyZlRva2VuKTtcbiAgfVxuICBmLmFwcGVuZENoaWxkKGkpO1xuXG4gIC8vIGZvciAobGV0IGtleSBpbiBvYmouZGF0YSkge1xuICAvLyAgIGlmIChvYmouZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gIC8vICAgICBsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCcnICsgb2JqLm5zICsgJ1snICsga2V5ICsgJ10nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsb2JqLmRhdGFba2V5XSk7XG4gIC8vICAgICBmLmFwcGVuZENoaWxkKHQpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGlmIChzKSB7XG4gICAgZi5hcHBlbmRDaGlsZChzKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZvcm1Ub0RvbShmb3JtKSB7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG59XG5mdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm0pIHtcbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9oYW5kbGVNZXRob2QuanNcbiAqKi8iLCJleHBvcnQgbGV0IHJvclBhcmFtcyA9IHtcbiAgLy8gVXAtdG8tZGF0ZSBDcm9zcy1TaXRlIFJlcXVlc3QgRm9yZ2VyeSB0b2tlblxuICBjc3JmVG9rZW46ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBVUkwgcGFyYW0gdGhhdCBtdXN0IGNvbnRhaW4gdGhlIENTUkYgdG9rZW5cbiAgY3NyZlBhcmFtOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi1wYXJhbV0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgcmVxdWVzdCBpcyBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LlxuICBpc0Nyb3NzRG9tYWluOiB1cmwgPT4ge1xuICAgIGxldCBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgb3JpZ2luQW5jaG9yLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuICAgIGxldCB1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICB0cnkge1xuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmw7XG4gICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCB0byBhIElFIGJ1Zy5cbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cbiAgICAgIC8vIElmIFVSTCBwcm90b2NvbCBpcyBmYWxzZSBvciBpcyBhIHN0cmluZyBjb250YWluaW5nIGEgc2luZ2xlIGNvbG9uXG4gICAgICAvLyAqYW5kKiBob3N0IGFyZSBmYWxzZSwgYXNzdW1lIGl0IGlzIG5vdCBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0XG4gICAgICAvLyAoc2hvdWxkIG9ubHkgYmUgdGhlIGNhc2UgZm9yIElFNyBhbmQgSUUgY29tcGF0aWJpbGl0eSBtb2RlKS5cbiAgICAgIC8vIE90aGVyd2lzZSwgZXZhbHVhdGUgcHJvdG9jb2wgYW5kIGhvc3Qgb2YgdGhlIFVSTCBhZ2FpbnN0IHRoZSBvcmlnaW5cbiAgICAgIC8vIHByb3RvY29sIGFuZCBob3N0LlxuICAgICAgcmV0dXJuICEoKCghdXJsQW5jaG9yLnByb3RvY29sIHx8IHVybEFuY2hvci5wcm90b2NvbCA9PT0gJzonKSAmJiAhdXJsQW5jaG9yLmhvc3QpIHx8XG4gICAgICAgIChvcmlnaW5BbmNob3IucHJvdG9jb2wgKyAnLy8nICsgb3JpZ2luQW5jaG9yLmhvc3QgPT09XG4gICAgICAgICAgdXJsQW5jaG9yLnByb3RvY29sICsgJy8vJyArIHVybEFuY2hvci5ob3N0KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY3NyZi5qc1xuICoqLyIsImltcG9ydCB7dHdlZXRCb3h9IGZyb20gJy4vdHdlZXRCb3gnO1xuZXhwb3J0IGZ1bmN0aW9uIGhvbWUoKSB7XG5cdHR3ZWV0Qm94KCk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9ob21lcGFnZS5qc1xuICoqLyIsImZ1bmN0aW9uIHNldEZvY3VzKGVsKSB7XG4gIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gIHJhbmdlLnNldFN0YXJ0KGVsLCAwKTtcbiAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0d2VldEJveCgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50O1xuICB2YXIgdGIgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHdlZXQtYm94JylbMF07XG4gIHZhciB0YmQgPSB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XG4gIHZhciB0YmRTdHJpbmcgPSAnPGRpdj48YnI+PC9kaXY+JztcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnY29uZGVuc2VkJyk7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0uaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGgpIHtcblxuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5hZGQoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAodGJkLmlubmVySFRNTCA9PT0gJ1doYXRcXCdzIGhhcHBlbmluZz8nKSB7XG5cbiAgICAgIHRiZC5pbm5lckhUTUwgPSAnPGJyPic7XG4gICAgfVxuICB9KTtcbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5pbm5lckhUTUwpIHtcbiAgICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgICAgfSBlbHNlIHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG5cbiAgICAgIH0sIDApO1xuICAgIH07XG4gIH0pO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9O1xuICAgIGlmICh0Yi5pbm5lckhUTUwgPT09ICc8YnI+Jykge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL3R3ZWV0Qm94LmpzXG4gKiovIiwiaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xuaW1wb3J0IHtodG1sfSBmcm9tICcuLi9jb21tb24vdGVtcGxhdGUnO1xuaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmltcG9ydCB7aW5zZXJ0QWZ0ZXIsIHN0clRvRG9tLCBkZWJvdW5jZX0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5pbXBvcnQge2ZsYXNofSBmcm9tICcuLi9jb21tb24vZmxhc2gnO1xuaW1wb3J0IHtBcGlEb219IGZyb20gJy4uL2FwaS10cmVlL3RyZWUtZG9tJztcbmltcG9ydCB7Y29sbGVjdEFwaURhdGF9IGZyb20gJy4uL2FwaS10cmVlL3RyZWVEYXRhQ29sbGVjdCc7XG5cbmxldCByb290QVBJID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpcyc7XG5sZXQgcGF5bG9hZCA9IHt9O1xubGV0IGFwaXNBcnIgPSBbXTtcblxudmFyIGNhbGxiYWNrID0ge1xuICBnZXRBcGlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgYWRkQXBpVHJlZShKU09OLnBhcnNlKGRhdGEpLCB0aGlzKTtcbiAgfSxcbiAgZ2V0QWxsQXBpc1N1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZW5kZXJBbGxBcGlzKGRhdGEpO1xuICAgIGJpbmRldmVudHMoKTtcbiAgfSxcbiAgcGF0Y2hTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgcG9zdFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfVxufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0WGhyKCkge1xuICBnZXRBbGxBcGlzKCk7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZEV2ZW50KTtcbn1cblxuZnVuY3Rpb24gcGFyc2VBbmRGbGFzaChkYXRhLCBjYWxsYmFjaykge1xuICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBmbGFzaChqc29uRGF0YSwgY2FsbGJhY2spO1xuICByZXR1cm4ganNvbkRhdGE7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUZvbGRMaShjb250ZXh0KSB7XG4gIGNvbnRleHQuY2xhc3NMaXN0LnRvZ2dsZSgndW5mb2xkJyk7XG59XG5mdW5jdGlvbiBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24oZXYpIHtcbiAgdG9nZ2xlRm9sZExpKHRoaXMpO1xuICBpZiAodGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICByZXR1cm47XG4gIH07XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLnBhcmVudE5vZGUuZGF0YXNldC5hcGlJZClcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5nZXRBcGlTdWNjZXNzLmJpbmQodGhpcy5wYXJlbnROb2RlKSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGJpbmRldmVudHMoKSB7XG4gIGxldCBhcGlMaXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbGktZGVzY3JpcHRpb24nKTtcbiAgW10uc2xpY2UuY2FsbChhcGlMaXMpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRBcGlUcmVlKGRhdGEgPSB7fSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgbGV0IG5ld0FwaSA9IG5ldyBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpO1xuICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcbn1cblxubGV0IGRlYm91bmNlZE5ld0FwaUJ0biA9IGRlYm91bmNlKHByb2Nlc3NOZXdBcGlDbGljaywgNTAwLCB0cnVlKTtcbmZ1bmN0aW9uIHByb2Nlc3NOZXdBcGlDbGljaygpIHtcbiAgbGV0IGFwaVVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVsJylbMF07XG4gIGxldCBiYXNlQXBpTGkgPSBzdHJUb0RvbShuZXdBcGlMaVRwbCgpKTtcbiAgYXBpVWwuaW5zZXJ0QmVmb3JlKGJhc2VBcGlMaSwgYXBpVWwuZmlyc3RDaGlsZCk7XG4gIGFkZEFwaVRyZWUoe30sIGJhc2VBcGlMaSwgdHJ1ZSk7XG4gIHRvZ2dsZUZvbGRMaShiYXNlQXBpTGkuY2hpbGRyZW5bMF0pO1xuICBiYXNlQXBpTGkuY2hpbGRyZW5bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbmV3QXBpQnRuKCkge1xuICBsZXQgbmV3QXBpRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZGVyJylbMF07XG4gIG5ld0FwaURpdi5jbGFzc0xpc3QuYWRkKCduZXctYXBpJyk7XG4gIG5ld0FwaURpdi5pbm5lckhUTUwgPSBgPGlucHV0IGNsYXNzPVwiYWRkLWFwaS1idG5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJuZXcgQVBJXCI+YDtcbiAgbmV3QXBpRGl2LmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGVib3VuY2VkTmV3QXBpQnRuKTtcbiAgaW5zZXJ0QWZ0ZXIobmV3QXBpRGl2LCBoZWFkZXIpO1xuICByZXR1cm4gbmV3QXBpRGl2O1xufVxuXG5mdW5jdGlvbiBuZXdBcGlMaVRwbChkYXRhID0ge30pIHtcbiAgdmFyIHRwbCA9IGBcbiAgICA8bGkgY2xhc3M9XCJhcGktbGlcIiBkYXRhLWFwaS1pZD1cIiR7ZGF0YS5pZCB8fCBudWxsfVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1saS1kZXNjcmlwdGlvblwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1jb2xsYXBzZVwiPjxzdmcgY2xhc3M9XCJpY29uIGljb24tZG93blwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLWRvd25cIj48L3VzZT48L3N2Zz48L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLXVyaVwiPiR7ZGF0YS51cmkgfHwgJyhObyB1cmkpJ308L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLW5hbWVcIj4ke2RhdGEubmFtZSA/IGRhdGEubmFtZSA6ICcoTm8gbmFtZSknfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIGA7XG4gIHJldHVybiB0cGw7XG59XG5mdW5jdGlvbiByZW5kZXJBbGxBcGlzKGRhdGEpIHtcbiAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGNvbnN0IHRtcGwgPSBkYXRhID0+IGh0bWxgXG4gICAgICA8dWwgY2xhc3M9XCJhcGktdWxcIj5cbiAgICAgICR7ZGF0YS5tYXAoaXRlbSA9PiBodG1sYFxuICAgICAgICAke25ld0FwaUxpVHBsKGl0ZW0pfVxuICAgICAgYCl9XG4gICAgICA8L3VsPlxuICBgO1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWRlcicpWzBdO1xuICBsZXQgYXBpTGlzdEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhcGlMaXN0RWxlLmNsYXNzTGlzdC5hZGQoJ2FwaS11bC13cmFwcGVyJyk7XG4gIGFwaUxpc3RFbGUuaW5uZXJIVE1MID0gdG1wbChkYXRhKTtcbiAgaW5zZXJ0QWZ0ZXIoYXBpTGlzdEVsZSwgbmV3QXBpQnRuKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxBcGlzKCkge1xuICAkaHR0cChyb290QVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFsbEFwaXNTdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBiaW5kRXZlbnQoZXYpIHtcbiAgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1zYXZlJykpIHtcbiAgICAvLyBsZXQgcGFyYW1zID0ge1xuICAgIC8vICAgJ3NlY3Rpb24nOiBldi50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VjdGlvbicpWzBdLnZhbHVlLFxuICAgIC8vICAgJ3VyaSc6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSxcbiAgICAvLyAgICdtZXRob2QnOiBldi50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF0udmFsdWVcbiAgICAvLyB9O1xuICAgIGxldCBwYXJhbXMgPSBjb2xsZWN0QXBpRGF0YShldi50YXJnZXQpO1xuICAgIGlmIChldi50YXJnZXQuZGF0YXNldC5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BBVENIJykge1xuICAgICAgJGh0dHAocm9vdEFQSSArICcvJyArIGV2LnRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpLmRhdGFzZXQuaWQpXG4gICAgICAucGF0Y2gocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnBhdGNoU3VjY2VzcylcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfSBlbHNlIGlmIChldi50YXJnZXQuZGF0YXNldC5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnKSB7XG4gICAgICAkaHR0cChyb290QVBJKVxuICAgICAgLnBvc3QocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnBvc3RTdWNjZXNzKVxuICAgICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlbC1kYXRhcm9vdC1jaGlsZCcpKSB7XG4gICAgcG9wdXAoZXYsIHt9LCBkZWxldGVBcGkuYmluZCh0aGlzLCBldikpO1xuICB9O1xuICBmdW5jdGlvbiBkZWxldGVBcGkoZXYpIHtcbiAgICBpZiAoIWV2LnRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpLmRhdGFzZXQuaWQpIHtcbiAgICAgIGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQoZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgbGV0IHBhcmFtcyA9IHt9O1xuICAgICRodHRwKHJvb3RBUEkgKyAnLycgKyBldi50YXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKS5kYXRhc2V0LmlkKVxuICAgIC5kZWxldGUocGFyYW1zKVxuICAgIC50aGVuKGNhbGxiYWNrLmRlbGV0ZVN1Y2Nlc3MuYmluZChldikpXG4gICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2FwaU9wZXJhdGlvbi5qc1xuICoqLyIsIi8qKlxuLy8gQi0+IEhlcmUgeW91IGRlZmluZSBpdHMgZnVuY3Rpb25zIGFuZCBpdHMgcGF5bG9hZFxudmFyIG1kbkFQSSA9ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9zZWFyY2guanNvbic7XG52YXIgcGF5bG9hZCA9IHtcbiAgJ3RvcGljJyA6ICdqcycsXG4gICdxJyAgICAgOiAnUHJvbWlzZSdcbn07XG52YXIgY2FsbGJhY2sgPSB7XG4gIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMSwgJ3N1Y2Nlc3MnLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfSxcbiAgZXJyb3IgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG4vLyBFbmQgQlxuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgxKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MsIGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgyKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC50aGVuKHVuZGVmaW5lZCwgY2FsbGJhY2suZXJyb3IpO1xuICovXG5cbi8vIEEtPiAkaHR0cCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBpbiBvcmRlciB0byBmb2xsb3cgdGhlIHN0YW5kYXJkIEFkYXB0ZXIgcGF0dGVyblxuaW1wb3J0IHtzZXJpYWxpemV9IGZyb20gJy4vc2VyaWFsaXplJztcbmltcG9ydCB7aXNFbXB0eSwgbWVyZ2VPYmosIGFkZFByZWZpeFRvT2JqLCB3cmFwT2JqfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQge3JvclBhcmFtcyBhcyBSUHN9IGZyb20gJy4vY3NyZic7XG5cbmV4cG9ydCBmdW5jdGlvbiAkaHR0cCh1cmwpIHtcbiAgLy8gQSBzbWFsbCBleGFtcGxlIG9mIG9iamVjdFxuICB2YXIgY29yZSA9IHtcblxuICAgIC8vIE1ldGhvZCB0aGF0IHBlcmZvcm1zIHRoZSBhamF4IHJlcXVlc3RcbiAgICBhamF4OiBmdW5jdGlvbihtZXRob2QsIHVybCwgYXJncyA9IHt9LCBwcmVmaXgpIHtcbiAgICAgIC8vIGZvciBSYWlsc1xuICAgICAgLy8gdXJsID0gdXJsICsgJy5qc29uJztcbiAgICAgIC8vIENyZWF0aW5nIGEgcHJvbWlzZVxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgdGhlIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICBpZiAobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJyB8fCBtZXRob2QgPT09ICdQQVRDSCcgfHwgbWV0aG9kID09PSAnREVMRVRFJykge1xuICAgICAgICAgIGxldCB1cmkgPSBKU09OLnN0cmluZ2lmeShleHRlbmRHZW5lcmFsUGFyYW1zKHdyYXBPYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsKTtcbiAgICAgICAgICAvLyBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xuICAgICAgICAgIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIGNsaWVudC5zZW5kKHVyaSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICAgIGxldCB1cmkgPSBzZXJpYWxpemUoZXh0ZW5kR2VuZXJhbFBhcmFtcyhhZGRQcmVmaXhUb09iaihhcmdzLCBwcmVmaXgpKSk7XG4gICAgICAgICAgY2xpZW50Lm9wZW4obWV0aG9kLCB1cmwgKyAnPycgKyB1cmkpO1xuICAgICAgICAgIGNsaWVudC5zZW5kKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY2xpZW50Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlc29sdmVcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGVxdWFsIHRvIDJ4eFxuICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnJlc3BvbnNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVqZWN0XCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBkaWZmZXJlbnQgdGhhbiAyeHhcbiAgICAgICAgICAgIHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjbGllbnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy8gUmV0dXJuIHRoZSBwcm9taXNlXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQWRhcHRlciBwYXR0ZXJuXG4gIHJldHVybiB7XG4gICAgJ2dldCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnR0VUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3Bvc3QnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BPU1QnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncHV0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQVVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncGF0Y2gnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BBVENIJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnREVMRVRFJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kR2VuZXJhbFBhcmFtcyhvYmopIHtcbiAgbGV0IGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgbGV0IGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKTtcbiAgbGV0IGdlbmVyYWxPYmogPSB7fTtcbiAgZ2VuZXJhbE9iai51dGY4ID0gJ+Kckyc7XG4gIGdlbmVyYWxPYmpbY3NyZlBhcmFtXSA9IGNzcmZUb2tlbjtcbiAgcmV0dXJuIG1lcmdlT2JqKG9iaiwgZ2VuZXJhbE9iaik7XG59XG4vLyBFbmQgQVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qc1xuICoqLyIsIi8qKlxuICogW3NlcmlhbGl6ZSBjb252ZXJ0cyByZWN1cnNpdmUgb2JqZWN0c11cbiAqIEBwYXJhbSAge1t0eXBlXX0gb2JqICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcHJlZml4IFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIGNvbnNvbGUubG9nKHNlcmlhbGl6ZSh7Zm9vOiBcImhpIHRoZXJlXCIsIGJhcjogeyBibGFoOiAxMjMsIHF1dXg6IFsxLCAyLCAzXSB9fSkpO1xuICogZm9vPWhpJTIwdGhlcmUmYmFyJTVCYmxhaCU1RD0xMjMmYmFyJTVCcXV1eCU1RCU1QjAlNUQ9MSZiYXIlNUJxdXV4JTVEJTVCMSU1RD0yJmJhciU1QnF1dXglNUQlNUIyJTVEPTNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2VyaWFsaXplLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZU9iaihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG4vKiBjb25zaWRlciBPYmplY3QuYXNzaWduKHRhcmdldCwgLi4uc291cmNlcykgKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9iaihvYmoxID0ge30sIG9iajIpIHtcbiAgbGV0IG5ld09iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqMSkpO1xuICBmb3IgKGxldCBrZXkgaW4gb2JqMikge1xuICAgIGlmIChvYmoyLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG5ld09ialtrZXldID0gb2JqMltrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZFByZWZpeFRvT2JqKG9iaiwgcHJlZml4KSB7XG4gIGlmICghcHJlZml4KSByZXR1cm4gb2JqO1xuICBsZXQgbmV3T2JqID0ge307XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG5ld09ialsnJyArIHByZWZpeCArICdbJyArIGtleSArICddJ10gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwT2JqKG9iaiwgd3JhcHBlcikge1xuICBpZiAoIXdyYXBwZXIpIHJldHVybiBvYmo7XG4gIHZhciBuZXdPYmogPSB7fTtcbiAgbmV3T2JqW3dyYXBwZXJdID0ge307XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG5ld09ialt3cmFwcGVyXVtrZXldID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJUb0RvbShzdHIpIHtcbiAgbGV0IHRtcEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0bXBFbGUuaW5uZXJIVE1MID0gc3RyO1xuICBsZXQgcmV0dXJuRG9tID0gdG1wRWxlLmNoaWxkcmVuWzBdO1xuICByZXR1cm4gcmV0dXJuRG9tO1xufVxuLyoqXG4gKiBbaW5zZXJ0QWZ0ZXIgZGVzY3JpcHRpb246IEFjY29yZGluZyB0byBNRE4gaWYgdGhlIGVsZW1lbnQgaXMgbGFzdCAoYW5kIHNvIG5leHRTaWJsaW5nIGlzIG51bGwpIHRoZSBuZXdOb2RlIHdpbGwgYmUgYXBwZW5kZWQgYXMgZXhwZWN0ZWRdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG5ld05vZGUgICAgICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSByZWZlcmVuY2VOb2RlIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3VuZGVmaW5lZH0gICAgICAgICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRBZnRlcihuZXdOb2RlLCByZWZlcmVuY2VOb2RlKSB7XG4gIHJlZmVyZW5jZU5vZGUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZS5uZXh0U2libGluZyk7XG59XG5cbi8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3Rcbi8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcbi8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuLy8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cbi8qXG52YXIgbXlFZmZpY2llbnRGbiA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAvLyBBbGwgdGhlIHRheGluZyBzdHVmZiB5b3UgZG9cbn0sIDI1MCk7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBteUVmZmljaWVudEZuKTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICB2YXIgdGltZW91dDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcbiAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICB9O1xufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdXRpbGl0aWVzLmpzXG4gKiovIiwiaW1wb3J0IHtodG1sRXNjYXBlfSBmcm9tICcuL2h0bWxFc2NhcGUnO1xuZXhwb3J0IGZ1bmN0aW9uIGh0bWwobGl0ZXJhbFNlY3Rpb25zLCAuLi5zdWJzdHMpIHtcbiAgLy8gVXNlIHJhdyBsaXRlcmFsIHNlY3Rpb25zOiB3ZSBkb27igJl0IHdhbnRcbiAgLy8gYmFja3NsYXNoZXMgKFxcbiBldGMuKSB0byBiZSBpbnRlcnByZXRlZFxuICBsZXQgcmF3ID0gbGl0ZXJhbFNlY3Rpb25zLnJhdztcblxuICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgc3Vic3RzLmZvckVhY2goKHN1YnN0LCBpKSA9PiB7XG4gICAgLy8gUmV0cmlldmUgdGhlIGxpdGVyYWwgc2VjdGlvbiBwcmVjZWRpbmdcbiAgICAvLyB0aGUgY3VycmVudCBzdWJzdGl0dXRpb25cbiAgICBsZXQgbGl0ID0gcmF3W2ldO1xuXG4gICAgLy8gSW4gdGhlIGV4YW1wbGUsIG1hcCgpIHJldHVybnMgYW4gYXJyYXk6XG4gICAgLy8gSWYgc3Vic3RpdHV0aW9uIGlzIGFuIGFycmF5IChhbmQgbm90IGEgc3RyaW5nKSxcbiAgICAvLyB3ZSB0dXJuIGl0IGludG8gYSBzdHJpbmdcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzdWJzdCkpIHtcbiAgICAgIHN1YnN0ID0gc3Vic3Quam9pbignJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIHN1YnN0aXR1dGlvbiBpcyBwcmVjZWRlZCBieSBhIGRvbGxhciBzaWduLFxuICAgIC8vIHdlIGVzY2FwZSBzcGVjaWFsIGNoYXJhY3RlcnMgaW4gaXRcbiAgICBpZiAobGl0LmVuZHNXaXRoKCckJykpIHtcbiAgICAgIHN1YnN0ID0gaHRtbEVzY2FwZShzdWJzdCk7XG4gICAgICBsaXQgPSBsaXQuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgICByZXN1bHQgKz0gbGl0O1xuICAgIHJlc3VsdCArPSBzdWJzdDtcbiAgfSk7XG4gIC8vIFRha2UgY2FyZSBvZiBsYXN0IGxpdGVyYWwgc2VjdGlvblxuICAvLyAoTmV2ZXIgZmFpbHMsIGJlY2F1c2UgYW4gZW1wdHkgdGVtcGxhdGUgc3RyaW5nXG4gIC8vIHByb2R1Y2VzIG9uZSBsaXRlcmFsIHNlY3Rpb24sIGFuIGVtcHR5IHN0cmluZylcbiAgcmVzdWx0ICs9IHJhd1tyYXcubGVuZ3RoIC0gMV07IC8vIChBKVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdGVtcGxhdGUuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gaHRtbEVzY2FwZShzdHIpIHtcblx0c3RyID0gJycgKyBzdHI7IC8vIGZvciBudW1iZXJzIGV0Yy5cbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mL2csICcmYW1wOycpIC8vIGZpcnN0IVxuICAgICAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLzwvZywgJyZsdDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgJyYjMzk7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9gL2csICcmIzk2OycpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2h0bWxFc2NhcGUuanNcbiAqKi8iLCJpbXBvcnQge2Rpc2FibGVTY3JvbGwsIGVuYWJsZVNjcm9sbH0gZnJvbSAnLi90b2dnbGVTY3JvbGwnO1xuZXhwb3J0IGZ1bmN0aW9uIHBvcHVwKGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGxldCBwb3B1cEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwb3B1cEVsZS5jbGFzc0xpc3QuYWRkKCdwb3B1cC1sYXllcicpO1xuICBwb3B1cEVsZS5pbm5lckhUTUwgPSBnZW5lcmF0ZVBvcHVwVHBsKCk7XG4gIHBvc2l0aW9uUG9wdXBFbGUocG9wdXBFbGUsIGV2KTtcbiAgYmluZFBvcHVwRXZlbnRzKHBvcHVwRWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXBFbGUpO1xuICBkaXNhYmxlU2Nyb2xsKCk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlUG9wdXBUcGwoZGF0YSkge1xuICBsZXQgdHBsID0gYFxuICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1zaGFkb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3B1cC1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC10ZXh0XCI+QXJlIHlvdSBzdXJlIHRvIGRlbGV0ZSB0aGlzIEFQST88L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBvcHVwLWJ0bnNcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jYW5jZWwtYnRuXCI+Y2FuY2VsPC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicG9wdXAtYnRuIHBvcHVwLWNvbmZpcm0tYnRuXCI+Y29uZmlybTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxuZnVuY3Rpb24gYmluZFBvcHVwRXZlbnRzKGVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLXNoYWRvdycpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Qb3B1cEVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5wYWdlWCArICdweCwgJyArIGNvb3JkaW5hdGVzLnBhZ2VZICsgJ3B4LCAwKSc7XG59XG5cbmZ1bmN0aW9uIGNsb3NlUG9wdXAoZXYpIHtcbiAgaWYgKGV2LnRhcmdldCA9PT0gZXYuY3VycmVudFRhcmdldCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5wYXJlbnROb2RlKTtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzXG4gKiovIiwiLy8gbGVmdDogMzcsIHVwOiAzOCwgcmlnaHQ6IDM5LCBkb3duOiA0MCxcbi8vIHNwYWNlYmFyOiAzMiwgcGFnZXVwOiAzMywgcGFnZWRvd246IDM0LCBlbmQ6IDM1LCBob21lOiAzNlxudmFyIGtleXMgPSB7Mzc6IDEsIDM4OiAxLCAzOTogMSwgNDA6IDF9O1xuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdChlKSB7XG4gIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcbiAgaWYgKGUucHJldmVudERlZmF1bHQpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzKGUpIHtcbiAgaWYgKGtleXNbZS5rZXlDb2RlXSkge1xuICAgIHByZXZlbnREZWZhdWx0KGUpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSAvLyBvbGRlciBGRlxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ud2hlZWwgPSBwcmV2ZW50RGVmYXVsdDsgLy8gbW9kZXJuIHN0YW5kYXJkXG4gIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBwcmV2ZW50RGVmYXVsdDsgLy8gb2xkZXIgYnJvd3NlcnMsIElFXG4gIHdpbmRvdy5vbnRvdWNobW92ZSAgPSBwcmV2ZW50RGVmYXVsdDsgLy8gbW9iaWxlXG4gIGRvY3VtZW50Lm9ua2V5ZG93biAgPSBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcilcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbm1vdXNld2hlZWwgPSBkb2N1bWVudC5vbm1vdXNld2hlZWwgPSBudWxsO1xuICB3aW5kb3cub253aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbnRvdWNobW92ZSA9IG51bGw7XG4gIGRvY3VtZW50Lm9ua2V5ZG93biA9IG51bGw7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzXG4gKiovIiwiaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb219IGZyb20gJy4vdXRpbGl0aWVzJztcbmV4cG9ydCBmdW5jdGlvbiBmbGFzaChkYXRhLCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge30pIHtcbiAgbGV0IGZsYXNoRWxlID0gc3RyVG9Eb20oZmxhc2hUcGwoZGF0YSkpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZsYXNoRWxlKTtcbiAgc2V0VGltZW91dChkZXN0b3J5LmJpbmQobnVsbCwgZmxhc2hFbGUsIGNhbGxiYWNrKSwgMjAwMCk7XG59XG5cbmZ1bmN0aW9uIGZsYXNoVHBsKGRhdGEpIHtcbiAgbGV0IHN0ciA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiZmxhc2gtbGF5ZXIgJHtkYXRhLmVycm9yID8gJ2Vycm9yJyA6ICdzdWNjZXNzJ31cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+JHtkYXRhLmVycm9yIHx8IGRhdGEubWVzc2FnZX08L2Rpdj5cblx0XHQ8L2Rpdj5cblx0YCAgO1xuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBkZXN0b3J5KGVsZSwgY2FsbGJhY2spIHtcbiAgZWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uKCkge1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgfSk7XG4gIGVsZS5jbGFzc0xpc3QuYWRkKCdibGluaycpO1xuICBjYWxsYmFjaygpO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanNcbiAqKi8iLCIvKipcbiAqIHdpZHRoIG9mIHNpbmdsZSBzdmcgcGF0aDogMzBweFxuICovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQge1RyZWV9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGVYLCB4aHIsIGJlYXV0aWZ5SlNPTiwgaGlnaHRsaWdodEpTT059IGZyb20gJy4vdXRpbGl0aWVzJztcblxuZnVuY3Rpb24gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpID0gZmFsc2UpIHtcbiAgbGV0IHRwbCA9XG4gICAgICBgPGRpdiBjbGFzcz1cImFwaS1pbmZvXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+QVBJOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXVyaVwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJcIiAvPiBcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5tZXRob2Q6PC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiYXBpLW1ldGhvZFwiPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiR0VUXCIgc2VsZWN0ZWQ+R0VUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQT1NUXCI+UE9TVDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUEFUQ0hcIj5QQVRDSDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiREVMRVRFXCI+REVMRVRFPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPGxhYmVsPnNlY3Rpb246PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktc2VjdGlvblwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICA8bGFiZWwgZm9yPVwiXCI+ZGVzY3JpcHRpb246PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktZGVzY3JpcHRpb25cIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktc2F2ZVwiIGRhdGEtbWV0aG9kPVwiJHtwYXRjaE9yUG9zdChpc05ld0FwaSl9XCIgZGF0YS1hY3Rpb249XCIvYXBpcyR7c2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKX1cIiA+JHtpc05ld0FwaSA/ICdjcmVhdGUnIDogJ3NhdmUnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS10ZXN0XCI+dGVzdDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLXdyYXBwZXJcIj48ZGl2IGNsYXNzPVwiYXBpLXRyZWUtZnJhbWVcIj48c3ZnIGNsYXNzPVwiYXBpLXN2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48L3N2Zz48L2Rpdj48ZGl2IGNsYXNzPVwiYXBpLXRyZWVcIj48L2Rpdj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktZGF0YVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhLXZpZXdzLWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhLXJhd1wiPnJhdzwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhLWJlYXV0aWZ5XCI+YmVhdXRpZnk8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1oaWdobGlnaHRcIj5zeW50YXhIaWdobGlnaHQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1wcmV2aWV3XCI+cHJldmlldzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3IGpzb25cIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIHJldHVybiB0cGw7XG59XG5cbnZhciBsZWFmQ29udGVudFRwbCA9ICc8aSBjbGFzcz1cInJlbW92ZS1jaGlsZFwiPi08L2k+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLWtleVwiIHBsYWNlaG9sZGVyPVwia2V5XCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi12YWx1ZVwiIHBsYWNlaG9sZGVyPVwidmFsdWVcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXF1YW50aXR5XCIgcGxhY2Vob2xkZXI9XCJxdWFudGl0eVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJhZGQtY2hpbGRcIj4rPC9pPic7XG5cbnZhciBpbml0UmVjdE9iaiA9IHtcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgbGVmdDogMCxcbiAgdG9wOiAwLFxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwXG59O1xudmFyIHBlclNWR1BhdGhXaWR0aCA9IDMwO1xudmFyIHJvb3ROb2RlV2lkdGggPSBwZXJTVkdQYXRoV2lkdGggKyAxNTtcblxuZnVuY3Rpb24gcGF0Y2hPclBvc3QoaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJ1BPU1QnIDogJ1BBVENIJztcbn1cbmZ1bmN0aW9uIHNhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnJyA6IGAvJHtkYXRhLmlkfWA7XG59XG5mdW5jdGlvbiBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpIHtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5kYXRhc2V0LmlkID0gaXNOZXdBcGkgPyAnJyA6IGRhdGEuaWQ7XG4gIHBlckFwaUVsZS5pbm5lckhUTUwgPSBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkpO1xuICBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlID0gaXNOZXdBcGkgPyAnJyA6IGRhdGEudXJpO1xuICByZXR1cm4gcGVyQXBpRWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBpRG9tKGRhdGEsIGNvbnRhaW5lck5vZGUsIGlzTmV3QXBpKSB7XG4gIHRoaXMuYXBpQ29udGFpbmVyID0gY29udGFpbmVyTm9kZTtcblxuICB0aGlzLmFwaUNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpKTtcblxuICB0aGlzLmFwaUVsZSA9IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Blci1hcGknKVswXTtcbiAgXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDQVBJKCk7XG5cbiAgdGhpcy5sZWFmSW5kZXggPSAxO1xuXG4gIHRoaXMuJGFwaVRyZWUgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYoMCwgMSwgMCwgaW5pdFJlY3RPYmopKTtcblxuICB0aGlzLiRhcGlUcmVlRnJhbWUgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1mcmFtZScpWzBdO1xuXG4gIHRoaXMuaW5pdEFwaVRyZWUoKTtcblxuICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG5cbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNFKCk7XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmpzb25WaWV3ID0gZnVuY3Rpb24oZGF0YSkge1xuICB2YXIgJHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAkcHJlLmlubmVySFRNTCA9IGRhdGE7XG4gIHRoaXMuJGRhdGFWaWV3LmlubmVySFRNTCA9ICcnO1xuICB0aGlzLiRkYXRhVmlldy5hcHBlbmRDaGlsZCgkcHJlKTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDQVBJID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG5ld2x5Q3JlYXRlZEFwaU5vZGUgPSB0aGlzLmFwaUVsZTtcblxuICB2YXIgJGFwaVNhdmUgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zYXZlJylbMF07XG4gIHZhciAkYXBpVXJpID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF07XG4gIHZhciAkYXBpVGVzdCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRlc3QnKVswXTtcbiAgdmFyICRhcGlNZXRob2QgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tZXRob2QnKVswXTtcblxuICB2YXIgJGRhdGFSYXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtcmF3JylbMF07XG4gIHRoaXMuJGRhdGFCZWF1dGlmeSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1iZWF1dGlmeScpWzBdO1xuICB2YXIgJGRhdGFIaWdobGlnaHQgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtaGlnaGxpZ2h0JylbMF07XG4gIHZhciAkZGF0YVByZXZpZXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtcHJldmlldycpWzBdO1xuXG4gIHRoaXMuJGRhdGFWaWV3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXZpZXcnKVswXTtcblxuICAkYXBpU2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gIH0pO1xuXG4gICRhcGlUZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHhocigkYXBpTWV0aG9kLnZhbHVlLCAkYXBpVXJpLnZhbHVlLCB0aGlzLnN0b3JlQXBpUmV0dXJuRGF0YS5iaW5kKHRoYXQpKTtcbiAgfSk7XG5cbiAgJGRhdGFSYXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldyh0aGlzLmFwaVJldHVybkRhdGEpO1xuICB9KTtcblxuICB0aGlzLiRkYXRhQmVhdXRpZnkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldyhiZWF1dGlmeUpTT04oSlNPTi5wYXJzZSh0aGlzLmFwaVJldHVybkRhdGEpKSk7XG4gIH0pO1xuXG4gICRkYXRhSGlnaGxpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoaGlnaHRsaWdodEpTT04oSlNPTi5wYXJzZSh0aGlzLmFwaVJldHVybkRhdGEpKSk7XG4gIH0pO1xuXG4gICRkYXRhUHJldmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KCdUaGlzIGZlYXR1cmUgaGFzIG5vdCBiZWVuIGFjY29tcGxpc2hlZCB5ZXQuJyk7XG4gIH0pO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLm9wZXJhdGVEYXRhUm9vdENoaWxkID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIGFkZE1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGFkZE1hcmsuY2xhc3NOYW1lID0gJ2FkZC1kYXRhcm9vdC1jaGlsZCc7XG4gIGFkZE1hcmsudGV4dENvbnRlbnQgPSAnKyc7XG4gIGFkZE1hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgdGhhdC5sZWFmSW5kZXggKz0gMTtcbiAgICAgIHZhciBwYXJlbnRJZHggPSAwO1xuICAgICAgdmFyIG5vZGVMZXZlbCA9IDA7XG4gICAgICB0aGF0LmFwaVRyZWUuYWRkKHRoYXQubGVhZkluZGV4LCBwYXJlbnRJZHgsIHRoYXQuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICAgICAgdGhhdC4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkeCwgdGhhdC5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgaW5pdFJlY3RPYmopKTtcbiAgICAgIHZhciBvYmogPSB0aGF0LmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICAgICAgdGhhdC5zdHlsZU5vZGVzKG9iaik7XG4gICAgICB0aGF0LmJpbmRFdmVudHNUb01SQ0UoKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoYWRkTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxuICB2YXIgZGVsTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZGVsTWFyay5jbGFzc05hbWUgPSAnZGVsLWRhdGFyb290LWNoaWxkJztcbiAgZGVsTWFyay50ZXh0Q29udGVudCA9ICctJztcbiAgZGVsTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAvKiB0aGlzIEFQSSBpcyBkZWxldGVkLiAqL1xuXG4gICAgICAvLyB0aGF0LmFwaUNvbnRhaW5lci5yZW1vdmVDaGlsZChldi5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykpO1xuICAgIH0pO1xuICB0aGlzLiRhcGlUcmVlLmluc2VydEJlZm9yZShkZWxNYXJrLCB0aGlzLiRhcGlUcmVlLmZpcnN0Q2hpbGQpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmluaXRBcGlUcmVlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXBpVHJlZSA9IG5ldyBUcmVlKDApO1xuICB0aGlzLmFwaVRyZWUuYWRkKDEsIDAsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB0aGlzLm9wZXJhdGVEYXRhUm9vdENoaWxkKCk7XG5cbiAgcmV0dXJuIHRoaXMuYXBpVHJlZTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuZGVsTm9kZSA9IGZ1bmN0aW9uKGN0eCkge1xuICB2YXIgY3VycmVudExlYWYgPSBjdHguY3VycmVudFRhcmdldC5jbG9zZXN0KCcubGVhZicpO1xuICB2YXIgY3VycmVudElkeCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQuaW5kZXg7XG4gIHZhciBwYXJlbnRJZHggPSAoK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQgPT09IDApID8gMCA6ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50O1xuXG4gIHZhciBub2Rlc0FyciA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURlc2NlbmRhbnRzKGN1cnJlbnRJZHgpO1xuICB2YXIgaWR4QXJyID0gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycik7XG4gIHRoaXMuYXBpVHJlZS5yZW1vdmUoY3VycmVudElkeCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMucmVtb3ZlTm9kZXNGcm9tRG9tKGlkeEFycik7XG5cbiAgY29uc29sZS5sb2codGhpcy5hcGlUcmVlKTtcblxuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZHgpO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0LmluZGV4KSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJGFwaVRyZWUucmVtb3ZlQ2hpbGQoYWxsTGVhdmVzW2ldKTtcbiAgICB9XG4gIH07XG59O1xuZnVuY3Rpb24gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycikge1xuICB2YXIgbm9kZXNBcnJMZW4gPSBub2Rlc0Fyci5sZW5ndGg7XG4gIHZhciBpZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlc0FyckxlbjsgaSsrKSB7XG4gICAgaWR4QXJyLnB1c2gobm9kZXNBcnJbaV0ubm9kZUlkKTtcbiAgfTtcbiAgcmV0dXJuIGlkeEFycjtcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5iaW5kRXZlbnRzVG9NUkNFID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZWF2ZXMgPSB0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKTtcbiAgdmFyIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7XG4gIHZhciBuZXdseUNyZWF0ZWRMZWFmID0gbGVhdmVzW2xlYXZlc0xlbiAtIDFdO1xuICB2YXIgJGFkZENoaWxkID0gbmV3bHlDcmVhdGVkTGVhZi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGQtY2hpbGQnKVswXTtcbiAgJGFkZENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4ID0+IHtcbiAgICB0aGlzLmFkZENoaWxkKGN0eCk7XG4gIH0pO1xuXG4gIHZhciAkcmVtb3ZlQ2hpbGQgPSBuZXdseUNyZWF0ZWRMZWFmLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JlbW92ZS1jaGlsZCcpWzBdO1xuICAkcmVtb3ZlQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHggPT4ge1xuICAgIHRoaXMuZGVsTm9kZShjdHgpO1xuICB9KTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUuc2V0UGFyZW50Tm9kZVZhbCA9IGZ1bmN0aW9uKGlkeCkge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgcXVldWUgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICB2YXIgcXVldWVMZW4gPSBxdWV1ZS5fbmV3ZXN0SW5kZXggLSBxdWV1ZS5fb2xkZXN0SW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gbGVhdmVzLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGlmICgrbGVhdmVzW2ldLmRhdGFzZXQuaW5kZXggPT09IGlkeCkge1xuICAgICAgaWYgKHF1ZXVlTGVuID4gMCkge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJy0tLT4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIH07XG4gIH07XG59O1xuQXBpRG9tLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGN0eCkge1xuICB0aGlzLmxlYWZJbmRleCArPSAxO1xuICB2YXIgcGFyZW50SWRleCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQuaW5kZXg7XG4gIHZhciBub2RlTGV2ZWwgPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmxldmVsICsgMTtcblxuICAvLyBhcGlUcmVlIG9wZXJhdGlvblxuICB0aGlzLmFwaVRyZWUuYWRkKHRoaXMubGVhZkluZGV4LCBwYXJlbnRJZGV4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgdmFyIGNsb25lZFJlY3RPYmogPSBjbG9uZVJlY3RPYmoodGhpcy5ub2RlTGVmdE9mZnNldChjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlKSk7XG4gIHZhciBjaGlsZHJlbk5vZGVzID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGlyZWN0Q2hpbGQocGFyZW50SWRleCk7XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyID0gW107XG4gIGZvciAodmFyIHBlck5vZGUgaW4gY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZSkge1xuICAgIGlmICgodHlwZW9mIHBhcnNlSW50KHBlck5vZGUpID09PSAnbnVtYmVyJykgJiYgY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XG4gICAgICBjaGlsZHJlbklkeEFyci5wdXNoKGNoaWxkcmVuTm9kZXMuX3N0b3JhZ2VbcGVyTm9kZV0uZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBjaGlsZHJlbklkeEFyckxlbiA9IGNoaWxkcmVuSWR4QXJyLmxlbmd0aDtcblxuICBjbG9uZWRSZWN0T2JqLnJpZ2h0IC09IDMwO1xuXG4gIGNsb25lZFJlY3RPYmouYm90dG9tID0gY2hpbGRyZW5JZHhBcnJMZW4gPT09IDEgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkUmVjdE9iai5ib3R0b20gKyBjbG9uZWRSZWN0T2JqLmhlaWdodCAqIChjaGlsZHJlbklkeEFyckxlbiAtIDIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgKyAoY2hpbGRyZW5JZHhBcnJMZW4gLSAxKSAqIDIwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWRleCwgdGhpcy5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgY2xvbmVkUmVjdE9iaikpO1xuICB0aGlzLmJpbmRFdmVudHNUb01SQ0UoKTtcbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIGNvbnNvbGUubG9nKHRoaXMuYXBpVHJlZSk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWRleCk7XG5cbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWQsIG5vZGVJbmRleCwgbm9kZUxldmVsLCByZWN0T2JqKSB7XG4gIHZhciBuZXdMZWFmU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZWFmJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLCBwYXJlbnRJZCk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIG5vZGVJbmRleCk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1sZXZlbCcsIG5vZGVMZXZlbCk7XG4gIG5ld0xlYWZTcGFuLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgTWF0aC5yb3VuZChyZWN0T2JqLndpZHRoICogbm9kZUxldmVsICsgcGVyU1ZHUGF0aFdpZHRoICogbm9kZUxldmVsKSArICdweCwgJyArIE1hdGgucm91bmQocmVjdE9iai5ib3R0b20pICsgJ3B4LCAwKSc7XG4gIG5ld0xlYWZTcGFuLmlubmVySFRNTCA9IGxlYWZDb250ZW50VHBsO1xuICByZXR1cm4gbmV3TGVhZlNwYW47XG59XG5mdW5jdGlvbiBjcmVhdGVMZWFmKHBhcmVudElkeCwgbm9kZUlkeCwgbm9kZUxldmVsLCByZWN0T2JqKSB7XG4gIHZhciBuZXdMZWFmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBuZXdMZWFmLmFwcGVuZENoaWxkKGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopKTtcbiAgcmV0dXJuIG5ld0xlYWY7XG59XG5BcGlEb20ucHJvdG90eXBlLnN0eWxlTm9kZXMgPSBmdW5jdGlvbihzdHlsZU9iaikge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgbGVhZklkeCwgb2Zmc2V0WSwgb3JpZ2luYWxYID0gJyc7XG5cbiAgdmFyIHN0eWxlc0FyciA9IFtdLCB4VmFsdWUsIHlWYWx1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlYXZlcy5sZW5ndGg7IGkrKykge1xuICAgIG9yaWdpbmFsWCA9IGdldFRyYW5zbGF0ZVgobGVhdmVzW2ldKTtcbiAgICBsZWFmSWR4ID0gKyhsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCk7XG5cbiAgICBmb3IgKHZhciBzdHlsZU9iaklkeCBpbiBzdHlsZU9iaikge1xuICAgICAgaWYgKCtzdHlsZU9iaklkeCA9PT0gbGVhZklkeCkge1xuICAgICAgICBvZmZzZXRZID0gc3R5bGVPYmpbc3R5bGVPYmpJZHhdICogNTI7XG4gICAgICB9O1xuICAgIH1cbiAgICBzdHlsZXNBcnIucHVzaChbb3JpZ2luYWxYLCBvZmZzZXRZXSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaiA9IDAsIHN0eWxlc0FyckxlbiA9IHN0eWxlc0Fyci5sZW5ndGg7IGogPCBzdHlsZXNBcnJMZW47IGorKykge1xuICAgIGxlYXZlc1tqXS5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArIHN0eWxlc0FycltqXVswXSArICdweCwgJyArIHN0eWxlc0FycltqXVsxXSArICdweCwgMCknO1xuICB9XG5cbiAgdGhpcy5kaW1lbnNpb25BcnIgPSB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIHRoaXMuZHJhd1NWRygpO1xufTtcbkFwaURvbS5wcm90b3R5cGUuYWRkU2libGluZyA9IGZ1bmN0aW9uKGN0eCkge1xuICB0aGlzLmxlYWZJbmRleCArPSAxO1xuICB2YXIgcGFyZW50SWR4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQ7XG4gIHZhciBub2RlTGV2ZWwgPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmxldmVsO1xuICBwYXJlbnRJZHggPSAoK3BhcmVudElkeCA9PT0gMCkgPyAwIDogcGFyZW50SWR4O1xuICB0aGlzLmFwaVRyZWUuYWRkKHRoaXMubGVhZkluZGV4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdmFyIHJlY3RPYmogPSB0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpO1xuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaihyZWN0T2JqKTtcbiAgY2xvbmVkUmVjdE9iai5yaWdodCA9IGNsb25lZFJlY3RPYmoucmlnaHQgLSBjbG9uZWRSZWN0T2JqLndpZHRoO1xuICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArPSAzMDtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkeCwgdGhpcy5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgY2xvbmVkUmVjdE9iaikpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG5cbn07XG5cbi8qIHV0aWxzICovXG5mdW5jdGlvbiBjbG9uZVJlY3RPYmoob2JqKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBvYmoudG9wLFxuICAgIGJvdHRvbTogb2JqLmJvdHRvbSxcbiAgICBsZWZ0OiBvYmoubGVmdCxcbiAgICByaWdodDogb2JqLnJpZ2h0LFxuICAgIHdpZHRoOiBvYmoud2lkdGgsXG4gICAgaGVpZ2h0OiBvYmouaGVpZ2h0XG4gIH07XG59XG5cbi8qIG1hbmlwdWxhdGUgU1ZHICovXG5BcGlEb20ucHJvdG90eXBlLmNsZWFyU1ZHID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdmcgPSB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdO1xuICB3aGlsZSAoc3ZnLmxhc3RDaGlsZCkge1xuICAgIHN2Zy5yZW1vdmVDaGlsZChzdmcubGFzdENoaWxkKTtcbiAgfVxufTtcbi8qKlxuICogW2RyYXdTVkcgZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAqL1xuQXBpRG9tLnByb3RvdHlwZS5kcmF3U1ZHID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2xlYXJTVkcoKTtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgc3ZnUGFydGlhbHMgPSBbXTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgc3ZnUGFydGlhbHMucHVzaCh0aGF0LmNyZWF0ZVNpbmdsZVNWRyhub2RlLmRhdGEsIG5vZGUuY29sdW1uLCBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCwgKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgLSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCkpKTtcbiAgICB9O1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG5cbiAgdmFyIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3ZnUGFydGlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHN2Z1BhcnRpYWxzW2ldKTtcbiAgfVxuICB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmNyZWF0ZVNpbmdsZVNWRyA9IGZ1bmN0aW9uKGlkeCwgaG9yaSwgcGFyZW50VmVydCwgZHZlcnQpIHtcblxuICB2YXIgc3ZnbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICB2YXIgbmV3UGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmducywgJ3BhdGgnKTtcbiAgdmFyIGNvbnRyb2xSYXRlID0gMC4yO1xuICB2YXIgbXgsIG15LCBxeCwgcXksIHF4eCwgcXl5LCB0eCwgdHk7XG4gIGhvcmkgPSBob3JpIC0gMTtcbiAgZHZlcnQgPSBkdmVydDtcbiAgcGFyZW50VmVydCA9IHBhcmVudFZlcnQ7XG5cbiAgbXggPSBob3JpICogNTAxO1xuICBteSA9IHBhcmVudFZlcnQgKiA1MiArIDg7XG4gIHF4ID0gbXggKyAxMDtcbiAgcXkgPSBteTtcbiAgcXh4ID0gbXggKyAxNTtcbiAgcXl5ID0gKG15ICsgKGR2ZXJ0IC8gMikgKiA1Mik7XG4gIHR4ID0gbXggKyAzMDtcbiAgdHkgPSBteSArIGR2ZXJ0ICogNTI7XG5cbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsICdNICcgKyBteCArICcgJyArIG15ICsgJyBRICcgKyBxeCArICcgJyArIHF5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxeHggKyAnICcgKyBxeXkgKyAnIFQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggKyAnICcgKyB0eSArICcnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FwaS1zdmctcGF0aCcpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1pZHgnLCBpZHgpO1xuXG4gIHJldHVybiBuZXdQYXRoO1xufTtcblxuLyogY2FsY3VsYXRlIGRpbWVuc2lvbnMgKi9cbkFwaURvbS5wcm90b3R5cGUuY2FsY0RpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaW1lbnNpb25BcnIgPSB0aGlzLmFwaVRyZWUubWF4TGV2ZWxzKCk7XG4gIHZhciBob3JpTWF4LCB2ZXJ0aWNhbE1heCwgaG9yaUFyciA9IFtdLCB2ZXJ0QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gdGhpcy5kaW1lbnNpb25BcnIubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaG9yaUFyci5wdXNoKHRoaXMuZGltZW5zaW9uQXJyW2ldLmxlbmd0aCk7XG4gIH07XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLmFwaVRyZWUuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyICsgJ3B4JztcbiAgdGhpcy5kaW1lbnNpb25BcnIgPSBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcblxufTtcblxuLyogY2FsY3VsYXRlIG9mZnNldCAqL1xuXG5BcGlEb20ucHJvdG90eXBlLm5vZGVMZWZ0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpIHtcbiAgdmFyIGVsUmVjdE9iamVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgYm9keVJlY3RPYmogPSB0aGlzLiRhcGlUcmVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgY2xvbmVCb2R5UmVjdE9iaiA9IGNsb25lUmVjdE9iaihib2R5UmVjdE9iaik7XG4gIHZhciBjbG9uZUVsUmVjdE9iamVjdCA9IGNsb25lUmVjdE9iaihlbFJlY3RPYmplY3QpO1xuICBjbG9uZUVsUmVjdE9iamVjdC50b3AgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5ib3R0b20gKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5sZWZ0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnJpZ2h0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIHJldHVybiBjbG9uZUVsUmVjdE9iamVjdDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzXG4gKiovIiwiLyoqXG4gKiBbVHJlZSBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqXG4gKiBfcm9vdCBwb2ludHMgdG8gdGhlIHJvb3Qgbm9kZSBvZiBhIHRyZWUuXG4gKiB0cmF2ZXJzZURGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggREZTLlxuICogdHJhdmVyc2VCRihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIEJGUy5cbiAqIGNvbnRhaW5zKGRhdGEsIHRyYXZlcnNhbCkgc2VhcmNoZXMgZm9yIGEgbm9kZSBpbiBhIHRyZWUuXG4gKiBhZGQoZGF0YSwgdG9EYXRhLCB0cmF2ZXJzZSkgYWRkcyBhIG5vZGUgdG8gYSB0cmVlLlxuICogcmVtb3ZlKGNoaWxkLCBwYXJlbnQpIHJlbW92ZXMgYSBub2RlIGluIGEgdHJlZS5cbiAqXG4gKi9cbmltcG9ydCB7UXVldWV9IGZyb20gJy4vcXVldWUnO1xuZXhwb3J0IGZ1bmN0aW9uIFRyZWUoZGF0YSkge1xuICB2YXIgbm9kZSA9IG5ldyBOb2RlKGRhdGEpO1xuICB0aGlzLl9yb290ID0gbm9kZTtcbn1cblxuZnVuY3Rpb24gTm9kZShub2RlSWQpIHtcbiAgdGhpcy5ub2RlSWQgPSBub2RlSWQ7IC8vIGxlYWYgaW5kZXgsIHN0YXJ0cyBmcm9tIDAocm9vdCBub2RlKVxuICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgLy8gYWRkZWQgbGF0ZXJcbiAgdGhpcy5jaGlsZHJlbmxldmVsID0gMTsgLy8gcm93cyBvZiBkZXNjZW5kYW50cyBvZiBjdXJyZW50IG5vZGVcbiAgdGhpcy5jb2x1bW4gPSAwOyAvLyB3aGljaCBjb2x1bW4gdGhlIGN1cnJlbnQgbm9kZSBzaXRzIGluLCBzdGFydHMgZnJvbSAwKCByb290IG5vZGUgc2l0cyBpbilcbiAgdGhpcy50b3RhbG9mZnNldHlsZXZlbCA9IDA7IC8vIHRvdGFsIHZlcnRpY2FsIG9mZnNldCB0byB0aGUgY3VycmVudCB0cmVlIFxufVxuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyB0aGlzIGlzIGEgcmVjdXJzZSBhbmQgaW1tZWRpYXRlbHktaW52b2tpbmcgZnVuY3Rpb25cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoY3VycmVudE5vZGUpIHtcbiAgICAvLyBzdGVwIDJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHN0ZXAgM1xuICAgICAgcmVjdXJzZShjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgLy8gc3RlcCA0XG4gICAgY2FsbGJhY2soY3VycmVudE5vZGUpO1xuXG4gICAgLy8gc3RlcCAxXG4gIH0pKHRoaXMuX3Jvb3QpO1xuXG59O1xuXG4vLyBmb3IgdGhvc2Ugbm9kZXMgd2hvIGhhdmUgY2hpbGRyZW5cbmZ1bmN0aW9uIGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSB7XG4gIHZhciB0b3RhbENoaWxkcmVuTGV2ZWxzID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgdG90YWxDaGlsZHJlbkxldmVscyArPSBub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbENoaWxkcmVuTGV2ZWxzO1xufVxuVHJlZS5wcm90b3R5cGUuY2FsY0NoaWxkcmVuTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGUuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSA6IDE7XG4gICAgbm9kZS5jb2x1bW4gPSBub2RlLnBhcmVudCA/IChub2RlLnBhcmVudC5jb2x1bW4gKyAxKSA6IDA7XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbn07XG5cbmZ1bmN0aW9uIGNhbGNPZmZZKGFyciwgZGF0YSkge1xuICB2YXIgbm9kZUlkeCA9IGZpbmRJbmRleChhcnIsIGRhdGEpO1xuICB2YXIgdG90YWxZID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlSWR4OyBpKyspIHtcbiAgICB0b3RhbFkgKz0gYXJyW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbFk7XG59XG5cblRyZWUucHJvdG90eXBlLmNhbGNUb3RhbE9mZnNldFlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGV2ZWxnYXAgPSAwO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBub2RlLnRvdGFsb2Zmc2V0eWxldmVsID0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwgKyBjYWxjT2ZmWShub2RlLnBhcmVudC5jaGlsZHJlbiwgbm9kZS5ub2RlSWQpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblxuICAgIH07XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxufTtcblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VCRiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXG4gIHF1ZXVlLmVucXVldWUodGhpcy5fcm9vdCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY3VycmVudFRyZWUpO1xuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0cmF2ZXJzYWwpIHtcbiAgdHJhdmVyc2FsLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcblxuVHJlZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZGF0YSwgdG9EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IHRvRGF0YSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhZGQgbm9kZSB0byBhIG5vbi1leGlzdGVudCBwYXJlbnQuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhLCBmcm9tRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciB0cmVlID0gdGhpcyxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjaGlsZFRvUmVtb3ZlID0gbnVsbCxcbiAgICAgIGluZGV4O1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlSWQgPT09IGZyb21EYXRhKSB7XG4gICAgICBwYXJlbnQgPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBpbmRleCA9IGZpbmRJbmRleChwYXJlbnQuY2hpbGRyZW4sIGRhdGEpO1xuXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSB0byByZW1vdmUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZG9lcyBub3QgZXhpc3QuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG5cbiAgcmV0dXJuIGNoaWxkVG9SZW1vdmU7XG59O1xuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBkYXRhKSB7XG4gIHZhciBpbmRleDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0ubm9kZUlkID09PSBkYXRhKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKiB0cmVlIGFkZG9uKi9cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEaXJlY3RDaGlsZCA9IGZ1bmN0aW9uKG5vZGVkYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICBwYXJlbnQgPSBudWxsLFxuICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZUlkID09PSBub2RlZGF0YSkge1xuICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShwYXJlbnQuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsYmFjayhwYXJlbnQpO1xuICAgIHBhcmVudCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufTtcblRyZWUucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlT2JqID0ge307XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzdHlsZU9ialtub2RlLm5vZGVJZF0gPSBub2RlLnRvdGFsb2Zmc2V0eWxldmVsO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG4gIHJldHVybiBzdHlsZU9iajtcbn07XG5cbi8qKlxuICogW3RyYXZlcnNlRGVzY2VuZGFudHMgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbaW50ZWdlcl19IG5vZGVEYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1thcnJheV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURlc2NlbmRhbnRzID0gZnVuY3Rpb24obm9kZURhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVEYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHF1ZXVlLmVucXVldWUocGFyZW50KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIHZhciBkZXNjZW5kYW50c0FyciA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGRlc2NlbmRhbnRzQXJyLnB1c2goY3VycmVudFRyZWUpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cblxuICByZXR1cm4gZGVzY2VuZGFudHNBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5tYXhMZXZlbHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgZGF0YVJvb3ROb2RlcyA9IHRoaXMudHJhdmVyc2VEaXJlY3RDaGlsZCgwKTtcbiAgdmFyIHJvd0xldmVsT2JqID0ge307XG4gIHZhciBoZWFkSWR4QXJyID0gW107XG4gIGZvciAodmFyIGRybiBpbiBkYXRhUm9vdE5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKGRhdGFSb290Tm9kZXMuX3N0b3JhZ2UuaGFzT3duUHJvcGVydHkoZHJuKSkge1xuICAgICAgcm93TGV2ZWxPYmpbZHJuXSA9IHt9O1xuICAgICAgcm93TGV2ZWxPYmpbZHJuXVsnaGVhZC1pZHgnXSA9IGRhdGFSb290Tm9kZXMuX3N0b3JhZ2VbZHJuXS5ub2RlSWQ7XG4gICAgICBoZWFkSWR4QXJyLnB1c2goZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLm5vZGVJZCk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3RJZHhGcm9tUXVldWUocXVldWUpIHtcbiAgICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgICBmb3IgKHZhciBwZXJOb2RlIGluIHF1ZXVlLl9zdG9yYWdlKSB7XG4gICAgICBpZiAoKHR5cGVvZiBwYXJzZUludChwZXJOb2RlKSA9PT0gJ251bWJlcicpICYmIHF1ZXVlLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgY2hpbGRyZW5JZHhBcnIucHVzaChxdWV1ZS5fc3RvcmFnZVtwZXJOb2RlXS5ub2RlSWQpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuSWR4QXJyO1xuICB9XG5cbiAgdmFyIGxldmVsTmV4dENvbEFyciA9IFtdO1xuXG4gIGZ1bmN0aW9uIGdldFJvd0xldmVsKGlkeCkge1xuICAgIHZhciBkaXJlY3RDaGlsZHJlblF1ZXVlID0gdGhhdC50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gICAgdmFyIGRpcmVjdENoaWxkcmVuQXJyID0gZXh0cmFjdElkeEZyb21RdWV1ZShkaXJlY3RDaGlsZHJlblF1ZXVlKTtcbiAgICByZXR1cm4gZGlyZWN0Q2hpbGRyZW5BcnI7XG4gIH1cblxuICB2YXIgdWx0aW1hdGVBcnIgPSBbXTtcbiAgdmFyIHBlckhlYWQgPSBbXTtcblxuICBmdW5jdGlvbiBuZXh0TGV2ZWxDaGlsZHJlbihhcnIpIHtcbiAgICB2YXIgbmV4dExldmVsQ2hpbGRyZW5BcnIgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBlck51bSA9IGdldFJvd0xldmVsKGFycltpXSk7XG4gICAgICBuZXh0TGV2ZWxDaGlsZHJlbkFyciA9IG5leHRMZXZlbENoaWxkcmVuQXJyLmNvbmNhdChwZXJOdW0pO1xuICAgIH07XG4gICAgaWYgKG5leHRMZXZlbENoaWxkcmVuQXJyLmxlbmd0aCkge1xuICAgICAgcGVySGVhZC5wdXNoKG5leHRMZXZlbENoaWxkcmVuQXJyLmxlbmd0aCk7XG4gICAgICBuZXh0TGV2ZWxDaGlsZHJlbihuZXh0TGV2ZWxDaGlsZHJlbkFycik7XG4gICAgfTtcbiAgfVxuXG4gIChmdW5jdGlvbiByZWN1cnNlKGFycikge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBlckhlYWQgPSBbXTtcbiAgICAgIC8vIGxldmVsIDFcbiAgICAgIGxldmVsTmV4dENvbEFyciA9IGdldFJvd0xldmVsKGFycltpXSk7XG4gICAgICBwZXJIZWFkLnB1c2goMSk7XG4gICAgICBpZiAobGV2ZWxOZXh0Q29sQXJyLmxlbmd0aCkge1xuICAgICAgICBwZXJIZWFkLnB1c2gobGV2ZWxOZXh0Q29sQXJyLmxlbmd0aCk7XG4gICAgICAgIG5leHRMZXZlbENoaWxkcmVuKGxldmVsTmV4dENvbEFycik7XG4gICAgICB9O1xuICAgICAgdWx0aW1hdGVBcnIucHVzaChwZXJIZWFkKTtcbiAgICB9O1xuICB9KShoZWFkSWR4QXJyKTtcblxuICByZXR1cm4gdWx0aW1hdGVBcnI7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qc1xuICoqLyIsIi8qKlxuICogW1F1ZXVlIGRlc2NyaXB0aW9uXVxuICogZW5xdWV1ZShkYXRhKSBhZGRzIGRhdGEgdG8gYSBxdWV1ZS5cbiAqIGRlcXVldWUgcmVtb3ZlcyB0aGUgb2xkZXN0IGFkZGVkIGRhdGEgdG8gYSBxdWV1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFF1ZXVlKCkge1xuICB0aGlzLl9vbGRlc3RJbmRleCA9IDE7XG4gIHRoaXMuX25ld2VzdEluZGV4ID0gMTtcbiAgdGhpcy5fc3RvcmFnZSA9IHt9O1xufVxuXG5RdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbmV3ZXN0SW5kZXggLSB0aGlzLl9vbGRlc3RJbmRleDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl9zdG9yYWdlW3RoaXMuX25ld2VzdEluZGV4XSA9IGRhdGE7XG4gIHRoaXMuX25ld2VzdEluZGV4Kys7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkZXN0SW5kZXggPSB0aGlzLl9vbGRlc3RJbmRleCxcbiAgICAgIG5ld2VzdEluZGV4ID0gdGhpcy5fbmV3ZXN0SW5kZXgsXG4gICAgICBkZWxldGVkRGF0YTtcblxuICBpZiAob2xkZXN0SW5kZXggIT09IG5ld2VzdEluZGV4KSB7XG4gICAgZGVsZXRlZERhdGEgPSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICBkZWxldGUgdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgdGhpcy5fb2xkZXN0SW5kZXgrKztcblxuICAgIHJldHVybiBkZWxldGVkRGF0YTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGdldE1heE9mQXJyYXkobnVtQXJyYXkpIHtcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxlbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKGNsYXNzTmFtZSkgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXgoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgcHJlZml4ID0gJyc7XG4gIHByZWZpeCA9ICh1YS5pbmRleE9mKCdjaHJvbWUnKSA+PSAwIHx8IHdpbmRvdy5vcGVuRGF0YWJhc2UpID8gJy13ZWJraXQtJyA6ICh1YS5pbmRleE9mKCdmaXJlZm94JykgPj0gMCkgPyAnLW1vei0nIDogd2luZG93Lm9wZXJhID8gJy1vLScgOiAoZG9jdW1lbnQuYWxsICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA9PT0gLTEpID8gJy1tcy0nIDogJyc7XG4gIHJldHVybiBwcmVmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oZWwpIHtcbiAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG5cbiAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuICBpZiAocmVzdWx0c1sxXSA9PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuXG4gIHJlc3VsdHMucHVzaCgwKTtcbiAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoNSwgOCk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbi8vICAgLy8gY2hyb21lIHdvbid0IHVzZSBwcmVmaXhcbi8vICAgLy8gdmFyIHN0eWxlX2F0dHIgPSBicm93c2VyUHJlZml4KCkgKyAndHJhbnNmb3JtJztcbi8vICAgdmFyIHN0eWxlX2F0dHIgPSAndHJhbnNmb3JtJztcbi8vICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlX2F0dHIpO1xuLy8gICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG4vLyAgIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbi8vICAgaWYgKHJlc3VsdHNbMV0gPT09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG4vLyAgIHJlc3VsdHMucHVzaCgwKTtcbi8vICAgcmV0dXJuICsocmVzdWx0cy5zbGljZSg1LCA4KVswXSk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5zcGxpdCgndHJhbnNsYXRlM2QnKVsxXS5zcGxpdCgnLCAnKVswXS5zbGljZSgxKS5zcGxpdCgncHgnKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVkob2JqKSB7XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxuICAgICAgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtIHx8IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gIHZhciBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gIGlmIChtYXQpIHJldHVybiBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVsxM10pO1xuICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICByZXR1cm4gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbNV0pIDogMDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuLyoqXG4gKiBbc3RyaW5naWZ5IHdpdGggNCBzcGFjZXMgYXQgZWFjaCBsZXZlbF1cbiAqIEBwYXJhbSAge1tvYmplY3RdfSBqc09iaiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIFwiXFx0XCIpOyAvLyBzdHJpbmdpZnkgd2l0aCB0YWJzIGluc2VydGVkIGF0IGVhY2ggbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIFtoaWdodGxpZ2h0SlNPTiB3b3JrcyBvbiBKU09OIG9iamVjdCwgbm90IHN0cmluZ11cbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XG4gIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uLCB1bmRlZmluZWQsIDQpO1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICB2YXIgY2xzID0gJ251bWJlcic7XG4gICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAna2V5JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgfSBlbHNlIGlmICgvbnVsbC8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdudWxsJztcbiAgICB9XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qc1xuICoqLyIsImltcG9ydCB7bWVyZ2VPYmp9IGZyb20gJy4uL2NvbW1vbi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcGlEYXRhKG9wRWxlKSB7XG4gIGxldCBwZXJBcGlFbGUgPSBvcEVsZS5jbG9zZXN0KCcucGVyLWFwaScpO1xuICBsZXQgaW5mb0VsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktaW5mbycpWzBdO1xuICBsZXQgdHJlZUVsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICByZXR1cm4gbWVyZ2VPYmooY29sbGVjdEluZm8oaW5mb0VsZSksIGNvbGxlY3RUcmVlKHRyZWVFbGUpKTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEluZm8oaW5mb0VsZSkge1xuICBsZXQgaW5mb0RhdGEgPSB7fTtcbiAgaW5mb0RhdGEgPSB7XG4gICAgJ3NlY3Rpb24nOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zZWN0aW9uJylbMF0udmFsdWUsXG4gICAgJ3VyaSc6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlLFxuICAgICdtZXRob2QnOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tZXRob2QnKVswXS52YWx1ZSxcbiAgICAnZGVzY3JpcHRpb24nOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1kZXNjcmlwdGlvbicpWzBdLnZhbHVlXG4gIH07XG5cbiAgcmV0dXJuIGluZm9EYXRhO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0VHJlZSh0cmVlRWxlKSB7XG5cdGxldCBsZWF2ZXMgPSBbXS5zbGljZS5jYWxsKHRyZWVFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTsgXG4gIGxldCB0cmVlRGF0YUFyciA9IFtdO1xuICBsZXQgdHJlZURhdGFPYmogPSB7fTtcbiAgbGV0IGxlYWZEYXRhO1xuICBmb3IgKGxldCBpID0gMCwgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDsgaSA8IGxlYXZlc0xlbjsgaSsrKSB7XG4gICAgbGVhZkRhdGEgPSB7fTtcbiAgICBsZWFmRGF0YS5wYXJlbnRJZCA9IGxlYXZlc1tpXS5kYXRhc2V0LnBhcmVudDtcbiAgICBsZWFmRGF0YS5ub2RlSWQgPSBsZWF2ZXNbaV0uZGF0YXNldC5pbmRleDtcbiAgICBsZWFmRGF0YS5rZXkgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi1rZXknKVswXS52YWx1ZTtcbiAgICBsZWFmRGF0YS52YWx1ZSA9IGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWU7XG4gICAgbGVhZkRhdGEucXVhbnRpdHkgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi1xdWFudGl0eScpWzBdLnZhbHVlO1xuICAgIHRyZWVEYXRhQXJyLnB1c2gobGVhZkRhdGEpO1xuICB9O1xuICB0cmVlRGF0YU9iai5kYXRhID0gSlNPTi5zdHJpbmdpZnkodHJlZURhdGFBcnIpO1xuICByZXR1cm4gdHJlZURhdGFPYmo7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRGF0YUNvbGxlY3QuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9