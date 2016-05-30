class ThirdPartyAccount < ActiveRecord::Base
  belongs_to :user
  # before_save :set_active_boolean

  private
    def set_active_boolean
    	self.is_active = false if is_active
    	true
    end
end
