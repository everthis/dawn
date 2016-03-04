import {insertAfter, strToDom} from './utilities';
export function flash(data, callback) {
  let flashEle = strToDom(flashTpl(data));
  document.body.appendChild(flashEle);
  setTimeout(destory.bind(null, flashEle), 2000);
}

function flashTpl(data) {
  let str = `
		<div class="flash-layer ${data.error ? 'error' : 'success'}">
			<div class="message">${data.error || data.message}</div>
		</div>
	`  ;
  return str;
}

function destory(ele) {
  ele.addEventListener('animationend', function() {
    document.body.removeChild(ele);
  });
  ele.classList.add('blink');
}

