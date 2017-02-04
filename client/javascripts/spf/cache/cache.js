// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Data caching functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

// goog.provide('spfCache');

import {spfBase} from '../base';
import spfConfig from '../config';
import spfState from '../state';

let spfCache = {};


/**
 * Gets data from the cache.  If the data age exceeds the data lifetime, no
 * data is returned.
 *
 * If data is successfully returned from cache, the data's moved to the top of
 * the cache, making it less likely to be garbage collected.
 *
 * @param {string} key Key for the data object.
 * @return {*} The data, if it exists.
 */
spfCache.get = function(key) {
  var storage = spfCache.storage_();
  if (!(key in storage)) {
    return;
  }
  var unit = storage[key];
  // If the data is valid, return it.
  if (spfCache.valid_(unit)) {
    spfCache.updateCount_(unit);
    return unit['data'];
  }
  // Otherwise, the data should be removed from the cache.
  spfCache.remove(key);
};


/**
 * Sets data in the cache if the both the specified lifetime and the
 * globally configured maximum allow it.
 *
 * @param {string} key Key for the data object.
 * @param {*} data The data.
 * @param {?number=} opt_lifetime Lifetime for the data object.
 *     Defaults to forever if not specified or if null is specified. If a
 *     lifetime of less than 1 is specified, the data is not set in the cache.
 */
spfCache.set = function(key, data, opt_lifetime) {
  var lifetime = parseInt(opt_lifetime, 10);
  var max = parseInt(spfConfig.get('cache-max'), 10);
  if (lifetime <= 0 || max <= 0) {
    return;
  }
  var storage = spfCache.storage_();
  storage[key] = spfCache.create_(key, data, lifetime);
  // When setting data in the cache, trigger an asynchronous garbage collection
  // run to prevent unnecessary memory growth.
  setTimeout(spfCache.collect, 1000);
};


/**
 * Removes data from the cache.
 *
 * @param {string} key Key for the data object.
 */
spfCache.remove = function(key) {
  var storage = spfCache.storage_();
  if (key in storage) {
    delete storage[key];
  }
};


/**
 * Removes all data from the cache.
 */
spfCache.clear = function() {
  spfCache.storage_({});
};


/**
 * Removes expired data from the cache (aka garbage collection). Invalid data
 * and data with an age exceeding the data lifetime will be removed.
 */
spfCache.collect = function() {
  var storage = spfCache.storage_();
  for (var key in storage) {
    var unit = storage[key];
    // If invalid data exists, remove.
    if (!spfCache.valid_(unit)) {
      delete storage[key];
    }
  }
  // Trim the oldest entries if the cache is still above the max size.
  spfCache.trim_();
};


// TODO(nicksay): Make count non-optional with next release.
/**
 * Type definition for a SPF cache unit object.
 * - data: The data to cache.
 * - life: Lifetime of the data (milliseconds).
 * - time: Timestamp when the data was stored (milliseconds).
 * - count: The counter for the cached data.
 *
 * @typedef {{
 *   data: *,
 *   life: number,
 *   time: number,
 *   count: number
 * }}
 */
spfCache.Unit;


/**
 * @param {spfCache.Unit} unit The cache unit.
 * @return {boolean}
 * @private
 */
spfCache.valid_ = function(unit) {
  // Ensure valid data is availabe.
  if (!(unit && 'data' in unit)) {
    return false;
  }
  // A lifetime of NaN is considered forever.  If the age is less than the
  // lifetime, then the unit is valid.  Note that if the timestamp is
  // missing, the unit will not be valid.
  var lifetime = unit['life'];
  lifetime = isNaN(lifetime) ? Infinity : lifetime;
  var timestamp = unit['time'];
  var age = spfBase.now() - timestamp;
  return age < lifetime;
};


/**
 * Trim down the cache units to fit under the cache maximum, based on the
 * lowest count value (oldest entry).
 *
 * @private
 */
spfCache.trim_ = function() {
  var storage = spfCache.storage_();
  var max = parseInt(spfConfig.get('cache-max'), 10);
  max = isNaN(max) ? Infinity : max;
  var extra = Object.keys(storage).length - max;
  // If the current cache is smaller than the max, no trimming is needed.
  if (extra <= 0) {
    return;
  }

  // Remove the smallest element 'extra' times to trim the cache down to size.
  for (var i = 0; i < extra; i++) {
    var min = {count: Infinity};
    for (var key in storage) {
      if (storage[key].count < min.count) {
        min.key = key;
        min.count = storage[key].count;
      }
    }
    delete storage[min.key];
  }
};


/**
 * @param {string} key Key for the data object.
 * @param {*} data The data.
 * @param {number} lifetime Lifetime for the data object.
 * @return {!spfCache.Unit}
 * @private
 */
spfCache.create_ = function(key, data, lifetime) {
  var unit = {'data': data, 'life': lifetime, 'time': spfBase.now(), 'count': 0};
  spfCache.updateCount_(unit);
  return unit;
};


/**
 * Update the count of the given unit and the global cache counter to the
 * latest.
 * @param {spfCache.Unit} unit The cache unit.
 * @private
 */
spfCache.updateCount_ = function(unit) {
  var count = parseInt(spfState.get(spfState.Key.CACHE_COUNTER), 10) || 0;
  count++;
  spfState.set(spfState.Key.CACHE_COUNTER, count);

  unit.count = count;
};


/**
 * @param {!Object.<string, spfCache.Unit>=} opt_storage Optional storage
 *     object to overwrite the current value.
 * @return {!Object.<string, spfCache.Unit>} Current storage object.
 * @private
 */
spfCache.storage_ = function(opt_storage) {
  if (opt_storage || !spfState.has(spfState.Key.CACHE_STORAGE)) {
    return /** @type {!Object.<string, spfCache.Unit>} */ (
        spfState.set(spfState.Key.CACHE_STORAGE, (opt_storage || {})));
  }
  return /** @type {!Object.<string, spfCache.Unit>} */ (
      spfState.get(spfState.Key.CACHE_STORAGE));
};

export default spfCache;
