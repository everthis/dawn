import {disableScroll, enableScroll} from './toggleScroll';
export function popup(ev, callback) {
  let popupEle = document.createElement('div');
  popupEle.classList.add('popup-layer');
  popupEle.innerHTML = generatePopupTpl();
  positionPopupEle(popupEle, ev);
  bindPopupEvents(popupEle);
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

function bindPopupEvents(ele) {
  ele.getElementsByClassName('popup-shadow')[0].addEventListener('click', closePopup);
}

function positionPopupEle(ele, coordinates) {
  ele.getElementsByClassName('popup-content')[0].style.transform = 'translate3d(' + coordinates.pageX + 'px, ' + coordinates.pageY + 'px, 0)';
}

function closePopup(ev) {
  if (ev.target === ev.currentTarget) {
    document.body.removeChild(this.parentNode);
    enableScroll();
  }
}
