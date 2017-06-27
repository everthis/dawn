/**
// B-> Here you define its functions and its payload
var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
var payload = {
  'topic' : 'js',
  'q'     : 'Promise'
};
var callback = {
  success : function(data){
     console.log(1, 'success', JSON.parse(data));
  },
  error : function(data){
     console.log(2, 'error', JSON.parse(data));
  }
};
// End B
// Executes the method call
$http(mdnAPI)
  .get(payload)
  .then(callback.success)
  .catch(callback.error);
// Executes the method call but an alternative way (1) to handle Promise Reject case
$http(mdnAPI)
  .get(payload)
  .then(callback.success, callback.error);
// Executes the method call but an alternative way (2) to handle Promise Reject case
$http(mdnAPI)
  .get(payload)
  .then(callback.success)
  .then(undefined, callback.error);
 */
// A-> $http function is implemented in order to follow the standard Adapter pattern
import {serialize} from './serialize'
import {isEmpty, mergeObj, addPrefixToObj, wrapObj} from './utilities'
import {rorParams as RPs} from './csrf'

export function $http (url) {
  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax: function (method, url, args = {}, prefix) {
      // for Rails
      // url = url + '.json';
      // Creating a promise
      var promise = new Promise(function (resolve, reject) {
        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest()

        if (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE') {
          let uri = JSON.stringify(extendGeneralParams(wrapObj(args, prefix)))
          client.open(method, url)
          // client.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          client.setRequestHeader('Content-type', 'application/json')
          client.send(uri)
        } else if (method === 'GET') {
          let uri = serialize(extendGeneralParams(addPrefixToObj(args, prefix)))
          client.open(method, url + '?' + uri)
          client.setRequestHeader('Content-type', 'application/json')
          client.send()
        };

        client.onload = function () {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(this.response)
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.responseText)
          }
        }
        client.onerror = function (err) {
          reject(this.responseText)
        }
      })

      // Return the promise
      return promise
    }
  }
  // Adapter pattern
  return {
    'get': function (args, prefix) {
      return core.ajax('GET', url, args, prefix)
    },
    'post': function (args, prefix) {
      return core.ajax('POST', url, args, prefix)
    },
    'put': function (args, prefix) {
      return core.ajax('PUT', url, args, prefix)
    },
    'patch': function (args, prefix) {
      return core.ajax('PATCH', url, args, prefix)
    },
    'delete': function (args, prefix) {
      return core.ajax('DELETE', url, args, prefix)
    }
  }
}

function extendGeneralParams (obj) {
  let csrfParam = RPs.csrfParam()
  let csrfToken = RPs.csrfToken()
  let generalObj = {}
  generalObj.utf8 = '✓'
  generalObj.format = 'json'
  generalObj[csrfParam] = csrfToken
  return mergeObj(obj, generalObj)
}
// End A
