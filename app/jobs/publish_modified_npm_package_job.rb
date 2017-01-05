require 'uri'
require 'open3'
require "net/http"
class PublishModifiedNpmPackageJob < ApplicationJob
  queue_as :publish_modified_npm_package

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
  	puts check_server("https://www.everthis.com")
    if plugin.log['phase5']['status'] == 1
      # CheckNpmExistenceInMirrorRegistryJob.perform_later(id)
    end
  end

  def perform(*args)
    id = args[0]
	plugin = FisCiPlugin.find(id)

	download_url = plugin['log']['phase1']['detail']


	default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

	uri = URI.parse(download_url.strip)

	full_name = File.basename(uri.path)
	file_name = File.basename(full_name, ".*")

	registry_url = "https://registry.npmjs.org/"

	shell_commands = <<~HEREDOC
		#!/usr/bin/env bash
        cd #{default_tarball_download_dir}/#{file_name}/package
		out_msg=`npm publish --registry=#{registry_url}`
		echo "$out_msg"
	HEREDOC

	stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)

	plugin.log["phase5"] = {} if plugin.log["phase5"].nil?
	if stderr.length == 0
		plugin.log['phase5']['detail'] = "#{stdout}"
		plugin.log['phase5']['status'] = 1
	else
		plugin.log['phase5']['detail'] = "#{stderr}"
		plugin.log['phase5']['status'] = 0
	end
	plugin.save!

  end

  def check_server(url_str)
  	uri = URI(url_str)
    begin
      http = Net::HTTP.start(uri.host, uri.port, {open_timeout: 5, read_timeout: 5})
      begin
        response = http.head("/")
        if response.code == "200"
          # everything fine
          0
        else
          # unexpected status code
          1
        end
      rescue Timeout::Error
        # timeout reading from server
        2
      end
    rescue Timeout::Error
      # timeout connecting to server
      3
    rescue SocketError
      # unknown server
      4
    end
  end

end
