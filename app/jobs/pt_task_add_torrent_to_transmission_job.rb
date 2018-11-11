require 'uri'
require 'net/http'
class PtTaskAddTorrentToTransmissionJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    source_id = job.arguments.first
    pt_task = PtTask.find_by(source_id: source_id)
    PtTaskCheckDownloadFilesStatusJob.perform_later(pt_task.transmission_hash)
  end

  def perform(*args)
    source_id = args[0]
    pt_task_record = PtTask.find_by(source_id: source_id)
    pt_task_record.update_attribute(:status, 'pending')

    res = cfetch(ENV["PT_TASK_ORIGIN"] + '/addTorrent?sourceId=' + source_id)
    obj = JSON.parse(res)
    unless obj['id'].nil?
      pt_task = PtTask.find_by(source_id: source_id)
      pt_task.update_attribute(:transmission_hash, "#{obj['hashString']}")
    end
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
