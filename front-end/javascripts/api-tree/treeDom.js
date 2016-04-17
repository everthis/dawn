/**
 * width of single svg path: 30px
 */
'use strict';
import {Tree} from './tree';
import {$http} from '../common/ajax';
import {popup} from '../common/popup';
import {rootAPI} from '../global/constant';
import {flash, parseAndFlash} from '../common/flash';
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
          <span class="api-respond-preview-btn">preview</span>
      </div>
      <div class="api-tree-wrapper">
        <div class="api-tree-frame">
          <svg class="api-svg" width="100%" height="100%"></svg>
        </div>
        <div class="api-tree"></div>
      </div>
      <div class="api-respond-preview">
          <div class="preview-control-wrapper">
            <div class="preview-control">
                <span class="per-preview-type preview-raw">raw</span>
                <span class="per-preview-type preview-beautify">beautify</span>
                <span class="per-preview-type preview-highlight">syntaxHighlight</span>
            </div>
          </div>
          <div class="data-view json">
          </div>
      </div>`;
  return tpl;
}

function leafTpl() {
  let leafContentTpl = `
    <i class="remove-child">-</i>
    <input type="text" class="leaf-key" placeholder="key" model="dataName" />
    <i class="gap-mark">---</i>
    <input type="text" class="leaf-value" placeholder="value" model="dataValue" />
    <select class="leaf-value-type" model="dataType">
        <option value="String">String</option>
        <option value="Number">Number</option>
        <option value="Boolean">Boolean</option>
        <option value="Array">Array</option>
        <option value="Hash">Hash</option>
        <option value="Regex">Regex(string)</option>
        <option value="Fixed">Fixed(string)</option>
        <option value="Null">Null</option>
    </select>
    <i class="gap-mark">---</i>
    <i class="add-child">+</i>
    <input type="text" class="leaf-quantity" placeholder="quantity" model="dataQuantity" />
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
  dataName: '',
  dataType: 'String',
  dataValue: '',
  dataQuantity: '1'
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
    this.apiRawData = data;
    this.apiDataObj = JSON.parse(data).data;
    parseAndFlash(data);
    console.log(this);
  },
  postSuccess: function(data) {
    this.apiRawData = data;
    this.apiDataObj = JSON.parse(data).data;
    parseAndFlash(data);
    console.log(this);
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
    console.log(data);
    parseAndFlash(data);
  },
  apiRespondSuccess: function(data) {
    let jsonObj = JSON.parse(data);
    this.previewData = data;
    this.previewDataObj = jsonObj;
    switchPreview(this.previewDataObj, hightlightJSON, this.eventContext, 'highlight');
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
  this.apiDataObj = data;
  this.apiContainer = containerNode;
  let perApiEle = createPerApi(data, isNewApi);
  this.apiContainer.appendChild(perApiEle);

  let apiBindData = twoWayDataBinding(data, this.apiContainer);
  data = apiBindData;

  this.apiEle = this.apiContainer.getElementsByClassName('per-api')[0];

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
  /* _$this is ApiDom, while this is its wrapper(object). */
  let _this = this;
  let evTargetClassList = ev.target.classList;
  let eventContext = {_ev: ev, domContainer: ev.target.closest('.api-li')};
  this.eventContext = eventContext;
  if (evTargetClassList.contains('api-save')) {
    let params = collectApiData(_this.apiTree, _this.$apiTree);
    if (this.apiDataObj.id) {
      $http(rootAPI + '/' + this.apiDataObj.id)
      .patch(params, 'api')
      .then(callback.patchSuccess.bind(this))
      .catch(callback.error);
    } else if (!this.apiDataObj.id) {
      $http(rootAPI)
      .post(params, 'api')
      .then(callback.postSuccess.bind(this))
      .catch(callback.error);
    }
    return null;
  };

  if (evTargetClassList.contains('add-child')) {
    _this.addChild(ev);
    return null;
  };

  if (evTargetClassList.contains('remove-child')) {
    if (ev.target.parentElement.classList.contains('root-leaf')) {
      popup(ev, {}, deleteApi.bind(_this, ev));
    } else {
      _this.delNode(ev);
    }
    return null;
  };

  if (evTargetClassList.contains('api-respond-preview-btn')) {
    if (!this.apiDataObj.id) {
      flash({error: 'Save first.'});
      return null;
    };
    let params = {uri: this.apiDataObj.uri};
    let context = {};
    $http(window.location.origin + '/apirespond')
    .get(params)
    .then(callback.apiRespondSuccess.bind(this))
    .catch(callback.error);
    return null;
  };

  if (evTargetClassList.contains('preview-raw')) {
    return switchPreview(this.previewDataObj, JSON.stringify, this.eventContext, 'raw');
  };

  if (evTargetClassList.contains('preview-beautify')) {
    return switchPreview(this.previewDataObj, beautifyJSON, this.eventContext, 'beautify');
  };

  if (evTargetClassList.contains('preview-highlight')) {
    return switchPreview(this.previewDataObj, hightlightJSON, this.eventContext, 'highlight');
  };

}

function switchPreview(dataObj, fn, previewContext, previewType) {
  let previewStr = fn.call(null, dataObj);
  jsonView.call(previewContext.domContainer, previewStr);
  switchPreviewStatus(previewContext, previewType);
  return null;
}

function switchPreviewStatus(previewContext, applyType) {
  let previewTypes = ['raw', 'beautify', 'highlight'];
  let apiRespondPreviewEle = previewContext.domContainer.getElementsByClassName('api-respond-preview')[0];
  let apiRespondPreviewEleClassArr = apiRespondPreviewEle.className.trim().split(' ');
  apiRespondPreviewEleClassArr.forEach(function(element, index, array) {
    let idx = previewTypes.indexOf(element);
    if (idx > -1) {
      array.splice(array.indexOf(element), 1);
    }
  });
  let previewTypeElesArr = [].slice.call(previewContext.domContainer.getElementsByClassName('per-preview-type'));
  previewTypeElesArr.forEach(function(element, index) {
    element.classList.remove('active');
  });
  previewContext.domContainer.getElementsByClassName('preview-' + applyType)[0].classList.add('active');
  apiRespondPreviewEle.className = apiRespondPreviewEleClassArr.join(' ');
  apiRespondPreviewEle.classList.add(applyType);
}

function apiSave() {

}
function addLeafChild() {

}
function removeLeafChild() {

}
function apiTest() {

}
function jsonView(data) {
  var $pre = document.createElement('pre');
  $pre.innerHTML = data;
  let $dataViewEle = this.getElementsByClassName('data-view')[0];
  $dataViewEle.innerHTML = '';
  $dataViewEle.appendChild($pre);
}

function deleteApi(ev) {
  if (!this.apiDataObj.id) {
    ev.target.closest('.api-ul').removeChild(ev.target.closest('.api-li'));
    return null;
  };

  let params = {};
  $http(rootAPI + '/' + this.apiDataObj.id)
  .delete(params)
  .then(callbacks.deleteSuccess.bind(ev))
  .catch(callbacks.error);
}

ApiDom.prototype.storeApiReturnData = function(data) {
  this.apiReturnData = data;
  this.$dataBeautify.click();
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
  this.$apiTreeFrame.style.height = verticalMax * 52 - (verticalMax > 1 ? 30 : 0) + 'px';
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

