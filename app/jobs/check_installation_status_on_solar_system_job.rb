require 'open3'
require 'uri'

class CheckInstallationStatusOnSolarSystemJob < ApplicationJob
  queue_as :check_installation_status_on_solar_system

  after_perform do |job|
    id = job.arguments.first
    plugin = CiPackage.find(id)
    if plugin.ci_package_log.log['check_installation_status_on_solar_system']['status'].nil?
        self.class.set(wait: 5.seconds).perform_later(id)
    end
  end

  def perform(*args)
	id = args[0]
	plugin = CiPackage.find(id)
	job_record_id = plugin.ci_package_log.job_record_id

    script_path = "~/idev-projects/uuap-auto-login"

	record_detail_query_url = "http://solar.baidu.com/ci/api/getRecordDetail"

	record_detail_query_str = {
		project_id: "_sys_plugin_install",
		record_id: job_record_id.to_i,
		task_id: 0
	}.to_query

	record_detail_query_url_with_params = "#{record_detail_query_url}?#{record_detail_query_str}"
	stdout, stderr, status = Open3.capture3("curl -sS -L -b #{script_path}/.laravel_session -X GET \'#{record_detail_query_url_with_params}\' | jq -r '.errno, .data[0].record_id, .data[0].status, .data[0].start_time, .data[0].end_time'")

	out_arr = stdout.split("\n")

	plugin.ci_package_log.log["check_installation_status_on_solar_system"] = {} if plugin.ci_package_log.log["check_installation_status_on_solar_system"].nil?

	if out_arr[0] == "0" && status.success? && out_arr[2] == "SUCCESS"
	  plugin.ci_package_log.log["check_installation_status_on_solar_system"]['detail'] = "#{stdout}"
	  plugin.ci_package_log.log["check_installation_status_on_solar_system"]['status'] = 1
	end
	if out_arr[0] == "0" && status.success? && out_arr[2] == "FAIL"
	  plugin.ci_package_log.log["check_installation_status_on_solar_system"]['detail'] = "#{stdout}"
	  plugin.ci_package_log.log["check_installation_status_on_solar_system"]['status'] = 0
	end
	plugin.ci_package_log.save!

  end
end
