import {mergeObj} from '../common/utilities';
export function collectApiData(tree, opEle) {
  console.log(tree);
  let perApiEle = opEle.closest('.per-api');
  let infoEle = perApiEle.getElementsByClassName('api-info')[0];
  // let treeEle = perApiEle.getElementsByClassName('api-tree')[0];
  return mergeObj(collectInfo(infoEle), collectDataFromTree(tree));
}

function collectInfo(infoEle) {
  let infoData = {};
  infoData = {
    'section': infoEle.getElementsByClassName('api-section')[0].value,
    'uri': infoEle.getElementsByClassName('api-uri')[0].value,
    'method': infoEle.getElementsByClassName('api-method')[0].value,
    'description': infoEle.getElementsByClassName('api-description')[0].value
  };

  return infoData;
}

function collectTree(treeEle) {
	let leaves = [].slice.call(treeEle.getElementsByClassName('leaf')); 
  let treeDataArr = [];
  let treeDataObj = {};
  let leafData;
  for (let i = 0, leavesLen = leaves.length; i < leavesLen; i++) {
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
  let tree = apiTree;
  let nodesArr = [];
  let treeDataObj = {};
  let dimensionsArr = [];
  let callback = function(node) {
    if (node === null) return;
    let nodeData = {};
    nodeData.nodeId = node.nodeId;
    nodeData.column = node.column;
    nodeData.parentId = node.parent === null ? null : node.parent.nodeId;
    nodeData.childrenlevel = node.childrenlevel;
    nodeData.totaloffsetylevel =  node.totaloffsetylevel;
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

