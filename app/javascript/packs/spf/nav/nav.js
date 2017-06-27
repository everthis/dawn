// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions to handle pushstate-based navigation.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import {spfBase, SPF_DEBUG} from '../base'
import spfArray from '../array/array'
import spfCache from '../cache/cache'
import spfConfig from '../config'
import spfDebug from '../debug/debug'
import spfDom from '../dom/dom'
import spfDomClasslist from '../dom/classlist'
import spfDomDataset from '../dom/dataset'
import spfHistory from '../history/history'
import spfNavRequest from '../nav/request'
import spfNavResponse from '../nav/response'
import spfState from '../state'
import spfString from '../string/string'
import spfTasks from '../tasks/tasks'
import spfUrl from '../url/url'

let spfNav = {}
// goog.provide('spfNav');

/**
 * Initializes (enables) pushState navigation.
 */
spfNav.init = function () {
  // Initialize history management.
  spfHistory.init(spfNav.handleHistory_, spfNav.dispatchError_)
  // If already initialized, or running in an unsupported environment, return.
  if (spfState.get(spfState.Key.NAV_INIT) || !document.addEventListener) {
    return
  }
  // Set some basic state.
  spfState.set(spfState.Key.NAV_INIT, true)
  spfState.set(spfState.Key.NAV_INIT_TIME, spfBase.now())
  spfState.set(spfState.Key.NAV_COUNTER, 0)
  // Handle clicks for navigating when a spf-link element click happens.
  document.addEventListener('click', spfNav.handleClick_, false)
  spfState.set(spfState.Key.NAV_CLICK_LISTENER, spfNav.handleClick_)
  // Handle mousedowns for prefetching when a spf-link element click starts.
  if (spfConfig.get('experimental-prefetch-mousedown') &&
      !spfNav.isTouchCapablePlatform_()) {
    document.addEventListener('mousedown', spfNav.handleMouseDown_, false)
    spfState.set(spfState.Key.NAV_MOUSEDOWN_LISTENER,
                  spfNav.handleMouseDown_)
  }
  // Handle scrolls for preventing early scrolling during history changes.
  document.addEventListener('scroll', spfNav.handleScroll_, false)
  spfState.set(spfState.Key.NAV_SCROLL_LISTENER, spfNav.handleScroll_)
}

/**
 * Disposes (disables) pushState navigation.
 */
spfNav.dispose = function () {
  spfNav.cancel()
  if (spfState.get(spfState.Key.NAV_INIT)) {
    if (document.removeEventListener) {
      var handleClick = /** @type {function(Event)} */ (
          spfState.get(spfState.Key.NAV_CLICK_LISTENER))
      document.removeEventListener('click', handleClick, false)
      var handleMouseDown = /** @type {function(Event)} */ (
          spfState.get(spfState.Key.NAV_MOUSEDOWN_LISTENER))
      document.removeEventListener('mousedown', handleMouseDown, false)
      var handleScroll = /** @type {function(Event)} */ (
          spfState.get(spfState.Key.NAV_SCROLL_LISTENER))
      document.removeEventListener('scroll', handleScroll, false)
    }
    spfState.set(spfState.Key.NAV_CLICK_LISTENER, null)
    spfState.set(spfState.Key.NAV_MOUSEDOWN_LISTENER, null)
    spfState.set(spfState.Key.NAV_SCROLL_LISTENER, null)
    spfState.set(spfState.Key.NAV_SCROLL_TEMP_POSITION, null)
    spfState.set(spfState.Key.NAV_SCROLL_TEMP_URL, null)
    spfState.set(spfState.Key.NAV_INIT, false)
    spfState.set(spfState.Key.NAV_INIT_TIME, null)
    spfState.set(spfState.Key.NAV_COUNTER, null)
  }
  spfHistory.dispose()
}

/**
 * Walks up the DOM hierarchy, returning the first ancestor that has the
 * link class.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @return {Node} DOM node with the link class or null if not found.
 * @private
 */
spfNav.getAncestorWithLinkClass_ = function (element) {
  return spfDom.getAncestor(element, function (node) {
    return spfDomClasslist.contains(node, /** @type {string} */ (
        spfConfig.get('link-class')))
  })
}

/**
 * Walks up the DOM hierarchy, returning the first ancestor that has the
 * nolink class.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @return {Node} DOM node with the nolink class or null if not found.
 * @private
 */
spfNav.getAncestorWithNoLinkClass_ = function (element) {
  return spfDom.getAncestor(element, function (node) {
    return spfDomClasslist.contains(node, /** @type {string} */ (
        spfConfig.get('nolink-class')))
  })
}

/**
 * Walks up the DOM hierarchy, returning the first ancestor with a href.
 *
 * @param {Node|EventTarget} element The DOM node to start with.
 * @param {Node} parent The DOM node to end with.
 * @return {Node} DOM node with a href or null if not found.
 * @private
 */
spfNav.getAncestorWithHref_ = function (element, parent) {
  return spfDom.getAncestor(element, function (node) {
    // Images in IE10 can have an href.
    return node.href && node.tagName.toLowerCase() != 'img'
  }, parent)
}

/**
 * Given a mouse event, try to get the corresponding navigation URL.
 *
 * @param {Event} evt The click event.
 * @return {?string} Navigation url of event if applicable.
 * @private
 */
spfNav.getEventURL_ = function (evt) {
  // Ignore clicks with modifier keys.
  if (evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) {
    spfDebug.debug('    ignoring click with modifier key')
    return null
  }
  // Ignore clicks with alternate buttons (left = 0, middle = 1, right = 2).
  if (evt.button > 0) {
    spfDebug.debug('    ignoring click with alternate button')
    return null
  }
  // Ignore clicks on targets without the link class or not within
  // a container with the link class.
  var linkEl = spfNav.getAncestorWithLinkClass_(evt.target)
  if (!linkEl) {
    spfDebug.debug('    ignoring click without link class')
    return null
  }
  // Ignore clicks on targets with the nolink class or within
  // a container with the nolink class.
  if (spfConfig.get('nolink-class')) {
    var nolinkEl = spfNav.getAncestorWithNoLinkClass_(evt.target)
    if (nolinkEl) {
      spfDebug.debug('    ignoring click with nolink class')
      return null
    }
  }
  var target = spfNav.getAncestorWithHref_(evt.target, linkEl)
  // Ignore clicks on targets without an href.
  if (!target) {
    spfDebug.debug('    ignoring click without href parent')
    return null
  }
  return target.href
}

/**
 * Whether this URL is allowed for navigation, according to same-origin security
 * policy.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @return {boolean}
 * @private
 */
spfNav.isAllowed_ = function (url) {
  // If the destination is not same-origin, cancel.
  // TODO(nicksay): Add CORS origin whitelist.
  var destination = spfUrl.origin(url)
  if (destination != spfUrl.origin(window.location.href)) {
    spfDebug.warn('destination not same-origin')
    return false
  }
  return true
}

/**
 * Whether this URL is eligible for navigation, according to the configured
 * limits and lifetime.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @return {boolean}
 * @private
 */
spfNav.isEligible_ = function (url) {
  // If navigation is requested but SPF is not initialized, cancel.
  if (!spfState.get(spfState.Key.NAV_INIT)) {
    spfDebug.warn('navigation not initialized')
    return false
  }
  // If a session limit has been set and reached, cancel.
  var count = parseInt(spfState.get(spfState.Key.NAV_COUNTER), 10) || 0
  count++
  var limit = parseInt(spfConfig.get('navigate-limit'), 10)
  limit = isNaN(limit) ? Infinity : limit
  if (count > limit) {
    spfDebug.warn('navigation limit reached')
    return false
  }
  // If a session lifetime has been set and reached, cancel.
  var timestamp = parseInt(spfState.get(spfState.Key.NAV_INIT_TIME), 10)
  timestamp--
  var age = spfBase.now() - timestamp
  var lifetime = parseInt(spfConfig.get('navigate-lifetime'), 10)
  lifetime = isNaN(lifetime) ? Infinity : lifetime
  if (age > lifetime) {
    spfDebug.warn('navigation lifetime reached')
    return false
  }
  return true
}

/**
 * Whether this URL should be handled for navigation (i.e. not same-page
 * hash-based navigation).
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {string=} opt_current The current page URL, without the SPF
 *     identifier.
 * @return {boolean}
 * @private
 */
spfNav.isNavigable_ = function (url, opt_current) {
  var current = opt_current || window.location.href
  // Check for transitions between hash URLs.  If the destination
  // contains a hash and the page is the same, navigation is not handled.
  if (spfString.contains(url, '#')) {
    var absoluteUrl = spfUrl.absolute(url)
    var absoluteCurrent = spfUrl.absolute(current)
    if (absoluteUrl == absoluteCurrent) {
      spfDebug.debug('    not handling hash-based navigation')
      return false
    }
  }
  return true
}

/**
 * Handles page click events on SPF links, adds pushState history entries for
 * them, and navigates.
 *
 * @param {Event} evt The click event.
 * @private
 */
spfNav.handleClick_ = function (evt) {
  spfDebug.debug('nav.handleClick ', 'evt=', evt)
  // Allow other click handlers to cancel navigation.
  if (evt.defaultPrevented) {
    return
  }
  var url = spfNav.getEventURL_(evt)
  // Ignore clicks without a URL.
  if (!url) {
    return
  }
  url = spfUrl.appendPersistentParameters(url)
  // Ignore clicks if the URL is not allowed (e.g. cross-domain).
  if (!spfNav.isAllowed_(url)) {
    return
  }
  // Ignore clicks if the URL is not eligible (e.g. limit reached).
  if (!spfNav.isEligible_(url)) {
    return
  }
  // Ignore clicks if the "click" event is canceled.
  if (!spfNav.dispatchClick_(url, evt.target)) {
    return
  }

  // Navigate to the URL.
  var options = spfNav.createOptions_()
  var info = new spfNav.Info()
  spfNav.navigate_(url, options, info)
  // Prevent the default browser navigation to avoid reloads.
  evt.preventDefault()
}

/**
 * Handles page mousedown events on SPF links and prefetches them if possible.
 *
 * @param {Event} evt The mousedown event.
 * @private
 */
spfNav.handleMouseDown_ = function (evt) {
  spfDebug.debug('nav.handleMouseDown ', 'evt=', evt)
  var url = spfNav.getEventURL_(evt)
  // Ignore clicks without a URL.
  if (!url) {
    return
  }
  // Allow other mousedown handlers to run before issuing a prefetch request.
  setTimeout(function () {
    spfNav.prefetch(/** @type {string} */(url))
  }, 0)
}

/**
 * Handles page scroll events to ensure history entry changes do not
 * prematurally scroll the page before content is updated.
 *
 * @param {Event} evt The scroll event.
 * @private
 */
spfNav.handleScroll_ = function (evt) {
  var position = spfNav.getScrollTempPosition_()
  spfNav.clearScrollTempPosition_()
  if (position) {
    spfDebug.debug('    returning to saved scroll temp position', position)
    window.scroll.apply(null, position)
  }
}

/**
 * Handles when the active history entry changes.
 *
 * @param {string} url The URL the user is browsing to.
 * @param {Object=} opt_state An optional state object associated with the URL.
 * @private
 */
spfNav.handleHistory_ = function (url, opt_state) {
  spfDebug.debug('nav.handleHistory ', '(url=', url, 'state=', opt_state, ')')
  var info = new spfNav.Info({
    current: opt_state && opt_state['spf-current'],
    history: true,
    position: opt_state && opt_state['spf-position'],
    referer: opt_state && opt_state['spf-referer'],
    reverse: !!(opt_state && opt_state['spf-back'])
  })
  // If the reload-identifier is present, remove it to prevent confusing data.
  var reloadId = /** @type {?string} */ (spfConfig.get('reload-identifier'))
  if (reloadId) {
    url = spfUrl.removeParameters(url, [reloadId])
  }
  // Reload if the URL is not allowed (e.g. cross-domain).
  if (!spfNav.isAllowed_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.FORBIDDEN)
    return
  }
  // Reload if the URL is not eligible (e.g. limit reached).
  if (!spfNav.isEligible_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.INELIGIBLE)
    return
  }
  // Ignore the change if the "history" event is canceled.
  if (!spfNav.dispatchHistory_(url, info.referer, info.current)) {
    return
  }
  // If navigating for this history change and a scroll position is set, ensure
  // the browser doesn't scroll too early.  The browser default behavior is to
  // scroll to the position when pushState was called just after a popState
  // event is fired.  This is okay only if using history to move around a single
  // page or if all content can be rendered synchronously during the popState
  // event handling.  Since navigation content updates have at least one
  // asynchronous break, avoid this by saving the current page position and
  // scrolling immediately back to it when the browser scrolls early.
  // The proper position will be set once content is updated.
  if (info.position) {
    spfNav.setScrollTempPosition_()
  }
  // Navigate to the URL.
  // NOTE: The persistent parameters are not appended here because they should
  // already be set on the URL if necessary.
  var options = spfNav.createOptions_()
  spfNav.navigate_(url, options, info)
}

/**
 * Navigates to a URL.
 *
 * A pushState history entry is added for the URL, and if successful, the
 * navigation is performed.  If not, the browser is reloaded to the URL.
 * During the navigation, first the content is requested.  If the reponse is
 * sucessfully parsed, it is processed.  If not, the browser is reloaded to
 * the URL.  Only a single navigation request can be in flight at once.  If a
 * second URL is navigated to while a first is still pending, the first will be
 * cancelled.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions=} opt_options Optional request options object.
 */
spfNav.navigate = function (url, opt_options) {
  spfDebug.debug('nav.navigate ', '(url=', url, 'options=', opt_options, ')')
  // Ignore navigation to an empty URL.
  if (!url) {
    return
  }
  url = spfUrl.appendPersistentParameters(url)
  // Reload if the URL is not allowed (e.g. cross-domain).
  if (!spfNav.isAllowed_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.FORBIDDEN)
    return
  }
  // Reload if the URL is not eligible (e.g. limit reached).
  if (!spfNav.isEligible_(url)) {
    spfNav.reload(url, spfNav.ReloadReason.INELIGIBLE)
    return
  }
  // Navigate to the URL.
  var options = spfNav.createOptions_(opt_options)
  var info = new spfNav.Info()
  spfNav.navigate_(url, options, info)
}

/**
 * Performs navigation to a URL.
 * See {@link #navigate}, {@link #handleClick}, and {@link #handleHistory}.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private.
 */
spfNav.navigate_ = function (url, options, info) {
  spfDebug.info('nav.navigate_ ', url, options, info)

  // Abort previous navigation, if needed.
  spfNav.cancel()

  // If the URL is not navigable, attempt to scroll to support hash navigation.
  if (!spfNav.isNavigable_(url, info.current)) {
    spfDebug.debug('non-navigable, just scroll')
    // Add a history entry beforehand to save current position, if needed.
    if (!info.history) {
      var handleError = spfBase.bind(spfNav.handleNavigateError_, null,
                                 options)
      spfNav.navigateAddHistory_(url, info.referer, handleError)
    }
    // Then attempt to scroll.
    spfNav.navigateScroll_(url, info)
    return
  }

  // Reload if the "request" event is canceled.
  if (!spfNav.dispatchRequest_(url, info.referer, info.current, options)) {
    spfNav.reload(url, spfNav.ReloadReason.REQUEST_CANCELED)
    return
  }

  // Set the navigation counter.
  var count = (parseInt(spfState.get(spfState.Key.NAV_COUNTER), 10) || 0) + 1
  spfState.set(spfState.Key.NAV_COUNTER, count)

  // Abort all ongoing prefetch requests, except for the navigation one if it
  // exists.  This will reduce network contention for the navigation request
  // by eliminating concurrent reqeuests that will not be used.
  spfNav.cancelAllPrefetchesExcept(url)
  // Cancel all preprocessing being done for completed single or ongoing
  // multipart prefetch response, except for the navigation one if it exists.
  // If the navigation one is a completed single response, the task will be
  // canceled in spfNav.navigatePromotePrefetch_.  If it is an ongoing
  // multipart response, allow it to continue processing until the completed.
  var absoluteUrl = spfUrl.absolute(url)
  var preprocessKey = spfNav.preprocessKey(absoluteUrl)
  spfTasks.cancelAllExcept('preprocess', preprocessKey)

  // Set the current nav request to be the prefetch, if it exists.
  var prefetches = spfNav.prefetches_()
  var prefetchXhr = prefetches[absoluteUrl]
  spfState.set(spfState.Key.NAV_REQUEST, prefetchXhr)
  // Make sure there is no current nav promotion set.
  spfState.set(spfState.Key.NAV_PROMOTE, null)
  spfState.set(spfState.Key.NAV_PROMOTE_TIME, null)

  // Check the prefetch XHR.  If it is not done, promote the prefetch
  // to navigate.  Otherwise, navigate immediately.
  if (prefetchXhr && prefetchXhr.readyState != 4) {
    // Begin the prefetch promotion process.
    spfNav.navigatePromotePrefetch_(url, options, info)
  } else {
    spfNav.navigateSendRequest_(url, options, info)
  }
}

/**
 * Promotes a prefetch request to a navigation after it completes.
 * See {@link navigate}.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.navigatePromotePrefetch_ = function (url, options, info) {
  spfDebug.debug('nav.navigatePromotePrefetch_ ', url)
  var preprocessKey = spfNav.preprocessKey(url)
  var promoteKey = spfNav.promoteKey(url)
  spfState.set(spfState.Key.NAV_PROMOTE, url)
  spfState.set(spfState.Key.NAV_PROMOTE_TIME, spfBase.now())
  spfTasks.cancel(preprocessKey)
  spfTasks.run(promoteKey, true)

  // After starting the promote tasks, check for new navigation that needs
  // a history entry added.
  if (!info.history) {
    var handleError = spfBase.bind(spfNav.handleNavigateError_, null,
                               options)
    spfNav.navigateAddHistory_(url, info.referer, handleError)
  }
}

/**
 * Send the navigation request.
 * See {@link navigate}.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.navigateSendRequest_ = function (url, options, info) {
  var handleError = spfBase.bind(spfNav.handleNavigateError_, null,
                             options)
  var handlePart = spfBase.bind(spfNav.handleNavigatePart_, null,
                            options, info)
  var handleSuccess = spfBase.bind(spfNav.handleNavigateSuccess_, null,
                               options, info)

  // Before sending a new navigation request, clear previous resource timings
  // to avoid (1) hitting buffer size limits or (2) accidentally getting timings
  // for a previous request in Chrome, where the API is asynchronous and the
  // latest values will not be available immediately.
  // Only do this for navigations to avoid removing unrelated resource timings
  // during prefetch or load calls.
  // As an advanced option, allow timings to persist if desired.
  if (!spfConfig.get('advanced-navigate-persist-timing')) {
    spfNav.clearResourceTimings_()
  }

  info.type = 'navigate'
  if (info.history) {
    info.type += info.reverse ? '-back' : '-forward'
  }

  var xhr = spfNavRequest.send(url, {
    method: options['method'],
    headers: options['headers'],
    onPart: handlePart,
    onError: handleError,
    onSuccess: handleSuccess,
    postData: options['postData'],
    type: info.type,
    current: info.current,
    referer: info.referer
  })
  spfState.set(spfState.Key.NAV_REQUEST, xhr)

  // After the request has been sent, check for new navigation that needs
  // a history entry added.  Do this after sending the XHR to have the
  // correct referer for regular navigation (but not history navigation).
  if (!info.history) {
    spfNav.navigateAddHistory_(url, info.referer, handleError)
  }
}

/**
 * Scrolls to a target specified by a URL hash, a position specified in the
 * navigation info object, or the top of the page if the window has not yet
 * been scrolled as part of this navigation.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.navigateScroll_ = function (url, info) {
  // If a position is defined, scroll to it.
  if (info.position) {
    spfDebug.debug('    clearing scroll temp position')
    spfNav.clearScrollTempPosition_()
    spfDebug.debug('    scrolling to position', info.position)
    window.scroll.apply(null, info.position)
    info.scrolled = true
    return
  }
  var result = spfString.partition(url, '#')
  // If a non-empty hash is found, attempt to scroll the element into view.
  // Otherwise, scroll to the top of the page.
  if (result[2]) {
    var el = document.getElementById(result[2])
    if (el) {
      spfDebug.debug('    clearing scroll temp position')
      spfNav.clearScrollTempPosition_()
      spfDebug.debug('    scrolling into view', result[2])
      el.scrollIntoView()
      info.scrolled = true
    }
  } else if (!info.scrolled) {
    spfDebug.debug('    clearing scroll temp position')
    spfNav.clearScrollTempPosition_()
    spfDebug.debug('    scrolling to top')
    window.scroll(0, 0)
    info.scrolled = true
  }
}

/**
 * Add the navigate state to the history.
 *
 * @param {string} url The URL to navigate to, without the SPF identifier.
 * @param {string} referer The Referrer URL, without the SPF identifier.
 * @param {function(string, Error)} handleError The error handler.
 * @private
 */
spfNav.navigateAddHistory_ = function (url, referer, handleError) {
  try {
    // Before adding the new history entry, update the existing one with the
    // current scroll position (and timestamp, always done automatically).
    var position = [window.pageXOffset, window.pageYOffset]
    var updateState = {'spf-position': position}
    spfDebug.debug('    updating history to scroll position', position)
    spfHistory.replace(null, updateState)
    // Add the new history entry, unless the URL is the same as the current.
    // (This can happen when clicking a hash-based target multiple times.)
    if (spfUrl.absolute(url, true) != window.location.href) {
      var newState = {'spf-referer': referer}
      spfHistory.add(url, newState)
    }
  } catch (err) {
    // Abort the navigation.
    spfNav.cancel()
    // An error is thrown if the state object is too large or if the
    // URL is not in the same domain.
    spfDebug.error('error caught, redirecting ',
                    '(url=', url, 'err=', err, ')')
    handleError(url, err)
  }
}

/**
 * Handles a navigation error.
 * See {@link navigate}.
 *
 * @param {spfBase.RequestOptions} options Request options object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {Error} err The Error object.
 * @param {XMLHttpRequest=} opt_xhr The XMLHttpRequest for current error
 * @private
 */
spfNav.handleNavigateError_ = function (options, url, err, opt_xhr) {
  spfDebug.warn('navigate error', '(url=', url, ')')
  spfState.set(spfState.Key.NAV_REQUEST, null)
  // Ignore the error if the "error" event is canceled, but otherwise,
  // reload the page.
  if (!spfNav.dispatchError_(url, err, options, undefined, opt_xhr)) {
    return
  }
  spfNav.reload(url, spfNav.ReloadReason.ERROR, err)
}

/**
 * Handles a navigation partial response.
 * See {@link navigate}.
 *
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object.
 * @private
 */
spfNav.handleNavigatePart_ = function (options, info, url, partial) {
  // Reload if the "part process" event is canceled.
  if (!spfNav.dispatchPartProcess_(url, partial, options)) {
    spfNav.reload(url, spfNav.ReloadReason.PART_PROCESS_CANCELED)
    return
  }

  // Check for reload responses.
  if (partial['reload']) {
    spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED)
    return
  }

  // Check for redirect responses.
  if (partial['redirect']) {
    spfNav.handleNavigateRedirect_(options, partial['redirect'])
    return
  }

  try {
    spfNavResponse.process(url, partial, info, function () {
      spfNav.dispatchPartDone_(url, partial, options)
    })
  } catch (err) {
    // If an exception is caught during processing, log, execute the error
    // handler, and bail.
    spfDebug.debug('    failed to process part', partial)
    spfNav.handleNavigateError_(options, url, err)
  }
}

/**
 * Handles a navigation complete response.
 * See {@link navigate}.
 *
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @private
 */
spfNav.handleNavigateSuccess_ = function (options, info, url, response) {
  spfState.set(spfState.Key.NAV_REQUEST, null)

  // If this is a navigation from a promotion, manually set the
  // navigation start time.
  if (spfState.get(spfState.Key.NAV_PROMOTE) == info.original) {
    var timing = response['timing'] || {}
    timing['navigationStart'] = spfState.get(spfState.Key.NAV_PROMOTE_TIME)
    timing['spfPrefetched'] = true
  }

  // If a multipart response was received, all processing is already done,
  // so don't fire the "process" event/callbacks.
  var multipart = response['type'] == 'multipart'
  if (!multipart) {
    // Reload if the "process" event is canceled.
    if (!spfNav.dispatchProcess_(url, response, options)) {
      spfNav.reload(url, spfNav.ReloadReason.PROCESS_CANCELED)
      return
    }

    // Check for reload responses.
    if (response['reload']) {
      spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED)
      return
    }

    // Check for redirect responses.
    if (response['redirect']) {
      spfNav.handleNavigateRedirect_(options, response['redirect'])
      return
    }
  }

  // Process the requested response.
  try {
    // If a multipart response was received, all processing is already done,
    // so an empty object is used to ensure events/callbacks are properly
    // queued after existing ones from any ongoing part prcoessing.
    var r = /** @type {spfBase.SingleResponse} */ (multipart ? {} : response)
    spfNavResponse.process(url, r, info, function () {
      // After processing is complete, save the name for future use.
      var name = response['name'] || ''
      if (multipart) {
        var parts = response['parts']
        spfArray.each(parts, function (part) {
          name = part['name'] || name
        })
      }
      spfDomDataset.set(document.body, 'spfName', name)
      // If this navigation was from history, attempt to scroll to the previous
      // position after all processing is complete.  This should not be done
      // earlier because the prevous position might rely on page width/height
      // that is changed during the processing.
      // Fallback to scrolling to the top if neither a hash target nor a
      // history position exists and the window was not previously scrolled
      // during response processing.
      spfNav.navigateScroll_(url, info)
      spfNav.dispatchDone_(url, response, options)
    })
  } catch (err) {
    // If an exception is caught during processing, log, execute the error
    // handler and bail.
    spfDebug.debug('    failed to process response', response)
    spfNav.handleNavigateError_(options, url, err)
  }
}

/**
 * Handles a redirect responses on navigation requests.
 *
 * @param {spfBase.RequestOptions} options Request options object.
 * @param {string} redirectUrl The new URL to be redirected to.
 * @private
 */
spfNav.handleNavigateRedirect_ = function (options, redirectUrl) {
  //
  // TODO(nicksay): Figure out navigate callbacks + redirects.
  //
  // Replace the current history entry with the redirect,
  // executing the callback to trigger the next navigation.
  try {
    // Persist the url hash to mirror browser redirects.
    redirectUrl = redirectUrl + window.location.hash
    spfHistory.replace(redirectUrl, null, true)
  } catch (err) {
    spfNav.cancel()
    spfDebug.error('error caught, reloading ',
                    '(url=', redirectUrl, 'err=', err, ')')
    spfNav.handleNavigateError_(options, redirectUrl, err)
  }
}

/**
 * Cancels the current navigation request, if any.
 */
spfNav.cancel = function () {
  var xhr = /** @type {XMLHttpRequest} */ (
      spfState.get(spfState.Key.NAV_REQUEST))
  if (xhr) {
    spfDebug.warn('aborting previous navigate ',
                   'xhr=', xhr)
    xhr.abort()
    spfState.set(spfState.Key.NAV_REQUEST, null)
  }
}

/**
 * Executes an external callback and checks whether the callback was canceled
 * with an explicit return value of `false`.
 *
 * @param {Function|undefined} fn Callback function to be executed.
 * @param {...*} var_args Arguments to apply to the function.
 * @return {boolean} False if the callback was canceled by explicitly returning
 *     false to stop the operation; true otherwise.
 */
spfNav.callback = function (fn, var_args) {
  var val
  if (fn) {
    var args = Array.prototype.slice.call(arguments)
    args[0] = fn
    val = spfBase.execute.apply(null, args)
    if (val instanceof Error) {
      spfDebug.error('error in callback (url=', window.location.href,
                      'err=', val, ')')
    }
  }
  return (val !== false)
}

/**
 * Reloads the page with a URL, to be used when navigation fails or is disabled.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfNav.ReloadReason} reason The reason code causing the reload.
 * @param {Error=} opt_err An optional error object used in the dispatched
 *    reason.
 */
spfNav.reload = function (url, reason, opt_err) {
  var err = opt_err ? opt_err.message : ''
  spfDebug.warn('reloading (', 'url=', url, 'reason=', reason,
                 'error=', err, ')')
  spfNav.cancel()
  spfNav.cancelAllPrefetchesExcept()
  // Dispatch the reload event to notify the app that a reload is required.
  var logReason = reason
  if (err) {
    logReason += ' Message: ' + err
  }
  spfNav.dispatchReload_(url, logReason)
  var current = window.location.href
  // If the url has already changed, clear its entry to prevent browser
  // inconsistency with history management for 301 responses on reloads. Chrome
  // will identify that the starting url was the same, and replace the current
  // history state, whereas Firefox will set a new state with the post 301
  // value.
  if (spfConfig.get('experimental-remove-history') && current == url) {
    spfHistory.removeCurrentEntry()
  }
  // Delay the reload until after the history state has had time to clear.
  setTimeout(function () {
    var reloadId = /** @type {?string} */ (spfConfig.get('reload-identifier'))
    if (reloadId) {
      var params = {}
      params[reloadId] = encodeURIComponent(reason)
      url = spfUrl.appendParameters(url, params)
    }
    window.location.href = url
    // If the new url only differs by a hash then just assigning to
    // `location.href` is not enough to trigger a reload.  If this is the case,
    // explicitly calling `location.reload()` is required, but it can't be done
    // every time because an immediate call to `location.reload()` will cancel
    // the navgation started by the assignment to `location.href`.  The
    // `isNavigable_` function checks for hash-based navgiation that won't
    // trigger, so use it here to determine whether to call `location.reload()`.
    if (!spfNav.isNavigable_(url, current)) {
      window.location.reload()
    }
  }, 0)
}

/**
 * Loads a URL.
 *
 * Similar to {@link spfNav.navigate}, but intended for traditional content
 * updates, not page navigation.  Not subject to restrictions on the number of
 * simultaneous requests.
 *
 * @param {string} url The URL to load, without the SPF identifier.
 * @param {spfBase.RequestOptions=} opt_options Optional request options object.
 */
spfNav.load = function (url, opt_options) {
  url = spfUrl.appendPersistentParameters(url)
  var options = spfNav.createOptions_(opt_options)
  var info = new spfNav.Info()
  spfNav.load_(url, options, info)
}

/**
 * Loads a URL.
 * See {@link #load}.
 *
 * @param {string} url The URL to load, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.load_ = function (url, options, info) {
  spfDebug.info('nav.load ', url, options, info)

  info.original = info.original || url

  // Abort the load if the "request" callback is canceled.
  // Note: pass "true" to only execute callbacks and not dispatch events.
  if (!spfNav.dispatchRequest_(url, undefined, undefined, options, true)) {
    return
  }

  var handleError = spfBase.bind(spfNav.handleLoadError_, null,
                             false, options, info)
  var handlePart = spfBase.bind(spfNav.handleLoadPart_, null,
                            false, options, info)
  var handleSuccess = spfBase.bind(spfNav.handleLoadSuccess_, null,
                               false, options, info)

  info.type = 'load'

  spfNavRequest.send(url, {
    method: options['method'],
    headers: options['headers'],
    onPart: handlePart,
    onError: handleError,
    onSuccess: handleSuccess,
    postData: options['postData'],
    type: info.type,
    withCredentials: options['withCredentials']
  })
}

/**
 * Prefetches a URL.
 *
 * Use to prime the SPF request cache with the content and the browser cache
 * with script and stylesheet URLs.  If the response is successfully parsed, it
 * is preprocessed to prefetch scripts and stylesheets as well.
 *
 * @param {string} url The URL to prefetch, without the SPF identifier.
 * @param {spfBase.RequestOptions=} opt_options Optional request options object.
 */
spfNav.prefetch = function (url, opt_options) {
  url = spfUrl.appendPersistentParameters(url)
  var options = spfNav.createOptions_(opt_options)
  var info = new spfNav.Info()
  spfNav.prefetch_(url, options, info)
}

/**
 * Prefetches a URL.
 * See {@link #prefetch}.
 *
 * @param {string} url The URL to prefetch, without the SPF identifier.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @private
 */
spfNav.prefetch_ = function (url, options, info) {
  spfDebug.info('nav.prefetch ', url, options, info)
  info.original = info.original || url

  // Abort the prefetch if the "request" callback is canceled.
  // Note: pass "true" to only execute callbacks and not dispatch events.
  if (!spfNav.dispatchRequest_(url, undefined, undefined, options, true)) {
    return
  }

  var handleError = spfBase.bind(spfNav.handleLoadError_, null,
                             true, options, info)
  var handlePart = spfBase.bind(spfNav.handleLoadPart_, null,
                            true, options, info)
  var handleSuccess = spfBase.bind(spfNav.handleLoadSuccess_, null,
                               true, options, info)

  info.type = 'prefetch'

  var xhr = spfNavRequest.send(url, {
    method: options['method'],
    headers: options['headers'],
    onPart: handlePart,
    onError: handleError,
    onSuccess: handleSuccess,
    postData: options['postData'],
    type: info.type,
    current: info.current
  })
  spfNav.addPrefetch(url, xhr)
}

/**
 * Handles a load or prefetch error.
 * See {@link load} and {@link prefetch}.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {Error} err The Error object.
 * @private
 */
spfNav.handleLoadError_ = function (isPrefetch, options, info, url, err) {
  spfDebug.warn(isPrefetch ? 'prefetch' : 'load', 'error', '(url=', url, ')')

  if (isPrefetch) {
    spfNav.removePrefetch(url)
  }

  // If a prefetch has been promoted to a navigate, use the navigate error
  // handler.  Otherwise, execute the "error" callback.
  if (isPrefetch && spfState.get(spfState.Key.NAV_PROMOTE) == info.original) {
    spfNav.handleNavigateError_(options, url, err)
  } else {
    // Note: pass "true" to only execute callbacks and not dispatch events.
    spfNav.dispatchError_(url, err, options, true)
  }
}

/**
 * Handles a load or prefetch partial response.
 * See {@link load} and {@link prefetch}.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object.
 * @private
 */
spfNav.handleLoadPart_ = function (isPrefetch, options, info, url, partial) {
  // Abort the load/prefetch if the "part process" callback is canceled.
  // Note: pass "true" to only execute callbacks and not dispatch events.
  if (!spfNav.dispatchPartProcess_(url, partial, options, true)) {
    return
  }

  // Check for reload responses.
  // For a load, abort; for a promoted prefetch, reload immediately; for a
  // prefetch, ignore and the reload will be processed when a navigate occurs.
  if (partial['reload']) {
    if (!isPrefetch) {
      return
    }
    if (spfState.get(spfState.Key.NAV_PROMOTE) == info.original) {
      spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED)
      return
    }
  }

  // Check for redirect responses.
  if (partial['redirect']) {
    spfNav.handleLoadRedirect_(isPrefetch, options, info, partial['redirect'])
    return
  }

  if (isPrefetch) {
    // Add the navigate part function as a task to be invoked on
    // prefetch promotion.
    // TODO(nicksay): Honor history/reverse/position during promotion in
    // reponse to a popState. (This is an edge case.)
    var fn = spfBase.bind(spfNav.handleNavigatePart_, null,
                      options, info, url, partial)
    var promoteKey = spfNav.promoteKey(info.original)
    spfTasks.add(promoteKey, fn)
    // If the prefetch has been promoted, run the promotion task after
    // adding it and do not perform any preprocessing.
    if (spfState.get(spfState.Key.NAV_PROMOTE) == info.original) {
      spfTasks.run(promoteKey, true)
      return
    }
  }

  var processFn = isPrefetch
      ? spfNavResponse.preprocess
      : spfNavResponse.process
  processFn(url, partial, info, function () {
    // Note: pass "true" to only execute callbacks and not dispatch events.
    spfNav.dispatchPartDone_(url, partial, options, true)
  })
}

/**
 * Handles a load or prefetch complete response.
 * See {@link load} and {@link prefetch}.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @private
 */
spfNav.handleLoadSuccess_ = function (isPrefetch, options, info, url,
                                      response) {
  // If a multipart response was received, all processing is already done,
  // so don't execute the "process" callback.
  var multipart = response['type'] == 'multipart'
  if (!multipart) {
    // Abort the load/prefetch if the "process" callback is canceled.
    // Note: pass "true" to only execute callbacks and not dispatch events.
    if (!spfNav.dispatchProcess_(url, response, options, true)) {
      spfNav.reload(url, spfNav.ReloadReason.PROCESS_CANCELED)
      return
    }

    // Check for reload responses.
    // For a load, abort; for a promoted prefetch, reload immediately; for a
    // prefetch, ignore and the reload will be processed when a navigate occurs.
    if (response['reload']) {
      if (!isPrefetch) {
        return
      }
      if (spfState.get(spfState.Key.NAV_PROMOTE) == info.original) {
        spfNav.reload(url, spfNav.ReloadReason.RESPONSE_RECEIVED)
        return
      }
    }

    // Check for redirect responses.
    if (response['redirect']) {
      spfNav.handleLoadRedirect_(isPrefetch, options, info,
                                  response['redirect'])
      return
    }
  }

  var promoteKey = spfNav.promoteKey(info.original)
  if (isPrefetch) {
    // Remove the prefetch xhr from the set of currently active
    // prefetches upon successful prefetch.
    spfNav.removePrefetch(url)
    // If the prefetch has been promoted, run the promotion task after
    // adding it and do not perform any preprocessing. If it has not
    // been promoted, remove the task queues becuase a subsequent
    // request will hit the cache.
    if (spfState.get(spfState.Key.NAV_PROMOTE) == info.original) {
      // TODO(nicksay): Honor history/reverse/position during promotion in
      // reponse to a popState. (This is an edge case.)
      var fn = spfBase.bind(spfNav.handleNavigateSuccess_, null,
                        options, info, url, response)
      spfTasks.add(promoteKey, fn)
      spfTasks.run(promoteKey, true)
      return
    } else {
      spfTasks.cancel(promoteKey)
    }
  }

  // Process the requested response.
  var processFn = isPrefetch
      ? spfNavResponse.preprocess
      : spfNavResponse.process
  try {
    // If a multipart response was received, all processing is already done,
    // so an empty object is used to ensure the callback is properly
    // queued after existing ones from any ongoing part prcoessing.
    var r = /** @type {spfBase.SingleResponse} */ (multipart ? {} : response)
    processFn(url, r, info, function () {
      // Note: pass "true" to only execute callbacks and not dispatch events.
      spfNav.dispatchDone_(url, response, options, true)
    })
  } catch (err) {
    // If an exception is caught during processing, log, execute the error
    // handler and bail.
    spfDebug.debug('    failed to process response', response)
    spfNav.handleLoadError_(isPrefetch, options, info, url, err)
  }
}

/**
 * Handles a redirect response on load requests.
 *
 * @param {boolean} isPrefetch True for prefetch; false for load.
 * @param {spfBase.RequestOptions} options The request options object.
 * @param {spfNav.Info} info The navigation info object.
 * @param {string} redirectUrl The new URL to be redirected to.
 * @private
 */
spfNav.handleLoadRedirect_ = function (isPrefetch, options, info, redirectUrl) {
  var redirectFn = isPrefetch ? spfNav.prefetch_ : spfNav.load_
  // Note that POST is not propagated with redirects.
  // Only copy callback keys to into a new object to enforce this.
  var keys = [
    spfNav.Callback.ERROR,
    spfNav.Callback.REQUEST,
    spfNav.Callback.PART_PROCESS,
    spfNav.Callback.PART_DONE,
    spfNav.Callback.PROCESS,
    spfNav.Callback.DONE
  ]
  var redirectOpts = /** @type {spfBase.RequestOptions} */ ({})
  spfArray.each(keys, function (key) {
    redirectOpts[key] = options[key]
  })
  redirectFn(redirectUrl, redirectOpts, info)
}

/**
 * Process a SPF response on the current page outside of a navigation flow.
 *
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The SPF response
 *     object to process.
 * @param {function((spfBase.SingleResponse|spfBase.MultipartResponse))=} opt_callback
 *     Function to execute when processing is done; the argument is
 *     the `response`.
 */
spfNav.process = function (response, opt_callback) {
  var url = window.location.href
  var multipart = response['type'] == 'multipart'
  var done = function (index, max, _, resp) {
    if (index == max && opt_callback) {
      opt_callback(resp)
    }
  }
  if (multipart) {
    var parts = response['parts']
    var max = parts.length - 1
    spfArray.each(parts, function (part, index) {
      var fn = spfBase.bind(done, null, index, max)
      spfNavResponse.process(url, part, null, fn)
    })
  } else {
    response = /** @type {spfBase.SingleResponse} */ (response)
    var fn = spfBase.bind(done, null, 0, 0)
    spfNavResponse.process(url, response, null, fn)
  }
}

/**
 * Dispatches the "error" event with the following custom event detail:
 *   url: The current URL.
 *   err: The Error object.
 *
 * If a local "onError" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The history URL.
 * @param {Error} err The Error object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @param {XMLHttpRequest=} opt_xhr The XMLHttpRequest for current error
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchError_ = function (url, err, opt_options, opt_noEvents,
                                  opt_xhr) {
  var detail = {'url': url, 'err': err, 'xhr': opt_xhr}
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  var fn = options[spfNav.Callback.ERROR]
  var proceed = spfNav.callback(fn, detail)
  if (proceed && !opt_noEvents) {
    proceed = spfBase.dispatch(spfBase.EventName.ERROR, detail)
  }
  return proceed
}

/**
 * Dispatches the "reload" event with the following custom event detail:
 *   url: The current URL.
 *   reason: The reason code and text explaining the reload.
 *
 * @param {string} url The target URL which is being reloaded.
 * @param {string} reason The reason code causing the reload.
 * @private
 */
spfNav.dispatchReload_ = function (url, reason) {
  var detail = {'url': url, 'reason': reason}
  spfBase.dispatch(spfBase.EventName.RELOAD, detail)
}

/**
 * Dispatches the "click" event with the following custom event detail:
 *   url: The click URL, without the SPF identifier.
 *   target: The click target.
 *
 * @param {string} url The click URL, without the SPF identifier.
 * @param {EventTarget} target The click target.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchClick_ = function (url, target) {
  var detail = {'url': url, 'target': target}
  return spfBase.dispatch(spfBase.EventName.CLICK, detail)
}

/**
 * Dispatches the "history" event with the following custom event detail:
 *   url: The click URL, without the SPF identifier.
 *   referer: The referring page URL, without the SPF identifier.
 *   previous: The previously visible page URL, without the SPF identifier.
 *
 * @param {string} url The click URL, without the SPF identifier.
 * @param {string=} opt_referer The referer URL.
 * @param {string=} opt_previous The previously visible URL.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchHistory_ = function (url, opt_referer, opt_previous) {
  var detail = {'url': url, 'referer': opt_referer, 'previous': opt_previous}
  return spfBase.dispatch(spfBase.EventName.HISTORY, detail)
}

/**
 * Dispatches the "request" event with the follow custom event detail:
 *   url: The URL to request, without the SPF identifier.
 *   referer: The referring page URL, without the SPF identifier.
 *   previous: The previously visible page URL, without the SPF identifier.
 *
 * If a local "onRequest" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The URL to request, without the SPF identifier.
 * @param {string|undefined} referer The referer URL.
 * @param {string|undefined} previous The previously visible URL.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchRequest_ = function (url, referer, previous, opt_options,
                                    opt_noEvents) {
  var detail = {'url': url, 'referer': referer, 'previous': previous}
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  var fn = options[spfNav.Callback.REQUEST]
  var proceed = spfNav.callback(fn, detail)
  if (proceed && !opt_noEvents) {
    proceed = spfBase.dispatch(spfBase.EventName.REQUEST, detail)
  }
  return proceed
}

/**
 * Dispatches the "part process" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   part: The partial response object, a part of a multipart response.
 *
 * If a local "onPartProcess" callback is provided, it is executed first with
 * the same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object,
 *     part of a multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchPartProcess_ = function (url, partial, opt_options,
                                        opt_noEvents) {
  var detail = {'url': url, 'part': partial}
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  var fn = options[spfNav.Callback.PART_PROCESS]
  var proceed = spfNav.callback(fn, detail)
  if (proceed && !opt_noEvents) {
    proceed = spfBase.dispatch(spfBase.EventName.PART_PROCESS, detail)
  }
  return proceed
}

/**
 * Dispatches the "part done" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   part: The partial response object, a part of a multipart response.
 *
 * If a local "onPartDone" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse} partial The partial response object,
 *     part of a multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchPartDone_ = function (url, partial, opt_options, opt_noEvents) {
  var detail = {'url': url, 'part': partial}
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  var fn = options[spfNav.Callback.PART_DONE]
  var proceed = spfNav.callback(fn, detail)
  if (proceed && !opt_noEvents) {
    proceed = spfBase.dispatch(spfBase.EventName.PART_DONE, detail)
  }
  return proceed
}

/**
 * Dispatches the "process" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   response: The response object, either a single or multipart response.
 *
 * If a local "onProcess" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchProcess_ = function (url, response, opt_options, opt_noEvents) {
  var detail = {'url': url, 'response': response}
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  var fn = options[spfNav.Callback.PROCESS]
  var proceed = spfNav.callback(fn, detail)
  if (proceed && !opt_noEvents) {
    proceed = spfBase.dispatch(spfBase.EventName.PROCESS, detail)
  }
  return proceed
}

/**
 * Dispatches the "done" event with the follow custom event detail:
 *   url: The requested URL, without the SPF identifier.
 *   response: The response object, either a single or multipart response.
 *
 * If a local "onDone" callback is provided, it is executed first with the
 * same detail object.  If the callback is canceled, the event is not fired.
 *
 * @param {string} url The requested URL, without the SPF identifier.
 * @param {spfBase.SingleResponse|spfBase.MultipartResponse} response The response
 *     object, either a complete single or multipart response object.
 * @param {?spfBase.RequestOptions=} opt_options Optional request options object.
 * @param {boolean=} opt_noEvents Whether to skip the event and only execute the
 *     callback; for use with load and prefetch requests.
 * @return {boolean} False if the event was canceled.
 * @private
 */
spfNav.dispatchDone_ = function (url, response, opt_options, opt_noEvents) {
  var detail = {'url': url, 'response': response}
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  var fn = options[spfNav.Callback.DONE]
  var proceed = spfNav.callback(fn, detail)
  if (proceed && !opt_noEvents) {
    proceed = spfBase.dispatch(spfBase.EventName.DONE, detail)
  }
  return proceed
}

/**
 * Generate the promote key given a url.
 *
 * @param {string} url The url of the request.
 * @return {string} The promote key.
 */
spfNav.promoteKey = function (url) {
  return 'promote ' + spfUrl.absolute(url)
}

/**
 * Generate the preprocess key given a url.
 *
 * @param {string} url The url of the request.
 * @return {string} The preprocess key.
 */
spfNav.preprocessKey = function (url) {
  return 'preprocess ' + spfUrl.absolute(url)
}

/**
 * Add a prefetch request to the set of ongoing prefetches.
 *
 * @param {string} url The url of the prefetch request.
 * @param {XMLHttpRequest} xhr The prefetch request object.
 */
spfNav.addPrefetch = function (url, xhr) {
  spfDebug.debug('nav.addPrefetch ', url, xhr)
  var absoluteUrl = spfUrl.absolute(url)
  var prefetches = spfNav.prefetches_()
  prefetches[absoluteUrl] = xhr
}

/**
 * Cancels a single prefetch request and removes it from the set.
 *
 * @param {string} url The url of the prefetch to be aborted.
 */
spfNav.removePrefetch = function (url) {
  spfDebug.debug('nav.removePrefetch ', url)
  var absoluteUrl = spfUrl.absolute(url)
  var prefetches = spfNav.prefetches_()
  var prefetchXhr = prefetches[absoluteUrl]
  if (prefetchXhr) {
    prefetchXhr.abort()
  }
  delete prefetches[absoluteUrl]
}

/**
 * Cancels all ongoing prefetch requests, optionally skipping the given url.
 *
 * @param {string=} opt_skipUrl A url of the request that should not
 *     be canceled.
 */
spfNav.cancelAllPrefetchesExcept = function (opt_skipUrl) {
  spfDebug.debug('nav.cancelAllPrefetchesExcept', opt_skipUrl)
  var prefetches = spfNav.prefetches_()
  var absoluteUrl = opt_skipUrl && spfUrl.absolute(opt_skipUrl)
  for (var key in prefetches) {
    if (absoluteUrl != key) {
      spfNav.removePrefetch(key)
    }
  }
}

/**
 * Clears all resource timings for the page.
 *
 * @private
 */
spfNav.clearResourceTimings_ = (function () {
  var clearResourceTimings = window.performance && (
      window.performance.clearResourceTimings ||
      window.performance['webkitClearResourceTimings'] ||
      window.performance['mozClearResourceTimings'] ||
      window.performance['msClearResourceTimings'] ||
      window.performance['oClearResourceTimings'])
  if (clearResourceTimings) {
    return spfBase.bind(clearResourceTimings, window.performance)
  }
  return spfBase.nullFunction
})()

/**
 * @param {!Object.<string, XMLHttpRequest>=} opt_reqs
 *     Optional set of requests to overwrite the current value.
 * @return {!Object.<string, XMLHttpRequest>} Current map
 *     of requests.
 * @private
 */
spfNav.prefetches_ = function (opt_reqs) {
  if (opt_reqs || !spfState.has(spfState.Key.NAV_PREFETCHES)) {
    return /** @type {!Object.<string, XMLHttpRequest>} */ (
        spfState.set(spfState.Key.NAV_PREFETCHES, (opt_reqs || {})))
  }
  return /** @type {!Object.<string, XMLHttpRequest>} */ (
      spfState.get(spfState.Key.NAV_PREFETCHES))
}

/**
 * @return {Array.<number>} The saved scroll position.
 * @private
 */
spfNav.getScrollTempPosition_ = function () {
  var position = /** @type {?Array.<number>} */ (
      spfState.get(spfState.Key.NAV_SCROLL_TEMP_POSITION)) || null
  var url = /** @type {?string} */ (
      spfState.get(spfState.Key.NAV_SCROLL_TEMP_URL)) || ''
  if (position && url == window.location.href) {
    return position
  }
  return null
}

/**
 * @private
 */
spfNav.setScrollTempPosition_ = function () {
  var position = [window.pageXOffset, window.pageYOffset]
  spfDebug.debug('    saving scroll temp position', position)
  spfState.set(spfState.Key.NAV_SCROLL_TEMP_POSITION, position)
  spfState.set(spfState.Key.NAV_SCROLL_TEMP_URL, window.location.href)
}

/**
 * @private
 */
spfNav.clearScrollTempPosition_ = function () {
  spfState.set(spfState.Key.NAV_SCROLL_TEMP_POSITION, null)
  spfState.set(spfState.Key.NAV_SCROLL_TEMP_URL, null)
}

/**
 * Detects touch-capable platforms.
 *
 * @return {boolean} True if this is a touch capable platform.
 * @private
 */
spfNav.isTouchCapablePlatform_ = function () {
  return ('ontouchstart' in window || window.navigator['maxTouchPoints'] > 0 ||
      window.navigator['msMaxTouchPoints'] > 0)
}

/**
 * @param {spfBase.RequestOptions=} opt_options The request options object.
 * @return {spfBase.RequestOptions}
 * @private
 */
spfNav.createOptions_ = function (opt_options) {
  var options = opt_options || /** @type {spfBase.RequestOptions} */ ({})
  return options
}

/**
 * Type definition for an object literal argument to {@link spfNav.Info}.
 *
 * @typedef {{
 *   current: (string|undefined),
 *   history: (boolean|undefined),
 *   original: (string|undefined),
 *   position: (Array.<number>|undefined),
 *   referer: (string|undefined),
 *   reverse: (boolean|undefined),
 *   scrolled: (boolean|undefined),
 *   type: (string|undefined)
 * }}
 * @private
 */
spfNav.Info_

/**
 * Data to track information about an SPF navigation.
 *
 * @param {(spfNav.Info|spfNav.Info_)=} opt_info A navigation info object.
 * @constructor
 * @struct
 */
spfNav.Info = function (opt_info) {
  opt_info = opt_info || /** @type {spfNav.Info_} */ ({})
  /**
   * The current page URL. This differs from `referer` in that is always
   * represents the current visible page regardless of history state.
   * @type {string}
   */
  // The current URL will have already changed for history events, so for this
  // case, the opt_info.current value from the history state should be used.
  this.current = (opt_info.history && opt_info.current)
                     ? opt_info.current : window.location.href
  /**
   * Whether this navigation is part of a history change. True when navigation
   * is in response to a popState event.
   * @type {boolean}
   */
  this.history = !!opt_info.history
  /**
   * The original request URL. This may differ than the regular URL for
   * redirect responses.
   * @type {string}
   */
  this.original = opt_info.original || ''
  /**
   * The window position to scroll to during navigation, in [x, y] format.
   * Should be defined when navigation is in response to a popState event and a
   * value exists in the history state object.
   * @type {Array.<number>}
   */
  this.position = opt_info.position || null
  /**
   * The referring page URL.
   * @type {string}
   */
  // The referer is stored in the history entry state object to allow the
  // correct value to be sent to the server during back/forward.
  // Compare against "undefined" to allow empty referer values in history.
  this.referer = (opt_info.referer != undefined)
                     ? opt_info.referer : window.location.href
  /**
   * Whether this navigation is going "backwards". True when navigation
   * is in response to a popState event and the "back" button is clicked.
   * @type {boolean}
   */
  this.reverse = !!opt_info.reverse
  /**
   * Whether the window has been scrolled to `position` or to the top during
   * this navigation request.
   * @type {boolean}
   */
  this.scrolled = !!opt_info.scrolled
  /**
   * The type of request, one of the following: "navigate", "navigate-back",
   * "navigate-forward", "load", "prefetch".  If not yet determined (i.e. before
   * the request is sent), it will be an empty string.
   * @type {string}
   */
  this.type = opt_info.type || ''
}

/**
 * @enum {string}
 */
spfNav.Callback = {
  ERROR: 'onError',
  REQUEST: 'onRequest',
  PART_PROCESS: 'onPartProcess',
  PART_DONE: 'onPartDone',
  PROCESS: 'onProcess',
  DONE: 'onDone'
}

/**
 * @enum {string}
 */
spfNav.ReloadReason = {
  INELIGIBLE: (!SPF_DEBUG) ? '1'
      : '1: Navigation not initialized or limit reached.',
  REQUEST_CANCELED: (!SPF_DEBUG) ? '2'
      : '2: Navigation canceled by the request event.',
  PART_PROCESS_CANCELED: (!SPF_DEBUG) ? '3'
      : '3: Navigation canceled by the partprocess event.',
  PROCESS_CANCELED: (!SPF_DEBUG) ? '4'
      : '4: Navigation canceled by the process event.',
  RESPONSE_RECEIVED: (!SPF_DEBUG) ? '5'
      : '5: Reload response received.',
  FORBIDDEN: (!SPF_DEBUG) ? '9'
      : '9: Destination forbidden by same-origin security.',
  ERROR: (!SPF_DEBUG) ? '10'
      : '10: An uncaught error occurred processing.'
}

export default spfNav
