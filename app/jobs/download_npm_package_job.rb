class DownloadNpmPackageJob < ApplicationJob
  queue_as :download_npm_package

  def perform(*args)
    # Do something later
  end
end
