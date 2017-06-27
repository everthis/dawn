import {handleMethod} from '../common/handleMethod'

export function dataLinks () {
  document.addEventListener('click', processDataLink, false)
}
function processDataLink (ev) {
  let e = window.e || ev

  if (e.target.tagName !== 'A') return

  if (e.target.dataset.method === 'delete') {
    e.preventDefault()
    if (e.target.getAttribute('href') === '/logout') {
      if (A.destroy[A.gc.currentName]) A.destroy[A.gc.currentName].apply(null)
    };
    handleMethod(e.target)
  }
  if (e.target.dataset.method === 'PATCH') {
    e.preventDefault()
    handleMethod(e.target)
  }
}
