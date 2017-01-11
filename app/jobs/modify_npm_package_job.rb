require 'uri'
require 'open3'
class ModifyNpmPackageJob < ApplicationJob
  queue_as :modify_npm_package

  after_perform do |job|
    id = job.arguments.first
    plugin = CiPlugin.find(id)
    if plugin.ci_plugin_log.log['modify_npm_package']['status'] == 1
      ReportNpmPackageBinJob.perform_later(id)
    end
  end

  def perform(*args)
    # Do something later
    id = args[0]
		plugin = CiPlugin.find(id)

		download_url = plugin.ci_plugin_log.log['check_npm_package_existence_in_registry']['detail']

		default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

		ci_package_fullname = "#{plugin['ciPackageNamePrefix']}#{plugin['ciPackageName']}"
    ci_package_version = "#{plugin['ciPackageVersion']}"
		uri = URI.parse(download_url.strip)

		full_name = File.basename(uri.path)
		file_name = File.basename(full_name, ".*")

		shell_commands = <<~HEREDOC
		  #!/usr/bin/env bash
		  cd #{default_tarball_download_dir}
		  mkdir -p #{file_name} && cd #{file_name}
			cp #{default_tarball_download_dir}/#{full_name} ./
			tar --warning=no-unknown-keyword -zxf #{full_name}
			cd package
			cp package.json package.json.bak
			jq --arg v #{ci_package_fullname} --arg civersion #{ci_package_version} '(if .bin | type == "string"  then (.bin = {(.name): .bin}) elif .bin | type == "object"  then . else . end) | (.version = $civersion) | (.name = $v) | (if .bin | type == "object"  then .bin = (.bin | with_entries(.key |= "#{ci_package_fullname}-" + .)) else . end) | (del (.scripts.prepublish) | del (.scripts.publish) | del(.scripts.postpublish))' package.json > tmp.json && mv tmp.json package.json
			diff_msg=`diff -y --suppress-common-lines package.json.bak package.json`
			rm ./package.json.bak
			echo "$diff_msg"
		HEREDOC

		stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)

		plugin.ci_plugin_log.log["modify_npm_package"] = {} if plugin.ci_plugin_log.log["modify_npm_package"].nil?
		if stderr.length == 0 && status.success?
			plugin.ci_plugin_log.log['modify_npm_package']['detail'] = "#{stdout}"
			plugin.ci_plugin_log.log['modify_npm_package']['status'] = 1
		else
			plugin.ci_plugin_log.log['modify_npm_package']['detail'] = "#{stderr}"
			plugin.ci_plugin_log.log['modify_npm_package']['status'] = 0
		end
		plugin.ci_plugin_log.save!

  end
end
