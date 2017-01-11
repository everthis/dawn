require 'open3'
class UpdateUuapCookieJob < ApplicationJob
  queue_as :update_uuap_cookie

  after_perform do |job|
    last_log = UuapLoginLog.last
    if last_log.status == false
      self.class.set(wait: 1.seconds).perform_later()
    end
  end

  def perform(*args)


	  script_path = "~/idev-projects/uuap-auto-login"

		stdout, stderr, status = Open3.capture3("sh #{script_path}/uuap-cookie.sh -e #{script_path}/.uuap.conf | grep UUAPTGC")

		puts stdout
		if stdout.length > 0 && stderr.length == 0 && status.success?

			UuapLoginLog..create(tail: stdout, status: true)
		else
			UuapLoginLog..create(tail: "failed", status: false)

		end


  end

end
