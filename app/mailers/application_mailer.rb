class ApplicationMailer < ActionMailer::Base
  default from: "no-reply@everthis.com"
  layout 'mailer'
end
