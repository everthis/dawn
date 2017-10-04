class InstagramTask < ApplicationRecord
  def self.search(user_id: nil, task_type: nil, status: nil)
    with_user_id(user_id)
      .with_task_type(task_type)
      .task_status(status)
  end

  scope :with_user_id, proc { |user_id|
    if user_id.present?
      where(user_id: user_id)
    end
  }

  scope :with_task_type, proc { |task_type|
    if task_type.present?
      where(task_type: task_type)
    end
  }

  scope :task_status, proc { |status|
    if status.present?
      where(status: status)
    end
  }
end
