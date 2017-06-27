/**
 * @fileoverview Fast asynchronous function execution.
 *
 * This package provides functions to defer execution on the main thread
 * without using setTimeout, though setTimeout is used as a fallback in browsers
 * that do not support other methods.  Using these methods is advantageous when
 * one wants to schedule a callback faster than the setTimeout clamped minimum
 * allows (e.g. when doing `setTimeout(fn, 0)`)  The clamped minimum for
 * setTimeout is often 10ms, though when WebKit browsers are in a background
 * tab, setTimeout calls deprioritized to execute with a 1s delay.  In these
 * cases, this package provides an alternative.
 *
 */

import {spfBase, SPF_BOOTLOADER} from '../base'
import spfState from '../state'
import spfString from '../string/string'

// goog.provide('spfAsync');

let spfAsync = {}

/**
 * Defers execution of a function to the next slot on the main thread.
 *
 * @param {!Function} fn The function to defer.
 */
spfAsync.defer = function (fn) {
  var uid = spfBase.uid()
  spfAsync.defers_[uid] = fn
  if (spfAsync.POSTMESSAGE_SUPPORTED_) {
    window.postMessage(spfAsync.PREFIX_ + uid, '*')
  } else {
    window.setTimeout(spfBase.bind(spfAsync.run_, null, uid), 0)
  }
}

/**
 * Handles a message event and triggers execution function.
 *
 * @param {Event} evt The click event.
 * @private
 */
spfAsync.handleMessage_ = function (evt) {
  if (evt.data && spfString.isString(evt.data) &&
      spfString.startsWith(evt.data, spfAsync.PREFIX_)) {
    var uid = evt.data.substring(spfAsync.PREFIX_.length)
    spfAsync.run_(uid)
  }
}

/**
 * Executes a previously deferred function.
 *
 * @param {string|number} uid The UID associated with the function.
 * @private
 */
spfAsync.run_ = function (uid) {
  var fn = spfAsync.defers_[uid]
  if (fn) {
    delete spfAsync.defers_[uid]
    fn()
  }
}

/**
 * Adds a function as a listener for message events.
 *
 * @param {!Function} fn The function to add as a listener.
 * @private
 */
spfAsync.addListener_ = function (fn) {
  if (window.addEventListener) {
    window.addEventListener('message', fn, false)
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', fn)
  }
}

/**
 * Removes a function as a listener for message events.
 *
 * @param {!Function} fn The function to remove as a listener.
 * @private
 */
spfAsync.removeListener_ = function (fn) {
  if (window.removeEventListener) {
    window.removeEventListener('message', fn, false)
  } else if (window.detachEvent) {
    window.detachEvent('onmessage', fn)
  }
}

/**
 * Whether the browser supports asynchronous postMessage calls.
 *
 * @private {boolean}
 */
spfAsync.POSTMESSAGE_SUPPORTED_ = (function () {
  if (!window.postMessage) {
    return false
  }
  // Use postMessage where available.  But, ensure that postMessage is
  // asynchronous; the implementation in IE8 is synchronous, which defeats
  // the purpose.  To detect this, use a temporary "onmessage" listener.
  var supported = true
  var listener = function () { supported = false }
  // Add the listener, dispatch a message event, and remove the listener.
  spfAsync.addListener_(listener)
  window.postMessage('', '*')
  spfAsync.removeListener_(listener)
  // Return the status.  If the postMessage implementation is correctly
  // asynchronous, then the value of the `supported` variable will be
  // true, but if the postMessage implementation is synchronous, the
  // temporary listener will have executed and set the `supported`
  // variable to false.
  return supported
})()

/**
 * The prefix to use for message event data to avoid conflicts.
 *
 * @private {string}
 */
spfAsync.PREFIX_ = 'spf:'

/**
 * Map of deferred function calls.
 * @private {!Object.<!Function>}
 */
spfAsync.defers_ = {}

// Automatic initialization for spfAsync.defers_.
// When built for the bootloader, unconditionally set in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.ASYNC_DEFERS, spfAsync.defers_)
} else {
  if (!spfState.has(spfState.Key.ASYNC_DEFERS)) {
    spfState.set(spfState.Key.ASYNC_DEFERS, spfAsync.defers_)
  }
  spfAsync.defers_ = /** @type {!Object.<!Function>} */ (
      spfState.get(spfState.Key.ASYNC_DEFERS))
}

// Automatic initialization for spfState.Key.ASYNC_LISTENER.
// When built for the bootloader, unconditionally set in state.
if (SPF_BOOTLOADER) {
  if (spfAsync.POSTMESSAGE_SUPPORTED_) {
    spfAsync.addListener_(spfAsync.handleMessage_)
    spfState.set(spfState.Key.ASYNC_LISTENER, spfAsync.handleMessage_)
  }
} else {
  if (spfAsync.POSTMESSAGE_SUPPORTED_) {
    if (spfState.has(spfState.Key.ASYNC_LISTENER)) {
      spfAsync.removeListener_(/** @type {function(Event)} */ (
          spfState.get(spfState.Key.ASYNC_LISTENER)))
    }
    spfAsync.addListener_(spfAsync.handleMessage_)
    spfState.set(spfState.Key.ASYNC_LISTENER, spfAsync.handleMessage_)
  }
}

export default spfAsync
