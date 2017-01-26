import {handleMethod} from '../common/handleMethod2';
(function() {
      let cname = A.gc.currentName;
      let hmInstance;
      let fd, fa;
      function dataLinks() {
      }
      function processDataLink(ev) {
        let e = window.e || ev;

        if (e.target.tagName !== 'A') return;

        if (e.target.dataset.method === 'fnpu_delete') {
          e.preventDefault();
          hmInstance = handleMethod(e.target, "delete");
          fa = e.target.getAttribute('href');
          fd = new FormData(hmInstance);
          window.A.spf.load(fa, {
            method: "POST",
            postData: fd,
            onProcess: function(evt) {
              exitDocumentation();
            },
            onDone: function(evt) {
              documentation();
            }
          });
        }
      }
      function documentation() {
        document.addEventListener('click', processDataLink, false);
      }
      function exitDocumentation() {
        document.removeEventListener('click', processDataLink, false);
      }
      function detachDocumentation() {
        A.spf.script.unload(cname);
      }
      A.init[cname] = documentation;
      A.destroy[cname] = exitDocumentation;
      A.detach[cname] = detachDocumentation;
    })();
