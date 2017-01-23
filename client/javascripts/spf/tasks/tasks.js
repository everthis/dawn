// Copyright 2013 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Simple asynchronous queued task execution.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import {spfBase} from '../base';
import spfConfig from '../config';
import spfState from '../state';
import spfString from '../string/string';
import spfTracing from '../tracing/tracing';
let spfTasks = {};

// goog.provide('spfTasks');

// goog.require('spf');
// goog.require('spfConfig');
// goog.require('spfState');
// goog.require('spfString');
// goog.require('spfTracing');


/**
 * Adds a task to a queue to be executed asynchronously.
 *
 * @param {string} key The key to identify the task queue.
 * @param {!Function} fn The function to execute for this task.
 * @param {number=} opt_delay The time in milliseconds to wait before executing
 *     the function; defaults to 0.
 * @return {number} The number of tasks in the queue afterwards.
 */
spfTasks.add = function(key, fn, opt_delay) {
  var queues = spfTasks.queues_;
  var queue = queues[key];
  if (key && fn) {
    if (!queue) {
      queue = queues[key] = spfTasks.createQueue_();
    }
    var task = spfTasks.createTask_(fn, opt_delay || 0);
    return queue.items.push(task);
  }
  return (queue && queue.items.length) || 0;
};


/**
 * Runs queued tasks, if not already running.
 *
 * @param {string} key The key to identify the task queue.
 * @param {boolean=} opt_sync Whether to execute the queued tasks synchronously;
 *     defaults to false.
 */
spfTasks.run = function(key, opt_sync) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    var active = !!queue.scheduledKey || !!queue.timeoutKey;
    var suspended = !(queue.semaphore > 0);
    if (!suspended && (opt_sync || !active)) {
      spfTasks.do_(key, opt_sync);
    }
  }
};


/**
 * Suspends execution of a running task queue.
 * See {@link #resume}.
 *
 * Queue execution is controlled by values similar to POSIX Semaphores.  Each
 * `suspend` decrements a value, and each `resume` increments it.
 * Queue execution only continues when the values are positive, so while
 * `suspend` may be called multiple times, it must be matched by an equal
 * number of `resume` calls.
 *
 * @param {string} key The key to identify the task queue.
 */
spfTasks.suspend = function(key) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    queue.semaphore--;
  }
};


/**
 * Resumes execution of a running task queue.
 * See {@link #suspend}.
 *
 * Queue execution is controlled by values similar to POSIX Semaphores.  Each
 * `suspend` decrements a value, and each `resume` increments it.
 * Queue execution only continues when the values are positive, so while
 * `suspend` may be called multiple times, it much be matched by an equal
 * number of `resume` calls.
 *
 * @param {string} key The key to identify the task queue.
 * @param {boolean=} opt_sync Whether to execute the queued tasks synchronously;
 *     defaults to false.
 */
spfTasks.resume = function(key, opt_sync) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    queue.semaphore++;
    spfTasks.run(key, opt_sync);
  }
};


/**
 * Cancels execution of a running task queue.
 *
 * @param {string} key The key to identify the task queue.
 */
spfTasks.cancel = function(key) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    spfTasks.clearAsyncTasks_(queue);
    delete spfTasks.queues_[key];
  }
};


/**
 * Cancels execution of all current task queues, optionally limited to
 * with a given key prefix and optionally skipping the given key.
 *
 * @param {string=} opt_keyPrefix The prefix of the tasks to be canceled.
 * @param {string=} opt_skipKey The key of the task queue that should not
 *     be canceled.
 */
spfTasks.cancelAllExcept = function(opt_keyPrefix, opt_skipKey) {
  var keyPrefix = opt_keyPrefix || '';
  for (var key in spfTasks.queues_) {
    if (opt_skipKey != key && spfString.startsWith(key, keyPrefix)) {
      spfTasks.cancel(key);
    }
  }
};


/**
 * Gets a unique key for an object.  Mutates the object to store the key so
 * that multiple calls for the same object will return the same key.
 *
 * @param {Object} obj The object to get a unique key for.
 * @return {string} The unique key.
 */
spfTasks.key = function(obj) {
  var uid = parseInt(spfState.get(spfState.Key.TASKS_UID), 10) || 0;
  uid++;
  return obj['spf-key'] || (
      obj['spf-key'] = '' + spfState.set(spfState.Key.TASKS_UID, uid));
};


/**
 * @param {string} key The key to identify the task queue.
 * @param {boolean=} opt_sync Whether to execute the queued tasks synchronously;
 *     defaults to false.
 * @private
 */
spfTasks.do_ = function(key, opt_sync) {
  var queue = spfTasks.queues_[key];
  if (queue) {
    spfTasks.clearAsyncTasks_(queue);
    if (queue.semaphore > 0 && queue.items.length) {
      var task = queue.items[0];
      if (task) {
        var next = spfBase.bind(spfTasks.do_, null, key, opt_sync);
        var step = spfBase.bind(function(nextFn, taskFn) {
          taskFn();
          nextFn();
        }, null, next);
        if (opt_sync) {
          queue.items.shift();
          step(task.fn);
        } else {
          spfTasks.scheduleTask_(queue, task, step);
        }
      }
    }
  }
};


/**
 * Schedule a task for asynchronous execution.
 * @param {!spfTasks.Queue} queue The current queue being executed.
 * @param {!spfTasks.Task} task The task to be scheduled.
 * @param {!Function} step The task execution function.
 * @private
 */
spfTasks.scheduleTask_ = function(queue, task, step) {
  if (task.delay) {
    // For a delay an empty step is run, and the task's functionality is saved
    // for the next step.
    var fn = spfBase.bind(step, null, spfBase.nullFunction);
    queue.timeoutKey = setTimeout(fn, task.delay);
    // Instead of removing the task from the queue, set it's delay to 0 so it
    // will be processed traditionally on the next step.
    task.delay = 0;
  } else {
    queue.items.shift();
    var fn = spfBase.bind(step, null, task.fn);
    var scheduler = /** @type {spfBase.TaskScheduler} */ (
        spfConfig.get('advanced-task-scheduler'));
    var addTask = scheduler && scheduler['addTask'];
    if (addTask) {
      queue.scheduledKey = addTask(fn);
    } else {
      queue.timeoutKey = setTimeout(fn, 0);
    }
  }
};


/**
 * Clear the current asynchronous tasks.
 * @param {!spfTasks.Queue} queue The queue.
 * @private
 */
spfTasks.clearAsyncTasks_ = function(queue) {
  if (queue.scheduledKey) {
    var scheduler = /** @type {spfBase.TaskScheduler} */ (
        spfConfig.get('advanced-task-scheduler'));
    var cancelTask = scheduler && scheduler['cancelTask'];
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


/**
 * Type definition for a SPF task.
 * - fn: The function to execute.
 * - delay: The time in milliseconds to wait before executing the function.
 *
 * @typedef {{
 *   fn: !Function,
 *   delay: number
 * }}
 */
spfTasks.Task;


/**
 * Type definition for a SPF task queue.
 * - items: The ordered list of tasks.
 * - scheduledKey: A key to track the current scheduled task.
 * - timeoutKey: A key to track the current task delayed by a timeout.
 * - semaphore: A POSIX Semaphore style value used to control suspending and
 *     resuming a running queue.
 *
 * @typedef {{
 *   items: !Array.<spfTasks.Task>,
 *   scheduledKey: number,
 *   timeoutKey: number,
 *   semaphore: number
 * }}
 */
spfTasks.Queue;


/**
 * @return {spfTasks.Queue}
 * @private
 */
spfTasks.createQueue_ = function() {
  return {items: [], scheduledKey: 0, timeoutKey: 0, semaphore: 1};
};


/**
 * @param {!Function} fn The function to execute.
 * @param {number} delay The time in milliseconds to wait before executing
 *     the function.
 * @return {spfTasks.Task}
 * @private
 */
spfTasks.createTask_ = function(fn, delay) {
  return {fn: fn, delay: delay};
};


/**
 * @type {!Object.<string, spfTasks.Queue>}
 * @private
 */
spfTasks.queues_ = {};


if (spfTracing.ENABLED) {
  (function() {
    spfTasks.add = spfTracing.instrument(
        spfTasks.add, 'spfTasks.add');
    spfTasks.run = spfTracing.instrument(
        spfTasks.run, 'spfTasks.run');
    spfTasks.suspend = spfTracing.instrument(
        spfTasks.suspend, 'spfTasks.suspend');
    spfTasks.resume = spfTracing.instrument(
        spfTasks.resume, 'spfTasks.resume');
    spfTasks.cancel = spfTracing.instrument(
        spfTasks.cancel, 'spfTasks.cancel');
    spfTasks.cancelAllExcept = spfTracing.instrument(
        spfTasks.cancelAllExcept, 'spfTasks.cancelAllExcept');
    spfTasks.key = spfTracing.instrument(
        spfTasks.key, 'spfTasks.key');
    spfTasks.do_ = spfTracing.instrument(
        spfTasks.do_, 'spfTasks.do_');
    spfTasks.createQueue_ = spfTracing.instrument(
        spfTasks.createQueue_, 'spfTasks.createQueue_');
    spfTasks.createTask_ = spfTracing.instrument(
        spfTasks.createTask_, 'spfTasks.createTask_');
  })();
}

export default spfTasks;
