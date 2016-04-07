/**
 * width of single svg path: 30px
 */
'use strict';
import {Tree} from './tree';
import {$http} from '../common/ajax';
import {popup} from '../common/popup';
import {rootAPI} from '../global/constant';
import {parseAndFlash} from '../common/flash';
import {collectApiData} from './treeDataCollect';
import {getTranslateX, xhr, beautifyJSON, hightlightJSON} from './utilities';
import {jsonToTree} from './jsonTreeConverter';
import {twoWayDataBinding} from '../common/twoWayDataBinding';
import {callbacks} from '../common/callbacks';

function perApiTpl(data, isNewApi = false) {
  let tpl =
      `<div class="api-info">
          <label class="api-label">API:</label>
          <input class="api-uri" placeholder="" value="" model="uri" /> 
          <label class="api-label">method:</label>
          <select class="api-method" model="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PATCH">PATCH</option>
              <option value="DELETE">DELETE</option>
          </select>
          <label>section:</label>
          <input class="api-section" type="text" model="section" />
          <label for="">description:</label>
          <input class="api-description" type="text" model="description" />
          <span class="api-save" data-method="${patchOrPost(isNewApi)}" data-action="/apis${saveOrCreate(data, isNewApi)}" >${isNewApi ? 'create' : 'save'}</span>
          <span class="api-test">test</span>
      </div>
      <div class="api-tree-wrapper">
        <div class="api-tree-frame">
          <svg class="api-svg" width="100%" height="100%"></svg>
        </div>
        <div class="api-tree"></div>
      </div>
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

function leafTpl() {
  let leafContentTpl = `
    <i class="remove-child">-</i>
    <input type="text" class="leaf-key" placeholder="key" model="dataType" />
    <i class="gap-mark">---</i>
    <input type="text" class="leaf-value" placeholder="value" model="dataValue" />
    <i class="gap-mark">---</i>
    <input type="text" class="leaf-quantity" placeholder="quantity" model="dataQuantity" />
    <i class="add-child">+</i>
  `;
  return leafContentTpl;
}

/* default getBoundingRectObj */
let initRectObj = {
  right: 0,
  bottom: 0,
  left: 0,
  top: 0,
  width: 0,
  height: 0
};

let leafDataPlaceHolder = {
  dataType: '',
  dataValue: '',
  dataQuantity: ''
};

/*
single leaf width: 460px;
 */
const perLeafWidth = 460;
const perLeafHeight = 22;
const leavesVerticalGap = 30;
const perSVGPathWidth = 30;
var rootNodeWidth = perSVGPathWidth + 14;
var callback = {
  patchSuccess: function(data) {
    parseAndFlash(data);
  },
  postSuccess: function(data) {
    parseAndFlash(data);
  },
  deleteSuccess: function(data) {
    function destoryApiLi() {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
    }
    parseAndFlash(data, destoryApiLi.bind(this));
  },
  success: function(data) {
    console.log(data);
  },
  error: function(data) {
    parseAndFlash(data);
  }
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

export function ApiDom(data, containerNode, isNewApi = false) {
  this.apiContainer = containerNode;
  let perApiEle = createPerApi(data, isNewApi);
  this.apiContainer.appendChild(perApiEle);

  let apiBindData = twoWayDataBinding(data, this.apiContainer);
  
  data = apiBindData;

  this.apiEle = this.apiContainer.getElementsByClassName('per-api')[0];

  this.bindEventsToMRCAPI();

  this.leafIndex = 1;

  this.$apiTree = this.apiEle.getElementsByClassName('api-tree')[0];
  this.$apiTreeFrame = this.apiEle.getElementsByClassName('api-tree-frame')[0];
  if (isNewApi) {
    this.initApiTree();
    this.calcDimensions();
  } else {
    this.renderExistTree(data);
  }

  this.apiReturnData = '';

  this.apiEle.addEventListener('click', bindEvent.bind(this));
}

ApiDom.prototype.renderExistTree = function(data) {
  let docFrag = document.createDocumentFragment();

  let perTWDBArr = [];
  if (data.nodes && data.nodes.length) {
    let nodesArr = data.nodes;
    let nodeData = {};
    let leaf;
    let leafData = {};
    let perTWDB;
    for (var i = 0, len = nodesArr.length; i < len; i++) {
      leaf = undefined;
      leaf = generateLeaf(data.nodes[i]);
      if (data.nodes[i].data === undefined || data.nodes[i].data === "") {
        data.nodes[i].data = leafDataPlaceHolder;
      };
      if (data.nodes[i].parentId === null || data.nodes[i].parentId === 'null') leaf.classList.add('root-leaf');

      perTWDB = twoWayDataBinding(data.nodes[i].data, leaf);
      data.nodes[i].data = perTWDB;
      perTWDBArr.push(perTWDB);
      docFrag.appendChild(leaf);
    }
    this.leafIndex += (len - 2);
  }
  this.apiTree = jsonToTree(data.nodes);
  this.$apiTree.appendChild(docFrag);
  this.calcDimensions();
  this.drawSVG();
};


function generateLeaf(nodeData) {
  var newLeafSpan = document.createElement('span');
  newLeafSpan.setAttribute('class', 'leaf');
  newLeafSpan.dataset.parentId = nodeData.parentId;
  newLeafSpan.dataset.nodeId = nodeData.nodeId;
  newLeafSpan.innerHTML = leafTpl();
  newLeafSpan.style['transform'] = 'translate3d(' +
                                    Math.round((perLeafWidth + perSVGPathWidth) * (nodeData.column - 1)) + 'px, ' +
                                    Math.round(nodeData.totaloffsetylevel * (perLeafHeight + leavesVerticalGap)) + 'px, 0)';
  return newLeafSpan;
}

function bindEvent(ev) {
  let _this = this;
  if (ev.target.classList.contains('api-save')) {
    let params = collectApiData(this.apiTree, this.$apiTree);
    if (ev.target.dataset.method.toUpperCase() === 'PATCH') {
      $http(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)
      .patch(params, 'api')
      .then(callback.patchSuccess)
      .catch(callback.error);
    } else if (ev.target.dataset.method.toUpperCase() === 'POST') {
      $http(rootAPI)
      .post(params, 'api')
      .then(callback.postSuccess)
      .catch(callback.error);
    }
    return null;
  };

  if (ev.target.classList.contains('add-child')) {
    _this.addChild(ev);
    return null;
  };

  if (ev.target.classList.contains('remove-child')) {
    if (ev.target.parentElement.classList.contains('root-leaf')) {
      popup(ev, {}, deleteApi.bind(_this, ev));
    } else {
      _this.delNode(ev);
    }
    return null;
  };
}

function deleteApi(ev) {
  if (!ev.target.closest('.per-api').dataset.id) {
    ev.target.closest('.api-ul').removeChild(ev.target.closest('.api-li'));
    return null;
  };

  let params = {};
  $http(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)
  .delete(params)
  .then(callbacks.deleteSuccess.bind(ev))
  .catch(callbacks.error);
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

ApiDom.prototype.initApiTree = function() {
  let initData = {
    nodeId: 0,
    data: leafDataPlaceHolder
  };
  let firstChildData = {
    nodeId: 1,
    data: leafDataPlaceHolder
  };
  this.apiTree = new Tree(initData);
  this.apiTree.add(firstChildData, 0, this.apiTree.traverseBF);

  let treeDocFrag = document.createDocumentFragment();

  let callback = function(node) {
    let leafEle;
    let leafBindData;
    node.parentId = node.parent ? node.parent.nodeId : null;
    leafEle = generateLeaf(node);
    leafBindData = twoWayDataBinding(leafDataPlaceHolder, leafEle);
    node.data = leafBindData;
    if (node.parentId === null || node.parentId === 'null') leafEle.classList.add('root-leaf');
    treeDocFrag.appendChild(leafEle);
  };

  this.apiTree.traverseBF(callback);
  this.$apiTree.appendChild(treeDocFrag);

  return this.apiTree;
};

ApiDom.prototype.delNode = function(ctx) {
  var currentLeaf = ctx.target.closest('.leaf');
  var currentIdx = +ctx.target.parentNode.dataset.nodeId;
  var parentIdx = (+ctx.target.parentNode.dataset.parentId === 0) ? 0 : +ctx.target.parentNode.dataset.parentId;

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

ApiDom.prototype.setParentNodeVal = function(idx) {
  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));
  var queue = this.apiTree.traverseDirectChild(idx);
  var queueLen = queue._newestIndex - queue._oldestIndex;
  for (var i = 0, x = leaves.length; i < x; i++) {
    if (+leaves[i].dataset.nodeId === idx) {
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
  this.leafIndex = this.apiTree.maxId() + 1;
  var parentIdex = +ctx.target.parentNode.dataset.nodeId;

  // apiTree operation


  let leafChild = createLeaf(parentIdex, this.leafIndex);
  let childModel = twoWayDataBinding(leafDataPlaceHolder, leafChild);
  let leafData = {
    nodeId: this.leafIndex,
    data: childModel
  };
  this.apiTree.add(leafData, parentIdex, this.apiTree.traverseBF);
  this.$apiTree.appendChild(leafChild);
  var obj = this.apiTree.applyStyle();
  this.styleNodes(obj);
  this.setParentNodeVal(parentIdex);

};

function generateLeafSpan(parentId, nodeIndex) {
  var newLeafSpan = document.createElement('span');
  newLeafSpan.setAttribute('class', 'leaf');
  newLeafSpan.dataset.parentId = parentId;
  newLeafSpan.dataset.nodeId = nodeIndex;
  newLeafSpan.innerHTML = leafTpl();
  return newLeafSpan;
}
function createLeaf(parentIdx, nodeIdx) {
  var newLeaf = document.createDocumentFragment();
  newLeaf.appendChild(generateLeafSpan(parentIdx, nodeIdx));
  return newLeaf;
}
ApiDom.prototype.styleNodes = function() {
  var leaves = Array.prototype.slice.call(this.$apiTree.getElementsByClassName('leaf'));

  let leavesHash = {};
  for (let i = 0, leavesLen = leaves.length; i < leavesLen; i++) {
    leavesHash[leaves[i].dataset.nodeId] = leaves[i];
  }
  var callback = function(node) {
    if (node.nodeId <= 0) return;
    leavesHash[node.nodeId].style['transform'] = 'translate3d(' +
                                      Math.round((perLeafWidth + perSVGPathWidth) * (node.column - 1)) + 'px, ' +
                                      Math.round(node.totaloffsetylevel * (perLeafHeight + leavesVerticalGap)) + 'px, 0)';
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
      svgPartials.push(that.createSingleSVG(node.nodeId, node.column, node.parent.totaloffsetylevel, (node.totaloffsetylevel - node.parent.totaloffsetylevel)));
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

  mx = hori * 490; /* single leaf width plus single svg path width */
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
  var horiMax, verticalMax, horiArr = [], vertArr = [];

  horiArr = this.apiTree.depth();
  horiMax = Math.max.apply(null, horiArr);
  verticalMax = this.apiTree._root.childrenlevel;
  this.$apiTreeFrame.style.width = horiMax * 520 + 'px';
  this.$apiTreeFrame.style.height = verticalMax * 52 + 'px';
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

