json.array!(@fis_ci_plugins) do |fis_ci_plugin|
  json.extract! fis_ci_plugin, :id, :user_id
  json.url fis_ci_plugin_url(fis_ci_plugin, format: :json)
end
