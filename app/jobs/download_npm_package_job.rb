require 'open3'
class DownloadNpmPackageJob < ApplicationJob
  queue_as :download_npm_package

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.log['phase2']['status'] == 1
      ModifyNpmPackageJob.perform_later(id)
    end
  end

  def perform(*args)
    # Do something later
    id = args[0]
   	plugin = FisCiPlugin.find(id)

   	download_url = plugin['log']['phase1']['detail']

   	default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

   	shell_commands = <<~HEREDOC
   	  #!/usr/bin/env bash
   	  cd #{default_tarball_download_dir}
   	  curl --fail --show-error -L -O #{download_url.strip}
   	HEREDOC

   	stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)

   	plugin.log["phase2"] = {} if plugin.log["phase2"].nil?
   	if status.success?
   		plugin.log['phase2']['detail'] = "#{stderr}"
   		plugin.log['phase2']['status'] = 1
   	else
   		plugin.log['phase2']['detail'] = "#{stderr}"
   		plugin.log['phase2']['status'] = 0
   	end
   	plugin.save!

  end
end
