class ModifyNpmPackageJob < ApplicationJob
  queue_as :modify_npm_package

  def perform(*args)
    # Do something later
  end
end
