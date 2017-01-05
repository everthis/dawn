require 'uri'
require 'open3'
class ReportNpmPackageBinJob < ApplicationJob
  queue_as :report_npm_package_bin

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.log['phase4']['status'] == 1
      PublishModifiedNpmPackageJob.perform_later(id)
    end
  end

  def perform(*args)
    # Do something later
    id = args[0]
	plugin = FisCiPlugin.find(id)
	download_url = plugin['log']['phase1']['detail']


	default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

	uri = URI.parse(download_url.strip)

	full_name = File.basename(uri.path)
	file_name = File.basename(full_name, ".*")

	shell_commands = <<~HEREDOC
		#!/usr/bin/env bash
        cd #{default_tarball_download_dir}/#{file_name}/package
		report_msg=`jq 'if .bin | type == "object" then .bin | keys else [] end' package.json`
		echo "$report_msg"
	HEREDOC
	stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)

	plugin.log["phase4"] = {} if plugin.log["phase4"].nil?
	bin_array = []
	if status.success?
		bin_array = JSON.parse(stdout)
	    plugin.update_npm_package_bin(bin_array)
		plugin.log['phase4']['detail'] = "#{stdout}"
		plugin.log['phase4']['status'] = 1
	else
		plugin.log['phase4']['detail'] = "#{stderr}"
		plugin.log['phase4']['status'] = 0
	end
	plugin.save!

  end
end
