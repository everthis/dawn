export function XHR(method, reqUrl, params) {
  let req = new XMLHttpRequest();
  let processedData = null;
  let processedReqUrl = reqUrl;

  req.addEventListener('progress', updateProgress);
  req.addEventListener('load', transferComplete);
  req.addEventListener('error', transferFailed);
  req.addEventListener('abort', transferCanceled);

  req.open(method, processedReqUrl);
  req.send(processedData);

  // progress on transfers from the server to the client (downloads)
  function updateProgress(oEvent) {
    if (oEvent.lengthComputable) {
      var percentComplete = oEvent.loaded / oEvent.total;
    } else {
      // Unable to compute progress information since the total size is unknown
    }
  }

  function transferComplete(evt) {
    console.log('The transfer is complete.');
  }

  function transferFailed(evt) {
    console.log('An error occurred while transferring the file.');
  }

  function transferCanceled(evt) {
    console.log('The transfer has been canceled by the user.');
  }
}

// Make sure that every Ajax request sends the CSRF token
CSRFProtection: function(xhr) {
  var token = rails.csrfToken();
  if (token) xhr.setRequestHeader('X-CSRF-Token', token);
},
// Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
refreshCSRFTokens: function(){
  $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
},

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
function $http(url) {

  // A small example of object
  var core = {

    // Method that performs the ajax request
    ajax: function(method, url, args) {

      // Creating a promise
      var promise = new Promise(function(resolve, reject) {

        // Instantiates the XMLHttpRequest
        var client = new XMLHttpRequest();
        var uri = url;

        if (args && (method === 'POST' || method === 'PUT')) {
          uri += '?';
          var argcount = 0;
          for (var key in args) {
            if (args.hasOwnProperty(key)) {
              if (argcount++) {
                uri += '&';
              }
              uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
            }
          }
        }

        client.open(method, uri);
        client.send();

        client.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            // Performs the function "resolve" when this.status is equal to 2xx
            resolve(this.response);
          } else {
            // Performs the function "reject" when this.status is different than 2xx
            reject(this.statusText);
          }
        };
        client.onerror = function() {
          reject(this.statusText);
        };
      });

      // Return the promise
      return promise;
    }
  };

  // Adapter pattern
  return {
    'get': function(args) {
      return core.ajax('GET', url, args);
    },
    'post': function(args) {
      return core.ajax('POST', url, args);
    },
    'put': function(args) {
      return core.ajax('PUT', url, args);
    },
    'delete': function(args) {
      return core.ajax('DELETE', url, args);
    }
  };
};
// End A