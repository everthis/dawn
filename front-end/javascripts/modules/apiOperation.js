import {$http} from '../common/ajax';
import {rootAPI} from '../global/constant';
import {html} from '../common/template';
import {popup} from '../common/popup';
import {insertAfter, strToDom, debounce} from '../common/utilities';
import {flash, parseAndFlash} from '../common/flash';
import {ApiDom} from '../api-tree/tree-dom';


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
    parseAndFlash(data);
  },
  postSuccess: function(data) {
    parseAndFlash(data);
  },
  deleteSuccess: function(data) {
    function destoryApiLi() {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'));
    }
    parseAndFlash(data, destoryApiLi.bind(this));
  },
  success: function(data) {
    console.log(data);
  },
  error: function(data) {
    parseAndFlash(data);
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
  console.log(newApi);
  apisArr.push(newApi);
}

let debouncedNewApiBtn = debounce(processNewApiClick, 500, true);
function processNewApiClick() {
  let apiUl = document.getElementsByClassName('api-ul')[0];
  let baseApiLi = strToDom(newApiLiTpl());
  apiUl.insertBefore(baseApiLi, apiUl.firstChild);
  addApiTree({}, baseApiLi, true);
  toggleFoldLi(baseApiLi.children[0]);
  baseApiLi.children[0].addEventListener('click', function(ev) {
      bindEventToApiLiDescription.call(this, ev);
    });
}
function newApiBtn() {
  let newApiDiv = document.createElement('div');
  let header = document.getElementsByTagName('header')[0];
  newApiDiv.classList.add('new-api');
  newApiDiv.innerHTML = `<input class="add-api-btn" type="button" value="new API">`;
  newApiDiv.children[0].addEventListener('click', debouncedNewApiBtn);
  insertAfter(newApiDiv, header);
  return newApiDiv;
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

function getAllApis() {
  $http(rootAPI)
  .get(payload)
  .then(callback.getAllApisSuccess)
  .catch(callback.error);
}

function bindEvent(ev) {


  if (ev.target.classList.contains('del-dataroot-child')) {
    popup(ev, {}, deleteApi.bind(this, ev));
  };
  function deleteApi(ev) {
    if (!ev.target.closest('.per-api').dataset.id) {
      ev.target.closest('.api-ul').removeChild(ev.target.closest('.api-li'));
      return null;
    };

    let params = {};
    $http(rootAPI + '/' + ev.target.closest('.per-api').dataset.id)
    .delete(params)
    .then(callback.deleteSuccess.bind(ev))
    .catch(callback.error);
  }
}

