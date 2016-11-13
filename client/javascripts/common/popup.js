import {disableScroll, enableScroll} from './toggleScroll';
export function popup(ev, params, callback) {
  let popupEle = document.createElement('div');
  popupEle.classList.add('popup-layer');
  popupEle.innerHTML = generatePopupTpl();
  positionPopupEle(popupEle, ev);
  bindPopupEvents(popupEle, ev, params, callback);
  document.body.appendChild(popupEle);
  disableScroll();
}

function generatePopupTpl(data) {
  let tpl = `
    <div class="popup-shadow">
      <div class="popup-content">
				<div class="popup-text">Are you sure to delete this API?</div>
				<div class="popup-btns">
					<span class="popup-btn popup-cancel-btn">cancel</span>
					<span class="popup-btn popup-confirm-btn">confirm</span>
				</div>
      </div>
    </div>
	`;
  return tpl;
}

function bindPopupEvents(ele, ev, params, callback) {
  ele.getElementsByClassName('popup-cancel-btn')[0].addEventListener('click', closePopup);
  ele.getElementsByClassName('popup-shadow')[0].addEventListener('click', closePopup);
  ele.getElementsByClassName('popup-confirm-btn')[0].addEventListener('click', confirm.bind(this, ev, ele, params, callback));
}

function confirm(ev, ele, params, callback) {
  callback();
  document.body.removeChild(ele);
}

function positionPopupEle(ele, coordinates) {
  ele.getElementsByClassName('popup-content')[0].style.transform = 'translate3d(' + coordinates.clientX + 'px, ' + coordinates.clientY + 'px, 0)';
}

function closePopup(ev) {
  if (ev.target !== ev.currentTarget) return;
  let popLayer = ev.target.closest('.popup-layer');
  if (popLayer) {
    document.body.removeChild(popLayer);
    enableScroll();
  }
}
