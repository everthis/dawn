class ExecuteCiPluginInstallJob < ApplicationJob
  queue_as :install_request

  def perform(*args)
    # Do something later
  end
end
