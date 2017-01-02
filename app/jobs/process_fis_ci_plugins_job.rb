class ProcessFisCiPluginsJob < ApplicationJob
  queue_as :download_rename_publish_npm_package

  def perform(id)
  	@fis_ci_plugin = FisCiPlugin.find(id)
		user_input = @fis_ci_plugin['input']
    package_name = @fis_ci_plugin['packageName']
		version = @fis_ci_plugin['packageVersion']
		ci_package_fullname = "#{@fis_ci_plugin['ciPackageNamePrefix']}#{@fis_ci_plugin['ciPackageName']}"
		# `bash /home/users/hejie03/idev-projects/fis-ci-plugins/download_rename_publish.sh #{user_input} #{ci_package_fullname} #{package_name}`
		puts "package #{ci_package_fullname}@#{version} published"
		# `node /home/users/hejie03/idev-projects/fis-ci-plugins/save_request.js #{ci_package_fullname} #{version}`
		puts "package is being installed on FIS CI machines. :)"
  end

end
