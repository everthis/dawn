class PtTask < ApplicationRecord
  belongs_to :user
  has_many :pt_task_logs
end
