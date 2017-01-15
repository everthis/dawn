json.array!(@ci_packages) do |ci_package|
  json.extract! ci_package, :id, :user_id
  json.url ci_package_url(ci_package, format: :json)
end
