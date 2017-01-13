class UserPreference < ApplicationRecord
  belongs_to :user
  # before_save :default_values
  after_initialize :init

  def default_values
    self.locale = 'en' if self.locale.nil?
  end
  def init
    self.locale    ||= 'en'
    # self.number  ||= 0.0           #will set the default value only if it's nil
    # self.address ||= build_address #let's you set a default association
  end
end
