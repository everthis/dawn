# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class CiPackageStatusChannel < ApplicationCable::Channel

  def subscribed
    stream_from "ci_package_status_#{params[:plugin_id].to_i}"
  end

  def receive(data)
    ActionCable.server.broadcast("ci_package_status_#{params[:plugin_id].to_i}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_current_status
    ActionCable.server.broadcast("ci_package_status_#{params[:plugin_id].to_i}", plugin_status: CiPackage.find(params[:plugin_id]).status)
  end

end
