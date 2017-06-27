/**
 * RAF polyfill
 * @return {[type]} [description]
 */
(function () {
  var a = 0,
    b = ['ms', 'moz', 'webkit', 'o']
  for (var c = 0; c < b.length && !window.requestAnimationFrame; ++c) {
    window.requestAnimationFrame = window[b[c] + 'RequestAnimationFrame']
    window.cancelAnimationFrame = window[b[c] + 'CancelAnimationFrame'] || window[b[c] + 'CancelRequestAnimationFrame']
  }
  window.requestAnimationFrame || (window.requestAnimationFrame = function (b, c) {
    var d = (new Date()).getTime(),
      e = Math.max(0, 16 - (d - a)),
      f = window.setTimeout(function () {
        b(d + e)
      }, e)
    a = d + e
    return f
  })
  window.cancelAnimationFrame || (window.cancelAnimationFrame = function (a) {
    clearTimeout(a)
  })
})()
