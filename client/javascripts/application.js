import styles from '../stylesheets/application.scss';
import {ActionCable} from './common/ActionCable';

import {home} from './modules/homepage';
import {initXhr} from './modules/apiOperation';

if (window.A && window.A.spf) window.A.spf.init();


import {fcp} from './modules/fisCiPackages';
import {newCiPackages as ncp} from './modules/newCiPackages';

(() => {
  let routes = {
    '/': home,
    '/dev': [initXhr],
    '/ci_packages/new': ncp,
    '/ci_packages': fcp
  };
  let pathName = window.location.pathname;
  if (routes.hasOwnProperty(pathName)) {
    if (Object.prototype.toString.call(routes[pathName]) === '[object Array]' &&
      routes[pathName].length) {
      for (let i = 0; i < routes[pathName].length; i++) {
        routes[pathName][i].apply(null);
      }
    } else {
      routes[pathName].apply(null);
    }
  }

})();
