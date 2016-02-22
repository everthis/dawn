import {$http} from '../common/ajax';
let rootAPI = window.location.origin + '/apis/';
let payload = {};
var callback = {
  success: function(data) {
    console.log(1, 'success', JSON.parse(data));
  },
  error: function(data) {
    console.log(2, 'error', JSON.parse(data));
  }
};
export function initXhr() {
  document.addEventListener('click', function(ev) {
    var id = undefined;
    if (ev.target.classList.contains('api-li')) {
      id = ev.target.dataset.apiId;
      $http(rootAPI + id)
      .get(payload)
      .then(callback.success)
      .catch(callback.error);
    }
  });

}

