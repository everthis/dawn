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
	
	var _commonFlash = __webpack_require__(18);
	
	var _apiTreeTreeDom = __webpack_require__(14);
	
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
	    parseAndFlash(data);
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
	
	function parseAndFlash(data) {
	  var jsonData = JSON.parse(data);
	  (0, _commonFlash.flash)(jsonData);
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
	function newApiBtn() {
	  var newApiDiv = document.createElement('div');
	  var header = document.getElementsByTagName('header')[0];
	  newApiDiv.classList.add('new-api');
	  newApiDiv.innerHTML = '<input class="add-api-btn" type="button" value="new API">';
	  newApiDiv.children[0].addEventListener('click', function () {
	    var apiUl = document.getElementsByClassName('api-ul')[0];
	    var baseApiLi = (0, _commonUtilities.strToDom)(newApiLiTpl());
	    apiUl.insertBefore(baseApiLi, apiUl.firstChild);
	    addApiTree({}, baseApiLi, true);
	    toggleFoldLi(baseApiLi.children[0]);
	    baseApiLi.children[0].addEventListener('click', function (ev) {
	      bindEventToApiLiDescription.call(this, ev);
	    });
	  });
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
	    (0, _commonAjax.$http)(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)['delete'](params).then(callback.deleteSuccess)['catch'](callback.error);
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
	exports.ApiDom = ApiDom;
	
	var _tree = __webpack_require__(15);
	
	var _commonPopup = __webpack_require__(12);
	
	var _utilities = __webpack_require__(17);
	
	function perApiTpl(data) {
	  var isNewApi = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	  var tpl = '<div class="api-info">\n          <label class="api-label">API:</label>\n          <input class="api-uri" placeholder="" value="" /> \n          <label class="api-label">method:</label>\n          <select class="api-method">\n              <option value="GET" selected>GET</option>\n              <option value="POST">POST</option>\n              <option value="PATCH">PATCH</option>\n              <option value="DELETE">DELETE</option>\n          </select>\n          <label>section</label>\n          <input class="api-section" />\n          <span class="api-save" data-method="' + patchOrPost(isNewApi) + '" data-action="/apis' + saveOrCreate(data, isNewApi) + '" >' + (isNewApi ? 'create' : 'save') + '</span>\n          <span class="api-test">test</span>\n      </div>\n      <div class="api-tree-wrapper"><div class="api-tree-frame"><svg class="api-svg" width="100%" height="100%"></svg></div><div class="api-tree"></div></div>\n      <div class="api-data">\n          <div class="data-views-control">\n              <span class="data-raw">raw</span>\n              <span class="data-beautify">beautify</span>\n              <span class="data-highlight">syntaxHighlight</span>\n              <span class="data-preview">preview</span>\n          </div>\n          <div class="data-view json">\n          </div>\n      </div>';
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
	  newLeafSpan.style['transform'] = 'translate3d(' + Math.round(rectObj.right) + 'px, ' + Math.round(rectObj.bottom) + 'px, 0)';
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
/* 15 */
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
	
	var _queue = __webpack_require__(16);
	
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
/* 16 */
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
/* 17 */
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

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.flash = flash;
	
	var _utilities = __webpack_require__(9);
	
	function flash(data, callback) {
	  var flashEle = (0, _utilities.strToDom)(flashTpl(data));
	  document.body.appendChild(flashEle);
	  setTimeout(destory.bind(null, flashEle), 2000);
	}
	
	function flashTpl(data) {
	  var str = '\n\t\t<div class="flash-layer ' + (data.error ? 'error' : 'success') + '">\n\t\t\t<div class="message">' + (data.error || data.message) + '</div>\n\t\t</div>\n\t';
	  return str;
	}
	
	function destory(ele) {
	  ele.addEventListener('animationend', function () {
	    document.body.removeChild(ele);
	  });
	  ele.classList.add('blink');
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmU4Y2QyOTBjNGI4N2I4MzhhZjciLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3BvcHVwLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLWRvbS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7NkNDdEN3QixDQUFxQjs7NENBQzFCLENBQW9COztnREFFakIsQ0FBd0I7O0FBQzlDLG1DQUFXLENBQUM7Ozs7OztBQU1aLEVBQUMsWUFBTTtBQUNMLE9BQUksTUFBTSxHQUFHO0FBQ1gsUUFBRyx1QkFBTTtBQUNULFdBQU0sRUFBRSw4QkFBUztJQUNsQixDQUFDO0FBQ0YsT0FBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDeEMsT0FBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ25DLFNBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixJQUN2RSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pCLFlBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hELGVBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakM7TUFDRixNQUFNO0FBQ0wsYUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUM5QjtJQUNGO0VBRUYsR0FBRyxDOzs7Ozs7Ozs7Ozs7OytDQzNCdUIsQ0FBd0I7O0FBRTVDLFVBQVMsU0FBUyxHQUFHO0FBQzFCLFdBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQzVEOztBQUNELFVBQVMsZUFBZSxDQUFDLENBQUMsRUFBRTtBQUMxQixPQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdEIsT0FBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQ3hCLE9BQU87OztBQUdYLE9BQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUN4QyxNQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsMkNBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUNDZjRCLENBQWdCOzs7Ozs7Ozs7O0FBUXhDLFVBQVMsWUFBWSxDQUFDLElBQUksRUFBWTtPQUFWLEdBQUcseURBQUcsRUFBRTs7QUFDekMsT0FBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7T0FDbEMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtPQUM1QixNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUM7T0FDcEMsU0FBUyxHQUFHLHNCQUFJLFNBQVMsRUFBRTtPQUMzQixTQUFTLEdBQUcsc0JBQUksU0FBUyxFQUFFLENBQUM7QUFDOUIsT0FBSSxTQUFTLEdBQUc7QUFDZCxTQUFJLEVBQUUsSUFBSTtBQUNWLFdBQU0sRUFBRSxNQUFNO0FBQ2QsV0FBTSxFQUFFLE1BQU07QUFDZCxjQUFTLEVBQUUsU0FBUztBQUNwQixjQUFTLEVBQUUsU0FBUztJQUNyQixDQUFDO0FBQ0YsT0FBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6QyxrQkFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLGFBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztFQUNyQjs7QUFDRCxVQUFTLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQy9CLE9BQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkMsSUFBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLElBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLElBQUMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxPQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDakIsTUFBQyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7O0FBRUYsT0FBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QyxJQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxJQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsQ0FBQztBQUNqQyxJQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXRDLE9BQUksQ0FBQyxDQUFDO0FBQ04sT0FBSSxNQUFNLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFDOUIsTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQzlCLENBQUMsc0JBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNuQyxNQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxNQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQztBQUNoQyxNQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekMsTUFBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFDO0FBQ0QsSUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBWWpCLE9BQUksQ0FBQyxFQUFFO0FBQ0wsTUFBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0YsVUFBTyxDQUFDLENBQUM7RUFDVjs7QUFFRCxVQUFTLGVBQWUsQ0FBQyxJQUFJLEVBQUU7QUFDN0IsV0FBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDakM7QUFDRCxVQUFTLFVBQVUsQ0FBQyxJQUFJLEVBQUU7QUFDeEIsT0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7QUN0RVQsS0FBSSxTQUFTLEdBQUc7O0FBRXJCLFlBQVMsRUFBRTtZQUFNLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQUE7O0FBRXhGLFlBQVMsRUFBRTtZQUFNLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDO0lBQUE7O0FBRXhGLGdCQUFhLEVBQUUsMEJBQUcsRUFBSTtBQUNwQixTQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLGlCQUFZLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDbEMsU0FBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFNUMsU0FBSTtBQUNGLGdCQUFTLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQzs7QUFFckIsZ0JBQVMsQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQzs7Ozs7OztBQU9oQyxjQUFPLEVBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUM3RSxZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxLQUMvQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFFLENBQUM7TUFDbEQsQ0FBQyxPQUFPLENBQUMsRUFBRTs7QUFFVixjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0Y7RUFDRixDQUFDOzs7Ozs7Ozs7Ozs7OztxQ0M3QnFCLENBQVk7O0FBQzVCLFVBQVMsSUFBSSxHQUFHO0FBQ3RCLDJCQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNGWixVQUFTLFFBQVEsQ0FBQyxFQUFFLEVBQUU7QUFDcEIsT0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ25DLE9BQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNoQyxRQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN0QixRQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLE1BQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUN0QixNQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQ3JCOztBQUNNLFVBQVMsUUFBUSxHQUFHO0FBQ3pCLE9BQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQixPQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsT0FBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVDLE9BQUksU0FBUyxHQUFHLGlCQUFpQixDQUFDOztBQUVsQyxLQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQ3hDLE9BQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLFNBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFOztBQUUvRixTQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO01BQ3hDLE1BQU07QUFDTCxTQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO01BQ3JDO0FBQ0QsU0FBSSxHQUFHLENBQUMsU0FBUyxLQUFLLG9CQUFvQixFQUFFOztBQUUxQyxVQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztNQUN4QjtJQUNGLENBQUMsQ0FBQztBQUNILEtBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxFQUFFLEVBQUU7QUFDeEMsU0FBSSxFQUFFLENBQUMsU0FBUyxFQUFFO0FBQ2hCLFdBQUksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7QUFDdEYsV0FBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxNQUFNLEVBQUUsQ0FBQztNQUNYLE1BQU07QUFDTCxTQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUN6QixpQkFBVSxDQUFDLFlBQVc7O0FBRXBCLGlCQUFRLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUNQLENBQUM7SUFDSCxDQUFDLENBQUM7O0FBRUgsS0FBRSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFTLEVBQUUsRUFBRTtBQUMxQyxTQUFJLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFO0FBQ3RGLFNBQUUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7TUFDeEMsQ0FBQztBQUNGLFNBQUksRUFBRSxDQUFDLFNBQVMsS0FBSyxNQUFNLEVBQUU7QUFDM0IsU0FBRSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDekIsZUFBUSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzdDO0lBQ0YsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VDQ2xEZSxDQUFnQjs7MkNBQ2pCLEVBQW9COzt3Q0FDbkIsRUFBaUI7OzRDQUNELENBQXFCOzt3Q0FDckMsRUFBaUI7OzJDQUNoQixFQUFzQjs7QUFFM0MsS0FBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBQy9DLEtBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNqQixLQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLEtBQUksUUFBUSxHQUFHO0FBQ2IsZ0JBQWEsRUFBRSx1QkFBUyxJQUFJLEVBQUU7QUFDNUIsZUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEM7QUFDRCxvQkFBaUIsRUFBRSwyQkFBUyxJQUFJLEVBQUU7QUFDaEMsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixlQUFVLEVBQUUsQ0FBQztJQUNkO0FBQ0QsZUFBWSxFQUFFLHNCQUFTLElBQUksRUFBRTtBQUMzQixrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCO0FBQ0QsY0FBVyxFQUFFLHFCQUFTLElBQUksRUFBRTtBQUMxQixrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCO0FBQ0QsZ0JBQWEsRUFBRSx1QkFBUyxJQUFJLEVBQUU7QUFDNUIsa0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQjtBQUNELFVBQU8sRUFBRSxpQkFBUyxJQUFJLEVBQUU7QUFDdEIsWUFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQjtBQUNELFFBQUssRUFBRSxlQUFTLElBQUksRUFBRTtBQUNwQixrQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JCO0VBQ0YsQ0FBQzs7QUFDSyxVQUFTLE9BQU8sR0FBRztBQUN4QixhQUFVLEVBQUUsQ0FBQztBQUNiLFdBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7RUFDL0M7O0FBRUQsVUFBUyxhQUFhLENBQUMsSUFBSSxFQUFFO0FBQzNCLE9BQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsMkJBQU0sUUFBUSxDQUFDLENBQUM7QUFDaEIsVUFBTyxRQUFRLENBQUM7RUFDakI7O0FBRUQsVUFBUyxZQUFZLENBQUMsT0FBTyxFQUFFO0FBQzdCLFVBQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0VBQ3BDO0FBQ0QsVUFBUywyQkFBMkIsQ0FBQyxFQUFFLEVBQUU7QUFDdkMsZUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLE9BQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQzNCLFlBQU87SUFDUixDQUFDO0FBQ0YsMEJBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FDbkQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FDN0MsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDeEI7QUFDRCxVQUFTLFVBQVUsR0FBRztBQUNwQixPQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuRSxLQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsS0FBSyxFQUFFO0FBQ3JELFlBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBUyxFQUFFLEVBQUU7QUFDN0Msa0NBQTJCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztNQUM1QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjtBQUNELFVBQVMsVUFBVSxDQUFDLElBQUksRUFBTyxhQUFhLEVBQUUsUUFBUSxFQUFFO09BQXBDLElBQUksZ0JBQUosSUFBSSxHQUFHLEVBQUU7O0FBQzNCLE9BQUksTUFBTSxHQUFHLDJCQUFXLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkQsVUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUN0QjtBQUNELFVBQVMsU0FBUyxHQUFHO0FBQ25CLE9BQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsT0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELFlBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLFlBQVMsQ0FBQyxTQUFTLDhEQUE4RCxDQUFDO0FBQ2xGLFlBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVc7QUFDekQsU0FBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELFNBQUksU0FBUyxHQUFHLCtCQUFTLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDeEMsVUFBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELGVBQVUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hDLGlCQUFZLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BDLGNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQzNELGtDQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7TUFDNUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0gscUNBQVksU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLFVBQU8sU0FBUyxDQUFDO0VBQ2xCOztBQUVELFVBQVMsV0FBVyxHQUFZO09BQVgsSUFBSSx5REFBRyxFQUFFOztBQUM1QixPQUFJLEdBQUcsK0NBQzZCLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSwyTUFHbEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxVQUFVLHFEQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVywwQ0FHcEUsQ0FBQztBQUNGLFVBQU8sR0FBRyxDQUFDO0VBQ1o7QUFDRCxVQUFTLGFBQWEsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsT0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsT0FBTSxJQUFJLEdBQUcsU0FBUCxJQUFJLENBQUcsSUFBSTt1REFFWCxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQUk7MERBQ1gsV0FBVyxDQUFDLElBQUksQ0FBQztNQUNwQixDQUFDO0lBRUwsQ0FBQztBQUNGLE9BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxPQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9DLGFBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDM0MsYUFBVSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMscUNBQVksVUFBVSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7RUFDdEM7O0FBRUQsVUFBUyxVQUFVLEdBQUc7QUFDcEIsMEJBQU0sT0FBTyxDQUFDLENBQ2IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsU0FDM0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDeEI7O0FBRUQsVUFBUyxTQUFTLENBQUMsRUFBRSxFQUFFO0FBQ3JCLE9BQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQzVDLFNBQUksTUFBTSxHQUFHO0FBQ1gsZ0JBQVMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQzlFLFlBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ3RFLGVBQVEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO01BQzdFLENBQUM7QUFDRixTQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7QUFDdEQsOEJBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQzlELEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQ3RCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3hCLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxFQUFFO0FBQzVELDhCQUFNLE9BQU8sQ0FBQyxDQUNiLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFNBQ3JCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3hCO0lBQ0YsQ0FBQzs7QUFFRixPQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO0FBQ3RELDZCQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0FBQ0YsWUFBUyxTQUFTLENBQUMsRUFBRSxFQUFFO0FBQ3JCLFNBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO0FBQzdDLFNBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLGNBQU8sSUFBSSxDQUFDO01BQ2IsQ0FBQzs7QUFFRixTQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsNEJBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQ3hELENBQUMsTUFBTSxDQUFDLENBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FDdkIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NDQzlIcUIsQ0FBYTs7c0NBQ29CLENBQWE7O2lDQUN2QyxDQUFROztBQUVoQyxVQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUU7O0FBRXpCLE9BQUksSUFBSSxHQUFHOzs7QUFHVCxTQUFJLEVBQUUsY0FBUyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBTyxNQUFNLEVBQUU7V0FBbkIsSUFBSSxnQkFBSixJQUFJLEdBQUcsRUFBRTs7Ozs7QUFJbkMsV0FBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTSxFQUFFOzs7QUFHbEQsYUFBSSxNQUFNLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQzs7QUFFbEMsYUFBSSxNQUFNLEtBQUssTUFBTSxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFLLE9BQU8sSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQ3RGLGVBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsd0JBQVEsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxpQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7O0FBRXpCLGlCQUFNLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDNUQsaUJBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDbEIsTUFBTSxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUU7QUFDM0IsZUFBSSxHQUFHLEdBQUcsMEJBQVUsbUJBQW1CLENBQUMsK0JBQWUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxpQkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNyQyxpQkFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1VBQ2YsQ0FBQzs7QUFFRixlQUFNLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDekIsZUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTs7QUFFM0Msb0JBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEIsTUFBTTs7QUFFTCxtQkFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzQjtVQUNGLENBQUM7QUFDRixlQUFNLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDMUIsaUJBQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7VUFDM0IsQ0FBQztRQUNILENBQUMsQ0FBQzs7O0FBR0gsY0FBTyxPQUFPLENBQUM7TUFDaEI7SUFDRixDQUFDOzs7QUFHRixVQUFPO0FBQ0wsVUFBSyxFQUFFLGFBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUM1QixjQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7TUFDNUM7QUFDRCxXQUFNLEVBQUUsY0FBUyxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQzdCLGNBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztNQUM3QztBQUNELFVBQUssRUFBRSxhQUFTLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDNUIsY0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO01BQzVDO0FBQ0QsWUFBTyxFQUFFLGVBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUM5QixjQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7TUFDOUM7QUFDRCxhQUFRLEVBQUUsaUJBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUMvQixjQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7TUFDL0M7SUFDRixDQUFDO0VBQ0g7O0FBRUQsVUFBUyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUU7QUFDaEMsT0FBSSxTQUFTLEdBQUcsZ0JBQUksU0FBUyxFQUFFLENBQUM7QUFDaEMsT0FBSSxTQUFTLEdBQUcsZ0JBQUksU0FBUyxFQUFFLENBQUM7QUFDaEMsT0FBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLGFBQVUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLGFBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDbEMsVUFBTyx5QkFBUyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7RUFDbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyR00sVUFBUyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNyQyxPQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixRQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUNqQixTQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekIsV0FBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1dBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxVQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFFBQVEsR0FDM0IsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FDZixrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN4RDtJQUNGO0FBQ0QsVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCaEIsVUFBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQzNCLFVBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0VBQ3RDOztBQUNNLFVBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUM1QixVQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3hDOzs7O0FBRU0sVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFPLElBQUksRUFBRTtPQUFqQixJQUFJLGdCQUFKLElBQUksR0FBRyxFQUFFOztBQUNoQyxPQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM5QyxRQUFLLElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtBQUNwQixTQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDNUIsYUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUN6QjtJQUNGO0FBQ0QsVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFDTSxVQUFTLGNBQWMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO0FBQzFDLE9BQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDeEIsT0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFFBQUssSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO0FBQ25CLFNBQUksR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUMzQixhQUFNLENBQUMsRUFBRSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNsRDtJQUNGO0FBQ0QsVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFDTSxVQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLE9BQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDekIsT0FBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLFNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckIsUUFBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDbkIsU0FBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQzNCLGFBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7TUFDakM7SUFDRjtBQUNELFVBQU8sTUFBTSxDQUFDO0VBQ2Y7O0FBRU0sVUFBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQzVCLE9BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsU0FBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDdkIsT0FBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxVQUFPLFNBQVMsQ0FBQztFQUNsQjs7Ozs7Ozs7O0FBT00sVUFBUyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRTtBQUNsRCxnQkFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7dUNDbkRuRCxFQUFjOztBQUNoQyxVQUFTLElBQUksQ0FBQyxlQUFlLEVBQWE7OztBQUcvQyxPQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDOztBQUU5QixPQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O3FDQUx1QixNQUFNO0FBQU4sV0FBTTs7O0FBTzdDLFNBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFLOzs7QUFHM0IsU0FBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7OztBQUtqQixTQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDeEIsWUFBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDeEI7Ozs7QUFJRCxTQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDckIsWUFBSyxHQUFHLDRCQUFXLEtBQUssQ0FBQyxDQUFDO0FBQzFCLFVBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3hCO0FBQ0QsV0FBTSxJQUFJLEdBQUcsQ0FBQztBQUNkLFdBQU0sSUFBSSxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFDOzs7O0FBSUgsU0FBTSxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDOztBQUU5QixVQUFPLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNsQ1QsVUFBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQy9CLE1BQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQ2QsVUFBTyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7SUFDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FDckIsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FDckIsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FDdkIsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FDdEIsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7eUNDUE0sRUFBZ0I7O0FBQ25ELFVBQVMsS0FBSyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQzFDLE9BQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0MsV0FBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDdEMsV0FBUSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3hDLG1CQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMvQixrQkFBZSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELFdBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLHFDQUFlLENBQUM7RUFDakI7O0FBRUQsVUFBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDOUIsT0FBSSxHQUFHLHNXQVVQLENBQUM7QUFDRCxVQUFPLEdBQUcsQ0FBQztFQUNaOztBQUVELFVBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUNsRCxNQUFHLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3BGLE1BQUcsQ0FBQyxzQkFBc0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0VBQzdIOztBQUVELFVBQVMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUMxQyxXQUFRLEVBQUUsQ0FBQztBQUNYLFdBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2hDOztBQUVELFVBQVMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRTtBQUMxQyxNQUFHLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxjQUFjLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7RUFDN0k7O0FBRUQsVUFBUyxVQUFVLENBQUMsRUFBRSxFQUFFO0FBQ3RCLE9BQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFO0FBQ2xDLGFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMzQyxzQ0FBYyxDQUFDO0lBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUNILEtBQUksSUFBSSxHQUFHLEVBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBQyxDQUFDOztBQUV4QyxVQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUU7QUFDekIsSUFBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3RCLE9BQUksQ0FBQyxDQUFDLGNBQWMsRUFDaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLElBQUMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0VBQ3ZCOztBQUVELFVBQVMsMkJBQTJCLENBQUMsQ0FBQyxFQUFFO0FBQ3RDLE9BQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNuQixtQkFBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLFlBQU8sS0FBSyxDQUFDO0lBQ2Q7RUFDRjs7QUFFTSxVQUFTLGFBQWEsR0FBRztBQUM5QixPQUFJLE1BQU0sQ0FBQyxnQkFBZ0I7QUFDdkIsV0FBTSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyRSxTQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztBQUNoQyxTQUFNLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzdELFNBQU0sQ0FBQyxXQUFXLEdBQUksY0FBYyxDQUFDO0FBQ3JDLFdBQVEsQ0FBQyxTQUFTLEdBQUksMkJBQTJCLENBQUM7RUFDbkQ7O0FBRU0sVUFBUyxZQUFZLEdBQUc7QUFDN0IsT0FBSSxNQUFNLENBQUMsbUJBQW1CLEVBQzFCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEUsU0FBTSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUNuRCxTQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUN0QixTQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUMxQixXQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7Ozs7OztBQ2pDNUIsYUFBWSxDQUFDOzs7Ozs7aUNBQ00sRUFBUTs7d0NBQ1AsRUFBaUI7O3NDQUMwQixFQUFhOztBQUU1RSxVQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQW9CO09BQWxCLFFBQVEseURBQUcsS0FBSzs7QUFDdkMsT0FBSSxHQUFHLDZrQkFhdUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyw0QkFBdUIsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsWUFBTSxRQUFRLEdBQUcsUUFBUSxHQUFHLE1BQU0scW5CQWE3SSxDQUFDO0FBQ1osVUFBTyxHQUFHLENBQUM7RUFDWjs7QUFFRCxLQUFJLGNBQWMsR0FBRywrQkFBK0IsR0FDL0IsMERBQTBELEdBQzFELDZCQUE2QixHQUM3Qiw4REFBOEQsR0FDOUQsNkJBQTZCLEdBQzdCLGlFQUFpRSxHQUNqRSw0QkFBNEIsQ0FBQzs7QUFFbEQsS0FBSSxXQUFXLEdBQUc7QUFDaEIsUUFBSyxFQUFFLENBQUM7QUFDUixTQUFNLEVBQUUsQ0FBQztBQUNULE9BQUksRUFBRSxDQUFDO0FBQ1AsTUFBRyxFQUFFLENBQUM7QUFDTixRQUFLLEVBQUUsQ0FBQztBQUNSLFNBQU0sRUFBRSxDQUFDO0VBQ1YsQ0FBQzs7QUFFRixVQUFTLFdBQVcsQ0FBQyxRQUFRLEVBQUU7QUFDN0IsVUFBTyxRQUFRLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQztFQUNwQztBQUNELFVBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDcEMsVUFBTyxRQUFRLEdBQUcsRUFBRSxTQUFPLElBQUksQ0FBQyxFQUFJLENBQUM7RUFDdEM7QUFDRCxVQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLE9BQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDOUMsWUFBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDM0MsWUFBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsUUFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQy9DLFlBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCxZQUFTLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNoRixVQUFPLFNBQVMsQ0FBQztFQUNsQjs7QUFFTSxVQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRTtBQUNwRCxPQUFJLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQzs7QUFFbEMsT0FBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDOztBQUU1RCxPQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJFLE9BQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDOztBQUUxQixPQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7QUFFbkIsT0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLE9BQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUV2RSxPQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0UsT0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztBQUVuQixPQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXRCLE9BQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOztBQUV4QixPQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztFQUN6Qjs7QUFFRCxPQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQ25ELE9BQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0FBQzFCLE9BQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7RUFDNUIsQ0FBQztBQUNGLE9BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsSUFBSSxFQUFFO0FBQ3pDLE9BQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsT0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsT0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQzlCLE9BQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBRWxDLENBQUM7QUFDRixPQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLFlBQVc7OztBQUMvQyxPQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsT0FBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUV0QyxPQUFJLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RSxPQUFJLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2RSxPQUFJLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN6RSxPQUFJLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0UsT0FBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekUsT0FBSSxDQUFDLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRixPQUFJLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JGLE9BQUksWUFBWSxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqRixPQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUU1RSxXQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFLEVBQy9DLENBQUMsQ0FBQzs7QUFFSCxXQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUUsRUFBSTtBQUN2Qyx5QkFBSSxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBSyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUM7O0FBRUgsV0FBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFFLEVBQUk7QUFDdkMsV0FBSyxRQUFRLENBQUMsTUFBSyxhQUFhLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUM7O0FBRUgsT0FBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBRSxFQUFJO0FBQ2pELFdBQUssUUFBUSxDQUFDLDZCQUFhLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQyxDQUFDOztBQUVILGlCQUFjLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUUsRUFBSTtBQUM3QyxXQUFLLFFBQVEsQ0FBQywrQkFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQUssYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUMsQ0FBQzs7QUFFSCxlQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUUsRUFBSTtBQUMzQyxXQUFLLFFBQVEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0lBQzlELENBQUMsQ0FBQztFQUVKLENBQUM7O0FBRUYsT0FBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsR0FBRyxZQUFXO0FBQ2pELE9BQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixPQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzdDLFVBQU8sQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUM7QUFDekMsVUFBTyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDMUIsVUFBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLEVBQUUsRUFBRTtBQUMzQyxTQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztBQUNwQixTQUFJLFNBQVMsR0FBRyxZQUFZLENBQUM7QUFDN0IsU0FBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXJFLFNBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUN6RixTQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3BDLFNBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsU0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFDO0FBQ0wsT0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRTlELE9BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsVUFBTyxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztBQUN6QyxVQUFPLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUMxQixVQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFOzs7O0lBSTVDLENBQUMsQ0FBQztBQUNMLE9BQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBRS9ELENBQUM7O0FBRUYsT0FBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsWUFBVztBQUN4QyxPQUFJLENBQUMsT0FBTyxHQUFHLGVBQVMsWUFBWSxDQUFDLENBQUM7QUFDdEMsT0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUUzRCxPQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzs7QUFFNUIsVUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0VBQ3JCLENBQUM7O0FBRUYsT0FBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDdkMsT0FBSSxXQUFXLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckQsT0FBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzdELE9BQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDOztBQUVsSSxPQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVELE9BQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hDLE9BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwRSxPQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRWhDLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEMsT0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixPQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7RUFFbEMsQ0FBQztBQUNGLE9BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDbEQsT0FBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN6RixPQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ3BDLFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsU0FBSSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNuRCxXQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN6QztJQUNGLENBQUM7RUFDSCxDQUFDO0FBQ0YsVUFBUyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7QUFDbEMsT0FBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxPQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDaEIsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyxXQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0FBQ0YsVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFFRCxPQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixHQUFHLFlBQVc7OztBQUM3QyxPQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFELE9BQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDOUIsT0FBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdDLE9BQUksU0FBUyxHQUFHLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLFlBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsYUFBRyxFQUFJO0FBQ3pDLFlBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQzs7QUFFSCxPQUFJLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RSxlQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGFBQUcsRUFBSTtBQUM1QyxZQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUM7RUFFSixDQUFDO0FBQ0YsT0FBTSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUNoRCxPQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLE9BQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEQsT0FBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3ZELFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDN0MsU0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUNwQyxXQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUU7QUFDaEIsZUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDbEUsTUFBTTtBQUNMLGVBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzlELENBQUM7QUFDRixhQUFNO01BQ1AsQ0FBQztJQUNILENBQUM7RUFDSCxDQUFDO0FBQ0YsT0FBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDeEMsT0FBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7QUFDcEIsT0FBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzdELE9BQUksU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7OztBQUdoRSxPQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUV0RSxPQUFJLGFBQWEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDcEYsT0FBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFakUsT0FBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLFFBQUssSUFBSSxPQUFPLElBQUksYUFBYSxDQUFDLFFBQVEsRUFBRTtBQUMxQyxTQUFLLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNyRyxxQkFBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQzNELENBQUM7SUFDSDs7QUFFRCxPQUFJLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUM7O0FBRTlDLGdCQUFhLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzs7QUFFMUIsZ0JBQWEsQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLEtBQUssQ0FBQyxHQUNyQixhQUFhLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQ3ZFLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDNUgsT0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQzVGLE9BQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0FBQ3hCLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEMsT0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixPQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7RUFFbkMsQ0FBQzs7QUFFRixVQUFTLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUNqRSxPQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pELGNBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLGNBQVcsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xELGNBQVcsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2xELGNBQVcsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2xELGNBQVcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDN0gsY0FBVyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFDdkMsVUFBTyxXQUFXLENBQUM7RUFDcEI7QUFDRCxVQUFTLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFDMUQsT0FBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDaEQsVUFBTyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQzlFLFVBQU8sT0FBTyxDQUFDO0VBQ2hCO0FBQ0QsT0FBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBUyxRQUFRLEVBQUU7QUFDL0MsT0FBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN0RixPQUFJLE9BQU87T0FBRSxPQUFPO09BQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFckMsT0FBSSxTQUFTLEdBQUcsRUFBRTtPQUFFLE1BQU07T0FBRSxNQUFNLENBQUM7O0FBRW5DLFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RDLGNBQVMsR0FBRyw4QkFBYyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyQyxZQUFPLEdBQUcsQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQU0sQ0FBQzs7QUFFckMsVUFBSyxJQUFJLFdBQVcsSUFBSSxRQUFRLEVBQUU7QUFDaEMsV0FBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLEVBQUU7QUFDNUIsZ0JBQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3RDLENBQUM7TUFDSDtBQUNELGNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDOztBQUVGLFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEUsV0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxjQUFjLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3ZHOztBQUVELE9BQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQzFDLE9BQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztFQUNoQixDQUFDO0FBQ0YsT0FBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDMUMsT0FBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7QUFDcEIsT0FBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBQzdELE9BQUksU0FBUyxHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUM1RCxZQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDeEQsT0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNyRSxPQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEUsT0FBSSxhQUFhLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzFDLGdCQUFhLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQztBQUNoRSxnQkFBYSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7QUFDM0IsT0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0FBQzNGLE9BQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDcEMsT0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUV0QixDQUFDOzs7QUFHRixVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTztBQUNMLFFBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztBQUNaLFdBQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtBQUNsQixTQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7QUFDZCxVQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7QUFDaEIsVUFBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO0FBQ2hCLFdBQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtJQUNuQixDQUFDO0VBQ0g7OztBQUdELE9BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFlBQVc7QUFDckMsT0FBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRSxVQUFPLEdBQUcsQ0FBQyxTQUFTLEVBQUU7QUFDcEIsUUFBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEM7RUFDRixDQUFDOzs7OztBQUtGLE9BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDcEMsT0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2hCLE9BQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixPQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsT0FBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQVksSUFBSSxFQUFFO0FBQzVCLFNBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEVBQUU7QUFDeEIsa0JBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBRSxDQUFDLENBQUM7TUFDekosQ0FBQztJQUNILENBQUM7QUFDRixPQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFbEMsT0FBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDaEQsUUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDM0MsWUFBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQztBQUNELE9BQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0VBRTlFLENBQUM7O0FBRUYsT0FBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsVUFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUU7O0FBRXhFLE9BQUksS0FBSyxHQUFHLDRCQUE0QixDQUFDO0FBQ3pDLE9BQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3RELE9BQUksV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN0QixPQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDckMsT0FBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7QUFDaEIsUUFBSyxHQUFHLEtBQUssQ0FBQztBQUNkLGFBQVUsR0FBRyxVQUFVLENBQUM7O0FBRXhCLEtBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLEtBQUUsR0FBRyxVQUFVLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN6QixLQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNiLEtBQUUsR0FBRyxFQUFFLENBQUM7QUFDUixNQUFHLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUNkLE1BQUcsR0FBSSxFQUFFLEdBQUksS0FBSyxHQUFHLENBQUMsR0FBSSxFQUFHLENBQUM7QUFDOUIsS0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFDYixLQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUM7O0FBRXJCLFVBQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFHLElBQUksR0FDbkQsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUN0QixFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN2RCxVQUFPLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztBQUM5QyxVQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFdEMsVUFBTyxPQUFPLENBQUM7RUFDaEIsQ0FBQzs7O0FBR0YsT0FBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsWUFBVztBQUMzQyxPQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDN0MsT0FBSSxPQUFPO09BQUUsV0FBVztPQUFFLE9BQU8sR0FBRyxFQUFFO09BQUUsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNyRCxRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4RCxZQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztBQUNGLFVBQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDeEMsY0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztBQUMvQyxPQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7QUFDdEQsT0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQzFELE9BQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDM0MsVUFBTyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztFQUUvQixDQUFDOzs7O0FBSUYsT0FBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsVUFBUyxFQUFFLEVBQUU7QUFDN0MsT0FBSSxZQUFZLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixFQUFFLENBQUM7QUFDOUMsT0FBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0FBQ3hELE9BQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pELE9BQUksaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ25ELG9CQUFpQixDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hELG9CQUFpQixDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNELG9CQUFpQixDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFELG9CQUFpQixDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNELFVBQU8saUJBQWlCLENBQUM7RUFDMUIsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N0YW1CLEVBQVM7O0FBQ3RCLFVBQVMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUN6QixPQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixPQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztFQUNuQjs7QUFFRCxVQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDbEIsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsT0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsT0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRW5CLE9BQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLE9BQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLE9BQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7RUFDNUI7O0FBRUQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBUyxRQUFRLEVBQUU7OztBQUc3QyxJQUFDLFNBQVMsT0FBTyxDQUFDLFdBQVcsRUFBRTs7QUFFN0IsVUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRXJFLGNBQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDbEM7OztBQUdELGFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O0lBR3ZCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBRWhCLENBQUM7OztBQUdGLFVBQVMsa0JBQWtCLENBQUMsSUFBSSxFQUFFO0FBQ2hDLE9BQUksbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLFFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3Qyx3QkFBbUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUN2RCxDQUFDO0FBQ0YsVUFBTyxtQkFBbUIsQ0FBQztFQUM1QjtBQUNELEtBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEdBQUcsWUFBVztBQUM1QyxPQUFJLFFBQVEsR0FBRyxTQUFYLFFBQVEsQ0FBWSxJQUFJLEVBQUU7QUFDNUIsU0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdFLFNBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7O0FBRUYsT0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUMzQixDQUFDOztBQUVGLFVBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7QUFDM0IsT0FBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuQyxPQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hDLFdBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ2hDLENBQUM7QUFDRixVQUFPLE1BQU0sQ0FBQztFQUNmOztBQUVELEtBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLEdBQUcsWUFBVztBQUNoRCxPQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDakIsT0FBSSxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQVksSUFBSSxFQUFFO0FBQzVCLFNBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNmLFdBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDcEcsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFLEVBRWhDLENBQUM7SUFDSCxDQUFDOztBQUVGLE9BQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7RUFFM0IsQ0FBQzs7QUFFRixLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxVQUFTLFFBQVEsRUFBRTtBQUM3QyxPQUFJLEtBQUssR0FBRyxrQkFBVyxDQUFDOztBQUV4QixRQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7QUFFMUIsT0FBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUVsQyxVQUFPLFdBQVcsRUFBRTtBQUNsQixVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyRSxZQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN4Qzs7QUFFRCxhQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEIsZ0JBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0I7RUFDRixDQUFDOztBQUVGLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLFVBQVMsUUFBUSxFQUFFLFNBQVMsRUFBRTtBQUN0RCxZQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztFQUNoQyxDQUFDOztBQUVGLEtBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFVBQVMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUU7QUFDckQsT0FBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO09BQ3RCLE1BQU0sR0FBRyxJQUFJO09BQ1gsUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUN4QixTQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO0FBQ3hCLGFBQU0sR0FBRyxJQUFJLENBQUM7TUFDZjtJQUNGLENBQUM7O0FBRVIsT0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRW5DLE9BQUksTUFBTSxFQUFFO0FBQ1YsV0FBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUIsVUFBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDdkIsTUFBTTtBQUNMLFdBQU0sSUFBSSxLQUFLLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUM5RDs7QUFFRCxPQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztBQUN6QixPQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztFQUM5QixDQUFDOztBQUVGLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFVBQVMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7QUFDMUQsT0FBSSxJQUFJLEdBQUcsSUFBSTtPQUNYLE1BQU0sR0FBRyxJQUFJO09BQ2IsYUFBYSxHQUFHLElBQUk7T0FDcEIsS0FBSyxDQUFDOztBQUVWLE9BQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUM1QixTQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQzFCLGFBQU0sR0FBRyxJQUFJLENBQUM7TUFDZjtJQUNGLENBQUM7O0FBRUYsT0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRW5DLE9BQUksTUFBTSxFQUFFO0FBQ1YsVUFBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV6QyxTQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7QUFDdkIsYUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO01BQ25ELE1BQU07QUFDTCxvQkFBYSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztNQUNsRDtJQUNGLE1BQU07QUFDTCxXQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDM0M7O0FBRUQsT0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDekIsT0FBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7O0FBRTdCLFVBQU8sYUFBYSxDQUFDO0VBQ3RCLENBQUM7O0FBRUYsVUFBUyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtBQUM1QixPQUFJLEtBQUssQ0FBQzs7QUFFVixRQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNuQyxTQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ3hCLFlBQUssR0FBRyxDQUFDLENBQUM7TUFDWDtJQUNGOztBQUVELFVBQU8sS0FBSyxDQUFDO0VBQ2Q7Ozs7QUFJRCxLQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixHQUFHLFVBQVMsUUFBUSxFQUFFO0FBQ3RELE9BQUksS0FBSyxHQUFHLGtCQUFXO09BQ3ZCLE1BQU0sR0FBRyxJQUFJO09BQ1gsUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUN4QixTQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQzFCLGFBQU0sR0FBRyxJQUFJLENBQUM7TUFDZjtJQUNGLENBQUM7O0FBRUosT0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUV6QyxVQUFPLE1BQU0sRUFBRTtBQUNiLFVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2hFLFlBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ25DO0FBQ0QsYUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pCLFdBQU0sR0FBRyxJQUFJLENBQUM7SUFDZjtBQUNELFVBQU8sS0FBSyxDQUFDO0VBQ2QsQ0FBQztBQUNGLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLFlBQVc7QUFDckMsT0FBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE9BQUksUUFBUSxHQUFHLFNBQVgsUUFBUSxDQUFZLElBQUksRUFBRTtBQUM1QixhQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUM5QyxDQUFDO0FBQ0YsT0FBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFMUIsVUFBTyxRQUFRLENBQUM7RUFDakIsQ0FBQzs7Ozs7OztBQU9GLEtBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEdBQUcsVUFBUyxRQUFRLEVBQUU7QUFDdEQsT0FBSSxLQUFLLEdBQUcsa0JBQVc7T0FDbkIsTUFBTSxHQUFHLElBQUk7T0FDWCxRQUFRLEdBQUcsU0FBWCxRQUFRLENBQVksSUFBSSxFQUFFO0FBQ3hCLFNBQUksSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDMUIsYUFBTSxHQUFHLElBQUksQ0FBQztNQUNmO0lBQ0YsQ0FBQzs7QUFFUixPQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRXpDLFFBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXRCLE9BQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUNsQyxPQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7O0FBRXhCLFVBQU8sV0FBVyxFQUFFO0FBQ2xCLG1CQUFjLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pDLFVBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JFLFlBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3hDOztBQUVELGdCQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9COztBQUVELFVBQU8sY0FBYyxDQUFDO0VBQ3ZCLENBQUM7O0FBRUYsS0FBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsWUFBVztBQUNwQyxPQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsT0FBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzNELE9BQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixPQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSyxJQUFJLEdBQUcsSUFBSSxhQUFhLENBQUMsUUFBUSxFQUFFO0FBQ3RDLFNBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDOUMsa0JBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdEIsa0JBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNoRSxpQkFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO01BQ25ELENBQUM7SUFDSDs7QUFFRCxZQUFTLG1CQUFtQixDQUFDLEtBQUssRUFBRTtBQUNsQyxTQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsVUFBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO0FBQ2xDLFdBQUssT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdGLHVCQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztNQUNIO0FBQ0QsWUFBTyxjQUFjLENBQUM7SUFDdkI7O0FBRUQsT0FBSSxlQUFlLEdBQUcsRUFBRSxDQUFDOztBQUV6QixZQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDeEIsU0FBSSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEQsU0FBSSxpQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pFLFlBQU8saUJBQWlCLENBQUM7SUFDMUI7O0FBRUQsT0FBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE9BQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsWUFBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7QUFDOUIsU0FBSSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7QUFDOUIsVUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsV0FBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLDJCQUFvQixHQUFHLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztNQUM1RCxDQUFDO0FBQ0YsU0FBSSxvQkFBb0IsQ0FBQyxNQUFNLEVBQUU7QUFDL0IsY0FBTyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyx3QkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO01BQ3pDLENBQUM7SUFDSDs7QUFFRCxJQUFDLFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTs7QUFFckIsVUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsY0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFYixzQkFBZSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN0QyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLFdBQUksZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUMxQixnQkFBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckMsMEJBQWlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDcEMsQ0FBQztBQUNGLGtCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO01BQzNCLENBQUM7SUFDSCxFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUVmLFVBQU8sV0FBVyxDQUFDO0VBQ3BCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZTTSxVQUFTLEtBQUssR0FBRztBQUN0QixPQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN0QixPQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN0QixPQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztFQUNwQjs7QUFFRCxNQUFLLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxZQUFXO0FBQ2hDLFVBQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0VBQzlDLENBQUM7O0FBRUYsTUFBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDdkMsT0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3hDLE9BQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztFQUNyQixDQUFDOztBQUVGLE1BQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDbkMsT0FBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVk7T0FDL0IsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZO09BQy9CLFdBQVcsQ0FBQzs7QUFFaEIsT0FBSSxXQUFXLEtBQUssV0FBVyxFQUFFO0FBQy9CLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN6QyxZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbEMsU0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUVwQixZQUFPLFdBQVcsQ0FBQztJQUNwQjtFQUNGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hDTSxVQUFTLGFBQWEsQ0FBQyxRQUFRLEVBQUU7QUFDdEMsVUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDdkM7O0FBRU0sVUFBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN4QyxVQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUMxRDs7QUFFTSxVQUFTLGFBQWEsR0FBRztBQUM5QixPQUFJLEVBQUUsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtPQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDeEQsU0FBTSxHQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUksVUFBVSxHQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBSSxRQUFRLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdk4sVUFBTyxNQUFNLENBQUM7RUFDZjs7QUFFTSxVQUFTLFlBQVksQ0FBQyxFQUFFLEVBQUU7QUFDL0IsT0FBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3hGLE9BQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsMktBQTJLLENBQUMsQ0FBQzs7QUFFM00sT0FBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixPQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQzs7QUFFbEQsVUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixVQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVCOzs7Ozs7Ozs7Ozs7OztBQWNNLFVBQVMsYUFBYSxDQUFDLEVBQUUsRUFBRTtBQUNoQyxVQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hHOztBQUVNLFVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUNqQyxPQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLE9BQU87QUFDckMsT0FBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO09BQzdCLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztBQUMvRSxPQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDaEQsT0FBSSxHQUFHLEVBQUUsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25ELE1BQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDMUMsVUFBTyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDcEQ7O0FBRUQsVUFBUyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUM5QixPQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixRQUFLLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRTtBQUNqQixTQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDekIsV0FBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1dBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RCxVQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsR0FDNUIsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FDZixrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN4RDtJQUNGO0FBQ0QsVUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3RCOztBQUVNLFVBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFrQztPQUFoQyxTQUFTLHlEQUFHLEVBQUU7T0FBRSxPQUFPLHlEQUFHLElBQUk7O0FBQ3ZFLE9BQUksT0FBTyxDQUFDOztBQUVaLFVBQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDOztBQUUvQixVQUFPLENBQUMsa0JBQWtCLEdBQUcsWUFBVztBQUN0QyxTQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksY0FBYyxDQUFDLElBQUksRUFBRTtBQUM3QyxXQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO0FBQ3pCLGlCQUFRLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRTtBQUNoQyxlQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDM0MsTUFBTTtBQUNMLGVBQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUMvRDtNQUNGO0lBQ0YsQ0FBQzs7QUFFRixPQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUV6QyxVQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdkMsVUFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNwQjs7Ozs7Ozs7O0FBUU0sVUFBUyxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQ2xDLFVBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3ZDOzs7Ozs7OztBQU9NLFVBQVMsY0FBYyxDQUFDLElBQUksRUFBRTtBQUNuQyxPQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFDLE9BQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDL0UsVUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLHdHQUF3RyxFQUFFLFVBQVMsS0FBSyxFQUFFO0FBQzVJLFNBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQixTQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDcEIsV0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3BCLFlBQUcsR0FBRyxLQUFLLENBQUM7UUFDYixNQUFNO0FBQ0wsWUFBRyxHQUFHLFFBQVEsQ0FBQztRQUNoQjtNQUNGLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25DLFVBQUcsR0FBRyxTQUFTLENBQUM7TUFDakIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDN0IsVUFBRyxHQUFHLE1BQU0sQ0FBQztNQUNkO0FBQ0QsWUFBTyxlQUFlLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3pELENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7c0NDdkgrQixDQUFhOztBQUMxQyxVQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ3BDLE9BQUksUUFBUSxHQUFHLHlCQUFTLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLFdBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BDLGFBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNoRDs7QUFFRCxVQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDdEIsT0FBSSxHQUFHLHVDQUNtQixJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sR0FBRyxTQUFTLHlDQUNsQyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLDRCQUVsRCxDQUFHO0FBQ0gsVUFBTyxHQUFHLENBQUM7RUFDWjs7QUFFRCxVQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFDcEIsTUFBRyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxZQUFXO0FBQzlDLGFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQztBQUNILE1BQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZThjZDI5MGM0Yjg3YjgzOGFmN1xuICoqLyIsImltcG9ydCB7ZGF0YUxpbmtzfSBmcm9tICcuL21vZHVsZXMvZGF0YUxpbmtzJztcbmltcG9ydCB7aG9tZX0gZnJvbSAnLi9tb2R1bGVzL2hvbWVwYWdlJztcblxuaW1wb3J0IHtpbml0WGhyfSBmcm9tICcuL21vZHVsZXMvYXBpT3BlcmF0aW9uJztcbmRhdGFMaW5rcygpO1xuLy8gYXBpVHJlZSgpO1xuLy8gdmFyIHAgPSBuZXcgZGF3blNWRygpO1xuLy8gcC5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWludGVyLXRhcmdldCcpKTtcbi8vIHAuc3RhcnQoKTtcblxuKCgpID0+IHtcbiAgbGV0IHJvdXRlcyA9IHtcbiAgICAnLyc6IGhvbWUsXG4gICAgJy9kZXYnOiBbaW5pdFhocl1cbiAgfTtcbiAgbGV0IHBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHBhdGhOYW1lKSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocm91dGVzW3BhdGhOYW1lXSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiZcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm91dGVzW3BhdGhOYW1lXVtpXS5hcHBseShudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVzW3BhdGhOYW1lXS5hcHBseShudWxsKTtcbiAgICB9XG4gIH1cblxufSkoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzXG4gKiovIiwiaW1wb3J0IHtoYW5kbGVNZXRob2R9IGZyb20gJy4uL2NvbW1vbi9oYW5kbGVNZXRob2QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0YUxpbmtzKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NEYXRhTGluaywgZmFsc2UpO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0RhdGFMaW5rKGUpIHtcbiAgdmFyIGUgPSB3aW5kb3cuZSB8fCBlO1xuXG4gIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnQScpXG4gICAgICByZXR1cm47XG5cbiAgLy8gRG8gc29tZXRoaW5nXG4gIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0KTtcbiAgfVxuICAvLyBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdwYXRjaCcpIHtcbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0LCB7XG4gIC8vICAgICBuczogJ2FwaScsXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIHNlY3Rpb246ICd3aXNlJyxcbiAgLy8gICAgICAgaWQ6ICcyJ1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZGF0YUxpbmtzLmpzXG4gKiovIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb24vY3NyZic7XG4vKipcbiAqIFtoYW5kbGVNZXRob2QgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbGluayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSGFuZGxlcyBcImRhdGEtbWV0aG9kXCIgb24gbGlua3Mgc3VjaCBhczpcbiAqIDxhIGhyZWY9XCIvdXNlcnMvNVwiIGRhdGEtbWV0aG9kPVwiZGVsZXRlXCIgcmVsPVwibm9mb2xsb3dcIiBkYXRhLWNvbmZpcm09XCJBcmUgeW91IHN1cmU/XCI+RGVsZXRlPC9hPlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWV0aG9kKGxpbmssIG9iaiA9IHt9KSB7XG4gIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICBtZXRob2QgPSBsaW5rLmRhdGFzZXQubWV0aG9kLFxuICAgIHRhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCksXG4gICAgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICB2YXIgcGFyYW1zT2JqID0ge1xuICAgIGhyZWY6IGhyZWYsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY3NyZlRva2VuOiBjc3JmVG9rZW4sXG4gICAgY3NyZlBhcmFtOiBjc3JmUGFyYW1cbiAgfTtcbiAgdmFyIGZvcm1FbGUgPSBjcmVhdGVGb3JtKHBhcmFtc09iaiwgb2JqKTtcbiAgYXBwZW5kRm9ybVRvRG9tKGZvcm1FbGUpO1xuICBzdWJtaXRGb3JtKGZvcm1FbGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybShwYXJhbXMsIG9iaikge1xuICB2YXIgZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywncG9zdCcpO1xuICBmLnNldEF0dHJpYnV0ZSgnYWN0aW9uJyxwYXJhbXMuaHJlZik7XG4gIGlmIChwYXJhbXMudGFyZ2V0KSB7XG4gICAgZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIHBhcmFtcy50YXJnZXQpO1xuICB9O1xuXG4gIHZhciBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdfbWV0aG9kJyk7XG4gIGkuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLm1ldGhvZCk7XG5cbiAgdmFyIHM7XG4gIGlmIChwYXJhbXMuY3NyZlBhcmFtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5jc3JmVG9rZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgIVJQcy5pc0Nyb3NzRG9tYWluKHBhcmFtcy5ocmVmKSkge1xuICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwYXJhbXMuY3NyZlBhcmFtKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5jc3JmVG9rZW4pO1xuICB9XG4gIGYuYXBwZW5kQ2hpbGQoaSk7XG5cbiAgLy8gZm9yIChsZXQga2V5IGluIG9iai5kYXRhKSB7XG4gIC8vICAgaWYgKG9iai5kYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgLy8gICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgnbmFtZScsJycgKyBvYmoubnMgKyAnWycgKyBrZXkgKyAnXScpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxvYmouZGF0YVtrZXldKTtcbiAgLy8gICAgIGYuYXBwZW5kQ2hpbGQodCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgaWYgKHMpIHtcbiAgICBmLmFwcGVuZENoaWxkKHMpO1xuICB9O1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kRm9ybVRvRG9tKGZvcm0pIHtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdEZvcm0oZm9ybSkge1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qc1xuICoqLyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jc3JmLmpzXG4gKiovIiwiaW1wb3J0IHt0d2VldEJveH0gZnJvbSAnLi90d2VldEJveCc7XG5leHBvcnQgZnVuY3Rpb24gaG9tZSgpIHtcblx0dHdlZXRCb3goKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2hvbWVwYWdlLmpzXG4gKiovIiwiZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoZWwsIDApO1xuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWV0Qm94KCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gIHZhciB0YiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0d2VldC1ib3gnKVswXTtcbiAgdmFyIHRiZCA9IHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgdmFyIHRiZFN0cmluZyA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdjb25kZW5zZWQnKTtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCkge1xuXG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuY2xhc3NMaXN0LmFkZCgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICh0YmQuaW5uZXJIVE1MID09PSAnV2hhdFxcJ3MgaGFwcGVuaW5nPycpIHtcblxuICAgICAgdGJkLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICB9XG4gIH0pO1xuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmlubmVySFRNTCkge1xuICAgICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgICB9IGVsc2Uge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcblxuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH07XG4gICAgaWYgKHRiLmlubmVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanNcbiAqKi8iLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XG5pbXBvcnQge2h0bWx9IGZyb20gJy4uL2NvbW1vbi90ZW1wbGF0ZSc7XG5pbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb219IGZyb20gJy4uL2NvbW1vbi91dGlsaXRpZXMnO1xuaW1wb3J0IHtmbGFzaH0gZnJvbSAnLi4vY29tbW9uL2ZsYXNoJztcbmltcG9ydCB7QXBpRG9tfSBmcm9tICcuLi9hcGktdHJlZS90cmVlLWRvbSc7XG5cbmxldCByb290QVBJID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpcyc7XG5sZXQgcGF5bG9hZCA9IHt9O1xubGV0IGFwaXNBcnIgPSBbXTtcblxudmFyIGNhbGxiYWNrID0ge1xuICBnZXRBcGlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgYWRkQXBpVHJlZShKU09OLnBhcnNlKGRhdGEpLCB0aGlzKTtcbiAgfSxcbiAgZ2V0QWxsQXBpc1N1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICByZW5kZXJBbGxBcGlzKGRhdGEpO1xuICAgIGJpbmRldmVudHMoKTtcbiAgfSxcbiAgcGF0Y2hTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgcG9zdFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZ2V0QWxsQXBpcygpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJpbmRFdmVudCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQW5kRmxhc2goZGF0YSkge1xuICBsZXQganNvbkRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBmbGFzaChqc29uRGF0YSk7XG4gIHJldHVybiBqc29uRGF0YTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRm9sZExpKGNvbnRleHQpIHtcbiAgY29udGV4dC5jbGFzc0xpc3QudG9nZ2xlKCd1bmZvbGQnKTtcbn1cbmZ1bmN0aW9uIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbihldikge1xuICB0b2dnbGVGb2xkTGkodGhpcyk7XG4gIGlmICh0aGlzLm5leHRFbGVtZW50U2libGluZykge1xuICAgIHJldHVybjtcbiAgfTtcbiAgJGh0dHAocm9vdEFQSSArICcvJyArIHRoaXMucGFyZW50Tm9kZS5kYXRhc2V0LmFwaUlkKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFwaVN1Y2Nlc3MuYmluZCh0aGlzLnBhcmVudE5vZGUpKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuZnVuY3Rpb24gYmluZGV2ZW50cygpIHtcbiAgbGV0IGFwaUxpcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1saS1kZXNjcmlwdGlvbicpO1xuICBbXS5zbGljZS5jYWxsKGFwaUxpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgYmluZEV2ZW50VG9BcGlMaURlc2NyaXB0aW9uLmNhbGwodGhpcywgZXYpO1xuICAgIH0pO1xuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEFwaVRyZWUoZGF0YSA9IHt9LCBjb250YWluZXJOb2RlLCBpc05ld0FwaSkge1xuICBsZXQgbmV3QXBpID0gbmV3IEFwaURvbShkYXRhLCBjb250YWluZXJOb2RlLCBpc05ld0FwaSk7XG4gIGFwaXNBcnIucHVzaChuZXdBcGkpO1xufVxuZnVuY3Rpb24gbmV3QXBpQnRuKCkge1xuICBsZXQgbmV3QXBpRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBoZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZGVyJylbMF07XG4gIG5ld0FwaURpdi5jbGFzc0xpc3QuYWRkKCduZXctYXBpJyk7XG4gIG5ld0FwaURpdi5pbm5lckhUTUwgPSBgPGlucHV0IGNsYXNzPVwiYWRkLWFwaS1idG5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJuZXcgQVBJXCI+YDtcbiAgbmV3QXBpRGl2LmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGFwaVVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVsJylbMF07XG4gICAgbGV0IGJhc2VBcGlMaSA9IHN0clRvRG9tKG5ld0FwaUxpVHBsKCkpO1xuICAgIGFwaVVsLmluc2VydEJlZm9yZShiYXNlQXBpTGksIGFwaVVsLmZpcnN0Q2hpbGQpO1xuICAgIGFkZEFwaVRyZWUoe30sIGJhc2VBcGlMaSwgdHJ1ZSk7XG4gICAgdG9nZ2xlRm9sZExpKGJhc2VBcGlMaS5jaGlsZHJlblswXSk7XG4gICAgYmFzZUFwaUxpLmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbiAgfSk7XG4gIGluc2VydEFmdGVyKG5ld0FwaURpdiwgaGVhZGVyKTtcbiAgcmV0dXJuIG5ld0FwaURpdjtcbn1cblxuZnVuY3Rpb24gbmV3QXBpTGlUcGwoZGF0YSA9IHt9KSB7XG4gIHZhciB0cGwgPSBgXG4gICAgPGxpIGNsYXNzPVwiYXBpLWxpXCIgZGF0YS1hcGktaWQ9XCIke2RhdGEuaWQgfHwgbnVsbH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbGktZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktY29sbGFwc2VcIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS11cmlcIj4ke2RhdGEudXJpIHx8ICcoTm8gdXJpKSd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1uYW1lXCI+JHtkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnKE5vIG5hbWUpJ308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuICBgO1xuICByZXR1cm4gdHBsO1xufVxuZnVuY3Rpb24gcmVuZGVyQWxsQXBpcyhkYXRhKSB7XG4gIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBjb25zdCB0bXBsID0gZGF0YSA9PiBodG1sYFxuICAgICAgPHVsIGNsYXNzPVwiYXBpLXVsXCI+XG4gICAgICAke2RhdGEubWFwKGl0ZW0gPT4gaHRtbGBcbiAgICAgICAgJHtuZXdBcGlMaVRwbChpdGVtKX1cbiAgICAgIGApfVxuICAgICAgPC91bD5cbiAgYDtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkZXInKVswXTtcbiAgbGV0IGFwaUxpc3RFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYXBpTGlzdEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwtd3JhcHBlcicpO1xuICBhcGlMaXN0RWxlLmlubmVySFRNTCA9IHRtcGwoZGF0YSk7XG4gIGluc2VydEFmdGVyKGFwaUxpc3RFbGUsIG5ld0FwaUJ0bigpKTtcbn1cblxuZnVuY3Rpb24gZ2V0QWxsQXBpcygpIHtcbiAgJGh0dHAocm9vdEFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5nZXRBbGxBcGlzU3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cblxuZnVuY3Rpb24gYmluZEV2ZW50KGV2KSB7XG4gIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktc2F2ZScpKSB7XG4gICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICdzZWN0aW9uJzogZXYudGFyZ2V0LnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlY3Rpb24nKVswXS52YWx1ZSxcbiAgICAgICd1cmknOiBldi50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUsXG4gICAgICAnbWV0aG9kJzogZXYudGFyZ2V0LnBhcmVudE5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdLnZhbHVlXG4gICAgfTtcbiAgICBpZiAoZXYudGFyZ2V0LmRhdGFzZXQubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQQVRDSCcpIHtcbiAgICAgICRodHRwKHJvb3RBUEkgKyAnLycgKyBldi50YXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKS5kYXRhc2V0LmlkKVxuICAgICAgLnBhdGNoKHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wYXRjaFN1Y2Nlc3MpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoZXYudGFyZ2V0LmRhdGFzZXQubWV0aG9kLnRvVXBwZXJDYXNlKCkgPT09ICdQT1NUJykge1xuICAgICAgJGh0dHAocm9vdEFQSSlcbiAgICAgIC5wb3N0KHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wb3N0U3VjY2VzcylcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIGlmIChldi50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWwtZGF0YXJvb3QtY2hpbGQnKSkge1xuICAgIHBvcHVwKGV2LCB7fSwgZGVsZXRlQXBpLmJpbmQodGhpcywgZXYpKTtcbiAgfTtcbiAgZnVuY3Rpb24gZGVsZXRlQXBpKGV2KSB7XG4gICAgaWYgKCFldi50YXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKS5kYXRhc2V0LmlkKSB7XG4gICAgICBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIGxldCBwYXJhbXMgPSB7fTtcbiAgICAkaHR0cChyb290QVBJICsgJy8nICsgZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZClcbiAgICAuZGVsZXRlKHBhcmFtcylcbiAgICAudGhlbihjYWxsYmFjay5kZWxldGVTdWNjZXNzKVxuICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gIH1cbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9hcGlPcGVyYXRpb24uanNcbiAqKi8iLCIvKipcbi8vIEItPiBIZXJlIHlvdSBkZWZpbmUgaXRzIGZ1bmN0aW9ucyBhbmQgaXRzIHBheWxvYWRcbnZhciBtZG5BUEkgPSAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvc2VhcmNoLmpzb24nO1xudmFyIHBheWxvYWQgPSB7XG4gICd0b3BpYycgOiAnanMnLFxuICAncScgICAgIDogJ1Byb21pc2UnXG59O1xudmFyIGNhbGxiYWNrID0ge1xuICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDEsICdzdWNjZXNzJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH0sXG4gIGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDIsICdlcnJvcicsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9XG59O1xuLy8gRW5kIEJcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbFxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMSkgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzLCBjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMikgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAudGhlbih1bmRlZmluZWQsIGNhbGxiYWNrLmVycm9yKTtcbiAqL1xuXG4vLyBBLT4gJGh0dHAgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBzdGFuZGFyZCBBZGFwdGVyIHBhdHRlcm5cbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL3NlcmlhbGl6ZSc7XG5pbXBvcnQge2lzRW1wdHksIG1lcmdlT2JqLCBhZGRQcmVmaXhUb09iaiwgd3JhcE9ian0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuL2NzcmYnO1xuXG5leHBvcnQgZnVuY3Rpb24gJGh0dHAodXJsKSB7XG4gIC8vIEEgc21hbGwgZXhhbXBsZSBvZiBvYmplY3RcbiAgdmFyIGNvcmUgPSB7XG5cbiAgICAvLyBNZXRob2QgdGhhdCBwZXJmb3JtcyB0aGUgYWpheCByZXF1ZXN0XG4gICAgYWpheDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFyZ3MgPSB7fSwgcHJlZml4KSB7XG4gICAgICAvLyBmb3IgUmFpbHNcbiAgICAgIC8vIHVybCA9IHVybCArICcuanNvbic7XG4gICAgICAvLyBDcmVhdGluZyBhIHByb21pc2VcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGVzIHRoZSBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnIHx8IG1ldGhvZCA9PT0gJ1BVVCcgfHwgbWV0aG9kID09PSAnUEFUQ0gnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICBsZXQgdXJpID0gSlNPTi5zdHJpbmdpZnkoZXh0ZW5kR2VuZXJhbFBhcmFtcyh3cmFwT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgLy8gY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCh1cmkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gc2VyaWFsaXplKGV4dGVuZEdlbmVyYWxQYXJhbXMoYWRkUHJlZml4VG9PYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsICsgJz8nICsgdXJpKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZXNvbHZlXCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBlcXVhbCB0byAyeHhcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlamVjdFwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZGlmZmVyZW50IHRoYW4gMnh4XG4gICAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFkYXB0ZXIgcGF0dGVyblxuICByZXR1cm4ge1xuICAgICdnZXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0dFVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwb3N0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQT1NUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3B1dCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUFVUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3BhdGNoJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQQVRDSCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0RFTEVURScsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4dGVuZEdlbmVyYWxQYXJhbXMob2JqKSB7XG4gIGxldCBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIGxldCBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCk7XG4gIGxldCBnZW5lcmFsT2JqID0ge307XG4gIGdlbmVyYWxPYmoudXRmOCA9ICfinJMnO1xuICBnZW5lcmFsT2JqW2NzcmZQYXJhbV0gPSBjc3JmVG9rZW47XG4gIHJldHVybiBtZXJnZU9iaihvYmosIGdlbmVyYWxPYmopO1xufVxuLy8gRW5kIEFcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanNcbiAqKi8iLCIvKipcbiAqIFtzZXJpYWxpemUgY29udmVydHMgcmVjdXJzaXZlIG9iamVjdHNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG9iaiAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHByZWZpeCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBjb25zb2xlLmxvZyhzZXJpYWxpemUoe2ZvbzogXCJoaSB0aGVyZVwiLCBiYXI6IHsgYmxhaDogMTIzLCBxdXV4OiBbMSwgMiwgM10gfX0pKTtcbiAqIGZvbz1oaSUyMHRoZXJlJmJhciU1QmJsYWglNUQ9MTIzJmJhciU1QnF1dXglNUQlNUIwJTVEPTEmYmFyJTVCcXV1eCU1RCU1QjElNUQ9MiZiYXIlNUJxdXV4JTVEJTVCMiU1RD0zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xvbmVPYmoob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuLyogY29uc2lkZXIgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmoob2JqMSA9IHt9LCBvYmoyKSB7XG4gIGxldCBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iajEpKTtcbiAgZm9yIChsZXQga2V5IGluIG9iajIpIHtcbiAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9iajJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcmVmaXhUb09iaihvYmosIHByZWZpeCkge1xuICBpZiAoIXByZWZpeCkgcmV0dXJuIG9iajtcbiAgbGV0IG5ld09iaiA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbJycgKyBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSddID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcE9iaihvYmosIHdyYXBwZXIpIHtcbiAgaWYgKCF3cmFwcGVyKSByZXR1cm4gb2JqO1xuICB2YXIgbmV3T2JqID0ge307XG4gIG5ld09ialt3cmFwcGVyXSA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbd3JhcHBlcl1ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyVG9Eb20oc3RyKSB7XG4gIGxldCB0bXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG1wRWxlLmlubmVySFRNTCA9IHN0cjtcbiAgbGV0IHJldHVybkRvbSA9IHRtcEVsZS5jaGlsZHJlblswXTtcbiAgcmV0dXJuIHJldHVybkRvbTtcbn1cbi8qKlxuICogW2luc2VydEFmdGVyIGRlc2NyaXB0aW9uOiBBY2NvcmRpbmcgdG8gTUROIGlmIHRoZSBlbGVtZW50IGlzIGxhc3QgKGFuZCBzbyBuZXh0U2libGluZyBpcyBudWxsKSB0aGUgbmV3Tm9kZSB3aWxsIGJlIGFwcGVuZGVkIGFzIGV4cGVjdGVkXVxuICogQHBhcmFtICB7W3R5cGVdfSBuZXdOb2RlICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcmVmZXJlbmNlTm9kZSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9ICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICByZWZlcmVuY2VOb2RlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUubmV4dFNpYmxpbmcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qc1xuICoqLyIsImltcG9ydCB7aHRtbEVzY2FwZX0gZnJvbSAnLi9odG1sRXNjYXBlJztcbmV4cG9ydCBmdW5jdGlvbiBodG1sKGxpdGVyYWxTZWN0aW9ucywgLi4uc3Vic3RzKSB7XG4gIC8vIFVzZSByYXcgbGl0ZXJhbCBzZWN0aW9uczogd2UgZG9u4oCZdCB3YW50XG4gIC8vIGJhY2tzbGFzaGVzIChcXG4gZXRjLikgdG8gYmUgaW50ZXJwcmV0ZWRcbiAgbGV0IHJhdyA9IGxpdGVyYWxTZWN0aW9ucy5yYXc7XG5cbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIHN1YnN0cy5mb3JFYWNoKChzdWJzdCwgaSkgPT4ge1xuICAgIC8vIFJldHJpZXZlIHRoZSBsaXRlcmFsIHNlY3Rpb24gcHJlY2VkaW5nXG4gICAgLy8gdGhlIGN1cnJlbnQgc3Vic3RpdHV0aW9uXG4gICAgbGV0IGxpdCA9IHJhd1tpXTtcblxuICAgIC8vIEluIHRoZSBleGFtcGxlLCBtYXAoKSByZXR1cm5zIGFuIGFycmF5OlxuICAgIC8vIElmIHN1YnN0aXR1dGlvbiBpcyBhbiBhcnJheSAoYW5kIG5vdCBhIHN0cmluZyksXG4gICAgLy8gd2UgdHVybiBpdCBpbnRvIGEgc3RyaW5nXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3QpKSB7XG4gICAgICBzdWJzdCA9IHN1YnN0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBzdWJzdGl0dXRpb24gaXMgcHJlY2VkZWQgYnkgYSBkb2xsYXIgc2lnbixcbiAgICAvLyB3ZSBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGl0XG4gICAgaWYgKGxpdC5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICBzdWJzdCA9IGh0bWxFc2NhcGUoc3Vic3QpO1xuICAgICAgbGl0ID0gbGl0LnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmVzdWx0ICs9IGxpdDtcbiAgICByZXN1bHQgKz0gc3Vic3Q7XG4gIH0pO1xuICAvLyBUYWtlIGNhcmUgb2YgbGFzdCBsaXRlcmFsIHNlY3Rpb25cbiAgLy8gKE5ldmVyIGZhaWxzLCBiZWNhdXNlIGFuIGVtcHR5IHRlbXBsYXRlIHN0cmluZ1xuICAvLyBwcm9kdWNlcyBvbmUgbGl0ZXJhbCBzZWN0aW9uLCBhbiBlbXB0eSBzdHJpbmcpXG4gIHJlc3VsdCArPSByYXdbcmF3Lmxlbmd0aCAtIDFdOyAvLyAoQSlcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGh0bWxFc2NhcGUoc3RyKSB7XG5cdHN0ciA9ICcnICsgc3RyOyAvLyBmb3IgbnVtYmVycyBldGMuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvJi9nLCAnJmFtcDsnKSAvLyBmaXJzdCFcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvYC9nLCAnJiM5NjsnKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzXG4gKiovIiwiaW1wb3J0IHtkaXNhYmxlU2Nyb2xsLCBlbmFibGVTY3JvbGx9IGZyb20gJy4vdG9nZ2xlU2Nyb2xsJztcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cChldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgcG9wdXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcG9wdXBFbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtbGF5ZXInKTtcbiAgcG9wdXBFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVQb3B1cFRwbCgpO1xuICBwb3NpdGlvblBvcHVwRWxlKHBvcHVwRWxlLCBldik7XG4gIGJpbmRQb3B1cEV2ZW50cyhwb3B1cEVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwRWxlKTtcbiAgZGlzYWJsZVNjcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBvcHVwVHBsKGRhdGEpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtdGV4dFwiPkFyZSB5b3Ugc3VyZSB0byBkZWxldGUgdGhpcyBBUEk/PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRQb3B1cEV2ZW50cyhlbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1zaGFkb3cnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29uZmlybS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbmZpcm0uYmluZCh0aGlzLCBldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm0oZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBjYWxsYmFjaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uUG9wdXBFbGUoZWxlLCBjb29yZGluYXRlcykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29udGVudCcpWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZXMucGFnZVggKyAncHgsICcgKyBjb29yZGluYXRlcy5wYWdlWSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2KSB7XG4gIGlmIChldi50YXJnZXQgPT09IGV2LmN1cnJlbnRUYXJnZXQpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucGFyZW50Tm9kZSk7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qc1xuICoqLyIsIi8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDAsXG4vLyBzcGFjZWJhcjogMzIsIHBhZ2V1cDogMzMsIHBhZ2Vkb3duOiAzNCwgZW5kOiAzNSwgaG9tZTogMzZcbnZhciBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikgLy8gb2xkZXIgRkZcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbndoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG1vZGVybiBzdGFuZGFyZFxuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG9sZGVyIGJyb3dzZXJzLCBJRVxuICB3aW5kb3cub250b3VjaG1vdmUgID0gcHJldmVudERlZmF1bHQ7IC8vIG1vYmlsZVxuICBkb2N1bWVudC5vbmtleWRvd24gID0gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9ud2hlZWwgPSBudWxsO1xuICB3aW5kb3cub250b3VjaG1vdmUgPSBudWxsO1xuICBkb2N1bWVudC5vbmtleWRvd24gPSBudWxsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge2dldFRyYW5zbGF0ZVgsIHhociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBsZXQgdHBsID1cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYXBpLWluZm9cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktdXJpXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cIlwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBPU1RcIj5QT1NUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQQVRDSFwiPlBBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8bGFiZWw+c2VjdGlvbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXNhdmVcIiBkYXRhLW1ldGhvZD1cIiR7cGF0Y2hPclBvc3QoaXNOZXdBcGkpfVwiIGRhdGEtYWN0aW9uPVwiL2FwaXMke3NhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSl9XCIgPiR7aXNOZXdBcGkgPyAnY3JlYXRlJyA6ICdzYXZlJ308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktdGVzdFwiPnRlc3Q8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS13cmFwcGVyXCI+PGRpdiBjbGFzcz1cImFwaS10cmVlLWZyYW1lXCI+PHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+PC9kaXY+PGRpdiBjbGFzcz1cImFwaS10cmVlXCI+PC9kaXY+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWRhdGFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3cy1jb250cm9sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1iZWF1dGlmeVwiPmJlYXV0aWZ5PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtcHJldmlld1wiPnByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICByZXR1cm4gdHBsO1xufVxuXG52YXIgbGVhZkNvbnRlbnRUcGwgPSAnPGkgY2xhc3M9XCJyZW1vdmUtY2hpbGRcIj4tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1rZXlcIiBwbGFjZWhvbGRlcj1cImtleVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi12YWx1ZVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiYWRkLWNoaWxkXCI+KzwvaT4nO1xuXG52YXIgaW5pdFJlY3RPYmogPSB7XG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMFxufTtcblxuZnVuY3Rpb24gcGF0Y2hPclBvc3QoaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJ1BPU1QnIDogJ1BBVENIJztcbn1cbmZ1bmN0aW9uIHNhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnJyA6IGAvJHtkYXRhLmlkfWA7XG59XG5mdW5jdGlvbiBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpIHtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5kYXRhc2V0LmlkID0gaXNOZXdBcGkgPyAnJyA6IGRhdGEuaWQ7XG4gIHBlckFwaUVsZS5pbm5lckhUTUwgPSBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkpO1xuICBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlID0gaXNOZXdBcGkgPyAnJyA6IGRhdGEudXJpO1xuICByZXR1cm4gcGVyQXBpRWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBpRG9tKGRhdGEsIGNvbnRhaW5lck5vZGUsIGlzTmV3QXBpKSB7XG4gIHRoaXMuYXBpQ29udGFpbmVyID0gY29udGFpbmVyTm9kZTtcblxuICB0aGlzLmFwaUNvbnRhaW5lci5hcHBlbmRDaGlsZChjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpKTtcblxuICB0aGlzLmFwaUVsZSA9IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Blci1hcGknKVswXTtcbiAgXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDQVBJKCk7XG5cbiAgdGhpcy5sZWFmSW5kZXggPSAxO1xuXG4gIHRoaXMuJGFwaVRyZWUgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYoJ19kYXRhX3Jvb3QnLCAxLCAwLCBpbml0UmVjdE9iaikpO1xuXG4gIHRoaXMuJGFwaVRyZWVGcmFtZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWZyYW1lJylbMF07XG5cbiAgdGhpcy5pbml0QXBpVHJlZSgpO1xuXG4gIHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcblxuICB0aGlzLmJpbmRFdmVudHNUb01SQ0UoKTtcblxuICB0aGlzLmFwaVJldHVybkRhdGEgPSAnJztcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5zdG9yZUFwaVJldHVybkRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9IGRhdGE7XG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5jbGljaygpO1xufTtcbkFwaURvbS5wcm90b3R5cGUuanNvblZpZXcgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHZhciAkcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICRwcmUuaW5uZXJIVE1MID0gZGF0YTtcbiAgdGhpcy4kZGF0YVZpZXcuaW5uZXJIVE1MID0gJyc7XG4gIHRoaXMuJGRhdGFWaWV3LmFwcGVuZENoaWxkKCRwcmUpO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5iaW5kRXZlbnRzVG9NUkNBUEkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgbmV3bHlDcmVhdGVkQXBpTm9kZSA9IHRoaXMuYXBpRWxlO1xuXG4gIHZhciAkYXBpU2F2ZSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXTtcbiAgdmFyICRhcGlVcmkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXTtcbiAgdmFyICRhcGlUZXN0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdGVzdCcpWzBdO1xuICB2YXIgJGFwaU1ldGhvZCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdO1xuXG4gIHZhciAkZGF0YVJhdyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1yYXcnKVswXTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWJlYXV0aWZ5JylbMF07XG4gIHZhciAkZGF0YUhpZ2hsaWdodCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1oaWdobGlnaHQnKVswXTtcbiAgdmFyICRkYXRhUHJldmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1wcmV2aWV3JylbMF07XG5cbiAgdGhpcy4kZGF0YVZpZXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtdmlldycpWzBdO1xuXG4gICRhcGlTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgfSk7XG5cbiAgJGFwaVRlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgeGhyKCRhcGlNZXRob2QudmFsdWUsICRhcGlVcmkudmFsdWUsIHRoaXMuc3RvcmVBcGlSZXR1cm5EYXRhLmJpbmQodGhhdCkpO1xuICB9KTtcblxuICAkZGF0YVJhdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KHRoaXMuYXBpUmV0dXJuRGF0YSk7XG4gIH0pO1xuXG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGJlYXV0aWZ5SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFIaWdobGlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldyhoaWdodGxpZ2h0SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFQcmV2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoJ1RoaXMgZmVhdHVyZSBoYXMgbm90IGJlZW4gYWNjb21wbGlzaGVkIHlldC4nKTtcbiAgfSk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUub3BlcmF0ZURhdGFSb290Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgYWRkTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgYWRkTWFyay5jbGFzc05hbWUgPSAnYWRkLWRhdGFyb290LWNoaWxkJztcbiAgYWRkTWFyay50ZXh0Q29udGVudCA9ICcrJztcbiAgYWRkTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICB0aGF0LmxlYWZJbmRleCArPSAxO1xuICAgICAgdmFyIHBhcmVudElkeCA9ICdfZGF0YV9yb290JztcbiAgICAgIHZhciBub2RlTGV2ZWwgPSAwO1xuICAgICAgdGhhdC5hcGlUcmVlLmFkZCh0aGF0LmxlYWZJbmRleCwgcGFyZW50SWR4LCB0aGF0LmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgICAgIHRoYXQuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZHgsIHRoYXQubGVhZkluZGV4LCBub2RlTGV2ZWwsIGluaXRSZWN0T2JqKSk7XG4gICAgICB2YXIgb2JqID0gdGhhdC5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgICAgIHRoYXQuc3R5bGVOb2RlcyhvYmopO1xuICAgICAgdGhhdC5iaW5kRXZlbnRzVG9NUkNFKCk7XG4gICAgfSk7XG4gIHRoaXMuJGFwaVRyZWUuaW5zZXJ0QmVmb3JlKGFkZE1hcmssIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG5cbiAgdmFyIGRlbE1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRlbE1hcmsuY2xhc3NOYW1lID0gJ2RlbC1kYXRhcm9vdC1jaGlsZCc7XG4gIGRlbE1hcmsudGV4dENvbnRlbnQgPSAnLSc7XG4gIGRlbE1hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgLyogdGhpcyBBUEkgaXMgZGVsZXRlZC4gKi9cblxuICAgICAgLy8gdGhhdC5hcGlDb250YWluZXIucmVtb3ZlQ2hpbGQoZXYuY3VycmVudFRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoZGVsTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5pbml0QXBpVHJlZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFwaVRyZWUgPSBuZXcgVHJlZSgnX2RhdGFfcm9vdCcpO1xuICB0aGlzLmFwaVRyZWUuYWRkKDEsICdfZGF0YV9yb290JywgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gIHRoaXMub3BlcmF0ZURhdGFSb290Q2hpbGQoKTtcblxuICByZXR1cm4gdGhpcy5hcGlUcmVlO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5kZWxOb2RlID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBjdXJyZW50TGVhZiA9IGN0eC5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5sZWFmJyk7XG4gIHZhciBjdXJyZW50SWR4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIHBhcmVudElkeCA9IGlzTmFOKCtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50KSA/ICdfZGF0YV9yb290JyA6ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50O1xuXG4gIHZhciBub2Rlc0FyciA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURlc2NlbmRhbnRzKGN1cnJlbnRJZHgpO1xuICB2YXIgaWR4QXJyID0gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycik7XG4gIHRoaXMuYXBpVHJlZS5yZW1vdmUoY3VycmVudElkeCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMucmVtb3ZlTm9kZXNGcm9tRG9tKGlkeEFycik7XG5cbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWR4KTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUucmVtb3ZlTm9kZXNGcm9tRG9tID0gZnVuY3Rpb24oYXJyKSB7XG4gIHZhciBhbGxMZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBhbGxMZWF2ZXNMZW4gPSBhbGxMZWF2ZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbExlYXZlc0xlbjsgaSsrKSB7XG4gICAgaWYgKGFyci5pbmRleE9mKCthbGxMZWF2ZXNbaV0uZGF0YXNldC5pbmRleCkgIT09IC0xKSB7XG4gICAgICB0aGlzLiRhcGlUcmVlLnJlbW92ZUNoaWxkKGFsbExlYXZlc1tpXSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpIHtcbiAgdmFyIG5vZGVzQXJyTGVuID0gbm9kZXNBcnIubGVuZ3RoO1xuICB2YXIgaWR4QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXNBcnJMZW47IGkrKykge1xuICAgIGlkeEFyci5wdXNoKG5vZGVzQXJyW2ldLmRhdGEpO1xuICB9O1xuICByZXR1cm4gaWR4QXJyO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxlYXZlcyA9IHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpO1xuICB2YXIgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDtcbiAgdmFyIG5ld2x5Q3JlYXRlZExlYWYgPSBsZWF2ZXNbbGVhdmVzTGVuIC0gMV07XG4gIHZhciAkYWRkQ2hpbGQgPSBuZXdseUNyZWF0ZWRMZWFmLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZC1jaGlsZCcpWzBdO1xuICAkYWRkQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHggPT4ge1xuICAgIHRoaXMuYWRkQ2hpbGQoY3R4KTtcbiAgfSk7XG5cbiAgdmFyICRyZW1vdmVDaGlsZCA9IG5ld2x5Q3JlYXRlZExlYWYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVtb3ZlLWNoaWxkJylbMF07XG4gICRyZW1vdmVDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eCA9PiB7XG4gICAgdGhpcy5kZWxOb2RlKGN0eCk7XG4gIH0pO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5zZXRQYXJlbnROb2RlVmFsID0gZnVuY3Rpb24oaWR4KSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBxdWV1ZSA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gIHZhciBxdWV1ZUxlbiA9IHF1ZXVlLl9uZXdlc3RJbmRleCAtIHF1ZXVlLl9vbGRlc3RJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSBsZWF2ZXMubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaWYgKCtsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCA9PT0gaWR4KSB7XG4gICAgICBpZiAocXVldWVMZW4gPiAwKSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnLS0tPic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZGV4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWwgKyAxO1xuXG4gIC8vIGFwaVRyZWUgb3BlcmF0aW9uXG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkZXgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaih0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpKTtcbiAgdmFyIGNoaWxkcmVuTm9kZXMgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChwYXJlbnRJZGV4KTtcblxuICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgcGVyTm9kZSBpbiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2goY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyTGVuID0gY2hpbGRyZW5JZHhBcnIubGVuZ3RoO1xuXG4gIGNsb25lZFJlY3RPYmoucmlnaHQgLT0gMzA7XG5cbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gPSBjaGlsZHJlbklkeEFyckxlbiA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSArIChjaGlsZHJlbklkeEFyckxlbiAtIDEpICogMjA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZGV4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZGV4KTtcblxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZCwgbm9kZUluZGV4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcsIHBhcmVudElkKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jywgbm9kZUluZGV4KTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWxldmVsJywgbm9kZUxldmVsKTtcbiAgbmV3TGVhZlNwYW4uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBNYXRoLnJvdW5kKHJlY3RPYmoucmlnaHQpICsgJ3B4LCAnICsgTWF0aC5yb3VuZChyZWN0T2JqLmJvdHRvbSkgKyAncHgsIDApJztcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZkNvbnRlbnRUcGw7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxlYWYocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIG5ld0xlYWYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikpO1xuICByZXR1cm4gbmV3TGVhZjtcbn1cbkFwaURvbS5wcm90b3R5cGUuc3R5bGVOb2RlcyA9IGZ1bmN0aW9uKHN0eWxlT2JqKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBsZWFmSWR4LCBvZmZzZXRZLCBvcmlnaW5hbFggPSAnJztcblxuICB2YXIgc3R5bGVzQXJyID0gW10sIHhWYWx1ZSwgeVZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVhdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3JpZ2luYWxYID0gZ2V0VHJhbnNsYXRlWChsZWF2ZXNbaV0pO1xuICAgIGxlYWZJZHggPSArKGxlYXZlc1tpXS5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAodmFyIHN0eWxlT2JqSWR4IGluIHN0eWxlT2JqKSB7XG4gICAgICBpZiAoK3N0eWxlT2JqSWR4ID09PSBsZWFmSWR4KSB7XG4gICAgICAgIG9mZnNldFkgPSBzdHlsZU9ialtzdHlsZU9iaklkeF0gKiA1MjtcbiAgICAgIH07XG4gICAgfVxuICAgIHN0eWxlc0Fyci5wdXNoKFtvcmlnaW5hbFgsIG9mZnNldFldKTtcbiAgfTtcblxuICBmb3IgKHZhciBqID0gMCwgc3R5bGVzQXJyTGVuID0gc3R5bGVzQXJyLmxlbmd0aDsgaiA8IHN0eWxlc0FyckxlbjsgaisrKSB7XG4gICAgbGVhdmVzW2pdLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgc3R5bGVzQXJyW2pdWzBdICsgJ3B4LCAnICsgc3R5bGVzQXJyW2pdWzFdICsgJ3B4LCAwKSc7XG4gIH1cblxuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5hZGRTaWJsaW5nID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWw7XG4gIHBhcmVudElkeCA9IGlzTmFOKHBhcmVudElkeCkgPyAnX2RhdGFfcm9vdCcgOiBwYXJlbnRJZHg7XG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB2YXIgcmVjdE9iaiA9IHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSk7XG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHJlY3RPYmopO1xuICBjbG9uZWRSZWN0T2JqLnJpZ2h0ID0gY2xvbmVkUmVjdE9iai5yaWdodCAtIGNsb25lZFJlY3RPYmoud2lkdGg7XG4gIGNsb25lZFJlY3RPYmouYm90dG9tICs9IDMwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWR4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcblxufTtcblxuLyogdXRpbHMgKi9cbmZ1bmN0aW9uIGNsb25lUmVjdE9iaihvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9iai50b3AsXG4gICAgYm90dG9tOiBvYmouYm90dG9tLFxuICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgd2lkdGg6IG9iai53aWR0aCxcbiAgICBoZWlnaHQ6IG9iai5oZWlnaHRcbiAgfTtcbn1cblxuLyogbWFuaXB1bGF0ZSBTVkcgKi9cbkFwaURvbS5wcm90b3R5cGUuY2xlYXJTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF07XG4gIHdoaWxlIChzdmcubGFzdENoaWxkKSB7XG4gICAgc3ZnLnJlbW92ZUNoaWxkKHN2Zy5sYXN0Q2hpbGQpO1xuICB9XG59O1xuLyoqXG4gKiBbZHJhd1NWRyBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5BcGlEb20ucHJvdG90eXBlLmRyYXdTVkcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclNWRygpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBzdmdQYXJ0aWFscyA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBzdmdQYXJ0aWFscy5wdXNoKHRoYXQuY3JlYXRlU2luZ2xlU1ZHKG5vZGUuZGF0YSwgbm9kZS5jb2x1bW4sIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsLCAobm9kZS50b3RhbG9mZnNldHlsZXZlbCAtIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsKSkpO1xuICAgIH07XG4gIH07XG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZURGKGNhbGxiYWNrKTtcblxuICB2YXIgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdmdQYXJ0aWFscy5sZW5ndGg7IGkrKykge1xuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoc3ZnUGFydGlhbHNbaV0pO1xuICB9XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF0uYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuY3JlYXRlU2luZ2xlU1ZHID0gZnVuY3Rpb24oaWR4LCBob3JpLCBwYXJlbnRWZXJ0LCBkdmVydCkge1xuXG4gIHZhciBzdmducyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIHZhciBuZXdQYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z25zLCAncGF0aCcpO1xuICB2YXIgY29udHJvbFJhdGUgPSAwLjI7XG4gIHZhciBteCwgbXksIHF4LCBxeSwgcXh4LCBxeXksIHR4LCB0eTtcbiAgaG9yaSA9IGhvcmkgLSAxO1xuICBkdmVydCA9IGR2ZXJ0O1xuICBwYXJlbnRWZXJ0ID0gcGFyZW50VmVydDtcblxuICBteCA9IGhvcmkgKiA1MDE7XG4gIG15ID0gcGFyZW50VmVydCAqIDUyICsgODtcbiAgcXggPSBteCArIDEwO1xuICBxeSA9IG15O1xuICBxeHggPSBteCArIDE1O1xuICBxeXkgPSAobXkgKyAoZHZlcnQgLyAyKSAqIDUyKTtcbiAgdHggPSBteCArIDMwO1xuICB0eSA9IG15ICsgZHZlcnQgKiA1MjtcblxuICBuZXdQYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgJ00gJyArIG14ICsgJyAnICsgbXkgKyAnIFEgJyArIHF4ICsgJyAnICsgcXkgKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF4eCArICcgJyArIHF5eSArICcgVCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCArICcgJyArIHR5ICsgJycpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXBpLXN2Zy1wYXRoJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdkYXRhLWlkeCcsIGlkeCk7XG5cbiAgcmV0dXJuIG5ld1BhdGg7XG59O1xuXG4vKiBjYWxjdWxhdGUgZGltZW5zaW9ucyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jYWxjRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuYXBpVHJlZS5tYXhMZXZlbHMoKTtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSB0aGlzLmRpbWVuc2lvbkFyci5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBob3JpQXJyLnB1c2godGhpcy5kaW1lbnNpb25BcnJbaV0ubGVuZ3RoKTtcbiAgfTtcbiAgaG9yaU1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhvcmlBcnIpO1xuICB2ZXJ0aWNhbE1heCA9IHRoaXMuYXBpVHJlZS5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUud2lkdGggPSBob3JpTWF4ICogNTIwICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgKyAncHgnO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuXG59O1xuXG4vKiBjYWxjdWxhdGUgb2Zmc2V0ICovXG5cbkFwaURvbS5wcm90b3R5cGUubm9kZUxlZnRPZmZzZXQgPSBmdW5jdGlvbihlbCkge1xuICB2YXIgZWxSZWN0T2JqZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBib2R5UmVjdE9iaiA9IHRoaXMuJGFwaVRyZWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBjbG9uZUJvZHlSZWN0T2JqID0gY2xvbmVSZWN0T2JqKGJvZHlSZWN0T2JqKTtcbiAgdmFyIGNsb25lRWxSZWN0T2JqZWN0ID0gY2xvbmVSZWN0T2JqKGVsUmVjdE9iamVjdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnRvcCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmJvdHRvbSArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmxlZnQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QucmlnaHQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgcmV0dXJuIGNsb25lRWxSZWN0T2JqZWN0O1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanNcbiAqKi8iLCIvKipcbiAqIFtUcmVlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICpcbiAqIF9yb290IHBvaW50cyB0byB0aGUgcm9vdCBub2RlIG9mIGEgdHJlZS5cbiAqIHRyYXZlcnNlREYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBERlMuXG4gKiB0cmF2ZXJzZUJGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggQkZTLlxuICogY29udGFpbnMoZGF0YSwgdHJhdmVyc2FsKSBzZWFyY2hlcyBmb3IgYSBub2RlIGluIGEgdHJlZS5cbiAqIGFkZChkYXRhLCB0b0RhdGEsIHRyYXZlcnNlKSBhZGRzIGEgbm9kZSB0byBhIHRyZWUuXG4gKiByZW1vdmUoY2hpbGQsIHBhcmVudCkgcmVtb3ZlcyBhIG5vZGUgaW4gYSB0cmVlLlxuICpcbiAqL1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSAnLi9xdWV1ZSc7XG5leHBvcnQgZnVuY3Rpb24gVHJlZShkYXRhKSB7XG4gIHZhciBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gIHRoaXMuX3Jvb3QgPSBub2RlO1xufVxuXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcbiAgdGhpcy5kYXRhID0gZGF0YTtcbiAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB0aGlzLmNoaWxkcmVuID0gW107XG4gIC8vIGFkZGVkIGxhdGVyXG4gIHRoaXMuY2hpbGRyZW5sZXZlbCA9IDE7XG4gIHRoaXMuY29sdW1uID0gMDtcbiAgdGhpcy50b3RhbG9mZnNldHlsZXZlbCA9IDA7XG59XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlREYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIC8vIHRoaXMgaXMgYSByZWN1cnNlIGFuZCBpbW1lZGlhdGVseS1pbnZva2luZyBmdW5jdGlvblxuICAoZnVuY3Rpb24gcmVjdXJzZShjdXJyZW50Tm9kZSkge1xuICAgIC8vIHN0ZXAgMlxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgLy8gc3RlcCAzXG4gICAgICByZWN1cnNlKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICAvLyBzdGVwIDRcbiAgICBjYWxsYmFjayhjdXJyZW50Tm9kZSk7XG5cbiAgICAvLyBzdGVwIDFcbiAgfSkodGhpcy5fcm9vdCk7XG5cbn07XG5cbi8vIGZvciB0aG9zZSBub2RlcyB3aG8gaGF2ZSBjaGlsZHJlblxuZnVuY3Rpb24gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIHtcbiAgdmFyIHRvdGFsQ2hpbGRyZW5MZXZlbHMgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB0b3RhbENoaWxkcmVuTGV2ZWxzICs9IG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsQ2hpbGRyZW5MZXZlbHM7XG59XG5UcmVlLnByb3RvdHlwZS5jYWxjQ2hpbGRyZW5MZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbm9kZS5jaGlsZHJlbmxldmVsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIDogMTtcbiAgICBub2RlLmNvbHVtbiA9IG5vZGUucGFyZW50ID8gKG5vZGUucGFyZW50LmNvbHVtbiArIDEpIDogMDtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xufTtcblxuZnVuY3Rpb24gY2FsY09mZlkoYXJyLCBkYXRhKSB7XG4gIHZhciBub2RlSWR4ID0gZmluZEluZGV4KGFyciwgZGF0YSk7XG4gIHZhciB0b3RhbFkgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVJZHg7IGkrKykge1xuICAgIHRvdGFsWSArPSBhcnJbaV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsWTtcbn1cblxuVHJlZS5wcm90b3R5cGUuY2FsY1RvdGFsT2Zmc2V0WUxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZXZlbGdhcCA9IDA7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgIG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgPSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCArIGNhbGNPZmZZKG5vZGUucGFyZW50LmNoaWxkcmVuLCBub2RlLmRhdGEpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblxuICAgIH07XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxufTtcblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VCRiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXG4gIHF1ZXVlLmVucXVldWUodGhpcy5fcm9vdCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY3VycmVudFRyZWUpO1xuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0cmF2ZXJzYWwpIHtcbiAgdHJhdmVyc2FsLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcblxuVHJlZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZGF0YSwgdG9EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5kYXRhID09PSB0b0RhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICBjaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWRkIG5vZGUgdG8gYSBub24tZXhpc3RlbnQgcGFyZW50LicpO1xuICB9XG5cbiAgdGhpcy5jYWxjQ2hpbGRyZW5MZXZlbCgpO1xuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xufTtcblxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZGF0YSwgZnJvbURhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgdHJlZSA9IHRoaXMsXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgY2hpbGRUb1JlbW92ZSA9IG51bGwsXG4gICAgICBpbmRleDtcblxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUuZGF0YSA9PT0gZnJvbURhdGEpIHtcbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIGluZGV4ID0gZmluZEluZGV4KHBhcmVudC5jaGlsZHJlbiwgZGF0YSk7XG5cbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIHRvIHJlbW92ZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRUb1JlbW92ZSA9IHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkb2VzIG5vdCBleGlzdC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcblxuICByZXR1cm4gY2hpbGRUb1JlbW92ZTtcbn07XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIGRhdGEpIHtcbiAgdmFyIGluZGV4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycltpXS5kYXRhID09PSBkYXRhKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKiB0cmVlIGFkZG9uKi9cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEaXJlY3RDaGlsZCA9IGZ1bmN0aW9uKG5vZGVkYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICBwYXJlbnQgPSBudWxsLFxuICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gbm9kZWRhdGEpIHtcbiAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUocGFyZW50LmNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbGJhY2socGFyZW50KTtcbiAgICBwYXJlbnQgPSBudWxsO1xuICB9XG4gIHJldHVybiBxdWV1ZTtcbn07XG5UcmVlLnByb3RvdHlwZS5hcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdHlsZU9iaiA9IHt9O1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgc3R5bGVPYmpbbm9kZS5kYXRhXSA9IG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqO1xufTtcblxuLyoqXG4gKiBbdHJhdmVyc2VEZXNjZW5kYW50cyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1tpbnRlZ2VyXX0gbm9kZURhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W2FycmF5XX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGVzY2VuZGFudHMgPSBmdW5jdGlvbihub2RlRGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLmRhdGEgPT09IG5vZGVEYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHF1ZXVlLmVucXVldWUocGFyZW50KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIHZhciBkZXNjZW5kYW50c0FyciA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGRlc2NlbmRhbnRzQXJyLnB1c2goY3VycmVudFRyZWUpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cblxuICByZXR1cm4gZGVzY2VuZGFudHNBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5tYXhMZXZlbHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgZGF0YVJvb3ROb2RlcyA9IHRoaXMudHJhdmVyc2VEaXJlY3RDaGlsZCgnX2RhdGFfcm9vdCcpO1xuICB2YXIgcm93TGV2ZWxPYmogPSB7fTtcbiAgdmFyIGhlYWRJZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgZHJuIGluIGRhdGFSb290Tm9kZXMuX3N0b3JhZ2UpIHtcbiAgICBpZiAoZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShkcm4pKSB7XG4gICAgICByb3dMZXZlbE9ialtkcm5dID0ge307XG4gICAgICByb3dMZXZlbE9ialtkcm5dWydoZWFkLWlkeCddID0gZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLmRhdGE7XG4gICAgICBoZWFkSWR4QXJyLnB1c2goZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLmRhdGEpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0SWR4RnJvbVF1ZXVlKHF1ZXVlKSB7XG4gICAgdmFyIGNoaWxkcmVuSWR4QXJyID0gW107XG4gICAgZm9yICh2YXIgcGVyTm9kZSBpbiBxdWV1ZS5fc3RvcmFnZSkge1xuICAgICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBxdWV1ZS5fc3RvcmFnZVtwZXJOb2RlXS5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XG4gICAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2gocXVldWUuX3N0b3JhZ2VbcGVyTm9kZV0uZGF0YSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW5JZHhBcnI7XG4gIH1cblxuICB2YXIgbGV2ZWxOZXh0Q29sQXJyID0gW107XG5cbiAgZnVuY3Rpb24gZ2V0Um93TGV2ZWwoaWR4KSB7XG4gICAgdmFyIGRpcmVjdENoaWxkcmVuUXVldWUgPSB0aGF0LnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcbiAgICB2YXIgZGlyZWN0Q2hpbGRyZW5BcnIgPSBleHRyYWN0SWR4RnJvbVF1ZXVlKGRpcmVjdENoaWxkcmVuUXVldWUpO1xuICAgIHJldHVybiBkaXJlY3RDaGlsZHJlbkFycjtcbiAgfVxuXG4gIHZhciB1bHRpbWF0ZUFyciA9IFtdO1xuICB2YXIgcGVySGVhZCA9IFtdO1xuXG4gIGZ1bmN0aW9uIG5leHRMZXZlbENoaWxkcmVuKGFycikge1xuICAgIHZhciBuZXh0TGV2ZWxDaGlsZHJlbkFyciA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGVyTnVtID0gZ2V0Um93TGV2ZWwoYXJyW2ldKTtcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuQXJyID0gbmV4dExldmVsQ2hpbGRyZW5BcnIuY29uY2F0KHBlck51bSk7XG4gICAgfTtcbiAgICBpZiAobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKSB7XG4gICAgICBwZXJIZWFkLnB1c2gobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKTtcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuKG5leHRMZXZlbENoaWxkcmVuQXJyKTtcbiAgICB9O1xuICB9XG5cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoYXJyKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgcGVySGVhZCA9IFtdO1xuICAgICAgLy8gbGV2ZWwgMVxuICAgICAgbGV2ZWxOZXh0Q29sQXJyID0gZ2V0Um93TGV2ZWwoYXJyW2ldKTtcbiAgICAgIHBlckhlYWQucHVzaCgxKTtcbiAgICAgIGlmIChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKSB7XG4gICAgICAgIHBlckhlYWQucHVzaChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKTtcbiAgICAgICAgbmV4dExldmVsQ2hpbGRyZW4obGV2ZWxOZXh0Q29sQXJyKTtcbiAgICAgIH07XG4gICAgICB1bHRpbWF0ZUFyci5wdXNoKHBlckhlYWQpO1xuICAgIH07XG4gIH0pKGhlYWRJZHhBcnIpO1xuXG4gIHJldHVybiB1bHRpbWF0ZUFycjtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzXG4gKiovIiwiLyoqXG4gKiBbUXVldWUgZGVzY3JpcHRpb25dXG4gKiBlbnF1ZXVlKGRhdGEpIGFkZHMgZGF0YSB0byBhIHF1ZXVlLlxuICogZGVxdWV1ZSByZW1vdmVzIHRoZSBvbGRlc3QgYWRkZWQgZGF0YSB0byBhIHF1ZXVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUXVldWUoKSB7XG4gIHRoaXMuX29sZGVzdEluZGV4ID0gMTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXggPSAxO1xuICB0aGlzLl9zdG9yYWdlID0ge307XG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9uZXdlc3RJbmRleCAtIHRoaXMuX29sZGVzdEluZGV4O1xufTtcblxuUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuX3N0b3JhZ2VbdGhpcy5fbmV3ZXN0SW5kZXhdID0gZGF0YTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXgrKztcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRlc3RJbmRleCA9IHRoaXMuX29sZGVzdEluZGV4LFxuICAgICAgbmV3ZXN0SW5kZXggPSB0aGlzLl9uZXdlc3RJbmRleCxcbiAgICAgIGRlbGV0ZWREYXRhO1xuXG4gIGlmIChvbGRlc3RJbmRleCAhPT0gbmV3ZXN0SW5kZXgpIHtcbiAgICBkZWxldGVkRGF0YSA9IHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIGRlbGV0ZSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICB0aGlzLl9vbGRlc3RJbmRleCsrO1xuXG4gICAgcmV0dXJuIGRlbGV0ZWREYXRhO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvcXVldWUuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gZ2V0TWF4T2ZBcnJheShudW1BcnJheSkge1xuICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBlbGVtLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoY2xhc3NOYW1lKSA+IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLCBwcmVmaXggPSAnJztcbiAgcHJlZml4ID0gKHVhLmluZGV4T2YoJ2Nocm9tZScpID49IDAgfHwgd2luZG93Lm9wZW5EYXRhYmFzZSkgPyAnLXdlYmtpdC0nIDogKHVhLmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwKSA/ICctbW96LScgOiB3aW5kb3cub3BlcmEgPyAnLW8tJyA6IChkb2N1bWVudC5hbGwgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpID09PSAtMSkgPyAnLW1zLScgOiAnJztcbiAgcmV0dXJuIHByZWZpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybShlbCkge1xuICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJyk7XG4gIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKVxcKSkvKTtcblxuICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4gIGlmIChyZXN1bHRzWzFdID09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG5cbiAgcmVzdWx0cy5wdXNoKDApO1xuICByZXR1cm4gcmVzdWx0cy5zbGljZSg1LCA4KTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWChlbCkge1xuLy8gICAvLyBjaHJvbWUgd29uJ3QgdXNlIHByZWZpeFxuLy8gICAvLyB2YXIgc3R5bGVfYXR0ciA9IGJyb3dzZXJQcmVmaXgoKSArICd0cmFuc2Zvcm0nO1xuLy8gICB2YXIgc3R5bGVfYXR0ciA9ICd0cmFuc2Zvcm0nO1xuLy8gICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVfYXR0cik7XG4vLyAgIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKVxcKSkvKTtcbi8vICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuLy8gICBpZiAocmVzdWx0c1sxXSA9PT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcbi8vICAgcmVzdWx0cy5wdXNoKDApO1xuLy8gICByZXR1cm4gKyhyZXN1bHRzLnNsaWNlKDUsIDgpWzBdKTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWChlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdzdHlsZScpLnNwbGl0KCd0cmFuc2xhdGUzZCcpWzFdLnNwbGl0KCcsICcpWzBdLnNsaWNlKDEpLnNwbGl0KCdweCcpWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWShvYmopIHtcbiAgaWYgKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgcmV0dXJuO1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG9iaiksXG4gICAgICB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gfHwgc3R5bGUud2Via2l0VHJhbnNmb3JtIHx8IHN0eWxlLm1velRyYW5zZm9ybTtcbiAgdmFyIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKTtcbiAgaWYgKG1hdCkgcmV0dXJuIHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzEzXSk7XG4gIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gIHJldHVybiBtYXQgPyBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVs1XSkgOiAwO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PT0gJ29iamVjdCcgP1xuICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhocihtZXRob2QsIHVybCwgY2FsbGJhY2ssIHBhcmFtc09iaiA9IHt9LCBpc0FzeW5jID0gdHJ1ZSkge1xuICB2YXIgeG1saHR0cDtcblxuICB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoeG1saHR0cC5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgIGlmICh4bWxodHRwLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY2FsbGJhY2soeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBlbHNlIGlmICh4bWxodHRwLnN0YXR1cyA9PSA0MDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3IgNDAwJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbWV0aGluZyBlbHNlIG90aGVyIHRoYW4gMjAwIHdhcyByZXR1cm5lZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgY29tYlVybCA9IHVybCArIHNlcmlhbGl6ZShwYXJhbXNPYmopO1xuXG4gIHhtbGh0dHAub3BlbihtZXRob2QsIGNvbWJVcmwsIGlzQXN5bmMpO1xuICB4bWxodHRwLnNlbmQobnVsbCk7XG59XG5cbi8qKlxuICogW3N0cmluZ2lmeSB3aXRoIDQgc3BhY2VzIGF0IGVhY2ggbGV2ZWxdXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCBcIlxcdFwiKTsgLy8gc3RyaW5naWZ5IHdpdGggdGFicyBpbnNlcnRlZCBhdCBlYWNoIGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWF1dGlmeUpTT04oanNPYmopIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXG4gKiBAcGFyYW0gIHtKU09OIG9iamVjdH0ganNvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaHRsaWdodEpTT04oanNvbikge1xuICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcbiAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICByZXR1cm4ganNvbi5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgdmFyIGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanNcbiAqKi8iLCJpbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGxldCBmbGFzaEVsZSA9IHN0clRvRG9tKGZsYXNoVHBsKGRhdGEpKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmbGFzaEVsZSk7XG4gIHNldFRpbWVvdXQoZGVzdG9yeS5iaW5kKG51bGwsIGZsYXNoRWxlKSwgMjAwMCk7XG59XG5cbmZ1bmN0aW9uIGZsYXNoVHBsKGRhdGEpIHtcbiAgbGV0IHN0ciA9IGBcblx0XHQ8ZGl2IGNsYXNzPVwiZmxhc2gtbGF5ZXIgJHtkYXRhLmVycm9yID8gJ2Vycm9yJyA6ICdzdWNjZXNzJ31cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJtZXNzYWdlXCI+JHtkYXRhLmVycm9yIHx8IGRhdGEubWVzc2FnZX08L2Rpdj5cblx0XHQ8L2Rpdj5cblx0YCAgO1xuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiBkZXN0b3J5KGVsZSkge1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICB9KTtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ2JsaW5rJyk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9mbGFzaC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=