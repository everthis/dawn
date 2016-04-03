import {Tree} from './tree';
export function jsonToTree(nodesArr) {
  let hashTable = {};
  let tree;
  for (let i = 0, nodesLen = nodesArr.length; i < nodesLen; i++) {
    hashTable[nodesArr[i]['parentId']] ? hashTable[nodesArr[i]['parentId']].push(nodesArr[i]) : hashTable[nodesArr[i]['parentId']] = [nodesArr[i]];
  }
  // node 的子节点的ID总是大于node的ID
  let modKeysArr = removeEleFromArr(Object.keys(hashTable), 'null').map(Number).sort(sortNumber);
  let rootNodeData = hashTable['null'][0];
  tree = new Tree(rootNodeData);

  for (let j = 0, keysLen = modKeysArr.length; j < keysLen; j++) {
    if (hashTable.hasOwnProperty(modKeysArr[j])) {
      for (let k = 0, keyArrLen = hashTable[modKeysArr[j]].length; k < keyArrLen; k++) {
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
function sortNumber(a,b) {
    return a - b;
}
