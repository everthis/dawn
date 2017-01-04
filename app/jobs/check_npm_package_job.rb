class CheckNpmPackageJob < ApplicationJob
  queue_as :check_npm_package

  after_perform do |job|
    UserMailer.notify_video_processed(job.arguments.first)
  end
  
  def perform(*args)
    # Do something later
  end
end
