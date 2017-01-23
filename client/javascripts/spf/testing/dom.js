// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Helper functions for tests that use the DOM.
 *
 * @author rviscomi@google.com (Rick Viscomi)
 */

import spfDom from '../dom/dom';

let spfTestingDom = {};
// goog.provide('spfTestingDom');

// goog.require('spfDom');


/**
 * Unique identifier for SPF test element tag names.
 *
 * @const {string}
 */
spfTestingDom.TAG_NAME = 'spftest';


/**
 * Creates a DOM element prepopulated with test data.
 *
 * @param {string} id The element's unique ID.
 * @param {string=} opt_initialHTML Optional inner HTML of the element.
 * @param {Object.<string>=} opt_initialAttributes Optional attributes to set
 *   on the element.
 * @return {Element} The newly-created test element.
 */
spfTestingDom.createElement = function(id, opt_initialHTML,
    opt_initialAttributes) {
  var element = document.createElement(spfTestingDom.TAG_NAME);
  element.id = id;
  element.innerHTML = opt_initialHTML || '';
  if (opt_initialAttributes) {
    spfDom.setAttributes(element, opt_initialAttributes);
  }
  document.body.appendChild(element);
  return element;
};


/**
 * Removes all elements with the unique test tag name.
 * See {@link #createElement}.
 */
spfTestingDom.removeAllElements = function() {
  var elements = document.getElementsByTagName(spfTestingDom.TAG_NAME);
  // `elements` is a live node list. Removing one of these elements from the DOM
  // also removes it from the array.
  while (elements.length) {
    document.body.removeChild(elements[0]);
  }
};

export default spfTestingDom;
