class CiPackageLog < ApplicationRecord
  belongs_to :ci_package
  after_update_commit :broadcast_log, :update_status

  def broadcast_log
    ActionCable.server.broadcast("ci_package_#{self.ci_package_id}", self.log)
  end

  def update_status
  	def_status = ''
  	self.log.each do |key, val|
  		if val['status'] == 0
  			def_status = 'failed'
	  		CiPackage.find(self.ci_package_id).update_attribute(:status, def_status)
	  	elsif key == "check_installation_status_on_solar_system" && val['status'] == 1
  			def_status = 'success'
	  		CiPackage.find(self.ci_package_id).update_attribute(:status, def_status)
	  	else
  			def_status = 'pending'
	  		CiPackage.find(self.ci_package_id).update_attribute(:status, def_status)
  		end

  		ActionCable.server.broadcast("ci_package_status_#{self.ci_package_id}", plugin_status: def_status)

  	end

  end
end
