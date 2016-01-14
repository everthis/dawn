import {dataLinks} from './modules/dataLinks';
import {apiTree} from './api-tree/app-index';
dataLinks();
// apiTree();
// var p = new dawnSVG();
// p.init(document.getElementById('painter-target'));
// p.start();

(() => {
  let routes = {
    '/apis': apiTree
  };
  let pathName = window.location.pathname;
  for (pathName in routes) {
    if (routes.hasOwnProperty(pathName)) {
      routes[pathName].apply(null);
    }
  }

})();
