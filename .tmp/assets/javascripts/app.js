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
	
	var _add = __webpack_require__(1);
	
	var _apiTreeAppIndex = __webpack_require__(2);
	
	(0, _apiTreeAppIndex.apiTree)();
	var addition = (0, _add.add)(4, 5);
	console.log(addition);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.add = add;
	
	function add(a, b) {
		return a + b;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.apiTree = apiTree;
	
	var _treeDom = __webpack_require__(3);
	
	var _utilities = __webpack_require__(6);
	
	function apiTree() {
		var addApiBtn = document.getElementsByClassName('add-api-btn')[0];
		var apisArr = [];
		addApiBtn.addEventListener('click', function () {
			var newApi = new _treeDom.apiDom();
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.apiDom = apiDom;
	
	var _tree = __webpack_require__(4);
	
	var _utilities = __webpack_require__(6);
	
	var perApiTpl = '<div class="api-info">' + '<label class="api-label">API:</label>' + '<input class="api-uri" placeholder="" value="http://127.0.0.1:4567/foo" disabled="true" /> ' + '<label class="api-label">method:</label>' + '<select class="api-method">' + '<option value="GET" selected>GET</option>' + '<option value="POST">POST</option>' + '<option value="PATCH">PATCH</option>' + '<option value="DELETE">DELETE</option>' + '</select>' + '<span class="api-edit">edit</span>' + '<span class="api-save">save</span>' + '<span class="api-test">test</span>' + '</div>' + '<div class="api-tree-wrapper"><div class="api-tree"></div></div>' + '<div class="api-data">' + '<div class="data-views-control">' + '<span class="data-raw">raw</span>' + '<span class="data-beautify">beautify</span>' + '<span class="data-highlight">syntaxHighlight</span>' + '<span class="data-preview">preview</span>' + '</div>' + '<div class="data-view json">' + '</div>' + '</div>';
	
	var leafContentTpl = '<i class="remove-child">-</i>' + '<input type="text" class="leaf-key" placeholder="key" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="value" />' + '<i class="gap-mark">---</i>' + '<input type="text" class="leaf-value" placeholder="quantity" />' + '<i class="add-child">+</i>';
	
	var initRectObj = {
	  right: 0,
	  bottom: 0,
	  left: 0,
	  top: 0,
	  width: 0,
	  height: 0
	};
	
	function apiDom() {
	  this.$apis = document.getElementsByClassName('apis')[0];
	  var preApisLen = this.$apis.getElementsByClassName('per-api').length;
	  var newDocFrag = document.createDocumentFragment();
	  var perApiEle = document.createElement('div');
	  perApiEle.setAttribute('class', 'per-api');
	  perApiEle.innerHTML = perApiTpl;
	
	  newDocFrag.appendChild(perApiEle);
	  this.$apis.appendChild(newDocFrag);
	
	  this.bindEventsToMRCAPI();
	
	  this.leafIndex = 1;
	
	  var recentApi = this.$apis.getElementsByClassName('per-api')[preApisLen];
	  this.$apiTree = recentApi.getElementsByClassName('api-tree')[0];
	  this.$apiTree.appendChild(createLeaf('_data_root', 1, 0, initRectObj));
	
	  this.initApiTree();
	
	  this.calcDimensions();
	
	  this.initSVG();
	
	  this.bindEventsToMRCE();
	
	  this.apiReturnData = '';
	}
	
	apiDom.prototype.storeApiReturnData = function (data) {
	  this.apiReturnData = data;
	  this.$dataBeautify.click();
	};
	apiDom.prototype.jsonView = function (data) {
	  var $pre = document.createElement('pre');
	  $pre.innerHTML = data;
	  this.$dataView.innerHTML = '';
	  this.$dataView.appendChild($pre);
	};
	apiDom.prototype.bindEventsToMRCAPI = function () {
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
	    (0, _utilities.xhr)($apiMethod.value, $apiUri.value, that.storeApiReturnData.bind(that));
	  });
	
	  $dataRaw.addEventListener('click', function (ev) {
	    that.jsonView(that.apiReturnData);
	  });
	
	  this.$dataBeautify.addEventListener('click', function (ev) {
	    that.jsonView((0, _utilities.beautifyJSON)(JSON.parse(that.apiReturnData)));
	  });
	
	  $dataHighlight.addEventListener('click', function (ev) {
	    that.jsonView((0, _utilities.hightlightJSON)(JSON.parse(that.apiReturnData)));
	  });
	
	  $dataPreview.addEventListener('click', function (ev) {
	    that.jsonView('This feature has not been accomplished yet.');
	  });
	};
	
	apiDom.prototype.operateDataRootChild = function () {
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
	
	apiDom.prototype.initSVG = function () {
	  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	  svg.setAttributeNS(null, 'width', this.dimensionArr[0] * 520 + 'px');
	  svg.setAttributeNS(null, 'height', this.dimensionArr[1] * 52 + 'px');
	  svg.setAttribute('class', 'api-svg');
	  this.$apiTree.insertBefore(svg, this.$apiTree.firstChild);
	};
	
	apiDom.prototype.initApiTree = function () {
	  this.apiTree = new _tree.Tree('_data_root');
	  this.apiTree.add(1, '_data_root', this.apiTree.traverseBF);
	
	  this.operateDataRootChild();
	
	  return this.apiTree;
	};
	
	apiDom.prototype.delNode = function (ctx) {
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
	apiDom.prototype.removeNodesFromDom = function (arr) {
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
	
	apiDom.prototype.bindEventsToMRCE = function () {
	  var that = this;
	  var leaves = this.$apiTree.getElementsByClassName('leaf');
	  var leavesLen = leaves.length;
	  var newlyCreatedLeaf = leaves[leavesLen - 1];
	  var $addChild = newlyCreatedLeaf.getElementsByClassName('add-child')[0];
	  $addChild.addEventListener('click', function (ctx) {
	    that.addChild(ctx);
	  });
	
	  var $removeChild = newlyCreatedLeaf.getElementsByClassName('remove-child')[0];
	  $removeChild.addEventListener('click', function (ctx) {
	    that.delNode(ctx);
	  });
	};
	apiDom.prototype.setParentNodeVal = function (idx) {
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
	apiDom.prototype.addChild = function (ctx) {
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
	apiDom.prototype.styleNodes = function (styleObj) {
	  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
	  var leafIdx, offsetY, originalX;
	
	  for (var i = 0; i < leaves.length; i++) {
	    originalX = (0, _utilities.getTranslateX)(leaves[i]);
	    leafIdx = +leaves[i].dataset.index;
	
	    for (var styleObjIdx in styleObj) {
	      if (+styleObjIdx === leafIdx) {
	        offsetY = styleObj[styleObjIdx] * 52;
	      };
	    }
	    leaves[i].style['transform'] = 'translate3d(' + originalX + 'px, ' + offsetY + 'px, 0)';
	  };
	  this.dimensionArr = this.calcDimensions();
	  this.drawSVG();
	};
	apiDom.prototype.addSibling = function (ctx) {
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
	apiDom.prototype.clearSVG = function () {
	  var svg = this.$apiTree.getElementsByClassName('api-svg')[0];
	  while (svg.lastChild) {
	    svg.removeChild(svg.lastChild);
	  }
	};
	
	apiDom.prototype.drawSVG = function () {
	  this.clearSVG();
	  var that = this;
	  var callback = function callback(node) {
	    if (node.parent !== null) {
	      that.drawSingleSVG(node.data, node.column, node.parent.totaloffsetylevel, node.totaloffsetylevel - node.parent.totaloffsetylevel);
	    };
	  };
	  this.apiTree.traverseDF(callback);
	};
	
	apiDom.prototype.drawSingleSVG = function (idx, hori, parentVert, dvert) {
	  var svg = this.$apiTree.getElementsByClassName('api-svg')[0];
	  svg.setAttributeNS(null, 'width', this.dimensionArr[0] * 520 + 'px');
	  svg.setAttributeNS(null, 'height', this.dimensionArr[1] * 52 + 'px');
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
	  svg.appendChild(newPath);
	};
	
	/* calculate dimensions */
	apiDom.prototype.calcDimensions = function () {
	  this.dimensionArr = this.apiTree.maxLevels();
	  var horiMax,
	      verticalMax,
	      horiArr = [],
	      vertArr = [];
	  for (var i = 0, x = this.dimensionArr.length; i < x; i++) {
	    horiArr.push(this.dimensionArr[i].length);
	    // vertArr.push(Math.max.apply(null, dimensionArr[i]));
	  };
	  horiMax = Math.max.apply(null, horiArr);
	  // verticalMax = vertArr.reduce(function(a, b) {
	  //   return a + b;
	  // });
	  verticalMax = this.apiTree._root.childrenlevel;
	  this.$apiTree.style.width = horiMax * 520 + 'px';
	  this.$apiTree.style.height = verticalMax * 52 + 'px';
	  this.dimensionArr = [horiMax, verticalMax];
	  return [horiMax, verticalMax];
	};
	
	/* calculate offset */
	
	apiDom.prototype.nodeLeftOffset = function (el) {
	  var elRectObject = el.getBoundingClientRect();
	  // var bodyRectObj = document.body.getBoundingClientRect();
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
/* 4 */
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
	
	var _queue = __webpack_require__(5);
	
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
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
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
	        prefix = "";
	    prefix = ua.indexOf("chrome") >= 0 || window.openDatabase ? "-webkit-" : ua.indexOf("firefox") >= 0 ? "-moz-" : window.opera ? "-o-" : document.all && navigator.userAgent.indexOf("Opera") === -1 ? "-ms-" : "";
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
	
	function getTranslateX(el) {
	    // chrome won't use prefix
	    // var style_attr = browserPrefix() + 'transform';
	    var style_attr = 'transform';
	    var transform = window.getComputedStyle(el, null).getPropertyValue(style_attr);
	    var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
	    if (!results) return [0, 0, 0];
	    if (results[1] === '3d') return results.slice(2, 5);
	    results.push(0);
	    return +results.slice(5, 8)[0]; // returns the [X,Y,Z,1] values
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
	            var k = prefix ? prefix + "[" + p + "]" : p,
	                v = obj[p];
	            str.push(typeof v === "object" ? serialize(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
	        }
	    }
	    return str.join("&");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjBkM2I3MGYzMjQ1MGJkZWVmZDIiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwcGxpY2F0aW9uLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hZGQuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL2FwcC1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanMiLCJ3ZWJwYWNrOi8vLy4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3F1ZXVlLmpzIiwid2VicGFjazovLy8uL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS91dGlsaXRpZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztnQ0N0Q2tCLENBQU87OzRDQUNILENBQXNCOztBQUM1QyxnQ0FBUyxDQUFDO0FBQ1YsS0FBSSxRQUFRLEdBQUcsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsUUFBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQzs7Ozs7Ozs7Ozs7OztBQ0pkLFVBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDekIsU0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7OztvQ0NETyxDQUFZOztzQ0FDZSxDQUFhOztB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LE1BQU07QUFDSCxvQkFBRyxHQUFHLFFBQVEsQ0FBQztjQUNsQjtVQUNKLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2pDLGdCQUFHLEdBQUcsU0FBUyxDQUFDO1VBQ25CLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzNCLGdCQUFHLEdBQUcsTUFBTSxDQUFDO1VBQ2hCO0FBQ0QsZ0JBQU8sZUFBZSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsS0FBSyxHQUFHLFNBQVMsQ0FBQztNQUMzRCxDQUFDLENBQUMiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiMGQzYjcwZjMyNDUwYmRlZWZkMlxuICoqLyIsImltcG9ydCB7YWRkfSBmcm9tICcuL2FkZCc7XG5pbXBvcnQge2FwaVRyZWV9IGZyb20gJy4vYXBpLXRyZWUvYXBwLWluZGV4JztcbmFwaVRyZWUoKTtcbnZhciBhZGRpdGlvbiA9IGFkZCg0LCA1KTtcbmNvbnNvbGUubG9nKGFkZGl0aW9uKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcHBsaWNhdGlvbi5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBhZGQoYSwgYikge1xuXHRyZXR1cm4gYSArIGI7XG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYWRkLmpzXG4gKiovIiwiaW1wb3J0IHthcGlEb219IGZyb20gJy4vdHJlZS1kb20nO1xyXG5pbXBvcnQge3hociwgYmVhdXRpZnlKU09OLCBoaWdodGxpZ2h0SlNPTn0gZnJvbSAnLi91dGlsaXRpZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFwaVRyZWUoKSB7XHJcblx0dmFyIGFkZEFwaUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZC1hcGktYnRuJylbMF07XHJcblx0dmFyIGFwaXNBcnIgPSBbXTtcclxuXHRhZGRBcGlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQgIHZhciBuZXdBcGkgPSBuZXcgYXBpRG9tKCk7XHJcblx0ICBhcGlzQXJyLnB1c2gobmV3QXBpKTtcclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2IoZGF0YSkge1xyXG4gIHZhciAkdGVzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXN0Jyk7XHJcbiAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgJHRlc3QuaW5uZXJIVE1MID0gaGlnaHRsaWdodEpTT04oZGF0YSk7XHJcbn1cclxuXHJcbi8vIHhocihcIkdFVFwiLCBcImh0dHA6Ly8xMjcuMC4wLjE6NDU2Ny9mb29cIiwgY2IpO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvYXBwLWluZGV4LmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IHtUcmVlfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHtnZXRUcmFuc2xhdGVYLCB4aHIsIGJlYXV0aWZ5SlNPTiwgaGlnaHRsaWdodEpTT059IGZyb20gJy4vdXRpbGl0aWVzJztcbnZhciBwZXJBcGlUcGwgPSAnPGRpdiBjbGFzcz1cImFwaS1pbmZvXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8bGFiZWwgY2xhc3M9XCJhcGktbGFiZWxcIj5BUEk6PC9sYWJlbD4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpbnB1dCBjbGFzcz1cImFwaS11cmlcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPVwiaHR0cDovLzEyNy4wLjAuMTo0NTY3L2Zvb1wiIGRpc2FibGVkPVwidHJ1ZVwiIC8+ICcgK1xuICAgICAgICAgICAgICAgICAgICAnPGxhYmVsIGNsYXNzPVwiYXBpLWxhYmVsXCI+bWV0aG9kOjwvbGFiZWw+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c2VsZWN0IGNsYXNzPVwiYXBpLW1ldGhvZFwiPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJHRVRcIiBzZWxlY3RlZD5HRVQ8L29wdGlvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiUE9TVFwiPlBPU1Q8L29wdGlvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8b3B0aW9uIHZhbHVlPVwiUEFUQ0hcIj5QQVRDSDwvb3B0aW9uPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCJERUxFVEVcIj5ERUxFVEU8L29wdGlvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvc2VsZWN0PicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJhcGktZWRpdFwiPmVkaXQ8L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImFwaS1zYXZlXCI+c2F2ZTwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiYXBpLXRlc3RcIj50ZXN0PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFwaS10cmVlLXdyYXBwZXJcIj48ZGl2IGNsYXNzPVwiYXBpLXRyZWVcIj48L2Rpdj48L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFwaS1kYXRhXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwiZGF0YS12aWV3cy1jb250cm9sXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJkYXRhLXJhd1wiPnJhdzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRhdGEtYmVhdXRpZnlcIj5iZWF1dGlmeTwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cImRhdGEtaGlnaGxpZ2h0XCI+c3ludGF4SGlnaGxpZ2h0PC9zcGFuPicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiZGF0YS1wcmV2aWV3XCI+cHJldmlldzwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImRhdGEtdmlldyBqc29uXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8L2Rpdj4nICtcbiAgICAgICAgICAgICAgICAnPC9kaXY+JztcblxudmFyIGxlYWZDb250ZW50VHBsID0gJzxpIGNsYXNzPVwicmVtb3ZlLWNoaWxkXCI+LTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYta2V5XCIgcGxhY2Vob2xkZXI9XCJrZXlcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwiZ2FwLW1hcmtcIj4tLS08L2k+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJsZWFmLXZhbHVlXCIgcGxhY2Vob2xkZXI9XCJ2YWx1ZVwiIC8+JyArXG4gICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJnYXAtbWFya1wiPi0tLTwvaT4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImxlYWYtdmFsdWVcIiBwbGFjZWhvbGRlcj1cInF1YW50aXR5XCIgLz4nICtcbiAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImFkZC1jaGlsZFwiPis8L2k+JztcblxudmFyIGluaXRSZWN0T2JqID0ge1xuICByaWdodDogMCxcbiAgYm90dG9tOiAwLFxuICBsZWZ0OiAwLFxuICB0b3A6IDAsXG4gIHdpZHRoOiAwLFxuICBoZWlnaHQ6IDBcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhcGlEb20oKSB7XG4gIHRoaXMuJGFwaXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGlzJylbMF07XG4gIHZhciBwcmVBcGlzTGVuID0gdGhpcy4kYXBpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwZXItYXBpJykubGVuZ3RoO1xuICB2YXIgbmV3RG9jRnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIHBlckFwaUVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwZXJBcGlFbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwZXItYXBpJyk7XG4gIHBlckFwaUVsZS5pbm5lckhUTUwgPSBwZXJBcGlUcGw7XG5cbiAgbmV3RG9jRnJhZy5hcHBlbmRDaGlsZChwZXJBcGlFbGUpO1xuICB0aGlzLiRhcGlzLmFwcGVuZENoaWxkKG5ld0RvY0ZyYWcpO1xuXG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDQVBJKCk7XG5cbiAgdGhpcy5sZWFmSW5kZXggPSAxO1xuXG4gIHZhciByZWNlbnRBcGkgPSB0aGlzLiRhcGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Blci1hcGknKVtwcmVBcGlzTGVuXTtcbiAgdGhpcy4kYXBpVHJlZSA9IHJlY2VudEFwaS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdHJlZScpWzBdO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYoJ19kYXRhX3Jvb3QnLCAxLCAwLCBpbml0UmVjdE9iaikpO1xuXG4gIHRoaXMuaW5pdEFwaVRyZWUoKTtcblxuICB0aGlzLmNhbGNEaW1lbnNpb25zKCk7XG5cbiAgdGhpcy5pbml0U1ZHKCk7XG5cbiAgdGhpcy5iaW5kRXZlbnRzVG9NUkNFKCk7XG5cbiAgdGhpcy5hcGlSZXR1cm5EYXRhID0gJyc7XG59XG5cbmFwaURvbS5wcm90b3R5cGUuc3RvcmVBcGlSZXR1cm5EYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuICB0aGlzLmFwaVJldHVybkRhdGEgPSBkYXRhO1xuICB0aGlzLiRkYXRhQmVhdXRpZnkuY2xpY2soKTtcbn07XG5hcGlEb20ucHJvdG90eXBlLmpzb25WaWV3ID0gZnVuY3Rpb24oZGF0YSkge1xuICB2YXIgJHByZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpO1xuICAkcHJlLmlubmVySFRNTCA9IGRhdGE7XG4gIHRoaXMuJGRhdGFWaWV3LmlubmVySFRNTCA9ICcnO1xuICB0aGlzLiRkYXRhVmlldy5hcHBlbmRDaGlsZCgkcHJlKTtcblxufTtcbmFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDQVBJID0gZnVuY3Rpb24oKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG5ld2x5Q3JlYXRlZEFwaU5vZGUgPSB0aGlzLiRhcGlzLmxhc3RDaGlsZDtcblxuICB2YXIgJGFwaUVkaXQgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1lZGl0JylbMF07XG4gIHZhciAkYXBpU2F2ZSA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXNhdmUnKVswXTtcbiAgdmFyICRhcGlVcmkgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS11cmknKVswXTtcbiAgdmFyICRhcGlUZXN0ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhcGktdGVzdCcpWzBdO1xuICB2YXIgJGFwaU1ldGhvZCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLW1ldGhvZCcpWzBdO1xuXG4gIHZhciAkZGF0YVJhdyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1yYXcnKVswXTtcbiAgdGhpcy4kZGF0YUJlYXV0aWZ5ID0gbmV3bHlDcmVhdGVkQXBpTm9kZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkYXRhLWJlYXV0aWZ5JylbMF07XG4gIHZhciAkZGF0YUhpZ2hsaWdodCA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1oaWdobGlnaHQnKVswXTtcbiAgdmFyICRkYXRhUHJldmlldyA9IG5ld2x5Q3JlYXRlZEFwaU5vZGUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZGF0YS1wcmV2aWV3JylbMF07XG5cbiAgdGhpcy4kZGF0YVZpZXcgPSBuZXdseUNyZWF0ZWRBcGlOb2RlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2RhdGEtdmlldycpWzBdO1xuXG4gICRhcGlFZGl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkYXBpVXJpLmRpc2FibGVkID0gZmFsc2U7XG4gIH0pO1xuXG4gICRhcGlTYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAkYXBpVXJpLmRpc2FibGVkID0gdHJ1ZTtcbiAgfSk7XG5cbiAgJGFwaVRlc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgIHhocigkYXBpTWV0aG9kLnZhbHVlLCAkYXBpVXJpLnZhbHVlLCB0aGF0LnN0b3JlQXBpUmV0dXJuRGF0YS5iaW5kKHRoYXQpKTtcbiAgfSk7XG5cbiAgJGRhdGFSYXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgIHRoYXQuanNvblZpZXcodGhhdC5hcGlSZXR1cm5EYXRhKTtcbiAgfSk7XG5cbiAgdGhpcy4kZGF0YUJlYXV0aWZ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICB0aGF0Lmpzb25WaWV3KGJlYXV0aWZ5SlNPTihKU09OLnBhcnNlKHRoYXQuYXBpUmV0dXJuRGF0YSkpKTtcbiAgfSk7XG5cbiAgJGRhdGFIaWdobGlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldikge1xuICAgIHRoYXQuanNvblZpZXcoaGlnaHRsaWdodEpTT04oSlNPTi5wYXJzZSh0aGF0LmFwaVJldHVybkRhdGEpKSk7XG4gIH0pO1xuXG4gICRkYXRhUHJldmlldy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgdGhhdC5qc29uVmlldygnVGhpcyBmZWF0dXJlIGhhcyBub3QgYmVlbiBhY2NvbXBsaXNoZWQgeWV0LicpO1xuICB9KTtcblxufTtcblxuYXBpRG9tLnByb3RvdHlwZS5vcGVyYXRlRGF0YVJvb3RDaGlsZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBhZGRNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBhZGRNYXJrLmNsYXNzTmFtZSA9ICdhZGQtZGF0YXJvb3QtY2hpbGQnO1xuICBhZGRNYXJrLnRleHRDb250ZW50ID0gJysnO1xuICBhZGRNYXJrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIHRoYXQubGVhZkluZGV4ICs9IDE7XG4gICAgICB2YXIgcGFyZW50SWR4ID0gJ19kYXRhX3Jvb3QnO1xuICAgICAgdmFyIG5vZGVMZXZlbCA9IDA7XG4gICAgICB0aGF0LmFwaVRyZWUuYWRkKHRoYXQubGVhZkluZGV4LCBwYXJlbnRJZHgsIHRoYXQuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICAgICAgdGhhdC4kYXBpVHJlZS5hcHBlbmRDaGlsZChjcmVhdGVMZWFmKHBhcmVudElkeCwgdGhhdC5sZWFmSW5kZXgsIG5vZGVMZXZlbCwgaW5pdFJlY3RPYmopKTtcbiAgICAgIHZhciBvYmogPSB0aGF0LmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICAgICAgdGhhdC5zdHlsZU5vZGVzKG9iaik7XG4gICAgICB0aGF0LmJpbmRFdmVudHNUb01SQ0UoKTtcbiAgICB9KTtcbiAgdGhpcy4kYXBpVHJlZS5pbnNlcnRCZWZvcmUoYWRkTWFyaywgdGhpcy4kYXBpVHJlZS5maXJzdENoaWxkKTtcblxuICB2YXIgZGVsTWFyayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgZGVsTWFyay5jbGFzc05hbWUgPSAnZGVsLWRhdGFyb290LWNoaWxkJztcbiAgZGVsTWFyay50ZXh0Q29udGVudCA9ICctJztcbiAgZGVsTWFyay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAvKiB0aGlzIEFQSSBpcyBkZWxldGVkLiAqL1xuICAgICAgdGhhdC4kYXBpcy5yZW1vdmVDaGlsZChldi5jdXJyZW50VGFyZ2V0LmNsb3Nlc3QoJy5wZXItYXBpJykpO1xuICAgIH0pO1xuICB0aGlzLiRhcGlUcmVlLmluc2VydEJlZm9yZShkZWxNYXJrLCB0aGlzLiRhcGlUcmVlLmZpcnN0Q2hpbGQpO1xuXG59O1xuXG5hcGlEb20ucHJvdG90eXBlLmluaXRTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnd2lkdGgnLCB0aGlzLmRpbWVuc2lvbkFyclswXSAqIDUyMCArICdweCcpO1xuICBzdmcuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2hlaWdodCcsIHRoaXMuZGltZW5zaW9uQXJyWzFdICogNTIgKyAncHgnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnYXBpLXN2ZycpO1xuICB0aGlzLiRhcGlUcmVlLmluc2VydEJlZm9yZShzdmcsIHRoaXMuJGFwaVRyZWUuZmlyc3RDaGlsZCk7XG59O1xuXG5hcGlEb20ucHJvdG90eXBlLmluaXRBcGlUcmVlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXBpVHJlZSA9IG5ldyBUcmVlKCdfZGF0YV9yb290Jyk7XG4gIHRoaXMuYXBpVHJlZS5hZGQoMSwgJ19kYXRhX3Jvb3QnLCB0aGlzLmFwaVRyZWUudHJhdmVyc2VCRik7XG5cbiAgdGhpcy5vcGVyYXRlRGF0YVJvb3RDaGlsZCgpO1xuXG4gIHJldHVybiB0aGlzLmFwaVRyZWU7XG59O1xuXG5hcGlEb20ucHJvdG90eXBlLmRlbE5vZGUgPSBmdW5jdGlvbihjdHgpIHtcbiAgdmFyIGN1cnJlbnRMZWFmID0gY3R4LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLmxlYWYnKTtcbiAgdmFyIGN1cnJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LmluZGV4O1xuICB2YXIgcGFyZW50SWR4ID0gaXNOYU4oK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQpID8gJ19kYXRhX3Jvb3QnIDogK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5wYXJlbnQ7XG5cbiAgdmFyIG5vZGVzQXJyID0gdGhpcy5hcGlUcmVlLnRyYXZlcnNlRGVzY2VuZGFudHMoY3VycmVudElkeCk7XG4gIHZhciBpZHhBcnIgPSBub2Rlc0FyclRvSWR4QXJyKG5vZGVzQXJyKTtcbiAgdGhpcy5hcGlUcmVlLnJlbW92ZShjdXJyZW50SWR4LCBwYXJlbnRJZHgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcbiAgdGhpcy5yZW1vdmVOb2Rlc0Zyb21Eb20oaWR4QXJyKTtcblxuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZHgpO1xuXG59O1xuYXBpRG9tLnByb3RvdHlwZS5yZW1vdmVOb2Rlc0Zyb21Eb20gPSBmdW5jdGlvbihhcnIpIHtcbiAgdmFyIGFsbExlYXZlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZicpKTtcbiAgdmFyIGFsbExlYXZlc0xlbiA9IGFsbExlYXZlcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTGVhdmVzTGVuOyBpKyspIHtcbiAgICBpZiAoYXJyLmluZGV4T2YoK2FsbExlYXZlc1tpXS5kYXRhc2V0LmluZGV4KSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuJGFwaVRyZWUucmVtb3ZlQ2hpbGQoYWxsTGVhdmVzW2ldKTtcbiAgICB9XG4gIH07XG59O1xuZnVuY3Rpb24gbm9kZXNBcnJUb0lkeEFycihub2Rlc0Fycikge1xuICB2YXIgbm9kZXNBcnJMZW4gPSBub2Rlc0Fyci5sZW5ndGg7XG4gIHZhciBpZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlc0FyckxlbjsgaSsrKSB7XG4gICAgaWR4QXJyLnB1c2gobm9kZXNBcnJbaV0uZGF0YSk7XG4gIH07XG4gIHJldHVybiBpZHhBcnI7XG59XG5cbmFwaURvbS5wcm90b3R5cGUuYmluZEV2ZW50c1RvTVJDRSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciBsZWF2ZXMgPSB0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKTtcbiAgdmFyIGxlYXZlc0xlbiA9IGxlYXZlcy5sZW5ndGg7XG4gIHZhciBuZXdseUNyZWF0ZWRMZWFmID0gbGVhdmVzW2xlYXZlc0xlbiAtIDFdO1xuICB2YXIgJGFkZENoaWxkID0gbmV3bHlDcmVhdGVkTGVhZi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGQtY2hpbGQnKVswXTtcbiAgJGFkZENoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgdGhhdC5hZGRDaGlsZChjdHgpO1xuICB9KTtcblxuICB2YXIgJHJlbW92ZUNoaWxkID0gbmV3bHlDcmVhdGVkTGVhZi5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZW1vdmUtY2hpbGQnKVswXTtcbiAgJHJlbW92ZUNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oY3R4KSB7XG4gICAgdGhhdC5kZWxOb2RlKGN0eCk7XG4gIH0pO1xuXG59O1xuYXBpRG9tLnByb3RvdHlwZS5zZXRQYXJlbnROb2RlVmFsID0gZnVuY3Rpb24oaWR4KSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBxdWV1ZSA9IHRoaXMuYXBpVHJlZS50cmF2ZXJzZURpcmVjdENoaWxkKGlkeCk7XG4gIHZhciBxdWV1ZUxlbiA9IHF1ZXVlLl9uZXdlc3RJbmRleCAtIHF1ZXVlLl9vbGRlc3RJbmRleDtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSBsZWF2ZXMubGVuZ3RoOyBpIDwgeDsgaSsrKSB7XG4gICAgaWYgKCtsZWF2ZXNbaV0uZGF0YXNldC5pbmRleCA9PT0gaWR4KSB7XG4gICAgICBpZiAocXVldWVMZW4gPiAwKSB7XG4gICAgICAgIGxlYXZlc1tpXS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZWFmLXZhbHVlJylbMF0udmFsdWUgPSAnLS0tPic7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZXNbaV0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGVhZi12YWx1ZScpWzBdLnZhbHVlID0gJyc7XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG4gICAgfTtcbiAgfTtcbn07XG5hcGlEb20ucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZGV4ID0gK2N0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZGF0YXNldC5pbmRleDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWwgKyAxO1xuXG4gIC8vIGFwaVRyZWUgb3BlcmF0aW9uXG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkZXgsIHRoaXMuYXBpVHJlZS50cmF2ZXJzZUJGKTtcblxuICB2YXIgY2xvbmVkUmVjdE9iaiA9IGNsb25lUmVjdE9iaih0aGlzLm5vZGVMZWZ0T2Zmc2V0KGN0eC5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUpKTtcbiAgdmFyIGNoaWxkcmVuTm9kZXMgPSB0aGlzLmFwaVRyZWUudHJhdmVyc2VEaXJlY3RDaGlsZChwYXJlbnRJZGV4KTtcblxuICB2YXIgY2hpbGRyZW5JZHhBcnIgPSBbXTtcbiAgZm9yICh2YXIgcGVyTm9kZSBpbiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlKSB7XG4gICAgaWYgKCh0eXBlb2YgcGFyc2VJbnQocGVyTm9kZSkgPT09ICdudW1iZXInKSAmJiBjaGlsZHJlbk5vZGVzLl9zdG9yYWdlW3Blck5vZGVdLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2goY2hpbGRyZW5Ob2Rlcy5fc3RvcmFnZVtwZXJOb2RlXS5kYXRhKTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGNoaWxkcmVuSWR4QXJyTGVuID0gY2hpbGRyZW5JZHhBcnIubGVuZ3RoO1xuXG4gIGNsb25lZFJlY3RPYmoucmlnaHQgLT0gMzA7XG5cbiAgY2xvbmVkUmVjdE9iai5ib3R0b20gPSBjaGlsZHJlbklkeEFyckxlbiA9PT0gMSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9uZWRSZWN0T2JqLmJvdHRvbSArIGNsb25lZFJlY3RPYmouaGVpZ2h0ICogKGNoaWxkcmVuSWR4QXJyTGVuIC0gMikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsb25lZFJlY3RPYmouYm90dG9tICsgY2xvbmVkUmVjdE9iai5oZWlnaHQgKiAoY2hpbGRyZW5JZHhBcnJMZW4gLSAyKSArIChjaGlsZHJlbklkeEFyckxlbiAtIDEpICogMjA7XG4gIHRoaXMuJGFwaVRyZWUuYXBwZW5kQ2hpbGQoY3JlYXRlTGVhZihwYXJlbnRJZGV4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHRoaXMuYmluZEV2ZW50c1RvTVJDRSgpO1xuICB2YXIgb2JqID0gdGhpcy5hcGlUcmVlLmFwcGx5U3R5bGUoKTtcbiAgdGhpcy5zdHlsZU5vZGVzKG9iaik7XG4gIHRoaXMuc2V0UGFyZW50Tm9kZVZhbChwYXJlbnRJZGV4KTtcblxufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZCwgbm9kZUluZGV4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWZTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBuZXdMZWFmU3Bhbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2xlYWYnKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcsIHBhcmVudElkKTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jywgbm9kZUluZGV4KTtcbiAgbmV3TGVhZlNwYW4uc2V0QXR0cmlidXRlKCdkYXRhLWxldmVsJywgbm9kZUxldmVsKTtcbiAgbmV3TGVhZlNwYW4uc3R5bGVbJ3RyYW5zZm9ybSddID0gJ3RyYW5zbGF0ZTNkKCcgKyBNYXRoLnJvdW5kKHJlY3RPYmoucmlnaHQpICsgJ3B4LCAnICsgTWF0aC5yb3VuZChyZWN0T2JqLmJvdHRvbSkgKyAncHgsIDApJztcbiAgbmV3TGVhZlNwYW4uaW5uZXJIVE1MID0gbGVhZkNvbnRlbnRUcGw7XG4gIHJldHVybiBuZXdMZWFmU3Bhbjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUxlYWYocGFyZW50SWR4LCBub2RlSWR4LCBub2RlTGV2ZWwsIHJlY3RPYmopIHtcbiAgdmFyIG5ld0xlYWYgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIG5ld0xlYWYuYXBwZW5kQ2hpbGQoZ2VuZXJhdGVMZWFmU3BhbihwYXJlbnRJZHgsIG5vZGVJZHgsIG5vZGVMZXZlbCwgcmVjdE9iaikpO1xuICByZXR1cm4gbmV3TGVhZjtcbn1cbmFwaURvbS5wcm90b3R5cGUuc3R5bGVOb2RlcyA9IGZ1bmN0aW9uKHN0eWxlT2JqKSB7XG4gIHZhciBsZWF2ZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWYnKSk7XG4gIHZhciBsZWFmSWR4LCBvZmZzZXRZLCBvcmlnaW5hbFg7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZWF2ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBvcmlnaW5hbFggPSBnZXRUcmFuc2xhdGVYKGxlYXZlc1tpXSk7XG4gICAgbGVhZklkeCA9ICsobGVhdmVzW2ldLmRhdGFzZXQuaW5kZXgpO1xuXG4gICAgZm9yICh2YXIgc3R5bGVPYmpJZHggaW4gc3R5bGVPYmopIHtcbiAgICAgIGlmICgrc3R5bGVPYmpJZHggPT09IGxlYWZJZHgpIHtcbiAgICAgICAgb2Zmc2V0WSA9IHN0eWxlT2JqW3N0eWxlT2JqSWR4XSAqIDUyO1xuICAgICAgfTtcbiAgICB9XG4gICAgbGVhdmVzW2ldLnN0eWxlWyd0cmFuc2Zvcm0nXSA9ICd0cmFuc2xhdGUzZCgnICsgb3JpZ2luYWxYICsgJ3B4LCAnICsgb2Zmc2V0WSArICdweCwgMCknO1xuICB9O1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuY2FsY0RpbWVuc2lvbnMoKTtcbiAgdGhpcy5kcmF3U1ZHKCk7XG59O1xuYXBpRG9tLnByb3RvdHlwZS5hZGRTaWJsaW5nID0gZnVuY3Rpb24oY3R4KSB7XG4gIHRoaXMubGVhZkluZGV4ICs9IDE7XG4gIHZhciBwYXJlbnRJZHggPSArY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5kYXRhc2V0LnBhcmVudDtcbiAgdmFyIG5vZGVMZXZlbCA9ICtjdHguY3VycmVudFRhcmdldC5wYXJlbnROb2RlLmRhdGFzZXQubGV2ZWw7XG4gIHBhcmVudElkeCA9IGlzTmFOKHBhcmVudElkeCkgPyAnX2RhdGFfcm9vdCcgOiBwYXJlbnRJZHg7XG4gIHRoaXMuYXBpVHJlZS5hZGQodGhpcy5sZWFmSW5kZXgsIHBhcmVudElkeCwgdGhpcy5hcGlUcmVlLnRyYXZlcnNlQkYpO1xuICB2YXIgcmVjdE9iaiA9IHRoaXMubm9kZUxlZnRPZmZzZXQoY3R4LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZSk7XG4gIHZhciBjbG9uZWRSZWN0T2JqID0gY2xvbmVSZWN0T2JqKHJlY3RPYmopO1xuICBjbG9uZWRSZWN0T2JqLnJpZ2h0ID0gY2xvbmVkUmVjdE9iai5yaWdodCAtIGNsb25lZFJlY3RPYmoud2lkdGg7XG4gIGNsb25lZFJlY3RPYmouYm90dG9tICs9IDMwO1xuICB0aGlzLiRhcGlUcmVlLmFwcGVuZENoaWxkKGNyZWF0ZUxlYWYocGFyZW50SWR4LCB0aGlzLmxlYWZJbmRleCwgbm9kZUxldmVsLCBjbG9uZWRSZWN0T2JqKSk7XG4gIHZhciBvYmogPSB0aGlzLmFwaVRyZWUuYXBwbHlTdHlsZSgpO1xuICB0aGlzLnN0eWxlTm9kZXMob2JqKTtcblxufTtcblxuLyogdXRpbHMgKi9cbmZ1bmN0aW9uIGNsb25lUmVjdE9iaihvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9iai50b3AsXG4gICAgYm90dG9tOiBvYmouYm90dG9tLFxuICAgIGxlZnQ6IG9iai5sZWZ0LFxuICAgIHJpZ2h0OiBvYmoucmlnaHQsXG4gICAgd2lkdGg6IG9iai53aWR0aCxcbiAgICBoZWlnaHQ6IG9iai5oZWlnaHRcbiAgfTtcbn1cblxuLyogbWFuaXB1bGF0ZSBTVkcgKi9cbmFwaURvbS5wcm90b3R5cGUuY2xlYXJTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IHRoaXMuJGFwaVRyZWUuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYXBpLXN2ZycpWzBdO1xuICB3aGlsZSAoc3ZnLmxhc3RDaGlsZCkge1xuICAgIHN2Zy5yZW1vdmVDaGlsZChzdmcubGFzdENoaWxkKTtcbiAgfVxufTtcblxuYXBpRG9tLnByb3RvdHlwZS5kcmF3U1ZHID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2xlYXJTVkcoKTtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XG4gICAgaWYgKG5vZGUucGFyZW50ICE9PSBudWxsKSB7XG4gICAgICB0aGF0LmRyYXdTaW5nbGVTVkcobm9kZS5kYXRhLCBub2RlLmNvbHVtbiwgbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwsIChub2RlLnRvdGFsb2Zmc2V0eWxldmVsIC0gbm9kZS5wYXJlbnQudG90YWxvZmZzZXR5bGV2ZWwpKTtcbiAgICB9O1xuICB9O1xuICB0aGlzLmFwaVRyZWUudHJhdmVyc2VERihjYWxsYmFjayk7XG59O1xuXG5hcGlEb20ucHJvdG90eXBlLmRyYXdTaW5nbGVTVkcgPSBmdW5jdGlvbihpZHgsIGhvcmksIHBhcmVudFZlcnQsIGR2ZXJ0KSB7XG4gIHZhciBzdmcgPSB0aGlzLiRhcGlUcmVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FwaS1zdmcnKVswXTtcbiAgc3ZnLnNldEF0dHJpYnV0ZU5TKG51bGwsICd3aWR0aCcsIHRoaXMuZGltZW5zaW9uQXJyWzBdICogNTIwICsgJ3B4Jyk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaGVpZ2h0JywgdGhpcy5kaW1lbnNpb25BcnJbMV0gKiA1MiArICdweCcpO1xuICB2YXIgc3ZnbnMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuICB2YXIgbmV3UGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhzdmducywgJ3BhdGgnKTtcbiAgdmFyIGNvbnRyb2xSYXRlID0gMC4yO1xuICB2YXIgbXgsIG15LCBxeCwgcXksIHF4eCwgcXl5LCB0eCwgdHk7XG4gIGhvcmkgPSBob3JpIC0gMTtcbiAgZHZlcnQgPSBkdmVydDtcbiAgcGFyZW50VmVydCA9IHBhcmVudFZlcnQ7XG5cbiAgbXggPSBob3JpICogNTAxO1xuICBteSA9IHBhcmVudFZlcnQgKiA1MiArIDg7XG4gIHF4ID0gbXggKyAxMDtcbiAgcXkgPSBteTtcbiAgcXh4ID0gbXggKyAxNTtcbiAgcXl5ID0gKG15ICsgKGR2ZXJ0IC8gMikgKiA1Mik7XG4gIHR4ID0gbXggKyAzMDtcbiAgdHkgPSBteSArIGR2ZXJ0ICogNTI7XG5cbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZCcsICdNICcgKyBteCArICcgJyArIG15ICsgJyBRICcgKyBxeCArICcgJyArIHF5ICsgJywgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxeHggKyAnICcgKyBxeXkgKyAnIFQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggKyAnICcgKyB0eSArICcnKTtcbiAgbmV3UGF0aC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2FwaS1zdmctcGF0aCcpO1xuICBuZXdQYXRoLnNldEF0dHJpYnV0ZSgnZGF0YS1pZHgnLCBpZHgpO1xuICBzdmcuYXBwZW5kQ2hpbGQobmV3UGF0aCk7XG59O1xuXG4vKiBjYWxjdWxhdGUgZGltZW5zaW9ucyAqL1xuYXBpRG9tLnByb3RvdHlwZS5jYWxjRGltZW5zaW9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IHRoaXMuYXBpVHJlZS5tYXhMZXZlbHMoKTtcbiAgdmFyIGhvcmlNYXgsIHZlcnRpY2FsTWF4LCBob3JpQXJyID0gW10sIHZlcnRBcnIgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIHggPSB0aGlzLmRpbWVuc2lvbkFyci5sZW5ndGg7IGkgPCB4OyBpKyspIHtcbiAgICBob3JpQXJyLnB1c2godGhpcy5kaW1lbnNpb25BcnJbaV0ubGVuZ3RoKTtcbiAgICAvLyB2ZXJ0QXJyLnB1c2goTWF0aC5tYXguYXBwbHkobnVsbCwgZGltZW5zaW9uQXJyW2ldKSk7XG4gIH07XG4gIGhvcmlNYXggPSBNYXRoLm1heC5hcHBseShudWxsLCBob3JpQXJyKTtcbiAgLy8gdmVydGljYWxNYXggPSB2ZXJ0QXJyLnJlZHVjZShmdW5jdGlvbihhLCBiKSB7XG4gIC8vICAgcmV0dXJuIGEgKyBiO1xuICAvLyB9KTtcbiAgdmVydGljYWxNYXggPSB0aGlzLmFwaVRyZWUuX3Jvb3QuY2hpbGRyZW5sZXZlbDtcbiAgdGhpcy4kYXBpVHJlZS5zdHlsZS53aWR0aCA9IGhvcmlNYXggKiA1MjAgKyAncHgnO1xuICB0aGlzLiRhcGlUcmVlLnN0eWxlLmhlaWdodCA9IHZlcnRpY2FsTWF4ICogNTIgKyAncHgnO1xuICB0aGlzLmRpbWVuc2lvbkFyciA9IFtob3JpTWF4LCB2ZXJ0aWNhbE1heF07XG4gIHJldHVybiBbaG9yaU1heCwgdmVydGljYWxNYXhdO1xuXG59O1xuXG4vKiBjYWxjdWxhdGUgb2Zmc2V0ICovXG5cbmFwaURvbS5wcm90b3R5cGUubm9kZUxlZnRPZmZzZXQgPSBmdW5jdGlvbihlbCkge1xuICB2YXIgZWxSZWN0T2JqZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIC8vIHZhciBib2R5UmVjdE9iaiA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBib2R5UmVjdE9iaiA9IHRoaXMuJGFwaVRyZWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHZhciBjbG9uZUJvZHlSZWN0T2JqID0gY2xvbmVSZWN0T2JqKGJvZHlSZWN0T2JqKTtcbiAgdmFyIGNsb25lRWxSZWN0T2JqZWN0ID0gY2xvbmVSZWN0T2JqKGVsUmVjdE9iamVjdCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LnRvcCArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmJvdHRvbSArPSBNYXRoLmFicyhjbG9uZUJvZHlSZWN0T2JqLnRvcCk7XG4gIGNsb25lRWxSZWN0T2JqZWN0LmxlZnQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgY2xvbmVFbFJlY3RPYmplY3QucmlnaHQgKz0gTWF0aC5hYnMoY2xvbmVCb2R5UmVjdE9iai5sZWZ0KTtcbiAgcmV0dXJuIGNsb25lRWxSZWN0T2JqZWN0O1xufTtcblxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdHJlZS1kb20uanNcbiAqKi8iLCIvKipcclxuICogW1RyZWUgZGVzY3JpcHRpb25dXHJcbiAqIEBwYXJhbSB7W3R5cGVdfSBkYXRhIFtkZXNjcmlwdGlvbl1cclxuICpcclxuICogX3Jvb3QgcG9pbnRzIHRvIHRoZSByb290IG5vZGUgb2YgYSB0cmVlLlxyXG4gKiB0cmF2ZXJzZURGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggREZTLlxyXG4gKiB0cmF2ZXJzZUJGKGNhbGxiYWNrKSB0cmF2ZXJzZXMgbm9kZXMgb2YgYSB0cmVlIHdpdGggQkZTLlxyXG4gKiBjb250YWlucyhkYXRhLCB0cmF2ZXJzYWwpIHNlYXJjaGVzIGZvciBhIG5vZGUgaW4gYSB0cmVlLlxyXG4gKiBhZGQoZGF0YSwgdG9EYXRhLCB0cmF2ZXJzZSkgYWRkcyBhIG5vZGUgdG8gYSB0cmVlLlxyXG4gKiByZW1vdmUoY2hpbGQsIHBhcmVudCkgcmVtb3ZlcyBhIG5vZGUgaW4gYSB0cmVlLlxyXG4gKlxyXG4gKi9cclxuaW1wb3J0IHtRdWV1ZX0gZnJvbSAnLi9xdWV1ZSc7XHJcbmV4cG9ydCBmdW5jdGlvbiBUcmVlKGRhdGEpIHtcclxuICB2YXIgbm9kZSA9IG5ldyBOb2RlKGRhdGEpO1xyXG4gIHRoaXMuX3Jvb3QgPSBub2RlO1xyXG59XHJcblxyXG5mdW5jdGlvbiBOb2RlKGRhdGEpIHtcclxuICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gIHRoaXMucGFyZW50ID0gbnVsbDtcclxuICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgLy8gYWRkZWQgbGF0ZXJcclxuICB0aGlzLmNoaWxkcmVubGV2ZWwgPSAxO1xyXG4gIHRoaXMuY29sdW1uID0gMDtcclxuICB0aGlzLnRvdGFsb2Zmc2V0eWxldmVsID0gMDtcclxufVxyXG5cclxuVHJlZS5wcm90b3R5cGUudHJhdmVyc2VERiA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcblxyXG4gIC8vIHRoaXMgaXMgYSByZWN1cnNlIGFuZCBpbW1lZGlhdGVseS1pbnZva2luZyBmdW5jdGlvblxyXG4gIChmdW5jdGlvbiByZWN1cnNlKGN1cnJlbnROb2RlKSB7XHJcbiAgICAvLyBzdGVwIDJcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAvLyBzdGVwIDNcclxuICAgICAgcmVjdXJzZShjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3RlcCA0XHJcbiAgICBjYWxsYmFjayhjdXJyZW50Tm9kZSk7XHJcblxyXG4gICAgLy8gc3RlcCAxXHJcbiAgfSkodGhpcy5fcm9vdCk7XHJcblxyXG59O1xyXG5cclxuLy8gZm9yIHRob3NlIG5vZGVzIHdobyBoYXZlIGNoaWxkcmVuXHJcbmZ1bmN0aW9uIGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSB7XHJcbiAgdmFyIHRvdGFsQ2hpbGRyZW5MZXZlbHMgPSAwO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgdG90YWxDaGlsZHJlbkxldmVscyArPSBub2RlLmNoaWxkcmVuW2ldLmNoaWxkcmVubGV2ZWw7XHJcbiAgfTtcclxuICByZXR1cm4gdG90YWxDaGlsZHJlbkxldmVscztcclxufVxyXG5UcmVlLnByb3RvdHlwZS5jYWxjQ2hpbGRyZW5MZXZlbCA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uKG5vZGUpIHtcclxuICAgIG5vZGUuY2hpbGRyZW5sZXZlbCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCA/IGNhbGNDaGlsZHJlbkxldmVscyhub2RlKSA6IDE7XHJcbiAgICBub2RlLmNvbHVtbiA9IG5vZGUucGFyZW50ID8gKG5vZGUucGFyZW50LmNvbHVtbiArIDEpIDogMDtcclxuICB9O1xyXG5cclxuICB0aGlzLnRyYXZlcnNlREYoY2FsbGJhY2spO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gY2FsY09mZlkoYXJyLCBkYXRhKSB7XHJcbiAgdmFyIG5vZGVJZHggPSBmaW5kSW5kZXgoYXJyLCBkYXRhKTtcclxuICB2YXIgdG90YWxZID0gMDtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVJZHg7IGkrKykge1xyXG4gICAgdG90YWxZICs9IGFycltpXS5jaGlsZHJlbmxldmVsO1xyXG4gIH07XHJcbiAgcmV0dXJuIHRvdGFsWTtcclxufVxyXG5cclxuVHJlZS5wcm90b3R5cGUuY2FsY1RvdGFsT2Zmc2V0WUxldmVsID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGxldmVsZ2FwID0gMDtcclxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICBpZiAobm9kZS5wYXJlbnQpIHtcclxuICAgICAgbm9kZS50b3RhbG9mZnNldHlsZXZlbCA9IG5vZGUucGFyZW50LnRvdGFsb2Zmc2V0eWxldmVsICsgY2FsY09mZlkobm9kZS5wYXJlbnQuY2hpbGRyZW4sIG5vZGUuZGF0YSk7XHJcbiAgICB9IGVsc2UgaWYgKG5vZGUucGFyZW50ID09PSBudWxsKSB7XHJcblxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xyXG5cclxufTtcclxuXHJcblRyZWUucHJvdG90eXBlLnRyYXZlcnNlQkYgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpO1xyXG5cclxuICBxdWV1ZS5lbnF1ZXVlKHRoaXMuX3Jvb3QpO1xyXG5cclxuICB2YXIgY3VycmVudFRyZWUgPSBxdWV1ZS5kZXF1ZXVlKCk7XHJcblxyXG4gIHdoaWxlIChjdXJyZW50VHJlZSkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHF1ZXVlLmVucXVldWUoY3VycmVudFRyZWUuY2hpbGRyZW5baV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxiYWNrKGN1cnJlbnRUcmVlKTtcclxuICAgIGN1cnJlbnRUcmVlID0gcXVldWUuZGVxdWV1ZSgpO1xyXG4gIH1cclxufTtcclxuXHJcblRyZWUucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRyYXZlcnNhbCkge1xyXG4gIHRyYXZlcnNhbC5jYWxsKHRoaXMsIGNhbGxiYWNrKTtcclxufTtcclxuXHJcblRyZWUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGRhdGEsIHRvRGF0YSwgdHJhdmVyc2FsKSB7XHJcbiAgdmFyIGNoaWxkID0gbmV3IE5vZGUoZGF0YSksXHJcbiAgICAgIHBhcmVudCA9IG51bGwsXHJcbiAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgICAgICBpZiAobm9kZS5kYXRhID09PSB0b0RhdGEpIHtcclxuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0cmF2ZXJzYWwpO1xyXG5cclxuICBpZiAocGFyZW50KSB7XHJcbiAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICBjaGlsZC5wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGFkZCBub2RlIHRvIGEgbm9uLWV4aXN0ZW50IHBhcmVudC4nKTtcclxuICB9XHJcblxyXG4gIHRoaXMuY2FsY0NoaWxkcmVuTGV2ZWwoKTtcclxuICB0aGlzLmNhbGNUb3RhbE9mZnNldFlMZXZlbCgpO1xyXG59O1xyXG5cclxuVHJlZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZGF0YSwgZnJvbURhdGEsIHRyYXZlcnNhbCkge1xyXG4gIHZhciB0cmVlID0gdGhpcyxcclxuICAgICAgcGFyZW50ID0gbnVsbCxcclxuICAgICAgY2hpbGRUb1JlbW92ZSA9IG51bGwsXHJcbiAgICAgIGluZGV4O1xyXG5cclxuICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICBpZiAobm9kZS5kYXRhID09PSBmcm9tRGF0YSkge1xyXG4gICAgICBwYXJlbnQgPSBub2RlO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRoaXMuY29udGFpbnMoY2FsbGJhY2ssIHRyYXZlcnNhbCk7XHJcblxyXG4gIGlmIChwYXJlbnQpIHtcclxuICAgIGluZGV4ID0gZmluZEluZGV4KHBhcmVudC5jaGlsZHJlbiwgZGF0YSk7XHJcblxyXG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlIHRvIHJlbW92ZSBkb2VzIG5vdCBleGlzdC4nKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNoaWxkVG9SZW1vdmUgPSBwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdQYXJlbnQgZG9lcyBub3QgZXhpc3QuJyk7XHJcbiAgfVxyXG5cclxuICB0aGlzLmNhbGNDaGlsZHJlbkxldmVsKCk7XHJcbiAgdGhpcy5jYWxjVG90YWxPZmZzZXRZTGV2ZWwoKTtcclxuXHJcbiAgcmV0dXJuIGNoaWxkVG9SZW1vdmU7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBkYXRhKSB7XHJcbiAgdmFyIGluZGV4O1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgaWYgKGFycltpXS5kYXRhID09PSBkYXRhKSB7XHJcbiAgICAgIGluZGV4ID0gaTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBpbmRleDtcclxufVxyXG5cclxuLyogdHJlZSBhZGRvbiovXHJcblxyXG5UcmVlLnByb3RvdHlwZS50cmF2ZXJzZURpcmVjdENoaWxkID0gZnVuY3Rpb24obm9kZWRhdGEpIHtcclxuICB2YXIgcXVldWUgPSBuZXcgUXVldWUoKSxcclxuICBwYXJlbnQgPSBudWxsLFxyXG4gICAgY2FsbGJhY2sgPSBmdW5jdGlvbihub2RlKSB7XHJcbiAgICAgIGlmIChub2RlLmRhdGEgPT09IG5vZGVkYXRhKSB7XHJcbiAgICAgICAgcGFyZW50ID0gbm9kZTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgdGhpcy5jb250YWlucyhjYWxsYmFjaywgdGhpcy50cmF2ZXJzZUJGKTtcclxuXHJcbiAgd2hpbGUgKHBhcmVudCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBxdWV1ZS5lbnF1ZXVlKHBhcmVudC5jaGlsZHJlbltpXSk7XHJcbiAgICB9XHJcbiAgICBjYWxsYmFjayhwYXJlbnQpO1xyXG4gICAgcGFyZW50ID0gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHF1ZXVlO1xyXG59O1xyXG5UcmVlLnByb3RvdHlwZS5hcHBseVN0eWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIHN0eWxlT2JqID0ge307XHJcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xyXG4gICAgc3R5bGVPYmpbbm9kZS5kYXRhXSA9IG5vZGUudG90YWxvZmZzZXR5bGV2ZWw7XHJcbiAgfTtcclxuICB0aGlzLnRyYXZlcnNlQkYoY2FsbGJhY2spO1xyXG5cclxuICByZXR1cm4gc3R5bGVPYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogW3RyYXZlcnNlRGVzY2VuZGFudHMgZGVzY3JpcHRpb25dXHJcbiAqIEBwYXJhbSAge1tpbnRlZ2VyXX0gbm9kZURhdGEgW2Rlc2NyaXB0aW9uXVxyXG4gKiBAcmV0dXJuIHtbYXJyYXldfSAgICAgICAgIFtkZXNjcmlwdGlvbl1cclxuICovXHJcblRyZWUucHJvdG90eXBlLnRyYXZlcnNlRGVzY2VuZGFudHMgPSBmdW5jdGlvbihub2RlRGF0YSkge1xyXG4gIHZhciBxdWV1ZSA9IG5ldyBRdWV1ZSgpLFxyXG4gICAgICBwYXJlbnQgPSBudWxsLFxyXG4gICAgICAgIGNhbGxiYWNrID0gZnVuY3Rpb24obm9kZSkge1xyXG4gICAgICAgICAgaWYgKG5vZGUuZGF0YSA9PT0gbm9kZURhdGEpIHtcclxuICAgICAgICAgICAgcGFyZW50ID0gbm9kZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICB0aGlzLmNvbnRhaW5zKGNhbGxiYWNrLCB0aGlzLnRyYXZlcnNlQkYpO1xyXG5cclxuICBxdWV1ZS5lbnF1ZXVlKHBhcmVudCk7XHJcblxyXG4gIHZhciBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcclxuICB2YXIgZGVzY2VuZGFudHNBcnIgPSBbXTtcclxuXHJcbiAgd2hpbGUgKGN1cnJlbnRUcmVlKSB7XHJcbiAgICBkZXNjZW5kYW50c0Fyci5wdXNoKGN1cnJlbnRUcmVlKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICBxdWV1ZS5lbnF1ZXVlKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICBjdXJyZW50VHJlZSA9IHF1ZXVlLmRlcXVldWUoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkZXNjZW5kYW50c0FycjtcclxufTtcclxuXHJcblRyZWUucHJvdG90eXBlLm1heExldmVscyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciB0aGF0ID0gdGhpcztcclxuICB2YXIgZGF0YVJvb3ROb2RlcyA9IHRoaXMudHJhdmVyc2VEaXJlY3RDaGlsZCgnX2RhdGFfcm9vdCcpO1xyXG4gIHZhciByb3dMZXZlbE9iaiA9IHt9O1xyXG4gIHZhciBoZWFkSWR4QXJyID0gW107XHJcbiAgZm9yICh2YXIgZHJuIGluIGRhdGFSb290Tm9kZXMuX3N0b3JhZ2UpIHtcclxuICAgIGlmIChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlLmhhc093blByb3BlcnR5KGRybikpIHtcclxuICAgICAgcm93TGV2ZWxPYmpbZHJuXSA9IHt9O1xyXG4gICAgICByb3dMZXZlbE9ialtkcm5dWydoZWFkLWlkeCddID0gZGF0YVJvb3ROb2Rlcy5fc3RvcmFnZVtkcm5dLmRhdGE7XHJcbiAgICAgIGhlYWRJZHhBcnIucHVzaChkYXRhUm9vdE5vZGVzLl9zdG9yYWdlW2Rybl0uZGF0YSk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZXh0cmFjdElkeEZyb21RdWV1ZShxdWV1ZSkge1xyXG4gICAgdmFyIGNoaWxkcmVuSWR4QXJyID0gW107XHJcbiAgICBmb3IgKHZhciBwZXJOb2RlIGluIHF1ZXVlLl9zdG9yYWdlKSB7XHJcbiAgICAgIGlmICgodHlwZW9mIHBhcnNlSW50KHBlck5vZGUpID09PSAnbnVtYmVyJykgJiYgcXVldWUuX3N0b3JhZ2VbcGVyTm9kZV0uaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkge1xyXG4gICAgICAgIGNoaWxkcmVuSWR4QXJyLnB1c2gocXVldWUuX3N0b3JhZ2VbcGVyTm9kZV0uZGF0YSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRyZW5JZHhBcnI7XHJcbiAgfVxyXG5cclxuICB2YXIgbGV2ZWxOZXh0Q29sQXJyID0gW107XHJcblxyXG4gIGZ1bmN0aW9uIGdldFJvd0xldmVsKGlkeCkge1xyXG4gICAgdmFyIGRpcmVjdENoaWxkcmVuUXVldWUgPSB0aGF0LnRyYXZlcnNlRGlyZWN0Q2hpbGQoaWR4KTtcclxuICAgIHZhciBkaXJlY3RDaGlsZHJlbkFyciA9IGV4dHJhY3RJZHhGcm9tUXVldWUoZGlyZWN0Q2hpbGRyZW5RdWV1ZSk7XHJcbiAgICByZXR1cm4gZGlyZWN0Q2hpbGRyZW5BcnI7XHJcbiAgfVxyXG5cclxuICB2YXIgdWx0aW1hdGVBcnIgPSBbXTtcclxuICB2YXIgcGVySGVhZCA9IFtdO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0TGV2ZWxDaGlsZHJlbihhcnIpIHtcclxuICAgIHZhciBuZXh0TGV2ZWxDaGlsZHJlbkFyciA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIHBlck51bSA9IGdldFJvd0xldmVsKGFycltpXSk7XHJcbiAgICAgIG5leHRMZXZlbENoaWxkcmVuQXJyID0gbmV4dExldmVsQ2hpbGRyZW5BcnIuY29uY2F0KHBlck51bSk7XHJcbiAgICB9O1xyXG4gICAgaWYgKG5leHRMZXZlbENoaWxkcmVuQXJyLmxlbmd0aCkge1xyXG4gICAgICBwZXJIZWFkLnB1c2gobmV4dExldmVsQ2hpbGRyZW5BcnIubGVuZ3RoKTtcclxuICAgICAgbmV4dExldmVsQ2hpbGRyZW4obmV4dExldmVsQ2hpbGRyZW5BcnIpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIChmdW5jdGlvbiByZWN1cnNlKGFycikge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHBlckhlYWQgPSBbXTtcclxuICAgICAgLy8gbGV2ZWwgMVxyXG4gICAgICBsZXZlbE5leHRDb2xBcnIgPSBnZXRSb3dMZXZlbChhcnJbaV0pO1xyXG4gICAgICBwZXJIZWFkLnB1c2goMSk7XHJcbiAgICAgIGlmIChsZXZlbE5leHRDb2xBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgcGVySGVhZC5wdXNoKGxldmVsTmV4dENvbEFyci5sZW5ndGgpO1xyXG4gICAgICAgIG5leHRMZXZlbENoaWxkcmVuKGxldmVsTmV4dENvbEFycik7XHJcbiAgICAgIH07XHJcbiAgICAgIHVsdGltYXRlQXJyLnB1c2gocGVySGVhZCk7XHJcbiAgICB9O1xyXG4gIH0pKGhlYWRJZHhBcnIpO1xyXG5cclxuICByZXR1cm4gdWx0aW1hdGVBcnI7XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9lc2xpbnQtbG9hZGVyIS4vZnJvbnQtZW5kL2phdmFzY3JpcHRzL2FwaS10cmVlL3RyZWUuanNcbiAqKi8iLCIvKipcclxuICogW1F1ZXVlIGRlc2NyaXB0aW9uXVxyXG4gKiBlbnF1ZXVlKGRhdGEpIGFkZHMgZGF0YSB0byBhIHF1ZXVlLlxyXG4gKiBkZXF1ZXVlIHJlbW92ZXMgdGhlIG9sZGVzdCBhZGRlZCBkYXRhIHRvIGEgcXVldWUuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gUXVldWUoKSB7XHJcbiAgdGhpcy5fb2xkZXN0SW5kZXggPSAxO1xyXG4gIHRoaXMuX25ld2VzdEluZGV4ID0gMTtcclxuICB0aGlzLl9zdG9yYWdlID0ge307XHJcbn1cclxuXHJcblF1ZXVlLnByb3RvdHlwZS5zaXplID0gZnVuY3Rpb24oKSB7XHJcbiAgcmV0dXJuIHRoaXMuX25ld2VzdEluZGV4IC0gdGhpcy5fb2xkZXN0SW5kZXg7XHJcbn07XHJcblxyXG5RdWV1ZS5wcm90b3R5cGUuZW5xdWV1ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcclxuICB0aGlzLl9zdG9yYWdlW3RoaXMuX25ld2VzdEluZGV4XSA9IGRhdGE7XHJcbiAgdGhpcy5fbmV3ZXN0SW5kZXgrKztcclxufTtcclxuXHJcblF1ZXVlLnByb3RvdHlwZS5kZXF1ZXVlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIG9sZGVzdEluZGV4ID0gdGhpcy5fb2xkZXN0SW5kZXgsXHJcbiAgICAgIG5ld2VzdEluZGV4ID0gdGhpcy5fbmV3ZXN0SW5kZXgsXHJcbiAgICAgIGRlbGV0ZWREYXRhO1xyXG5cclxuICBpZiAob2xkZXN0SW5kZXggIT09IG5ld2VzdEluZGV4KSB7XHJcbiAgICBkZWxldGVkRGF0YSA9IHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xyXG4gICAgZGVsZXRlIHRoaXMuX3N0b3JhZ2Vbb2xkZXN0SW5kZXhdO1xyXG4gICAgdGhpcy5fb2xkZXN0SW5kZXgrKztcclxuXHJcbiAgICByZXR1cm4gZGVsZXRlZERhdGE7XHJcbiAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL34vZXNsaW50LWxvYWRlciEuL2Zyb250LWVuZC9qYXZhc2NyaXB0cy9hcGktdHJlZS9xdWV1ZS5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBnZXRNYXhPZkFycmF5KG51bUFycmF5KSB7XHJcbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIG51bUFycmF5KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsYXNzKGVsZW0sIGNsYXNzTmFtZSkge1xyXG4gICAgcmV0dXJuIGVsZW0uY2xhc3NOYW1lLnNwbGl0KCcgJykuaW5kZXhPZihjbGFzc05hbWUpID4gLTE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4KCkge1xyXG4gICAgdmFyIHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLCBwcmVmaXggPSBcIlwiO1xyXG4gICAgICAgIHByZWZpeCA9ICh1YS5pbmRleE9mKFwiY2hyb21lXCIpID49IDAgfHwgd2luZG93Lm9wZW5EYXRhYmFzZSkgPyBcIi13ZWJraXQtXCIgOiAodWEuaW5kZXhPZihcImZpcmVmb3hcIikgPj0gMCkgPyBcIi1tb3otXCIgOiB3aW5kb3cub3BlcmEgPyBcIi1vLVwiIDogKGRvY3VtZW50LmFsbCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKSA9PT0gLTEpID8gXCItbXMtXCIgOiBcIlwiO1xyXG4gICAgcmV0dXJuIHByZWZpeDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRyYW5zZm9ybShlbCkge1xyXG4gICAgdmFyIHRyYW5zZm9ybSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKCctd2Via2l0LXRyYW5zZm9ybScpO1xyXG4gICAgdmFyIHJlc3VsdHMgPSB0cmFuc2Zvcm0ubWF0Y2goL21hdHJpeCg/OigzZClcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSksIC17MCwxfVxcZCtcXCl8XFwoLXswLDF9XFxkKyg/OiwgLXswLDF9XFxkKykqKD86LCAoLXswLDF9XFxkKykpKD86LCAoLXswLDF9XFxkKykpXFwpKS8pO1xyXG5cclxuICAgIGlmKCFyZXN1bHRzKSByZXR1cm4gWzAsIDAsIDBdO1xyXG4gICAgaWYocmVzdWx0c1sxXSA9PSAnM2QnKSByZXR1cm4gcmVzdWx0cy5zbGljZSgyLDUpO1xyXG5cclxuICAgIHJlc3VsdHMucHVzaCgwKTtcclxuICAgIHJldHVybiByZXN1bHRzLnNsaWNlKDUsIDgpOyAvLyByZXR1cm5zIHRoZSBbWCxZLFosMV0gdmFsdWVzXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmFuc2xhdGVYKGVsKSB7XHJcbiAgICAvLyBjaHJvbWUgd29uJ3QgdXNlIHByZWZpeFxyXG4gICAgLy8gdmFyIHN0eWxlX2F0dHIgPSBicm93c2VyUHJlZml4KCkgKyAndHJhbnNmb3JtJztcclxuICAgIHZhciBzdHlsZV9hdHRyID0gJ3RyYW5zZm9ybSc7XHJcbiAgICB2YXIgdHJhbnNmb3JtID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVfYXR0cik7XHJcbiAgICB2YXIgcmVzdWx0cyA9IHRyYW5zZm9ybS5tYXRjaCgvbWF0cml4KD86KDNkKVxcKC17MCwxfVxcZCsoPzosIC17MCwxfVxcZCspKig/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSg/OiwgKC17MCwxfVxcZCspKSwgLXswLDF9XFxkK1xcKXxcXCgtezAsMX1cXGQrKD86LCAtezAsMX1cXGQrKSooPzosICgtezAsMX1cXGQrKSkoPzosICgtezAsMX1cXGQrKSlcXCkpLyk7XHJcbiAgICBpZighcmVzdWx0cykgcmV0dXJuIFswLCAwLCAwXTtcclxuICAgIGlmKHJlc3VsdHNbMV0gPT09ICczZCcpIHJldHVybiByZXN1bHRzLnNsaWNlKDIsNSk7XHJcbiAgICByZXN1bHRzLnB1c2goMCk7XHJcbiAgICByZXR1cm4gKyhyZXN1bHRzLnNsaWNlKDUsIDgpWzBdKTsgLy8gcmV0dXJucyB0aGUgW1gsWSxaLDFdIHZhbHVlc1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VHJhbnNsYXRlWShvYmopIHtcclxuICAgIGlmKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgcmV0dXJuO1xyXG4gICAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxyXG4gICAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLnRyYW5zZm9ybSB8fCBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xyXG4gICAgdmFyIG1hdCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKTtcclxuICAgIGlmKG1hdCkgcmV0dXJuIHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzEzXSk7XHJcbiAgICBtYXQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xyXG4gICAgcmV0dXJuIG1hdCA/IHBhcnNlRmxvYXQobWF0WzFdLnNwbGl0KCcsICcpWzVdKSA6IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmosIHByZWZpeCkge1xyXG4gIHZhciBzdHIgPSBbXTtcclxuICBmb3IodmFyIHAgaW4gb2JqKSB7XHJcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHApKSB7XHJcbiAgICAgIHZhciBrID0gcHJlZml4ID8gcHJlZml4ICsgXCJbXCIgKyBwICsgXCJdXCIgOiBwLCB2ID0gb2JqW3BdO1xyXG4gICAgICBzdHIucHVzaCh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiA/XHJcbiAgICAgICAgc2VyaWFsaXplKHYsIGspIDpcclxuICAgICAgICBlbmNvZGVVUklDb21wb25lbnQoaykgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2KSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzdHIuam9pbihcIiZcIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB4aHIobWV0aG9kLCB1cmwsIGNhbGxiYWNrLCBwYXJhbXNPYmogPSB7fSwgaXNBc3luYyA9IHRydWUpIHtcclxuICAgIHZhciB4bWxodHRwO1xyXG5cclxuICAgIHhtbGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4bWxodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh4bWxodHRwLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSApIHtcclxuICAgICAgICAgICBpZih4bWxodHRwLnN0YXR1cyA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICBjYWxsYmFjayh4bWxodHRwLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVsc2UgaWYoeG1saHR0cC5zdGF0dXMgPT0gNDAwKSB7XHJcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSB3YXMgYW4gZXJyb3IgNDAwJyk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc29tZXRoaW5nIGVsc2Ugb3RoZXIgdGhhbiAyMDAgd2FzIHJldHVybmVkJyk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNvbWJVcmwgPSB1cmwgKyBzZXJpYWxpemUocGFyYW1zT2JqKTtcclxuXHJcbiAgICB4bWxodHRwLm9wZW4obWV0aG9kLCBjb21iVXJsLCBpc0FzeW5jKTtcclxuICAgIHhtbGh0dHAuc2VuZChudWxsKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFtzdHJpbmdpZnkgd2l0aCA0IHNwYWNlcyBhdCBlYWNoIGxldmVsXVxyXG4gKiBAcGFyYW0gIHtbb2JqZWN0XX0ganNPYmogW2Rlc2NyaXB0aW9uXVxyXG4gKiBAcmV0dXJuIHtbc3RyaW5nXX0gICAgICAgW2Rlc2NyaXB0aW9uXVxyXG4gKiBKU09OLnN0cmluZ2lmeShqc09iaiwgbnVsbCwgXCJcXHRcIik7IC8vIHN0cmluZ2lmeSB3aXRoIHRhYnMgaW5zZXJ0ZWQgYXQgZWFjaCBsZXZlbFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJlYXV0aWZ5SlNPTihqc09iaikge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzT2JqLCBudWxsLCA0KTsgXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBbaGlnaHRsaWdodEpTT04gd29ya3Mgb24gSlNPTiBvYmplY3QsIG5vdCBzdHJpbmddXHJcbiAqIEBwYXJhbSAge0pTT04gb2JqZWN0fSBqc29uIFtkZXNjcmlwdGlvbl1cclxuICogQHJldHVybiB7c3RyaW5nfSAgICAgIFtkZXNjcmlwdGlvbl1cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWdodGxpZ2h0SlNPTihqc29uKSB7XHJcbiAgICBqc29uID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgdW5kZWZpbmVkLCA0KTtcclxuICAgIGpzb24gPSBqc29uLnJlcGxhY2UoLyYvZywgJyZhbXA7JykucmVwbGFjZSgvPC9nLCAnJmx0OycpLnJlcGxhY2UoLz4vZywgJyZndDsnKTtcclxuICAgIHJldHVybiBqc29uLnJlcGxhY2UoLyhcIihcXFxcdVthLXpBLVowLTldezR9fFxcXFxbXnVdfFteXFxcXFwiXSkqXCIoXFxzKjopP3xcXGIodHJ1ZXxmYWxzZXxudWxsKVxcYnwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPykvZywgZnVuY3Rpb24gKG1hdGNoKSB7XHJcbiAgICAgICAgdmFyIGNscyA9ICdudW1iZXInO1xyXG4gICAgICAgIGlmICgvXlwiLy50ZXN0KG1hdGNoKSkge1xyXG4gICAgICAgICAgICBpZiAoLzokLy50ZXN0KG1hdGNoKSkge1xyXG4gICAgICAgICAgICAgICAgY2xzID0gJ2tleSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbHMgPSAnc3RyaW5nJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoL3RydWV8ZmFsc2UvLnRlc3QobWF0Y2gpKSB7XHJcbiAgICAgICAgICAgIGNscyA9ICdib29sZWFuJztcclxuICAgICAgICB9IGVsc2UgaWYgKC9udWxsLy50ZXN0KG1hdGNoKSkge1xyXG4gICAgICAgICAgICBjbHMgPSAnbnVsbCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAnPHNwYW4gY2xhc3M9XCInICsgY2xzICsgJ1wiPicgKyBtYXRjaCArICc8L3NwYW4+JztcclxuICAgIH0pO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2VzbGludC1sb2FkZXIhLi9mcm9udC1lbmQvamF2YXNjcmlwdHMvYXBpLXRyZWUvdXRpbGl0aWVzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==