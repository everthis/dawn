class GetLaravelSessionJob < ApplicationJob
  queue_as :get_laravel_session

  after_perform do |job|
    id = job.arguments.first
    plugin = FisCiPlugin.find(id)
    if plugin.ci_plugin_log.log['get_laravel_session_of_solar_system']['status'] == 1
      # GetLaravelSessionJob.perform_later(id)
    end
  end

  def perform(*args)
  		id = args[0]
  		plugin = FisCiPlugin.find(id)
  	  plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?

	    script_path = "~/idev-projects/uuap-auto-login"
	    solar_system_url = "http://solar.baidu.com/ci/platform/"

	  	stdout, stderr, status = Open3.capture3("curl -sS -L #{solar_system_url} -b #{script_path}/.uuap_cookie -c #{script_path}/.laravel_session | grep '<title>'")

	  	plugin.ci_plugin_log.log["get_laravel_session_of_solar_system"] = {} if plugin.ci_plugin_log.log["get_laravel_session_of_solar_system"].nil?
	  	if stdout.length > 0 && stderr.length == 0 && status.success?
	  	  plugin.ci_plugin_log.log["get_laravel_session_of_solar_system"]['detail'] = "#{stdout}"
	  	  plugin.ci_plugin_log.log["get_laravel_session_of_solar_system"]['status'] = 1
	  	else
	  	  plugin.ci_plugin_log.log["get_laravel_session_of_solar_system"]['detail'] = "#{stderr}"
	  	  plugin.ci_plugin_log.log["get_laravel_session_of_solar_system"]['status'] = 0
	  	end
	  	plugin.ci_plugin_log.save!


  end
end
