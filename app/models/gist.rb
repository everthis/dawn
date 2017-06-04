class Gist < ApplicationRecord
  require 'securerandom'

  belongs_to :user
  validates :description, presence: true
  validates :content, presence: true

  before_create :gen_external_id


  private
    def gen_external_id
    	self.externalId = SecureRandom.hex(6)
    end
end
