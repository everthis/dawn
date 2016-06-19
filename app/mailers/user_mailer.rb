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


  def account_activation(user)
    @user = user
    mail to: user.email, subject: "Account activation"
  end

  def password_reset(user_id)
    @user = User.find(user_id)
    logger.info(user_id)
    logger.info("############################")
    logger.info(@user.reset_token)
    logger.info(@user.email)
    @user.reset_token = "qweqwasdqweq"
    @epr_url = edit_password_reset_url(@user, id: @user.reset_token, email: @user.email)
    mail to: @user.email, subject: "Password reset"
  end
end
