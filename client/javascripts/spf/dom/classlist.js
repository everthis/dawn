/**
 * @fileoverview Element class manipulation functions.
 * See {@link http://www.w3.org/TR/html5/dom.html#classes}.
 *
 */

// goog.provide('spfDomClasslist');

import spfArray from '../array/array'
let spfDomClasslist = {};



/**
 * Returns an array of class names on a node.
 *
 * @param {Node|EventTarget} node DOM node to evaluate.
 * @return {{length: number}} Array-like object of class names on the node.
 */
spfDomClasslist.get = function(node) {
  if (node.classList) {
    return node.classList;
  } else {
    return node.className && node.className.match(/\S+/g) || [];
  }
};


/**
 * Returns true if a node has a class.
 *
 * @param {Node|EventTarget} node DOM node to test.
 * @param {string} cls Class name to test for.
 * @return {boolean} Whether node has the class.
 */
spfDomClasslist.contains = function(node, cls) {
  if (!cls) {
    return false;
  } else if (node.classList) {
    return node.classList.contains(cls);
  } else {
    var classes = spfDomClasslist.get(node);
    return spfArray.some(classes, function(item) {
      return item == cls;
    });
  }
};


/**
 * Adds a class to a node. Does not add multiples.
 *
 * @param {Node|EventTarget} node DOM node to add class to.
 * @param {string} cls Class name to add.
 */
spfDomClasslist.add = function(node, cls) {
  if (cls) {
    if (node.classList) {
      node.classList.add(cls);
    } else if (!spfDomClasslist.contains(node, cls)) {
      node.className += ' ' + cls;
    }
  }
};


/**
 * Removes a class from a node.
 *
 * @param {Node|EventTarget} node DOM node to remove class from.
 * @param {string} cls Class name to remove.
 */
spfDomClasslist.remove = function(node, cls) {
  if (cls) {
    if (node.classList) {
      node.classList.remove(cls);
    } else {
      var classes = spfDomClasslist.get(node);
      var newClasses = spfArray.filter(classes, function(item) {
        return item != cls;
      });
      node.className = newClasses.join(' ');
    }
  }
};

export default spfDomClasslist;
