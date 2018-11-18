require 'uri'
require 'net/http'
class PtTaskFindTargetFileJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first

    pt_task = PtTask.find_by(transmission_hash: hash)
    unless pt_task.nil?
      if pt_task.pt_task_log.detail['findTargetFile'].nil? || pt_task.pt_task_log.detail['findTargetFile']['progress'] < 100
        self.class.set(wait: 5.seconds).perform_later(hash)
      else
        PtTaskConvertJob.perform_later(hash)
      end
    end
  end

  def perform(*args)
    hash = args[0]
    res = cfetch(ENV['PT_TASK_ORIGIN'] + '/findTargetFile?hash=' + hash)
  end

  def cfetch(str)
    # url = URI(str)
    url = URI.parse(URI.escape(str))

    http = Net::HTTP.new(url.host, url.port)
    # http.use_ssl = true
    # http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(url)
    # request["x-api-key"] = ENV["SYGIC_API_KEY"]
    request["cache-control"] = 'no-cache'

    response = http.request(request)
    response.read_body
  end
end
