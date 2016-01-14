export function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

export function hasClass(elem, className) {
  return elem.className.split(' ').indexOf(className) > -1;
}

export function browserPrefix() {
  var ua = navigator.userAgent.toLowerCase(), prefix = '';
  prefix = (ua.indexOf('chrome') >= 0 || window.openDatabase) ? '-webkit-' : (ua.indexOf('firefox') >= 0) ? '-moz-' : window.opera ? '-o-' : (document.all && navigator.userAgent.indexOf('Opera') === -1) ? '-ms-' : '';
  return prefix;
}

export function getTransform(el) {
  var transform = window.getComputedStyle(el, null).getPropertyValue('-webkit-transform');
  var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);

  if (!results) return [0, 0, 0];
  if (results[1] == '3d') return results.slice(2,5);

  results.push(0);
  return results.slice(5, 8); // returns the [X,Y,Z,1] values
}

// export function getTranslateX(el) {
//   // chrome won't use prefix
//   // var style_attr = browserPrefix() + 'transform';
//   var style_attr = 'transform';
//   var transform = window.getComputedStyle(el, null).getPropertyValue(style_attr);
//   var results = transform.match(/matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))\))/);
//   if (!results) return [0, 0, 0];
//   if (results[1] === '3d') return results.slice(2,5);
//   results.push(0);
//   return +(results.slice(5, 8)[0]); // returns the [X,Y,Z,1] values
// }

export function getTranslateX(el) {
  return el.getAttribute('style').split('translate3d')[1].split(', ')[0].slice(1).split('px')[0];
}

export function getTranslateY(obj) {
  if (!window.getComputedStyle) return;
  var style = getComputedStyle(obj),
      transform = style.transform || style.webkitTransform || style.mozTransform;
  var mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) return parseFloat(mat[1].split(', ')[13]);
  mat = transform.match(/^matrix\((.+)\)$/);
  return mat ? parseFloat(mat[1].split(', ')[5]) : 0;
}

function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push(typeof v === 'object' ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}

export function xhr(method, url, callback, paramsObj = {}, isAsync = true) {
  var xmlhttp;

  xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
      if (xmlhttp.status == 200) {
        callback(xmlhttp.responseText);
      } else if (xmlhttp.status == 400) {
        throw new Error('There was an error 400');
      } else {
        throw new Error('something else other than 200 was returned');
      }
    }
  };

  var combUrl = url + serialize(paramsObj);

  xmlhttp.open(method, combUrl, isAsync);
  xmlhttp.send(null);
}

/**
 * [stringify with 4 spaces at each level]
 * @param  {[object]} jsObj [description]
 * @return {[string]}       [description]
 * JSON.stringify(jsObj, null, "\t"); // stringify with tabs inserted at each level
 */
export function beautifyJSON(jsObj) {
  return JSON.stringify(jsObj, null, 4);
}

/**
 * [hightlightJSON works on JSON object, not string]
 * @param  {JSON object} json [description]
 * @return {string}      [description]
 */
export function hightlightJSON(json) {
  json = JSON.stringify(json, undefined, 4);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}
