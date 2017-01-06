require 'open3'
class CheckNpmPackageExistenceJob < ApplicationJob
  queue_as :check_npm_package_existence

  after_perform do |job|
    # UserMailer.notify_video_processed(job.arguments.first)
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.ci_plugin_log.log['check_npm_package_existence_in_registry']['status'] == 1
      DownloadNpmPackageJob.perform_later(id)
    end
  end

  
  def perform(*args)
  	id = args[0]
  	plugin = FisCiPlugin.find(id)
    plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?
    stdout, stderr, status = Open3.capture3("npm v #{plugin.input} dist.tarball")
    plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"] = {} if plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"].nil?
    if stdout.length > 0
      plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"]['detail'] = "#{stdout}"
      plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"]['status'] = 1
    elsif stderr.length > 0
      plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"]['detail'] = "#{stderr}"
      plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"]['status'] = 0
    else
      plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"]['detail'] = "#{stderr}"
      plugin.ci_plugin_log.log["check_npm_package_existence_in_registry"]['status'] = 0
    end
    plugin.ci_plugin_log.save!

  end
end
