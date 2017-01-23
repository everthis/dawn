import {spfBase} from './base';
import spfMain from './main';
import spfConfig from './config';
import spfCache from './cache/cache';
import spfDebug from './debug/debug';
import spfHistory from './history/history';
import spfNav from './nav/nav';
import spfNetStyle from './net/style';
import spfNetScript from './net/script';

let spfEntry = {};
// Create the API by exporting aliased functions.
// Core API functions are available on the top-level namespace.
// Extra API functions are available on second-level namespaces.
/** @private {!Object} */
spfEntry.api_ = {
  'init': spfMain.init,
  'dispose': spfMain.dispose,
  'navigate': spfNav.navigate,
  'load': spfNav.load,
  'prefetch': spfNav.prefetch,
  'process': spfNav.process
};
/** @private {!Object} */
spfEntry.extra_ = {
  'cache': {
    // Cache API.
    // * Remove one entry.
    'remove': spfCache.remove,
    // * Clear all entries.
    'clear': spfCache.clear
  },
  'script': {
    // The bootloader API.
    // * Load scripts.
    'load': spfNetScript.load,
    'get': spfNetScript.get,
    // * Wait until ready.
    'ready': spfNetScript.ready,
    'done': spfNetScript.done,
    // * Load in depedency order.
    'require': spfNetScript.require,
    // * Set dependencies and paths.
    'declare': spfNetScript.declare,
    'path': spfNetScript.path,
    // Extended script loading API.
    // * Unload scripts.
    'unload': spfNetScript.unload,
    // * Ignore ready.
    'ignore': spfNetScript.ignore,
    // * Unload in depedency order.
    'unrequire': spfNetScript.unrequire,
    // * Prefetch.
    'prefetch': spfNetScript.prefetch
  },
  'style': {
    // Style loading API.
    // * Load styles.
    'load': spfNetStyle.load,
    'get': spfNetStyle.get,
    // * Unload styles.
    'unload': spfNetStyle.unload,
    // * Set paths.
    'path': spfNetStyle.path,
    // * Prefetch.
    'prefetch': spfNetStyle.prefetch
  }
};
// For a production/debug build, isolate access to the API.
// For a development build, mixin the API to the existing namespace.
let spfEs = {};

for (var fn1 in spfEntry.api_) {
  spfEs[fn1] = spfEntry.api_[fn1];
}
// Use two-stage exporting to allow aliasing the intermediate namespaces
// created by the bootloader (e.g. s = spf.script; s.load(...)).
for (var ns in spfEntry.extra_) {
  for (var fn2 in spfEntry.extra_[ns]) {
    spfEs[ns] = spfEs[ns] || {};
    spfEs[ns][fn2] = spfEntry.extra_[ns][fn2];
  }
}

// Signal that the API is ready with custom event.  Only supported in IE 9+.
spfBase.dispatch(spfBase.EventName.READY);

export default spfEs;
