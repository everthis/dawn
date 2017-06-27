import {tweetBox, exitTweetBox} from '../modules/tweetBox'
import {handleMethod} from '../common/handleMethod2'

let cname = A.gc.currentName
let hmInstance
let fd, fa

function processDataLink (ev) {
  let e = window.e || ev

  if (e.target.tagName !== 'A') return

  if (e.target.dataset.method === 'fnpu_delete') {
    e.preventDefault()
    hmInstance = handleMethod(e.target, 'delete')
    fa = e.target.getAttribute('href')
    fd = new FormData(hmInstance)
    window.A.spf.load(fa, {
      method: 'POST',
      postData: fd,
      onProcess: function (evt) {
        disposeHomepage()
      },
      onDone: function (evt) {
        initHomepage()
      }
    })
  }
}
function bindClick () {
  document.addEventListener('click', processDataLink, false)
}
function removeBindClick () {
  document.removeEventListener('click', processDataLink, false)
}

function initHomepage () {
	// bindClick();
  tweetBox()
}

function disposeHomepage () {
	// removeBindClick();
  exitTweetBox()
}

(function () {
  A.fnpuLoad[A.gc.currentName] = {
    process: disposeHomepage,
    done: initHomepage
  }
  A.init[A.gc.currentName] = initHomepage
  A.destroy[A.gc.currentName] = disposeHomepage
})()
