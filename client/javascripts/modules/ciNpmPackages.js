import {$http} from '../common/ajax';
import {disableScroll, enableScroll} from '../common/toggleScroll';
import Vue from 'vue';
import {insertAfter, strToDom, debounce} from '../common/utilities';

let vueApp;
let App;
let payload = {};
let callback = {
  apiQuerySuccess: function(data) {
    let searchList = document.getElementsByClassName('api-search-result')[0];
    let dataObj = JSON.parse(data);
    let contentStr = '';
    let headStr = `
    <div class="result-head">
      <span class="per-result-column per-result-input">input</span>
      <span class="per-result-column per-result-packageVersion">packageVersion</span>
      <span class="per-result-column per-result-ciPackageName">ciPackageName</span>
      <span class="per-result-column per-result-ciPackageVersion">ciPackageVersion</span>
      <span class="per-result-column per-result-status">status</span>
    </div>
    `;
    contentStr += headStr;
    contentStr += '<div class="result-body">';
    for (let i = 0, Len = dataObj.length; i < Len; i++) {
      contentStr += `<div class='per-search-result'>
        <span class="per-result-column per-result-input">${dataObj[i].input}</span>
        <span class="per-result-column per-result-packageVersion">${dataObj[i].packageVersion}</span>
        <span class="per-result-column per-result-ciPackageName">${dataObj[i].ciPackageName}</span>
        <span class="per-result-column per-result-ciPackageVersion">${dataObj[i].ciPackageVersion}</span>
        <span class="per-result-column per-result-status">${dataObj[i].status}</span>
      </div>`;
    }
    contentStr += '</div>';
    searchList.innerHTML = contentStr;
    dataObj.length > 0 ? searchList.classList.remove('hide') : searchList.classList.add('hide');
  }
};

let debouncedApiQueryInput = debounce(apiQuery, 100, false);
function listenApiQuery() {
  let apiQueryInput = document.getElementsByClassName('search-input')[0];
  let inWrapper = false;
  apiQueryInput.addEventListener('keyup', debouncedApiQueryInput);
  apiQueryInput.parentElement.addEventListener('mouseleave', function(ev) {
    if (!checkIfFocus.apply(apiQueryInput, ev)) {
      clearSearchResult();
    };
    inWrapper = false;
  });
  apiQueryInput.parentElement.addEventListener('mouseenter', function(ev) {
    inWrapper = true;
    disableScroll();
  });
  apiQueryInput.addEventListener('blur', function(ev) {
    if (!inWrapper) clearSearchResult();
  });
  apiQueryInput.addEventListener('focus', apiQuery);
}
function checkIfFocus(ev) {
  return this === document.activeElement;
}
function apiQuery(ev) {
  if (ev.target.value.length <= 0) {
    clearSearchResult();
    return;
  }
  payload = {q: ev.target.value};
  $http(window.location.origin + '/plugins_instantsearch')
  .get(payload)
  .then(callback.apiQuerySuccess.bind(ev))
  .catch(callback.error);
}
function clearSearchResult() {
  let apiSearchResultEle = document.getElementsByClassName('api-search-result')[0];
  apiSearchResultEle.innerHTML = '';
  apiSearchResultEle.classList.add('hide');
  enableScroll();
}

Vue.component('packages', {
  data: function() {
    return {
      pluginsInput: gc,
      showLogs: false
    };
  },
  template: `
    <div class="plugins-wrap">
      <div class="plugin-wrap" v-for="(perplugin,index) in pluginsInput">

        <div class="per-row-plugin c-grid-row c-gap-top c-pad-left">
          <span class="c-grid-span10 package-name">{{ perplugin.packageName }}</span>
          <span class="c-grid-span6 package-version">{{ perplugin.packageVersion }}</span>
          <span class="c-grid-span10 package-ci-package-name">{{ perplugin.ciPackageName }}</span>
          <div class="c-grid-span6">{{ perplugin.ciPackageVersion }}</div>
          <div class="c-grid-span8">{{ perplugin.ciPackageVersionPatch }}</div>
          <span class="c-grid-span5 package-status">{{ perplugin.status }}</span>
          <span class="c-grid-span3 package-log c-center"><svg class="icon icon-more" @click="toggleLog(perplugin)"><use xlink:href="#icon-more"></use></svg></span>
        </div>

        <div class="package-log" v-if="perplugin.showLogs">
          <div class="loading-placeholder c-center c-pad-top" v-if="!perplugin.log">processing</div>
          <div class="per-phase-log" v-for="(val, key) in perplugin.log">
            <p class="package-log-head">{{ key }}</p>
            <pre class="package-log-pre" v-html='val.detail'></pre>
          </div>
        </div>

      </div>
    </div>`,
  methods: {
    toggleLog: function(item) {
      if (!item.showLogs) {
        item.gc = App.cable.subscriptions.create({
            'channel': "CiPackageLogsChannel",
            'plugin_id': item.id
          }, {
            connected: function() {
              this.perform('send_current_log', {
                plugin_id: item.id
              });
            },
            received: function(data) {
              item.log = data;
              if (item.status === 'failed' || item.status === 'success') {
                item.gc.unsubscribe();
              }
            }
          });

      } else {
        if (item.status === 'failed' || item.status === 'success') {} else {
          item.gc.unsubscribe();
        }
      }
      item.showLogs = !item.showLogs;
    },
    subscribe: function(id) {}
  }

});

export function ciNpmPackages() {
    App = {};

    App.cable = ActionCable.createConsumer();

    vueApp = new Vue({
      el: '#app',
    });

    /* use ActionCable to update status of pending plugin */

    if (gc.length > 0) {
      for(let i = 0, length1 = gc.length; i < length1; i++){
        if (gc[i]['status'] !== 'failed' && gc[i]['status'] !== 'success') {
          gc[i]['gcp'] = App.cable.subscriptions.create({
            'channel': "CiPackageStatusChannel",
            'plugin_id': gc[i]['id']
          }, {
            connected: function() {
              this.perform('send_current_status', {
                plugin_id: gc[i]['id']
              });

            },
            received: function(data) {
              gc[i]['status'] = data.plugin_status;
              if (data.plugin_status === 'failed' || data.plugin_status === 'success') {
                gc[i]['gcp'].unsubscribe();
              }
            }
          });
        }
      }
    }

    listenApiQuery();


    // App.ci_package_logs = App.cable.subscriptions.create("CiPackageLogsChannel", {
    //   connected: function() {
    //     // Called when the subscription is ready for use on the server
    //     let that = this;
    //     that.perform('follow', {
    //       'plugin_id':
    //     })
    //   },

    //   disconnected: function() {
    //     // Called when the subscription has been terminated by the server
    //   },

    //   received: function(data) {
    //     // Called when there's incoming data on the websocket for this channel
    //     console.log(data);
    //   }
    // });

    // App.comments = App.cable.subscriptions.create("CommentsChannel", {
    //   collection: function() {
    //     return $("[data-channel='comments']");
    //   },
    //   connected: function() {
    //     console.log('connected');
    //     return setTimeout((function(_this) {
    //       return function() {
    //         _this.followCurrentMessage();
    //         return _this.installPageChangeCallback();
    //       };
    //     })(this), 1000);
    //   },
    //   received: function(data) {
    //     if (!this.userIsCurrentUser(data.comment)) {
    //       return this.collection().append(data.comment);
    //     }
    //   },
    //   userIsCurrentUser: function(comment) {
    //     return $(comment).attr('data-user-id') === $('meta[name=current-user]').attr('id');
    //   },
    //   followCurrentMessage: function() {
    //     var messageId;
    //     if (messageId = this.collection().data('message-id')) {
    //       return this.perform('follow', {
    //         message_id: messageId
    //       });
    //     } else {
    //       return this.perform('unfollow');
    //     }
    //   },
    //   installPageChangeCallback: function() {
    //     if (!this.installedPageChangeCallback) {
    //       this.installedPageChangeCallback = true;
    //       return $(document).on('turbolinks:load', function() {
    //         return App.comments.followCurrentMessage();
    //       });
    //     }
    //   }
    // });

}

export function exitCiNpmPackages() {
  if(vueApp) vueApp.$destroy();
  App.cable.disconnect();
}
