/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$http = $http;

var _serialize = __webpack_require__(16);

var _utilities = __webpack_require__(4);

var _csrf = __webpack_require__(1);

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

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flash = flash;
exports.parseAndFlash = parseAndFlash;

var _utilities = __webpack_require__(4);

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popup = popup;

var _toggleScroll = __webpack_require__(17);

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

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = Tree;

var _queue = __webpack_require__(41);

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

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootAPI = exports.rootAPI = window.location.origin + '/apis';

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _apiOperation = __webpack_require__(52);

(function () {
	A.init[A.gc.currentName] = _apiOperation.initApiOperation;
	A.destroy[A.gc.currentName] = _apiOperation.disposeApiOperation;
})();

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToTree = jsonToTree;
exports.treeToJson = treeToJson;

var _tree = __webpack_require__(26);

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

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectApiData = collectApiData;

var _utilities = __webpack_require__(4);

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

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * width of single svg path: 30px
 */


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiDom = ApiDom;

var _tree = __webpack_require__(26);

var _ajax = __webpack_require__(10);

var _popup = __webpack_require__(15);

var _constant = __webpack_require__(28);

var _flash = __webpack_require__(14);

var _treeDataCollect = __webpack_require__(42);

var _utilities = __webpack_require__(44);

var _jsonTreeConverter = __webpack_require__(40);

var _twoWayDataBinding = __webpack_require__(27);

var _callbacks = __webpack_require__(46);

var _scroll = __webpack_require__(49);

var _utilities2 = __webpack_require__(4);

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

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 45 */,
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbacks = undefined;

var _flash = __webpack_require__(14);

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

/***/ }),
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlEscape = htmlEscape;
function htmlEscape(str) {
  str = '' + str; // for numbers etc.
  return str.replace(/&/g, '&amp;') // first!
  .replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/`/g, '&#96;');
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollBarH = scrollBarH;

var _utilities = __webpack_require__(4);

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

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slide = slide;

var _popup = __webpack_require__(15);

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

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = html;

var _htmlEscape = __webpack_require__(48);

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

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  '], ['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        ', '\n      '], ['\n        ', '\n      ']);

exports.initApiOperation = initApiOperation;
exports.disposeApiOperation = disposeApiOperation;

var _ajax = __webpack_require__(10);

var _constant = __webpack_require__(28);

var _template = __webpack_require__(51);

var _popup = __webpack_require__(15);

var _slide = __webpack_require__(50);

var _utilities = __webpack_require__(4);

var _flash = __webpack_require__(14);

var _treeDom = __webpack_require__(43);

var _twoWayDataBinding = __webpack_require__(27);

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
function initApiOperation() {
  getAllApis();
}

function disposeApiOperation() {}

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
  // let header = document.getElementsByClassName('api-header-pre-mark')[0];
  // let newApiStr = `
  //   <div class="api-add-query">
  //     <span class="add-api-btn">new API</span>
  //     <div class="api-search-wrapper">
  //       <input class="api-query" type="search" placeholder="search">
  //       <div class="api-search-result hide"></div>
  //     </div>
  //     <a class="c-hide icon-text-link c-float-right dev-env-settings" href="javascript:;"><span class="icon-text-icon"><svg class="icon icon-settings icon-fit"><use xlink:href="#icon-settings"></use></svg></span><span class="icon-text-text">环境同步数据配置</span></a>
  //   </div>
  // `;
  // newApiDiv = strToDom(newApiStr);
  newApiDiv = document.getElementsByClassName('api-add-query')[0];
  newApiDiv.getElementsByClassName('add-api-btn')[0].addEventListener('click', debouncedNewApiBtn);
  newApiDiv.getElementsByClassName('dev-env-settings')[0].addEventListener('click', debouncedEnvBtn);
  // insertAfter(newApiDiv, header);
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

/***/ }),
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33);


/***/ })
/******/ ]);