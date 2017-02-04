import {newDocumentation, exitNewDocumentation} from '../modules/createOrEditDocumentation';
(function() {
  A.init[A.gc.currentName] = newDocumentation;
  A.destroy[A.gc.currentName] = exitNewDocumentation;
})();
