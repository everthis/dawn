import styles from '../stylesheets/application.scss';
import {ActionCable} from './common/ActionCable';
import {dataLinks} from './modules/dataLinks';
import {home} from './modules/homepage';
import {initXhr} from './modules/apiOperation';

if (window.A && window.A.spf) window.A.spf.init();


dataLinks();
import {fcp} from './modules/fisCiPlugins';
import {newCiPlugins as ncp} from './modules/newCiPlugins';

(() => {
  let routes = {
    '/': home,
    '/dev': [initXhr],
    '/ci_plugins/new': ncp,
    '/ci_plugins': fcp
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
