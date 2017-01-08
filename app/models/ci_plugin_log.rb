class CiPluginLog < ApplicationRecord
  belongs_to :ci_plugin
  after_update_commit :broadcast_log, :update_status

  def broadcast_log
    ActionCable.server.broadcast("ci_plugin_#{self.ci_plugin_id}", self.log)
  end

  def update_status
  	def_status = ''
  	self.log.each do |key, val|
  		if val['status'] == 0
  			def_status = 'failed'
	  		CiPlugin.find(self.ci_plugin_id).update_attribute(:status, def_status)
	  	elsif key == "check_job_status"
  			def_status = 'success'
	  		CiPlugin.find(self.ci_plugin_id).update_attribute(:status, def_status)  
	  	else
  			def_status = 'pending'
	  		CiPlugin.find(self.ci_plugin_id).update_attribute(:status, def_status)  
  		end

  		ActionCable.server.broadcast("ci_plugin_status_#{self.ci_plugin_id}", plugin_status: def_status)

  	end

  end
end
