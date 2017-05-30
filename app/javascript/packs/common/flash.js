import {insertAfter, strToDom} from './utilities';
export function flash(data, callback = function() {}) {
  let flashEle = strToDom(flashTpl(data));
  document.body.appendChild(flashEle);
  setTimeout(destory.bind(null, flashEle, callback), 2000);
}

function flashTpl(data) {
  let str = `
		<div class="flash-layer ${data.error ? 'error' : 'success'}">
			<div class="message">${data.error || data.message}</div>
		</div>
	`  ;
  return str;
}

function destory(ele, callback) {
  ele.addEventListener('animationend', function() {
    document.body.removeChild(ele);
  });
  ele.classList.add('blink');
  callback();
}

export function parseAndFlash(data, callback) {
  let jsonData = JSON.parse(data);
  flash(jsonData, callback);
  return jsonData;
}