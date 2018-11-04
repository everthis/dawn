import { PtTaskLog, exitPtTaskLog } from "../modules/ptTaskLog";
(function() {
  A.init[A.gc.currentName] = PtTaskLog;
  A.destroy[A.gc.currentName] = exitPtTaskLog;
})();
