// Copyright 2012 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Simple publish/subscribe instance used as a "dispatch"
 * for centralized notifications.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import {spfBase, SPF_BOOTLOADER} from '../base';
import spfArray from '../array/array';
import spfState from '../state';

let spfPubsub = {};
// goog.provide('spfPubsub');

// goog.require('spf');
// goog.require('spfArray');
// goog.require('spfState');


/**
 * Subscribes a function to a topic.  The function is invoked in the global
 * scope.  Subscribing the same function to the same topic multiple
 * times will result in multiple function invocations while publishing.
 *
 * @param {string} topic Topic to subscribe to. Passing an empty string does
 *     nothing.
 * @param {Function|undefined} fn Function to be invoked when a message is
 *     published to the given topic. Passing `null` or `undefined`
 *     does nothing.
 */
spfPubsub.subscribe = function(topic, fn) {
  if (topic && fn) {
    if (!(topic in spfPubsub.subscriptions)) {
      spfPubsub.subscriptions[topic] = [];
    }
    spfPubsub.subscriptions[topic].push(fn);
  }
};


/**
 * Unsubscribes a function from a topic. Only deletes the first match found.
 *
 * @param {string} topic Topic to unsubscribe from. Passing an empty string does
 *     nothing.
 * @param {Function|undefined} fn Function to unsubscribe. Passing `null`
 *     or `undefined` does nothing.
 */
spfPubsub.unsubscribe = function(topic, fn) {
  if (topic in spfPubsub.subscriptions && fn) {
    spfArray.every(spfPubsub.subscriptions[topic], function(subFn, i, arr) {
      if (subFn == fn) {
        arr[i] = null;
        return false;
      }
      return true;
    });
  }
};


/**
 * Publishes a topic.  Calls functions subscribed to the topic in
 * the order in which they were added.  If any of the functions throws an
 * uncaught error, publishing is aborted.
 *
 * @param {string} topic Topic to publish. Passing an empty string does
 *     nothing.
 */
spfPubsub.publish = function(topic) {
  spfPubsub.publish_(topic);
};


/**
 * Simulaneously publishes and clears a topic.  Calls functions subscribed to
 * topic in the order in which they were added, unsubscribing each beforehand.
 * If any of the functions throws an uncaught error, publishing is aborted.
 * See {#publish} and {#clear}.
 *
 * @param {string} topic Topic to publish. Passing an empty string does
 *     nothing.
 */
spfPubsub.flush = function(topic) {
  spfPubsub.publish_(topic, true);
};


/**
 * See {@link #publish} or {@link #flush}.
 *
 * @param {string} topic Topic to publish.
 * @param {boolean=} opt_unsub Whether to unsubscribe functions beforehand.
 * @private
 */
spfPubsub.publish_ = function(topic, opt_unsub) {
  if (topic in spfPubsub.subscriptions) {
    spfArray.each(spfPubsub.subscriptions[topic], function(subFn, i, arr) {
      if (opt_unsub) {
        arr[i] = null;
      }
      if (subFn) {
        subFn();
      }
    });
  }
};


/**
 * Renames a topic.  All functions subscribed to the old topic will then
 * be subscribed to the new topic instead.
 *
 * @param {string} oldTopic The old name for the topic. Passing an empty string
 *     does nothing.
 * @param {string} newTopic The new name for the topic. Passing an empty string
 *     does nothing.
 */
spfPubsub.rename = function(oldTopic, newTopic) {
  if (oldTopic && newTopic && oldTopic in spfPubsub.subscriptions) {
    var existing = spfPubsub.subscriptions[newTopic] || [];
    spfPubsub.subscriptions[newTopic] =
        existing.concat(spfPubsub.subscriptions[oldTopic]);
    spfPubsub.clear(oldTopic);
  }
};


/**
 * Clears the subscription list for a topic.
 *
 * @param {string} topic Topic to clear.
 */
spfPubsub.clear = function(topic) {
  delete spfPubsub.subscriptions[topic];
};


/**
 * Map of subscriptions.
 * @type {!Object.<Array>}
 */
spfPubsub.subscriptions = {};


// Automatic initialization for spfPubsub.subscriptions.
// When built for the bootloader, unconditionally set in state.
if (SPF_BOOTLOADER) {
  spfState.set(spfState.Key.PUBSUB_SUBS, spfPubsub.subscriptions);
} else {
  if (!spfState.has(spfState.Key.PUBSUB_SUBS)) {
    spfState.set(spfState.Key.PUBSUB_SUBS, spfPubsub.subscriptions);
  }
  spfPubsub.subscriptions = /** @type {!Object.<Array>} */ (
      spfState.get(spfState.Key.PUBSUB_SUBS));
}

export default spfPubsub;
