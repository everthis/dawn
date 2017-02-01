require 'email_whitelist_interceptor'

if Rails.env.development? || Rails.env.production? 
  ActionMailer::Base.register_interceptor(EmailWhitelistInterceptor)
end