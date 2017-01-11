# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class CiPluginLogsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ci_plugin_#{params[:plugin_id].to_i}"
  end

  def receive(data)
    ActionCable.server.broadcast("ci_plugin_#{params[:plugin_id].to_i}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_current_log
    ActionCable.server.broadcast("ci_plugin_#{params[:plugin_id].to_i}", CiPlugin.find(params[:plugin_id]).ci_plugin_log.log)
  end

  def follow(data)
    stop_all_streams
    stream_from "ci_plugin_:#{data['plugin_id'].to_i}"
  end

  def unfollow
    stop_all_streams
  end
end
