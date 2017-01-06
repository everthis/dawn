import {$http} from '../common/ajax';
import Vue from 'vue';


export function fcp() {
    let App = {};
    
    App.cable = ActionCable.createConsumer();

    let callback = {
        success: function() {},
        error: function() {}
    };
    let app = new Vue({
      el: '#app',
      data: {
        pluginsInput: gc,
        showLogs: false
      },
      computed: {

      },
      methods: {
        toggleLog: function(item) {
          console.log(item.id);
          if (!item.showLogs) {
            item.gc = App.cable.subscriptions.create({
                'channel': "CiPluginLogsChannel",
                'plugin_id': item.id
              }, {
                connected: function() {
                  console.log('connected');
                  this.perform('send_current_log', {
                    plugin_id: item.id
                  })
                  // let payload = {plugin_id: item.id};
                  // $http(window.location.origin + '/get_ci_plugin_current_log')
                  // .get(payload)
                  // .then(callback.success)
                  // .catch(callback.error);
                },
                received: function(data) {
                  console.log(data);
                  item.log = data;
                }
              });
            console.log(item.gc);
          } else {
            item.gc.unsubscribe();
          }
          item.showLogs = !item.showLogs;
        },
        subscribe: function(id) {}
      }
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