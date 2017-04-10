class Gist < ApplicationRecord
  belongs_to :user
  validates :description, presence: true
  validates :content, presence: true
end
