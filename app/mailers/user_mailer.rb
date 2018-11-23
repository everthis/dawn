require 'uri'
require 'net/http'
require 'rqrcode'

class UserMailer < ApplicationMailer
  include CarrierWave::MiniMagick
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
    mail_tpl = @user.user_preference.pt_task_mail_template
    @pt_task_log = @pt_task.pt_task_log
    if @pt_task_log.detail['upload']['fileName'].nil?
      fileName = "Butterfly.Sleep.2017.720p.BluRay.x264-WiKi.mp4"
    else
      fileName = @pt_task_log.detail['upload']['fileName']
    end
    if mail_tpl == 'cherry'
      expires = '1y'
    else
      expires = ''
    end
    @signUrl = cfetch(ENV["PT_TASK_ORIGIN"] + '/getSignUrl?expires=' + expires + '&fpath=' + encodeUri(fileName))
    qrcode = RQRCode::QRCode.new(@signUrl)
    fileName = hash + '-' + DateTime.now.to_i.to_s
    svgPath = 'uploads/qrcode/' + fileName + '.svg'

    @imgPath = 'uploads/qrcode/' + fileName + '.png'

    qrcode_color = mail_tpl == 'cherry' ? 'd92c8e' : '000'

    svg = qrcode.as_svg(offset: 10,
      color: qrcode_color,
      fill:'fff',
      shape_rendering: 'geometricPrecision',
      module_size: 11
    )
    sp = Rails.root.join('public', svgPath)
    np = Rails.root.join('public', @imgPath)
    File.write(sp, svg)
    MiniMagick::Tool::Convert.new do |convert|
      convert.background("white")
      convert << sp
      convert << np
    end

    if Rails.env.production?
      hostPath = 'https://www.everthis.com/'
    else
      hostPath = 'http://192.168.1.209:8678/'
    end
    # @qrcode = Base64.encode64(qrcode_str)
    @qrcodeUrl = hostPath + @imgPath
    mail_template = 'pt_task_notify'
    if mail_tpl == 'cherry'
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
