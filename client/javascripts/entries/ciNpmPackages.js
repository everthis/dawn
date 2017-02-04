import {ciNpmPackages, exitCiNpmPackages} from '../modules/ciNpmPackages';
(function() {
  A.init[A.gc.currentName] = ciNpmPackages;
  A.destroy[A.gc.currentName] = exitCiNpmPackages;
})();
