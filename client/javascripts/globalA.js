import {spf} from 'spf-dev';
import {dataLinks} from './modules/dataLinks';
(function() {
  let A = window.A || {};
  window.A = A;
  A.spf = spf;
  A.spf.init();

  dataLinks();
})();
