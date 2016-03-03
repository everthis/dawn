import {$http} from '../common/ajax';
import {html} from '../common/template';
import {popup} from '../common/popup';
import {insertAfter} from '../common/utilities';
import {ApiDom} from '../api-tree/tree-dom';

let rootAPI = window.location.origin + '/apis';
let payload = {};
let apisArr = [];

var callback = {
  getApiSuccess: function(data) {
    addApiTree(JSON.parse(data), this);
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
function bindEventToApiLiDescription(ev) {
  toggleFoldLi(this);
  if (this.nextElementSibling) {
    return;
  };
  $http(rootAPI + '/' + this.parentNode.dataset.apiId)
  .get(payload)
  .then(callback.getApiSuccess.bind(this.parentNode))
  .catch(callback.error);
}
function bindevents() {
  let apiLis = document.getElementsByClassName('api-li-description');
  [].slice.call(apiLis).forEach(function(element, index) {
    element.addEventListener('click', function(ev) {
      bindEventToApiLiDescription.call(this, ev);
    });
  });
}
function addApiTree(data = {}, containerNode, isNewApi) {
  let newApi = new ApiDom(data, containerNode, isNewApi);
  apisArr.push(newApi);
}
function newApiBtn() {
  let newApiDiv = document.createElement('div');
  let header = document.getElementsByTagName('header')[0];
  newApiDiv.classList.add('new-api');
  newApiDiv.innerHTML = `<input class="add-api-btn" type="button" value="new API">`;
  newApiDiv.children[0].addEventListener('click', function() {
    let apiUl = document.getElementsByClassName('api-ul')[0];
    let baseApiLi = strToDom(newApiLiTpl());
    apiUl.insertBefore(baseApiLi, apiUl.firstChild);
    addApiTree({}, baseApiLi, true);
    toggleFoldLi(baseApiLi.children[0]);
    baseApiLi.children[0].addEventListener('click', function(ev) {
      bindEventToApiLiDescription.call(this, ev);
    });
  });
  insertAfter(newApiDiv, header);
  return newApiDiv;
}
function strToDom(str) {
  let tmpEle = document.createElement('div');
  tmpEle.innerHTML = str;
  let returnDom = tmpEle.children[0];
  return returnDom;
}
function newApiLiTpl(data = {}) {
  var tpl = `
    <li class="api-li" data-api-id="${data.id || null}">
      <div class="api-li-description">
        <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>
        <span class="api-li-uri">${data.uri || '(No uri)'}</span>
        <span class="api-li-name">${data.name ? data.name : '(No name)'}</span>
      </div>
    </li>
  `;
  return tpl;
}
function renderAllApis(data) {
  data = JSON.parse(data);
  const tmpl = data => html`
      <ul class="api-ul">
      ${data.map(item => html`
        ${newApiLiTpl(item)}
      `)}
      </ul>
  `;
  let header = document.getElementsByTagName('header')[0];
  let apiListEle = document.createElement('div');
  apiListEle.classList.add('api-ul-wrapper');
  apiListEle.innerHTML = tmpl(data);
  insertAfter(apiListEle, newApiBtn());
}

function del (argument) {
   var action = ev.target.closest('.api-tree-wrapper').previousSibling.getElementsByClassName('api-save')[0].dataset.action;
   var params = {'action': action};
   var callback = function() {
     
   };
}
function getAllApis() {
  $http(rootAPI)
  .get(payload)
  .then(callback.getAllApisSuccess)
  .catch(callback.error);
}

function bindEvent(ev) {
  if (ev.target.classList.contains('api-save')) {
    let params = {
      'section': ev.target.parentNode.getElementsByClassName('api-section')[0].value,
      'uri': ev.target.parentNode.getElementsByClassName('api-uri')[0].value,
      'method': ev.target.parentNode.getElementsByClassName('api-method')[0].value
    };
    if (ev.target.dataset.method.toUpperCase() === "PATCH") {
      $http(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)
      .patch(params, 'api')
      .then(callback.success)
      .catch(callback.error);
    } else if (ev.target.dataset.method.toUpperCase() === 'POST') {
      $http(rootAPI)
      .post(params, 'api')
      .then(callback.success)
      .catch(callback.error);
    }
  };

  if (ev.target.classList.contains('del-dataroot-child')) {
    popup(ev, {}, deleteApi.bind(this, ev)); 
  };
  function deleteApi(ev) {
    let params = {};
    $http(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)
    .delete(params)
    .then(callback.success)
    .catch(callback.error);
  }
}

