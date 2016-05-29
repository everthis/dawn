json.array!(@third_party_accounts) do |third_party_account|
  json.extract! third_party_account, :id, :account, :is_active, :account_cookies, :account_type, :env, :user_id
  json.url third_party_account_url(third_party_account, format: :json)
end
