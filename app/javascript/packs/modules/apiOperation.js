import {$http} from '../common/ajax'
import {rootAPI} from '../global/constant'
import {html} from '../common/template'
import {popup} from '../common/popup'
import {slide} from '../common/slide'
import {insertAfter, strToDom, debounce} from '../common/utilities'
import {flash, parseAndFlash} from '../common/flash'
import {ApiDom} from '../api-tree/treeDom'
import {twoWayDataBinding} from '../common/twoWayDataBinding'

let payload = {}
let apisArr = []

var callback = {
  getApiSuccess: function (data) {
    addApiTree(JSON.parse(data), this, false)
  },
  getAllApisSuccess: function (data) {
    let dataBak = data
    let JSONBak = JSON.parse(dataBak)
    if (JSONBak.length === 0) {
      newApiBtn()
      return
    }
    renderAllApis(data)
    bindevents()
    listenApiQuery()
  },
  patchSuccess: function (data) {
    parseAndFlash(data)
  },
  postSuccess: function (data) {
    parseAndFlash(data)
  },
  deleteSuccess: function (data) {
    function destoryApiLi () {
      this.target.closest('.api-ul').removeChild(this.target.closest('.api-li'))
    }
    parseAndFlash(data, destoryApiLi.bind(this))
  },
  apiQuerySuccess: function (data) {
    let searchList = document.getElementsByClassName('api-search-result')[0]
    let dataObj = JSON.parse(data)
    let contentStr = ''
    for (let i = 0, Len = dataObj.length; i < Len; i++) {
      contentStr += `<div class='per-search-result'>
        <span class="per-result-column per-result-uri">${dataObj[i].uri}</span>
        <span class="per-result-column per-result-section">${dataObj[i].section}</span>
        <span class="per-result-column per-result-method">${dataObj[i].method}</span>
        <span class="per-result-column per-result-description">${dataObj[i].description}</span>
      </div>`
    }
    searchList.innerHTML = contentStr
    dataObj.length > 0 ? searchList.classList.remove('hide') : searchList.classList.add('hide')
  },
  success: function (data) {
    console.log(data)
  },
  error: function (data) {
    if (!data.data) {
      newApiBtn()
      return
    }
    parseAndFlash(data)
  }
}
export function initApiOperation () {
  getAllApis()
}

export function disposeApiOperation () {

}

let debouncedApiQueryInput = debounce(apiQuery, 100, false)
function listenApiQuery () {
  let apiQueryInput = document.getElementsByClassName('api-query')[0]
  let inWrapper = false
  apiQueryInput.addEventListener('keyup', debouncedApiQueryInput)
  apiQueryInput.parentElement.addEventListener('mouseleave', function (ev) {
    if (!checkIfFocus.apply(apiQueryInput, ev)) {
      clearSearchResult()
    };
    inWrapper = false
  })
  apiQueryInput.parentElement.addEventListener('mouseenter', function (ev) {
    inWrapper = true
  })
  apiQueryInput.addEventListener('blur', function (ev) {
    if (!inWrapper) clearSearchResult()
  })
  apiQueryInput.addEventListener('focus', apiQuery)
}
function checkIfFocus (ev) {
  return this === document.activeElement
}
function apiQuery (ev) {
  if (ev.target.value.length <= 0) {
    clearSearchResult()
    return
  }
  payload = {q: ev.target.value}
  $http(window.location.origin + '/instantsearch')
  .get(payload)
  .then(callback.apiQuerySuccess.bind(ev))
  .catch(callback.error)
}
function clearSearchResult () {
  let apiSearchResultEle = document.getElementsByClassName('api-search-result')[0]
  apiSearchResultEle.innerHTML = ''
  apiSearchResultEle.classList.add('hide')
}
function toggleFoldLi (context, ev) {
  if (!ev) {
    context.classList.toggle('unfold')
    return
  }
  if (!ev.target.classList.contains('api-li-wiki')) {
    context.classList.toggle('unfold')
  }
}
function bindEventToApiLiDescription (ev) {
  toggleFoldLi(this, ev)
  if (this.nextElementSibling) {
    return
  };
  $http(rootAPI + '/' + this.parentNode.dataset.apiId)
  .get(payload)
  .then(callback.getApiSuccess.bind(this.parentNode))
  .catch(callback.error)
}
function bindevents () {
  let apiLis = document.getElementsByClassName('api-li-summary');
  [].slice.call(apiLis).forEach(function (element, index) {
    element.addEventListener('click', function (ev) {
      bindEventToApiLiDescription.call(this, ev)
    })
  })
}
function addApiTree (data = {}, containerNode, isNewApi) {
  let newApi = new ApiDom(data, containerNode, isNewApi)
  apisArr.push(newApi)
}

let debouncedNewApiBtn = debounce(processNewApiClick, 500, true)
let debouncedEnvBtn = debounce(processOpenEnvSettings, 500, true)
function processOpenEnvSettings (ev, el) {
  let params = {
    content: slideContent()
  }
  slide(ev, params)
}
function slideContent () {
  let tplStr = `
    <ul>
      <li>
        <label>host:</label>
        <input class="c-input" type="text" />
        <label>account:</label>
        <input class="c-input" type="text" />
        <label>label:</label>
        <input class="c-input" type="text" />
        <input class="" type="button" value="check availability" />
      </li>
    </ul>
  `
  return tplStr
}
function processNewApiClick () {
  let apiUl = document.getElementsByClassName('api-ul')[0]
  if (!apiUl) {
    createApiUl()
    apiUl = document.getElementsByClassName('api-ul')[0]
  }
  let baseApiLi = strToDom(newApiLiTpl())
  apiUl.insertBefore(baseApiLi, apiUl.firstChild)
  addApiTree({}, baseApiLi, true)
  toggleFoldLi(baseApiLi.children[0])
  baseApiLi.children[0].addEventListener('click', function (ev) {
    bindEventToApiLiDescription.call(this, ev)
  })
}

function createApiUl () {
  let apiListEle = document.createElement('div')
  let apiUlEle = document.createElement('ul')
  let newApiDiv = document.getElementsByClassName('api-add-query')[0]
  apiListEle.classList.add('api-ul-wrapper')
  apiUlEle.classList.add('api-ul')
  apiListEle.appendChild(apiUlEle)
  insertAfter(apiListEle, newApiDiv)
}
function newApiBtn () {
  let newApiDiv
  // let header = document.getElementsByClassName('api-header-pre-mark')[0];
  // let newApiStr = `
  //   <div class="api-add-query">
  //     <span class="add-api-btn">new API</span>
  //     <div class="api-search-wrapper">
  //       <input class="api-query" type="search" placeholder="search">
  //       <div class="api-search-result hide"></div>
  //     </div>
  //     <a class="c-hide icon-text-link c-float-right dev-env-settings" href="javascript:;"><span class="icon-text-icon"><svg class="icon icon-settings icon-fit"><use xlink:href="#icon-settings"></use></svg></span><span class="icon-text-text">环境同步数据配置</span></a>
  //   </div>
  // `;
  // newApiDiv = strToDom(newApiStr);
  newApiDiv = document.getElementsByClassName('api-add-query')[0]
  newApiDiv.getElementsByClassName('add-api-btn')[0].addEventListener('click', debouncedNewApiBtn)
  newApiDiv.getElementsByClassName('dev-env-settings')[0].addEventListener('click', debouncedEnvBtn)
  // insertAfter(newApiDiv, header);
  return newApiDiv
}

function newApiLiTpl (data = {}) {
  var tpl = `
    <li class="api-li" data-api-id="${data.id || null}">
      <div class="api-li-summary">
        <span class="api-li-collapse"><svg class="icon icon-down"><use xlink:href="#icon-down"></use></svg></span>
        <span class="api-li-uri" bind="uri">${data.uri || '(No uri)'}</span>
        <span class="api-li-des" bind="description">${data.description ? data.description : '(No description)'}</span>
        <a href="${data.wikiLink}" class="api-li-wiki" bind-attr-href="wikiLink" bind="wikiLink" target="_blank">${data.wikiLink ? data.wikiLink : '(No wikiLink)'}</a>
      </div>
    </li>
  `
  return tpl
}
function renderAllApis (data) {
  data = JSON.parse(data)
  const tmpl = data => html`
      <ul class="api-ul">
      ${data.map(item => html`
        ${newApiLiTpl(item)}
      `)}
      </ul>
  `
  let apiListEle = document.createElement('div')
  apiListEle.classList.add('api-ul-wrapper')
  apiListEle.innerHTML = tmpl(data)
  insertAfter(apiListEle, newApiBtn())
}

function getAllApis () {
  $http(rootAPI)
  .get(payload)
  .then(callback.getAllApisSuccess)
  .catch(callback.error)
}
