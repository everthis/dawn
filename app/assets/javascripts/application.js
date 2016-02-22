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
	
	var _modulesHomepage = __webpack_require__(3);
	
	var _apiTreeAppIndex = __webpack_require__(5);
	
	var _modulesApiOperation = __webpack_require__(13);
	
	(0, _modulesDataLinks.dataLinks)();
	// apiTree();
	// var p = new dawnSVG();
	// p.init(document.getElementById('painter-target'));
	// p.start();
	
	(function () {
	  var routes = {
	    '/': _modulesHomepage.home,
	    '/apis': [_apiTreeAppIndex.apiTree, _modulesApiOperation.initXhr]
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
	
	var _commomCsrf = __webpack_require__(2);
	
	function dataLinks() {
	  document.addEventListener('click', processDataLink, false);
	}
	
	function processDataLink(e) {
	  var e = window.e || e;
	
	  if (e.target.tagName !== 'A') return;
	
	  // Do something
	  if (e.target.dataset.method) {
	    e.preventDefault();
	    handleMethod(e.target);
	  }
	}
	
	/**
	 * [handleMethod description]
	 * @param  {HTMLElement} link [description]
	 * @return {[type]}      [description]
	 * Handles "data-method" on links such as:
	 * <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
	 */
	function handleMethod(link) {
	  var href = link.getAttribute('href'),
	      method = link.dataset.method,
	      target = link.getAttribute('target'),
	      csrfToken = _commomCsrf.rorParams.csrfToken(),
	      csrfParam = _commomCsrf.rorParams.csrfParam();
	  var paramsObj = {
	    href: href,
	    method: method,
	    target: target,
	    csrfToken: csrfToken,
	    csrfParam: csrfParam
	  };
	  var formEle = createForm(paramsObj);
	  appendFormToDom(formEle);
	  submitForm(formEle);
	}
	function createForm(params) {
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
	  if (params.csrfParam !== undefined && params.csrfToken !== undefined && !_commomCsrf.rorParams.isCrossDomain(params.href)) {
	    s = document.createElement('input');
	    s.setAttribute('type', 'hidden');
	    s.setAttribute('name', params.csrfParam);
	    s.setAttribute('value', params.csrfToken);
	  }
	  f.appendChild(i);
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
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.home = home;
	
	var _tweetBox = __webpack_require__(4);
	
	function home() {
		(0, _tweetBox.tweetBox)();
	}

/***/ },
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.apiTree = apiTree;
	
	var _utilities = __webpack_require__(6);
	
	var _treeDom = __webpack_require__(7);
	
	function apiTree() {
	  var addApiBtn = document.getElementsByClassName('add-api-btn')[0];
	  var apisArr = [];
	  addApiBtn.addEventListener('click', function () {
	    var newApi = new _treeDom.ApiDom();
	    apisArr.push(newApi);
	  });
	}
	
	function cb(data) {
	  var $test = document.getElementById('test');
	  data = JSON.parse(data);
	  $test.innerHTML = (0, _utilities.hightlightJSON)(data);
	}
	
	// xhr("GET", "http://127.0.0.1:4567/foo", cb);

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.ApiDom = ApiDom;
	
	var _tree = __webpack_require__(8);
	
	var _utilities = __webpack_require__(6);
	
	var perApiTpl = '<div class="api-info">' + '<label class="api-label">API:</label>' + '<input class="api-uri" placeholder="" value="http://127.0.0.1:4567/foo" disabled="true" /> ' + '<label class="api-label">method:</label>' + '<select class="api-method">' + '<option value="GET" selected>GET</option>' + '<option value="POST">POST</option>' + '<option value="PATCH">PATCH</option>' + '<option value="DELETE">DELETE</option>' + '</select>' + '<span class="api-edit">edit</span>' + '<span class="api-save">save</span>' + '<span class="api-test">test</span>' + '</div>' + '<div class="api-tree-wrapper"><div class="api-tree-frame"><svg class="api-svg" width="100%" height="100%"></svg></div><div class="api-tree"></div></div>' + '<div class="api-data">' + '<div class="data-views-control">' + '<span class="data-raw">raw</span>' + '<span class="data-beautify">beautify</span>' + '<span class="data-highlight">syntaxHighlight</span>' + '<span class="data-preview">preview</span>' + '</div>' + '<div class="data-view json">' + '</div>' + '</div>';
	
	var leafContentTpl = '<i class="remove-child">-</i>' + '<input type="text" class="leaf-key" placeholder="key" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="value" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="quantity" />' + '<i class="add-child">+</i>';
	
	var initRectObj = {
	  right: 0,
	  bottom: 0,
	  left: 0,
	  top: 0,
	  width: 0,
	  height: 0
	};
	
	function createPerApi() {
	  var perApiEle = document.createElement('div');
	  perApiEle.setAttribute('class', 'per-api');
	  perApiEle.innerHTML = perApiTpl;
	  return perApiEle;
	}
	
	function ApiDom() {
	  this.$apis = document.getElementsByClassName('apis')[0];
	  var preApisLen = this.$apis.getElementsByClassName('per-api').length;
	
	  this.$apis.appendChild(createPerApi());
	
	  this.bindEventsToMRCAPI();
	
	  this.leafIndex = 1;
	
	  var recentApi = this.$apis.getElementsByClassName('per-api')[preApisLen];
	  this.$apiTree = recentApi.getElementsByClassName('api-tree')[0];
	  this.$apiTree.appendChild(createLeaf('_data_root', 1, 0, initRectObj));
	
	  this.$apiTreeFrame = recentApi.getElementsByClassName('api-tree-frame')[0];
	
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
	  var newlyCreatedApiNode = this.$apis.lastChild;
	
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
	    that.$apis.removeChild(ev.currentTarget.closest('.per-api'));
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
/* 8 */
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
	
	var _queue = __webpack_require__(9);
	
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
/* 9 */
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
/* 10 */,
/* 11 */,
/* 12 */
/***/ function(module, exports) {

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
	
	function $http(url) {
	
	  // A small example of object
	  var core = {
	
	    // Method that performs the ajax request
	    ajax: function ajax(method, url, args) {
	
	      // Creating a promise
	      var promise = new Promise(function (resolve, reject) {
	
	        // Instantiates the XMLHttpRequest
	        var client = new XMLHttpRequest();
	        var uri = url;
	
	        if (args && (method === 'POST' || method === 'PUT')) {
	          uri += '?';
	          var argcount = 0;
	          for (var key in args) {
	            if (args.hasOwnProperty(key)) {
	              if (argcount++) {
	                uri += '&';
	              }
	              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
	            }
	          }
	        }
	
	        client.open(method, uri);
	        client.send();
	
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
	    'get': function get(args) {
	      return core.ajax('GET', url, args);
	    },
	    'post': function post(args) {
	      return core.ajax('POST', url, args);
	    },
	    'put': function put(args) {
	      return core.ajax('PUT', url, args);
	    },
	    'delete': function _delete(args) {
	      return core.ajax('DELETE', url, args);
	    }
	  };
	}
	
	// End A

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.initXhr = initXhr;
	
	var _commonAjax = __webpack_require__(12);
	
	var rootAPI = window.location.origin + '/apis/';
	var payload = {};
	var callback = {
	  success: function success(data) {
	    console.log(1, 'success', JSON.parse(data));
	  },
	  error: function error(data) {
	    console.log(2, 'error', JSON.parse(data));
	  }
	};
	
	function initXhr() {
	  document.addEventListener('click', function (ev) {
	    var id = undefined;
	    if (ev.target.classList.contains('api-li')) {
	      id = ev.target.dataset.apiId;
	      (0, _commonAjax.$http)(rootAPI + id).get(payload).then(callback.success)['catch'](callback.error);
	    }
	  });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDQzZjk4ODJjMzM5NjBkMjBmMmYiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9tL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvdHdlZXRCb3guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2FwcC1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLWRvbS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvcXVldWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9hamF4LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2FwaU9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7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LENBQUMsQ0FBQyxDQUFDO0lBQzNDO0VBQ0YsQ0FBQzs7QUFDSyxVQUFTLE9BQU8sR0FBRztBQUN4QixXQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVMsRUFBRSxFQUFFO0FBQzlDLFNBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQztBQUNuQixTQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUMxQyxTQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzdCLDhCQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FDbEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUNaLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQ2pCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3hCO0lBQ0YsQ0FBQyxDQUFDIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBkNDNmOTg4MmMzMzk2MGQyMGYyZlxuICoqLyIsImltcG9ydCB7ZGF0YUxpbmtzfSBmcm9tICcuL21vZHVsZXMvZGF0YUxpbmtzJztcbmltcG9ydCB7aG9tZX0gZnJvbSAnLi9tb2R1bGVzL2hvbWVwYWdlJztcbmltcG9ydCB7YXBpVHJlZX0gZnJvbSAnLi9hcGktdHJlZS9hcHAtaW5kZXgnO1xuaW1wb3J0IHtpbml0WGhyfSBmcm9tICcuL21vZHVsZXMvYXBpT3BlcmF0aW9uJztcbmRhdGFMaW5rcygpO1xuLy8gYXBpVHJlZSgpO1xuLy8gdmFyIHAgPSBuZXcgZGF3blNWRygpO1xuLy8gcC5pbml0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYWludGVyLXRhcmdldCcpKTtcbi8vIHAuc3RhcnQoKTtcblxuKCgpID0+IHtcbiAgbGV0IHJvdXRlcyA9IHtcbiAgICAnLyc6IGhvbWUsXG4gICAgJy9hcGlzJzogW2FwaVRyZWUsIGluaXRYaHJdXG4gIH07XG4gIGxldCBwYXRoTmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgaWYgKHJvdXRlcy5oYXNPd25Qcm9wZXJ0eShwYXRoTmFtZSkpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJvdXRlc1twYXRoTmFtZV0pID09PSAnW29iamVjdCBBcnJheV0nICYmIHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgcm91dGVzW3BhdGhOYW1lXVtpXS5hcHBseShudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVzW3BhdGhOYW1lXS5hcHBseShudWxsKTtcbiAgICB9XG4gIH1cblxufSkoKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzXG4gKiovIiwiaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuLi9jb21tb20vY3NyZic7XG5cbmV4cG9ydCBmdW5jdGlvbiBkYXRhTGlua3MoKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc0RhdGFMaW5rLCBmYWxzZSk7XG59XG5mdW5jdGlvbiBwcm9jZXNzRGF0YUxpbmsoZSkge1xuICB2YXIgZSA9IHdpbmRvdy5lIHx8IGU7XG5cbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUgIT09ICdBJylcbiAgICAgIHJldHVybjtcblxuICAvLyBEbyBzb21ldGhpbmdcbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbn1cblxuLyoqXG4gKiBbaGFuZGxlTWV0aG9kIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGxpbmsgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEhhbmRsZXMgXCJkYXRhLW1ldGhvZFwiIG9uIGxpbmtzIHN1Y2ggYXM6XG4gKiA8YSBocmVmPVwiL3VzZXJzLzVcIiBkYXRhLW1ldGhvZD1cImRlbGV0ZVwiIHJlbD1cIm5vZm9sbG93XCIgZGF0YS1jb25maXJtPVwiQXJlIHlvdSBzdXJlP1wiPkRlbGV0ZTwvYT5cbiAqL1xuZnVuY3Rpb24gaGFuZGxlTWV0aG9kKGxpbmspIHtcbiAgdmFyIGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgIG1ldGhvZCA9IGxpbmsuZGF0YXNldC5tZXRob2QsXG4gICAgdGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpLFxuICAgIGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKSxcbiAgICBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIHZhciBwYXJhbXNPYmogPSB7XG4gICAgaHJlZjogaHJlZixcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICBjc3JmVG9rZW46IGNzcmZUb2tlbixcbiAgICBjc3JmUGFyYW06IGNzcmZQYXJhbVxuICB9O1xuICB2YXIgZm9ybUVsZSA9IGNyZWF0ZUZvcm0ocGFyYW1zT2JqKTtcbiAgYXBwZW5kRm9ybVRvRG9tKGZvcm1FbGUpO1xuICBzdWJtaXRGb3JtKGZvcm1FbGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlRm9ybShwYXJhbXMpIHtcbiAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZi5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsJ3Bvc3QnKTtcbiAgZi5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicscGFyYW1zLmhyZWYpO1xuICBpZiAocGFyYW1zLnRhcmdldCkge1xuICAgIGYuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBwYXJhbXMudGFyZ2V0KTtcbiAgfTtcblxuICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGkuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIGkuc2V0QXR0cmlidXRlKCduYW1lJywnX21ldGhvZCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5tZXRob2QpO1xuXG4gIHZhciBzO1xuICBpZiAocGFyYW1zLmNzcmZQYXJhbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwYXJhbXMuY3NyZlRva2VuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICFSUHMuaXNDcm9zc0RvbWFpbihwYXJhbXMuaHJlZikpIHtcbiAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAgIHMuc2V0QXR0cmlidXRlKCduYW1lJywgcGFyYW1zLmNzcmZQYXJhbSk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMuY3NyZlRva2VuKTtcbiAgfVxuICBmLmFwcGVuZENoaWxkKGkpO1xuICBpZiAocykge1xuICAgIGYuYXBwZW5kQ2hpbGQocyk7XG4gIH07XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRGb3JtVG9Eb20oZm9ybSkge1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xufVxuZnVuY3Rpb24gc3VibWl0Rm9ybShmb3JtKSB7XG4gIGZvcm0uc3VibWl0KCk7XG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZGF0YUxpbmtzLmpzXG4gKiovIiwiZXhwb3J0IGxldCByb3JQYXJhbXMgPSB7XG4gIC8vIFVwLXRvLWRhdGUgQ3Jvc3MtU2l0ZSBSZXF1ZXN0IEZvcmdlcnkgdG9rZW5cbiAgY3NyZlRva2VuOiAoKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9Y3NyZi10b2tlbl0nKS5nZXRBdHRyaWJ1dGUoJ2NvbnRlbnQnKSxcbiAgLy8gVVJMIHBhcmFtIHRoYXQgbXVzdCBjb250YWluIHRoZSBDU1JGIHRva2VuXG4gIGNzcmZQYXJhbTogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtcGFyYW1dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIERldGVybWluZXMgaWYgdGhlIHJlcXVlc3QgaXMgYSBjcm9zcyBkb21haW4gcmVxdWVzdC5cbiAgaXNDcm9zc0RvbWFpbjogdXJsID0+IHtcbiAgICBsZXQgb3JpZ2luQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIG9yaWdpbkFuY2hvci5ocmVmID0gbG9jYXRpb24uaHJlZjtcbiAgICBsZXQgdXJsQW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHVybEFuY2hvci5ocmVmID0gdXJsO1xuICAgICAgLy8gVGhpcyBpcyBhIHdvcmthcm91bmQgdG8gYSBJRSBidWcuXG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybEFuY2hvci5ocmVmO1xuXG4gICAgICAvLyBJZiBVUkwgcHJvdG9jb2wgaXMgZmFsc2Ugb3IgaXMgYSBzdHJpbmcgY29udGFpbmluZyBhIHNpbmdsZSBjb2xvblxuICAgICAgLy8gKmFuZCogaG9zdCBhcmUgZmFsc2UsIGFzc3VtZSBpdCBpcyBub3QgYSBjcm9zcy1kb21haW4gcmVxdWVzdFxuICAgICAgLy8gKHNob3VsZCBvbmx5IGJlIHRoZSBjYXNlIGZvciBJRTcgYW5kIElFIGNvbXBhdGliaWxpdHkgbW9kZSkuXG4gICAgICAvLyBPdGhlcndpc2UsIGV2YWx1YXRlIHByb3RvY29sIGFuZCBob3N0IG9mIHRoZSBVUkwgYWdhaW5zdCB0aGUgb3JpZ2luXG4gICAgICAvLyBwcm90b2NvbCBhbmQgaG9zdC5cbiAgICAgIHJldHVybiAhKCgoIXVybEFuY2hvci5wcm90b2NvbCB8fCB1cmxBbmNob3IucHJvdG9jb2wgPT09ICc6JykgJiYgIXVybEFuY2hvci5ob3N0KSB8fFxuICAgICAgICAob3JpZ2luQW5jaG9yLnByb3RvY29sICsgJy8vJyArIG9yaWdpbkFuY2hvci5ob3N0ID09PVxuICAgICAgICAgIHVybEFuY2hvci5wcm90b2NvbCArICcvLycgKyB1cmxBbmNob3IuaG9zdCkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIElmIHRoZXJlIGlzIGFuIGVycm9yIHBhcnNpbmcgdGhlIFVSTCwgYXNzdW1lIGl0IGlzIGNyb3NzRG9tYWluLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9tL2NzcmYuanNcbiAqKi8iLCJpbXBvcnQge3R3ZWV0Qm94fSBmcm9tICcuL3R3ZWV0Qm94JztcbmV4cG9ydCBmdW5jdGlvbiBob21lKCkge1xuXHR0d2VldEJveCgpO1xufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanNcbiAqKi8iLCJmdW5jdGlvbiBzZXRGb2N1cyhlbCkge1xuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICByYW5nZS5zZXRTdGFydChlbCwgMCk7XG4gIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbC5hZGRSYW5nZShyYW5nZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdHdlZXRCb3goKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIHRiID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3R3ZWV0LWJveCcpWzBdO1xuICB2YXIgdGJkID0gdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdO1xuICB2YXIgdGJkU3RyaW5nID0gJzxkaXY+PGJyPjwvZGl2Pic7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBmdW5jdGlvbihldikge1xuICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbmRlbnNlZCcpO1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JykgJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLmlubmVyVGV4dC50cmltKCkubGVuZ3RoKSB7XG5cbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5jbGFzc0xpc3QuYWRkKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9XG4gICAgaWYgKHRiZC5pbm5lckhUTUwgPT09ICdXaGF0XFwncyBoYXBwZW5pbmc/Jykge1xuXG4gICAgICB0YmQuaW5uZXJIVE1MID0gJzxicj4nO1xuICAgIH1cbiAgfSk7XG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXYpIHtcbiAgICBpZiAodGIuaW5uZXJIVE1MKSB7XG4gICAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS50ZXh0Q29udGVudCkge1xuICAgICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICAgIH0gZWxzZSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuXG4gICAgICB9LCAwKTtcbiAgICB9O1xuICB9KTtcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXYpIHtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS50ZXh0Q29udGVudCkge1xuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfTtcbiAgICBpZiAodGIuaW5uZXJIVE1MID09PSAnPGJyPicpIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG4gICAgfVxuICB9KTtcbn1cblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy90d2VldEJveC5qc1xuICoqLyIsImltcG9ydCB7eGhyLCBiZWF1dGlmeUpTT04sIGhpZ2h0bGlnaHRKU09OfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi90cmVlLWRvbSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcGlUcmVlKCkge1xuICB2YXIgYWRkQXBpQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWFwaS1idG4nKVswXTtcbiAgdmFyIGFwaXNBcnIgPSBbXTtcbiAgYWRkQXBpQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld0FwaSA9IG5ldyBBcGlEb20oKTtcbiAgICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNiKGRhdGEpIHtcbiAgdmFyICR0ZXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rlc3QnKTtcbiAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICR0ZXN0LmlubmVySFRNTCA9IGhpZ2h0bGlnaHRKU09OKGRhdGEpO1xufVxuXG4vLyB4aHIoXCJHRVRcIiwgXCJodHRwOi8vMTI3LjAuMC4xOjQ1NjcvZm9vXCIsIGNiKTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvYXBwLWluZGV4LmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGdldE1heE9mQXJyYXkobnVtQXJyYXkpIHtcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxlbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKGNsYXNzTmFtZSkgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXgoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgcHJlZml4ID0gJyc7XG4gIHByZWZpeCA9ICh1YS5pbmRleE9mKCdjaHJvbWUnKSA+PSAwIHx8IHdpbmRvdy5vcGVuRGF0YWJhc2UpID8gJy13ZWJraXQtJyA6ICh1YS5pbmRleE9mKCdmaXJlZm94JykgPj0gMCkgPyAnLW1vei0nIDogd2luZG93Lm9wZXJhID8gJy1vLScgOiAoZG9jdW1lbnQuYWxsICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA9PT0gLTEpID8gJy1tcy0nIDogJyc7XG4gIHJldHVybiBwcmVmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oZWwpIHtcbiAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG5cbiAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuICBpZiAocmVzdWx0c1sxXSA9PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuXG4gIHJlc3VsdHMucHVzaCgwKTtcbiAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoNSwgOCk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbi8vICAgLy8gY2hyb21lIHdvbid0IHVzZSBwcmVmaXhcbi8vICAgLy8gdmFyIHN0eWxlX2F0dHIgPSBicm93c2VyUHJlZml4KCkgKyAndHJhbnNmb3JtJztcbi8vICAgdmFyIHN0eWxlX2F0dHIgPSAndHJhbnNmb3JtJztcbi8vICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlX2F0dHIpO1xuLy8gICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG4vLyAgIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbi8vICAgaWYgKHJlc3VsdHNbMV0gPT09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG4vLyAgIHJlc3VsdHMucHVzaCgwKTtcbi8vICAgcmV0dXJuICsocmVzdWx0cy5zbGljZSg1LCA4KVswXSk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5zcGxpdCgndHJhbnNsYXRlM2QnKVsxXS5zcGxpdCgnLCAnKVswXS5zbGljZSgxKS5zcGxpdCgncHgnKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVkob2JqKSB7XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxuICAgICAgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtIHx8IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gIHZhciBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gIGlmIChtYXQpIHJldHVybiBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVsxM10pO1xuICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICByZXR1cm4gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbNV0pIDogMDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB4aHIobWV0aG9kLCB1cmwsIGNhbGxiYWNrLCBwYXJhbXNPYmogPSB7fSwgaXNBc3luYyA9IHRydWUpIHtcbiAgdmFyIHhtbGh0dHA7XG5cbiAgeG1saHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHhtbGh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHhtbGh0dHAucmVhZHlTdGF0ZSA9PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XG4gICAgICBpZiAoeG1saHR0cC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGNhbGxiYWNrKHhtbGh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAoeG1saHR0cC5zdGF0dXMgPT0gNDAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhlcmUgd2FzIGFuIGVycm9yIDQwMCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzb21ldGhpbmcgZWxzZSBvdGhlciB0aGFuIDIwMCB3YXMgcmV0dXJuZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGNvbWJVcmwgPSB1cmwgKyBzZXJpYWxpemUocGFyYW1zT2JqKTtcblxuICB4bWxodHRwLm9wZW4obWV0aG9kLCBjb21iVXJsLCBpc0FzeW5jKTtcbiAgeG1saHR0cC5zZW5kKG51bGwpO1xufVxuXG4vKipcbiAqIFtzdHJpbmdpZnkgd2l0aCA0IHNwYWNlcyBhdCBlYWNoIGxldmVsXVxuICogQHBhcmFtICB7W29iamVjdF19IGpzT2JqIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1tzdHJpbmddfSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBKU09OLnN0cmluZ2lmeShqc09iaiwgbnVsbCwgXCJcXHRcIik7IC8vIHN0cmluZ2lmeSB3aXRoIHRhYnMgaW5zZXJ0ZWQgYXQgZWFjaCBsZXZlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gYmVhdXRpZnlKU09OKGpzT2JqKSB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShqc09iaiwgbnVsbCwgNCk7XG59XG5cbi8qKlxuICogW2hpZ2h0bGlnaHRKU09OIHdvcmtzIG9uIEpTT04gb2JqZWN0LCBub3Qgc3RyaW5nXVxuICogQHBhcmFtICB7SlNPTiBvYmplY3R9IGpzb24gW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7c3RyaW5nfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhpZ2h0bGlnaHRKU09OKGpzb24pIHtcbiAganNvbiA9IEpTT04uc3RyaW5naWZ5KGpzb24sIHVuZGVmaW5lZCwgNCk7XG4gIGpzb24gPSBqc29uLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcbiAgcmV0dXJuIGpzb24ucmVwbGFjZSgvKFwiKFxcXFx1W2EtekEtWjAtOV17NH18XFxcXFtedV18W15cXFxcXCJdKSpcIihcXHMqOik/fFxcYih0cnVlfGZhbHNlfG51bGwpXFxifC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/KS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIHZhciBjbHMgPSAnbnVtYmVyJztcbiAgICBpZiAoL15cIi8udGVzdChtYXRjaCkpIHtcbiAgICAgIGlmICgvOiQvLnRlc3QobWF0Y2gpKSB7XG4gICAgICAgIGNscyA9ICdrZXknO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xzID0gJ3N0cmluZyc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgvdHJ1ZXxmYWxzZS8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdib29sZWFuJztcbiAgICB9IGVsc2UgaWYgKC9udWxsLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ251bGwnO1xuICAgIH1cbiAgICByZXR1cm4gJzxzcGFuIGNsYXNzPVwiJyArIGNscyArICdcIj4nICsgbWF0Y2ggKyAnPC9zcGFuPic7XG4gIH0pO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtUcmVlfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGVYLCB4aHIsIGJlYXV0aWZ5SlNPTiwgaGlnaHRsaWdodEpTT059IGZyb20gJy4vdXRpbGl0aWVzJztcbnZhciBwZXJBcGlUcGwgPSAnPGRpdiBjbGFzcz1cImFwaS1pbmZvXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImFwaS11cmlcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwiaHR0cDovLzEyNy4wLjAuMTo0NTY3L2Zvb1wiIGRpc2FibGVkPVwidHJ1ZVwiIC8+ICcgK1xuICAgICAgICAgICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+bWV0aG9kOjwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiYXBpLW1ldGhvZFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiUE9TVFwiPlBPU1Q8L29wdGlvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiUEFUQ0hcIj5QQVRDSDwvb3B0aW9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvc2VsZWN0PicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZWRpdFwiPmVkaXQ8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCI+c2F2ZTwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYXBpLXRlc3RcIj50ZXN0PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFwaS10cmVlLXdyYXBwZXJcIj48ZGl2IGNsYXNzPVwiYXBpLXRyZWUtZnJhbWVcIj48c3ZnIGNsYXNzPVwiYXBpLXN2Z1wiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj48L3N2Zz48L2Rpdj48ZGl2IGNsYXNzPVwiYXBpLXRyZWVcIj48L2Rpdj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFwaS1kYXRhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0YS12aWV3cy1jb250cm9sXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkYXRhLXJhd1wiPnJhdzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRhdGEtYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRhdGEtaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGF0YS1wcmV2aWV3XCI+cHJldmlldzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxudmFyIGxlYWZDb250ZW50VHBsID0gJzxpIGNsYXNzPVwicmVtb3ZlLWNoaWxkXCI+LTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYta2V5XCIgcGxhY2Vob2xkZXI9XCJrZXlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ2YWx1ZVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInF1YW50aXR5XCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImFkZC1jaGlsZFwiPis8L2k+JztcblxudmFyIGluaXRSZWN0T2JqID0ge1xuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHdpZHRoOiAwLFxuICBoZWlnaHQ6IDBcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVBlckFwaSgpIHtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5pbm5lckhUTUwgPSBwZXJBcGlUcGw7XG4gIHJldHVybiBwZXJBcGlFbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oKSB7XG4gIHRoaXMuJGFwaXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGlzJylbMF07XG4gIHZhciBwcmVBcGlzTGVuID0gdGhpcy4kYXBpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZXItYXBpJykubGVuZ3RoO1xuXG4gIHRoaXMuJGFwaXMuYXBwZW5kQ2hpbGQoY3JlYXRlUGVyQXBpKCkpO1xuXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDQVBJKCk7XG5cbiAgdGhpcy5sZWFmSW5kZXggPSAxO1xuXG4gIHZhciByZWNlbnRBcGkgPSB0aGlzLiRhcGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Blci1hcGknKVtwcmVBcGlzTGVuXTtcbiAgdGhpcy4kYXBpVHJlZSA9IHJlY2VudEFwaS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYoJ19kYXRhX3Jvb3QnLCAxLCAwLCBpbml0UmVjdE9iaikpO1xuXG4gIHRoaXMuJGFwaVRyZWVGcmFtZSA9IHJlY2VudEFwaS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1mcmFtZScpWzBdO1xuXG4gIHRoaXMuaW5pdEFwaVRyZWUoKTtcblxuICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG5cbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNFKCk7XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmpzb25WaWV3ID0gZnVuY3Rpb24oZGF0YSkge1xuICB2YXIgJHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAkcHJlLmlubmVySFRNTCA9IGRhdGE7XG4gIHRoaXMuJGRhdGFWaWV3LmlubmVySFRNTCA9ICcnO1xuICB0aGlzLiRkYXRhVmlldy5hcHBlbmRDaGlsZCgkcHJlKTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDQVBJID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG5ld2x5Q3JlYXRlZEFwaU5vZGUgPSB0aGlzLiRhcGlzLmxhc3RDaGlsZDtcblxuICB2YXIgJGFwaUVkaXQgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1lZGl0JylbMF07XG4gIHZhciAkYXBpU2F2ZSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXTtcbiAgdmFyICRhcGlVcmkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXTtcbiAgdmFyICRhcGlUZXN0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdGVzdCcpWzBdO1xuICB2YXIgJGFwaU1ldGhvZCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdO1xuXG4gIHZhciAkZGF0YVJhdyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1yYXcnKVswXTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWJlYXV0aWZ5JylbMF07XG4gIHZhciAkZGF0YUhpZ2hsaWdodCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1oaWdobGlnaHQnKVswXTtcbiAgdmFyICRkYXRhUHJldmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1wcmV2aWV3JylbMF07XG5cbiAgdGhpcy4kZGF0YVZpZXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtdmlldycpWzBdO1xuXG4gICRhcGlFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkYXBpVXJpLmRpc2FibGVkID0gZmFsc2U7XG4gIH0pO1xuXG4gICRhcGlTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkYXBpVXJpLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgJGFwaVRlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgeGhyKCRhcGlNZXRob2QudmFsdWUsICRhcGlVcmkudmFsdWUsIHRoaXMuc3RvcmVBcGlSZXR1cm5EYXRhLmJpbmQodGhhdCkpO1xuICB9KTtcblxuICAkZGF0YVJhdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KHRoaXMuYXBpUmV0dXJuRGF0YSk7XG4gIH0pO1xuXG4gIHRoaXMuJGRhdGFCZWF1dGlmeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ID0+IHtcbiAgICB0aGlzLmpzb25WaWV3KGJlYXV0aWZ5SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFIaWdobGlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldiA9PiB7XG4gICAgdGhpcy5qc29uVmlldyhoaWdodGxpZ2h0SlNPTihKU09OLnBhcnNlKHRoaXMuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFQcmV2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXYgPT4ge1xuICAgIHRoaXMuanNvblZpZXcoJ1RoaXMgZmVhdHVyZSBoYXMgbm90IGJlZW4gYWNjb21wbGlzaGVkIHlldC4nKTtcbiAgfSk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUub3BlcmF0ZURhdGFSb290Q2hpbGQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgYWRkTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgYWRkTWFyay5jbGFzc05hbWUgPSAnYWRkLWRhdGFyb290LWNoaWxkJztcbiAgYWRkTWFyay50ZXh0Q29udGVudCA9ICcrJztcbiAgYWRkTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICB0aGF0LmxlYWZJbmRleCArPSAxO1xuICAgICAgdmFyIHBhcmVudElkeCA9ICdfZGF0YV9yb290JztcbiAgICAgIHZhciBub2RlTGV2ZWwgPSAwO1xuICAgICAgdGhhdC5hcGlUcmVlLmFkZCh0aGF0LmxlYWZJbmRleCwgcGFyZW50SWR4LCB0aGF0LmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgICAgIHRoYXQuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZHgsIHRoYXQubGVhZkluZGV4LCBub2RlTGV2ZWwsIGluaXRSZWN0T2JqKSk7XG4gICAgICB2YXIgb2JqID0gdGhhdC5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgICAgIHRoYXQuc3R5bGVOb2RlcyhvYmopO1xuICAgICAgdGhhdC5iaW5kRXZlbnRzVG9NUkNFKCk7XG4gICAgfSk7XG4gIHRoaXMuJGFwaVRyZWUuaW5zZXJ0QmVmb3JlKGFkZE1hcmssIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG5cbiAgdmFyIGRlbE1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGRlbE1hcmsuY2xhc3NOYW1lID0gJ2RlbC1kYXRhcm9vdC1jaGlsZCc7XG4gIGRlbE1hcmsudGV4dENvbnRlbnQgPSAnLSc7XG4gIGRlbE1hcmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgICAgLyogdGhpcyBBUEkgaXMgZGVsZXRlZC4gKi9cbiAgICAgIHRoYXQuJGFwaXMucmVtb3ZlQ2hpbGQoZXYuY3VycmVudFRhcmdldC5jbG9zZXN0KCcucGVyLWFwaScpKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoZGVsTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5pbml0QXBpVHJlZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFwaVRyZWUgPSBuZXcgVHJlZSgnX2RhdGFfcm9vdCcpO1xuICB0aGlzLmFwaVRyZWUuYWRkKDEsICdfZGF0YV9yb290JywgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuXG4gIHRoaXMub3BlcmF0ZURhdGFSb290Q2hpbGQoKTtcblxuICByZXR1cm4gdGhpcy5hcGlUcmVlO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5kZWxOb2RlID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBjdXJyZW50TGVhZiA9IGN0eC5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5sZWFmJyk7XG4gIHZhciBjdXJyZW50SWR4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIHBhcmVudElkeCA9IGlzTmFOKCtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50KSA/ICdfZGF0YV9yb290JyA6ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50O1xuXG4gIHZhciBub2Rlc0FyciA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURlc2NlbmRhbnRzKGN1cnJlbnRJZHgpO1xuICB2YXIgaWR4QXJyID0gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycik7XG4gIHRoaXMuYXBpVHJlZS5yZW1vdmUoY3VycmVudElkeCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMucmVtb3ZlTm9kZXNGcm9tRG9tKGlkeEFycik7XG5cbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWR4KTtcblxufTtcbkFwaURvbS5wcm90b3R5cGUucmVtb3ZlTm9kZXNGcm9tRG9tID0gZnVuY3Rpb24oYXJyKSB7XG4gIHZhciBhbGxMZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBhbGxMZWF2ZXNMZW4gPSBhbGxMZWF2ZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbExlYXZlc0xlbjsgaSsrKSB7XG4gICAgaWYgKGFyci5pbmRleE9mKCthbGxMZWF2ZXNbaV0uZGF0YXNldC5pbmRleCkgIT09IC0xKSB7XG4gICAgICB0aGlzLiRhcGlUcmVlLnJlbW92ZUNoaWxkKGFsbExlYXZlc1tpXSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpIHtcbiAgdmFyIG5vZGVzQXJyTGVuID0gbm9kZXNBcnIubGVuZ3RoO1xuICB2YXIgaWR4QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXNBcnJMZW47IGkrKykge1xuICAgIGlkeEFyci5wdXNoKG5vZGVzQXJyW2ldLmRhdGEpO1xuICB9O1xuICByZXR1cm4gaWR4QXJyO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLmJpbmRFdmVudHNUb01SQ0UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxlYXZlcyA9IHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpO1xuICB2YXIgbGVhdmVzTGVuID0gbGVhdmVzLmxlbmd0aDtcbiAgdmFyIG5ld2x5Q3JlYXRlZExlYWYgPSBsZWF2ZXNbbGVhdmVzTGVuIC0gMV07XG4gIHZhciAkYWRkQ2hpbGQgPSBuZXdseUNyZWF0ZWRMZWFmLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZC1jaGlsZCcpWzBdO1xuICAkYWRkQ2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjdHggPT4ge1xuICAgIHRoaXMuYWRkQ2hpbGQoY3R4KTtcbiAgfSk7XG5cbiAgdmFyICRyZW1vdmVDaGlsZCA9IG5ld2x5Q3JlYXRlZExlYWYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVtb3ZlLWNoaWxkJylbMF07XG4gICRyZW1vdmVDaGlsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGN0eCA9PiB7XG4gICAgdGhpcy5kZWxOb2RlKGN0eCk7XG4gIH0pO1xuXG59O1xuQXBpRG9tLnByb3RvdHlwZS5zZXRQYXJlbnROb2RlVmFsID0gZnVuY3Rpb24oaWR4KSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBxdWV1ZSA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gIHZhciBxdWV1ZUxlbiA9IHF1ZXVlLl9uZXdlc3RJbmRleCAtIHF1ZXVlLl9vbGRlc3RJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSBsZWF2ZXMubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaWYgKCtsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCA9PT0gaWR4KSB7XG4gICAgICBpZiAocXVldWVMZW4gPiAwKSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnLS0tPic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfTtcbn07XG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZGV4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWwgKyAxO1xuXG4gIC8vIGFwaVRyZWUgb3BlcmF0aW9uXG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkZXgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaih0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpKTtcbiAgdmFyIGNoaWxkcmVuTm9kZXMgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChwYXJlbnRJZGV4KTtcblxuICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgcGVyTm9kZSBpbiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2goY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyTGVuID0gY2hpbGRyZW5JZHhBcnIubGVuZ3RoO1xuXG4gIGNsb25lZFJlY3RPYmoucmlnaHQgLT0gMzA7XG5cbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gPSBjaGlsZHJlbklkeEFyckxlbiA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSArIChjaGlsZHJlbklkeEFyckxlbiAtIDEpICogMjA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZGV4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZGV4KTtcblxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZCwgbm9kZUluZGV4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcsIHBhcmVudElkKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jywgbm9kZUluZGV4KTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWxldmVsJywgbm9kZUxldmVsKTtcbiAgbmV3TGVhZlNwYW4uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBNYXRoLnJvdW5kKHJlY3RPYmoucmlnaHQpICsgJ3B4LCAnICsgTWF0aC5yb3VuZChyZWN0T2JqLmJvdHRvbSkgKyAncHgsIDApJztcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZkNvbnRlbnRUcGw7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxlYWYocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIG5ld0xlYWYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikpO1xuICByZXR1cm4gbmV3TGVhZjtcbn1cbkFwaURvbS5wcm90b3R5cGUuc3R5bGVOb2RlcyA9IGZ1bmN0aW9uKHN0eWxlT2JqKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBsZWFmSWR4LCBvZmZzZXRZLCBvcmlnaW5hbFggPSAnJztcblxuICB2YXIgc3R5bGVzQXJyID0gW10sIHhWYWx1ZSwgeVZhbHVlO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVhdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3JpZ2luYWxYID0gZ2V0VHJhbnNsYXRlWChsZWF2ZXNbaV0pO1xuICAgIGxlYWZJZHggPSArKGxlYXZlc1tpXS5kYXRhc2V0LmluZGV4KTtcblxuICAgIGZvciAodmFyIHN0eWxlT2JqSWR4IGluIHN0eWxlT2JqKSB7XG4gICAgICBpZiAoK3N0eWxlT2JqSWR4ID09PSBsZWFmSWR4KSB7XG4gICAgICAgIG9mZnNldFkgPSBzdHlsZU9ialtzdHlsZU9iaklkeF0gKiA1MjtcbiAgICAgIH07XG4gICAgfVxuICAgIHN0eWxlc0Fyci5wdXNoKFtvcmlnaW5hbFgsIG9mZnNldFldKTtcbiAgfTtcblxuICBmb3IgKHZhciBqID0gMCwgc3R5bGVzQXJyTGVuID0gc3R5bGVzQXJyLmxlbmd0aDsgaiA8IHN0eWxlc0FyckxlbjsgaisrKSB7XG4gICAgbGVhdmVzW2pdLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgc3R5bGVzQXJyW2pdWzBdICsgJ3B4LCAnICsgc3R5bGVzQXJyW2pdWzFdICsgJ3B4LCAwKSc7XG4gIH1cblxuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5hZGRTaWJsaW5nID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWw7XG4gIHBhcmVudElkeCA9IGlzTmFOKHBhcmVudElkeCkgPyAnX2RhdGFfcm9vdCcgOiBwYXJlbnRJZHg7XG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB2YXIgcmVjdE9iaiA9IHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSk7XG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHJlY3RPYmopO1xuICBjbG9uZWRSZWN0T2JqLnJpZ2h0ID0gY2xvbmVkUmVjdE9iai5yaWdodCAtIGNsb25lZFJlY3RPYmoud2lkdGg7XG4gIGNsb25lZFJlY3RPYmouYm90dG9tICs9IDMwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWR4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcblxufTtcblxuLyogdXRpbHMgKi9cbmZ1bmN0aW9uIGNsb25lUmVjdE9iaihvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9iai50b3AsXG4gICAgYm90dG9tOiBvYmouYm90dG9tLFxuICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgd2lkdGg6IG9iai53aWR0aCxcbiAgICBoZWlnaHQ6IG9iai5oZWlnaHRcbiAgfTtcbn1cblxuLyogbWFuaXB1bGF0ZSBTVkcgKi9cbkFwaURvbS5wcm90b3R5cGUuY2xlYXJTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF07XG4gIHdoaWxlIChzdmcubGFzdENoaWxkKSB7XG4gICAgc3ZnLnJlbW92ZUNoaWxkKHN2Zy5sYXN0Q2hpbGQpO1xuICB9XG59O1xuLyoqXG4gKiBbZHJhd1NWRyBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5BcGlEb20ucHJvdG90eXBlLmRyYXdTVkcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclNWRygpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBzdmdQYXJ0aWFscyA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBzdmdQYXJ0aWFscy5wdXNoKHRoYXQuY3JlYXRlU2luZ2xlU1ZHKG5vZGUuZGF0YSwgbm9kZS5jb2x1bW4sIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsLCAobm9kZS50b3RhbG9mZnNldHlsZXZlbCAtIG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsKSkpO1xuICAgIH07XG4gIH07XG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZURGKGNhbGxiYWNrKTtcblxuICB2YXIgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdmdQYXJ0aWFscy5sZW5ndGg7IGkrKykge1xuICAgIGRvY0ZyYWcuYXBwZW5kQ2hpbGQoc3ZnUGFydGlhbHNbaV0pO1xuICB9XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF0uYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG5cbn07XG5cbkFwaURvbS5wcm90b3R5cGUuY3JlYXRlU2luZ2xlU1ZHID0gZnVuY3Rpb24oaWR4LCBob3JpLCBwYXJlbnRWZXJ0LCBkdmVydCkge1xuXG4gIHZhciBzdmducyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gIHZhciBuZXdQYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z25zLCAncGF0aCcpO1xuICB2YXIgY29udHJvbFJhdGUgPSAwLjI7XG4gIHZhciBteCwgbXksIHF4LCBxeSwgcXh4LCBxeXksIHR4LCB0eTtcbiAgaG9yaSA9IGhvcmkgLSAxO1xuICBkdmVydCA9IGR2ZXJ0O1xuICBwYXJlbnRWZXJ0ID0gcGFyZW50VmVydDtcblxuICBteCA9IGhvcmkgKiA1MDE7XG4gIG15ID0gcGFyZW50VmVydCAqIDUyICsgODtcbiAgcXggPSBteCArIDEwO1xuICBxeSA9IG15O1xuICBxeHggPSBteCArIDE1O1xuICBxeXkgPSAobXkgKyAoZHZlcnQgLyAyKSAqIDUyKTtcbiAgdHggPSBteCArIDMwO1xuICB0eSA9IG15ICsgZHZlcnQgKiA1MjtcblxuICBuZXdQYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICdkJywgJ00gJyArIG14ICsgJyAnICsgbXkgKyAnIFEgJyArIHF4ICsgJyAnICsgcXkgKyAnLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF4eCArICcgJyArIHF5eSArICcgVCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCArICcgJyArIHR5ICsgJycpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXBpLXN2Zy1wYXRoJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdkYXRhLWlkeCcsIGlkeCk7XG5cbiAgcmV0dXJuIG5ld1BhdGg7XG59O1xuXG4vKiBjYWxjdWxhdGUgZGltZW5zaW9ucyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jYWxjRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuYXBpVHJlZS5tYXhMZXZlbHMoKTtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSB0aGlzLmRpbWVuc2lvbkFyci5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBob3JpQXJyLnB1c2godGhpcy5kaW1lbnNpb25BcnJbaV0ubGVuZ3RoKTtcbiAgfTtcbiAgaG9yaU1heCA9IE1hdGgubWF4LmFwcGx5KG51bGwsIGhvcmlBcnIpO1xuICB2ZXJ0aWNhbE1heCA9IHRoaXMuYXBpVHJlZS5fcm9vdC5jaGlsZHJlbmxldmVsO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUud2lkdGggPSBob3JpTWF4ICogNTIwICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgKyAncHgnO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuXG59O1xuXG4vKiBjYWxjdWxhdGUgb2Zmc2V0ICovXG5cbkFwaURvbS5wcm90b3R5cGUubm9kZUxlZnRPZmZzZXQgPSBmdW5jdGlvbihlbCkge1xuICB2YXIgZWxSZWN0T2JqZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBib2R5UmVjdE9iaiA9IHRoaXMuJGFwaVRyZWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBjbG9uZUJvZHlSZWN0T2JqID0gY2xvbmVSZWN0T2JqKGJvZHlSZWN0T2JqKTtcbiAgdmFyIGNsb25lRWxSZWN0T2JqZWN0ID0gY2xvbmVSZWN0T2JqKGVsUmVjdE9iamVjdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnRvcCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmJvdHRvbSArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmxlZnQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QucmlnaHQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgcmV0dXJuIGNsb25lRWxSZWN0T2JqZWN0O1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanNcbiAqKi8iLCIvKipcbiAqIFtUcmVlIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtIHtbdHlwZV19IGRhdGEgW2Rlc2NyaXB0aW9uXVxuICpcbiAqIF9yb290IHBvaW50cyB0byB0aGUgcm9vdCBub2RlIG9mIGEgdHJlZS5cbiAqIHRyYXZlcnNlREYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBERlMuXG4gKiB0cmF2ZXJzZUJGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggQkZTLlxuICogY29udGFpbnMoZGF0YSwgdHJhdmVyc2FsKSBzZWFyY2hlcyBmb3IgYSBub2RlIGluIGEgdHJlZS5cbiAqIGFkZChkYXRhLCB0b0RhdGEsIHRyYXZlcnNlKSBhZGRzIGEgbm9kZSB0byBhIHRyZWUuXG4gKiByZW1vdmUoY2hpbGQsIHBhcmVudCkgcmVtb3ZlcyBhIG5vZGUgaW4gYSB0cmVlLlxuICpcbiAqL1xuaW1wb3J0IHtRdWV1ZX0gZnJvbSAnLi9xdWV1ZSc7XG5leHBvcnQgZnVuY3Rpb24gVHJlZShkYXRhKSB7XG4gIHZhciBub2RlID0gbmV3IE5vZGUoZGF0YSk7XG4gIHRoaXMuX3Jvb3QgPSBub2RlO1xufVxuXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcbiAgdGhpcy5kYXRhID0gZGF0YTtcbiAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB0aGlzLmNoaWxkcmVuID0gW107XG4gIC8vIGFkZGVkIGxhdGVyXG4gIHRoaXMuY2hpbGRyZW5sZXZlbCA9IDE7XG4gIHRoaXMuY29sdW1uID0gMDtcbiAgdGhpcy50b3RhbG9mZnNldHlsZXZlbCA9IDA7XG59XG5cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlREYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIC8vIHRoaXMgaXMgYSByZWN1cnNlIGFuZCBpbW1lZGlhdGVseS1pbnZva2luZyBmdW5jdGlvblxuICAoZnVuY3Rpb24gcmVjdXJzZShjdXJyZW50Tm9kZSkge1xuICAgIC8vIHN0ZXAgMlxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgLy8gc3RlcCAzXG4gICAgICByZWN1cnNlKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICAvLyBzdGVwIDRcbiAgICBjYWxsYmFjayhjdXJyZW50Tm9kZSk7XG5cbiAgICAvLyBzdGVwIDFcbiAgfSkodGhpcy5fcm9vdCk7XG5cbn07XG5cbi8vIGZvciB0aG9zZSBub2RlcyB3aG8gaGF2ZSBjaGlsZHJlblxuZnVuY3Rpb24gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIHtcbiAgdmFyIHRvdGFsQ2hpbGRyZW5MZXZlbHMgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICB0b3RhbENoaWxkcmVuTGV2ZWxzICs9IG5vZGUuY2hpbGRyZW5baV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsQ2hpbGRyZW5MZXZlbHM7XG59XG5UcmVlLnByb3RvdHlwZS5jYWxjQ2hpbGRyZW5MZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbm9kZS5jaGlsZHJlbmxldmVsID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gY2FsY0NoaWxkcmVuTGV2ZWxzKG5vZGUpIDogMTtcbiAgICBub2RlLmNvbHVtbiA9IG5vZGUucGFyZW50ID8gKG5vZGUucGFyZW50LmNvbHVtbiArIDEpIDogMDtcbiAgfTtcblxuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xufTtcblxuZnVuY3Rpb24gY2FsY09mZlkoYXJyLCBkYXRhKSB7XG4gIHZhciBub2RlSWR4ID0gZmluZEluZGV4KGFyciwgZGF0YSk7XG4gIHZhciB0b3RhbFkgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVJZHg7IGkrKykge1xuICAgIHRvdGFsWSArPSBhcnJbaV0uY2hpbGRyZW5sZXZlbDtcbiAgfTtcbiAgcmV0dXJuIHRvdGFsWTtcbn1cblxuVHJlZS5wcm90b3R5cGUuY2FsY1RvdGFsT2Zmc2V0WUxldmVsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZXZlbGdhcCA9IDA7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQpIHtcbiAgICAgIG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgPSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCArIGNhbGNPZmZZKG5vZGUucGFyZW50LmNoaWxkcmVuLCBub2RlLmRhdGEpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblxuICAgIH07XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxufTtcblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VCRiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXG4gIHF1ZXVlLmVucXVldWUodGhpcy5fcm9vdCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY3VycmVudFRyZWUpO1xuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0cmF2ZXJzYWwpIHtcbiAgdHJhdmVyc2FsLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcblxuVHJlZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZGF0YSwgdG9EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgICBpZiAobm9kZS5kYXRhID09PSB0b0RhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICBjaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgYWRkIG5vZGUgdG8gYSBub24tZXhpc3RlbnQgcGFyZW50LicpO1xuICB9XG5cbiAgdGhpcy5jYWxjQ2hpbGRyZW5MZXZlbCgpO1xuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xufTtcblxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZGF0YSwgZnJvbURhdGEsIHRyYXZlcnNhbCkge1xuICB2YXIgdHJlZSA9IHRoaXMsXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgY2hpbGRUb1JlbW92ZSA9IG51bGwsXG4gICAgICBpbmRleDtcblxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUuZGF0YSA9PT0gZnJvbURhdGEpIHtcbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIGluZGV4ID0gZmluZEluZGV4KHBhcmVudC5jaGlsZHJlbiwgZGF0YSk7XG5cbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIHRvIHJlbW92ZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRUb1JlbW92ZSA9IHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkb2VzIG5vdCBleGlzdC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcblxuICByZXR1cm4gY2hpbGRUb1JlbW92ZTtcbn07XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIGRhdGEpIHtcbiAgdmFyIGluZGV4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycltpXS5kYXRhID09PSBkYXRhKSB7XG4gICAgICBpbmRleCA9IGk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG4vKiB0cmVlIGFkZG9uKi9cblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VEaXJlY3RDaGlsZCA9IGZ1bmN0aW9uKG5vZGVkYXRhKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxuICBwYXJlbnQgPSBudWxsLFxuICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gbm9kZWRhdGEpIHtcbiAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHF1ZXVlLmVucXVldWUocGFyZW50LmNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbGJhY2socGFyZW50KTtcbiAgICBwYXJlbnQgPSBudWxsO1xuICB9XG4gIHJldHVybiBxdWV1ZTtcbn07XG5UcmVlLnByb3RvdHlwZS5hcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdHlsZU9iaiA9IHt9O1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgc3R5bGVPYmpbbm9kZS5kYXRhXSA9IG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqO1xufTtcblxuLyoqXG4gKiBbdHJhdmVyc2VEZXNjZW5kYW50cyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1tpbnRlZ2VyXX0gbm9kZURhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W2FycmF5XX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGVzY2VuZGFudHMgPSBmdW5jdGlvbihub2RlRGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLmRhdGEgPT09IG5vZGVEYXRhKSB7XG4gICAgICAgICAgICBwYXJlbnQgPSBub2RlO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHF1ZXVlLmVucXVldWUocGFyZW50KTtcblxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIHZhciBkZXNjZW5kYW50c0FyciA9IFtdO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGRlc2NlbmRhbnRzQXJyLnB1c2goY3VycmVudFRyZWUpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XG4gIH1cblxuICByZXR1cm4gZGVzY2VuZGFudHNBcnI7XG59O1xuXG5UcmVlLnByb3RvdHlwZS5tYXhMZXZlbHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgZGF0YVJvb3ROb2RlcyA9IHRoaXMudHJhdmVyc2VEaXJlY3RDaGlsZCgnX2RhdGFfcm9vdCcpO1xuICB2YXIgcm93TGV2ZWxPYmogPSB7fTtcbiAgdmFyIGhlYWRJZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgZHJuIGluIGRhdGFSb290Tm9kZXMuX3N0b3JhZ2UpIHtcbiAgICBpZiAoZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZS5oYXNPd25Qcm9wZXJ0eShkcm4pKSB7XG4gICAgICByb3dMZXZlbE9ialtkcm5dID0ge307XG4gICAgICByb3dMZXZlbE9ialtkcm5dWydoZWFkLWlkeCddID0gZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLmRhdGE7XG4gICAgICBoZWFkSWR4QXJyLnB1c2goZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLmRhdGEpO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0SWR4RnJvbVF1ZXVlKHF1ZXVlKSB7XG4gICAgdmFyIGNoaWxkcmVuSWR4QXJyID0gW107XG4gICAgZm9yICh2YXIgcGVyTm9kZSBpbiBxdWV1ZS5fc3RvcmFnZSkge1xuICAgICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBxdWV1ZS5fc3RvcmFnZVtwZXJOb2RlXS5oYXNPd25Qcm9wZXJ0eSgnZGF0YScpKSB7XG4gICAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2gocXVldWUuX3N0b3JhZ2VbcGVyTm9kZV0uZGF0YSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRyZW5JZHhBcnI7XG4gIH1cblxuICB2YXIgbGV2ZWxOZXh0Q29sQXJyID0gW107XG5cbiAgZnVuY3Rpb24gZ2V0Um93TGV2ZWwoaWR4KSB7XG4gICAgdmFyIGRpcmVjdENoaWxkcmVuUXVldWUgPSB0aGF0LnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcbiAgICB2YXIgZGlyZWN0Q2hpbGRyZW5BcnIgPSBleHRyYWN0SWR4RnJvbVF1ZXVlKGRpcmVjdENoaWxkcmVuUXVldWUpO1xuICAgIHJldHVybiBkaXJlY3RDaGlsZHJlbkFycjtcbiAgfVxuXG4gIHZhciB1bHRpbWF0ZUFyciA9IFtdO1xuICB2YXIgcGVySGVhZCA9IFtdO1xuXG4gIGZ1bmN0aW9uIG5leHRMZXZlbENoaWxkcmVuKGFycikge1xuICAgIHZhciBuZXh0TGV2ZWxDaGlsZHJlbkFyciA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcGVyTnVtID0gZ2V0Um93TGV2ZWwoYXJyW2ldKTtcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuQXJyID0gbmV4dExldmVsQ2hpbGRyZW5BcnIuY29uY2F0KHBlck51bSk7XG4gICAgfTtcbiAgICBpZiAobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKSB7XG4gICAgICBwZXJIZWFkLnB1c2gobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKTtcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuKG5leHRMZXZlbENoaWxkcmVuQXJyKTtcbiAgICB9O1xuICB9XG5cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoYXJyKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgcGVySGVhZCA9IFtdO1xuICAgICAgLy8gbGV2ZWwgMVxuICAgICAgbGV2ZWxOZXh0Q29sQXJyID0gZ2V0Um93TGV2ZWwoYXJyW2ldKTtcbiAgICAgIHBlckhlYWQucHVzaCgxKTtcbiAgICAgIGlmIChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKSB7XG4gICAgICAgIHBlckhlYWQucHVzaChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKTtcbiAgICAgICAgbmV4dExldmVsQ2hpbGRyZW4obGV2ZWxOZXh0Q29sQXJyKTtcbiAgICAgIH07XG4gICAgICB1bHRpbWF0ZUFyci5wdXNoKHBlckhlYWQpO1xuICAgIH07XG4gIH0pKGhlYWRJZHhBcnIpO1xuXG4gIHJldHVybiB1bHRpbWF0ZUFycjtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlLmpzXG4gKiovIiwiLyoqXG4gKiBbUXVldWUgZGVzY3JpcHRpb25dXG4gKiBlbnF1ZXVlKGRhdGEpIGFkZHMgZGF0YSB0byBhIHF1ZXVlLlxuICogZGVxdWV1ZSByZW1vdmVzIHRoZSBvbGRlc3QgYWRkZWQgZGF0YSB0byBhIHF1ZXVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUXVldWUoKSB7XG4gIHRoaXMuX29sZGVzdEluZGV4ID0gMTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXggPSAxO1xuICB0aGlzLl9zdG9yYWdlID0ge307XG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9uZXdlc3RJbmRleCAtIHRoaXMuX29sZGVzdEluZGV4O1xufTtcblxuUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuX3N0b3JhZ2VbdGhpcy5fbmV3ZXN0SW5kZXhdID0gZGF0YTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXgrKztcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRlc3RJbmRleCA9IHRoaXMuX29sZGVzdEluZGV4LFxuICAgICAgbmV3ZXN0SW5kZXggPSB0aGlzLl9uZXdlc3RJbmRleCxcbiAgICAgIGRlbGV0ZWREYXRhO1xuXG4gIGlmIChvbGRlc3RJbmRleCAhPT0gbmV3ZXN0SW5kZXgpIHtcbiAgICBkZWxldGVkRGF0YSA9IHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIGRlbGV0ZSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICB0aGlzLl9vbGRlc3RJbmRleCsrO1xuXG4gICAgcmV0dXJuIGRlbGV0ZWREYXRhO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvcXVldWUuanNcbiAqKi8iLCIvKipcbi8vIEItPiBIZXJlIHlvdSBkZWZpbmUgaXRzIGZ1bmN0aW9ucyBhbmQgaXRzIHBheWxvYWRcbnZhciBtZG5BUEkgPSAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvc2VhcmNoLmpzb24nO1xudmFyIHBheWxvYWQgPSB7XG4gICd0b3BpYycgOiAnanMnLFxuICAncScgICAgIDogJ1Byb21pc2UnXG59O1xudmFyIGNhbGxiYWNrID0ge1xuICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDEsICdzdWNjZXNzJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH0sXG4gIGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgIGNvbnNvbGUubG9nKDIsICdlcnJvcicsIEpTT04ucGFyc2UoZGF0YSkpO1xuICB9XG59O1xuLy8gRW5kIEJcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbFxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMSkgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzLCBjYWxsYmFjay5lcnJvcik7XG4vLyBFeGVjdXRlcyB0aGUgbWV0aG9kIGNhbGwgYnV0IGFuIGFsdGVybmF0aXZlIHdheSAoMikgdG8gaGFuZGxlIFByb21pc2UgUmVqZWN0IGNhc2VcbiRodHRwKG1kbkFQSSlcbiAgLmdldChwYXlsb2FkKVxuICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAudGhlbih1bmRlZmluZWQsIGNhbGxiYWNrLmVycm9yKTtcbiAqL1xuXG4vLyBBLT4gJGh0dHAgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBzdGFuZGFyZCBBZGFwdGVyIHBhdHRlcm5cbmV4cG9ydCBmdW5jdGlvbiAkaHR0cCh1cmwpIHtcblxuICAvLyBBIHNtYWxsIGV4YW1wbGUgb2Ygb2JqZWN0XG4gIHZhciBjb3JlID0ge1xuXG4gICAgLy8gTWV0aG9kIHRoYXQgcGVyZm9ybXMgdGhlIGFqYXggcmVxdWVzdFxuICAgIGFqYXg6IGZ1bmN0aW9uKG1ldGhvZCwgdXJsLCBhcmdzKSB7XG5cbiAgICAgIC8vIENyZWF0aW5nIGEgcHJvbWlzZVxuICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgdGhlIFhNTEh0dHBSZXF1ZXN0XG4gICAgICAgIHZhciBjbGllbnQgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgdmFyIHVyaSA9IHVybDtcblxuICAgICAgICBpZiAoYXJncyAmJiAobWV0aG9kID09PSAnUE9TVCcgfHwgbWV0aG9kID09PSAnUFVUJykpIHtcbiAgICAgICAgICB1cmkgKz0gJz8nO1xuICAgICAgICAgIHZhciBhcmdjb3VudCA9IDA7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgaWYgKGFyZ2NvdW50KyspIHtcbiAgICAgICAgICAgICAgICB1cmkgKz0gJyYnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHVyaSArPSBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChhcmdzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJpKTtcbiAgICAgICAgY2xpZW50LnNlbmQoKTtcblxuICAgICAgICBjbGllbnQub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgLy8gUGVyZm9ybXMgdGhlIGZ1bmN0aW9uIFwicmVzb2x2ZVwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZXF1YWwgdG8gMnh4XG4gICAgICAgICAgICByZXNvbHZlKHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZWplY3RcIiB3aGVuIHRoaXMuc3RhdHVzIGlzIGRpZmZlcmVudCB0aGFuIDJ4eFxuICAgICAgICAgICAgcmVqZWN0KHRoaXMuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjbGllbnQub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlamVjdCh0aGlzLnN0YXR1c1RleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuXG4gIC8vIEFkYXB0ZXIgcGF0dGVyblxuICByZXR1cm4ge1xuICAgICdnZXQnOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdHRVQnLCB1cmwsIGFyZ3MpO1xuICAgIH0sXG4gICAgJ3Bvc3QnOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQT1NUJywgdXJsLCBhcmdzKTtcbiAgICB9LFxuICAgICdwdXQnOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdQVVQnLCB1cmwsIGFyZ3MpO1xuICAgIH0sXG4gICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ0RFTEVURScsIHVybCwgYXJncyk7XG4gICAgfVxuICB9O1xufVxuLy8gRW5kIEFcblxuXG5cblxuXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vYWpheC5qc1xuICoqLyIsImltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmxldCByb290QVBJID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpcy8nO1xubGV0IHBheWxvYWQgPSB7fTtcbnZhciBjYWxsYmFjayA9IHtcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKDEsICdzdWNjZXNzJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgIHZhciBpZCA9IHVuZGVmaW5lZDtcbiAgICBpZiAoZXYudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnYXBpLWxpJykpIHtcbiAgICAgIGlkID0gZXYudGFyZ2V0LmRhdGFzZXQuYXBpSWQ7XG4gICAgICAkaHR0cChyb290QVBJICsgaWQpXG4gICAgICAuZ2V0KHBheWxvYWQpXG4gICAgICAudGhlbihjYWxsYmFjay5zdWNjZXNzKVxuICAgICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICB9XG4gIH0pO1xuXG59XG5cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==