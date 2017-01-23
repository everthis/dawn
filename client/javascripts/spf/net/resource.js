// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for loading and unloading external resources such
 * as scripts and stylesheets.
 * See {@link spfBase.net.script} and {@link spfBase.net.style}.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfNetResource');
// goog.provide('spfNetResource.name');
// goog.provide('spfNetResource.status');
// goog.provide('spfNetResource.url');

import {spfBase, SPF_BOOTLOADER, SPF_DEBUG} from '../base';
import spfArray from '../array/array';
import spfDebug from '../debug/debug';
import spfDom from '../dom/dom';
import spfDomClasslist from '../dom/classlist';
import spfPubsub from '../pubsub/pubsub';
import spfState from '../state';
import spfString from '../string/string';
import spfTasks from '../tasks/tasks';
import spfTracing from '../tracing/tracing';
import spfUrl from '../url/url';

let spfNetResource = {};
spfNetResource.status = spfNetResource.status || {};
spfNetResource.name = spfNetResource.name || {};
spfNetResource.url = spfNetResource.url || {};

/**
 * Loads a resource asynchronously and optionally defines a name to use for
 * dependency management and unloading.  See {@link #unload} to remove
 * previously loaded resources.
 *
 * NOTE: Automatic unloading of stylesheets depends on "onload" support and is
 * best effort.  Chrome 19, Safari 6, Firefox 9, Opera and IE 5.5 are supported.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource to load.
 * @param {string} name Name to identify the resource.
 * @param {Function=} opt_fn Optional callback function to execute when the
 *     resource is loaded.
 */
spfNetResource.load = function(type, url, name, opt_fn) {
  spfDebug.debug('resource.load', type, url, name);
  var isJS = type == spfNetResource.Type.JS;

  url = spfNetResource.canonicalize(type, url);

  // Calling load without a name or with an empty string for a name isn't
  // officially supported, but if it happens, use a pseudonym to allow the
  // the resource to load and fire the callback.
  var pseudonym = name || '^' + url;
  var topic = spfNetResource.key(type, pseudonym);
  var prevUrl;

  // If a name is provided with a different URL, then also unload the previous
  // version after the resource is loaded.
  //
  // NOTE: When built for the bootloader, automatic unloading of scripts is not
  // supported.  If someone is attempting to load a new version of a script
  // before loading the main SPF code, then this should be an error.  Automatic
  // unloading of scripts is primarily intended for navigation between versions.
  if (name && !SPF_BOOTLOADER) {
    // If loading a new resource for a name, handle unloading the previous one.
    prevUrl = spfNetResource.url.get(type, name);
    if (prevUrl && url != prevUrl) {
      var evt = isJS ? spfBase.EventName.JS_BEFORE_UNLOAD :
                       spfBase.EventName.CSS_BEFORE_UNLOAD;
      spfBase.dispatch(evt, {'name': name, 'url': prevUrl});
      spfNetResource.unloadPrepare_(type, name, prevUrl);
      // Wait until the new resource has finished loading before destroying
      // the previous one to avoid flashes of unstyled content w/ CSS.
      var unloadComplete = spfBase.bind(spfNetResource.unloadComplete_, null,
                                    type, name, prevUrl);
      spfPubsub.subscribe(topic, unloadComplete);
    }
  }

  // Associate the name/pseudonym with the resource for tracking name changes.
  // Associate the resource with the name/pseudonym for unloading + callbacks.
  var prevName = spfNetResource.name.get(type, url);
  if (prevName && pseudonym != prevName) {
    // If changing names for this resource, remove the existing
    // name-to-resource and resource-to-name mappings (which are re-set just
    // below), and then transfer any callbacks.
    spfNetResource.url.clear(type, prevName);
    spfNetResource.name.clear(type, url);
    var prevTopic = spfNetResource.key(type, prevName);
    spfPubsub.rename(prevTopic, topic);
  }
  spfNetResource.name.set(type, url, pseudonym);
  spfNetResource.url.set(type, pseudonym, url);

  // Subscribe the callback to execute when the url is loaded.
  spfDebug.debug('  subscribing callback', topic);
  spfPubsub.subscribe(topic, opt_fn);
  var check = spfBase.bind(spfNetResource.check, null, type);

  // If a status exists, the resource is already loading or loaded.
  // Otherwise, create the resource.
  if (spfNetResource.status.get(type, url)) {
    if (prevName && pseudonym != prevName) {
      // If changing names for this resource and it's already loaded, find
      // it and update the name attribute to keep the DOM in sync.
      var el = spfNetResource.find(type, url);
      if (el) {
        el.setAttribute('name', name || '');
      }
    }
    check();
  } else {
    // If prevUrl is defined and the type is CSS, the styleshet will be loaded
    // in-place. This works because previous elements aren't destroyed until
    // loading is complete.
    var el = spfNetResource.create(type, url, check, undefined, undefined,
        prevUrl);
    if (el && name) {
      el.setAttribute('name', name);
    }
  }
};


/**
 * Unloads resources identified by dependency name.  See {@link #load}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 */
spfNetResource.unload = function(type, name) {
  spfDebug.warn('resource.unload', type, name);
  var url = spfNetResource.url.get(type, name);
  spfNetResource.unloadPrepare_(type, name, url);
  spfNetResource.unloadComplete_(type, name, url);
};


/**
 * See {@link #unload}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @param {string|undefined} url The URL.
 * @private
 */
spfNetResource.unloadPrepare_ = function(type, name, url) {
  spfDebug.debug('  > resource.unloadPrepare_', type, url);
  // Clear the dependency name to URL mapping.
  spfNetResource.url.clear(type, name);
  // Clear the URL to dependency name mapping.
  if (url) {
    spfNetResource.name.clear(type, url);
  }
  var topic = spfNetResource.key(type, name);
  spfDebug.debug('  clearing callbacks for', topic);
  // Clear any pending callbacks for the dependency name.
  spfPubsub.clear(topic);
};


/**
 * See {@link #unload}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @param {string|undefined} url The URL.
 * @private
 */
spfNetResource.unloadComplete_ = function(type, name, url) {
  var isJS = type == spfNetResource.Type.JS;
  if (url) {
    spfDebug.debug('  > resource.unloadComplete_', type, url);
    var evt = isJS ? spfBase.EventName.JS_UNLOAD :
                     spfBase.EventName.CSS_UNLOAD;
    spfBase.dispatch(evt, {'name': name, 'url': url});
    spfNetResource.destroy(type, url);
  }
};


/**
 * Executes any pending callbacks possible by checking if any URLs for names
 * of a given type have loaded.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 */
spfNetResource.check = function(type) {
  spfDebug.debug('resource.check', type);
  var prefix = spfNetResource.key(type, '');
  for (var topic in spfPubsub.subscriptions) {
    if (topic.indexOf(prefix) == 0) {
      var names = topic.substring(prefix.length).split('|');
      var loaded = spfBase.bind(spfNetResource.url.loaded, null, type);
      var ready = spfArray.every(names, loaded);
      spfDebug.debug(' ', topic, '->', names, '=', ready);
      if (ready) {
        spfDebug.debug('  publishing', topic);
        // Because check evaluates the pubsub.subscriptions array to determine
        // if urls for names are loaded, there is a potential subscribe/publish
        // infinite loop:
        //     require_ -> load (subscribe) -> check (publish) ->
        //     load (subscribe) -> <loop forever> ...
        // To avoid this, use flush instead of publish + clear to ensure that
        // previously subscribed functions are removed before execution:
        //     require_ -> load (subscribe) -> check (flush) -> <no loop>
        spfPubsub.flush(topic);
      }
    }
  }
};


/**
 * Adds a resource to the page by creating an element and appending it to
 * the document.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {Function=} opt_callback Callback for when the resource has loaded.
 * @param {Document=} opt_document Optional document to use.
 * @param {string=} opt_statusGroup Optional group to use in status tracking.
 * @param {string=} opt_prevUrl Optional URL of the previous version of this
 *     resource. Used for stylesheets to load new versions in-place to prevent
*      changing the order of the cascade.
 * @return {Element} The dynamically created element.
 */
spfNetResource.create = function(type, url, opt_callback, opt_document,
    opt_statusGroup, opt_prevUrl) {
  spfDebug.debug('resource.create', type, url, 'loading');
  // When built for the bootloader, always assume JS is being loaded.
  var isJS = SPF_BOOTLOADER || type == spfNetResource.Type.JS;
  url = spfNetResource.canonicalize(type, url);
  spfNetResource.status.set(spfNetResource.State.LOADING,
                              type, url, opt_statusGroup);
  var tag = isJS ? 'script' : 'link';
  var doc = opt_document || document;
  var el = doc.createElement(tag);
  var next = function() {
    spfDebug.debug('resource.create', type, url, 'done');
    // Only update status if the resource has not been removed in the interim.
    if (spfNetResource.status.get(type, url, opt_statusGroup)) {
      spfDebug.debug('resource.create', type, url, 'loaded');
      spfNetResource.status.set(spfNetResource.State.LOADED,
                                  type, url, opt_statusGroup);
    }
    if (isJS && el && el.parentNode && doc == document && !SPF_DEBUG) {
      // Remove scripts afterwards to avoid unnecessary increased DOM size.
      el.parentNode.removeChild(el);
    }
    // IE 10 has a bug where it will synchronously call load handlers for
    // cached resources, force this to be async for consistency.
    if (opt_callback) {
      setTimeout(opt_callback, 0);
    }
    return null;
  };
  if (!url) {
    return next();
  }
  var label = spfNetResource.label(url);
  el.className = spfNetResource.key(type, label);
  // Chrome, Safari, Firefox, Opera and IE 9 support script onload.
  // Chrome 19, Safari 6, Firefox 9, Opera and IE 5.5 support stylesheet onload.
  // To support scripts IE 8 and below, use script onreadystatechange.
  if ('onload' in el) {
    el.onerror = el.onload = next;
  } else {
    el.onreadystatechange = function() {
      // For IE 8 and below, script readyState will be one of the following:
      // * uninitialized
      // * loading
      // * loaded
      // * interactive
      // * complete
      // Match either "loaded" or "complete" to provide the equivalent of
      // script onload.  (Note that "interactive" can be skipped).
      if (/^c|loade/.test(el.readyState)) {
        next();
      }
    };
  }
  // For scripts, set the onload and onreadystatechange handlers before
  // setting the src to avoid potential IE bug where handlers are not called.
  // Prefer placing resources in the head instead of the body to avoid errors
  // when called from the head in the first place.
  var targetEl = doc.getElementsByTagName('head')[0] || doc.body;
  if (isJS) {
    el.async = true;
    el.src = url;
    // Use insertBefore for JS to avoid IE execution errors.
    targetEl.insertBefore(el, targetEl.firstChild);
  } else {
    el.rel = 'stylesheet';
    el.href = url;
    // If this stylesheet already exists under a different URL,
    // reload it in-place to prevent changing the order of the cascade.
    // It is only reloaded it in-place if it already exists in the head,
    // otherwise the new element is appended.
    var prevEl = opt_prevUrl ?
        spfNetResource.find(type, opt_prevUrl, targetEl) : null;
    if (prevEl) {
      targetEl.insertBefore(el, prevEl);
    } else {
      targetEl.appendChild(el);
    }
  }
  return el;
};


/**
 * Removes a resource by removing a previously created element that was
 * appended to the document.  See {@link #create}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {Document=} opt_document Optional document to use.
 */
spfNetResource.destroy = function(type, url, opt_document) {
  url = spfNetResource.canonicalize(type, url);
  var el = spfNetResource.find(type, url, opt_document);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  spfNetResource.status.clear(type, url);
};


/**
 * Finds a previously created element.
 * See {@link #create}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {(Document|Element)=} opt_root Optional document or element to
 *     search in.
 * @return {!Node|undefined} The found element, or undefined if not found.
 */
spfNetResource.find = function(type, url, opt_root) {
  var label = spfNetResource.label(url);
  var cls = spfNetResource.key(type, label);
  var selector = '.' + cls;
  var els = spfDom.query(selector, opt_root);
  return els[0];
};


/**
 * Discovers existing resources in the document and registers them as loaded.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @return {Array.<Node>|NodeList} The newly found elements.
 */
spfNetResource.discover = function(type) {
  spfDebug.debug('resource.discover', type);
  var isJS = type == spfNetResource.Type.JS;
  var selector = isJS ? 'script[src]' : 'link[rel~="stylesheet"]';
  var els = [];
  spfArray.each(spfDom.query(selector), function(el) {
    var url = isJS ? el.src : el.href;
    url = spfNetResource.canonicalize(type, url);
    // Ignore if already loading or loaded.
    if (!spfNetResource.status.get(type, url)) {
      spfNetResource.status.set(spfNetResource.State.LOADED, type, url);
      var label = spfNetResource.label(url);
      var cls = spfNetResource.key(type, label);
      spfDomClasslist.add(el, cls);
      var name = el.getAttribute('name');
      if (name) {
        spfNetResource.name.set(type, url, name);
        spfNetResource.url.set(type, name, url);
      }
      els.push(el);
      spfDebug.debug('  found', url, cls, name);
    }
  });

  var contentSelector = isJS ? 'script[name]' : 'style[name]';
  var str = '';
  var id = '';
  var name = '';
  var label = '';
  var cls = '';
  spfArray.each(spfDom.query(contentSelector), function(el) {

    name = el.getAttribute('name');
    if (name) {
      str = el.innerText.replace(/(\r\n|\n|\r)/gm,"");

      // Use a hashcode to identify the resource instead of a URL.
      id = 'hash-' + spfString.hashcode(str.replace(/\s/g, ''));

      // Ignore if already loading or loaded.
      if (!spfNetResource.status.get(type, id)) {
        spfNetResource.status.set(spfNetResource.State.LOADED, type, id);

        spfNetResource.url.set(type, name, id);


        label = spfNetResource.label(id);
        cls = spfNetResource.key(type, label);
        el.className = cls;
        el.setAttribute('name', name);

        els.push(el);

      }

    }

  });


  return els;
};


/**
 * Prefetches a resource by creating a dummy element and appending it to an
 * iframe document.  The resource will be requested but not loaded. Use to
 * prime the browser cache and avoid needing to request the resource when
 * subsequently loaded.  See {@link #get}.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {boolean=} opt_force Whether to force fetching the resource even if
 *     it has already been fetched before; useful for preconnect when the
 *     connection keep-alive is shorter than repeat attempt intervals.
 */
spfNetResource.prefetch = function(type, url, opt_force) {
  if (!url) {
    return;
  }
  url = spfNetResource.canonicalize(type, url);
  // Skip fetching if the element is already loaded on the page, unless
  // opt_force is specified.
  if (!opt_force && spfNetResource.status.get(type, url)) {
    return;
  }
  // If opt_force is specified, tracking whether the element exists is unneeded,
  // and if prefetching an image (e.g. for URL preconnection), the standard DOM
  // logic is also unneeded.  In this case, use the simpler/faster Image object.
  if (opt_force && type == spfNetResource.Type.IMG) {
    spfNetResource.preconnect_(url);
    return;
  }
  var label = spfNetResource.label(url);
  var id = spfNetResource.key(type, label);
  var key = spfNetResource.key(type, 'prefetch');
  var el = /** @type {HTMLIFrameElement} */ (document.getElementById(key));
  if (!el) {
    el = spfDom.createIframe(key, null, function(el) {
      // Use the title attribute as the iframe's loaded flag.
      el.title = key;
      spfTasks.run(key, true);
    });
  } else {
    // Return if the resource is already prefetched, unless opt_force is
    // specified.
    if (!opt_force && el.contentWindow.document.getElementById(id)) {
      return;
    }
  }
  // Firefox needs the iframe to be fully created in the DOM before continuing.
  // So delay adding elements to the iframe until onload.
  var next = spfBase.bind(spfNetResource.prefetch_, null, el, type, url, id, key);
  if (!el.title) {
    spfTasks.add(key, next);
  } else {
    next();
  }
};


/**
 * See {@link #prefetch}.
 *
 * @param {HTMLIFrameElement} el The iframe to load resources in.
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url URL of the resource.
 * @param {string} id The computed unique id of the resource.
 * @param {string} group The group value to use when tracking these resources.
 * @private
 */
spfNetResource.prefetch_ = function(el, type, url, id, group) {
  var isJS = type == spfNetResource.Type.JS;
  var isCSS = type == spfNetResource.Type.CSS;
  var doc = el.contentWindow.document;
  // If an element with a given id already exists, remove it before prefetching
  // the resource to avoid growing the overall DOM size.  Since `prefetch`
  // already checks for the element's existence before calling this method,
  // this is to prevent repeated calls with `opt_force` from always generating
  // new nodes.
  var fetchEl = doc.getElementById(id);
  if (fetchEl) {
    fetchEl.parentNode.removeChild(fetchEl);
  }
  if (isJS) {
    fetchEl = doc.createElement('object');
    if (spfNetResource.IS_IE) {
      // IE needs a <script> in order to complete the request, but
      // fortunately will not execute it unless in the DOM.  Attempting to
      // use an <object> like other browsers will cause the download to hang.
      // The <object> will just be a placeholder for the request made.
      var extraElForIE = doc.createElement('script');
      extraElForIE.src = url;
    } else {
      // Otherwise scripts need to be prefetched as objects to avoid execution.
      fetchEl.data = url;
    }
    fetchEl.id = id;
    doc.body.appendChild(fetchEl);
  } else if (isCSS) {
    // Stylesheets can be prefetched in the same way as loaded.
    fetchEl = spfNetResource.create(type, url, null, doc, group);
    fetchEl.id = id;
  } else {
    // For establishing a preconnection, use an image request.
    fetchEl = doc.createElement('img');
    if (spfNetResource.IS_IE) {
      // IE needs page-level cache busting to properly re-request images, but
      // not network-level.  Use URL hashes to trick it into re-sending.
      url = url + '#' + spfBase.now();
    }
    fetchEl.src = url;
    fetchEl.id = id;
    doc.body.appendChild(fetchEl);
  }
};


/**
 * See {@link #prefetch}.
 *
 * @param {string} url URL of the resource.
 * @private
 */
spfNetResource.preconnect_ = function(url) {
  // For establishing a preconnection, use an image request.  When the DOM logic
  // is not needed to track status, use the simpler/faster object approach.
  var img = new Image();
  if (spfNetResource.IS_IE) {
    // IE needs page-level cache busting to properly re-request images, but
    // not network-level.  Use URL hashes to trick it into re-sending.
    url = url + '#' + spfBase.now();
  }
  img.src = url;
};


/**
 * Evaluates resource text and defines a name to use for management.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} text The text of the resource.
 * @param {string} name Name to identify the resource.
 */
spfNetResource.eval = function(type, text, name) {
  var isJS = type == spfNetResource.Type.JS;
  var previous = spfNetResource.url.get(type, name);
  // Use a hashcode to identify the resource instead of a URL.
  var id = 'hash-' + spfString.hashcode(text.replace(/\s/g, ''));
  spfNetResource.url.set(type, name, id);
  var complete = spfNetResource.status.loaded(type, id);
  if (complete) {
    return;
  }
  var el = spfNetResource.exec(type, text);
  if (!el) {
    return;
  }
  spfNetResource.status.set(spfNetResource.State.LOADED, type, id);
  if (el && (!isJS || SPF_DEBUG)) {
    // Script elements are removed after execution, so only modify attributes
    // if a style or in debug mode.
    var label = spfNetResource.label(id);
    var cls = spfNetResource.key(type, label);
    el.className = cls;
    el.setAttribute('name', name);
  }
  previous = previous && previous[0];
  if (previous) {
    spfNetResource.destroy(type, previous);
  }
};


/**
 * Executes resource text by creating an element and appending it to
 * the document.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} text The text of the resource.
 * @return {Element} The dynamically created element.
 */
spfNetResource.exec = function(type, text) {
  text = spfString.trim(text);
  if (!text) {
    return null;
  }
  var isJS = type == spfNetResource.Type.JS;
  var targetEl = document.getElementsByTagName('head')[0] || document.body;
  var el;
  if (isJS) {
    el = document.createElement('script');
    el.text = text;
    // Place the scripts in the head instead of the body to avoid errors
    // when called from the head in the first place.
    targetEl.appendChild(el);
    if (!SPF_DEBUG) {
      // Remove scripts afterwards to avoid unnecessary increased DOM size.
      targetEl.removeChild(el);
    }
  } else {
    el = document.createElement('style');
    // IE requires the style element to be in the document before accessing
    // the StyleSheet object.
    targetEl.appendChild(el);
    if ('styleSheet' in el) {
      el.styleSheet.cssText = text;
    } else {
      el.appendChild(document.createTextNode(text));
    }
  }
  return el;
};


/**
 * Sets the path prefix or replacement map to use when resolving relative URLs.
 * See {@link #canonicalize}.
 *
 * Note: The order in which replacements are made is not guaranteed.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string|Object.<string>} paths The paths.
 */
spfNetResource.path = function(type, paths) {
  var key = /** @type {spfState.Key} */ (
      spfState.Key.RESOURCE_PATHS_PREFIX + type);
  spfState.set(key, paths);
};


/**
 * Convert a resource URL to the "canonical" version in three steps:
 *   1: replacing path segments (see {@link #path})
 *   2: appending a file type extension
 *   3: converting to absolute (see {@link spfUrl.absolute})
 * Absolute URLs (i.e. those that start with http://) are ignored for all
 * three steps.  Protocol-relative URLs (i.e. those that start with //)
 * are ignored for steps 1 and 2.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The initial url.
 * @return {string} The adjusted url.
 */
spfNetResource.canonicalize = function(type, url) {
  var key = /** @type {spfState.Key} */ (
      spfState.Key.RESOURCE_PATHS_PREFIX + type);
  if (url) {
    var index = url.indexOf('//');
    if (index < 0) {
      // Relative URL: "//" not found.
      if (spfString.startsWith(url, 'hash-')) {
        // Ignore hashcode IDs.
        return url;
      }
      var paths = spfState.get(key) || '';
      if (spfString.isString(paths)) {
        url = paths + url;
      } else {
        for (var p in paths) {
          url = url.replace(p, paths[p]);
        }
      }
      // Images don't have a standard extension format.
      if (type != spfNetResource.Type.IMG) {
        url = url.indexOf('.' + type) < 0 ? url + '.' + type : url;
      }
      url = spfUrl.absolute(url);
    } else if (index == 0) {
      // Protocol-Relative URL: "//" found at start.
      url = spfUrl.absolute(url);
    }
  }
  return url;
};


/**
 * Build the full resource key.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} label The resource label.
 * @param {string=} opt_group An optional group name for the resource.
 * @return {string} The compound key.
 */
spfNetResource.key = function(type, label, opt_group) {
  return type + '-' + label + (opt_group ? '-' + opt_group : '');
};


/**
 * Convert a URL to an internal "label" for use in identifying it.
 *
 * @param {?} url The resource URL.
 * @return {string} The label.
 */
spfNetResource.label = function(url) {
  return url ? String(url).replace(/[^\w]/g, '') : '';
};


/**
 * Sets the loading status for a resource URL.
 *
 * @param {spfNetResource.State} status The loading status.
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @param {string=} opt_group Optional group.
 */
spfNetResource.status.set = function(status, type, url, opt_group) {
  var key = spfNetResource.key(type, url, opt_group);
  spfNetResource.status_[key] = status;
};


/**
 * Returns the loading status for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @param {string=} opt_group Optional group.
 * @return {spfNetResource.State|undefined} The loading status.
 */
spfNetResource.status.get = function(type, url, opt_group) {
  var key = spfNetResource.key(type, url, opt_group);
  return spfNetResource.status_[key];
};


/**
 * Clears the previously set loading status for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 */
spfNetResource.status.clear = function(type, url) {
  var key = spfNetResource.key(type, url);
  delete spfNetResource.status_[key];
};


/**
 * Checks to see if the status for a resource URL is "loaded".
 * URLs that are empty strings are always "loaded".
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @return {boolean} Whether the URL is loaded.
 */
spfNetResource.status.loaded = function(type, url) {
  var status = spfNetResource.status.get(type, url);
  return url == '' || status == spfNetResource.State.LOADED;
};


/**
 * Sets the dependency name for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @param {string} name The dependency name.
 */
spfNetResource.name.set = function(type, url, name) {
  var key = spfNetResource.key(type, url);
  spfNetResource.name_[key] = name;
};


/**
 * Returns the dependency name currently set for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 * @return {string|undefined} The dependency name.
 */
spfNetResource.name.get = function(type, url) {
  var key = spfNetResource.key(type, url);
  return spfNetResource.name_[key];
};


/**
 * Clears the previously set dependency name for a resource URL.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} url The URL.
 */
spfNetResource.name.clear = function(type, url) {
  var key = spfNetResource.key(type, url);
  delete spfNetResource.name_[key];
};


/**
 * Sets the resource URL for a dependency name.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @param {string} url The URL.
 */
spfNetResource.url.set = function(type, name, url) {
  var key = spfNetResource.key(type, name);
  spfNetResource.url_[key] = url;
};


/**
 * Returns the resource URL currently set for a dependency name.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @return {string|undefined} The URL.
 */
spfNetResource.url.get = function(type, name) {
  var key = spfNetResource.key(type, name);
  var url = spfNetResource.url_[key];
  return url;
};


/**
 * Clears the previously set resource URL for a dependency name.
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 */
spfNetResource.url.clear = function(type, name) {
  var key = spfNetResource.key(type, name);
  delete spfNetResource.url_[key];
};


/**
 * Checks to see if the resource URL for a dependency name has been loaded.
 * Dependency names that are empty strings are always "loaded".
 *
 * @param {spfNetResource.Type} type Type of the resource.
 * @param {string} name The dependency name.
 * @return {boolean}
 */
spfNetResource.url.loaded = function(type, name) {
  var url = spfNetResource.url.get(type, name);
  return url != undefined && spfNetResource.status.loaded(type, url);
};


/**
 * Map a URL to a resource status.
 * @type {!Object.<spfNetResource.State>}
 * @private
 */
spfNetResource.status_ = {};


/**
 * Map a URL to a dependency name.
 * @type {!Object.<string>}
 * @private
 */
spfNetResource.name_ = {};


/**
 * Map a dependency name to a URL.
 * @type {!Object.<string>}
 * @private
 */
spfNetResource.url_ = {};


/**
 * Whether the browser is Internet Explorer; valid for MSIE 8+ aka Trident 4+.
 * @type {boolean}
 * @const
 */
spfNetResource.IS_IE = spfString.contains(navigator.userAgent, ' Trident/');


/**
 * The loading state of a resource.
 * @enum {number}
 */
spfNetResource.State = {
  LOADING: 1,
  LOADED: 2
};


/**
 * Supported resource types.
 * @enum {string}
 */
spfNetResource.Type = {
  CSS: 'css',
  IMG: 'img',
  JS: 'js'
};


// Automatic initiazation for spfNetResource.status_.
// When built for the bootloader, unconditionally set in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.RESOURCE_STATUS, spfNetResource.status_);
} else {
  if (!spfState.has(spfState.Key.RESOURCE_STATUS)) {
    spfState.set(spfState.Key.RESOURCE_STATUS, spfNetResource.status_);
  }
  spfNetResource.status_ =
      /** @type {!Object.<spfNetResource.State>} */ (
      spfState.get(spfState.Key.RESOURCE_STATUS));
}

// Automatic initiazation for spfNetResource.name_.
// When built for the bootloader, unconditionally set the map in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.RESOURCE_NAME, spfNetResource.name_);
} else {
  if (!spfState.has(spfState.Key.RESOURCE_NAME)) {
    spfState.set(spfState.Key.RESOURCE_NAME, spfNetResource.name_);
  }
  spfNetResource.name_ = /** @type {!Object.<string>} */ (
      spfState.get(spfState.Key.RESOURCE_NAME));
}

// Automatic initiazation for spfNetResource.url_.
// When built for the bootloader, unconditionally set the map in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.RESOURCE_URL, spfNetResource.url_);
} else {
  if (!spfState.has(spfState.Key.RESOURCE_URL)) {
    spfState.set(spfState.Key.RESOURCE_URL, spfNetResource.url_);
  }
  spfNetResource.url_ = /** @type {!Object.<string>} */ (
      spfState.get(spfState.Key.RESOURCE_URL));
}


if (spfTracing.ENABLED) {
  (function() {
    spfNetResource.load = spfTracing.instrument(
        spfNetResource.load, 'spfNetResource.load');
    spfNetResource.unload = spfTracing.instrument(
        spfNetResource.unload, 'spfNetResource.unload');
    spfNetResource.unload_ = spfTracing.instrument(
        spfNetResource.unload_, 'spfNetResource.unload_');
    spfNetResource.check = spfTracing.instrument(
        spfNetResource.check, 'spfNetResource.check');
    spfNetResource.create = spfTracing.instrument(
        spfNetResource.create, 'spfNetResource.create');
    spfNetResource.destroy = spfTracing.instrument(
        spfNetResource.destroy, 'spfNetResource.destroy');
    spfNetResource.discover = spfTracing.instrument(
        spfNetResource.discover, 'spfNetResource.discover');
    spfNetResource.prefetch = spfTracing.instrument(
        spfNetResource.prefetch, 'spfNetResource.prefetch');
    spfNetResource.prefetch_ = spfTracing.instrument(
        spfNetResource.prefetch_, 'spfNetResource.prefetch_');
    spfNetResource.eval = spfTracing.instrument(
        spfNetResource.eval, 'spfNetResource.eval');
    spfNetResource.exec = spfTracing.instrument(
        spfNetResource.exec, 'spfNetResource.exec');
    spfNetResource.path = spfTracing.instrument(
        spfNetResource.path, 'spfNetResource.path');
    spfNetResource.canonicalize = spfTracing.instrument(
        spfNetResource.canonicalize, 'spfNetResource.canonicalize');
    spfNetResource.key = spfTracing.instrument(
        spfNetResource.key, 'spfNetResource.key');
    spfNetResource.label = spfTracing.instrument(
        spfNetResource.label, 'spfNetResource.label');
    spfNetResource.status.set = spfTracing.instrument(
        spfNetResource.status.set, 'spfNetResource.status.set');
    spfNetResource.status.get = spfTracing.instrument(
        spfNetResource.status.get, 'spfNetResource.status.get');
    spfNetResource.status.clear = spfTracing.instrument(
        spfNetResource.status.clear, 'spfNetResource.status.clear');
    spfNetResource.status.loaded = spfTracing.instrument(
        spfNetResource.status.loaded, 'spfNetResource.status.loaded');
    spfNetResource.url.set = spfTracing.instrument(
        spfNetResource.url.set, 'spfNetResource.url.set');
    spfNetResource.url.get = spfTracing.instrument(
        spfNetResource.url.get, 'spfNetResource.url.get');
    spfNetResource.url.clear = spfTracing.instrument(
        spfNetResource.url.clear, 'spfNetResource.url.clear');
    spfNetResource.url.loaded = spfTracing.instrument(
        spfNetResource.url.loaded, 'spfNetResource.url.loaded');
  })();
}
 export default spfNetResource;
