require 'uri'
require 'net/http'
class PtTaskCheckDownloadFilesStatusJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    pt_task = PtTask.find_by(transmission_hash: hash)
    unless pt_task.nil?
      if pt_task.pt_task_log.detail['downloadFiles']['progress'] < 100
        self.class.set(wait: 5.seconds).perform_later(hash)
      else
        PtTaskFindTargetFileJob.perform_later(hash)
      end
    end

  end

  def perform(*args)
    hash = args[0]
    res = cfetch(ENV['PT_TASK_ORIGIN'] + '/checkProgress?hash=' + hash)
    obj = JSON.parse(res)
    pt_task = PtTask.find_by(transmission_hash: hash)
    unless pt_task.nil?
      pt_task_log = pt_task.pt_task_log
      pt_task_log.detail = {} if pt_task_log.detail.nil?
      pt_task_log.detail['downloadFiles'] = obj

      pt_task_log.save!
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
