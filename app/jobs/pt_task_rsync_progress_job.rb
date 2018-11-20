class PtTaskRsyncProgressJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    pt_task_log = PtTask.find_by(transmission_hash: hash).pt_task_log
    pt_task_log.detail['rsync'] = {} if pt_task_log.detail['rsync'].nil?

    if pt_task_log.detail['rsync']['progress'].nil?
      self.class.set(wait: 5.seconds).perform_later(hash)
    else
      if pt_task_log.detail['rsync']['progress'] < 100
        self.class.set(wait: 5.seconds).perform_later(hash)
      else
        PtTaskUploadJob.perform_later(hash)
      end
    end
  end

  def perform(*args)
    # Do something later
  end
end
