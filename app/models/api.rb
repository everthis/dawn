class Api < ActiveRecord::Base
	belongs_to :user
  validates :user_id, presence: true, allow_nil: false
	validates :uri, presence: true, length: { maximum: 255 },
					  uniqueness: { case_sensitive: false }
end
