require 'open3'
require 'uri'

class SaveConfigurationOnSolarSystemJob < ApplicationJob
  queue_as :save_configuration_on_solar_system

  def perform(*args)
  	id = args[0]
  	plugin = FisCiPlugin.find(id)
    plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?

    save_conf_url = "http://solar.baidu.com/ci/api/saveProjectRunConf"

    other_params = "product_id=_fis_ci&project_id=_sys_plugin_install&"
    pluginName = "#{plugin.ciPackageNamePrefix}#{plugin.ciPackageName}"
    pluginVersion = "#{plugin.ciPackageVersion}"

    shell_commands = <<~HEREDOC
    	system:
    	    steps:
    	        - fis-plugin-install:
    	            plugins: '#{pluginName}@#{pluginVersion}'
    	            cmd: 'cnpm'
    HEREDOC


    conf_params = URI.escape(shell_commands, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    post_data = "#{other_params}conf=#{conf_params}"

    stdout, stderr, status = Open3.capture3("curl -sS -L -b #{script_path}/.laravel_session -d \"#{post_data}\" #{save_conf_url} | jq -r '.msg'")

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
