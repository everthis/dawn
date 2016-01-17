import {dataLinks} from './modules/dataLinks';
import {home} from './modules/homepage';
import {apiTree} from './api-tree/app-index';
dataLinks();
// apiTree();
// var p = new dawnSVG();
// p.init(document.getElementById('painter-target'));
// p.start();

(() => {
  let routes = {
  	'/': home,
    '/apis': apiTree
  };
  let pathName = window.location.pathname;
  if (routes.hasOwnProperty(pathName)) {
    routes[pathName].apply(null);
  }

})();
