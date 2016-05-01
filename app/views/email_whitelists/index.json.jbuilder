json.array!(@email_whitelists) do |email_whitelist|
  json.extract! email_whitelist, :id, :email
  json.url email_whitelist_url(email_whitelist, format: :json)
end
