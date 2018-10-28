json.extract! pt_task_log, :id, :status, :detail, :created_at, :updated_at
json.url pt_task_log_url(pt_task_log, format: :json)
