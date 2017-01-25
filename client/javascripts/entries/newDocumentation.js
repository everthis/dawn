import {newDocumentation, exitNewDocumentation} from '../modules/newDocumentation';
(function() {
  A.init[A.gc.currentName] = newDocumentation;
  A.destroy[A.gc.currentName] = exitNewDocumentation;
})();