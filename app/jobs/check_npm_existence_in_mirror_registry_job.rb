require 'open3'
class CheckNpmExistenceInMirrorRegistryJob < ApplicationJob
  queue_as :check_npm_existence_in_mirror_registry

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.ci_plugin_log.log['check_existence_of_published_package_in_mirror_registry']['status'] == 0
      self.class.set(wait: 5.seconds).perform_later(id)
    else
      puts "exists in mirror."
    end
  end

  def perform(*args)
	id = args[0]
	plugin = FisCiPlugin.find(id)
	registry_url = "http://registry.npm.baidu.com/"
	plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?
	stdout, stderr, status = Open3.capture3("npm v #{plugin.input} dist.tarball --registry=#{registry_url}")
	plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"] = {} if plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"].nil?
	if stdout.length > 0 && plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"]['status'] != 1
	  plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"]['detail'] = "#{stdout}"
	  plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"]['status'] = 1
	else
	  plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"]['detail'] = "#{stderr}"
	  plugin.ci_plugin_log.log["check_existence_of_published_package_in_mirror_registry"]['status'] = 0
	end
	plugin.ci_plugin_log.save!
  end
end
