import {cn, en} from '../modules/createOrEditGist';
(function() {
  A.init[A.gc.currentName] = cn;
  A.destroy[A.gc.currentName] = en;
})();