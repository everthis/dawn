json.array!(@uuap_login_logs) do |uuap_login_log|
  json.extract! uuap_login_log, :id
  json.url uuap_login_log_url(uuap_login_log, format: :json)
end
