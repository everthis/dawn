class PtTask < ApplicationRecord
  belongs_to :user
  has_one :pt_task_log, dependent: :destroy
  after_create :create_pt_task_log
end
