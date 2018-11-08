require 'uri'
require 'net/http'
class PtTaskConvertJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    PtTaskCheckConvertProgressJob.perform_later(hash)
  end

  def perform(*args)
    hash = args[0]
    pt_task_log = PtTask.find_by(transmission_hash: hash).pt_task_log
    fpath = pt_task_log.detail['findTargetFile']['fpath']
    res = cfetch('http://localhost:3000/convert?hash=' + encodeUri(hash) + '&fpath=' + encodeUri(fpath))
  end

  def encodeUri(str)
    URI.escape(str, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
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
