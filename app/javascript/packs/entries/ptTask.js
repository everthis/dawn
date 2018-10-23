import { initPtTask, disposePtTask } from "../modules/ptTask";
(function() {
  A.init[A.gc.currentName] = initPtTask;
  A.destroy[A.gc.currentName] = disposePtTask;
})();
