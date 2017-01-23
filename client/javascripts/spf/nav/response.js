// Copyright 2013 Google Inc. All rights reserved.
//
// Use of this source code is governed by The MIT License.
// See the LICENSE file for details.

/**
 * @fileoverview Navigation-related response functions.
 *
 * @author nicksay@google.com (Alex Nicksay)
 */

import {spfBase} from '../base';
import spfState from '../state';
import spfArray from '../array/array';
import spfConfig from '../config';
import spfDebug from '../debug/debug';
import spfDom from '../dom/dom';
import spfDomClasslist from '../dom/classlist';
import spfDomDataset from '../dom/dataset';
import spfHistory from '../history/history';
import spfNetConnect from '../net/connect';
import spfNetScript from '../net/script';
import spfNetStyle from '../net/style';
import spfString from '../string/string';
import spfTasks from '../tasks/tasks';
import spfTracing from '../tracing/tracing';
import spfUrl from '../url/url';


let spfNavResponse = {};
// goog.provide('spfNavResponse');




/**
 * Parses text for an SPF response.  If `opt_multipart` is true, attempts
 * to parse the text for one or more (in)complete multipart SPF responses.
 *
 * @param {string} text Text to parse.
 * @param {boolean=} opt_multipart Whether to attempt to parse the text for
 *     one or more multipart SPF response sections.
 * @param {boolean=} opt_lastDitch Whether to parse the text as the final
 *     one, potentially handling malformed but valid responses.  Requires
 *     `opt_multipart` to be true.
 * @throws {Error} If the `text` contains invalid JSON, or when
 *     `opt_multipart` is true, if a section of a multipart response
 *     contains invalid JSON.
 * @return {{parts: Array.<spfBase.SingleResponse>, extra: string}}
 */
spfNavResponse.parse = function(text, opt_multipart, opt_lastDitch) {
  if (opt_multipart) {
    var beginToken = spfNavResponse.Token.BEGIN;
    var delimToken = spfNavResponse.Token.DELIMITER;
    var endToken = spfNavResponse.Token.END;
    var lastDitchHalfToken = '\r\n';
    var parts = [];
    var chunk;
    var start = 0;
    // With a last-ditch effort, append the token CRLF chars to the text, which
    // might allow parsing the final section of a response that ends with a
    // closing bracket but not the CRLF required of a well-formed END token.
    // As a side-effect, this will also successfully parse a response section
    // that ends with a comma (because the CRLF will create a well-formed
    // DELIMITER token).  If the last character is not a comma or closing
    // bracket, this last-ditch effort will have no effect.
    if (opt_lastDitch) {
      text += lastDitchHalfToken;
    }
    var finish = text.indexOf(beginToken, start);
    if (finish > -1) {
      start = finish + beginToken.length;
    }
    while ((finish = text.indexOf(delimToken, start)) > -1) {
      chunk = spfString.trim(text.substring(start, finish));
      start = finish + delimToken.length;
      if (chunk) {
        parts.push(JSON.parse(chunk));
      }
    }
    finish = text.indexOf(endToken, start);
    if (finish > -1) {
      chunk = spfString.trim(text.substring(start, finish));
      start = finish + endToken.length;
      if (chunk) {
        parts.push(JSON.parse(chunk));
      }
    }
    var extra = '';
    if (text.length > start) {
      extra = text.substring(start);
      if (opt_lastDitch && spfString.endsWith(extra, lastDitchHalfToken)) {
        extra = extra.substring(0, extra.length - lastDitchHalfToken.length);
      }
    }
    parts = spfNavResponse.extract(parts);
    return {
      parts: /** @type {Array.<spfBase.SingleResponse>} */(parts),
      extra: extra
    };
  } else {
    var response = JSON.parse(text);
    var parts = spfNavResponse.extract(spfArray.toArray(response));
    return {
      parts: /** @type {Array.<spfBase.SingleResponse>} */(parts),
      extra: ''
    };
  }
};


/**
 * Processes a SPF response.
 *
 * @param {string} url The URL of the response being processed.
 * @param {spfBase.SingleResponse} response The SPF response object to process.
 * @param {spfBase.nav.Info=} opt_info The navigation info object.
 * @param {function(string, spfBase.SingleResponse)=} opt_callback Function to
 *     execute when processing is done; the first argument is `url`,
 *     the second argument is `response`.
 */
spfNavResponse.process = function(url, response, opt_info, opt_callback) {
  spfDebug.info('nav.response.process ', response, opt_info);

  var isNavigate = opt_info && spfString.startsWith(opt_info.type, 'navigate');
  var isReverse = opt_info && opt_info.reverse;
  var hasPosition = opt_info && !!opt_info.position;
  var hasScrolled = opt_info && opt_info.scrolled;

  var name = response['name'] || '';

  // Convert the URL to absolute, to be used for finding the task queue.
  var key = 'process ' + spfUrl.absolute(url);
  var sync = !spfConfig.get('experimental-process-async');

  // NOTE: when adding tasks to a queue, use bind to avoid name/scope errors.
  var fn;
  var num = 0;

  // Initialize the timing object if needed.
  if (!response['timing']) {
    response['timing'] = {};
  }

  // Update title (immediate).
  if (response['title']) {
    document.title = response['title'];
  }

  // Add the new history state (immediate), if needed.
  // Only navigation requests should process URL changes.
  if (isNavigate && response['url']) {
    var fullUrl = spfUrl.absolute(response['url']);
    // Update the history state if the url doesn't match.
    if (fullUrl != spfNavResponse.getCurrentUrl_()) {
      spfDebug.debug('  update history with response url');
      // Add the URL to the history stack, including hash.
      spfHistory.replace(response['url'] + window.location.hash);
    }
  }

  // Install head scripts and styles (single task), if needed.
  if (response['head']) {
    fn = spfBase.bind(function(head, timing) {
      // Extract scripts and styles from the fragment.
      var extracted = spfNavResponse.extract_(head);
      // Install links.
      spfNavResponse.installLinks_(extracted);
      // Install styles.
      spfNavResponse.installStyles_(extracted);
      spfDebug.debug('    head css');
      // Install scripts.
      // Suspend main queue to allow JS execution to occur sequentially.
      // TODO(nicksay): Consider using a sub-queue for JS execution.
      spfTasks.suspend(key);
      spfNavResponse.installScripts_(extracted, function() {
        timing['spfProcessHead'] = spfBase.now();
        spfDebug.debug('    head js');
        // Resume main queue after JS.
        spfTasks.resume(key, sync);
        spfDebug.debug('  process task done: head');
      });
    }, null, response['head'], response['timing']);
    num = spfTasks.add(key, fn);
    spfDebug.debug('  process task queued: head', num);
  }

  // Update attributes (single task), if needed.
  if (response['attr']) {
    fn = spfBase.bind(function(attrs, timing) {
      for (var id in attrs) {
        var el = document.getElementById(id);
        if (el) {
          spfDom.setAttributes(el, attrs[id]);
          spfDebug.debug('    attr set', id);
        }
      }
      timing['spfProcessAttr'] = spfBase.now();
      spfDebug.debug('  process task done: attr');
    }, null, response['attr'], response['timing']);
    num = spfTasks.add(key, fn);
    spfDebug.debug('  process task queued: attr', num);
  }

  // Update content (one task per fragment or three tasks if animated).
  var fragments = response['body'] || {};
  var numBeforeFragments = num;
  for (var id in fragments) {
    fn = spfBase.bind(function(id, body, timing) {
      var el = document.getElementById(id);
      if (el) {
        // Scroll to the top before the first content update, if needed.
        // Only non-history navigation requests scroll to the top immediately.
        // Other history navigation requests handle scrolling after all
        // processing is done to avoid jumping to the top and back down to the
        // saved position afterwards.
        if (isNavigate && !hasPosition && !hasScrolled) {
          spfState.set(spfState.Key.NAV_SCROLL_TEMP_POSITION, null);
          spfState.set(spfState.Key.NAV_SCROLL_TEMP_URL, null);
          spfDebug.debug('    scrolling to top');
          window.scroll(0, 0);
          hasScrolled = true;
          if (opt_info) {
            opt_info.scrolled = true;
          }
        }
        // Extract scripts and styles from the fragment.
        var extracted = spfNavResponse.extract_(body);
        // Install styles.
        spfNavResponse.installStyles_(extracted);
        // Set up scripts to be installed after the html is updated.
        var installScripts = function() {
          // Install scripts.
          // Suspend main queue to allow JS execution to occur sequentially.
          // TODO(nicksay): Consider using a sub-queue for JS execution.
          spfTasks.suspend(key);
          spfNavResponse.installScripts_(extracted, function() {
            // Resume main queue after JS.
            spfTasks.resume(key, sync);
            spfDebug.debug('  process task done: body', id);
          });
        };

        var animationClass = /** @type {string} */ (
            spfConfig.get('animation-class'));
        var noAnimation = (!spfNavResponse.CAN_ANIMATE_ ||
                           !spfDomClasslist.contains(el, animationClass));
        if (noAnimation) {
          var htmlHandler = /** @type {Function} */(
              spfConfig.get('experimental-html-handler'));
          if (htmlHandler) {
            // Suspend main queue for the experimental HTML handler.
            spfTasks.suspend(key);
            htmlHandler(extracted['html'], el, function() {
              installScripts();
              // Resume main queue after the experimental HTML handler.
              spfTasks.resume(key, sync);
            });
          } else {
            el.innerHTML = extracted['html'];
            installScripts();
          }
        } else {
          var animation = new spfNavResponse.Animation_(
              el,
              extracted['html'],
              animationClass,
              name,
              parseInt(spfConfig.get('animation-duration'), 10),
              !!isReverse);
          // Suspend main queue while the animation is running.
          spfTasks.suspend(key);
          // Finish a previous animation on this sub-queue, if needed.
          spfTasks.run(animation.key, true);
          // Animation task 1: insert new, delay = 0.
          spfTasks.add(
              animation.key,
              spfBase.bind(spfNavResponse.prepareAnimation_, null, animation),
              0);
          spfDebug.debug('  process queued prepare animation', id);
          // Animation task 2: switch, delay = 17ms = 1 frame @ 60fps.
          spfTasks.add(
              animation.key,
              spfBase.bind(spfNavResponse.runAnimation_, null, animation),
              17);
          spfDebug.debug('  process queued run animation', id);
          // Animation task 3: remove old, delay = config.
          spfTasks.add(
              animation.key,
              spfBase.bind(spfNavResponse.completeAnimation_, null, animation),
              animation.duration);
          spfDebug.debug('  process queued complete animation', id);
          // Resume main queue after animation is done.
          spfTasks.add(
              animation.key,
              spfBase.bind(function() {
                installScripts();
                spfTasks.resume(key, sync);
              }, null),
              0);
          spfTasks.run(animation.key);
        }
      }
    }, null, id, fragments[id], response['timing']);
    num = spfTasks.add(key, fn);
    spfDebug.debug('  process task queued: body', id, num);
  }
  var numAfterFragments = num;
  var numFragments = numAfterFragments - numBeforeFragments;

  // Install foot scripts and styles (single task), if needed.
  if (response['foot']) {
    fn = spfBase.bind(function(foot, timing, numFragments) {
      // Use the page scripts task as a signal that the content is updated,
      // only recording the content completion time if fragments were processed.
      if (numFragments) {
        timing['spfProcessBody'] = spfBase.now();
      }
      // Extract scripts and styles from the fragment.
      var extracted = spfNavResponse.extract_(foot);
      // Install styles.
      spfNavResponse.installStyles_(extracted);
      spfDebug.debug('    foot css');
      // Install scripts.
      // Suspend main queue to allow JS execution to occur sequentially.
      // TODO(nicksay): Consider using a sub-queue for JS execution.
      spfTasks.suspend(key);
      spfNavResponse.installScripts_(extracted, function() {
        timing['spfProcessFoot'] = spfBase.now();
        spfDebug.debug('    foot js');
        spfTasks.resume(key, sync);  // Resume main queue after JS.
        spfDebug.debug('  process task done: foot');
      });
    }, null, response['foot'], response['timing'],
        numFragments);
    num = spfTasks.add(key, fn);
    spfDebug.debug('  process task queued: foot', num);
  } else if (numFragments) {
    // If a page scripts task is unnecessary and fragments were processed,
    // add a task to record the completion time.  Doing this only if page
    // scripts won't be installed prevents unnecessary task execution and
    // potential delays.
    fn = spfBase.bind(function(timing) {
      timing['spfProcessBody'] = spfBase.now();
      spfDebug.debug('  process task done: timing-for-body');
    }, null, response['timing']);
    num = spfTasks.add(key, fn);
    spfDebug.debug('  process task queued: timing-for-body', num);
  }

  // Execute callback.
  if (opt_callback) {
    num = spfTasks.add(key, spfBase.bind(opt_callback, null, url, response));
    spfDebug.debug('  process task queued: callback', num);
  }

  spfDebug.debug('  process run', key, sync);
  spfTasks.run(key, sync);
};


/**
 * Preprocesses a SPF response.

 * Similar to {@link #process} but instead of page content being updated,
 * script and stylesheet URLs are prefetched.
 *
 * @param {string} url The URL of the response being preprocessed.
 * @param {spfBase.SingleResponse} response The SPF response object to preprocess.
 * @param {spfBase.nav.Info=} opt_info The navigation info object.
 * @param {function(string, spfBase.SingleResponse)=} opt_callback Function to
 *     execute when preprocessing is done; the first argument is `url`,
 *     the second argument is `response`.
 */
spfNavResponse.preprocess = function(url, response, opt_info, opt_callback) {
  spfDebug.info('nav.response.preprocess ', response);
  // Convert the URL to absolute, to be used for finding the task queue.
  var key = 'preprocess ' + spfUrl.absolute(url);

  // NOTE: when adding tasks to a queue, use bind to avoid name/scope errors.
  var fn;

  // Preinstall page styles (single task), if needed.
  if (response['head']) {
    fn = spfBase.bind(function(head) {
      var extracted = spfNavResponse.extract_(head);
      spfNavResponse.preinstallLinks_(extracted);
      spfNavResponse.preinstallStyles_(extracted);
      spfNavResponse.preinstallScripts_(extracted);
      spfDebug.debug('  preprocess task done: head');
    }, null, response['head']);
    spfTasks.add(key, fn);
    spfDebug.debug('  preprocess task queued: head');
  }

  // Preinstall fragment scripts and styles (one task per fragment).
  var fragments = response['body'] || {};
  for (var id in fragments) {
    if (fragments[id]) {
      fn = spfBase.bind(function(id, body) {
        var extracted = spfNavResponse.extract_(body);
        spfNavResponse.preinstallStyles_(extracted);
        spfNavResponse.preinstallScripts_(extracted);
        spfDebug.debug('    body js', id);
        spfDebug.debug('  preprocess task done: body', id);
      }, null, id, fragments[id]);
      spfTasks.add(key, fn);
      spfDebug.debug('  preprocess task queued: body', id);
    }
  }

  // Preinstall page scripts (single task).
  if (response['foot']) {
    fn = spfBase.bind(function(foot) {
      var extracted = spfNavResponse.extract_(foot);
      spfNavResponse.preinstallStyles_(extracted);
      spfNavResponse.preinstallScripts_(extracted);
      spfDebug.debug('  preprocess task done: foot');
    }, null, response['foot']);
    spfTasks.add(key, fn);
    spfDebug.debug('  preprocess task queued: foot');
  }

  // Execute callback.
  if (opt_callback) {
    spfTasks.add(key, spfBase.bind(opt_callback, null, url, response));
    spfDebug.debug('  preprocess task queued: callback');
  }

  // The preprocessing queue is always run async.
  spfTasks.run(key);
};


/**
 * @param {spfNavResponse.Animation_} data The animation data.
 * @private
 */
spfNavResponse.prepareAnimation_ = function(data) {
  // Add the start class to put elements in their beginning states.
  spfDomClasslist.add(data.element, data.dirClass);
  spfDomClasslist.add(data.element, data.fromClass);
  spfDomClasslist.add(data.element, data.toClass);
  spfDomClasslist.add(data.element, data.startClass);
  spfDomClasslist.add(data.element, data.startClassDeprecated);
  // Pack the existing content into a temporary container.
  data.oldEl = document.createElement('div');
  data.oldEl.className = data.oldClass;
  spfDom.packElement(data.element, data.oldEl);
  // Place the new content into a temporary container as a sibling.
  data.newEl = document.createElement('div');
  data.newEl.className = data.newClass;
  data.newEl.innerHTML = data.html;
  if (data.reverse) {
    spfDom.insertSiblingBefore(data.newEl, data.oldEl);
  } else {
    spfDom.insertSiblingAfter(data.newEl, data.oldEl);
  }
  spfDebug.debug('  process done prepare animation', data.element.id);
};


/**
 * @param {spfNavResponse.Animation_} data The animation data.
 * @private
 */
spfNavResponse.runAnimation_ = function(data) {
  spfDomClasslist.remove(data.element, data.startClass);
  spfDomClasslist.remove(data.element, data.startClassDeprecated);
  spfDomClasslist.add(data.element, data.endClass);
  spfDomClasslist.add(data.element, data.endClassDeprecated);
  spfDebug.debug('  process done run animation', data.element.id);
};


/**
 * @param {spfNavResponse.Animation_} data The animation data.
 * @private
 */
spfNavResponse.completeAnimation_ = function(data) {
  // Remove the old content.
  data.element.removeChild(data.oldEl);
  // Unpack the new content from the temporary container.
  spfDom.unpackElement(data.newEl);
  // Remove the end class to put elements back in normal state.
  spfDomClasslist.remove(data.element, data.endClass);
  spfDomClasslist.remove(data.element, data.endClassDeprecated);
  spfDomClasslist.remove(data.element, data.fromClass);
  spfDomClasslist.remove(data.element, data.toClass);
  spfDomClasslist.remove(data.element, data.dirClass);
  spfDebug.debug('  process done complete animation', data.element.id);
};


/**
 * Extracts all resources from HTML in a SPF response.
 *
 * @param {T} response The SPF response object to extract.
 * @return {T} The response, updated to have resources extracted from HTML
 *     strings.  This does not create a new object and modifies the passed
 *     response in-place.
 * @template T
 */
spfNavResponse.extract = function(response) {
  spfDebug.debug('spfNavResponse.extract', response);
  var parts = spfArray.toArray(response);
  spfArray.each(parts, function(part) {
    if (part) {
      if (part['head']) {
        part['head'] = spfNavResponse.extract_(part['head']);
      }
      if (part['body']) {
        for (var id in part['body']) {
          part['body'][id] = spfNavResponse.extract_(part['body'][id]);
        }
      }
      if (part['foot']) {
        part['foot'] = spfNavResponse.extract_(part['foot']);
      }
    }
  });
  return response;
};


/**
 * Extracts resources from an HTML string:
 *   - JS: <script> and <script src>
 *   - CSS: <style> and <link rel=stylesheet>
 *
 * @param {spfBase.ResponseFragment|spfNavResponse.Extraction_} frag The response
 *     fragment (either a HTML string to parse or a pre-parsed object), or a
 *     previous extraction result.
 * @return {!spfNavResponse.Extraction_}
 * @private
 */
spfNavResponse.extract_ = function(frag) {
  var result = new spfNavResponse.Extraction_();
  if (!frag) {
    return result;
  }

  // If the fragment isn't a string, it's a pre-parsed object.  Use the
  // provided values to populate the result instead.
  if (!spfString.isString(frag)) {
    // Add the parsed scripts to the result.
    if (frag['scripts']) {
      spfArray.each(frag['scripts'], function(script) {
        result['scripts'].push({url: script['url'] || '',
                             text: script['text'] || '',
                             name: script['name'] || '',
                             async: script['async'] || false});
      });
    }
    // Add the parsed styles to the result.
    if (frag['styles']) {
      spfArray.each(frag['styles'], function(style) {
        result['styles'].push({url: style['url'] || '',
                            text: style['text'] || '',
                            name: style['name'] || ''});
      });
    }
    // Add the parsed links to the result.
    if (frag['links']) {
      spfArray.each(frag['links'], function(link) {
        if (link['rel'] == 'spf-preconnect') {
          result['links'].push({url: link['url'] || '',
                             rel: link['rel'] || ''});
        }
      });
    }
    result['html'] = frag['html'] || '';
    return result;
  }

  // Re-assure the compiler that the fragment is a string at this point.
  frag = /** @type {string} */ (frag);

  // Parse scripts and styles and add them to the result.
  frag = frag.replace(spfNavResponse.ElementRegEx.SCRIPT_STYLE,
      function(full, tag, attr, text) {
        // A script tag can be either an inline or external style.
        // Parse the name, src, and async attributes.
        if (tag == 'script') {
          var name = attr.match(spfNavResponse.AttributeRegEx.NAME);
          name = name ? name[1] : '';
          var url = attr.match(spfNavResponse.AttributeRegEx.SRC);
          url = url ? url[1] : '';
          var async = spfNavResponse.AttributeRegEx.ASYNC.test(attr);
          var type = spfNavResponse.AttributeRegEx.TYPE.exec(attr);
          var inject = !type || spfString.contains(type[1], '/javascript') ||
              spfString.contains(type[1], '/x-javascript') ||
              spfString.contains(type[1], '/ecmascript');
          if (inject) {
            result['scripts'].push(
                {url: url, text: text, name: name, async: async});
            return '';
          } else {
            return full;
          }
        }
        // A style tag is an inline style.  Parse the name attribute.
        if (tag == 'style') {
          var name = attr.match(spfNavResponse.AttributeRegEx.NAME);
          name = name ? name[1] : '';
          var type = spfNavResponse.AttributeRegEx.TYPE.exec(attr);
          var inject = !type || spfString.contains(type[1], 'text/css');
          if (inject) {
            result['styles'].push({url: '', text: text, name: name});
            return '';
          } else {
            return full;
          }
        }
        // An unexpected tag was matched.  Do nothing.
        return full;
      });

  // Parse links and add them to the result.
  frag = frag.replace(spfNavResponse.ElementRegEx.LINK,
      function(full, attr) {
        var rel = attr.match(spfNavResponse.AttributeRegEx.REL);
        rel = rel ? rel[1] : '';
        // A rel=stylesheet tag is an external style.
        // Parse the name and href attributes.
        if (rel == 'stylesheet') {
          var name = attr.match(spfNavResponse.AttributeRegEx.NAME);
          name = name ? name[1] : '';
          var url = attr.match(spfNavResponse.AttributeRegEx.HREF);
          url = url ? url[1] : '';
          result['styles'].push({url: url, text: '', name: name});
          return '';
        }
        // A rel=spf-preconnect tag indicates early connection.
        // Parse the href attribute.
        if (rel == 'spf-preconnect') {
          var url = attr.match(spfNavResponse.AttributeRegEx.HREF);
          url = url ? url[1] : '';
          result['links'].push({url: url, rel: rel});
          return '';
        }
        // An unknown link was matched.  Do nothing.
        return full;
      });

  // The result html is what's left after parsing.
  result['html'] = frag;

  return result;
};


/**
 * Installs scripts that have been extracted from an HTML string.
 * See {@link spfNetScript.load}, {@link spfNetScript.eval}, and
 * {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @param {Function=} opt_callback Callback function to execute after
 *     all scripts are loaded.
 * @private
 */
spfNavResponse.installScripts_ = function(result, opt_callback) {
  if (result['scripts'].length <= 0) {
    opt_callback && opt_callback();
    return;
  }
  // Load or evaluate the scripts in order or asynchronously.
  var index = -1;
  var next = function() {
    index++;
    if (index < result['scripts'].length) {
      var item = result['scripts'][index];
      var fn = function() {};
      if (item.url) {
        if (item.name) {
          fn = spfBase.bind(spfNetScript.load, null, item.url, item.name);
        } else {
          fn = spfBase.bind(spfNetScript.get, null, item.url);
        }
      } else if (item.text) {
        if (item.name) {
          fn = spfBase.bind(spfNetScript.eval, null, item.text, item.name);
        } else {
          fn = spfBase.bind(spfNetScript.exec, null, item.text);
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


/**
 * Prefetches scripts that have been extracted from an HTML string.
 * See {@link spfNetScript.prefetch} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.preinstallScripts_ = function(result) {
  if (result['scripts'].length <= 0) {
    return;
  }
  // Prefetch the scripts.
  var urls = spfArray.map(result['scripts'], function(item) {
    return item.url;
  });
  spfNetScript.prefetch(urls);
};


/**
 * Installs styles that have been extracted from an HTML string.
 * See {@link spfNetStyle.load}, {@link spfNetStyle.eval}, and
 * {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.installStyles_ = function(result) {
  if (result['styles'].length <= 0) {
    return;
  }
  // Install the styles.
  spfArray.each(result['styles'], function(item) {
    if (item.url) {
      if (item.name) {
        spfNetStyle.load(item.url, item.name);
      } else {
        spfNetStyle.get(item.url);
      }
    } else if (item.text) {
      if (item.name) {
        spfNetStyle.eval(item.text, item.name);
      } else {
        spfNetStyle.exec(item.text);
      }
    }
  });
};


/**
 * Prefetches styles that have been extracted from an HTML string.
 * See {@link spfNetStyle.prefetch} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.preinstallStyles_ = function(result) {
  if (result['styles'].length <= 0) {
    return;
  }
  // Prefetch the styles.
  var urls = spfArray.map(result['styles'], function(item) {
    return item.url;
  });
  spfNetStyle.prefetch(urls);
};


/**
 * Installs links (i.e. DNS) that have extracted from an HTML string.
 * See {@link spfNetConnect.preconnect} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.installLinks_ = function(result) {
  // Currently, only preconnect links are supported.
  spfNavResponse.preinstallLinks_(result);
};


/**
 * Prefetches links (i.e. DNS) that have been extracted from an HTML string.
 * See {@link spfNetConnect.preconnect} and {@link #extract_}.
 *
 * @param {!spfNavResponse.Extraction_} result The extraction result.
 * @private
 */
spfNavResponse.preinstallLinks_ = function(result) {
  if (result['links'].length <= 0) {
    return;
  }
  // Preconnect.
  var urls = spfArray.map(result['links'], function(item) {
    return item.rel == 'spf-preconnect' ? item.url : '';
  });
  spfNetConnect.preconnect(urls);
};


/**
 * Provides the current (absolute) URL from the window.
 * @return {string} Get the current window's URL.
 * @private
 */
spfNavResponse.getCurrentUrl_ = function() {
  return spfUrl.absolute(window.location.href);
};


/**
 * A container for holding data during an animated content update.
 * See {@link #process}.
 *
 * @param {!Element} el The element being updated.
 * @param {string} html The new content for the element.
 * @param {string} cls The animation class name.
 * @param {string} name The page name.
 * @param {number} duration The animation duration.
 * @param {boolean} reverse Whether this is a "back" animation.
 * @constructor
 * @struct
 * @private
 */
spfNavResponse.Animation_ = function(el, html, cls, name, duration, reverse) {
  /** @type {!Element} */
  this.element = el;
  /** @type {string} */
  this.html = html;
  /** @type {number} */
  this.duration = duration;
  /** @type {boolean} */
  this.reverse = reverse;

  var prevName = spfDomDataset.get(document.body, 'spfName') || '';

  /** @type {string} */
  this.key = spfTasks.key(el);
  /** @type {string} */
  this.fromClass = prevName && (cls + '-from-' + prevName);
  /** @type {string} */
  this.toClass = name && (cls + '-to-' + name);
  /** @type {Element} */
  this.oldEl = null;
  /** @type {string} */
  this.oldClass = cls + '-old';
  /** @type {Element} */
  this.newEl = null;
  /** @type {string} */
  this.newClass = cls + '-new';
  /** @type {string} */
  this.dirClass = cls + (reverse ? '-reverse' : '-forward');
  /** @type {string} */
  this.startClass = cls + '-start';
  /** @type {string} */
  this.startClassDeprecated = this.dirClass + '-start';
  /** @type {string} */
  this.endClass = cls + '-end';
  /** @type {string} */
  this.endClassDeprecated = this.dirClass + '-end';
};


/**
 * A container for holding the results from parsing and extracting resources
 * from an HTML string.  See {@link #extract_}.
 *
 * Note: This container should be accessed as a dict (obj['foo']) not as a
 * struct (obj.foo) to ensure consistency when accessing parsed responses
 * cached by previous versions of SPF.
 *
 * @constructor
 * @dict
 * @private
 */
// TODO(nicksay): Consider a shared interface for spfNavResponse.Extraction_
// and spfBase.ResponseFragment.
spfNavResponse.Extraction_ = function() {
  /** @type {string} */
  this['html'] = '';
  /** @type {!Array.<{url:string, text:string, name:string, async:boolean}>} */
  this['scripts'] = [];
  /** @type {!Array.<{url:string, text:string, name:string}>} */
  this['styles'] = [];
  /** @type {!Array.<{url:string, rel:string}>} */
  this['links'] = [];
};


/**
 * Whether the browser supports animation via CSS Transitions.
 * @private {boolean}
 */
spfNavResponse.CAN_ANIMATE_ = (function() {
  var testEl = document.createElement('div');
  if ('transition' in testEl.style) {
    return true;
  }
  var prefixes = ['webkit', 'Moz', 'Ms', 'O', 'Khtml'];
  return spfArray.some(prefixes, function(prefix) {
    return prefix + 'Transition' in testEl.style;
  });
})();


/**
 * Regular expressions used to extract resource elements in HTML strings.
 *
 * @enum {RegExp}
 */
spfNavResponse.ElementRegEx = {
  LINK: /\x3clink([\s\S]*?)\x3e/ig,
  SCRIPT_STYLE: /\x3c(script|style)([\s\S]*?)\x3e([\s\S]*?)\x3c\/\1\x3e/ig
};


/**
 * Regular expressions used to extract attributes in HTML strings.
 * @enum {RegExp}
 */
spfNavResponse.AttributeRegEx = {
  ASYNC: /(?:\s|^)async(?:\s|=|$)/i,
  HREF: /(?:\s|^)href\s*=\s*["']?([^\s"']+)/i,
  NAME: /(?:\s|^)name\s*=\s*["']?([^\s"']+)/i,
  REL: /(?:\s|^)rel\s*=\s*["']?([^\s"']+)/i,
  SRC: /(?:\s|^)src\s*=\s*["']?([^\s"']+)/i,
  TYPE: /(?:\s|^)type\s*=\s*["']([^"']+)["']/i
};


/**
 * Tokens used when parsing multipart responses.
 * @enum {string}
 */
spfNavResponse.Token = {
  BEGIN: '[\r\n',
  DELIMITER: ',\r\n',
  END: ']\r\n'
};


if (spfTracing.ENABLED) {
  (function() {
    spfNavResponse.parse = spfTracing.instrument(
        spfNavResponse.parse, 'spfNavResponse.parse');
    spfNavResponse.process = spfTracing.instrument(
        spfNavResponse.process, 'spfNavResponse.process');
    spfNavResponse.preprocess = spfTracing.instrument(
        spfNavResponse.preprocess, 'spfNavResponse.preprocess');

    spfNavResponse.extract = spfTracing.instrument(
        spfNavResponse.extract, 'spfNavResponse.extract');
    spfNavResponse.extract_ = spfTracing.instrument(
        spfNavResponse.extract_, 'spfNavResponse.extract_');

    spfNavResponse.installScripts_ = spfTracing.instrument(
        spfNavResponse.installScripts_,
        'spfNavResponse.installScripts_');
    spfNavResponse.preinstallScripts_ = spfTracing.instrument(
        spfNavResponse.preinstallScripts_,
        'spfNavResponse.preinstallScripts_');

    spfNavResponse.installStyles_ = spfTracing.instrument(
        spfNavResponse.installStyles_,
        'spfNavResponse.installStyles_');
    spfNavResponse.preinstallStyles_ = spfTracing.instrument(
        spfNavResponse.preinstallStyles_,
        'spfNavResponse.preinstallStyles_');

    spfNavResponse.installLinks_ = spfTracing.instrument(
        spfNavResponse.installLinks_,
        'spfNavResponse.installLinks_');
    spfNavResponse.preinstallLinks_ = spfTracing.instrument(
        spfNavResponse.preinstallLinks_,
        'spfNavResponse.preinstallLinks_');
  })();
}

export default spfNavResponse;

