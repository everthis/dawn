// Copyright 2014 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Functions for handling the SPF config.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import spfState from './state';
let spfConfig = {};


/**
 * Type definition for a SPF config value.
 *
 * Function type temporarily needed for experimental-html-handler.
 * TODO(philharnish): Remove "Function".
 *
 * @typedef {string|number|boolean|Function|null}
 */
spfConfig.Value;


/**
 * Default configuration values.
 * @type {!Object.<spfConfig.Value>}
 */
spfConfig.defaults = {
  'animation-class': 'spf-animate',
  'animation-duration': 425,
  'cache-lifetime': 10 * 60 * 1000,  // 10 minute cache lifetime (ms).
  'cache-max': 50,  // 50 items.
  'cache-unified': false,
  'link-class': 'spf-link',
  'nolink-class': 'spf-nolink',
  'navigate-limit': 20,  // 20 navigations per session.
  'navigate-lifetime': 24 * 60 * 60 * 1000,  // 1 day session lifetime (ms).
  'reload-identifier': null,  // Always a param, no '?' needed.
  'request-timeout': 0,  // No request timeout.
  'url-identifier': '?spf=__type__'
};


/**
 * Initialize the configuration with an optional object.  If values are not
 * provided, the defaults are used if they exist.
 *
 * @param {Object.<spfConfig.Value>=} opt_config Optional configuration object.
 */
spfConfig.init = function(opt_config) {
  var config = opt_config || {};
  // Set primary configs; each has a default.
  for (var key in spfConfig.defaults) {
    var value = (key in config) ? config[key] : spfConfig.defaults[key];
    spfConfig.set(key, value);
  }
  // Set advanced and experimental configs; none have defaults.
  for (var key in config) {
    if (!(key in spfConfig.defaults)) {
      spfConfig.set(key, config[key]);
    }
  }
};


/**
 * Checks whether a current configuration value exists.
 *
 * @param {string} name The configuration name.
 * @return {boolean} Whether the configuration value exists.
 */
spfConfig.has = function(name) {
  return name in spfConfig.values;
};


/**
 * Gets a current configuration value.
 *
 * @param {string} name The configuration name.
 * @return {spfConfig.Value|undefined} The configuration value.
 */
spfConfig.get = function(name) {
  return spfConfig.values[name];
};


/**
 * Sets a current configuration value.
 *
 * @param {string} name The configuration name.
 * @param {spfConfig.Value} value The configuration value.
 * @return {spfConfig.Value} The configuration value.
 */
spfConfig.set = function(name, value) {
  spfConfig.values[name] = value;
  return value;
};


/**
 * Removes all data from the config.
 */
spfConfig.clear = function() {
  for (var key in spfConfig.values) {
    delete spfConfig.values[key];
  }
};


/**
 * The config storage object.
 * @type {!Object.<spfConfig.Value>}
 */
spfConfig.values = {};


// Automatic initialization for spfConfig.values.
if (!spfState.has(spfState.Key.CONFIG_VALUES)) {
  spfState.set(spfState.Key.CONFIG_VALUES, spfConfig.values);
}
spfConfig.values = /** @type {!Object.<spfConfig.Value>} */ (
    spfState.get(spfState.Key.CONFIG_VALUES));

export default spfConfig;
