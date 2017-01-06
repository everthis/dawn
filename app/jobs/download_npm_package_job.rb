require 'open3'
class DownloadNpmPackageJob < ApplicationJob
  queue_as :download_npm_package

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.ci_plugin_log.log['download_npm_package']['status'] == 1
      ModifyNpmPackageJob.perform_later(id)
    end
  end

  def perform(*args)
    # Do something later
    id = args[0]
   	plugin = FisCiPlugin.find(id)

   	download_url = plugin.ci_plugin_log.log['check_npm_package_existence_in_registry']['detail']

   	default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

   	shell_commands = <<~HEREDOC
   	  #!/usr/bin/env bash
   	  cd #{default_tarball_download_dir}
   	  curl --fail --show-error -L -O #{download_url.strip}
   	HEREDOC
    
    plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?
   	stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)

   	plugin.ci_plugin_log.log["download_npm_package"] = {} if plugin.ci_plugin_log.log["download_npm_package"].nil?
   	if status.success?
   		plugin.ci_plugin_log.log['download_npm_package']['detail'] = "#{stderr}"
   		plugin.ci_plugin_log.log['download_npm_package']['status'] = 1
   	else
   		plugin.ci_plugin_log.log['download_npm_package']['detail'] = "#{stderr}"
   		plugin.ci_plugin_log.log['download_npm_package']['status'] = 0
   	end
   	plugin.ci_plugin_log.save!

  end
end
