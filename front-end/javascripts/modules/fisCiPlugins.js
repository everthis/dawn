import {$http} from '../common/ajax';
import Vue from 'vue';


export function fcp() {
    let App = {};
    
    App.cable = ActionCable.createConsumer();


    Vue.component('plugin-item', {
      props: ['plugin'],
      template: `
        <div class="plugin-wrap">
          
          <div class="per-row-plugin c-grid-row c-gap-top c-pad-left">
            <span class="c-grid-span15 package-name">{{ plugin.packageName }}</span>
            <span class="c-grid-span10 package-version">{{ plugin.packageVersion }}</span>
            <span class="c-grid-span15 package-ci-package-name">{{ plugin.ciPackageName }}</span>
            <span class="c-grid-span5 package-status">{{ plugin.status }}</span>
            <span class="c-grid-span5 package-log c-center"><svg class="icon icon-more" @click="toggleLog(plugin)"><use xlink:href="#icon-more"></use></svg></span>
          </div>
          
          <div class="package-log" v-if="plugin.showLogs">
            <div class="per-phase-log" v-for="(val, key) in plugin.log">
              <p class="package-log-head">{{ key }}</p>
              <pre class="package-log-pre" v-html='val.detail'></pre>
            </div>
          </div>

        </div>`,
      methods: {
        toggleLog: function(item) {
          if (!item.showLogs) {
            item.gc = App.cable.subscriptions.create({
                'channel': "CiPluginLogsChannel",
                'plugin_id': item.id
              }, {
                connected: function() {
                  this.perform('send_current_log', {
                    plugin_id: item.id
                  })
                },
                received: function(data) {
                  item.log = data;
                }
              });
          } else {
            item.gc.unsubscribe();
          }
          item.showLogs = !item.showLogs;
        },
        subscribe: function(id) {}
      }

    });



    let app = new Vue({
      el: '#app',
      data: {
        pluginsInput: gc,
        showLogs: false
      },

      computed: {

      },

    });

    // App.ci_plugin_logs = App.cable.subscriptions.create("CiPluginLogsChannel", {
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