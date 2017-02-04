# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class CiPackageLogsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "ci_package_#{params[:plugin_id].to_i}"
  end

  def receive(data)
    ActionCable.server.broadcast("ci_package_#{params[:plugin_id].to_i}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_current_log
    ActionCable.server.broadcast("ci_package_#{params[:plugin_id].to_i}", CiPackage.find(params[:plugin_id]).ci_package_log.log)
  end

  def follow(data)
    stop_all_streams
    stream_from "ci_package_:#{data['plugin_id'].to_i}"
  end

  def unfollow
    stop_all_streams
  end
end
