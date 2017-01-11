require 'open3'
require 'uri'

class SaveConfigurationOnSolarSystemJob < ApplicationJob
  queue_as :login_save_conf_install

  after_perform do |job|
    id = job.arguments.first
    plugin = CiPlugin.find(id)
    if plugin.ci_plugin_log.log['add_plugin_installation_job_on_solar_system']['status'] == 1
        CheckInstallationStatusOnSolarSystemJob.perform_later(id)
    end
  end


  def perform(*args)
  	id = args[0]
  	plugin = CiPlugin.find(id)
    plugin.ci_plugin_log.log = {} if plugin.ci_plugin_log.log.nil?

    script_path = "~/idev-projects/uuap-auto-login"

    save_conf_url = "http://solar.baidu.com/ci/api/saveProjectRunConf"
    add_job_url = "http://solar.baidu.com/ci/addJob"

    other_params = "product_id=_fis_ci&project_id=_sys_plugin_install&"
    pluginName = "#{plugin.ciPackageNamePrefix}#{plugin.ciPackageName}"
    pluginVersion = "#{plugin.ciPackageVersion}"

    add_job_query_str = {
		  commit_msg: '平台运行',
		  committer: 'hejie03',
		  product_id: '_fis_ci',
		  project_id: '_sys_plugin_install'
		}.to_query

    shell_commands = <<~HEREDOC
    	system:
    	    steps:
    	        - fis-plugin-install:
                  plugins: '#{pluginName}@#{pluginVersion}'
                  registry: 'http://cp01-fis-build-02.epc.baidu.com:8995'
    HEREDOC


    # conf_params = URI.escape(shell_commands, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    # post_data_prev = "#{other_params}conf=#{conf_params}"
    post_data = "product_id=_fis_ci&project_id=_sys_plugin_install&conf=system%3A%0A%20%20%20%20steps%3A%0A%20%20%20%20%20%20%20%20-%20fis-plugin-install%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20plugins%3A%20'#{pluginName}%40#{pluginVersion}'%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20cmd%3A%20'cnpm'"

    stdout, stderr, status = Open3.capture3("curl -sS -L -b #{script_path}/.laravel_session -d \"#{post_data}\" #{save_conf_url} | jq -r '.msg'")


    plugin.ci_plugin_log.log["save_configuration_on_solar_system"] = {} if plugin.ci_plugin_log.log["save_configuration_on_solar_system"].nil?
    if stdout.length > 0 && stderr.length == 0 && status.success?
      plugin.ci_plugin_log.log["save_configuration_on_solar_system"]['detail'] = "#{stdout}"
      plugin.ci_plugin_log.log["save_configuration_on_solar_system"]['status'] = 1
    else
      plugin.ci_plugin_log.log["save_configuration_on_solar_system"]['detail'] = "#{stderr}"
      plugin.ci_plugin_log.log["save_configuration_on_solar_system"]['status'] = 0
    end
    plugin.ci_plugin_log.save!

    sleep 2
		add_job_url_with_params = "#{add_job_url}?#{add_job_query_str}"
  	plugin1 = CiPlugin.find(id)
    if plugin1.ci_plugin_log.log['save_configuration_on_solar_system']['status'] == 1
      stdout1, stderr1, status1 = Open3.capture3("curl -sS -L -b #{script_path}/.laravel_session -X GET \'#{add_job_url_with_params}\' | jq -r '.errno, .msg, .data.record_id'")


      out_arr = stdout1.split("\n")

      plugin1.ci_plugin_log.log["add_plugin_installation_job_on_solar_system"] = {} if plugin.ci_plugin_log.log["add_plugin_installation_job_on_solar_system"].nil?

      if out_arr[0] == "0" && status.success?
        plugin1.ci_plugin_log.log["add_plugin_installation_job_on_solar_system"]['detail'] = "#{stdout1}"
        plugin1.ci_plugin_log.log["add_plugin_installation_job_on_solar_system"]['status'] = 1
        plugin1.ci_plugin_log.job_record_id = out_arr[2].to_i
      else
        plugin1.ci_plugin_log.log["add_plugin_installation_job_on_solar_system"]['detail'] = "#{stderr1}"
        plugin1.ci_plugin_log.log["add_plugin_installation_job_on_solar_system"]['status'] = 0
      end
      plugin1.ci_plugin_log.save!

    end

  end
end
