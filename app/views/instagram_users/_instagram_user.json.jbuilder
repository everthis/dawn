json.extract! instagram_user, :id, :user_id, :account_is_private, :media_count, :user_name, :created_at, :updated_at
json.url instagram_user_url(instagram_user, format: :json)
