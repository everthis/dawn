import {strToDom} from './utilities';

function generateScrollStr() {
  let scrollStr = `
	<div class="opui-scroll-ctrl-scroll">
		<div class="opui-scroll-axis"></div>
		<div class="opui-scroll-slider">
			<div class="opui-scroll-s-top"></div>
			<div class="opui-scroll-s-bottom"></div>
			<div class="opui-scroll-s-block"></div>
		</div>
	</div>
	`;
  return scrollStr;
}
export function scrollBarH(options) {
  return new scrollBar(options);
}

function scrollBar(params) {
  this.options = params;
  this.wrapper = params.wrapper;
  this.content = params.content;
  let newScrollStr = generateScrollStr();
  let newScrollEle = strToDom(newScrollStr);
  this.scrollEle = newScrollEle;
  if (!params.scrollbar) {
    this.wrapper.appendChild(newScrollEle);
  }
  this.calculate();
}
scrollBar.prototype.calculate = function() {
  let ww = this.wrapper.offsetWidth;
  let cw = this.content.offsetWidth;
  this.scrollEle.style.width = ww + 'px';
  this.scrollEle.getElementsByClassName('opui-scroll-axis')[0].style.width = ww + 'px';
};
