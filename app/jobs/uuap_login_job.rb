require 'open3'
class UuapLoginJob < ApplicationJob
  queue_as :uuap_login

  after_perform do |job|
    id = job.arguments.first
    plugin = CiPlugin.find(id)
    if plugin.ci_plugin_log.log['uuap_login']['status'] == 1
      GetLaravelSessionJob.perform_later(id)
    end
  end

  def perform(*args)
		
		id = args[0]
		plugin = CiPlugin.find(id)
	  plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?

	  script_path = "~/idev-projects/uuap-auto-login"

		stdout, stderr, status = Open3.capture3("sh #{script_path}/uuap-cookie.sh -e #{script_path}/.uuap.conf | grep usrname #{script_path}/.uuap_cookie")

		plugin.ci_plugin_log.log["uuap_login"] = {} if plugin.ci_plugin_log.log["uuap_login"].nil?
		if stdout.length > 0 && stderr.length == 0 && status.success?
		  plugin.ci_plugin_log.log["uuap_login"]['detail'] = "#{stdout}"
		  plugin.ci_plugin_log.log["uuap_login"]['status'] = 1
		else
		  plugin.ci_plugin_log.log["uuap_login"]['detail'] = "#{stderr}"
		  plugin.ci_plugin_log.log["uuap_login"]['status'] = 0
		end
		plugin.ci_plugin_log.save!

  end
end
