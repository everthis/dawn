class PtTaskLog < ApplicationRecord
  belongs_to :pt_task

  after_update_commit :broadcast_log, :update_status

  def broadcast_log
    puts
    ActionCable.server.broadcast("pt_task_log_#{self.pt_task.transmission_hash}", self)
  end

  def update_status

    if self.detail['upload'] && self.detail['upload']['progress'] == 100
      def_status = 'success'
      PtTask.find(self.pt_task_id).update_attribute(:status, def_status)
      ActionCable.server.broadcast("pt_task_status_#{self.pt_task.transmission_hash}", task_status: def_status)
    end

  end
end
