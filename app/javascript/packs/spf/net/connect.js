// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for handling connections (i.e. pre-resolving DNS
 * and establishing the TCP AND TLS handshake).
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import spfArray from '../array/array'
import spfNetResource from '../net/resource'

let spfNetConnect = {}
// goog.provide('spfNetConnect');

/**
 * Preconnects to a URL.
 * Use to both resolve DNS and establish connections before requests are made.
 *
 * @param {string|Array.<string>} urls One or more URLs to preconnect.
 */
spfNetConnect.preconnect = function (urls) {
  // Use an <img> tag to handle the preconnect in a compatible manner.
  var type = spfNetResource.Type.IMG
  // Convert to an array if needed.
  urls = spfArray.toArray(urls)
  spfArray.each(urls, function (url) {
    // When preconnecting, always fetch the image and make the request.
    // This is necessary to consistenly establish connections to repeat
    // URLs when the keep-alive time is shorter than the interval between
    // attempts.
    spfNetResource.prefetch(type, url, true)  // Force repeat fetching.
  })
}

export default spfNetConnect
