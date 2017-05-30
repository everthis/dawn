import styles from '../../../stylesheet/globalA.scss';

import {ActionCable} from '../common/ActionCable';

import spfEs from "../spf/entry";
import {dataLinks} from "../modules/dataLinks";
import {formSubmit} from "../modules/formSubmit";

import {processPostLink} from "../modules/postHandler";

import LoadingBar from '../common/loadingBar'

let A = window.A || {};
window.A = A;
A.spf = spfEs;
let app = window.A.app || {};

dataLinks();
formSubmit();
processPostLink();

/**
 * Initialize the app.
 */
app.init = function() {
  app.start_ = +new Date();
  if (window.addEventListener) {
    window.addEventListener('spfclick', app.onClick);
    window.addEventListener('spfhistory', app.onHistory);
    window.addEventListener('spfrequest', app.onRequest);
    window.addEventListener('spfpartprocess', app.onPartProcess);
    window.addEventListener('spfpartdone', app.onPartDone);
    window.addEventListener('spfprocess', app.onProcess);
    window.addEventListener('spfdone', app.onDone);
    window.addEventListener('spferror', app.onError);


    window.addEventListener('spfjsbeforeunload', app.onScriptBeforeUnload);
    window.addEventListener('spfjsunload', app.onScriptUnload);
    window.addEventListener('spfcssbeforeunload', app.onStyleBeforeUnload);
    window.addEventListener('spfcssunload', app.onStyleUnload);
  }
  app.enabled = A.spf.init();
};


/**
 * Dispose the demo app.
 */
app.dispose = function() {
  app.start_ = 0;
  app.enabled = false;
  if (window.removeEventListener) {
    window.removeEventListener('spfclick', app.onClick);
    window.removeEventListener('spfhistory', app.onHistory);
    window.removeEventListener('spfrequest', app.onRequest);
    window.removeEventListener('spfpartprocess', app.onPartProcess);
    window.removeEventListener('spfpartdone', app.onPartDone);
    window.removeEventListener('spfprocess', app.onProcess);
    window.removeEventListener('spfdone', app.onDone);
    window.removeEventListener('spferror', app.onError);

    window.removeEventListener('spfjsbeforeunload', app.onScriptBeforeUnload);
    window.removeEventListener('spfjsunload', app.onScriptUnload);
    window.removeEventListener('spfcssbeforeunload', app.onStyleBeforeUnload);
    window.removeEventListener('spfcssunload', app.onStyleUnload);
  }
};

/**
 * Simple central logging function for the demo app.
 * @param {string} msg Message to log.
 */
app.log = function(msg) {
  if (window.console) {
    // window.console.log('[app] ' + msg);
  }
};


/**
 * Event handler for when a navigate click occurs.
 * @param {CustomEvent} evt The event.
 */
app.onClick = function(evt) {
  app.log('globalA--navigate click ' + evt.detail.url);
};


/**
 * Event handler for when a navigate history change occurs.
 * @param {CustomEvent} evt The event.
 */
app.onHistory = function(evt) {

  app.log('globalA--navigate history ' + evt.detail.url);
};


/**
 * Event handler for when navigate requests are going to be sent.
 * @param {CustomEvent} evt The event.
 */
app.onRequest = function(evt) {
  if (!app.ins) {
    app.ins =  new LoadingBar();
    app.ins.start();
  }
  app.log('globalA--navigate request ' + evt.detail.url);
  // If debug logging is enabled, reset the relative times when each new
  // request is sent.
  if (A.spf.debug) {
    A.spf.debug.reset();
  }
};


/**
 * Event handler for when parts of navigate responses are going to be processed.
 * @param {CustomEvent} evt The event.
 */
app.onPartProcess = function(evt) {
  app.log('globalA--navigate part process ' + evt.detail.url);
};


/**
 * Event handler for when parts of navigate responses are done being processed.
 * @param {CustomEvent} evt The event.
 */
app.onPartDone = function(evt) {
  app.log('globalA--navigate part done ' + evt.detail.url);
};


/**
 * Event handler for when navigate responses are going to be processed.
 * @param {CustomEvent} evt The event.
 */
app.onProcess = function(evt) {
  if(A.detach[A.gc.currentName]) A.detach[A.gc.currentName].apply(null);
  if(A.destroy[A.gc.currentName]) A.destroy[A.gc.currentName].apply(null);
  app.destroy(A.gc.currentName);
  A.gc.currentName = evt.detail.response.name;
  app.log('globalA--navigate process ' + evt.detail.url);
};


/**
 * Event handler for when navigate responses are done being processed.
 * @param {CustomEvent} evt The event.
 */
app.onDone = function(evt) {
  if (app.ins) {
    app.ins.finish()
    setTimeout(() => { app.ins.destroy(); app.ins = null; }, 100 )
  }
  if(A.init[A.gc.currentName]) A.init[A.gc.currentName].apply(null);
};


/**
 * Event handler for navigate errors.
 * @param {CustomEvent} evt The event.
 */
app.onError = function(evt) {
  if (app.ins) {
    app.ins.error()
      setTimeout(() => { app.ins.destroy(); app.ins = null; }, 1000 )
  }
  app.log('globalA--navigate error ' + evt.detail.url);
};


/**
 * Event handler for script before unload.
 * @param {CustomEvent} evt The event.
 */
app.onScriptBeforeUnload = function(evt) {
  var name = evt.detail.name;
  app.log('globalA--script before unload ' + name);
};


/**
 * Event handler for script unload.
 * @param {CustomEvent} evt The event.
 */
app.onScriptUnload = function(evt) {
  var name = evt.detail.name;
  var urls = evt.detail.urls;
  app.log('globalA--script unload ' + name + ' ' + urls);
};



/**
 * Event handler for style before unload.
 * @param {CustomEvent} evt The event.
 */
app.onStyleBeforeUnload = function(evt) {
  var name = evt.detail.name;
  app.log('globalA--style before unload ' + name);
};


/**
 * Event handler for style unload.
 * @param {CustomEvent} evt The event.
 */
app.onStyleUnload = function(evt) {
  var name = evt.detail.name;
  var urls = evt.detail.urls;
  app.log('globalA--style unload ' + name + ' ' + urls);
};

/**
 * [destroy entry]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
app.destroy = function(name) {
  A.spf.style.unload(name);
  // A.spf.script.unload(name);
};


/**
 * Whether SPF is enabled for the demo app.
 * @type {boolean}
  */
app.enabled = false;


/**
 * The timestamp of when the demo app started.
 * @type {number}
 * @private
 */
app.start_ = 0;


/**
 * The timer counting since last page load.
 * @type {number}
 * @private
 */
app.timer_ = 0;


A.app = app;

