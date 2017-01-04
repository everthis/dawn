require 'open3'
class CheckNpmPackageExistenceJob < ApplicationJob
  queue_as :check_npm_package_existence

  after_perform do |job|
    # UserMailer.notify_video_processed(job.arguments.first)
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.log['phase1']['status'] == 1
      DownloadNpmPackageJob.perform_later(id)
    end
  end

  
  def perform(*args)
  	id = args[0]
  	plugin = FisCiPlugin.find(id)
    plugin.log = {} if plugin.log.nil?
    stdout, stderr, status = Open3.capture3("npm v #{plugin.input} dist.tarball")
    plugin.log["phase1"] = {} if plugin.log["phase1"].nil?
    if stdout.length > 0
      plugin.log["phase1"]['detail'] = "#{stdout}"
      plugin.log["phase1"]['status'] = 1
    elsif stderr.length > 0
      plugin.log["phase1"]['detail'] = "#{stderr}"
      plugin.log["phase1"]['status'] = 0
    else
      plugin.log["phase1"]['detail'] = "#{stderr}"
      plugin.log["phase1"]['status'] = 0
    end
    plugin.save!

  end
end
