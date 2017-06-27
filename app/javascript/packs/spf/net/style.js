// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for dynamically loading stylesheets.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfNetStyle');

import spfArray from '../array/array'
import spfNetResource from '../net/resource'
import spfString from '../string/string'

let spfNetStyle = {}

/**
 * Loads a stylesheet asynchronously and defines a name to use for dependency
 * management and unloading.  See {@link #unload} to remove previously loaded
 * stylesheets.
 *
 * - Subsequent calls to load the same URL will not reload the stylesheet.  To
 *   reload a stylesheet, unload it first with {@link #unload}.  To
 *   unconditionally load a stylesheet, see {@link #get}.
 *
 * - A name must be specified to identify the same stylesheet at different URLs.
 *   (For example, "main-A.css" and "main-B.css" are both "main".)  When a name
 *   is specified, all other stylesheets with the same name will be unloaded.
 *   This allows switching between versions of the same stylesheet at different
 *   URLs.
 *
 * - A callback can be specified to execute once the stylesheet has loaded.  The
 *   callback will be executed each time, even if the stylesheet is not
 *   reloaded.  NOTE: Unlike scripts, this callback is best effort and is
 *   supported in the following browser versions: IE 6, Chrome 19, Firefox 9,
 *   Safari 6.
 *
 * @param {string} url URL of the stylesheet to load.
 * @param {string} name Name to identify the stylesheet.
 * @param {Function=} opt_fn Optional callback function to execute when the
 *     stylesheet is loaded.
 */
spfNetStyle.load = function (url, name, opt_fn) {
  var type = spfNetResource.Type.CSS
  spfNetResource.load(type, url, name, opt_fn)
}

/**
 * Unloads a stylesheet identified by dependency name.  See {@link #load}.
 *
 * @param {string} name The dependency name.
 */
spfNetStyle.unload = function (name) {
  var type = spfNetResource.Type.CSS
  spfNetResource.unload(type, name)
}

/**
 * Discovers existing stylesheets in the document and registers them as loaded.
 */
spfNetStyle.discover = function () {
  var type = spfNetResource.Type.CSS
  spfNetResource.discover(type)
}

/**
 * Unconditionally loads a stylesheet by dynamically creating an element and
 * appending it to the document without regard for whether it has been loaded
 * before. A stylesheet directly loaded by this method cannot be unloaded by
 * name.  Compare to {@link #load}.
 *
 * @param {string} url URL of the stylesheet to load.
 * @param {Function=} opt_fn Function to execute when loaded.
 */
spfNetStyle.get = function (url, opt_fn) {
  // NOTE: Callback execution depends on onload support and is best effort.
  // Chrome 19, Safari 6, Firefox 9, Opera and IE 5.5 support stylesheet onload.
  var type = spfNetResource.Type.CSS
  spfNetResource.create(type, url, opt_fn)
}

/**
 * Prefetchs one or more stylesheets; the stylesheets will be requested but not
 * loaded.  Use to prime the browser cache and avoid needing to request the
 * stylesheet when subsequently loaded.  See {@link #load}.
 *
 * @param {string|Array.<string>} urls One or more stylesheet URLs to prefetch.
 */
spfNetStyle.prefetch = function (urls) {
  var type = spfNetResource.Type.CSS
  // Convert to an array if needed.
  urls = spfArray.toArray(urls)
  spfArray.each(urls, function (url) {
    spfNetResource.prefetch(type, url)
  })
}

/**
 * Evaluates style text and defines a name to use for management.
 *
 * - Subsequent calls to evaluate the same text will not re-evaluate the style.
 *   To unconditionally evalute a style, see {@link #exec}.
 *
 * @param {string} text The text of the style.
 * @param {string} name Name to identify the style.
 * @return {undefined}
 */
spfNetStyle.eval = function (text, name) {
  var type = spfNetResource.Type.CSS
  spfNetResource.eval(type, text, name)
}

/**
 * Unconditionally evaluates style text.  See {@link #eval}.
 *
 * @param {string} text The text of the style.
 */
spfNetStyle.exec = function (text) {
  var type = spfNetResource.Type.CSS
  spfNetResource.exec(type, text)
}

/**
 * Sets the path prefix or replacement map to use when resolving relative URLs.
 *
 * Note: The order in which replacements are made is not guaranteed.
 *
 * @param {string|Object.<string>} paths The paths.
 */
spfNetStyle.path = function (paths) {
  var type = spfNetResource.Type.CSS
  spfNetResource.path(type, paths)
}

export default spfNetStyle
