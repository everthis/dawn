import {initApiOperation, disposeApiOperation} from '../modules/apiOperation';
(function () {
  A.init[A.gc.currentName] = initApiOperation
  A.destroy[A.gc.currentName] = disposeApiOperation
})()
