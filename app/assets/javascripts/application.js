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
	
	var _commonPopup = __webpack_require__(15);
	
	var _commonUtilities = __webpack_require__(9);
	
	var _apiTreeTreeDom = __webpack_require__(12);
	
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
	    console.log(JSON.parse(data));
	  },
	  success: function success(data) {
	    console.log(data);
	  },
	  error: function error(data) {
	    console.log(2, 'error', JSON.parse(data));
	  }
	};
	
	function initXhr() {
	  getAllApis();
	  document.addEventListener('click', bindEvent);
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
	    var baseApiLi = strToDom(newApiLiTpl());
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
	function strToDom(str) {
	  var tmpEle = document.createElement('div');
	  tmpEle.innerHTML = str;
	  var returnDom = tmpEle.children[0];
	  return returnDom;
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
	
	function del(argument) {
	  var action = ev.target.closest('.api-tree-wrapper').previousSibling.getElementsByClassName('api-save')[0].dataset.action;
	  var params = { 'action': action };
	  var callback = function callback() {};
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
	    if (ev.target.dataset.method.toUpperCase() === "PATCH") {
	      (0, _commonAjax.$http)(rootAPI + '/' + ev.target.closest('.per-api').dataset.id).patch(params, 'api').then(callback.success)['catch'](callback.error);
	    } else if (ev.target.dataset.method.toUpperCase() === 'POST') {
	      (0, _commonAjax.$http)(rootAPI).post(params, 'api').then(callback.success)['catch'](callback.error);
	    }
	  };
	
	  if (ev.target.classList.contains('del-dataroot-child')) {
	    (0, _commonPopup.popup)(ev, {}, deleteApi.bind(this, ev));
	  };
	  function deleteApi(ev) {
	    var params = {};
	    (0, _commonAjax.$http)(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)['delete'](params).then(callback.success)['catch'](callback.error);
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
	            reject(this.statusText);
	          }
	        };
	        client.onerror = function () {
	          reject(this.statusText);
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
	exports.ApiDom = ApiDom;
	
	var _tree = __webpack_require__(13);
	
	var _commonPopup = __webpack_require__(15);
	
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
	  perApiEle.dataset.id = data.id;
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
	
	  $apiSave.addEventListener('click', function (ev) {
	    $apiUri.disabled = true;
	  });
	
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
/* 13 */
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
	
	var _queue = __webpack_require__(14);
	
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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.popup = popup;
	
	var _toggleScroll = __webpack_require__(16);
	
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
/* 16 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjU4NjAyOWIxY2RjNmM0MzljMTEiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OzZDQ3RDd0IsQ0FBcUI7OzRDQUMxQixDQUFvQjs7Z0RBRWpCLENBQXdCOztBQUM5QyxtQ0FBVyxDQUFDOzs7Ozs7QUFNWixFQUFDLFlBQU07QUFDTCxPQUFJLE1BQU0sR0FBRztBQUNYLFFBQUcsdUJBQU07QUFDVCxXQUFNLEVBQUUsOEJBQVM7SUFDbEIsQ0FBQztBQUNGLE9BQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ3hDLE9BQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNuQyxTQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsSUFDdkUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN6QixZQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxlQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FB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LEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUMsT0FBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRSxVQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsd0dBQXdHLEVBQUUsVUFBUyxLQUFLLEVBQUU7QUFDNUksU0FBSSxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25CLFNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNwQixXQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDcEIsWUFBRyxHQUFHLEtBQUssQ0FBQztRQUNiLE1BQU07QUFDTCxZQUFHLEdBQUcsUUFBUSxDQUFDO1FBQ2hCO01BQ0YsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbkMsVUFBRyxHQUFHLFNBQVMsQ0FBQztNQUNqQixNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUM3QixVQUFHLEdBQUcsTUFBTSxDQUFDO01BQ2Q7QUFDRCxZQUFPLGVBQWUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxTQUFTLENBQUM7SUFDekQsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NTg2MDI5YjFjZGM2YzQzOWMxMVxuICoqLyIsImltcG9ydCB7ZGF0YUxpbmtzfSBmcm9tICcuL21vZHVsZXMvZGF0YUxpbmtzJztcbmltcG9ydCB7aG9tZX0gZnJvbSAnLi9tb2R1bGVzL2hvbWVwYWdlJztcblxuaW1wb3J0IHtpbml0WGhyfSBmcm9tICcuL21vZHVsZXMvYXBpT3BlcmF0aW9uJztcbmRhdGFMaW5rcygpO1xuLy8gYXBpVHJlZSgpO1xuLy8gdmFyIHAgPSBuZXcgZGF3blNWRygpO1xuLy8gcC5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWludGVyLXRhcmdldCcpKTtcbi8vIHAuc3RhcnQoKTtcblxuKCgpID0+IHtcbiAgbGV0IHJvdXRlcyA9IHtcbiAgICAnLyc6IGhvbWUsXG4gICAgJy9kZXYnOiBbaW5pdFhocl1cbiAgfTtcbiAgbGV0IHBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHBhdGhOYW1lKSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocm91dGVzW3BhdGhOYW1lXSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiZcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm91dGVzW3BhdGhOYW1lXVtpXS5hcHBseShudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVzW3BhdGhOYW1lXS5hcHBseShudWxsKTtcbiAgICB9XG4gIH1cblxufSkoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzXG4gKiovIiwiaW1wb3J0IHtoYW5kbGVNZXRob2R9IGZyb20gJy4uL2NvbW1vbi9oYW5kbGVNZXRob2QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGF0YUxpbmtzKCkge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NEYXRhTGluaywgZmFsc2UpO1xufVxuZnVuY3Rpb24gcHJvY2Vzc0RhdGFMaW5rKGUpIHtcbiAgdmFyIGUgPSB3aW5kb3cuZSB8fCBlO1xuXG4gIGlmIChlLnRhcmdldC50YWdOYW1lICE9PSAnQScpXG4gICAgICByZXR1cm47XG5cbiAgLy8gRG8gc29tZXRoaW5nXG4gIGlmIChlLnRhcmdldC5kYXRhc2V0Lm1ldGhvZCA9PT0gJ2RlbGV0ZScpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0KTtcbiAgfVxuICAvLyBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdwYXRjaCcpIHtcbiAgLy8gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgaGFuZGxlTWV0aG9kKGUudGFyZ2V0LCB7XG4gIC8vICAgICBuczogJ2FwaScsXG4gIC8vICAgICBkYXRhOiB7XG4gIC8vICAgICAgIHNlY3Rpb246ICd3aXNlJyxcbiAgLy8gICAgICAgaWQ6ICcyJ1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZGF0YUxpbmtzLmpzXG4gKiovIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb24vY3NyZic7XG4vKipcbiAqIFtoYW5kbGVNZXRob2QgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtIVE1MRWxlbWVudH0gbGluayBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSGFuZGxlcyBcImRhdGEtbWV0aG9kXCIgb24gbGlua3Mgc3VjaCBhczpcbiAqIDxhIGhyZWY9XCIvdXNlcnMvNVwiIGRhdGEtbWV0aG9kPVwiZGVsZXRlXCIgcmVsPVwibm9mb2xsb3dcIiBkYXRhLWNvbmZpcm09XCJBcmUgeW91IHN1cmU/XCI+RGVsZXRlPC9hPlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlTWV0aG9kKGxpbmssIG9iaiA9IHt9KSB7XG4gIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICBtZXRob2QgPSBsaW5rLmRhdGFzZXQubWV0aG9kLFxuICAgIHRhcmdldCA9IGxpbmsuZ2V0QXR0cmlidXRlKCd0YXJnZXQnKSxcbiAgICBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCksXG4gICAgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICB2YXIgcGFyYW1zT2JqID0ge1xuICAgIGhyZWY6IGhyZWYsXG4gICAgbWV0aG9kOiBtZXRob2QsXG4gICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgY3NyZlRva2VuOiBjc3JmVG9rZW4sXG4gICAgY3NyZlBhcmFtOiBjc3JmUGFyYW1cbiAgfTtcbiAgdmFyIGZvcm1FbGUgPSBjcmVhdGVGb3JtKHBhcmFtc09iaiwgb2JqKTtcbiAgYXBwZW5kRm9ybVRvRG9tKGZvcm1FbGUpO1xuICBzdWJtaXRGb3JtKGZvcm1FbGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybShwYXJhbXMsIG9iaikge1xuICB2YXIgZiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBmLnNldEF0dHJpYnV0ZSgnbWV0aG9kJywncG9zdCcpO1xuICBmLnNldEF0dHJpYnV0ZSgnYWN0aW9uJyxwYXJhbXMuaHJlZik7XG4gIGlmIChwYXJhbXMudGFyZ2V0KSB7XG4gICAgZi5zZXRBdHRyaWJ1dGUoJ3RhcmdldCcsIHBhcmFtcy50YXJnZXQpO1xuICB9O1xuXG4gIHZhciBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ25hbWUnLCdfbWV0aG9kJyk7XG4gIGkuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLm1ldGhvZCk7XG5cbiAgdmFyIHM7XG4gIGlmIChwYXJhbXMuY3NyZlBhcmFtICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIHBhcmFtcy5jc3JmVG9rZW4gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgIVJQcy5pc0Nyb3NzRG9tYWluKHBhcmFtcy5ocmVmKSkge1xuICAgIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHMuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ25hbWUnLCBwYXJhbXMuY3NyZlBhcmFtKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5jc3JmVG9rZW4pO1xuICB9XG4gIGYuYXBwZW5kQ2hpbGQoaSk7XG5cbiAgLy8gZm9yIChsZXQga2V5IGluIG9iai5kYXRhKSB7XG4gIC8vICAgaWYgKG9iai5kYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgLy8gICAgIGxldCB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgnbmFtZScsJycgKyBvYmoubnMgKyAnWycgKyBrZXkgKyAnXScpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxvYmouZGF0YVtrZXldKTtcbiAgLy8gICAgIGYuYXBwZW5kQ2hpbGQodCk7XG4gIC8vICAgfVxuICAvLyB9XG5cbiAgaWYgKHMpIHtcbiAgICBmLmFwcGVuZENoaWxkKHMpO1xuICB9O1xuICByZXR1cm4gZjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kRm9ybVRvRG9tKGZvcm0pIHtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcbn1cbmZ1bmN0aW9uIHN1Ym1pdEZvcm0oZm9ybSkge1xuICBmb3JtLnN1Ym1pdCgpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qc1xuICoqLyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jc3JmLmpzXG4gKiovIiwiaW1wb3J0IHt0d2VldEJveH0gZnJvbSAnLi90d2VldEJveCc7XG5leHBvcnQgZnVuY3Rpb24gaG9tZSgpIHtcblx0dHdlZXRCb3goKTtcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2hvbWVwYWdlLmpzXG4gKiovIiwiZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoZWwsIDApO1xuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWV0Qm94KCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gIHZhciB0YiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0d2VldC1ib3gnKVswXTtcbiAgdmFyIHRiZCA9IHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgdmFyIHRiZFN0cmluZyA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdjb25kZW5zZWQnKTtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCkge1xuXG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuY2xhc3NMaXN0LmFkZCgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICh0YmQuaW5uZXJIVE1MID09PSAnV2hhdFxcJ3MgaGFwcGVuaW5nPycpIHtcblxuICAgICAgdGJkLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICB9XG4gIH0pO1xuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmlubmVySFRNTCkge1xuICAgICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgICB9IGVsc2Uge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcblxuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH07XG4gICAgaWYgKHRiLmlubmVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanNcbiAqKi8iLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XG5pbXBvcnQge2h0bWx9IGZyb20gJy4uL2NvbW1vbi90ZW1wbGF0ZSc7XG5pbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuaW1wb3J0IHtpbnNlcnRBZnRlcn0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZS1kb20nO1xuXG5sZXQgcm9vdEFQSSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXMnO1xubGV0IHBheWxvYWQgPSB7fTtcbmxldCBhcGlzQXJyID0gW107XG5cbnZhciBjYWxsYmFjayA9IHtcbiAgZ2V0QXBpU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGFkZEFwaVRyZWUoSlNPTi5wYXJzZShkYXRhKSwgdGhpcyk7XG4gIH0sXG4gIGdldEFsbEFwaXNTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcmVuZGVyQWxsQXBpcyhkYXRhKTtcbiAgICBiaW5kZXZlbnRzKCk7XG4gIH0sXG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKEpTT04ucGFyc2UoZGF0YSkpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZ2V0QWxsQXBpcygpO1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJpbmRFdmVudCk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUZvbGRMaShjb250ZXh0KSB7XG4gIGNvbnRleHQuY2xhc3NMaXN0LnRvZ2dsZSgndW5mb2xkJyk7XG59XG5mdW5jdGlvbiBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24oZXYpIHtcbiAgdG9nZ2xlRm9sZExpKHRoaXMpO1xuICBpZiAodGhpcy5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICByZXR1cm47XG4gIH07XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLnBhcmVudE5vZGUuZGF0YXNldC5hcGlJZClcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5nZXRBcGlTdWNjZXNzLmJpbmQodGhpcy5wYXJlbnROb2RlKSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGJpbmRldmVudHMoKSB7XG4gIGxldCBhcGlMaXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbGktZGVzY3JpcHRpb24nKTtcbiAgW10uc2xpY2UuY2FsbChhcGlMaXMpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRBcGlUcmVlKGRhdGEgPSB7fSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgbGV0IG5ld0FwaSA9IG5ldyBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpO1xuICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcbn1cbmZ1bmN0aW9uIG5ld0FwaUJ0bigpIHtcbiAgbGV0IG5ld0FwaURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWRlcicpWzBdO1xuICBuZXdBcGlEaXYuY2xhc3NMaXN0LmFkZCgnbmV3LWFwaScpO1xuICBuZXdBcGlEaXYuaW5uZXJIVE1MID0gYDxpbnB1dCBjbGFzcz1cImFkZC1hcGktYnRuXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwibmV3IEFQSVwiPmA7XG4gIG5ld0FwaURpdi5jaGlsZHJlblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIGxldCBhcGlVbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11bCcpWzBdO1xuICAgIGxldCBiYXNlQXBpTGkgPSBzdHJUb0RvbShuZXdBcGlMaVRwbCgpKTtcbiAgICBhcGlVbC5pbnNlcnRCZWZvcmUoYmFzZUFwaUxpLCBhcGlVbC5maXJzdENoaWxkKTtcbiAgICBhZGRBcGlUcmVlKHt9LCBiYXNlQXBpTGksIHRydWUpO1xuICAgIHRvZ2dsZUZvbGRMaShiYXNlQXBpTGkuY2hpbGRyZW5bMF0pO1xuICAgIGJhc2VBcGlMaS5jaGlsZHJlblswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24uY2FsbCh0aGlzLCBldik7XG4gICAgfSk7XG4gIH0pO1xuICBpbnNlcnRBZnRlcihuZXdBcGlEaXYsIGhlYWRlcik7XG4gIHJldHVybiBuZXdBcGlEaXY7XG59XG5mdW5jdGlvbiBzdHJUb0RvbShzdHIpIHtcbiAgbGV0IHRtcEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0bXBFbGUuaW5uZXJIVE1MID0gc3RyO1xuICBsZXQgcmV0dXJuRG9tID0gdG1wRWxlLmNoaWxkcmVuWzBdO1xuICByZXR1cm4gcmV0dXJuRG9tO1xufVxuZnVuY3Rpb24gbmV3QXBpTGlUcGwoZGF0YSA9IHt9KSB7XG4gIHZhciB0cGwgPSBgXG4gICAgPGxpIGNsYXNzPVwiYXBpLWxpXCIgZGF0YS1hcGktaWQ9XCIke2RhdGEuaWQgfHwgbnVsbH1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbGktZGVzY3JpcHRpb25cIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktY29sbGFwc2VcIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS11cmlcIj4ke2RhdGEudXJpIHx8ICcoTm8gdXJpKSd9PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS1uYW1lXCI+JHtkYXRhLm5hbWUgPyBkYXRhLm5hbWUgOiAnKE5vIG5hbWUpJ308L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xpPlxuICBgO1xuICByZXR1cm4gdHBsO1xufVxuZnVuY3Rpb24gcmVuZGVyQWxsQXBpcyhkYXRhKSB7XG4gIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBjb25zdCB0bXBsID0gZGF0YSA9PiBodG1sYFxuICAgICAgPHVsIGNsYXNzPVwiYXBpLXVsXCI+XG4gICAgICAke2RhdGEubWFwKGl0ZW0gPT4gaHRtbGBcbiAgICAgICAgJHtuZXdBcGlMaVRwbChpdGVtKX1cbiAgICAgIGApfVxuICAgICAgPC91bD5cbiAgYDtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkZXInKVswXTtcbiAgbGV0IGFwaUxpc3RFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYXBpTGlzdEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwtd3JhcHBlcicpO1xuICBhcGlMaXN0RWxlLmlubmVySFRNTCA9IHRtcGwoZGF0YSk7XG4gIGluc2VydEFmdGVyKGFwaUxpc3RFbGUsIG5ld0FwaUJ0bigpKTtcbn1cblxuZnVuY3Rpb24gZGVsIChhcmd1bWVudCkge1xuICAgdmFyIGFjdGlvbiA9IGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLXRyZWUtd3JhcHBlcicpLnByZXZpb3VzU2libGluZy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdLmRhdGFzZXQuYWN0aW9uO1xuICAgdmFyIHBhcmFtcyA9IHsnYWN0aW9uJzogYWN0aW9ufTtcbiAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICBcbiAgIH07XG59XG5mdW5jdGlvbiBnZXRBbGxBcGlzKCkge1xuICAkaHR0cChyb290QVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFsbEFwaXNTdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBiaW5kRXZlbnQoZXYpIHtcbiAgaWYgKGV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1zYXZlJykpIHtcbiAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgJ3NlY3Rpb24nOiBldi50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2VjdGlvbicpWzBdLnZhbHVlLFxuICAgICAgJ3VyaSc6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSxcbiAgICAgICdtZXRob2QnOiBldi50YXJnZXQucGFyZW50Tm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF0udmFsdWVcbiAgICB9O1xuICAgIGlmIChldi50YXJnZXQuZGF0YXNldC5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gXCJQQVRDSFwiKSB7XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgZXYudGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykuZGF0YXNldC5pZClcbiAgICAgIC5wYXRjaChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfSBlbHNlIGlmIChldi50YXJnZXQuZGF0YXNldC5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnKSB7XG4gICAgICAkaHR0cChyb290QVBJKVxuICAgICAgLnBvc3QocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsLWRhdGFyb290LWNoaWxkJykpIHtcbiAgICBwb3B1cChldiwge30sIGRlbGV0ZUFwaS5iaW5kKHRoaXMsIGV2KSk7IFxuICB9O1xuICBmdW5jdGlvbiBkZWxldGVBcGkoZXYpIHtcbiAgICBsZXQgcGFyYW1zID0ge307XG4gICAgJGh0dHAocm9vdEFQSSArICcvJyArIGV2LnRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpLmRhdGFzZXQuaWQpXG4gICAgLmRlbGV0ZShwYXJhbXMpXG4gICAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICB9XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzXG4gKiovIiwiLyoqXG4vLyBCLT4gSGVyZSB5b3UgZGVmaW5lIGl0cyBmdW5jdGlvbnMgYW5kIGl0cyBwYXlsb2FkXG52YXIgbWRuQVBJID0gJ2h0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL3NlYXJjaC5qc29uJztcbnZhciBwYXlsb2FkID0ge1xuICAndG9waWMnIDogJ2pzJyxcbiAgJ3EnICAgICA6ICdQcm9taXNlJ1xufTtcbnZhciBjYWxsYmFjayA9IHtcbiAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygxLCAnc3VjY2VzcycsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9LFxuICBlcnJvciA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICBjb25zb2xlLmxvZygyLCAnZXJyb3InLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfVxufTtcbi8vIEVuZCBCXG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGxcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDEpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcywgY2FsbGJhY2suZXJyb3IpO1xuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsIGJ1dCBhbiBhbHRlcm5hdGl2ZSB3YXkgKDIpIHRvIGhhbmRsZSBQcm9taXNlIFJlamVjdCBjYXNlXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLnRoZW4odW5kZWZpbmVkLCBjYWxsYmFjay5lcnJvcik7XG4gKi9cblxuLy8gQS0+ICRodHRwIGZ1bmN0aW9uIGlzIGltcGxlbWVudGVkIGluIG9yZGVyIHRvIGZvbGxvdyB0aGUgc3RhbmRhcmQgQWRhcHRlciBwYXR0ZXJuXG5pbXBvcnQge3NlcmlhbGl6ZX0gZnJvbSAnLi9zZXJpYWxpemUnO1xuaW1wb3J0IHtpc0VtcHR5LCBtZXJnZU9iaiwgYWRkUHJlZml4VG9PYmosIHdyYXBPYmp9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi9jc3JmJztcblxuZXhwb3J0IGZ1bmN0aW9uICRodHRwKHVybCkge1xuICAvLyBBIHNtYWxsIGV4YW1wbGUgb2Ygb2JqZWN0XG4gIHZhciBjb3JlID0ge1xuXG4gICAgLy8gTWV0aG9kIHRoYXQgcGVyZm9ybXMgdGhlIGFqYXggcmVxdWVzdFxuICAgIGFqYXg6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhcmdzID0ge30sIHByZWZpeCkge1xuICAgICAgLy8gZm9yIFJhaWxzXG4gICAgICAvLyB1cmwgPSB1cmwgKyAnLmpzb24nO1xuICAgICAgLy8gQ3JlYXRpbmcgYSBwcm9taXNlXG4gICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgICAgIC8vIEluc3RhbnRpYXRlcyB0aGUgWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgdmFyIGNsaWVudCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgIGlmIChtZXRob2QgPT09ICdQT1NUJyB8fCBtZXRob2QgPT09ICdQVVQnIHx8IG1ldGhvZCA9PT0gJ1BBVENIJyB8fCBtZXRob2QgPT09ICdERUxFVEUnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IEpTT04uc3RyaW5naWZ5KGV4dGVuZEdlbmVyYWxQYXJhbXMod3JhcE9iaihhcmdzLCBwcmVmaXgpKSk7XG4gICAgICAgICAgY2xpZW50Lm9wZW4obWV0aG9kLCB1cmwpO1xuICAgICAgICAgIC8vIGNsaWVudC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgICAgY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgY2xpZW50LnNlbmQodXJpKTtcbiAgICAgICAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdHRVQnKSB7XG4gICAgICAgICAgbGV0IHVyaSA9IHNlcmlhbGl6ZShleHRlbmRHZW5lcmFsUGFyYW1zKGFkZFByZWZpeFRvT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCArICc/JyArIHVyaSk7XG4gICAgICAgICAgY2xpZW50LnNlbmQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjbGllbnQub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVzb2x2ZVwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZXF1YWwgdG8gMnh4XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZWplY3RcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGRpZmZlcmVudCB0aGFuIDJ4eFxuICAgICAgICAgICAgcmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjbGllbnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFkYXB0ZXIgcGF0dGVyblxuICByZXR1cm4ge1xuICAgICdnZXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0dFVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwb3N0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQT1NUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3B1dCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUFVUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3BhdGNoJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQQVRDSCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdkZWxldGUnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0RFTEVURScsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4dGVuZEdlbmVyYWxQYXJhbXMob2JqKSB7XG4gIGxldCBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIGxldCBjc3JmVG9rZW4gPSBSUHMuY3NyZlRva2VuKCk7XG4gIGxldCBnZW5lcmFsT2JqID0ge307XG4gIGdlbmVyYWxPYmoudXRmOCA9ICfinJMnO1xuICBnZW5lcmFsT2JqW2NzcmZQYXJhbV0gPSBjc3JmVG9rZW47XG4gIHJldHVybiBtZXJnZU9iaihvYmosIGdlbmVyYWxPYmopO1xufVxuLy8gRW5kIEFcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanNcbiAqKi8iLCIvKipcbiAqIFtzZXJpYWxpemUgY29udmVydHMgcmVjdXJzaXZlIG9iamVjdHNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG9iaiAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHByZWZpeCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBjb25zb2xlLmxvZyhzZXJpYWxpemUoe2ZvbzogXCJoaSB0aGVyZVwiLCBiYXI6IHsgYmxhaDogMTIzLCBxdXV4OiBbMSwgMiwgM10gfX0pKTtcbiAqIGZvbz1oaSUyMHRoZXJlJmJhciU1QmJsYWglNUQ9MTIzJmJhciU1QnF1dXglNUQlNUIwJTVEPTEmYmFyJTVCcXV1eCU1RCU1QjElNUQ9MiZiYXIlNUJxdXV4JTVEJTVCMiU1RD0zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5sZW5ndGggPT09IDA7XG59XG5leHBvcnQgZnVuY3Rpb24gY2xvbmVPYmoob2JqKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpO1xufVxuLyogY29uc2lkZXIgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VPYmoob2JqMSA9IHt9LCBvYmoyKSB7XG4gIGxldCBuZXdPYmogPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iajEpKTtcbiAgZm9yIChsZXQga2V5IGluIG9iajIpIHtcbiAgICBpZiAob2JqMi5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpba2V5XSA9IG9iajJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRQcmVmaXhUb09iaihvYmosIHByZWZpeCkge1xuICBpZiAoIXByZWZpeCkgcmV0dXJuIG9iajtcbiAgbGV0IG5ld09iaiA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbJycgKyBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSddID0gb2JqW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcE9iaihvYmosIHdyYXBwZXIpIHtcbiAgaWYgKCF3cmFwcGVyKSByZXR1cm4gb2JqO1xuICB2YXIgbmV3T2JqID0ge307XG4gIG5ld09ialt3cmFwcGVyXSA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBuZXdPYmpbd3JhcHBlcl1ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanNcbiAqKi8iLCJpbXBvcnQge2h0bWxFc2NhcGV9IGZyb20gJy4vaHRtbEVzY2FwZSc7XG5leHBvcnQgZnVuY3Rpb24gaHRtbChsaXRlcmFsU2VjdGlvbnMsIC4uLnN1YnN0cykge1xuICAvLyBVc2UgcmF3IGxpdGVyYWwgc2VjdGlvbnM6IHdlIGRvbuKAmXQgd2FudFxuICAvLyBiYWNrc2xhc2hlcyAoXFxuIGV0Yy4pIHRvIGJlIGludGVycHJldGVkXG4gIGxldCByYXcgPSBsaXRlcmFsU2VjdGlvbnMucmF3O1xuXG4gIGxldCByZXN1bHQgPSAnJztcblxuICBzdWJzdHMuZm9yRWFjaCgoc3Vic3QsIGkpID0+IHtcbiAgICAvLyBSZXRyaWV2ZSB0aGUgbGl0ZXJhbCBzZWN0aW9uIHByZWNlZGluZ1xuICAgIC8vIHRoZSBjdXJyZW50IHN1YnN0aXR1dGlvblxuICAgIGxldCBsaXQgPSByYXdbaV07XG5cbiAgICAvLyBJbiB0aGUgZXhhbXBsZSwgbWFwKCkgcmV0dXJucyBhbiBhcnJheTpcbiAgICAvLyBJZiBzdWJzdGl0dXRpb24gaXMgYW4gYXJyYXkgKGFuZCBub3QgYSBzdHJpbmcpLFxuICAgIC8vIHdlIHR1cm4gaXQgaW50byBhIHN0cmluZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0KSkge1xuICAgICAgc3Vic3QgPSBzdWJzdC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc3Vic3RpdHV0aW9uIGlzIHByZWNlZGVkIGJ5IGEgZG9sbGFyIHNpZ24sXG4gICAgLy8gd2UgZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBpdFxuICAgIGlmIChsaXQuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgc3Vic3QgPSBodG1sRXNjYXBlKHN1YnN0KTtcbiAgICAgIGxpdCA9IGxpdC5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHJlc3VsdCArPSBsaXQ7XG4gICAgcmVzdWx0ICs9IHN1YnN0O1xuICB9KTtcbiAgLy8gVGFrZSBjYXJlIG9mIGxhc3QgbGl0ZXJhbCBzZWN0aW9uXG4gIC8vIChOZXZlciBmYWlscywgYmVjYXVzZSBhbiBlbXB0eSB0ZW1wbGF0ZSBzdHJpbmdcbiAgLy8gcHJvZHVjZXMgb25lIGxpdGVyYWwgc2VjdGlvbiwgYW4gZW1wdHkgc3RyaW5nKVxuICByZXN1bHQgKz0gcmF3W3Jhdy5sZW5ndGggLSAxXTsgLy8gKEEpXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBodG1sRXNjYXBlKHN0cikge1xuXHRzdHIgPSAnJyArIHN0cjsgLy8gZm9yIG51bWJlcnMgZXRjLlxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykgLy8gZmlyc3QhXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL2AvZywgJyYjOTY7Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge2dldFRyYW5zbGF0ZVgsIHhociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBwZXJBcGlUcGwoZGF0YSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBsZXQgdHBsID1cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYXBpLWluZm9cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktdXJpXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cIlwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBPU1RcIj5QT1NUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQQVRDSFwiPlBBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8bGFiZWw+c2VjdGlvbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXNhdmVcIiBkYXRhLW1ldGhvZD1cIiR7cGF0Y2hPclBvc3QoaXNOZXdBcGkpfVwiIGRhdGEtYWN0aW9uPVwiL2FwaXMke3NhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSl9XCIgPiR7aXNOZXdBcGkgPyAnY3JlYXRlJyA6ICdzYXZlJ308L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktdGVzdFwiPnRlc3Q8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS13cmFwcGVyXCI+PGRpdiBjbGFzcz1cImFwaS10cmVlLWZyYW1lXCI+PHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+PC9kaXY+PGRpdiBjbGFzcz1cImFwaS10cmVlXCI+PC9kaXY+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWRhdGFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3cy1jb250cm9sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1iZWF1dGlmeVwiPmJlYXV0aWZ5PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtcHJldmlld1wiPnByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICByZXR1cm4gdHBsO1xufVxuXG52YXIgbGVhZkNvbnRlbnRUcGwgPSAnPGkgY2xhc3M9XCJyZW1vdmUtY2hpbGRcIj4tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1rZXlcIiBwbGFjZWhvbGRlcj1cImtleVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi12YWx1ZVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiYWRkLWNoaWxkXCI+KzwvaT4nO1xuXG52YXIgaW5pdFJlY3RPYmogPSB7XG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMFxufTtcblxuZnVuY3Rpb24gcGF0Y2hPclBvc3QoaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJ1BPU1QnIDogJ1BBVENIJztcbn1cbmZ1bmN0aW9uIHNhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnJyA6IGAvJHtkYXRhLmlkfWA7XG59XG5mdW5jdGlvbiBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpIHtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5kYXRhc2V0LmlkID0gZGF0YS5pZDtcbiAgcGVyQXBpRWxlLmlubmVySFRNTCA9IHBlckFwaVRwbChkYXRhLCBpc05ld0FwaSk7XG4gIHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUgPSBpc05ld0FwaSA/ICcnIDogZGF0YS51cmk7XG4gIHJldHVybiBwZXJBcGlFbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgdGhpcy5hcGlDb250YWluZXIgPSBjb250YWluZXJOb2RlO1xuXG4gIHRoaXMuYXBpQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSkpO1xuXG4gIHRoaXMuYXBpRWxlID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLWFwaScpWzBdO1xuICBcbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNBUEkoKTtcblxuICB0aGlzLmxlYWZJbmRleCA9IDE7XG5cbiAgdGhpcy4kYXBpVHJlZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZignX2RhdGFfcm9vdCcsIDEsIDAsIGluaXRSZWN0T2JqKSk7XG5cbiAgdGhpcy4kYXBpVHJlZUZyYW1lID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtZnJhbWUnKVswXTtcblxuICB0aGlzLmluaXRBcGlUcmVlKCk7XG5cbiAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuXG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9ICcnO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLnN0b3JlQXBpUmV0dXJuRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gZGF0YTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmNsaWNrKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5qc29uVmlldyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdmFyICRwcmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgJHByZS5pbm5lckhUTUwgPSBkYXRhO1xuICB0aGlzLiRkYXRhVmlldy5pbm5lckhUTUwgPSAnJztcbiAgdGhpcy4kZGF0YVZpZXcuYXBwZW5kQ2hpbGQoJHByZSk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0FQSSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBuZXdseUNyZWF0ZWRBcGlOb2RlID0gdGhpcy5hcGlFbGU7XG5cbiAgdmFyICRhcGlTYXZlID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdO1xuICB2YXIgJGFwaVVyaSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdO1xuICB2YXIgJGFwaVRlc3QgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10ZXN0JylbMF07XG4gIHZhciAkYXBpTWV0aG9kID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbWV0aG9kJylbMF07XG5cbiAgdmFyICRkYXRhUmF3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXJhdycpWzBdO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtYmVhdXRpZnknKVswXTtcbiAgdmFyICRkYXRhSGlnaGxpZ2h0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWhpZ2hsaWdodCcpWzBdO1xuICB2YXIgJGRhdGFQcmV2aWV3ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLXByZXZpZXcnKVswXTtcblxuICB0aGlzLiRkYXRhVmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS12aWV3JylbMF07XG5cbiAgJGFwaVNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICRhcGlVcmkuZGlzYWJsZWQgPSB0cnVlO1xuICB9KTtcblxuICAkYXBpVGVzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB4aHIoJGFwaU1ldGhvZC52YWx1ZSwgJGFwaVVyaS52YWx1ZSwgdGhpcy5zdG9yZUFwaVJldHVybkRhdGEuYmluZCh0aGF0KSk7XG4gIH0pO1xuXG4gICRkYXRhUmF3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcodGhpcy5hcGlSZXR1cm5EYXRhKTtcbiAgfSk7XG5cbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoYmVhdXRpZnlKU09OKEpTT04ucGFyc2UodGhpcy5hcGlSZXR1cm5EYXRhKSkpO1xuICB9KTtcblxuICAkZGF0YUhpZ2hsaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGhpZ2h0bGlnaHRKU09OKEpTT04ucGFyc2UodGhpcy5hcGlSZXR1cm5EYXRhKSkpO1xuICB9KTtcblxuICAkZGF0YVByZXZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldygnVGhpcyBmZWF0dXJlIGhhcyBub3QgYmVlbiBhY2NvbXBsaXNoZWQgeWV0LicpO1xuICB9KTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5vcGVyYXRlRGF0YVJvb3RDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBhZGRNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBhZGRNYXJrLmNsYXNzTmFtZSA9ICdhZGQtZGF0YXJvb3QtY2hpbGQnO1xuICBhZGRNYXJrLnRleHRDb250ZW50ID0gJysnO1xuICBhZGRNYXJrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoYXQubGVhZkluZGV4ICs9IDE7XG4gICAgICB2YXIgcGFyZW50SWR4ID0gJ19kYXRhX3Jvb3QnO1xuICAgICAgdmFyIG5vZGVMZXZlbCA9IDA7XG4gICAgICB0aGF0LmFwaVRyZWUuYWRkKHRoYXQubGVhZkluZGV4LCBwYXJlbnRJZHgsIHRoYXQuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICAgICAgdGhhdC4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkeCwgdGhhdC5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgaW5pdFJlY3RPYmopKTtcbiAgICAgIHZhciBvYmogPSB0aGF0LmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICAgICAgdGhhdC5zdHlsZU5vZGVzKG9iaik7XG4gICAgICB0aGF0LmJpbmRFdmVudHNUb01SQ0UoKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoYWRkTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxuICB2YXIgZGVsTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZGVsTWFyay5jbGFzc05hbWUgPSAnZGVsLWRhdGFyb290LWNoaWxkJztcbiAgZGVsTWFyay50ZXh0Q29udGVudCA9ICctJztcbiAgZGVsTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAvKiB0aGlzIEFQSSBpcyBkZWxldGVkLiAqL1xuXG4gICAgICAvLyB0aGF0LmFwaUNvbnRhaW5lci5yZW1vdmVDaGlsZChldi5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykpO1xuICAgIH0pO1xuICB0aGlzLiRhcGlUcmVlLmluc2VydEJlZm9yZShkZWxNYXJrLCB0aGlzLiRhcGlUcmVlLmZpcnN0Q2hpbGQpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmluaXRBcGlUcmVlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXBpVHJlZSA9IG5ldyBUcmVlKCdfZGF0YV9yb290Jyk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoMSwgJ19kYXRhX3Jvb3QnLCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgdGhpcy5vcGVyYXRlRGF0YVJvb3RDaGlsZCgpO1xuXG4gIHJldHVybiB0aGlzLmFwaVRyZWU7XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmRlbE5vZGUgPSBmdW5jdGlvbihjdHgpIHtcbiAgdmFyIGN1cnJlbnRMZWFmID0gY3R4LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICB2YXIgcGFyZW50SWR4ID0gaXNOYU4oK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQpID8gJ19kYXRhX3Jvb3QnIDogK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQ7XG5cbiAgdmFyIG5vZGVzQXJyID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGVzY2VuZGFudHMoY3VycmVudElkeCk7XG4gIHZhciBpZHhBcnIgPSBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKTtcbiAgdGhpcy5hcGlUcmVlLnJlbW92ZShjdXJyZW50SWR4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdGhpcy5yZW1vdmVOb2Rlc0Zyb21Eb20oaWR4QXJyKTtcblxuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZHgpO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0LmluZGV4KSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJGFwaVRyZWUucmVtb3ZlQ2hpbGQoYWxsTGVhdmVzW2ldKTtcbiAgICB9XG4gIH07XG59O1xuZnVuY3Rpb24gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycikge1xuICB2YXIgbm9kZXNBcnJMZW4gPSBub2Rlc0Fyci5sZW5ndGg7XG4gIHZhciBpZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlc0FyckxlbjsgaSsrKSB7XG4gICAgaWR4QXJyLnB1c2gobm9kZXNBcnJbaV0uZGF0YSk7XG4gIH07XG4gIHJldHVybiBpZHhBcnI7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDRSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGVhdmVzID0gdGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJyk7XG4gIHZhciBsZWF2ZXNMZW4gPSBsZWF2ZXMubGVuZ3RoO1xuICB2YXIgbmV3bHlDcmVhdGVkTGVhZiA9IGxlYXZlc1tsZWF2ZXNMZW4gLSAxXTtcbiAgdmFyICRhZGRDaGlsZCA9IG5ld2x5Q3JlYXRlZExlYWYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWNoaWxkJylbMF07XG4gICRhZGRDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eCA9PiB7XG4gICAgdGhpcy5hZGRDaGlsZChjdHgpO1xuICB9KTtcblxuICB2YXIgJHJlbW92ZUNoaWxkID0gbmV3bHlDcmVhdGVkTGVhZi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZW1vdmUtY2hpbGQnKVswXTtcbiAgJHJlbW92ZUNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4ID0+IHtcbiAgICB0aGlzLmRlbE5vZGUoY3R4KTtcbiAgfSk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLnNldFBhcmVudE5vZGVWYWwgPSBmdW5jdGlvbihpZHgpIHtcbiAgdmFyIGxlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIHF1ZXVlID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcbiAgdmFyIHF1ZXVlTGVuID0gcXVldWUuX25ld2VzdEluZGV4IC0gcXVldWUuX29sZGVzdEluZGV4O1xuICBmb3IgKHZhciBpID0gMCwgeCA9IGxlYXZlcy5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBpZiAoK2xlYXZlc1tpXS5kYXRhc2V0LmluZGV4ID09PSBpZHgpIHtcbiAgICAgIGlmIChxdWV1ZUxlbiA+IDApIHtcbiAgICAgICAgbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICctLS0+JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnJztcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICB9O1xuICB9O1xufTtcbkFwaURvbS5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbihjdHgpIHtcbiAgdGhpcy5sZWFmSW5kZXggKz0gMTtcbiAgdmFyIHBhcmVudElkZXggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICB2YXIgbm9kZUxldmVsID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5sZXZlbCArIDE7XG5cbiAgLy8gYXBpVHJlZSBvcGVyYXRpb25cbiAgdGhpcy5hcGlUcmVlLmFkZCh0aGlzLmxlYWZJbmRleCwgcGFyZW50SWRleCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSkpO1xuICB2YXIgY2hpbGRyZW5Ob2RlcyA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKHBhcmVudElkZXgpO1xuXG4gIHZhciBjaGlsZHJlbklkeEFyciA9IFtdO1xuICBmb3IgKHZhciBwZXJOb2RlIGluIGNoaWxkcmVuTm9kZXMuX3N0b3JhZ2UpIHtcbiAgICBpZiAoKHR5cGVvZiBwYXJzZUludChwZXJOb2RlKSA9PT0gJ251bWJlcicpICYmIGNoaWxkcmVuTm9kZXMuX3N0b3JhZ2VbcGVyTm9kZV0uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xuICAgICAgY2hpbGRyZW5JZHhBcnIucHVzaChjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmRhdGEpO1xuICAgIH07XG4gIH1cblxuICB2YXIgY2hpbGRyZW5JZHhBcnJMZW4gPSBjaGlsZHJlbklkeEFyci5sZW5ndGg7XG5cbiAgY2xvbmVkUmVjdE9iai5yaWdodCAtPSAzMDtcblxuICBjbG9uZWRSZWN0T2JqLmJvdHRvbSA9IGNoaWxkcmVuSWR4QXJyTGVuID09PSAxID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkUmVjdE9iai5ib3R0b20gKyBjbG9uZWRSZWN0T2JqLmhlaWdodCAqIChjaGlsZHJlbklkeEFyckxlbiAtIDIpICsgKGNoaWxkcmVuSWR4QXJyTGVuIC0gMSkgKiAyMDtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkZXgsIHRoaXMubGVhZkluZGV4LCBub2RlTGV2ZWwsIGNsb25lZFJlY3RPYmopKTtcbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNFKCk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkZXgpO1xuXG59O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUxlYWZTcGFuKHBhcmVudElkLCBub2RlSW5kZXgsIG5vZGVMZXZlbCwgcmVjdE9iaikge1xuICB2YXIgbmV3TGVhZlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGVhZicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JywgcGFyZW50SWQpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLCBub2RlSW5kZXgpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtbGV2ZWwnLCBub2RlTGV2ZWwpO1xuICBuZXdMZWFmU3Bhbi5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArIE1hdGgucm91bmQocmVjdE9iai5yaWdodCkgKyAncHgsICcgKyBNYXRoLnJvdW5kKHJlY3RPYmouYm90dG9tKSArICdweCwgMCknO1xuICBuZXdMZWFmU3Bhbi5pbm5lckhUTUwgPSBsZWFmQ29udGVudFRwbDtcbiAgcmV0dXJuIG5ld0xlYWZTcGFuO1xufVxuZnVuY3Rpb24gY3JlYXRlTGVhZihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikge1xuICB2YXIgbmV3TGVhZiA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgbmV3TGVhZi5hcHBlbmRDaGlsZChnZW5lcmF0ZUxlYWZTcGFuKHBhcmVudElkeCwgbm9kZUlkeCwgbm9kZUxldmVsLCByZWN0T2JqKSk7XG4gIHJldHVybiBuZXdMZWFmO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zdHlsZU5vZGVzID0gZnVuY3Rpb24oc3R5bGVPYmopIHtcbiAgdmFyIGxlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGxlYWZJZHgsIG9mZnNldFksIG9yaWdpbmFsWCA9ICcnO1xuXG4gIHZhciBzdHlsZXNBcnIgPSBbXSwgeFZhbHVlLCB5VmFsdWU7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZWF2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBvcmlnaW5hbFggPSBnZXRUcmFuc2xhdGVYKGxlYXZlc1tpXSk7XG4gICAgbGVhZklkeCA9ICsobGVhdmVzW2ldLmRhdGFzZXQuaW5kZXgpO1xuXG4gICAgZm9yICh2YXIgc3R5bGVPYmpJZHggaW4gc3R5bGVPYmopIHtcbiAgICAgIGlmICgrc3R5bGVPYmpJZHggPT09IGxlYWZJZHgpIHtcbiAgICAgICAgb2Zmc2V0WSA9IHN0eWxlT2JqW3N0eWxlT2JqSWR4XSAqIDUyO1xuICAgICAgfTtcbiAgICB9XG4gICAgc3R5bGVzQXJyLnB1c2goW29yaWdpbmFsWCwgb2Zmc2V0WV0pO1xuICB9O1xuXG4gIGZvciAodmFyIGogPSAwLCBzdHlsZXNBcnJMZW4gPSBzdHlsZXNBcnIubGVuZ3RoOyBqIDwgc3R5bGVzQXJyTGVuOyBqKyspIHtcbiAgICBsZWF2ZXNbal0uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBzdHlsZXNBcnJbal1bMF0gKyAncHgsICcgKyBzdHlsZXNBcnJbal1bMV0gKyAncHgsIDApJztcbiAgfVxuXG4gIHRoaXMuZGltZW5zaW9uQXJyID0gdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICB0aGlzLmRyYXdTVkcoKTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmFkZFNpYmxpbmcgPSBmdW5jdGlvbihjdHgpIHtcbiAgdGhpcy5sZWFmSW5kZXggKz0gMTtcbiAgdmFyIHBhcmVudElkeCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50O1xuICB2YXIgbm9kZUxldmVsID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5sZXZlbDtcbiAgcGFyZW50SWR4ID0gaXNOYU4ocGFyZW50SWR4KSA/ICdfZGF0YV9yb290JyA6IHBhcmVudElkeDtcbiAgdGhpcy5hcGlUcmVlLmFkZCh0aGlzLmxlYWZJbmRleCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHZhciByZWN0T2JqID0gdGhpcy5ub2RlTGVmdE9mZnNldChjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlKTtcbiAgdmFyIGNsb25lZFJlY3RPYmogPSBjbG9uZVJlY3RPYmoocmVjdE9iaik7XG4gIGNsb25lZFJlY3RPYmoucmlnaHQgPSBjbG9uZWRSZWN0T2JqLnJpZ2h0IC0gY2xvbmVkUmVjdE9iai53aWR0aDtcbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gKz0gMzA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZHgsIHRoaXMubGVhZkluZGV4LCBub2RlTGV2ZWwsIGNsb25lZFJlY3RPYmopKTtcbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuXG59O1xuXG4vKiB1dGlscyAqL1xuZnVuY3Rpb24gY2xvbmVSZWN0T2JqKG9iaikge1xuICByZXR1cm4ge1xuICAgIHRvcDogb2JqLnRvcCxcbiAgICBib3R0b206IG9iai5ib3R0b20sXG4gICAgbGVmdDogb2JqLmxlZnQsXG4gICAgcmlnaHQ6IG9iai5yaWdodCxcbiAgICB3aWR0aDogb2JqLndpZHRoLFxuICAgIGhlaWdodDogb2JqLmhlaWdodFxuICB9O1xufVxuXG4vKiBtYW5pcHVsYXRlIFNWRyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jbGVhclNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXTtcbiAgd2hpbGUgKHN2Zy5sYXN0Q2hpbGQpIHtcbiAgICBzdmcucmVtb3ZlQ2hpbGQoc3ZnLmxhc3RDaGlsZCk7XG4gIH1cbn07XG4vKipcbiAqIFtkcmF3U1ZHIGRlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gKi9cbkFwaURvbS5wcm90b3R5cGUuZHJhd1NWRyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyU1ZHKCk7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIHN2Z1BhcnRpYWxzID0gW107XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHN2Z1BhcnRpYWxzLnB1c2godGhhdC5jcmVhdGVTaW5nbGVTVkcobm9kZS5kYXRhLCBub2RlLmNvbHVtbiwgbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwsIChub2RlLnRvdGFsb2Zmc2V0eWxldmVsIC0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwpKSk7XG4gICAgfTtcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuXG4gIHZhciBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN2Z1BhcnRpYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZChzdmdQYXJ0aWFsc1tpXSk7XG4gIH1cbiAgdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5jcmVhdGVTaW5nbGVTVkcgPSBmdW5jdGlvbihpZHgsIGhvcmksIHBhcmVudFZlcnQsIGR2ZXJ0KSB7XG5cbiAgdmFyIHN2Z25zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgdmFyIG5ld1BhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnbnMsICdwYXRoJyk7XG4gIHZhciBjb250cm9sUmF0ZSA9IDAuMjtcbiAgdmFyIG14LCBteSwgcXgsIHF5LCBxeHgsIHF5eSwgdHgsIHR5O1xuICBob3JpID0gaG9yaSAtIDE7XG4gIGR2ZXJ0ID0gZHZlcnQ7XG4gIHBhcmVudFZlcnQgPSBwYXJlbnRWZXJ0O1xuXG4gIG14ID0gaG9yaSAqIDUwMTtcbiAgbXkgPSBwYXJlbnRWZXJ0ICogNTIgKyA4O1xuICBxeCA9IG14ICsgMTA7XG4gIHF5ID0gbXk7XG4gIHF4eCA9IG14ICsgMTU7XG4gIHF5eSA9IChteSArIChkdmVydCAvIDIpICogNTIpO1xuICB0eCA9IG14ICsgMzA7XG4gIHR5ID0gbXkgKyBkdmVydCAqIDUyO1xuXG4gIG5ld1BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCAnTSAnICsgbXggKyAnICcgKyBteSArICcgUSAnICsgcXggKyAnICcgKyBxeSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXh4ICsgJyAnICsgcXl5ICsgJyBUICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ICsgJyAnICsgdHkgKyAnJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdjbGFzcycsICdhcGktc3ZnLXBhdGgnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWR4JywgaWR4KTtcblxuICByZXR1cm4gbmV3UGF0aDtcbn07XG5cbi8qIGNhbGN1bGF0ZSBkaW1lbnNpb25zICovXG5BcGlEb20ucHJvdG90eXBlLmNhbGNEaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGltZW5zaW9uQXJyID0gdGhpcy5hcGlUcmVlLm1heExldmVscygpO1xuICB2YXIgaG9yaU1heCwgdmVydGljYWxNYXgsIGhvcmlBcnIgPSBbXSwgdmVydEFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgeCA9IHRoaXMuZGltZW5zaW9uQXJyLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGhvcmlBcnIucHVzaCh0aGlzLmRpbWVuc2lvbkFycltpXS5sZW5ndGgpO1xuICB9O1xuICBob3JpTWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaG9yaUFycik7XG4gIHZlcnRpY2FsTWF4ID0gdGhpcy5hcGlUcmVlLl9yb290LmNoaWxkcmVubGV2ZWw7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS53aWR0aCA9IGhvcmlNYXggKiA1MjAgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUuaGVpZ2h0ID0gdmVydGljYWxNYXggKiA1MiArICdweCc7XG4gIHRoaXMuZGltZW5zaW9uQXJyID0gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcbiAgcmV0dXJuIFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG5cbn07XG5cbi8qIGNhbGN1bGF0ZSBvZmZzZXQgKi9cblxuQXBpRG9tLnByb3RvdHlwZS5ub2RlTGVmdE9mZnNldCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHZhciBlbFJlY3RPYmplY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGJvZHlSZWN0T2JqID0gdGhpcy4kYXBpVHJlZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGNsb25lQm9keVJlY3RPYmogPSBjbG9uZVJlY3RPYmooYm9keVJlY3RPYmopO1xuICB2YXIgY2xvbmVFbFJlY3RPYmplY3QgPSBjbG9uZVJlY3RPYmooZWxSZWN0T2JqZWN0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QudG9wICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoudG9wKTtcbiAgY2xvbmVFbFJlY3RPYmplY3QuYm90dG9tICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoudG9wKTtcbiAgY2xvbmVFbFJlY3RPYmplY3QubGVmdCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLmxlZnQpO1xuICBjbG9uZUVsUmVjdE9iamVjdC5yaWdodCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLmxlZnQpO1xuICByZXR1cm4gY2xvbmVFbFJlY3RPYmplY3Q7XG59O1xuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLWRvbS5qc1xuICoqLyIsIi8qKlxuICogW1RyZWUgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0ge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXG4gKlxuICogX3Jvb3QgcG9pbnRzIHRvIHRoZSByb290IG5vZGUgb2YgYSB0cmVlLlxuICogdHJhdmVyc2VERihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIERGUy5cbiAqIHRyYXZlcnNlQkYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBCRlMuXG4gKiBjb250YWlucyhkYXRhLCB0cmF2ZXJzYWwpIHNlYXJjaGVzIGZvciBhIG5vZGUgaW4gYSB0cmVlLlxuICogYWRkKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2UpIGFkZHMgYSBub2RlIHRvIGEgdHJlZS5cbiAqIHJlbW92ZShjaGlsZCwgcGFyZW50KSByZW1vdmVzIGEgbm9kZSBpbiBhIHRyZWUuXG4gKlxuICovXG5pbXBvcnQge1F1ZXVlfSBmcm9tICcuL3F1ZXVlJztcbmV4cG9ydCBmdW5jdGlvbiBUcmVlKGRhdGEpIHtcbiAgdmFyIG5vZGUgPSBuZXcgTm9kZShkYXRhKTtcbiAgdGhpcy5fcm9vdCA9IG5vZGU7XG59XG5cbmZ1bmN0aW9uIE5vZGUoZGF0YSkge1xuICB0aGlzLmRhdGEgPSBkYXRhO1xuICB0aGlzLnBhcmVudCA9IG51bGw7XG4gIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgLy8gYWRkZWQgbGF0ZXJcbiAgdGhpcy5jaGlsZHJlbmxldmVsID0gMTtcbiAgdGhpcy5jb2x1bW4gPSAwO1xuICB0aGlzLnRvdGFsb2Zmc2V0eWxldmVsID0gMDtcbn1cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VERiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cbiAgLy8gdGhpcyBpcyBhIHJlY3Vyc2UgYW5kIGltbWVkaWF0ZWx5LWludm9raW5nIGZ1bmN0aW9uXG4gIChmdW5jdGlvbiByZWN1cnNlKGN1cnJlbnROb2RlKSB7XG4gICAgLy8gc3RlcCAyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyBzdGVwIDNcbiAgICAgIHJlY3Vyc2UoY3VycmVudE5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIC8vIHN0ZXAgNFxuICAgIGNhbGxiYWNrKGN1cnJlbnROb2RlKTtcblxuICAgIC8vIHN0ZXAgMVxuICB9KSh0aGlzLl9yb290KTtcblxufTtcblxuLy8gZm9yIHRob3NlIG5vZGVzIHdobyBoYXZlIGNoaWxkcmVuXG5mdW5jdGlvbiBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkge1xuICB2YXIgdG90YWxDaGlsZHJlbkxldmVscyA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIHRvdGFsQ2hpbGRyZW5MZXZlbHMgKz0gbm9kZS5jaGlsZHJlbltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxDaGlsZHJlbkxldmVscztcbn1cblRyZWUucHJvdG90eXBlLmNhbGNDaGlsZHJlbkxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyBjYWxjQ2hpbGRyZW5MZXZlbHMobm9kZSkgOiAxO1xuICAgIG5vZGUuY29sdW1uID0gbm9kZS5wYXJlbnQgPyAobm9kZS5wYXJlbnQuY29sdW1uICsgMSkgOiAwO1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VERihjYWxsYmFjayk7XG59O1xuXG5mdW5jdGlvbiBjYWxjT2ZmWShhcnIsIGRhdGEpIHtcbiAgdmFyIG5vZGVJZHggPSBmaW5kSW5kZXgoYXJyLCBkYXRhKTtcbiAgdmFyIHRvdGFsWSA9IDA7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUlkeDsgaSsrKSB7XG4gICAgdG90YWxZICs9IGFycltpXS5jaGlsZHJlbmxldmVsO1xuICB9O1xuICByZXR1cm4gdG90YWxZO1xufVxuXG5UcmVlLnByb3RvdHlwZS5jYWxjVG90YWxPZmZzZXRZTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxldmVsZ2FwID0gMDtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCkge1xuICAgICAgbm9kZS50b3RhbG9mZnNldHlsZXZlbCA9IG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsICsgY2FsY09mZlkobm9kZS5wYXJlbnQuY2hpbGRyZW4sIG5vZGUuZGF0YSk7XG4gICAgfSBlbHNlIGlmIChub2RlLnBhcmVudCA9PT0gbnVsbCkge1xuXG4gICAgfTtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG59O1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZUJGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCk7XG5cbiAgcXVldWUuZW5xdWV1ZSh0aGlzLl9yb290KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhjdXJyZW50VHJlZSk7XG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cbn07XG5cblRyZWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRyYXZlcnNhbCkge1xuICB0cmF2ZXJzYWwuY2FsbCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihkYXRhLCB0b0RhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgY2hpbGQgPSBuZXcgTm9kZShkYXRhKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLmRhdGEgPT09IHRvRGF0YSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgcGFyZW50LmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIGNoaWxkLnBhcmVudCA9IHBhcmVudDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBhZGQgbm9kZSB0byBhIG5vbi1leGlzdGVudCBwYXJlbnQuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihkYXRhLCBmcm9tRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciB0cmVlID0gdGhpcyxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICBjaGlsZFRvUmVtb3ZlID0gbnVsbCxcbiAgICAgIGluZGV4O1xuXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5kYXRhID09PSBmcm9tRGF0YSkge1xuICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdHJhdmVyc2FsKTtcblxuICBpZiAocGFyZW50KSB7XG4gICAgaW5kZXggPSBmaW5kSW5kZXgocGFyZW50LmNoaWxkcmVuLCBkYXRhKTtcblxuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vZGUgdG8gcmVtb3ZlIGRvZXMgbm90IGV4aXN0LicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZFRvUmVtb3ZlID0gcGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignUGFyZW50IGRvZXMgbm90IGV4aXN0LicpO1xuICB9XG5cbiAgdGhpcy5jYWxjQ2hpbGRyZW5MZXZlbCgpO1xuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xuXG4gIHJldHVybiBjaGlsZFRvUmVtb3ZlO1xufTtcblxuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgZGF0YSkge1xuICB2YXIgaW5kZXg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYXJyW2ldLmRhdGEgPT09IGRhdGEpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qIHRyZWUgYWRkb24qL1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURpcmVjdENoaWxkID0gZnVuY3Rpb24obm9kZWRhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gIHBhcmVudCA9IG51bGwsXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5kYXRhID09PSBub2RlZGF0YSkge1xuICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgfVxuICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShwYXJlbnQuY2hpbGRyZW5baV0pO1xuICAgIH1cbiAgICBjYWxsYmFjayhwYXJlbnQpO1xuICAgIHBhcmVudCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIHF1ZXVlO1xufTtcblRyZWUucHJvdG90eXBlLmFwcGx5U3R5bGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN0eWxlT2JqID0ge307XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBzdHlsZU9ialtub2RlLmRhdGFdID0gbm9kZS50b3RhbG9mZnNldHlsZXZlbDtcbiAgfTtcbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxuICByZXR1cm4gc3R5bGVPYmo7XG59O1xuXG4vKipcbiAqIFt0cmF2ZXJzZURlc2NlbmRhbnRzIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W2ludGVnZXJdfSBub2RlRGF0YSBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbYXJyYXldfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEZXNjZW5kYW50cyA9IGZ1bmN0aW9uKG5vZGVEYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gbm9kZURhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgcXVldWUuZW5xdWV1ZShwYXJlbnQpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgdmFyIGRlc2NlbmRhbnRzQXJyID0gW107XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZGVzY2VuZGFudHNBcnIucHVzaChjdXJyZW50VHJlZSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjZW5kYW50c0Fycjtcbn07XG5cblRyZWUucHJvdG90eXBlLm1heExldmVscyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBkYXRhUm9vdE5vZGVzID0gdGhpcy50cmF2ZXJzZURpcmVjdENoaWxkKCdfZGF0YV9yb290Jyk7XG4gIHZhciByb3dMZXZlbE9iaiA9IHt9O1xuICB2YXIgaGVhZElkeEFyciA9IFtdO1xuICBmb3IgKHZhciBkcm4gaW4gZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZSkge1xuICAgIGlmIChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlLmhhc093blByb3BlcnR5KGRybikpIHtcbiAgICAgIHJvd0xldmVsT2JqW2Rybl0gPSB7fTtcbiAgICAgIHJvd0xldmVsT2JqW2Rybl1bJ2hlYWQtaWR4J10gPSBkYXRhUm9vdE5vZGVzLl9zdG9yYWdlW2Rybl0uZGF0YTtcbiAgICAgIGhlYWRJZHhBcnIucHVzaChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlW2Rybl0uZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3RJZHhGcm9tUXVldWUocXVldWUpIHtcbiAgICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgICBmb3IgKHZhciBwZXJOb2RlIGluIHF1ZXVlLl9zdG9yYWdlKSB7XG4gICAgICBpZiAoKHR5cGVvZiBwYXJzZUludChwZXJOb2RlKSA9PT0gJ251bWJlcicpICYmIHF1ZXVlLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgY2hpbGRyZW5JZHhBcnIucHVzaChxdWV1ZS5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbklkeEFycjtcbiAgfVxuXG4gIHZhciBsZXZlbE5leHRDb2xBcnIgPSBbXTtcblxuICBmdW5jdGlvbiBnZXRSb3dMZXZlbChpZHgpIHtcbiAgICB2YXIgZGlyZWN0Q2hpbGRyZW5RdWV1ZSA9IHRoYXQudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICAgIHZhciBkaXJlY3RDaGlsZHJlbkFyciA9IGV4dHJhY3RJZHhGcm9tUXVldWUoZGlyZWN0Q2hpbGRyZW5RdWV1ZSk7XG4gICAgcmV0dXJuIGRpcmVjdENoaWxkcmVuQXJyO1xuICB9XG5cbiAgdmFyIHVsdGltYXRlQXJyID0gW107XG4gIHZhciBwZXJIZWFkID0gW107XG5cbiAgZnVuY3Rpb24gbmV4dExldmVsQ2hpbGRyZW4oYXJyKSB7XG4gICAgdmFyIG5leHRMZXZlbENoaWxkcmVuQXJyID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwZXJOdW0gPSBnZXRSb3dMZXZlbChhcnJbaV0pO1xuICAgICAgbmV4dExldmVsQ2hpbGRyZW5BcnIgPSBuZXh0TGV2ZWxDaGlsZHJlbkFyci5jb25jYXQocGVyTnVtKTtcbiAgICB9O1xuICAgIGlmIChuZXh0TGV2ZWxDaGlsZHJlbkFyci5sZW5ndGgpIHtcbiAgICAgIHBlckhlYWQucHVzaChuZXh0TGV2ZWxDaGlsZHJlbkFyci5sZW5ndGgpO1xuICAgICAgbmV4dExldmVsQ2hpbGRyZW4obmV4dExldmVsQ2hpbGRyZW5BcnIpO1xuICAgIH07XG4gIH1cblxuICAoZnVuY3Rpb24gcmVjdXJzZShhcnIpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwZXJIZWFkID0gW107XG4gICAgICAvLyBsZXZlbCAxXG4gICAgICBsZXZlbE5leHRDb2xBcnIgPSBnZXRSb3dMZXZlbChhcnJbaV0pO1xuICAgICAgcGVySGVhZC5wdXNoKDEpO1xuICAgICAgaWYgKGxldmVsTmV4dENvbEFyci5sZW5ndGgpIHtcbiAgICAgICAgcGVySGVhZC5wdXNoKGxldmVsTmV4dENvbEFyci5sZW5ndGgpO1xuICAgICAgICBuZXh0TGV2ZWxDaGlsZHJlbihsZXZlbE5leHRDb2xBcnIpO1xuICAgICAgfTtcbiAgICAgIHVsdGltYXRlQXJyLnB1c2gocGVySGVhZCk7XG4gICAgfTtcbiAgfSkoaGVhZElkeEFycik7XG5cbiAgcmV0dXJuIHVsdGltYXRlQXJyO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanNcbiAqKi8iLCIvKipcbiAqIFtRdWV1ZSBkZXNjcmlwdGlvbl1cbiAqIGVucXVldWUoZGF0YSkgYWRkcyBkYXRhIHRvIGEgcXVldWUuXG4gKiBkZXF1ZXVlIHJlbW92ZXMgdGhlIG9sZGVzdCBhZGRlZCBkYXRhIHRvIGEgcXVldWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBRdWV1ZSgpIHtcbiAgdGhpcy5fb2xkZXN0SW5kZXggPSAxO1xuICB0aGlzLl9uZXdlc3RJbmRleCA9IDE7XG4gIHRoaXMuX3N0b3JhZ2UgPSB7fTtcbn1cblxuUXVldWUucHJvdG90eXBlLnNpemUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuX25ld2VzdEluZGV4IC0gdGhpcy5fb2xkZXN0SW5kZXg7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5fc3RvcmFnZVt0aGlzLl9uZXdlc3RJbmRleF0gPSBkYXRhO1xuICB0aGlzLl9uZXdlc3RJbmRleCsrO1xufTtcblxuUXVldWUucHJvdG90eXBlLmRlcXVldWUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG9sZGVzdEluZGV4ID0gdGhpcy5fb2xkZXN0SW5kZXgsXG4gICAgICBuZXdlc3RJbmRleCA9IHRoaXMuX25ld2VzdEluZGV4LFxuICAgICAgZGVsZXRlZERhdGE7XG5cbiAgaWYgKG9sZGVzdEluZGV4ICE9PSBuZXdlc3RJbmRleCkge1xuICAgIGRlbGV0ZWREYXRhID0gdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgZGVsZXRlIHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIHRoaXMuX29sZGVzdEluZGV4Kys7XG5cbiAgICByZXR1cm4gZGVsZXRlZERhdGE7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qc1xuICoqLyIsImltcG9ydCB7ZGlzYWJsZVNjcm9sbCwgZW5hYmxlU2Nyb2xsfSBmcm9tICcuL3RvZ2dsZVNjcm9sbCc7XG5leHBvcnQgZnVuY3Rpb24gcG9wdXAoZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgbGV0IHBvcHVwRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBvcHVwRWxlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWxheWVyJyk7XG4gIHBvcHVwRWxlLmlubmVySFRNTCA9IGdlbmVyYXRlUG9wdXBUcGwoKTtcbiAgcG9zaXRpb25Qb3B1cEVsZShwb3B1cEVsZSwgZXYpO1xuICBiaW5kUG9wdXBFdmVudHMocG9wdXBFbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwb3B1cEVsZSk7XG4gIGRpc2FibGVTY3JvbGwoKTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVQb3B1cFRwbChkYXRhKSB7XG4gIGxldCB0cGwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInBvcHVwLXNoYWRvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInBvcHVwLWNvbnRlbnRcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInBvcHVwLXRleHRcIj5BcmUgeW91IHN1cmUgdG8gZGVsZXRlIHRoaXMgQVBJPzwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtYnRuc1wiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwicG9wdXAtYnRuIHBvcHVwLWNhbmNlbC1idG5cIj5jYW5jZWw8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY29uZmlybS1idG5cIj5jb25maXJtPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHRgO1xuICByZXR1cm4gdHBsO1xufVxuXG5mdW5jdGlvbiBiaW5kUG9wdXBFdmVudHMoZWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbmZpcm0tYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maXJtLmJpbmQodGhpcywgZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykpO1xufVxuXG5mdW5jdGlvbiBjb25maXJtKGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvblBvcHVwRWxlKGVsZSwgY29vcmRpbmF0ZXMpIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLWNvbnRlbnQnKVswXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGVzLnBhZ2VYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMucGFnZVkgKyAncHgsIDApJztcbn1cblxuZnVuY3Rpb24gY2xvc2VQb3B1cChldikge1xuICBpZiAoZXYudGFyZ2V0ID09PSBldi5jdXJyZW50VGFyZ2V0KSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnBhcmVudE5vZGUpO1xuICAgIGVuYWJsZVNjcm9sbCgpO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanNcbiAqKi8iLCIvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwLFxuLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XG52YXIga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICBpZiAoZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIC8vIG9sZGVyIEZGXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub253aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2Rlcm4gc3RhbmRhcmRcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBvbGRlciBicm93c2VycywgSUVcbiAgd2luZG93Lm9udG91Y2htb3ZlICA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2JpbGVcbiAgZG9jdW1lbnQub25rZXlkb3duICA9IHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbndoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9udG91Y2htb3ZlID0gbnVsbDtcbiAgZG9jdW1lbnQub25rZXlkb3duID0gbnVsbDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gZ2V0TWF4T2ZBcnJheShudW1BcnJheSkge1xuICByZXR1cm4gTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBlbGVtLmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoY2xhc3NOYW1lKSA+IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeCgpIHtcbiAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLCBwcmVmaXggPSAnJztcbiAgcHJlZml4ID0gKHVhLmluZGV4T2YoJ2Nocm9tZScpID49IDAgfHwgd2luZG93Lm9wZW5EYXRhYmFzZSkgPyAnLXdlYmtpdC0nIDogKHVhLmluZGV4T2YoJ2ZpcmVmb3gnKSA+PSAwKSA/ICctbW96LScgOiB3aW5kb3cub3BlcmEgPyAnLW8tJyA6IChkb2N1bWVudC5hbGwgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPcGVyYScpID09PSAtMSkgPyAnLW1zLScgOiAnJztcbiAgcmV0dXJuIHByZWZpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybShlbCkge1xuICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJy13ZWJraXQtdHJhbnNmb3JtJyk7XG4gIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKVxcKSkvKTtcblxuICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4gIGlmIChyZXN1bHRzWzFdID09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG5cbiAgcmVzdWx0cy5wdXNoKDApO1xuICByZXR1cm4gcmVzdWx0cy5zbGljZSg1LCA4KTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWChlbCkge1xuLy8gICAvLyBjaHJvbWUgd29uJ3QgdXNlIHByZWZpeFxuLy8gICAvLyB2YXIgc3R5bGVfYXR0ciA9IGJyb3dzZXJQcmVmaXgoKSArICd0cmFuc2Zvcm0nO1xuLy8gICB2YXIgc3R5bGVfYXR0ciA9ICd0cmFuc2Zvcm0nO1xuLy8gICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVfYXR0cik7XG4vLyAgIHZhciByZXN1bHRzID0gdHJhbnNmb3JtLm1hdGNoKC9tYXRyaXgoPzooM2QpXFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpLCAtezAsMX1cXGQrXFwpfFxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKVxcKSkvKTtcbi8vICAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuLy8gICBpZiAocmVzdWx0c1sxXSA9PT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcbi8vICAgcmVzdWx0cy5wdXNoKDApO1xuLy8gICByZXR1cm4gKyhyZXN1bHRzLnNsaWNlKDUsIDgpWzBdKTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWChlbCkge1xuICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKCdzdHlsZScpLnNwbGl0KCd0cmFuc2xhdGUzZCcpWzFdLnNwbGl0KCcsICcpWzBdLnNsaWNlKDEpLnNwbGl0KCdweCcpWzBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWShvYmopIHtcbiAgaWYgKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgcmV0dXJuO1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG9iaiksXG4gICAgICB0cmFuc2Zvcm0gPSBzdHlsZS50cmFuc2Zvcm0gfHwgc3R5bGUud2Via2l0VHJhbnNmb3JtIHx8IHN0eWxlLm1velRyYW5zZm9ybTtcbiAgdmFyIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKTtcbiAgaWYgKG1hdCkgcmV0dXJuIHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzEzXSk7XG4gIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gIHJldHVybiBtYXQgPyBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVs1XSkgOiAwO1xufVxuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PT0gJ29iamVjdCcgP1xuICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHhocihtZXRob2QsIHVybCwgY2FsbGJhY2ssIHBhcmFtc09iaiA9IHt9LCBpc0FzeW5jID0gdHJ1ZSkge1xuICB2YXIgeG1saHR0cDtcblxuICB4bWxodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeG1saHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoeG1saHR0cC5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgIGlmICh4bWxodHRwLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY2FsbGJhY2soeG1saHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBlbHNlIGlmICh4bWxodHRwLnN0YXR1cyA9PSA0MDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3IgNDAwJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvbWV0aGluZyBlbHNlIG90aGVyIHRoYW4gMjAwIHdhcyByZXR1cm5lZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgY29tYlVybCA9IHVybCArIHNlcmlhbGl6ZShwYXJhbXNPYmopO1xuXG4gIHhtbGh0dHAub3BlbihtZXRob2QsIGNvbWJVcmwsIGlzQXN5bmMpO1xuICB4bWxodHRwLnNlbmQobnVsbCk7XG59XG5cbi8qKlxuICogW3N0cmluZ2lmeSB3aXRoIDQgc3BhY2VzIGF0IGVhY2ggbGV2ZWxdXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCBcIlxcdFwiKTsgLy8gc3RyaW5naWZ5IHdpdGggdGFicyBpbnNlcnRlZCBhdCBlYWNoIGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWF1dGlmeUpTT04oanNPYmopIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXG4gKiBAcGFyYW0gIHtKU09OIG9iamVjdH0ganNvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaHRsaWdodEpTT04oanNvbikge1xuICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcbiAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICByZXR1cm4ganNvbi5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgdmFyIGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9