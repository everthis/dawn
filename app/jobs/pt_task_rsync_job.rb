class PtTaskRsyncJob < ApplicationJob
  queue_as :default

  after_perform do |job|
    hash = job.arguments.first
    PtTaskRsyncProgressJob.perform_later(hash)
  end

  def perform(*args)
    hash = args[0]
    pt_task_log = PtTask.find_by(transmission_hash: hash).pt_task_log
    fpath = pt_task_log.detail['convert']['fpath']
    res = cfetch(ENV['RSYNC_UPLOAD_HOST'] + '/rsync?hash=' + encodeUri(hash) + '&fpath=' + encodeUri(fpath))
  end

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
