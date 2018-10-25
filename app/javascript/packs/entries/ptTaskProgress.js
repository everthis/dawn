import {
  initPtTaskProgress,
  disposePtTaskProgress
} from "../modules/ptTaskProgress";
(function() {
  A.init[A.gc.currentName] = initPtTaskProgress;
  A.destroy[A.gc.currentName] = disposePtTaskProgress;
})();
