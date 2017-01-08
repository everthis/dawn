json.array!(@ci_plugins) do |ci_plugin|
  json.extract! ci_plugin, :id, :user_id
  json.url ci_plugin_url(ci_plugin, format: :json)
end
