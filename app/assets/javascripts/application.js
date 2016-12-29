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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./front-end/javascripts/common/utilities.js ***!
  \***************************************************/
/***/ function(module, exports) {

"use strict";
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

/***/ },
/* 1 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./front-end/javascripts/common/ajax.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$http = $http;

var _serialize = __webpack_require__(/*! ./serialize */ 22);

var _utilities = __webpack_require__(/*! ./utilities */ 0);

var _csrf = __webpack_require__(/*! ./csrf */ 5);

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

/***/ },
/* 2 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./front-end/javascripts/common/flash.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flash = flash;
exports.parseAndFlash = parseAndFlash;

var _utilities = __webpack_require__(/*! ./utilities */ 0);

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

/***/ },
/* 3 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./front-end/javascripts/common/popup.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popup = popup;

var _toggleScroll = __webpack_require__(/*! ./toggleScroll */ 25);

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
/* 4 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./front-end/javascripts/api-tree/tree.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = Tree;

var _queue = __webpack_require__(/*! ./queue */ 14);

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
/* 5 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./front-end/javascripts/common/csrf.js ***!
  \**********************************************/
/***/ function(module, exports) {

"use strict";
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
/* 6 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./front-end/javascripts/common/twoWayDataBinding.js ***!
  \***********************************************************/
/***/ function(module, exports) {

"use strict";
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
/* 7 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./front-end/javascripts/global/constant.js ***!
  \**************************************************/
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var rootAPI = exports.rootAPI = window.location.origin + '/apis';

/***/ },
/* 8 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./front-end/javascripts/common/ActionCable.js ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function createConsumer(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function getConfig(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function createWebSocketURL(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function startDebugging() {
      return this.debugging = true;
    },
    stopDebugging: function stopDebugging() {
      return this.debugging = null;
    },
    log: function log() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }
}).call(window);
(function () {
  var bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  ActionCable.ConnectionMonitor = function () {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function () {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + this.getPollInterval() + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function () {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function () {
      return this.startedAt != null && this.stoppedAt == null;
    };

    ConnectionMonitor.prototype.recordPing = function () {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function () {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function () {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function () {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function () {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function () {
      return this.pollTimeout = setTimeout(function (_this) {
        return function () {
          _this.reconnectIfStale();
          return _this.poll();
        };
      }(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function () {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function () {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + this.getPollInterval() + " ms, time disconnected = " + secondsSince(this.disconnectedAt) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function () {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function () {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function () {
      if (document.visibilityState === "visible") {
        return setTimeout(function (_this) {
          return function () {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        }(this), 200);
      }
    };

    now = function now() {
      return new Date().getTime();
    };

    secondsSince = function secondsSince(time) {
      return (now() - time) / 1000;
    };

    clamp = function clamp(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;
  }();
}).call(window);
(function () {
  var i,
      message_types,
      protocols,
      ref,
      supportedProtocols,
      unsupportedProtocol,
      slice = [].slice,
      bind = function bind(fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  },
      indexOf = [].indexOf || function (item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (i in this && this[i] === item) return i;
    }return -1;
  };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = function () {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function (data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function () {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + this.getState());
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + this.getState() + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function (arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function () {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + this.getState());
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function () {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function () {
      return this.isState("open");
    };

    Connection.prototype.isActive = function () {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function () {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function () {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function () {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function () {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function () {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function () {};
      }
    };

    Connection.prototype.events = {
      message: function message(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function open() {
        ActionCable.log("WebSocket onopen event, using '" + this.getProtocol() + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function close(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function error() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;
  }();
}).call(window);
(function () {
  var slice = [].slice;

  ActionCable.Subscriptions = function () {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function (channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = (typeof channel === "undefined" ? "undefined" : _typeof(channel)) === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function (subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function (subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function (identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function (subscription) {
      var s;
      this.subscriptions = function () {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }.call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function (identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function () {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function () {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function () {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function (subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;
  }();
}).call(window);
(function () {
  ActionCable.Subscription = function () {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function (action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function (data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function () {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function extend(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;
  }();
}).call(window);
(function () {
  ActionCable.Consumer = function () {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function (data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function () {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function () {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function () {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;
  }();
}).call(window);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../../~/webpack/buildin/module.js */ 27)(module)))

/***/ },
/* 9 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./front-end/javascripts/modules/apiOperation.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  '], ['\n      <ul class="api-ul">\n      ', '\n      </ul>\n  ']),
    _templateObject2 = _taggedTemplateLiteral(['\n        ', '\n      '], ['\n        ', '\n      ']);

exports.initXhr = initXhr;

var _ajax = __webpack_require__(/*! ../common/ajax */ 1);

var _constant = __webpack_require__(/*! ../global/constant */ 7);

var _template = __webpack_require__(/*! ../common/template */ 24);

var _popup = __webpack_require__(/*! ../common/popup */ 3);

var _slide = __webpack_require__(/*! ../common/slide */ 23);

var _utilities = __webpack_require__(/*! ../common/utilities */ 0);

var _flash = __webpack_require__(/*! ../common/flash */ 2);

var _treeDom = __webpack_require__(/*! ../api-tree/treeDom */ 16);

var _twoWayDataBinding = __webpack_require__(/*! ../common/twoWayDataBinding */ 6);

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
  var header = document.getElementsByTagName('header')[0];
  var newApiStr = '\n    <div class="api-add-query">\n      <span class="add-api-btn">new API</span>\n      <div class="api-search-wrapper">\n        <input class="api-query" type="search" placeholder="search">\n        <div class="api-search-result hide"></div>\n      </div>\n      <a class="c-hide icon-text-link c-float-right dev-env-settings" href="javascript:;"><span class="icon-text-icon"><svg class="icon icon-settings icon-fit"><use xlink:href="#icon-settings"></use></svg></span><span class="icon-text-text">\u73AF\u5883\u540C\u6B65\u6570\u636E\u914D\u7F6E</span></a>\n    </div>\n  ';
  newApiDiv = (0, _utilities.strToDom)(newApiStr);
  newApiDiv.getElementsByClassName('add-api-btn')[0].addEventListener('click', debouncedNewApiBtn);
  newApiDiv.getElementsByClassName('dev-env-settings')[0].addEventListener('click', debouncedEnvBtn);
  (0, _utilities.insertAfter)(newApiDiv, header);
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

/***/ },
/* 10 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./front-end/javascripts/modules/dataLinks.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataLinks = dataLinks;

var _handleMethod = __webpack_require__(/*! ../common/handleMethod */ 19);

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
/* 11 */
/* unknown exports provided */
/* all exports used */
/*!*******************************************************!*\
  !*** ./front-end/javascripts/modules/fisCiPlugins.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fcp = fcp;

var _ajax = __webpack_require__(/*! ../common/ajax */ 1);

function fcp() {
    var App = {};
    App.cable = ActionCable.createConsumer();
    App.comments = App.cable.subscriptions.create("ChatChannel", {
        collection: function collection() {
            return $("[data-channel='comments']");
        },
        connected: function connected() {
            return setTimeout(function (_this) {
                return function () {
                    _this.followCurrentMessage();
                    return _this.installPageChangeCallback();
                };
            }(this), 1000);
        },
        received: function received(data) {
            if (!this.userIsCurrentUser(data.comment)) {
                return this.collection().append(data.comment);
            }
        },
        userIsCurrentUser: function userIsCurrentUser(comment) {
            return $(comment).attr('data-user-id') === $('meta[name=current-user]').attr('id');
        },
        followCurrentMessage: function followCurrentMessage() {
            var messageId;
            if (messageId = this.collection().data('message-id')) {
                return this.perform('follow', {
                    "message_id": messageId
                });
            } else {
                return this.perform('unfollow');
            }
        },
        installPageChangeCallback: function installPageChangeCallback() {
            if (!this.installedPageChangeCallback) {
                this.installedPageChangeCallback = true;
                return $(document).on('page:change', function () {
                    return App.comments.followCurrentMessage();
                });
            }
        }
    });
}

/***/ },
/* 12 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./front-end/javascripts/modules/homepage.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.home = home;

var _tweetBox = __webpack_require__(/*! ./tweetBox */ 26);

function home() {
	(0, _tweetBox.tweetBox)();
}

/***/ },
/* 13 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************************!*\
  !*** ./front-end/javascripts/api-tree/jsonTreeConverter.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonToTree = jsonToTree;
exports.treeToJson = treeToJson;

var _tree = __webpack_require__(/*! ./tree */ 4);

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
/* 14 */
/* unknown exports provided */
/* all exports used */
/*!*************************************************!*\
  !*** ./front-end/javascripts/api-tree/queue.js ***!
  \*************************************************/
/***/ function(module, exports) {

"use strict";
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
/* 15 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************************!*\
  !*** ./front-end/javascripts/api-tree/treeDataCollect.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectApiData = collectApiData;

var _utilities = __webpack_require__(/*! ../common/utilities */ 0);

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
/* 16 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./front-end/javascripts/api-tree/treeDom.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * width of single svg path: 30px
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiDom = ApiDom;

var _tree = __webpack_require__(/*! ./tree */ 4);

var _ajax = __webpack_require__(/*! ../common/ajax */ 1);

var _popup = __webpack_require__(/*! ../common/popup */ 3);

var _constant = __webpack_require__(/*! ../global/constant */ 7);

var _flash = __webpack_require__(/*! ../common/flash */ 2);

var _treeDataCollect = __webpack_require__(/*! ./treeDataCollect */ 15);

var _utilities = __webpack_require__(/*! ./utilities */ 17);

var _jsonTreeConverter = __webpack_require__(/*! ./jsonTreeConverter */ 13);

var _twoWayDataBinding = __webpack_require__(/*! ../common/twoWayDataBinding */ 6);

var _callbacks = __webpack_require__(/*! ../common/callbacks */ 18);

var _scroll = __webpack_require__(/*! ../common/scroll */ 21);

var _utilities2 = __webpack_require__(/*! ../common/utilities */ 0);

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

/***/ },
/* 17 */
/* unknown exports provided */
/* all exports used */
/*!*****************************************************!*\
  !*** ./front-end/javascripts/api-tree/utilities.js ***!
  \*****************************************************/
/***/ function(module, exports) {

"use strict";
'use strict';

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

/***/ },
/* 18 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./front-end/javascripts/common/callbacks.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callbacks = undefined;

var _flash = __webpack_require__(/*! ./flash */ 2);

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
/* 19 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./front-end/javascripts/common/handleMethod.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMethod = handleMethod;

var _csrf = __webpack_require__(/*! ../common/csrf */ 5);

/**
 * [handleMethod description]
 * @param  {HTMLElement} link [description]
 * @return {[type]}      [description]
 * Handles "data-method" on links such as:
 * <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
 */
function handleMethod(link) {
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
/* 20 */
/* unknown exports provided */
/* all exports used */
/*!****************************************************!*\
  !*** ./front-end/javascripts/common/htmlEscape.js ***!
  \****************************************************/
/***/ function(module, exports) {

"use strict";
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
/* 21 */
/* unknown exports provided */
/* all exports used */
/*!************************************************!*\
  !*** ./front-end/javascripts/common/scroll.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollBarH = scrollBarH;

var _utilities = __webpack_require__(/*! ./utilities */ 0);

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

/***/ },
/* 22 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./front-end/javascripts/common/serialize.js ***!
  \***************************************************/
/***/ function(module, exports) {

"use strict";
'use strict';

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

/***/ },
/* 23 */
/* unknown exports provided */
/* all exports used */
/*!***********************************************!*\
  !*** ./front-end/javascripts/common/slide.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slide = slide;

var _popup = __webpack_require__(/*! ../common/popup */ 3);

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
/* 24 */
/* unknown exports provided */
/* all exports used */
/*!**************************************************!*\
  !*** ./front-end/javascripts/common/template.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = html;

var _htmlEscape = __webpack_require__(/*! ./htmlEscape */ 20);

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
/* 25 */
/* unknown exports provided */
/* all exports used */
/*!******************************************************!*\
  !*** ./front-end/javascripts/common/toggleScroll.js ***!
  \******************************************************/
/***/ function(module, exports) {

"use strict";
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
/* 26 */
/* unknown exports provided */
/* all exports used */
/*!***************************************************!*\
  !*** ./front-end/javascripts/modules/tweetBox.js ***!
  \***************************************************/
/***/ function(module, exports) {

"use strict";
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
/* 27 */
/* unknown exports provided */
/* all exports used */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

"use strict";
"use strict";

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			configurable: false,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			configurable: false,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ },
/* 28 */
/* unknown exports provided */
/* all exports used */
/*!**********************************************!*\
  !*** ./front-end/javascripts/application.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var _ActionCable = __webpack_require__(/*! ./common/ActionCable */ 8);

var _dataLinks = __webpack_require__(/*! ./modules/dataLinks */ 10);

var _homepage = __webpack_require__(/*! ./modules/homepage */ 12);

var _apiOperation = __webpack_require__(/*! ./modules/apiOperation */ 9);

var _fisCiPlugins = __webpack_require__(/*! ./modules/fisCiPlugins */ 11);

(0, _dataLinks.dataLinks)();

// apiTree();
// var p = new dawnSVG();
// p.init(document.getElementById('painter-target'));
// p.start();

(function () {
  var routes = {
    '/': _homepage.home,
    '/dev': [_apiOperation.initXhr],
    '/fis_ci_plugins/new': _fisCiPlugins.fcp,
    '/fis_ci_plugins': _fisCiPlugins.fcp
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGEzNzM2ZjMyOGYyNzA3ZTIyZDgiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9hamF4LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90d29XYXlEYXRhQmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvZ2xvYmFsL2NvbnN0YW50LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vQWN0aW9uQ2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9maXNDaVBsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2pzb25UcmVlQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9oYW5kbGVNZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2VyaWFsaXplLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2xpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy90d2VldEJveC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJpc0VtcHR5IiwiY2xvbmVPYmoiLCJtZXJnZU9iaiIsImFkZFByZWZpeFRvT2JqIiwid3JhcE9iaiIsInN0clRvRG9tIiwiaW5zZXJ0QWZ0ZXIiLCJkZWJvdW5jZSIsImlzU3RyaWN0TW9kZSIsImdlbmVyYXRlVVVJRCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJvYmoxIiwib2JqMiIsIm5ld09iaiIsImtleSIsImhhc093blByb3BlcnR5IiwicHJlZml4Iiwid3JhcHBlciIsInN0ciIsInRtcEVsZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInJldHVybkRvbSIsImNoaWxkcmVuIiwibmV3Tm9kZSIsInJlZmVyZW5jZU5vZGUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJjb250ZXh0IiwiYXJncyIsImFyZ3VtZW50cyIsImxhdGVyIiwiYXBwbHkiLCJjYWxsTm93IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImlzU3RyaWN0IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIiRodHRwIiwidXJsIiwiY29yZSIsImFqYXgiLCJtZXRob2QiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjbGllbnQiLCJYTUxIdHRwUmVxdWVzdCIsInVyaSIsImV4dGVuZEdlbmVyYWxQYXJhbXMiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIm9uZXJyb3IiLCJlcnIiLCJjc3JmUGFyYW0iLCJjc3JmVG9rZW4iLCJnZW5lcmFsT2JqIiwidXRmOCIsImZvcm1hdCIsImZsYXNoIiwicGFyc2VBbmRGbGFzaCIsImRhdGEiLCJjYWxsYmFjayIsImZsYXNoRWxlIiwiZmxhc2hUcGwiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJkZXN0b3J5IiwiYmluZCIsImVycm9yIiwibWVzc2FnZSIsImVsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsImFkZCIsImpzb25EYXRhIiwicG9wdXAiLCJldiIsInBhcmFtcyIsInBvcHVwRWxlIiwiZ2VuZXJhdGVQb3B1cFRwbCIsInBvc2l0aW9uUG9wdXBFbGUiLCJiaW5kUG9wdXBFdmVudHMiLCJ0cGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xvc2VQb3B1cCIsImNvbmZpcm0iLCJjb29yZGluYXRlcyIsInN0eWxlIiwidHJhbnNmb3JtIiwiY2xpZW50WCIsImNsaWVudFkiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwicG9wTGF5ZXIiLCJjbG9zZXN0IiwiVHJlZSIsIm5vZGUiLCJOb2RlIiwiX3Jvb3QiLCJub2RlSWQiLCJwYXJlbnQiLCJjaGlsZHJlbmxldmVsIiwiY29sdW1uIiwidG90YWxvZmZzZXR5bGV2ZWwiLCJwcm90b3R5cGUiLCJ0cmF2ZXJzZURGIiwicmVjdXJzZSIsImN1cnJlbnROb2RlIiwiaSIsImNhbGNDaGlsZHJlbkxldmVscyIsInRvdGFsQ2hpbGRyZW5MZXZlbHMiLCJjYWxjQ2hpbGRyZW5MZXZlbCIsImNhbGNPZmZZIiwiYXJyIiwibm9kZUlkeCIsImZpbmRJbmRleCIsInRvdGFsWSIsImNhbGNUb3RhbE9mZnNldFlMZXZlbCIsImxldmVsZ2FwIiwidHJhdmVyc2VCRiIsInF1ZXVlIiwiZW5xdWV1ZSIsImN1cnJlbnRUcmVlIiwiZGVxdWV1ZSIsImNvbnRhaW5zIiwidHJhdmVyc2FsIiwiY2FsbCIsInRvRGF0YSIsImNoaWxkIiwicHVzaCIsIkVycm9yIiwiY2hlY2tEYXRhSGFzQ2hpbGQiLCJyZW1vdmUiLCJmcm9tRGF0YSIsInRyZWUiLCJjaGlsZFRvUmVtb3ZlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJ0cmF2ZXJzZURpcmVjdENoaWxkIiwibm9kZWRhdGEiLCJhcHBseVN0eWxlIiwic3R5bGVPYmoiLCJ0cmF2ZXJzZURlc2NlbmRhbnRzIiwibm9kZURhdGEiLCJkZXNjZW5kYW50c0FyciIsImhhc0NoaWxkIiwibWF4SWQiLCJtYXhOb2RlSWQiLCJkZXB0aCIsImRlcHRoQXJyIiwiZGltZW5zaW9ucyIsImhvcmlNYXgiLCJ2ZXJ0aWNhbE1heCIsImhvcmlBcnIiLCJtYXgiLCJyb3JQYXJhbXMiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwiaXNDcm9zc0RvbWFpbiIsIm9yaWdpbkFuY2hvciIsImhyZWYiLCJsb2NhdGlvbiIsInVybEFuY2hvciIsInByb3RvY29sIiwiaG9zdCIsImUiLCJ0d29XYXlEYXRhQmluZGluZyIsImRvbUNvbnRleHQiLCJtb2RlbCIsImZvckVhY2giLCJ2YWx1ZSIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInNldCIsInZhbCIsInNlbGVjdG9yVG9BcnJheSIsImNvbmNhdCIsImVsIiwiaGFzQXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJoYXNBY3RpdmVFbGUiLCJlbEFuZERlc2NlbmRhbnRzIiwic2V0QXR0cmlidXRlIiwiYWN0aXZlRWxlbWVudCIsImhhbmRsZXIiLCJzZWxlY3RvciIsIkFycmF5Iiwic2xpY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWF0Y2hlcyIsInJlc3VsdEFyciIsImxvb3AiLCJjaGlsZHJlbkVsZXMiLCJjaGlsZEVsZW1lbnRDb3VudCIsImJvbCIsInJvb3RBUEkiLCJ3aW5kb3ciLCJvcmlnaW4iLCJBY3Rpb25DYWJsZSIsIklOVEVSTkFMIiwiY3JlYXRlQ29uc3VtZXIiLCJyZWYiLCJnZXRDb25maWciLCJkZWZhdWx0X21vdW50X3BhdGgiLCJDb25zdW1lciIsImNyZWF0ZVdlYlNvY2tldFVSTCIsIm5hbWUiLCJlbGVtZW50IiwiaGVhZCIsImEiLCJ0ZXN0Iiwic3RhcnREZWJ1Z2dpbmciLCJkZWJ1Z2dpbmciLCJzdG9wRGVidWdnaW5nIiwibG9nIiwibWVzc2FnZXMiLCJEYXRlIiwibm93IiwiY29uc29sZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJmbiIsIm1lIiwiQ29ubmVjdGlvbk1vbml0b3IiLCJjbGFtcCIsInNlY29uZHNTaW5jZSIsInBvbGxJbnRlcnZhbCIsIm1pbiIsInN0YWxlVGhyZXNob2xkIiwiY29ubmVjdGlvbiIsInZpc2liaWxpdHlEaWRDaGFuZ2UiLCJyZWNvbm5lY3RBdHRlbXB0cyIsInN0YXJ0IiwiaXNSdW5uaW5nIiwic3RhcnRlZEF0Iiwic3RvcHBlZEF0Iiwic3RhcnRQb2xsaW5nIiwiZ2V0UG9sbEludGVydmFsIiwic3RvcCIsInN0b3BQb2xsaW5nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlY29yZFBpbmciLCJwaW5nZWRBdCIsInJlY29yZENvbm5lY3QiLCJkaXNjb25uZWN0ZWRBdCIsInJlY29yZERpc2Nvbm5lY3QiLCJwb2xsIiwicG9sbFRpbWVvdXQiLCJfdGhpcyIsInJlY29ubmVjdElmU3RhbGUiLCJpbnRlcnZhbCIsImNvbnN0cnVjdG9yIiwicm91bmQiLCJjb25uZWN0aW9uSXNTdGFsZSIsImRpc2Nvbm5lY3RlZFJlY2VudGx5IiwicmVvcGVuIiwidmlzaWJpbGl0eVN0YXRlIiwiaXNPcGVuIiwiZ2V0VGltZSIsInRpbWUiLCJudW1iZXIiLCJtZXNzYWdlX3R5cGVzIiwicHJvdG9jb2xzIiwic3VwcG9ydGVkUHJvdG9jb2xzIiwidW5zdXBwb3J0ZWRQcm90b2NvbCIsImluZGV4T2YiLCJpdGVtIiwibCIsIkNvbm5lY3Rpb24iLCJyZW9wZW5EZWxheSIsImNvbnN1bWVyIiwic3Vic2NyaXB0aW9ucyIsIm1vbml0b3IiLCJkaXNjb25uZWN0ZWQiLCJ3ZWJTb2NrZXQiLCJpc0FjdGl2ZSIsImdldFN0YXRlIiwidW5pbnN0YWxsRXZlbnRIYW5kbGVycyIsIldlYlNvY2tldCIsImluc3RhbGxFdmVudEhhbmRsZXJzIiwiY2xvc2UiLCJhcmciLCJhbGxvd1JlY29ubmVjdCIsInJlZjEiLCJlcnJvcjEiLCJnZXRQcm90b2NvbCIsImlzU3RhdGUiLCJpc1Byb3RvY29sU3VwcG9ydGVkIiwic3RhdGVzIiwic3RhdGUiLCJyZWFkeVN0YXRlIiwidG9Mb3dlckNhc2UiLCJldmVudE5hbWUiLCJldmVudHMiLCJldmVudCIsImlkZW50aWZpZXIiLCJ0eXBlIiwid2VsY29tZSIsInJlbG9hZCIsInBpbmciLCJjb25maXJtYXRpb24iLCJub3RpZnkiLCJyZWplY3Rpb24iLCJub3RpZnlBbGwiLCJ3aWxsQXR0ZW1wdFJlY29ubmVjdCIsIlN1YnNjcmlwdGlvbnMiLCJjcmVhdGUiLCJjaGFubmVsTmFtZSIsIm1peGluIiwiY2hhbm5lbCIsInN1YnNjcmlwdGlvbiIsIlN1YnNjcmlwdGlvbiIsImVuc3VyZUFjdGl2ZUNvbm5lY3Rpb24iLCJzZW5kQ29tbWFuZCIsImZvcmdldCIsImZpbmRBbGwiLCJsZW4iLCJyZXN1bHRzIiwicyIsImNhbGxiYWNrTmFtZSIsImNvbW1hbmQiLCJleHRlbmQiLCJwZXJmb3JtIiwiYWN0aW9uIiwidW5zdWJzY3JpYmUiLCJvYmplY3QiLCJwcm9wZXJ0aWVzIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJpbml0WGhyIiwicGF5bG9hZCIsImFwaXNBcnIiLCJnZXRBcGlTdWNjZXNzIiwiYWRkQXBpVHJlZSIsImdldEFsbEFwaXNTdWNjZXNzIiwiZGF0YUJhayIsIkpTT05CYWsiLCJuZXdBcGlCdG4iLCJyZW5kZXJBbGxBcGlzIiwiYmluZGV2ZW50cyIsImxpc3RlbkFwaVF1ZXJ5IiwicGF0Y2hTdWNjZXNzIiwicG9zdFN1Y2Nlc3MiLCJkZWxldGVTdWNjZXNzIiwiZGVzdG9yeUFwaUxpIiwiYXBpUXVlcnlTdWNjZXNzIiwic2VhcmNoTGlzdCIsImRhdGFPYmoiLCJjb250ZW50U3RyIiwiTGVuIiwic2VjdGlvbiIsImRlc2NyaXB0aW9uIiwic3VjY2VzcyIsImdldEFsbEFwaXMiLCJkZWJvdW5jZWRBcGlRdWVyeUlucHV0IiwiYXBpUXVlcnkiLCJhcGlRdWVyeUlucHV0IiwiaW5XcmFwcGVyIiwicGFyZW50RWxlbWVudCIsImNoZWNrSWZGb2N1cyIsImNsZWFyU2VhcmNoUmVzdWx0IiwicSIsInRoZW4iLCJjYXRjaCIsImFwaVNlYXJjaFJlc3VsdEVsZSIsInRvZ2dsZUZvbGRMaSIsInRvZ2dsZSIsImJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbiIsIm5leHRFbGVtZW50U2libGluZyIsImRhdGFzZXQiLCJhcGlJZCIsImFwaUxpcyIsImNvbnRhaW5lck5vZGUiLCJpc05ld0FwaSIsIm5ld0FwaSIsImRlYm91bmNlZE5ld0FwaUJ0biIsInByb2Nlc3NOZXdBcGlDbGljayIsImRlYm91bmNlZEVudkJ0biIsInByb2Nlc3NPcGVuRW52U2V0dGluZ3MiLCJjb250ZW50Iiwic2xpZGVDb250ZW50IiwidHBsU3RyIiwiYXBpVWwiLCJjcmVhdGVBcGlVbCIsImJhc2VBcGlMaSIsIm5ld0FwaUxpVHBsIiwiZmlyc3RDaGlsZCIsImFwaUxpc3RFbGUiLCJhcGlVbEVsZSIsIm5ld0FwaURpdiIsImhlYWRlciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibmV3QXBpU3RyIiwiaWQiLCJ3aWtpTGluayIsInRtcGwiLCJtYXAiLCJkYXRhTGlua3MiLCJwcm9jZXNzRGF0YUxpbmsiLCJ0YWdOYW1lIiwicHJldmVudERlZmF1bHQiLCJmY3AiLCJBcHAiLCJjYWJsZSIsImNvbW1lbnRzIiwiY29sbGVjdGlvbiIsIiQiLCJjb25uZWN0ZWQiLCJmb2xsb3dDdXJyZW50TWVzc2FnZSIsImluc3RhbGxQYWdlQ2hhbmdlQ2FsbGJhY2siLCJyZWNlaXZlZCIsInVzZXJJc0N1cnJlbnRVc2VyIiwiY29tbWVudCIsImFwcGVuZCIsImF0dHIiLCJtZXNzYWdlSWQiLCJpbnN0YWxsZWRQYWdlQ2hhbmdlQ2FsbGJhY2siLCJvbiIsImhvbWUiLCJqc29uVG9UcmVlIiwidHJlZVRvSnNvbiIsIm5vZGVzQXJyIiwiaGFzaFRhYmxlIiwibm9kZXNMZW4iLCJtb2RLZXlzQXJyIiwicmVtb3ZlRWxlRnJvbUFyciIsIk51bWJlciIsInNvcnQiLCJzb3J0TnVtYmVyIiwicm9vdE5vZGVEYXRhIiwiaiIsImtleXNMZW4iLCJrIiwia2V5QXJyTGVuIiwiYiIsIlF1ZXVlIiwiX29sZGVzdEluZGV4IiwiX25ld2VzdEluZGV4IiwiX3N0b3JhZ2UiLCJzaXplIiwib2xkZXN0SW5kZXgiLCJuZXdlc3RJbmRleCIsImRlbGV0ZWREYXRhIiwiY29sbGVjdEFwaURhdGEiLCJvcEVsZSIsInBlckFwaUVsZSIsImNvbGxlY3RJbmZvIiwiY29sbGVjdERhdGFGcm9tVHJlZSIsImluZm9FbGUiLCJNb2Rlc1Jvd0VsZSIsImluZm9EYXRhIiwiZ2V0TW9kZVZhbCIsImdldERlYnVnQWRkciIsInJhZGlvcyIsIm1vZGVWYWwiLCJjaGVja2VkIiwiY29sbGVjdFRyZWUiLCJ0cmVlRWxlIiwibGVhdmVzIiwidHJlZURhdGFBcnIiLCJ0cmVlRGF0YU9iaiIsImxlYWZEYXRhIiwibGVhdmVzTGVuIiwicGFyZW50SWQiLCJxdWFudGl0eSIsIm5vZGVzIiwiYXBpVHJlZSIsImRpbWVuc2lvbnNBcnIiLCJoVW5pdCIsInZVbml0IiwiQXBpRG9tIiwicGVyQXBpVHBsIiwiYXBpVVVJRCIsInBhdGNoT3JQb3N0Iiwic2F2ZU9yQ3JlYXRlIiwibGVhZlRwbCIsImxlYWZDb250ZW50VHBsIiwiaW5pdFJlY3RPYmoiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJ0b3AiLCJ3aWR0aCIsImhlaWdodCIsImxlYWZEYXRhUGxhY2VIb2xkZXIiLCJkYXRhTmFtZSIsImRhdGFUeXBlIiwiZGF0YVZhbHVlIiwiZGF0YVF1YW50aXR5IiwicGVyTGVhZldpZHRoIiwicGVyTGVhZkhlaWdodCIsImxlYXZlc1ZlcnRpY2FsR2FwIiwicGVyU1ZHUGF0aFdpZHRoIiwicm9vdE5vZGVXaWR0aCIsImFwaVJhd0RhdGEiLCJhcGlEYXRhT2JqIiwiYXBpQ29udGFpbmVyIiwiYXBpUmVzcG9uZFN1Y2Nlc3MiLCJqc29uT2JqIiwicHJldmlld0RhdGEiLCJwcmV2aWV3RGF0YU9iaiIsInN3aXRjaFByZXZpZXciLCJldmVudENvbnRleHQiLCJjcmVhdGVQZXJBcGkiLCJjcmVhdGVOZXdBcGlJbml0RGF0YSIsImluaXREYXRhIiwiZmlyc3RDaGlsZERhdGEiLCJtb2RlIiwiZGVidWdBZGRyIiwiYXBpQmluZERhdGEiLCJhcGlFbGUiLCJsZWFmSW5kZXgiLCIkYXBpVHJlZSIsIiRhcGlUcmVlRnJhbWUiLCIkYXBpVHJlZUNvbnRlbnQiLCJyZW5kZXJFeGlzdFRyZWUiLCJhcGlSZXR1cm5EYXRhIiwiYmluZEV2ZW50Iiwic2V0TW9kZVZhbCIsInNldERlYnVnQWRkciIsInNjcm9sbEJhciIsIm92ZXJmbG93RWxlIiwiZG9jRnJhZyIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJwZXJUV0RCQXJyIiwibGVhZiIsInBlclRXREIiLCJnZW5lcmF0ZUxlYWYiLCJjYWxjRGltZW5zaW9ucyIsImRyYXdTVkciLCJuZXdMZWFmU3BhbiIsImV2VGFyZ2V0Q2xhc3NMaXN0IiwiX2V2IiwiZG9tQ29udGFpbmVyIiwicGF0Y2giLCJwb3N0IiwiYWRkQ2hpbGQiLCJkZWxldGVBcGkiLCJkZWxOb2RlIiwiZGF3bl91cmkiLCJwcmV2aWV3Q29udGV4dCIsInByZXZpZXdUeXBlIiwicHJldmlld1N0ciIsImpzb25WaWV3Iiwic3dpdGNoUHJldmlld1N0YXR1cyIsImFwcGx5VHlwZSIsInByZXZpZXdUeXBlcyIsImFwaVJlc3BvbmRQcmV2aWV3RWxlIiwiYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0FyciIsImNsYXNzTmFtZSIsInRyaW0iLCJzcGxpdCIsImFycmF5IiwiaWR4IiwicHJldmlld1R5cGVFbGVzQXJyIiwiam9pbiIsImFwaVNhdmUiLCJhZGRMZWFmQ2hpbGQiLCJyZW1vdmVMZWFmQ2hpbGQiLCJhcGlUZXN0IiwiJHByZSIsIiRkYXRhVmlld0VsZSIsImRlbGV0ZSIsInN0b3JlQXBpUmV0dXJuRGF0YSIsIiRkYXRhQmVhdXRpZnkiLCJjbGljayIsImluaXRBcGlUcmVlIiwidHJlZURvY0ZyYWciLCJsZWFmRWxlIiwibGVhZkJpbmREYXRhIiwiY3R4IiwiY3VycmVudExlYWYiLCJjdXJyZW50SWR4IiwicGFyZW50SWR4IiwiaWR4QXJyIiwibm9kZXNBcnJUb0lkeEFyciIsInJlbW92ZU5vZGVzRnJvbURvbSIsInN0eWxlTm9kZXMiLCJzZXRQYXJlbnROb2RlVmFsIiwicmVuZGVyIiwiYWxsTGVhdmVzIiwiYWxsTGVhdmVzTGVuIiwibm9kZXNBcnJMZW4iLCJxdWV1ZUxlbiIsIngiLCJwYXJlbnRJZGV4IiwibGVhZkNoaWxkIiwiY3JlYXRlTGVhZiIsImNoaWxkTW9kZWwiLCJnZW5lcmF0ZUxlYWZTcGFuIiwibm9kZUluZGV4IiwibGVhdmVzSGFzaCIsImRpbWVuc2lvbkFyciIsImNsb25lUmVjdE9iaiIsImNsZWFyU1ZHIiwic3ZnIiwibGFzdENoaWxkIiwidGhhdCIsInN2Z1BhcnRpYWxzIiwiY3JlYXRlU2luZ2xlU1ZHIiwiaG9yaSIsInBhcmVudFZlcnQiLCJkdmVydCIsInN2Z25zIiwibmV3UGF0aCIsImNyZWF0ZUVsZW1lbnROUyIsImNvbnRyb2xSYXRlIiwibXgiLCJteSIsInF4IiwicXkiLCJxeHgiLCJxeXkiLCJ0eCIsInR5Iiwic2V0QXR0cmlidXRlTlMiLCJ2ZXJ0QXJyIiwibm9kZUxlZnRPZmZzZXQiLCJlbFJlY3RPYmplY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib2R5UmVjdE9iaiIsImNsb25lQm9keVJlY3RPYmoiLCJjbG9uZUVsUmVjdE9iamVjdCIsImFicyIsImdldE1heE9mQXJyYXkiLCJoYXNDbGFzcyIsImJyb3dzZXJQcmVmaXgiLCJnZXRUcmFuc2Zvcm0iLCJnZXRUcmFuc2xhdGVYIiwiZ2V0VHJhbnNsYXRlWSIsImJlYXV0aWZ5SlNPTiIsImhpZ2h0bGlnaHRKU09OIiwibnVtQXJyYXkiLCJlbGVtIiwidWEiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJvcGVuRGF0YWJhc2UiLCJvcGVyYSIsImFsbCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwibWF0Y2giLCJ3ZWJraXRUcmFuc2Zvcm0iLCJtb3pUcmFuc2Zvcm0iLCJtYXQiLCJwYXJzZUZsb2F0Iiwic2VyaWFsaXplIiwicCIsImVuY29kZVVSSUNvbXBvbmVudCIsImpzT2JqIiwianNvbiIsImNscyIsImNhbGxiYWNrcyIsImhhbmRsZU1ldGhvZCIsImxpbmsiLCJwYXJhbXNPYmoiLCJmb3JtRWxlIiwiY3JlYXRlRm9ybSIsImFwcGVuZEZvcm1Ub0RvbSIsInN1Ym1pdEZvcm0iLCJmIiwiZGlzcGxheSIsImZvcm0iLCJzdWJtaXQiLCJodG1sRXNjYXBlIiwic2Nyb2xsQmFySCIsImdlbmVyYXRlU2Nyb2xsU3RyIiwic2Nyb2xsU3RyIiwib3B0aW9ucyIsIm5ld1Njcm9sbFN0ciIsIm5ld1Njcm9sbEVsZSIsIlkiLCJzY3JvbGxiYXIiLCJOIiwiaW5pdFBvcyIsIk0iLCJpbml0RG9tIiwiVSIsIm1vdXNld2hlZWwiLCJtb3VzZXdoZWVsbG9jayIsIkgiLCJ3aGVlbGRlbHRhIiwieiIsImN0cmxibG9jayIsIkoiLCJzdGVwIiwiSSIsInNjYWxlIiwiRyIsInRoZW1lIiwiYWQiLCJyZWZyZXNoIiwiUyIsIlQiLCJoIiwiViIsImFnIiwiYWYiLCJwYXJzZUludCIsInNjcm9sbExlZnQiLCJnIiwidSIsIkYiLCJhZSIsIlciLCJRIiwiUiIsIm0iLCJDIiwiTCIsImQiLCJ0IiwiYWIiLCJQIiwiRCIsInkiLCJYIiwiY2xlYXJJbnRlcnZhbCIsIm9mZnNldFdpZHRoIiwiYWgiLCJvIiwiWiIsIm1lbU9mZnNldFgiLCJvZmZzZXRMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJzZXRJbnRlcnZhbCIsIm9uRHJhZ3N0YXJ0Iiwib253aGVlbCIsIm9uc2VsZWN0c3RhcnQiLCJuIiwiYWEiLCJLIiwiTyIsIkUiLCJhYyIsIkIiLCJvZmZzZXRYIiwibGF5ZXJYIiwiZGVib3VuY2VkV2luZG93UmVzaXplIiwicmVSZW5kZXIiLCJkaXNwb3NlIiwic2xpZGUiLCJzbGlkZUVsZSIsImdlbmVyYXRlU2xpZGVUcGwiLCJwb3NpdGlvblNsaWRlRWxlIiwiYmluZFNsaWRlRXZlbnRzIiwiY2xvc2VTbGlkZSIsImNsaWNrU2hhZG93IiwiaHRtbCIsImxpdGVyYWxTZWN0aW9ucyIsInJhdyIsInJlc3VsdCIsInN1YnN0cyIsInN1YnN0IiwibGl0IiwiaXNBcnJheSIsImVuZHNXaXRoIiwiZGlzYWJsZVNjcm9sbCIsImVuYWJsZVNjcm9sbCIsInJldHVyblZhbHVlIiwicHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzIiwia2V5Q29kZSIsIm9ubW91c2V3aGVlbCIsIm9udG91Y2htb3ZlIiwib25rZXlkb3duIiwidHdlZXRCb3giLCJzZXRGb2N1cyIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWwiLCJnZXRTZWxlY3Rpb24iLCJzZXRTdGFydCIsImNvbGxhcHNlIiwicmVtb3ZlQWxsUmFuZ2VzIiwiYWRkUmFuZ2UiLCJkb2MiLCJ0YiIsInRiZCIsInRiZFN0cmluZyIsImlubmVyVGV4dCIsIndlYnBhY2tQb2x5ZmlsbCIsImRlcHJlY2F0ZSIsInBhdGhzIiwiY29uZmlndXJhYmxlIiwicm91dGVzIiwicGF0aE5hbWUiLCJwYXRobmFtZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FDOURnQkEsTyxHQUFBQSxPO1FBR0FDLFEsR0FBQUEsUTtRQUlBQyxRLEdBQUFBLFE7UUFTQUMsYyxHQUFBQSxjO1FBVUFDLE8sR0FBQUEsTztRQVlBQyxRLEdBQUFBLFE7UUFZQUMsVyxHQUFB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QWQ7QUFBa0I7QUFIRCxHQUFwQztBQUtBaUgsU0FBT2tqQixlQUFQLEdBQXlCLENBQXpCO0FBQ0E7QUFDRCxRQUFPbGpCLE1BQVA7QUFDQSxDQW5CRCxDOzs7Ozs7Ozs7Ozs7OztBQ0FBOztBQUNBOztBQUNBOztBQUVBOztBQUVBOztBQURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMsWUFBTTtBQUNMLE1BQUlzakIsU0FBUztBQUNYLHVCQURXO0FBRVgsWUFBUSx1QkFGRztBQUdYLDRDQUhXO0FBSVg7QUFKVyxHQUFiO0FBTUEsTUFBSUMsV0FBVzlrQixPQUFPcEMsUUFBUCxDQUFnQm1uQixRQUEvQjtBQUNBLE1BQUlGLE9BQU94eEIsY0FBUCxDQUFzQnl4QixRQUF0QixDQUFKLEVBQXFDO0FBQ25DLFFBQUlueUIsT0FBT3VILFNBQVAsQ0FBaUIzRSxRQUFqQixDQUEwQmlHLElBQTFCLENBQStCcXBCLE9BQU9DLFFBQVAsQ0FBL0IsTUFBcUQsZ0JBQXJELElBQ0ZELE9BQU9DLFFBQVAsRUFBaUJqeUIsTUFEbkIsRUFDMkI7QUFDekIsV0FBSyxJQUFJeUgsSUFBSSxDQUFiLEVBQWdCQSxJQUFJdXFCLE9BQU9DLFFBQVAsRUFBaUJqeUIsTUFBckMsRUFBNkN5SCxHQUE3QyxFQUFrRDtBQUNoRHVxQixlQUFPQyxRQUFQLEVBQWlCeHFCLENBQWpCLEVBQW9CMUYsS0FBcEIsQ0FBMEIsSUFBMUI7QUFDRDtBQUNGLEtBTEQsTUFLTztBQUNMaXdCLGFBQU9DLFFBQVAsRUFBaUJsd0IsS0FBakIsQ0FBdUIsSUFBdkI7QUFDRDtBQUNGO0FBRUYsQ0FuQkQsSSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb3J5IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vcnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGEzNzM2ZjMyOGYyNzA3ZTIyZDgiLCJleHBvcnQgZnVuY3Rpb24gaXNFbXB0eShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbi8qIGNvbnNpZGVyIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqKG9iajEgPSB7fSwgb2JqMikge1xuICBsZXQgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmoxKSk7XG4gIGZvciAobGV0IGtleSBpbiBvYmoyKSB7XG4gICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmoyW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkUHJlZml4VG9PYmoob2JqLCBwcmVmaXgpIHtcbiAgaWYgKCFwcmVmaXgpIHJldHVybiBvYmo7XG4gIGxldCBuZXdPYmogPSB7fTtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqWycnICsgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nXSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBPYmoob2JqLCB3cmFwcGVyKSB7XG4gIGlmICghd3JhcHBlcikgcmV0dXJuIG9iajtcbiAgdmFyIG5ld09iaiA9IHt9O1xuICBuZXdPYmpbd3JhcHBlcl0gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW3dyYXBwZXJdW2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xuICBsZXQgdG1wRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsZS5pbm5lckhUTUwgPSBzdHI7XG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XG4gIHJldHVybiByZXR1cm5Eb207XG59XG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4vLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuLypcbnZhciBteUVmZmljaWVudEZuID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gIC8vIEFsbCB0aGUgdGF4aW5nIHN0dWZmIHlvdSBkb1xufSwgMjUwKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG15RWZmaWNpZW50Rm4pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpY3RNb2RlKCkge1xuICB2YXIgaXNTdHJpY3QgPSAoZnVuY3Rpb24oKSB7IHJldHVybiAhdGhpczsgfSkoKTtcbiAgcmV0dXJuIGlzU3RyaWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIi8qKlxuLy8gQi0+IEhlcmUgeW91IGRlZmluZSBpdHMgZnVuY3Rpb25zIGFuZCBpdHMgcGF5bG9hZFxudmFyIG1kbkFQSSA9ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9zZWFyY2guanNvbic7XG52YXIgcGF5bG9hZCA9IHtcbiAgJ3RvcGljJyA6ICdqcycsXG4gICdxJyAgICAgOiAnUHJvbWlzZSdcbn07XG52YXIgY2FsbGJhY2sgPSB7XG4gIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMSwgJ3N1Y2Nlc3MnLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfSxcbiAgZXJyb3IgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG4vLyBFbmQgQlxuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgxKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MsIGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgyKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC50aGVuKHVuZGVmaW5lZCwgY2FsbGJhY2suZXJyb3IpO1xuICovXG4vLyBBLT4gJGh0dHAgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBzdGFuZGFyZCBBZGFwdGVyIHBhdHRlcm5cbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL3NlcmlhbGl6ZSc7XG5pbXBvcnQge2lzRW1wdHksIG1lcmdlT2JqLCBhZGRQcmVmaXhUb09iaiwgd3JhcE9ian0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuL2NzcmYnO1xuXG5leHBvcnQgZnVuY3Rpb24gJGh0dHAodXJsKSB7XG4gIC8vIEEgc21hbGwgZXhhbXBsZSBvZiBvYmplY3RcbiAgdmFyIGNvcmUgPSB7XG5cbiAgICAvLyBNZXRob2QgdGhhdCBwZXJmb3JtcyB0aGUgYWpheCByZXF1ZXN0XG4gICAgYWpheDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFyZ3MgPSB7fSwgcHJlZml4KSB7XG4gICAgICAvLyBmb3IgUmFpbHNcbiAgICAgIC8vIHVybCA9IHVybCArICcuanNvbic7XG4gICAgICAvLyBDcmVhdGluZyBhIHByb21pc2VcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGVzIHRoZSBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnIHx8IG1ldGhvZCA9PT0gJ1BVVCcgfHwgbWV0aG9kID09PSAnUEFUQ0gnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICBsZXQgdXJpID0gSlNPTi5zdHJpbmdpZnkoZXh0ZW5kR2VuZXJhbFBhcmFtcyh3cmFwT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgLy8gY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCh1cmkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gc2VyaWFsaXplKGV4dGVuZEdlbmVyYWxQYXJhbXMoYWRkUHJlZml4VG9PYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsICsgJz8nICsgdXJpKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZXNvbHZlXCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBlcXVhbCB0byAyeHhcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlamVjdFwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZGlmZmVyZW50IHRoYW4gMnh4XG4gICAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuICAvLyBBZGFwdGVyIHBhdHRlcm5cbiAgcmV0dXJuIHtcbiAgICAnZ2V0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdHRVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncG9zdCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUE9TVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwdXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BVVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwYXRjaCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUEFUQ0gnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAnZGVsZXRlJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdERUxFVEUnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRHZW5lcmFsUGFyYW1zKG9iaikge1xuICBsZXQgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICBsZXQgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpO1xuICBsZXQgZ2VuZXJhbE9iaiA9IHt9O1xuICBnZW5lcmFsT2JqLnV0ZjggPSAn4pyTJztcbiAgZ2VuZXJhbE9iai5mb3JtYXQgPSAnanNvbic7XG4gIGdlbmVyYWxPYmpbY3NyZlBhcmFtXSA9IGNzcmZUb2tlbjtcbiAgcmV0dXJuIG1lcmdlT2JqKG9iaiwgZ2VuZXJhbE9iaik7XG59XG4vLyBFbmQgQVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanMiLCJpbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXNoKGRhdGEsIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSkge1xuICBsZXQgZmxhc2hFbGUgPSBzdHJUb0RvbShmbGFzaFRwbChkYXRhKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmxhc2hFbGUpO1xuICBzZXRUaW1lb3V0KGRlc3RvcnkuYmluZChudWxsLCBmbGFzaEVsZSwgY2FsbGJhY2spLCAyMDAwKTtcbn1cblxuZnVuY3Rpb24gZmxhc2hUcGwoZGF0YSkge1xuICBsZXQgc3RyID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJmbGFzaC1sYXllciAke2RhdGEuZXJyb3IgPyAnZXJyb3InIDogJ3N1Y2Nlc3MnfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj4ke2RhdGEuZXJyb3IgfHwgZGF0YS5tZXNzYWdlfTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgICA7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIGRlc3RvcnkoZWxlLCBjYWxsYmFjaykge1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICB9KTtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ2JsaW5rJyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZEZsYXNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGZsYXNoKGpzb25EYXRhLCBjYWxsYmFjayk7XG4gIHJldHVybiBqc29uRGF0YTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIiwiaW1wb3J0IHtkaXNhYmxlU2Nyb2xsLCBlbmFibGVTY3JvbGx9IGZyb20gJy4vdG9nZ2xlU2Nyb2xsJztcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cChldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgcG9wdXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcG9wdXBFbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtbGF5ZXInKTtcbiAgcG9wdXBFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVQb3B1cFRwbCgpO1xuICBwb3NpdGlvblBvcHVwRWxlKHBvcHVwRWxlLCBldik7XG4gIGJpbmRQb3B1cEV2ZW50cyhwb3B1cEVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwRWxlKTtcbiAgZGlzYWJsZVNjcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBvcHVwVHBsKGRhdGEpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtdGV4dFwiPkFyZSB5b3Ugc3VyZSB0byBkZWxldGUgdGhpcyBBUEk/PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRQb3B1cEV2ZW50cyhlbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jYW5jZWwtYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLXNoYWRvdycpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Qb3B1cEVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5jbGllbnRYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMuY2xpZW50WSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2KSB7XG4gIGlmIChldi50YXJnZXQgIT09IGV2LmN1cnJlbnRUYXJnZXQpIHJldHVybjtcbiAgbGV0IHBvcExheWVyID0gZXYudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cC1sYXllcicpO1xuICBpZiAocG9wTGF5ZXIpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcExheWVyKTtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qcyIsIi8qKlxuICogW1RyZWUgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0ge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXG4gKlxuICogX3Jvb3QgcG9pbnRzIHRvIHRoZSByb290IG5vZGUgb2YgYSB0cmVlLlxuICogdHJhdmVyc2VERihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIERGUy5cbiAqIHRyYXZlcnNlQkYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBCRlMuXG4gKiBjb250YWlucyhkYXRhLCB0cmF2ZXJzYWwpIHNlYXJjaGVzIGZvciBhIG5vZGUgaW4gYSB0cmVlLlxuICogYWRkKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2UpIGFkZHMgYSBub2RlIHRvIGEgdHJlZS5cbiAqIHJlbW92ZShjaGlsZCwgcGFyZW50KSByZW1vdmVzIGEgbm9kZSBpbiBhIHRyZWUuXG4gKlxuICovXG5pbXBvcnQge1F1ZXVlfSBmcm9tICcuL3F1ZXVlJztcbmV4cG9ydCBmdW5jdGlvbiBUcmVlKGRhdGEpIHtcbiAgdmFyIG5vZGUgPSBuZXcgTm9kZShkYXRhKTtcbiAgdGhpcy5fcm9vdCA9IG5vZGU7XG59XG5cbmZ1bmN0aW9uIE5vZGUoZGF0YSkge1xuICB0aGlzLm5vZGVJZCA9IGRhdGEubm9kZUlkOyAvLyBsZWFmIGluZGV4LCBzdGFydHMgZnJvbSAwKHJvb3Qgbm9kZSlcbiAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB0aGlzLmNoaWxkcmVuID0gW107XG4gIC8vIGFkZGVkIGxhdGVyXG4gIHRoaXMuY2hpbGRyZW5sZXZlbCA9IDE7IC8vIHJvd3Mgb2YgZGVzY2VuZGFudHMgb2YgY3VycmVudCBub2RlXG4gIHRoaXMuY29sdW1uID0gMDsgLy8gd2hpY2ggY29sdW1uIHRoZSBjdXJyZW50IG5vZGUgc2l0cyBpbiwgc3RhcnRzIGZyb20gMCggcm9vdCBub2RlIHNpdHMgaW4pXG4gIHRoaXMudG90YWxvZmZzZXR5bGV2ZWwgPSAwOyAvLyB0b3RhbCB2ZXJ0aWNhbCBvZmZzZXQgdG8gdGhlIGN1cnJlbnQgdHJlZSBcbiAgdGhpcy5kYXRhID0gZGF0YS5kYXRhIHx8IHt9O1xufVxuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyB0aGlzIGlzIGEgcmVjdXJzZSBhbmQgaW1tZWRpYXRlbHktaW52b2tpbmcgZnVuY3Rpb25cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoY3VycmVudE5vZGUpIHtcbiAgICAvLyBzdGVwIDJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHN0ZXAgM1xuICAgICAgcmVjdXJzZShjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgLy8gc3RlcCA0XG4gICAgY2FsbGJhY2soY3VycmVudE5vZGUpO1xuXG4gICAgLy8gc3RlcCAxXG4gIH0pKHRoaXMuX3Jvb3QpO1xuXG59O1xuXG4vLyBmb3IgdGhvc2Ugbm9kZXMgd2hvIGhhdmUgY2hpbGRyZW5cbmZ1bmN0aW9uIGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSB7XG4gIHZhciB0b3RhbENoaWxkcmVuTGV2ZWxzID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgdG90YWxDaGlsZHJlbkxldmVscyArPSBub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbENoaWxkcmVuTGV2ZWxzO1xufVxuVHJlZS5wcm90b3R5cGUuY2FsY0NoaWxkcmVuTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGUuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSA6IDE7XG4gICAgbm9kZS5jb2x1bW4gPSBub2RlLnBhcmVudCA/IChub2RlLnBhcmVudC5jb2x1bW4gKyAxKSA6IDA7XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbn07XG5cbmZ1bmN0aW9uIGNhbGNPZmZZKGFyciwgZGF0YSkge1xuICB2YXIgbm9kZUlkeCA9IGZpbmRJbmRleChhcnIsIGRhdGEpO1xuICB2YXIgdG90YWxZID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlSWR4OyBpKyspIHtcbiAgICB0b3RhbFkgKz0gYXJyW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbFk7XG59XG5cblRyZWUucHJvdG90eXBlLmNhbGNUb3RhbE9mZnNldFlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGV2ZWxnYXAgPSAwO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBub2RlLnRvdGFsb2Zmc2V0eWxldmVsID0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwgKyBjYWxjT2ZmWShub2RlLnBhcmVudC5jaGlsZHJlbiwgbm9kZS5ub2RlSWQpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblxuICAgIH07XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxufTtcblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VCRiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXG4gIHF1ZXVlLmVucXVldWUodGhpcy5fcm9vdCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY3VycmVudFRyZWUpO1xuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0cmF2ZXJzYWwpIHtcbiAgdHJhdmVyc2FsLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcblxuVHJlZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZGF0YSwgdG9EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gdG9EYXRhKSB7XG4gICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQucGFyZW50ID0gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFkZCBub2RlIHRvIGEgbm9uLWV4aXN0ZW50IHBhcmVudC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcbiAgdGhpcy5jaGVja0RhdGFIYXNDaGlsZCgpO1xuICByZXR1cm4gY2hpbGRcbn07XG5cblRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGRhdGEsIGZyb21EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIHRyZWUgPSB0aGlzLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBudWxsLFxuICAgICAgaW5kZXg7XG5cbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVJZCA9PT0gZnJvbURhdGEpIHtcbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIGluZGV4ID0gZmluZEluZGV4KHBhcmVudC5jaGlsZHJlbiwgZGF0YSk7XG5cbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIHRvIHJlbW92ZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRUb1JlbW92ZSA9IHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkb2VzIG5vdCBleGlzdC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcbiAgdGhpcy5jaGVja0RhdGFIYXNDaGlsZCgpO1xuICByZXR1cm4gY2hpbGRUb1JlbW92ZTtcbn07XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIGRhdGEpIHtcbiAgdmFyIGluZGV4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycltpXS5ub2RlSWQgPT09IGRhdGEpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qIHRyZWUgYWRkb24qL1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURpcmVjdENoaWxkID0gZnVuY3Rpb24obm9kZWRhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gIHBhcmVudCA9IG51bGwsXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVkYXRhKSB7XG4gICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICB9XG4gICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKHBhcmVudC5jaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIGNhbGxiYWNrKHBhcmVudCk7XG4gICAgcGFyZW50ID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59O1xuVHJlZS5wcm90b3R5cGUuYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3R5bGVPYmogPSB7fTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHN0eWxlT2JqW25vZGUubm9kZUlkXSA9IG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqO1xufTtcblxuLyoqXG4gKiBbdHJhdmVyc2VEZXNjZW5kYW50cyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1tpbnRlZ2VyXX0gbm9kZURhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W2FycmF5XX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGVzY2VuZGFudHMgPSBmdW5jdGlvbihub2RlRGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gbm9kZURhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgcXVldWUuZW5xdWV1ZShwYXJlbnQpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgdmFyIGRlc2NlbmRhbnRzQXJyID0gW107XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZGVzY2VuZGFudHNBcnIucHVzaChjdXJyZW50VHJlZSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjZW5kYW50c0Fycjtcbn07XG5cblRyZWUucHJvdG90eXBlLmNoZWNrRGF0YUhhc0NoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLmRhdGEuaGFzQ2hpbGQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG59O1xuXG4vKiBnZXQgTWF4IG5vZGVJZCBmcm9tIHRyZWUgKi9cblRyZWUucHJvdG90eXBlLm1heElkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBtYXhOb2RlSWQgPSAwO1xuICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZUlkID4gbWF4Tm9kZUlkKSBtYXhOb2RlSWQgPSBub2RlLm5vZGVJZDtcbiAgfTtcbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcbiAgcmV0dXJuIG1heE5vZGVJZDtcbn07XG5cbi8qIHRyZWUgZGVwdGggKi9cblRyZWUucHJvdG90eXBlLmRlcHRoID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkZXB0aEFyciA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbGV0IGRlcHRoID0gMDtcbiAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHdoaWxlIChub2RlLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBkZXB0aCArPSAxO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICB9XG4gICAgICBkZXB0aEFyci5wdXNoKGRlcHRoKTtcbiAgICB9XG4gIH07XG4gIHRoaXMudHJhdmVyc2VERihjYWxsYmFjayk7XG4gIHJldHVybiBkZXB0aEFycjtcbn07XG5cblRyZWUucHJvdG90eXBlLmRpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW107XG4gIGhvcmlBcnIgPSB0aGlzLmRlcHRoKCk7XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLl9yb290LmNoaWxkcmVubGV2ZWw7XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qcyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY3NyZi5qcyIsImV4cG9ydCBmdW5jdGlvbiB0d29XYXlEYXRhQmluZGluZyhkYXRhLCBkb21Db250ZXh0KSB7XG4gIC8qIEluc3RhdGlhdGUgYW4gZW1wdHkgYG1vZGVsYCBvYmplY3QuICovXG4gIHZhciBtb2RlbCA9IHt9O1xuICAvKiBJdGVyYXRlIG92ZXIgdGhlIGtleXMgb2YgdGhlIHN1cHBsaWVkIGBkYXRhYCBvYmplY3QuICovXG4gIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgLyogU3RvcmUgb3VyIHZhbHVlIGluc2lkZSB0aGUgYGZvckVhY2hgIGNsb3N1cmUuICovXG4gICAgdmFyIHZhbHVlID0gZGF0YVtrZXldO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwga2V5LCB7XG4gICAgICAvKiBXZSB3YW50IG91ciBwcm9wZXJ0eSB0byBhcHBlYXIgaW4gYGZvci4uaW5gIGxvb3BzLiAqL1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIFRoaXMgZG9lc24ndCBuZWVkIHRvIGRvIG11Y2gsIG9ubHkgcmV0dXJuIHRoZSBgdmFsdWVgIGZyb20gb3VyIGNsb3N1cmUuICovXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAvKiBPdmVyd3JpdGUgb3VyIGNsb3N1cmVzIGB2YWx1ZWAgd2l0aCB0aGUgbmV3IGB2YWxgLiAqL1xuICAgICAgICB2YWx1ZSA9IHZhbDtcbiAgICAgICAgLyogU2VsZWN0IGFsbCBub2RlcyB3aXRoIGBiaW5kYCBhbmQgYG1vZGVsYCBhdHRyaWJ1dGVzLiAqL1xuICAgICAgICBzZWxlY3RvclRvQXJyYXkoJ1tiaW5kPScgKyBrZXkgKyAnXScsIGRvbUNvbnRleHQpLmNvbmNhdChzZWxlY3RvclRvQXJyYXkoJ1ttb2RlbD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgIC8qIElmIGVsZW1lbnQgaGFzIGBiaW5kYCBhdHRyaWJ1dGUsIHNldCBpdCdzIGB0ZXh0Q29udGVudGAuICovXG4gICAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnYmluZCcpICYmICFlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJykpIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYmluZC10b2dnbGUtY2xhc3MnKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtdHJ1ZScpOyBcbiAgICAgICAgICAgIH1lbHNlIGlmKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZS10cnVlJyk7XG4gICAgICAgICAgICB9ZWxzZSBpZih2YWx1ZSAmJiAoJycgKyB2YWx1ZSkubGVuZ3RoID4gMCAmJiAhaGFzQWN0aXZlRWxlKGVsQW5kRGVzY2VuZGFudHMoZWwpKSkge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtdHJ1ZScpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYmluZC1hdHRyLWhyZWYnKSkge1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBJZiBlbGVtZW50IGhhcyBgbW9kZWxgIGF0dHJpYnV0ZSwgc2V0IGl0J3MgYHZhbHVlYC4gKi9cblxuICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ21vZGVsJykgJiYgZWwgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBTZXQgb3VyIG1vZGVsIG9iamVjdHMgcHJvcGVydHkgdmFsdWUgdG8gdGhlIHNhbWUgdmFsdWUuICovXG4gICAgbW9kZWxba2V5XSA9IHZhbHVlO1xuICAgIC8qIEFkZCBjaGFuZ2UgaGFuZGxlcnMgdG8gaW5wdXRzIG9uIHRoZSBwYWdlLiAqL1xuICAgIHNlbGVjdG9yVG9BcnJheSgnW21vZGVsPScgKyBrZXkgKyAnXScsIGRvbUNvbnRleHQpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgIC8qIE91ciBoYW5kbGVyIHNpbXBseSBzZXRzIG91ciBtb2RlbHMgYGtleWAgdG8gdGhlIGVsZW1lbnQncyB2YWx1ZS4gKi9cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBlbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIC8qIEJpbmQgYSBga2V5dXBgIGhhbmRsZXIgc28gd2UgZ2V0IGxpdmUgZmVlZGJhY2sgb24gZWFjaCBrZXkgcHJlc3MuICovXG4gICAgICAvLyBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZXIpO1xuICAgICAgLyogQmluZCBhIGBjaGFuZ2VgIGhhbmRsZXIgd2hpY2ggaXMgZmlyZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBibHVycmVkLiAqL1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVyKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8qIFJldHVybiBvdXIgbmV3IG1vZGVsIG9iamVjdC4gKi9cbiAgcmV0dXJuIG1vZGVsO1xufVxuXG4vKiBpbmNsdWRlIGRvbUNvbnRleHQgaXRzc2VsZiAqL1xuZnVuY3Rpb24gc2VsZWN0b3JUb0FycmF5KHNlbGVjdG9yLCBkb21Db250ZXh0KSB7XG4gIGxldCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Db250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgaWYgKGRvbUNvbnRleHQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICBhcnIucHVzaChkb21Db250ZXh0KTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBlbEFuZERlc2NlbmRhbnRzKGVsKSB7XG4gIGxldCByZXN1bHRBcnIgPSBbXTtcbiAgKGZ1bmN0aW9uIGxvb3AoZWxlKSB7XG4gICAgbGV0IGNoaWxkcmVuRWxlcyA9IGVsZS5jaGlsZHJlbjtcbiAgICBpZiAoZWxlLmNoaWxkRWxlbWVudENvdW50KSB7XG4gICAgICBmb3IgKHZhciBpID0gY2hpbGRyZW5FbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGxvb3AoY2hpbGRyZW5FbGVzW2ldKVxuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHRBcnIucHVzaChlbGUpO1xuICB9KShlbCk7XG4gIHJldHVybiByZXN1bHRBcnI7XG59XG5mdW5jdGlvbiBoYXNBY3RpdmVFbGUoYXJyKSB7XG4gIGxldCBib2wgPSBmYWxzZTtcbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHJldHVybjtcbiAgZm9yICh2YXIgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChib2wgPT09IHRydWUpIGJyZWFrO1xuICAgIGJvbCA9IGFycltpXSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYm9sO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanMiLCJleHBvcnQgY29uc3Qgcm9vdEFQSSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXMnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9nbG9iYWwvY29uc3RhbnQuanMiLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG4gIHRoaXMuQWN0aW9uQ2FibGUgPSB7XG4gICAgSU5URVJOQUw6IHtcbiAgICAgIFwibWVzc2FnZV90eXBlc1wiOiB7XG4gICAgICAgIFwid2VsY29tZVwiOiBcIndlbGNvbWVcIixcbiAgICAgICAgXCJwaW5nXCI6IFwicGluZ1wiLFxuICAgICAgICBcImNvbmZpcm1hdGlvblwiOiBcImNvbmZpcm1fc3Vic2NyaXB0aW9uXCIsXG4gICAgICAgIFwicmVqZWN0aW9uXCI6IFwicmVqZWN0X3N1YnNjcmlwdGlvblwiXG4gICAgICB9LFxuICAgICAgXCJkZWZhdWx0X21vdW50X3BhdGhcIjogXCIvY2FibGVcIixcbiAgICAgIFwicHJvdG9jb2xzXCI6IFtcImFjdGlvbmNhYmxlLXYxLWpzb25cIiwgXCJhY3Rpb25jYWJsZS11bnN1cHBvcnRlZFwiXVxuICAgIH0sXG4gICAgY3JlYXRlQ29uc3VtZXI6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICh1cmwgPT0gbnVsbCkge1xuICAgICAgICB1cmwgPSAocmVmID0gdGhpcy5nZXRDb25maWcoXCJ1cmxcIikpICE9IG51bGwgPyByZWYgOiB0aGlzLklOVEVSTkFMLmRlZmF1bHRfbW91bnRfcGF0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQWN0aW9uQ2FibGUuQ29uc3VtZXIodGhpcy5jcmVhdGVXZWJTb2NrZXRVUkwodXJsKSk7XG4gICAgfSxcbiAgICBnZXRDb25maWc6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBlbGVtZW50O1xuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nYWN0aW9uLWNhYmxlLVwiICsgbmFtZSArIFwiJ11cIik7XG4gICAgICByZXR1cm4gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIDogdm9pZCAwO1xuICAgIH0sXG4gICAgY3JlYXRlV2ViU29ja2V0VVJMOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgIHZhciBhO1xuICAgICAgaWYgKHVybCAmJiAhL153c3M/Oi9pLnRlc3QodXJsKSkge1xuICAgICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgICAgYS5ocmVmID0gYS5ocmVmO1xuICAgICAgICBhLnByb3RvY29sID0gYS5wcm90b2NvbC5yZXBsYWNlKFwiaHR0cFwiLCBcIndzXCIpO1xuICAgICAgICByZXR1cm4gYS5ocmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0RGVidWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlYnVnZ2luZyA9IHRydWU7XG4gICAgfSxcbiAgICBzdG9wRGVidWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlYnVnZ2luZyA9IG51bGw7XG4gICAgfSxcbiAgICBsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1lc3NhZ2VzO1xuICAgICAgbWVzc2FnZXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIGlmICh0aGlzLmRlYnVnZ2luZykge1xuICAgICAgICBtZXNzYWdlcy5wdXNoKERhdGUubm93KCkpO1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgW1wiW0FjdGlvbkNhYmxlXVwiXS5jb25jYXQoc2xpY2UuY2FsbChtZXNzYWdlcykpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgd2luZG93LkFjdGlvbkNhYmxlID0gdGhpcy5BY3Rpb25DYWJsZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdGhpcy5BY3Rpb25DYWJsZTtcbiAgfVxuXG59KS5jYWxsKHdpbmRvdyk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuICBBY3Rpb25DYWJsZS5Db25uZWN0aW9uTW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhbXAsIG5vdywgc2Vjb25kc1NpbmNlO1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucG9sbEludGVydmFsID0ge1xuICAgICAgbWluOiAzLFxuICAgICAgbWF4OiAzMFxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5zdGFsZVRocmVzaG9sZCA9IDY7XG5cbiAgICBmdW5jdGlvbiBDb25uZWN0aW9uTW9uaXRvcihjb25uZWN0aW9uKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgdGhpcy52aXNpYmlsaXR5RGlkQ2hhbmdlID0gYmluZCh0aGlzLnZpc2liaWxpdHlEaWRDaGFuZ2UsIHRoaXMpO1xuICAgICAgdGhpcy5yZWNvbm5lY3RBdHRlbXB0cyA9IDA7XG4gICAgfVxuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgdGhpcy5zdGFydGVkQXQgPSBub3coKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcHBlZEF0O1xuICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZygpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCB0aGlzLnZpc2liaWxpdHlEaWRDaGFuZ2UpO1xuICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiQ29ubmVjdGlvbk1vbml0b3Igc3RhcnRlZC4gcG9sbEludGVydmFsID0gXCIgKyAodGhpcy5nZXRQb2xsSW50ZXJ2YWwoKSkgKyBcIiBtc1wiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzUnVubmluZygpKSB7XG4gICAgICAgIHRoaXMuc3RvcHBlZEF0ID0gbm93KCk7XG4gICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgdGhpcy52aXNpYmlsaXR5RGlkQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuIEFjdGlvbkNhYmxlLmxvZyhcIkNvbm5lY3Rpb25Nb25pdG9yIHN0b3BwZWRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5pc1J1bm5pbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAodGhpcy5zdGFydGVkQXQgIT0gbnVsbCkgJiYgKHRoaXMuc3RvcHBlZEF0ID09IG51bGwpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucmVjb3JkUGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGluZ2VkQXQgPSBub3coKTtcbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnJlY29yZENvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucmVjb25uZWN0QXR0ZW1wdHMgPSAwO1xuICAgICAgdGhpcy5yZWNvcmRQaW5nKCk7XG4gICAgICBkZWxldGUgdGhpcy5kaXNjb25uZWN0ZWRBdDtcbiAgICAgIHJldHVybiBBY3Rpb25DYWJsZS5sb2coXCJDb25uZWN0aW9uTW9uaXRvciByZWNvcmRlZCBjb25uZWN0XCIpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucmVjb3JkRGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0ZWRBdCA9IG5vdygpO1xuICAgICAgcmV0dXJuIEFjdGlvbkNhYmxlLmxvZyhcIkNvbm5lY3Rpb25Nb25pdG9yIHJlY29yZGVkIGRpc2Nvbm5lY3RcIik7XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5zdGFydFBvbGxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgIHJldHVybiB0aGlzLnBvbGwoKTtcbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnN0b3BQb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KHRoaXMucG9sbFRpbWVvdXQpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMucmVjb25uZWN0SWZTdGFsZSgpO1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wb2xsKCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSwgdGhpcy5nZXRQb2xsSW50ZXJ2YWwoKSk7XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5nZXRQb2xsSW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnRlcnZhbCwgbWF4LCBtaW4sIHJlZjtcbiAgICAgIHJlZiA9IHRoaXMuY29uc3RydWN0b3IucG9sbEludGVydmFsLCBtaW4gPSByZWYubWluLCBtYXggPSByZWYubWF4O1xuICAgICAgaW50ZXJ2YWwgPSA1ICogTWF0aC5sb2codGhpcy5yZWNvbm5lY3RBdHRlbXB0cyArIDEpO1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoY2xhbXAoaW50ZXJ2YWwsIG1pbiwgbWF4KSAqIDEwMDApO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucmVjb25uZWN0SWZTdGFsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbklzU3RhbGUoKSkge1xuICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJDb25uZWN0aW9uTW9uaXRvciBkZXRlY3RlZCBzdGFsZSBjb25uZWN0aW9uLiByZWNvbm5lY3RBdHRlbXB0cyA9IFwiICsgdGhpcy5yZWNvbm5lY3RBdHRlbXB0cyArIFwiLCBwb2xsSW50ZXJ2YWwgPSBcIiArICh0aGlzLmdldFBvbGxJbnRlcnZhbCgpKSArIFwiIG1zLCB0aW1lIGRpc2Nvbm5lY3RlZCA9IFwiICsgKHNlY29uZHNTaW5jZSh0aGlzLmRpc2Nvbm5lY3RlZEF0KSkgKyBcIiBzLCBzdGFsZSB0aHJlc2hvbGQgPSBcIiArIHRoaXMuY29uc3RydWN0b3Iuc3RhbGVUaHJlc2hvbGQgKyBcIiBzXCIpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdEF0dGVtcHRzKys7XG4gICAgICAgIGlmICh0aGlzLmRpc2Nvbm5lY3RlZFJlY2VudGx5KCkpIHtcbiAgICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiQ29ubmVjdGlvbk1vbml0b3Igc2tpcHBpbmcgcmVvcGVuaW5nIHJlY2VudCBkaXNjb25uZWN0XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIkNvbm5lY3Rpb25Nb25pdG9yIHJlb3BlbmluZ1wiKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnJlb3BlbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5jb25uZWN0aW9uSXNTdGFsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIHJldHVybiBzZWNvbmRzU2luY2UoKHJlZiA9IHRoaXMucGluZ2VkQXQpICE9IG51bGwgPyByZWYgOiB0aGlzLnN0YXJ0ZWRBdCkgPiB0aGlzLmNvbnN0cnVjdG9yLnN0YWxlVGhyZXNob2xkO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUuZGlzY29ubmVjdGVkUmVjZW50bHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2Nvbm5lY3RlZEF0ICYmIHNlY29uZHNTaW5jZSh0aGlzLmRpc2Nvbm5lY3RlZEF0KSA8IHRoaXMuY29uc3RydWN0b3Iuc3RhbGVUaHJlc2hvbGQ7XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS52aXNpYmlsaXR5RGlkQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcInZpc2libGVcIikge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuY29ubmVjdGlvbklzU3RhbGUoKSB8fCAhX3RoaXMuY29ubmVjdGlvbi5pc09wZW4oKSkge1xuICAgICAgICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJDb25uZWN0aW9uTW9uaXRvciByZW9wZW5pbmcgc3RhbGUgY29ubmVjdGlvbiBvbiB2aXNpYmlsaXR5Y2hhbmdlLiB2aXNiaWxpdHlTdGF0ZSA9IFwiICsgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbm5lY3Rpb24ucmVvcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkodGhpcyksIDIwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICBzZWNvbmRzU2luY2UgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICByZXR1cm4gKG5vdygpIC0gdGltZSkgLyAxMDAwO1xuICAgIH07XG5cbiAgICBjbGFtcCA9IGZ1bmN0aW9uKG51bWJlciwgbWluLCBtYXgpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgbnVtYmVyKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb25uZWN0aW9uTW9uaXRvcjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHdpbmRvdyk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBpLCBtZXNzYWdlX3R5cGVzLCBwcm90b2NvbHMsIHJlZiwgc3VwcG9ydGVkUHJvdG9jb2xzLCB1bnN1cHBvcnRlZFByb3RvY29sLFxuICAgIHNsaWNlID0gW10uc2xpY2UsXG4gICAgYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH0sXG4gICAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG4gIHJlZiA9IEFjdGlvbkNhYmxlLklOVEVSTkFMLCBtZXNzYWdlX3R5cGVzID0gcmVmLm1lc3NhZ2VfdHlwZXMsIHByb3RvY29scyA9IHJlZi5wcm90b2NvbHM7XG5cbiAgc3VwcG9ydGVkUHJvdG9jb2xzID0gMiA8PSBwcm90b2NvbHMubGVuZ3RoID8gc2xpY2UuY2FsbChwcm90b2NvbHMsIDAsIGkgPSBwcm90b2NvbHMubGVuZ3RoIC0gMSkgOiAoaSA9IDAsIFtdKSwgdW5zdXBwb3J0ZWRQcm90b2NvbCA9IHByb3RvY29sc1tpKytdO1xuXG4gIEFjdGlvbkNhYmxlLkNvbm5lY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gICAgQ29ubmVjdGlvbi5yZW9wZW5EZWxheSA9IDUwMDtcblxuICAgIGZ1bmN0aW9uIENvbm5lY3Rpb24oY29uc3VtZXIpIHtcbiAgICAgIHRoaXMuY29uc3VtZXIgPSBjb25zdW1lcjtcbiAgICAgIHRoaXMub3BlbiA9IGJpbmQodGhpcy5vcGVuLCB0aGlzKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuY29uc3VtZXIuc3Vic2NyaXB0aW9ucztcbiAgICAgIHRoaXMubW9uaXRvciA9IG5ldyBBY3Rpb25DYWJsZS5Db25uZWN0aW9uTW9uaXRvcih0aGlzKTtcbiAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy53ZWJTb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIkF0dGVtcHRlZCB0byBvcGVuIFdlYlNvY2tldCwgYnV0IGV4aXN0aW5nIHNvY2tldCBpcyBcIiArICh0aGlzLmdldFN0YXRlKCkpKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhpc3RpbmcgY29ubmVjdGlvbiBtdXN0IGJlIGNsb3NlZCBiZWZvcmUgb3BlbmluZ1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIk9wZW5pbmcgV2ViU29ja2V0LCBjdXJyZW50IHN0YXRlIGlzIFwiICsgKHRoaXMuZ2V0U3RhdGUoKSkgKyBcIiwgc3VicHJvdG9jb2xzOiBcIiArIHByb3RvY29scyk7XG4gICAgICAgIGlmICh0aGlzLndlYlNvY2tldCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy51bmluc3RhbGxFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuY29uc3VtZXIudXJsLCBwcm90b2NvbHMpO1xuICAgICAgICB0aGlzLmluc3RhbGxFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMubW9uaXRvci5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHZhciBhbGxvd1JlY29ubmVjdCwgcmVmMTtcbiAgICAgIGFsbG93UmVjb25uZWN0ID0gKGFyZyAhPSBudWxsID8gYXJnIDoge1xuICAgICAgICBhbGxvd1JlY29ubmVjdDogdHJ1ZVxuICAgICAgfSkuYWxsb3dSZWNvbm5lY3Q7XG4gICAgICBpZiAoIWFsbG93UmVjb25uZWN0KSB7XG4gICAgICAgIHRoaXMubW9uaXRvci5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiAocmVmMSA9IHRoaXMud2ViU29ja2V0KSAhPSBudWxsID8gcmVmMS5jbG9zZSgpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5yZW9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlcnJvciwgZXJyb3IxO1xuICAgICAgQWN0aW9uQ2FibGUubG9nKFwiUmVvcGVuaW5nIFdlYlNvY2tldCwgY3VycmVudCBzdGF0ZSBpcyBcIiArICh0aGlzLmdldFN0YXRlKCkpKTtcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgICBlcnJvciA9IGVycm9yMTtcbiAgICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiRmFpbGVkIHRvIHJlb3BlbiBXZWJTb2NrZXRcIiwgZXJyb3IpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIlJlb3BlbmluZyBXZWJTb2NrZXQgaW4gXCIgKyB0aGlzLmNvbnN0cnVjdG9yLnJlb3BlbkRlbGF5ICsgXCJtc1wiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub3BlbiwgdGhpcy5jb25zdHJ1Y3Rvci5yZW9wZW5EZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UHJvdG9jb2wgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWYxO1xuICAgICAgcmV0dXJuIChyZWYxID0gdGhpcy53ZWJTb2NrZXQpICE9IG51bGwgPyByZWYxLnByb3RvY29sIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzU3RhdGUoXCJvcGVuXCIpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNTdGF0ZShcIm9wZW5cIiwgXCJjb25uZWN0aW5nXCIpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc1Byb3RvY29sU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVmMTtcbiAgICAgIHJldHVybiByZWYxID0gdGhpcy5nZXRQcm90b2NvbCgpLCBpbmRleE9mLmNhbGwoc3VwcG9ydGVkUHJvdG9jb2xzLCByZWYxKSA+PSAwO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc1N0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVmMSwgc3RhdGVzO1xuICAgICAgc3RhdGVzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gcmVmMSA9IHRoaXMuZ2V0U3RhdGUoKSwgaW5kZXhPZi5jYWxsKHN0YXRlcywgcmVmMSkgPj0gMDtcbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWYxLCBzdGF0ZSwgdmFsdWU7XG4gICAgICBmb3IgKHN0YXRlIGluIFdlYlNvY2tldCkge1xuICAgICAgICB2YWx1ZSA9IFdlYlNvY2tldFtzdGF0ZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gKChyZWYxID0gdGhpcy53ZWJTb2NrZXQpICE9IG51bGwgPyByZWYxLnJlYWR5U3RhdGUgOiB2b2lkIDApKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pbnN0YWxsRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGV2ZW50TmFtZSwgaGFuZGxlcjtcbiAgICAgIGZvciAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgIGhhbmRsZXIgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMud2ViU29ja2V0W1wib25cIiArIGV2ZW50TmFtZV0gPSBoYW5kbGVyO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS51bmluc3RhbGxFdmVudEhhbmRsZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXZlbnROYW1lO1xuICAgICAgZm9yIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgdGhpcy53ZWJTb2NrZXRbXCJvblwiICsgZXZlbnROYW1lXSA9IGZ1bmN0aW9uKCkge307XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb24ucHJvdG90eXBlLmV2ZW50cyA9IHtcbiAgICAgIG1lc3NhZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBpZGVudGlmaWVyLCBtZXNzYWdlLCByZWYxLCB0eXBlO1xuICAgICAgICBpZiAoIXRoaXMuaXNQcm90b2NvbFN1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlZjEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpLCBpZGVudGlmaWVyID0gcmVmMS5pZGVudGlmaWVyLCBtZXNzYWdlID0gcmVmMS5tZXNzYWdlLCB0eXBlID0gcmVmMS50eXBlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIG1lc3NhZ2VfdHlwZXMud2VsY29tZTpcbiAgICAgICAgICAgIHRoaXMubW9uaXRvci5yZWNvcmRDb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLnJlbG9hZCgpO1xuICAgICAgICAgIGNhc2UgbWVzc2FnZV90eXBlcy5waW5nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9uaXRvci5yZWNvcmRQaW5nKCk7XG4gICAgICAgICAgY2FzZSBtZXNzYWdlX3R5cGVzLmNvbmZpcm1hdGlvbjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMubm90aWZ5KGlkZW50aWZpZXIsIFwiY29ubmVjdGVkXCIpO1xuICAgICAgICAgIGNhc2UgbWVzc2FnZV90eXBlcy5yZWplY3Rpb246XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLnJlamVjdChpZGVudGlmaWVyKTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5ub3RpZnkoaWRlbnRpZmllciwgXCJyZWNlaXZlZFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJXZWJTb2NrZXQgb25vcGVuIGV2ZW50LCB1c2luZyAnXCIgKyAodGhpcy5nZXRQcm90b2NvbCgpKSArIFwiJyBzdWJwcm90b2NvbFwiKTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzUHJvdG9jb2xTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIlByb3RvY29sIGlzIHVuc3VwcG9ydGVkLiBTdG9wcGluZyBtb25pdG9yIGFuZCBkaXNjb25uZWN0aW5nLlwiKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZSh7XG4gICAgICAgICAgICBhbGxvd1JlY29ubmVjdDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJXZWJTb2NrZXQgb25jbG9zZSBldmVudFwiKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tb25pdG9yLnJlY29yZERpc2Nvbm5lY3QoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5ub3RpZnlBbGwoXCJkaXNjb25uZWN0ZWRcIiwge1xuICAgICAgICAgIHdpbGxBdHRlbXB0UmVjb25uZWN0OiB0aGlzLm1vbml0b3IuaXNSdW5uaW5nKClcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiV2ViU29ja2V0IG9uZXJyb3IgZXZlbnRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBDb25uZWN0aW9uO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwod2luZG93KTtcbihmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgQWN0aW9uQ2FibGUuU3Vic2NyaXB0aW9ucyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb25zKGNvbnN1bWVyKSB7XG4gICAgICB0aGlzLmNvbnN1bWVyID0gY29uc3VtZXI7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICB9XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgbWl4aW4pIHtcbiAgICAgIHZhciBjaGFubmVsLCBwYXJhbXMsIHN1YnNjcmlwdGlvbjtcbiAgICAgIGNoYW5uZWwgPSBjaGFubmVsTmFtZTtcbiAgICAgIHBhcmFtcyA9IHR5cGVvZiBjaGFubmVsID09PSBcIm9iamVjdFwiID8gY2hhbm5lbCA6IHtcbiAgICAgICAgY2hhbm5lbDogY2hhbm5lbFxuICAgICAgfTtcbiAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBBY3Rpb25DYWJsZS5TdWJzY3JpcHRpb24odGhpcy5jb25zdW1lciwgcGFyYW1zLCBtaXhpbik7XG4gICAgICByZXR1cm4gdGhpcy5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgdGhpcy5jb25zdW1lci5lbnN1cmVBY3RpdmVDb25uZWN0aW9uKCk7XG4gICAgICB0aGlzLm5vdGlmeShzdWJzY3JpcHRpb24sIFwiaW5pdGlhbGl6ZWRcIik7XG4gICAgICB0aGlzLnNlbmRDb21tYW5kKHN1YnNjcmlwdGlvbiwgXCJzdWJzY3JpYmVcIik7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZm9yZ2V0KHN1YnNjcmlwdGlvbik7XG4gICAgICBpZiAoIXRoaXMuZmluZEFsbChzdWJzY3JpcHRpb24uaWRlbnRpZmllcikubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2VuZENvbW1hbmQoc3Vic2NyaXB0aW9uLCBcInVuc3Vic2NyaWJlXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24oaWRlbnRpZmllcikge1xuICAgICAgdmFyIGksIGxlbiwgcmVmLCByZXN1bHRzLCBzdWJzY3JpcHRpb247XG4gICAgICByZWYgPSB0aGlzLmZpbmRBbGwoaWRlbnRpZmllcik7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gcmVmW2ldO1xuICAgICAgICB0aGlzLmZvcmdldChzdWJzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLm5vdGlmeShzdWJzY3JpcHRpb24sIFwicmVqZWN0ZWRcIik7XG4gICAgICAgIHJlc3VsdHMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcblxuICAgIFN1YnNjcmlwdGlvbnMucHJvdG90eXBlLmZvcmdldCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgdmFyIHM7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHMgPSByZWZbaV07XG4gICAgICAgICAgaWYgKHMgIT09IHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5maW5kQWxsID0gZnVuY3Rpb24oaWRlbnRpZmllcikge1xuICAgICAgdmFyIGksIGxlbiwgcmVmLCByZXN1bHRzLCBzO1xuICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHMgPSByZWZbaV07XG4gICAgICAgIGlmIChzLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gocyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlZiwgcmVzdWx0cywgc3Vic2NyaXB0aW9uO1xuICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHJlZltpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2VuZENvbW1hbmQoc3Vic2NyaXB0aW9uLCBcInN1YnNjcmliZVwiKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUubm90aWZ5QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY2FsbGJhY2tOYW1lLCBpLCBsZW4sIHJlZiwgcmVzdWx0cywgc3Vic2NyaXB0aW9uO1xuICAgICAgY2FsbGJhY2tOYW1lID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICByZWYgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gcmVmW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5ub3RpZnkuYXBwbHkodGhpcywgW3N1YnNjcmlwdGlvbiwgY2FsbGJhY2tOYW1lXS5jb25jYXQoc2xpY2UuY2FsbChhcmdzKSkpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBjYWxsYmFja05hbWUsIGksIGxlbiwgcmVzdWx0cywgc3Vic2NyaXB0aW9uLCBzdWJzY3JpcHRpb25zO1xuICAgICAgc3Vic2NyaXB0aW9uID0gYXJndW1lbnRzWzBdLCBjYWxsYmFja05hbWUgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBbXTtcbiAgICAgIGlmICh0eXBlb2Ygc3Vic2NyaXB0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMgPSB0aGlzLmZpbmRBbGwoc3Vic2NyaXB0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMgPSBbc3Vic2NyaXB0aW9uXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHN1YnNjcmlwdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHR5cGVvZiBzdWJzY3JpcHRpb25bY2FsbGJhY2tOYW1lXSA9PT0gXCJmdW5jdGlvblwiID8gc3Vic2NyaXB0aW9uW2NhbGxiYWNrTmFtZV0uYXBwbHkoc3Vic2NyaXB0aW9uLCBhcmdzKSA6IHZvaWQgMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuc2VuZENvbW1hbmQgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24sIGNvbW1hbmQpIHtcbiAgICAgIHZhciBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHN1YnNjcmlwdGlvbi5pZGVudGlmaWVyO1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3VtZXIuc2VuZCh7XG4gICAgICAgIGNvbW1hbmQ6IGNvbW1hbmQsXG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXJcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gU3Vic2NyaXB0aW9ucztcblxuICB9KSgpO1xuXG59KS5jYWxsKHdpbmRvdyk7XG4oZnVuY3Rpb24oKSB7XG4gIEFjdGlvbkNhYmxlLlN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXh0ZW5kO1xuXG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKGNvbnN1bWVyLCBwYXJhbXMsIG1peGluKSB7XG4gICAgICB0aGlzLmNvbnN1bWVyID0gY29uc3VtZXI7XG4gICAgICBpZiAocGFyYW1zID09IG51bGwpIHtcbiAgICAgICAgcGFyYW1zID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLmlkZW50aWZpZXIgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuICAgICAgZXh0ZW5kKHRoaXMsIG1peGluKTtcbiAgICB9XG5cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnBlcmZvcm0gPSBmdW5jdGlvbihhY3Rpb24sIGRhdGEpIHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgfVxuICAgICAgZGF0YS5hY3Rpb24gPSBhY3Rpb247XG4gICAgICByZXR1cm4gdGhpcy5zZW5kKGRhdGEpO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdW1lci5zZW5kKHtcbiAgICAgICAgY29tbWFuZDogXCJtZXNzYWdlXCIsXG4gICAgICAgIGlkZW50aWZpZXI6IHRoaXMuaWRlbnRpZmllcixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdW1lci5zdWJzY3JpcHRpb25zLnJlbW92ZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0aWVzKSB7XG4gICAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICAgIGlmIChwcm9wZXJ0aWVzICE9IG51bGwpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgIHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG5cbiAgfSkoKTtcblxufSkuY2FsbCh3aW5kb3cpO1xuKGZ1bmN0aW9uKCkge1xuICBBY3Rpb25DYWJsZS5Db25zdW1lciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBDb25zdW1lcih1cmwpIHtcbiAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IEFjdGlvbkNhYmxlLlN1YnNjcmlwdGlvbnModGhpcyk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgQWN0aW9uQ2FibGUuQ29ubmVjdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICBDb25zdW1lci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc2VuZChkYXRhKTtcbiAgICB9O1xuXG4gICAgQ29uc3VtZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24ub3BlbigpO1xuICAgIH07XG5cbiAgICBDb25zdW1lci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5jbG9zZSh7XG4gICAgICAgIGFsbG93UmVjb25uZWN0OiBmYWxzZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIENvbnN1bWVyLnByb3RvdHlwZS5lbnN1cmVBY3RpdmVDb25uZWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbi5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24ub3BlbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gQ29uc3VtZXI7XG5cbiAgfSkoKTtcblxufSkuY2FsbCh3aW5kb3cpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9BY3Rpb25DYWJsZS5qcyIsImltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmltcG9ydCB7cm9vdEFQSX0gZnJvbSAnLi4vZ2xvYmFsL2NvbnN0YW50JztcbmltcG9ydCB7aHRtbH0gZnJvbSAnLi4vY29tbW9uL3RlbXBsYXRlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge3NsaWRlfSBmcm9tICcuLi9jb21tb24vc2xpZGUnO1xuaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmltcG9ydCB7Zmxhc2gsIHBhcnNlQW5kRmxhc2h9IGZyb20gJy4uL2NvbW1vbi9mbGFzaCc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZURvbSc7XG5pbXBvcnQge3R3b1dheURhdGFCaW5kaW5nfSBmcm9tICcuLi9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcnO1xuXG5sZXQgcGF5bG9hZCA9IHt9O1xubGV0IGFwaXNBcnIgPSBbXTtcblxudmFyIGNhbGxiYWNrID0ge1xuICBnZXRBcGlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgYWRkQXBpVHJlZShKU09OLnBhcnNlKGRhdGEpLCB0aGlzLCBmYWxzZSk7XG4gIH0sXG4gIGdldEFsbEFwaXNTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IGRhdGFCYWsgPSBkYXRhO1xuICAgIGxldCBKU09OQmFrID0gSlNPTi5wYXJzZShkYXRhQmFrKTtcbiAgICBpZiAoSlNPTkJhay5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ld0FwaUJ0bigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJBbGxBcGlzKGRhdGEpO1xuICAgIGJpbmRldmVudHMoKTtcbiAgICBsaXN0ZW5BcGlRdWVyeSgpO1xuICB9LFxuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBwb3N0U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIGRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBmdW5jdGlvbiBkZXN0b3J5QXBpTGkoKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQodGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhLCBkZXN0b3J5QXBpTGkuYmluZCh0aGlzKSk7XG4gIH0sXG4gIGFwaVF1ZXJ5U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBzZWFyY2hMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlYXJjaC1yZXN1bHQnKVswXTtcbiAgICBsZXQgZGF0YU9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgbGV0IGNvbnRlbnRTdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMCwgTGVuID0gZGF0YU9iai5sZW5ndGg7IGkgPCBMZW47IGkrKykge1xuICAgICAgY29udGVudFN0ciArPSBgPGRpdiBjbGFzcz0ncGVyLXNlYXJjaC1yZXN1bHQnPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1yZXN1bHQtY29sdW1uIHBlci1yZXN1bHQtdXJpXCI+JHtkYXRhT2JqW2ldLnVyaX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1zZWN0aW9uXCI+JHtkYXRhT2JqW2ldLnNlY3Rpb259PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1yZXN1bHQtY29sdW1uIHBlci1yZXN1bHQtbWV0aG9kXCI+JHtkYXRhT2JqW2ldLm1ldGhvZH08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1kZXNjcmlwdGlvblwiPiR7ZGF0YU9ialtpXS5kZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBzZWFyY2hMaXN0LmlubmVySFRNTCA9IGNvbnRlbnRTdHI7XG4gICAgZGF0YU9iai5sZW5ndGggPiAwID8gc2VhcmNoTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykgOiBzZWFyY2hMaXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgICAgXG4gIH0sXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuZGF0YSkge1xuICAgICAgbmV3QXBpQnRuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZ2V0QWxsQXBpcygpO1xufVxuXG5sZXQgZGVib3VuY2VkQXBpUXVlcnlJbnB1dCA9IGRlYm91bmNlKGFwaVF1ZXJ5LCAxMDAsIGZhbHNlKTtcbmZ1bmN0aW9uIGxpc3RlbkFwaVF1ZXJ5KCkge1xuICBsZXQgYXBpUXVlcnlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1xdWVyeScpWzBdO1xuICBsZXQgaW5XcmFwcGVyID0gZmFsc2U7XG4gIGFwaVF1ZXJ5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBkZWJvdW5jZWRBcGlRdWVyeUlucHV0KTtcbiAgYXBpUXVlcnlJbnB1dC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihldikge1xuICAgIGlmICghY2hlY2tJZkZvY3VzLmFwcGx5KGFwaVF1ZXJ5SW5wdXQsIGV2KSkge1xuICAgICAgY2xlYXJTZWFyY2hSZXN1bHQoKTtcbiAgICB9O1xuICAgIGluV3JhcHBlciA9IGZhbHNlO1xuICB9KTtcbiAgYXBpUXVlcnlJbnB1dC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldikge1xuICAgIGluV3JhcHBlciA9IHRydWU7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbihldikge1xuICAgIGlmICghaW5XcmFwcGVyKSBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICB9KTtcbiAgYXBpUXVlcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFwaVF1ZXJ5KTtcbn1cbmZ1bmN0aW9uIGNoZWNrSWZGb2N1cyhldikge1xuICByZXR1cm4gdGhpcyA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGFwaVF1ZXJ5KGV2KSB7XG4gIGlmIChldi50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDApIHtcbiAgICBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBwYXlsb2FkID0ge3E6IGV2LnRhcmdldC52YWx1ZX07XG4gICRodHRwKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2luc3RhbnRzZWFyY2gnKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmFwaVF1ZXJ5U3VjY2Vzcy5iaW5kKGV2KSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGNsZWFyU2VhcmNoUmVzdWx0KCkge1xuICBsZXQgYXBpU2VhcmNoUmVzdWx0RWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlYXJjaC1yZXN1bHQnKVswXTtcbiAgYXBpU2VhcmNoUmVzdWx0RWxlLmlubmVySFRNTCA9ICcnO1xuICBhcGlTZWFyY2hSZXN1bHRFbGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufVxuZnVuY3Rpb24gdG9nZ2xlRm9sZExpKGNvbnRleHQsIGV2KSB7XG4gIGlmICghZXYpIHtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1saS13aWtpJykpIHtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24oZXYpIHtcbiAgdG9nZ2xlRm9sZExpKHRoaXMsIGV2KTtcbiAgaWYgKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9O1xuICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5wYXJlbnROb2RlLmRhdGFzZXQuYXBpSWQpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QXBpU3VjY2Vzcy5iaW5kKHRoaXMucGFyZW50Tm9kZSkpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5mdW5jdGlvbiBiaW5kZXZlbnRzKCkge1xuICBsZXQgYXBpTGlzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWxpLXN1bW1hcnknKTtcbiAgW10uc2xpY2UuY2FsbChhcGlMaXMpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRBcGlUcmVlKGRhdGEgPSB7fSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgbGV0IG5ld0FwaSA9IG5ldyBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpO1xuICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcbn1cblxubGV0IGRlYm91bmNlZE5ld0FwaUJ0biA9IGRlYm91bmNlKHByb2Nlc3NOZXdBcGlDbGljaywgNTAwLCB0cnVlKTtcbmxldCBkZWJvdW5jZWRFbnZCdG4gPSBkZWJvdW5jZShwcm9jZXNzT3BlbkVudlNldHRpbmdzLCA1MDAsIHRydWUpO1xuZnVuY3Rpb24gcHJvY2Vzc09wZW5FbnZTZXR0aW5ncyhldiwgZWwpIHtcbiAgbGV0IHBhcmFtcyA9IHtcbiAgICBjb250ZW50OiBzbGlkZUNvbnRlbnQoKVxuICB9O1xuICBzbGlkZShldiwgcGFyYW1zKTtcbn1cbmZ1bmN0aW9uIHNsaWRlQ29udGVudCgpIHtcbiAgbGV0IHRwbFN0ciA9IGBcbiAgICA8dWw+XG4gICAgICA8bGk+XG4gICAgICAgIDxsYWJlbD5ob3N0OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxsYWJlbD5hY2NvdW50OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxsYWJlbD5sYWJlbDo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjLWlucHV0XCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJjaGVjayBhdmFpbGFiaWxpdHlcIiAvPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICBgO1xuICByZXR1cm4gdHBsU3RyO1xufVxuZnVuY3Rpb24gcHJvY2Vzc05ld0FwaUNsaWNrKCkge1xuICBsZXQgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgaWYgKCFhcGlVbCkge1xuICAgIGNyZWF0ZUFwaVVsKCk7XG4gICAgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgfVxuICBsZXQgYmFzZUFwaUxpID0gc3RyVG9Eb20obmV3QXBpTGlUcGwoKSk7XG4gIGFwaVVsLmluc2VydEJlZm9yZShiYXNlQXBpTGksIGFwaVVsLmZpcnN0Q2hpbGQpO1xuICBhZGRBcGlUcmVlKHt9LCBiYXNlQXBpTGksIHRydWUpO1xuICB0b2dnbGVGb2xkTGkoYmFzZUFwaUxpLmNoaWxkcmVuWzBdKTtcbiAgYmFzZUFwaUxpLmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXBpVWwoKSB7XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBhcGlVbEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGxldCBuZXdBcGlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktYWRkLXF1ZXJ5JylbMF07XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpVWxFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsJyk7XG4gIGFwaUxpc3RFbGUuYXBwZW5kQ2hpbGQoYXBpVWxFbGUpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlEaXYpO1xufVxuZnVuY3Rpb24gbmV3QXBpQnRuKCkge1xuICBsZXQgbmV3QXBpRGl2O1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWRlcicpWzBdO1xuICBsZXQgbmV3QXBpU3RyID0gYFxuICAgIDxkaXYgY2xhc3M9XCJhcGktYWRkLXF1ZXJ5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFkZC1hcGktYnRuXCI+bmV3IEFQSTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktc2VhcmNoLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXF1ZXJ5XCIgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwic2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcGktc2VhcmNoLXJlc3VsdCBoaWRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxhIGNsYXNzPVwiYy1oaWRlIGljb24tdGV4dC1saW5rIGMtZmxvYXQtcmlnaHQgZGV2LWVudi1zZXR0aW5nc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48c3BhbiBjbGFzcz1cImljb24tdGV4dC1pY29uXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi1zZXR0aW5ncyBpY29uLWZpdFwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXNldHRpbmdzXCI+PC91c2U+PC9zdmc+PC9zcGFuPjxzcGFuIGNsYXNzPVwiaWNvbi10ZXh0LXRleHRcIj7njq/looPlkIzmraXmlbDmja7phY3nva48L3NwYW4+PC9hPlxuICAgIDwvZGl2PlxuICBgO1xuICBuZXdBcGlEaXYgPSBzdHJUb0RvbShuZXdBcGlTdHIpO1xuICBuZXdBcGlEaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWFwaS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlZE5ld0FwaUJ0bik7XG4gIG5ld0FwaURpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkZXYtZW52LXNldHRpbmdzJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWJvdW5jZWRFbnZCdG4pO1xuICBpbnNlcnRBZnRlcihuZXdBcGlEaXYsIGhlYWRlcik7XG4gIHJldHVybiBuZXdBcGlEaXY7XG59XG5cbmZ1bmN0aW9uIG5ld0FwaUxpVHBsKGRhdGEgPSB7fSkge1xuICB2YXIgdHBsID0gYFxuICAgIDxsaSBjbGFzcz1cImFwaS1saVwiIGRhdGEtYXBpLWlkPVwiJHtkYXRhLmlkIHx8IG51bGx9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWxpLXN1bW1hcnlcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktY29sbGFwc2VcIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS11cmlcIiBiaW5kPVwidXJpXCI+JHtkYXRhLnVyaSB8fCAnKE5vIHVyaSknfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktZGVzXCIgYmluZD1cImRlc2NyaXB0aW9uXCI+JHtkYXRhLmRlc2NyaXB0aW9uID8gZGF0YS5kZXNjcmlwdGlvbiA6ICcoTm8gZGVzY3JpcHRpb24pJ308L3NwYW4+XG4gICAgICAgIDxhIGhyZWY9XCIke2RhdGEud2lraUxpbmt9XCIgY2xhc3M9XCJhcGktbGktd2lraVwiIGJpbmQtYXR0ci1ocmVmPVwid2lraUxpbmtcIiBiaW5kPVwid2lraUxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2RhdGEud2lraUxpbmsgPyBkYXRhLndpa2lMaW5rIDogJyhObyB3aWtpTGluayknfTwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIGA7XG4gIHJldHVybiB0cGw7XG59XG5mdW5jdGlvbiByZW5kZXJBbGxBcGlzKGRhdGEpIHtcbiAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGNvbnN0IHRtcGwgPSBkYXRhID0+IGh0bWxgXG4gICAgICA8dWwgY2xhc3M9XCJhcGktdWxcIj5cbiAgICAgICR7ZGF0YS5tYXAoaXRlbSA9PiBodG1sYFxuICAgICAgICAke25ld0FwaUxpVHBsKGl0ZW0pfVxuICAgICAgYCl9XG4gICAgICA8L3VsPlxuICBgO1xuICBsZXQgYXBpTGlzdEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhcGlMaXN0RWxlLmNsYXNzTGlzdC5hZGQoJ2FwaS11bC13cmFwcGVyJyk7XG4gIGFwaUxpc3RFbGUuaW5uZXJIVE1MID0gdG1wbChkYXRhKTtcbiAgaW5zZXJ0QWZ0ZXIoYXBpTGlzdEVsZSwgbmV3QXBpQnRuKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxBcGlzKCkge1xuICAkaHR0cChyb290QVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFsbEFwaXNTdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2FwaU9wZXJhdGlvbi5qcyIsImltcG9ydCB7aGFuZGxlTWV0aG9kfSBmcm9tICcuLi9jb21tb24vaGFuZGxlTWV0aG9kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFMaW5rcygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzRGF0YUxpbmssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NEYXRhTGluayhlKSB7XG4gIHZhciBlID0gd2luZG93LmUgfHwgZTtcblxuICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKVxuICAgICAgcmV0dXJuO1xuXG4gIC8vIERvIHNvbWV0aGluZ1xuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdkZWxldGUnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAnUEFUQ0gnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgLy8gaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAncGF0Y2gnKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCwge1xuICAvLyAgICAgbnM6ICdhcGknLFxuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBzZWN0aW9uOiAnd2lzZScsXG4gIC8vICAgICAgIGlkOiAnMidcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9kYXRhTGlua3MuanMiLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmNwKCkge1xyXG4gICAgbGV0IEFwcCA9IHt9O1xyXG4gICAgQXBwLmNhYmxlID0gQWN0aW9uQ2FibGUuY3JlYXRlQ29uc3VtZXIoKTtcclxuICAgIEFwcC5jb21tZW50cyA9IEFwcC5jYWJsZS5zdWJzY3JpcHRpb25zLmNyZWF0ZShcIkNoYXRDaGFubmVsXCIsIHtcclxuICAgICAgICBjb2xsZWN0aW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICQoXCJbZGF0YS1jaGFubmVsPSdjb21tZW50cyddXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29ubmVjdGVkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZm9sbG93Q3VycmVudE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuaW5zdGFsbFBhZ2VDaGFuZ2VDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSkodGhpcyksIDEwMDApO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVjZWl2ZWQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnVzZXJJc0N1cnJlbnRVc2VyKGRhdGEuY29tbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbGxlY3Rpb24oKS5hcHBlbmQoZGF0YS5jb21tZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdXNlcklzQ3VycmVudFVzZXI6IGZ1bmN0aW9uKGNvbW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuICQoY29tbWVudCkuYXR0cignZGF0YS11c2VyLWlkJykgPT09ICQoJ21ldGFbbmFtZT1jdXJyZW50LXVzZXJdJykuYXR0cignaWQnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvbGxvd0N1cnJlbnRNZXNzYWdlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VJZDtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VJZCA9IHRoaXMuY29sbGVjdGlvbigpLmRhdGEoJ21lc3NhZ2UtaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybSgnZm9sbG93Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZV9pZFwiOiBtZXNzYWdlSWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGVyZm9ybSgndW5mb2xsb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5zdGFsbFBhZ2VDaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pbnN0YWxsZWRQYWdlQ2hhbmdlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5zdGFsbGVkUGFnZUNoYW5nZUNhbGxiYWNrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkKGRvY3VtZW50KS5vbigncGFnZTpjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQXBwLmNvbW1lbnRzLmZvbGxvd0N1cnJlbnRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvZmlzQ2lQbHVnaW5zLmpzIiwiaW1wb3J0IHt0d2VldEJveH0gZnJvbSAnLi90d2VldEJveCc7XG5leHBvcnQgZnVuY3Rpb24gaG9tZSgpIHtcblx0dHdlZXRCb3goKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9ob21lcGFnZS5qcyIsImltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmV4cG9ydCBmdW5jdGlvbiBqc29uVG9UcmVlKG5vZGVzQXJyKSB7XG4gIGxldCBoYXNoVGFibGUgPSB7fTtcbiAgbGV0IHRyZWU7XG4gIGZvciAobGV0IGkgPSAwLCBub2Rlc0xlbiA9IG5vZGVzQXJyLmxlbmd0aDsgaSA8IG5vZGVzTGVuOyBpKyspIHtcbiAgICBoYXNoVGFibGVbbm9kZXNBcnJbaV1bJ3BhcmVudElkJ11dID8gaGFzaFRhYmxlW25vZGVzQXJyW2ldWydwYXJlbnRJZCddXS5wdXNoKG5vZGVzQXJyW2ldKSA6IGhhc2hUYWJsZVtub2Rlc0FycltpXVsncGFyZW50SWQnXV0gPSBbbm9kZXNBcnJbaV1dO1xuICB9XG4gIC8vIG5vZGUg55qE5a2Q6IqC54K555qESUTmgLvmmK/lpKfkuo5ub2Rl55qESURcbiAgbGV0IG1vZEtleXNBcnIgPSByZW1vdmVFbGVGcm9tQXJyKE9iamVjdC5rZXlzKGhhc2hUYWJsZSksICdudWxsJykubWFwKE51bWJlcikuc29ydChzb3J0TnVtYmVyKTtcbiAgbGV0IHJvb3ROb2RlRGF0YSA9IGhhc2hUYWJsZVsnbnVsbCddWzBdO1xuICB0cmVlID0gbmV3IFRyZWUocm9vdE5vZGVEYXRhKTtcblxuICBmb3IgKGxldCBqID0gMCwga2V5c0xlbiA9IG1vZEtleXNBcnIubGVuZ3RoOyBqIDwga2V5c0xlbjsgaisrKSB7XG4gICAgaWYgKGhhc2hUYWJsZS5oYXNPd25Qcm9wZXJ0eShtb2RLZXlzQXJyW2pdKSkge1xuICAgICAgZm9yIChsZXQgayA9IDAsIGtleUFyckxlbiA9IGhhc2hUYWJsZVttb2RLZXlzQXJyW2pdXS5sZW5ndGg7IGsgPCBrZXlBcnJMZW47IGsrKykge1xuICAgICAgICB0cmVlLmFkZChoYXNoVGFibGVbbW9kS2V5c0FycltqXV1ba10sICttb2RLZXlzQXJyW2pdLCB0cmVlLnRyYXZlcnNlQkYpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJlZTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRWxlRnJvbUFycihhcnIsIGVsZSkge1xuICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZihlbGUpO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8qIEJ5IGRlZmF1bHQgdGhlIHNvcnQgbWV0aG9kIHNvcnRzIGVsZW1lbnRzIGFscGhhYmV0aWNhbGx5LiAqL1xuZnVuY3Rpb24gc29ydE51bWJlcihhLCBiKSB7XG4gIHJldHVybiBhIC0gYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyZWVUb0pzb24odHJlZSkge1xuXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2pzb25UcmVlQ29udmVydGVyLmpzIiwiLyoqXG4gKiBbUXVldWUgZGVzY3JpcHRpb25dXG4gKiBlbnF1ZXVlKGRhdGEpIGFkZHMgZGF0YSB0byBhIHF1ZXVlLlxuICogZGVxdWV1ZSByZW1vdmVzIHRoZSBvbGRlc3QgYWRkZWQgZGF0YSB0byBhIHF1ZXVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gUXVldWUoKSB7XG4gIHRoaXMuX29sZGVzdEluZGV4ID0gMTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXggPSAxO1xuICB0aGlzLl9zdG9yYWdlID0ge307XG59XG5cblF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLl9uZXdlc3RJbmRleCAtIHRoaXMuX29sZGVzdEluZGV4O1xufTtcblxuUXVldWUucHJvdG90eXBlLmVucXVldWUgPSBmdW5jdGlvbihkYXRhKSB7XG4gIHRoaXMuX3N0b3JhZ2VbdGhpcy5fbmV3ZXN0SW5kZXhdID0gZGF0YTtcbiAgdGhpcy5fbmV3ZXN0SW5kZXgrKztcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBvbGRlc3RJbmRleCA9IHRoaXMuX29sZGVzdEluZGV4LFxuICAgICAgbmV3ZXN0SW5kZXggPSB0aGlzLl9uZXdlc3RJbmRleCxcbiAgICAgIGRlbGV0ZWREYXRhO1xuXG4gIGlmIChvbGRlc3RJbmRleCAhPT0gbmV3ZXN0SW5kZXgpIHtcbiAgICBkZWxldGVkRGF0YSA9IHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xuICAgIGRlbGV0ZSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICB0aGlzLl9vbGRlc3RJbmRleCsrO1xuXG4gICAgcmV0dXJuIGRlbGV0ZWREYXRhO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzIiwiaW1wb3J0IHttZXJnZU9ian0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5leHBvcnQgZnVuY3Rpb24gY29sbGVjdEFwaURhdGEodHJlZSwgb3BFbGUpIHtcbiAgbGV0IHBlckFwaUVsZSA9IG9wRWxlLmNsb3Nlc3QoJy5wZXItYXBpJyk7XG4gIC8vIGxldCB0cmVlRWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHJldHVybiBtZXJnZU9iaihjb2xsZWN0SW5mbyhwZXJBcGlFbGUpLCBjb2xsZWN0RGF0YUZyb21UcmVlKHRyZWUpKTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdEluZm8ocGVyQXBpRWxlKSB7XG4gIGxldCBpbmZvRWxlID0gcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1pbmZvJylbMF07XG4gIGxldCBNb2Rlc1Jvd0VsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbW9kZXMtcm93JylbMF07XG4gIGxldCBpbmZvRGF0YSA9IHt9O1xuICBpbmZvRGF0YSA9IHtcbiAgICAnc2VjdGlvbic6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlY3Rpb24nKVswXS52YWx1ZSxcbiAgICAndXJpJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUsXG4gICAgJ21ldGhvZCc6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdLnZhbHVlLFxuICAgICdkZXNjcmlwdGlvbic6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWRlc2NyaXB0aW9uJylbMF0udmFsdWUsXG4gICAgJ3dpa2lMaW5rJzogaW5mb0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktd2lraS1pbnB1dCcpWzBdLnZhbHVlLFxuICAgICdtb2RlJzogZ2V0TW9kZVZhbChNb2Rlc1Jvd0VsZSksXG4gICAgJ2RlYnVnQWRkcic6IGdldERlYnVnQWRkcihNb2Rlc1Jvd0VsZSlcbiAgfTtcblxuICByZXR1cm4gaW5mb0RhdGE7XG59XG5cbmZ1bmN0aW9uIGdldE1vZGVWYWwoTW9kZXNSb3dFbGUpIHtcbiAgdmFyIHJhZGlvcyA9IE1vZGVzUm93RWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tb2RlJyk7XG4gIHZhciBtb2RlVmFsO1xuICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcmFkaW9zLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJhZGlvc1tpXS5jaGVja2VkKSB7XG4gICAgICBtb2RlVmFsID0gcmFkaW9zW2ldLnZhbHVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBtb2RlVmFsO1xufVxuXG5mdW5jdGlvbiBnZXREZWJ1Z0FkZHIoTW9kZXNSb3dFbGUpIHtcbiAgcmV0dXJuIE1vZGVzUm93RWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGUtZGVidWdnaW5nLWFkZHInKVswXS52YWx1ZTtcbn1cblxuZnVuY3Rpb24gY29sbGVjdFRyZWUodHJlZUVsZSkge1xuXHRsZXQgbGVhdmVzID0gW10uc2xpY2UuY2FsbCh0cmVlRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7IFxuICBsZXQgdHJlZURhdGFBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBsZWFmRGF0YTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYWZEYXRhID0ge307XG4gICAgbGVhZkRhdGEucGFyZW50SWQgPSBsZWF2ZXNbaV0uZGF0YXNldC5wYXJlbnQ7XG4gICAgbGVhZkRhdGEubm9kZUlkID0gbGVhdmVzW2ldLmRhdGFzZXQuaW5kZXg7XG4gICAgbGVhZkRhdGEua2V5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYta2V5JylbMF0udmFsdWU7XG4gICAgbGVhZkRhdGEudmFsdWUgPSBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlO1xuICAgIGxlYWZEYXRhLnF1YW50aXR5ID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtcXVhbnRpdHknKVswXS52YWx1ZTtcbiAgICB0cmVlRGF0YUFyci5wdXNoKGxlYWZEYXRhKTtcbiAgfTtcbiAgdHJlZURhdGFPYmoubm9kZXMgPSB0cmVlRGF0YUFycjtcbiAgcmV0dXJuIHRyZWVEYXRhT2JqO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0RGF0YUZyb21UcmVlKGFwaVRyZWUpIHtcbiAgbGV0IHRyZWUgPSBhcGlUcmVlO1xuICBsZXQgbm9kZXNBcnIgPSBbXTtcbiAgbGV0IHRyZWVEYXRhT2JqID0ge307XG4gIGxldCBkaW1lbnNpb25zQXJyID0gW107XG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCBub2RlRGF0YSA9IHt9O1xuICAgIG5vZGVEYXRhLm5vZGVJZCA9IG5vZGUubm9kZUlkO1xuICAgIG5vZGVEYXRhLmNvbHVtbiA9IG5vZGUuY29sdW1uO1xuICAgIG5vZGVEYXRhLnBhcmVudElkID0gbm9kZS5wYXJlbnQgPT09IG51bGwgPyBudWxsIDogbm9kZS5wYXJlbnQubm9kZUlkO1xuICAgIG5vZGVEYXRhLmNoaWxkcmVubGV2ZWwgPSBub2RlLmNoaWxkcmVubGV2ZWw7XG4gICAgbm9kZURhdGEudG90YWxvZmZzZXR5bGV2ZWwgPSAgbm9kZS50b3RhbG9mZnNldHlsZXZlbDtcbiAgICBub2RlRGF0YS5kYXRhID0gbm9kZS5kYXRhO1xuICAgIG5vZGVEYXRhLmRhdGEuaGFzQ2hpbGQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gICAgbm9kZXNBcnIucHVzaChub2RlRGF0YSk7XG4gIH07XG4gIHRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG4gIGRpbWVuc2lvbnNBcnIgPSB0cmVlLmRpbWVuc2lvbnMoKTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucyA9IHt9O1xuICB0cmVlRGF0YU9iai5kaW1lbnNpb25zLmhVbml0ID0gZGltZW5zaW9uc0FyclswXTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucy52VW5pdCA9IGRpbWVuc2lvbnNBcnJbMV07XG4gIHRyZWVEYXRhT2JqLm5vZGVzID0gbm9kZXNBcnI7XG4gIHJldHVybiB0cmVlRGF0YU9iajtcbn1cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWVEYXRhQ29sbGVjdC5qcyIsIi8qKlxuICogd2lkdGggb2Ygc2luZ2xlIHN2ZyBwYXRoOiAzMHB4XG4gKi9cbid1c2Ugc3RyaWN0JztcbmltcG9ydCB7VHJlZX0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge3Jvb3RBUEl9IGZyb20gJy4uL2dsb2JhbC9jb25zdGFudCc7XG5pbXBvcnQge2ZsYXNoLCBwYXJzZUFuZEZsYXNofSBmcm9tICcuLi9jb21tb24vZmxhc2gnO1xuaW1wb3J0IHtjb2xsZWN0QXBpRGF0YX0gZnJvbSAnLi90cmVlRGF0YUNvbGxlY3QnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGVYLCB4aHIsIGJlYXV0aWZ5SlNPTiwgaGlnaHRsaWdodEpTT059IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCB7anNvblRvVHJlZX0gZnJvbSAnLi9qc29uVHJlZUNvbnZlcnRlcic7XG5pbXBvcnQge3R3b1dheURhdGFCaW5kaW5nfSBmcm9tICcuLi9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcnO1xuaW1wb3J0IHtjYWxsYmFja3N9IGZyb20gJy4uL2NvbW1vbi9jYWxsYmFja3MnO1xuaW1wb3J0IHtzY3JvbGxCYXJIfSBmcm9tICcuLi9jb21tb24vc2Nyb2xsJztcbmltcG9ydCB7Z2VuZXJhdGVVVUlEfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcblxuZnVuY3Rpb24gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpID0gZmFsc2UpIHtcbiAgbGV0IGFwaVVVSUQgPSBnZW5lcmF0ZVVVSUQoKTtcbiAgbGV0IHRwbCA9XG4gICAgICBgPGRpdiBjbGFzcz1cImFwaS1pbmZvXCI+XG4gICAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+QVBJOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXVyaVwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9XCJcIiBtb2RlbD1cInVyaVwiIC8+IFxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPm1ldGhvZDo8L2xhYmVsPlxuICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJhcGktbWV0aG9kXCIgbW9kZWw9XCJtZXRob2RcIj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkdFVFwiPkdFVDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUE9TVFwiPlBPU1Q8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBBVENIXCI+UEFUQ0g8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRFTEVURVwiPkRFTEVURTwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDxsYWJlbD5zZWN0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXNlY3Rpb25cIiB0eXBlPVwidGV4dFwiIG1vZGVsPVwic2VjdGlvblwiIC8+XG4gICAgICAgICAgPGxhYmVsIGZvcj1cIlwiPmRlc2NyaXB0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLWRlc2NyaXB0aW9uXCIgdHlwZT1cInRleHRcIiBtb2RlbD1cImRlc2NyaXB0aW9uXCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCIgZGF0YS1tZXRob2Q9XCIke3BhdGNoT3JQb3N0KGlzTmV3QXBpKX1cIiBkYXRhLWFjdGlvbj1cIi9hcGlzJHtzYXZlT3JDcmVhdGUoZGF0YSwgaXNOZXdBcGkpfVwiID4ke2lzTmV3QXBpID8gJ2NyZWF0ZScgOiAnc2F2ZSd9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXJlc3BvbmQtcHJldmlldy1idG5cIj5wcmV2aWV3PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXBpLXdpa2lcIiBiaW5kLXRvZ2dsZS1jbGFzcyBiaW5kPVwid2lraUxpbmtcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS13aWtpLWxhYmVsXCI+V2lraTogPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS13aWtpLWlucHV0XCIgdHlwZT1cInRleHRcIiBtb2RlbD1cIndpa2lMaW5rXCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktbW9kZXMtcm93XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIwXCI+5byA5Y+RPC9sYWJlbD5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiYXBpLW1vZGUtbGFiZWwgYXBpLW1vZGUtZGVidWdcIj48aW5wdXQgY2xhc3M9XCJhcGktbW9kZVwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCIke2FwaVVVSUR9LW1vZGVcIiB2YWx1ZT1cIjFcIj7ogZTosIM8aW5wdXQgY2xhc3M9XCJtb2RlLWRlYnVnZ2luZy1hZGRyXCIgdHlwZT1cInRleHRcIiAvPjwvbGFiZWw+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIyXCI+57q/5LiKPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLWNvbnRlbnQtd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtZnJhbWVcIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzcz1cImFwaS1zdmdcIiB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+PC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZVwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFwaS1yZXNwb25kLXByZXZpZXdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250cm9sLXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmV2aWV3LWNvbnRyb2xcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1yYXdcIj5yYXc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcHJldmlldy10eXBlIHByZXZpZXctYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1wcmV2aWV3LXR5cGUgcHJldmlldy1oaWdobGlnaHRcIj5zeW50YXhIaWdobGlnaHQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGF0YS12aWV3IGpzb25cIj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PmA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGxlYWZUcGwoKSB7XG4gIGxldCBsZWFmQ29udGVudFRwbCA9IGBcbiAgICA8aSBjbGFzcz1cInJlbW92ZS1jaGlsZFwiPi08L2k+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLWtleVwiIHBsYWNlaG9sZGVyPVwia2V5XCIgbW9kZWw9XCJkYXRhTmFtZVwiIC8+XG4gICAgPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInZhbHVlXCIgbW9kZWw9XCJkYXRhVmFsdWVcIiAvPlxuICAgIDxzZWxlY3QgY2xhc3M9XCJsZWFmLXZhbHVlLXR5cGVcIiBtb2RlbD1cImRhdGFUeXBlXCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJTdHJpbmdcIj5TdHJpbmc8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkludGVnZXJcIj5JbnRlZ2VyPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJGbG9hdFwiPkZsb2F0PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJCb29sZWFuXCI+Qm9vbGVhbjwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQXJyYXlcIj5BcnJheTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSGFzaFwiPkhhc2g8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJlZ2V4XCI+UmVnZXgoc3RyaW5nKTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRml4ZWRcIj5GaXhlZChzdHJpbmcpPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJOdWxsXCI+TnVsbDwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICAgIDxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+XG4gICAgPGkgY2xhc3M9XCJhZGQtY2hpbGRcIj4rPC9pPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1xdWFudGl0eVwiIHBsYWNlaG9sZGVyPVwicXVhbnRpdHlcIiBtb2RlbD1cImRhdGFRdWFudGl0eVwiIC8+XG4gICAgPHNwYW4gY2xhc3M9XCJsZWFmLWhpZGUtcXVhbnRpdHlcIj48L3NwYW4+XG4gIGA7XG4gIHJldHVybiBsZWFmQ29udGVudFRwbDtcbn1cblxuLyogZGVmYXVsdCBnZXRCb3VuZGluZ1JlY3RPYmogKi9cbmxldCBpbml0UmVjdE9iaiA9IHtcbiAgcmlnaHQ6IDAsXG4gIGJvdHRvbTogMCxcbiAgbGVmdDogMCxcbiAgdG9wOiAwLFxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwXG59O1xuXG5sZXQgbGVhZkRhdGFQbGFjZUhvbGRlciA9IHtcbiAgZGF0YU5hbWU6ICcnLFxuICBkYXRhVHlwZTogJ1N0cmluZycsXG4gIGRhdGFWYWx1ZTogJycsXG4gIGRhdGFRdWFudGl0eTogJzEnLFxuICBoYXNDaGlsZDogZmFsc2Vcbn07XG5cbi8qXG5zaW5nbGUgbGVhZiB3aWR0aDogNDYwcHg7XG4gKi9cbmNvbnN0IHBlckxlYWZXaWR0aCA9IDQ2MDtcbmNvbnN0IHBlckxlYWZIZWlnaHQgPSAyMjtcbmNvbnN0IGxlYXZlc1ZlcnRpY2FsR2FwID0gMzA7XG5jb25zdCBwZXJTVkdQYXRoV2lkdGggPSAzMDtcbnZhciByb290Tm9kZVdpZHRoID0gcGVyU1ZHUGF0aFdpZHRoICsgMTQ7XG52YXIgY2FsbGJhY2sgPSB7XG4gIHBhdGNoU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuYXBpUmF3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5hcGlEYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKS5kYXRhO1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIHBvc3RTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdGhpcy5hcGlSYXdEYXRhID0gZGF0YTtcbiAgICB0aGlzLmFwaURhdGFPYmogPSBKU09OLnBhcnNlKGRhdGEpLmRhdGE7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgICB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdLnRleHRDb250ZW50ID0gJ3NhdmUnO1xuICAgIHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zYXZlJylbMF0uZGF0YXNldC5tZXRob2QgPSAnUEFUQ0gnO1xuICB9LFxuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfSxcbiAgYXBpUmVzcG9uZFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQganNvbk9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgdGhpcy5wcmV2aWV3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5wcmV2aWV3RGF0YU9iaiA9IGpzb25PYmo7XG4gICAgc3dpdGNoUHJldmlldyh0aGlzLnByZXZpZXdEYXRhT2JqLCBoaWdodGxpZ2h0SlNPTiwgdGhpcy5ldmVudENvbnRleHQsICdoaWdobGlnaHQnKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gcGF0Y2hPclBvc3QoaXNOZXdBcGkpIHtcbiAgcmV0dXJuIGlzTmV3QXBpID8gJ1BPU1QnIDogJ1BBVENIJztcbn1cblxuZnVuY3Rpb24gc2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICcnIDogYC8ke2RhdGEuaWR9YDtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUGVyQXBpKGRhdGEsIGlzTmV3QXBpKSB7XG4gIHZhciBwZXJBcGlFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGVyQXBpRWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGVyLWFwaScpO1xuICBwZXJBcGlFbGUuZGF0YXNldC5pZCA9IGlzTmV3QXBpID8gJycgOiBkYXRhLmlkO1xuICBwZXJBcGlFbGUuaW5uZXJIVE1MID0gcGVyQXBpVHBsKGRhdGEsIGlzTmV3QXBpKTtcbiAgcGVyQXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXS52YWx1ZSA9IGlzTmV3QXBpID8gJycgOiBkYXRhLnVyaTtcbiAgcmV0dXJuIHBlckFwaUVsZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU5ld0FwaUluaXREYXRhKCkge1xuICBsZXQgaW5pdERhdGEgPSB7XG4gICAgbm9kZUlkOiAwLFxuICAgIHBhcmVudElkOiBudWxsLFxuICAgIGRhdGE6IGxlYWZEYXRhUGxhY2VIb2xkZXJcbiAgfTtcbiAgbGV0IGZpcnN0Q2hpbGREYXRhID0ge1xuICAgIG5vZGVJZDogMSxcbiAgICBwYXJlbnRJZDogMCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIHJldHVybiB7XG4gICAgbW9kZTogJzAnLFxuICAgIGRlYnVnQWRkcjogJycsXG4gICAgbm9kZXM6IFtpbml0RGF0YSwgZmlyc3RDaGlsZERhdGFdXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkgPSBmYWxzZSkge1xuICBpZiAoaXNOZXdBcGkpIHtcbiAgICBkYXRhID0gY3JlYXRlTmV3QXBpSW5pdERhdGEoKTtcbiAgfVxuICB0aGlzLmFwaURhdGFPYmogPSBkYXRhO1xuICB0aGlzLmFwaUNvbnRhaW5lciA9IGNvbnRhaW5lck5vZGU7XG4gIGxldCBwZXJBcGlFbGUgPSBjcmVhdGVQZXJBcGkoZGF0YSwgaXNOZXdBcGkpO1xuICB0aGlzLmFwaUNvbnRhaW5lci5hcHBlbmRDaGlsZChwZXJBcGlFbGUpO1xuXG4gIGxldCBhcGlCaW5kRGF0YSA9IHR3b1dheURhdGFCaW5kaW5nKGRhdGEsIHRoaXMuYXBpQ29udGFpbmVyKTtcbiAgZGF0YSA9IGFwaUJpbmREYXRhO1xuXG4gIHRoaXMuYXBpRWxlID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLWFwaScpWzBdO1xuXG4gIHRoaXMubGVhZkluZGV4ID0gMTtcblxuICB0aGlzLiRhcGlUcmVlID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtZnJhbWUnKVswXTtcbiAgdGhpcy4kYXBpVHJlZUNvbnRlbnQgPSB0aGlzLmFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50JylbMF07XG4gIC8vIGlmIChpc05ld0FwaSkge1xuICAvLyAgIHRoaXMuaW5pdEFwaVRyZWUoKTtcbiAgLy8gICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIC8vIH0gZWxzZSB7XG4gIHRoaXMucmVuZGVyRXhpc3RUcmVlKGRhdGEpO1xuICAvLyB9XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG5cbiAgdGhpcy5hcGlFbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBiaW5kRXZlbnQuYmluZCh0aGlzKSk7XG4gIHRoaXMuc2V0TW9kZVZhbChkYXRhLm1vZGUpO1xuICB0aGlzLnNldERlYnVnQWRkcihkYXRhLmRlYnVnQWRkcik7XG4gIHRoaXMuc2Nyb2xsQmFyID0gc2Nyb2xsQmFySCh7XG4gICAgd3JhcHBlcjogdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtd3JhcHBlcicpWzBdLFxuICAgIGNvbnRlbnQ6IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWNvbnRlbnQtd3JhcHBlcicpWzBdLFxuICAgIG92ZXJmbG93RWxlOiB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50JylbMF1cbiAgfSk7XG59XG5cbkFwaURvbS5wcm90b3R5cGUucmVuZGVyRXhpc3RUcmVlID0gZnVuY3Rpb24oZGF0YSkge1xuICBsZXQgZG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcblxuICBsZXQgcGVyVFdEQkFyciA9IFtdO1xuICBpZiAoZGF0YS5ub2RlcyAmJiBkYXRhLm5vZGVzLmxlbmd0aCkge1xuICAgIGxldCBub2Rlc0FyciA9IGRhdGEubm9kZXM7XG4gICAgbGV0IG5vZGVEYXRhID0ge307XG4gICAgbGV0IGxlYWY7XG4gICAgbGV0IGxlYWZEYXRhID0ge307XG4gICAgbGV0IHBlclRXREI7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5vZGVzQXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBsZWFmID0gdW5kZWZpbmVkO1xuICAgICAgbGVhZiA9IGdlbmVyYXRlTGVhZihkYXRhLm5vZGVzW2ldKTtcbiAgICAgIGlmIChkYXRhLm5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhLm5vZGVzW2ldLmRhdGEgPT09IFwiXCIpIHtcbiAgICAgICAgZGF0YS5ub2Rlc1tpXS5kYXRhID0gbGVhZkRhdGFQbGFjZUhvbGRlcjtcbiAgICAgIH07XG4gICAgICBpZiAoZGF0YS5ub2Rlc1tpXS5wYXJlbnRJZCA9PT0gbnVsbCB8fCBkYXRhLm5vZGVzW2ldLnBhcmVudElkID09PSAnbnVsbCcpIGxlYWYuY2xhc3NMaXN0LmFkZCgncm9vdC1sZWFmJyk7XG4gICAgICBwZXJUV0RCID0gdHdvV2F5RGF0YUJpbmRpbmcoZGF0YS5ub2Rlc1tpXS5kYXRhLCBsZWFmKTtcbiAgICAgIGRhdGEubm9kZXNbaV0uZGF0YSA9IHBlclRXREI7XG4gICAgICBwZXJUV0RCQXJyLnB1c2gocGVyVFdEQik7XG4gICAgICBkb2NGcmFnLmFwcGVuZENoaWxkKGxlYWYpO1xuICAgIH1cbiAgICB0aGlzLmxlYWZJbmRleCArPSAobGVuIC0gMik7XG4gIH1cbiAgdGhpcy5hcGlUcmVlID0ganNvblRvVHJlZShkYXRhLm5vZGVzKTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcbiAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICB0aGlzLmRyYXdTVkcoKTtcbn07XG5cblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmKG5vZGVEYXRhKSB7XG4gIHZhciBuZXdMZWFmU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdjbGFzcycsICdsZWFmJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnYmluZCcsICdoYXNDaGlsZCcpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJywgJycpO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0LnBhcmVudElkID0gbm9kZURhdGEucGFyZW50SWQ7XG4gIG5ld0xlYWZTcGFuLmRhdGFzZXQubm9kZUlkID0gbm9kZURhdGEubm9kZUlkO1xuICBuZXdMZWFmU3Bhbi5pbm5lckhUTUwgPSBsZWFmVHBsKCk7XG4gIG5ld0xlYWZTcGFuLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKHBlckxlYWZXaWR0aCArIHBlclNWR1BhdGhXaWR0aCkgKiAobm9kZURhdGEuY29sdW1uIC0gMSkpICsgJ3B4LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQobm9kZURhdGEudG90YWxvZmZzZXR5bGV2ZWwgKiAocGVyTGVhZkhlaWdodCArIGxlYXZlc1ZlcnRpY2FsR2FwKSkgKyAncHgsIDApJztcbiAgcmV0dXJuIG5ld0xlYWZTcGFuO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zZXREZWJ1Z0FkZHIgPSBmdW5jdGlvbih2YWwpIHtcbiAgdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbW9kZS1kZWJ1Z2dpbmctYWRkcicpWzBdLnZhbHVlID0gdmFsO1xufTtcbkFwaURvbS5wcm90b3R5cGUuc2V0TW9kZVZhbCA9IGZ1bmN0aW9uKHZhbCkge1xuICB2YXIgcmFkaW9zID0gdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1vZGUnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHJhZGlvcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICh2YWwgPT09IHJhZGlvc1tpXS52YWx1ZSkge1xuICAgICAgcmFkaW9zW2ldLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhZGlvc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfVxuICB9XG59O1xuZnVuY3Rpb24gYmluZEV2ZW50KGV2KSB7XG4gIC8qIF8kdGhpcyBpcyBBcGlEb20sIHdoaWxlIHRoaXMgaXMgaXRzIHdyYXBwZXIob2JqZWN0KS4gKi9cbiAgbGV0IF90aGlzID0gdGhpcztcbiAgbGV0IGV2VGFyZ2V0Q2xhc3NMaXN0ID0gZXYudGFyZ2V0LmNsYXNzTGlzdDtcbiAgbGV0IGV2ZW50Q29udGV4dCA9IHtfZXY6IGV2LCBkb21Db250YWluZXI6IGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJyl9O1xuICB0aGlzLmV2ZW50Q29udGV4dCA9IGV2ZW50Q29udGV4dDtcbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdhcGktc2F2ZScpKSB7XG4gICAgbGV0IHBhcmFtcyA9IGNvbGxlY3RBcGlEYXRhKF90aGlzLmFwaVRyZWUsIF90aGlzLiRhcGlUcmVlKTtcbiAgICBpZiAodGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5hcGlEYXRhT2JqLmlkKVxuICAgICAgLnBhdGNoKHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wYXRjaFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAgIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG4gICAgfSBlbHNlIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICAkaHR0cChyb290QVBJKVxuICAgICAgLnBvc3QocGFyYW1zLCAnYXBpJylcbiAgICAgIC50aGVuKGNhbGxiYWNrLnBvc3RTdWNjZXNzLmJpbmQodGhpcykpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ2FkZC1jaGlsZCcpKSB7XG4gICAgX3RoaXMuYWRkQ2hpbGQoZXYpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncmVtb3ZlLWNoaWxkJykpIHtcbiAgICBpZiAoZXYudGFyZ2V0LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdyb290LWxlYWYnKSkge1xuICAgICAgcG9wdXAoZXYsIHt9LCBkZWxldGVBcGkuYmluZChfdGhpcywgZXYpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgX3RoaXMuZGVsTm9kZShldik7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXJlc3BvbmQtcHJldmlldy1idG4nKSkge1xuICAgIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgICBmbGFzaCh7ZXJyb3I6ICdTYXZlIGZpcnN0Lid9KTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgbGV0IHBhcmFtcyA9IHtkYXduX3VyaTogdGhpcy5hcGlEYXRhT2JqLnVyaX07XG4gICAgbGV0IGNvbnRleHQgPSB7fTtcbiAgICAkaHR0cCh3aW5kb3cubG9jYXRpb24ub3JpZ2luICsgJy9hcGlyZXNwb25zZScpXG4gICAgLmdldChwYXJhbXMpXG4gICAgLnRoZW4oY2FsbGJhY2suYXBpUmVzcG9uZFN1Y2Nlc3MuYmluZCh0aGlzKSlcbiAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXdpa2ktbGFiZWwnKSkge1xuICAgIGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLXdpa2knKS5jbGFzc0xpc3QudG9nZ2xlKCd0b2dnbGUtdHJ1ZScpO1xuICB9XG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1yYXcnKSkge1xuICAgIHJldHVybiBzd2l0Y2hQcmV2aWV3KHRoaXMucHJldmlld0RhdGFPYmosIEpTT04uc3RyaW5naWZ5LCB0aGlzLmV2ZW50Q29udGV4dCwgJ3JhdycpO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1iZWF1dGlmeScpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgYmVhdXRpZnlKU09OLCB0aGlzLmV2ZW50Q29udGV4dCwgJ2JlYXV0aWZ5Jyk7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdwcmV2aWV3LWhpZ2hsaWdodCcpKSB7XG4gICAgcmV0dXJuIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgaGlnaHRsaWdodEpTT04sIHRoaXMuZXZlbnRDb250ZXh0LCAnaGlnaGxpZ2h0Jyk7XG4gIH07XG5cbn1cblxuZnVuY3Rpb24gc3dpdGNoUHJldmlldyhkYXRhT2JqLCBmbiwgcHJldmlld0NvbnRleHQsIHByZXZpZXdUeXBlKSB7XG4gIGxldCBwcmV2aWV3U3RyID0gZm4uY2FsbChudWxsLCBkYXRhT2JqKTtcbiAganNvblZpZXcuY2FsbChwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIsIHByZXZpZXdTdHIpO1xuICBzd2l0Y2hQcmV2aWV3U3RhdHVzKHByZXZpZXdDb250ZXh0LCBwcmV2aWV3VHlwZSk7XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hQcmV2aWV3U3RhdHVzKHByZXZpZXdDb250ZXh0LCBhcHBseVR5cGUpIHtcbiAgbGV0IHByZXZpZXdUeXBlcyA9IFsncmF3JywgJ2JlYXV0aWZ5JywgJ2hpZ2hsaWdodCddO1xuICBsZXQgYXBpUmVzcG9uZFByZXZpZXdFbGUgPSBwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXJlc3BvbmQtcHJldmlldycpWzBdO1xuICBsZXQgYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0FyciA9IGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTmFtZS50cmltKCkuc3BsaXQoJyAnKTtcbiAgYXBpUmVzcG9uZFByZXZpZXdFbGVDbGFzc0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4LCBhcnJheSkge1xuICAgIGxldCBpZHggPSBwcmV2aWV3VHlwZXMuaW5kZXhPZihlbGVtZW50KTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIGFycmF5LnNwbGljZShhcnJheS5pbmRleE9mKGVsZW1lbnQpLCAxKTtcbiAgICB9XG4gIH0pO1xuICBsZXQgcHJldmlld1R5cGVFbGVzQXJyID0gW10uc2xpY2UuY2FsbChwcmV2aWV3Q29udGV4dC5kb21Db250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncGVyLXByZXZpZXctdHlwZScpKTtcbiAgcHJldmlld1R5cGVFbGVzQXJyLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICB9KTtcbiAgcHJldmlld0NvbnRleHQuZG9tQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3ByZXZpZXctJyArIGFwcGx5VHlwZSlbMF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gIGFwaVJlc3BvbmRQcmV2aWV3RWxlLmNsYXNzTmFtZSA9IGFwaVJlc3BvbmRQcmV2aWV3RWxlQ2xhc3NBcnIuam9pbignICcpO1xuICBhcGlSZXNwb25kUHJldmlld0VsZS5jbGFzc0xpc3QuYWRkKGFwcGx5VHlwZSk7XG59XG5cbmZ1bmN0aW9uIGFwaVNhdmUoKSB7XG5cbn1cbmZ1bmN0aW9uIGFkZExlYWZDaGlsZCgpIHtcblxufVxuZnVuY3Rpb24gcmVtb3ZlTGVhZkNoaWxkKCkge1xuXG59XG5mdW5jdGlvbiBhcGlUZXN0KCkge1xuXG59XG5mdW5jdGlvbiBqc29uVmlldyhkYXRhKSB7XG4gIHZhciAkcHJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICRwcmUuaW5uZXJIVE1MID0gZGF0YTtcbiAgbGV0ICRkYXRhVmlld0VsZSA9IHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS12aWV3JylbMF07XG4gICRkYXRhVmlld0VsZS5pbm5lckhUTUwgPSAnJztcbiAgJGRhdGFWaWV3RWxlLmFwcGVuZENoaWxkKCRwcmUpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVBcGkoZXYpIHtcbiAgaWYgKCF0aGlzLmFwaURhdGFPYmouaWQpIHtcbiAgICBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKGV2LnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGxldCBwYXJhbXMgPSB7fTtcbiAgY29uc29sZS5sb2cocm9vdEFQSSk7XG4gICRodHRwKHJvb3RBUEkgKyAnLycgKyB0aGlzLmFwaURhdGFPYmouaWQpXG4gIC5kZWxldGUocGFyYW1zKVxuICAudGhlbihjYWxsYmFja3MuZGVsZXRlU3VjY2Vzcy5iaW5kKGV2KSlcbiAgLmNhdGNoKGNhbGxiYWNrcy5lcnJvcik7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuaW5pdEFwaVRyZWUgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGluaXREYXRhID0ge1xuICAgIG5vZGVJZDogMCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIGxldCBmaXJzdENoaWxkRGF0YSA9IHtcbiAgICBub2RlSWQ6IDEsXG4gICAgZGF0YTogbGVhZkRhdGFQbGFjZUhvbGRlclxuICB9O1xuICB0aGlzLmFwaVRyZWUgPSBuZXcgVHJlZShpbml0RGF0YSk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoZmlyc3RDaGlsZERhdGEsIDAsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICBsZXQgdHJlZURvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGxldCBsZWFmRWxlO1xuICAgIGxldCBsZWFmQmluZERhdGE7XG4gICAgbm9kZS5wYXJlbnRJZCA9IG5vZGUucGFyZW50ID8gbm9kZS5wYXJlbnQubm9kZUlkIDogbnVsbDtcbiAgICBsZWFmRWxlID0gZ2VuZXJhdGVMZWFmKG5vZGUpO1xuICAgIGxlYWZCaW5kRGF0YSA9IHR3b1dheURhdGFCaW5kaW5nKGxlYWZEYXRhUGxhY2VIb2xkZXIsIGxlYWZFbGUpO1xuICAgIG5vZGUuZGF0YSA9IGxlYWZCaW5kRGF0YTtcbiAgICBpZiAobm9kZS5wYXJlbnRJZCA9PT0gbnVsbCB8fCBub2RlLnBhcmVudElkID09PSAnbnVsbCcpIGxlYWZFbGUuY2xhc3NMaXN0LmFkZCgncm9vdC1sZWFmJyk7XG4gICAgdHJlZURvY0ZyYWcuYXBwZW5kQ2hpbGQobGVhZkVsZSk7XG4gIH07XG5cbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKHRyZWVEb2NGcmFnKTtcblxuICByZXR1cm4gdGhpcy5hcGlUcmVlO1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5kZWxOb2RlID0gZnVuY3Rpb24oY3R4KSB7XG4gIHZhciBjdXJyZW50TGVhZiA9IGN0eC50YXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubm9kZUlkO1xuICB2YXIgcGFyZW50SWR4ID0gKCtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnRJZCA9PT0gMCkgPyAwIDogK2N0eC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudElkO1xuXG4gIHZhciBub2Rlc0FyciA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURlc2NlbmRhbnRzKGN1cnJlbnRJZHgpO1xuICB2YXIgaWR4QXJyID0gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycik7XG4gIHRoaXMuYXBpVHJlZS5yZW1vdmUoY3VycmVudElkeCwgcGFyZW50SWR4LCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG4gIHRoaXMucmVtb3ZlTm9kZXNGcm9tRG9tKGlkeEFycik7XG5cbiAgdmFyIG9iaiA9IHRoaXMuYXBpVHJlZS5hcHBseVN0eWxlKCk7XG4gIHRoaXMuc3R5bGVOb2RlcyhvYmopO1xuICB0aGlzLnNldFBhcmVudE5vZGVWYWwocGFyZW50SWR4KTtcbiAgdGhpcy5zY3JvbGxCYXIucmVuZGVyKCk7XG59O1xuQXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0Lm5vZGVJZCkgIT09IC0xKSB7XG4gICAgICB0aGlzLiRhcGlUcmVlLnJlbW92ZUNoaWxkKGFsbExlYXZlc1tpXSk7XG4gICAgfVxuICB9O1xufTtcbmZ1bmN0aW9uIG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpIHtcbiAgdmFyIG5vZGVzQXJyTGVuID0gbm9kZXNBcnIubGVuZ3RoO1xuICB2YXIgaWR4QXJyID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXNBcnJMZW47IGkrKykge1xuICAgIGlkeEFyci5wdXNoKG5vZGVzQXJyW2ldLm5vZGVJZCk7XG4gIH07XG4gIHJldHVybiBpZHhBcnI7XG59XG5cbkFwaURvbS5wcm90b3R5cGUuc2V0UGFyZW50Tm9kZVZhbCA9IGZ1bmN0aW9uKGlkeCkge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuICB2YXIgcXVldWUgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChpZHgpO1xuICB2YXIgcXVldWVMZW4gPSBxdWV1ZS5fbmV3ZXN0SW5kZXggLSBxdWV1ZS5fb2xkZXN0SW5kZXg7XG4gIGZvciAodmFyIGkgPSAwLCB4ID0gbGVhdmVzLmxlbmd0aDsgaSA8IHg7IGkrKykge1xuICAgIGlmICgrbGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkID09PSBpZHgpIHtcbiAgICAgIGlmIChxdWV1ZUxlbiA+IDApIHtcbiAgICAgICAgLy8gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZSA9ICcnO1xuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuICAgIH07XG4gIH07XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ID0gdGhpcy5hcGlUcmVlLm1heElkKCkgKyAxO1xuICB2YXIgcGFyZW50SWRleCA9ICtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5ub2RlSWQ7XG5cbiAgbGV0IGxlYWZDaGlsZCA9IGNyZWF0ZUxlYWYocGFyZW50SWRleCwgdGhpcy5sZWFmSW5kZXgpO1xuICBsZXQgY2hpbGRNb2RlbCA9IHR3b1dheURhdGFCaW5kaW5nKGxlYWZEYXRhUGxhY2VIb2xkZXIsIGxlYWZDaGlsZCk7XG4gIGxldCBsZWFmRGF0YSA9IHtcbiAgICBub2RlSWQ6IHRoaXMubGVhZkluZGV4LFxuICAgIGRhdGE6IGNoaWxkTW9kZWxcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLmFkZChsZWFmRGF0YSwgcGFyZW50SWRleCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGxlYWZDaGlsZCk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkZXgpO1xuICB0aGlzLnNjcm9sbEJhci5yZW5kZXIoKTtcbn07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWQsIG5vZGVJbmRleCkge1xuICB2YXIgbmV3TGVhZlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGVhZicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQnLCAnaGFzQ2hpbGQnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdiaW5kLXRvZ2dsZS1jbGFzcycsICcnKTtcbiAgbmV3TGVhZlNwYW4uZGF0YXNldC5wYXJlbnRJZCA9IHBhcmVudElkO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0Lm5vZGVJZCA9IG5vZGVJbmRleDtcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZlRwbCgpO1xuICByZXR1cm4gbmV3TGVhZlNwYW47XG59XG5mdW5jdGlvbiBjcmVhdGVMZWFmKHBhcmVudElkeCwgbm9kZUlkeCkge1xuICByZXR1cm4gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgpO1xufVxuQXBpRG9tLnByb3RvdHlwZS5zdHlsZU5vZGVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG5cbiAgbGV0IGxlYXZlc0hhc2ggPSB7fTtcbiAgZm9yIChsZXQgaSA9IDAsIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7IGkgPCBsZWF2ZXNMZW47IGkrKykge1xuICAgIGxlYXZlc0hhc2hbbGVhdmVzW2ldLmRhdGFzZXQubm9kZUlkXSA9IGxlYXZlc1tpXTtcbiAgfVxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZUlkIDw9IDApIHJldHVybjtcbiAgICBsZWF2ZXNIYXNoW25vZGUubm9kZUlkXS5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucm91bmQoKHBlckxlYWZXaWR0aCArIHBlclNWR1BhdGhXaWR0aCkgKiAobm9kZS5jb2x1bW4gLSAxKSkgKyAncHgsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgKiAocGVyTGVhZkhlaWdodCArIGxlYXZlc1ZlcnRpY2FsR2FwKSkgKyAncHgsIDApJztcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuXG4vKiB1dGlscyAqL1xuZnVuY3Rpb24gY2xvbmVSZWN0T2JqKG9iaikge1xuICByZXR1cm4ge1xuICAgIHRvcDogb2JqLnRvcCxcbiAgICBib3R0b206IG9iai5ib3R0b20sXG4gICAgbGVmdDogb2JqLmxlZnQsXG4gICAgcmlnaHQ6IG9iai5yaWdodCxcbiAgICB3aWR0aDogb2JqLndpZHRoLFxuICAgIGhlaWdodDogb2JqLmhlaWdodFxuICB9O1xufVxuXG4vKiBtYW5pcHVsYXRlIFNWRyAqL1xuQXBpRG9tLnByb3RvdHlwZS5jbGVhclNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXTtcbiAgd2hpbGUgKHN2Zy5sYXN0Q2hpbGQpIHtcbiAgICBzdmcucmVtb3ZlQ2hpbGQoc3ZnLmxhc3RDaGlsZCk7XG4gIH1cbn07XG4vKipcbiAqIFtkcmF3U1ZHIGRlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSBbZGVzY3JpcHRpb25dXG4gKi9cbkFwaURvbS5wcm90b3R5cGUuZHJhd1NWRyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNsZWFyU1ZHKCk7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIHN2Z1BhcnRpYWxzID0gW107XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBpZiAobm9kZS5wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgIHN2Z1BhcnRpYWxzLnB1c2godGhhdC5jcmVhdGVTaW5nbGVTVkcobm9kZS5ub2RlSWQsIG5vZGUuY29sdW1uLCBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCwgKG5vZGUudG90YWxvZmZzZXR5bGV2ZWwgLSBub2RlLnBhcmVudC50b3RhbG9mZnNldHlsZXZlbCkpKTtcbiAgICB9O1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG5cbiAgdmFyIGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3ZnUGFydGlhbHMubGVuZ3RoOyBpKyspIHtcbiAgICBkb2NGcmFnLmFwcGVuZENoaWxkKHN2Z1BhcnRpYWxzW2ldKTtcbiAgfVxuICB0aGlzLiRhcGlUcmVlRnJhbWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdLmFwcGVuZENoaWxkKGRvY0ZyYWcpO1xuXG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmNyZWF0ZVNpbmdsZVNWRyA9IGZ1bmN0aW9uKGlkeCwgaG9yaSwgcGFyZW50VmVydCwgZHZlcnQpIHtcblxuICB2YXIgc3ZnbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICB2YXIgbmV3UGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmducywgJ3BhdGgnKTtcbiAgdmFyIGNvbnRyb2xSYXRlID0gMC4yO1xuICB2YXIgbXgsIG15LCBxeCwgcXksIHF4eCwgcXl5LCB0eCwgdHk7XG4gIGhvcmkgPSBob3JpIC0gMTtcbiAgZHZlcnQgPSBkdmVydDtcbiAgcGFyZW50VmVydCA9IHBhcmVudFZlcnQ7XG5cbiAgbXggPSBob3JpICogNDkwOyAvKiBzaW5nbGUgbGVhZiB3aWR0aCBwbHVzIHNpbmdsZSBzdmcgcGF0aCB3aWR0aCAqL1xuICBteSA9IHBhcmVudFZlcnQgKiA1MiArIDg7XG4gIHF4ID0gbXggKyAxMDtcbiAgcXkgPSBteTtcbiAgcXh4ID0gbXggKyAxNTtcbiAgcXl5ID0gKG15ICsgKGR2ZXJ0IC8gMikgKiA1Mik7XG4gIHR4ID0gbXggKyAzMDtcbiAgdHkgPSBteSArIGR2ZXJ0ICogNTI7XG5cbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsICdNICcgKyBteCArICcgJyArIG15ICsgJyBRICcgKyBxeCArICcgJyArIHF5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxeHggKyAnICcgKyBxeXkgKyAnIFQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggKyAnICcgKyB0eSArICcnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FwaS1zdmctcGF0aCcpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1pZHgnLCBpZHgpO1xuXG4gIHJldHVybiBuZXdQYXRoO1xufTtcblxuLyogY2FsY3VsYXRlIGRpbWVuc2lvbnMgKi9cbkFwaURvbS5wcm90b3R5cGUuY2FsY0RpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcblxuICBob3JpQXJyID0gdGhpcy5hcGlUcmVlLmRlcHRoKCk7XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLmFwaVRyZWUuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgdGhpcy4kYXBpVHJlZUZyYW1lLnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVDb250ZW50LnN0eWxlLndpZHRoID0gaG9yaU1heCAqIDUyMCArICdweCc7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyIC0gKHZlcnRpY2FsTWF4ID4gMSA/IDEwIDogMCkgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlQ29udGVudC5zdHlsZS5oZWlnaHQgPSB2ZXJ0aWNhbE1heCAqIDUyIC0gKHZlcnRpY2FsTWF4ID4gMSA/IDEwIDogMCkgKyAncHgnO1xuICByZXR1cm4gW2hvcmlNYXgsIHZlcnRpY2FsTWF4XTtcblxufTtcblxuLyogY2FsY3VsYXRlIG9mZnNldCAqL1xuXG5BcGlEb20ucHJvdG90eXBlLm5vZGVMZWZ0T2Zmc2V0ID0gZnVuY3Rpb24oZWwpIHtcbiAgdmFyIGVsUmVjdE9iamVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgYm9keVJlY3RPYmogPSB0aGlzLiRhcGlUcmVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgY2xvbmVCb2R5UmVjdE9iaiA9IGNsb25lUmVjdE9iaihib2R5UmVjdE9iaik7XG4gIHZhciBjbG9uZUVsUmVjdE9iamVjdCA9IGNsb25lUmVjdE9iaihlbFJlY3RPYmplY3QpO1xuICBjbG9uZUVsUmVjdE9iamVjdC50b3AgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5ib3R0b20gKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai50b3ApO1xuICBjbG9uZUVsUmVjdE9iamVjdC5sZWZ0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnJpZ2h0ICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoubGVmdCk7XG4gIHJldHVybiBjbG9uZUVsUmVjdE9iamVjdDtcbn07XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGdldE1heE9mQXJyYXkobnVtQXJyYXkpIHtcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xuICByZXR1cm4gZWxlbS5jbGFzc05hbWUuc3BsaXQoJyAnKS5pbmRleE9mKGNsYXNzTmFtZSkgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXgoKSB7XG4gIHZhciB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSwgcHJlZml4ID0gJyc7XG4gIHByZWZpeCA9ICh1YS5pbmRleE9mKCdjaHJvbWUnKSA+PSAwIHx8IHdpbmRvdy5vcGVuRGF0YWJhc2UpID8gJy13ZWJraXQtJyA6ICh1YS5pbmRleE9mKCdmaXJlZm94JykgPj0gMCkgPyAnLW1vei0nIDogd2luZG93Lm9wZXJhID8gJy1vLScgOiAoZG9jdW1lbnQuYWxsICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA9PT0gLTEpID8gJy1tcy0nIDogJyc7XG4gIHJldHVybiBwcmVmaXg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oZWwpIHtcbiAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xuICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG5cbiAgaWYgKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xuICBpZiAocmVzdWx0c1sxXSA9PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuXG4gIHJlc3VsdHMucHVzaCgwKTtcbiAgcmV0dXJuIHJlc3VsdHMuc2xpY2UoNSwgOCk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbi8vICAgLy8gY2hyb21lIHdvbid0IHVzZSBwcmVmaXhcbi8vICAgLy8gdmFyIHN0eWxlX2F0dHIgPSBicm93c2VyUHJlZml4KCkgKyAndHJhbnNmb3JtJztcbi8vICAgdmFyIHN0eWxlX2F0dHIgPSAndHJhbnNmb3JtJztcbi8vICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHN0eWxlX2F0dHIpO1xuLy8gICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XG4vLyAgIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbi8vICAgaWYgKHJlc3VsdHNbMV0gPT09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XG4vLyAgIHJlc3VsdHMucHVzaCgwKTtcbi8vICAgcmV0dXJuICsocmVzdWx0cy5zbGljZSg1LCA4KVswXSk7IC8vIHJldHVybnMgdGhlIFtYLFksWiwxXSB2YWx1ZXNcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVgoZWwpIHtcbiAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZSgnc3R5bGUnKS5zcGxpdCgndHJhbnNsYXRlM2QnKVsxXS5zcGxpdCgnLCAnKVswXS5zbGljZSgxKS5zcGxpdCgncHgnKVswXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zbGF0ZVkob2JqKSB7XG4gIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHJldHVybjtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxuICAgICAgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtIHx8IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gIHZhciBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gIGlmIChtYXQpIHJldHVybiBwYXJzZUZsb2F0KG1hdFsxXS5zcGxpdCgnLCAnKVsxM10pO1xuICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICByZXR1cm4gbWF0ID8gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbNV0pIDogMDtcbn1cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT09ICdvYmplY3QnID9cbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcbiAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0ci5qb2luKCcmJyk7XG59XG5cblxuLyoqXG4gKiBbc3RyaW5naWZ5IHdpdGggNCBzcGFjZXMgYXQgZWFjaCBsZXZlbF1cbiAqIEBwYXJhbSAge1tvYmplY3RdfSBqc09iaiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxuICogSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIFwiXFx0XCIpOyAvLyBzdHJpbmdpZnkgd2l0aCB0YWJzIGluc2VydGVkIGF0IGVhY2ggbGV2ZWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoanNPYmosIG51bGwsIDQpO1xufVxuXG4vKipcbiAqIFtoaWdodGxpZ2h0SlNPTiB3b3JrcyBvbiBKU09OIG9iamVjdCwgbm90IHN0cmluZ11cbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge3N0cmluZ30gICAgICBbZGVzY3JpcHRpb25dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XG4gIGpzb24gPSBKU09OLnN0cmluZ2lmeShqc29uLCB1bmRlZmluZWQsIDQpO1xuICBqc29uID0ganNvbi5yZXBsYWNlKC8mL2csICcmYW1wOycpLnJlcGxhY2UoLzwvZywgJyZsdDsnKS5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICB2YXIgY2xzID0gJ251bWJlcic7XG4gICAgaWYgKC9eXCIvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xuICAgICAgICBjbHMgPSAna2V5JztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNscyA9ICdzdHJpbmcnO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnYm9vbGVhbic7XG4gICAgfSBlbHNlIGlmICgvbnVsbC8udGVzdChtYXRjaCkpIHtcbiAgICAgIGNscyA9ICdudWxsJztcbiAgICB9XG4gICAgcmV0dXJuICc8c3BhbiBjbGFzcz1cIicgKyBjbHMgKyAnXCI+JyArIG1hdGNoICsgJzwvc3Bhbj4nO1xuICB9KTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJpbXBvcnQge2ZsYXNoLCBwYXJzZUFuZEZsYXNofSBmcm9tICcuL2ZsYXNoJztcbmV4cG9ydCBsZXQgY2FsbGJhY2tzID0ge1xuICBkZWxldGVTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgZnVuY3Rpb24gZGVzdG9yeUFwaUxpKCkge1xuICAgICAgdGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS11bCcpLnJlbW92ZUNoaWxkKHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktbGknKSk7XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSwgZGVzdG9yeUFwaUxpLmJpbmQodGhpcykpO1xuICB9LFxuICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gIH0sXG4gIGVycm9yOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhKTtcbiAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NhbGxiYWNrcy5qcyIsImltcG9ydCB7cm9yUGFyYW1zIGFzIFJQc30gZnJvbSAnLi4vY29tbW9uL2NzcmYnO1xuLyoqXG4gKiBbaGFuZGxlTWV0aG9kIGRlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7SFRNTEVsZW1lbnR9IGxpbmsgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEhhbmRsZXMgXCJkYXRhLW1ldGhvZFwiIG9uIGxpbmtzIHN1Y2ggYXM6XG4gKiA8YSBocmVmPVwiL3VzZXJzLzVcIiBkYXRhLW1ldGhvZD1cImRlbGV0ZVwiIHJlbD1cIm5vZm9sbG93XCIgZGF0YS1jb25maXJtPVwiQXJlIHlvdSBzdXJlP1wiPkRlbGV0ZTwvYT5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZU1ldGhvZChsaW5rLCBvYmogPSB7fSkge1xuICB2YXIgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgbWV0aG9kID0gbGluay5kYXRhc2V0Lm1ldGhvZCxcbiAgICB0YXJnZXQgPSBsaW5rLmdldEF0dHJpYnV0ZSgndGFyZ2V0JyksXG4gICAgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpLFxuICAgIGNzcmZQYXJhbSA9IFJQcy5jc3JmUGFyYW0oKTtcbiAgdmFyIHBhcmFtc09iaiA9IHtcbiAgICBocmVmOiBocmVmLFxuICAgIG1ldGhvZDogbWV0aG9kLFxuICAgIHRhcmdldDogdGFyZ2V0LFxuICAgIGNzcmZUb2tlbjogY3NyZlRva2VuLFxuICAgIGNzcmZQYXJhbTogY3NyZlBhcmFtXG4gIH07XG4gIHZhciBmb3JtRWxlID0gY3JlYXRlRm9ybShwYXJhbXNPYmosIG9iaik7XG4gIGFwcGVuZEZvcm1Ub0RvbShmb3JtRWxlKTtcbiAgc3VibWl0Rm9ybShmb3JtRWxlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvcm0ocGFyYW1zLCBvYmopIHtcbiAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gIGYuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZi5zZXRBdHRyaWJ1dGUoJ21ldGhvZCcsJ3Bvc3QnKTtcbiAgZi5zZXRBdHRyaWJ1dGUoJ2FjdGlvbicscGFyYW1zLmhyZWYpO1xuICBpZiAocGFyYW1zLnRhcmdldCkge1xuICAgIGYuc2V0QXR0cmlidXRlKCd0YXJnZXQnLCBwYXJhbXMudGFyZ2V0KTtcbiAgfTtcblxuICB2YXIgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIGkuc2V0QXR0cmlidXRlKCd0eXBlJywnaGlkZGVuJyk7XG4gIGkuc2V0QXR0cmlidXRlKCduYW1lJywnX21ldGhvZCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndmFsdWUnLHBhcmFtcy5tZXRob2QpO1xuXG4gIHZhciBzO1xuICBpZiAocGFyYW1zLmNzcmZQYXJhbSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBwYXJhbXMuY3NyZlRva2VuICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICFSUHMuaXNDcm9zc0RvbWFpbihwYXJhbXMuaHJlZikpIHtcbiAgICBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAgIHMuc2V0QXR0cmlidXRlKCduYW1lJywgcGFyYW1zLmNzcmZQYXJhbSk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMuY3NyZlRva2VuKTtcbiAgfVxuICBmLmFwcGVuZENoaWxkKGkpO1xuXG4gIC8vIGZvciAobGV0IGtleSBpbiBvYmouZGF0YSkge1xuICAvLyAgIGlmIChvYmouZGF0YS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gIC8vICAgICBsZXQgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCcnICsgb2JqLm5zICsgJ1snICsga2V5ICsgJ10nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCd2YWx1ZScsb2JqLmRhdGFba2V5XSk7XG4gIC8vICAgICBmLmFwcGVuZENoaWxkKHQpO1xuICAvLyAgIH1cbiAgLy8gfVxuXG4gIGlmIChzKSB7XG4gICAgZi5hcHBlbmRDaGlsZChzKTtcbiAgfTtcbiAgcmV0dXJuIGY7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZvcm1Ub0RvbShmb3JtKSB7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG59XG5mdW5jdGlvbiBzdWJtaXRGb3JtKGZvcm0pIHtcbiAgZm9ybS5zdWJtaXQoKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaGFuZGxlTWV0aG9kLmpzIiwiZXhwb3J0IGZ1bmN0aW9uIGh0bWxFc2NhcGUoc3RyKSB7XG5cdHN0ciA9ICcnICsgc3RyOyAvLyBmb3IgbnVtYmVycyBldGMuXG4gIHJldHVybiBzdHIucmVwbGFjZSgvJi9nLCAnJmFtcDsnKSAvLyBmaXJzdCFcbiAgICAgICAgICAgIC5yZXBsYWNlKC8+L2csICcmZ3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcbiAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csICcmIzM5OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvYC9nLCAnJiM5NjsnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vaHRtbEVzY2FwZS5qcyIsImltcG9ydCB7c3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2Nyb2xsU3RyKCkge1xuICBsZXQgc2Nyb2xsU3RyID0gYFxuICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtYXhpc1wiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtc2xpZGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtcy10b3BcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1zLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXMtYmxvY2tcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYDtcbiAgcmV0dXJuIHNjcm9sbFN0cjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjcm9sbEJhckgoYikge1xuICByZXR1cm4gbmV3IGEoYik7XG59XG5cbmZ1bmN0aW9uIGEoeCkge1xuICB2YXIgcSA9IHRoaXM7XG4gIHRoaXMub3B0aW9ucyA9IHg7XG4gIGxldCBuZXdTY3JvbGxTdHIgPSBnZW5lcmF0ZVNjcm9sbFN0cigpO1xuICBsZXQgbmV3U2Nyb2xsRWxlID0gc3RyVG9Eb20obmV3U2Nyb2xsU3RyKTtcbiAgdmFyIFkgPSB4LnNjcm9sbGJhciB8fCBuZXdTY3JvbGxFbGVcbiAgICAsIGogPSB4LmNvbnRlbnRcbiAgICAsIE4gPSB4Lm92ZXJmbG93RWxlXG4gICAgLCBpID0geC5pbml0UG9zIHx8IDBcbiAgICAsIE0gPSB4LmluaXREb20gfHwgbnVsbFxuICAgICwgVSA9IHgubW91c2V3aGVlbCB8fCB0cnVlXG4gICAgLCBsID0geC5tb3VzZXdoZWVsbG9jayB8fCBmYWxzZVxuICAgICwgSCA9IHgud2hlZWxkZWx0YSB8fCAxXG4gICAgLCB6ID0geC5jdHJsYmxvY2sgfHwgMFxuICAgICwgSiA9IHguc3RlcCB8fCAwLjFcbiAgICAsIHIgPSB4Lmxlbmd0aFxuICAgICwgSSA9IHguc2NhbGUgfHwgMFxuICAgICwgRyA9IHgudGhlbWUgfHwgJydcbiAgICAsIGFkID0geC5yZWZyZXNoIHx8IGZhbHNlO1xuICB2YXIgUyA9IDAsIFQgPSAwLCBoID0gMCwgViA9IGZ1bmN0aW9uKGFnKSB7XG4gICAgdmFyIGFmID0gcGFyc2VJbnQoUyAtIFQpO1xuICAgIGlmIChhZiA+IDApIHtcbiAgICAgIHZhciBhZyA9IGFnLnZhbHVlO1xuICAgICAgai5zY3JvbGxMZWZ0ID0gYWYgKiBhZztcbiAgICB9XG4gIH1cbiAgLFxuICAgIHYgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtYXhpcycpWzBdLFxuICBnID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXNsaWRlcicpWzBdLFxuICB1ID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXMtdG9wJylbMF0sXG4gIEYgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtcy1ib3R0b20nKVswXSxcbiAgYWUgPSBuZXdTY3JvbGxFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnb3B1aS1zY3JvbGwtcy1ibG9jaycpWzBdLFxuICBXID0gMCwgUSA9IHogfHwgMCwgayA9IDAsIFIgPSBRLCBtID0gMCwgQyA9IDAsIEwgPSAwLCBkID0gMCwgdCA9IG51bGwgLCBiID0gbnVsbCAsIGFiLCBQLCBEO1xuICB2YXIgeSA9IGZ1bmN0aW9uKCkge1xuICAgIFggPSBmYWxzZTtcbiAgICBjID0gZmFsc2U7XG4gIH1cbiAgO1xuICBpZiAoIXguc2Nyb2xsYmFyKSB7XG4gICAgeC53cmFwcGVyLmFwcGVuZENoaWxkKG5ld1Njcm9sbEVsZSk7XG4gIH1cbiAgai5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLWNvbnRlbnQnKTtcbiAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbCcpO1xuICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKGFnKSB7XG4gICAgaWYgKCFhZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChEKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIFQgPSBqLm9mZnNldFdpZHRoO1xuICAgICAgaCA9IFkub2Zmc2V0V2lkdGg7XG4gICAgICBTID0gTi5vZmZzZXRXaWR0aDtcbiAgICB9IGNhdGNoIChhaCkge31cbiAgICBXID0gYWcgfHwgciB8fCBUIC0gMjtcbiAgICBZLnN0eWxlLndpZHRoID0gVyArICdweCc7XG4gICAgdi5zdHlsZS53aWR0aCA9IFcgKyAncHgnO1xuICAgIGlmIChXID49IDAgJiYgUyA+PSAwKSB7XG4gICAgICBpZiAoUyA8PSBXICsgMikge1xuICAgICAgICBZLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBZLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfVxuICAgICAgaWYgKEkgIT0gKFMgLyBXKSkge1xuICAgICAgICBJID0gUyAvIFc7XG4gICAgICAgIG8oSSk7XG4gICAgICAgIFoocS5tZW1PZmZzZXRYKTtcbiAgICAgIH1cbiAgICAgIHZhciBhZiA9IDA7XG4gICAgICBpZiAoTSkge1xuICAgICAgICBpZiAoTS5vZmZzZXRMZWZ0ICsgTS5zY3JvbGxXaWR0aCA+PSBTKSB7XG4gICAgICAgICAgYWYgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChNLm9mZnNldExlZnQgKyBNLnNjcm9sbFdpZHRoIDw9IFQpIHtcbiAgICAgICAgICAgIGFmID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWYgPSBNLm9mZnNldExlZnQgLyBTO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhhZik7XG4gICAgICAgIFooYWYpO1xuICAgICAgfVxuICAgICAgaWYgKGkpIHtcbiAgICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICAgIFooaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIDtcbiAgRCA9IHNldEludGVydmFsKHRoaXMucmVuZGVyLCA1MCk7XG4gIC8vIFkuaW5uZXJIVE1MID0gJyc7XG5cbiAgZy5vbkRyYWdzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICA7XG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgZy5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1zbGlkZXItaG92ZXInKTtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gIH0pO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtc2xpZGVyLXRvdWNoJyk7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICB9KTtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLWhvdmVyJyk7XG4gIH0pO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci10b3VjaCcpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgfSk7XG4gIFkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLXRvdWNoJyk7XG4gIH0pO1xuICB2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcyk7XG4gIGlmIChVICYmICF0aGlzLm9ud2hlZWwpIHtcbiAgICBpZiAoIWouY2xhc3NMaXN0LmNvbnRhaW5zKCdvcHVpLXNjcm9sbC1vbndoZWVsJykpIHtcbiAgICAgIGouYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwKTtcbiAgICAgIGouYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHApO1xuICAgICAgai5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1vbndoZWVsJyk7XG4gICAgfVxuICB9XG4gIGlmIChqKSB7XG4gICAgai5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghZCkge1xuICAgICAgICBaKGouc2Nyb2xsTGVmdCAvIChqLnNjcm9sbFdpZHRoIC0gai5vZmZzZXRXaWR0aCksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihhZikge1xuICAgIHQgPSBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0O1xuICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgO1xuICAgIGIgPSB3aW5kb3cuc2V0SW50ZXJ2YWwobiwgNDApO1xuICAgIE4uc3R5bGVbJy1tb3otdXNlci1zZWxlY3QnXSA9ICdub25lJztcbiAgICBOLnN0eWxlWyctd2Via2l0LXVzZXItc2VsZWN0J10gPSAnbm9uZSc7XG5cbiAgICBMID0gYWYuY2xpZW50WCAtIGcub2Zmc2V0TGVmdDtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYWEpO1xuICAgIGQgPSAxO1xuICAgIGFmLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgZnVuY3Rpb24gSyhhZywgYWgsIGFmKSB7XG4gICAgaWYgKGFmKSB7XG4gICAgICBhZyA9IGFnID4gYWYgPyBhZiA6IGFnO1xuICAgIH1cbiAgICByZXR1cm4gYWcgPj0gYWggPyBhZyA6IGFoO1xuICB9XG4gIGZ1bmN0aW9uIG4oKSB7XG4gICAgVi5jYWxsKHdpbmRvdywge1xuICAgICAgdmFsdWU6IEMsXG4gICAgICBzY2FsZTogSVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIE8oKSB7XG4gICAgaWYgKGFiKSB7XG4gICAgICBjbGVhckludGVydmFsKGFiKTtcbiAgICB9XG4gICAgRSgpO1xuICAgIGFiID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoWCkge1xuICAgICAgICBFKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbGVhckludGVydmFsKGFiKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG4gIGZ1bmN0aW9uIGFjKCkge1xuICAgIGlmIChQKSB7XG4gICAgICBjbGVhckludGVydmFsKFApO1xuICAgIH1cbiAgICBCKCk7XG4gICAgUCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgQigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChQKTtcbiAgICAgIH1cbiAgICB9LCAxMDApO1xuICB9XG4gIGZ1bmN0aW9uIEUoKSB7XG4gICAgdmFyIGFmID0gQyAtIEo7XG4gICAgYWYgPSAoYWYgPCAwKSA/IDAgOiBhZjtcbiAgICBaKGFmKTtcbiAgfVxuICBmdW5jdGlvbiBCKCkge1xuICAgIHZhciBhZiA9IEMgKyBKO1xuICAgIGFmID0gKGFmID4gMSkgPyAxIDogYWY7XG4gICAgWihhZik7XG4gIH1cbiAgZnVuY3Rpb24gZihhZikge1xuICAgIGFmID0gd2luZG93LmV2ZW50IHx8IGFmO1xuICAgIHZhciBhZyA9IEsoYWYuY2xpZW50WCAtIEwsIFIsIG0pO1xuICAgIEMgPSAoYWcgLSBSKSAvIChtIC0gUik7XG4gICAgZy5zdHlsZS5sZWZ0ID0gYWcgKyAncHgnO1xuICAgIHEubWVtT2Zmc2V0WCA9IGFnO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBmdW5jdGlvbiBhYSgpIHtcbiAgICBZLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLWhvdmVyJyk7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLWhvdmVyJyk7XG4gICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1zbGlkZXItdG91Y2gnKTtcbiAgICBOLnN0eWxlWyctbW96LXVzZXItc2VsZWN0J10gPSAnJztcbiAgICBOLnN0eWxlWyctd2Via2l0LXVzZXItc2VsZWN0J10gPSAnJztcbiAgICBpZiAoYikge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoYik7XG4gICAgfVxuICAgIGlmICh0KSB7XG4gICAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGYpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBhYSk7XG4gICAgZy5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1zbGlkZXInKTtcbiAgICBkID0gMDtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gcyhhZikge1xuICAgIFooKGFmLm9mZnNldFggfHwgYWYubGF5ZXJYKSAvIFcpO1xuICB9XG4gIGZ1bmN0aW9uIFooYWgsIGFmKSB7XG4gICAgYWggPSBhaCA8IDAgPyAwIDogYWg7XG4gICAgYWggPSBhaCA+IDEgPyAxIDogYWg7XG4gICAgQyA9IGFoO1xuICAgIHZhciBhZyA9IChtIC0gUikgKiBDICsgUjtcbiAgICBnLnN0eWxlLmxlZnQgPSBhZyArICdweCc7XG4gICAgcS5tZW1PZmZzZXRYID0gYWc7XG4gICAgaWYgKCFhZikge1xuICAgICAgbigpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwKGFmKSB7XG4gICAgLy8gYWYucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBhZiA9IGFmLm9yaWdpbmFsRXZlbnQ7XG4gICAgLy8gaWYgKGFmKSB7XG4gICAgLy8gICB0aGlzLm9ud2hlZWwgPSAxO1xuICAgIC8vICAgdmFyIGFpID0gKC1hZi53aGVlbERlbHRhIHx8IChhZi5kZXRhaWwgJiYgYWYuZGV0YWlsICogNDApIHx8IDApIC8gSDtcbiAgICAvLyAgIHZhciBhaCA9IGFpO1xuICAgIC8vICAgdmFyIGFnID0gYWggPiAwID8gai5zY3JvbGxMZWZ0ICsgMiA6IGouc2Nyb2xsTGVmdCAtIDI7XG4gICAgLy8gICBOLnN0eWxlLnpvb20gPSAnMSc7XG4gICAgLy8gICBpZiAoYWcgPiAwICYmIChhZyA8IChOLm9mZnNldFdpZHRoIC0gai5vZmZzZXRXaWR0aCArIDUpIHx8IChOLm9mZnNldFdpZHRoIC0gai5zY3JvbGxXaWR0aCA8IDAgJiYgYWggPCAwKSkpIHtcbiAgICAvLyAgICAgai5zY3JvbGxMZWZ0ICs9IGFoO1xuICAgIC8vICAgICBDID0gai5zY3JvbGxMZWZ0IC8gKGouc2Nyb2xsV2lkdGggLSBqLm9mZnNldFdpZHRoKTtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIGlmICghbCB8fCBZLnN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnKSB7XG4gICAgLy8gICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQgKz0gYWg7XG4gICAgLy8gICAgICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICs9IGFoO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICB9XG4gIGZ1bmN0aW9uIG8oYWYpIHtcbiAgICBJID0gKGFmID4gMTApID8gMTAgOiBhZjtcbiAgICBpZiAoSSA8PSAxKSB7XG4gICAgICBnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgdmFyIGFnID0gVyAtIDIgKiBRO1xuICAgIGsgPSBwYXJzZUludChhZyAvIEkpO1xuICAgIGsgPSAoayA8IDE1KSA/IDE1IDogaztcbiAgICBtID0gVyAtIFEgLSBrO1xuICAgIGcuc3R5bGUud2lkdGggPSBrICsgJ3B4JztcbiAgfVxuICBpZiAoSSA+IDEpIHtcbiAgICBvKEkpO1xuICB9XG4gIGxldCBkZWJvdW5jZWRXaW5kb3dSZXNpemUgPSBkZWJvdW5jZShyZVJlbmRlciwgMjAwLCBmYWxzZSk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZWRXaW5kb3dSZXNpemUpO1xuICBmdW5jdGlvbiByZVJlbmRlcigpIHtcbiAgICBxLnJlbmRlcigpO1xuICB9XG4gIHRoaXMuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0KSB7XG4gICAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfVxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGYpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBhYSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHkpO1xuICAgIGlmIChiKSB7XG4gICAgICBjbGVhckludGVydmFsKGIpO1xuICAgIH1cbiAgICBpZiAoYWIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoYWIpO1xuICAgIH1cbiAgICBpZiAoUCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChQKTtcbiAgICB9XG4gICAgaWYgKEQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoRCk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zY3JvbGwuanMiLCIvKipcbiAqIFtzZXJpYWxpemUgY29udmVydHMgcmVjdXJzaXZlIG9iamVjdHNdXG4gKiBAcGFyYW0gIHtbdHlwZV19IG9iaiAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHByZWZpeCBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBjb25zb2xlLmxvZyhzZXJpYWxpemUoe2ZvbzogXCJoaSB0aGVyZVwiLCBiYXI6IHsgYmxhaDogMTIzLCBxdXV4OiBbMSwgMiwgM10gfX0pKTtcbiAqIGZvbz1oaSUyMHRoZXJlJmJhciU1QmJsYWglNUQ9MTIzJmJhciU1QnF1dXglNUQlNUIwJTVEPTEmYmFyJTVCcXV1eCU1RCU1QjElNUQ9MiZiYXIlNUJxdXV4JTVEJTVCMiU1RD0zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXJpYWxpemUob2JqLCBwcmVmaXgpIHtcbiAgdmFyIHN0ciA9IFtdO1xuICBmb3IgKHZhciBwIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocCkpIHtcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgJ1snICsgcCArICddJyA6IHAsIHYgPSBvYmpbcF07XG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zZXJpYWxpemUuanMiLCJpbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuZXhwb3J0IGZ1bmN0aW9uIHNsaWRlKGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGxldCBzbGlkZUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzbGlkZUVsZS5jbGFzc0xpc3QuYWRkKCdzbGlkZS1sYXllcicpO1xuICBzbGlkZUVsZS5pbm5lckhUTUwgPSBnZW5lcmF0ZVNsaWRlVHBsKHBhcmFtcy5jb250ZW50KTtcbiAgcG9zaXRpb25TbGlkZUVsZShzbGlkZUVsZSwgZXYpO1xuICBiaW5kU2xpZGVFdmVudHMoc2xpZGVFbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzbGlkZUVsZSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU2xpZGVUcGwoY29udGVudCkge1xuICBsZXQgdHBsID0gYFxuICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1zaGFkb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1jb250ZW50XCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzbGlkZS10ZXh0XCI+JHtjb250ZW50fTwvZGl2PlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwic2xpZGUtYnRuc1wiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwic2xpZGUtYnRuIHNsaWRlLWNhbmNlbC1idG5cIj5jYW5jZWw8L3NwYW4+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJzbGlkZS1idG4gc2xpZGUtY29uZmlybS1idG5cIj5jb25maXJtPC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXHRgO1xuICByZXR1cm4gdHBsO1xufVxuXG5mdW5jdGlvbiBiaW5kU2xpZGVFdmVudHMoZWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGUtY2FuY2VsLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VTbGlkZSk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1zaGFkb3cnKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrU2hhZG93KTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlLWNvbmZpcm0tYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb25maXJtLmJpbmQodGhpcywgZXYsIGVsZSwgcGFyYW1zLCBjYWxsYmFjaykpO1xufVxuXG5mdW5jdGlvbiBjb25maXJtKGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgY2FsbGJhY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xufVxuXG5mdW5jdGlvbiBwb3NpdGlvblNsaWRlRWxlKGVsZSwgY29vcmRpbmF0ZXMpIHtcbiAgLy8gZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlLWNvbnRlbnQnKVswXS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIGNvb3JkaW5hdGVzLmNsaWVudFggKyAncHgsICcgKyBjb29yZGluYXRlcy5jbGllbnRZICsgJ3B4LCAwKSc7XG59XG5cbmZ1bmN0aW9uIGNsaWNrU2hhZG93KGV2KSB7XG4gIGlmIChldi50YXJnZXQgIT09IGV2LmN1cnJlbnRUYXJnZXQpIHJldHVybjtcbiAgcG9wdXAoZXYsIHVuZGVmaW5lZCwgY2xvc2VTbGlkZS5iaW5kKHRoaXMsIGV2KSk7XG59XG5cbmZ1bmN0aW9uIGNsb3NlU2xpZGUoZXYpIHtcbiAgbGV0IHBvcExheWVyID0gZXYudGFyZ2V0LmNsb3Nlc3QoJy5zbGlkZS1sYXllcicpO1xuICBpZiAocG9wTGF5ZXIpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcExheWVyKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9zbGlkZS5qcyIsImltcG9ydCB7aHRtbEVzY2FwZX0gZnJvbSAnLi9odG1sRXNjYXBlJztcbmV4cG9ydCBmdW5jdGlvbiBodG1sKGxpdGVyYWxTZWN0aW9ucywgLi4uc3Vic3RzKSB7XG4gIC8vIFVzZSByYXcgbGl0ZXJhbCBzZWN0aW9uczogd2UgZG9u4oCZdCB3YW50XG4gIC8vIGJhY2tzbGFzaGVzIChcXG4gZXRjLikgdG8gYmUgaW50ZXJwcmV0ZWRcbiAgbGV0IHJhdyA9IGxpdGVyYWxTZWN0aW9ucy5yYXc7XG5cbiAgbGV0IHJlc3VsdCA9ICcnO1xuXG4gIHN1YnN0cy5mb3JFYWNoKChzdWJzdCwgaSkgPT4ge1xuICAgIC8vIFJldHJpZXZlIHRoZSBsaXRlcmFsIHNlY3Rpb24gcHJlY2VkaW5nXG4gICAgLy8gdGhlIGN1cnJlbnQgc3Vic3RpdHV0aW9uXG4gICAgbGV0IGxpdCA9IHJhd1tpXTtcblxuICAgIC8vIEluIHRoZSBleGFtcGxlLCBtYXAoKSByZXR1cm5zIGFuIGFycmF5OlxuICAgIC8vIElmIHN1YnN0aXR1dGlvbiBpcyBhbiBhcnJheSAoYW5kIG5vdCBhIHN0cmluZyksXG4gICAgLy8gd2UgdHVybiBpdCBpbnRvIGEgc3RyaW5nXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3Vic3QpKSB7XG4gICAgICBzdWJzdCA9IHN1YnN0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBzdWJzdGl0dXRpb24gaXMgcHJlY2VkZWQgYnkgYSBkb2xsYXIgc2lnbixcbiAgICAvLyB3ZSBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIGluIGl0XG4gICAgaWYgKGxpdC5lbmRzV2l0aCgnJCcpKSB7XG4gICAgICBzdWJzdCA9IGh0bWxFc2NhcGUoc3Vic3QpO1xuICAgICAgbGl0ID0gbGl0LnNsaWNlKDAsIC0xKTtcbiAgICB9XG4gICAgcmVzdWx0ICs9IGxpdDtcbiAgICByZXN1bHQgKz0gc3Vic3Q7XG4gIH0pO1xuICAvLyBUYWtlIGNhcmUgb2YgbGFzdCBsaXRlcmFsIHNlY3Rpb25cbiAgLy8gKE5ldmVyIGZhaWxzLCBiZWNhdXNlIGFuIGVtcHR5IHRlbXBsYXRlIHN0cmluZ1xuICAvLyBwcm9kdWNlcyBvbmUgbGl0ZXJhbCBzZWN0aW9uLCBhbiBlbXB0eSBzdHJpbmcpXG4gIHJlc3VsdCArPSByYXdbcmF3Lmxlbmd0aCAtIDFdOyAvLyAoQSlcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qcyIsIi8vIGxlZnQ6IDM3LCB1cDogMzgsIHJpZ2h0OiAzOSwgZG93bjogNDAsXG4vLyBzcGFjZWJhcjogMzIsIHBhZ2V1cDogMzMsIHBhZ2Vkb3duOiAzNCwgZW5kOiAzNSwgaG9tZTogMzZcbnZhciBrZXlzID0gezM3OiAxLCAzODogMSwgMzk6IDEsIDQwOiAxfTtcblxuZnVuY3Rpb24gcHJldmVudERlZmF1bHQoZSkge1xuICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gIGlmIChlLnByZXZlbnREZWZhdWx0KVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyhlKSB7XG4gIGlmIChrZXlzW2Uua2V5Q29kZV0pIHtcbiAgICBwcmV2ZW50RGVmYXVsdChlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTY3JvbGwoKSB7XG4gIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikgLy8gb2xkZXIgRkZcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIHByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gIHdpbmRvdy5vbndoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG1vZGVybiBzdGFuZGFyZFxuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gcHJldmVudERlZmF1bHQ7IC8vIG9sZGVyIGJyb3dzZXJzLCBJRVxuICB3aW5kb3cub250b3VjaG1vdmUgID0gcHJldmVudERlZmF1bHQ7IC8vIG1vYmlsZVxuICBkb2N1bWVudC5vbmtleWRvd24gID0gcHJldmVudERlZmF1bHRGb3JTY3JvbGxLZXlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIpXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub25tb3VzZXdoZWVsID0gZG9jdW1lbnQub25tb3VzZXdoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9ud2hlZWwgPSBudWxsO1xuICB3aW5kb3cub250b3VjaG1vdmUgPSBudWxsO1xuICBkb2N1bWVudC5vbmtleWRvd24gPSBudWxsO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90b2dnbGVTY3JvbGwuanMiLCJmdW5jdGlvbiBzZXRGb2N1cyhlbCkge1xuICB2YXIgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICB2YXIgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICByYW5nZS5zZXRTdGFydChlbCwgMCk7XG4gIHJhbmdlLmNvbGxhcHNlKHRydWUpO1xuICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHNlbC5hZGRSYW5nZShyYW5nZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdHdlZXRCb3goKSB7XG4gIHZhciBkb2MgPSBkb2N1bWVudDtcbiAgdmFyIHRiID0gZG9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3R3ZWV0LWJveCcpWzBdO1xuICBpZiAoIXRiKSByZXR1cm4gbnVsbDtcbiAgdmFyIHRiZCA9IHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgdmFyIHRiZFN0cmluZyA9ICc8ZGl2Pjxicj48L2Rpdj4nO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdjb25kZW5zZWQnKTtcbiAgICBpZiAodGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpICYmIHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXS5pbm5lclRleHQudHJpbSgpLmxlbmd0aCkge1xuXG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGIuY2xhc3NMaXN0LmFkZCgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfVxuICAgIGlmICh0YmQuaW5uZXJIVE1MID09PSAnV2hhdFxcJ3MgaGFwcGVuaW5nPycpIHtcblxuICAgICAgdGJkLmlubmVySFRNTCA9ICc8YnI+JztcbiAgICB9XG4gIH0pO1xuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmlubmVySFRNTCkge1xuICAgICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgICB9IGVsc2Uge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmlubmVySFRNTCA9IHRiZFN0cmluZztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcblxuICAgICAgfSwgMCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KSB7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0udGV4dENvbnRlbnQpIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH07XG4gICAgaWYgKHRiLmlubmVySFRNTCA9PT0gJzxicj4nKSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRGb2N1cyh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0pO1xuICAgIH1cbiAgfSk7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL3R3ZWV0Qm94LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGUubDsgfVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZS5pOyB9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJpbXBvcnQge0FjdGlvbkNhYmxlfSBmcm9tICcuL2NvbW1vbi9BY3Rpb25DYWJsZSc7XG5pbXBvcnQge2RhdGFMaW5rc30gZnJvbSAnLi9tb2R1bGVzL2RhdGFMaW5rcyc7XG5pbXBvcnQge2hvbWV9IGZyb20gJy4vbW9kdWxlcy9ob21lcGFnZSc7XG5cbmltcG9ydCB7aW5pdFhocn0gZnJvbSAnLi9tb2R1bGVzL2FwaU9wZXJhdGlvbic7XG5kYXRhTGlua3MoKTtcbmltcG9ydCB7ZmNwfSBmcm9tICcuL21vZHVsZXMvZmlzQ2lQbHVnaW5zJztcbi8vIGFwaVRyZWUoKTtcbi8vIHZhciBwID0gbmV3IGRhd25TVkcoKTtcbi8vIHAuaW5pdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFpbnRlci10YXJnZXQnKSk7XG4vLyBwLnN0YXJ0KCk7XG5cbigoKSA9PiB7XG4gIGxldCByb3V0ZXMgPSB7XG4gICAgJy8nOiBob21lLFxuICAgICcvZGV2JzogW2luaXRYaHJdLFxuICAgICcvZmlzX2NpX3BsdWdpbnMvbmV3JzogZmNwLFxuICAgICcvZmlzX2NpX3BsdWdpbnMnOiBmY3BcbiAgfTtcbiAgbGV0IHBhdGhOYW1lID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAocm91dGVzLmhhc093blByb3BlcnR5KHBhdGhOYW1lKSkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocm91dGVzW3BhdGhOYW1lXSkgPT09ICdbb2JqZWN0IEFycmF5XScgJiZcbiAgICAgIHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlc1twYXRoTmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcm91dGVzW3BhdGhOYW1lXVtpXS5hcHBseShudWxsKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcm91dGVzW3BhdGhOYW1lXS5hcHBseShudWxsKTtcbiAgICB9XG4gIH1cblxufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBwbGljYXRpb24uanMiXSwic291cmNlUm9vdCI6IiJ9