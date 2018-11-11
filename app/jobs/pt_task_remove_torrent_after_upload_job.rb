require 'uri'
require 'net/http'
class PtTaskRemoveTorrentAfterUploadJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    pt_task = PtTask.find_by(transmission_hash: hash)
    pt_task.update(status: 'completed')
  end

  def perform(*args)
    hash = args[0]
    res = cfetch(ENV["PT_TASK_ORIGIN"] + '/removeTorrentAndData?hash=' + hash)
  end

  private
    def cfetch(str)
      url = URI.parse(URI.escape(str))

      http = Net::HTTP.new(url.host, url.port)
      request = Net::HTTP::Get.new(url)
      request["cache-control"] = 'no-cache'

      response = http.request(request)
      response.read_body
    end
end
