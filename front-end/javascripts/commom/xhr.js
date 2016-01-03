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
