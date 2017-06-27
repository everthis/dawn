let hmInstance
let fd, fa

export function processFormSubmit (ev) {
  let e = window.e || ev
  let tt = e.target

  if (tt.tagName === 'INPUT' &&
      tt.classList.contains('c-form-submit') &&
      tt.getAttribute('type') === 'submit' &&
      tt.getAttribute('name') === 'commit') {
    e.preventDefault()
    let f = tt.closest('form')
    let fa = f.action
    let fm = f.method
    let fd = new FormData(f)
    window.A.spf.load(fa, {
      method: fm,
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
        if (evt.response &&
            evt.response.status === 'success' &&
            evt.response.url) window.A.spf.navigate(evt.response.url)
      }
    })
  };
}
export function formSubmit () {
  document.addEventListener('click', processFormSubmit, false)
}
function exitProcessPostLink () {
  document.removeEventListener('click', processDataLink, false)
}
