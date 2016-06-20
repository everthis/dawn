class AccountActivationEmailJob < ActiveJob::Base
  queue_as :default

  def perform(user_id)
    UserMailer.account_activation(user_id).deliver_later
  end
end
