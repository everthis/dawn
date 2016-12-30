import {ActionCable} from './common/ActionCable';
import {dataLinks} from './modules/dataLinks';
import {home} from './modules/homepage';

import {initXhr} from './modules/apiOperation';
dataLinks();
import {fcp} from './modules/fisCiPlugins';
// apiTree();
// var p = new dawnSVG();
// p.init(document.getElementById('painter-target'));
// p.start();

(() => {
  let routes = {
    '/': home,
    '/dev': [initXhr],
    '/fis_ci_plugins/new': fcp,
    '/fis_ci_plugins': fcp
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