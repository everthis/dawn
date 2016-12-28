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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fcp = fcp;

var _ajax = __webpack_require__(/*! ../common/ajax */ 1);

function fcp() {
	console.log('fcp');
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
    '/fis_ci_plugins/new': _fisCiPlugins.fcp
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDVmYzFlNTllZjg0ODE5YmZiNTUiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9hamF4LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vZmxhc2guanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2NzcmYuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90d29XYXlEYXRhQmluZGluZy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvZ2xvYmFsL2NvbnN0YW50LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vQWN0aW9uQ2FibGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvYXBpT3BlcmF0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2RhdGFMaW5rcy5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9maXNDaVBsdWdpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2pzb25UcmVlQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURhdGFDb2xsZWN0LmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRG9tLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9oYW5kbGVNZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9odG1sRXNjYXBlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2VyaWFsaXplLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2xpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3RvZ2dsZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy90d2VldEJveC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJpc0VtcHR5IiwiY2xvbmVPYmoiLCJtZXJnZU9iaiIsImFkZFByZWZpeFRvT2JqIiwid3JhcE9iaiIsInN0clRvRG9tIiwiaW5zZXJ0QWZ0ZXIiLCJkZWJvdW5jZSIsImlzU3RyaWN0TW9kZSIsImdlbmVyYXRlVVVJRCIsIm9iaiIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJvYmoxIiwib2JqMiIsIm5ld09iaiIsImtleSIsImhhc093blByb3BlcnR5IiwicHJlZml4Iiwid3JhcHBlciIsInN0ciIsInRtcEVsZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInJldHVybkRvbSIsImNoaWxkcmVuIiwibmV3Tm9kZSIsInJlZmVyZW5jZU5vZGUiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJmdW5jIiwid2FpdCIsImltbWVkaWF0ZSIsInRpbWVvdXQiLCJjb250ZXh0IiwiYXJncyIsImFyZ3VtZW50cyIsImxhdGVyIiwiYXBwbHkiLCJjYWxsTm93IiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImlzU3RyaWN0IiwicmVwbGFjZSIsImMiLCJyIiwiTWF0aCIsInJhbmRvbSIsInYiLCJ0b1N0cmluZyIsIiRodHRwIiwidXJsIiwiY29yZSIsImFqYXgiLCJtZXRob2QiLCJwcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjbGllbnQiLCJYTUxIdHRwUmVxdWVzdCIsInVyaSIsImV4dGVuZEdlbmVyYWxQYXJhbXMiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCJvbmxvYWQiLCJzdGF0dXMiLCJyZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsIm9uZXJyb3IiLCJlcnIiLCJjc3JmUGFyYW0iLCJjc3JmVG9rZW4iLCJnZW5lcmFsT2JqIiwidXRmOCIsImZvcm1hdCIsImZsYXNoIiwicGFyc2VBbmRGbGFzaCIsImRhdGEiLCJjYWxsYmFjayIsImZsYXNoRWxlIiwiZmxhc2hUcGwiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJkZXN0b3J5IiwiYmluZCIsImVycm9yIiwibWVzc2FnZSIsImVsZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVDaGlsZCIsImNsYXNzTGlzdCIsImFkZCIsImpzb25EYXRhIiwicG9wdXAiLCJldiIsInBhcmFtcyIsInBvcHVwRWxlIiwiZ2VuZXJhdGVQb3B1cFRwbCIsInBvc2l0aW9uUG9wdXBFbGUiLCJiaW5kUG9wdXBFdmVudHMiLCJ0cGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2xvc2VQb3B1cCIsImNvbmZpcm0iLCJjb29yZGluYXRlcyIsInN0eWxlIiwidHJhbnNmb3JtIiwiY2xpZW50WCIsImNsaWVudFkiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwicG9wTGF5ZXIiLCJjbG9zZXN0IiwiVHJlZSIsIm5vZGUiLCJOb2RlIiwiX3Jvb3QiLCJub2RlSWQiLCJwYXJlbnQiLCJjaGlsZHJlbmxldmVsIiwiY29sdW1uIiwidG90YWxvZmZzZXR5bGV2ZWwiLCJwcm90b3R5cGUiLCJ0cmF2ZXJzZURGIiwicmVjdXJzZSIsImN1cnJlbnROb2RlIiwiaSIsImNhbGNDaGlsZHJlbkxldmVscyIsInRvdGFsQ2hpbGRyZW5MZXZlbHMiLCJjYWxjQ2hpbGRyZW5MZXZlbCIsImNhbGNPZmZZIiwiYXJyIiwibm9kZUlkeCIsImZpbmRJbmRleCIsInRvdGFsWSIsImNhbGNUb3RhbE9mZnNldFlMZXZlbCIsImxldmVsZ2FwIiwidHJhdmVyc2VCRiIsInF1ZXVlIiwiZW5xdWV1ZSIsImN1cnJlbnRUcmVlIiwiZGVxdWV1ZSIsImNvbnRhaW5zIiwidHJhdmVyc2FsIiwiY2FsbCIsInRvRGF0YSIsImNoaWxkIiwicHVzaCIsIkVycm9yIiwiY2hlY2tEYXRhSGFzQ2hpbGQiLCJyZW1vdmUiLCJmcm9tRGF0YSIsInRyZWUiLCJjaGlsZFRvUmVtb3ZlIiwiaW5kZXgiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJ0cmF2ZXJzZURpcmVjdENoaWxkIiwibm9kZWRhdGEiLCJhcHBseVN0eWxlIiwic3R5bGVPYmoiLCJ0cmF2ZXJzZURlc2NlbmRhbnRzIiwibm9kZURhdGEiLCJkZXNjZW5kYW50c0FyciIsImhhc0NoaWxkIiwibWF4SWQiLCJtYXhOb2RlSWQiLCJkZXB0aCIsImRlcHRoQXJyIiwiZGltZW5zaW9ucyIsImhvcmlNYXgiLCJ2ZXJ0aWNhbE1heCIsImhvcmlBcnIiLCJtYXgiLCJyb3JQYXJhbXMiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwiaXNDcm9zc0RvbWFpbiIsIm9yaWdpbkFuY2hvciIsImhyZWYiLCJsb2NhdGlvbiIsInVybEFuY2hvciIsInByb3RvY29sIiwiaG9zdCIsImUiLCJ0d29XYXlEYXRhQmluZGluZyIsImRvbUNvbnRleHQiLCJtb2RlbCIsImZvckVhY2giLCJ2YWx1ZSIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInNldCIsInZhbCIsInNlbGVjdG9yVG9BcnJheSIsImNvbmNhdCIsImVsIiwiaGFzQXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJoYXNBY3RpdmVFbGUiLCJlbEFuZERlc2NlbmRhbnRzIiwic2V0QXR0cmlidXRlIiwiYWN0aXZlRWxlbWVudCIsImhhbmRsZXIiLCJzZWxlY3RvciIsIkFycmF5Iiwic2xpY2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwibWF0Y2hlcyIsInJlc3VsdEFyciIsImxvb3AiLCJjaGlsZHJlbkVsZXMiLCJjaGlsZEVsZW1lbnRDb3VudCIsImJvbCIsInJvb3RBUEkiLCJ3aW5kb3ciLCJvcmlnaW4iLCJBY3Rpb25DYWJsZSIsIklOVEVSTkFMIiwiY3JlYXRlQ29uc3VtZXIiLCJyZWYiLCJnZXRDb25maWciLCJkZWZhdWx0X21vdW50X3BhdGgiLCJDb25zdW1lciIsImNyZWF0ZVdlYlNvY2tldFVSTCIsIm5hbWUiLCJlbGVtZW50IiwiaGVhZCIsImEiLCJ0ZXN0Iiwic3RhcnREZWJ1Z2dpbmciLCJkZWJ1Z2dpbmciLCJzdG9wRGVidWdnaW5nIiwibG9nIiwibWVzc2FnZXMiLCJEYXRlIiwibm93IiwiY29uc29sZSIsIm1vZHVsZSIsImV4cG9ydHMiLCJmbiIsIm1lIiwiQ29ubmVjdGlvbk1vbml0b3IiLCJjbGFtcCIsInNlY29uZHNTaW5jZSIsInBvbGxJbnRlcnZhbCIsIm1pbiIsInN0YWxlVGhyZXNob2xkIiwiY29ubmVjdGlvbiIsInZpc2liaWxpdHlEaWRDaGFuZ2UiLCJyZWNvbm5lY3RBdHRlbXB0cyIsInN0YXJ0IiwiaXNSdW5uaW5nIiwic3RhcnRlZEF0Iiwic3RvcHBlZEF0Iiwic3RhcnRQb2xsaW5nIiwiZ2V0UG9sbEludGVydmFsIiwic3RvcCIsInN0b3BQb2xsaW5nIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlY29yZFBpbmciLCJwaW5nZWRBdCIsInJlY29yZENvbm5lY3QiLCJkaXNjb25uZWN0ZWRBdCIsInJlY29yZERpc2Nvbm5lY3QiLCJwb2xsIiwicG9sbFRpbWVvdXQiLCJfdGhpcyIsInJlY29ubmVjdElmU3RhbGUiLCJpbnRlcnZhbCIsImNvbnN0cnVjdG9yIiwicm91bmQiLCJjb25uZWN0aW9uSXNTdGFsZSIsImRpc2Nvbm5lY3RlZFJlY2VudGx5IiwicmVvcGVuIiwidmlzaWJpbGl0eVN0YXRlIiwiaXNPcGVuIiwiZ2V0VGltZSIsInRpbWUiLCJudW1iZXIiLCJtZXNzYWdlX3R5cGVzIiwicHJvdG9jb2xzIiwic3VwcG9ydGVkUHJvdG9jb2xzIiwidW5zdXBwb3J0ZWRQcm90b2NvbCIsImluZGV4T2YiLCJpdGVtIiwibCIsIkNvbm5lY3Rpb24iLCJyZW9wZW5EZWxheSIsImNvbnN1bWVyIiwic3Vic2NyaXB0aW9ucyIsIm1vbml0b3IiLCJkaXNjb25uZWN0ZWQiLCJ3ZWJTb2NrZXQiLCJpc0FjdGl2ZSIsImdldFN0YXRlIiwidW5pbnN0YWxsRXZlbnRIYW5kbGVycyIsIldlYlNvY2tldCIsImluc3RhbGxFdmVudEhhbmRsZXJzIiwiY2xvc2UiLCJhcmciLCJhbGxvd1JlY29ubmVjdCIsInJlZjEiLCJlcnJvcjEiLCJnZXRQcm90b2NvbCIsImlzU3RhdGUiLCJpc1Byb3RvY29sU3VwcG9ydGVkIiwic3RhdGVzIiwic3RhdGUiLCJyZWFkeVN0YXRlIiwidG9Mb3dlckNhc2UiLCJldmVudE5hbWUiLCJldmVudHMiLCJldmVudCIsImlkZW50aWZpZXIiLCJ0eXBlIiwid2VsY29tZSIsInJlbG9hZCIsInBpbmciLCJjb25maXJtYXRpb24iLCJub3RpZnkiLCJyZWplY3Rpb24iLCJub3RpZnlBbGwiLCJ3aWxsQXR0ZW1wdFJlY29ubmVjdCIsIlN1YnNjcmlwdGlvbnMiLCJjcmVhdGUiLCJjaGFubmVsTmFtZSIsIm1peGluIiwiY2hhbm5lbCIsInN1YnNjcmlwdGlvbiIsIlN1YnNjcmlwdGlvbiIsImVuc3VyZUFjdGl2ZUNvbm5lY3Rpb24iLCJzZW5kQ29tbWFuZCIsImZvcmdldCIsImZpbmRBbGwiLCJsZW4iLCJyZXN1bHRzIiwicyIsImNhbGxiYWNrTmFtZSIsImNvbW1hbmQiLCJleHRlbmQiLCJwZXJmb3JtIiwiYWN0aW9uIiwidW5zdWJzY3JpYmUiLCJvYmplY3QiLCJwcm9wZXJ0aWVzIiwiY29ubmVjdCIsImRpc2Nvbm5lY3QiLCJpbml0WGhyIiwicGF5bG9hZCIsImFwaXNBcnIiLCJnZXRBcGlTdWNjZXNzIiwiYWRkQXBpVHJlZSIsImdldEFsbEFwaXNTdWNjZXNzIiwiZGF0YUJhayIsIkpTT05CYWsiLCJuZXdBcGlCdG4iLCJyZW5kZXJBbGxBcGlzIiwiYmluZGV2ZW50cyIsImxpc3RlbkFwaVF1ZXJ5IiwicGF0Y2hTdWNjZXNzIiwicG9zdFN1Y2Nlc3MiLCJkZWxldGVTdWNjZXNzIiwiZGVzdG9yeUFwaUxpIiwiYXBpUXVlcnlTdWNjZXNzIiwic2VhcmNoTGlzdCIsImRhdGFPYmoiLCJjb250ZW50U3RyIiwiTGVuIiwic2VjdGlvbiIsImRlc2NyaXB0aW9uIiwic3VjY2VzcyIsImdldEFsbEFwaXMiLCJkZWJvdW5jZWRBcGlRdWVyeUlucHV0IiwiYXBpUXVlcnkiLCJhcGlRdWVyeUlucHV0IiwiaW5XcmFwcGVyIiwicGFyZW50RWxlbWVudCIsImNoZWNrSWZGb2N1cyIsImNsZWFyU2VhcmNoUmVzdWx0IiwicSIsInRoZW4iLCJjYXRjaCIsImFwaVNlYXJjaFJlc3VsdEVsZSIsInRvZ2dsZUZvbGRMaSIsInRvZ2dsZSIsImJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbiIsIm5leHRFbGVtZW50U2libGluZyIsImRhdGFzZXQiLCJhcGlJZCIsImFwaUxpcyIsImNvbnRhaW5lck5vZGUiLCJpc05ld0FwaSIsIm5ld0FwaSIsImRlYm91bmNlZE5ld0FwaUJ0biIsInByb2Nlc3NOZXdBcGlDbGljayIsImRlYm91bmNlZEVudkJ0biIsInByb2Nlc3NPcGVuRW52U2V0dGluZ3MiLCJjb250ZW50Iiwic2xpZGVDb250ZW50IiwidHBsU3RyIiwiYXBpVWwiLCJjcmVhdGVBcGlVbCIsImJhc2VBcGlMaSIsIm5ld0FwaUxpVHBsIiwiZmlyc3RDaGlsZCIsImFwaUxpc3RFbGUiLCJhcGlVbEVsZSIsIm5ld0FwaURpdiIsImhlYWRlciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibmV3QXBpU3RyIiwiaWQiLCJ3aWtpTGluayIsInRtcGwiLCJtYXAiLCJkYXRhTGlua3MiLCJwcm9jZXNzRGF0YUxpbmsiLCJ0YWdOYW1lIiwicHJldmVudERlZmF1bHQiLCJmY3AiLCJob21lIiwianNvblRvVHJlZSIsInRyZWVUb0pzb24iLCJub2Rlc0FyciIsImhhc2hUYWJsZSIsIm5vZGVzTGVuIiwibW9kS2V5c0FyciIsInJlbW92ZUVsZUZyb21BcnIiLCJOdW1iZXIiLCJzb3J0Iiwic29ydE51bWJlciIsInJvb3ROb2RlRGF0YSIsImoiLCJrZXlzTGVuIiwiayIsImtleUFyckxlbiIsImIiLCJRdWV1ZSIsIl9vbGRlc3RJbmRleCIsIl9uZXdlc3RJbmRleCIsIl9zdG9yYWdlIiwic2l6ZSIsIm9sZGVzdEluZGV4IiwibmV3ZXN0SW5kZXgiLCJkZWxldGVkRGF0YSIsImNvbGxlY3RBcGlEYXRhIiwib3BFbGUiLCJwZXJBcGlFbGUiLCJjb2xsZWN0SW5mbyIsImNvbGxlY3REYXRhRnJvbVRyZWUiLCJpbmZvRWxlIiwiTW9kZXNSb3dFbGUiLCJpbmZvRGF0YSIsImdldE1vZGVWYWwiLCJnZXREZWJ1Z0FkZHIiLCJyYWRpb3MiLCJtb2RlVmFsIiwiY2hlY2tlZCIsImNvbGxlY3RUcmVlIiwidHJlZUVsZSIsImxlYXZlcyIsInRyZWVEYXRhQXJyIiwidHJlZURhdGFPYmoiLCJsZWFmRGF0YSIsImxlYXZlc0xlbiIsInBhcmVudElkIiwicXVhbnRpdHkiLCJub2RlcyIsImFwaVRyZWUiLCJkaW1lbnNpb25zQXJyIiwiaFVuaXQiLCJ2VW5pdCIsIkFwaURvbSIsInBlckFwaVRwbCIsImFwaVVVSUQiLCJwYXRjaE9yUG9zdCIsInNhdmVPckNyZWF0ZSIsImxlYWZUcGwiLCJsZWFmQ29udGVudFRwbCIsImluaXRSZWN0T2JqIiwicmlnaHQiLCJib3R0b20iLCJsZWZ0IiwidG9wIiwid2lkdGgiLCJoZWlnaHQiLCJsZWFmRGF0YVBsYWNlSG9sZGVyIiwiZGF0YU5hbWUiLCJkYXRhVHlwZSIsImRhdGFWYWx1ZSIsImRhdGFRdWFudGl0eSIsInBlckxlYWZXaWR0aCIsInBlckxlYWZIZWlnaHQiLCJsZWF2ZXNWZXJ0aWNhbEdhcCIsInBlclNWR1BhdGhXaWR0aCIsInJvb3ROb2RlV2lkdGgiLCJhcGlSYXdEYXRhIiwiYXBpRGF0YU9iaiIsImFwaUNvbnRhaW5lciIsImFwaVJlc3BvbmRTdWNjZXNzIiwianNvbk9iaiIsInByZXZpZXdEYXRhIiwicHJldmlld0RhdGFPYmoiLCJzd2l0Y2hQcmV2aWV3IiwiZXZlbnRDb250ZXh0IiwiY3JlYXRlUGVyQXBpIiwiY3JlYXRlTmV3QXBpSW5pdERhdGEiLCJpbml0RGF0YSIsImZpcnN0Q2hpbGREYXRhIiwibW9kZSIsImRlYnVnQWRkciIsImFwaUJpbmREYXRhIiwiYXBpRWxlIiwibGVhZkluZGV4IiwiJGFwaVRyZWUiLCIkYXBpVHJlZUZyYW1lIiwiJGFwaVRyZWVDb250ZW50IiwicmVuZGVyRXhpc3RUcmVlIiwiYXBpUmV0dXJuRGF0YSIsImJpbmRFdmVudCIsInNldE1vZGVWYWwiLCJzZXREZWJ1Z0FkZHIiLCJzY3JvbGxCYXIiLCJvdmVyZmxvd0VsZSIsImRvY0ZyYWciLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50IiwicGVyVFdEQkFyciIsImxlYWYiLCJwZXJUV0RCIiwiZ2VuZXJhdGVMZWFmIiwiY2FsY0RpbWVuc2lvbnMiLCJkcmF3U1ZHIiwibmV3TGVhZlNwYW4iLCJldlRhcmdldENsYXNzTGlzdCIsIl9ldiIsImRvbUNvbnRhaW5lciIsInBhdGNoIiwicG9zdCIsImFkZENoaWxkIiwiZGVsZXRlQXBpIiwiZGVsTm9kZSIsImRhd25fdXJpIiwicHJldmlld0NvbnRleHQiLCJwcmV2aWV3VHlwZSIsInByZXZpZXdTdHIiLCJqc29uVmlldyIsInN3aXRjaFByZXZpZXdTdGF0dXMiLCJhcHBseVR5cGUiLCJwcmV2aWV3VHlwZXMiLCJhcGlSZXNwb25kUHJldmlld0VsZSIsImFwaVJlc3BvbmRQcmV2aWV3RWxlQ2xhc3NBcnIiLCJjbGFzc05hbWUiLCJ0cmltIiwic3BsaXQiLCJhcnJheSIsImlkeCIsInByZXZpZXdUeXBlRWxlc0FyciIsImpvaW4iLCJhcGlTYXZlIiwiYWRkTGVhZkNoaWxkIiwicmVtb3ZlTGVhZkNoaWxkIiwiYXBpVGVzdCIsIiRwcmUiLCIkZGF0YVZpZXdFbGUiLCJkZWxldGUiLCJzdG9yZUFwaVJldHVybkRhdGEiLCIkZGF0YUJlYXV0aWZ5IiwiY2xpY2siLCJpbml0QXBpVHJlZSIsInRyZWVEb2NGcmFnIiwibGVhZkVsZSIsImxlYWZCaW5kRGF0YSIsImN0eCIsImN1cnJlbnRMZWFmIiwiY3VycmVudElkeCIsInBhcmVudElkeCIsImlkeEFyciIsIm5vZGVzQXJyVG9JZHhBcnIiLCJyZW1vdmVOb2Rlc0Zyb21Eb20iLCJzdHlsZU5vZGVzIiwic2V0UGFyZW50Tm9kZVZhbCIsInJlbmRlciIsImFsbExlYXZlcyIsImFsbExlYXZlc0xlbiIsIm5vZGVzQXJyTGVuIiwicXVldWVMZW4iLCJ4IiwicGFyZW50SWRleCIsImxlYWZDaGlsZCIsImNyZWF0ZUxlYWYiLCJjaGlsZE1vZGVsIiwiZ2VuZXJhdGVMZWFmU3BhbiIsIm5vZGVJbmRleCIsImxlYXZlc0hhc2giLCJkaW1lbnNpb25BcnIiLCJjbG9uZVJlY3RPYmoiLCJjbGVhclNWRyIsInN2ZyIsImxhc3RDaGlsZCIsInRoYXQiLCJzdmdQYXJ0aWFscyIsImNyZWF0ZVNpbmdsZVNWRyIsImhvcmkiLCJwYXJlbnRWZXJ0IiwiZHZlcnQiLCJzdmducyIsIm5ld1BhdGgiLCJjcmVhdGVFbGVtZW50TlMiLCJjb250cm9sUmF0ZSIsIm14IiwibXkiLCJxeCIsInF5IiwicXh4IiwicXl5IiwidHgiLCJ0eSIsInNldEF0dHJpYnV0ZU5TIiwidmVydEFyciIsIm5vZGVMZWZ0T2Zmc2V0IiwiZWxSZWN0T2JqZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiYm9keVJlY3RPYmoiLCJjbG9uZUJvZHlSZWN0T2JqIiwiY2xvbmVFbFJlY3RPYmplY3QiLCJhYnMiLCJnZXRNYXhPZkFycmF5IiwiaGFzQ2xhc3MiLCJicm93c2VyUHJlZml4IiwiZ2V0VHJhbnNmb3JtIiwiZ2V0VHJhbnNsYXRlWCIsImdldFRyYW5zbGF0ZVkiLCJiZWF1dGlmeUpTT04iLCJoaWdodGxpZ2h0SlNPTiIsIm51bUFycmF5IiwiZWxlbSIsInVhIiwibmF2aWdhdG9yIiwidXNlckFnZW50Iiwib3BlbkRhdGFiYXNlIiwib3BlcmEiLCJhbGwiLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsIm1hdGNoIiwid2Via2l0VHJhbnNmb3JtIiwibW96VHJhbnNmb3JtIiwibWF0IiwicGFyc2VGbG9hdCIsInNlcmlhbGl6ZSIsInAiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqc09iaiIsImpzb24iLCJjbHMiLCJjYWxsYmFja3MiLCJoYW5kbGVNZXRob2QiLCJsaW5rIiwicGFyYW1zT2JqIiwiZm9ybUVsZSIsImNyZWF0ZUZvcm0iLCJhcHBlbmRGb3JtVG9Eb20iLCJzdWJtaXRGb3JtIiwiZiIsImRpc3BsYXkiLCJmb3JtIiwic3VibWl0IiwiaHRtbEVzY2FwZSIsInNjcm9sbEJhckgiLCJnZW5lcmF0ZVNjcm9sbFN0ciIsInNjcm9sbFN0ciIsIm9wdGlvbnMiLCJuZXdTY3JvbGxTdHIiLCJuZXdTY3JvbGxFbGUiLCJZIiwic2Nyb2xsYmFyIiwiTiIsImluaXRQb3MiLCJNIiwiaW5pdERvbSIsIlUiLCJtb3VzZXdoZWVsIiwibW91c2V3aGVlbGxvY2siLCJIIiwid2hlZWxkZWx0YSIsInoiLCJjdHJsYmxvY2siLCJKIiwic3RlcCIsIkkiLCJzY2FsZSIsIkciLCJ0aGVtZSIsImFkIiwicmVmcmVzaCIsIlMiLCJUIiwiaCIsIlYiLCJhZyIsImFmIiwicGFyc2VJbnQiLCJzY3JvbGxMZWZ0IiwiZyIsInUiLCJGIiwiYWUiLCJXIiwiUSIsIlIiLCJtIiwiQyIsIkwiLCJkIiwidCIsImFiIiwiUCIsIkQiLCJ5IiwiWCIsImNsZWFySW50ZXJ2YWwiLCJvZmZzZXRXaWR0aCIsImFoIiwibyIsIloiLCJtZW1PZmZzZXRYIiwib2Zmc2V0TGVmdCIsInNjcm9sbFdpZHRoIiwic2V0SW50ZXJ2YWwiLCJvbkRyYWdzdGFydCIsIm9ud2hlZWwiLCJvbnNlbGVjdHN0YXJ0IiwibiIsImFhIiwiSyIsIk8iLCJFIiwiYWMiLCJCIiwib2Zmc2V0WCIsImxheWVyWCIsImRlYm91bmNlZFdpbmRvd1Jlc2l6ZSIsInJlUmVuZGVyIiwiZGlzcG9zZSIsInNsaWRlIiwic2xpZGVFbGUiLCJnZW5lcmF0ZVNsaWRlVHBsIiwicG9zaXRpb25TbGlkZUVsZSIsImJpbmRTbGlkZUV2ZW50cyIsImNsb3NlU2xpZGUiLCJjbGlja1NoYWRvdyIsImh0bWwiLCJsaXRlcmFsU2VjdGlvbnMiLCJyYXciLCJyZXN1bHQiLCJzdWJzdHMiLCJzdWJzdCIsImxpdCIsImlzQXJyYXkiLCJlbmRzV2l0aCIsImRpc2FibGVTY3JvbGwiLCJlbmFibGVTY3JvbGwiLCJyZXR1cm5WYWx1ZSIsInByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cyIsImtleUNvZGUiLCJvbm1vdXNld2hlZWwiLCJvbnRvdWNobW92ZSIsIm9ua2V5ZG93biIsInR3ZWV0Qm94Iiwic2V0Rm9jdXMiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsIiwiZ2V0U2VsZWN0aW9uIiwic2V0U3RhcnQiLCJjb2xsYXBzZSIsInJlbW92ZUFsbFJhbmdlcyIsImFkZFJhbmdlIiwiZG9jIiwidGIiLCJ0YmQiLCJ0YmRTdHJpbmciLCJpbm5lclRleHQiLCJ3ZWJwYWNrUG9seWZpbGwiLCJkZXByZWNhdGUiLCJwYXRocyIsImNvbmZpZ3VyYWJsZSIsInJvdXRlcyIsInBhdGhOYW1lIiwicGF0aG5hbWUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQzlEZ0JBLE8sR0FBQUEsTztRQUdBQyxRLEdBQUFBLFE7UUFJQUMsUSxHQUFBQSxRO1FBU0FDLGMsR0FBQUEsYztRQVVBQyxPLEdBQUFBLE87UUFZQUMsUSxHQUFBQSxRO1FBWUFDLFcsR0FBQUEsVztRQWVBQyxRLEdBQUFBLFE7UUFlQUMsWSxHQUFBQSxZO1FBS0FDLFksR0FBQUEsWTtBQXJGVCxTQUFTVCxPQUFULENBQWlCVSxHQUFqQixFQUFzQjtBQUMzQixTQUFPQyxPQUFPQyxJQUFQLENBQVlGLEdBQVosRUFBaUJHLE1BQWpCLEtBQTRCLENBQW5DO0FBQ0Q7QUFDTSxTQUFTWixRQUFULENBQWtCUyxHQUFsQixFQUF1QjtBQUM1QixTQUFPSSxLQUFLQyxLQUFM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SUFBSSxDQUFiLEVBQWdCQSxJQUFJdXBCLE9BQU9DLFFBQVAsRUFBaUJqeEIsTUFBckMsRUFBNkN5SCxHQUE3QyxFQUFrRDtBQUNoRHVwQixlQUFPQyxRQUFQLEVBQWlCeHBCLENBQWpCLEVBQW9CMUYsS0FBcEIsQ0FBMEIsSUFBMUI7QUFDRDtBQUNGLEtBTEQsTUFLTztBQUNMaXZCLGFBQU9DLFFBQVAsRUFBaUJsdkIsS0FBakIsQ0FBdUIsSUFBdkI7QUFDRDtBQUNGO0FBRUYsQ0FsQkQsSSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb3J5IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vcnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyOCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDVmYzFlNTllZjg0ODE5YmZiNTUiLCJleHBvcnQgZnVuY3Rpb24gaXNFbXB0eShvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbi8qIGNvbnNpZGVyIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlT2JqKG9iajEgPSB7fSwgb2JqMikge1xuICBsZXQgbmV3T2JqID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmoxKSk7XG4gIGZvciAobGV0IGtleSBpbiBvYmoyKSB7XG4gICAgaWYgKG9iajIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW2tleV0gPSBvYmoyW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBuZXdPYmo7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkUHJlZml4VG9PYmoob2JqLCBwcmVmaXgpIHtcbiAgaWYgKCFwcmVmaXgpIHJldHVybiBvYmo7XG4gIGxldCBuZXdPYmogPSB7fTtcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqWycnICsgcHJlZml4ICsgJ1snICsga2V5ICsgJ10nXSA9IG9ialtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3T2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBPYmoob2JqLCB3cmFwcGVyKSB7XG4gIGlmICghd3JhcHBlcikgcmV0dXJuIG9iajtcbiAgdmFyIG5ld09iaiA9IHt9O1xuICBuZXdPYmpbd3JhcHBlcl0gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgbmV3T2JqW3dyYXBwZXJdW2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld09iajtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0clRvRG9tKHN0cikge1xuICBsZXQgdG1wRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRtcEVsZS5pbm5lckhUTUwgPSBzdHI7XG4gIGxldCByZXR1cm5Eb20gPSB0bXBFbGUuY2hpbGRyZW5bMF07XG4gIHJldHVybiByZXR1cm5Eb207XG59XG4vKipcbiAqIFtpbnNlcnRBZnRlciBkZXNjcmlwdGlvbjogQWNjb3JkaW5nIHRvIE1ETiBpZiB0aGUgZWxlbWVudCBpcyBsYXN0IChhbmQgc28gbmV4dFNpYmxpbmcgaXMgbnVsbCkgdGhlIG5ld05vZGUgd2lsbCBiZSBhcHBlbmRlZCBhcyBleHBlY3RlZF1cbiAqIEBwYXJhbSAge1t0eXBlXX0gbmV3Tm9kZSAgICAgICBbZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0gIHtbdHlwZV19IHJlZmVyZW5jZU5vZGUgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7dW5kZWZpbmVkfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEFmdGVyKG5ld05vZGUsIHJlZmVyZW5jZU5vZGUpIHtcbiAgcmVmZXJlbmNlTm9kZS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlLm5leHRTaWJsaW5nKTtcbn1cblxuLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4vLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuLypcbnZhciBteUVmZmljaWVudEZuID0gZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gIC8vIEFsbCB0aGUgdGF4aW5nIHN0dWZmIHlvdSBkb1xufSwgMjUwKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG15RWZmaWNpZW50Rm4pO1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIHZhciB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICB9O1xuICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgaWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH07XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpY3RNb2RlKCkge1xuICB2YXIgaXNTdHJpY3QgPSAoZnVuY3Rpb24oKSB7IHJldHVybiAhdGhpczsgfSkoKTtcbiAgcmV0dXJuIGlzU3RyaWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVVVUlEKCkge1xuICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XG4gICAgbGV0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpO1xuICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL3V0aWxpdGllcy5qcyIsIi8qKlxuLy8gQi0+IEhlcmUgeW91IGRlZmluZSBpdHMgZnVuY3Rpb25zIGFuZCBpdHMgcGF5bG9hZFxudmFyIG1kbkFQSSA9ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9zZWFyY2guanNvbic7XG52YXIgcGF5bG9hZCA9IHtcbiAgJ3RvcGljJyA6ICdqcycsXG4gICdxJyAgICAgOiAnUHJvbWlzZSdcbn07XG52YXIgY2FsbGJhY2sgPSB7XG4gIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMSwgJ3N1Y2Nlc3MnLCBKU09OLnBhcnNlKGRhdGEpKTtcbiAgfSxcbiAgZXJyb3IgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgY29uc29sZS5sb2coMiwgJ2Vycm9yJywgSlNPTi5wYXJzZShkYXRhKSk7XG4gIH1cbn07XG4vLyBFbmQgQlxuLy8gRXhlY3V0ZXMgdGhlIG1ldGhvZCBjYWxsXG4kaHR0cChtZG5BUEkpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suc3VjY2VzcylcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgxKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MsIGNhbGxiYWNrLmVycm9yKTtcbi8vIEV4ZWN1dGVzIHRoZSBtZXRob2QgY2FsbCBidXQgYW4gYWx0ZXJuYXRpdmUgd2F5ICgyKSB0byBoYW5kbGUgUHJvbWlzZSBSZWplY3QgY2FzZVxuJGh0dHAobWRuQVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLnN1Y2Nlc3MpXG4gIC50aGVuKHVuZGVmaW5lZCwgY2FsbGJhY2suZXJyb3IpO1xuICovXG4vLyBBLT4gJGh0dHAgZnVuY3Rpb24gaXMgaW1wbGVtZW50ZWQgaW4gb3JkZXIgdG8gZm9sbG93IHRoZSBzdGFuZGFyZCBBZGFwdGVyIHBhdHRlcm5cbmltcG9ydCB7c2VyaWFsaXplfSBmcm9tICcuL3NlcmlhbGl6ZSc7XG5pbXBvcnQge2lzRW1wdHksIG1lcmdlT2JqLCBhZGRQcmVmaXhUb09iaiwgd3JhcE9ian0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IHtyb3JQYXJhbXMgYXMgUlBzfSBmcm9tICcuL2NzcmYnO1xuXG5leHBvcnQgZnVuY3Rpb24gJGh0dHAodXJsKSB7XG4gIC8vIEEgc21hbGwgZXhhbXBsZSBvZiBvYmplY3RcbiAgdmFyIGNvcmUgPSB7XG5cbiAgICAvLyBNZXRob2QgdGhhdCBwZXJmb3JtcyB0aGUgYWpheCByZXF1ZXN0XG4gICAgYWpheDogZnVuY3Rpb24obWV0aG9kLCB1cmwsIGFyZ3MgPSB7fSwgcHJlZml4KSB7XG4gICAgICAvLyBmb3IgUmFpbHNcbiAgICAgIC8vIHVybCA9IHVybCArICcuanNvbic7XG4gICAgICAvLyBDcmVhdGluZyBhIHByb21pc2VcbiAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG5cbiAgICAgICAgLy8gSW5zdGFudGlhdGVzIHRoZSBYTUxIdHRwUmVxdWVzdFxuICAgICAgICB2YXIgY2xpZW50ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gJ1BPU1QnIHx8IG1ldGhvZCA9PT0gJ1BVVCcgfHwgbWV0aG9kID09PSAnUEFUQ0gnIHx8IG1ldGhvZCA9PT0gJ0RFTEVURScpIHtcbiAgICAgICAgICBsZXQgdXJpID0gSlNPTi5zdHJpbmdpZnkoZXh0ZW5kR2VuZXJhbFBhcmFtcyh3cmFwT2JqKGFyZ3MsIHByZWZpeCkpKTtcbiAgICAgICAgICBjbGllbnQub3BlbihtZXRob2QsIHVybCk7XG4gICAgICAgICAgLy8gY2xpZW50LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCh1cmkpO1xuICAgICAgICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ0dFVCcpIHtcbiAgICAgICAgICBsZXQgdXJpID0gc2VyaWFsaXplKGV4dGVuZEdlbmVyYWxQYXJhbXMoYWRkUHJlZml4VG9PYmooYXJncywgcHJlZml4KSkpO1xuICAgICAgICAgIGNsaWVudC5vcGVuKG1ldGhvZCwgdXJsICsgJz8nICsgdXJpKTtcbiAgICAgICAgICBjbGllbnQuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICBjbGllbnQuc2VuZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNsaWVudC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyBQZXJmb3JtcyB0aGUgZnVuY3Rpb24gXCJyZXNvbHZlXCIgd2hlbiB0aGlzLnN0YXR1cyBpcyBlcXVhbCB0byAyeHhcbiAgICAgICAgICAgIHJlc29sdmUodGhpcy5yZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFBlcmZvcm1zIHRoZSBmdW5jdGlvbiBcInJlamVjdFwiIHdoZW4gdGhpcy5zdGF0dXMgaXMgZGlmZmVyZW50IHRoYW4gMnh4XG4gICAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY2xpZW50Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICByZWplY3QodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJldHVybiB0aGUgcHJvbWlzZVxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuICB9O1xuICAvLyBBZGFwdGVyIHBhdHRlcm5cbiAgcmV0dXJuIHtcbiAgICAnZ2V0JzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdHRVQnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAncG9zdCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUE9TVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwdXQnOiBmdW5jdGlvbihhcmdzLCBwcmVmaXgpIHtcbiAgICAgIHJldHVybiBjb3JlLmFqYXgoJ1BVVCcsIHVybCwgYXJncywgcHJlZml4KTtcbiAgICB9LFxuICAgICdwYXRjaCc6IGZ1bmN0aW9uKGFyZ3MsIHByZWZpeCkge1xuICAgICAgcmV0dXJuIGNvcmUuYWpheCgnUEFUQ0gnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfSxcbiAgICAnZGVsZXRlJzogZnVuY3Rpb24oYXJncywgcHJlZml4KSB7XG4gICAgICByZXR1cm4gY29yZS5hamF4KCdERUxFVEUnLCB1cmwsIGFyZ3MsIHByZWZpeCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRHZW5lcmFsUGFyYW1zKG9iaikge1xuICBsZXQgY3NyZlBhcmFtID0gUlBzLmNzcmZQYXJhbSgpO1xuICBsZXQgY3NyZlRva2VuID0gUlBzLmNzcmZUb2tlbigpO1xuICBsZXQgZ2VuZXJhbE9iaiA9IHt9O1xuICBnZW5lcmFsT2JqLnV0ZjggPSAn4pyTJztcbiAgZ2VuZXJhbE9iai5mb3JtYXQgPSAnanNvbic7XG4gIGdlbmVyYWxPYmpbY3NyZlBhcmFtXSA9IGNzcmZUb2tlbjtcbiAgcmV0dXJuIG1lcmdlT2JqKG9iaiwgZ2VuZXJhbE9iaik7XG59XG4vLyBFbmQgQVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2FqYXguanMiLCJpbXBvcnQge2luc2VydEFmdGVyLCBzdHJUb0RvbX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGZsYXNoKGRhdGEsIGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7fSkge1xuICBsZXQgZmxhc2hFbGUgPSBzdHJUb0RvbShmbGFzaFRwbChkYXRhKSk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmxhc2hFbGUpO1xuICBzZXRUaW1lb3V0KGRlc3RvcnkuYmluZChudWxsLCBmbGFzaEVsZSwgY2FsbGJhY2spLCAyMDAwKTtcbn1cblxuZnVuY3Rpb24gZmxhc2hUcGwoZGF0YSkge1xuICBsZXQgc3RyID0gYFxuXHRcdDxkaXYgY2xhc3M9XCJmbGFzaC1sYXllciAke2RhdGEuZXJyb3IgPyAnZXJyb3InIDogJ3N1Y2Nlc3MnfVwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1lc3NhZ2VcIj4ke2RhdGEuZXJyb3IgfHwgZGF0YS5tZXNzYWdlfTwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgICA7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIGRlc3RvcnkoZWxlLCBjYWxsYmFjaykge1xuICBlbGUuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICB9KTtcbiAgZWxlLmNsYXNzTGlzdC5hZGQoJ2JsaW5rJyk7XG4gIGNhbGxiYWNrKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZEZsYXNoKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGxldCBqc29uRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGZsYXNoKGpzb25EYXRhLCBjYWxsYmFjayk7XG4gIHJldHVybiBqc29uRGF0YTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2ZsYXNoLmpzIiwiaW1wb3J0IHtkaXNhYmxlU2Nyb2xsLCBlbmFibGVTY3JvbGx9IGZyb20gJy4vdG9nZ2xlU2Nyb2xsJztcbmV4cG9ydCBmdW5jdGlvbiBwb3B1cChldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgcG9wdXBFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcG9wdXBFbGUuY2xhc3NMaXN0LmFkZCgncG9wdXAtbGF5ZXInKTtcbiAgcG9wdXBFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVQb3B1cFRwbCgpO1xuICBwb3NpdGlvblBvcHVwRWxlKHBvcHVwRWxlLCBldik7XG4gIGJpbmRQb3B1cEV2ZW50cyhwb3B1cEVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBvcHVwRWxlKTtcbiAgZGlzYWJsZVNjcm9sbCgpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVBvcHVwVHBsKGRhdGEpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwicG9wdXAtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwicG9wdXAtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicG9wdXAtdGV4dFwiPkFyZSB5b3Ugc3VyZSB0byBkZWxldGUgdGhpcyBBUEk/PC9kaXY+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJwb3B1cC1idG5zXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJwb3B1cC1idG4gcG9wdXAtY2FuY2VsLWJ0blwiPmNhbmNlbDwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInBvcHVwLWJ0biBwb3B1cC1jb25maXJtLWJ0blwiPmNvbmZpcm08L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cdGA7XG4gIHJldHVybiB0cGw7XG59XG5cbmZ1bmN0aW9uIGJpbmRQb3B1cEV2ZW50cyhlbGUsIGV2LCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jYW5jZWwtYnRuJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BvcHVwLXNoYWRvdycpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25Qb3B1cEVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5jbGllbnRYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMuY2xpZW50WSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2KSB7XG4gIGlmIChldi50YXJnZXQgIT09IGV2LmN1cnJlbnRUYXJnZXQpIHJldHVybjtcbiAgbGV0IHBvcExheWVyID0gZXYudGFyZ2V0LmNsb3Nlc3QoJy5wb3B1cC1sYXllcicpO1xuICBpZiAocG9wTGF5ZXIpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHBvcExheWVyKTtcbiAgICBlbmFibGVTY3JvbGwoKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9wb3B1cC5qcyIsIi8qKlxuICogW1RyZWUgZGVzY3JpcHRpb25dXG4gKiBAcGFyYW0ge1t0eXBlXX0gZGF0YSBbZGVzY3JpcHRpb25dXG4gKlxuICogX3Jvb3QgcG9pbnRzIHRvIHRoZSByb290IG5vZGUgb2YgYSB0cmVlLlxuICogdHJhdmVyc2VERihjYWxsYmFjaykgdHJhdmVyc2VzIG5vZGVzIG9mIGEgdHJlZSB3aXRoIERGUy5cbiAqIHRyYXZlcnNlQkYoY2FsbGJhY2spIHRyYXZlcnNlcyBub2RlcyBvZiBhIHRyZWUgd2l0aCBCRlMuXG4gKiBjb250YWlucyhkYXRhLCB0cmF2ZXJzYWwpIHNlYXJjaGVzIGZvciBhIG5vZGUgaW4gYSB0cmVlLlxuICogYWRkKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2UpIGFkZHMgYSBub2RlIHRvIGEgdHJlZS5cbiAqIHJlbW92ZShjaGlsZCwgcGFyZW50KSByZW1vdmVzIGEgbm9kZSBpbiBhIHRyZWUuXG4gKlxuICovXG5pbXBvcnQge1F1ZXVlfSBmcm9tICcuL3F1ZXVlJztcbmV4cG9ydCBmdW5jdGlvbiBUcmVlKGRhdGEpIHtcbiAgdmFyIG5vZGUgPSBuZXcgTm9kZShkYXRhKTtcbiAgdGhpcy5fcm9vdCA9IG5vZGU7XG59XG5cbmZ1bmN0aW9uIE5vZGUoZGF0YSkge1xuICB0aGlzLm5vZGVJZCA9IGRhdGEubm9kZUlkOyAvLyBsZWFmIGluZGV4LCBzdGFydHMgZnJvbSAwKHJvb3Qgbm9kZSlcbiAgdGhpcy5wYXJlbnQgPSBudWxsO1xuICB0aGlzLmNoaWxkcmVuID0gW107XG4gIC8vIGFkZGVkIGxhdGVyXG4gIHRoaXMuY2hpbGRyZW5sZXZlbCA9IDE7IC8vIHJvd3Mgb2YgZGVzY2VuZGFudHMgb2YgY3VycmVudCBub2RlXG4gIHRoaXMuY29sdW1uID0gMDsgLy8gd2hpY2ggY29sdW1uIHRoZSBjdXJyZW50IG5vZGUgc2l0cyBpbiwgc3RhcnRzIGZyb20gMCggcm9vdCBub2RlIHNpdHMgaW4pXG4gIHRoaXMudG90YWxvZmZzZXR5bGV2ZWwgPSAwOyAvLyB0b3RhbCB2ZXJ0aWNhbCBvZmZzZXQgdG8gdGhlIGN1cnJlbnQgdHJlZSBcbiAgdGhpcy5kYXRhID0gZGF0YS5kYXRhIHx8IHt9O1xufVxuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURGID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICAvLyB0aGlzIGlzIGEgcmVjdXJzZSBhbmQgaW1tZWRpYXRlbHktaW52b2tpbmcgZnVuY3Rpb25cbiAgKGZ1bmN0aW9uIHJlY3Vyc2UoY3VycmVudE5vZGUpIHtcbiAgICAvLyBzdGVwIDJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHN0ZXAgM1xuICAgICAgcmVjdXJzZShjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgLy8gc3RlcCA0XG4gICAgY2FsbGJhY2soY3VycmVudE5vZGUpO1xuXG4gICAgLy8gc3RlcCAxXG4gIH0pKHRoaXMuX3Jvb3QpO1xuXG59O1xuXG4vLyBmb3IgdGhvc2Ugbm9kZXMgd2hvIGhhdmUgY2hpbGRyZW5cbmZ1bmN0aW9uIGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSB7XG4gIHZhciB0b3RhbENoaWxkcmVuTGV2ZWxzID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgdG90YWxDaGlsZHJlbkxldmVscyArPSBub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbENoaWxkcmVuTGV2ZWxzO1xufVxuVHJlZS5wcm90b3R5cGUuY2FsY0NoaWxkcmVuTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIG5vZGUuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSA6IDE7XG4gICAgbm9kZS5jb2x1bW4gPSBub2RlLnBhcmVudCA/IChub2RlLnBhcmVudC5jb2x1bW4gKyAxKSA6IDA7XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZURGKGNhbGxiYWNrKTtcbn07XG5cbmZ1bmN0aW9uIGNhbGNPZmZZKGFyciwgZGF0YSkge1xuICB2YXIgbm9kZUlkeCA9IGZpbmRJbmRleChhcnIsIGRhdGEpO1xuICB2YXIgdG90YWxZID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlSWR4OyBpKyspIHtcbiAgICB0b3RhbFkgKz0gYXJyW2ldLmNoaWxkcmVubGV2ZWw7XG4gIH07XG4gIHJldHVybiB0b3RhbFk7XG59XG5cblRyZWUucHJvdG90eXBlLmNhbGNUb3RhbE9mZnNldFlMZXZlbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGV2ZWxnYXAgPSAwO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50KSB7XG4gICAgICBub2RlLnRvdGFsb2Zmc2V0eWxldmVsID0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwgKyBjYWxjT2ZmWShub2RlLnBhcmVudC5jaGlsZHJlbiwgbm9kZS5ub2RlSWQpO1xuICAgIH0gZWxzZSBpZiAobm9kZS5wYXJlbnQgPT09IG51bGwpIHtcblxuICAgIH07XG4gIH07XG5cbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcblxufTtcblxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VCRiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xuXG4gIHF1ZXVlLmVucXVldWUodGhpcy5fcm9vdCk7XG5cbiAgdmFyIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcXVldWUuZW5xdWV1ZShjdXJyZW50VHJlZS5jaGlsZHJlbltpXSk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soY3VycmVudFRyZWUpO1xuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xuICB9XG59O1xuXG5UcmVlLnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0cmF2ZXJzYWwpIHtcbiAgdHJhdmVyc2FsLmNhbGwodGhpcywgY2FsbGJhY2spO1xufTtcblxuVHJlZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZGF0YSwgdG9EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXG4gICAgICBwYXJlbnQgPSBudWxsLFxuICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gdG9EYXRhKSB7XG4gICAgICAgICAgcGFyZW50ID0gbm9kZTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xuXG4gIGlmIChwYXJlbnQpIHtcbiAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgY2hpbGQucGFyZW50ID0gcGFyZW50O1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFkZCBub2RlIHRvIGEgbm9uLWV4aXN0ZW50IHBhcmVudC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcbiAgdGhpcy5jaGVja0RhdGFIYXNDaGlsZCgpO1xuICByZXR1cm4gY2hpbGRcbn07XG5cblRyZWUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGRhdGEsIGZyb21EYXRhLCB0cmF2ZXJzYWwpIHtcbiAgdmFyIHRyZWUgPSB0aGlzLFxuICAgICAgcGFyZW50ID0gbnVsbCxcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBudWxsLFxuICAgICAgaW5kZXg7XG5cbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVJZCA9PT0gZnJvbURhdGEpIHtcbiAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XG5cbiAgaWYgKHBhcmVudCkge1xuICAgIGluZGV4ID0gZmluZEluZGV4KHBhcmVudC5jaGlsZHJlbiwgZGF0YSk7XG5cbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIHRvIHJlbW92ZSBkb2VzIG5vdCBleGlzdC4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRUb1JlbW92ZSA9IHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmVudCBkb2VzIG5vdCBleGlzdC4nKTtcbiAgfVxuXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcbiAgdGhpcy5jaGVja0RhdGFIYXNDaGlsZCgpO1xuICByZXR1cm4gY2hpbGRUb1JlbW92ZTtcbn07XG5cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIGRhdGEpIHtcbiAgdmFyIGluZGV4O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycltpXS5ub2RlSWQgPT09IGRhdGEpIHtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaW5kZXg7XG59XG5cbi8qIHRyZWUgYWRkb24qL1xuXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURpcmVjdENoaWxkID0gZnVuY3Rpb24obm9kZWRhdGEpIHtcbiAgdmFyIHF1ZXVlID0gbmV3IFF1ZXVlKCksXG4gIHBhcmVudCA9IG51bGwsXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlSWQgPT09IG5vZGVkYXRhKSB7XG4gICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICB9XG4gICAgfTtcblxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xuXG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gcGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKHBhcmVudC5jaGlsZHJlbltpXSk7XG4gICAgfVxuICAgIGNhbGxiYWNrKHBhcmVudCk7XG4gICAgcGFyZW50ID0gbnVsbDtcbiAgfVxuICByZXR1cm4gcXVldWU7XG59O1xuVHJlZS5wcm90b3R5cGUuYXBwbHlTdHlsZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3R5bGVPYmogPSB7fTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIHN0eWxlT2JqW25vZGUubm9kZUlkXSA9IG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG5cbiAgcmV0dXJuIHN0eWxlT2JqO1xufTtcblxuLyoqXG4gKiBbdHJhdmVyc2VEZXNjZW5kYW50cyBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge1tpbnRlZ2VyXX0gbm9kZURhdGEgW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W2FycmF5XX0gICAgICAgICBbZGVzY3JpcHRpb25dXG4gKi9cblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGVzY2VuZGFudHMgPSBmdW5jdGlvbihub2RlRGF0YSkge1xuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcbiAgICAgIHBhcmVudCA9IG51bGwsXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgIGlmIChub2RlLm5vZGVJZCA9PT0gbm9kZURhdGEpIHtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGU7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRoaXMudHJhdmVyc2VCRik7XG5cbiAgcXVldWUuZW5xdWV1ZShwYXJlbnQpO1xuXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgdmFyIGRlc2NlbmRhbnRzQXJyID0gW107XG5cbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XG4gICAgZGVzY2VuZGFudHNBcnIucHVzaChjdXJyZW50VHJlZSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcbiAgICB9XG5cbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcbiAgfVxuXG4gIHJldHVybiBkZXNjZW5kYW50c0Fycjtcbn07XG5cblRyZWUucHJvdG90eXBlLmNoZWNrRGF0YUhhc0NoaWxkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLmRhdGEuaGFzQ2hpbGQgPSBub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDAgPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIHRoaXMudHJhdmVyc2VCRihjYWxsYmFjayk7XG59O1xuXG4vKiBnZXQgTWF4IG5vZGVJZCBmcm9tIHRyZWUgKi9cblRyZWUucHJvdG90eXBlLm1heElkID0gZnVuY3Rpb24oKSB7XG4gIGxldCBtYXhOb2RlSWQgPSAwO1xuICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUubm9kZUlkID4gbWF4Tm9kZUlkKSBtYXhOb2RlSWQgPSBub2RlLm5vZGVJZDtcbiAgfTtcbiAgdGhpcy50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcbiAgcmV0dXJuIG1heE5vZGVJZDtcbn07XG5cbi8qIHRyZWUgZGVwdGggKi9cblRyZWUucHJvdG90eXBlLmRlcHRoID0gZnVuY3Rpb24oKSB7XG4gIHZhciBkZXB0aEFyciA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgbGV0IGRlcHRoID0gMDtcbiAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgIHdoaWxlIChub2RlLnBhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICBkZXB0aCArPSAxO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnQ7XG4gICAgICB9XG4gICAgICBkZXB0aEFyci5wdXNoKGRlcHRoKTtcbiAgICB9XG4gIH07XG4gIHRoaXMudHJhdmVyc2VERihjYWxsYmFjayk7XG4gIHJldHVybiBkZXB0aEFycjtcbn07XG5cblRyZWUucHJvdG90eXBlLmRpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcbiAgbGV0IGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW107XG4gIGhvcmlBcnIgPSB0aGlzLmRlcHRoKCk7XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgdmVydGljYWxNYXggPSB0aGlzLl9yb290LmNoaWxkcmVubGV2ZWw7XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS5qcyIsImV4cG9ydCBsZXQgcm9yUGFyYW1zID0ge1xuICAvLyBVcC10by1kYXRlIENyb3NzLVNpdGUgUmVxdWVzdCBGb3JnZXJ5IHRva2VuXG4gIGNzcmZUb2tlbjogKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPWNzcmYtdG9rZW5dJykuZ2V0QXR0cmlidXRlKCdjb250ZW50JyksXG4gIC8vIFVSTCBwYXJhbSB0aGF0IG11c3QgY29udGFpbiB0aGUgQ1NSRiB0b2tlblxuICBjc3JmUGFyYW06ICgpID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT1jc3JmLXBhcmFtXScpLmdldEF0dHJpYnV0ZSgnY29udGVudCcpLFxuICAvLyBEZXRlcm1pbmVzIGlmIHRoZSByZXF1ZXN0IGlzIGEgY3Jvc3MgZG9tYWluIHJlcXVlc3QuXG4gIGlzQ3Jvc3NEb21haW46IHVybCA9PiB7XG4gICAgbGV0IG9yaWdpbkFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBvcmlnaW5BbmNob3IuaHJlZiA9IGxvY2F0aW9uLmhyZWY7XG4gICAgbGV0IHVybEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblxuICAgIHRyeSB7XG4gICAgICB1cmxBbmNob3IuaHJlZiA9IHVybDtcbiAgICAgIC8vIFRoaXMgaXMgYSB3b3JrYXJvdW5kIHRvIGEgSUUgYnVnLlxuICAgICAgdXJsQW5jaG9yLmhyZWYgPSB1cmxBbmNob3IuaHJlZjtcblxuICAgICAgLy8gSWYgVVJMIHByb3RvY29sIGlzIGZhbHNlIG9yIGlzIGEgc3RyaW5nIGNvbnRhaW5pbmcgYSBzaW5nbGUgY29sb25cbiAgICAgIC8vICphbmQqIGhvc3QgYXJlIGZhbHNlLCBhc3N1bWUgaXQgaXMgbm90IGEgY3Jvc3MtZG9tYWluIHJlcXVlc3RcbiAgICAgIC8vIChzaG91bGQgb25seSBiZSB0aGUgY2FzZSBmb3IgSUU3IGFuZCBJRSBjb21wYXRpYmlsaXR5IG1vZGUpLlxuICAgICAgLy8gT3RoZXJ3aXNlLCBldmFsdWF0ZSBwcm90b2NvbCBhbmQgaG9zdCBvZiB0aGUgVVJMIGFnYWluc3QgdGhlIG9yaWdpblxuICAgICAgLy8gcHJvdG9jb2wgYW5kIGhvc3QuXG4gICAgICByZXR1cm4gISgoKCF1cmxBbmNob3IucHJvdG9jb2wgfHwgdXJsQW5jaG9yLnByb3RvY29sID09PSAnOicpICYmICF1cmxBbmNob3IuaG9zdCkgfHxcbiAgICAgICAgKG9yaWdpbkFuY2hvci5wcm90b2NvbCArICcvLycgKyBvcmlnaW5BbmNob3IuaG9zdCA9PT1cbiAgICAgICAgICB1cmxBbmNob3IucHJvdG9jb2wgKyAnLy8nICsgdXJsQW5jaG9yLmhvc3QpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciBwYXJzaW5nIHRoZSBVUkwsIGFzc3VtZSBpdCBpcyBjcm9zc0RvbWFpbi5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vY3NyZi5qcyIsImV4cG9ydCBmdW5jdGlvbiB0d29XYXlEYXRhQmluZGluZyhkYXRhLCBkb21Db250ZXh0KSB7XG4gIC8qIEluc3RhdGlhdGUgYW4gZW1wdHkgYG1vZGVsYCBvYmplY3QuICovXG4gIHZhciBtb2RlbCA9IHt9O1xuICAvKiBJdGVyYXRlIG92ZXIgdGhlIGtleXMgb2YgdGhlIHN1cHBsaWVkIGBkYXRhYCBvYmplY3QuICovXG4gIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgLyogU3RvcmUgb3VyIHZhbHVlIGluc2lkZSB0aGUgYGZvckVhY2hgIGNsb3N1cmUuICovXG4gICAgdmFyIHZhbHVlID0gZGF0YVtrZXldO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwga2V5LCB7XG4gICAgICAvKiBXZSB3YW50IG91ciBwcm9wZXJ0eSB0byBhcHBlYXIgaW4gYGZvci4uaW5gIGxvb3BzLiAqL1xuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8qIFRoaXMgZG9lc24ndCBuZWVkIHRvIGRvIG11Y2gsIG9ubHkgcmV0dXJuIHRoZSBgdmFsdWVgIGZyb20gb3VyIGNsb3N1cmUuICovXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAvKiBPdmVyd3JpdGUgb3VyIGNsb3N1cmVzIGB2YWx1ZWAgd2l0aCB0aGUgbmV3IGB2YWxgLiAqL1xuICAgICAgICB2YWx1ZSA9IHZhbDtcbiAgICAgICAgLyogU2VsZWN0IGFsbCBub2RlcyB3aXRoIGBiaW5kYCBhbmQgYG1vZGVsYCBhdHRyaWJ1dGVzLiAqL1xuICAgICAgICBzZWxlY3RvclRvQXJyYXkoJ1tiaW5kPScgKyBrZXkgKyAnXScsIGRvbUNvbnRleHQpLmNvbmNhdChzZWxlY3RvclRvQXJyYXkoJ1ttb2RlbD0nICsga2V5ICsgJ10nLCBkb21Db250ZXh0KSkuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuICAgICAgICAgIC8qIElmIGVsZW1lbnQgaGFzIGBiaW5kYCBhdHRyaWJ1dGUsIHNldCBpdCdzIGB0ZXh0Q29udGVudGAuICovXG4gICAgICAgICAgaWYgKGVsLmdldEF0dHJpYnV0ZSgnYmluZCcpICYmICFlbC5oYXNBdHRyaWJ1dGUoJ2JpbmQtdG9nZ2xlLWNsYXNzJykpIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYmluZC10b2dnbGUtY2xhc3MnKSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtdHJ1ZScpOyBcbiAgICAgICAgICAgIH1lbHNlIGlmKHZhbHVlID09PSBmYWxzZSB8fCB2YWx1ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RvZ2dsZS10cnVlJyk7XG4gICAgICAgICAgICB9ZWxzZSBpZih2YWx1ZSAmJiAoJycgKyB2YWx1ZSkubGVuZ3RoID4gMCAmJiAhaGFzQWN0aXZlRWxlKGVsQW5kRGVzY2VuZGFudHMoZWwpKSkge1xuICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2dnbGUtdHJ1ZScpOyBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYmluZC1hdHRyLWhyZWYnKSkge1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdocmVmJywgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKiBJZiBlbGVtZW50IGhhcyBgbW9kZWxgIGF0dHJpYnV0ZSwgc2V0IGl0J3MgYHZhbHVlYC4gKi9cblxuICAgICAgICAgIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ21vZGVsJykgJiYgZWwgIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvKiBTZXQgb3VyIG1vZGVsIG9iamVjdHMgcHJvcGVydHkgdmFsdWUgdG8gdGhlIHNhbWUgdmFsdWUuICovXG4gICAgbW9kZWxba2V5XSA9IHZhbHVlO1xuICAgIC8qIEFkZCBjaGFuZ2UgaGFuZGxlcnMgdG8gaW5wdXRzIG9uIHRoZSBwYWdlLiAqL1xuICAgIHNlbGVjdG9yVG9BcnJheSgnW21vZGVsPScgKyBrZXkgKyAnXScsIGRvbUNvbnRleHQpLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgIC8qIE91ciBoYW5kbGVyIHNpbXBseSBzZXRzIG91ciBtb2RlbHMgYGtleWAgdG8gdGhlIGVsZW1lbnQncyB2YWx1ZS4gKi9cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgIG1vZGVsW2tleV0gPSBlbC52YWx1ZTtcbiAgICAgIH1cbiAgICAgIC8qIEJpbmQgYSBga2V5dXBgIGhhbmRsZXIgc28gd2UgZ2V0IGxpdmUgZmVlZGJhY2sgb24gZWFjaCBrZXkgcHJlc3MuICovXG4gICAgICAvLyBlbC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGhhbmRsZXIpO1xuICAgICAgLyogQmluZCBhIGBjaGFuZ2VgIGhhbmRsZXIgd2hpY2ggaXMgZmlyZWQgd2hlbiB0aGUgZWxlbWVudCBpcyBibHVycmVkLiAqL1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBoYW5kbGVyKTtcbiAgICB9KTtcbiAgfSk7XG4gIC8qIFJldHVybiBvdXIgbmV3IG1vZGVsIG9iamVjdC4gKi9cbiAgcmV0dXJuIG1vZGVsO1xufVxuXG4vKiBpbmNsdWRlIGRvbUNvbnRleHQgaXRzc2VsZiAqL1xuZnVuY3Rpb24gc2VsZWN0b3JUb0FycmF5KHNlbGVjdG9yLCBkb21Db250ZXh0KSB7XG4gIGxldCBhcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb21Db250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKTtcbiAgaWYgKGRvbUNvbnRleHQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICBhcnIucHVzaChkb21Db250ZXh0KTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBlbEFuZERlc2NlbmRhbnRzKGVsKSB7XG4gIGxldCByZXN1bHRBcnIgPSBbXTtcbiAgKGZ1bmN0aW9uIGxvb3AoZWxlKSB7XG4gICAgbGV0IGNoaWxkcmVuRWxlcyA9IGVsZS5jaGlsZHJlbjtcbiAgICBpZiAoZWxlLmNoaWxkRWxlbWVudENvdW50KSB7XG4gICAgICBmb3IgKHZhciBpID0gY2hpbGRyZW5FbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGxvb3AoY2hpbGRyZW5FbGVzW2ldKVxuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHRBcnIucHVzaChlbGUpO1xuICB9KShlbCk7XG4gIHJldHVybiByZXN1bHRBcnI7XG59XG5mdW5jdGlvbiBoYXNBY3RpdmVFbGUoYXJyKSB7XG4gIGxldCBib2wgPSBmYWxzZTtcbiAgaWYgKGFyci5sZW5ndGggPT09IDApIHJldHVybjtcbiAgZm9yICh2YXIgaSA9IGFyci5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChib2wgPT09IHRydWUpIGJyZWFrO1xuICAgIGJvbCA9IGFycltpXSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA/IHRydWUgOiBmYWxzZTtcbiAgfVxuICByZXR1cm4gYm9sO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcuanMiLCJleHBvcnQgY29uc3Qgcm9vdEFQSSA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2FwaXMnO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9nbG9iYWwvY29uc3RhbnQuanMiLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG4gIHRoaXMuQWN0aW9uQ2FibGUgPSB7XG4gICAgSU5URVJOQUw6IHtcbiAgICAgIFwibWVzc2FnZV90eXBlc1wiOiB7XG4gICAgICAgIFwid2VsY29tZVwiOiBcIndlbGNvbWVcIixcbiAgICAgICAgXCJwaW5nXCI6IFwicGluZ1wiLFxuICAgICAgICBcImNvbmZpcm1hdGlvblwiOiBcImNvbmZpcm1fc3Vic2NyaXB0aW9uXCIsXG4gICAgICAgIFwicmVqZWN0aW9uXCI6IFwicmVqZWN0X3N1YnNjcmlwdGlvblwiXG4gICAgICB9LFxuICAgICAgXCJkZWZhdWx0X21vdW50X3BhdGhcIjogXCIvY2FibGVcIixcbiAgICAgIFwicHJvdG9jb2xzXCI6IFtcImFjdGlvbmNhYmxlLXYxLWpzb25cIiwgXCJhY3Rpb25jYWJsZS11bnN1cHBvcnRlZFwiXVxuICAgIH0sXG4gICAgY3JlYXRlQ29uc3VtZXI6IGZ1bmN0aW9uKHVybCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICh1cmwgPT0gbnVsbCkge1xuICAgICAgICB1cmwgPSAocmVmID0gdGhpcy5nZXRDb25maWcoXCJ1cmxcIikpICE9IG51bGwgPyByZWYgOiB0aGlzLklOVEVSTkFMLmRlZmF1bHRfbW91bnRfcGF0aDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgQWN0aW9uQ2FibGUuQ29uc3VtZXIodGhpcy5jcmVhdGVXZWJTb2NrZXRVUkwodXJsKSk7XG4gICAgfSxcbiAgICBnZXRDb25maWc6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBlbGVtZW50O1xuICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmhlYWQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT0nYWN0aW9uLWNhYmxlLVwiICsgbmFtZSArIFwiJ11cIik7XG4gICAgICByZXR1cm4gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpIDogdm9pZCAwO1xuICAgIH0sXG4gICAgY3JlYXRlV2ViU29ja2V0VVJMOiBmdW5jdGlvbih1cmwpIHtcbiAgICAgIHZhciBhO1xuICAgICAgaWYgKHVybCAmJiAhL153c3M/Oi9pLnRlc3QodXJsKSkge1xuICAgICAgICBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgICAgYS5ocmVmID0gYS5ocmVmO1xuICAgICAgICBhLnByb3RvY29sID0gYS5wcm90b2NvbC5yZXBsYWNlKFwiaHR0cFwiLCBcIndzXCIpO1xuICAgICAgICByZXR1cm4gYS5ocmVmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0RGVidWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlYnVnZ2luZyA9IHRydWU7XG4gICAgfSxcbiAgICBzdG9wRGVidWdnaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlYnVnZ2luZyA9IG51bGw7XG4gICAgfSxcbiAgICBsb2c6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1lc3NhZ2VzO1xuICAgICAgbWVzc2FnZXMgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgIGlmICh0aGlzLmRlYnVnZ2luZykge1xuICAgICAgICBtZXNzYWdlcy5wdXNoKERhdGUubm93KCkpO1xuICAgICAgICByZXR1cm4gY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgW1wiW0FjdGlvbkNhYmxlXVwiXS5jb25jYXQoc2xpY2UuY2FsbChtZXNzYWdlcykpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsKSB7XG4gICAgd2luZG93LkFjdGlvbkNhYmxlID0gdGhpcy5BY3Rpb25DYWJsZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gdGhpcy5BY3Rpb25DYWJsZTtcbiAgfVxuXG59KS5jYWxsKHdpbmRvdyk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuICBBY3Rpb25DYWJsZS5Db25uZWN0aW9uTW9uaXRvciA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhbXAsIG5vdywgc2Vjb25kc1NpbmNlO1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucG9sbEludGVydmFsID0ge1xuICAgICAgbWluOiAzLFxuICAgICAgbWF4OiAzMFxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5zdGFsZVRocmVzaG9sZCA9IDY7XG5cbiAgICBmdW5jdGlvbiBDb25uZWN0aW9uTW9uaXRvcihjb25uZWN0aW9uKSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgICAgdGhpcy52aXNpYmlsaXR5RGlkQ2hhbmdlID0gYmluZCh0aGlzLnZpc2liaWxpdHlEaWRDaGFuZ2UsIHRoaXMpO1xuICAgICAgdGhpcy5yZWNvbm5lY3RBdHRlbXB0cyA9IDA7XG4gICAgfVxuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nKCkpIHtcbiAgICAgICAgdGhpcy5zdGFydGVkQXQgPSBub3coKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcHBlZEF0O1xuICAgICAgICB0aGlzLnN0YXJ0UG9sbGluZygpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCB0aGlzLnZpc2liaWxpdHlEaWRDaGFuZ2UpO1xuICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiQ29ubmVjdGlvbk1vbml0b3Igc3RhcnRlZC4gcG9sbEludGVydmFsID0gXCIgKyAodGhpcy5nZXRQb2xsSW50ZXJ2YWwoKSkgKyBcIiBtc1wiKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLmlzUnVubmluZygpKSB7XG4gICAgICAgIHRoaXMuc3RvcHBlZEF0ID0gbm93KCk7XG4gICAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIiwgdGhpcy52aXNpYmlsaXR5RGlkQ2hhbmdlKTtcbiAgICAgICAgcmV0dXJuIEFjdGlvbkNhYmxlLmxvZyhcIkNvbm5lY3Rpb25Nb25pdG9yIHN0b3BwZWRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5pc1J1bm5pbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAodGhpcy5zdGFydGVkQXQgIT0gbnVsbCkgJiYgKHRoaXMuc3RvcHBlZEF0ID09IG51bGwpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucmVjb3JkUGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGluZ2VkQXQgPSBub3coKTtcbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnJlY29yZENvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucmVjb25uZWN0QXR0ZW1wdHMgPSAwO1xuICAgICAgdGhpcy5yZWNvcmRQaW5nKCk7XG4gICAgICBkZWxldGUgdGhpcy5kaXNjb25uZWN0ZWRBdDtcbiAgICAgIHJldHVybiBBY3Rpb25DYWJsZS5sb2coXCJDb25uZWN0aW9uTW9uaXRvciByZWNvcmRlZCBjb25uZWN0XCIpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucmVjb3JkRGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kaXNjb25uZWN0ZWRBdCA9IG5vdygpO1xuICAgICAgcmV0dXJuIEFjdGlvbkNhYmxlLmxvZyhcIkNvbm5lY3Rpb25Nb25pdG9yIHJlY29yZGVkIGRpc2Nvbm5lY3RcIik7XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5zdGFydFBvbGxpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuc3RvcFBvbGxpbmcoKTtcbiAgICAgIHJldHVybiB0aGlzLnBvbGwoKTtcbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbk1vbml0b3IucHJvdG90eXBlLnN0b3BQb2xsaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KHRoaXMucG9sbFRpbWVvdXQpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucG9sbFRpbWVvdXQgPSBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgX3RoaXMucmVjb25uZWN0SWZTdGFsZSgpO1xuICAgICAgICAgIHJldHVybiBfdGhpcy5wb2xsKCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSwgdGhpcy5nZXRQb2xsSW50ZXJ2YWwoKSk7XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5nZXRQb2xsSW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpbnRlcnZhbCwgbWF4LCBtaW4sIHJlZjtcbiAgICAgIHJlZiA9IHRoaXMuY29uc3RydWN0b3IucG9sbEludGVydmFsLCBtaW4gPSByZWYubWluLCBtYXggPSByZWYubWF4O1xuICAgICAgaW50ZXJ2YWwgPSA1ICogTWF0aC5sb2codGhpcy5yZWNvbm5lY3RBdHRlbXB0cyArIDEpO1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoY2xhbXAoaW50ZXJ2YWwsIG1pbiwgbWF4KSAqIDEwMDApO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUucmVjb25uZWN0SWZTdGFsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbklzU3RhbGUoKSkge1xuICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJDb25uZWN0aW9uTW9uaXRvciBkZXRlY3RlZCBzdGFsZSBjb25uZWN0aW9uLiByZWNvbm5lY3RBdHRlbXB0cyA9IFwiICsgdGhpcy5yZWNvbm5lY3RBdHRlbXB0cyArIFwiLCBwb2xsSW50ZXJ2YWwgPSBcIiArICh0aGlzLmdldFBvbGxJbnRlcnZhbCgpKSArIFwiIG1zLCB0aW1lIGRpc2Nvbm5lY3RlZCA9IFwiICsgKHNlY29uZHNTaW5jZSh0aGlzLmRpc2Nvbm5lY3RlZEF0KSkgKyBcIiBzLCBzdGFsZSB0aHJlc2hvbGQgPSBcIiArIHRoaXMuY29uc3RydWN0b3Iuc3RhbGVUaHJlc2hvbGQgKyBcIiBzXCIpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdEF0dGVtcHRzKys7XG4gICAgICAgIGlmICh0aGlzLmRpc2Nvbm5lY3RlZFJlY2VudGx5KCkpIHtcbiAgICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiQ29ubmVjdGlvbk1vbml0b3Igc2tpcHBpbmcgcmVvcGVuaW5nIHJlY2VudCBkaXNjb25uZWN0XCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIkNvbm5lY3Rpb25Nb25pdG9yIHJlb3BlbmluZ1wiKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb25uZWN0aW9uLnJlb3BlbigpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS5jb25uZWN0aW9uSXNTdGFsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIHJldHVybiBzZWNvbmRzU2luY2UoKHJlZiA9IHRoaXMucGluZ2VkQXQpICE9IG51bGwgPyByZWYgOiB0aGlzLnN0YXJ0ZWRBdCkgPiB0aGlzLmNvbnN0cnVjdG9yLnN0YWxlVGhyZXNob2xkO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uTW9uaXRvci5wcm90b3R5cGUuZGlzY29ubmVjdGVkUmVjZW50bHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2Nvbm5lY3RlZEF0ICYmIHNlY29uZHNTaW5jZSh0aGlzLmRpc2Nvbm5lY3RlZEF0KSA8IHRoaXMuY29uc3RydWN0b3Iuc3RhbGVUaHJlc2hvbGQ7XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb25Nb25pdG9yLnByb3RvdHlwZS52aXNpYmlsaXR5RGlkQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcInZpc2libGVcIikge1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMuY29ubmVjdGlvbklzU3RhbGUoKSB8fCAhX3RoaXMuY29ubmVjdGlvbi5pc09wZW4oKSkge1xuICAgICAgICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJDb25uZWN0aW9uTW9uaXRvciByZW9wZW5pbmcgc3RhbGUgY29ubmVjdGlvbiBvbiB2aXNpYmlsaXR5Y2hhbmdlLiB2aXNiaWxpdHlTdGF0ZSA9IFwiICsgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIF90aGlzLmNvbm5lY3Rpb24ucmVvcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkodGhpcyksIDIwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG5vdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH07XG5cbiAgICBzZWNvbmRzU2luY2UgPSBmdW5jdGlvbih0aW1lKSB7XG4gICAgICByZXR1cm4gKG5vdygpIC0gdGltZSkgLyAxMDAwO1xuICAgIH07XG5cbiAgICBjbGFtcCA9IGZ1bmN0aW9uKG51bWJlciwgbWluLCBtYXgpIHtcbiAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgbnVtYmVyKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBDb25uZWN0aW9uTW9uaXRvcjtcblxuICB9KSgpO1xuXG59KS5jYWxsKHdpbmRvdyk7XG4oZnVuY3Rpb24oKSB7XG4gIHZhciBpLCBtZXNzYWdlX3R5cGVzLCBwcm90b2NvbHMsIHJlZiwgc3VwcG9ydGVkUHJvdG9jb2xzLCB1bnN1cHBvcnRlZFByb3RvY29sLFxuICAgIHNsaWNlID0gW10uc2xpY2UsXG4gICAgYmluZCA9IGZ1bmN0aW9uKGZuLCBtZSl7IHJldHVybiBmdW5jdGlvbigpeyByZXR1cm4gZm4uYXBwbHkobWUsIGFyZ3VtZW50cyk7IH07IH0sXG4gICAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG4gIHJlZiA9IEFjdGlvbkNhYmxlLklOVEVSTkFMLCBtZXNzYWdlX3R5cGVzID0gcmVmLm1lc3NhZ2VfdHlwZXMsIHByb3RvY29scyA9IHJlZi5wcm90b2NvbHM7XG5cbiAgc3VwcG9ydGVkUHJvdG9jb2xzID0gMiA8PSBwcm90b2NvbHMubGVuZ3RoID8gc2xpY2UuY2FsbChwcm90b2NvbHMsIDAsIGkgPSBwcm90b2NvbHMubGVuZ3RoIC0gMSkgOiAoaSA9IDAsIFtdKSwgdW5zdXBwb3J0ZWRQcm90b2NvbCA9IHByb3RvY29sc1tpKytdO1xuXG4gIEFjdGlvbkNhYmxlLkNvbm5lY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gICAgQ29ubmVjdGlvbi5yZW9wZW5EZWxheSA9IDUwMDtcblxuICAgIGZ1bmN0aW9uIENvbm5lY3Rpb24oY29uc3VtZXIpIHtcbiAgICAgIHRoaXMuY29uc3VtZXIgPSBjb25zdW1lcjtcbiAgICAgIHRoaXMub3BlbiA9IGJpbmQodGhpcy5vcGVuLCB0aGlzKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuY29uc3VtZXIuc3Vic2NyaXB0aW9ucztcbiAgICAgIHRoaXMubW9uaXRvciA9IG5ldyBBY3Rpb25DYWJsZS5Db25uZWN0aW9uTW9uaXRvcih0aGlzKTtcbiAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYgKHRoaXMuaXNPcGVuKCkpIHtcbiAgICAgICAgdGhpcy53ZWJTb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIkF0dGVtcHRlZCB0byBvcGVuIFdlYlNvY2tldCwgYnV0IGV4aXN0aW5nIHNvY2tldCBpcyBcIiArICh0aGlzLmdldFN0YXRlKCkpKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXhpc3RpbmcgY29ubmVjdGlvbiBtdXN0IGJlIGNsb3NlZCBiZWZvcmUgb3BlbmluZ1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIk9wZW5pbmcgV2ViU29ja2V0LCBjdXJyZW50IHN0YXRlIGlzIFwiICsgKHRoaXMuZ2V0U3RhdGUoKSkgKyBcIiwgc3VicHJvdG9jb2xzOiBcIiArIHByb3RvY29scyk7XG4gICAgICAgIGlmICh0aGlzLndlYlNvY2tldCAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy51bmluc3RhbGxFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KHRoaXMuY29uc3VtZXIudXJsLCBwcm90b2NvbHMpO1xuICAgICAgICB0aGlzLmluc3RhbGxFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMubW9uaXRvci5zdGFydCgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHZhciBhbGxvd1JlY29ubmVjdCwgcmVmMTtcbiAgICAgIGFsbG93UmVjb25uZWN0ID0gKGFyZyAhPSBudWxsID8gYXJnIDoge1xuICAgICAgICBhbGxvd1JlY29ubmVjdDogdHJ1ZVxuICAgICAgfSkuYWxsb3dSZWNvbm5lY3Q7XG4gICAgICBpZiAoIWFsbG93UmVjb25uZWN0KSB7XG4gICAgICAgIHRoaXMubW9uaXRvci5zdG9wKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiAocmVmMSA9IHRoaXMud2ViU29ja2V0KSAhPSBudWxsID8gcmVmMS5jbG9zZSgpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5yZW9wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBlcnJvciwgZXJyb3IxO1xuICAgICAgQWN0aW9uQ2FibGUubG9nKFwiUmVvcGVuaW5nIFdlYlNvY2tldCwgY3VycmVudCBzdGF0ZSBpcyBcIiArICh0aGlzLmdldFN0YXRlKCkpKTtcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZSgpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcjEpIHtcbiAgICAgICAgICBlcnJvciA9IGVycm9yMTtcbiAgICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiRmFpbGVkIHRvIHJlb3BlbiBXZWJTb2NrZXRcIiwgZXJyb3IpO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIlJlb3BlbmluZyBXZWJTb2NrZXQgaW4gXCIgKyB0aGlzLmNvbnN0cnVjdG9yLnJlb3BlbkRlbGF5ICsgXCJtc1wiKTtcbiAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMub3BlbiwgdGhpcy5jb25zdHJ1Y3Rvci5yZW9wZW5EZWxheSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4oKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UHJvdG9jb2wgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWYxO1xuICAgICAgcmV0dXJuIChyZWYxID0gdGhpcy53ZWJTb2NrZXQpICE9IG51bGwgPyByZWYxLnByb3RvY29sIDogdm9pZCAwO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc09wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzU3RhdGUoXCJvcGVuXCIpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNTdGF0ZShcIm9wZW5cIiwgXCJjb25uZWN0aW5nXCIpO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc1Byb3RvY29sU3VwcG9ydGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVmMTtcbiAgICAgIHJldHVybiByZWYxID0gdGhpcy5nZXRQcm90b2NvbCgpLCBpbmRleE9mLmNhbGwoc3VwcG9ydGVkUHJvdG9jb2xzLCByZWYxKSA+PSAwO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pc1N0YXRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVmMSwgc3RhdGVzO1xuICAgICAgc3RhdGVzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4gcmVmMSA9IHRoaXMuZ2V0U3RhdGUoKSwgaW5kZXhPZi5jYWxsKHN0YXRlcywgcmVmMSkgPj0gMDtcbiAgICB9O1xuXG4gICAgQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWYxLCBzdGF0ZSwgdmFsdWU7XG4gICAgICBmb3IgKHN0YXRlIGluIFdlYlNvY2tldCkge1xuICAgICAgICB2YWx1ZSA9IFdlYlNvY2tldFtzdGF0ZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gKChyZWYxID0gdGhpcy53ZWJTb2NrZXQpICE9IG51bGwgPyByZWYxLnJlYWR5U3RhdGUgOiB2b2lkIDApKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS5pbnN0YWxsRXZlbnRIYW5kbGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGV2ZW50TmFtZSwgaGFuZGxlcjtcbiAgICAgIGZvciAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgIGhhbmRsZXIgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMud2ViU29ja2V0W1wib25cIiArIGV2ZW50TmFtZV0gPSBoYW5kbGVyO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBDb25uZWN0aW9uLnByb3RvdHlwZS51bmluc3RhbGxFdmVudEhhbmRsZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXZlbnROYW1lO1xuICAgICAgZm9yIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgdGhpcy53ZWJTb2NrZXRbXCJvblwiICsgZXZlbnROYW1lXSA9IGZ1bmN0aW9uKCkge307XG4gICAgICB9XG4gICAgfTtcblxuICAgIENvbm5lY3Rpb24ucHJvdG90eXBlLmV2ZW50cyA9IHtcbiAgICAgIG1lc3NhZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBpZGVudGlmaWVyLCBtZXNzYWdlLCByZWYxLCB0eXBlO1xuICAgICAgICBpZiAoIXRoaXMuaXNQcm90b2NvbFN1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlZjEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpLCBpZGVudGlmaWVyID0gcmVmMS5pZGVudGlmaWVyLCBtZXNzYWdlID0gcmVmMS5tZXNzYWdlLCB0eXBlID0gcmVmMS50eXBlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIG1lc3NhZ2VfdHlwZXMud2VsY29tZTpcbiAgICAgICAgICAgIHRoaXMubW9uaXRvci5yZWNvcmRDb25uZWN0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLnJlbG9hZCgpO1xuICAgICAgICAgIGNhc2UgbWVzc2FnZV90eXBlcy5waW5nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9uaXRvci5yZWNvcmRQaW5nKCk7XG4gICAgICAgICAgY2FzZSBtZXNzYWdlX3R5cGVzLmNvbmZpcm1hdGlvbjpcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMubm90aWZ5KGlkZW50aWZpZXIsIFwiY29ubmVjdGVkXCIpO1xuICAgICAgICAgIGNhc2UgbWVzc2FnZV90eXBlcy5yZWplY3Rpb246XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLnJlamVjdChpZGVudGlmaWVyKTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5ub3RpZnkoaWRlbnRpZmllciwgXCJyZWNlaXZlZFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9wZW46IGZ1bmN0aW9uKCkge1xuICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJXZWJTb2NrZXQgb25vcGVuIGV2ZW50LCB1c2luZyAnXCIgKyAodGhpcy5nZXRQcm90b2NvbCgpKSArIFwiJyBzdWJwcm90b2NvbFwiKTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzUHJvdG9jb2xTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgIEFjdGlvbkNhYmxlLmxvZyhcIlByb3RvY29sIGlzIHVuc3VwcG9ydGVkLiBTdG9wcGluZyBtb25pdG9yIGFuZCBkaXNjb25uZWN0aW5nLlwiKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zZSh7XG4gICAgICAgICAgICBhbGxvd1JlY29ubmVjdDogZmFsc2VcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsb3NlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBBY3Rpb25DYWJsZS5sb2coXCJXZWJTb2NrZXQgb25jbG9zZSBldmVudFwiKTtcbiAgICAgICAgaWYgKHRoaXMuZGlzY29ubmVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tb25pdG9yLnJlY29yZERpc2Nvbm5lY3QoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaXB0aW9ucy5ub3RpZnlBbGwoXCJkaXNjb25uZWN0ZWRcIiwge1xuICAgICAgICAgIHdpbGxBdHRlbXB0UmVjb25uZWN0OiB0aGlzLm1vbml0b3IuaXNSdW5uaW5nKClcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gQWN0aW9uQ2FibGUubG9nKFwiV2ViU29ja2V0IG9uZXJyb3IgZXZlbnRcIik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBDb25uZWN0aW9uO1xuXG4gIH0pKCk7XG5cbn0pLmNhbGwod2luZG93KTtcbihmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgQWN0aW9uQ2FibGUuU3Vic2NyaXB0aW9ucyA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTdWJzY3JpcHRpb25zKGNvbnN1bWVyKSB7XG4gICAgICB0aGlzLmNvbnN1bWVyID0gY29uc3VtZXI7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICB9XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbihjaGFubmVsTmFtZSwgbWl4aW4pIHtcbiAgICAgIHZhciBjaGFubmVsLCBwYXJhbXMsIHN1YnNjcmlwdGlvbjtcbiAgICAgIGNoYW5uZWwgPSBjaGFubmVsTmFtZTtcbiAgICAgIHBhcmFtcyA9IHR5cGVvZiBjaGFubmVsID09PSBcIm9iamVjdFwiID8gY2hhbm5lbCA6IHtcbiAgICAgICAgY2hhbm5lbDogY2hhbm5lbFxuICAgICAgfTtcbiAgICAgIHN1YnNjcmlwdGlvbiA9IG5ldyBBY3Rpb25DYWJsZS5TdWJzY3JpcHRpb24odGhpcy5jb25zdW1lciwgcGFyYW1zLCBtaXhpbik7XG4gICAgICByZXR1cm4gdGhpcy5hZGQoc3Vic2NyaXB0aW9uKTtcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgdGhpcy5jb25zdW1lci5lbnN1cmVBY3RpdmVDb25uZWN0aW9uKCk7XG4gICAgICB0aGlzLm5vdGlmeShzdWJzY3JpcHRpb24sIFwiaW5pdGlhbGl6ZWRcIik7XG4gICAgICB0aGlzLnNlbmRDb21tYW5kKHN1YnNjcmlwdGlvbiwgXCJzdWJzY3JpYmVcIik7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZm9yZ2V0KHN1YnNjcmlwdGlvbik7XG4gICAgICBpZiAoIXRoaXMuZmluZEFsbChzdWJzY3JpcHRpb24uaWRlbnRpZmllcikubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2VuZENvbW1hbmQoc3Vic2NyaXB0aW9uLCBcInVuc3Vic2NyaWJlXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUucmVqZWN0ID0gZnVuY3Rpb24oaWRlbnRpZmllcikge1xuICAgICAgdmFyIGksIGxlbiwgcmVmLCByZXN1bHRzLCBzdWJzY3JpcHRpb247XG4gICAgICByZWYgPSB0aGlzLmZpbmRBbGwoaWRlbnRpZmllcik7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gcmVmW2ldO1xuICAgICAgICB0aGlzLmZvcmdldChzdWJzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLm5vdGlmeShzdWJzY3JpcHRpb24sIFwicmVqZWN0ZWRcIik7XG4gICAgICAgIHJlc3VsdHMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfTtcblxuICAgIFN1YnNjcmlwdGlvbnMucHJvdG90eXBlLmZvcmdldCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgdmFyIHM7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIHMgPSByZWZbaV07XG4gICAgICAgICAgaWYgKHMgIT09IHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5maW5kQWxsID0gZnVuY3Rpb24oaWRlbnRpZmllcikge1xuICAgICAgdmFyIGksIGxlbiwgcmVmLCByZXN1bHRzLCBzO1xuICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHMgPSByZWZbaV07XG4gICAgICAgIGlmIChzLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gocyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5yZWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlZiwgcmVzdWx0cywgc3Vic2NyaXB0aW9uO1xuICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbiA9IHJlZltpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc2VuZENvbW1hbmQoc3Vic2NyaXB0aW9uLCBcInN1YnNjcmliZVwiKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUubm90aWZ5QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncywgY2FsbGJhY2tOYW1lLCBpLCBsZW4sIHJlZiwgcmVzdWx0cywgc3Vic2NyaXB0aW9uO1xuICAgICAgY2FsbGJhY2tOYW1lID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICByZWYgPSB0aGlzLnN1YnNjcmlwdGlvbnM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gcmVmW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5ub3RpZnkuYXBwbHkodGhpcywgW3N1YnNjcmlwdGlvbiwgY2FsbGJhY2tOYW1lXS5jb25jYXQoc2xpY2UuY2FsbChhcmdzKSkpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb25zLnByb3RvdHlwZS5ub3RpZnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBjYWxsYmFja05hbWUsIGksIGxlbiwgcmVzdWx0cywgc3Vic2NyaXB0aW9uLCBzdWJzY3JpcHRpb25zO1xuICAgICAgc3Vic2NyaXB0aW9uID0gYXJndW1lbnRzWzBdLCBjYWxsYmFja05hbWUgPSBhcmd1bWVudHNbMV0sIGFyZ3MgPSAzIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBbXTtcbiAgICAgIGlmICh0eXBlb2Ygc3Vic2NyaXB0aW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMgPSB0aGlzLmZpbmRBbGwoc3Vic2NyaXB0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1YnNjcmlwdGlvbnMgPSBbc3Vic2NyaXB0aW9uXTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHN1YnNjcmlwdGlvbnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHR5cGVvZiBzdWJzY3JpcHRpb25bY2FsbGJhY2tOYW1lXSA9PT0gXCJmdW5jdGlvblwiID8gc3Vic2NyaXB0aW9uW2NhbGxiYWNrTmFtZV0uYXBwbHkoc3Vic2NyaXB0aW9uLCBhcmdzKSA6IHZvaWQgMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9O1xuXG4gICAgU3Vic2NyaXB0aW9ucy5wcm90b3R5cGUuc2VuZENvbW1hbmQgPSBmdW5jdGlvbihzdWJzY3JpcHRpb24sIGNvbW1hbmQpIHtcbiAgICAgIHZhciBpZGVudGlmaWVyO1xuICAgICAgaWRlbnRpZmllciA9IHN1YnNjcmlwdGlvbi5pZGVudGlmaWVyO1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3VtZXIuc2VuZCh7XG4gICAgICAgIGNvbW1hbmQ6IGNvbW1hbmQsXG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXJcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gU3Vic2NyaXB0aW9ucztcblxuICB9KSgpO1xuXG59KS5jYWxsKHdpbmRvdyk7XG4oZnVuY3Rpb24oKSB7XG4gIEFjdGlvbkNhYmxlLlN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXh0ZW5kO1xuXG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKGNvbnN1bWVyLCBwYXJhbXMsIG1peGluKSB7XG4gICAgICB0aGlzLmNvbnN1bWVyID0gY29uc3VtZXI7XG4gICAgICBpZiAocGFyYW1zID09IG51bGwpIHtcbiAgICAgICAgcGFyYW1zID0ge307XG4gICAgICB9XG4gICAgICB0aGlzLmlkZW50aWZpZXIgPSBKU09OLnN0cmluZ2lmeShwYXJhbXMpO1xuICAgICAgZXh0ZW5kKHRoaXMsIG1peGluKTtcbiAgICB9XG5cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnBlcmZvcm0gPSBmdW5jdGlvbihhY3Rpb24sIGRhdGEpIHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgZGF0YSA9IHt9O1xuICAgICAgfVxuICAgICAgZGF0YS5hY3Rpb24gPSBhY3Rpb247XG4gICAgICByZXR1cm4gdGhpcy5zZW5kKGRhdGEpO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdW1lci5zZW5kKHtcbiAgICAgICAgY29tbWFuZDogXCJtZXNzYWdlXCIsXG4gICAgICAgIGlkZW50aWZpZXI6IHRoaXMuaWRlbnRpZmllcixcbiAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25zdW1lci5zdWJzY3JpcHRpb25zLnJlbW92ZSh0aGlzKTtcbiAgICB9O1xuXG4gICAgZXh0ZW5kID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0aWVzKSB7XG4gICAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICAgIGlmIChwcm9wZXJ0aWVzICE9IG51bGwpIHtcbiAgICAgICAgZm9yIChrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgIHZhbHVlID0gcHJvcGVydGllc1trZXldO1xuICAgICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfTtcblxuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG5cbiAgfSkoKTtcblxufSkuY2FsbCh3aW5kb3cpO1xuKGZ1bmN0aW9uKCkge1xuICBBY3Rpb25DYWJsZS5Db25zdW1lciA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBDb25zdW1lcih1cmwpIHtcbiAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IEFjdGlvbkNhYmxlLlN1YnNjcmlwdGlvbnModGhpcyk7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24gPSBuZXcgQWN0aW9uQ2FibGUuQ29ubmVjdGlvbih0aGlzKTtcbiAgICB9XG5cbiAgICBDb25zdW1lci5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24uc2VuZChkYXRhKTtcbiAgICB9O1xuXG4gICAgQ29uc3VtZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24ub3BlbigpO1xuICAgIH07XG5cbiAgICBDb25zdW1lci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGlvbi5jbG9zZSh7XG4gICAgICAgIGFsbG93UmVjb25uZWN0OiBmYWxzZVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIENvbnN1bWVyLnByb3RvdHlwZS5lbnN1cmVBY3RpdmVDb25uZWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuY29ubmVjdGlvbi5pc0FjdGl2ZSgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3Rpb24ub3BlbigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gQ29uc3VtZXI7XG5cbiAgfSkoKTtcblxufSkuY2FsbCh3aW5kb3cpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9BY3Rpb25DYWJsZS5qcyIsImltcG9ydCB7JGh0dHB9IGZyb20gJy4uL2NvbW1vbi9hamF4JztcbmltcG9ydCB7cm9vdEFQSX0gZnJvbSAnLi4vZ2xvYmFsL2NvbnN0YW50JztcbmltcG9ydCB7aHRtbH0gZnJvbSAnLi4vY29tbW9uL3RlbXBsYXRlJztcbmltcG9ydCB7cG9wdXB9IGZyb20gJy4uL2NvbW1vbi9wb3B1cCc7XG5pbXBvcnQge3NsaWRlfSBmcm9tICcuLi9jb21tb24vc2xpZGUnO1xuaW1wb3J0IHtpbnNlcnRBZnRlciwgc3RyVG9Eb20sIGRlYm91bmNlfSBmcm9tICcuLi9jb21tb24vdXRpbGl0aWVzJztcbmltcG9ydCB7Zmxhc2gsIHBhcnNlQW5kRmxhc2h9IGZyb20gJy4uL2NvbW1vbi9mbGFzaCc7XG5pbXBvcnQge0FwaURvbX0gZnJvbSAnLi4vYXBpLXRyZWUvdHJlZURvbSc7XG5pbXBvcnQge3R3b1dheURhdGFCaW5kaW5nfSBmcm9tICcuLi9jb21tb24vdHdvV2F5RGF0YUJpbmRpbmcnO1xuXG5sZXQgcGF5bG9hZCA9IHt9O1xubGV0IGFwaXNBcnIgPSBbXTtcblxudmFyIGNhbGxiYWNrID0ge1xuICBnZXRBcGlTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgYWRkQXBpVHJlZShKU09OLnBhcnNlKGRhdGEpLCB0aGlzLCBmYWxzZSk7XG4gIH0sXG4gIGdldEFsbEFwaXNTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IGRhdGFCYWsgPSBkYXRhO1xuICAgIGxldCBKU09OQmFrID0gSlNPTi5wYXJzZShkYXRhQmFrKTtcbiAgICBpZiAoSlNPTkJhay5sZW5ndGggPT09IDApIHtcbiAgICAgIG5ld0FwaUJ0bigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZW5kZXJBbGxBcGlzKGRhdGEpO1xuICAgIGJpbmRldmVudHMoKTtcbiAgICBsaXN0ZW5BcGlRdWVyeSgpO1xuICB9LFxuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBwb3N0U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIGRlbGV0ZVN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBmdW5jdGlvbiBkZXN0b3J5QXBpTGkoKSB7XG4gICAgICB0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLXVsJykucmVtb3ZlQ2hpbGQodGhpcy50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICB9XG4gICAgcGFyc2VBbmRGbGFzaChkYXRhLCBkZXN0b3J5QXBpTGkuYmluZCh0aGlzKSk7XG4gIH0sXG4gIGFwaVF1ZXJ5U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBzZWFyY2hMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlYXJjaC1yZXN1bHQnKVswXTtcbiAgICBsZXQgZGF0YU9iaiA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgbGV0IGNvbnRlbnRTdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMCwgTGVuID0gZGF0YU9iai5sZW5ndGg7IGkgPCBMZW47IGkrKykge1xuICAgICAgY29udGVudFN0ciArPSBgPGRpdiBjbGFzcz0ncGVyLXNlYXJjaC1yZXN1bHQnPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1yZXN1bHQtY29sdW1uIHBlci1yZXN1bHQtdXJpXCI+JHtkYXRhT2JqW2ldLnVyaX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1zZWN0aW9uXCI+JHtkYXRhT2JqW2ldLnNlY3Rpb259PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInBlci1yZXN1bHQtY29sdW1uIHBlci1yZXN1bHQtbWV0aG9kXCI+JHtkYXRhT2JqW2ldLm1ldGhvZH08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXJlc3VsdC1jb2x1bW4gcGVyLXJlc3VsdC1kZXNjcmlwdGlvblwiPiR7ZGF0YU9ialtpXS5kZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICA8L2Rpdj5gO1xuICAgIH1cbiAgICBzZWFyY2hMaXN0LmlubmVySFRNTCA9IGNvbnRlbnRTdHI7XG4gICAgZGF0YU9iai5sZW5ndGggPiAwID8gc2VhcmNoTGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykgOiBzZWFyY2hMaXN0LmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTsgICAgXG4gIH0sXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgfSxcbiAgZXJyb3I6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuZGF0YSkge1xuICAgICAgbmV3QXBpQnRuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5leHBvcnQgZnVuY3Rpb24gaW5pdFhocigpIHtcbiAgZ2V0QWxsQXBpcygpO1xufVxuXG5sZXQgZGVib3VuY2VkQXBpUXVlcnlJbnB1dCA9IGRlYm91bmNlKGFwaVF1ZXJ5LCAxMDAsIGZhbHNlKTtcbmZ1bmN0aW9uIGxpc3RlbkFwaVF1ZXJ5KCkge1xuICBsZXQgYXBpUXVlcnlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1xdWVyeScpWzBdO1xuICBsZXQgaW5XcmFwcGVyID0gZmFsc2U7XG4gIGFwaVF1ZXJ5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBkZWJvdW5jZWRBcGlRdWVyeUlucHV0KTtcbiAgYXBpUXVlcnlJbnB1dC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihldikge1xuICAgIGlmICghY2hlY2tJZkZvY3VzLmFwcGx5KGFwaVF1ZXJ5SW5wdXQsIGV2KSkge1xuICAgICAgY2xlYXJTZWFyY2hSZXN1bHQoKTtcbiAgICB9O1xuICAgIGluV3JhcHBlciA9IGZhbHNlO1xuICB9KTtcbiAgYXBpUXVlcnlJbnB1dC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbihldikge1xuICAgIGluV3JhcHBlciA9IHRydWU7XG4gIH0pO1xuICBhcGlRdWVyeUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBmdW5jdGlvbihldikge1xuICAgIGlmICghaW5XcmFwcGVyKSBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICB9KTtcbiAgYXBpUXVlcnlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFwaVF1ZXJ5KTtcbn1cbmZ1bmN0aW9uIGNoZWNrSWZGb2N1cyhldikge1xuICByZXR1cm4gdGhpcyA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbn1cbmZ1bmN0aW9uIGFwaVF1ZXJ5KGV2KSB7XG4gIGlmIChldi50YXJnZXQudmFsdWUubGVuZ3RoIDw9IDApIHtcbiAgICBjbGVhclNlYXJjaFJlc3VsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBwYXlsb2FkID0ge3E6IGV2LnRhcmdldC52YWx1ZX07XG4gICRodHRwKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gKyAnL2luc3RhbnRzZWFyY2gnKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmFwaVF1ZXJ5U3VjY2Vzcy5iaW5kKGV2KSlcbiAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbn1cbmZ1bmN0aW9uIGNsZWFyU2VhcmNoUmVzdWx0KCkge1xuICBsZXQgYXBpU2VhcmNoUmVzdWx0RWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNlYXJjaC1yZXN1bHQnKVswXTtcbiAgYXBpU2VhcmNoUmVzdWx0RWxlLmlubmVySFRNTCA9ICcnO1xuICBhcGlTZWFyY2hSZXN1bHRFbGUuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xufVxuZnVuY3Rpb24gdG9nZ2xlRm9sZExpKGNvbnRleHQsIGV2KSB7XG4gIGlmICghZXYpIHtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWV2LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1saS13aWtpJykpIHtcbiAgICBjb250ZXh0LmNsYXNzTGlzdC50b2dnbGUoJ3VuZm9sZCcpO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kRXZlbnRUb0FwaUxpRGVzY3JpcHRpb24oZXYpIHtcbiAgdG9nZ2xlRm9sZExpKHRoaXMsIGV2KTtcbiAgaWYgKHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9O1xuICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5wYXJlbnROb2RlLmRhdGFzZXQuYXBpSWQpXG4gIC5nZXQocGF5bG9hZClcbiAgLnRoZW4oY2FsbGJhY2suZ2V0QXBpU3VjY2Vzcy5iaW5kKHRoaXMucGFyZW50Tm9kZSkpXG4gIC5jYXRjaChjYWxsYmFjay5lcnJvcik7XG59XG5mdW5jdGlvbiBiaW5kZXZlbnRzKCkge1xuICBsZXQgYXBpTGlzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLWxpLXN1bW1hcnknKTtcbiAgW10uc2xpY2UuY2FsbChhcGlMaXMpLmZvckVhY2goZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRBcGlUcmVlKGRhdGEgPSB7fSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpIHtcbiAgbGV0IG5ld0FwaSA9IG5ldyBBcGlEb20oZGF0YSwgY29udGFpbmVyTm9kZSwgaXNOZXdBcGkpO1xuICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcbn1cblxubGV0IGRlYm91bmNlZE5ld0FwaUJ0biA9IGRlYm91bmNlKHByb2Nlc3NOZXdBcGlDbGljaywgNTAwLCB0cnVlKTtcbmxldCBkZWJvdW5jZWRFbnZCdG4gPSBkZWJvdW5jZShwcm9jZXNzT3BlbkVudlNldHRpbmdzLCA1MDAsIHRydWUpO1xuZnVuY3Rpb24gcHJvY2Vzc09wZW5FbnZTZXR0aW5ncyhldiwgZWwpIHtcbiAgbGV0IHBhcmFtcyA9IHtcbiAgICBjb250ZW50OiBzbGlkZUNvbnRlbnQoKVxuICB9O1xuICBzbGlkZShldiwgcGFyYW1zKTtcbn1cbmZ1bmN0aW9uIHNsaWRlQ29udGVudCgpIHtcbiAgbGV0IHRwbFN0ciA9IGBcbiAgICA8dWw+XG4gICAgICA8bGk+XG4gICAgICAgIDxsYWJlbD5ob3N0OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxsYWJlbD5hY2NvdW50OjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCBjbGFzcz1cImMtaW5wdXRcIiB0eXBlPVwidGV4dFwiIC8+XG4gICAgICAgIDxsYWJlbD5sYWJlbDo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJjLWlucHV0XCIgdHlwZT1cInRleHRcIiAvPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJcIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCJjaGVjayBhdmFpbGFiaWxpdHlcIiAvPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICBgO1xuICByZXR1cm4gdHBsU3RyO1xufVxuZnVuY3Rpb24gcHJvY2Vzc05ld0FwaUNsaWNrKCkge1xuICBsZXQgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgaWYgKCFhcGlVbCkge1xuICAgIGNyZWF0ZUFwaVVsKCk7XG4gICAgYXBpVWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdWwnKVswXTtcbiAgfVxuICBsZXQgYmFzZUFwaUxpID0gc3RyVG9Eb20obmV3QXBpTGlUcGwoKSk7XG4gIGFwaVVsLmluc2VydEJlZm9yZShiYXNlQXBpTGksIGFwaVVsLmZpcnN0Q2hpbGQpO1xuICBhZGRBcGlUcmVlKHt9LCBiYXNlQXBpTGksIHRydWUpO1xuICB0b2dnbGVGb2xkTGkoYmFzZUFwaUxpLmNoaWxkcmVuWzBdKTtcbiAgYmFzZUFwaUxpLmNoaWxkcmVuWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGJpbmRFdmVudFRvQXBpTGlEZXNjcmlwdGlvbi5jYWxsKHRoaXMsIGV2KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXBpVWwoKSB7XG4gIGxldCBhcGlMaXN0RWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxldCBhcGlVbEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGxldCBuZXdBcGlEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktYWRkLXF1ZXJ5JylbMF07XG4gIGFwaUxpc3RFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsLXdyYXBwZXInKTtcbiAgYXBpVWxFbGUuY2xhc3NMaXN0LmFkZCgnYXBpLXVsJyk7XG4gIGFwaUxpc3RFbGUuYXBwZW5kQ2hpbGQoYXBpVWxFbGUpO1xuICBpbnNlcnRBZnRlcihhcGlMaXN0RWxlLCBuZXdBcGlEaXYpO1xufVxuZnVuY3Rpb24gbmV3QXBpQnRuKCkge1xuICBsZXQgbmV3QXBpRGl2O1xuICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWRlcicpWzBdO1xuICBsZXQgbmV3QXBpU3RyID0gYFxuICAgIDxkaXYgY2xhc3M9XCJhcGktYWRkLXF1ZXJ5XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImFkZC1hcGktYnRuXCI+bmV3IEFQSTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktc2VhcmNoLXdyYXBwZXJcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiYXBpLXF1ZXJ5XCIgdHlwZT1cInNlYXJjaFwiIHBsYWNlaG9sZGVyPVwic2VhcmNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcGktc2VhcmNoLXJlc3VsdCBoaWRlXCI+PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxhIGNsYXNzPVwiYy1oaWRlIGljb24tdGV4dC1saW5rIGMtZmxvYXQtcmlnaHQgZGV2LWVudi1zZXR0aW5nc1wiIGhyZWY9XCJqYXZhc2NyaXB0OjtcIj48c3BhbiBjbGFzcz1cImljb24tdGV4dC1pY29uXCI+PHN2ZyBjbGFzcz1cImljb24gaWNvbi1zZXR0aW5ncyBpY29uLWZpdFwiPjx1c2UgeGxpbms6aHJlZj1cIiNpY29uLXNldHRpbmdzXCI+PC91c2U+PC9zdmc+PC9zcGFuPjxzcGFuIGNsYXNzPVwiaWNvbi10ZXh0LXRleHRcIj7njq/looPlkIzmraXmlbDmja7phY3nva48L3NwYW4+PC9hPlxuICAgIDwvZGl2PlxuICBgO1xuICBuZXdBcGlEaXYgPSBzdHJUb0RvbShuZXdBcGlTdHIpO1xuICBuZXdBcGlEaXYuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkLWFwaS1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlZE5ld0FwaUJ0bik7XG4gIG5ld0FwaURpdi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkZXYtZW52LXNldHRpbmdzJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkZWJvdW5jZWRFbnZCdG4pO1xuICBpbnNlcnRBZnRlcihuZXdBcGlEaXYsIGhlYWRlcik7XG4gIHJldHVybiBuZXdBcGlEaXY7XG59XG5cbmZ1bmN0aW9uIG5ld0FwaUxpVHBsKGRhdGEgPSB7fSkge1xuICB2YXIgdHBsID0gYFxuICAgIDxsaSBjbGFzcz1cImFwaS1saVwiIGRhdGEtYXBpLWlkPVwiJHtkYXRhLmlkIHx8IG51bGx9XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLWxpLXN1bW1hcnlcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktY29sbGFwc2VcIj48c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWRvd25cIj48dXNlIHhsaW5rOmhyZWY9XCIjaWNvbi1kb3duXCI+PC91c2U+PC9zdmc+PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1saS11cmlcIiBiaW5kPVwidXJpXCI+JHtkYXRhLnVyaSB8fCAnKE5vIHVyaSknfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktbGktZGVzXCIgYmluZD1cImRlc2NyaXB0aW9uXCI+JHtkYXRhLmRlc2NyaXB0aW9uID8gZGF0YS5kZXNjcmlwdGlvbiA6ICcoTm8gZGVzY3JpcHRpb24pJ308L3NwYW4+XG4gICAgICAgIDxhIGhyZWY9XCIke2RhdGEud2lraUxpbmt9XCIgY2xhc3M9XCJhcGktbGktd2lraVwiIGJpbmQtYXR0ci1ocmVmPVwid2lraUxpbmtcIiBiaW5kPVwid2lraUxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIj4ke2RhdGEud2lraUxpbmsgPyBkYXRhLndpa2lMaW5rIDogJyhObyB3aWtpTGluayknfTwvYT5cbiAgICAgIDwvZGl2PlxuICAgIDwvbGk+XG4gIGA7XG4gIHJldHVybiB0cGw7XG59XG5mdW5jdGlvbiByZW5kZXJBbGxBcGlzKGRhdGEpIHtcbiAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gIGNvbnN0IHRtcGwgPSBkYXRhID0+IGh0bWxgXG4gICAgICA8dWwgY2xhc3M9XCJhcGktdWxcIj5cbiAgICAgICR7ZGF0YS5tYXAoaXRlbSA9PiBodG1sYFxuICAgICAgICAke25ld0FwaUxpVHBsKGl0ZW0pfVxuICAgICAgYCl9XG4gICAgICA8L3VsPlxuICBgO1xuICBsZXQgYXBpTGlzdEVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBhcGlMaXN0RWxlLmNsYXNzTGlzdC5hZGQoJ2FwaS11bC13cmFwcGVyJyk7XG4gIGFwaUxpc3RFbGUuaW5uZXJIVE1MID0gdG1wbChkYXRhKTtcbiAgaW5zZXJ0QWZ0ZXIoYXBpTGlzdEVsZSwgbmV3QXBpQnRuKCkpO1xufVxuXG5mdW5jdGlvbiBnZXRBbGxBcGlzKCkge1xuICAkaHR0cChyb290QVBJKVxuICAuZ2V0KHBheWxvYWQpXG4gIC50aGVuKGNhbGxiYWNrLmdldEFsbEFwaXNTdWNjZXNzKVxuICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xufVxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2FwaU9wZXJhdGlvbi5qcyIsImltcG9ydCB7aGFuZGxlTWV0aG9kfSBmcm9tICcuLi9jb21tb24vaGFuZGxlTWV0aG9kJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRhdGFMaW5rcygpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzRGF0YUxpbmssIGZhbHNlKTtcbn1cbmZ1bmN0aW9uIHByb2Nlc3NEYXRhTGluayhlKSB7XG4gIHZhciBlID0gd2luZG93LmUgfHwgZTtcblxuICBpZiAoZS50YXJnZXQudGFnTmFtZSAhPT0gJ0EnKVxuICAgICAgcmV0dXJuO1xuXG4gIC8vIERvIHNvbWV0aGluZ1xuICBpZiAoZS50YXJnZXQuZGF0YXNldC5tZXRob2QgPT09ICdkZWxldGUnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAnUEFUQ0gnKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCk7XG4gIH1cbiAgLy8gaWYgKGUudGFyZ2V0LmRhdGFzZXQubWV0aG9kID09PSAncGF0Y2gnKSB7XG4gIC8vICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgIGhhbmRsZU1ldGhvZChlLnRhcmdldCwge1xuICAvLyAgICAgbnM6ICdhcGknLFxuICAvLyAgICAgZGF0YToge1xuICAvLyAgICAgICBzZWN0aW9uOiAnd2lzZScsXG4gIC8vICAgICAgIGlkOiAnMidcbiAgLy8gICAgIH1cbiAgLy8gICB9KTtcbiAgLy8gfVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy9kYXRhTGlua3MuanMiLCJpbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZmNwKCkge1xyXG5cdGNvbnNvbGUubG9nKCdmY3AnKTtcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9tb2R1bGVzL2Zpc0NpUGx1Z2lucy5qcyIsImltcG9ydCB7dHdlZXRCb3h9IGZyb20gJy4vdHdlZXRCb3gnO1xuZXhwb3J0IGZ1bmN0aW9uIGhvbWUoKSB7XG5cdHR3ZWV0Qm94KCk7XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL21vZHVsZXMvaG9tZXBhZ2UuanMiLCJpbXBvcnQge1RyZWV9IGZyb20gJy4vdHJlZSc7XG5leHBvcnQgZnVuY3Rpb24ganNvblRvVHJlZShub2Rlc0Fycikge1xuICBsZXQgaGFzaFRhYmxlID0ge307XG4gIGxldCB0cmVlO1xuICBmb3IgKGxldCBpID0gMCwgbm9kZXNMZW4gPSBub2Rlc0Fyci5sZW5ndGg7IGkgPCBub2Rlc0xlbjsgaSsrKSB7XG4gICAgaGFzaFRhYmxlW25vZGVzQXJyW2ldWydwYXJlbnRJZCddXSA/IGhhc2hUYWJsZVtub2Rlc0FycltpXVsncGFyZW50SWQnXV0ucHVzaChub2Rlc0FycltpXSkgOiBoYXNoVGFibGVbbm9kZXNBcnJbaV1bJ3BhcmVudElkJ11dID0gW25vZGVzQXJyW2ldXTtcbiAgfVxuICAvLyBub2RlIOeahOWtkOiKgueCueeahElE5oC75piv5aSn5LqObm9kZeeahElEXG4gIGxldCBtb2RLZXlzQXJyID0gcmVtb3ZlRWxlRnJvbUFycihPYmplY3Qua2V5cyhoYXNoVGFibGUpLCAnbnVsbCcpLm1hcChOdW1iZXIpLnNvcnQoc29ydE51bWJlcik7XG4gIGxldCByb290Tm9kZURhdGEgPSBoYXNoVGFibGVbJ251bGwnXVswXTtcbiAgdHJlZSA9IG5ldyBUcmVlKHJvb3ROb2RlRGF0YSk7XG5cbiAgZm9yIChsZXQgaiA9IDAsIGtleXNMZW4gPSBtb2RLZXlzQXJyLmxlbmd0aDsgaiA8IGtleXNMZW47IGorKykge1xuICAgIGlmIChoYXNoVGFibGUuaGFzT3duUHJvcGVydHkobW9kS2V5c0FycltqXSkpIHtcbiAgICAgIGZvciAobGV0IGsgPSAwLCBrZXlBcnJMZW4gPSBoYXNoVGFibGVbbW9kS2V5c0FycltqXV0ubGVuZ3RoOyBrIDwga2V5QXJyTGVuOyBrKyspIHtcbiAgICAgICAgdHJlZS5hZGQoaGFzaFRhYmxlW21vZEtleXNBcnJbal1dW2tdLCArbW9kS2V5c0FycltqXSwgdHJlZS50cmF2ZXJzZUJGKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRyZWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUVsZUZyb21BcnIoYXJyLCBlbGUpIHtcbiAgdmFyIGluZGV4ID0gYXJyLmluZGV4T2YoZWxlKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vKiBCeSBkZWZhdWx0IHRoZSBzb3J0IG1ldGhvZCBzb3J0cyBlbGVtZW50cyBhbHBoYWJldGljYWxseS4gKi9cbmZ1bmN0aW9uIHNvcnROdW1iZXIoYSwgYikge1xuICByZXR1cm4gYSAtIGI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmVlVG9Kc29uKHRyZWUpIHtcblxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9qc29uVHJlZUNvbnZlcnRlci5qcyIsIi8qKlxuICogW1F1ZXVlIGRlc2NyaXB0aW9uXVxuICogZW5xdWV1ZShkYXRhKSBhZGRzIGRhdGEgdG8gYSBxdWV1ZS5cbiAqIGRlcXVldWUgcmVtb3ZlcyB0aGUgb2xkZXN0IGFkZGVkIGRhdGEgdG8gYSBxdWV1ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIFF1ZXVlKCkge1xuICB0aGlzLl9vbGRlc3RJbmRleCA9IDE7XG4gIHRoaXMuX25ld2VzdEluZGV4ID0gMTtcbiAgdGhpcy5fc3RvcmFnZSA9IHt9O1xufVxuXG5RdWV1ZS5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5fbmV3ZXN0SW5kZXggLSB0aGlzLl9vbGRlc3RJbmRleDtcbn07XG5cblF1ZXVlLnByb3RvdHlwZS5lbnF1ZXVlID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLl9zdG9yYWdlW3RoaXMuX25ld2VzdEluZGV4XSA9IGRhdGE7XG4gIHRoaXMuX25ld2VzdEluZGV4Kys7XG59O1xuXG5RdWV1ZS5wcm90b3R5cGUuZGVxdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgb2xkZXN0SW5kZXggPSB0aGlzLl9vbGRlc3RJbmRleCxcbiAgICAgIG5ld2VzdEluZGV4ID0gdGhpcy5fbmV3ZXN0SW5kZXgsXG4gICAgICBkZWxldGVkRGF0YTtcblxuICBpZiAob2xkZXN0SW5kZXggIT09IG5ld2VzdEluZGV4KSB7XG4gICAgZGVsZXRlZERhdGEgPSB0aGlzLl9zdG9yYWdlW29sZGVzdEluZGV4XTtcbiAgICBkZWxldGUgdGhpcy5fc3RvcmFnZVtvbGRlc3RJbmRleF07XG4gICAgdGhpcy5fb2xkZXN0SW5kZXgrKztcblxuICAgIHJldHVybiBkZWxldGVkRGF0YTtcbiAgfVxufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qcyIsImltcG9ydCB7bWVyZ2VPYmp9IGZyb20gJy4uL2NvbW1vbi91dGlsaXRpZXMnO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxlY3RBcGlEYXRhKHRyZWUsIG9wRWxlKSB7XG4gIGxldCBwZXJBcGlFbGUgPSBvcEVsZS5jbG9zZXN0KCcucGVyLWFwaScpO1xuICAvLyBsZXQgdHJlZUVsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICByZXR1cm4gbWVyZ2VPYmooY29sbGVjdEluZm8ocGVyQXBpRWxlKSwgY29sbGVjdERhdGFGcm9tVHJlZSh0cmVlKSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RJbmZvKHBlckFwaUVsZSkge1xuICBsZXQgaW5mb0VsZSA9IHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktaW5mbycpWzBdO1xuICBsZXQgTW9kZXNSb3dFbGUgPSBwZXJBcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1vZGVzLXJvdycpWzBdO1xuICBsZXQgaW5mb0RhdGEgPSB7fTtcbiAgaW5mb0RhdGEgPSB7XG4gICAgJ3NlY3Rpb24nOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zZWN0aW9uJylbMF0udmFsdWUsXG4gICAgJ3VyaSc6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXVyaScpWzBdLnZhbHVlLFxuICAgICdtZXRob2QnOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tZXRob2QnKVswXS52YWx1ZSxcbiAgICAnZGVzY3JpcHRpb24nOiBpbmZvRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1kZXNjcmlwdGlvbicpWzBdLnZhbHVlLFxuICAgICd3aWtpTGluayc6IGluZm9FbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXdpa2ktaW5wdXQnKVswXS52YWx1ZSxcbiAgICAnbW9kZSc6IGdldE1vZGVWYWwoTW9kZXNSb3dFbGUpLFxuICAgICdkZWJ1Z0FkZHInOiBnZXREZWJ1Z0FkZHIoTW9kZXNSb3dFbGUpXG4gIH07XG5cbiAgcmV0dXJuIGluZm9EYXRhO1xufVxuXG5mdW5jdGlvbiBnZXRNb2RlVmFsKE1vZGVzUm93RWxlKSB7XG4gIHZhciByYWRpb3MgPSBNb2Rlc1Jvd0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktbW9kZScpO1xuICB2YXIgbW9kZVZhbDtcbiAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHJhZGlvcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChyYWRpb3NbaV0uY2hlY2tlZCkge1xuICAgICAgbW9kZVZhbCA9IHJhZGlvc1tpXS52YWx1ZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbW9kZVZhbDtcbn1cblxuZnVuY3Rpb24gZ2V0RGVidWdBZGRyKE1vZGVzUm93RWxlKSB7XG4gIHJldHVybiBNb2Rlc1Jvd0VsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtb2RlLWRlYnVnZ2luZy1hZGRyJylbMF0udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RUcmVlKHRyZWVFbGUpIHtcblx0bGV0IGxlYXZlcyA9IFtdLnNsaWNlLmNhbGwodHJlZUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpOyBcbiAgbGV0IHRyZWVEYXRhQXJyID0gW107XG4gIGxldCB0cmVlRGF0YU9iaiA9IHt9O1xuICBsZXQgbGVhZkRhdGE7XG4gIGZvciAobGV0IGkgPSAwLCBsZWF2ZXNMZW4gPSBsZWF2ZXMubGVuZ3RoOyBpIDwgbGVhdmVzTGVuOyBpKyspIHtcbiAgICBsZWFmRGF0YSA9IHt9O1xuICAgIGxlYWZEYXRhLnBhcmVudElkID0gbGVhdmVzW2ldLmRhdGFzZXQucGFyZW50O1xuICAgIGxlYWZEYXRhLm5vZGVJZCA9IGxlYXZlc1tpXS5kYXRhc2V0LmluZGV4O1xuICAgIGxlYWZEYXRhLmtleSA9IGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLWtleScpWzBdLnZhbHVlO1xuICAgIGxlYWZEYXRhLnZhbHVlID0gbGVhdmVzW2ldLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYtdmFsdWUnKVswXS52YWx1ZTtcbiAgICBsZWFmRGF0YS5xdWFudGl0eSA9IGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXF1YW50aXR5JylbMF0udmFsdWU7XG4gICAgdHJlZURhdGFBcnIucHVzaChsZWFmRGF0YSk7XG4gIH07XG4gIHRyZWVEYXRhT2JqLm5vZGVzID0gdHJlZURhdGFBcnI7XG4gIHJldHVybiB0cmVlRGF0YU9iajtcbn1cblxuZnVuY3Rpb24gY29sbGVjdERhdGFGcm9tVHJlZShhcGlUcmVlKSB7XG4gIGxldCB0cmVlID0gYXBpVHJlZTtcbiAgbGV0IG5vZGVzQXJyID0gW107XG4gIGxldCB0cmVlRGF0YU9iaiA9IHt9O1xuICBsZXQgZGltZW5zaW9uc0FyciA9IFtdO1xuICBsZXQgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUgPT09IG51bGwpIHJldHVybjtcbiAgICBsZXQgbm9kZURhdGEgPSB7fTtcbiAgICBub2RlRGF0YS5ub2RlSWQgPSBub2RlLm5vZGVJZDtcbiAgICBub2RlRGF0YS5jb2x1bW4gPSBub2RlLmNvbHVtbjtcbiAgICBub2RlRGF0YS5wYXJlbnRJZCA9IG5vZGUucGFyZW50ID09PSBudWxsID8gbnVsbCA6IG5vZGUucGFyZW50Lm5vZGVJZDtcbiAgICBub2RlRGF0YS5jaGlsZHJlbmxldmVsID0gbm9kZS5jaGlsZHJlbmxldmVsO1xuICAgIG5vZGVEYXRhLnRvdGFsb2Zmc2V0eWxldmVsID0gIG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XG4gICAgbm9kZURhdGEuZGF0YSA9IG5vZGUuZGF0YTtcbiAgICBub2RlRGF0YS5kYXRhLmhhc0NoaWxkID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICAgIG5vZGVzQXJyLnB1c2gobm9kZURhdGEpO1xuICB9O1xuICB0cmVlLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuICBkaW1lbnNpb25zQXJyID0gdHJlZS5kaW1lbnNpb25zKCk7XG4gIHRyZWVEYXRhT2JqLmRpbWVuc2lvbnMgPSB7fTtcbiAgdHJlZURhdGFPYmouZGltZW5zaW9ucy5oVW5pdCA9IGRpbWVuc2lvbnNBcnJbMF07XG4gIHRyZWVEYXRhT2JqLmRpbWVuc2lvbnMudlVuaXQgPSBkaW1lbnNpb25zQXJyWzFdO1xuICB0cmVlRGF0YU9iai5ub2RlcyA9IG5vZGVzQXJyO1xuICByZXR1cm4gdHJlZURhdGFPYmo7XG59XG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS90cmVlRGF0YUNvbGxlY3QuanMiLCIvKipcbiAqIHdpZHRoIG9mIHNpbmdsZSBzdmcgcGF0aDogMzBweFxuICovXG4ndXNlIHN0cmljdCc7XG5pbXBvcnQge1RyZWV9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyRodHRwfSBmcm9tICcuLi9jb21tb24vYWpheCc7XG5pbXBvcnQge3BvcHVwfSBmcm9tICcuLi9jb21tb24vcG9wdXAnO1xuaW1wb3J0IHtyb290QVBJfSBmcm9tICcuLi9nbG9iYWwvY29uc3RhbnQnO1xuaW1wb3J0IHtmbGFzaCwgcGFyc2VBbmRGbGFzaH0gZnJvbSAnLi4vY29tbW9uL2ZsYXNoJztcbmltcG9ydCB7Y29sbGVjdEFwaURhdGF9IGZyb20gJy4vdHJlZURhdGFDb2xsZWN0JztcbmltcG9ydCB7Z2V0VHJhbnNsYXRlWCwgeGhyLCBiZWF1dGlmeUpTT04sIGhpZ2h0bGlnaHRKU09OfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQge2pzb25Ub1RyZWV9IGZyb20gJy4vanNvblRyZWVDb252ZXJ0ZXInO1xuaW1wb3J0IHt0d29XYXlEYXRhQmluZGluZ30gZnJvbSAnLi4vY29tbW9uL3R3b1dheURhdGFCaW5kaW5nJztcbmltcG9ydCB7Y2FsbGJhY2tzfSBmcm9tICcuLi9jb21tb24vY2FsbGJhY2tzJztcbmltcG9ydCB7c2Nyb2xsQmFySH0gZnJvbSAnLi4vY29tbW9uL3Njcm9sbCc7XG5pbXBvcnQge2dlbmVyYXRlVVVJRH0gZnJvbSAnLi4vY29tbW9uL3V0aWxpdGllcyc7XG5cbmZ1bmN0aW9uIHBlckFwaVRwbChkYXRhLCBpc05ld0FwaSA9IGZhbHNlKSB7XG4gIGxldCBhcGlVVUlEID0gZ2VuZXJhdGVVVUlEKCk7XG4gIGxldCB0cGwgPVxuICAgICAgYDxkaXYgY2xhc3M9XCJhcGktaW5mb1wiPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1sYWJlbFwiPkFQSTo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS11cmlcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwiXCIgbW9kZWw9XCJ1cmlcIiAvPiBcbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5tZXRob2Q6PC9sYWJlbD5cbiAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiYXBpLW1ldGhvZFwiIG1vZGVsPVwibWV0aG9kXCI+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJHRVRcIj5HRVQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlBPU1RcIj5QT1NUPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQQVRDSFwiPlBBVENIPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICA8bGFiZWw+c2VjdGlvbjo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS1zZWN0aW9uXCIgdHlwZT1cInRleHRcIiBtb2RlbD1cInNlY3Rpb25cIiAvPlxuICAgICAgICAgIDxsYWJlbCBmb3I9XCJcIj5kZXNjcmlwdGlvbjo8L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImFwaS1kZXNjcmlwdGlvblwiIHR5cGU9XCJ0ZXh0XCIgbW9kZWw9XCJkZXNjcmlwdGlvblwiIC8+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJhcGktc2F2ZVwiIGRhdGEtbWV0aG9kPVwiJHtwYXRjaE9yUG9zdChpc05ld0FwaSl9XCIgZGF0YS1hY3Rpb249XCIvYXBpcyR7c2F2ZU9yQ3JlYXRlKGRhdGEsIGlzTmV3QXBpKX1cIiA+JHtpc05ld0FwaSA/ICdjcmVhdGUnIDogJ3NhdmUnfTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS1yZXNwb25kLXByZXZpZXctYnRuXCI+cHJldmlldzwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImFwaS13aWtpXCIgYmluZC10b2dnbGUtY2xhc3MgYmluZD1cIndpa2lMaW5rXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktd2lraS1sYWJlbFwiPldpa2k6IDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcGktd2lraS1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgbW9kZWw9XCJ3aWtpTGlua1wiIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYXBpLW1vZGVzLXJvd1wiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbW9kZS1sYWJlbFwiPjxpbnB1dCBjbGFzcz1cImFwaS1tb2RlXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cIiR7YXBpVVVJRH0tbW9kZVwiIHZhbHVlPVwiMFwiPuW8gOWPkTwvbGFiZWw+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImFwaS1tb2RlLWxhYmVsIGFwaS1tb2RlLWRlYnVnXCI+PGlucHV0IGNsYXNzPVwiYXBpLW1vZGVcIiB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJHthcGlVVUlEfS1tb2RlXCIgdmFsdWU9XCIxXCI+6IGU6LCDPGlucHV0IGNsYXNzPVwibW9kZS1kZWJ1Z2dpbmctYWRkclwiIHR5cGU9XCJ0ZXh0XCIgLz48L2xhYmVsPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJhcGktbW9kZS1sYWJlbFwiPjxpbnB1dCBjbGFzcz1cImFwaS1tb2RlXCIgdHlwZT1cInJhZGlvXCIgbmFtZT1cIiR7YXBpVVVJRH0tbW9kZVwiIHZhbHVlPVwiMlwiPue6v+S4ijwvbGFiZWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcGktdHJlZS1jb250ZW50LXdyYXBwZXJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWUtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFwaS10cmVlLWZyYW1lXCI+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3M9XCJhcGktc3ZnXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPjwvc3ZnPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXBpLXRyZWVcIj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhcGktcmVzcG9uZC1wcmV2aWV3XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByZXZpZXctY29udHJvbC13cmFwcGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJldmlldy1jb250cm9sXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcHJldmlldy10eXBlIHByZXZpZXctcmF3XCI+cmF3PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGVyLXByZXZpZXctdHlwZSBwcmV2aWV3LWJlYXV0aWZ5XCI+YmVhdXRpZnk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwZXItcHJldmlldy10eXBlIHByZXZpZXctaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5gO1xuICByZXR1cm4gdHBsO1xufVxuXG5mdW5jdGlvbiBsZWFmVHBsKCkge1xuICBsZXQgbGVhZkNvbnRlbnRUcGwgPSBgXG4gICAgPGkgY2xhc3M9XCJyZW1vdmUtY2hpbGRcIj4tPC9pPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwibGVhZi1rZXlcIiBwbGFjZWhvbGRlcj1cImtleVwiIG1vZGVsPVwiZGF0YU5hbWVcIiAvPlxuICAgIDxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ2YWx1ZVwiIG1vZGVsPVwiZGF0YVZhbHVlXCIgLz5cbiAgICA8c2VsZWN0IGNsYXNzPVwibGVhZi12YWx1ZS10eXBlXCIgbW9kZWw9XCJkYXRhVHlwZVwiPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU3RyaW5nXCI+U3RyaW5nPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJJbnRlZ2VyXCI+SW50ZWdlcjwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRmxvYXRcIj5GbG9hdDwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQm9vbGVhblwiPkJvb2xlYW48L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFycmF5XCI+QXJyYXk8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkhhc2hcIj5IYXNoPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJSZWdleFwiPlJlZ2V4KHN0cmluZyk8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZpeGVkXCI+Rml4ZWQoc3RyaW5nKTwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTnVsbFwiPk51bGw8L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgICA8aSBjbGFzcz1cImdhcC1tYXJrXCI+LS0tPC9pPlxuICAgIDxpIGNsYXNzPVwiYWRkLWNoaWxkXCI+KzwvaT5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtcXVhbnRpdHlcIiBwbGFjZWhvbGRlcj1cInF1YW50aXR5XCIgbW9kZWw9XCJkYXRhUXVhbnRpdHlcIiAvPlxuICAgIDxzcGFuIGNsYXNzPVwibGVhZi1oaWRlLXF1YW50aXR5XCI+PC9zcGFuPlxuICBgO1xuICByZXR1cm4gbGVhZkNvbnRlbnRUcGw7XG59XG5cbi8qIGRlZmF1bHQgZ2V0Qm91bmRpbmdSZWN0T2JqICovXG5sZXQgaW5pdFJlY3RPYmogPSB7XG4gIHJpZ2h0OiAwLFxuICBib3R0b206IDAsXG4gIGxlZnQ6IDAsXG4gIHRvcDogMCxcbiAgd2lkdGg6IDAsXG4gIGhlaWdodDogMFxufTtcblxubGV0IGxlYWZEYXRhUGxhY2VIb2xkZXIgPSB7XG4gIGRhdGFOYW1lOiAnJyxcbiAgZGF0YVR5cGU6ICdTdHJpbmcnLFxuICBkYXRhVmFsdWU6ICcnLFxuICBkYXRhUXVhbnRpdHk6ICcxJyxcbiAgaGFzQ2hpbGQ6IGZhbHNlXG59O1xuXG4vKlxuc2luZ2xlIGxlYWYgd2lkdGg6IDQ2MHB4O1xuICovXG5jb25zdCBwZXJMZWFmV2lkdGggPSA0NjA7XG5jb25zdCBwZXJMZWFmSGVpZ2h0ID0gMjI7XG5jb25zdCBsZWF2ZXNWZXJ0aWNhbEdhcCA9IDMwO1xuY29uc3QgcGVyU1ZHUGF0aFdpZHRoID0gMzA7XG52YXIgcm9vdE5vZGVXaWR0aCA9IHBlclNWR1BhdGhXaWR0aCArIDE0O1xudmFyIGNhbGxiYWNrID0ge1xuICBwYXRjaFN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB0aGlzLmFwaVJhd0RhdGEgPSBkYXRhO1xuICAgIHRoaXMuYXBpRGF0YU9iaiA9IEpTT04ucGFyc2UoZGF0YSkuZGF0YTtcbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEpO1xuICB9LFxuICBwb3N0U3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIHRoaXMuYXBpUmF3RGF0YSA9IGRhdGE7XG4gICAgdGhpcy5hcGlEYXRhT2JqID0gSlNPTi5wYXJzZShkYXRhKS5kYXRhO1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gICAgdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXS50ZXh0Q29udGVudCA9ICdzYXZlJztcbiAgICB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc2F2ZScpWzBdLmRhdGFzZXQubWV0aG9kID0gJ1BBVENIJztcbiAgfSxcbiAgZGVsZXRlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGZ1bmN0aW9uIGRlc3RvcnlBcGlMaSgpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZCh0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIH1cbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEsIGRlc3RvcnlBcGlMaS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH0sXG4gIGFwaVJlc3BvbmRTdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgbGV0IGpzb25PYmogPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgIHRoaXMucHJldmlld0RhdGEgPSBkYXRhO1xuICAgIHRoaXMucHJldmlld0RhdGFPYmogPSBqc29uT2JqO1xuICAgIHN3aXRjaFByZXZpZXcodGhpcy5wcmV2aWV3RGF0YU9iaiwgaGlnaHRsaWdodEpTT04sIHRoaXMuZXZlbnRDb250ZXh0LCAnaGlnaGxpZ2h0Jyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHBhdGNoT3JQb3N0KGlzTmV3QXBpKSB7XG4gIHJldHVybiBpc05ld0FwaSA/ICdQT1NUJyA6ICdQQVRDSCc7XG59XG5cbmZ1bmN0aW9uIHNhdmVPckNyZWF0ZShkYXRhLCBpc05ld0FwaSkge1xuICByZXR1cm4gaXNOZXdBcGkgPyAnJyA6IGAvJHtkYXRhLmlkfWA7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBlckFwaShkYXRhLCBpc05ld0FwaSkge1xuICB2YXIgcGVyQXBpRWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHBlckFwaUVsZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Blci1hcGknKTtcbiAgcGVyQXBpRWxlLmRhdGFzZXQuaWQgPSBpc05ld0FwaSA/ICcnIDogZGF0YS5pZDtcbiAgcGVyQXBpRWxlLmlubmVySFRNTCA9IHBlckFwaVRwbChkYXRhLCBpc05ld0FwaSk7XG4gIHBlckFwaUVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdXJpJylbMF0udmFsdWUgPSBpc05ld0FwaSA/ICcnIDogZGF0YS51cmk7XG4gIHJldHVybiBwZXJBcGlFbGU7XG59XG5mdW5jdGlvbiBjcmVhdGVOZXdBcGlJbml0RGF0YSgpIHtcbiAgbGV0IGluaXREYXRhID0ge1xuICAgIG5vZGVJZDogMCxcbiAgICBwYXJlbnRJZDogbnVsbCxcbiAgICBkYXRhOiBsZWFmRGF0YVBsYWNlSG9sZGVyXG4gIH07XG4gIGxldCBmaXJzdENoaWxkRGF0YSA9IHtcbiAgICBub2RlSWQ6IDEsXG4gICAgcGFyZW50SWQ6IDAsXG4gICAgZGF0YTogbGVhZkRhdGFQbGFjZUhvbGRlclxuICB9O1xuICByZXR1cm4ge1xuICAgIG1vZGU6ICcwJyxcbiAgICBkZWJ1Z0FkZHI6ICcnLFxuICAgIG5vZGVzOiBbaW5pdERhdGEsIGZpcnN0Q2hpbGREYXRhXVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQXBpRG9tKGRhdGEsIGNvbnRhaW5lck5vZGUsIGlzTmV3QXBpID0gZmFsc2UpIHtcbiAgaWYgKGlzTmV3QXBpKSB7XG4gICAgZGF0YSA9IGNyZWF0ZU5ld0FwaUluaXREYXRhKCk7XG4gIH1cbiAgdGhpcy5hcGlEYXRhT2JqID0gZGF0YTtcbiAgdGhpcy5hcGlDb250YWluZXIgPSBjb250YWluZXJOb2RlO1xuICBsZXQgcGVyQXBpRWxlID0gY3JlYXRlUGVyQXBpKGRhdGEsIGlzTmV3QXBpKTtcbiAgdGhpcy5hcGlDb250YWluZXIuYXBwZW5kQ2hpbGQocGVyQXBpRWxlKTtcblxuICBsZXQgYXBpQmluZERhdGEgPSB0d29XYXlEYXRhQmluZGluZyhkYXRhLCB0aGlzLmFwaUNvbnRhaW5lcik7XG4gIGRhdGEgPSBhcGlCaW5kRGF0YTtcblxuICB0aGlzLmFwaUVsZSA9IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Blci1hcGknKVswXTtcblxuICB0aGlzLmxlYWZJbmRleCA9IDE7XG5cbiAgdGhpcy4kYXBpVHJlZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlJylbMF07XG4gIHRoaXMuJGFwaVRyZWVGcmFtZSA9IHRoaXMuYXBpRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLWZyYW1lJylbMF07XG4gIHRoaXMuJGFwaVRyZWVDb250ZW50ID0gdGhpcy5hcGlFbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtY29udGVudCcpWzBdO1xuICAvLyBpZiAoaXNOZXdBcGkpIHtcbiAgLy8gICB0aGlzLmluaXRBcGlUcmVlKCk7XG4gIC8vICAgdGhpcy5jYWxjRGltZW5zaW9ucygpO1xuICAvLyB9IGVsc2Uge1xuICB0aGlzLnJlbmRlckV4aXN0VHJlZShkYXRhKTtcbiAgLy8gfVxuXG4gIHRoaXMuYXBpUmV0dXJuRGF0YSA9ICcnO1xuXG4gIHRoaXMuYXBpRWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYmluZEV2ZW50LmJpbmQodGhpcykpO1xuICB0aGlzLnNldE1vZGVWYWwoZGF0YS5tb2RlKTtcbiAgdGhpcy5zZXREZWJ1Z0FkZHIoZGF0YS5kZWJ1Z0FkZHIpO1xuICB0aGlzLnNjcm9sbEJhciA9IHNjcm9sbEJhckgoe1xuICAgIHdyYXBwZXI6IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS10cmVlLXdyYXBwZXInKVswXSxcbiAgICBjb250ZW50OiB0aGlzLmFwaUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZS1jb250ZW50LXdyYXBwZXInKVswXSxcbiAgICBvdmVyZmxvd0VsZTogdGhpcy5hcGlDb250YWluZXIuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXRyZWUtY29udGVudCcpWzBdXG4gIH0pO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLnJlbmRlckV4aXN0VHJlZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgbGV0IGRvY0ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG5cbiAgbGV0IHBlclRXREJBcnIgPSBbXTtcbiAgaWYgKGRhdGEubm9kZXMgJiYgZGF0YS5ub2Rlcy5sZW5ndGgpIHtcbiAgICBsZXQgbm9kZXNBcnIgPSBkYXRhLm5vZGVzO1xuICAgIGxldCBub2RlRGF0YSA9IHt9O1xuICAgIGxldCBsZWFmO1xuICAgIGxldCBsZWFmRGF0YSA9IHt9O1xuICAgIGxldCBwZXJUV0RCO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBub2Rlc0Fyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgbGVhZiA9IHVuZGVmaW5lZDtcbiAgICAgIGxlYWYgPSBnZW5lcmF0ZUxlYWYoZGF0YS5ub2Rlc1tpXSk7XG4gICAgICBpZiAoZGF0YS5ub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YS5ub2Rlc1tpXS5kYXRhID09PSBcIlwiKSB7XG4gICAgICAgIGRhdGEubm9kZXNbaV0uZGF0YSA9IGxlYWZEYXRhUGxhY2VIb2xkZXI7XG4gICAgICB9O1xuICAgICAgaWYgKGRhdGEubm9kZXNbaV0ucGFyZW50SWQgPT09IG51bGwgfHwgZGF0YS5ub2Rlc1tpXS5wYXJlbnRJZCA9PT0gJ251bGwnKSBsZWFmLmNsYXNzTGlzdC5hZGQoJ3Jvb3QtbGVhZicpO1xuICAgICAgcGVyVFdEQiA9IHR3b1dheURhdGFCaW5kaW5nKGRhdGEubm9kZXNbaV0uZGF0YSwgbGVhZik7XG4gICAgICBkYXRhLm5vZGVzW2ldLmRhdGEgPSBwZXJUV0RCO1xuICAgICAgcGVyVFdEQkFyci5wdXNoKHBlclRXREIpO1xuICAgICAgZG9jRnJhZy5hcHBlbmRDaGlsZChsZWFmKTtcbiAgICB9XG4gICAgdGhpcy5sZWFmSW5kZXggKz0gKGxlbiAtIDIpO1xuICB9XG4gIHRoaXMuYXBpVHJlZSA9IGpzb25Ub1RyZWUoZGF0YS5ub2Rlcyk7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoZG9jRnJhZyk7XG4gIHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuXG5cbmZ1bmN0aW9uIGdlbmVyYXRlTGVhZihub2RlRGF0YSkge1xuICB2YXIgbmV3TGVhZlNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnbGVhZicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2JpbmQnLCAnaGFzQ2hpbGQnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdiaW5kLXRvZ2dsZS1jbGFzcycsICcnKTtcbiAgbmV3TGVhZlNwYW4uZGF0YXNldC5wYXJlbnRJZCA9IG5vZGVEYXRhLnBhcmVudElkO1xuICBuZXdMZWFmU3Bhbi5kYXRhc2V0Lm5vZGVJZCA9IG5vZGVEYXRhLm5vZGVJZDtcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZlRwbCgpO1xuICBuZXdMZWFmU3Bhbi5zdHlsZVsndHJhbnNmb3JtJ10gPSAndHJhbnNsYXRlM2QoJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKChwZXJMZWFmV2lkdGggKyBwZXJTVkdQYXRoV2lkdGgpICogKG5vZGVEYXRhLmNvbHVtbiAtIDEpKSArICdweCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKG5vZGVEYXRhLnRvdGFsb2Zmc2V0eWxldmVsICogKHBlckxlYWZIZWlnaHQgKyBsZWF2ZXNWZXJ0aWNhbEdhcCkpICsgJ3B4LCAwKSc7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbkFwaURvbS5wcm90b3R5cGUuc2V0RGVidWdBZGRyID0gZnVuY3Rpb24odmFsKSB7XG4gIHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21vZGUtZGVidWdnaW5nLWFkZHInKVswXS52YWx1ZSA9IHZhbDtcbn07XG5BcGlEb20ucHJvdG90eXBlLnNldE1vZGVWYWwgPSBmdW5jdGlvbih2YWwpIHtcbiAgdmFyIHJhZGlvcyA9IHRoaXMuYXBpQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1tb2RlJyk7XG4gIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSByYWRpb3MubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodmFsID09PSByYWRpb3NbaV0udmFsdWUpIHtcbiAgICAgIHJhZGlvc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgIH0gZWxzZSB7XG4gICAgICByYWRpb3NbaV0uc2V0QXR0cmlidXRlKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH1cbiAgfVxufTtcbmZ1bmN0aW9uIGJpbmRFdmVudChldikge1xuICAvKiBfJHRoaXMgaXMgQXBpRG9tLCB3aGlsZSB0aGlzIGlzIGl0cyB3cmFwcGVyKG9iamVjdCkuICovXG4gIGxldCBfdGhpcyA9IHRoaXM7XG4gIGxldCBldlRhcmdldENsYXNzTGlzdCA9IGV2LnRhcmdldC5jbGFzc0xpc3Q7XG4gIGxldCBldmVudENvbnRleHQgPSB7X2V2OiBldiwgZG9tQ29udGFpbmVyOiBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpfTtcbiAgdGhpcy5ldmVudENvbnRleHQgPSBldmVudENvbnRleHQ7XG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygnYXBpLXNhdmUnKSkge1xuICAgIGxldCBwYXJhbXMgPSBjb2xsZWN0QXBpRGF0YShfdGhpcy5hcGlUcmVlLCBfdGhpcy4kYXBpVHJlZSk7XG4gICAgaWYgKHRoaXMuYXBpRGF0YU9iai5pZCkge1xuICAgICAgJGh0dHAocm9vdEFQSSArICcvJyArIHRoaXMuYXBpRGF0YU9iai5pZClcbiAgICAgIC5wYXRjaChwYXJhbXMsICdhcGknKVxuICAgICAgLnRoZW4oY2FsbGJhY2sucGF0Y2hTdWNjZXNzLmJpbmQodGhpcykpXG4gICAgICAuY2F0Y2goY2FsbGJhY2suZXJyb3IpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuYXBpRGF0YU9iai5pZCkge1xuICAgICAgJGh0dHAocm9vdEFQSSlcbiAgICAgIC5wb3N0KHBhcmFtcywgJ2FwaScpXG4gICAgICAudGhlbihjYWxsYmFjay5wb3N0U3VjY2Vzcy5iaW5kKHRoaXMpKVxuICAgICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgaWYgKGV2VGFyZ2V0Q2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtY2hpbGQnKSkge1xuICAgIF90aGlzLmFkZENoaWxkKGV2KTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ3JlbW92ZS1jaGlsZCcpKSB7XG4gICAgaWYgKGV2LnRhcmdldC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncm9vdC1sZWFmJykpIHtcbiAgICAgIHBvcHVwKGV2LCB7fSwgZGVsZXRlQXBpLmJpbmQoX3RoaXMsIGV2KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF90aGlzLmRlbE5vZGUoZXYpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ2FwaS1yZXNwb25kLXByZXZpZXctYnRuJykpIHtcbiAgICBpZiAoIXRoaXMuYXBpRGF0YU9iai5pZCkge1xuICAgICAgZmxhc2goe2Vycm9yOiAnU2F2ZSBmaXJzdC4nfSk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIGxldCBwYXJhbXMgPSB7ZGF3bl91cmk6IHRoaXMuYXBpRGF0YU9iai51cml9O1xuICAgIGxldCBjb250ZXh0ID0ge307XG4gICAgJGh0dHAod2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvYXBpcmVzcG9uc2UnKVxuICAgIC5nZXQocGFyYW1zKVxuICAgIC50aGVuKGNhbGxiYWNrLmFwaVJlc3BvbmRTdWNjZXNzLmJpbmQodGhpcykpXG4gICAgLmNhdGNoKGNhbGxiYWNrLmVycm9yKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ2FwaS13aWtpLWxhYmVsJykpIHtcbiAgICBldi50YXJnZXQuY2xvc2VzdCgnLmFwaS13aWtpJykuY2xhc3NMaXN0LnRvZ2dsZSgndG9nZ2xlLXRydWUnKTtcbiAgfVxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ3ByZXZpZXctcmF3JykpIHtcbiAgICByZXR1cm4gc3dpdGNoUHJldmlldyh0aGlzLnByZXZpZXdEYXRhT2JqLCBKU09OLnN0cmluZ2lmeSwgdGhpcy5ldmVudENvbnRleHQsICdyYXcnKTtcbiAgfTtcblxuICBpZiAoZXZUYXJnZXRDbGFzc0xpc3QuY29udGFpbnMoJ3ByZXZpZXctYmVhdXRpZnknKSkge1xuICAgIHJldHVybiBzd2l0Y2hQcmV2aWV3KHRoaXMucHJldmlld0RhdGFPYmosIGJlYXV0aWZ5SlNPTiwgdGhpcy5ldmVudENvbnRleHQsICdiZWF1dGlmeScpO1xuICB9O1xuXG4gIGlmIChldlRhcmdldENsYXNzTGlzdC5jb250YWlucygncHJldmlldy1oaWdobGlnaHQnKSkge1xuICAgIHJldHVybiBzd2l0Y2hQcmV2aWV3KHRoaXMucHJldmlld0RhdGFPYmosIGhpZ2h0bGlnaHRKU09OLCB0aGlzLmV2ZW50Q29udGV4dCwgJ2hpZ2hsaWdodCcpO1xuICB9O1xuXG59XG5cbmZ1bmN0aW9uIHN3aXRjaFByZXZpZXcoZGF0YU9iaiwgZm4sIHByZXZpZXdDb250ZXh0LCBwcmV2aWV3VHlwZSkge1xuICBsZXQgcHJldmlld1N0ciA9IGZuLmNhbGwobnVsbCwgZGF0YU9iaik7XG4gIGpzb25WaWV3LmNhbGwocHJldmlld0NvbnRleHQuZG9tQ29udGFpbmVyLCBwcmV2aWV3U3RyKTtcbiAgc3dpdGNoUHJldmlld1N0YXR1cyhwcmV2aWV3Q29udGV4dCwgcHJldmlld1R5cGUpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc3dpdGNoUHJldmlld1N0YXR1cyhwcmV2aWV3Q29udGV4dCwgYXBwbHlUeXBlKSB7XG4gIGxldCBwcmV2aWV3VHlwZXMgPSBbJ3JhdycsICdiZWF1dGlmeScsICdoaWdobGlnaHQnXTtcbiAgbGV0IGFwaVJlc3BvbmRQcmV2aWV3RWxlID0gcHJldmlld0NvbnRleHQuZG9tQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1yZXNwb25kLXByZXZpZXcnKVswXTtcbiAgbGV0IGFwaVJlc3BvbmRQcmV2aWV3RWxlQ2xhc3NBcnIgPSBhcGlSZXNwb25kUHJldmlld0VsZS5jbGFzc05hbWUudHJpbSgpLnNwbGl0KCcgJyk7XG4gIGFwaVJlc3BvbmRQcmV2aWV3RWxlQ2xhc3NBcnIuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCwgYXJyYXkpIHtcbiAgICBsZXQgaWR4ID0gcHJldmlld1R5cGVzLmluZGV4T2YoZWxlbWVudCk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICBhcnJheS5zcGxpY2UoYXJyYXkuaW5kZXhPZihlbGVtZW50KSwgMSk7XG4gICAgfVxuICB9KTtcbiAgbGV0IHByZXZpZXdUeXBlRWxlc0FyciA9IFtdLnNsaWNlLmNhbGwocHJldmlld0NvbnRleHQuZG9tQ29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Blci1wcmV2aWV3LXR5cGUnKSk7XG4gIHByZXZpZXdUeXBlRWxlc0Fyci5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgfSk7XG4gIHByZXZpZXdDb250ZXh0LmRvbUNvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcmV2aWV3LScgKyBhcHBseVR5cGUpWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICBhcGlSZXNwb25kUHJldmlld0VsZS5jbGFzc05hbWUgPSBhcGlSZXNwb25kUHJldmlld0VsZUNsYXNzQXJyLmpvaW4oJyAnKTtcbiAgYXBpUmVzcG9uZFByZXZpZXdFbGUuY2xhc3NMaXN0LmFkZChhcHBseVR5cGUpO1xufVxuXG5mdW5jdGlvbiBhcGlTYXZlKCkge1xuXG59XG5mdW5jdGlvbiBhZGRMZWFmQ2hpbGQoKSB7XG5cbn1cbmZ1bmN0aW9uIHJlbW92ZUxlYWZDaGlsZCgpIHtcblxufVxuZnVuY3Rpb24gYXBpVGVzdCgpIHtcblxufVxuZnVuY3Rpb24ganNvblZpZXcoZGF0YSkge1xuICB2YXIgJHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAkcHJlLmlubmVySFRNTCA9IGRhdGE7XG4gIGxldCAkZGF0YVZpZXdFbGUgPSB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtdmlldycpWzBdO1xuICAkZGF0YVZpZXdFbGUuaW5uZXJIVE1MID0gJyc7XG4gICRkYXRhVmlld0VsZS5hcHBlbmRDaGlsZCgkcHJlKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlQXBpKGV2KSB7XG4gIGlmICghdGhpcy5hcGlEYXRhT2JqLmlkKSB7XG4gICAgZXYudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZChldi50YXJnZXQuY2xvc2VzdCgnLmFwaS1saScpKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBsZXQgcGFyYW1zID0ge307XG4gIGNvbnNvbGUubG9nKHJvb3RBUEkpO1xuICAkaHR0cChyb290QVBJICsgJy8nICsgdGhpcy5hcGlEYXRhT2JqLmlkKVxuICAuZGVsZXRlKHBhcmFtcylcbiAgLnRoZW4oY2FsbGJhY2tzLmRlbGV0ZVN1Y2Nlc3MuYmluZChldikpXG4gIC5jYXRjaChjYWxsYmFja3MuZXJyb3IpO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLnN0b3JlQXBpUmV0dXJuRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gZGF0YTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmNsaWNrKCk7XG59O1xuXG5BcGlEb20ucHJvdG90eXBlLmluaXRBcGlUcmVlID0gZnVuY3Rpb24oKSB7XG4gIGxldCBpbml0RGF0YSA9IHtcbiAgICBub2RlSWQ6IDAsXG4gICAgZGF0YTogbGVhZkRhdGFQbGFjZUhvbGRlclxuICB9O1xuICBsZXQgZmlyc3RDaGlsZERhdGEgPSB7XG4gICAgbm9kZUlkOiAxLFxuICAgIGRhdGE6IGxlYWZEYXRhUGxhY2VIb2xkZXJcbiAgfTtcbiAgdGhpcy5hcGlUcmVlID0gbmV3IFRyZWUoaW5pdERhdGEpO1xuICB0aGlzLmFwaVRyZWUuYWRkKGZpcnN0Q2hpbGREYXRhLCAwLCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgbGV0IHRyZWVEb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuXG4gIGxldCBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBsZXQgbGVhZkVsZTtcbiAgICBsZXQgbGVhZkJpbmREYXRhO1xuICAgIG5vZGUucGFyZW50SWQgPSBub2RlLnBhcmVudCA/IG5vZGUucGFyZW50Lm5vZGVJZCA6IG51bGw7XG4gICAgbGVhZkVsZSA9IGdlbmVyYXRlTGVhZihub2RlKTtcbiAgICBsZWFmQmluZERhdGEgPSB0d29XYXlEYXRhQmluZGluZyhsZWFmRGF0YVBsYWNlSG9sZGVyLCBsZWFmRWxlKTtcbiAgICBub2RlLmRhdGEgPSBsZWFmQmluZERhdGE7XG4gICAgaWYgKG5vZGUucGFyZW50SWQgPT09IG51bGwgfHwgbm9kZS5wYXJlbnRJZCA9PT0gJ251bGwnKSBsZWFmRWxlLmNsYXNzTGlzdC5hZGQoJ3Jvb3QtbGVhZicpO1xuICAgIHRyZWVEb2NGcmFnLmFwcGVuZENoaWxkKGxlYWZFbGUpO1xuICB9O1xuXG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZCh0cmVlRG9jRnJhZyk7XG5cbiAgcmV0dXJuIHRoaXMuYXBpVHJlZTtcbn07XG5cbkFwaURvbS5wcm90b3R5cGUuZGVsTm9kZSA9IGZ1bmN0aW9uKGN0eCkge1xuICB2YXIgY3VycmVudExlYWYgPSBjdHgudGFyZ2V0LmNsb3Nlc3QoJy5sZWFmJyk7XG4gIHZhciBjdXJyZW50SWR4ID0gK2N0eC50YXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0Lm5vZGVJZDtcbiAgdmFyIHBhcmVudElkeCA9ICgrY3R4LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQucGFyZW50SWQgPT09IDApID8gMCA6ICtjdHgudGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnRJZDtcblxuICB2YXIgbm9kZXNBcnIgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEZXNjZW5kYW50cyhjdXJyZW50SWR4KTtcbiAgdmFyIGlkeEFyciA9IG5vZGVzQXJyVG9JZHhBcnIobm9kZXNBcnIpO1xuICB0aGlzLmFwaVRyZWUucmVtb3ZlKGN1cnJlbnRJZHgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB0aGlzLnJlbW92ZU5vZGVzRnJvbURvbShpZHhBcnIpO1xuXG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcbiAgdGhpcy5zZXRQYXJlbnROb2RlVmFsKHBhcmVudElkeCk7XG4gIHRoaXMuc2Nyb2xsQmFyLnJlbmRlcigpO1xufTtcbkFwaURvbS5wcm90b3R5cGUucmVtb3ZlTm9kZXNGcm9tRG9tID0gZnVuY3Rpb24oYXJyKSB7XG4gIHZhciBhbGxMZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBhbGxMZWF2ZXNMZW4gPSBhbGxMZWF2ZXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbExlYXZlc0xlbjsgaSsrKSB7XG4gICAgaWYgKGFyci5pbmRleE9mKCthbGxMZWF2ZXNbaV0uZGF0YXNldC5ub2RlSWQpICE9PSAtMSkge1xuICAgICAgdGhpcy4kYXBpVHJlZS5yZW1vdmVDaGlsZChhbGxMZWF2ZXNbaV0pO1xuICAgIH1cbiAgfTtcbn07XG5mdW5jdGlvbiBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKSB7XG4gIHZhciBub2Rlc0FyckxlbiA9IG5vZGVzQXJyLmxlbmd0aDtcbiAgdmFyIGlkeEFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzQXJyTGVuOyBpKyspIHtcbiAgICBpZHhBcnIucHVzaChub2Rlc0FycltpXS5ub2RlSWQpO1xuICB9O1xuICByZXR1cm4gaWR4QXJyO1xufVxuXG5BcGlEb20ucHJvdG90eXBlLnNldFBhcmVudE5vZGVWYWwgPSBmdW5jdGlvbihpZHgpIHtcbiAgdmFyIGxlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIHF1ZXVlID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcbiAgdmFyIHF1ZXVlTGVuID0gcXVldWUuX25ld2VzdEluZGV4IC0gcXVldWUuX29sZGVzdEluZGV4O1xuICBmb3IgKHZhciBpID0gMCwgeCA9IGxlYXZlcy5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBpZiAoK2xlYXZlc1tpXS5kYXRhc2V0Lm5vZGVJZCA9PT0gaWR4KSB7XG4gICAgICBpZiAocXVldWVMZW4gPiAwKSB7XG4gICAgICAgIC8vIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnJztcbiAgICAgIH07XG4gICAgICBicmVhaztcbiAgICB9O1xuICB9O1xufTtcblxuQXBpRG9tLnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGN0eCkge1xuICB0aGlzLmxlYWZJbmRleCA9IHRoaXMuYXBpVHJlZS5tYXhJZCgpICsgMTtcbiAgdmFyIHBhcmVudElkZXggPSArY3R4LnRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubm9kZUlkO1xuXG4gIGxldCBsZWFmQ2hpbGQgPSBjcmVhdGVMZWFmKHBhcmVudElkZXgsIHRoaXMubGVhZkluZGV4KTtcbiAgbGV0IGNoaWxkTW9kZWwgPSB0d29XYXlEYXRhQmluZGluZyhsZWFmRGF0YVBsYWNlSG9sZGVyLCBsZWFmQ2hpbGQpO1xuICBsZXQgbGVhZkRhdGEgPSB7XG4gICAgbm9kZUlkOiB0aGlzLmxlYWZJbmRleCxcbiAgICBkYXRhOiBjaGlsZE1vZGVsXG4gIH07XG4gIHRoaXMuYXBpVHJlZS5hZGQobGVhZkRhdGEsIHBhcmVudElkZXgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdGhpcy4kYXBpVHJlZS5hcHBlbmRDaGlsZChsZWFmQ2hpbGQpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZGV4KTtcbiAgdGhpcy5zY3JvbGxCYXIucmVuZGVyKCk7XG59O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUxlYWZTcGFuKHBhcmVudElkLCBub2RlSW5kZXgpIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdiaW5kJywgJ2hhc0NoaWxkJyk7XG4gIG5ld0xlYWZTcGFuLnNldEF0dHJpYnV0ZSgnYmluZC10b2dnbGUtY2xhc3MnLCAnJyk7XG4gIG5ld0xlYWZTcGFuLmRhdGFzZXQucGFyZW50SWQgPSBwYXJlbnRJZDtcbiAgbmV3TGVhZlNwYW4uZGF0YXNldC5ub2RlSWQgPSBub2RlSW5kZXg7XG4gIG5ld0xlYWZTcGFuLmlubmVySFRNTCA9IGxlYWZUcGwoKTtcbiAgcmV0dXJuIG5ld0xlYWZTcGFuO1xufVxuZnVuY3Rpb24gY3JlYXRlTGVhZihwYXJlbnRJZHgsIG5vZGVJZHgpIHtcbiAgcmV0dXJuIGdlbmVyYXRlTGVhZlNwYW4ocGFyZW50SWR4LCBub2RlSWR4KTtcbn1cbkFwaURvbS5wcm90b3R5cGUuc3R5bGVOb2RlcyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGVhdmVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy4kYXBpVHJlZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmJykpO1xuXG4gIGxldCBsZWF2ZXNIYXNoID0ge307XG4gIGZvciAobGV0IGkgPSAwLCBsZWF2ZXNMZW4gPSBsZWF2ZXMubGVuZ3RoOyBpIDwgbGVhdmVzTGVuOyBpKyspIHtcbiAgICBsZWF2ZXNIYXNoW2xlYXZlc1tpXS5kYXRhc2V0Lm5vZGVJZF0gPSBsZWF2ZXNbaV07XG4gIH1cbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xuICAgIGlmIChub2RlLm5vZGVJZCA8PSAwKSByZXR1cm47XG4gICAgbGVhdmVzSGFzaFtub2RlLm5vZGVJZF0uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJvdW5kKChwZXJMZWFmV2lkdGggKyBwZXJTVkdQYXRoV2lkdGgpICogKG5vZGUuY29sdW1uIC0gMSkpICsgJ3B4LCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yb3VuZChub2RlLnRvdGFsb2Zmc2V0eWxldmVsICogKHBlckxlYWZIZWlnaHQgKyBsZWF2ZXNWZXJ0aWNhbEdhcCkpICsgJ3B4LCAwKSc7XG4gIH07XG4gIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKGNhbGxiYWNrKTtcbiAgdGhpcy5kaW1lbnNpb25BcnIgPSB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG4gIHRoaXMuZHJhd1NWRygpO1xufTtcblxuLyogdXRpbHMgKi9cbmZ1bmN0aW9uIGNsb25lUmVjdE9iaihvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9iai50b3AsXG4gICAgYm90dG9tOiBvYmouYm90dG9tLFxuICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgd2lkdGg6IG9iai53aWR0aCxcbiAgICBoZWlnaHQ6IG9iai5oZWlnaHRcbiAgfTtcbn1cblxuLyogbWFuaXB1bGF0ZSBTVkcgKi9cbkFwaURvbS5wcm90b3R5cGUuY2xlYXJTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IHRoaXMuJGFwaVRyZWVGcmFtZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktc3ZnJylbMF07XG4gIHdoaWxlIChzdmcubGFzdENoaWxkKSB7XG4gICAgc3ZnLnJlbW92ZUNoaWxkKHN2Zy5sYXN0Q2hpbGQpO1xuICB9XG59O1xuLyoqXG4gKiBbZHJhd1NWRyBkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gW2Rlc2NyaXB0aW9uXVxuICovXG5BcGlEb20ucHJvdG90eXBlLmRyYXdTVkcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jbGVhclNWRygpO1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBzdmdQYXJ0aWFscyA9IFtdO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICBzdmdQYXJ0aWFscy5wdXNoKHRoYXQuY3JlYXRlU2luZ2xlU1ZHKG5vZGUubm9kZUlkLCBub2RlLmNvbHVtbiwgbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwsIChub2RlLnRvdGFsb2Zmc2V0eWxldmVsIC0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwpKSk7XG4gICAgfTtcbiAgfTtcbiAgdGhpcy5hcGlUcmVlLnRyYXZlcnNlREYoY2FsbGJhY2spO1xuXG4gIHZhciBkb2NGcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN2Z1BhcnRpYWxzLmxlbmd0aDsgaSsrKSB7XG4gICAgZG9jRnJhZy5hcHBlbmRDaGlsZChzdmdQYXJ0aWFsc1tpXSk7XG4gIH1cbiAgdGhpcy4kYXBpVHJlZUZyYW1lLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXS5hcHBlbmRDaGlsZChkb2NGcmFnKTtcblxufTtcblxuQXBpRG9tLnByb3RvdHlwZS5jcmVhdGVTaW5nbGVTVkcgPSBmdW5jdGlvbihpZHgsIGhvcmksIHBhcmVudFZlcnQsIGR2ZXJ0KSB7XG5cbiAgdmFyIHN2Z25zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcbiAgdmFyIG5ld1BhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnbnMsICdwYXRoJyk7XG4gIHZhciBjb250cm9sUmF0ZSA9IDAuMjtcbiAgdmFyIG14LCBteSwgcXgsIHF5LCBxeHgsIHF5eSwgdHgsIHR5O1xuICBob3JpID0gaG9yaSAtIDE7XG4gIGR2ZXJ0ID0gZHZlcnQ7XG4gIHBhcmVudFZlcnQgPSBwYXJlbnRWZXJ0O1xuXG4gIG14ID0gaG9yaSAqIDQ5MDsgLyogc2luZ2xlIGxlYWYgd2lkdGggcGx1cyBzaW5nbGUgc3ZnIHBhdGggd2lkdGggKi9cbiAgbXkgPSBwYXJlbnRWZXJ0ICogNTIgKyA4O1xuICBxeCA9IG14ICsgMTA7XG4gIHF5ID0gbXk7XG4gIHF4eCA9IG14ICsgMTU7XG4gIHF5eSA9IChteSArIChkdmVydCAvIDIpICogNTIpO1xuICB0eCA9IG14ICsgMzA7XG4gIHR5ID0gbXkgKyBkdmVydCAqIDUyO1xuXG4gIG5ld1BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ2QnLCAnTSAnICsgbXggKyAnICcgKyBteSArICcgUSAnICsgcXggKyAnICcgKyBxeSArICcsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXh4ICsgJyAnICsgcXl5ICsgJyBUICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ICsgJyAnICsgdHkgKyAnJyk7XG4gIG5ld1BhdGguc2V0QXR0cmlidXRlKCdjbGFzcycsICdhcGktc3ZnLXBhdGgnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtaWR4JywgaWR4KTtcblxuICByZXR1cm4gbmV3UGF0aDtcbn07XG5cbi8qIGNhbGN1bGF0ZSBkaW1lbnNpb25zICovXG5BcGlEb20ucHJvdG90eXBlLmNhbGNEaW1lbnNpb25zID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3JpTWF4LCB2ZXJ0aWNhbE1heCwgaG9yaUFyciA9IFtdLCB2ZXJ0QXJyID0gW107XG5cbiAgaG9yaUFyciA9IHRoaXMuYXBpVHJlZS5kZXB0aCgpO1xuICBob3JpTWF4ID0gTWF0aC5tYXguYXBwbHkobnVsbCwgaG9yaUFycik7XG4gIHZlcnRpY2FsTWF4ID0gdGhpcy5hcGlUcmVlLl9yb290LmNoaWxkcmVubGV2ZWw7XG4gIHRoaXMuJGFwaVRyZWVGcmFtZS5zdHlsZS53aWR0aCA9IGhvcmlNYXggKiA1MjAgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlQ29udGVudC5zdHlsZS53aWR0aCA9IGhvcmlNYXggKiA1MjAgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlRnJhbWUuc3R5bGUuaGVpZ2h0ID0gdmVydGljYWxNYXggKiA1MiAtICh2ZXJ0aWNhbE1heCA+IDEgPyAxMCA6IDApICsgJ3B4JztcbiAgdGhpcy4kYXBpVHJlZUNvbnRlbnQuc3R5bGUuaGVpZ2h0ID0gdmVydGljYWxNYXggKiA1MiAtICh2ZXJ0aWNhbE1heCA+IDEgPyAxMCA6IDApICsgJ3B4JztcbiAgcmV0dXJuIFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG5cbn07XG5cbi8qIGNhbGN1bGF0ZSBvZmZzZXQgKi9cblxuQXBpRG9tLnByb3RvdHlwZS5ub2RlTGVmdE9mZnNldCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHZhciBlbFJlY3RPYmplY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGJvZHlSZWN0T2JqID0gdGhpcy4kYXBpVHJlZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGNsb25lQm9keVJlY3RPYmogPSBjbG9uZVJlY3RPYmooYm9keVJlY3RPYmopO1xuICB2YXIgY2xvbmVFbFJlY3RPYmplY3QgPSBjbG9uZVJlY3RPYmooZWxSZWN0T2JqZWN0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QudG9wICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoudG9wKTtcbiAgY2xvbmVFbFJlY3RPYmplY3QuYm90dG9tICs9IE1hdGguYWJzKGNsb25lQm9keVJlY3RPYmoudG9wKTtcbiAgY2xvbmVFbFJlY3RPYmplY3QubGVmdCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLmxlZnQpO1xuICBjbG9uZUVsUmVjdE9iamVjdC5yaWdodCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLmxlZnQpO1xuICByZXR1cm4gY2xvbmVFbFJlY3RPYmplY3Q7XG59O1xuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZURvbS5qcyIsImV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPZkFycmF5KG51bUFycmF5KSB7XG4gIHJldHVybiBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNDbGFzcyhlbGVtLCBjbGFzc05hbWUpIHtcbiAgcmV0dXJuIGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihjbGFzc05hbWUpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4KCkge1xuICB2YXIgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksIHByZWZpeCA9ICcnO1xuICBwcmVmaXggPSAodWEuaW5kZXhPZignY2hyb21lJykgPj0gMCB8fCB3aW5kb3cub3BlbkRhdGFiYXNlKSA/ICctd2Via2l0LScgOiAodWEuaW5kZXhPZignZmlyZWZveCcpID49IDApID8gJy1tb3otJyA6IHdpbmRvdy5vcGVyYSA/ICctby0nIDogKGRvY3VtZW50LmFsbCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09wZXJhJykgPT09IC0xKSA/ICctbXMtJyA6ICcnO1xuICByZXR1cm4gcHJlZml4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsKSB7XG4gIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnLXdlYmtpdC10cmFuc2Zvcm0nKTtcbiAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuXG4gIGlmICghcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcbiAgaWYgKHJlc3VsdHNbMV0gPT0gJzNkJykgcmV0dXJuIHJlc3VsdHMuc2xpY2UoMiw1KTtcblxuICByZXN1bHRzLnB1c2goMCk7XG4gIHJldHVybiByZXN1bHRzLnNsaWNlKDUsIDgpOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4vLyAgIC8vIGNocm9tZSB3b24ndCB1c2UgcHJlZml4XG4vLyAgIC8vIHZhciBzdHlsZV9hdHRyID0gYnJvd3NlclByZWZpeCgpICsgJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciBzdHlsZV9hdHRyID0gJ3RyYW5zZm9ybSc7XG4vLyAgIHZhciB0cmFuc2Zvcm0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzdHlsZV9hdHRyKTtcbi8vICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xuLy8gICBpZiAoIXJlc3VsdHMpIHJldHVybiBbMCwgMCwgMF07XG4vLyAgIGlmIChyZXN1bHRzWzFdID09PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xuLy8gICByZXN1bHRzLnB1c2goMCk7XG4vLyAgIHJldHVybiArKHJlc3VsdHMuc2xpY2UoNSwgOClbMF0pOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XG4gIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoJ3N0eWxlJykuc3BsaXQoJ3RyYW5zbGF0ZTNkJylbMV0uc3BsaXQoJywgJylbMF0uc2xpY2UoMSkuc3BsaXQoJ3B4JylbMF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVZKG9iaikge1xuICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSB8fCBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICB2YXIgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICBpZiAobWF0KSByZXR1cm4gcGFyc2VGbG9hdChtYXRbMV0uc3BsaXQoJywgJylbMTNdKTtcbiAgbWF0ID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgcmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xuICB2YXIgc3RyID0gW107XG4gIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwKSkge1xuICAgICAgdmFyIGsgPSBwcmVmaXggPyBwcmVmaXggKyAnWycgKyBwICsgJ10nIDogcCwgdiA9IG9ialtwXTtcbiAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09PSAnb2JqZWN0JyA/XG4gICAgICAgIHNlcmlhbGl6ZSh2LCBrKSA6XG4gICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHIuam9pbignJicpO1xufVxuXG5cbi8qKlxuICogW3N0cmluZ2lmeSB3aXRoIDQgc3BhY2VzIGF0IGVhY2ggbGV2ZWxdXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3N0cmluZ119ICAgICAgIFtkZXNjcmlwdGlvbl1cbiAqIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCBcIlxcdFwiKTsgLy8gc3RyaW5naWZ5IHdpdGggdGFicyBpbnNlcnRlZCBhdCBlYWNoIGxldmVsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZWF1dGlmeUpTT04oanNPYmopIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTtcbn1cblxuLyoqXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXG4gKiBAcGFyYW0gIHtKU09OIG9iamVjdH0ganNvbiBbZGVzY3JpcHRpb25dXG4gKiBAcmV0dXJuIHtzdHJpbmd9ICAgICAgW2Rlc2NyaXB0aW9uXVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlnaHRsaWdodEpTT04oanNvbikge1xuICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcbiAganNvbiA9IGpzb24ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKS5yZXBsYWNlKC88L2csICcmbHQ7JykucmVwbGFjZSgvPi9nLCAnJmd0OycpO1xuICByZXR1cm4ganNvbi5yZXBsYWNlKC8oXCIoXFxcXHVbYS16QS1aMC05XXs0fXxcXFxcW151XXxbXlxcXFxcIl0pKlwiKFxccyo6KT98XFxiKHRydWV8ZmFsc2V8bnVsbClcXGJ8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8pL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgdmFyIGNscyA9ICdudW1iZXInO1xuICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xuICAgICAgaWYgKC86JC8udGVzdChtYXRjaCkpIHtcbiAgICAgICAgY2xzID0gJ2tleSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbHMgPSAnc3RyaW5nJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC90cnVlfGZhbHNlLy50ZXN0KG1hdGNoKSkge1xuICAgICAgY2xzID0gJ2Jvb2xlYW4nO1xuICAgIH0gZWxzZSBpZiAoL251bGwvLnRlc3QobWF0Y2gpKSB7XG4gICAgICBjbHMgPSAnbnVsbCc7XG4gICAgfVxuICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzIiwiaW1wb3J0IHtmbGFzaCwgcGFyc2VBbmRGbGFzaH0gZnJvbSAnLi9mbGFzaCc7XG5leHBvcnQgbGV0IGNhbGxiYWNrcyA9IHtcbiAgZGVsZXRlU3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgIGZ1bmN0aW9uIGRlc3RvcnlBcGlMaSgpIHtcbiAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJy5hcGktdWwnKS5yZW1vdmVDaGlsZCh0aGlzLnRhcmdldC5jbG9zZXN0KCcuYXBpLWxpJykpO1xuICAgIH1cbiAgICBwYXJzZUFuZEZsYXNoKGRhdGEsIGRlc3RvcnlBcGlMaS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICB9LFxuICBlcnJvcjogZnVuY3Rpb24oZGF0YSkge1xuICAgIHBhcnNlQW5kRmxhc2goZGF0YSk7XG4gIH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2NvbW1vbi9jYWxsYmFja3MuanMiLCJpbXBvcnQge3JvclBhcmFtcyBhcyBSUHN9IGZyb20gJy4uL2NvbW1vbi9jc3JmJztcbi8qKlxuICogW2hhbmRsZU1ldGhvZCBkZXNjcmlwdGlvbl1cbiAqIEBwYXJhbSAge0hUTUxFbGVtZW50fSBsaW5rIFtkZXNjcmlwdGlvbl1cbiAqIEByZXR1cm4ge1t0eXBlXX0gICAgICBbZGVzY3JpcHRpb25dXG4gKiBIYW5kbGVzIFwiZGF0YS1tZXRob2RcIiBvbiBsaW5rcyBzdWNoIGFzOlxuICogPGEgaHJlZj1cIi91c2Vycy81XCIgZGF0YS1tZXRob2Q9XCJkZWxldGVcIiByZWw9XCJub2ZvbGxvd1wiIGRhdGEtY29uZmlybT1cIkFyZSB5b3Ugc3VyZT9cIj5EZWxldGU8L2E+XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVNZXRob2QobGluaywgb2JqID0ge30pIHtcbiAgdmFyIGhyZWYgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgIG1ldGhvZCA9IGxpbmsuZGF0YXNldC5tZXRob2QsXG4gICAgdGFyZ2V0ID0gbGluay5nZXRBdHRyaWJ1dGUoJ3RhcmdldCcpLFxuICAgIGNzcmZUb2tlbiA9IFJQcy5jc3JmVG9rZW4oKSxcbiAgICBjc3JmUGFyYW0gPSBSUHMuY3NyZlBhcmFtKCk7XG4gIHZhciBwYXJhbXNPYmogPSB7XG4gICAgaHJlZjogaHJlZixcbiAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICBjc3JmVG9rZW46IGNzcmZUb2tlbixcbiAgICBjc3JmUGFyYW06IGNzcmZQYXJhbVxuICB9O1xuICB2YXIgZm9ybUVsZSA9IGNyZWF0ZUZvcm0ocGFyYW1zT2JqLCBvYmopO1xuICBhcHBlbmRGb3JtVG9Eb20oZm9ybUVsZSk7XG4gIHN1Ym1pdEZvcm0oZm9ybUVsZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVGb3JtKHBhcmFtcywgb2JqKSB7XG4gIHZhciBmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICBmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGYuc2V0QXR0cmlidXRlKCdtZXRob2QnLCdwb3N0Jyk7XG4gIGYuc2V0QXR0cmlidXRlKCdhY3Rpb24nLHBhcmFtcy5ocmVmKTtcbiAgaWYgKHBhcmFtcy50YXJnZXQpIHtcbiAgICBmLnNldEF0dHJpYnV0ZSgndGFyZ2V0JywgcGFyYW1zLnRhcmdldCk7XG4gIH07XG5cbiAgdmFyIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBpLnNldEF0dHJpYnV0ZSgndHlwZScsJ2hpZGRlbicpO1xuICBpLnNldEF0dHJpYnV0ZSgnbmFtZScsJ19tZXRob2QnKTtcbiAgaS5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJyxwYXJhbXMubWV0aG9kKTtcblxuICB2YXIgcztcbiAgaWYgKHBhcmFtcy5jc3JmUGFyYW0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgcGFyYW1zLmNzcmZUb2tlbiAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAhUlBzLmlzQ3Jvc3NEb21haW4ocGFyYW1zLmhyZWYpKSB7XG4gICAgcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgcy5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgICBzLnNldEF0dHJpYnV0ZSgnbmFtZScsIHBhcmFtcy5jc3JmUGFyYW0pO1xuICAgIHMuc2V0QXR0cmlidXRlKCd2YWx1ZScscGFyYW1zLmNzcmZUb2tlbik7XG4gIH1cbiAgZi5hcHBlbmRDaGlsZChpKTtcblxuICAvLyBmb3IgKGxldCBrZXkgaW4gb2JqLmRhdGEpIHtcbiAgLy8gICBpZiAob2JqLmRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAvLyAgICAgbGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAvLyAgICAgdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdoaWRkZW4nKTtcbiAgLy8gICAgIHQuc2V0QXR0cmlidXRlKCduYW1lJywnJyArIG9iai5ucyArICdbJyArIGtleSArICddJyk7XG4gIC8vICAgICB0LnNldEF0dHJpYnV0ZSgndmFsdWUnLG9iai5kYXRhW2tleV0pO1xuICAvLyAgICAgZi5hcHBlbmRDaGlsZCh0KTtcbiAgLy8gICB9XG4gIC8vIH1cblxuICBpZiAocykge1xuICAgIGYuYXBwZW5kQ2hpbGQocyk7XG4gIH07XG4gIHJldHVybiBmO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRGb3JtVG9Eb20oZm9ybSkge1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xufVxuZnVuY3Rpb24gc3VibWl0Rm9ybShmb3JtKSB7XG4gIGZvcm0uc3VibWl0KCk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2hhbmRsZU1ldGhvZC5qcyIsImV4cG9ydCBmdW5jdGlvbiBodG1sRXNjYXBlKHN0cikge1xuXHRzdHIgPSAnJyArIHN0cjsgLy8gZm9yIG51bWJlcnMgZXRjLlxuICByZXR1cm4gc3RyLnJlcGxhY2UoLyYvZywgJyZhbXA7JykgLy8gZmlyc3QhXG4gICAgICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJyZxdW90OycpXG4gICAgICAgICAgICAucmVwbGFjZSgvJy9nLCAnJiMzOTsnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL2AvZywgJyYjOTY7Jyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvY29tbW9uL2h0bWxFc2NhcGUuanMiLCJpbXBvcnQge3N0clRvRG9tLCBkZWJvdW5jZX0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZVNjcm9sbFN0cigpIHtcbiAgbGV0IHNjcm9sbFN0ciA9IGBcbiAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtY3RybC1zY3JvbGxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLWF4aXNcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXNsaWRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9wdWktc2Nyb2xsLXMtdG9wXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwib3B1aS1zY3JvbGwtcy1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvcHVpLXNjcm9sbC1zLWJsb2NrXCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGA7XG4gIHJldHVybiBzY3JvbGxTdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzY3JvbGxCYXJIKGIpIHtcbiAgcmV0dXJuIG5ldyBhKGIpO1xufVxuXG5mdW5jdGlvbiBhKHgpIHtcbiAgdmFyIHEgPSB0aGlzO1xuICB0aGlzLm9wdGlvbnMgPSB4O1xuICBsZXQgbmV3U2Nyb2xsU3RyID0gZ2VuZXJhdGVTY3JvbGxTdHIoKTtcbiAgbGV0IG5ld1Njcm9sbEVsZSA9IHN0clRvRG9tKG5ld1Njcm9sbFN0cik7XG4gIHZhciBZID0geC5zY3JvbGxiYXIgfHwgbmV3U2Nyb2xsRWxlXG4gICAgLCBqID0geC5jb250ZW50XG4gICAgLCBOID0geC5vdmVyZmxvd0VsZVxuICAgICwgaSA9IHguaW5pdFBvcyB8fCAwXG4gICAgLCBNID0geC5pbml0RG9tIHx8IG51bGxcbiAgICAsIFUgPSB4Lm1vdXNld2hlZWwgfHwgdHJ1ZVxuICAgICwgbCA9IHgubW91c2V3aGVlbGxvY2sgfHwgZmFsc2VcbiAgICAsIEggPSB4LndoZWVsZGVsdGEgfHwgMVxuICAgICwgeiA9IHguY3RybGJsb2NrIHx8IDBcbiAgICAsIEogPSB4LnN0ZXAgfHwgMC4xXG4gICAgLCByID0geC5sZW5ndGhcbiAgICAsIEkgPSB4LnNjYWxlIHx8IDBcbiAgICAsIEcgPSB4LnRoZW1lIHx8ICcnXG4gICAgLCBhZCA9IHgucmVmcmVzaCB8fCBmYWxzZTtcbiAgdmFyIFMgPSAwLCBUID0gMCwgaCA9IDAsIFYgPSBmdW5jdGlvbihhZykge1xuICAgIHZhciBhZiA9IHBhcnNlSW50KFMgLSBUKTtcbiAgICBpZiAoYWYgPiAwKSB7XG4gICAgICB2YXIgYWcgPSBhZy52YWx1ZTtcbiAgICAgIGouc2Nyb2xsTGVmdCA9IGFmICogYWc7XG4gICAgfVxuICB9XG4gICxcbiAgICB2ID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLWF4aXMnKVswXSxcbiAgZyA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1zbGlkZXInKVswXSxcbiAgdSA9IG5ld1Njcm9sbEVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdvcHVpLXNjcm9sbC1zLXRvcCcpWzBdLFxuICBGID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXMtYm90dG9tJylbMF0sXG4gIGFlID0gbmV3U2Nyb2xsRWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ29wdWktc2Nyb2xsLXMtYmxvY2snKVswXSxcbiAgVyA9IDAsIFEgPSB6IHx8IDAsIGsgPSAwLCBSID0gUSwgbSA9IDAsIEMgPSAwLCBMID0gMCwgZCA9IDAsIHQgPSBudWxsICwgYiA9IG51bGwgLCBhYiwgUCwgRDtcbiAgdmFyIHkgPSBmdW5jdGlvbigpIHtcbiAgICBYID0gZmFsc2U7XG4gICAgYyA9IGZhbHNlO1xuICB9XG4gIDtcbiAgaWYgKCF4LnNjcm9sbGJhcikge1xuICAgIHgud3JhcHBlci5hcHBlbmRDaGlsZChuZXdTY3JvbGxFbGUpO1xuICB9XG4gIGouY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1jb250ZW50Jyk7XG4gIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwnKTtcbiAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbihhZykge1xuICAgIGlmICghYWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoRCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBUID0gai5vZmZzZXRXaWR0aDtcbiAgICAgIGggPSBZLm9mZnNldFdpZHRoO1xuICAgICAgUyA9IE4ub2Zmc2V0V2lkdGg7XG4gICAgfSBjYXRjaCAoYWgpIHt9XG4gICAgVyA9IGFnIHx8IHIgfHwgVCAtIDI7XG4gICAgWS5zdHlsZS53aWR0aCA9IFcgKyAncHgnO1xuICAgIHYuc3R5bGUud2lkdGggPSBXICsgJ3B4JztcbiAgICBpZiAoVyA+PSAwICYmIFMgPj0gMCkge1xuICAgICAgaWYgKFMgPD0gVyArIDIpIHtcbiAgICAgICAgWS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgWS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH1cbiAgICAgIGlmIChJICE9IChTIC8gVykpIHtcbiAgICAgICAgSSA9IFMgLyBXO1xuICAgICAgICBvKEkpO1xuICAgICAgICBaKHEubWVtT2Zmc2V0WCk7XG4gICAgICB9XG4gICAgICB2YXIgYWYgPSAwO1xuICAgICAgaWYgKE0pIHtcbiAgICAgICAgaWYgKE0ub2Zmc2V0TGVmdCArIE0uc2Nyb2xsV2lkdGggPj0gUykge1xuICAgICAgICAgIGFmID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoTS5vZmZzZXRMZWZ0ICsgTS5zY3JvbGxXaWR0aCA8PSBUKSB7XG4gICAgICAgICAgICBhZiA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFmID0gTS5vZmZzZXRMZWZ0IC8gUztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYWYpO1xuICAgICAgICBaKGFmKTtcbiAgICAgIH1cbiAgICAgIGlmIChpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICBaKGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICA7XG4gIEQgPSBzZXRJbnRlcnZhbCh0aGlzLnJlbmRlciwgNTApO1xuICAvLyBZLmlubmVySFRNTCA9ICcnO1xuXG4gIGcub25EcmFnc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgO1xuICBnLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xuICAgIGcuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtc2xpZGVyLWhvdmVyJyk7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICB9KTtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLXNsaWRlci10b3VjaCcpO1xuICAgIFkuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgfSk7XG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci1ob3ZlcicpO1xuICB9KTtcbiAgZy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XG4gICAgZy5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1zbGlkZXItdG91Y2gnKTtcbiAgfSk7XG4gIFkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QuYWRkKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtcbiAgICBZLmNsYXNzTGlzdC5hZGQoJ29wdWktc2Nyb2xsLWN0cmwtc2Nyb2xsLXRvdWNoJyk7XG4gIH0pO1xuICBZLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICB9KTtcbiAgWS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24oKSB7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC10b3VjaCcpO1xuICB9KTtcbiAgdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHMpO1xuICBpZiAoVSAmJiAhdGhpcy5vbndoZWVsKSB7XG4gICAgaWYgKCFqLmNsYXNzTGlzdC5jb250YWlucygnb3B1aS1zY3JvbGwtb253aGVlbCcpKSB7XG4gICAgICBqLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcCk7XG4gICAgICBqLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNld2hlZWwnLCBwKTtcbiAgICAgIGouY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtb253aGVlbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaikge1xuICAgIGouYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWQpIHtcbiAgICAgICAgWihqLnNjcm9sbExlZnQgLyAoai5zY3JvbGxXaWR0aCAtIGoub2Zmc2V0V2lkdGgpLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGcuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oYWYpIHtcbiAgICB0ID0gZG9jdW1lbnQub25zZWxlY3RzdGFydDtcbiAgICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIDtcbiAgICBiID0gd2luZG93LnNldEludGVydmFsKG4sIDQwKTtcbiAgICBOLnN0eWxlWyctbW96LXVzZXItc2VsZWN0J10gPSAnbm9uZSc7XG4gICAgTi5zdHlsZVsnLXdlYmtpdC11c2VyLXNlbGVjdCddID0gJ25vbmUnO1xuXG4gICAgTCA9IGFmLmNsaWVudFggLSBnLm9mZnNldExlZnQ7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZik7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGFhKTtcbiAgICBkID0gMTtcbiAgICBhZi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIGZ1bmN0aW9uIEsoYWcsIGFoLCBhZikge1xuICAgIGlmIChhZikge1xuICAgICAgYWcgPSBhZyA+IGFmID8gYWYgOiBhZztcbiAgICB9XG4gICAgcmV0dXJuIGFnID49IGFoID8gYWcgOiBhaDtcbiAgfVxuICBmdW5jdGlvbiBuKCkge1xuICAgIFYuY2FsbCh3aW5kb3csIHtcbiAgICAgIHZhbHVlOiBDLFxuICAgICAgc2NhbGU6IElcbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBPKCkge1xuICAgIGlmIChhYikge1xuICAgICAgY2xlYXJJbnRlcnZhbChhYik7XG4gICAgfVxuICAgIEUoKTtcbiAgICBhYiA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKFgpIHtcbiAgICAgICAgRSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChhYik7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfVxuICBmdW5jdGlvbiBhYygpIHtcbiAgICBpZiAoUCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChQKTtcbiAgICB9XG4gICAgQigpO1xuICAgIFAgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjKSB7XG4gICAgICAgIEIoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoUCk7XG4gICAgICB9XG4gICAgfSwgMTAwKTtcbiAgfVxuICBmdW5jdGlvbiBFKCkge1xuICAgIHZhciBhZiA9IEMgLSBKO1xuICAgIGFmID0gKGFmIDwgMCkgPyAwIDogYWY7XG4gICAgWihhZik7XG4gIH1cbiAgZnVuY3Rpb24gQigpIHtcbiAgICB2YXIgYWYgPSBDICsgSjtcbiAgICBhZiA9IChhZiA+IDEpID8gMSA6IGFmO1xuICAgIFooYWYpO1xuICB9XG4gIGZ1bmN0aW9uIGYoYWYpIHtcbiAgICBhZiA9IHdpbmRvdy5ldmVudCB8fCBhZjtcbiAgICB2YXIgYWcgPSBLKGFmLmNsaWVudFggLSBMLCBSLCBtKTtcbiAgICBDID0gKGFnIC0gUikgLyAobSAtIFIpO1xuICAgIGcuc3R5bGUubGVmdCA9IGFnICsgJ3B4JztcbiAgICBxLm1lbU9mZnNldFggPSBhZztcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gYWEoKSB7XG4gICAgWS5jbGFzc0xpc3QucmVtb3ZlKCdvcHVpLXNjcm9sbC1jdHJsLXNjcm9sbC1ob3ZlcicpO1xuICAgIFkuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtY3RybC1zY3JvbGwtdG91Y2gnKTtcbiAgICBnLmNsYXNzTGlzdC5yZW1vdmUoJ29wdWktc2Nyb2xsLXNsaWRlci1ob3ZlcicpO1xuICAgIGcuY2xhc3NMaXN0LnJlbW92ZSgnb3B1aS1zY3JvbGwtc2xpZGVyLXRvdWNoJyk7XG4gICAgTi5zdHlsZVsnLW1vei11c2VyLXNlbGVjdCddID0gJyc7XG4gICAgTi5zdHlsZVsnLXdlYmtpdC11c2VyLXNlbGVjdCddID0gJyc7XG4gICAgaWYgKGIpIHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGIpO1xuICAgIH1cbiAgICBpZiAodCkge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYWEpO1xuICAgIGcuY2xhc3NMaXN0LmFkZCgnb3B1aS1zY3JvbGwtc2xpZGVyJyk7XG4gICAgZCA9IDA7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHMoYWYpIHtcbiAgICBaKChhZi5vZmZzZXRYIHx8IGFmLmxheWVyWCkgLyBXKTtcbiAgfVxuICBmdW5jdGlvbiBaKGFoLCBhZikge1xuICAgIGFoID0gYWggPCAwID8gMCA6IGFoO1xuICAgIGFoID0gYWggPiAxID8gMSA6IGFoO1xuICAgIEMgPSBhaDtcbiAgICB2YXIgYWcgPSAobSAtIFIpICogQyArIFI7XG4gICAgZy5zdHlsZS5sZWZ0ID0gYWcgKyAncHgnO1xuICAgIHEubWVtT2Zmc2V0WCA9IGFnO1xuICAgIGlmICghYWYpIHtcbiAgICAgIG4oKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcChhZikge1xuICAgIC8vIGFmLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gYWYgPSBhZi5vcmlnaW5hbEV2ZW50O1xuICAgIC8vIGlmIChhZikge1xuICAgIC8vICAgdGhpcy5vbndoZWVsID0gMTtcbiAgICAvLyAgIHZhciBhaSA9ICgtYWYud2hlZWxEZWx0YSB8fCAoYWYuZGV0YWlsICYmIGFmLmRldGFpbCAqIDQwKSB8fCAwKSAvIEg7XG4gICAgLy8gICB2YXIgYWggPSBhaTtcbiAgICAvLyAgIHZhciBhZyA9IGFoID4gMCA/IGouc2Nyb2xsTGVmdCArIDIgOiBqLnNjcm9sbExlZnQgLSAyO1xuICAgIC8vICAgTi5zdHlsZS56b29tID0gJzEnO1xuICAgIC8vICAgaWYgKGFnID4gMCAmJiAoYWcgPCAoTi5vZmZzZXRXaWR0aCAtIGoub2Zmc2V0V2lkdGggKyA1KSB8fCAoTi5vZmZzZXRXaWR0aCAtIGouc2Nyb2xsV2lkdGggPCAwICYmIGFoIDwgMCkpKSB7XG4gICAgLy8gICAgIGouc2Nyb2xsTGVmdCArPSBhaDtcbiAgICAvLyAgICAgQyA9IGouc2Nyb2xsTGVmdCAvIChqLnNjcm9sbFdpZHRoIC0gai5vZmZzZXRXaWR0aCk7XG4gICAgLy8gICB9IGVsc2Uge1xuICAgIC8vICAgICBpZiAoIWwgfHwgWS5zdHlsZS5kaXNwbGF5ID09ICdub25lJykge1xuICAgIC8vICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ICs9IGFoO1xuICAgIC8vICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArPSBhaDtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgfVxuICBmdW5jdGlvbiBvKGFmKSB7XG4gICAgSSA9IChhZiA+IDEwKSA/IDEwIDogYWY7XG4gICAgaWYgKEkgPD0gMSkge1xuICAgICAgZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBnLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHZhciBhZyA9IFcgLSAyICogUTtcbiAgICBrID0gcGFyc2VJbnQoYWcgLyBJKTtcbiAgICBrID0gKGsgPCAxNSkgPyAxNSA6IGs7XG4gICAgbSA9IFcgLSBRIC0gaztcbiAgICBnLnN0eWxlLndpZHRoID0gayArICdweCc7XG4gIH1cbiAgaWYgKEkgPiAxKSB7XG4gICAgbyhJKTtcbiAgfVxuICBsZXQgZGVib3VuY2VkV2luZG93UmVzaXplID0gZGVib3VuY2UocmVSZW5kZXIsIDIwMCwgZmFsc2UpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VkV2luZG93UmVzaXplKTtcbiAgZnVuY3Rpb24gcmVSZW5kZXIoKSB7XG4gICAgcS5yZW5kZXIoKTtcbiAgfVxuICB0aGlzLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodCkge1xuICAgICAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH1cbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgYWEpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB5KTtcbiAgICBpZiAoYikge1xuICAgICAgY2xlYXJJbnRlcnZhbChiKTtcbiAgICB9XG4gICAgaWYgKGFiKSB7XG4gICAgICBjbGVhckludGVydmFsKGFiKTtcbiAgICB9XG4gICAgaWYgKFApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoUCk7XG4gICAgfVxuICAgIGlmIChEKSB7XG4gICAgICBjbGVhckludGVydmFsKEQpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2Nyb2xsLmpzIiwiLyoqXG4gKiBbc2VyaWFsaXplIGNvbnZlcnRzIHJlY3Vyc2l2ZSBvYmplY3RzXVxuICogQHBhcmFtICB7W3R5cGVdfSBvYmogICAgW2Rlc2NyaXB0aW9uXVxuICogQHBhcmFtICB7W3R5cGVdfSBwcmVmaXggW2Rlc2NyaXB0aW9uXVxuICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICogY29uc29sZS5sb2coc2VyaWFsaXplKHtmb286IFwiaGkgdGhlcmVcIiwgYmFyOiB7IGJsYWg6IDEyMywgcXV1eDogWzEsIDIsIDNdIH19KSk7XG4gKiBmb289aGklMjB0aGVyZSZiYXIlNUJibGFoJTVEPTEyMyZiYXIlNUJxdXV4JTVEJTVCMCU1RD0xJmJhciU1QnF1dXglNUQlNUIxJTVEPTImYmFyJTVCcXV1eCU1RCU1QjIlNUQ9M1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXplKG9iaiwgcHJlZml4KSB7XG4gIHZhciBzdHIgPSBbXTtcbiAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICB2YXIgayA9IHByZWZpeCA/IHByZWZpeCArICdbJyArIHAgKyAnXScgOiBwLCB2ID0gb2JqW3BdO1xuICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT0gJ29iamVjdCcgP1xuICAgICAgICBzZXJpYWxpemUodiwgaykgOlxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyLmpvaW4oJyYnKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2VyaWFsaXplLmpzIiwiaW1wb3J0IHtwb3B1cH0gZnJvbSAnLi4vY29tbW9uL3BvcHVwJztcbmV4cG9ydCBmdW5jdGlvbiBzbGlkZShldiwgcGFyYW1zLCBjYWxsYmFjaykge1xuICBsZXQgc2xpZGVFbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2xpZGVFbGUuY2xhc3NMaXN0LmFkZCgnc2xpZGUtbGF5ZXInKTtcbiAgc2xpZGVFbGUuaW5uZXJIVE1MID0gZ2VuZXJhdGVTbGlkZVRwbChwYXJhbXMuY29udGVudCk7XG4gIHBvc2l0aW9uU2xpZGVFbGUoc2xpZGVFbGUsIGV2KTtcbiAgYmluZFNsaWRlRXZlbnRzKHNsaWRlRWxlLCBldiwgcGFyYW1zLCBjYWxsYmFjayk7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2xpZGVFbGUpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZVNsaWRlVHBsKGNvbnRlbnQpIHtcbiAgbGV0IHRwbCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwic2xpZGUtc2hhZG93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwic2xpZGUtdGV4dFwiPiR7Y29udGVudH08L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInNsaWRlLWJ0bnNcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInNsaWRlLWJ0biBzbGlkZS1jYW5jZWwtYnRuXCI+Y2FuY2VsPC9zcGFuPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwic2xpZGUtYnRuIHNsaWRlLWNvbmZpcm0tYnRuXCI+Y29uZmlybTwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0YDtcbiAgcmV0dXJuIHRwbDtcbn1cblxuZnVuY3Rpb24gYmluZFNsaWRlRXZlbnRzKGVsZSwgZXYsIHBhcmFtcywgY2FsbGJhY2spIHtcbiAgZWxlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlLWNhbmNlbC1idG4nKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlU2xpZGUpO1xuICBlbGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGUtc2hhZG93JylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1NoYWRvdyk7XG4gIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jb25maXJtLWJ0bicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29uZmlybS5iaW5kKHRoaXMsIGV2LCBlbGUsIHBhcmFtcywgY2FsbGJhY2spKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybShldiwgZWxlLCBwYXJhbXMsIGNhbGxiYWNrKSB7XG4gIGNhbGxiYWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWxlKTtcbn1cblxuZnVuY3Rpb24gcG9zaXRpb25TbGlkZUVsZShlbGUsIGNvb3JkaW5hdGVzKSB7XG4gIC8vIGVsZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZS1jb250ZW50JylbMF0uc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyBjb29yZGluYXRlcy5jbGllbnRYICsgJ3B4LCAnICsgY29vcmRpbmF0ZXMuY2xpZW50WSArICdweCwgMCknO1xufVxuXG5mdW5jdGlvbiBjbGlja1NoYWRvdyhldikge1xuICBpZiAoZXYudGFyZ2V0ICE9PSBldi5jdXJyZW50VGFyZ2V0KSByZXR1cm47XG4gIHBvcHVwKGV2LCB1bmRlZmluZWQsIGNsb3NlU2xpZGUuYmluZCh0aGlzLCBldikpO1xufVxuXG5mdW5jdGlvbiBjbG9zZVNsaWRlKGV2KSB7XG4gIGxldCBwb3BMYXllciA9IGV2LnRhcmdldC5jbG9zZXN0KCcuc2xpZGUtbGF5ZXInKTtcbiAgaWYgKHBvcExheWVyKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChwb3BMYXllcik7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vc2xpZGUuanMiLCJpbXBvcnQge2h0bWxFc2NhcGV9IGZyb20gJy4vaHRtbEVzY2FwZSc7XG5leHBvcnQgZnVuY3Rpb24gaHRtbChsaXRlcmFsU2VjdGlvbnMsIC4uLnN1YnN0cykge1xuICAvLyBVc2UgcmF3IGxpdGVyYWwgc2VjdGlvbnM6IHdlIGRvbuKAmXQgd2FudFxuICAvLyBiYWNrc2xhc2hlcyAoXFxuIGV0Yy4pIHRvIGJlIGludGVycHJldGVkXG4gIGxldCByYXcgPSBsaXRlcmFsU2VjdGlvbnMucmF3O1xuXG4gIGxldCByZXN1bHQgPSAnJztcblxuICBzdWJzdHMuZm9yRWFjaCgoc3Vic3QsIGkpID0+IHtcbiAgICAvLyBSZXRyaWV2ZSB0aGUgbGl0ZXJhbCBzZWN0aW9uIHByZWNlZGluZ1xuICAgIC8vIHRoZSBjdXJyZW50IHN1YnN0aXR1dGlvblxuICAgIGxldCBsaXQgPSByYXdbaV07XG5cbiAgICAvLyBJbiB0aGUgZXhhbXBsZSwgbWFwKCkgcmV0dXJucyBhbiBhcnJheTpcbiAgICAvLyBJZiBzdWJzdGl0dXRpb24gaXMgYW4gYXJyYXkgKGFuZCBub3QgYSBzdHJpbmcpLFxuICAgIC8vIHdlIHR1cm4gaXQgaW50byBhIHN0cmluZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN1YnN0KSkge1xuICAgICAgc3Vic3QgPSBzdWJzdC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgc3Vic3RpdHV0aW9uIGlzIHByZWNlZGVkIGJ5IGEgZG9sbGFyIHNpZ24sXG4gICAgLy8gd2UgZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyBpbiBpdFxuICAgIGlmIChsaXQuZW5kc1dpdGgoJyQnKSkge1xuICAgICAgc3Vic3QgPSBodG1sRXNjYXBlKHN1YnN0KTtcbiAgICAgIGxpdCA9IGxpdC5zbGljZSgwLCAtMSk7XG4gICAgfVxuICAgIHJlc3VsdCArPSBsaXQ7XG4gICAgcmVzdWx0ICs9IHN1YnN0O1xuICB9KTtcbiAgLy8gVGFrZSBjYXJlIG9mIGxhc3QgbGl0ZXJhbCBzZWN0aW9uXG4gIC8vIChOZXZlciBmYWlscywgYmVjYXVzZSBhbiBlbXB0eSB0ZW1wbGF0ZSBzdHJpbmdcbiAgLy8gcHJvZHVjZXMgb25lIGxpdGVyYWwgc2VjdGlvbiwgYW4gZW1wdHkgc3RyaW5nKVxuICByZXN1bHQgKz0gcmF3W3Jhdy5sZW5ndGggLSAxXTsgLy8gKEEpXG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdGVtcGxhdGUuanMiLCIvLyBsZWZ0OiAzNywgdXA6IDM4LCByaWdodDogMzksIGRvd246IDQwLFxuLy8gc3BhY2ViYXI6IDMyLCBwYWdldXA6IDMzLCBwYWdlZG93bjogMzQsIGVuZDogMzUsIGhvbWU6IDM2XG52YXIga2V5cyA9IHszNzogMSwgMzg6IDEsIDM5OiAxLCA0MDogMX07XG5cbmZ1bmN0aW9uIHByZXZlbnREZWZhdWx0KGUpIHtcbiAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICBpZiAoZS5wcmV2ZW50RGVmYXVsdClcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBwcmV2ZW50RGVmYXVsdEZvclNjcm9sbEtleXMoZSkge1xuICBpZiAoa2V5c1tlLmtleUNvZGVdKSB7XG4gICAgcHJldmVudERlZmF1bHQoZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlU2Nyb2xsKCkge1xuICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIC8vIG9sZGVyIEZGXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBwcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICB3aW5kb3cub253aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2Rlcm4gc3RhbmRhcmRcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IHByZXZlbnREZWZhdWx0OyAvLyBvbGRlciBicm93c2VycywgSUVcbiAgd2luZG93Lm9udG91Y2htb3ZlICA9IHByZXZlbnREZWZhdWx0OyAvLyBtb2JpbGVcbiAgZG9jdW1lbnQub25rZXlkb3duICA9IHByZXZlbnREZWZhdWx0Rm9yU2Nyb2xsS2V5cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZVNjcm9sbCgpIHtcbiAgaWYgKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKVxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ0RPTU1vdXNlU2Nyb2xsJywgcHJldmVudERlZmF1bHQsIGZhbHNlKTtcbiAgd2luZG93Lm9ubW91c2V3aGVlbCA9IGRvY3VtZW50Lm9ubW91c2V3aGVlbCA9IG51bGw7XG4gIHdpbmRvdy5vbndoZWVsID0gbnVsbDtcbiAgd2luZG93Lm9udG91Y2htb3ZlID0gbnVsbDtcbiAgZG9jdW1lbnQub25rZXlkb3duID0gbnVsbDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9jb21tb24vdG9nZ2xlU2Nyb2xsLmpzIiwiZnVuY3Rpb24gc2V0Rm9jdXMoZWwpIHtcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgdmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoZWwsIDApO1xuICByYW5nZS5jb2xsYXBzZSh0cnVlKTtcbiAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHR3ZWV0Qm94KCkge1xuICB2YXIgZG9jID0gZG9jdW1lbnQ7XG4gIHZhciB0YiA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0d2VldC1ib3gnKVswXTtcbiAgaWYgKCF0YikgcmV0dXJuIG51bGw7XG4gIHZhciB0YmQgPSB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF07XG4gIHZhciB0YmRTdHJpbmcgPSAnPGRpdj48YnI+PC9kaXY+JztcblxuICB0Yi5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnY29uZGVuc2VkJyk7XG4gICAgaWYgKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKSAmJiB0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0uaW5uZXJUZXh0LnRyaW0oKS5sZW5ndGgpIHtcblxuICAgICAgdGIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd1BsYWNlaG9sZGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRiLmNsYXNzTGlzdC5hZGQoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgIH1cbiAgICBpZiAodGJkLmlubmVySFRNTCA9PT0gJ1doYXRcXCdzIGhhcHBlbmluZz8nKSB7XG5cbiAgICAgIHRiZC5pbm5lckhUTUwgPSAnPGJyPic7XG4gICAgfVxuICB9KTtcbiAgdGIuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5pbm5lckhUTUwpIHtcbiAgICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICAgIHRiLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dQbGFjZWhvbGRlcicpO1xuICAgICAgfSBlbHNlIHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0Yi5pbm5lckhUTUwgPSB0YmRTdHJpbmc7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHNldEZvY3VzKHRiLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXSk7XG5cbiAgICAgIH0sIDApO1xuICAgIH07XG4gIH0pO1xuXG4gIHRiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldikge1xuICAgIGlmICh0Yi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZGl2JylbMF0gJiYgdGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdLnRleHRDb250ZW50KSB7XG4gICAgICB0Yi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93UGxhY2Vob2xkZXInKTtcbiAgICB9O1xuICAgIGlmICh0Yi5pbm5lckhUTUwgPT09ICc8YnI+Jykge1xuICAgICAgdGIuaW5uZXJIVE1MID0gdGJkU3RyaW5nO1xuICAgICAgc2V0Rm9jdXModGIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RpdicpWzBdKTtcbiAgICB9XG4gIH0pO1xufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvbW9kdWxlcy90d2VldEJveC5qcyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlLmw7IH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGUuaTsgfVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwiaW1wb3J0IHtBY3Rpb25DYWJsZX0gZnJvbSAnLi9jb21tb24vQWN0aW9uQ2FibGUnO1xuaW1wb3J0IHtkYXRhTGlua3N9IGZyb20gJy4vbW9kdWxlcy9kYXRhTGlua3MnO1xuaW1wb3J0IHtob21lfSBmcm9tICcuL21vZHVsZXMvaG9tZXBhZ2UnO1xuXG5pbXBvcnQge2luaXRYaHJ9IGZyb20gJy4vbW9kdWxlcy9hcGlPcGVyYXRpb24nO1xuZGF0YUxpbmtzKCk7XG5pbXBvcnQge2ZjcH0gZnJvbSAnLi9tb2R1bGVzL2Zpc0NpUGx1Z2lucyc7XG4vLyBhcGlUcmVlKCk7XG4vLyB2YXIgcCA9IG5ldyBkYXduU1ZHKCk7XG4vLyBwLmluaXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhaW50ZXItdGFyZ2V0JykpO1xuLy8gcC5zdGFydCgpO1xuXG4oKCkgPT4ge1xuICBsZXQgcm91dGVzID0ge1xuICAgICcvJzogaG9tZSxcbiAgICAnL2Rldic6IFtpbml0WGhyXSxcbiAgICAnL2Zpc19jaV9wbHVnaW5zL25ldyc6IGZjcFxuICB9O1xuICBsZXQgcGF0aE5hbWUgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gIGlmIChyb3V0ZXMuaGFzT3duUHJvcGVydHkocGF0aE5hbWUpKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyb3V0ZXNbcGF0aE5hbWVdKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJlxuICAgICAgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGgpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm91dGVzW3BhdGhOYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZXNbcGF0aE5hbWVdW2ldLmFwcGx5KG51bGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByb3V0ZXNbcGF0aE5hbWVdLmFwcGx5KG51bGwpO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=