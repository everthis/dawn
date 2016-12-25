class ProcessFisCiPluginsJob < ApplicationJob
  queue_as :download_rename_publish_npm_package

  def perform(id)
  	@content = JSON.parse FisCiPlugin.find(id).content
  	@content.each { |item|
  		user_input = item['input']
      package_name = item['package']
  		version = item['version']
  		ci_package_fullname = "#{item['ciPackageNamePrefix']}#{item['ciPackageName']}"
  		`bash /home/users/hejie03/idev-projects/fis-ci-plugins/download_rename_publish.sh #{user_input} #{ci_package_fullname} #{package_name}`
  		puts "package #{ci_package_fullname}@#{version} published"
  		`node /home/users/hejie03/idev-projects/fis-ci-plugins/save_request.js #{ci_package_fullname} #{version}`
  		puts "package is being installed on FIS CI machines. :)"
  	}
  end
end
