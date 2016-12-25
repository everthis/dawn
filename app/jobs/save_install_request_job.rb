class SaveInstallRequestJob < ApplicationJob
  queue_as :fis_install_request

  def perform(*args)
    # Do something later
  end
end
