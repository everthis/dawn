class UserMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.account_activation.subject
  #


  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.password_reset.subject
  #


  def account_activation(user_id)
    @user = User.find(user_id)
    @user.create_activation_digest
    mail to: @user.email, subject: "Account activation"
  end

  def password_reset(user_id)
    @user = User.find(user_id)
    @user.create_reset_digest
    @epr_url = edit_password_reset_url(@user.reset_token, email: @user.email)
    mail to: @user.email, subject: "Password reset"
  end
end
