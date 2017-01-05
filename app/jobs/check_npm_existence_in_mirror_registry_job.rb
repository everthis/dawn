require 'open3'
class CheckNpmExistenceInMirrorRegistryJob < ApplicationJob
  queue_as :check_npm_existence_in_mirror_registry

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.log['phase6']['status'] == 0
      self.class.set(wait: 5.seconds).perform_later(id)
    end
  end

  def perform(*args)
	id = args[0]
	plugin = FisCiPlugin.find(id)
	registry_url = "http://registry.npm.baidu.com/"
	plugin.log = {} if plugin.log.nil?
	stdout, stderr, status = Open3.capture3("npm v #{plugin.input} dist.tarball --registry=#{registry_url}")
	plugin.log["phase6"] = {} if plugin.log["phase6"].nil?
	if stdout.length > 0 && plugin.log["phase6"]['status'] != 1
	  plugin.log["phase6"]['detail'] = "#{stdout}"
	  plugin.log["phase6"]['status'] = 1
	else
	  plugin.log["phase6"]['detail'] = "#{stderr}"
	  plugin.log["phase6"]['status'] = 0
	end
	plugin.save!
  end
end
