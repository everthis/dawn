import {initNewCiNpmPackages, exitNewCiNpmPackages} from '../modules/newCiNpmPackages';
(function () {
  A.init[A.gc.currentName] = initNewCiNpmPackages
  A.destroy[A.gc.currentName] = exitNewCiNpmPackages
})()
