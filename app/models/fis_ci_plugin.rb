class FisCiPlugin < ApplicationRecord
  belongs_to :user
  after_commit :download_rename_publish_npm_package, :check_npm_package_existence, on: [ :create ]

  def download_rename_publish_npm_package
  	ProcessFisCiPluginsJob.perform_later(self.id)
  end

  def check_npm_package_existence
  	CheckNpmPackageExistenceJob.perform_later(self.id)
  end
end
