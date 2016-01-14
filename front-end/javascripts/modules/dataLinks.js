import {rorParams as RPs} from '../commom/csrf';

export function dataLinks() {
  document.addEventListener('click', processDataLink, false);
}
function processDataLink(e) {
  var e = window.e || e;

  if (e.target.tagName !== 'A')
      return;

  // Do something
  if (e.target.dataset.method) {
    e.preventDefault();
    handleMethod(e.target);
  }
}
// Handles "data-method" on links such as:
// <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
function handleMethod(link) {
  var href = link.getAttribute('href'),
    method = link.dataset.method,
    target = link.getAttribute('target'),
    csrfToken = RPs.csrfToken(),
    csrfParam = RPs.csrfParam();
  var paramsObj = {
    href: href,
    method: method,
    target: target,
    csrfToken: csrfToken,
    csrfParam: csrfParam
  };
  var formEle = createForm(paramsObj);
  appendFormToDom(formEle);
  submitForm(formEle);
}
function createForm(params) {
  var f = document.createElement('form');
  f.style.display = 'none';
  f.setAttribute('method','post');
  f.setAttribute('action',params.href);
  if (params.target) {
    f.setAttribute('target', params.target);
  };

  var i = document.createElement('input');
  i.setAttribute('type','hidden');
  i.setAttribute('name','_method');
  i.setAttribute('value',params.method);

  var s;
  if (params.csrfParam !== undefined &&
      params.csrfToken !== undefined &&
      !RPs.isCrossDomain(params.href)) {
    s = document.createElement('input');
    s.setAttribute('type','hidden');
    s.setAttribute('name', params.csrfParam);
    s.setAttribute('value',params.csrfToken);
  }
  f.appendChild(i);
  if (s) {
    f.appendChild(s);
  };
  return f;
}

function appendFormToDom(form) {
  document.body.appendChild(form);
}
function submitForm(form) {
  form.submit();
}

