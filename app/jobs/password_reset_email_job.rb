class PasswordResetEmailJob < ActiveJob::Base
  queue_as :default

  def perform(id)
    UserMailer.password_reset(id).deliver_later
  end
end
