class PtTaskStatusChannel < ApplicationCable::Channel

  def subscribed
    stream_from "pt_task_status_#{params[:hash]}"
  end

  def receive(data)
    ActionCable.server.broadcast("pt_task_status_#{params[:hash]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_current_status
    ActionCable.server.broadcast("pt_task_status_#{params[:hash]}", pt_task_status:  PtTask.find_by(transmission_hash: params[:hash]).status)
  end

end
