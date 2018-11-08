class PtTaskCheckConvertProgressJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    pt_task = PtTask.find_by(transmission_hash: hash)
    if pt_task.pt_task_log.detail['convert']['progress'] < 100
      self.class.set(wait: 5.seconds).perform_later(hash)
    else
      PtTaskUploadJob.perform_later(hash)
    end

  end


  def perform(*args)
    hash = args[0]
  end
end
