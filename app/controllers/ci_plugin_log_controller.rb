class CiPluginLogController < ApplicationController
	before_action :logged_in_user

	def query_current_log
		FisCiPlugin.find(params[:plugin_id]).ci_plugin_log.log.to_json
	end
end
