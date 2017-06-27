import {handleMethod} from '../common/handleMethod2'

let hmInstance
let fd, fa

export function processDataLink (ev) {
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
        // exitProcessPostLink();
        if (A.fnpuLoad[A.gc.currentName] &&
		        A.fnpuLoad[A.gc.currentName]['process'] &&
		        (typeof A.fnpuLoad[A.gc.currentName]['process'] === 'function')) {
        	A.fnpuLoad[A.gc.currentName]['process'].apply(null)
        }
      },
      onDone: function (evt) {
        // processPostLink();
        if (A.fnpuLoad[A.gc.currentName] &&
		        A.fnpuLoad[A.gc.currentName]['done'] &&
		        (typeof A.fnpuLoad[A.gc.currentName]['done'] === 'function')) {
        	A.fnpuLoad[A.gc.currentName]['done'].apply(null)
        }
      }
    })
  }
}
export function processPostLink () {
  document.addEventListener('click', processDataLink, false)
}
function exitProcessPostLink () {
  document.removeEventListener('click', processDataLink, false)
}
