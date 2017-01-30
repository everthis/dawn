import {handleMethod} from '../common/handleMethod2';
(function() {
  let cname = A.gc.currentName;

  function documentation() {
  }
  function exitDocumentation() {
  }
  function detachDocumentation() {
    A.spf.script.unload(cname);
  }
  A.init[cname] = documentation;
  A.destroy[cname] = exitDocumentation;
  // A.detach[cname] = detachDocumentation;
})();
