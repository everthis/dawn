class PtTaskNotifyJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    PtTaskRemoveTorrentAfterUploadJob.perform_later(hash)

  end

  def perform(*args)
    hash = args[0]
    UserMailer.pt_task_notify(hash).deliver_later
  end
end
