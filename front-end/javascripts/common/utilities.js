export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}
/* consider Object.assign(target, ...sources) */
export function mergeObj(obj1 = {}, obj2) {
  let newObj = JSON.parse(JSON.stringify(obj1));
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      newObj[key] = obj2[key];
    }
  }
  return newObj;
}
export function addPrefixToObj(obj, prefix) {
  if (!prefix) return obj;
  let newObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj['' + prefix + '[' + key + ']'] = obj[key];
    }
  }
  return newObj;
}
export function wrapObj(obj, wrapper) {
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

export function strToDom(str) {
  let tmpEle = document.createElement('div');
  tmpEle.innerHTML = str;
  let returnDom = tmpEle.children[0];
  return returnDom;
}
/**
 * [insertAfter description: According to MDN if the element is last (and so nextSibling is null) the newNode will be appended as expected]
 * @param  {[type]} newNode       [description]
 * @param  {[type]} referenceNode [description]
 * @return {undefined}               [description]
 */
export function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
