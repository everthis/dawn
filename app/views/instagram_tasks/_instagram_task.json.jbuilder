json.extract! instagram_task, :id, :user_id, :task_type, :status, :created_at, :updated_at
json.url instagram_task_url(instagram_task, format: :json)
