/*
SPF
(c) 2012-2016 Google Inc.
https://ajax.googleapis.com/ajax/libs/spf/2.4.0/LICENSE
*/
var COMPILED = false;
var goog = {};
goog.require = function(ns) {
};
goog.provide = function(ns) {
  var parts = ns.split(".");
  var cur = window;
  for (var name;parts.length && (name = parts.shift());) {
    if (cur[name]) {
      cur = cur[name];
    } else {
      cur = cur[name] = {};
    }
  }
};
goog.global = this;
goog.nullFunction = function() {
};
goog.identityFunction = function(opt_returnValue, var_args) {
  return opt_returnValue;
};
goog.provide("spf");
var SPF_BOOTLOADER = false;
var SPF_DEBUG = true;
var SPF_TRACING = false;
spf.bind = function(fn, self, var_args) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function() {
    var newArgs = args.slice();
    newArgs.push.apply(newArgs, arguments);
    return fn.apply(self, newArgs);
  };
};
spf.execute = function(fn, var_args) {
  if (fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    try {
      return fn.apply(null, args);
    } catch (err) {
      return err;
    }
  }
};
spf.dispatch = function(name, opt_detail) {
  if (document.createEvent) {
    var evt = document.createEvent("CustomEvent");
    var bubbles = true;
    var cancelable = true;
    evt.initCustomEvent(name, bubbles, cancelable, opt_detail);
    return document.dispatchEvent(evt);
  }
  return true;
};
spf.now = function() {
  if (window.performance && window.performance.timing && window.performance.now) {
    return function() {
      return window.performance.timing.navigationStart + window.performance.now();
    };
  }
  return function() {
    return(new Date).getTime();
  };
}();
spf.uid = function() {
  var state = window["_spf_state"] = window["_spf_state"] || {};
  var uid = parseInt(state["uid"], 10) || 0;
  uid++;
  return state["uid"] = uid;
};
spf.nullFunction = function() {
};
spf.EventName = {CLICK:"spfclick", CSS_BEFORE_UNLOAD:"spfcssbeforeunload", CSS_UNLOAD:"spfcssunload", DONE:"spfdone", ERROR:"spferror", HISTORY:"spfhistory", JS_BEFORE_UNLOAD:"spfjsbeforeunload", JS_UNLOAD:"spfjsunload", PART_DONE:"spfpartdone", PART_PROCESS:"spfpartprocess", PROCESS:"spfprocess", READY:"spfready", RELOAD:"spfreload", REQUEST:"spfrequest"};
spf.ScriptResource;
spf.StyleResource;
spf.LinkResource;
spf.ResponseFragment;
spf.SingleResponse;
spf.MultipartResponse;
spf.RequestOptions;
spf.EventDetail;
spf.TaskScheduler;
goog.provide("spf.state");
spf.state.has = function(key) {
  return key in spf.state.values_;
};
spf.state.get = function(key) {
  return spf.state.values_[key];
};
spf.state.set = function(key, value) {
  spf.state.values_[key] = value;
  return value;
};
spf.state.Key = {ASYNC_DEFERS:"async-defers", ASYNC_LISTENER:"async-listener", CACHE_COUNTER:"cache-counter", CACHE_MAX:"cache-max", CACHE_STORAGE:"cache-storage", CONFIG_VALUES:"config", HISTORY_CALLBACK:"history-callback", HISTORY_ERROR_CALLBACK:"history-error-callback", HISTORY_IGNORE_POP:"history-ignore-pop", HISTORY_INIT:"history-init", HISTORY_LISTENER:"history-listener", HISTORY_TIMESTAMP:"history-timestamp", HISTORY_URL:"history-url", NAV_COUNTER:"nav-counter", NAV_INIT:"nav-init", NAV_INIT_TIME:"nav-init-time", 
NAV_CLICK_LISTENER:"nav-listener", NAV_MOUSEDOWN_LISTENER:"nav-mousedown-listener", NAV_SCROLL_LISTENER:"nav-scroll-listener", NAV_SCROLL_TEMP_POSITION:"nav-scroll-position", NAV_SCROLL_TEMP_URL:"nav-scroll-url", NAV_PREFETCHES:"nav-prefetches", NAV_PROMOTE:"nav-promote", NAV_PROMOTE_TIME:"nav-promote-time", NAV_REQUEST:"nav-request", PUBSUB_SUBS:"ps-s", RESOURCE_NAME:"rsrc-n", RESOURCE_PATHS_PREFIX:"rsrc-p-", RESOURCE_STATUS:"rsrc-s", RESOURCE_URL:"rsrc-u", SCRIPT_DEPS:"js-d", SCRIPT_URL:"js-u", 
TASKS_UID:"uid"};
spf.state.values_ = window["_spf_state"] || {};
window["_spf_state"] = spf.state.values_;
goog.provide("spf.config");
goog.require("spf.state");
spf.config.Value;
spf.config.defaults = {"animation-class":"spf-animate", "animation-duration":425, "cache-lifetime":10 * 60 * 1E3, "cache-max":50, "cache-unified":false, "link-class":"spf-link", "nolink-class":"spf-nolink", "navigate-limit":20, "navigate-lifetime":24 * 60 * 60 * 1E3, "reload-identifier":null, "request-timeout":0, "url-identifier":"?spf=__type__"};
spf.config.init = function(opt_config) {
  var config = opt_config || {};
  for (var key in spf.config.defaults) {
    var value = key in config ? config[key] : spf.config.defaults[key];
    spf.config.set(key, value);
  }
  for (var key in config) {
    if (!(key in spf.config.defaults)) {
      spf.config.set(key, config[key]);
    }
  }
};
spf.config.has = function(name) {
  return name in spf.config.values;
};
spf.config.get = function(name) {
  return spf.config.values[name];
};
spf.config.set = function(name, value) {
  spf.config.values[name] = value;
  return value;
};
spf.config.clear = function() {
  for (var key in spf.config.values) {
    delete spf.config.values[key];
  }
};
spf.config.values = {};
if (!spf.state.has(spf.state.Key.CONFIG_VALUES)) {
  spf.state.set(spf.state.Key.CONFIG_VALUES, spf.config.values);
}
spf.config.values = (spf.state.get(spf.state.Key.CONFIG_VALUES));
goog.provide("spf.debug");
goog.require("spf");
spf.debug.debug = function(var_args) {
  if (spf.debug.isLevelEnabled(spf.debug.Level.DEBUG)) {
    spf.debug.log(spf.debug.Level.DEBUG, "spf", arguments);
  }
};
spf.debug.info = function(var_args) {
  if (spf.debug.isLevelEnabled(spf.debug.Level.INFO)) {
    spf.debug.log(spf.debug.Level.INFO, "spf", arguments);
  }
};
spf.debug.warn = function(var_args) {
  if (spf.debug.isLevelEnabled(spf.debug.Level.WARN)) {
    spf.debug.log(spf.debug.Level.WARN, "spf", arguments);
  }
};
spf.debug.error = function(var_args) {
  if (spf.debug.isLevelEnabled(spf.debug.Level.ERROR)) {
    spf.debug.log(spf.debug.Level.ERROR, "spf", arguments);
  }
};
spf.debug.log = function(method, prefix, args) {
  if (!SPF_DEBUG || !window.console) {
    return;
  }
  args = Array.prototype.slice.call(args);
  var current = spf.now();
  var overall = spf.debug.formatDuration(spf.debug.start_, current);
  if (spf.debug.split_) {
    var split = spf.debug.formatDuration(spf.debug.split_, current);
    args.unshift(overall + "/" + split + ":");
  } else {
    args.unshift(overall + ":");
  }
  if (spf.debug.direct_) {
    args.unshift("[" + prefix + "]");
    window.console[method].apply(window.console, args);
  } else {
    args.unshift("[" + prefix + " - " + method + "]");
    window.console.log(args.join(" "));
  }
};
spf.debug.reset = function() {
  spf.debug.split_ = spf.now();
};
spf.debug.formatDuration = function(start, end) {
  var dur = (end - start) / 1E3;
  if (dur.toFixed) {
    dur = dur.toFixed(3);
  }
  return dur + "s";
};
spf.debug.isLevelEnabled = function(level) {
  return spf.debug.levels_[level] >= spf.debug.levels_[spf.debug.OUTPUT];
};
spf.debug.start_ = spf.now();
spf.debug.split_ = 0;
spf.debug.direct_ = !!(window.console && window.console.debug);
spf.debug.levels_ = {"debug":1, "info":2, "warn":3, "error":4};
spf.debug.Level = {DEBUG:"debug", INFO:"info", WARN:"warn", ERROR:"error"};
spf.debug.OUTPUT = "debug";
goog.provide("spf.dom");
goog.require("spf");
spf.dom.query = function(selector, opt_root) {
  var root = opt_root || document;
  if (root.querySelectorAll) {
    return root.querySelectorAll(selector);
  }
  return[];
};
spf.dom.insertSiblingBefore = function(newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode);
};
spf.dom.insertSiblingAfter = function(newNode, refNode) {
  refNode.parentNode.insertBefore(newNode, refNode.nextSibling);
};
spf.dom.unpackElement = function(element) {
  var child, parent = element.parentNode;
  if (parent && parent.nodeType != 11) {
    if (element.removeNode) {
      return(element.removeNode(false));
    } else {
      while (child = element.firstChild) {
        parent.insertBefore(child, element);
      }
      return(parent.removeChild(element));
    }
  }
};
spf.dom.packElement = function(element, container) {
  if (container) {
    var child;
    while (child = element.firstChild) {
      container.appendChild(child);
    }
    element.appendChild(container);
  }
};
spf.dom.getAncestor = function(element, matcher, opt_parent) {
  while (element) {
    if (matcher(element)) {
      return element;
    }
    if (opt_parent && element == opt_parent) {
      return null;
    }
    element = element.parentNode;
  }
  return null;
};
spf.dom.setAttributes = function(element, attributes) {
  for (var name in attributes) {
    var value = attributes[name];
    if (name == "class") {
      element.className = value;
    } else {
      if (name == "style") {
        element.style.cssText = value;
      } else {
        element.setAttribute(name, value);
        if (name == "value") {
          element[name] = value;
        }
      }
    }
  }
};
spf.dom.createIframe = function(opt_id, opt_document, opt_callback) {
  var id = opt_id || "";
  var doc = opt_document || document;
  var iframeEl = doc.createElement("iframe");
  iframeEl.id = id;
  iframeEl.src = 'javascript:""';
  iframeEl.style.display = "none";
  if (opt_callback) {
    iframeEl.onload = spf.bind(opt_callback, null, iframeEl);
  }
  doc.body.appendChild(iframeEl);
  return(iframeEl);
};
goog.provide("spf.history");
goog.require("spf");
goog.require("spf.config");
goog.require("spf.debug");
goog.require("spf.dom");
goog.require("spf.state");
spf.history.init = function(callback, errorCallback) {
  if (!spf.state.get(spf.state.Key.HISTORY_INIT) && window.addEventListener) {
    var url = spf.history.getCurrentUrl_();
    window.addEventListener("popstate", spf.history.pop_, false);
    spf.state.set(spf.state.Key.HISTORY_INIT, true);
    spf.state.set(spf.state.Key.HISTORY_CALLBACK, callback);
    spf.state.set(spf.state.Key.HISTORY_ERROR_CALLBACK, errorCallback);
    spf.state.set(spf.state.Key.HISTORY_LISTENER, spf.history.pop_);
    spf.state.set(spf.state.Key.HISTORY_URL, url);
    spf.state.set(spf.state.Key.HISTORY_TIMESTAMP, spf.now());
    var historyState = {"spf-referer":document.referrer};
    try {
      spf.history.replace(url, historyState);
    } catch (err) {
      if (errorCallback) {
        errorCallback(url, err);
      }
    }
  }
};
spf.history.dispose = function() {
  if (spf.state.get(spf.state.Key.HISTORY_INIT)) {
    if (window.removeEventListener) {
      window.removeEventListener("popstate", (spf.state.get(spf.state.Key.HISTORY_LISTENER)), false);
    }
    spf.state.set(spf.state.Key.HISTORY_INIT, false);
    spf.state.set(spf.state.Key.HISTORY_CALLBACK, null);
    spf.state.set(spf.state.Key.HISTORY_ERROR_CALLBACK, null);
    spf.state.set(spf.state.Key.HISTORY_LISTENER, null);
    spf.state.set(spf.state.Key.HISTORY_URL, null);
    spf.state.set(spf.state.Key.HISTORY_TIMESTAMP, 0);
  }
};
spf.history.add = function(opt_url, opt_state, opt_doCallback) {
  spf.debug.info("history.add ", opt_url);
  spf.history.push_(false, opt_url, opt_state, opt_doCallback);
};
spf.history.replace = function(opt_url, opt_state, opt_doCallback) {
  var state = null;
  var currentState = spf.history.getCurrentState_();
  if (currentState) {
    state = {};
    for (var key in currentState) {
      state[key] = currentState[key];
    }
  }
  if (opt_state) {
    state = state || {};
    for (var key in opt_state) {
      state[key] = opt_state[key];
    }
  }
  spf.debug.info("history.replace ", opt_url);
  spf.history.push_(true, opt_url, state, opt_doCallback);
};
spf.history.removeCurrentEntry = function() {
  spf.state.set(spf.state.Key.HISTORY_IGNORE_POP, true);
  window.history.back();
};
spf.history.push_ = function(replace, opt_url, opt_state, opt_doCallback) {
  if (!opt_url && !opt_state) {
    return;
  }
  var url = opt_url || spf.history.getCurrentUrl_();
  var state = opt_state || {};
  var timestamp = spf.now();
  spf.state.set(spf.state.Key.HISTORY_TIMESTAMP, timestamp);
  state["spf-timestamp"] = timestamp;
  if (replace) {
    spf.history.doReplaceState_(state, "", url);
    spf.debug.debug("    replaceState:  ", "url=", url, "state=", state);
  } else {
    spf.history.doPushState_(state, "", url);
    spf.debug.debug("    pushState:  ", "url=", url, "state=", state);
  }
  spf.state.set(spf.state.Key.HISTORY_URL, url);
  if (opt_doCallback) {
    var callback = (spf.state.get(spf.state.Key.HISTORY_CALLBACK));
    if (callback) {
      callback(url, state);
    }
  }
};
spf.history.pop_ = function(evt) {
  var url = spf.history.getCurrentUrl_();
  spf.debug.info("history.pop ", "url=", url, "evt=", evt);
  if (spf.state.get(spf.state.Key.HISTORY_IGNORE_POP)) {
    spf.state.set(spf.state.Key.HISTORY_IGNORE_POP, false);
    return;
  }
  if (!evt.state) {
    return;
  }
  var state = evt.state;
  var timestamp = state["spf-timestamp"];
  if (url == spf.state.get(spf.state.Key.HISTORY_URL)) {
    spf.state.set(spf.state.Key.HISTORY_TIMESTAMP, timestamp);
    spf.history.doReplaceState_(state, "", url);
    spf.debug.debug("    replaceState:  ", "url=", url, "state=", state);
  } else {
    var current = parseInt(spf.state.get(spf.state.Key.HISTORY_TIMESTAMP), 10);
    state["spf-back"] = timestamp < current;
    state["spf-current"] = spf.state.get(spf.state.Key.HISTORY_URL);
    spf.state.set(spf.state.Key.HISTORY_TIMESTAMP, timestamp);
    spf.state.set(spf.state.Key.HISTORY_URL, url);
    var callback = (spf.state.get(spf.state.Key.HISTORY_CALLBACK));
    if (callback) {
      callback(url, state);
    }
  }
};
spf.history.getCurrentUrl_ = function() {
  return window.location.href;
};
spf.history.getCurrentState_ = function() {
  return(window.history.state);
};
spf.history.doPushState_ = function(data, title, opt_url) {
  var iframe = spf.history.getIframe();
  var pushState = iframe.contentWindow.history.pushState;
  if (typeof pushState == "function") {
    pushState.call(window.history, data, title, opt_url);
  } else {
    throw new Error("history.pushState is not a function.");
  }
};
spf.history.doReplaceState_ = function(data, title, opt_url) {
  var iframe = spf.history.getIframe();
  var replaceState = iframe.contentWindow.history.replaceState;
  if (typeof replaceState == "function") {
    replaceState.call(window.history, data, title, opt_url);
  } else {
    throw new Error("history.replaceState is not a function");
  }
};
spf.history.getIframe = function() {
  var frame = document.getElementById("history-iframe");
  if (!frame) {
    frame = spf.dom.createIframe("history-iframe");
  }
  return(frame);
};
goog.provide("spf.array");
goog.require("spf");
spf.array.ArrayLike;
spf.array.each = function(arr, fn, opt_obj) {
  if (!SPF_BOOTLOADER && arr.forEach) {
    arr.forEach(fn, opt_obj);
    return;
  }
  for (var i = 0, l = arr.length;i < l;i++) {
    if (i in arr) {
      fn.call(opt_obj, arr[i], i, arr);
    }
  }
};
spf.array.every = function(arr, fn, opt_obj) {
  if (!SPF_BOOTLOADER && arr.every) {
    return arr.every(fn, opt_obj);
  }
  for (var i = 0, l = arr.length;i < l;i++) {
    if (i in arr && !fn.call(opt_obj, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};
spf.array.some = function(arr, fn, opt_obj) {
  if (!SPF_BOOTLOADER && arr.some) {
    return arr.some(fn, opt_obj);
  }
  for (var i = 0, l = arr.length;i < l;i++) {
    if (i in arr && fn.call(opt_obj, arr[i], i, arr)) {
      return true;
    }
  }
  return false;
};
spf.array.filter = function(arr, fn, opt_obj) {
  if (!SPF_BOOTLOADER && arr.filter) {
    return arr.filter(fn, opt_obj);
  }
  var res = [];
  spf.array.each(arr, function(a, i, arr) {
    if (fn.call(opt_obj, a, i, arr)) {
      res.push(a);
    }
  });
  return res;
};
spf.array.indexOf = function(arr, val, opt_fromIndex) {
  if (!SPF_BOOTLOADER && arr.indexOf) {
    return arr.indexOf(val, opt_fromIndex);
  }
  var start = opt_fromIndex || 0;
  for (var i = start;i < arr.length;i++) {
    if (i in arr && arr[i] === val) {
      return i;
    }
  }
  return-1;
};
spf.array.map = function(arr, fn, opt_obj) {
  if (!SPF_BOOTLOADER && arr.map) {
    return arr.map(fn, opt_obj);
  }
  var res = [];
  res.length = arr.length;
  spf.array.each(arr, function(a, i, arr) {
    res[i] = fn.call(opt_obj, a, i, arr);
  });
  return res;
};
spf.array.toArray = function(val) {
  return spf.array.isArray(val) ? val : [val];
};
spf.array.isArray = function(val) {
  if (SPF_BOOTLOADER) {
    return!!(val && val.push);
  }
  return Object.prototype.toString.call(val) == "[object Array]";
};
goog.provide("spf.cache");
goog.require("spf");
goog.require("spf.config");
goog.require("spf.state");
spf.cache.get = function(key) {
  var storage = spf.cache.storage_();
  if (!(key in storage)) {
    return;
  }
  var unit = storage[key];
  if (spf.cache.valid_(unit)) {
    spf.cache.updateCount_(unit);
    return unit["data"];
  }
  spf.cache.remove(key);
};
spf.cache.set = function(key, data, opt_lifetime) {
  var lifetime = parseInt(opt_lifetime, 10);
  var max = parseInt(spf.config.get("cache-max"), 10);
  if (lifetime <= 0 || max <= 0) {
    return;
  }
  var storage = spf.cache.storage_();
  storage[key] = spf.cache.create_(key, data, lifetime);
  setTimeout(spf.cache.collect, 1E3);
};
spf.cache.remove = function(key) {
  var storage = spf.cache.storage_();
  if (key in storage) {
    delete storage[key];
  }
};
spf.cache.clear = function() {
  spf.cache.storage_({});
};
spf.cache.collect = function() {
  var storage = spf.cache.storage_();
  for (var key in storage) {
    var unit = storage[key];
    if (!spf.cache.valid_(unit)) {
      delete storage[key];
    }
  }
  spf.cache.trim_();
};
spf.cache.Unit;
spf.cache.valid_ = function(unit) {
  if (!(unit && "data" in unit)) {
    return false;
  }
  var lifetime = unit["life"];
  lifetime = isNaN(lifetime) ? Infinity : lifetime;
  var timestamp = unit["time"];
  var age = spf.now() - timestamp;
  return age < lifetime;
};
spf.cache.trim_ = function() {
  var storage = spf.cache.storage_();
  var max = parseInt(spf.config.get("cache-max"), 10);
  max = isNaN(max) ? Infinity : max;
  var extra = Object.keys(storage).length - max;
  if (extra <= 0) {
    return;
  }
  for (var i = 0;i < extra;i++) {
    var min = {count:Infinity};
    for (var key in storage) {
      if (storage[key].count < min.count) {
        min.key = key;
        min.count = storage[key].count;
      }
    }
    delete storage[min.key];
  }
};
spf.cache.create_ = function(key, data, lifetime) {
  var unit = {"data":data, "life":lifetime, "time":spf.now(), "count":0};
  spf.cache.updateCount_(unit);
  return unit;
};
spf.cache.updateCount_ = function(unit) {
  var count = parseInt(spf.state.get(spf.state.Key.CACHE_COUNTER), 10) || 0;
  count++;
  spf.state.set(spf.state.Key.CACHE_COUNTER, count);
  unit.count = count;
};
spf.cache.storage_ = function(opt_storage) {
  if (opt_storage || !spf.state.has(spf.state.Key.CACHE_STORAGE)) {
    return(spf.state.set(spf.state.Key.CACHE_STORAGE, opt_storage || {}));
  }
  return(spf.state.get(spf.state.Key.CACHE_STORAGE));
};
goog.provide("spf.dom.classlist");
goog.require("spf.array");
spf.dom.classlist.get = function(node) {
  if (node.classList) {
    return node.classList;
  } else {
    return node.className && node.className.match(/\S+/g) || [];
  }
};
spf.dom.classlist.contains = function(node, cls) {
  if (!cls) {
    return false;
  } else {
    if (node.classList) {
      return node.classList.contains(cls);
    } else {
      var classes = spf.dom.classlist.get(node);
      return spf.array.some(classes, function(item) {
        return item == cls;
      });
    }
  }
};
spf.dom.classlist.add = function(node, cls) {
  if (cls) {
    if (node.classList) {
      node.classList.add(cls);
    } else {
      if (!spf.dom.classlist.contains(node, cls)) {
        node.className += " " + cls;
      }
    }
  }
};
spf.dom.classlist.remove = function(node, cls) {
  if (cls) {
    if (node.classList) {
      node.classList.remove(cls);
    } else {
      var classes = spf.dom.classlist.get(node);
      var newClasses = spf.array.filter(classes, function(item) {
        return item != cls;
      });
      node.className = newClasses.join(" ");
    }
  }
};
goog.provide("spf.dom.dataset");
spf.dom.dataset.get = function(node, key) {
  if (node.dataset) {
    return node.dataset[key];
  } else {
    return node.getAttribute("data-" + spf.string.toSelectorCase(key));
  }
};
spf.dom.dataset.set = function(node, key, val) {
  if (node.dataset) {
    node.dataset[key] = val;
  } else {
    node.setAttribute("data-" + spf.string.toSelectorCase(key), val);
  }
};
goog.provide("spf.string");
goog.require("spf");
spf.string.contains = function(str, substr) {
  return str.indexOf(substr) != -1;
};
spf.string.startsWith = function(str, prefix, opt_offset) {
  var idx = opt_offset || 0;
  return str.lastIndexOf(prefix, idx) == idx;
};
spf.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l;
};
spf.string.isString = function(val) {
  if (SPF_BOOTLOADER) {
    return typeof val == "string";
  }
  return Object.prototype.toString.call(val) == "[object String]";
};
spf.string.trim = function() {
  if (String.prototype.trim) {
    return function(str) {
      return str.trim();
    };
  } else {
    return function(str) {
      return str.replace(/^\s+|\s+$/g, "");
    };
  }
}();
spf.string.partition = function(str, sep) {
  var arr = str.split(sep);
  var nosep = arr.length == 1;
  return[arr[0], nosep ? "" : sep, nosep ? "" : arr.slice(1).join(sep)];
};
spf.string.hashcode = function(str) {
  str = str || "";
  var result = 0;
  for (var i = 0, l = str.length;i < l;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= 4294967296;
  }
  return result;
};
spf.string.toSelectorCase = function(str) {
  return String(str).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.provide("WTF");
goog.provide("WTF.data.EventFlag");
goog.provide("WTF.io.ByteArray");
goog.provide("WTF.trace");
goog.provide("WTF.trace.Flow");
goog.provide("WTF.trace.Scope");
goog.provide("WTF.trace.TimeRange");
goog.provide("WTF.trace.Zone");
goog.provide("WTF.trace.events");
WTF.ENABLED = true;
WTF.EXPECTED_API_VERSION_ = 2;
WTF.PRESENT = WTF.ENABLED && !!goog.global["wtf"] && goog.global["wtf"]["trace"]["API_VERSION"] == WTF.EXPECTED_API_VERSION_;
WTF.hasHighResolutionTimes = WTF.PRESENT ? goog.global["wtf"]["hasHighResolutionTimes"] : false;
WTF.timebase = WTF.PRESENT ? goog.global["wtf"]["timebase"] : function() {
  return 0;
};
WTF.now = WTF.PRESENT ? goog.global["wtf"]["now"] : function() {
  return 0;
};
WTF.io.ByteArray;
WTF.trace.Zone;
WTF.trace.Scope;
WTF.trace.Flow;
WTF.trace.TimeRange;
WTF.data.EventFlag = {HIGH_FREQUENCY:1 << 1, SYSTEM_TIME:1 << 2, INTERNAL:1 << 3, APPEND_SCOPE_DATA:1 << 4, BUILTIN:1 << 5, APPEND_FLOW_DATA:1 << 6};
WTF.data.ZoneType = {SCRIPT:"script", NATIVE_SCRIPT:"native_script", NATIVE_GPU:"native_gpu", NATIVE_BROWSER:"native_browser"};
WTF.trace.prepare = WTF.PRESENT ? goog.global["wtf"]["trace"]["prepare"] : goog.nullFunction;
WTF.trace.shutdown = WTF.PRESENT ? goog.global["wtf"]["trace"]["shutdown"] : goog.nullFunction;
WTF.trace.start = WTF.PRESENT ? goog.global["wtf"]["trace"]["start"] : goog.nullFunction;
WTF.trace.snapshot = WTF.PRESENT ? goog.global["wtf"]["trace"]["snapshot"] : goog.nullFunction;
WTF.trace.snapshotAll = WTF.PRESENT ? goog.global["wtf"]["trace"]["snapshotAll"] : goog.nullFunction;
WTF.trace.reset = WTF.PRESENT ? goog.global["wtf"]["trace"]["reset"] : goog.nullFunction;
WTF.trace.stop = WTF.PRESENT ? goog.global["wtf"]["trace"]["stop"] : goog.nullFunction;
WTF.trace.createZone = WTF.PRESENT ? goog.global["wtf"]["trace"]["createZone"] : goog.nullFunction;
WTF.trace.deleteZone = WTF.PRESENT ? goog.global["wtf"]["trace"]["deleteZone"] : goog.nullFunction;
WTF.trace.pushZone = WTF.PRESENT ? goog.global["wtf"]["trace"]["pushZone"] : goog.nullFunction;
WTF.trace.popZone = WTF.PRESENT ? goog.global["wtf"]["trace"]["popZone"] : goog.nullFunction;
WTF.trace.enterScope = WTF.PRESENT ? goog.global["wtf"]["trace"]["enterScope"] : goog.nullFunction;
WTF.trace.enterTracingScope = WTF.PRESENT ? goog.global["wtf"]["trace"]["enterTracingScope"] : goog.nullFunction;
WTF.trace.leaveScope = WTF.PRESENT ? goog.global["wtf"]["trace"]["leaveScope"] : function(scope, opt_result, opt_time) {
  return opt_result;
};
WTF.trace.appendScopeData = WTF.PRESENT ? goog.global["wtf"]["trace"]["appendScopeData"] : goog.nullFunction;
WTF.trace.branchFlow = WTF.PRESENT ? goog.global["wtf"]["trace"]["branchFlow"] : goog.nullFunction;
WTF.trace.extendFlow = WTF.PRESENT ? goog.global["wtf"]["trace"]["extendFlow"] : goog.nullFunction;
WTF.trace.terminateFlow = WTF.PRESENT ? goog.global["wtf"]["trace"]["terminateFlow"] : goog.nullFunction;
WTF.trace.appendFlowData = WTF.PRESENT ? goog.global["wtf"]["trace"]["appendFlowData"] : goog.nullFunction;
WTF.trace.clearFlow = WTF.PRESENT ? goog.global["wtf"]["trace"]["clearFlow"] : goog.nullFunction;
WTF.trace.spanFlow = WTF.PRESENT ? goog.global["wtf"]["trace"]["spanFlow"] : goog.nullFunction;
WTF.trace.mark = WTF.PRESENT ? goog.global["wtf"]["trace"]["mark"] : goog.nullFunction;
WTF.trace.timeStamp = WTF.PRESENT ? goog.global["wtf"]["trace"]["timeStamp"] : goog.nullFunction;
WTF.trace.beginTimeRange = WTF.PRESENT ? goog.global["wtf"]["trace"]["beginTimeRange"] : goog.nullFunction;
WTF.trace.endTimeRange = WTF.PRESENT ? goog.global["wtf"]["trace"]["endTimeRange"] : goog.nullFunction;
WTF.trace.ignoreListener = WTF.PRESENT ? goog.global["wtf"]["trace"]["ignoreListener"] : goog.nullFunction;
WTF.trace.ignoreDomTree = WTF.PRESENT ? goog.global["wtf"]["trace"]["ignoreDomTree"] : goog.nullFunction;
WTF.trace.initializeDomEventProperties = WTF.PRESENT ? goog.global["wtf"]["trace"]["initializeDomEventProperties"] : goog.nullFunction;
WTF.trace.events.createInstance = WTF.PRESENT ? goog.global["wtf"]["trace"]["events"]["createInstance"] : function(signature, opt_flags) {
  return goog.nullFunction;
};
WTF.trace.events.createScope = WTF.PRESENT ? goog.global["wtf"]["trace"]["events"]["createScope"] : function(signature, opt_flags) {
  return goog.nullFunction;
};
WTF.trace.instrument = WTF.PRESENT ? goog.global["wtf"]["trace"]["instrument"] : goog.identityFunction;
WTF.trace.instrumentType = WTF.PRESENT ? goog.global["wtf"]["trace"]["instrumentType"] : goog.identityFunction;
WTF.trace.instrumentTypeSimple = WTF.PRESENT ? goog.global["wtf"]["trace"]["instrumentTypeSimple"] : goog.nullFunction;
WTF.REPLACE_GOOG_BASE = true;
if (!COMPILED && WTF.REPLACE_GOOG_BASE && WTF.PRESENT && goog.global["goog"] && goog.global["goog"]["base"]) {
  goog.global["goog"]["base"] = function(me, opt_methodName, var_args) {
    var caller = arguments.callee.caller;
    if (caller.superClass_) {
      return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
    }
    var args = Array.prototype.slice.call(arguments, 2);
    var foundCaller = false;
    for (var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
      if (ctor.prototype[opt_methodName] === caller || ctor.prototype[opt_methodName]["uninstrumented"] === caller) {
        foundCaller = true;
      } else {
        if (foundCaller) {
          return ctor.prototype[opt_methodName].apply(me, args);
        }
      }
    }
    if (me[opt_methodName] === caller || me[opt_methodName]["uninstrumented"] === caller) {
      return me.constructor.prototype[opt_methodName].apply(me, args);
    } else {
      throw Error("goog.base called from a method of one name " + "to a method of a different name");
    }
  };
}
;goog.provide("spf.tracing");
goog.require("WTF");
goog.require("WTF.data.EventFlag");
goog.require("WTF.trace");
spf.tracing.ENABLED = SPF_TRACING;
spf.tracing.RUNTIME_DISABLED_ = window["_spf_tracing_runtime_disabled"] || false;
spf.tracing.USE_WTF_ = spf.tracing.ENABLED && !spf.tracing.RUNTIME_DISABLED_ && WTF.PRESENT;
spf.tracing.USE_CONSOLE_ = spf.tracing.ENABLED && !spf.tracing.RUNTIME_DISABLED_ && !WTF.PRESENT && !!window.console && !!window.console.time && !!window.console.timeEnd;
spf.tracing.nullFunction = function() {
};
spf.tracing.identityFunction = function(opt_returnValue, var_args) {
  return opt_returnValue;
};
spf.tracing.initializeDomEventProperties = spf.tracing.USE_WTF_ ? WTF.trace.initializeDomEventProperties : spf.tracing.nullFunction;
spf.tracing.createInstanceEvent = spf.tracing.USE_WTF_ ? WTF.trace.events.createInstance : function(signature, opt_flags) {
  return spf.tracing.nullFunction;
};
spf.tracing.createAppendScopeDataEvent = function(signature) {
  return spf.tracing.createInstanceEvent(signature, WTF.data.EventFlag.APPEND_SCOPE_DATA);
};
spf.tracing.createScopeEvent = spf.tracing.USE_WTF_ ? WTF.trace.events.createScope : function(signature, opt_flags) {
  return spf.tracing.nullFunction;
};
spf.tracing.traceMethods = spf.tracing.USE_WTF_ ? WTF.trace.instrumentTypeSimple : spf.tracing.nullFunction;
spf.tracing.enterScope = spf.tracing.USE_WTF_ ? WTF.trace.enterScope : spf.tracing.nullFunction;
spf.tracing.leaveScope = spf.tracing.USE_WTF_ ? WTF.trace.leaveScope : spf.tracing.nullFunction;
spf.tracing.appendScopeData = spf.tracing.USE_WTF_ ? WTF.trace.appendScopeData : spf.tracing.nullFunction;
spf.tracing.markTimeline = spf.tracing.USE_WTF_ ? WTF.trace.mark : spf.tracing.nullFunction;
spf.tracing.timeStamp = spf.tracing.USE_WTF_ ? WTF.trace.timeStamp : spf.tracing.nullFunction;
spf.tracing.beginTimeRange = spf.tracing.USE_WTF_ ? WTF.trace.beginTimeRange : spf.tracing.nullFunction;
spf.tracing.endTimeRange = spf.tracing.USE_WTF_ ? WTF.trace.endTimeRange : spf.tracing.nullFunction;
spf.tracing.instrument = spf.tracing.USE_WTF_ ? WTF.trace.instrument : spf.tracing.identityFunction;
goog.provide("spf.async");
goog.require("spf");
goog.require("spf.state");
goog.require("spf.string");
goog.require("spf.tracing");
spf.async.defer = function(fn) {
  var uid = spf.uid();
  spf.async.defers_[uid] = fn;
  if (spf.async.POSTMESSAGE_SUPPORTED_) {
    window.postMessage(spf.async.PREFIX_ + uid, "*");
  } else {
    window.setTimeout(spf.bind(spf.async.run_, null, uid), 0);
  }
};
spf.async.handleMessage_ = function(evt) {
  if (evt.data && spf.string.isString(evt.data) && spf.string.startsWith(evt.data, spf.async.PREFIX_)) {
    var uid = evt.data.substring(spf.async.PREFIX_.length);
    spf.async.run_(uid);
  }
};
spf.async.run_ = function(uid) {
  var fn = spf.async.defers_[uid];
  if (fn) {
    delete spf.async.defers_[uid];
    fn();
  }
};
spf.async.addListener_ = function(fn) {
  if (window.addEventListener) {
    window.addEventListener("message", fn, false);
  } else {
    if (window.attachEvent) {
      window.attachEvent("onmessage", fn);
    }
  }
};
spf.async.removeListener_ = function(fn) {
  if (window.removeEventListener) {
    window.removeEventListener("message", fn, false);
  } else {
    if (window.detachEvent) {
      window.detachEvent("onmessage", fn);
    }
  }
};
spf.async.POSTMESSAGE_SUPPORTED_ = function() {
  if (!window.postMessage) {
    return false;
  }
  var supported = true;
  var listener = function() {
    supported = false;
  };
  spf.async.addListener_(listener);
  window.postMessage("", "*");
  spf.async.removeListener_(listener);
  return supported;
}();
spf.async.PREFIX_ = "spf:";
spf.async.defers_ = {};
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.ASYNC_DEFERS, spf.async.defers_);
} else {
  if (!spf.state.has(spf.state.Key.ASYNC_DEFERS)) {
    spf.state.set(spf.state.Key.ASYNC_DEFERS, spf.async.defers_);
  }
  spf.async.defers_ = (spf.state.get(spf.state.Key.ASYNC_DEFERS));
}
if (SPF_BOOTLOADER) {
  if (spf.async.POSTMESSAGE_SUPPORTED_) {
    spf.async.addListener_(spf.async.handleMessage_);
    spf.state.set(spf.state.Key.ASYNC_LISTENER, spf.async.handleMessage_);
  }
} else {
  if (spf.async.POSTMESSAGE_SUPPORTED_) {
    if (spf.state.has(spf.state.Key.ASYNC_LISTENER)) {
      spf.async.removeListener_((spf.state.get(spf.state.Key.ASYNC_LISTENER)));
    }
    spf.async.addListener_(spf.async.handleMessage_);
    spf.state.set(spf.state.Key.ASYNC_LISTENER, spf.async.handleMessage_);
  }
}
if (spf.tracing.ENABLED) {
  (function() {
    spf.async.defer = spf.tracing.instrument(spf.async.defer, "spf.async.defer");
  })();
}
;goog.provide("spf.pubsub");
goog.require("spf");
goog.require("spf.array");
goog.require("spf.state");
spf.pubsub.subscribe = function(topic, fn) {
  if (topic && fn) {
    if (!(topic in spf.pubsub.subscriptions)) {
      spf.pubsub.subscriptions[topic] = [];
    }
    spf.pubsub.subscriptions[topic].push(fn);
  }
};
spf.pubsub.unsubscribe = function(topic, fn) {
  if (topic in spf.pubsub.subscriptions && fn) {
    spf.array.every(spf.pubsub.subscriptions[topic], function(subFn, i, arr) {
      if (subFn == fn) {
        arr[i] = null;
        return false;
      }
      return true;
    });
  }
};
spf.pubsub.publish = function(topic) {
  spf.pubsub.publish_(topic);
};
spf.pubsub.flush = function(topic) {
  spf.pubsub.publish_(topic, true);
};
spf.pubsub.publish_ = function(topic, opt_unsub) {
  if (topic in spf.pubsub.subscriptions) {
    spf.array.each(spf.pubsub.subscriptions[topic], function(subFn, i, arr) {
      if (opt_unsub) {
        arr[i] = null;
      }
      if (subFn) {
        subFn();
      }
    });
  }
};
spf.pubsub.rename = function(oldTopic, newTopic) {
  if (oldTopic && newTopic && oldTopic in spf.pubsub.subscriptions) {
    var existing = spf.pubsub.subscriptions[newTopic] || [];
    spf.pubsub.subscriptions[newTopic] = existing.concat(spf.pubsub.subscriptions[oldTopic]);
    spf.pubsub.clear(oldTopic);
  }
};
spf.pubsub.clear = function(topic) {
  delete spf.pubsub.subscriptions[topic];
};
spf.pubsub.subscriptions = {};
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.PUBSUB_SUBS, spf.pubsub.subscriptions);
} else {
  if (!spf.state.has(spf.state.Key.PUBSUB_SUBS)) {
    spf.state.set(spf.state.Key.PUBSUB_SUBS, spf.pubsub.subscriptions);
  }
  spf.pubsub.subscriptions = (spf.state.get(spf.state.Key.PUBSUB_SUBS));
}
;goog.provide("spf.tasks");
goog.require("spf");
goog.require("spf.config");
goog.require("spf.state");
goog.require("spf.string");
goog.require("spf.tracing");
spf.tasks.add = function(key, fn, opt_delay) {
  var queues = spf.tasks.queues_;
  var queue = queues[key];
  if (key && fn) {
    if (!queue) {
      queue = queues[key] = spf.tasks.createQueue_();
    }
    var task = spf.tasks.createTask_(fn, opt_delay || 0);
    return queue.items.push(task);
  }
  return queue && queue.items.length || 0;
};
spf.tasks.run = function(key, opt_sync) {
  var queue = spf.tasks.queues_[key];
  if (queue) {
    var active = !!queue.scheduledKey || !!queue.timeoutKey;
    var suspended = !(queue.semaphore > 0);
    if (!suspended && (opt_sync || !active)) {
      spf.tasks.do_(key, opt_sync);
    }
  }
};
spf.tasks.suspend = function(key) {
  var queue = spf.tasks.queues_[key];
  if (queue) {
    queue.semaphore--;
  }
};
spf.tasks.resume = function(key, opt_sync) {
  var queue = spf.tasks.queues_[key];
  if (queue) {
    queue.semaphore++;
    spf.tasks.run(key, opt_sync);
  }
};
spf.tasks.cancel = function(key) {
  var queue = spf.tasks.queues_[key];
  if (queue) {
    spf.tasks.clearAsyncTasks_(queue);
    delete spf.tasks.queues_[key];
  }
};
spf.tasks.cancelAllExcept = function(opt_keyPrefix, opt_skipKey) {
  var keyPrefix = opt_keyPrefix || "";
  for (var key in spf.tasks.queues_) {
    if (opt_skipKey != key && spf.string.startsWith(key, keyPrefix)) {
      spf.tasks.cancel(key);
    }
  }
};
spf.tasks.key = function(obj) {
  var uid = parseInt(spf.state.get(spf.state.Key.TASKS_UID), 10) || 0;
  uid++;
  return obj["spf-key"] || (obj["spf-key"] = "" + spf.state.set(spf.state.Key.TASKS_UID, uid));
};
spf.tasks.do_ = function(key, opt_sync) {
  var queue = spf.tasks.queues_[key];
  if (queue) {
    spf.tasks.clearAsyncTasks_(queue);
    if (queue.semaphore > 0 && queue.items.length) {
      var task = queue.items[0];
      if (task) {
        var next = spf.bind(spf.tasks.do_, null, key, opt_sync);
        var step = spf.bind(function(nextFn, taskFn) {
          taskFn();
          nextFn();
        }, null, next);
        if (opt_sync) {
          queue.items.shift();
          step(task.fn);
        } else {
          spf.tasks.scheduleTask_(queue, task, step);
        }
      }
    }
  }
};
spf.tasks.scheduleTask_ = function(queue, task, step) {
  if (task.delay) {
    var fn = spf.bind(step, null, spf.nullFunction);
    queue.timeoutKey = setTimeout(fn, task.delay);
    task.delay = 0;
  } else {
    queue.items.shift();
    var fn = spf.bind(step, null, task.fn);
    var scheduler = (spf.config.get("advanced-task-scheduler"));
    var addTask = scheduler && scheduler["addTask"];
    if (addTask) {
      queue.scheduledKey = addTask(fn);
    } else {
      queue.timeoutKey = setTimeout(fn, 0);
    }
  }
};
spf.tasks.clearAsyncTasks_ = function(queue) {
  if (queue.scheduledKey) {
    var scheduler = (spf.config.get("advanced-task-scheduler"));
    var cancelTask = scheduler && scheduler["cancelTask"];
    if (cancelTask) {
      cancelTask(queue.scheduledKey);
    }
    queue.scheduledKey = 0;
  }
  if (queue.timeoutKey) {
    clearTimeout(queue.timeoutKey);
    queue.timeoutKey = 0;
  }
};
spf.tasks.Task;
spf.tasks.Queue;
spf.tasks.createQueue_ = function() {
  return{items:[], scheduledKey:0, timeoutKey:0, semaphore:1};
};
spf.tasks.createTask_ = function(fn, delay) {
  return{fn:fn, delay:delay};
};
spf.tasks.queues_ = {};
if (spf.tracing.ENABLED) {
  (function() {
    spf.tasks.add = spf.tracing.instrument(spf.tasks.add, "spf.tasks.add");
    spf.tasks.run = spf.tracing.instrument(spf.tasks.run, "spf.tasks.run");
    spf.tasks.suspend = spf.tracing.instrument(spf.tasks.suspend, "spf.tasks.suspend");
    spf.tasks.resume = spf.tracing.instrument(spf.tasks.resume, "spf.tasks.resume");
    spf.tasks.cancel = spf.tracing.instrument(spf.tasks.cancel, "spf.tasks.cancel");
    spf.tasks.cancelAllExcept = spf.tracing.instrument(spf.tasks.cancelAllExcept, "spf.tasks.cancelAllExcept");
    spf.tasks.key = spf.tracing.instrument(spf.tasks.key, "spf.tasks.key");
    spf.tasks.do_ = spf.tracing.instrument(spf.tasks.do_, "spf.tasks.do_");
    spf.tasks.createQueue_ = spf.tracing.instrument(spf.tasks.createQueue_, "spf.tasks.createQueue_");
    spf.tasks.createTask_ = spf.tracing.instrument(spf.tasks.createTask_, "spf.tasks.createTask_");
  })();
}
;goog.provide("spf.url");
goog.require("spf.array");
goog.require("spf.config");
goog.require("spf.string");
spf.url.URLUtils;
spf.url.utils = function(url) {
  var aEl = document.createElement("a");
  aEl.href = url;
  aEl.href = aEl.href;
  var utils = {href:aEl.href, protocol:aEl.protocol, host:aEl.host, hostname:aEl.hostname, port:aEl.port, pathname:aEl.pathname, search:aEl.search, hash:aEl.hash, username:aEl.username, password:aEl.password};
  utils.origin = utils.protocol + "//" + utils.host;
  if (!utils.pathname || utils.pathname[0] != "/") {
    utils.pathname = "/" + utils.pathname;
  }
  return utils;
};
spf.url.absolute = function(relative, opt_keepHash) {
  var utils = spf.url.utils(relative);
  return opt_keepHash ? utils.href : spf.url.unhash(utils.href);
};
spf.url.path = function(url) {
  var utils = spf.url.utils(url);
  return utils.pathname;
};
spf.url.origin = function(url) {
  var utils = spf.url.utils(url);
  return utils.origin;
};
spf.url.identify = function(url, opt_type) {
  var ident = (spf.config.get("url-identifier")) || "";
  if (ident) {
    var type = opt_type || "";
    ident = ident.replace("__type__", type);
    var hashParts = spf.string.partition(url, "#");
    var queryParts = spf.string.partition(hashParts[0], "?");
    var path = queryParts[0];
    var querySep = queryParts[1];
    var queryVal = queryParts[2];
    var hashSep = hashParts[1];
    var hashVal = hashParts[2];
    if (spf.string.startsWith(ident, "?")) {
      if (querySep) {
        ident = ident.replace("?", "&");
      }
      queryVal += ident;
    } else {
      if (spf.string.startsWith(ident, ".")) {
        if (spf.string.endsWith(path, "/")) {
          ident = "index" + ident;
        } else {
          var ext = path.lastIndexOf(".");
          if (ext > -1) {
            path = path.substring(0, ext);
          }
        }
        path += ident;
      } else {
        if (spf.string.endsWith(path, "/") && spf.string.startsWith(ident, "/")) {
          ident = ident.substring(1);
        }
        path += ident;
      }
    }
    url = path + querySep + queryVal + hashSep + hashVal;
  }
  return url;
};
spf.url.appendParameters = function(url, parameters) {
  var result = spf.string.partition(url, "#");
  url = result[0];
  var delim = spf.string.contains(url, "?") ? "&" : "?";
  for (var key in parameters) {
    url += delim + key;
    if (parameters[key]) {
      url += "=" + parameters[key];
    }
    delim = "&";
  }
  return url + result[1] + result[2];
};
spf.url.removeParameters = function(url, parameters) {
  var result = spf.string.partition(url, "#");
  url = result[0];
  spf.array.each(parameters, function(param) {
    var regex = new RegExp("([?&])" + param + "(?:=[^&]*)?(?:(?=[&])|$)", "g");
    url = url.replace(regex, function(_, delim) {
      return delim == "?" ? delim : "";
    });
  });
  if (spf.string.endsWith(url, "?")) {
    url = url.slice(0, -1);
  }
  return url + result[1] + result[2];
};
spf.url.appendPersistentParameters = function(url) {
  var parameterConfig = spf.config.get("advanced-persistent-parameters") || "";
  var result = spf.string.partition(url, "#");
  url = result[0];
  var delim = spf.string.contains(url, "?") ? "&" : "?";
  url += parameterConfig ? delim + parameterConfig : "";
  return url + result[1] + result[2];
};
spf.url.unprotocol = function(url) {
  return url.replace(/^[a-zA-Z]+:\/\//, "//");
};
spf.url.unhash = function(url) {
  var res = spf.string.partition(url, "#");
  return res[0];
};
goog.provide("spf.net.resource");
goog.provide("spf.net.resource.name");
goog.provide("spf.net.resource.status");
goog.provide("spf.net.resource.url");
goog.require("spf");
goog.require("spf.array");
goog.require("spf.debug");
goog.require("spf.dom");
goog.require("spf.dom.classlist");
goog.require("spf.pubsub");
goog.require("spf.state");
goog.require("spf.string");
goog.require("spf.tasks");
goog.require("spf.tracing");
goog.require("spf.url");
spf.net.resource.load = function(type, url, name, opt_fn) {
  spf.debug.debug("resource.load", type, url, name);
  var isJS = type == spf.net.resource.Type.JS;
  url = spf.net.resource.canonicalize(type, url);
  var pseudonym = name || "^" + url;
  var topic = spf.net.resource.key(type, pseudonym);
  var prevUrl;
  if (name && !SPF_BOOTLOADER) {
    prevUrl = spf.net.resource.url.get(type, name);
    if (prevUrl && url != prevUrl) {
      var evt = isJS ? spf.EventName.JS_BEFORE_UNLOAD : spf.EventName.CSS_BEFORE_UNLOAD;
      spf.dispatch(evt, {"name":name, "url":prevUrl});
      spf.net.resource.unloadPrepare_(type, name, prevUrl);
      var unloadComplete = spf.bind(spf.net.resource.unloadComplete_, null, type, name, prevUrl);
      spf.pubsub.subscribe(topic, unloadComplete);
    }
  }
  var prevName = spf.net.resource.name.get(type, url);
  if (prevName && pseudonym != prevName) {
    spf.net.resource.url.clear(type, prevName);
    spf.net.resource.name.clear(type, url);
    var prevTopic = spf.net.resource.key(type, prevName);
    spf.pubsub.rename(prevTopic, topic);
  }
  spf.net.resource.name.set(type, url, pseudonym);
  spf.net.resource.url.set(type, pseudonym, url);
  spf.debug.debug("  subscribing callback", topic);
  spf.pubsub.subscribe(topic, opt_fn);
  var check = spf.bind(spf.net.resource.check, null, type);
  if (spf.net.resource.status.get(type, url)) {
    if (prevName && pseudonym != prevName) {
      var el = spf.net.resource.find(type, url);
      if (el) {
        el.setAttribute("name", name || "");
      }
    }
    check();
  } else {
    var el = spf.net.resource.create(type, url, check, undefined, undefined, prevUrl);
    if (el && name) {
      el.setAttribute("name", name);
    }
  }
};
spf.net.resource.unload = function(type, name) {
  spf.debug.warn("resource.unload", type, name);
  var url = spf.net.resource.url.get(type, name);
  spf.net.resource.unloadPrepare_(type, name, url);
  spf.net.resource.unloadComplete_(type, name, url);
};
spf.net.resource.unloadPrepare_ = function(type, name, url) {
  spf.debug.debug("  > resource.unloadPrepare_", type, url);
  spf.net.resource.url.clear(type, name);
  if (url) {
    spf.net.resource.name.clear(type, url);
  }
  var topic = spf.net.resource.key(type, name);
  spf.debug.debug("  clearing callbacks for", topic);
  spf.pubsub.clear(topic);
};
spf.net.resource.unloadComplete_ = function(type, name, url) {
  var isJS = type == spf.net.resource.Type.JS;
  if (url) {
    spf.debug.debug("  > resource.unloadComplete_", type, url);
    var evt = isJS ? spf.EventName.JS_UNLOAD : spf.EventName.CSS_UNLOAD;
    spf.dispatch(evt, {"name":name, "url":url});
    spf.net.resource.destroy(type, url);
  }
};
spf.net.resource.check = function(type) {
  spf.debug.debug("resource.check", type);
  var prefix = spf.net.resource.key(type, "");
  for (var topic in spf.pubsub.subscriptions) {
    if (topic.indexOf(prefix) == 0) {
      var names = topic.substring(prefix.length).split("|");
      var loaded = spf.bind(spf.net.resource.url.loaded, null, type);
      var ready = spf.array.every(names, loaded);
      spf.debug.debug(" ", topic, "->", names, "=", ready);
      if (ready) {
        spf.debug.debug("  publishing", topic);
        spf.pubsub.flush(topic);
      }
    }
  }
};
spf.net.resource.create = function(type, url, opt_callback, opt_document, opt_statusGroup, opt_prevUrl) {
  spf.debug.debug("resource.create", type, url, "loading");
  var isJS = SPF_BOOTLOADER || type == spf.net.resource.Type.JS;
  url = spf.net.resource.canonicalize(type, url);
  spf.net.resource.status.set(spf.net.resource.State.LOADING, type, url, opt_statusGroup);
  var tag = isJS ? "script" : "link";
  var doc = opt_document || document;
  var el = doc.createElement(tag);
  var next = function() {
    spf.debug.debug("resource.create", type, url, "done");
    if (spf.net.resource.status.get(type, url, opt_statusGroup)) {
      spf.debug.debug("resource.create", type, url, "loaded");
      spf.net.resource.status.set(spf.net.resource.State.LOADED, type, url, opt_statusGroup);
    }
    if (isJS && el && el.parentNode && doc == document && !SPF_DEBUG) {
      el.parentNode.removeChild(el);
    }
    if (opt_callback) {
      setTimeout(opt_callback, 0);
    }
    return null;
  };
  if (!url) {
    return next();
  }
  var label = spf.net.resource.label(url);
  el.className = spf.net.resource.key(type, label);
  if ("onload" in el) {
    el.onerror = el.onload = next;
  } else {
    el.onreadystatechange = function() {
      if (/^c|loade/.test(el.readyState)) {
        next();
      }
    };
  }
  var targetEl = doc.getElementsByTagName("head")[0] || doc.body;
  if (isJS) {
    el.async = true;
    el.src = url;
    targetEl.insertBefore(el, targetEl.firstChild);
  } else {
    el.rel = "stylesheet";
    el.href = url;
    var prevEl = opt_prevUrl ? spf.net.resource.find(type, opt_prevUrl, targetEl) : null;
    if (prevEl) {
      targetEl.insertBefore(el, prevEl);
    } else {
      targetEl.appendChild(el);
    }
  }
  return el;
};
spf.net.resource.destroy = function(type, url, opt_document) {
  url = spf.net.resource.canonicalize(type, url);
  var el = spf.net.resource.find(type, url, opt_document);
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
  spf.net.resource.status.clear(type, url);
};
spf.net.resource.find = function(type, url, opt_root) {
  var label = spf.net.resource.label(url);
  var cls = spf.net.resource.key(type, label);
  var selector = "." + cls;
  var els = spf.dom.query(selector, opt_root);
  return els[0];
};
spf.net.resource.discover = function(type) {
  spf.debug.debug("resource.discover", type);
  var isJS = type == spf.net.resource.Type.JS;
  var selector = isJS ? "script[src]" : 'link[rel~="stylesheet"]';
  var els = [];
  spf.array.each(spf.dom.query(selector), function(el) {
    var url = isJS ? el.src : el.href;
    url = spf.net.resource.canonicalize(type, url);
    if (!spf.net.resource.status.get(type, url)) {
      spf.net.resource.status.set(spf.net.resource.State.LOADED, type, url);
      var label = spf.net.resource.label(url);
      var cls = spf.net.resource.key(type, label);
      spf.dom.classlist.add(el, cls);
      var name = el.getAttribute("name");
      if (name) {
        spf.net.resource.name.set(type, url, name);
        spf.net.resource.url.set(type, name, url);
      }
      els.push(el);
      spf.debug.debug("  found", url, cls, name);
    }
  });
  return els;
};
spf.net.resource.prefetch = function(type, url, opt_force) {
  if (!url) {
    return;
  }
  url = spf.net.resource.canonicalize(type, url);
  if (!opt_force && spf.net.resource.status.get(type, url)) {
    return;
  }
  if (opt_force && type == spf.net.resource.Type.IMG) {
    spf.net.resource.preconnect_(url);
    return;
  }
  var label = spf.net.resource.label(url);
  var id = spf.net.resource.key(type, label);
  var key = spf.net.resource.key(type, "prefetch");
  var el = (document.getElementById(key));
  if (!el) {
    el = spf.dom.createIframe(key, null, function(el) {
      el.title = key;
      spf.tasks.run(key, true);
    });
  } else {
    if (!opt_force && el.contentWindow.document.getElementById(id)) {
      return;
    }
  }
  var next = spf.bind(spf.net.resource.prefetch_, null, el, type, url, id, key);
  if (!el.title) {
    spf.tasks.add(key, next);
  } else {
    next();
  }
};
spf.net.resource.prefetch_ = function(el, type, url, id, group) {
  var isJS = type == spf.net.resource.Type.JS;
  var isCSS = type == spf.net.resource.Type.CSS;
  var doc = el.contentWindow.document;
  var fetchEl = doc.getElementById(id);
  if (fetchEl) {
    fetchEl.parentNode.removeChild(fetchEl);
  }
  if (isJS) {
    fetchEl = doc.createElement("object");
    if (spf.net.resource.IS_IE) {
      var extraElForIE = doc.createElement("script");
      extraElForIE.src = url;
    } else {
      fetchEl.data = url;
    }
    fetchEl.id = id;
    doc.body.appendChild(fetchEl);
  } else {
    if (isCSS) {
      fetchEl = spf.net.resource.create(type, url, null, doc, group);
      fetchEl.id = id;
    } else {
      fetchEl = doc.createElement("img");
      if (spf.net.resource.IS_IE) {
        url = url + "#" + spf.now();
      }
      fetchEl.src = url;
      fetchEl.id = id;
      doc.body.appendChild(fetchEl);
    }
  }
};
spf.net.resource.preconnect_ = function(url) {
  var img = new Image;
  if (spf.net.resource.IS_IE) {
    url = url + "#" + spf.now();
  }
  img.src = url;
};
spf.net.resource.eval = function(type, text, name) {
  var isJS = type == spf.net.resource.Type.JS;
  var previous = spf.net.resource.url.get(type, name);
  var id = "hash-" + spf.string.hashcode(text.replace(/\s/g, ""));
  spf.net.resource.url.set(type, name, id);
  var complete = spf.net.resource.status.loaded(type, id);
  if (complete) {
    return;
  }
  var el = spf.net.resource.exec(type, text);
  if (!el) {
    return;
  }
  spf.net.resource.status.set(spf.net.resource.State.LOADED, type, id);
  if (el && (!isJS || SPF_DEBUG)) {
    var label = spf.net.resource.label(id);
    var cls = spf.net.resource.key(type, label);
    el.className = cls;
    el.setAttribute("name", name);
  }
  previous = previous && previous[0];
  if (previous) {
    spf.net.resource.destroy(type, previous);
  }
};
spf.net.resource.exec = function(type, text) {
  text = spf.string.trim(text);
  if (!text) {
    return null;
  }
  var isJS = type == spf.net.resource.Type.JS;
  var targetEl = document.getElementsByTagName("head")[0] || document.body;
  var el;
  if (isJS) {
    el = document.createElement("script");
    el.text = text;
    targetEl.appendChild(el);
    if (!SPF_DEBUG) {
      targetEl.removeChild(el);
    }
  } else {
    el = document.createElement("style");
    targetEl.appendChild(el);
    if ("styleSheet" in el) {
      el.styleSheet.cssText = text;
    } else {
      el.appendChild(document.createTextNode(text));
    }
  }
  return el;
};
spf.net.resource.path = function(type, paths) {
  var key = (spf.state.Key.RESOURCE_PATHS_PREFIX + type);
  spf.state.set(key, paths);
};
spf.net.resource.canonicalize = function(type, url) {
  var key = (spf.state.Key.RESOURCE_PATHS_PREFIX + type);
  if (url) {
    var index = url.indexOf("//");
    if (index < 0) {
      if (spf.string.startsWith(url, "hash-")) {
        return url;
      }
      var paths = spf.state.get(key) || "";
      if (spf.string.isString(paths)) {
        url = paths + url;
      } else {
        for (var p in paths) {
          url = url.replace(p, paths[p]);
        }
      }
      if (type != spf.net.resource.Type.IMG) {
        url = url.indexOf("." + type) < 0 ? url + "." + type : url;
      }
      url = spf.url.absolute(url);
    } else {
      if (index == 0) {
        url = spf.url.absolute(url);
      }
    }
  }
  return url;
};
spf.net.resource.key = function(type, label, opt_group) {
  return type + "-" + label + (opt_group ? "-" + opt_group : "");
};
spf.net.resource.label = function(url) {
  return url ? String(url).replace(/[^\w]/g, "") : "";
};
spf.net.resource.status.set = function(status, type, url, opt_group) {
  var key = spf.net.resource.key(type, url, opt_group);
  spf.net.resource.status_[key] = status;
};
spf.net.resource.status.get = function(type, url, opt_group) {
  var key = spf.net.resource.key(type, url, opt_group);
  return spf.net.resource.status_[key];
};
spf.net.resource.status.clear = function(type, url) {
  var key = spf.net.resource.key(type, url);
  delete spf.net.resource.status_[key];
};
spf.net.resource.status.loaded = function(type, url) {
  var status = spf.net.resource.status.get(type, url);
  return url == "" || status == spf.net.resource.State.LOADED;
};
spf.net.resource.name.set = function(type, url, name) {
  var key = spf.net.resource.key(type, url);
  spf.net.resource.name_[key] = name;
};
spf.net.resource.name.get = function(type, url) {
  var key = spf.net.resource.key(type, url);
  return spf.net.resource.name_[key];
};
spf.net.resource.name.clear = function(type, url) {
  var key = spf.net.resource.key(type, url);
  delete spf.net.resource.name_[key];
};
spf.net.resource.url.set = function(type, name, url) {
  var key = spf.net.resource.key(type, name);
  spf.net.resource.url_[key] = url;
};
spf.net.resource.url.get = function(type, name) {
  var key = spf.net.resource.key(type, name);
  var url = spf.net.resource.url_[key];
  return url;
};
spf.net.resource.url.clear = function(type, name) {
  var key = spf.net.resource.key(type, name);
  delete spf.net.resource.url_[key];
};
spf.net.resource.url.loaded = function(type, name) {
  var url = spf.net.resource.url.get(type, name);
  return url != undefined && spf.net.resource.status.loaded(type, url);
};
spf.net.resource.status_ = {};
spf.net.resource.name_ = {};
spf.net.resource.url_ = {};
spf.net.resource.IS_IE = spf.string.contains(navigator.userAgent, " Trident/");
spf.net.resource.State = {LOADING:1, LOADED:2};
spf.net.resource.Type = {CSS:"css", IMG:"img", JS:"js"};
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.RESOURCE_STATUS, spf.net.resource.status_);
} else {
  if (!spf.state.has(spf.state.Key.RESOURCE_STATUS)) {
    spf.state.set(spf.state.Key.RESOURCE_STATUS, spf.net.resource.status_);
  }
  spf.net.resource.status_ = (spf.state.get(spf.state.Key.RESOURCE_STATUS));
}
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.RESOURCE_NAME, spf.net.resource.name_);
} else {
  if (!spf.state.has(spf.state.Key.RESOURCE_NAME)) {
    spf.state.set(spf.state.Key.RESOURCE_NAME, spf.net.resource.name_);
  }
  spf.net.resource.name_ = (spf.state.get(spf.state.Key.RESOURCE_NAME));
}
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.RESOURCE_URL, spf.net.resource.url_);
} else {
  if (!spf.state.has(spf.state.Key.RESOURCE_URL)) {
    spf.state.set(spf.state.Key.RESOURCE_URL, spf.net.resource.url_);
  }
  spf.net.resource.url_ = (spf.state.get(spf.state.Key.RESOURCE_URL));
}
if (spf.tracing.ENABLED) {
  (function() {
    spf.net.resource.load = spf.tracing.instrument(spf.net.resource.load, "spf.net.resource.load");
    spf.net.resource.unload = spf.tracing.instrument(spf.net.resource.unload, "spf.net.resource.unload");
    spf.net.resource.unload_ = spf.tracing.instrument(spf.net.resource.unload_, "spf.net.resource.unload_");
    spf.net.resource.check = spf.tracing.instrument(spf.net.resource.check, "spf.net.resource.check");
    spf.net.resource.create = spf.tracing.instrument(spf.net.resource.create, "spf.net.resource.create");
    spf.net.resource.destroy = spf.tracing.instrument(spf.net.resource.destroy, "spf.net.resource.destroy");
    spf.net.resource.discover = spf.tracing.instrument(spf.net.resource.discover, "spf.net.resource.discover");
    spf.net.resource.prefetch = spf.tracing.instrument(spf.net.resource.prefetch, "spf.net.resource.prefetch");
    spf.net.resource.prefetch_ = spf.tracing.instrument(spf.net.resource.prefetch_, "spf.net.resource.prefetch_");
    spf.net.resource.eval = spf.tracing.instrument(spf.net.resource.eval, "spf.net.resource.eval");
    spf.net.resource.exec = spf.tracing.instrument(spf.net.resource.exec, "spf.net.resource.exec");
    spf.net.resource.path = spf.tracing.instrument(spf.net.resource.path, "spf.net.resource.path");
    spf.net.resource.canonicalize = spf.tracing.instrument(spf.net.resource.canonicalize, "spf.net.resource.canonicalize");
    spf.net.resource.key = spf.tracing.instrument(spf.net.resource.key, "spf.net.resource.key");
    spf.net.resource.label = spf.tracing.instrument(spf.net.resource.label, "spf.net.resource.label");
    spf.net.resource.status.set = spf.tracing.instrument(spf.net.resource.status.set, "spf.net.resource.status.set");
    spf.net.resource.status.get = spf.tracing.instrument(spf.net.resource.status.get, "spf.net.resource.status.get");
    spf.net.resource.status.clear = spf.tracing.instrument(spf.net.resource.status.clear, "spf.net.resource.status.clear");
    spf.net.resource.status.loaded = spf.tracing.instrument(spf.net.resource.status.loaded, "spf.net.resource.status.loaded");
    spf.net.resource.url.set = spf.tracing.instrument(spf.net.resource.url.set, "spf.net.resource.url.set");
    spf.net.resource.url.get = spf.tracing.instrument(spf.net.resource.url.get, "spf.net.resource.url.get");
    spf.net.resource.url.clear = spf.tracing.instrument(spf.net.resource.url.clear, "spf.net.resource.url.clear");
    spf.net.resource.url.loaded = spf.tracing.instrument(spf.net.resource.url.loaded, "spf.net.resource.url.loaded");
  })();
}
;goog.provide("spf.net.connect");
goog.require("spf.array");
goog.require("spf.net.resource");
goog.require("spf.tracing");
spf.net.connect.preconnect = function(urls) {
  var type = spf.net.resource.Type.IMG;
  urls = spf.array.toArray(urls);
  spf.array.each(urls, function(url) {
    spf.net.resource.prefetch(type, url, true);
  });
};
if (spf.tracing.ENABLED) {
  (function() {
    spf.net.connect.preconnect = spf.tracing.instrument(spf.net.connect.preconnect, "spf.net.connect.preconnect");
  })();
}
;goog.provide("spf.net.script");
goog.require("spf.array");
goog.require("spf.debug");
goog.require("spf.net.resource");
goog.require("spf.net.resource.url");
goog.require("spf.pubsub");
goog.require("spf.state");
goog.require("spf.string");
goog.require("spf.tracing");
spf.net.script.load = function(url, name, opt_fn) {
  var type = spf.net.resource.Type.JS;
  spf.net.resource.load(type, url, name, opt_fn);
};
spf.net.script.unload = function(name) {
  var type = spf.net.resource.Type.JS;
  spf.net.resource.unload(type, name);
};
spf.net.script.discover = function() {
  var type = spf.net.resource.Type.JS;
  spf.net.resource.discover(type);
};
spf.net.script.get = function(url, opt_fn) {
  var type = spf.net.resource.Type.JS;
  spf.net.resource.create(type, url, opt_fn);
};
spf.net.script.prefetch = function(urls) {
  var type = spf.net.resource.Type.JS;
  urls = spf.array.toArray(urls);
  spf.array.each(urls, function(url) {
    spf.net.resource.prefetch(type, url);
  });
};
spf.net.script.ready = function(names, opt_fn, opt_require) {
  var type = spf.net.resource.Type.JS;
  names = spf.array.toArray(names);
  spf.debug.debug("script.ready", names);
  names = spf.array.filter(names, function(name) {
    return!!name;
  });
  var unknown = [];
  spf.array.each(names, function(name) {
    if (spf.net.resource.url.get(type, name) == undefined) {
      unknown.push(name);
    }
  });
  var known = !unknown.length;
  if (opt_fn) {
    var loaded = spf.bind(spf.net.resource.url.loaded, null, type);
    var ready = spf.array.every(names, loaded);
    if (known && ready) {
      opt_fn();
    } else {
      var topic = spf.net.resource.key(type, names.sort().join("|"));
      spf.debug.debug("  subscribing", topic);
      spf.pubsub.subscribe(topic, opt_fn);
    }
  }
  if (opt_require && !known) {
    opt_require(unknown);
  }
};
spf.net.script.done = function(name) {
  var type = spf.net.resource.Type.JS;
  spf.net.resource.url.set(type, name, "");
  spf.net.resource.check(type);
};
spf.net.script.ignore = function(names, fn) {
  var type = spf.net.resource.Type.JS;
  names = spf.array.toArray(names);
  spf.debug.debug("script.ignore", names);
  var topic = spf.net.resource.key(type, names.sort().join("|"));
  spf.debug.debug("  unsubscribing", topic);
  spf.pubsub.unsubscribe(topic, fn);
};
spf.net.script.require = function(names, opt_fn) {
  var type = spf.net.resource.Type.JS;
  spf.debug.debug("script.require", names);
  if (!SPF_BOOTLOADER) {
    names = spf.array.toArray(names);
    spf.array.each(names, function(name) {
      if (name) {
        var url = spf.net.script.url_[name] || name;
        url = spf.net.resource.canonicalize(type, url);
        var previous = spf.net.resource.url.get(type, name);
        if (previous && url != previous) {
          spf.net.script.unrequire(name);
        }
      }
    });
  }
  spf.net.script.ready(names, opt_fn, spf.net.script.require_);
};
spf.net.script.require_ = function(names) {
  spf.array.each(names, function(name) {
    var deps = spf.net.script.deps_[name];
    var url = spf.net.script.url_[name] || name;
    var next = function() {
      spf.net.script.load(url, name);
    };
    if (deps) {
      spf.net.script.require(deps, next);
    } else {
      next();
    }
  });
};
spf.net.script.unrequire = function(names) {
  spf.debug.debug("script.unrequire", names);
  names = spf.array.toArray(names);
  spf.array.each(names, function(name) {
    var descendants = [];
    for (var dep in spf.net.script.deps_) {
      var list = spf.net.script.deps_[dep];
      list = spf.array.toArray(list);
      spf.array.each(list, function(l) {
        if (l == name) {
          descendants.push(dep);
        }
      });
    }
    spf.array.each(descendants, function(descend) {
      spf.net.script.unrequire(descend);
    });
    spf.net.script.unload(name);
  });
};
spf.net.script.eval = function(text, name) {
  var type = spf.net.resource.Type.JS;
  var el = spf.net.resource.eval(type, text, name);
};
spf.net.script.exec = function(text) {
  var type = spf.net.resource.Type.JS;
  var el = spf.net.resource.exec(type, text);
};
spf.net.script.declare = function(deps, opt_urls) {
  if (deps) {
    for (var name in deps) {
      spf.net.script.deps_[name] = deps[name];
    }
    if (opt_urls) {
      for (var name in opt_urls) {
        spf.net.script.url_[name] = opt_urls[name];
      }
    }
  }
};
spf.net.script.path = function(paths) {
  var type = spf.net.resource.Type.JS;
  spf.net.resource.path(type, paths);
};
spf.net.script.deps_ = {};
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.SCRIPT_DEPS, spf.net.script.deps_);
} else {
  if (!spf.state.has(spf.state.Key.SCRIPT_DEPS)) {
    spf.state.set(spf.state.Key.SCRIPT_DEPS, spf.net.script.deps_);
  }
  spf.net.script.deps_ = (spf.state.get(spf.state.Key.SCRIPT_DEPS));
}
spf.net.script.url_ = {};
if (SPF_BOOTLOADER) {
  spf.state.set(spf.state.Key.SCRIPT_URL, spf.net.script.url_);
} else {
  if (!spf.state.has(spf.state.Key.SCRIPT_URL)) {
    spf.state.set(spf.state.Key.SCRIPT_URL, spf.net.script.url_);
  }
  spf.net.script.url_ = (spf.state.get(spf.state.Key.SCRIPT_URL));
}
if (spf.tracing.ENABLED) {
  (function() {
    spf.net.script.load = spf.tracing.instrument(spf.net.script.load, "spf.net.script.load");
    spf.net.script.unload = spf.tracing.instrument(spf.net.script.unload, "spf.net.script.unload");
    spf.net.script.discover = spf.tracing.instrument(spf.net.script.discover, "spf.net.script.discover");
    spf.net.script.get = spf.tracing.instrument(spf.net.script.get, "spf.net.script.get");
    spf.net.script.prefetch = spf.tracing.instrument(spf.net.script.prefetch, "spf.net.script.prefetch");
    spf.net.script.ready = spf.tracing.instrument(spf.net.script.ready, "spf.net.script.ready");
    spf.net.script.done = spf.tracing.instrument(spf.net.script.done, "spf.net.script.done");
    spf.net.script.ignore = spf.tracing.instrument(spf.net.script.ignore, "spf.net.script.ignore");
    spf.net.script.require = spf.tracing.instrument(spf.net.script.require, "spf.net.script.require");
    spf.net.script.require_ = spf.tracing.instrument(spf.net.script.require_, "spf.net.script.require_");
    spf.net.script.unrequire = spf.tracing.instrument(spf.net.script.unrequire, "spf.net.script.unrequire");
    spf.net.script.eval = spf.tracing.instrument(spf.net.script.eval, "spf.net.script.eval");
    spf.net.script.declare = spf.tracing.instrument(spf.net.script.declare, "spf.net.script.declare");
    spf.net.script.path = spf.tracing.instrument(spf.net.script.path, "spf.net.script.path");
  })();
}
;goog.provide("spf.net.style");
goog.require("spf.array");
goog.require("spf.net.resource");
goog.require("spf.string");
goog.require("spf.tracing");
spf.net.style.load = function(url, name, opt_fn) {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.load(type, url, name, opt_fn);
};
spf.net.style.unload = function(name) {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.unload(type, name);
};
spf.net.style.discover = function() {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.discover(type);
};
spf.net.style.get = function(url, opt_fn) {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.create(type, url, opt_fn);
};
spf.net.style.prefetch = function(urls) {
  var type = spf.net.resource.Type.CSS;
  urls = spf.array.toArray(urls);
  spf.array.each(urls, function(url) {
    spf.net.resource.prefetch(type, url);
  });
};
spf.net.style.eval = function(text, name) {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.eval(type, text, name);
};
spf.net.style.exec = function(text) {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.exec(type, text);
};
spf.net.style.path = function(paths) {
  var type = spf.net.resource.Type.CSS;
  spf.net.resource.path(type, paths);
};
if (spf.tracing.ENABLED) {
  (function() {
    spf.net.style.load = spf.tracing.instrument(spf.net.style.load, "spf.net.style.load");
    spf.net.style.unload = spf.tracing.instrument(spf.net.style.unload, "spf.net.style.unload");
    spf.net.style.discover = spf.tracing.instrument(spf.net.style.discover, "spf.net.style.discover");
    spf.net.style.get = spf.tracing.instrument(spf.net.style.get, "spf.net.style.get");
    spf.net.style.prefetch = spf.tracing.instrument(spf.net.style.prefetch, "spf.net.style.prefetch");
    spf.net.style.eval = spf.tracing.instrument(spf.net.style.eval, "spf.net.style.eval");
    spf.net.style.path = spf.tracing.instrument(spf.net.style.path, "spf.net.style.path");
  })();
}
;goog.provide("spf.nav.response");
goog.require("spf");
goog.require("spf.array");
goog.require("spf.config");
goog.require("spf.debug");
goog.require("spf.dom");
goog.require("spf.dom.classlist");
goog.require("spf.dom.dataset");
goog.require("spf.history");
goog.require("spf.net.connect");
goog.require("spf.net.script");
goog.require("spf.net.style");
goog.require("spf.string");
goog.require("spf.tasks");
goog.require("spf.tracing");
goog.require("spf.url");
spf.nav.response.parse = function(text, opt_multipart, opt_lastDitch) {
  if (opt_multipart) {
    var beginToken = spf.nav.response.Token.BEGIN;
    var delimToken = spf.nav.response.Token.DELIMITER;
    var endToken = spf.nav.response.Token.END;
    var lastDitchHalfToken = "\r\n";
    var parts = [];
    var chunk;
    var start = 0;
    if (opt_lastDitch) {
      text += lastDitchHalfToken;
    }
    var finish = text.indexOf(beginToken, start);
    if (finish > -1) {
      start = finish + beginToken.length;
    }
    while ((finish = text.indexOf(delimToken, start)) > -1) {
      chunk = spf.string.trim(text.substring(start, finish));
      start = finish + delimToken.length;
      if (chunk) {
        parts.push(JSON.parse(chunk));
      }
    }
    finish = text.indexOf(endToken, start);
    if (finish > -1) {
      chunk = spf.string.trim(text.substring(start, finish));
      start = finish + endToken.length;
      if (chunk) {
        parts.push(JSON.parse(chunk));
      }
    }
    var extra = "";
    if (text.length > start) {
      extra = text.substring(start);
      if (opt_lastDitch && spf.string.endsWith(extra, lastDitchHalfToken)) {
        extra = extra.substring(0, extra.length - lastDitchHalfToken.length);
      }
    }
    parts = spf.nav.response.extract(parts);
    return{parts:(parts), extra:extra};
  } else {
    var response = JSON.parse(text);
    var parts = spf.nav.response.extract(spf.array.toArray(response));
    return{parts:(parts), extra:""};
  }
};
spf.nav.response.process = function(url, response, opt_info, opt_callback) {
  spf.debug.info("nav.response.process ", response, opt_info);
  var isNavigate = opt_info && spf.string.startsWith(opt_info.type, "navigate");
  var isReverse = opt_info && opt_info.reverse;
  var hasPosition = opt_info && !!opt_info.position;
  var hasScrolled = opt_info && opt_info.scrolled;
  var name = response["name"] || "";
  var key = "process " + spf.url.absolute(url);
  var sync = !spf.config.get("experimental-process-async");
  var fn;
  var num = 0;
  if (!response["timing"]) {
    response["timing"] = {};
  }
  if (response["title"]) {
    document.title = response["title"];
  }
  if (isNavigate && response["url"]) {
    var fullUrl = spf.url.absolute(response["url"]);
    if (fullUrl != spf.nav.response.getCurrentUrl_()) {
      spf.debug.debug("  update history with response url");
      spf.history.replace(response["url"] + window.location.hash);
    }
  }
  if (response["head"]) {
    fn = spf.bind(function(head, timing) {
      var extracted = spf.nav.response.extract_(head);
      spf.nav.response.installLinks_(extracted);
      spf.nav.response.installStyles_(extracted);
      spf.debug.debug("    head css");
      spf.tasks.suspend(key);
      spf.nav.response.installScripts_(extracted, function() {
        timing["spfProcessHead"] = spf.now();
        spf.debug.debug("    head js");
        spf.tasks.resume(key, sync);
        spf.debug.debug("  process task done: head");
      });
    }, null, response["head"], response["timing"]);
    num = spf.tasks.add(key, fn);
    spf.debug.debug("  process task queued: head", num);
  }
  if (response["attr"]) {
    fn = spf.bind(function(attrs, timing) {
      for (var id in attrs) {
        var el = document.getElementById(id);
        if (el) {
          spf.dom.setAttributes(el, attrs[id]);
          spf.debug.debug("    attr set", id);
        }
      }
      timing["spfProcessAttr"] = spf.now();
      spf.debug.debug("  process task done: attr");
    }, null, response["attr"], response["timing"]);
    num = spf.tasks.add(key, fn);
    spf.debug.debug("  process task queued: attr", num);
  }
  var fragments = response["body"] || {};
  var numBeforeFragments = num;
  for (var id in fragments) {
    fn = spf.bind(function(id, body, timing) {
      var el = document.getElementById(id);
      if (el) {
        if (isNavigate && !hasPosition && !hasScrolled) {
          spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_POSITION, null);
          spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_URL, null);
          spf.debug.debug("    scrolling to top");
          window.scroll(0, 0);
          hasScrolled = true;
          if (opt_info) {
            opt_info.scrolled = true;
          }
        }
        var extracted = spf.nav.response.extract_(body);
        spf.nav.response.installStyles_(extracted);
        var installScripts = function() {
          spf.tasks.suspend(key);
          spf.nav.response.installScripts_(extracted, function() {
            spf.tasks.resume(key, sync);
            spf.debug.debug("  process task done: body", id);
          });
        };
        var animationClass = (spf.config.get("animation-class"));
        var noAnimation = !spf.nav.response.CAN_ANIMATE_ || !spf.dom.classlist.contains(el, animationClass);
        if (noAnimation) {
          var htmlHandler = (spf.config.get("experimental-html-handler"));
          if (htmlHandler) {
            spf.tasks.suspend(key);
            htmlHandler(extracted["html"], el, function() {
              installScripts();
              spf.tasks.resume(key, sync);
            });
          } else {
            el.innerHTML = extracted["html"];
            installScripts();
          }
        } else {
          var animation = new spf.nav.response.Animation_(el, extracted["html"], animationClass, name, parseInt(spf.config.get("animation-duration"), 10), !!isReverse);
          spf.tasks.suspend(key);
          spf.tasks.run(animation.key, true);
          spf.tasks.add(animation.key, spf.bind(spf.nav.response.prepareAnimation_, null, animation), 0);
          spf.debug.debug("  process queued prepare animation", id);
          spf.tasks.add(animation.key, spf.bind(spf.nav.response.runAnimation_, null, animation), 17);
          spf.debug.debug("  process queued run animation", id);
          spf.tasks.add(animation.key, spf.bind(spf.nav.response.completeAnimation_, null, animation), animation.duration);
          spf.debug.debug("  process queued complete animation", id);
          spf.tasks.add(animation.key, spf.bind(function() {
            installScripts();
            spf.tasks.resume(key, sync);
          }, null), 0);
          spf.tasks.run(animation.key);
        }
      }
    }, null, id, fragments[id], response["timing"]);
    num = spf.tasks.add(key, fn);
    spf.debug.debug("  process task queued: body", id, num);
  }
  var numAfterFragments = num;
  var numFragments = numAfterFragments - numBeforeFragments;
  if (response["foot"]) {
    fn = spf.bind(function(foot, timing, numFragments) {
      if (numFragments) {
        timing["spfProcessBody"] = spf.now();
      }
      var extracted = spf.nav.response.extract_(foot);
      spf.nav.response.installStyles_(extracted);
      spf.debug.debug("    foot css");
      spf.tasks.suspend(key);
      spf.nav.response.installScripts_(extracted, function() {
        timing["spfProcessFoot"] = spf.now();
        spf.debug.debug("    foot js");
        spf.tasks.resume(key, sync);
        spf.debug.debug("  process task done: foot");
      });
    }, null, response["foot"], response["timing"], numFragments);
    num = spf.tasks.add(key, fn);
    spf.debug.debug("  process task queued: foot", num);
  } else {
    if (numFragments) {
      fn = spf.bind(function(timing) {
        timing["spfProcessBody"] = spf.now();
        spf.debug.debug("  process task done: timing-for-body");
      }, null, response["timing"]);
      num = spf.tasks.add(key, fn);
      spf.debug.debug("  process task queued: timing-for-body", num);
    }
  }
  if (opt_callback) {
    num = spf.tasks.add(key, spf.bind(opt_callback, null, url, response));
    spf.debug.debug("  process task queued: callback", num);
  }
  spf.debug.debug("  process run", key, sync);
  spf.tasks.run(key, sync);
};
spf.nav.response.preprocess = function(url, response, opt_info, opt_callback) {
  spf.debug.info("nav.response.preprocess ", response);
  var key = "preprocess " + spf.url.absolute(url);
  var fn;
  if (response["head"]) {
    fn = spf.bind(function(head) {
      var extracted = spf.nav.response.extract_(head);
      spf.nav.response.preinstallLinks_(extracted);
      spf.nav.response.preinstallStyles_(extracted);
      spf.nav.response.preinstallScripts_(extracted);
      spf.debug.debug("  preprocess task done: head");
    }, null, response["head"]);
    spf.tasks.add(key, fn);
    spf.debug.debug("  preprocess task queued: head");
  }
  var fragments = response["body"] || {};
  for (var id in fragments) {
    if (fragments[id]) {
      fn = spf.bind(function(id, body) {
        var extracted = spf.nav.response.extract_(body);
        spf.nav.response.preinstallStyles_(extracted);
        spf.nav.response.preinstallScripts_(extracted);
        spf.debug.debug("    body js", id);
        spf.debug.debug("  preprocess task done: body", id);
      }, null, id, fragments[id]);
      spf.tasks.add(key, fn);
      spf.debug.debug("  preprocess task queued: body", id);
    }
  }
  if (response["foot"]) {
    fn = spf.bind(function(foot) {
      var extracted = spf.nav.response.extract_(foot);
      spf.nav.response.preinstallStyles_(extracted);
      spf.nav.response.preinstallScripts_(extracted);
      spf.debug.debug("  preprocess task done: foot");
    }, null, response["foot"]);
    spf.tasks.add(key, fn);
    spf.debug.debug("  preprocess task queued: foot");
  }
  if (opt_callback) {
    spf.tasks.add(key, spf.bind(opt_callback, null, url, response));
    spf.debug.debug("  preprocess task queued: callback");
  }
  spf.tasks.run(key);
};
spf.nav.response.prepareAnimation_ = function(data) {
  spf.dom.classlist.add(data.element, data.dirClass);
  spf.dom.classlist.add(data.element, data.fromClass);
  spf.dom.classlist.add(data.element, data.toClass);
  spf.dom.classlist.add(data.element, data.startClass);
  spf.dom.classlist.add(data.element, data.startClassDeprecated);
  data.oldEl = document.createElement("div");
  data.oldEl.className = data.oldClass;
  spf.dom.packElement(data.element, data.oldEl);
  data.newEl = document.createElement("div");
  data.newEl.className = data.newClass;
  data.newEl.innerHTML = data.html;
  if (data.reverse) {
    spf.dom.insertSiblingBefore(data.newEl, data.oldEl);
  } else {
    spf.dom.insertSiblingAfter(data.newEl, data.oldEl);
  }
  spf.debug.debug("  process done prepare animation", data.element.id);
};
spf.nav.response.runAnimation_ = function(data) {
  spf.dom.classlist.remove(data.element, data.startClass);
  spf.dom.classlist.remove(data.element, data.startClassDeprecated);
  spf.dom.classlist.add(data.element, data.endClass);
  spf.dom.classlist.add(data.element, data.endClassDeprecated);
  spf.debug.debug("  process done run animation", data.element.id);
};
spf.nav.response.completeAnimation_ = function(data) {
  data.element.removeChild(data.oldEl);
  spf.dom.unpackElement(data.newEl);
  spf.dom.classlist.remove(data.element, data.endClass);
  spf.dom.classlist.remove(data.element, data.endClassDeprecated);
  spf.dom.classlist.remove(data.element, data.fromClass);
  spf.dom.classlist.remove(data.element, data.toClass);
  spf.dom.classlist.remove(data.element, data.dirClass);
  spf.debug.debug("  process done complete animation", data.element.id);
};
spf.nav.response.extract = function(response) {
  spf.debug.debug("spf.nav.response.extract", response);
  var parts = spf.array.toArray(response);
  spf.array.each(parts, function(part) {
    if (part) {
      if (part["head"]) {
        part["head"] = spf.nav.response.extract_(part["head"]);
      }
      if (part["body"]) {
        for (var id in part["body"]) {
          part["body"][id] = spf.nav.response.extract_(part["body"][id]);
        }
      }
      if (part["foot"]) {
        part["foot"] = spf.nav.response.extract_(part["foot"]);
      }
    }
  });
  return response;
};
spf.nav.response.extract_ = function(frag) {
  var result = new spf.nav.response.Extraction_;
  if (!frag) {
    return result;
  }
  if (!spf.string.isString(frag)) {
    if (frag["scripts"]) {
      spf.array.each(frag["scripts"], function(script) {
        result["scripts"].push({url:script["url"] || "", text:script["text"] || "", name:script["name"] || "", async:script["async"] || false});
      });
    }
    if (frag["styles"]) {
      spf.array.each(frag["styles"], function(style) {
        result["styles"].push({url:style["url"] || "", text:style["text"] || "", name:style["name"] || ""});
      });
    }
    if (frag["links"]) {
      spf.array.each(frag["links"], function(link) {
        if (link["rel"] == "spf-preconnect") {
          result["links"].push({url:link["url"] || "", rel:link["rel"] || ""});
        }
      });
    }
    result["html"] = frag["html"] || "";
    return result;
  }
  frag = (frag);
  frag = frag.replace(spf.nav.response.ElementRegEx.SCRIPT_STYLE, function(full, tag, attr, text) {
    if (tag == "script") {
      var name = attr.match(spf.nav.response.AttributeRegEx.NAME);
      name = name ? name[1] : "";
      var url = attr.match(spf.nav.response.AttributeRegEx.SRC);
      url = url ? url[1] : "";
      var async = spf.nav.response.AttributeRegEx.ASYNC.test(attr);
      var type = spf.nav.response.AttributeRegEx.TYPE.exec(attr);
      var inject = !type || spf.string.contains(type[1], "/javascript") || spf.string.contains(type[1], "/x-javascript") || spf.string.contains(type[1], "/ecmascript");
      if (inject) {
        result["scripts"].push({url:url, text:text, name:name, async:async});
        return "";
      } else {
        return full;
      }
    }
    if (tag == "style") {
      var name = attr.match(spf.nav.response.AttributeRegEx.NAME);
      name = name ? name[1] : "";
      var type = spf.nav.response.AttributeRegEx.TYPE.exec(attr);
      var inject = !type || spf.string.contains(type[1], "text/css");
      if (inject) {
        result["styles"].push({url:"", text:text, name:name});
        return "";
      } else {
        return full;
      }
    }
    return full;
  });
  frag = frag.replace(spf.nav.response.ElementRegEx.LINK, function(full, attr) {
    var rel = attr.match(spf.nav.response.AttributeRegEx.REL);
    rel = rel ? rel[1] : "";
    if (rel == "stylesheet") {
      var name = attr.match(spf.nav.response.AttributeRegEx.NAME);
      name = name ? name[1] : "";
      var url = attr.match(spf.nav.response.AttributeRegEx.HREF);
      url = url ? url[1] : "";
      result["styles"].push({url:url, text:"", name:name});
      return "";
    }
    if (rel == "spf-preconnect") {
      var url = attr.match(spf.nav.response.AttributeRegEx.HREF);
      url = url ? url[1] : "";
      result["links"].push({url:url, rel:rel});
      return "";
    }
    return full;
  });
  result["html"] = frag;
  return result;
};
spf.nav.response.installScripts_ = function(result, opt_callback) {
  if (result["scripts"].length <= 0) {
    opt_callback && opt_callback();
    return;
  }
  var index = -1;
  var next = function() {
    index++;
    if (index < result["scripts"].length) {
      var item = result["scripts"][index];
      var fn = function() {
      };
      if (item.url) {
        if (item.name) {
          fn = spf.bind(spf.net.script.load, null, item.url, item.name);
        } else {
          fn = spf.bind(spf.net.script.get, null, item.url);
        }
      } else {
        if (item.text) {
          if (item.name) {
            fn = spf.bind(spf.net.script.eval, null, item.text, item.name);
          } else {
            fn = spf.bind(spf.net.script.exec, null, item.text);
          }
        }
      }
      if (item.url && !item.async) {
        fn(next);
      } else {
        fn();
        next();
      }
    } else {
      opt_callback && opt_callback();
    }
  };
  next();
};
spf.nav.response.preinstallScripts_ = function(result) {
  if (result["scripts"].length <= 0) {
    return;
  }
  var urls = spf.array.map(result["scripts"], function(item) {
    return item.url;
  });
  spf.net.script.prefetch(urls);
};
spf.nav.response.installStyles_ = function(result) {
  if (result["styles"].length <= 0) {
    return;
  }
  spf.array.each(result["styles"], function(item) {
    if (item.url) {
      if (item.name) {
        spf.net.style.load(item.url, item.name);
      } else {
        spf.net.style.get(item.url);
      }
    } else {
      if (item.text) {
        if (item.name) {
          spf.net.style.eval(item.text, item.name);
        } else {
          spf.net.style.exec(item.text);
        }
      }
    }
  });
};
spf.nav.response.preinstallStyles_ = function(result) {
  if (result["styles"].length <= 0) {
    return;
  }
  var urls = spf.array.map(result["styles"], function(item) {
    return item.url;
  });
  spf.net.style.prefetch(urls);
};
spf.nav.response.installLinks_ = function(result) {
  spf.nav.response.preinstallLinks_(result);
};
spf.nav.response.preinstallLinks_ = function(result) {
  if (result["links"].length <= 0) {
    return;
  }
  var urls = spf.array.map(result["links"], function(item) {
    return item.rel == "spf-preconnect" ? item.url : "";
  });
  spf.net.connect.preconnect(urls);
};
spf.nav.response.getCurrentUrl_ = function() {
  return spf.url.absolute(window.location.href);
};
spf.nav.response.Animation_ = function(el, html, cls, name, duration, reverse) {
  this.element = el;
  this.html = html;
  this.duration = duration;
  this.reverse = reverse;
  var prevName = spf.dom.dataset.get(document.body, "spfName") || "";
  this.key = spf.tasks.key(el);
  this.fromClass = prevName && cls + "-from-" + prevName;
  this.toClass = name && cls + "-to-" + name;
  this.oldEl = null;
  this.oldClass = cls + "-old";
  this.newEl = null;
  this.newClass = cls + "-new";
  this.dirClass = cls + (reverse ? "-reverse" : "-forward");
  this.startClass = cls + "-start";
  this.startClassDeprecated = this.dirClass + "-start";
  this.endClass = cls + "-end";
  this.endClassDeprecated = this.dirClass + "-end";
};
spf.nav.response.Extraction_ = function() {
  this["html"] = "";
  this["scripts"] = [];
  this["styles"] = [];
  this["links"] = [];
};
spf.nav.response.CAN_ANIMATE_ = function() {
  var testEl = document.createElement("div");
  if ("transition" in testEl.style) {
    return true;
  }
  var prefixes = ["webkit", "Moz", "Ms", "O", "Khtml"];
  return spf.array.some(prefixes, function(prefix) {
    return prefix + "Transition" in testEl.style;
  });
}();
spf.nav.response.ElementRegEx = {LINK:/\x3clink([\s\S]*?)\x3e/ig, SCRIPT_STYLE:/\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig};
spf.nav.response.AttributeRegEx = {ASYNC:/(?:\s|^)async(?:\s|=|$)/i, HREF:/(?:\s|^)href\s*=\s*["']?([^\s"']+)/i, NAME:/(?:\s|^)name\s*=\s*["']?([^\s"']+)/i, REL:/(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i, SRC:/(?:\s|^)src\s*=\s*["']?([^\s"']+)/i, TYPE:/(?:\s|^)type\s*=\s*["']([^"']+)["']/i};
spf.nav.response.Token = {BEGIN:"[\r\n", DELIMITER:",\r\n", END:"]\r\n"};
if (spf.tracing.ENABLED) {
  (function() {
    spf.nav.response.parse = spf.tracing.instrument(spf.nav.response.parse, "spf.nav.response.parse");
    spf.nav.response.process = spf.tracing.instrument(spf.nav.response.process, "spf.nav.response.process");
    spf.nav.response.preprocess = spf.tracing.instrument(spf.nav.response.preprocess, "spf.nav.response.preprocess");
    spf.nav.response.extract = spf.tracing.instrument(spf.nav.response.extract, "spf.nav.response.extract");
    spf.nav.response.extract_ = spf.tracing.instrument(spf.nav.response.extract_, "spf.nav.response.extract_");
    spf.nav.response.installScripts_ = spf.tracing.instrument(spf.nav.response.installScripts_, "spf.nav.response.installScripts_");
    spf.nav.response.preinstallScripts_ = spf.tracing.instrument(spf.nav.response.preinstallScripts_, "spf.nav.response.preinstallScripts_");
    spf.nav.response.installStyles_ = spf.tracing.instrument(spf.nav.response.installStyles_, "spf.nav.response.installStyles_");
    spf.nav.response.preinstallStyles_ = spf.tracing.instrument(spf.nav.response.preinstallStyles_, "spf.nav.response.preinstallStyles_");
    spf.nav.response.installLinks_ = spf.tracing.instrument(spf.nav.response.installLinks_, "spf.nav.response.installLinks_");
    spf.nav.response.preinstallLinks_ = spf.tracing.instrument(spf.nav.response.preinstallLinks_, "spf.nav.response.preinstallLinks_");
  })();
}
;goog.provide("spf.net.xhr");
goog.require("spf");
spf.net.xhr.Options;
spf.net.xhr.PostData;
spf.net.xhr.get = function(url, opt_options) {
  return spf.net.xhr.send("GET", url, null, opt_options);
};
spf.net.xhr.post = function(url, data, opt_options) {
  return spf.net.xhr.send("POST", url, data, opt_options);
};
spf.net.xhr.send = function(method, url, data, opt_options) {
  var options = opt_options || {};
  var chunked = false;
  var offset = 0;
  var timer;
  var xhr = new XMLHttpRequest;
  xhr.open(method, url, true);
  xhr["timing"] = {};
  var xhr_abort = xhr.abort;
  xhr.abort = function() {
    clearTimeout(timer);
    xhr.onreadystatechange = null;
    xhr_abort.call(xhr);
  };
  xhr.onreadystatechange = function() {
    var timing = xhr["timing"];
    if (xhr.readyState == spf.net.xhr.State.HEADERS_RECEIVED) {
      timing["responseStart"] = timing["responseStart"] || spf.now();
      chunked = spf.net.xhr.isChunked_(xhr);
      if (options.onHeaders) {
        options.onHeaders(xhr);
      }
    } else {
      if (xhr.readyState == spf.net.xhr.State.LOADING) {
        if (chunked && options.onChunk) {
          var chunk = xhr.responseText.substring(offset);
          offset = xhr.responseText.length;
          options.onChunk(xhr, chunk);
        }
      } else {
        if (xhr.readyState == spf.net.xhr.State.DONE) {
          timing["responseEnd"] = timing["responseEnd"] || spf.now();
          if (window.performance && window.performance.getEntriesByName) {
            xhr["resourceTiming"] = window.performance.getEntriesByName(url).pop();
          }
          if (chunked && options.onChunk && xhr.responseText.length > offset) {
            var chunk = xhr.responseText.substring(offset);
            offset = xhr.responseText.length;
            options.onChunk(xhr, chunk);
          }
          clearTimeout(timer);
          if (options.onDone) {
            options.onDone(xhr);
          }
        }
      }
    }
  };
  if ("responseType" in xhr && options.responseType == "json") {
    xhr.responseType = "json";
  }
  if (options.withCredentials) {
    xhr.withCredentials = options.withCredentials;
  }
  var isFormData = "FormData" in window && data instanceof FormData;
  var addContentTypeFormUrlEncoded = method == "POST" && !isFormData;
  if (options.headers) {
    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key]);
      if ("content-type" == key.toLowerCase()) {
        addContentTypeFormUrlEncoded = false;
      }
    }
  }
  if (addContentTypeFormUrlEncoded) {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  if (options.timeoutMs > 0) {
    timer = setTimeout(function() {
      xhr.abort();
      if (options.onTimeout) {
        options.onTimeout(xhr);
      }
    }, options.timeoutMs);
  }
  xhr["timing"]["fetchStart"] = spf.now();
  xhr.send(data);
  return xhr;
};
spf.net.xhr.isChunked_ = function(xhr) {
  if (xhr.responseType == "json") {
    return false;
  }
  var encoding = xhr.getResponseHeader("Transfer-Encoding") || "";
  if (encoding.toLowerCase().indexOf("chunked") > -1) {
    return true;
  }
  var firefoxSpdy = xhr.getResponseHeader("X-Firefox-Spdy");
  var loadTimes = window.chrome && chrome.loadTimes && chrome.loadTimes();
  var chromeSpdy = loadTimes && loadTimes.wasFetchedViaSpdy;
  return!!(firefoxSpdy || chromeSpdy);
};
spf.net.xhr.State = {UNSENT:0, OPENED:1, HEADERS_RECEIVED:2, LOADING:3, DONE:4};
goog.provide("spf.nav.request");
goog.require("spf");
goog.require("spf.array");
goog.require("spf.async");
goog.require("spf.cache");
goog.require("spf.config");
goog.require("spf.debug");
goog.require("spf.nav.response");
goog.require("spf.net.xhr");
goog.require("spf.string");
goog.require("spf.tracing");
goog.require("spf.url");
spf.nav.request.Options;
spf.nav.request.send = function(url, opt_options) {
  spf.debug.debug("nav.request.send ", url, opt_options);
  var options = opt_options || ({});
  options.method = ((options.method || "GET") + "").toUpperCase();
  options.type = options.type || "request";
  var requestUrl = spf.url.absolute(spf.url.identify(url, options.type));
  spf.debug.debug("    request url ", requestUrl);
  var timing = {};
  timing["spfUrl"] = requestUrl;
  timing["startTime"] = spf.now();
  timing["fetchStart"] = timing["startTime"];
  var cacheKey = spf.nav.request.getCacheKey_(url, options.current, null, options.type, false);
  var cached = spf.nav.request.getCacheObject_(cacheKey, options.current);
  timing["spfPrefetched"] = !!cached && cached.type == "prefetch";
  timing["spfCached"] = !!cached;
  if (cached) {
    var response = (cached.response);
    var handleCache = spf.bind(spf.nav.request.handleResponseFromCache_, null, url, options, timing, cached.key, response);
    spf.async.defer(handleCache);
    return null;
  } else {
    spf.debug.debug("    sending XHR");
    var headers = {};
    var configHeaders = (spf.config.get("request-headers"));
    if (configHeaders) {
      for (var key in configHeaders) {
        var value = configHeaders[key];
        headers[key] = value == null ? "" : value;
      }
    }
    if (options.headers) {
      for (var key in options.headers) {
        var value = options.headers[key];
        headers[key] = value == null ? "" : value;
      }
    }
    if (options.referer != null) {
      headers["X-SPF-Referer"] = options.referer;
    }
    if (options.current != null) {
      headers["X-SPF-Previous"] = options.current;
    }
    var headerId = (spf.config.get("advanced-header-identifier"));
    if (headerId) {
      headers["X-SPF-Request"] = headerId.replace("__type__", options.type);
      headers["Accept"] = "application/json";
    }
    var chunking = new spf.nav.request.Chunking_;
    var handleHeaders = spf.bind(spf.nav.request.handleHeadersFromXHR_, null, url, chunking);
    var handleChunk = spf.bind(spf.nav.request.handleChunkFromXHR_, null, url, options, timing, chunking);
    var handleComplete = spf.bind(spf.nav.request.handleCompleteFromXHR_, null, url, options, timing, chunking);
    var xhrOpts = {headers:headers, timeoutMs:(spf.config.get("request-timeout")), onHeaders:handleHeaders, onChunk:handleChunk, onDone:handleComplete, onTimeout:handleComplete};
    if (options.withCredentials) {
      xhrOpts.withCredentials = options.withCredentials;
    }
    if (spf.config.get("advanced-response-type-json")) {
      xhrOpts.responseType = "json";
    }
    var xhr;
    if (options.method == "POST") {
      xhr = spf.net.xhr.post(requestUrl, options.postData, xhrOpts);
    } else {
      xhr = spf.net.xhr.get(requestUrl, xhrOpts);
    }
    return xhr;
  }
};
spf.nav.request.handleResponseFromCache_ = function(url, options, timing, cacheKey, response) {
  spf.debug.debug("nav.request.handleResponseFromCache_ ", url, response);
  var updateCache = false;
  timing["responseStart"] = timing["responseEnd"] = spf.now();
  if (options.type && spf.string.startsWith(options.type, "navigate")) {
    timing["navigationStart"] = timing["startTime"];
    if (!spf.config.get("cache-unified")) {
      spf.cache.remove(cacheKey);
      updateCache = true;
    }
  }
  if (options.onPart && response["type"] == "multipart") {
    var parts = response["parts"];
    spf.array.each(parts, function(part) {
      if (!part["timing"]) {
        part["timing"] = {};
      }
      part["timing"]["spfCached"] = !!timing["spfCached"];
      part["timing"]["spfPrefetched"] = !!timing["spfPrefetched"];
      options.onPart(url, part);
    });
  }
  spf.nav.request.done_(url, options, timing, response, updateCache);
};
spf.nav.request.handleHeadersFromXHR_ = function(url, chunking, xhr) {
  spf.debug.debug("nav.request.handleHeadersFromXHR_ ", url, xhr);
  var responseType = xhr.getResponseHeader("X-SPF-Response-Type") || "";
  var multipart = spf.string.contains(responseType.toLowerCase(), "multipart");
  spf.debug.debug("    response is", (multipart ? "" : "non-") + "multipart");
  chunking.multipart = multipart;
};
spf.nav.request.handleChunkFromXHR_ = function(url, options, timing, chunking, xhr, chunk, opt_lastDitch) {
  spf.debug.debug("nav.request.handleChunkFromXHR_ ", url, {"extra":chunking.extra, "chunk":chunk});
  if (!chunking.multipart) {
    spf.debug.debug("    skipping non-multipart response");
    return;
  }
  var text = chunking.extra + chunk;
  var parsed;
  try {
    parsed = spf.nav.response.parse(text, true, opt_lastDitch);
  } catch (err) {
    spf.debug.debug("    JSON parse failed", text);
    xhr.abort();
    if (options.onError) {
      options.onError(url, err, xhr);
    }
    return;
  }
  if (options.onPart) {
    spf.array.each(parsed.parts, function(part) {
      spf.debug.debug("    parsed part", part);
      if (!part["timing"]) {
        part["timing"] = {};
      }
      part["timing"]["spfCached"] = !!timing["spfCached"];
      part["timing"]["spfPrefetched"] = !!timing["spfPrefetched"];
      options.onPart(url, part);
    });
  }
  chunking.complete = chunking.complete.concat(parsed.parts);
  chunking.extra = parsed.extra;
};
spf.nav.request.handleCompleteFromXHR_ = function(url, options, timing, chunking, xhr) {
  if (xhr.responseType == "json") {
    spf.debug.debug("nav.request.handleCompleteFromXHR_ ", url, xhr.response);
  } else {
    spf.debug.debug("nav.request.handleCompleteFromXHR_ ", url, {"extra":chunking.extra, "complete":xhr.responseText});
  }
  if (xhr["timing"]) {
    for (var t in xhr["timing"]) {
      timing[t] = xhr["timing"][t];
    }
  }
  if (xhr["resourceTiming"]) {
    if (options.type == "load") {
      for (var key in xhr["resourceTiming"]) {
        timing[key] = xhr["resourceTiming"][key];
      }
    } else {
      if (window.performance && window.performance.timing) {
        var navigationStart = window.performance.timing.navigationStart;
        var startTime = navigationStart + xhr["resourceTiming"]["startTime"];
        if (startTime >= timing["startTime"]) {
          for (var metric in xhr["resourceTiming"]) {
            var value = xhr["resourceTiming"][metric];
            if (value !== undefined && (spf.string.endsWith(metric, "Start") || spf.string.endsWith(metric, "End") || metric == "startTime")) {
              timing[metric] = navigationStart + Math.round(value);
            }
          }
        }
      }
    }
  }
  if (options.type != "load") {
    timing["navigationStart"] = timing["startTime"];
  }
  if (chunking.complete.length) {
    chunking.extra = spf.string.trim(chunking.extra);
    if (chunking.extra) {
      spf.nav.request.handleChunkFromXHR_(url, options, timing, chunking, xhr, "", true);
    }
  }
  var parts;
  if (xhr.responseType == "json") {
    if (!xhr.response) {
      spf.debug.debug("    JSON parse failed");
      if (options.onError) {
        options.onError(url, new Error("JSON response parsing failed"), xhr);
      }
      return;
    }
    parts = spf.nav.response.extract(spf.array.toArray(xhr.response));
  } else {
    try {
      var parsed = spf.nav.response.parse(xhr.responseText);
      parts = parsed.parts;
    } catch (err) {
      spf.debug.debug("    JSON parse failed");
      if (options.onError) {
        options.onError(url, err, xhr);
      }
      return;
    }
  }
  if (options.onPart && parts.length > 1) {
    for (var i = chunking.complete.length;i < parts.length;i++) {
      spf.debug.debug("    parsed part", parts[i]);
      var part = parts[i];
      if (!part["timing"]) {
        part["timing"] = {};
      }
      part["timing"]["spfCached"] = !!timing["spfCached"];
      part["timing"]["spfPrefetched"] = !!timing["spfPrefetched"];
      options.onPart(url, part);
    }
  }
  var response;
  if (parts.length > 1) {
    var cacheType;
    spf.array.each(parts, function(part) {
      if (part["cacheType"]) {
        cacheType = part["cacheType"];
      }
    });
    response = ({"parts":parts, "type":"multipart"});
    if (cacheType) {
      response["cacheType"] = cacheType;
    }
  } else {
    if (parts.length == 1) {
      response = (parts[0]);
    } else {
      response = ({});
    }
  }
  spf.nav.request.done_(url, options, timing, response, true);
};
spf.nav.request.done_ = function(url, options, timing, response, cache) {
  spf.debug.debug("nav.request.done_", url, options, timing, response, cache);
  if (cache && options.method != "POST") {
    var cacheKey = spf.nav.request.getCacheKey_(url, options.current, response["cacheType"], options.type, true);
    if (cacheKey) {
      response["cacheKey"] = cacheKey;
      spf.nav.request.setCacheObject_(cacheKey, response, options.type || "");
    }
  }
  response["timing"] = timing;
  if (options.onSuccess) {
    options.onSuccess(url, response);
  }
};
spf.nav.request.getCacheKey_ = function(url, opt_current, opt_cacheType, opt_requestType, opt_set) {
  var absoluteUrl = spf.url.absolute(url);
  var cacheKey;
  if (spf.config.get("cache-unified")) {
    cacheKey = absoluteUrl;
  } else {
    if (opt_requestType == "navigate-back" || opt_requestType == "navigate-forward") {
      cacheKey = "history " + absoluteUrl;
    } else {
      if (opt_requestType == "navigate") {
        cacheKey = (opt_set ? "history " : "prefetch ") + absoluteUrl;
      } else {
        if (opt_requestType == "prefetch") {
          cacheKey = opt_set ? "prefetch " + absoluteUrl : "";
        }
      }
    }
  }
  if (opt_current && opt_cacheType == "url") {
    cacheKey += " previous " + opt_current;
  } else {
    if (opt_current && opt_cacheType == "path") {
      cacheKey += " previous " + spf.url.path(opt_current);
    }
  }
  return cacheKey || "";
};
spf.nav.request.getCacheObject_ = function(cacheKey, opt_current) {
  var keys = [];
  if (opt_current) {
    keys.push(cacheKey + " previous " + opt_current);
    keys.push(cacheKey + " previous " + spf.url.path(opt_current));
  }
  keys.push(cacheKey);
  var cacheValue = null;
  spf.array.some(keys, function(key) {
    var obj = spf.cache.get(key);
    if (obj) {
      cacheValue = {key:key, response:obj["response"], type:obj["type"]};
    }
    return!!obj;
  });
  return cacheValue;
};
spf.nav.request.setCacheObject_ = function(cacheKey, response, type) {
  var cacheValue = {"response":response, "type":type};
  spf.cache.set(cacheKey, cacheValue, (spf.config.get("cache-lifetime")));
};
spf.nav.request.Chunking_ = function() {
  this.multipart = false;
  this.extra = "";
  this.complete = [];
};
if (spf.tracing.ENABLED) {
  (function() {
    var request = spf.nav.request;
    request.send = spf.tracing.instrument(request.send, "spf.nav.request.send");
    request.handleResponseFromCache_ = spf.tracing.instrument(request.handleResponseFromCache_, "spf.nav.request.handleResponseFromCache_");
    request.handleHeadersFromXHR_ = spf.tracing.instrument(request.handleHeadersFromXHR_, "spf.nav.request.handleHeadersFromXHR_");
    request.handleChunkFromXHR_ = spf.tracing.instrument(request.handleChunkFromXHR_, "spf.nav.request.handleChunkFromXHR_");
    request.handleCompleteFromXHR_ = spf.tracing.instrument(request.handleCompleteFromXHR_, "spf.nav.request.handleCompleteFromXHR_");
    request.done_ = spf.tracing.instrument(request.done_, "spf.nav.request.done_");
  })();
}
;goog.provide("spf.nav");
goog.require("spf");
goog.require("spf.array");
goog.require("spf.cache");
goog.require("spf.config");
goog.require("spf.debug");
goog.require("spf.dom");
goog.require("spf.dom.classlist");
goog.require("spf.dom.dataset");
goog.require("spf.history");
goog.require("spf.nav.request");
goog.require("spf.nav.response");
goog.require("spf.state");
goog.require("spf.string");
goog.require("spf.tasks");
goog.require("spf.tracing");
goog.require("spf.url");
spf.nav.init = function() {
  spf.history.init(spf.nav.handleHistory_, spf.nav.dispatchError_);
  if (spf.state.get(spf.state.Key.NAV_INIT) || !document.addEventListener) {
    return;
  }
  spf.state.set(spf.state.Key.NAV_INIT, true);
  spf.state.set(spf.state.Key.NAV_INIT_TIME, spf.now());
  spf.state.set(spf.state.Key.NAV_COUNTER, 0);
  document.addEventListener("click", spf.nav.handleClick_, false);
  spf.state.set(spf.state.Key.NAV_CLICK_LISTENER, spf.nav.handleClick_);
  if (spf.config.get("experimental-prefetch-mousedown") && !spf.nav.isTouchCapablePlatform_()) {
    document.addEventListener("mousedown", spf.nav.handleMouseDown_, false);
    spf.state.set(spf.state.Key.NAV_MOUSEDOWN_LISTENER, spf.nav.handleMouseDown_);
  }
  document.addEventListener("scroll", spf.nav.handleScroll_, false);
  spf.state.set(spf.state.Key.NAV_SCROLL_LISTENER, spf.nav.handleScroll_);
};
spf.nav.dispose = function() {
  spf.nav.cancel();
  if (spf.state.get(spf.state.Key.NAV_INIT)) {
    if (document.removeEventListener) {
      var handleClick = (spf.state.get(spf.state.Key.NAV_CLICK_LISTENER));
      document.removeEventListener("click", handleClick, false);
      var handleMouseDown = (spf.state.get(spf.state.Key.NAV_MOUSEDOWN_LISTENER));
      document.removeEventListener("mousedown", handleMouseDown, false);
      var handleScroll = (spf.state.get(spf.state.Key.NAV_SCROLL_LISTENER));
      document.removeEventListener("scroll", handleScroll, false);
    }
    spf.state.set(spf.state.Key.NAV_CLICK_LISTENER, null);
    spf.state.set(spf.state.Key.NAV_MOUSEDOWN_LISTENER, null);
    spf.state.set(spf.state.Key.NAV_SCROLL_LISTENER, null);
    spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_POSITION, null);
    spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_URL, null);
    spf.state.set(spf.state.Key.NAV_INIT, false);
    spf.state.set(spf.state.Key.NAV_INIT_TIME, null);
    spf.state.set(spf.state.Key.NAV_COUNTER, null);
  }
  spf.history.dispose();
};
spf.nav.getAncestorWithLinkClass_ = function(element) {
  return spf.dom.getAncestor(element, function(node) {
    return spf.dom.classlist.contains(node, (spf.config.get("link-class")));
  });
};
spf.nav.getAncestorWithNoLinkClass_ = function(element) {
  return spf.dom.getAncestor(element, function(node) {
    return spf.dom.classlist.contains(node, (spf.config.get("nolink-class")));
  });
};
spf.nav.getAncestorWithHref_ = function(element, parent) {
  return spf.dom.getAncestor(element, function(node) {
    return node.href && node.tagName.toLowerCase() != "img";
  }, parent);
};
spf.nav.getEventURL_ = function(evt) {
  if (evt.metaKey || evt.altKey || evt.ctrlKey || evt.shiftKey) {
    spf.debug.debug("    ignoring click with modifier key");
    return null;
  }
  if (evt.button > 0) {
    spf.debug.debug("    ignoring click with alternate button");
    return null;
  }
  var linkEl = spf.nav.getAncestorWithLinkClass_(evt.target);
  if (!linkEl) {
    spf.debug.debug("    ignoring click without link class");
    return null;
  }
  if (spf.config.get("nolink-class")) {
    var nolinkEl = spf.nav.getAncestorWithNoLinkClass_(evt.target);
    if (nolinkEl) {
      spf.debug.debug("    ignoring click with nolink class");
      return null;
    }
  }
  var target = spf.nav.getAncestorWithHref_(evt.target, linkEl);
  if (!target) {
    spf.debug.debug("    ignoring click without href parent");
    return null;
  }
  return target.href;
};
spf.nav.isAllowed_ = function(url) {
  var destination = spf.url.origin(url);
  if (destination != spf.url.origin(window.location.href)) {
    spf.debug.warn("destination not same-origin");
    return false;
  }
  return true;
};
spf.nav.isEligible_ = function(url) {
  if (!spf.state.get(spf.state.Key.NAV_INIT)) {
    spf.debug.warn("navigation not initialized");
    return false;
  }
  var count = parseInt(spf.state.get(spf.state.Key.NAV_COUNTER), 10) || 0;
  count++;
  var limit = parseInt(spf.config.get("navigate-limit"), 10);
  limit = isNaN(limit) ? Infinity : limit;
  if (count > limit) {
    spf.debug.warn("navigation limit reached");
    return false;
  }
  var timestamp = parseInt(spf.state.get(spf.state.Key.NAV_INIT_TIME), 10);
  timestamp--;
  var age = spf.now() - timestamp;
  var lifetime = parseInt(spf.config.get("navigate-lifetime"), 10);
  lifetime = isNaN(lifetime) ? Infinity : lifetime;
  if (age > lifetime) {
    spf.debug.warn("navigation lifetime reached");
    return false;
  }
  return true;
};
spf.nav.isNavigable_ = function(url, opt_current) {
  var current = opt_current || window.location.href;
  if (spf.string.contains(url, "#")) {
    var absoluteUrl = spf.url.absolute(url);
    var absoluteCurrent = spf.url.absolute(current);
    if (absoluteUrl == absoluteCurrent) {
      spf.debug.debug("    not handling hash-based navigation");
      return false;
    }
  }
  return true;
};
spf.nav.handleClick_ = function(evt) {
  spf.debug.debug("nav.handleClick ", "evt=", evt);
  if (evt.defaultPrevented) {
    return;
  }
  var url = spf.nav.getEventURL_(evt);
  if (!url) {
    return;
  }
  url = spf.url.appendPersistentParameters(url);
  if (!spf.nav.isAllowed_(url)) {
    return;
  }
  if (!spf.nav.isEligible_(url)) {
    return;
  }
  if (!spf.nav.dispatchClick_(url, evt.target)) {
    return;
  }
  var options = spf.nav.createOptions_();
  var info = new spf.nav.Info;
  spf.nav.navigate_(url, options, info);
  evt.preventDefault();
};
spf.nav.handleMouseDown_ = function(evt) {
  spf.debug.debug("nav.handleMouseDown ", "evt=", evt);
  var url = spf.nav.getEventURL_(evt);
  if (!url) {
    return;
  }
  setTimeout(function() {
    spf.nav.prefetch((url));
  }, 0);
};
spf.nav.handleScroll_ = function(evt) {
  var position = spf.nav.getScrollTempPosition_();
  spf.nav.clearScrollTempPosition_();
  if (position) {
    spf.debug.debug("    returning to saved scroll temp position", position);
    window.scroll.apply(null, position);
  }
};
spf.nav.handleHistory_ = function(url, opt_state) {
  spf.debug.debug("nav.handleHistory ", "(url=", url, "state=", opt_state, ")");
  var info = new spf.nav.Info({current:opt_state && opt_state["spf-current"], history:true, position:opt_state && opt_state["spf-position"], referer:opt_state && opt_state["spf-referer"], reverse:!!(opt_state && opt_state["spf-back"])});
  var reloadId = (spf.config.get("reload-identifier"));
  if (reloadId) {
    url = spf.url.removeParameters(url, [reloadId]);
  }
  if (!spf.nav.isAllowed_(url)) {
    spf.nav.reload(url, spf.nav.ReloadReason.FORBIDDEN);
    return;
  }
  if (!spf.nav.isEligible_(url)) {
    spf.nav.reload(url, spf.nav.ReloadReason.INELIGIBLE);
    return;
  }
  if (!spf.nav.dispatchHistory_(url, info.referer, info.current)) {
    return;
  }
  if (info.position) {
    spf.nav.setScrollTempPosition_();
  }
  var options = spf.nav.createOptions_();
  spf.nav.navigate_(url, options, info);
};
spf.nav.navigate = function(url, opt_options) {
  spf.debug.debug("nav.navigate ", "(url=", url, "options=", opt_options, ")");
  if (!url) {
    return;
  }
  url = spf.url.appendPersistentParameters(url);
  if (!spf.nav.isAllowed_(url)) {
    spf.nav.reload(url, spf.nav.ReloadReason.FORBIDDEN);
    return;
  }
  if (!spf.nav.isEligible_(url)) {
    spf.nav.reload(url, spf.nav.ReloadReason.INELIGIBLE);
    return;
  }
  var options = spf.nav.createOptions_(opt_options);
  var info = new spf.nav.Info;
  spf.nav.navigate_(url, options, info);
};
spf.nav.navigate_ = function(url, options, info) {
  spf.debug.info("nav.navigate_ ", url, options, info);
  spf.nav.cancel();
  if (!spf.nav.isNavigable_(url, info.current)) {
    spf.debug.debug("non-navigable, just scroll");
    if (!info.history) {
      var handleError = spf.bind(spf.nav.handleNavigateError_, null, options);
      spf.nav.navigateAddHistory_(url, info.referer, handleError);
    }
    spf.nav.navigateScroll_(url, info);
    return;
  }
  if (!spf.nav.dispatchRequest_(url, info.referer, info.current, options)) {
    spf.nav.reload(url, spf.nav.ReloadReason.REQUEST_CANCELED);
    return;
  }
  var count = (parseInt(spf.state.get(spf.state.Key.NAV_COUNTER), 10) || 0) + 1;
  spf.state.set(spf.state.Key.NAV_COUNTER, count);
  spf.nav.cancelAllPrefetchesExcept(url);
  var absoluteUrl = spf.url.absolute(url);
  var preprocessKey = spf.nav.preprocessKey(absoluteUrl);
  spf.tasks.cancelAllExcept("preprocess", preprocessKey);
  var prefetches = spf.nav.prefetches_();
  var prefetchXhr = prefetches[absoluteUrl];
  spf.state.set(spf.state.Key.NAV_REQUEST, prefetchXhr);
  spf.state.set(spf.state.Key.NAV_PROMOTE, null);
  spf.state.set(spf.state.Key.NAV_PROMOTE_TIME, null);
  if (prefetchXhr && prefetchXhr.readyState != 4) {
    spf.nav.navigatePromotePrefetch_(url, options, info);
  } else {
    spf.nav.navigateSendRequest_(url, options, info);
  }
};
spf.nav.navigatePromotePrefetch_ = function(url, options, info) {
  spf.debug.debug("nav.navigatePromotePrefetch_ ", url);
  var preprocessKey = spf.nav.preprocessKey(url);
  var promoteKey = spf.nav.promoteKey(url);
  spf.state.set(spf.state.Key.NAV_PROMOTE, url);
  spf.state.set(spf.state.Key.NAV_PROMOTE_TIME, spf.now());
  spf.tasks.cancel(preprocessKey);
  spf.tasks.run(promoteKey, true);
  if (!info.history) {
    var handleError = spf.bind(spf.nav.handleNavigateError_, null, options);
    spf.nav.navigateAddHistory_(url, info.referer, handleError);
  }
};
spf.nav.navigateSendRequest_ = function(url, options, info) {
  var handleError = spf.bind(spf.nav.handleNavigateError_, null, options);
  var handlePart = spf.bind(spf.nav.handleNavigatePart_, null, options, info);
  var handleSuccess = spf.bind(spf.nav.handleNavigateSuccess_, null, options, info);
  if (!spf.config.get("advanced-navigate-persist-timing")) {
    spf.nav.clearResourceTimings_();
  }
  info.type = "navigate";
  if (info.history) {
    info.type += info.reverse ? "-back" : "-forward";
  }
  var xhr = spf.nav.request.send(url, {method:options["method"], headers:options["headers"], onPart:handlePart, onError:handleError, onSuccess:handleSuccess, postData:options["postData"], type:info.type, current:info.current, referer:info.referer});
  spf.state.set(spf.state.Key.NAV_REQUEST, xhr);
  if (!info.history) {
    spf.nav.navigateAddHistory_(url, info.referer, handleError);
  }
};
spf.nav.navigateScroll_ = function(url, info) {
  if (info.position) {
    spf.debug.debug("    clearing scroll temp position");
    spf.nav.clearScrollTempPosition_();
    spf.debug.debug("    scrolling to position", info.position);
    window.scroll.apply(null, info.position);
    info.scrolled = true;
    return;
  }
  var result = spf.string.partition(url, "#");
  if (result[2]) {
    var el = document.getElementById(result[2]);
    if (el) {
      spf.debug.debug("    clearing scroll temp position");
      spf.nav.clearScrollTempPosition_();
      spf.debug.debug("    scrolling into view", result[2]);
      el.scrollIntoView();
      info.scrolled = true;
    }
  } else {
    if (!info.scrolled) {
      spf.debug.debug("    clearing scroll temp position");
      spf.nav.clearScrollTempPosition_();
      spf.debug.debug("    scrolling to top");
      window.scroll(0, 0);
      info.scrolled = true;
    }
  }
};
spf.nav.navigateAddHistory_ = function(url, referer, handleError) {
  try {
    var position = [window.pageXOffset, window.pageYOffset];
    var updateState = {"spf-position":position};
    spf.debug.debug("    updating history to scroll position", position);
    spf.history.replace(null, updateState);
    if (spf.url.absolute(url, true) != window.location.href) {
      var newState = {"spf-referer":referer};
      spf.history.add(url, newState);
    }
  } catch (err) {
    spf.nav.cancel();
    spf.debug.error("error caught, redirecting ", "(url=", url, "err=", err, ")");
    handleError(url, err);
  }
};
spf.nav.handleNavigateError_ = function(options, url, err, opt_xhr) {
  spf.debug.warn("navigate error", "(url=", url, ")");
  spf.state.set(spf.state.Key.NAV_REQUEST, null);
  if (!spf.nav.dispatchError_(url, err, options, undefined, opt_xhr)) {
    return;
  }
  spf.nav.reload(url, spf.nav.ReloadReason.ERROR, err);
};
spf.nav.handleNavigatePart_ = function(options, info, url, partial) {
  if (!spf.nav.dispatchPartProcess_(url, partial, options)) {
    spf.nav.reload(url, spf.nav.ReloadReason.PART_PROCESS_CANCELED);
    return;
  }
  if (partial["reload"]) {
    spf.nav.reload(url, spf.nav.ReloadReason.RESPONSE_RECEIVED);
    return;
  }
  if (partial["redirect"]) {
    spf.nav.handleNavigateRedirect_(options, partial["redirect"]);
    return;
  }
  try {
    spf.nav.response.process(url, partial, info, function() {
      spf.nav.dispatchPartDone_(url, partial, options);
    });
  } catch (err) {
    spf.debug.debug("    failed to process part", partial);
    spf.nav.handleNavigateError_(options, url, err);
    return;
  }
};
spf.nav.handleNavigateSuccess_ = function(options, info, url, response) {
  spf.state.set(spf.state.Key.NAV_REQUEST, null);
  if (spf.state.get(spf.state.Key.NAV_PROMOTE) == info.original) {
    var timing = response["timing"] || {};
    timing["navigationStart"] = spf.state.get(spf.state.Key.NAV_PROMOTE_TIME);
    timing["spfPrefetched"] = true;
  }
  var multipart = response["type"] == "multipart";
  if (!multipart) {
    if (!spf.nav.dispatchProcess_(url, response, options)) {
      spf.nav.reload(url, spf.nav.ReloadReason.PROCESS_CANCELED);
      return;
    }
    if (response["reload"]) {
      spf.nav.reload(url, spf.nav.ReloadReason.RESPONSE_RECEIVED);
      return;
    }
    if (response["redirect"]) {
      spf.nav.handleNavigateRedirect_(options, response["redirect"]);
      return;
    }
  }
  try {
    var r = (multipart ? {} : response);
    spf.nav.response.process(url, r, info, function() {
      var name = response["name"] || "";
      if (multipart) {
        var parts = response["parts"];
        spf.array.each(parts, function(part) {
          name = part["name"] || name;
        });
      }
      spf.dom.dataset.set(document.body, "spfName", name);
      spf.nav.navigateScroll_(url, info);
      spf.nav.dispatchDone_(url, response, options);
    });
  } catch (err) {
    spf.debug.debug("    failed to process response", response);
    spf.nav.handleNavigateError_(options, url, err);
    return;
  }
};
spf.nav.handleNavigateRedirect_ = function(options, redirectUrl) {
  try {
    redirectUrl = redirectUrl + window.location.hash;
    spf.history.replace(redirectUrl, null, true);
  } catch (err) {
    spf.nav.cancel();
    spf.debug.error("error caught, reloading ", "(url=", redirectUrl, "err=", err, ")");
    spf.nav.handleNavigateError_(options, redirectUrl, err);
  }
};
spf.nav.cancel = function() {
  var xhr = (spf.state.get(spf.state.Key.NAV_REQUEST));
  if (xhr) {
    spf.debug.warn("aborting previous navigate ", "xhr=", xhr);
    xhr.abort();
    spf.state.set(spf.state.Key.NAV_REQUEST, null);
  }
};
spf.nav.callback = function(fn, var_args) {
  var val;
  if (fn) {
    var args = Array.prototype.slice.call(arguments);
    args[0] = fn;
    val = spf.execute.apply(null, args);
    if (val instanceof Error) {
      spf.debug.error("error in callback (url=", window.location.href, "err=", val, ")");
    }
  }
  return val !== false;
};
spf.nav.reload = function(url, reason, opt_err) {
  var err = opt_err ? opt_err.message : "";
  spf.debug.warn("reloading (", "url=", url, "reason=", reason, "error=", err, ")");
  spf.nav.cancel();
  spf.nav.cancelAllPrefetchesExcept();
  var logReason = reason;
  if (err) {
    logReason += " Message: " + err;
  }
  spf.nav.dispatchReload_(url, logReason);
  var current = window.location.href;
  if (spf.config.get("experimental-remove-history") && current == url) {
    spf.history.removeCurrentEntry();
  }
  setTimeout(function() {
    var reloadId = (spf.config.get("reload-identifier"));
    if (reloadId) {
      var params = {};
      params[reloadId] = encodeURIComponent(reason);
      url = spf.url.appendParameters(url, params);
    }
    window.location.href = url;
    if (!spf.nav.isNavigable_(url, current)) {
      window.location.reload();
    }
  }, 0);
};
spf.nav.load = function(url, opt_options) {
  url = spf.url.appendPersistentParameters(url);
  var options = spf.nav.createOptions_(opt_options);
  var info = new spf.nav.Info;
  spf.nav.load_(url, options, info);
};
spf.nav.load_ = function(url, options, info) {
  spf.debug.info("nav.load ", url, options, info);
  info.original = info.original || url;
  if (!spf.nav.dispatchRequest_(url, undefined, undefined, options, true)) {
    return;
  }
  var handleError = spf.bind(spf.nav.handleLoadError_, null, false, options, info);
  var handlePart = spf.bind(spf.nav.handleLoadPart_, null, false, options, info);
  var handleSuccess = spf.bind(spf.nav.handleLoadSuccess_, null, false, options, info);
  info.type = "load";
  spf.nav.request.send(url, {method:options["method"], headers:options["headers"], onPart:handlePart, onError:handleError, onSuccess:handleSuccess, postData:options["postData"], type:info.type, withCredentials:options["withCredentials"]});
};
spf.nav.prefetch = function(url, opt_options) {
  url = spf.url.appendPersistentParameters(url);
  var options = spf.nav.createOptions_(opt_options);
  var info = new spf.nav.Info;
  spf.nav.prefetch_(url, options, info);
};
spf.nav.prefetch_ = function(url, options, info) {
  spf.debug.info("nav.prefetch ", url, options, info);
  info.original = info.original || url;
  if (!spf.nav.dispatchRequest_(url, undefined, undefined, options, true)) {
    return;
  }
  var handleError = spf.bind(spf.nav.handleLoadError_, null, true, options, info);
  var handlePart = spf.bind(spf.nav.handleLoadPart_, null, true, options, info);
  var handleSuccess = spf.bind(spf.nav.handleLoadSuccess_, null, true, options, info);
  info.type = "prefetch";
  var xhr = spf.nav.request.send(url, {method:options["method"], headers:options["headers"], onPart:handlePart, onError:handleError, onSuccess:handleSuccess, postData:options["postData"], type:info.type, current:info.current});
  spf.nav.addPrefetch(url, xhr);
};
spf.nav.handleLoadError_ = function(isPrefetch, options, info, url, err) {
  spf.debug.warn(isPrefetch ? "prefetch" : "load", "error", "(url=", url, ")");
  if (isPrefetch) {
    spf.nav.removePrefetch(url);
  }
  if (isPrefetch && spf.state.get(spf.state.Key.NAV_PROMOTE) == info.original) {
    spf.nav.handleNavigateError_(options, url, err);
  } else {
    spf.nav.dispatchError_(url, err, options, true);
  }
};
spf.nav.handleLoadPart_ = function(isPrefetch, options, info, url, partial) {
  if (!spf.nav.dispatchPartProcess_(url, partial, options, true)) {
    return;
  }
  if (partial["reload"]) {
    if (!isPrefetch) {
      return;
    }
    if (spf.state.get(spf.state.Key.NAV_PROMOTE) == info.original) {
      spf.nav.reload(url, spf.nav.ReloadReason.RESPONSE_RECEIVED);
      return;
    }
  }
  if (partial["redirect"]) {
    spf.nav.handleLoadRedirect_(isPrefetch, options, info, partial["redirect"]);
    return;
  }
  if (isPrefetch) {
    var fn = spf.bind(spf.nav.handleNavigatePart_, null, options, info, url, partial);
    var promoteKey = spf.nav.promoteKey(info.original);
    spf.tasks.add(promoteKey, fn);
    if (spf.state.get(spf.state.Key.NAV_PROMOTE) == info.original) {
      spf.tasks.run(promoteKey, true);
      return;
    }
  }
  var processFn = isPrefetch ? spf.nav.response.preprocess : spf.nav.response.process;
  processFn(url, partial, info, function() {
    spf.nav.dispatchPartDone_(url, partial, options, true);
  });
};
spf.nav.handleLoadSuccess_ = function(isPrefetch, options, info, url, response) {
  var multipart = response["type"] == "multipart";
  if (!multipart) {
    if (!spf.nav.dispatchProcess_(url, response, options, true)) {
      spf.nav.reload(url, spf.nav.ReloadReason.PROCESS_CANCELED);
      return;
    }
    if (response["reload"]) {
      if (!isPrefetch) {
        return;
      }
      if (spf.state.get(spf.state.Key.NAV_PROMOTE) == info.original) {
        spf.nav.reload(url, spf.nav.ReloadReason.RESPONSE_RECEIVED);
        return;
      }
    }
    if (response["redirect"]) {
      spf.nav.handleLoadRedirect_(isPrefetch, options, info, response["redirect"]);
      return;
    }
  }
  var promoteKey = spf.nav.promoteKey(info.original);
  if (isPrefetch) {
    spf.nav.removePrefetch(url);
    if (spf.state.get(spf.state.Key.NAV_PROMOTE) == info.original) {
      var fn = spf.bind(spf.nav.handleNavigateSuccess_, null, options, info, url, response);
      spf.tasks.add(promoteKey, fn);
      spf.tasks.run(promoteKey, true);
      return;
    } else {
      spf.tasks.cancel(promoteKey);
    }
  }
  var processFn = isPrefetch ? spf.nav.response.preprocess : spf.nav.response.process;
  try {
    var r = (multipart ? {} : response);
    processFn(url, r, info, function() {
      spf.nav.dispatchDone_(url, response, options, true);
    });
  } catch (err) {
    spf.debug.debug("    failed to process response", response);
    spf.nav.handleLoadError_(isPrefetch, options, info, url, err);
    return;
  }
};
spf.nav.handleLoadRedirect_ = function(isPrefetch, options, info, redirectUrl) {
  var redirectFn = isPrefetch ? spf.nav.prefetch_ : spf.nav.load_;
  var keys = [spf.nav.Callback.ERROR, spf.nav.Callback.REQUEST, spf.nav.Callback.PART_PROCESS, spf.nav.Callback.PART_DONE, spf.nav.Callback.PROCESS, spf.nav.Callback.DONE];
  var redirectOpts = ({});
  spf.array.each(keys, function(key) {
    redirectOpts[key] = options[key];
  });
  redirectFn(redirectUrl, redirectOpts, info);
};
spf.nav.process = function(response, opt_callback) {
  var url = window.location.href;
  var multipart = response["type"] == "multipart";
  var done = function(index, max, _, resp) {
    if (index == max && opt_callback) {
      opt_callback(resp);
    }
  };
  if (multipart) {
    var parts = response["parts"];
    var max = parts.length - 1;
    spf.array.each(parts, function(part, index) {
      var fn = spf.bind(done, null, index, max);
      spf.nav.response.process(url, part, null, fn);
    });
  } else {
    response = (response);
    var fn = spf.bind(done, null, 0, 0);
    spf.nav.response.process(url, response, null, fn);
  }
};
spf.nav.dispatchError_ = function(url, err, opt_options, opt_noEvents, opt_xhr) {
  var detail = {"url":url, "err":err, "xhr":opt_xhr};
  var options = opt_options || ({});
  var fn = options[spf.nav.Callback.ERROR];
  var proceed = spf.nav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = spf.dispatch(spf.EventName.ERROR, detail);
  }
  return proceed;
};
spf.nav.dispatchReload_ = function(url, reason) {
  var detail = {"url":url, "reason":reason};
  spf.dispatch(spf.EventName.RELOAD, detail);
};
spf.nav.dispatchClick_ = function(url, target) {
  var detail = {"url":url, "target":target};
  return spf.dispatch(spf.EventName.CLICK, detail);
};
spf.nav.dispatchHistory_ = function(url, opt_referer, opt_previous) {
  var detail = {"url":url, "referer":opt_referer, "previous":opt_previous};
  return spf.dispatch(spf.EventName.HISTORY, detail);
};
spf.nav.dispatchRequest_ = function(url, referer, previous, opt_options, opt_noEvents) {
  var detail = {"url":url, "referer":referer, "previous":previous};
  var options = opt_options || ({});
  var fn = options[spf.nav.Callback.REQUEST];
  var proceed = spf.nav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = spf.dispatch(spf.EventName.REQUEST, detail);
  }
  return proceed;
};
spf.nav.dispatchPartProcess_ = function(url, partial, opt_options, opt_noEvents) {
  var detail = {"url":url, "part":partial};
  var options = opt_options || ({});
  var fn = options[spf.nav.Callback.PART_PROCESS];
  var proceed = spf.nav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = spf.dispatch(spf.EventName.PART_PROCESS, detail);
  }
  return proceed;
};
spf.nav.dispatchPartDone_ = function(url, partial, opt_options, opt_noEvents) {
  var detail = {"url":url, "part":partial};
  var options = opt_options || ({});
  var fn = options[spf.nav.Callback.PART_DONE];
  var proceed = spf.nav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = spf.dispatch(spf.EventName.PART_DONE, detail);
  }
  return proceed;
};
spf.nav.dispatchProcess_ = function(url, response, opt_options, opt_noEvents) {
  var detail = {"url":url, "response":response};
  var options = opt_options || ({});
  var fn = options[spf.nav.Callback.PROCESS];
  var proceed = spf.nav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = spf.dispatch(spf.EventName.PROCESS, detail);
  }
  return proceed;
};
spf.nav.dispatchDone_ = function(url, response, opt_options, opt_noEvents) {
  var detail = {"url":url, "response":response};
  var options = opt_options || ({});
  var fn = options[spf.nav.Callback.DONE];
  var proceed = spf.nav.callback(fn, detail);
  if (proceed && !opt_noEvents) {
    proceed = spf.dispatch(spf.EventName.DONE, detail);
  }
  return proceed;
};
spf.nav.promoteKey = function(url) {
  return "promote " + spf.url.absolute(url);
};
spf.nav.preprocessKey = function(url) {
  return "preprocess " + spf.url.absolute(url);
};
spf.nav.addPrefetch = function(url, xhr) {
  spf.debug.debug("nav.addPrefetch ", url, xhr);
  var absoluteUrl = spf.url.absolute(url);
  var prefetches = spf.nav.prefetches_();
  prefetches[absoluteUrl] = xhr;
};
spf.nav.removePrefetch = function(url) {
  spf.debug.debug("nav.removePrefetch ", url);
  var absoluteUrl = spf.url.absolute(url);
  var prefetches = spf.nav.prefetches_();
  var prefetchXhr = prefetches[absoluteUrl];
  if (prefetchXhr) {
    prefetchXhr.abort();
  }
  delete prefetches[absoluteUrl];
};
spf.nav.cancelAllPrefetchesExcept = function(opt_skipUrl) {
  spf.debug.debug("nav.cancelAllPrefetchesExcept", opt_skipUrl);
  var prefetches = spf.nav.prefetches_();
  var absoluteUrl = opt_skipUrl && spf.url.absolute(opt_skipUrl);
  for (var key in prefetches) {
    if (absoluteUrl != key) {
      spf.nav.removePrefetch(key);
    }
  }
};
spf.nav.clearResourceTimings_ = function() {
  var clearResourceTimings = window.performance && (window.performance.clearResourceTimings || window.performance["webkitClearResourceTimings"] || window.performance["mozClearResourceTimings"] || window.performance["msClearResourceTimings"] || window.performance["oClearResourceTimings"]);
  if (clearResourceTimings) {
    return spf.bind(clearResourceTimings, window.performance);
  }
  return spf.nullFunction;
}();
spf.nav.prefetches_ = function(opt_reqs) {
  if (opt_reqs || !spf.state.has(spf.state.Key.NAV_PREFETCHES)) {
    return(spf.state.set(spf.state.Key.NAV_PREFETCHES, opt_reqs || {}));
  }
  return(spf.state.get(spf.state.Key.NAV_PREFETCHES));
};
spf.nav.getScrollTempPosition_ = function() {
  var position = (spf.state.get(spf.state.Key.NAV_SCROLL_TEMP_POSITION)) || null;
  var url = (spf.state.get(spf.state.Key.NAV_SCROLL_TEMP_URL)) || "";
  if (position && url == window.location.href) {
    return position;
  }
  return null;
};
spf.nav.setScrollTempPosition_ = function() {
  var position = [window.pageXOffset, window.pageYOffset];
  spf.debug.debug("    saving scroll temp position", position);
  spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_POSITION, position);
  spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_URL, window.location.href);
};
spf.nav.clearScrollTempPosition_ = function() {
  spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_POSITION, null);
  spf.state.set(spf.state.Key.NAV_SCROLL_TEMP_URL, null);
};
spf.nav.isTouchCapablePlatform_ = function() {
  return "ontouchstart" in window || window.navigator["maxTouchPoints"] > 0 || window.navigator["msMaxTouchPoints"] > 0;
};
spf.nav.createOptions_ = function(opt_options) {
  var options = opt_options || ({});
  return options;
};
spf.nav.Info_;
spf.nav.Info = function(opt_info) {
  opt_info = opt_info || ({});
  this.current = opt_info.history && opt_info.current ? opt_info.current : window.location.href;
  this.history = !!opt_info.history;
  this.original = opt_info.original || "";
  this.position = opt_info.position || null;
  this.referer = opt_info.referer != undefined ? opt_info.referer : window.location.href;
  this.reverse = !!opt_info.reverse;
  this.scrolled = !!opt_info.scrolled;
  this.type = opt_info.type || "";
};
spf.nav.Callback = {ERROR:"onError", REQUEST:"onRequest", PART_PROCESS:"onPartProcess", PART_DONE:"onPartDone", PROCESS:"onProcess", DONE:"onDone"};
spf.nav.ReloadReason = {INELIGIBLE:!SPF_DEBUG ? "1" : "1: Navigation not initialized or limit reached.", REQUEST_CANCELED:!SPF_DEBUG ? "2" : "2: Navigation canceled by the request event.", PART_PROCESS_CANCELED:!SPF_DEBUG ? "3" : "3: Navigation canceled by the partprocess event.", PROCESS_CANCELED:!SPF_DEBUG ? "4" : "4: Navigation canceled by the process event.", RESPONSE_RECEIVED:!SPF_DEBUG ? "5" : "5: Reload response received.", FORBIDDEN:!SPF_DEBUG ? "9" : "9: Destination forbidden by same-origin security.", 
ERROR:!SPF_DEBUG ? "10" : "10: An uncaught error occurred processing."};
if (spf.tracing.ENABLED) {
  (function() {
    spf.nav.init = spf.tracing.instrument(spf.nav.init, "spf.nav.init");
    spf.nav.dispose = spf.tracing.instrument(spf.nav.dispose, "spf.nav.dispose");
    spf.nav.handleClick_ = spf.tracing.instrument(spf.nav.handleClick_, "spf.nav.handleClick_");
    spf.nav.handleHistory_ = spf.tracing.instrument(spf.nav.handleHistory_, "spf.nav.handleHistory_");
    spf.nav.navigate = spf.tracing.instrument(spf.nav.navigate, "spf.nav.navigate");
    spf.nav.navigate_ = spf.tracing.instrument(spf.nav.navigate_, "spf.nav.navigate_");
    spf.nav.navigatePromotePrefetch_ = spf.tracing.instrument(spf.nav.navigatePromotePrefetch_, "spf.nav.navigatePromotePrefetch_");
    spf.nav.navigateSendRequest_ = spf.tracing.instrument(spf.nav.navigateSendRequest_, "spf.nav.navigateSendRequest_");
    spf.nav.handleNavigateError_ = spf.tracing.instrument(spf.nav.handleNavigateError_, "spf.nav.handleNavigateError_");
    spf.nav.handleNavigatePart_ = spf.tracing.instrument(spf.nav.handleNavigatePart_, "spf.nav.handleNavigatePart_");
    spf.nav.handleNavigateSuccess_ = spf.tracing.instrument(spf.nav.handleNavigateSuccess_, "spf.nav.handleNavigateSuccess_");
    spf.nav.cancel = spf.tracing.instrument(spf.nav.cancel, "spf.nav.cancel");
    spf.nav.callback = spf.tracing.instrument(spf.nav.callback, "spf.nav.callback");
    spf.nav.reload = spf.tracing.instrument(spf.nav.reload, "spf.nav.reload");
    spf.nav.prefetch = spf.tracing.instrument(spf.nav.prefetch, "spf.nav.prefetch");
    spf.nav.prefetch_ = spf.tracing.instrument(spf.nav.prefetch_, "spf.nav.prefetch_");
    spf.nav.load = spf.tracing.instrument(spf.nav.load, "spf.nav.load");
    spf.nav.handleLoadError_ = spf.tracing.instrument(spf.nav.handleLoadError_, "spf.nav.handleLoadError_");
    spf.nav.handleLoadPart_ = spf.tracing.instrument(spf.nav.handleLoadPart_, "spf.nav.handleLoadPart_");
    spf.nav.handleLoadSuccess_ = spf.tracing.instrument(spf.nav.handleLoadSuccess_, "spf.nav.handleLoadSuccess_");
  })();
}
;goog.provide("spf.main");
goog.require("spf");
goog.require("spf.config");
goog.require("spf.debug");
goog.require("spf.history");
goog.require("spf.nav");
goog.require("spf.net.script");
goog.require("spf.net.style");
goog.require("spf.pubsub");
spf.main.init = function(opt_config) {
  var enable = spf.main.canInit_();
  spf.debug.info("main.init ", "enable=", enable);
  spf.config.init(opt_config);
  if (enable) {
    spf.nav.init();
  }
  return enable;
};
spf.main.canInit_ = function() {
  return!!(typeof window.history.pushState == "function" || spf.history.getIframe().contentWindow.history.pushState);
};
spf.main.dispose = function() {
  var enable = !!(typeof History != "undefined" && History.prototype.pushState);
  if (enable) {
    spf.nav.dispose();
  }
  spf.config.clear();
};
spf.main.discover_ = function() {
  spf.net.script.discover();
  spf.net.style.discover();
  if (document.readyState == "complete") {
    if (document.removeEventListener) {
      document.removeEventListener("DOMContentLoaded", spf.main.discover_, false);
    } else {
      if (document.detachEvent) {
        document.detachEvent("onreadystatechange", spf.main.discover_);
      }
    }
  }
};
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", spf.main.discover_, false);
} else {
  if (document.attachEvent) {
    document.attachEvent("onreadystatechange", spf.main.discover_);
  }
}
spf.main.discover_();
spf.main.api_ = {"init":spf.main.init, "dispose":spf.main.dispose, "navigate":spf.nav.navigate, "load":spf.nav.load, "prefetch":spf.nav.prefetch, "process":spf.nav.process};
spf.main.extra_ = {"cache":{"remove":spf.cache.remove, "clear":spf.cache.clear}, "script":{"load":spf.net.script.load, "get":spf.net.script.get, "ready":spf.net.script.ready, "done":spf.net.script.done, "require":spf.net.script.require, "declare":spf.net.script.declare, "path":spf.net.script.path, "unload":spf.net.script.unload, "ignore":spf.net.script.ignore, "unrequire":spf.net.script.unrequire, "prefetch":spf.net.script.prefetch}, "style":{"load":spf.net.style.load, "get":spf.net.style.get, "unload":spf.net.style.unload, 
"path":spf.net.style.path, "prefetch":spf.net.style.prefetch}};
var global = this;
global["spf"] = global["spf"] || {};
var api = global["spf"];
for (var fn1 in spf.main.api_) {
  api[fn1] = spf.main.api_[fn1];
}
for (var ns in spf.main.extra_) {
  for (var fn2 in spf.main.extra_[ns]) {
    api[ns] = api[ns] || {};
    api[ns][fn2] = spf.main.extra_[ns][fn2];
  }
}
spf.dispatch(spf.EventName.READY);

