'use strict';
import {Tree} from './tree';
import {popup} from '../common/popup';
import {getTranslateX, xhr, beautifyJSON, hightlightJSON} from './utilities';

function perApiTpl(data, isNewApi = false) {
  let tpl =
      `<div class="api-info">
          <label class="api-label">API:</label>
          <input class="api-uri" placeholder="" value="" /> 
          <label class="api-label">method:</label>
          <select class="api-method">
              <option value="GET" selected>GET</option>
              <option value="POST">POST</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
          </select>
          <label>section</label>
          <input class="api-section" />
          <span class="api-save" data-method="${patchOrPost(isNewApi)}" data-action="/apis${saveOrCreate(data, isNewApi)}" >${isNewApi ? 'create' : 'save'}</span>
          <span class="api-test">test</span>
      </div>
      <div class="api-tree-wrapper"><div class="api-tree-frame"><svg class="api-svg" width="100%" height="100%"></svg></div><div class="api-tree"></div></div>
      <div class="api-data">
          <div class="data-views-control">
              <span class="data-raw">raw</span>
              <span class="data-beautify">beautify</span>
              <span class="data-highlight">syntaxHighlight</span>
              <span class="data-preview">preview</span>
          </div>
          <div class="data-view json">
          </div>
      </div>`;
  return tpl;
}

var leafContentTpl = '<i class="remove-child">-</i>' +
                     '<input type="text" class="leaf-key" placeholder="key" />' +
                     '<i class="gap-mark">---</i>' +
                     '<input type="text" class="leaf-value" placeholder="value" />' +
                     '<i class="gap-mark">---</i>' +
                     '<input type="text" class="leaf-value" placeholder="quantity" />' +
                     '<i class="add-child">+</i>';

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
  return isNewApi ? '' : `/${data.id}`;
}
function createPerApi(data, isNewApi) {
  var perApiEle = document.createElement('div');
  perApiEle.setAttribute('class', 'per-api');
  perApiEle.dataset.id = isNewApi ? '' : data.id;
  perApiEle.innerHTML = perApiTpl(data, isNewApi);
  perApiEle.getElementsByClassName('api-uri')[0].value = isNewApi ? '' : data.uri;
  return perApiEle;
}

export function ApiDom(data, containerNode, isNewApi) {
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

ApiDom.prototype.storeApiReturnData = function(data) {
  this.apiReturnData = data;
  this.$dataBeautify.click();
};
ApiDom.prototype.jsonView = function(data) {
  var $pre = document.createElement('pre');
  $pre.innerHTML = data;
  this.$dataView.innerHTML = '';
  this.$dataView.appendChild($pre);

};
ApiDom.prototype.bindEventsToMRCAPI = function() {
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

  $apiSave.addEventListener('click', function(ev) {
  });

  $apiTest.addEventListener('click', ev => {
    xhr($apiMethod.value, $apiUri.value, this.storeApiReturnData.bind(that));
  });

  $dataRaw.addEventListener('click', ev => {
    this.jsonView(this.apiReturnData);
  });

  this.$dataBeautify.addEventListener('click', ev => {
    this.jsonView(beautifyJSON(JSON.parse(this.apiReturnData)));
  });

  $dataHighlight.addEventListener('click', ev => {
    this.jsonView(hightlightJSON(JSON.parse(this.apiReturnData)));
  });

  $dataPreview.addEventListener('click', ev => {
    this.jsonView('This feature has not been accomplished yet.');
  });

};

ApiDom.prototype.operateDataRootChild = function() {
  var that = this;
  var addMark = document.createElement('span');
  addMark.className = 'add-dataroot-child';
  addMark.textContent = '+';
  addMark.addEventListener('click', function(ev) {
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
  delMark.addEventListener('click', function(ev) {
      /* this API is deleted. */

      // that.apiContainer.removeChild(ev.currentTarget.closest('.per-api'));
    });
  this.$apiTree.insertBefore(delMark, this.$apiTree.firstChild);

};

ApiDom.prototype.initApiTree = function() {
  this.apiTree = new Tree('_data_root');
  this.apiTree.add(1, '_data_root', this.apiTree.traverseBF);

  this.operateDataRootChild();

  return this.apiTree;
};

ApiDom.prototype.delNode = function(ctx) {
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
ApiDom.prototype.removeNodesFromDom = function(arr) {
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

ApiDom.prototype.bindEventsToMRCE = function() {
  var leaves = this.$apiTree.getElementsByClassName('leaf');
  var leavesLen = leaves.length;
  var newlyCreatedLeaf = leaves[leavesLen - 1];
  var $addChild = newlyCreatedLeaf.getElementsByClassName('add-child')[0];
  $addChild.addEventListener('click', ctx => {
    this.addChild(ctx);
  });

  var $removeChild = newlyCreatedLeaf.getElementsByClassName('remove-child')[0];
  $removeChild.addEventListener('click', ctx => {
    this.delNode(ctx);
  });

};
ApiDom.prototype.setParentNodeVal = function(idx) {
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
ApiDom.prototype.addChild = function(ctx) {
  this.leafIndex += 1;
  var parentIdex = +ctx.currentTarget.parentNode.dataset.index;
  var nodeLevel = +ctx.currentTarget.parentNode.dataset.level + 1;

  // apiTree operation
  this.apiTree.add(this.leafIndex, parentIdex, this.apiTree.traverseBF);

  var clonedRectObj = cloneRectObj(this.nodeLeftOffset(ctx.currentTarget.parentNode));
  var childrenNodes = this.apiTree.traverseDirectChild(parentIdex);

  var childrenIdxArr = [];
  for (var perNode in childrenNodes._storage) {
    if ((typeof parseInt(perNode) === 'number') && childrenNodes._storage[perNode].hasOwnProperty('data')) {
      childrenIdxArr.push(childrenNodes._storage[perNode].data);
    };
  }

  var childrenIdxArrLen = childrenIdxArr.length;

  clonedRectObj.right -= 30;

  clonedRectObj.bottom = childrenIdxArrLen === 1 ?
                           clonedRectObj.bottom + clonedRectObj.height * (childrenIdxArrLen - 2) :
                         clonedRectObj.bottom + clonedRectObj.height * (childrenIdxArrLen - 2) + (childrenIdxArrLen - 1) * 20;
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
ApiDom.prototype.styleNodes = function(styleObj) {
  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
  var leafIdx, offsetY, originalX = '';

  var stylesArr = [], xValue, yValue;

  for (var i = 0; i < leaves.length; i++) {
    originalX = getTranslateX(leaves[i]);
    leafIdx = +(leaves[i].dataset.index);

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
ApiDom.prototype.addSibling = function(ctx) {
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
ApiDom.prototype.clearSVG = function() {
  var svg = this.$apiTreeFrame.getElementsByClassName('api-svg')[0];
  while (svg.lastChild) {
    svg.removeChild(svg.lastChild);
  }
};
/**
 * [drawSVG description]
 * @return {[type]} [description]
 */
ApiDom.prototype.drawSVG = function() {
  this.clearSVG();
  var that = this;
  var svgPartials = [];
  var callback = function(node) {
    if (node.parent !== null) {
      svgPartials.push(that.createSingleSVG(node.data, node.column, node.parent.totaloffsetylevel, (node.totaloffsetylevel - node.parent.totaloffsetylevel)));
    };
  };
  this.apiTree.traverseDF(callback);

  var docFrag = document.createDocumentFragment();
  for (var i = 0; i < svgPartials.length; i++) {
    docFrag.appendChild(svgPartials[i]);
  }
  this.$apiTreeFrame.getElementsByClassName('api-svg')[0].appendChild(docFrag);

};

ApiDom.prototype.createSingleSVG = function(idx, hori, parentVert, dvert) {

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
  qyy = (my + (dvert / 2) * 52);
  tx = mx + 30;
  ty = my + dvert * 52;

  newPath.setAttributeNS(null, 'd', 'M ' + mx + ' ' + my + ' Q ' + qx + ' ' + qy + ', ' +
                                    qxx + ' ' + qyy + ' T ' +
                                     tx + ' ' + ty + '');
  newPath.setAttribute('class', 'api-svg-path');
  newPath.setAttribute('data-idx', idx);

  return newPath;
};

/* calculate dimensions */
ApiDom.prototype.calcDimensions = function() {
  this.dimensionArr = this.apiTree.maxLevels();
  var horiMax, verticalMax, horiArr = [], vertArr = [];
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

ApiDom.prototype.nodeLeftOffset = function(el) {
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

