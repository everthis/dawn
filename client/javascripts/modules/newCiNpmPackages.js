import Vue from 'vue';

Vue.component('new-plugins', {
  props: ['textareaInput'],
  data: function() {
    return {
      pluginsInput: undefined,
      canSubmit: true,
      processed: 0,
      initPatchCiPackageVersion: 0,
      processedPluginsInputData: null
    }
  },
  template: `
    <div class="new-plugins-wrap">
      <div class="c-grid-row">

        <div class="pluginsInput c-grid-span10">
          <div class="hint">format: packageName@version</div>
          <textarea class="plugins-input-area" name="textarea" rows="16" placeholder="添加plugins" v-model="pluginsInput"></textarea>
        </div>

        <div class="plugins c-grid-span38">
          <div class="plugins-wrap">
            <div class="plugins-hread c-grid-row">
              <div class="c-grid-span10">packageName</div>
              <div class="c-grid-span6">version</div>
              <div class="c-grid-span14">CI-packageName</div>
              <div class="c-grid-span8">CI-packageVersion</div>
              <div class="c-grid-span10">CI-packageVersionPatch</div>
            </div>

            <div class="per-row-plugin c-grid-row c-gap-top" v-for="(item, idx) in processedPluginsInputData">
              <span class="c-grid-span10 package-name">{{ item.packageName }}</span>
              <span class="c-grid-span6 package-version">{{ item.packageVersion }}</span>
              <span class="c-grid-span14 package-ci-package-name">{{ item.ciPackageName }}</span>
              <span class="c-grid-span8 package-ci-package-version">{{ item.ciPackageVersion }}</span>
              <span class="c-grid-span10 package-ci-package-version-patch" v-if="item.ciPackageVersion">
                <span class="minus-patch" @click="minusPatchVersion(item, idx)">-</span>
                <span class="patch-version">{{ item.ciPackageVersionPatch }}</span>
                <span class="plus-patch" @click="plusPatchVersion(item, idx)">+</span>
              </span>
            </div>

            <div class="c-hide" v-if="processedPluginsInput">{{ processedPluginsInput }}</div>

          </div>
        </div>

      </div>

      <div class="submit-row c-center c-gap-top c-gap-bottom">
        <div class="c-btn" @click="submit">Install on BuildCloud compile machines</div>
      </div>
    </div>`,
  computed: {
      processedPluginsInput: {
        get: function() {
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
                ciPackageName: splitArr[1] ? ( '' + splitArr[0] + '_' + splitArr[1].split('.').join('_') ) : '',
                ciPackageVersion: splitArr[1] || '',
                ciPackageVersionPatch: 0,
                ciPackageNamePrefix: 'fis-msprd-'
              })
            }
          }
          this.processedPluginsInputData = arr;
          return arr;
        },
        set: function() {
        }

      },
  },
  methods: {
    submit: function() {
      this.canSubmit = true;
      var that = this;
      var submitForm = document.getElementsByClassName('fis-ci-plgins-form')[0];
      var submitEle = document.getElementsByClassName('fis-ci-plgins-form-submit-btn')[0];
      var pluginInputEle = document.getElementsByClassName('plugin-input')[0];
      var tmpFormEle;
      if (that.processedPluginsInput.length === 0) {alert('0'); return;}
      if (!that.checkValidation(that.processedPluginsInput)) {alert("包名不能以fis开头\n必须带正确的版本号\n版本号不能带有‘＝’,‘～’,‘<’,'<=','>','>=','^'等标记。"); return;}
      that.processedPluginsInput.forEach(function(element, index) {
        for (var el in element) {
          if (element.hasOwnProperty(el)) {
            tmpFormEle = that.createFormEle('ci_packages[][' + el + ']', element[el]);
            submitForm.appendChild(tmpFormEle);
          }
        }
      });
      if (that.canSubmit) {
        submitEle.click();
      }
    },
    checkValidation: function(arr) {
      var that = this;
      var str = JSON.stringify(arr);
      var objArr = JSON.parse(str);
      var ele;
      var re = /[^A-Za-z0-9@\.\-_]/g;
      console.log(objArr);
      for(var i = 0, length1 = objArr.length; i < length1; i++){
        ele = objArr[i];

        if (ele.hasOwnProperty('input')) {

          if (ele.input.indexOf('fis') === 0 || ele.input.split('@').length === 1 || ele.input.indexOf('@') === ele.input.length - 1 ) {
            that.canSubmit = false;
          }
          console.log(ele.input);
          if(re.exec(ele.input)) {
            that.canSubmit = false;
          }
        }
      }


      return that.canSubmit;
    },
    createFormEle: function(name, value) {
      var inputEle = document.createElement("input");
      inputEle.setAttribute('name', name);
      inputEle.value = value;
      return inputEle;
    },
    getPatchCiPackageVersion: function(item) {
      let version = item.packageVersion;
      let verArr = version.split('-');
      let verArrLen;
      let secPartArr;
      let firstPartArr;
      if (verArr.length === 1) {
        firstPartArr = version.split('.');
        verArrLen = firstPartArr.length;
        if (verArrLen === 2) firstPartArr[2] = 0;
        if (verArrLen === 1) {firstPartArr[1] = 0; firstPartArr[2] = 0;}
        verArrLen = firstPartArr.length;
        firstPartArr[verArrLen - 1] = +firstPartArr[verArrLen - 1] + item.ciPackageVersionPatch;
        item.ciPackageVersion = firstPartArr.join('.');
        return;
      }
      if (verArr.length === 2) {
        secPartArr = verArr[1].split('.');
        if (secPartArr.length === 1) {
          verArr[1] = verArr[1] + '.' +  item.ciPackageVersionPatch;
          item.ciPackageVersion = verArr.join('-');
          return;
        } else {
          secPartArr[1] = +secPartArr[1] + item.ciPackageVersionPatch;
          verArr[1] = secPartArr.join('.');
          item.ciPackageVersion = verArr.join('-');
          return;
        }

      }
    },
    minusPatchVersion: function(item, idx) {
      item.ciPackageVersionPatch = item.ciPackageVersionPatch === 0 ? 0 : (item.ciPackageVersionPatch - 1);
      this.getPatchCiPackageVersion(item);
    },
    plusPatchVersion: function(item, idx) {
      item.ciPackageVersionPatch = item.ciPackageVersionPatch === 5 ? 5 : (item.ciPackageVersionPatch + 1);
      this.getPatchCiPackageVersion(item);
    }

  }

});
export function initNewCiNpmPackages() {
  let app = new Vue({
    el: '#app'
  });
}
