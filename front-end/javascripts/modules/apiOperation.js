import {$http} from '../common/ajax';
import {html} from '../common/template';
import {insertAfter} from '../common/utilities';
import {apiTree} from '../api-tree/app-index';

let rootAPI = window.location.origin + '/apis';
let payload = {};

var callback = {
  success: function(data) {
    console.log(1, 'success', JSON.parse(data));
    apiTree(JSON.parse(data));
  },
  getAllApisSuccess: function(data) {
    renderAllApis(data);
    bindevents();
  },
  patchSuccess: function(data) {
    console.log(JSON.parse(data));
  },
  error: function(data) {
    console.log(2, 'error', JSON.parse(data));
  }
};
export function initXhr() {
  getAllApis();
  document.addEventListener('click', bindEvent);
}
function bindevents() {
  let apiLis = document.getElementsByClassName('api-li');
  [].slice.call(apiLis).forEach(function(element, index) {
    element.addEventListener('click', function(ev) {
      $http(rootAPI + '/' + ev.currentTarget.dataset.apiId)
      .get(payload)
      .then(callback.success)
      .catch(callback.error);
    });
  });
}
function renderAllApis(data) {
  data = JSON.parse(data);
  const tmpl = data => html`
      <ul class="api-ul">
      ${data.map(item => html`
          <li class="api-li" data-api-id="$${item.id}">
            <div>
              <span class="api-li-name">$${item.name}</span>
              <span class="api-li-uri">$${item.uri}</span>
            </div>
          </li>
      `)}
      </ul>
  `;
  let header = document.getElementsByTagName('header')[0];
  let apiListEle = document.createElement('div');
  apiListEle.classList.add('api-ul-wrapper');
  apiListEle.innerHTML = tmpl(data);
  insertAfter(apiListEle, header);
}
function getAllApis() {
  $http(rootAPI)
  .get(payload)
  .then(callback.getAllApisSuccess)
  .catch(callback.error);
}

function collapse() {}

function bindEvent(ev) {
  if (ev.target.classList.contains('api-save')) {
    let params = {
      'section': ev.target.parentNode.getElementsByClassName('api-section')[0].value
    };
    $http(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)
    .patch(params, 'api')
    .then(callback.success)
    .catch(callback.error);
  }
}

