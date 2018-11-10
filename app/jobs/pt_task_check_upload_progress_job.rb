class PtTaskCheckUploadProgressJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    pt_task = PtTask.find_by(transmission_hash: hash)
    pt_task.pt_task_log.detail['upload'] = {} if  pt_task.pt_task_log.detail['upload'].nil?
    if pt_task.pt_task_log.detail['upload']['progress'].nil?
      self.class.set(wait: 5.seconds).perform_later(hash)
    else
      if pt_task.pt_task_log.detail['upload']['progress'] < 100
        self.class.set(wait: 5.seconds).perform_later(hash)
      else
        PtTaskNotifyJob.perform_later(hash)
      end
    end

  end


  def perform(*args)
    hash = args[0]
  end
end
