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
  this.overflowEle = params.overflowEle;
  let newScrollStr = generateScrollStr();
  let newScrollEle = strToDom(newScrollStr);
  this.scrollEle = newScrollEle;

  if (!params.scrollbar) {
    this.wrapper.appendChild(newScrollEle);
  }
  this.initDom();
  this.calculate();
  this.bindEvents();
}
scrollBar.prototype.initDom = function() {
  this.sliderEle = this.scrollEle.getElementsByClassName('opui-scroll-slider')[0];
  this.axisEle = this.scrollEle.getElementsByClassName('opui-scroll-axis')[0];
};
scrollBar.prototype.calculate = function() {
  this.ww = this.wrapper.offsetWidth;
  this.cw = this.overflowEle.offsetWidth;
  this.scrollEle.style.width = this.ww + 'px';
  this.scrollEle.getElementsByClassName('opui-scroll-axis')[0].style.width = this.ww + 'px';
  let ratio = this.cw / this.ww;
  this.setSliderWidth(ratio);
};
scrollBar.prototype.setSliderWidth = function(ratio) {
  let I = (ratio > 10) ? 10 : ratio;
  if (I <= 1) {
    this.sliderEle.style.display = 'none';
    return;
  }
  this.sliderEle.style.display = 'block';
  let k = parseInt(this.ww / I);
  k = (k < 15) ? 15 : k;
  this.sliderEle.style.width = k + 'px';
};

scrollBar.prototype.bindEvents = function() {
  let _this = this;
  this.sliderEle.addEventListener('mouseover', function() {
    _this.sliderEle.classList.add('opui-scroll-slider-hover');
    _this.scrollEle.classList.add('opui-scroll-ctrl-scroll-hover');
  });
  this.sliderEle.addEventListener('mousedown', function(ev) {
    _this.sliderEle.classList.add('opui-scroll-slider-touch');
    _this.scrollEle.classList.add('opui-scroll-ctrl-scroll-touch');
    _this.t = document.onselectstart;
    document.onselectstart = function() {
      return false;
    };
    _this.b = window.setInterval(n, 40);
    _this.overflowEle.style['-moz-user-select'] = 'none';
    _this.overflowEle.style['-webkit-user-select'] = 'none';
    _this.deltaX = ev.clientX - _this.sliderEle.offsetTop;

    document.addEventListener('mousemove', f);
    document.addEventListener('mouseup', aa);
    _this.d = 1;
    ev.preventDefault();
    return false;
  });
  this.sliderEle.addEventListener('mouseout', function() {
    _this.sliderEle.classList.remove('opui-scroll-slider-hover');
  });
  this.sliderEle.addEventListener('mouseup', function() {
    _this.sliderEle.classList.remove('opui-scroll-slider-touch');
  });
  this.scrollEle.addEventListener('mouseover', function() {
    _this.scrollEle.classList.add('opui-scroll-ctrl-scroll-hover');
  });
  this.scrollEle.addEventListener('mousedown', function() {
    _this.scrollEle.classList.add('opui-scroll-ctrl-scroll-touch');
  });
  this.scrollEle.addEventListener('mouseout', function() {
    _this.scrollEle.classList.remove('opui-scroll-ctrl-scroll-hover');
  });
  this.scrollEle.addEventListener('mouseup', function() {
    _this.scrollEle.classList.remove('opui-scroll-ctrl-scroll-touch');
  });
  this.axisEle.addEventListener('click', s);
};

function s() {}
scrollBar.prototype.V = function(ag) {
  var af = parseInt(S - T);
  if (af > 0) {
    var ag = ag.value;
    j.scrollTop = af * ag;
  }
};
scrollBar.prototype.n = function(ag) {
  this.V.call(window, {
    value: C,
    scale: I
  });
};
