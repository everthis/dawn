import {strToDom, debounce} from './utilities';

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

export function scrollBarH(b) {
  return new a(b);
}

function a(x) {
  var q = this;
  this.options = x;
  let newScrollStr = generateScrollStr();
  let newScrollEle = strToDom(newScrollStr);
  var Y = x.scrollbar || newScrollEle
    , j = x.content
    , N = x.overflowEle
    , i = x.initPos || 0
    , M = x.initDom || null
    , U = x.mousewheel || true
    , l = x.mousewheellock || false
    , H = x.wheeldelta || 1
    , z = x.ctrlblock || 0
    , J = x.step || 0.1
    , r = x.length
    , I = x.scale || 0
    , G = x.theme || ''
    , ad = x.refresh || false;
  var S = 0, T = 0, h = 0, V = function(ag) {
    var af = parseInt(S - T);
    if (af > 0) {
      var ag = ag.value;
      j.scrollLeft = af * ag;
    }
  }
  ,
    v = newScrollEle.getElementsByClassName('opui-scroll-axis')[0],
  g = newScrollEle.getElementsByClassName('opui-scroll-slider')[0],
  u = newScrollEle.getElementsByClassName('opui-scroll-s-top')[0],
  F = newScrollEle.getElementsByClassName('opui-scroll-s-bottom')[0],
  ae = newScrollEle.getElementsByClassName('opui-scroll-s-block')[0],
  W = 0, Q = z || 0, k = 0, R = Q, m = 0, C = 0, L = 0, d = 0, t = null , b = null , ab, P, D;
  var y = function() {
    X = false;
    c = false;
  }
  ;
  if (!x.scrollbar) {
    x.wrapper.appendChild(newScrollEle);
  }
  j.classList.add('opui-scroll-ctrl-content');
  Y.classList.add('opui-scroll-ctrl-scroll');
  this.render = function(ag) {
    if (!ad) {
      clearInterval(D);
    }
    try {
      T = j.offsetWidth;
      h = Y.offsetWidth;
      S = N.offsetWidth;
    } catch (ah) {}
    W = ag || r || T - 2;
    Y.style.width = W + 'px';
    v.style.width = W + 'px';
    if (W >= 0 && S >= 0) {
      if (S <= W + 2) {
        Y.style.display = 'none';
      } else {
        Y.style.display = 'block';
      }
      if (I != (S / W)) {
        I = S / W;
        o(I);
        Z(q.memOffsetX);
      }
      var af = 0;
      if (M) {
        if (M.offsetLeft + M.scrollWidth >= S) {
          af = 1;
        } else {
          if (M.offsetLeft + M.scrollWidth <= T) {
            af = 0;
          } else {
            af = M.offsetLeft / S;
          }
        }
        console.log(af);
        Z(af);
      }
      if (i) {
        console.log(i);
        Z(i);
      }
    }
  }
  ;
  D = setInterval(this.render, 50);
  // Y.innerHTML = '';

  g.onDragstart = function() {
    return false;
  }
  ;
  g.addEventListener('mouseover', function() {
    g.classList.add('opui-scroll-slider-hover');
    Y.classList.add('opui-scroll-ctrl-scroll-hover');
  });
  g.addEventListener('mousedown', function() {
    g.classList.add('opui-scroll-slider-touch');
    Y.classList.add('opui-scroll-ctrl-scroll-touch');
  });
  g.addEventListener('mouseout', function() {
    g.classList.remove('opui-scroll-slider-hover');
  });
  g.addEventListener('mouseup', function() {
    g.classList.remove('opui-scroll-slider-touch');
  });
  Y.addEventListener('mouseover', function() {
    Y.classList.add('opui-scroll-ctrl-scroll-hover');
  });
  Y.addEventListener('mousedown', function() {
    Y.classList.add('opui-scroll-ctrl-scroll-touch');
  });
  Y.addEventListener('mouseout', function() {
    Y.classList.remove('opui-scroll-ctrl-scroll-hover');
  });
  Y.addEventListener('mouseup', function() {
    Y.classList.remove('opui-scroll-ctrl-scroll-touch');
  });
  v.addEventListener('click', s);
  if (U && !this.onwheel) {
    if (!j.classList.contains('opui-scroll-onwheel')) {
      j.addEventListener('DOMMouseScroll', p);
      j.addEventListener('mousewheel', p);
      j.classList.add('opui-scroll-onwheel');
    }
  }
  if (j) {
    j.addEventListener('scroll', function() {
      if (!d) {
        Z(j.scrollLeft / (j.scrollWidth - j.offsetWidth), 1);
      }
    });
  }

  g.addEventListener('mousedown', function(af) {
    t = document.onselectstart;
    document.onselectstart = function() {
      return false;
    }
    ;
    b = window.setInterval(n, 40);
    N.style['-moz-user-select'] = 'none';
    N.style['-webkit-user-select'] = 'none';

    L = af.clientX - g.offsetLeft;
    document.addEventListener('mousemove', f);
    document.addEventListener('mouseup', aa);
    d = 1;
    af.preventDefault();
    return false;
  });
  function K(ag, ah, af) {
    if (af) {
      ag = ag > af ? af : ag;
    }
    return ag >= ah ? ag : ah;
  }
  function n() {
    V.call(window, {
      value: C,
      scale: I
    });
  }
  function O() {
    if (ab) {
      clearInterval(ab);
    }
    E();
    ab = setInterval(function() {
      if (X) {
        E();
      } else {
        clearInterval(ab);
      }
    }, 100);
  }
  function ac() {
    if (P) {
      clearInterval(P);
    }
    B();
    P = setInterval(function() {
      if (c) {
        B();
      } else {
        clearInterval(P);
      }
    }, 100);
  }
  function E() {
    var af = C - J;
    af = (af < 0) ? 0 : af;
    Z(af);
  }
  function B() {
    var af = C + J;
    af = (af > 1) ? 1 : af;
    Z(af);
  }
  function f(af) {
    af = window.event || af;
    var ag = K(af.clientX - L, R, m);
    C = (ag - R) / (m - R);
    g.style.left = ag + 'px';
    q.memOffsetX = ag;
    return false;
  }
  function aa() {
    Y.classList.remove('opui-scroll-ctrl-scroll-hover');
    Y.classList.remove('opui-scroll-ctrl-scroll-touch');
    g.classList.remove('opui-scroll-slider-hover');
    g.classList.remove('opui-scroll-slider-touch');
    N.style['-moz-user-select'] = '';
    N.style['-webkit-user-select'] = '';
    if (b) {
      window.clearInterval(b);
    }
    if (t) {
      document.onselectstart = t;
    } else {
      document.onselectstart = function() {
        return true;
      };
    }
    document.removeEventListener('mousemove', f);
    document.removeEventListener('mouseup', aa);
    g.classList.add('opui-scroll-slider');
    d = 0;
    return false;
  }
  function s(af) {
    Z((af.offsetX || af.layerX) / W);
  }
  function Z(ah, af) {
    ah = ah < 0 ? 0 : ah;
    ah = ah > 1 ? 1 : ah;
    C = ah;
    var ag = (m - R) * C + R;
    g.style.left = ag + 'px';
    q.memOffsetX = ag;
    if (!af) {
      n();
    }
  }
  function p(af) {
    // af.preventDefault();
    // af = af.originalEvent;
    // if (af) {
    //   this.onwheel = 1;
    //   var ai = (-af.wheelDelta || (af.detail && af.detail * 40) || 0) / H;
    //   var ah = ai;
    //   var ag = ah > 0 ? j.scrollLeft + 2 : j.scrollLeft - 2;
    //   N.style.zoom = '1';
    //   if (ag > 0 && (ag < (N.offsetWidth - j.offsetWidth + 5) || (N.offsetWidth - j.scrollWidth < 0 && ah < 0))) {
    //     j.scrollLeft += ah;
    //     C = j.scrollLeft / (j.scrollWidth - j.offsetWidth);
    //   } else {
    //     if (!l || Y.style.display == 'none') {
    //       document.documentElement.scrollLeft += ah;
    //       document.body.scrollLeft += ah;
    //     }
    //   }
    // }
  }
  function o(af) {
    I = (af > 10) ? 10 : af;
    if (I <= 1) {
      g.style.display = 'none';
      return;
    }
    g.style.display = 'block';
    var ag = W - 2 * Q;
    k = parseInt(ag / I);
    k = (k < 15) ? 15 : k;
    m = W - Q - k;
    g.style.width = k + 'px';
  }
  if (I > 1) {
    o(I);
  }
  let debouncedWindowResize = debounce(reRender, 200, false);
  window.addEventListener('resize', debouncedWindowResize);
  function reRender() {
    q.render();
  }
  this.dispose = function() {
    if (t) {
      document.onselectstart = t;
    } else {
      document.onselectstart = function() {
        return true;
      };
    }
    document.removeEventListener('mousemove', f);
    document.removeEventListener('mouseup', aa);
    document.removeEventListener('mouseup', y);
    if (b) {
      clearInterval(b);
    }
    if (ab) {
      clearInterval(ab);
    }
    if (P) {
      clearInterval(P);
    }
    if (D) {
      clearInterval(D);
    }
  };
}
