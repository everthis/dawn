import {$http} from '../common/ajax';
import {html} from '../common/template';
import {insertAfter} from '../common/utilities';
import {ApiDom} from '../api-tree/tree-dom';

let rootAPI = window.location.origin + '/apis';
let payload = {};
let apisArr = [];

var callback = {
  getApiSuccess: function(data) {
    let newApi = new ApiDom(JSON.parse(data), this);
    apisArr.push(newApi);
  },
  getAllApisSuccess: function(data) {
    renderAllApis(data);
    bindevents();
  },
  patchSuccess: function(data) {
    console.log(JSON.parse(data));
  },
  success: function(data) {
    console.log(data);
  },
  error: function(data) {
    console.log(2, 'error', JSON.parse(data));
  }
};
export function initXhr() {
  getAllApis();
  document.addEventListener('click', bindEvent);
}

function toggleFoldLi(context) {
  context.classList.toggle('unfold');
}
function bindevents() {
  let apiLis = document.getElementsByClassName('api-li-description');
  [].slice.call(apiLis).forEach(function(element, index) {
    element.addEventListener('click', function(ev) {
      toggleFoldLi(this);
      if (this.nextElementSibling) {
        return;
      };
      $http(rootAPI + '/' + this.parentNode.dataset.apiId)
      .get(payload)
      .then(callback.getApiSuccess.bind(this.parentNode))
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
            <div class="api-li-description">
              <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>
              <span class="api-li-uri">$${item.uri || "(No uri)"}</span>
              <span class="api-li-name">$${item.name ? item.name : "(No name)"}</span>
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

