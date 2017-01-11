json.array!(@npm_registries) do |npm_registry|
  json.extract! npm_registry, :id, :registry_url, :checked
  json.url npm_registry_url(npm_registry, format: :json)
end
