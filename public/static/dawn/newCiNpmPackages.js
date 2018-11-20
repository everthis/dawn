/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/dawn/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 160);
/******/ })
/************************************************************************/
/******/ ({

/***/ 132:
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./app/javascript/packs/modules/newCiNpmPackages.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initNewCiNpmPackages = initNewCiNpmPackages;
exports.exitNewCiNpmPackages = exitNewCiNpmPackages;
var vueApp = void 0;
Vue.component('new-packages', {
  props: ['textareaInput'],
  data: function data() {
    return {
      pluginsInput: undefined,
      canSubmit: true,
      processed: 0,
      initPatchCiPackageVersion: 0,
      processedPluginsInputData: null
    };
  },
  template: '\n    <div class="new-plugins-wrap">\n      <div class="c-grid-row">\n\n        <div class="pluginsInput c-grid-span10">\n          <div class="hint">format: packageName@version</div>\n          <textarea class="plugins-input-area" name="textarea" rows="16" placeholder="\u6DFB\u52A0plugins" v-model="pluginsInput"></textarea>\n        </div>\n\n        <div class="plugins c-grid-span38">\n          <div class="plugins-wrap">\n            <div class="plugins-hread c-grid-row">\n              <div class="c-grid-span10">packageName</div>\n              <div class="c-grid-span6">version</div>\n              <div class="c-grid-span14">CI-packageName</div>\n              <div class="c-grid-span8">CI-packageVersion</div>\n              <div class="c-grid-span10">CI-packageVersionPatch</div>\n            </div>\n\n            <div class="per-row-plugin c-grid-row c-gap-top" v-for="(item, idx) in processedPluginsInputData">\n              <span class="c-grid-span10 package-name">{{ item.packageName }}</span>\n              <span class="c-grid-span6 package-version">{{ item.packageVersion }}</span>\n              <span class="c-grid-span14 package-ci-package-name">{{ item.ciPackageName }}</span>\n              <span class="c-grid-span8 package-ci-package-version">{{ item.ciPackageVersion }}</span>\n              <span class="c-grid-span10 package-ci-package-version-patch" v-if="item.ciPackageVersion">\n                <span class="minus-patch" @click="minusPatchVersion(item, idx)">-</span>\n                <span class="patch-version">{{ item.ciPackageVersionPatch }}</span>\n                <span class="plus-patch" @click="plusPatchVersion(item, idx)">+</span>\n              </span>\n            </div>\n\n            <div class="c-hide" v-if="processedPluginsInput">{{ processedPluginsInput }}</div>\n\n          </div>\n        </div>\n\n      </div>\n\n      <div class="submit-row c-center c-gap-top c-gap-bottom">\n        <div class="c-btn" @click="submit">Install on BuildCloud compile machines</div>\n      </div>\n    </div>',
  computed: {
    processedPluginsInput: {
      get: function get() {
        var arr = [];
        var val;
        var splitArr = [];
        this.processed += 1;
        if (!this.pluginsInput) {
          this.processedPluginsInputData = arr;
          return arr;
        }
        var lines = this.pluginsInput.split('\n');
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].trim().length > 0) {
            val = lines[i].trim().replace(/^\"|^\'|\'$|\"$/g, '');
            splitArr = val.split('@');
            arr.push({
              input: val,
              packageName: splitArr[0],
              packageVersion: splitArr[1] || '',
              ciPackageName: splitArr[1] ? '' + splitArr[0] + '_' + splitArr[1].split('.').join('_') : '',
              ciPackageVersion: splitArr[1] || '',
              ciPackageVersionPatch: 0,
              ciPackageNamePrefix: 'fis-msprd-'
            });
          }
        }
        this.processedPluginsInputData = arr;
        return arr;
      },
      set: function set() {}

    }
  },
  methods: {
    submit: function submit() {
      this.canSubmit = true;
      var that = this;
      var submitForm = document.getElementsByClassName('fis-ci-plgins-form')[0];
      var submitEle = document.getElementsByClassName('fis-ci-plgins-form-submit-btn')[0];
      var pluginInputEle = document.getElementsByClassName('plugin-input')[0];
      var tmpFormEle;
      var fd, fa;
      if (that.processedPluginsInput.length === 0) {
        alert('0');return;
      }
      if (!that.checkValidation(that.processedPluginsInput)) {
        alert("包名不能以fis开头\n必须带正确的版本号\n版本号不能带有‘＝’,‘～’,‘<’,'<=','>','>=','^'等标记。");return;
      }
      that.processedPluginsInput.forEach(function (element, index) {
        for (var el in element) {
          if (element.hasOwnProperty(el)) {
            tmpFormEle = that.createFormEle('ci_packages[][' + el + ']', element[el]);
            submitForm.appendChild(tmpFormEle);
          }
        }
      });
      if (that.canSubmit) {
        fd = new FormData(submitForm);
        fa = submitForm.action;
        window.A.spf.load(fa, {
          method: 'POST',
          postData: fd,
          onProcess: function onProcess(evt) {},
          onDone: function onDone(evt) {
            if (evt.response.status && evt.response.status === 'success') {
              if (evt.response.url) A.spf.navigate(evt.response.url);
            }
          }
        });
      }
    },
    checkValidation: function checkValidation(arr) {
      var that = this;
      var str = JSON.stringify(arr);
      var objArr = JSON.parse(str);
      var ele;
      var re = /[^A-Za-z0-9@\.\-_]/g;
      for (var i = 0, length1 = objArr.length; i < length1; i++) {
        ele = objArr[i];

        if (ele.hasOwnProperty('input')) {
          if (ele.input.indexOf('fis') === 0 || ele.input.split('@').length === 1 || ele.input.indexOf('@') === ele.input.length - 1) {
            that.canSubmit = false;
          }
          if (re.exec(ele.input)) {
            that.canSubmit = false;
          }
        }
      }

      return that.canSubmit;
    },
    createFormEle: function createFormEle(name, value) {
      var inputEle = document.createElement('input');
      inputEle.setAttribute('name', name);
      inputEle.value = value;
      return inputEle;
    },
    getPatchCiPackageVersion: function getPatchCiPackageVersion(item) {
      var version = item.packageVersion;
      var verArr = version.split('-');
      var verArrLen = void 0;
      var secPartArr = void 0;
      var firstPartArr = void 0;
      if (verArr.length === 1) {
        firstPartArr = version.split('.');
        verArrLen = firstPartArr.length;
        if (verArrLen === 2) firstPartArr[2] = 0;
        if (verArrLen === 1) {
          firstPartArr[1] = 0;firstPartArr[2] = 0;
        }
        verArrLen = firstPartArr.length;
        firstPartArr[verArrLen - 1] = +firstPartArr[verArrLen - 1] + item.ciPackageVersionPatch;
        item.ciPackageVersion = firstPartArr.join('.');
        return;
      }
      if (verArr.length === 2) {
        secPartArr = verArr[1].split('.');
        if (secPartArr.length === 1) {
          verArr[1] = verArr[1] + '.' + item.ciPackageVersionPatch;
          item.ciPackageVersion = verArr.join('-');
        } else {
          secPartArr[1] = +secPartArr[1] + item.ciPackageVersionPatch;
          verArr[1] = secPartArr.join('.');
          item.ciPackageVersion = verArr.join('-');
        }
      }
    },
    minusPatchVersion: function minusPatchVersion(item, idx) {
      item.ciPackageVersionPatch = item.ciPackageVersionPatch === 0 ? 0 : item.ciPackageVersionPatch - 1;
      this.getPatchCiPackageVersion(item);
    },
    plusPatchVersion: function plusPatchVersion(item, idx) {
      item.ciPackageVersionPatch = item.ciPackageVersionPatch === 5 ? 5 : item.ciPackageVersionPatch + 1;
      this.getPatchCiPackageVersion(item);
    }

  }

});
function initNewCiNpmPackages() {
  vueApp = new Vue({
    el: '#app'
  });
}

function exitNewCiNpmPackages() {
  if (vueApp) vueApp.$destroy();
}

/***/ }),

/***/ 160:
/* no static exports found */
/* all exports used */
/*!**********************************************************!*\
  !*** ./app/javascript/packs/entries/newCiNpmPackages.js ***!
  \**********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _newCiNpmPackages = __webpack_require__(/*! ../modules/newCiNpmPackages */ 132);

(function () {
  A.init[A.gc.currentName] = _newCiNpmPackages.initNewCiNpmPackages;
  A.destroy[A.gc.currentName] = _newCiNpmPackages.exitNewCiNpmPackages;
})();

/***/ })

/******/ });
//# sourceMappingURL=newCiNpmPackages.js.map