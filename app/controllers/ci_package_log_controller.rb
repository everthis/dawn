class CiPackageLogsController < ApplicationController
	before_action :logged_in_user

	def query_current_log
		CiPackage.find(params[:plugin_id]).ci_package_log.log.to_json
	end


end
