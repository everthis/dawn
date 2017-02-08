require 'open3'
class CheckNpmExistenceInMirrorRegistryJob < ApplicationJob
  queue_as :check_npm_existence_in_mirror_registry

  after_perform do |job|
    id = job.arguments.first
    plugin = CiPackage.find(id)
    if plugin.ci_package_log.log['check_existence_of_published_package_in_mirror_registry']['status'] == 0
      puts "plugin #{id} has not been synced yet."
      self.class.set(wait: 5.seconds).perform_later(id)
    else
      puts "exists in mirror."
      GetLaravelSessionJob.perform_later(id)
    end
  end

  def perform(*args)
	id = args[0]
	plugin = CiPackage.find(id)
	# registry_url = "http://registry.npm.everthis.com/"
	registry_url = "https://registry.npm.taobao.org/"
	# registry_url = "https://registry.npm.taobao.org/"
	plugin.ci_package_log.log = {} if plugin.ci_package_log.log.nil?

	pluginName = "#{plugin.ciPackageNamePrefix}#{plugin.ciPackageName}"
	pluginVersion = "#{plugin.ciPackageVersion}"

	stdout, stderr, status = Open3.capture3("npm v #{pluginName}@#{pluginVersion} dist.tarball --registry=#{registry_url}")
	plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"] = {} if plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"].nil?
	if stdout.length > 0 && plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"]['status'] != 1
	  plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"]['detail'] = "#{stdout}"
	  plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"]['status'] = 1
	else
	  plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"]['detail'] = "#{stderr}"
	  plugin.ci_package_log.log["check_existence_of_published_package_in_mirror_registry"]['status'] = 0
	end
	plugin.ci_package_log.save!
  end
end
