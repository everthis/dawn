import styles from '../stylesheets/application.scss';
import {dataLinks} from './modules/dataLinks';
import {home} from './modules/homepage';
import {initXhr} from './modules/apiOperation';
import {spf} from 'spf-dev';
spf.init();
dataLinks();

(() => {
  let routes = {
    '/': home,
    '/dev': [initXhr]
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
