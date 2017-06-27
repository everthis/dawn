// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview The primary SPF entry point.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import {spfBase} from './base'
import spfConfig from './config'
import spfDebug from './debug/debug'
import spfHistory from './history/history'
import spfNav from './nav/nav'
import spfNetStyle from './net/style'
import spfNetScript from './net/script'

let spfMain = {}

/**
 * Initializes SPF.
 *
 * @param {Object=} opt_config Optional global configuration object.
 * @return {boolean} Whether SPF was successfully initialized.  If the HTML5
 *     history modification API is not supported, returns false.
 */
spfMain.init = function (opt_config) {
  var enable = spfMain.canInit_()
  spfDebug.info('main.init ', 'enable=', enable)
  spfConfig.init(opt_config)
  if (enable) {
    spfNav.init()
  }
  // Signal that the API is ready with custom event.  Only supported in IE 9+.
  spfBase.dispatch(spfBase.EventName.READY)

  return enable
}

/**
 * Checks to see if SPF can be initialized.
 *
 * @return {boolean}
 * @private
 */
spfMain.canInit_ = function () {
  return !!(typeof window.history.pushState === 'function' ||
      spfHistory.getIframe().contentWindow.history.pushState)
}

/**
 * Disposes SPF.
 */
spfMain.dispose = function () {
  var enable = !!(typeof History !== 'undefined' && History.prototype.pushState)
  if (enable) {
    spfNav.dispose()
  }
  spfConfig.clear()
}

/**
 * Discovers existing script and style elements in the document and registers
 * them as loaded, once during initial code execution and again when the
 * document is ready to catch any resources in the page after SPF is included.
 * @private
 */
spfMain.discover_ = function () {
  spfNetScript.discover()
  spfNetStyle.discover()
  if (document.readyState == 'complete') {
    // Since IE 8+ is supported for common library functions such as script
    // and style loading, use both standard and legacy event handlers to
    // discover existing resources.
    if (document.removeEventListener) {
      document.removeEventListener(
          'DOMContentLoaded', spfMain.discover_, false)
    } else if (document.detachEvent) {
      document.detachEvent(
          'onreadystatechange', spfMain.discover_)
    }
  }
}
if (document.addEventListener) {
  document.addEventListener(
      'DOMContentLoaded', spfMain.discover_, false)
} else if (document.attachEvent) {
  document.attachEvent(
        'onreadystatechange', spfMain.discover_)
}
spfMain.discover_()

export default spfMain
