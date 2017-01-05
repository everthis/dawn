import {$http} from '../common/ajax';
import Vue from 'vue';

function test() {
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
          item.showLogs = !item.showLogs;
        },
        subscribe: function(id) {}
      }
    });
}
export function fcp() {
    test();
    let App = {};

    
    App.cable = ActionCable.createConsumer();

    App.ci_plugin_logs = App.cable.subscriptions.create("CiPluginLogsChannel", {
      connected: function() {
        // Called when the subscription is ready for use on the server
      },

      disconnected: function() {
        // Called when the subscription has been terminated by the server
      },

      received: function(data) {
        // Called when there's incoming data on the websocket for this channel
      }
    });

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