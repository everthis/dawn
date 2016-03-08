/*
Publishing to a topic:

events.publish('/page/load', {
  url: '/some/url/path' // any argument
});
...and subscribing to said topic in order to be notified of events:

var subscription = events.subscribe('/page/load', function(obj) {
  // Do something now that the event has occurred
});

// ...sometime later where I no longer want subscription...
subscription.remove();
 */
var events = (function() {
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      if (!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) - 1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
        item(info != undefined ? info : {});
      });
    }
  };
})();

/* 2nd */
var PubSub = {};

(function(p) {

  'use strict';

  var topics = {},

      lastUid = -1;

  var publish = function(topic, data) {

    if (!topics.hasOwnProperty(topic)) {

      return false;

    }

    var notify = function() {

      var subscribers = topics[topic],

                throwException = function(e) {

                  return function() {

                    throw e;

                  };

                };

      for (var i = 0, j = subscribers.length; i < j; i++) {

        try {

          subscribers[i].func(topic, data);

        } catch (e) {

          setTimeout(throwException(e), 0);

        }

      }

    };

    setTimeout(notify , 0);

    return true;

  };

  /**

 *  Publishes the topic, passing the data to it's subscribers

 *  @topic (String): The topic to publish

 *  @data: The data to pass to subscribers

**/

  p.publish = function(topic, data) {

    return publish(topic, data, false);

  };

  /**
 *  Subscribes the passed function to the passed topic.

 *  Every returned token is unique and should be stored if you need to unsubscribe
 *  @topic (String): The topic to subscribe to
 *  @func (Function): The function to call when a new topic is published
**/

  p.subscribe = function(topic, func) {

    // topic is not registered yet

    if (!topics.hasOwnProperty(topic)) {

      topics[topic] = [];

    }

    var token = (++lastUid).toString();

    topics[topic].push({token: token, func: func});

    // return token for unsubscribing

    return token;

  };

  /**

   *  Unsubscribes a specific subscriber from a specific topic using the unique token

   *  @token (String): The token of the function to unsubscribe

  **/

  p.unsubscribe = function(token) {

    for (var m in topics) {

      if (topics.hasOwnProperty(m)) {

        for (var i = 0, j = topics[m].length; i < j; i++) {

          if (topics[m][i].token === token) {

            topics[m].splice(i, 1);

            return token;

          }

        }

      }

    }

    return false;

  };

}(PubSub));

// a sample subscriber (or observer)

var testSubscriber = function(topics, data) {

  console.log(topics + ': ' + data);

};

// add the function to the list of subscribers to a particular topic

// maintain the token (subscription instance) to enable unsubscription later

var testSubscription = PubSub.subscribe('example1', testSubscriber);

// publish a topic or message asyncronously

PubSub.publish('example1', 'hello scriptjunkie!');

PubSub.publish('example1', ['test','a','b','c']);

PubSub.publish('example1', [{'color': 'blue'},{'text': 'hello'}]);

// unsubscribe from further topics

setTimeout(function() {

  PubSub.unsubscribe(testSubscription);

}, 0);

// test that we've fully unsubscribed

PubSub.publish('example1', 'hello again!');
