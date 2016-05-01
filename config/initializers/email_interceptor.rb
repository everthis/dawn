if Rails.env.development? || Rails.env.production? 
  ActionMailer::Base.register_interceptor(EmailWhitelistInterceptor)
end