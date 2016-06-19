class PasswordResetEmailJob < ActiveJob::Base
  queue_as :default

  def perform(user_id)
    UserMailer.password_reset(user_id).deliver_later
  end
end
