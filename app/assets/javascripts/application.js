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
	    _templateObject2 = _taggedTemplateLiteral(['\n          <li class="api-li" data-api-id="$', '">\n            <div class="api-li-description">\n              <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>\n              <span class="api-li-uri">$', '</span>\n              <span class="api-li-name">$', '</span>\n            </div>\n          </li>\n      '], ['\n          <li class="api-li" data-api-id="$', '">\n            <div class="api-li-description">\n              <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>\n              <span class="api-li-uri">$', '</span>\n              <span class="api-li-name">$', '</span>\n            </div>\n          </li>\n      ']);
	
	function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
	
	var _commonAjax = __webpack_require__(7);
	
	var _commonTemplate = __webpack_require__(10);
	
	var _commonUtilities = __webpack_require__(9);
	
	var _apiTreeTreeDom = __webpack_require__(12);
	
	var rootAPI = window.location.origin + '/apis';
	var payload = {};
	var apisArr = [];
	
	var callback = {
	  getApiSuccess: function getApiSuccess(data) {
	    var newApi = new _apiTreeTreeDom.ApiDom(JSON.parse(data), this);
	    apisArr.push(newApi);
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
	function bindevents() {
	  var apiLis = document.getElementsByClassName('api-li-description');
	  [].slice.call(apiLis).forEach(function (element, index) {
	    element.addEventListener('click', function (ev) {
	      toggleFoldLi(this);
	      if (this.nextElementSibling) {
	        return;
	      };
	      (0, _commonAjax.$http)(rootAPI + '/' + this.parentNode.dataset.apiId).get(payload).then(callback.getApiSuccess.bind(this.parentNode))['catch'](callback.error);
	    });
	  });
	}
	function renderAllApis(data) {
	  data = JSON.parse(data);
	  var tmpl = function tmpl(data) {
	    return (0, _commonTemplate.html)(_templateObject, data.map(function (item) {
	      return (0, _commonTemplate.html)(_templateObject2, item.id, item.uri || "(No uri)", item.name ? item.name : "(No name)");
	    }));
	  };
	  var header = document.getElementsByTagName('header')[0];
	  var apiListEle = document.createElement('div');
	  apiListEle.classList.add('api-ul-wrapper');
	  apiListEle.innerHTML = tmpl(data);
	  (0, _commonUtilities.insertAfter)(apiListEle, header);
	}
	function getAllApis() {
	  (0, _commonAjax.$http)(rootAPI).get(payload).then(callback.getAllApisSuccess)['catch'](callback.error);
	}
	
	function collapse() {}
	
	function bindEvent(ev) {
	  if (ev.target.classList.contains('api-save')) {
	    var params = {
	      'section': ev.target.parentNode.getElementsByClassName('api-section')[0].value
	    };
	    (0, _commonAjax.$http)(rootAPI + '/' + ev.target.closest('.per-api').dataset.id).patch(params, 'api').then(callback.success)['catch'](callback.error);
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
	
	        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
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
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      newObj[wrapper] = {};
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
	
	var _utilities = __webpack_require__(16);
	
	function perApiTpl(data) {
	  var tpl = '<div class="api-info">\n          <label class="api-label">API:</label>\n          <input class="api-uri" placeholder="" value="" disabled="true" /> \n          <label class="api-label">method:</label>\n          <select class="api-method">\n              <option value="GET" selected>GET</option>\n              <option value="POST">POST</option>\n              <option value="PATCH">PATCH</option>\n              <option value="DELETE">DELETE</option>\n          </select>\n          <label>section</label>\n          <input class="api-section" />\n          <span class="api-edit">edit</span>\n          <span class="api-save" data-method="patch" data-action="/apis/' + data.id + '" >save</span>\n          <span class="api-test">test</span>\n      </div>\n      <div class="api-tree-wrapper"><div class="api-tree-frame"><svg class="api-svg" width="100%" height="100%"></svg></div><div class="api-tree"></div></div>\n      <div class="api-data">\n          <div class="data-views-control">\n              <span class="data-raw">raw</span>\n              <span class="data-beautify">beautify</span>\n              <span class="data-highlight">syntaxHighlight</span>\n              <span class="data-preview">preview</span>\n          </div>\n          <div class="data-view json">\n          </div>\n      </div>';
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
	
	function createPerApi(data) {
	  var perApiEle = document.createElement('div');
	  perApiEle.setAttribute('class', 'per-api');
	  perApiEle.dataset.id = data.id;
	  perApiEle.innerHTML = perApiTpl(data);
	  perApiEle.getElementsByClassName('api-uri')[0].value = data.uri;
	  return perApiEle;
	}
	
	function ApiDom(data, containerNode) {
	  this.apiContainer = containerNode;
	
	  this.apiContainer.appendChild(createPerApi(data));
	
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
	
	  var $apiEdit = newlyCreatedApiNode.getElementsByClassName('api-edit')[0];
	  var $apiSave = newlyCreatedApiNode.getElementsByClassName('api-save')[0];
	  var $apiUri = newlyCreatedApiNode.getElementsByClassName('api-uri')[0];
	  var $apiTest = newlyCreatedApiNode.getElementsByClassName('api-test')[0];
	  var $apiMethod = newlyCreatedApiNode.getElementsByClassName('api-method')[0];
	
	  var $dataRaw = newlyCreatedApiNode.getElementsByClassName('data-raw')[0];
	  this.$dataBeautify = newlyCreatedApiNode.getElementsByClassName('data-beautify')[0];
	  var $dataHighlight = newlyCreatedApiNode.getElementsByClassName('data-highlight')[0];
	  var $dataPreview = newlyCreatedApiNode.getElementsByClassName('data-preview')[0];
	
	  this.$dataView = newlyCreatedApiNode.getElementsByClassName('data-view')[0];
	
	  $apiEdit.addEventListener('click', function (ev) {
	    $apiUri.disabled = false;
	  });
	
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
	    (0, _commonPopup.popup)(ev);
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
	
	var _toggleScroll = __webpack_require__(17);
	
	function popup(ev, callback) {
	  var popupEle = document.createElement('div');
	  popupEle.classList.add('popup-layer');
	  popupEle.innerHTML = generatePopupTpl();
	  positionPopupEle(popupEle, ev);
	  bindPopupEvents(popupEle);
	  document.body.appendChild(popupEle);
	  (0, _toggleScroll.disableScroll)();
	}
	
	function generatePopupTpl(data) {
	  var tpl = '\n    <div class="popup-shadow">\n      <div class="popup-content">\n\t\t\t\t<div class="popup-text">Are you sure to delete this API?</div>\n\t\t\t\t<div class="popup-btns">\n\t\t\t\t\t<span class="popup-btn popup-cancel-btn">cancel</span>\n\t\t\t\t\t<span class="popup-btn popup-confirm-btn">confirm</span>\n\t\t\t\t</div>\n      </div>\n    </div>\n\t';
	  return tpl;
	}
	
	function bindPopupEvents(ele) {
	  ele.getElementsByClassName('popup-shadow')[0].addEventListener('click', closePopup);
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
/* 17 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzExY2VhMDYxNTVkMzk4OTNmYTkiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3NlcmlhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vcG9wdXAuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OzZDQ3RDd0IsQ0FBcUI7OzRDQUMxQixDQUFvQjs7Z0RBRWpCLENBQXdCOztBQUM5QyxtQ0FBVyxDQUFDOzs7Ozs7QUFNWixFQUFDLFlBQU07QUFDTCxPQUFJLE1BQU0sR0FBRztBQUNYLFFBQUcsdUJBQU07QUFDVCxXQUFNLEVBQUUsOEJBQVM7SUFDbEIsQ0FBQztBQUNGLE9BQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQ3hDLE9BQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNuQyxTQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsSUFDdkUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN6QixZQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNoRCxlQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FB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QUFZLEdBQUc7QUFDN0IsT0FBSSxNQUFNLENBQUMsbUJBQW1CLEVBQzFCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDeEUsU0FBTSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUNuRCxTQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUN0QixTQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztBQUMxQixXQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzExY2VhMDYxNTVkMzk4OTNmYTlcbiAqKi8iLCJpbXBvcnQge2RhdGFMaW5rc30gZnJvbSAnLi9tb2R1bGVzL2RhdGFMaW5rcyc7XG5pbXBvcnQge2hvbWV9IGZyb20gJy4vbW9kdWxlcy9ob21lcGFnZSc7XG5cbmltcG9ydCB7aW5pdFhocn0gZnJvbSAnLi9tb2R1bGVzL2FwaU9wZXJhdGlvbic7XG5kYXRhTGlua3MoKTtcbi8vIGFwaVRyZWUoKTtcbi8vIHZhciBwID0gbmV3IGRhd25TVkcoKTtcbi8vIHAuaW5pdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFpbnRlci10YXJnZXQnKSk7XG4vLyBwLnN0YXJ0KCk7XG5cbigoKSA9PiB7XG4gIGxldCByb3V0ZXMgPSB7XG4gICAgJy8nOiBob21lLFxuICAgICcvZGV2JzogW2luaXRYaHJdXG4gIH07XG4gIGxldCBwYXRoTmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgaWYgKHJvdXRlcy5oYXNPd25Qcm9wZXJ0eShwYXRoTmFtZSkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJvdXRlc1twYXRoTmFtZV0pID09PSAnW29iamVjdCBBcnJheV0nICYmXG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZXNbcGF0aE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJvdXRlc1twYXRoTmFtZV1baV0uYXBwbHkobnVsbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0uYXBwbHkobnVsbCk7XG4gICAgfVxuICB9XG5cbn0pKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qc1xuICoqLyIsImltcG9ydCB7aGFuZGxlTWV0aG9kfSBmcm9tICcuLi9jb21tb24vaGFuZGxlTWV0aG9kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFMaW5rcygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzRGF0YUxpbmssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NEYXRhTGluayhlKSB7XG4gIHZhciBlID0gd2luZG93LmUgfHwgZTtcblxuICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKVxuICAgICAgcmV0dXJuO1xuXG4gIC8vIERvIHNvbWV0aGluZ1xuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdkZWxldGUnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgLy8gaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAncGF0Y2gnKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCwge1xuICAvLyAgICAgbnM6ICdhcGknLFxuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBzZWN0aW9uOiAnd2lzZScsXG4gIC8vICAgICAgIGlkOiAnMidcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qc1xuICoqLyIsImltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi4vY29tbW9uL2NzcmYnO1xuLyoqXG4gKiBbaGFuZGxlTWV0aG9kIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGxpbmsgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEhhbmRsZXMgXCJkYXRhLW1ldGhvZFwiIG9uIGxpbmtzIHN1Y2ggYXM6XG4gKiA8YSBocmVmPVwiL3VzZXJzLzVcIiBkYXRhLW1ldGhvZD1cImRlbGV0ZVwiIHJlbD1cIm5vZm9sbG93XCIgZGF0YS1jb25maXJtPVwiQXJlIHlvdSBzdXJlP1wiPkRlbGV0ZTwvYT5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1ldGhvZChsaW5rLCBvYmogPSB7fSkge1xuICB2YXIgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgbWV0aG9kID0gbGluay5kYXRhc2V0Lm1ldGhvZCxcbiAgICB0YXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGFyZ2V0JyksXG4gICAgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpLFxuICAgIGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgdmFyIHBhcmFtc09iaiA9IHtcbiAgICBocmVmOiBocmVmLFxuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIHRhcmdldDogdGFyZ2V0LFxuICAgIGNzcmZUb2tlbjogY3NyZlRva2VuLFxuICAgIGNzcmZQYXJhbTogY3NyZlBhcmFtXG4gIH07XG4gIHZhciBmb3JtRWxlID0gY3JlYXRlRm9ybShwYXJhbXNPYmosIG9iaik7XG4gIGFwcGVuZEZvcm1Ub0RvbShmb3JtRWxlKTtcbiAgc3VibWl0Rm9ybShmb3JtRWxlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGFyYW1zLCBvYmopIHtcbiAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZi5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsJ3Bvc3QnKTtcbiAgZi5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicscGFyYW1zLmhyZWYpO1xuICBpZiAocGFyYW1zLnRhcmdldCkge1xuICAgIGYuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBwYXJhbXMudGFyZ2V0KTtcbiAgfTtcblxuICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGkuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIGkuc2V0QXR0cmlidXRlKCduYW1lJywnX21ldGhvZCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5tZXRob2QpO1xuXG4gIHZhciBzO1xuICBpZiAocGFyYW1zLmNzcmZQYXJhbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwYXJhbXMuY3NyZlRva2VuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICFSUHMuaXNDcm9zc0RvbWFpbihwYXJhbXMuaHJlZikpIHtcbiAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAgIHMuc2V0QXR0cmlidXRlKCduYW1lJywgcGFyYW1zLmNzcmZQYXJhbSk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMuY3NyZlRva2VuKTtcbiAgfVxuICBmLmFwcGVuZENoaWxkKGkpO1xuXG4gIC8vIGZvciAobGV0IGtleSBpbiBvYmouZGF0YSkge1xuICAvLyAgIGlmIChvYmouZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gIC8vICAgICBsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCcnICsgb2JqLm5zICsgJ1snICsga2V5ICsgJ10nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsb2JqLmRhdGFba2V5XSk7XG4gIC8vICAgICBmLmFwcGVuZENoaWxkKHQpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGlmIChzKSB7XG4gICAgZi5hcHBlbmRDaGlsZChzKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZvcm1Ub0RvbShmb3JtKSB7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG59XG5mdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm0pIHtcbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9oYW5kbGVNZXRob2QuanNcbiAqKi8iLCJleHBvcnQgbGV0IHJvclBhcmFtcyA9IHtcbiAgLy8gVXAtdG8tZGF0ZSBDcm9zcy1TaXRlIFJlcXVlc3QgRm9yZ2VyeSB0b2tlblxuICBjc3JmVG9rZW46ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXRva2VuXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBVUkwgcGFyYW0gdGhhdCBtdXN0IGNvbnRhaW4gdGhlIENTUkYgdG9rZW5cbiAgY3NyZlBhcmFtOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi1wYXJhbV0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gRGV0ZXJtaW5lcyBpZiB0aGUgcmVxdWVzdCBpcyBhIGNyb3NzIGRvbWFpbiByZXF1ZXN0LlxuICBpc0Nyb3NzRG9tYWluOiB1cmwgPT4ge1xuICAgIGxldCBvcmlnaW5BbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgb3JpZ2luQW5jaG9yLmhyZWYgPSBsb2NhdGlvbi5ocmVmO1xuICAgIGxldCB1cmxBbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICB0cnkge1xuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmw7XG4gICAgICAvLyBUaGlzIGlzIGEgd29ya2Fyb3VuZCB0byBhIElFIGJ1Zy5cbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsQW5jaG9yLmhyZWY7XG5cbiAgICAgIC8vIElmIFVSTCBwcm90b2NvbCBpcyBmYWxzZSBvciBpcyBhIHN0cmluZyBjb250YWluaW5nIGEgc2luZ2xlIGNvbG9uXG4gICAgICAvLyAqYW5kKiBob3N0IGFyZSBmYWxzZSwgYXNzdW1lIGl0IGlzIG5vdCBhIGNyb3NzLWRvbWFpbiByZXF1ZXN0XG4gICAgICAvLyAoc2hvdWxkIG9ubHkgYmUgdGhlIGNhc2UgZm9yIElFNyBhbmQgSUUgY29tcGF0aWJpbGl0eSBtb2RlKS5cbiAgICAgIC8vIE90aGVyd2lzZSwgZXZhbHVhdGUgcHJvdG9jb2wgYW5kIGhvc3Qgb2YgdGhlIFVSTCBhZ2FpbnN0IHRoZSBvcmlnaW5cbiAgICAgIC8vIHByb3RvY29sIGFuZCBob3N0LlxuICAgICAgcmV0dXJuICEoKCghdXJsQW5jaG9yLnByb3RvY29sIHx8IHVybEFuY2hvci5wcm90b2NvbCA9PT0gJzonKSAmJiAhdXJsQW5jaG9yLmhvc3QpIHx8XG4gICAgICAgIChvcmlnaW5BbmNob3IucHJvdG9jb2wgKyAnLy8nICsgb3JpZ2luQW5jaG9yLmhvc3QgPT09XG4gICAgICAgICAgdXJsQW5jaG9yLnByb3RvY29sICsgJy8vJyArIHVybEFuY2hvci5ob3N0KSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gSWYgdGhlcmUgaXMgYW4gZXJyb3IgcGFyc2luZyB0aGUgVVJMLCBhc3N1bWUgaXQgaXMgY3Jvc3NEb21haW4uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY3NyZi5qc1xuICoqLyIsImltcG9ydCB7dHdlZXRCb3h9IGZyb20gJy4vdHdlZXRCb3gnO1xuZXhwb3J0IGZ1bmN0aW9uIGhvbWUoKSB7XG5cdHR3ZWV0Qm94KCk7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9ob21lcGFnZS5qc1xuICoqLyIsImZ1bmN0aW9uIHNldEZvY3VzKGVsKSB7XG4gIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gIHJhbmdlLnNldFN0YXJ0KGVsLCAwKTtcbiAgcmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG4gIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB0d2VldEJveCgpIHtcbiAgdmFyIGRvYyA9IGRvY3VtZW50O1xuICB2YXIgdGIgPSBkb2MuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndHdlZXQtYm94JylbMF07XG4gIHZhciB0YmQgPSB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XG4gIHZhciB0YmRTdHJpbmcgPSAnPGRpdj48YnI+PC9kaXY+JztcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnY29uZGVuc2VkJyk7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0uaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGgpIHtcblxuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5hZGQoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAodGJkLmlubmVySFRNTCA9PT0gJ1doYXRcXCdzIGhhcHBlbmluZz8nKSB7XG5cbiAgICAgIHRiZC5pbm5lckhUTUwgPSAnPGJyPic7XG4gICAgfVxuICB9KTtcbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5pbm5lckhUTUwpIHtcbiAgICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgICAgfSBlbHNlIHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG5cbiAgICAgIH0sIDApO1xuICAgIH07XG4gIH0pO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9O1xuICAgIGlmICh0Yi5pbm5lckhUTUwgPT09ICc8YnI+Jykge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL3R3ZWV0Qm94LmpzXG4gKiovIiwiaW1wb3J0IHskaHR0cH0gZnJvbSAnLi4vY29tbW9uL2FqYXgnO1xuaW1wb3J0IHtodG1sfSBmcm9tICcuLi9jb21tb24vdGVtcGxhdGUnO1xuaW1wb3J0IHtpbnNlcnRBZnRlcn0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZS1kb20nO1xuXG5sZXQgcm9vdEFQSSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXMnO1xubGV0IHBheWxvYWQgPSB7fTtcbmxldCBhcGlzQXJyID0gW107XG5cbnZhciBjYWxsYmFjayA9IHtcbiAgZ2V0QXBpU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBuZXdBcGkgPSBuZXcgQXBpRG9tKEpTT04ucGFyc2UoZGF0YSksIHRoaXMpO1xuICAgIGFwaXNBcnIucHVzaChuZXdBcGkpO1xuICB9LFxuICBnZXRBbGxBcGlzU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHJlbmRlckFsbEFwaXMoZGF0YSk7XG4gICAgYmluZGV2ZW50cygpO1xuICB9LFxuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhKU09OLnBhcnNlKGRhdGEpKTtcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKDIsICdlcnJvcicsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRYaHIoKSB7XG4gIGdldEFsbEFwaXMoKTtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kRXZlbnQpO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVGb2xkTGkoY29udGV4dCkge1xuICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xufVxuZnVuY3Rpb24gYmluZGV2ZW50cygpIHtcbiAgbGV0IGFwaUxpcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1saS1kZXNjcmlwdGlvbicpO1xuICBbXS5zbGljZS5jYWxsKGFwaUxpcykuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgdG9nZ2xlRm9sZExpKHRoaXMpO1xuICAgICAgaWYgKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH07XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5wYXJlbnROb2RlLmRhdGFzZXQuYXBpSWQpXG4gICAgICAuZ2V0KHBheWxvYWQpXG4gICAgICAudGhlbihjYWxsYmFjay5nZXRBcGlTdWNjZXNzLmJpbmQodGhpcy5wYXJlbnROb2RlKSlcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gcmVuZGVyQWxsQXBpcyhkYXRhKSB7XG4gIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBjb25zdCB0bXBsID0gZGF0YSA9PiBodG1sYFxuICAgICAgPHVsIGNsYXNzPVwiYXBpLXVsXCI+XG4gICAgICAke2RhdGEubWFwKGl0ZW0gPT4gaHRtbGBcbiAgICAgICAgICA8bGkgY2xhc3M9XCJhcGktbGlcIiBkYXRhLWFwaS1pZD1cIiQke2l0ZW0uaWR9XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLWxpLWRlc2NyaXB0aW9uXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWxpLWNvbGxhcHNlXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi1kb3duXCI+PHVzZSB4bGluazpocmVmPVwiI2ljb24tZG93blwiPjwvdXNlPjwvc3ZnPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktdXJpXCI+JCR7aXRlbS51cmkgfHwgXCIoTm8gdXJpKVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktbmFtZVwiPiQke2l0ZW0ubmFtZSA/IGl0ZW0ubmFtZSA6IFwiKE5vIG5hbWUpXCJ9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9saT5cbiAgICAgIGApfVxuICAgICAgPC91bD5cbiAgYDtcbiAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkZXInKVswXTtcbiAgbGV0IGFwaUxpc3RFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgYXBpTGlzdEVsZS5jbGFzc0xpc3QuYWRkKCdhcGktdWwtd3JhcHBlcicpO1xuICBhcGlMaXN0RWxlLmlubmVySFRNTCA9IHRtcGwoZGF0YSk7XG4gIGluc2VydEFmdGVyKGFwaUxpc3RFbGUsIGhlYWRlcik7XG59XG5mdW5jdGlvbiBnZXRBbGxBcGlzKCkge1xuICAkaHR0cChyb290QVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFsbEFwaXNTdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuXG5mdW5jdGlvbiBjb2xsYXBzZSgpIHt9XG5cbmZ1bmN0aW9uIGJpbmRFdmVudChldikge1xuICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXBpLXNhdmUnKSkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAnc2VjdGlvbic6IGV2LnRhcmdldC5wYXJlbnROb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zZWN0aW9uJylbMF0udmFsdWVcbiAgICB9O1xuICAgICRodHRwKHJvb3RBUEkgKyAnLycgKyBldi50YXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKS5kYXRhc2V0LmlkKVxuICAgIC5wYXRjaChwYXJhbXMsICdhcGknKVxuICAgIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgfVxufVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2FwaU9wZXJhdGlvbi5qc1xuICoqLyIsIi8qKlxuLy8gQi0+IEhlcmUgeW91IGRlZmluZSBpdHMgZnVuY3Rpb25zIGFuZCBpdHMgcGF5bG9hZFxudmFyIG1kbkFQSSA9ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9zZWFyY2guanNvbic7XG52YXIgcGF5bG9hZCA9IHtcbiAgJ3RvcGljJyA6ICdqcycsXG4gICdxJyAgICAgOiAnUHJvbWlzZSdcbn07XG52YXIgY2FsbGJhY2sgPSB7XG4gIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMSwgJ3N1Y2Nlc3MnLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfSxcbiAgZXJyb3IgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG4vLyBFbmQgQlxuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgxKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MsIGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgyKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC50aGVuKHVuZGVmaW5lZCwgY2FsbGJhY2suZXJyb3IpO1xuICovXG5cbi8vIEEtPiAkaHR0cCBmdW5jdGlvbiBpcyBpbXBsZW1lbnRlZCBpbiBvcmRlciB0byBmb2xsb3cgdGhlIHN0YW5kYXJkIEFkYXB0ZXIgcGF0dGVyblxuaW1wb3J0IHtzZXJpYWxpemV9IGZyb20gJy4vc2VyaWFsaXplJztcbmltcG9ydCB7aXNFbXB0eSwgbWVyZ2VPYmosIGFkZFByZWZpeFRvT2JqLCB3cmFwT2JqfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQge3JvclBhcmFtcyBhcyBSUHN9IGZyb20gJy4vY3NyZic7XG5cbmV4cG9ydCBmdW5jdGlvbiAkaHR0cCh1cmwpIHtcbiAgLy8gQSBzbWFsbCBleGFtcGxlIG9mIG9iamVjdFxuICB2YXIgY29yZSA9IHtcblxuICAgIC8vIE1ldGhvZCB0aGF0IHBlcmZvcm1zIHRoZSBhamF4IHJlcXVlc3RcbiAgICBhamF4OiBmdW5jdGlvbihtZXRob2QsIHVybCwgYXJncyA9IHt9LCBwcmVmaXgpIHtcbiAgICAgIC8vIGZvciBSYWlsc1xuICAgICAgLy8gdXJsID0gdXJsICsgJy5qc29uJztcbiAgICAgIC8vIENyZWF0aW5nIGEgcHJvbWlzZVxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgdGhlIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICBpZiAobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJyB8fCBtZXRob2QgPT09ICdQQVRDSCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gSlNPTi5zdHJpbmdpZnkoZXh0ZW5kR2VuZXJhbFBhcmFtcyh3cmFwT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgLy8gY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCh1cmkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gc2VyaWFsaXplKGV4dGVuZEdlbmVyYWxQYXJhbXMoYWRkUHJlZml4VG9PYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsICsgJz8nICsgdXJpKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZXNvbHZlXCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBlcXVhbCB0byAyeHhcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlamVjdFwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZGlmZmVyZW50IHRoYW4gMnh4XG4gICAgICAgICAgICByZWplY3QodGhpcy5zdGF0dXNUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNsaWVudC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy8gUmV0dXJuIHRoZSBwcm9taXNlXG4gICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQWRhcHRlciBwYXR0ZXJuXG4gIHJldHVybiB7XG4gICAgJ2dldCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnR0VUJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ3Bvc3QnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BPU1QnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncHV0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQVVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncGF0Y2gnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BBVENIJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH0sXG4gICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnREVMRVRFJywgdXJsLCBhcmdzLCBwcmVmaXgpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kR2VuZXJhbFBhcmFtcyhvYmopIHtcbiAgbGV0IGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgbGV0IGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKTtcbiAgbGV0IGdlbmVyYWxPYmogPSB7fTtcbiAgZ2VuZXJhbE9iai51dGY4ID0gJ+Kckyc7XG4gIGdlbmVyYWxPYmpbY3NyZlBhcmFtXSA9IGNzcmZUb2tlbjtcbiAgcmV0dXJuIG1lcmdlT2JqKG9iaiwgZ2VuZXJhbE9iaik7XG59XG4vLyBFbmQgQVxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qc1xuICoqLyIsIi8qKlxuICogW3NlcmlhbGl6ZSBjb252ZXJ0cyByZWN1cnNpdmUgb2JqZWN0c11cbiAqIEBwYXJhbSAge1t0eXBlXX0gb2JqICAgIFtkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1t0eXBlXX0gcHJlZml4IFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIGNvbnNvbGUubG9nKHNlcmlhbGl6ZSh7Zm9vOiBcImhpIHRoZXJlXCIsIGJhcjogeyBibGFoOiAxMjMsIHF1dXg6IFsxLCAyLCAzXSB9fSkpO1xuICogZm9vPWhpJTIwdGhlcmUmYmFyJTVCYmxhaCU1RD0xMjMmYmFyJTVCcXV1eCU1RCU1QjAlNUQ9MSZiYXIlNUJxdXV4JTVEJTVCMSU1RD0yJmJhciU1QnF1dXglNUQlNUIyJTVEPTNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2VyaWFsaXplLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCA9PT0gMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZU9iaihvYmopIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSk7XG59XG4vKiBjb25zaWRlciBPYmplY3QuYXNzaWduKHRhcmdldCwgLi4uc291cmNlcykgKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZU9iaihvYmoxID0ge30sIG9iajIpIHtcbiAgbGV0IG5ld09iaiA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqMSkpO1xuICBmb3IgKGxldCBrZXkgaW4gb2JqMikge1xuICAgIGlmIChvYmoyLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG5ld09ialtrZXldID0gb2JqMltrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGFkZFByZWZpeFRvT2JqKG9iaiwgcHJlZml4KSB7XG4gIGlmICghcHJlZml4KSByZXR1cm4gb2JqO1xuICBsZXQgbmV3T2JqID0ge307XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIG5ld09ialsnJyArIHByZWZpeCArICdbJyArIGtleSArICddJ10gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwT2JqKG9iaiwgd3JhcHBlcikge1xuICBpZiAoIXdyYXBwZXIpIHJldHVybiBvYmo7XG4gIGxldCBuZXdPYmogPSB7fTtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW3dyYXBwZXJdID0ge307XG4gICAgICBuZXdPYmpbd3JhcHBlcl1ba2V5XSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuXG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanNcbiAqKi8iLCJpbXBvcnQge2h0bWxFc2NhcGV9IGZyb20gJy4vaHRtbEVzY2FwZSc7XG5leHBvcnQgZnVuY3Rpb24gaHRtbChsaXRlcmFsU2VjdGlvbnMsIC4uLnN1YnN0cykge1xuICAvLyBVc2UgcmF3IGxpdGVyYWwgc2VjdGlvbnM6IHdlIGRvbuKAmXQgd2FudFxuICAvLyBiYWNrc2xhc2hlcyAoXFxuIGV0Yy4pIHRvIGJlIGludGVycHJldGVkXG4gIGxldCByYXcgPSBsaXRlcmFsU2VjdGlvbnMucmF3O1xuXG4gIGxldCByZXN1bHQgPSAnJztcblxuICBzdWJzdHMuZm9yRWFjaCgoc3Vic3QsIGkpID0+IHtcbiAgICAvLyBSZXRyaWV2ZSB0aGUgbGl0ZXJhbCBzZWN0aW9uIHByZWNlZGluZ1xuICAgIC8vIHRoZSBjdXJyZW50IHN1YnN0aXR1dGlvblxuICAgIGxldCBsaXQgPSByYXdbaV07XG5cbiAgICAvLyBJbiB0aGUgZXhhbXBsZSwgbWFwKCkgcmV0dXJucyBhbiBhcnJheTpcbiAgICAvLyBJZiBzdWJzdGl0dXRpb24gaXMgYW4gYXJyYXkgKGFuZCBub3QgYSBzdHJpbmcpLFxuICAgIC8vIHdlIHR1cm4gaXQgaW50byBhIHN0cmluZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0KSkge1xuICAgICAgc3Vic3QgPSBzdWJzdC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc3Vic3RpdHV0aW9uIGlzIHByZWNlZGVkIGJ5IGEgZG9sbGFyIHNpZ24sXG4gICAgLy8gd2UgZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBpdFxuICAgIGlmIChsaXQuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgc3Vic3QgPSBodG1sRXNjYXBlKHN1YnN0KTtcbiAgICAgIGxpdCA9IGxpdC5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHJlc3VsdCArPSBsaXQ7XG4gICAgcmVzdWx0ICs9IHN1YnN0O1xuICB9KTtcbiAgLy8gVGFrZSBjYXJlIG9mIGxhc3QgbGl0ZXJhbCBzZWN0aW9uXG4gIC8vIChOZXZlciBmYWlscywgYmVjYXVzZSBhbiBlbXB0eSB0ZW1wbGF0ZSBzdHJpbmdcbiAgLy8gcHJvZHVjZXMgb25lIGxpdGVyYWwgc2VjdGlvbiwgYW4gZW1wdHkgc3RyaW5nKVxuICByZXN1bHQgKz0gcmF3W3Jhdy5sZW5ndGggLSAxXTsgLy8gKEEpXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBodG1sRXNjYXBlKHN0cikge1xuXHRzdHIgPSAnJyArIHN0cjsgLy8gZm9yIG51bWJlcnMgZXRjLlxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykgLy8gZmlyc3QhXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL2AvZywgJyYjOTY7Jyk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge2dldFRyYW5zbGF0ZVgsIHhociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBwZXJBcGlUcGwoZGF0YSkge1xuICBsZXQgdHBsID1cbiAgICAgIGA8ZGl2IGNsYXNzPVwiYXBpLWluZm9cIj5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktdXJpXCIgcGxhY2Vob2xkZXI9XCJcIiB2YWx1ZT1cIlwiIGRpc2FibGVkPVwidHJ1ZVwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBPU1RcIj5QT1NUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQQVRDSFwiPlBBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8bGFiZWw+c2VjdGlvbjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLWVkaXRcIj5lZGl0PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXNhdmVcIiBkYXRhLW1ldGhvZD1cInBhdGNoXCIgZGF0YS1hY3Rpb249XCIvYXBpcy8ke2RhdGEuaWR9XCIgPnNhdmU8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktdGVzdFwiPnRlc3Q8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS13cmFwcGVyXCI+PGRpdiBjbGFzcz1cImFwaS10cmVlLWZyYW1lXCI+PHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+PC9kaXY+PGRpdiBjbGFzcz1cImFwaS10cmVlXCI+PC9kaXY+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWRhdGFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3cy1jb250cm9sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZGF0YS1iZWF1dGlmeVwiPmJlYXV0aWZ5PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRhdGEtcHJldmlld1wiPnByZXZpZXc8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICByZXR1cm4gdHBsO1xufVxuXG52YXIgbGVhZkNvbnRlbnRUcGwgPSAnPGkgY2xhc3M9XCJyZW1vdmUtY2hpbGRcIj4tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1rZXlcIiBwbGFjZWhvbGRlcj1cImtleVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi12YWx1ZVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiYWRkLWNoaWxkXCI+KzwvaT4nO1xuXG52YXIgaW5pdFJlY3RPYmogPSB7XG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMFxufTtcblxuZnVuY3Rpb24gY3JlYXRlUGVyQXBpKGRhdGEpIHtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5kYXRhc2V0LmlkID0gZGF0YS5pZDtcbiAgcGVyQXBpRWxlLmlubmVySFRNTCA9IHBlckFwaVRwbChkYXRhKTtcbiAgcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSA9IGRhdGEudXJpO1xuICByZXR1cm4gcGVyQXBpRWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBpRG9tKGRhdGEsIGNvbnRhaW5lck5vZGUpIHtcbiAgdGhpcy5hcGlDb250YWluZXIgPSBjb250YWluZXJOb2RlO1xuXG4gIHRoaXMuYXBpQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZVBlckFwaShkYXRhKSk7XG5cbiAgdGhpcy5hcGlFbGUgPSB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZXItYXBpJylbMF07XG4gIFxuICB0aGlzLmJpbmRFdmVudHNUb01SQ0FQSSgpO1xuXG4gIHRoaXMubGVhZkluZGV4ID0gMTtcblxuICB0aGlzLiRhcGlUcmVlID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKCdfZGF0YV9yb290JywgMSwgMCwgaW5pdFJlY3RPYmopKTtcblxuICB0aGlzLiRhcGlUcmVlRnJhbWUgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1mcmFtZScpWzBdO1xuXG4gIHRoaXMuaW5pdEFwaVRyZWUoKTtcblxuICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG5cbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNFKCk7XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmpzb25WaWV3ID0gZnVuY3Rpb24oZGF0YSkge1xuICB2YXIgJHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAkcHJlLmlubmVySFRNTCA9IGRhdGE7XG4gIHRoaXMuJGRhdGFWaWV3LmlubmVySFRNTCA9ICcnO1xuICB0aGlzLiRkYXRhVmlldy5hcHBlbmRDaGlsZCgkcHJlKTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDQVBJID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG5ld2x5Q3JlYXRlZEFwaU5vZGUgPSB0aGlzLmFwaUVsZTtcblxuICB2YXIgJGFwaUVkaXQgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1lZGl0JylbMF07XG4gIHZhciAkYXBpU2F2ZSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXTtcbiAgdmFyICRhcGlVcmkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXTtcbiAgdmFyICRhcGlUZXN0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdGVzdCcpWzBdO1xuICB2YXIgJGFwaU1ldGhvZCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdO1xuXG4gIHZhciAkZGF0YVJhdyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1yYXcnKVswXTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWJlYXV0aWZ5JylbMF07XG4gIHZhciAkZGF0YUhpZ2hsaWdodCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1oaWdobGlnaHQnKVswXTtcbiAgdmFyICRkYXRhUHJldmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1wcmV2aWV3JylbMF07XG5cbiAgdGhpcy4kZGF0YVZpZXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtdmlldycpWzBdO1xuXG4gICRhcGlFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkYXBpVXJpLmRpc2FibGVkID0gZmFsc2U7XG4gIH0pO1xuXG4gICRhcGlTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkYXBpVXJpLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgJGFwaVRlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgeGhyKCRhcGlNZXRob2QudmFsdWUsICRhcGlVcmkudmFsdWUsIHRoaXMuc3RvcmVBcGlSZXR1cm5EYXRhLmJpbmQodGhhdCkpO1xuICB9KTtcblxuICAkZGF0YVJhdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KHRoaXMuYXBpUmV0dXJuRGF0YSk7XG4gIH0pO1xuXG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGJlYXV0aWZ5SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFIaWdobGlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldyhoaWdodGxpZ2h0SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFQcmV2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoJ1RoaXMgZmVhdHVyZSBoYXMgbm90IGJlZW4gYWNjb21wbGlzaGVkIHlldC4nKTtcbiAgfSk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUub3BlcmF0ZURhdGFSb290Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgYWRkTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgYWRkTWFyay5jbGFzc05hbWUgPSAnYWRkLWRhdGFyb290LWNoaWxkJztcbiAgYWRkTWFyay50ZXh0Q29udGVudCA9ICcrJztcbiAgYWRkTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICB0aGF0LmxlYWZJbmRleCArPSAxO1xuICAgICAgdmFyIHBhcmVudElkeCA9ICdfZGF0YV9yb290JztcbiAgICAgIHZhciBub2RlTGV2ZWwgPSAwO1xuICAgICAgdGhhdC5hcGlUcmVlLmFkZCh0aGF0LmxlYWZJbmRleCwgcGFyZW50SWR4LCB0aGF0LmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgICAgIHRoYXQuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZHgsIHRoYXQubGVhZkluZGV4LCBub2RlTGV2ZWwsIGluaXRSZWN0T2JqKSk7XG4gICAgICB2YXIgb2JqID0gdGhhdC5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgICAgIHRoYXQuc3R5bGVOb2RlcyhvYmopO1xuICAgICAgdGhhdC5iaW5kRXZlbnRzVG9NUkNFKCk7XG4gICAgfSk7XG4gIHRoaXMuJGFwaVRyZWUuaW5zZXJ0QmVmb3JlKGFkZE1hcmssIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG5cbiAgdmFyIGRlbE1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRlbE1hcmsuY2xhc3NOYW1lID0gJ2RlbC1kYXRhcm9vdC1jaGlsZCc7XG4gIGRlbE1hcmsudGV4dENvbnRlbnQgPSAnLSc7XG4gIGRlbE1hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgLyogdGhpcyBBUEkgaXMgZGVsZXRlZC4gKi9cbiAgICAgIHBvcHVwKGV2KTtcbiAgICAgIC8vIHRoYXQuYXBpQ29udGFpbmVyLnJlbW92ZUNoaWxkKGV2LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLnBlci1hcGknKSk7XG4gICAgfSk7XG4gIHRoaXMuJGFwaVRyZWUuaW5zZXJ0QmVmb3JlKGRlbE1hcmssIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuaW5pdEFwaVRyZWUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hcGlUcmVlID0gbmV3IFRyZWUoJ19kYXRhX3Jvb3QnKTtcbiAgdGhpcy5hcGlUcmVlLmFkZCgxLCAnX2RhdGFfcm9vdCcsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB0aGlzLm9wZXJhdGVEYXRhUm9vdENoaWxkKCk7XG5cbiAgcmV0dXJuIHRoaXMuYXBpVHJlZTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuZGVsTm9kZSA9IGZ1bmN0aW9uKGN0eCkge1xuICB2YXIgY3VycmVudExlYWYgPSBjdHguY3VycmVudFRhcmdldC5jbG9zZXN0KCcubGVhZicpO1xuICB2YXIgY3VycmVudElkeCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQuaW5kZXg7XG4gIHZhciBwYXJlbnRJZHggPSBpc05hTigrY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudCkgPyAnX2RhdGFfcm9vdCcgOiArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcblxuICB2YXIgbm9kZXNBcnIgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEZXNjZW5kYW50cyhjdXJyZW50SWR4KTtcbiAgdmFyIGlkeEFyciA9IG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpO1xuICB0aGlzLmFwaVRyZWUucmVtb3ZlKGN1cnJlbnRJZHgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB0aGlzLnJlbW92ZU5vZGVzRnJvbURvbShpZHhBcnIpO1xuXG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkeCk7XG5cbn07XG5BcGlEb20ucHJvdG90eXBlLnJlbW92ZU5vZGVzRnJvbURvbSA9IGZ1bmN0aW9uKGFycikge1xuICB2YXIgYWxsTGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgYWxsTGVhdmVzTGVuID0gYWxsTGVhdmVzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxMZWF2ZXNMZW47IGkrKykge1xuICAgIGlmIChhcnIuaW5kZXhPZigrYWxsTGVhdmVzW2ldLmRhdGFzZXQuaW5kZXgpICE9PSAtMSkge1xuICAgICAgdGhpcy4kYXBpVHJlZS5yZW1vdmVDaGlsZChhbGxMZWF2ZXNbaV0pO1xuICAgIH1cbiAgfTtcbn07XG5mdW5jdGlvbiBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKSB7XG4gIHZhciBub2Rlc0FyckxlbiA9IG5vZGVzQXJyLmxlbmd0aDtcbiAgdmFyIGlkeEFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzQXJyTGVuOyBpKyspIHtcbiAgICBpZHhBcnIucHVzaChub2Rlc0FycltpXS5kYXRhKTtcbiAgfTtcbiAgcmV0dXJuIGlkeEFycjtcbn1cblxuQXBpRG9tLnByb3RvdHlwZS5iaW5kRXZlbnRzVG9NUkNFID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZWF2ZXMgPSB0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKTtcbiAgdmFyIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7XG4gIHZhciBuZXdseUNyZWF0ZWRMZWFmID0gbGVhdmVzW2xlYXZlc0xlbiAtIDFdO1xuICB2YXIgJGFkZENoaWxkID0gbmV3bHlDcmVhdGVkTGVhZi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGQtY2hpbGQnKVswXTtcbiAgJGFkZENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4ID0+IHtcbiAgICB0aGlzLmFkZENoaWxkKGN0eCk7XG4gIH0pO1xuXG4gIHZhciAkcmVtb3ZlQ2hpbGQgPSBuZXdseUNyZWF0ZWRMZWFmLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3JlbW92ZS1jaGlsZCcpWzBdO1xuICAkcmVtb3ZlQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHggPT4ge1xuICAgIHRoaXMuZGVsTm9kZShjdHgpO1xuICB9KTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUuc2V0UGFyZW50Tm9kZVZhbCA9IGZ1bmN0aW9uKGlkeCkge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgcXVldWUgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICB2YXIgcXVldWVMZW4gPSBxdWV1ZS5fbmV3ZXN0SW5kZXggLSBxdWV1ZS5fb2xkZXN0SW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gbGVhdmVzLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGlmICgrbGVhdmVzW2ldLmRhdGFzZXQuaW5kZXggPT09IGlkeCkge1xuICAgICAgaWYgKHF1ZXVlTGVuID4gMCkge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJy0tLT4nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIH07XG4gIH07XG59O1xuQXBpRG9tLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGN0eCkge1xuICB0aGlzLmxlYWZJbmRleCArPSAxO1xuICB2YXIgcGFyZW50SWRleCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQuaW5kZXg7XG4gIHZhciBub2RlTGV2ZWwgPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmxldmVsICsgMTtcblxuICAvLyBhcGlUcmVlIG9wZXJhdGlvblxuICB0aGlzLmFwaVRyZWUuYWRkKHRoaXMubGVhZkluZGV4LCBwYXJlbnRJZGV4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgdmFyIGNsb25lZFJlY3RPYmogPSBjbG9uZVJlY3RPYmoodGhpcy5ub2RlTGVmdE9mZnNldChjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlKSk7XG4gIHZhciBjaGlsZHJlbk5vZGVzID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGlyZWN0Q2hpbGQocGFyZW50SWRleCk7XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyID0gW107XG4gIGZvciAodmFyIHBlck5vZGUgaW4gY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZSkge1xuICAgIGlmICgodHlwZW9mIHBhcnNlSW50KHBlck5vZGUpID09PSAnbnVtYmVyJykgJiYgY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XG4gICAgICBjaGlsZHJlbklkeEFyci5wdXNoKGNoaWxkcmVuTm9kZXMuX3N0b3JhZ2VbcGVyTm9kZV0uZGF0YSk7XG4gICAgfTtcbiAgfVxuXG4gIHZhciBjaGlsZHJlbklkeEFyckxlbiA9IGNoaWxkcmVuSWR4QXJyLmxlbmd0aDtcblxuICBjbG9uZWRSZWN0T2JqLnJpZ2h0IC09IDMwO1xuXG4gIGNsb25lZFJlY3RPYmouYm90dG9tID0gY2hpbGRyZW5JZHhBcnJMZW4gPT09IDEgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvbmVkUmVjdE9iai5ib3R0b20gKyBjbG9uZWRSZWN0T2JqLmhlaWdodCAqIChjaGlsZHJlbklkeEFyckxlbiAtIDIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgKyAoY2hpbGRyZW5JZHhBcnJMZW4gLSAxKSAqIDIwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWRleCwgdGhpcy5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgY2xvbmVkUmVjdE9iaikpO1xuICB0aGlzLmJpbmRFdmVudHNUb01SQ0UoKTtcbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWRleCk7XG5cbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWQsIG5vZGVJbmRleCwgbm9kZUxldmVsLCByZWN0T2JqKSB7XG4gIHZhciBuZXdMZWFmU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZWFmJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1wYXJlbnQnLCBwYXJlbnRJZCk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIG5vZGVJbmRleCk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnZGF0YS1sZXZlbCcsIG5vZGVMZXZlbCk7XG4gIG5ld0xlYWZTcGFuLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgTWF0aC5yb3VuZChyZWN0T2JqLnJpZ2h0KSArICdweCwgJyArIE1hdGgucm91bmQocmVjdE9iai5ib3R0b20pICsgJ3B4LCAwKSc7XG4gIG5ld0xlYWZTcGFuLmlubmVySFRNTCA9IGxlYWZDb250ZW50VHBsO1xuICByZXR1cm4gbmV3TGVhZlNwYW47XG59XG5mdW5jdGlvbiBjcmVhdGVMZWFmKHBhcmVudElkeCwgbm9kZUlkeCwgbm9kZUxldmVsLCByZWN0T2JqKSB7XG4gIHZhciBuZXdMZWFmID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBuZXdMZWFmLmFwcGVuZENoaWxkKGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopKTtcbiAgcmV0dXJuIG5ld0xlYWY7XG59XG5BcGlEb20ucHJvdG90eXBlLnN0eWxlTm9kZXMgPSBmdW5jdGlvbihzdHlsZU9iaikge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgbGVhZklkeCwgb2Zmc2V0WSwgb3JpZ2luYWxYID0gJyc7XG5cbiAgdmFyIHN0eWxlc0FyciA9IFtdLCB4VmFsdWUsIHlWYWx1ZTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlYXZlcy5sZW5ndGg7IGkrKykge1xuICAgIG9yaWdpbmFsWCA9IGdldFRyYW5zbGF0ZVgobGVhdmVzW2ldKTtcbiAgICBsZWFmSWR4ID0gKyhsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCk7XG5cbiAgICBmb3IgKHZhciBzdHlsZU9iaklkeCBpbiBzdHlsZU9iaikge1xuICAgICAgaWYgKCtzdHlsZU9iaklkeCA9PT0gbGVhZklkeCkge1xuICAgICAgICBvZmZzZXRZID0gc3R5bGVPYmpbc3R5bGVPYmpJZHhdICogNTI7XG4gICAgICB9O1xuICAgIH1cbiAgICBzdHlsZXNBcnIucHVzaChbb3JpZ2luYWxYLCBvZmZzZXRZXSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaiA9IDAsIHN0eWxlc0FyckxlbiA9IHN0eWxlc0Fyci5sZW5ndGg7IGogPCBzdHlsZXNBcnJMZW47IGorKykge1xuICAgIGxlYXZlc1tqXS5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArIHN0eWxlc0FycltqXVswXSArICdweCwgJyArIHN0eWxlc0FycltqXVsxXSArICdweCwgMCknO1xuICB9XG5cbiAgdGhpcy5kaW1lbnNpb25BcnIgPSB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIHRoaXMuZHJhd1NWRygpO1xufTtcbkFwaURvbS5wcm90b3R5cGUuYWRkU2libGluZyA9IGZ1bmN0aW9uKGN0eCkge1xuICB0aGlzLmxlYWZJbmRleCArPSAxO1xuICB2YXIgcGFyZW50SWR4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQ7XG4gIHZhciBub2RlTGV2ZWwgPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmxldmVsO1xuICBwYXJlbnRJZHggPSBpc05hTihwYXJlbnRJZHgpID8gJ19kYXRhX3Jvb3QnIDogcGFyZW50SWR4O1xuICB0aGlzLmFwaVRyZWUuYWRkKHRoaXMubGVhZkluZGV4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdmFyIHJlY3RPYmogPSB0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpO1xuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaihyZWN0T2JqKTtcbiAgY2xvbmVkUmVjdE9iai5yaWdodCA9IGNsb25lZFJlY3RPYmoucmlnaHQgLSBjbG9uZWRSZWN0T2JqLndpZHRoO1xuICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArPSAzMDtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkeCwgdGhpcy5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgY2xvbmVkUmVjdE9iaikpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG5cbn07XG5cbi8qIHV0aWxzICovXG5mdW5jdGlvbiBjbG9uZVJlY3RPYmoob2JqKSB7XG4gIHJldHVybiB7XG4gICAgdG9wOiBvYmoudG9wLFxuICAgIGJvdHRvbTogb2JqLmJvdHRvbSxcbiAgICBsZWZ0OiBvYmoubGVmdCxcbiAgICByaWdodDogb2JqLnJpZ2h0LFxuICAgIHdpZHRoOiBvYmoud2lkdGgsXG4gICAgaGVpZ2h0OiBvYmouaGVpZ2h0XG4gIH07XG59XG5cbi8qIG1hbmlwdWxhdGUgU1ZHICovXG5BcGlEb20ucHJvdG90eXBlLmNsZWFyU1ZHID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdmcgPSB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdO1xuICB3aGlsZSAoc3ZnLmxhc3RDaGlsZCkge1xuICAgIHN2Zy5yZW1vdmVDaGlsZChzdmcubGFzdENoaWxkKTtcbiAgfVxufTtcbi8qKlxuICogW2RyYXdTVkcgZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19IFtkZXNjcmlwdGlvbl1cbiAqL1xuQXBpRG9tLnByb3RvdHlwZS5kcmF3U1ZHID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2xlYXJTVkcoKTtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgc3ZnUGFydGlhbHMgPSBbXTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgc3ZnUGFydGlhbHMucHVzaCh0aGF0LmNyZWF0ZVNpbmdsZVNWRyhub2RlLmRhdGEsIG5vZGUuY29sdW1uLCBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCwgKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgLSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCkpKTtcbiAgICB9O1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG5cbiAgdmFyIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3ZnUGFydGlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHN2Z1BhcnRpYWxzW2ldKTtcbiAgfVxuICB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmNyZWF0ZVNpbmdsZVNWRyA9IGZ1bmN0aW9uKGlkeCwgaG9yaSwgcGFyZW50VmVydCwgZHZlcnQpIHtcblxuICB2YXIgc3ZnbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICB2YXIgbmV3UGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmducywgJ3BhdGgnKTtcbiAgdmFyIGNvbnRyb2xSYXRlID0gMC4yO1xuICB2YXIgbXgsIG15LCBxeCwgcXksIHF4eCwgcXl5LCB0eCwgdHk7XG4gIGhvcmkgPSBob3JpIC0gMTtcbiAgZHZlcnQgPSBkdmVydDtcbiAgcGFyZW50VmVydCA9IHBhcmVudFZlcnQ7XG5cbiAgbXggPSBob3JpICogNTAxO1xuICBteSA9IHBhcmVudFZlcnQgKiA1MiArIDg7XG4gIHF4ID0gbXggKyAxMDtcbiAgcXkgPSBteTtcbiAgcXh4ID0gbXggKyAxNTtcbiAgcXl5ID0gKG15ICsgKGR2ZXJ0IC8gMikgKiA1Mik7XG4gIHR4ID0gbXggKyAzMDtcbiAgdHkgPSBteSArIGR2ZXJ0ICogNTI7XG5cbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsICdNICcgKyBteCArICcgJyArIG15ICsgJyBRICcgKyBxeCArICcgJyArIHF5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxeHggKyAnICcgKyBxeXkgKyAnIFQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggKyAnICcgKyB0eSArICcnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FwaS1zdmctcGF0aCcpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1pZHgnLCBpZHgpO1xuXG4gIHJldHVybiBuZXdQYXRoO1xufTtcblxuLyogY2FsY3VsYXRlIGRpbWVuc2lvbnMgKi9cbkFwaURvbS5wcm90b3R5cGUuY2FsY0RpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kaW1lbnNpb25BcnIgPSB0aGlzLmFwaVRyZWUubWF4TGV2ZWxzKCk7XG4gIHZhciBob3JpTWF4LCB2ZXJ0aWNhbE1heCwgaG9yaUFyciA9IFtdLCB2ZXJ0QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gdGhpcy5kaW1lbnNpb25BcnIubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaG9yaUFyci5wdXNoKHRoaXMuZGltZW5zaW9uQXJyW2ldLmxlbmd0aCk7XG4gIH07XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLmFwaVRyZWUuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyICsgJ3B4JztcbiAgdGhpcy5kaW1lbnNpb25BcnIgPSBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcblxufTtcblxuLyogY2FsY3VsYXRlIG9mZnNldCAqL1xuXG5BcGlEb20ucHJvdG90eXBlLm5vZGVMZWZ0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpIHtcbiAgdmFyIGVsUmVjdE9iamVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgYm9keVJlY3RPYmogPSB0aGlzLiRhcGlUcmVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgY2xvbmVCb2R5UmVjdE9iaiA9IGNsb25lUmVjdE9iaihib2R5UmVjdE9iaik7XG4gIHZhciBjbG9uZUVsUmVjdE9iamVjdCA9IGNsb25lUmVjdE9iaihlbFJlY3RPYmplY3QpO1xuICBjbG9uZUVsUmVjdE9iamVjdC50b3AgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5ib3R0b20gKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5sZWZ0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnJpZ2h0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIHJldHVybiBjbG9uZUVsUmVjdE9iamVjdDtcbn07XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUtZG9tLmpzXG4gKiovIiwiLyoqXG4gKiBbVHJlZSBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cbiAqXG4gKiBfcm9vdCBwb2ludHMgdG8gdGhlIHJvb3Qgbm9kZSBvZiBhIHRyZWUuXG4gKiB0cmF2ZXJzZURGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggREZTLlxuICogdHJhdmVyc2VCRihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIEJGUy5cbiAqIGNvbnRhaW5zKGRhdGEsIHRyYXZlcnNhbCkgc2VhcmNoZXMgZm9yIGEgbm9kZSBpbiBhIHRyZWUuXG4gKiBhZGQoZGF0YSwgdG9EYXRhLCB0cmF2ZXJzZSkgYWRkcyBhIG5vZGUgdG8gYSB0cmVlLlxuICogcmVtb3ZlKGNoaWxkLCBwYXJlbnQpIHJlbW92ZXMgYSBub2RlIGluIGEgdHJlZS5cbiAqXG4gKi9cbmltcG9ydCB7UXVldWV9IGZyb20gJy4vcXVldWUnO1xuZXhwb3J0IGZ1bmN0aW9uIFRyZWUoZGF0YSkge1xuICB2YXIgbm9kZSA9IG5ldyBOb2RlKGRhdGEpO1xuICB0aGlzLl9yb290ID0gbm9kZTtcbn1cblxuZnVuY3Rpb24gTm9kZShkYXRhKSB7XG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMucGFyZW50ID0gbnVsbDtcbiAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAvLyBhZGRlZCBsYXRlclxuICB0aGlzLmNoaWxkcmVubGV2ZWwgPSAxO1xuICB0aGlzLmNvbHVtbiA9IDA7XG4gIHRoaXMudG90YWxvZmZzZXR5bGV2ZWwgPSAwO1xufVxuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyB0aGlzIGlzIGEgcmVjdXJzZSBhbmQgaW1tZWRpYXRlbHktaW52b2tpbmcgZnVuY3Rpb25cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoY3VycmVudE5vZGUpIHtcbiAgICAvLyBzdGVwIDJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHN0ZXAgM1xuICAgICAgcmVjdXJzZShjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgLy8gc3RlcCA0XG4gICAgY2FsbGJhY2soY3VycmVudE5vZGUpO1xuXG4gICAgLy8gc3RlcCAxXG4gIH0pKHRoaXMuX3Jvb3QpO1xuXG59O1xuXG4vLyBmb3IgdGhvc2Ugbm9kZXMgd2hvIGhhdmUgY2hpbGRyZW5cbmZ1bmN0aW9uIGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSB7XG4gIHZhciB0b3RhbENoaWxkcmVuTGV2ZWxzID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgdG90YWxDaGlsZHJlbkxldmVscyArPSBub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbENoaWxkcmVuTGV2ZWxzO1xufVxuVHJlZS5wcm90b3R5cGUuY2FsY0NoaWxkcmVuTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGUuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSA6IDE7XG4gICAgbm9kZS5jb2x1bW4gPSBub2RlLnBhcmVudCA/IChub2RlLnBhcmVudC5jb2x1bW4gKyAxKSA6IDA7XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbn07XG5cbmZ1bmN0aW9uIGNhbGNPZmZZKGFyciwgZGF0YSkge1xuICB2YXIgbm9kZUlkeCA9IGZpbmRJbmRleChhcnIsIGRhdGEpO1xuICB2YXIgdG90YWxZID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlSWR4OyBpKyspIHtcbiAgICB0b3RhbFkgKz0gYXJyW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbFk7XG59XG5cblRyZWUucHJvdG90eXBlLmNhbGNUb3RhbE9mZnNldFlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGV2ZWxnYXAgPSAwO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBub2RlLnRvdGFsb2Zmc2V0eWxldmVsID0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwgKyBjYWxjT2ZmWShub2RlLnBhcmVudC5jaGlsZHJlbiwgbm9kZS5kYXRhKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XG5cbiAgICB9O1xuICB9O1xuXG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbn07XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlQkYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKTtcblxuICBxdWV1ZS5lbnF1ZXVlKHRoaXMuX3Jvb3QpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcblxuICB3aGlsZSAoY3VycmVudFRyZWUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUoY3VycmVudFRyZWUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGN1cnJlbnRUcmVlKTtcbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxufTtcblxuVHJlZS5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbihjYWxsYmFjaywgdHJhdmVyc2FsKSB7XG4gIHRyYXZlcnNhbC5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5cblRyZWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2FsKSB7XG4gIHZhciBjaGlsZCA9IG5ldyBOb2RlKGRhdGEpLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gdG9EYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQucGFyZW50ID0gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFkZCBub2RlIHRvIGEgbm9uLWV4aXN0ZW50IHBhcmVudC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcbn07XG5cblRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGRhdGEsIGZyb21EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIHRyZWUgPSB0aGlzLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBudWxsLFxuICAgICAgaW5kZXg7XG5cbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLmRhdGEgPT09IGZyb21EYXRhKSB7XG4gICAgICBwYXJlbnQgPSBub2RlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBpbmRleCA9IGZpbmRJbmRleChwYXJlbnQuY2hpbGRyZW4sIGRhdGEpO1xuXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm9kZSB0byByZW1vdmUgZG9lcyBub3QgZXhpc3QuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZG9lcyBub3QgZXhpc3QuJyk7XG4gIH1cblxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XG4gIHRoaXMuY2FsY1RvdGFsT2Zmc2V0WUxldmVsKCk7XG5cbiAgcmV0dXJuIGNoaWxkVG9SZW1vdmU7XG59O1xuXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBkYXRhKSB7XG4gIHZhciBpbmRleDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJbaV0uZGF0YSA9PT0gZGF0YSkge1xuICAgICAgaW5kZXggPSBpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpbmRleDtcbn1cblxuLyogdHJlZSBhZGRvbiovXG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGlyZWN0Q2hpbGQgPSBmdW5jdGlvbihub2RlZGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgcGFyZW50ID0gbnVsbCxcbiAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLmRhdGEgPT09IG5vZGVkYXRhKSB7XG4gICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICB9XG4gICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKHBhcmVudC5jaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIGNhbGxiYWNrKHBhcmVudCk7XG4gICAgcGFyZW50ID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59O1xuVHJlZS5wcm90b3R5cGUuYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3R5bGVPYmogPSB7fTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHN0eWxlT2JqW25vZGUuZGF0YV0gPSBub2RlLnRvdGFsb2Zmc2V0eWxldmVsO1xuICB9O1xuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuXG4gIHJldHVybiBzdHlsZU9iajtcbn07XG5cbi8qKlxuICogW3RyYXZlcnNlRGVzY2VuZGFudHMgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbaW50ZWdlcl19IG5vZGVEYXRhIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1thcnJheV19ICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURlc2NlbmRhbnRzID0gZnVuY3Rpb24obm9kZURhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5kYXRhID09PSBub2RlRGF0YSkge1xuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcblxuICBxdWV1ZS5lbnF1ZXVlKHBhcmVudCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB2YXIgZGVzY2VuZGFudHNBcnIgPSBbXTtcblxuICB3aGlsZSAoY3VycmVudFRyZWUpIHtcbiAgICBkZXNjZW5kYW50c0Fyci5wdXNoKGN1cnJlbnRUcmVlKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUoY3VycmVudFRyZWUuY2hpbGRyZW5baV0pO1xuICAgIH1cblxuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG5cbiAgcmV0dXJuIGRlc2NlbmRhbnRzQXJyO1xufTtcblxuVHJlZS5wcm90b3R5cGUubWF4TGV2ZWxzID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIGRhdGFSb290Tm9kZXMgPSB0aGlzLnRyYXZlcnNlRGlyZWN0Q2hpbGQoJ19kYXRhX3Jvb3QnKTtcbiAgdmFyIHJvd0xldmVsT2JqID0ge307XG4gIHZhciBoZWFkSWR4QXJyID0gW107XG4gIGZvciAodmFyIGRybiBpbiBkYXRhUm9vdE5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKGRhdGFSb290Tm9kZXMuX3N0b3JhZ2UuaGFzT3duUHJvcGVydHkoZHJuKSkge1xuICAgICAgcm93TGV2ZWxPYmpbZHJuXSA9IHt9O1xuICAgICAgcm93TGV2ZWxPYmpbZHJuXVsnaGVhZC1pZHgnXSA9IGRhdGFSb290Tm9kZXMuX3N0b3JhZ2VbZHJuXS5kYXRhO1xuICAgICAgaGVhZElkeEFyci5wdXNoKGRhdGFSb290Tm9kZXMuX3N0b3JhZ2VbZHJuXS5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdElkeEZyb21RdWV1ZShxdWV1ZSkge1xuICAgIHZhciBjaGlsZHJlbklkeEFyciA9IFtdO1xuICAgIGZvciAodmFyIHBlck5vZGUgaW4gcXVldWUuX3N0b3JhZ2UpIHtcbiAgICAgIGlmICgodHlwZW9mIHBhcnNlSW50KHBlck5vZGUpID09PSAnbnVtYmVyJykgJiYgcXVldWUuX3N0b3JhZ2VbcGVyTm9kZV0uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xuICAgICAgICBjaGlsZHJlbklkeEFyci5wdXNoKHF1ZXVlLl9zdG9yYWdlW3Blck5vZGVdLmRhdGEpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuSWR4QXJyO1xuICB9XG5cbiAgdmFyIGxldmVsTmV4dENvbEFyciA9IFtdO1xuXG4gIGZ1bmN0aW9uIGdldFJvd0xldmVsKGlkeCkge1xuICAgIHZhciBkaXJlY3RDaGlsZHJlblF1ZXVlID0gdGhhdC50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gICAgdmFyIGRpcmVjdENoaWxkcmVuQXJyID0gZXh0cmFjdElkeEZyb21RdWV1ZShkaXJlY3RDaGlsZHJlblF1ZXVlKTtcbiAgICByZXR1cm4gZGlyZWN0Q2hpbGRyZW5BcnI7XG4gIH1cblxuICB2YXIgdWx0aW1hdGVBcnIgPSBbXTtcbiAgdmFyIHBlckhlYWQgPSBbXTtcblxuICBmdW5jdGlvbiBuZXh0TGV2ZWxDaGlsZHJlbihhcnIpIHtcbiAgICB2YXIgbmV4dExldmVsQ2hpbGRyZW5BcnIgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBlck51bSA9IGdldFJvd0xldmVsKGFycltpXSk7XG4gICAgICBuZXh0TGV2ZWxDaGlsZHJlbkFyciA9IG5leHRMZXZlbENoaWxkcmVuQXJyLmNvbmNhdChwZXJOdW0pO1xuICAgIH07XG4gICAgaWYgKG5leHRMZXZlbENoaWxkcmVuQXJyLmxlbmd0aCkge1xuICAgICAgcGVySGVhZC5wdXNoKG5leHRMZXZlbENoaWxkcmVuQXJyLmxlbmd0aCk7XG4gICAgICBuZXh0TGV2ZWxDaGlsZHJlbihuZXh0TGV2ZWxDaGlsZHJlbkFycik7XG4gICAgfTtcbiAgfVxuXG4gIChmdW5jdGlvbiByZWN1cnNlKGFycikge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBlckhlYWQgPSBbXTtcbiAgICAgIC8vIGxldmVsIDFcbiAgICAgIGxldmVsTmV4dENvbEFyciA9IGdldFJvd0xldmVsKGFycltpXSk7XG4gICAgICBwZXJIZWFkLnB1c2goMSk7XG4gICAgICBpZiAobGV2ZWxOZXh0Q29sQXJyLmxlbmd0aCkge1xuICAgICAgICBwZXJIZWFkLnB1c2gobGV2ZWxOZXh0Q29sQXJyLmxlbmd0aCk7XG4gICAgICAgIG5leHRMZXZlbENoaWxkcmVuKGxldmVsTmV4dENvbEFycik7XG4gICAgICB9O1xuICAgICAgdWx0aW1hdGVBcnIucHVzaChwZXJIZWFkKTtcbiAgICB9O1xuICB9KShoZWFkSWR4QXJyKTtcblxuICByZXR1cm4gdWx0aW1hdGVBcnI7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qc1xuICoqLyIsIi8qKlxuICogW1F1ZXVlIGRlc2NyaXB0aW9uXVxuICogZW5xdWV1ZShkYXRhKSBhZGRzIGRhdGEgdG8gYSBxdWV1ZS5cbiAqIGRlcXVldWUgcmVtb3ZlcyB0aGUgb2xkZXN0IGFkZGVkIGRhdGEgdG8gYSBxdWV1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFF1ZXVlKCkge1xuICB0aGlzLl9vbGRlc3RJbmRleCA9IDE7XG4gIHRoaXMuX25ld2VzdEluZGV4ID0gMTtcbiAgdGhpcy5fc3RvcmFnZSA9IHt9O1xufVxuXG5RdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbmV3ZXN0SW5kZXggLSB0aGlzLl9vbGRlc3RJbmRleDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl9zdG9yYWdlW3RoaXMuX25ld2VzdEluZGV4XSA9IGRhdGE7XG4gIHRoaXMuX25ld2VzdEluZGV4Kys7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkZXN0SW5kZXggPSB0aGlzLl9vbGRlc3RJbmRleCxcbiAgICAgIG5ld2VzdEluZGV4ID0gdGhpcy5fbmV3ZXN0SW5kZXgsXG4gICAgICBkZWxldGVkRGF0YTtcblxuICBpZiAob2xkZXN0SW5kZXggIT09IG5ld2VzdEluZGV4KSB7XG4gICAgZGVsZXRlZERhdGEgPSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICBkZWxldGUgdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgdGhpcy5fb2xkZXN0SW5kZXgrKztcblxuICAgIHJldHVybiBkZWxldGVkRGF0YTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzXG4gKiovIiwiaW1wb3J0IHtkaXNhYmxlU2Nyb2xsLCBlbmFibGVTY3JvbGx9IGZyb20gJy4vdG9nZ2xlU2Nyb2xsJztcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cChldiwgY2FsbGJhY2spIHtcbiAgbGV0IHBvcHVwRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBvcHVwRWxlLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLWxheWVyJyk7XG4gIHBvcHVwRWxlLmlubmVySFRNTCA9IGdlbmVyYXRlUG9wdXBUcGwoKTtcbiAgcG9zaXRpb25Qb3B1cEVsZShwb3B1cEVsZSwgZXYpO1xuICBiaW5kUG9wdXBFdmVudHMocG9wdXBFbGUpO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwRWxlKTtcbiAgZGlzYWJsZVNjcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBvcHVwVHBsKGRhdGEpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtdGV4dFwiPkFyZSB5b3Ugc3VyZSB0byBkZWxldGUgdGhpcyBBUEk/PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRQb3B1cEV2ZW50cyhlbGUpIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLXNoYWRvdycpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG59XG5cbmZ1bmN0aW9uIHBvc2l0aW9uUG9wdXBFbGUoZWxlLCBjb29yZGluYXRlcykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncG9wdXAtY29udGVudCcpWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgY29vcmRpbmF0ZXMucGFnZVggKyAncHgsICcgKyBjb29yZGluYXRlcy5wYWdlWSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2KSB7XG4gIGlmIChldi50YXJnZXQgPT09IGV2LmN1cnJlbnRUYXJnZXQpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMucGFyZW50Tm9kZSk7XG4gICAgZW5hYmxlU2Nyb2xsKCk7XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPZkFycmF5KG51bUFycmF5KSB7XG4gIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihjbGFzc05hbWUpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksIHByZWZpeCA9ICcnO1xuICBwcmVmaXggPSAodWEuaW5kZXhPZignY2hyb21lJykgPj0gMCB8fCB3aW5kb3cub3BlbkRhdGFiYXNlKSA/ICctd2Via2l0LScgOiAodWEuaW5kZXhPZignZmlyZWZveCcpID49IDApID8gJy1tb3otJyA6IHdpbmRvdy5vcGVyYSA/ICctby0nIDogKGRvY3VtZW50LmFsbCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPT09IC0xKSA/ICctbXMtJyA6ICcnO1xuICByZXR1cm4gcHJlZml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsKSB7XG4gIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuXG4gIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbiAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcblxuICByZXN1bHRzLnB1c2goMCk7XG4gIHJldHVybiByZXN1bHRzLnNsaWNlKDUsIDgpOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4vLyAgIC8vIGNocm9tZSB3b24ndCB1c2UgcHJlZml4XG4vLyAgIC8vIHZhciBzdHlsZV9hdHRyID0gYnJvd3NlclByZWZpeCgpICsgJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciBzdHlsZV9hdHRyID0gJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZV9hdHRyKTtcbi8vICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuLy8gICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4vLyAgIGlmIChyZXN1bHRzWzFdID09PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuLy8gICByZXN1bHRzLnB1c2goMCk7XG4vLyAgIHJldHVybiArKHJlc3VsdHMuc2xpY2UoNSwgOClbMF0pOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykuc3BsaXQoJ3RyYW5zbGF0ZTNkJylbMV0uc3BsaXQoJywgJylbMF0uc2xpY2UoMSkuc3BsaXQoJ3B4JylbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVZKG9iaikge1xuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSB8fCBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICB2YXIgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICBpZiAobWF0KSByZXR1cm4gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbMTNdKTtcbiAgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgcmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24geGhyKG1ldGhvZCwgdXJsLCBjYWxsYmFjaywgcGFyYW1zT2JqID0ge30sIGlzQXN5bmMgPSB0cnVlKSB7XG4gIHZhciB4bWxodHRwO1xuXG4gIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgaWYgKHhtbGh0dHAuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBjYWxsYmFjayh4bWxodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKHhtbGh0dHAuc3RhdHVzID09IDQwMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIHdhcyBhbiBlcnJvciA0MDAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignc29tZXRoaW5nIGVsc2Ugb3RoZXIgdGhhbiAyMDAgd2FzIHJldHVybmVkJyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciBjb21iVXJsID0gdXJsICsgc2VyaWFsaXplKHBhcmFtc09iaik7XG5cbiAgeG1saHR0cC5vcGVuKG1ldGhvZCwgY29tYlVybCwgaXNBc3luYyk7XG4gIHhtbGh0dHAuc2VuZChudWxsKTtcbn1cblxuLyoqXG4gKiBbc3RyaW5naWZ5IHdpdGggNCBzcGFjZXMgYXQgZWFjaCBsZXZlbF1cbiAqIEBwYXJhbSAge1tvYmplY3RdfSBqc09iaiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIFwiXFx0XCIpOyAvLyBzdHJpbmdpZnkgd2l0aCB0YWJzIGluc2VydGVkIGF0IGVhY2ggbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIFtoaWdodGxpZ2h0SlNPTiB3b3JrcyBvbiBKU09OIG9iamVjdCwgbm90IHN0cmluZ11cbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XG4gIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uLCB1bmRlZmluZWQsIDQpO1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICB2YXIgY2xzID0gJ251bWJlcic7XG4gICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAna2V5JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgfSBlbHNlIGlmICgvbnVsbC8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdudWxsJztcbiAgICB9XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICB9KTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3V0aWxpdGllcy5qc1xuICoqLyIsIi8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDAsXG4vLyBzcGFjZWJhcjogMzIsIHBhZ2V1cDogMzMsIHBhZ2Vkb3duOiAzNCwgZW5kOiAzNSwgaG9tZTogMzZcbnZhciBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikgLy8gb2xkZXIgRkZcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbndoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG1vZGVybiBzdGFuZGFyZFxuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG9sZGVyIGJyb3dzZXJzLCBJRVxuICB3aW5kb3cub250b3VjaG1vdmUgID0gcHJldmVudERlZmF1bHQ7IC8vIG1vYmlsZVxuICBkb2N1bWVudC5vbmtleWRvd24gID0gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9ud2hlZWwgPSBudWxsO1xuICB3aW5kb3cub250b3VjaG1vdmUgPSBudWxsO1xuICBkb2N1bWVudC5vbmtleWRvd24gPSBudWxsO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=