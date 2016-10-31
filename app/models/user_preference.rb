class UserPreference < ApplicationRecord
  belongs_to :user
  before_save :default_values

  def default_values
    self.locale = 'en' if self.locale.nil?
  end
end
