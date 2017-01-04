# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class CiPluginLogsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ci_plugin_logs_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
