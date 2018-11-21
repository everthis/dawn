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
    cherry_mail_users = ENV['CHERRY_MAIL_USERS'].split('|')
    @is_cherry_mail = cherry_mail_users.include? @user.name
    @pt_task_log = @pt_task.pt_task_log
    if @pt_task_log.detail['upload']['fileName'].nil?
      fileName = "Butterfly.Sleep.2017.720p.BluRay.x264-WiKi.mp4"
    else
      fileName = @pt_task_log.detail['upload']['fileName']
    end
    @signUrl = cfetch(ENV["PT_TASK_ORIGIN"] + '/getSignUrl?fpath=' + encodeUri(fileName))
    qrcode = RQRCode::QRCode.new(@signUrl)
    fileName = hash + '-' + DateTime.now.to_i.to_s + '.png'
    @imgPath = 'uploads/qrcode/' + fileName
    p @is_cherry_mail
    fill_color = @is_cherry_mail ? 'pink' : 'black'
    qr_color = @is_cherry_mail ? 'red' : 'white'
    qrcode_str = qrcode.as_png(
      resize_gte_to: false,
      resize_exactly_to: false,
      fill: fill_color,
      color: qr_color,
      size: 480,
      border_modules: 2,
      module_px_size: 6,
      file: Rails.root.join('public', @imgPath)
      # file: nil # path to write
    )
    if Rails.env.production?
      hostPath = 'https://www.everthis.com/'
    else
      hostPath = 'http://192.168.1.209:8678/'
    end
    # @qrcode = Base64.encode64(qrcode_str)
    @qrcodeUrl = hostPath + @imgPath
    mail_template = 'pt_task_notify'
    if @is_cherry_mail
      mail_template = 'pt_task_notify_cherry'
    end
    mail to: @user.email, subject: "Task notification", template_name: mail_template
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
