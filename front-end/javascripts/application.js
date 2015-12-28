import {apiTree} from './api-tree/app-index';
import {dawnSVG} from './modules/svg-walk';
apiTree();
var p = new dawnSVG();
p.init(document.getElementById('painter-target'));
p.start();
