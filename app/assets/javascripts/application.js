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
	  var horiMax,
	      verticalMax,
	      horiArr = [],
	      vertArr = [];
	
	  horiArr = this.apiTree.depth();
	  horiMax = Math.max.apply(null, horiArr);
	  verticalMax = this.apiTree._root.childrenlevel;
	  this.$apiTreeFrame.style.width = horiMax * 520 + 'px';
	  this.$apiTreeFrame.style.height = verticalMax * 52 + 'px';
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
	  treeDataObj.nodes = treeDataArr;
	  return treeDataObj;
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzBkNjU2Y2NiMjYxY2M3NjRmZjAiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRGF0YUNvbGxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs2Q0N0Q3dCLENBQXFCOzs0Q0FDMUIsQ0FBb0I7O2dEQUVqQixDQUF3Qjs7QUFDOUMsbUNBQVcsQ0FBQzs7Ozs7O0FBTVosRUFBQyxZQUFNO0FBQ0wsT0FBSSxNQUFNLEdBQUc7QUFDWCxRQUFHLHVCQUFNO0FBQ1QsV0FBTSxFQUFFLDhCQUFTO0lBQ2xCLENBQUM7QUFDRixPQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUN4QyxPQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDbkMsU0FBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLElBQ3ZFLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDekIsWUFBSyxJQUFJLENBQUMsR0FBRyxD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LEVBQUU7QUFDN0QsYUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNkLGFBQVEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDN0MsYUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUMxQyxhQUFRLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDckUsYUFBUSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ3pFLGFBQVEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMvRSxnQkFBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixDQUFDO0FBQ0YsY0FBVyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7QUFDaEMsVUFBTyxXQUFXLENBQUMiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMwZDY1NmNjYjI2MWNjNzY0ZmYwXG4gKiovIiwiaW1wb3J0IHtkYXRhTGlua3N9IGZyb20gJy4vbW9kdWxlcy9kYXRhTGlua3MnO1xuaW1wb3J0IHtob21lfSBmcm9tICcuL21vZHVsZXMvaG9tZXBhZ2UnO1xuXG5pbXBvcnQge2luaXRYaHJ9IGZyb20gJy4vbW9kdWxlcy9hcGlPcGVyYXRpb24nO1xuZGF0YUxpbmtzKCk7XG4vLyBhcGlUcmVlKCk7XG4vLyB2YXIgcCA9IG5ldyBkYXduU1ZHKCk7XG4vLyBwLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhaW50ZXItdGFyZ2V0JykpO1xuLy8gcC5zdGFydCgpO1xuXG4oKCkgPT4ge1xuICBsZXQgcm91dGVzID0ge1xuICAgICcvJzogaG9tZSxcbiAgICAnL2Rldic6IFtpbml0WGhyXVxuICB9O1xuICBsZXQgcGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChyb3V0ZXMuaGFzT3duUHJvcGVydHkocGF0aE5hbWUpKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyb3V0ZXNbcGF0aE5hbWVdKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuICAgICAgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZXNbcGF0aE5hbWVdW2ldLmFwcGx5KG51bGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmFwcGx5KG51bGwpO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBwbGljYXRpb24uanNcbiAqKi8iLCJpbXBvcnQge2hhbmRsZU1ldGhvZH0gZnJvbSAnLi4vY29tbW9uL2hhbmRsZU1ldGhvZCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhTGlua3MoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc0RhdGFMaW5rLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRGF0YUxpbmsoZSkge1xuICB2YXIgZSA9IHdpbmRvdy5lIHx8IGU7XG5cbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgIT09ICdBJylcbiAgICAgIHJldHVybjtcblxuICAvLyBEbyBzb21ldGhpbmdcbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAnZGVsZXRlJykge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBoYW5kbGVNZXRob2QoZS50YXJnZXQpO1xuICB9XG4gIC8vIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ3BhdGNoJykge1xuICAvLyAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gICBoYW5kbGVNZXRob2QoZS50YXJnZXQsIHtcbiAgLy8gICAgIG5zOiAnYXBpJyxcbiAgLy8gICAgIGRhdGE6IHtcbiAgLy8gICAgICAgc2VjdGlvbjogJ3dpc2UnLFxuICAvLyAgICAgICBpZDogJzInXG4gIC8vICAgICB9XG4gIC8vICAgfSk7XG4gIC8vIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9kYXRhTGlua3MuanNcbiAqKi8iLCJpbXBvcnQge3JvclBhcmFtcyBhcyBSUHN9IGZyb20gJy4uL2NvbW1vbi9jc3JmJztcbi8qKlxuICogW2hhbmRsZU1ldGhvZCBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBsaW5rIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKiBIYW5kbGVzIFwiZGF0YS1tZXRob2RcIiBvbiBsaW5rcyBzdWNoIGFzOlxuICogPGEgaHJlZj1cIi91c2Vycy81XCIgZGF0YS1tZXRob2Q9XCJkZWxldGVcIiByZWw9XCJub2ZvbGxvd1wiIGRhdGEtY29uZmlybT1cIkFyZSB5b3Ugc3VyZT9cIj5EZWxldGU8L2E+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVNZXRob2QobGluaywgb2JqID0ge30pIHtcbiAgdmFyIGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgIG1ldGhvZCA9IGxpbmsuZGF0YXNldC5tZXRob2QsXG4gICAgdGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpLFxuICAgIGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKSxcbiAgICBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIHZhciBwYXJhbXNPYmogPSB7XG4gICAgaHJlZjogaHJlZixcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICBjc3JmVG9rZW46IGNzcmZUb2tlbixcbiAgICBjc3JmUGFyYW06IGNzcmZQYXJhbVxuICB9O1xuICB2YXIgZm9ybUVsZSA9IGNyZWF0ZUZvcm0ocGFyYW1zT2JqLCBvYmopO1xuICBhcHBlbmRGb3JtVG9Eb20oZm9ybUVsZSk7XG4gIHN1Ym1pdEZvcm0oZm9ybUVsZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb3JtKHBhcmFtcywgb2JqKSB7XG4gIHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGYuc2V0QXR0cmlidXRlKCdtZXRob2QnLCdwb3N0Jyk7XG4gIGYuc2V0QXR0cmlidXRlKCdhY3Rpb24nLHBhcmFtcy5ocmVmKTtcbiAgaWYgKHBhcmFtcy50YXJnZXQpIHtcbiAgICBmLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgcGFyYW1zLnRhcmdldCk7XG4gIH07XG5cbiAgdmFyIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICBpLnNldEF0dHJpYnV0ZSgnbmFtZScsJ19tZXRob2QnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMubWV0aG9kKTtcblxuICB2YXIgcztcbiAgaWYgKHBhcmFtcy5jc3JmUGFyYW0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcGFyYW1zLmNzcmZUb2tlbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAhUlBzLmlzQ3Jvc3NEb21haW4ocGFyYW1zLmhyZWYpKSB7XG4gICAgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgnbmFtZScsIHBhcmFtcy5jc3JmUGFyYW0pO1xuICAgIHMuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLmNzcmZUb2tlbik7XG4gIH1cbiAgZi5hcHBlbmRDaGlsZChpKTtcblxuICAvLyBmb3IgKGxldCBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgLy8gICBpZiAob2JqLmRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAvLyAgICAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCduYW1lJywnJyArIG9iai5ucyArICdbJyArIGtleSArICddJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndmFsdWUnLG9iai5kYXRhW2tleV0pO1xuICAvLyAgICAgZi5hcHBlbmRDaGlsZCh0KTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICBpZiAocykge1xuICAgIGYuYXBwZW5kQ2hpbGQocyk7XG4gIH07XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRGb3JtVG9Eb20oZm9ybSkge1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xufVxuZnVuY3Rpb24gc3VibWl0Rm9ybShmb3JtKSB7XG4gIGZvcm0uc3VibWl0KCk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaGFuZGxlTWV0aG9kLmpzXG4gKiovIiwiZXhwb3J0IGxldCByb3JQYXJhbXMgPSB7XG4gIC8vIFVwLXRvLWRhdGUgQ3Jvc3MtU2l0ZSBSZXF1ZXN0IEZvcmdlcnkgdG9rZW5cbiAgY3NyZlRva2VuOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi10b2tlbl0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gVVJMIHBhcmFtIHRoYXQgbXVzdCBjb250YWluIHRoZSBDU1JGIHRva2VuXG4gIGNzcmZQYXJhbTogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtcGFyYW1dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIERldGVybWluZXMgaWYgdGhlIHJlcXVlc3QgaXMgYSBjcm9zcyBkb21haW4gcmVxdWVzdC5cbiAgaXNDcm9zc0RvbWFpbjogdXJsID0+IHtcbiAgICBsZXQgb3JpZ2luQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIG9yaWdpbkFuY2hvci5ocmVmID0gbG9jYXRpb24uaHJlZjtcbiAgICBsZXQgdXJsQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsO1xuICAgICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgdG8gYSBJRSBidWcuXG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybEFuY2hvci5ocmVmO1xuXG4gICAgICAvLyBJZiBVUkwgcHJvdG9jb2wgaXMgZmFsc2Ugb3IgaXMgYSBzdHJpbmcgY29udGFpbmluZyBhIHNpbmdsZSBjb2xvblxuICAgICAgLy8gKmFuZCogaG9zdCBhcmUgZmFsc2UsIGFzc3VtZSBpdCBpcyBub3QgYSBjcm9zcy1kb21haW4gcmVxdWVzdFxuICAgICAgLy8gKHNob3VsZCBvbmx5IGJlIHRoZSBjYXNlIGZvciBJRTcgYW5kIElFIGNvbXBhdGliaWxpdHkgbW9kZSkuXG4gICAgICAvLyBPdGhlcndpc2UsIGV2YWx1YXRlIHByb3RvY29sIGFuZCBob3N0IG9mIHRoZSBVUkwgYWdhaW5zdCB0aGUgb3JpZ2luXG4gICAgICAvLyBwcm90b2NvbCBhbmQgaG9zdC5cbiAgICAgIHJldHVybiAhKCgoIXVybEFuY2hvci5wcm90b2NvbCB8fCB1cmxBbmNob3IucHJvdG9jb2wgPT09ICc6JykgJiYgIXVybEFuY2hvci5ob3N0KSB8fFxuICAgICAgICAob3JpZ2luQW5jaG9yLnByb3RvY29sICsgJy8vJyArIG9yaWdpbkFuY2hvci5ob3N0ID09PVxuICAgICAgICAgIHVybEFuY2hvci5wcm90b2NvbCArICcvLycgKyB1cmxBbmNob3IuaG9zdCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGVycm9yIHBhcnNpbmcgdGhlIFVSTCwgYXNzdW1lIGl0IGlzIGNyb3NzRG9tYWluLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanNcbiAqKi8iLCJpbXBvcnQge3R3ZWV0Qm94fSBmcm9tICcuL3R3ZWV0Qm94JztcbmV4cG9ydCBmdW5jdGlvbiBob21lKCkge1xuXHR0d2VldEJveCgpO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanNcbiAqKi8iLCJmdW5jdGlvbiBzZXRGb2N1cyhlbCkge1xuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICByYW5nZS5zZXRTdGFydChlbCwgMCk7XG4gIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbC5hZGRSYW5nZShyYW5nZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdHdlZXRCb3goKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIHRiID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3R3ZWV0LWJveCcpWzBdO1xuICBpZiAoIXRiKSByZXR1cm4gbnVsbDtcbiAgdmFyIHRiZCA9IHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgdmFyIHRiZFN0cmluZyA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdjb25kZW5zZWQnKTtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCkge1xuXG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuY2xhc3NMaXN0LmFkZCgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICh0YmQuaW5uZXJIVE1MID09PSAnV2hhdFxcJ3MgaGFwcGVuaW5nPycpIHtcblxuICAgICAgdGJkLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICB9XG4gIH0pO1xuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmlubmVySFRNTCkge1xuICAgICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgICB9IGVsc2Uge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcblxuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH07XG4gICAgaWYgKHRiLmlubmVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanNcbiAqKi8iLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XG5pbXBvcnQge2h0bWx9IGZyb20gJy4uL2NvbW1vbi90ZW1wbGF0ZSc7XG5pbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmltcG9ydCB7Zmxhc2h9IGZyb20gJy4uL2NvbW1vbi9mbGFzaCc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZS1kb20nO1xuaW1wb3J0IHtjb2xsZWN0QXBpRGF0YX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0JztcblxubGV0IHJvb3RBUEkgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGlzJztcbmxldCBwYXlsb2FkID0ge307XG5sZXQgYXBpc0FyciA9IFtdO1xuXG52YXIgY2FsbGJhY2sgPSB7XG4gIGdldEFwaVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBhZGRBcGlUcmVlKEpTT04ucGFyc2UoZGF0YSksIHRoaXMpO1xuICB9LFxuICBnZXRBbGxBcGlzU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHJlbmRlckFsbEFwaXMoZGF0YSk7XG4gICAgYmluZGV2ZW50cygpO1xuICB9LFxuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBwb3N0U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIGRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBmdW5jdGlvbiBkZXN0b3J5QXBpTGkoKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQodGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhLCBkZXN0b3J5QXBpTGkuYmluZCh0aGlzKSk7XG4gIH0sXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRYaHIoKSB7XG4gIGdldEFsbEFwaXMoKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kRXZlbnQpO1xufVxuXG5mdW5jdGlvbiBwYXJzZUFuZEZsYXNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGZsYXNoKGpzb25EYXRhLCBjYWxsYmFjayk7XG4gIHJldHVybiBqc29uRGF0YTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRm9sZExpKGNvbnRleHQpIHtcbiAgY29udGV4dC5jbGFzc0xpc3QudG9nZ2xlKCd1bmZvbGQnKTtcbn1cbmZ1bmN0aW9uIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbihldikge1xuICB0b2dnbGVGb2xkTGkodGhpcyk7XG4gIGlmICh0aGlzLm5leHRFbGVtZW50U2libGluZykge1xuICAgIHJldHVybjtcbiAgfTtcbiAgJGh0dHAocm9vdEFQSSArICcvJyArIHRoaXMucGFyZW50Tm9kZS5kYXRhc2V0LmFwaUlkKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFwaVN1Y2Nlc3MuYmluZCh0aGlzLnBhcmVudE5vZGUpKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuZnVuY3Rpb24gYmluZGV2ZW50cygpIHtcbiAgbGV0IGFwaUxpcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1saS1kZXNjcmlwdGlvbicpO1xuICBbXS5zbGljZS5jYWxsKGFwaUxpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEFwaVRyZWUoZGF0YSA9IHt9LCBjb250YWluZXJOb2RlLCBpc05ld0FwaSkge1xuICBsZXQgbmV3QXBpID0gbmV3IEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSk7XG4gIGFwaXNBcnIucHVzaChuZXdBcGkpO1xufVxuXG5sZXQgZGVib3VuY2VkTmV3QXBpQnRuID0gZGVib3VuY2UocHJvY2Vzc05ld0FwaUNsaWNrLCA1MDAsIHRydWUpO1xuZnVuY3Rpb24gcHJvY2Vzc05ld0FwaUNsaWNrKCkge1xuICBsZXQgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgbGV0IGJhc2VBcGlMaSA9IHN0clRvRG9tKG5ld0FwaUxpVHBsKCkpO1xuICBhcGlVbC5pbnNlcnRCZWZvcmUoYmFzZUFwaUxpLCBhcGlVbC5maXJzdENoaWxkKTtcbiAgYWRkQXBpVHJlZSh7fSwgYmFzZUFwaUxpLCB0cnVlKTtcbiAgdG9nZ2xlRm9sZExpKGJhc2VBcGlMaS5jaGlsZHJlblswXSk7XG4gIGJhc2VBcGlMaS5jaGlsZHJlblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24uY2FsbCh0aGlzLCBldik7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBuZXdBcGlCdG4oKSB7XG4gIGxldCBuZXdBcGlEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkZXInKVswXTtcbiAgbmV3QXBpRGl2LmNsYXNzTGlzdC5hZGQoJ25ldy1hcGknKTtcbiAgbmV3QXBpRGl2LmlubmVySFRNTCA9IGA8aW5wdXQgY2xhc3M9XCJhZGQtYXBpLWJ0blwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIm5ldyBBUElcIj5gO1xuICBuZXdBcGlEaXYuY2hpbGRyZW5bMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWJvdW5jZWROZXdBcGlCdG4pO1xuICBpbnNlcnRBZnRlcihuZXdBcGlEaXYsIGhlYWRlcik7XG4gIHJldHVybiBuZXdBcGlEaXY7XG59XG5cbmZ1bmN0aW9uIG5ld0FwaUxpVHBsKGRhdGEgPSB7fSkge1xuICB2YXIgdHBsID0gYFxuICAgIDxsaSBjbGFzcz1cImFwaS1saVwiIGRhdGEtYXBpLWlkPVwiJHtkYXRhLmlkIHx8IG51bGx9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWxpLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLWNvbGxhcHNlXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi1kb3duXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPjwvc3ZnPjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktdXJpXCI+JHtkYXRhLnVyaSB8fCAnKE5vIHVyaSknfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktbmFtZVwiPiR7ZGF0YS5uYW1lID8gZGF0YS5uYW1lIDogJyhObyBuYW1lKSd9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9saT5cbiAgYDtcbiAgcmV0dXJuIHRwbDtcbn1cbmZ1bmN0aW9uIHJlbmRlckFsbEFwaXMoZGF0YSkge1xuICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgY29uc3QgdG1wbCA9IGRhdGEgPT4gaHRtbGBcbiAgICAgIDx1bCBjbGFzcz1cImFwaS11bFwiPlxuICAgICAgJHtkYXRhLm1hcChpdGVtID0+IGh0bWxgXG4gICAgICAgICR7bmV3QXBpTGlUcGwoaXRlbSl9XG4gICAgICBgKX1cbiAgICAgIDwvdWw+XG4gIGA7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZGVyJylbMF07XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpTGlzdEVsZS5pbm5lckhUTUwgPSB0bXBsKGRhdGEpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlCdG4oKSk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbEFwaXMoKSB7XG4gICRodHRwKHJvb3RBUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QWxsQXBpc1N1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5cbmZ1bmN0aW9uIGJpbmRFdmVudChldikge1xuICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXBpLXNhdmUnKSkge1xuICAgIC8vIGxldCBwYXJhbXMgPSB7XG4gICAgLy8gICAnc2VjdGlvbic6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zZWN0aW9uJylbMF0udmFsdWUsXG4gICAgLy8gICAndXJpJzogZXYudGFyZ2V0LnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlLFxuICAgIC8vICAgJ21ldGhvZCc6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tZXRob2QnKVswXS52YWx1ZVxuICAgIC8vIH07XG4gICAgbGV0IHBhcmFtcyA9IGNvbGxlY3RBcGlEYXRhKGV2LnRhcmdldCk7XG4gICAgaWYgKGV2LnRhcmdldC5kYXRhc2V0Lm1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUEFUQ0gnKSB7XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZClcbiAgICAgIC5wYXRjaChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2sucGF0Y2hTdWNjZXNzKVxuICAgICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICB9IGVsc2UgaWYgKGV2LnRhcmdldC5kYXRhc2V0Lm1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUE9TVCcpIHtcbiAgICAgICRodHRwKHJvb3RBUEkpXG4gICAgICAucG9zdChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2sucG9zdFN1Y2Nlc3MpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsLWRhdGFyb290LWNoaWxkJykpIHtcbiAgICBwb3B1cChldiwge30sIGRlbGV0ZUFwaS5iaW5kKHRoaXMsIGV2KSk7XG4gIH07XG4gIGZ1bmN0aW9uIGRlbGV0ZUFwaShldikge1xuICAgIGlmICghZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZCkge1xuICAgICAgZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZChldi50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgJGh0dHAocm9vdEFQSSArICcvJyArIGV2LnRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpLmRhdGFzZXQuaWQpXG4gICAgLmRlbGV0ZShwYXJhbXMpXG4gICAgLnRoZW4oY2FsbGJhY2suZGVsZXRlU3VjY2Vzcy5iaW5kKGV2KSlcbiAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzXG4gKiovIiwiLyoqXG4vLyBCLT4gSGVyZSB5b3UgZGVmaW5lIGl0cyBmdW5jdGlvbnMgYW5kIGl0cyBwYXlsb2FkXG52YXIgbWRuQVBJID0gJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL3NlYXJjaC5qc29uJztcbnZhciBwYXlsb2FkID0ge1xuICAndG9waWMnIDogJ2pzJyxcbiAgJ3EnICAgICA6ICdQcm9taXNlJ1xufTtcbnZhciBjYWxsYmFjayA9IHtcbiAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygxLCAnc3VjY2VzcycsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9LFxuICBlcnJvciA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygyLCAnZXJyb3InLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfVxufTtcbi8vIEVuZCBCXG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGxcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDEpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcywgY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDIpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLnRoZW4odW5kZWZpbmVkLCBjYWxsYmFjay5lcnJvcik7XG4gKi9cblxuLy8gQS0+ICRodHRwIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGluIG9yZGVyIHRvIGZvbGxvdyB0aGUgc3RhbmRhcmQgQWRhcHRlciBwYXR0ZXJuXG5pbXBvcnQge3NlcmlhbGl6ZX0gZnJvbSAnLi9zZXJpYWxpemUnO1xuaW1wb3J0IHtpc0VtcHR5LCBtZXJnZU9iaiwgYWRkUHJlZml4VG9PYmosIHdyYXBPYmp9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi9jc3JmJztcblxuZXhwb3J0IGZ1bmN0aW9uICRodHRwKHVybCkge1xuICAvLyBBIHNtYWxsIGV4YW1wbGUgb2Ygb2JqZWN0XG4gIHZhciBjb3JlID0ge1xuXG4gICAgLy8gTWV0aG9kIHRoYXQgcGVyZm9ybXMgdGhlIGFqYXggcmVxdWVzdFxuICAgIGFqYXg6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhcmdzID0ge30sIHByZWZpeCkge1xuICAgICAgLy8gZm9yIFJhaWxzXG4gICAgICAvLyB1cmwgPSB1cmwgKyAnLmpzb24nO1xuICAgICAgLy8gQ3JlYXRpbmcgYSBwcm9taXNlXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlcyB0aGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdQT1NUJyB8fCBtZXRob2QgPT09ICdQVVQnIHx8IG1ldGhvZCA9PT0gJ1BBVENIJyB8fCBtZXRob2QgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IEpTT04uc3RyaW5naWZ5KGV4dGVuZEdlbmVyYWxQYXJhbXMod3JhcE9iaihhcmdzLCBwcmVmaXgpKSk7XG4gICAgICAgICAgY2xpZW50Lm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgICAgIC8vIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgY2xpZW50LnNlbmQodXJpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IHNlcmlhbGl6ZShleHRlbmRHZW5lcmFsUGFyYW1zKGFkZFByZWZpeFRvT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCArICc/JyArIHVyaSk7XG4gICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbGllbnQub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVzb2x2ZVwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZXF1YWwgdG8gMnh4XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZWplY3RcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGRpZmZlcmVudCB0aGFuIDJ4eFxuICAgICAgICAgICAgcmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBSZXR1cm4gdGhlIHByb21pc2VcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgfTtcblxuICAvLyBBZGFwdGVyIHBhdHRlcm5cbiAgcmV0dXJuIHtcbiAgICAnZ2V0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdHRVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncG9zdCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUE9TVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwdXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BVVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwYXRjaCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUEFUQ0gnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAnZGVsZXRlJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdERUxFVEUnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRHZW5lcmFsUGFyYW1zKG9iaikge1xuICBsZXQgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICBsZXQgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpO1xuICBsZXQgZ2VuZXJhbE9iaiA9IHt9O1xuICBnZW5lcmFsT2JqLnV0ZjggPSAn4pyTJztcbiAgZ2VuZXJhbE9ialtjc3JmUGFyYW1dID0gY3NyZlRva2VuO1xuICByZXR1cm4gbWVyZ2VPYmoob2JqLCBnZW5lcmFsT2JqKTtcbn1cbi8vIEVuZCBBXG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9hamF4LmpzXG4gKiovIiwiLyoqXG4gKiBbc2VyaWFsaXplIGNvbnZlcnRzIHJlY3Vyc2l2ZSBvYmplY3RzXVxuICogQHBhcmFtICB7W3R5cGVdfSBvYmogICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBwcmVmaXggW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICogY29uc29sZS5sb2coc2VyaWFsaXplKHtmb286IFwiaGkgdGhlcmVcIiwgYmFyOiB7IGJsYWg6IDEyMywgcXV1eDogWzEsIDIsIDNdIH19KSk7XG4gKiBmb289aGklMjB0aGVyZSZiYXIlNUJibGFoJTVEPTEyMyZiYXIlNUJxdXV4JTVEJTVCMCU1RD0xJmJhciU1QnF1dXglNUQlNUIxJTVEPTImYmFyJTVCcXV1eCU1RCU1QjIlNUQ9M1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT0gJ29iamVjdCcgP1xuICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zZXJpYWxpemUuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gaXNFbXB0eShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbi8qIGNvbnNpZGVyIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqKG9iajEgPSB7fSwgb2JqMikge1xuICBsZXQgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmoxKSk7XG4gIGZvciAobGV0IGtleSBpbiBvYmoyKSB7XG4gICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmoyW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkUHJlZml4VG9PYmoob2JqLCBwcmVmaXgpIHtcbiAgaWYgKCFwcmVmaXgpIHJldHVybiBvYmo7XG4gIGxldCBuZXdPYmogPSB7fTtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqWycnICsgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nXSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBPYmoob2JqLCB3cmFwcGVyKSB7XG4gIGlmICghd3JhcHBlcikgcmV0dXJuIG9iajtcbiAgdmFyIG5ld09iaiA9IHt9O1xuICBuZXdPYmpbd3JhcHBlcl0gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW3dyYXBwZXJdW2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xuICBsZXQgdG1wRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsZS5pbm5lckhUTUwgPSBzdHI7XG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XG4gIHJldHVybiByZXR1cm5Eb207XG59XG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4vLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuLypcbnZhciBteUVmZmljaWVudEZuID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gIC8vIEFsbCB0aGUgdGF4aW5nIHN0dWZmIHlvdSBkb1xufSwgMjUwKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG15RWZmaWNpZW50Rm4pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanNcbiAqKi8iLCJpbXBvcnQge2h0bWxFc2NhcGV9IGZyb20gJy4vaHRtbEVzY2FwZSc7XG5leHBvcnQgZnVuY3Rpb24gaHRtbChsaXRlcmFsU2VjdGlvbnMsIC4uLnN1YnN0cykge1xuICAvLyBVc2UgcmF3IGxpdGVyYWwgc2VjdGlvbnM6IHdlIGRvbuKAmXQgd2FudFxuICAvLyBiYWNrc2xhc2hlcyAoXFxuIGV0Yy4pIHRvIGJlIGludGVycHJldGVkXG4gIGxldCByYXcgPSBsaXRlcmFsU2VjdGlvbnMucmF3O1xuXG4gIGxldCByZXN1bHQgPSAnJztcblxuICBzdWJzdHMuZm9yRWFjaCgoc3Vic3QsIGkpID0+IHtcbiAgICAvLyBSZXRyaWV2ZSB0aGUgbGl0ZXJhbCBzZWN0aW9uIHByZWNlZGluZ1xuICAgIC8vIHRoZSBjdXJyZW50IHN1YnN0aXR1dGlvblxuICAgIGxldCBsaXQgPSByYXdbaV07XG5cbiAgICAvLyBJbiB0aGUgZXhhbXBsZSwgbWFwKCkgcmV0dXJucyBhbiBhcnJheTpcbiAgICAvLyBJZiBzdWJzdGl0dXRpb24gaXMgYW4gYXJyYXkgKGFuZCBub3QgYSBzdHJpbmcpLFxuICAgIC8vIHdlIHR1cm4gaXQgaW50byBhIHN0cmluZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0KSkge1xuICAgICAgc3Vic3QgPSBzdWJzdC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc3Vic3RpdHV0aW9uIGlzIHByZWNlZGVkIGJ5IGEgZG9sbGFyIHNpZ24sXG4gICAgLy8gd2UgZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBpdFxuICAgIGlmIChsaXQuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgc3Vic3QgPSBodG1sRXNjYXBlKHN1YnN0KTtcbiAgICAgIGxpdCA9IGxpdC5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHJlc3VsdCArPSBsaXQ7XG4gICAgcmVzdWx0ICs9IHN1YnN0O1xuICB9KTtcbiAgLy8gVGFrZSBjYXJlIG9mIGxhc3QgbGl0ZXJhbCBzZWN0aW9uXG4gIC8vIChOZXZlciBmYWlscywgYmVjYXVzZSBhbiBlbXB0eSB0ZW1wbGF0ZSBzdHJpbmdcbiAgLy8gcHJvZHVjZXMgb25lIGxpdGVyYWwgc2VjdGlvbiwgYW4gZW1wdHkgc3RyaW5nKVxuICByZXN1bHQgKz0gcmF3W3Jhdy5sZW5ndGggLSAxXTsgLy8gKEEpXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBodG1sRXNjYXBlKHN0cikge1xuXHRzdHIgPSAnJyArIHN0cjsgLy8gZm9yIG51bWJlcnMgZXRjLlxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykgLy8gZmlyc3QhXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL2AvZywgJyYjOTY7Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qc1xuICoqLyIsImltcG9ydCB7ZGlzYWJsZVNjcm9sbCwgZW5hYmxlU2Nyb2xsfSBmcm9tICcuL3RvZ2dsZVNjcm9sbCc7XG5leHBvcnQgZnVuY3Rpb24gcG9wdXAoZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgbGV0IHBvcHVwRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBvcHVwRWxlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWxheWVyJyk7XG4gIHBvcHVwRWxlLmlubmVySFRNTCA9IGdlbmVyYXRlUG9wdXBUcGwoKTtcbiAgcG9zaXRpb25Qb3B1cEVsZShwb3B1cEVsZSwgZXYpO1xuICBiaW5kUG9wdXBFdmVudHMocG9wdXBFbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cEVsZSk7XG4gIGRpc2FibGVTY3JvbGwoKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVQb3B1cFRwbChkYXRhKSB7XG4gIGxldCB0cGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLXNoYWRvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBvcHVwLXRleHRcIj5BcmUgeW91IHN1cmUgdG8gZGVsZXRlIHRoaXMgQVBJPzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtYnRuc1wiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicG9wdXAtYnRuIHBvcHVwLWNhbmNlbC1idG5cIj5jYW5jZWw8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY29uZmlybS1idG5cIj5jb25maXJtPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHRgO1xuICByZXR1cm4gdHBsO1xufVxuXG5mdW5jdGlvbiBiaW5kUG9wdXBFdmVudHMoZWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbmZpcm0tYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maXJtLmJpbmQodGhpcywgZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykpO1xufVxuXG5mdW5jdGlvbiBjb25maXJtKGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvblBvcHVwRWxlKGVsZSwgY29vcmRpbmF0ZXMpIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbnRlbnQnKVswXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGVzLnBhZ2VYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMucGFnZVkgKyAncHgsIDApJztcbn1cblxuZnVuY3Rpb24gY2xvc2VQb3B1cChldikge1xuICBpZiAoZXYudGFyZ2V0ID09PSBldi5jdXJyZW50VGFyZ2V0KSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBhcmVudE5vZGUpO1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanNcbiAqKi8iLCIvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwLFxuLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XG52YXIga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICBpZiAoZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIC8vIG9sZGVyIEZGXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub253aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2Rlcm4gc3RhbmRhcmRcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBvbGRlciBicm93c2VycywgSUVcbiAgd2luZG93Lm9udG91Y2htb3ZlICA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2JpbGVcbiAgZG9jdW1lbnQub25rZXlkb3duICA9IHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbndoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9udG91Y2htb3ZlID0gbnVsbDtcbiAgZG9jdW1lbnQub25rZXlkb3duID0gbnVsbDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanNcbiAqKi8iLCJpbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXNoKGRhdGEsIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSkge1xuICBsZXQgZmxhc2hFbGUgPSBzdHJUb0RvbShmbGFzaFRwbChkYXRhKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmxhc2hFbGUpO1xuICBzZXRUaW1lb3V0KGRlc3RvcnkuYmluZChudWxsLCBmbGFzaEVsZSwgY2FsbGJhY2spLCAyMDAwKTtcbn1cblxuZnVuY3Rpb24gZmxhc2hUcGwoZGF0YSkge1xuICBsZXQgc3RyID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJmbGFzaC1sYXllciAke2RhdGEuZXJyb3IgPyAnZXJyb3InIDogJ3N1Y2Nlc3MnfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj4ke2RhdGEuZXJyb3IgfHwgZGF0YS5tZXNzYWdlfTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgICA7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIGRlc3RvcnkoZWxlLCBjYWxsYmFjaykge1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICB9KTtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ2JsaW5rJyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9mbGFzaC5qc1xuICoqLyIsIi8qKlxuICogd2lkdGggb2Ygc2luZ2xlIHN2ZyBwYXRoOiAzMHB4XG4gKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge2dldFRyYW5zbGF0ZVgsIHhociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBsZXQgdHBsID1cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYXBpLWluZm9cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktdXJpXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cIlwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBPU1RcIj5QT1NUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQQVRDSFwiPlBBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8bGFiZWw+c2VjdGlvbjo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS1zZWN0aW9uXCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIj5kZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS1kZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCIgZGF0YS1tZXRob2Q9XCIke3BhdGNoT3JQb3N0KGlzTmV3QXBpKX1cIiBkYXRhLWFjdGlvbj1cIi9hcGlzJHtzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpfVwiID4ke2lzTmV3QXBpID8gJ2NyZWF0ZScgOiAnc2F2ZSd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXRlc3RcIj50ZXN0PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtd3JhcHBlclwiPjxkaXYgY2xhc3M9XCJhcGktdHJlZS1mcmFtZVwiPjxzdmcgY2xhc3M9XCJhcGktc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvc3ZnPjwvZGl2PjxkaXYgY2xhc3M9XCJhcGktdHJlZVwiPjwvZGl2PjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1kYXRhXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlld3MtY29udHJvbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtcmF3XCI+cmF3PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhLWhpZ2hsaWdodFwiPnN5bnRheEhpZ2hsaWdodDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkYXRhLXByZXZpZXdcIj5wcmV2aWV3PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkYXRhLXZpZXcganNvblwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxudmFyIGxlYWZDb250ZW50VHBsID0gJzxpIGNsYXNzPVwicmVtb3ZlLWNoaWxkXCI+LTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYta2V5XCIgcGxhY2Vob2xkZXI9XCJrZXlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ2YWx1ZVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtcXVhbnRpdHlcIiBwbGFjZWhvbGRlcj1cInF1YW50aXR5XCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImFkZC1jaGlsZFwiPis8L2k+JztcblxudmFyIGluaXRSZWN0T2JqID0ge1xuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHdpZHRoOiAwLFxuICBoZWlnaHQ6IDBcbn07XG52YXIgcGVyU1ZHUGF0aFdpZHRoID0gMzA7XG52YXIgcm9vdE5vZGVXaWR0aCA9IHBlclNWR1BhdGhXaWR0aCArIDE1O1xuXG5mdW5jdGlvbiBwYXRjaE9yUG9zdChpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnUE9TVCcgOiAnUEFUQ0gnO1xufVxuZnVuY3Rpb24gc2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICcnIDogYC8ke2RhdGEuaWR9YDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSkge1xuICB2YXIgcGVyQXBpRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBlckFwaUVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Blci1hcGknKTtcbiAgcGVyQXBpRWxlLmRhdGFzZXQuaWQgPSBpc05ld0FwaSA/ICcnIDogZGF0YS5pZDtcbiAgcGVyQXBpRWxlLmlubmVySFRNTCA9IHBlckFwaVRwbChkYXRhLCBpc05ld0FwaSk7XG4gIHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUgPSBpc05ld0FwaSA/ICcnIDogZGF0YS51cmk7XG4gIHJldHVybiBwZXJBcGlFbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgdGhpcy5hcGlDb250YWluZXIgPSBjb250YWluZXJOb2RlO1xuXG4gIHRoaXMuYXBpQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSkpO1xuXG4gIHRoaXMuYXBpRWxlID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLWFwaScpWzBdO1xuICBcbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNBUEkoKTtcblxuICB0aGlzLmxlYWZJbmRleCA9IDE7XG5cbiAgdGhpcy4kYXBpVHJlZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZigwLCAxLCAwLCBpbml0UmVjdE9iaikpO1xuXG4gIHRoaXMuJGFwaVRyZWVGcmFtZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWZyYW1lJylbMF07XG5cbiAgdGhpcy5pbml0QXBpVHJlZSgpO1xuXG4gIHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcblxuICB0aGlzLmJpbmRFdmVudHNUb01SQ0UoKTtcblxuICB0aGlzLmFwaVJldHVybkRhdGEgPSAnJztcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5zdG9yZUFwaVJldHVybkRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9IGRhdGE7XG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5jbGljaygpO1xufTtcbkFwaURvbS5wcm90b3R5cGUuanNvblZpZXcgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHZhciAkcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICRwcmUuaW5uZXJIVE1MID0gZGF0YTtcbiAgdGhpcy4kZGF0YVZpZXcuaW5uZXJIVE1MID0gJyc7XG4gIHRoaXMuJGRhdGFWaWV3LmFwcGVuZENoaWxkKCRwcmUpO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5iaW5kRXZlbnRzVG9NUkNBUEkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgbmV3bHlDcmVhdGVkQXBpTm9kZSA9IHRoaXMuYXBpRWxlO1xuXG4gIHZhciAkYXBpU2F2ZSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXTtcbiAgdmFyICRhcGlVcmkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXTtcbiAgdmFyICRhcGlUZXN0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdGVzdCcpWzBdO1xuICB2YXIgJGFwaU1ldGhvZCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdO1xuXG4gIHZhciAkZGF0YVJhdyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1yYXcnKVswXTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWJlYXV0aWZ5JylbMF07XG4gIHZhciAkZGF0YUhpZ2hsaWdodCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1oaWdobGlnaHQnKVswXTtcbiAgdmFyICRkYXRhUHJldmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1wcmV2aWV3JylbMF07XG5cbiAgdGhpcy4kZGF0YVZpZXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtdmlldycpWzBdO1xuXG4gICRhcGlTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgfSk7XG5cbiAgJGFwaVRlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgeGhyKCRhcGlNZXRob2QudmFsdWUsICRhcGlVcmkudmFsdWUsIHRoaXMuc3RvcmVBcGlSZXR1cm5EYXRhLmJpbmQodGhhdCkpO1xuICB9KTtcblxuICAkZGF0YVJhdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KHRoaXMuYXBpUmV0dXJuRGF0YSk7XG4gIH0pO1xuXG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGJlYXV0aWZ5SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFIaWdobGlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldyhoaWdodGxpZ2h0SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFQcmV2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoJ1RoaXMgZmVhdHVyZSBoYXMgbm90IGJlZW4gYWNjb21wbGlzaGVkIHlldC4nKTtcbiAgfSk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUub3BlcmF0ZURhdGFSb290Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgYWRkTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgYWRkTWFyay5jbGFzc05hbWUgPSAnYWRkLWRhdGFyb290LWNoaWxkJztcbiAgYWRkTWFyay50ZXh0Q29udGVudCA9ICcrJztcbiAgYWRkTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICB0aGF0LmxlYWZJbmRleCArPSAxO1xuICAgICAgdmFyIHBhcmVudElkeCA9IDA7XG4gICAgICB2YXIgbm9kZUxldmVsID0gMDtcbiAgICAgIHRoYXQuYXBpVHJlZS5hZGQodGhhdC5sZWFmSW5kZXgsIHBhcmVudElkeCwgdGhhdC5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gICAgICB0aGF0LiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWR4LCB0aGF0LmxlYWZJbmRleCwgbm9kZUxldmVsLCBpbml0UmVjdE9iaikpO1xuICAgICAgdmFyIG9iaiA9IHRoYXQuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gICAgICB0aGF0LnN0eWxlTm9kZXMob2JqKTtcbiAgICAgIHRoYXQuYmluZEV2ZW50c1RvTVJDRSgpO1xuICAgIH0pO1xuICB0aGlzLiRhcGlUcmVlLmluc2VydEJlZm9yZShhZGRNYXJrLCB0aGlzLiRhcGlUcmVlLmZpcnN0Q2hpbGQpO1xuXG4gIHZhciBkZWxNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBkZWxNYXJrLmNsYXNzTmFtZSA9ICdkZWwtZGF0YXJvb3QtY2hpbGQnO1xuICBkZWxNYXJrLnRleHRDb250ZW50ID0gJy0nO1xuICBkZWxNYXJrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIC8qIHRoaXMgQVBJIGlzIGRlbGV0ZWQuICovXG5cbiAgICAgIC8vIHRoYXQuYXBpQ29udGFpbmVyLnJlbW92ZUNoaWxkKGV2LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKSk7XG4gICAgfSk7XG4gIHRoaXMuJGFwaVRyZWUuaW5zZXJ0QmVmb3JlKGRlbE1hcmssIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuaW5pdEFwaVRyZWUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hcGlUcmVlID0gbmV3IFRyZWUoMCk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoMSwgMCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gIHRoaXMub3BlcmF0ZURhdGFSb290Q2hpbGQoKTtcblxuICByZXR1cm4gdGhpcy5hcGlUcmVlO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5kZWxOb2RlID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBjdXJyZW50TGVhZiA9IGN0eC5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5sZWFmJyk7XG4gIHZhciBjdXJyZW50SWR4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIHBhcmVudElkeCA9ICgrY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudCA9PT0gMCkgPyAwIDogK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQ7XG5cbiAgdmFyIG5vZGVzQXJyID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGVzY2VuZGFudHMoY3VycmVudElkeCk7XG4gIHZhciBpZHhBcnIgPSBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKTtcbiAgdGhpcy5hcGlUcmVlLnJlbW92ZShjdXJyZW50SWR4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdGhpcy5yZW1vdmVOb2Rlc0Zyb21Eb20oaWR4QXJyKTtcblxuICBjb25zb2xlLmxvZyh0aGlzLmFwaVRyZWUpO1xuXG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkeCk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLnJlbW92ZU5vZGVzRnJvbURvbSA9IGZ1bmN0aW9uKGFycikge1xuICB2YXIgYWxsTGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgYWxsTGVhdmVzTGVuID0gYWxsTGVhdmVzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxMZWF2ZXNMZW47IGkrKykge1xuICAgIGlmIChhcnIuaW5kZXhPZigrYWxsTGVhdmVzW2ldLmRhdGFzZXQuaW5kZXgpICE9PSAtMSkge1xuICAgICAgdGhpcy4kYXBpVHJlZS5yZW1vdmVDaGlsZChhbGxMZWF2ZXNbaV0pO1xuICAgIH1cbiAgfTtcbn07XG5mdW5jdGlvbiBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKSB7XG4gIHZhciBub2Rlc0FyckxlbiA9IG5vZGVzQXJyLmxlbmd0aDtcbiAgdmFyIGlkeEFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzQXJyTGVuOyBpKyspIHtcbiAgICBpZHhBcnIucHVzaChub2Rlc0FycltpXS5ub2RlSWQpO1xuICB9O1xuICByZXR1cm4gaWR4QXJyO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxlYXZlcyA9IHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpO1xuICB2YXIgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDtcbiAgdmFyIG5ld2x5Q3JlYXRlZExlYWYgPSBsZWF2ZXNbbGVhdmVzTGVuIC0gMV07XG4gIHZhciAkYWRkQ2hpbGQgPSBuZXdseUNyZWF0ZWRMZWFmLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZC1jaGlsZCcpWzBdO1xuICAkYWRkQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHggPT4ge1xuICAgIHRoaXMuYWRkQ2hpbGQoY3R4KTtcbiAgfSk7XG5cbiAgdmFyICRyZW1vdmVDaGlsZCA9IG5ld2x5Q3JlYXRlZExlYWYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVtb3ZlLWNoaWxkJylbMF07XG4gICRyZW1vdmVDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eCA9PiB7XG4gICAgdGhpcy5kZWxOb2RlKGN0eCk7XG4gIH0pO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5zZXRQYXJlbnROb2RlVmFsID0gZnVuY3Rpb24oaWR4KSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBxdWV1ZSA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gIHZhciBxdWV1ZUxlbiA9IHF1ZXVlLl9uZXdlc3RJbmRleCAtIHF1ZXVlLl9vbGRlc3RJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSBsZWF2ZXMubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaWYgKCtsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCA9PT0gaWR4KSB7XG4gICAgICBpZiAocXVldWVMZW4gPiAwKSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnLS0tPic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZGV4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWwgKyAxO1xuXG4gIC8vIGFwaVRyZWUgb3BlcmF0aW9uXG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkZXgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaih0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpKTtcbiAgdmFyIGNoaWxkcmVuTm9kZXMgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChwYXJlbnRJZGV4KTtcblxuICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgcGVyTm9kZSBpbiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2goY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyTGVuID0gY2hpbGRyZW5JZHhBcnIubGVuZ3RoO1xuXG4gIGNsb25lZFJlY3RPYmoucmlnaHQgLT0gMzA7XG5cbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gPSBjaGlsZHJlbklkeEFyckxlbiA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSArIChjaGlsZHJlbklkeEFyckxlbiAtIDEpICogMjA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZGV4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZGV4KTtcblxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZCwgbm9kZUluZGV4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcsIHBhcmVudElkKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jywgbm9kZUluZGV4KTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWxldmVsJywgbm9kZUxldmVsKTtcbiAgbmV3TGVhZlNwYW4uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBNYXRoLnJvdW5kKHJlY3RPYmoud2lkdGggKiBub2RlTGV2ZWwgKyBwZXJTVkdQYXRoV2lkdGggKiBub2RlTGV2ZWwpICsgJ3B4LCAnICsgTWF0aC5yb3VuZChyZWN0T2JqLmJvdHRvbSkgKyAncHgsIDApJztcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZkNvbnRlbnRUcGw7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxlYWYocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIG5ld0xlYWYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikpO1xuICByZXR1cm4gbmV3TGVhZjtcbn1cbkFwaURvbS5wcm90b3R5cGUuc3R5bGVOb2RlcyA9IGZ1bmN0aW9uKHN0eWxlT2JqKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBsZWFmSWR4LCBvZmZzZXRZLCBvcmlnaW5hbFggPSAnJztcblxuICB2YXIgc3R5bGVzQXJyID0gW10sIHhWYWx1ZSwgeVZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVhdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3JpZ2luYWxYID0gZ2V0VHJhbnNsYXRlWChsZWF2ZXNbaV0pO1xuICAgIGxlYWZJZHggPSArKGxlYXZlc1tpXS5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAodmFyIHN0eWxlT2JqSWR4IGluIHN0eWxlT2JqKSB7XG4gICAgICBpZiAoK3N0eWxlT2JqSWR4ID09PSBsZWFmSWR4KSB7XG4gICAgICAgIG9mZnNldFkgPSBzdHlsZU9ialtzdHlsZU9iaklkeF0gKiA1MjtcbiAgICAgIH07XG4gICAgfVxuICAgIHN0eWxlc0Fyci5wdXNoKFtvcmlnaW5hbFgsIG9mZnNldFldKTtcbiAgfTtcblxuICBmb3IgKHZhciBqID0gMCwgc3R5bGVzQXJyTGVuID0gc3R5bGVzQXJyLmxlbmd0aDsgaiA8IHN0eWxlc0FyckxlbjsgaisrKSB7XG4gICAgbGVhdmVzW2pdLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgc3R5bGVzQXJyW2pdWzBdICsgJ3B4LCAnICsgc3R5bGVzQXJyW2pdWzFdICsgJ3B4LCAwKSc7XG4gIH1cblxuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5hZGRTaWJsaW5nID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWw7XG4gIHBhcmVudElkeCA9ICgrcGFyZW50SWR4ID09PSAwKSA/IDAgOiBwYXJlbnRJZHg7XG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB2YXIgcmVjdE9iaiA9IHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSk7XG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHJlY3RPYmopO1xuICBjbG9uZWRSZWN0T2JqLnJpZ2h0ID0gY2xvbmVkUmVjdE9iai5yaWdodCAtIGNsb25lZFJlY3RPYmoud2lkdGg7XG4gIGNsb25lZFJlY3RPYmouYm90dG9tICs9IDMwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWR4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcblxufTtcblxuLyogdXRpbHMgKi9cbmZ1bmN0aW9uIGNsb25lUmVjdE9iaihvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9iai50b3AsXG4gICAgYm90dG9tOiBvYmouYm90dG9tLFxuICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgd2lkdGg6IG9iai53aWR0aCxcbiAgICBoZWlnaHQ6IG9iai5oZWlnaHRcbiAgfTtcbn1cblxuLyogbWFuaXB1bGF0ZSBTVkcgKi9cbkFwaURvbS5wcm90b3R5cGUuY2xlYXJTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF07XG4gIHdoaWxlIChzdmcubGFzdENoaWxkKSB7XG4gICAgc3ZnLnJlbW92ZUNoaWxkKHN2Zy5sYXN0Q2hpbGQpO1xuICB9XG59O1xuLyoqXG4gKiBbZHJhd1NWRyBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5BcGlEb20ucHJvdG90eXBlLmRyYXdTVkcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclNWRygpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBzdmdQYXJ0aWFscyA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBzdmdQYXJ0aWFscy5wdXNoKHRoYXQuY3JlYXRlU2luZ2xlU1ZHKG5vZGUuZGF0YSwgbm9kZS5jb2x1bW4sIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsLCAobm9kZS50b3RhbG9mZnNldHlsZXZlbCAtIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsKSkpO1xuICAgIH07XG4gIH07XG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZURGKGNhbGxiYWNrKTtcblxuICB2YXIgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdmdQYXJ0aWFscy5sZW5ndGg7IGkrKykge1xuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoc3ZnUGFydGlhbHNbaV0pO1xuICB9XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF0uYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuY3JlYXRlU2luZ2xlU1ZHID0gZnVuY3Rpb24oaWR4LCBob3JpLCBwYXJlbnRWZXJ0LCBkdmVydCkge1xuXG4gIHZhciBzdmducyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIHZhciBuZXdQYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z25zLCAncGF0aCcpO1xuICB2YXIgY29udHJvbFJhdGUgPSAwLjI7XG4gIHZhciBteCwgbXksIHF4LCBxeSwgcXh4LCBxeXksIHR4LCB0eTtcbiAgaG9yaSA9IGhvcmkgLSAxO1xuICBkdmVydCA9IGR2ZXJ0O1xuICBwYXJlbnRWZXJ0ID0gcGFyZW50VmVydDtcblxuICBteCA9IGhvcmkgKiA1MDE7XG4gIG15ID0gcGFyZW50VmVydCAqIDUyICsgODtcbiAgcXggPSBteCArIDEwO1xuICBxeSA9IG15O1xuICBxeHggPSBteCArIDE1O1xuICBxeXkgPSAobXkgKyAoZHZlcnQgLyAyKSAqIDUyKTtcbiAgdHggPSBteCArIDMwO1xuICB0eSA9IG15ICsgZHZlcnQgKiA1MjtcblxuICBuZXdQYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgJ00gJyArIG14ICsgJyAnICsgbXkgKyAnIFEgJyArIHF4ICsgJyAnICsgcXkgKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF4eCArICcgJyArIHF5eSArICcgVCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCArICcgJyArIHR5ICsgJycpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXBpLXN2Zy1wYXRoJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdkYXRhLWlkeCcsIGlkeCk7XG5cbiAgcmV0dXJuIG5ld1BhdGg7XG59O1xuXG4vKiBjYWxjdWxhdGUgZGltZW5zaW9ucyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jYWxjRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaG9yaU1heCwgdmVydGljYWxNYXgsIGhvcmlBcnIgPSBbXSwgdmVydEFyciA9IFtdO1xuXG4gIGhvcmlBcnIgPSB0aGlzLmFwaVRyZWUuZGVwdGgoKTtcbiAgaG9yaU1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhvcmlBcnIpO1xuICB2ZXJ0aWNhbE1heCA9IHRoaXMuYXBpVHJlZS5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUud2lkdGggPSBob3JpTWF4ICogNTIwICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgKyAncHgnO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcblxufTtcblxuLyogY2FsY3VsYXRlIG9mZnNldCAqL1xuXG5BcGlEb20ucHJvdG90eXBlLm5vZGVMZWZ0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpIHtcbiAgdmFyIGVsUmVjdE9iamVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgYm9keVJlY3RPYmogPSB0aGlzLiRhcGlUcmVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgY2xvbmVCb2R5UmVjdE9iaiA9IGNsb25lUmVjdE9iaihib2R5UmVjdE9iaik7XG4gIHZhciBjbG9uZUVsUmVjdE9iamVjdCA9IGNsb25lUmVjdE9iaihlbFJlY3RPYmplY3QpO1xuICBjbG9uZUVsUmVjdE9iamVjdC50b3AgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5ib3R0b20gKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5sZWZ0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnJpZ2h0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIHJldHVybiBjbG9uZUVsUmVjdE9iamVjdDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzXG4gKiovIiwiLyoqXG4gKiBbVHJlZSBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqXG4gKiBfcm9vdCBwb2ludHMgdG8gdGhlIHJvb3Qgbm9kZSBvZiBhIHRyZWUuXG4gKiB0cmF2ZXJzZURGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggREZTLlxuICogdHJhdmVyc2VCRihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIEJGUy5cbiAqIGNvbnRhaW5zKGRhdGEsIHRyYXZlcnNhbCkgc2VhcmNoZXMgZm9yIGEgbm9kZSBpbiBhIHRyZWUuXG4gKiBhZGQoZGF0YSwgdG9EYXRhLCB0cmF2ZXJzZSkgYWRkcyBhIG5vZGUgdG8gYSB0cmVlLlxuICogcmVtb3ZlKGNoaWxkLCBwYXJlbnQpIHJlbW92ZXMgYSBub2RlIGluIGEgdHJlZS5cbiAqXG4gKi9cbmltcG9ydCB7UXVldWV9IGZyb20gJy4vcXVldWUnO1xuZXhwb3J0IGZ1bmN0aW9uIFRyZWUoZGF0YSkge1xuICB2YXIgbm9kZSA9IG5ldyBOb2RlKGRhdGEpO1xuICB0aGlzLl9yb290ID0gbm9kZTtcbn1cblxuZnVuY3Rpb24gTm9kZShub2RlSWQpIHtcbiAgdGhpcy5ub2RlSWQgPSBub2RlSWQ7IC8vIGxlYWYgaW5kZXgsIHN0YXJ0cyBmcm9tIDAocm9vdCBub2RlKVxuICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgLy8gYWRkZWQgbGF0ZXJcbiAgdGhpcy5jaGlsZHJlbmxldmVsID0gMTsgLy8gcm93cyBvZiBkZXNjZW5kYW50cyBvZiBjdXJyZW50IG5vZGVcbiAgdGhpcy5jb2x1bW4gPSAwOyAvLyB3aGljaCBjb2x1bW4gdGhlIGN1cnJlbnQgbm9kZSBzaXRzIGluLCBzdGFydHMgZnJvbSAwKCByb290IG5vZGUgc2l0cyBpbilcbiAgdGhpcy50b3RhbG9mZnNldHlsZXZlbCA9IDA7IC8vIHRvdGFsIHZlcnRpY2FsIG9mZnNldCB0byB0aGUgY3VycmVudCB0cmVlIFxufVxuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyB0aGlzIGlzIGEgcmVjdXJzZSBhbmQgaW1tZWRpYXRlbHktaW52b2tpbmcgZnVuY3Rpb25cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoY3VycmVudE5vZGUpIHtcbiAgICAvLyBzdGVwIDJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHN0ZXAgM1xuICAgICAgcmVjdXJzZShjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgLy8gc3RlcCA0XG4gICAgY2FsbGJhY2soY3VycmVudE5vZGUpO1xuXG4gICAgLy8gc3RlcCAxXG4gIH0pKHRoaXMuX3Jvb3QpO1xuXG59O1xuXG4vLyBmb3IgdGhvc2Ugbm9kZXMgd2hvIGhhdmUgY2hpbGRyZW5cbmZ1bmN0aW9uIGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSB7XG4gIHZhciB0b3RhbENoaWxkcmVuTGV2ZWxzID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgdG90YWxDaGlsZHJlbkxldmVscyArPSBub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbENoaWxkcmVuTGV2ZWxzO1xufVxuVHJlZS5wcm90b3R5cGUuY2FsY0NoaWxkcmVuTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGUuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSA6IDE7XG4gICAgbm9kZS5jb2x1bW4gPSBub2RlLnBhcmVudCA/IChub2RlLnBhcmVudC5jb2x1bW4gKyAxKSA6IDA7XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbn07XG5cbmZ1bmN0aW9uIGNhbGNPZmZZKGFyciwgZGF0YSkge1xuICB2YXIgbm9kZUlkeCA9IGZpbmRJbmRleChhcnIsIGRhdGEpO1xuICB2YXIgdG90YWxZID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlSWR4OyBpKyspIHtcbiAgICB0b3RhbFkgKz0gYXJyW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbFk7XG59XG5cblRyZWUucHJvdG90eXBlLmNhbGNUb3RhbE9mZnNldFlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGV2ZWxnYXAgPSAwO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBub2RlLnRvdGFsb2Zmc2V0eWxldmVsID0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwgKyBjYWxjT2ZmWShub2RlLnBhcmVudC5jaGlsZHJlbiwgbm9kZS5ub2RlSWQpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblxuICAgIH07XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxufTtcblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VCRiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXG4gIHF1ZXVlLmVucXVldWUodGhpcy5fcm9vdCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY3VycmVudFRyZWUpO1xuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0cmF2ZXJzYWwpIHtcbiAgdHJhdmVyc2FsLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcblxuVHJlZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZGF0YSwgdG9EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IHRvRGF0YSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhZGQgbm9kZSB0byBhIG5vbi1leGlzdGVudCBwYXJlbnQuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhLCBmcm9tRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciB0cmVlID0gdGhpcyxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjaGlsZFRvUmVtb3ZlID0gbnVsbCxcbiAgICAgIGluZGV4O1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5ub2RlSWQgPT09IGZyb21EYXRhKSB7XG4gICAgICBwYXJlbnQgPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBpbmRleCA9IGZpbmRJbmRleChwYXJlbnQuY2hpbGRyZW4sIGRhdGEpO1xuXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSB0byByZW1vdmUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZG9lcyBub3QgZXhpc3QuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG5cbiAgcmV0dXJuIGNoaWxkVG9SZW1vdmU7XG59O1xuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBkYXRhKSB7XG4gIHZhciBpbmRleDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0ubm9kZUlkID09PSBkYXRhKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKiB0cmVlIGFkZG9uKi9cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEaXJlY3RDaGlsZCA9IGZ1bmN0aW9uKG5vZGVkYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICBwYXJlbnQgPSBudWxsLFxuICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZUlkID09PSBub2RlZGF0YSkge1xuICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShwYXJlbnQuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsYmFjayhwYXJlbnQpO1xuICAgIHBhcmVudCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufTtcblRyZWUucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlT2JqID0ge307XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzdHlsZU9ialtub2RlLm5vZGVJZF0gPSBub2RlLnRvdGFsb2Zmc2V0eWxldmVsO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG4gIHJldHVybiBzdHlsZU9iajtcbn07XG5cbi8qKlxuICogW3RyYXZlcnNlRGVzY2VuZGFudHMgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbaW50ZWdlcl19IG5vZGVEYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1thcnJheV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURlc2NlbmRhbnRzID0gZnVuY3Rpb24obm9kZURhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVEYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHF1ZXVlLmVucXVldWUocGFyZW50KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIHZhciBkZXNjZW5kYW50c0FyciA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGRlc2NlbmRhbnRzQXJyLnB1c2goY3VycmVudFRyZWUpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cblxuICByZXR1cm4gZGVzY2VuZGFudHNBcnI7XG59O1xuXG4vKiB0cmVlIGRlcHRoICovXG5UcmVlLnByb3RvdHlwZS5kZXB0aCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZGVwdGhBcnIgPSBbXTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCBkZXB0aCA9IDA7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICB3aGlsZSAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgZGVwdGggKz0gMTtcbiAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50O1xuICAgICAgfVxuICAgICAgZGVwdGhBcnIucHVzaChkZXB0aCk7XG4gICAgfVxuICB9O1xuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuICByZXR1cm4gZGVwdGhBcnI7XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanNcbiAqKi8iLCIvKipcbiAqIFtRdWV1ZSBkZXNjcmlwdGlvbl1cbiAqIGVucXVldWUoZGF0YSkgYWRkcyBkYXRhIHRvIGEgcXVldWUuXG4gKiBkZXF1ZXVlIHJlbW92ZXMgdGhlIG9sZGVzdCBhZGRlZCBkYXRhIHRvIGEgcXVldWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgdGhpcy5fb2xkZXN0SW5kZXggPSAxO1xuICB0aGlzLl9uZXdlc3RJbmRleCA9IDE7XG4gIHRoaXMuX3N0b3JhZ2UgPSB7fTtcbn1cblxuUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25ld2VzdEluZGV4IC0gdGhpcy5fb2xkZXN0SW5kZXg7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5fc3RvcmFnZVt0aGlzLl9uZXdlc3RJbmRleF0gPSBkYXRhO1xuICB0aGlzLl9uZXdlc3RJbmRleCsrO1xufTtcblxuUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZGVzdEluZGV4ID0gdGhpcy5fb2xkZXN0SW5kZXgsXG4gICAgICBuZXdlc3RJbmRleCA9IHRoaXMuX25ld2VzdEluZGV4LFxuICAgICAgZGVsZXRlZERhdGE7XG5cbiAgaWYgKG9sZGVzdEluZGV4ICE9PSBuZXdlc3RJbmRleCkge1xuICAgIGRlbGV0ZWREYXRhID0gdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgZGVsZXRlIHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIHRoaXMuX29sZGVzdEluZGV4Kys7XG5cbiAgICByZXR1cm4gZGVsZXRlZERhdGE7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPZkFycmF5KG51bUFycmF5KSB7XG4gIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihjbGFzc05hbWUpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksIHByZWZpeCA9ICcnO1xuICBwcmVmaXggPSAodWEuaW5kZXhPZignY2hyb21lJykgPj0gMCB8fCB3aW5kb3cub3BlbkRhdGFiYXNlKSA/ICctd2Via2l0LScgOiAodWEuaW5kZXhPZignZmlyZWZveCcpID49IDApID8gJy1tb3otJyA6IHdpbmRvdy5vcGVyYSA/ICctby0nIDogKGRvY3VtZW50LmFsbCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPT09IC0xKSA/ICctbXMtJyA6ICcnO1xuICByZXR1cm4gcHJlZml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsKSB7XG4gIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuXG4gIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbiAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcblxuICByZXN1bHRzLnB1c2goMCk7XG4gIHJldHVybiByZXN1bHRzLnNsaWNlKDUsIDgpOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4vLyAgIC8vIGNocm9tZSB3b24ndCB1c2UgcHJlZml4XG4vLyAgIC8vIHZhciBzdHlsZV9hdHRyID0gYnJvd3NlclByZWZpeCgpICsgJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciBzdHlsZV9hdHRyID0gJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZV9hdHRyKTtcbi8vICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuLy8gICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4vLyAgIGlmIChyZXN1bHRzWzFdID09PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuLy8gICByZXN1bHRzLnB1c2goMCk7XG4vLyAgIHJldHVybiArKHJlc3VsdHMuc2xpY2UoNSwgOClbMF0pOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykuc3BsaXQoJ3RyYW5zbGF0ZTNkJylbMV0uc3BsaXQoJywgJylbMF0uc2xpY2UoMSkuc3BsaXQoJ3B4JylbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVZKG9iaikge1xuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSB8fCBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICB2YXIgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICBpZiAobWF0KSByZXR1cm4gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbMTNdKTtcbiAgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgcmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cbi8qKlxuICogW3N0cmluZ2lmeSB3aXRoIDQgc3BhY2VzIGF0IGVhY2ggbGV2ZWxdXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCBcIlxcdFwiKTsgLy8gc3RyaW5naWZ5IHdpdGggdGFicyBpbnNlcnRlZCBhdCBlYWNoIGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWF1dGlmeUpTT04oanNPYmopIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXG4gKiBAcGFyYW0gIHtKU09OIG9iamVjdH0ganNvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaHRsaWdodEpTT04oanNvbikge1xuICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcbiAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICByZXR1cm4ganNvbi5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgdmFyIGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanNcbiAqKi8iLCJpbXBvcnQge21lcmdlT2JqfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmV4cG9ydCBmdW5jdGlvbiBjb2xsZWN0QXBpRGF0YShvcEVsZSkge1xuICBsZXQgcGVyQXBpRWxlID0gb3BFbGUuY2xvc2VzdCgnLnBlci1hcGknKTtcbiAgbGV0IGluZm9FbGUgPSBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWluZm8nKVswXTtcbiAgbGV0IHRyZWVFbGUgPSBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgcmV0dXJuIG1lcmdlT2JqKGNvbGxlY3RJbmZvKGluZm9FbGUpLCBjb2xsZWN0VHJlZSh0cmVlRWxlKSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RJbmZvKGluZm9FbGUpIHtcbiAgbGV0IGluZm9EYXRhID0ge307XG4gIGluZm9EYXRhID0ge1xuICAgICdzZWN0aW9uJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VjdGlvbicpWzBdLnZhbHVlLFxuICAgICd1cmknOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSxcbiAgICAnbWV0aG9kJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF0udmFsdWUsXG4gICAgJ2Rlc2NyaXB0aW9uJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktZGVzY3JpcHRpb24nKVswXS52YWx1ZVxuICB9O1xuXG4gIHJldHVybiBpbmZvRGF0YTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdFRyZWUodHJlZUVsZSkge1xuXHRsZXQgbGVhdmVzID0gW10uc2xpY2UuY2FsbCh0cmVlRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7IFxuICBsZXQgdHJlZURhdGFBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBsZWFmRGF0YTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYWZEYXRhID0ge307XG4gICAgbGVhZkRhdGEucGFyZW50SWQgPSBsZWF2ZXNbaV0uZGF0YXNldC5wYXJlbnQ7XG4gICAgbGVhZkRhdGEubm9kZUlkID0gbGVhdmVzW2ldLmRhdGFzZXQuaW5kZXg7XG4gICAgbGVhZkRhdGEua2V5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYta2V5JylbMF0udmFsdWU7XG4gICAgbGVhZkRhdGEudmFsdWUgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlO1xuICAgIGxlYWZEYXRhLnF1YW50aXR5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtcXVhbnRpdHknKVswXS52YWx1ZTtcbiAgICB0cmVlRGF0YUFyci5wdXNoKGxlYWZEYXRhKTtcbiAgfTtcbiAgdHJlZURhdGFPYmoubm9kZXMgPSB0cmVlRGF0YUFycjtcbiAgcmV0dXJuIHRyZWVEYXRhT2JqO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==