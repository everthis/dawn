json.array!(@user_settings) do |user_setting|
  json.extract! user_setting, :id, :user_config, :user_id
  json.url user_setting_url(user_setting, format: :json)
end
