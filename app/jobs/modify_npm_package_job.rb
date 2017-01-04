require 'uri'
require 'open3'
class ModifyNpmPackageJob < ApplicationJob
  queue_as :modify_npm_package

  after_perform do |job|
    id = job.arguments.first

  end

  def perform(*args)
    # Do something later
    id = args[0]
		plugin = FisCiPlugin.find(id)

		download_url = plugin['log']['phase1']['detail']

		default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

		ci_package_fullname = "#{plugin['ciPackageNamePrefix']}#{plugin['ciPackageName']}"

		uri = URI.parse(download_url.strip)

		full_name = File.basename(uri.path)
		file_name = File.basename(full_name, ".*")

		shell_commands = <<~HEREDOC
		  #!/usr/bin/env bash
		  cd #{default_tarball_download_dir}
		  mkdir -p #{file_name} && cd #{file_name}
			cp #{default_tarball_download_dir}/#{full_name} ./
			tar -zxf #{full_name}
			cd package
			jq '(if .bin | type == "string"  then (.bin = {(.name): .bin}) elif .bin | type == "object"  then . else . end)' package.json > tmp.json && mv tmp.json package.json
			jq --arg v #{ci_package_fullname} '.name = $v' package.json > tmp.json && mv tmp.json package.json
			jq 'if .bin | type == "object"  then .bin = (.bin | with_entries(.key |= "#{ci_package_fullname}_" + .)) else . end' package.json > tmp.json && mv tmp.json package.json
			diff_msg=`diff -y --suppress-common-lines package.json.bak package.json`
			echo "$diff_msg"
		HEREDOC

		stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)

		plugin.log["phase3"] = {} if plugin.log["phase3"].nil?
		if status.success?
			plugin.log['phase3']['detail'] = "#{stdout}"
			plugin.log['phase3']['status'] = 1
		else
			plugin.log['phase3']['detail'] = "#{stderr}"
			plugin.log['phase3']['status'] = 0
		end
		plugin.save!

  end
end
