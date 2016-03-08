import {mergeObj} from '../common/utilities';
export function collectApiData(opEle) {
  let perApiEle = opEle.closest('.per-api');
  let infoEle = perApiEle.getElementsByClassName('api-info')[0];
  let treeEle = perApiEle.getElementsByClassName('api-tree')[0];
  return mergeObj(collectInfo(infoEle), collectTree(treeEle));
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
