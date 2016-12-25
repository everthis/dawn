class FisCiPlugin < ApplicationRecord
  belongs_to :user

  def download_rename_publish_npm_package
  	ProcessFisCiPluginsJob.perform_later(self.id)
  end
end
