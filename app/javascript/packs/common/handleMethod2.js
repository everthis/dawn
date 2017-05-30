import {rorParams as RPs} from '../common/csrf';
/**
 * [handleMethod description]
 * @param  {HTMLElement} link [description]
 * @return {[type]}      [description]
 * Handles "data-method" on links such as:
 * <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
 */
export function handleMethod(link, linkMethod, obj = {}) {
  var href = link.getAttribute('href'),
    method = linkMethod,
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
  var formEle = createForm(paramsObj, obj);
  // appendFormToDom(formEle);
  return formEle;
  // submitForm(formEle);
}
function createForm(params, obj) {
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

  // for (let key in obj.data) {
  //   if (obj.data.hasOwnProperty(key)) {
  //     let t = document.createElement('input');
  //     t.setAttribute('type','hidden');
  //     t.setAttribute('name','' + obj.ns + '[' + key + ']');
  //     t.setAttribute('value',obj.data[key]);
  //     f.appendChild(t);
  //   }
  // }

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
