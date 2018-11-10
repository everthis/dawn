require 'uri'
require 'net/http'
require 'rqrcode'

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

  def pt_task_notify(hash)
    @pt_task = PtTask.find_by(transmission_hash: hash)
    @user = User.find(@pt_task.user_id)
    @pt_task_log = @pt_task.pt_task_log
    if @pt_task_log.detail['upload']['fileName'].nil?
      fileName = "Butterfly.Sleep.2017.720p.BluRay.x264-WiKi.mp4"
    else
      fileName = @pt_task_log.detail['upload']['fileName']
    end
    @signUrl = cfetch('http://localhost:3000/getSignUrl?fpath=' + encodeUri(fileName))
    qrcode = RQRCode::QRCode.new(@signUrl)

    @qrcode = qrcode.to_s
    mail to: @user.email, subject: "Task notification"
  end

  private
    def encodeUri(str)
      URI.escape(str, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    end

    def cfetch(str)
      url = URI.parse(URI.escape(str))
      http = Net::HTTP.new(url.host, url.port)

      request = Net::HTTP::Get.new(url)
      request["cache-control"] = 'no-cache'

      response = http.request(request)
      response.read_body
    end
end
