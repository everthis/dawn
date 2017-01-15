class CiPackage < ApplicationRecord
  belongs_to :user
  has_one :ci_package_log, dependent: :destroy
  after_create :create_ci_package_log
  after_commit :check_npm_package_existence, on: [ :create ]
  validates_inclusion_of :ciPackageVersionPatch, :in => 0..10

  def download_rename_publish_npm_package
  	ProcessCiPackagesJob.perform_later(self.id)
  end

  def check_npm_package_existence
    CheckNpmPackageExistenceJob.perform_later(self.id)
    # GetLaravelSessionJob.perform_later(self.id)
  	# SaveConfigurationOnSolarSystemJob.perform_later(self.id)
  end

  def update_npm_package_bin(bin_array)
  	update_attribute(:bin, bin_array)
  end


end
