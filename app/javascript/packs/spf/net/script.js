// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for dynamically loading scripts without blocking.
 *
 * Provides asynchronous loading and dependency management, loosely similar to
 * $script.js {@link https://github.com/ded/script.js/} but with enhancements.
 * Designed to be built as both a standlone bootstrap script loader in the
 * document head and also built as part of the main SPF code. When both the
 * bootstrap and main code is loaded on the same page, the main code extends
 * the bootstrap code for seamless script loading.
 *
 * Unconditionally load a script:
 *     spfNetScript.get(url, function() {
 *       // url is loaded
 *     });
 *
 * Conditionally load a script only if not already loaded:
 *     spfNetScript.load(url, 'name', function() {
 *       // url is loaded
 *     });
 * Or:
 *     spfNetScript.load(url, 'name');
 *     spfNetScript.ready('name', function() {
 *       // url is loaded
 *     });
 *
 * @author nicksay@google.com (Alex Nicksay)
 */
import {SPF_BOOTLOADER} from '../base';
import spfArray from '../array/array';
import spfDebug from '../debug/debug';
import spfNetResource from '../net/resource';
import spfPubsub from '../pubsub/pubsub';
import spfState from '../state';
import spfString from '../string/string';

// goog.provide('spfNetScript');
let spfNetScript = {};


/**
 * Loads a script asynchronously and defines a name to use for dependency
 * management and unloading.  See {@link #ready} to wait for named scripts to
 * be loaded and {@link #unload} to remove previously loaded scripts.
 *
 * - Subsequent calls to load the same URL will not reload the script.  To
 *   reload a script, unload it first with {@link #unload}.  To unconditionally
 *   load a script, see {@link #get}.
 *
 * - A name must be specified to identify the same script at different URLs.
 *   (For example, "main-A.js" and "main-B.js" are both "main".)  When a name
 *   is specified, all other scripts with the same name will be unloaded
 *   before the callback is executed.  This allows switching between
 *   versions of the same script at different URLs.
 *
 * - A callback can be specified to execute once the script has loaded.  The
 *   callback will be executed each time, even if the script is not reloaded.
 *
 * @param {string} url URL of the script to load.
 * @param {string} name Name to identify the script.
 * @param {Function=} opt_fn Optional callback function to execute when the
 *     script is loaded.
 */
spfNetScript.load = function(url, name, opt_fn) {
  var type = spfNetResource.Type.JS;
  spfNetResource.load(type, url, name, opt_fn);
};


/**
 * Unloads scripts identified by name.  See {@link #load}.
 *
 * NOTE: Unloading a script will prevent execution of ALL pending callbacks
 * but is NOT guaranteed to stop the browser loading a pending URL.
 *
 * @param {string} name The name.
 */
spfNetScript.unload = function(name) {
  var type = spfNetResource.Type.JS;
  spfNetResource.unload(type, name);
};


/**
 * Discovers existing scripts in the document and registers them as loaded.
 */
spfNetScript.discover = function() {
  var type = spfNetResource.Type.JS;
  spfNetResource.discover(type);
};


/**
 * Unconditionally loads a script by dynamically creating an element and
 * appending it to the document without regard for dependencies or whether it
 * has been loaded before.  A script directly loaded by this method cannot
 * be unloaded by name.  Compare to {@link #load}.
 *
 * @param {string} url URL of the script to load.
 * @param {Function=} opt_fn Function to execute when loaded.
 */
spfNetScript.get = function(url, opt_fn) {
  var type = spfNetResource.Type.JS;
  spfNetResource.create(type, url, opt_fn);
};


/**
 * Prefetchs one or more scripts; the scripts will be requested but not loaded.
 * Use to prime the browser cache and avoid needing to request the script when
 * subsequently loaded.  See {@link #load}.
 *
 * @param {string|Array.<string>} urls One or more URLs of scripts to prefetch.
 */
spfNetScript.prefetch = function(urls) {
  var type = spfNetResource.Type.JS;
  // Convert to an array if needed.
  urls = spfArray.toArray(urls);
  spfArray.each(urls, function(url) {
    spfNetResource.prefetch(type, url);
  });
};


/**
 * Waits for one or more scripts identified by name to be loaded and executes
 * the callback function.  See {@link #load} or {@link #done} to define names.
 * If an empty name is provided, it will be considered loaded immediately.
 *
 * @param {string|Array.<string>} names One or more names.
 * @param {Function=} opt_fn Callback function to execute when the
 *     scripts have loaded.
 * @param {Function=} opt_require Callback function to execute if names
 *     are specified that have not yet been defined/loaded.
 */
spfNetScript.ready = function(names, opt_fn, opt_require) {
  var type = spfNetResource.Type.JS;

  // Convert to an array if needed.
  names = spfArray.toArray(names);
  spfDebug.debug('script.ready', names);

  // Filter out empty names.
  names = spfArray.filter(names, function(name) {
    return !!name;
  });

  // Find unknown names.
  var unknown = [];
  spfArray.each(names, function(name) {
    if (spfNetResource.url.get(type, name) == undefined) {
      unknown.push(name);
    }
  });

  // Check if all urls for the names are loaded.
  var known = !unknown.length;
  if (opt_fn) {
    var loaded = spf.bind(spfNetResource.url.loaded, null, type);
    var ready = spfArray.every(names, loaded);
    if (known && ready) {
      // If ready, execute the callback.
      opt_fn();
    } else {
      // Otherwise, wait for them to be loaded.
      var topic = spfNetResource.key(type, names.sort().join('|'));
      spfDebug.debug('  subscribing', topic);
      spfPubsub.subscribe(topic, opt_fn);
    }
  }
  // If provided, call the require function to allow lazy-loading.
  if (opt_require && !known) {
    opt_require(unknown);
  }
};


/**
 * Notifies any waiting callbacks that `name` has completed loading.
 * Use with {@link #ready} for arbitrary readiness not directly tied to scripts.
 *
 * @param {string} name The ready name.
 */
spfNetScript.done = function(name) {
  var type = spfNetResource.Type.JS;
  spfNetResource.url.set(type, name, '');  // No associated URL.
  spfNetResource.check(type);
};


/**
 * "Ignores" a script load by canceling execution of a pending callback.
 *
 * Stops waiting for one or more scripts identified by name to be loaded and
 * cancels the pending callback execution.  The callback must have been
 * registered by {@link #load} or {@link #ready}.  If the callback was
 * registered by {@link #ready} and more than one name was provided, the same
 * names must be used here.
 *
 * @param {string|Array.<string>} names One or more names.
 * @param {Function} fn Callback function to cancel.
 */
spfNetScript.ignore = function(names, fn) {
  var type = spfNetResource.Type.JS;
  // Convert to an array if needed.
  names = spfArray.toArray(names);
  spfDebug.debug('script.ignore', names);
  var topic = spfNetResource.key(type, names.sort().join('|'));
  spfDebug.debug('  unsubscribing', topic);
  spfPubsub.unsubscribe(topic, fn);
};


/**
 * Recursively loads scripts identified by name, first loading
 * any dependendent scripts.  Use {@link #declare} to define dependencies.
 *
 * @param {string|Array.<string>} names One or more names.
 * @param {Function=} opt_fn Callback function to execute when the
 *     scripts have loaded.
 */
spfNetScript.require = function(names, opt_fn) {
  var type = spfNetResource.Type.JS;
  spfDebug.debug('script.require', names);

  // When built for the bootloader, automatic unloading of scripts is not
  // supported.  If someone is attempting to load a new version of a script
  // before loading the main SPF code, then this should be an error.  Automatic
  // unloading of scripts is primarily intended for navigation between versions.
  if (!SPF_BOOTLOADER) {
    // Convert to an array if needed.
    names = spfArray.toArray(names);
    spfArray.each(names, function(name) {
      if (name) {
        var url = spfNetScript.url_[name] || name;
        url = spfNetResource.canonicalize(type, url);
        var previous = spfNetResource.url.get(type, name);
        if (previous && url != previous) {
          spfNetScript.unrequire(name);
        }
      }
    });
  }

  spfNetScript.ready(names, opt_fn, spfNetScript.require_);
};


/**
 * See {@link #require}.
 *
 * @param {Array.<string>} names The names.
 * @private
 */
spfNetScript.require_ = function(names) {
  // Iterate and check if there are declared dependencies.
  // If so, check if the deps are ready and if not recurse.
  // If not, load the scripts for that name.
  spfArray.each(names, function(name) {
    var deps = spfNetScript.deps_[name];
    var url = spfNetScript.url_[name] || name;
    var next = function() {
      spfNetScript.load(url, name);
    };
    if (deps) {
      spfNetScript.require(deps, next);
    } else {
      next();
    }
  });
};


/**
 * Recursively unloads scripts identified by name, first unloading
 * any dependendent scripts.  Use {@link #declare} to define dependencies.
 *
 * @param {string|Array.<string>} names One or more names.
 */
spfNetScript.unrequire = function(names) {
  spfDebug.debug('script.unrequire', names);
  // Convert to an array if needed.
  names = spfArray.toArray(names);
  spfArray.each(names, function(name) {
    var descendants = [];
    for (var dep in spfNetScript.deps_) {
      var list = spfNetScript.deps_[dep];
      list = spfArray.toArray(list);
      spfArray.each(list, function(l) {
        if (l == name) {
          descendants.push(dep);
        }
      });
    }
    spfArray.each(descendants, function(descend) {
      spfNetScript.unrequire(descend);
    });
    spfNetScript.unload(name);
  });
};


/**
 * Evaluates script text and defines a name to use for management.
 *
 * - Subsequent calls to evaluate the same text will not re-evaluate the script.
 *   To unconditionally evalute a script, see {@link #exec}.
 *
 * @param {string} text The text of the script.
 * @param {string} name Name to identify the script.
 * @return {undefined}
 */
spfNetScript.eval = function(text, name) {
  var type = spfNetResource.Type.JS;
  var el = spfNetResource.eval(type, text, name);
};


/**
 * Unconditionally evaluates script text.  See {@link #eval}.
 *
 * @param {string} text The text of the script.
 */
spfNetScript.exec = function(text) {
  var type = spfNetResource.Type.JS;
  var el = spfNetResource.exec(type, text);
};


/**
 * Sets the dependency map and optional URL map used when requiring scripts.
 * See {@link #require}.
 *
 * @param {Object.<(string|Array.<string>)>} deps The dependency map.
 * @param {Object.<string>=} opt_urls The optional URL map.
 */
spfNetScript.declare = function(deps, opt_urls) {
  if (deps) {
    for (var name in deps) {
      spfNetScript.deps_[name] = deps[name];
    }
    if (opt_urls) {
      for (var name in opt_urls) {
        spfNetScript.url_[name] = opt_urls[name];
      }
    }
  }
};


/**
 * Sets the path prefix or replacement map to use when resolving relative URLs.
 *
 * Note: The order in which replacements are made is not guaranteed.
 *
 * @param {string|Object.<string>} paths The paths.
 */
spfNetScript.path = function(paths) {
  var type = spfNetResource.Type.JS;
  spfNetResource.path(type, paths);
};


/**
 * Map of dependencies used for {@link #require}.
 * @type {!Object.<(string|Array.<string>)>}
 * @private
 */
spfNetScript.deps_ = {};
// When built for the bootloader, unconditionally set the map in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.SCRIPT_DEPS, spfNetScript.deps_);
} else {
  if (!spfState.has(spfState.Key.SCRIPT_DEPS)) {
    spfState.set(spfState.Key.SCRIPT_DEPS, spfNetScript.deps_);
  }
  spfNetScript.deps_ = /** @type {!Object.<(string|Array.<string>)>} */ (
      spfState.get(spfState.Key.SCRIPT_DEPS));
}


/**
 * Map of dependency names to URLs for {@link #require}, used for custom
 * resolution before URL canonicalization.
 * @type {!Object.<string>}
 * @private
 */
spfNetScript.url_ = {};
// When built for the bootloader, unconditionally set the map in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.SCRIPT_URL, spfNetScript.url_);
} else {
  if (!spfState.has(spfState.Key.SCRIPT_URL)) {
    spfState.set(spfState.Key.SCRIPT_URL, spfNetScript.url_);
  }
  spfNetScript.url_ = /** @type {!Object.<string>} */ (
      spfState.get(spfState.Key.SCRIPT_URL));
}




export default spfNetScript;
