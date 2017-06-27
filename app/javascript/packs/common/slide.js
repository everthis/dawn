import {popup} from '../common/popup'
export function slide (ev, params, callback) {
  let slideEle = document.createElement('div')
  slideEle.classList.add('slide-layer')
  slideEle.innerHTML = generateSlideTpl(params.content)
  positionSlideEle(slideEle, ev)
  bindSlideEvents(slideEle, ev, params, callback)
  document.body.appendChild(slideEle)
}

function generateSlideTpl (content) {
  let tpl = `
    <div class="slide-shadow">
      <div class="slide-content">
				<div class="slide-text">${content}</div>
				<div class="slide-btns">
					<span class="slide-btn slide-cancel-btn">cancel</span>
					<span class="slide-btn slide-confirm-btn">confirm</span>
				</div>
      </div>
    </div>
	`
  return tpl
}

function bindSlideEvents (ele, ev, params, callback) {
  ele.getElementsByClassName('slide-cancel-btn')[0].addEventListener('click', closeSlide)
  ele.getElementsByClassName('slide-shadow')[0].addEventListener('click', clickShadow)
  ele.getElementsByClassName('slide-confirm-btn')[0].addEventListener('click', confirm.bind(this, ev, ele, params, callback))
}

function confirm (ev, ele, params, callback) {
  callback()
  document.body.removeChild(ele)
}

function positionSlideEle (ele, coordinates) {
  // ele.getElementsByClassName('slide-content')[0].style.transform = 'translate3d(' + coordinates.clientX + 'px, ' + coordinates.clientY + 'px, 0)';
}

function clickShadow (ev) {
  if (ev.target !== ev.currentTarget) return
  popup(ev, undefined, closeSlide.bind(this, ev))
}

function closeSlide (ev) {
  let popLayer = ev.target.closest('.slide-layer')
  if (popLayer) {
    document.body.removeChild(popLayer)
  }
}
