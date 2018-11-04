class PtTaskLogChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "pt_task_log_#{params[:hash]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast("pt_task_log_#{params[:hash]}", data)
  end

  def send_current_log
    ActionCable.server.broadcast("pt_task_log_#{params[:hash]}", PtTask.find_by(transmission_hash: params[:hash]).pt_task_log)
  end
end
