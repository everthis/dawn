require 'open3'
class CheckNpmPackageExistenceJob < ApplicationJob
  queue_as :check_npm_package_existence

  def perform(*args)
  	id = args[0]
  	plugin = FisCiPlugin.find(id)
    stdout, stderr, status = Open3.capture3("npm v #{plugin.input} dist.tarball")
    if stdout.length > 0
    	plugin.update(log: {"phase1": "#{stdout}"})
    elsif stderr.length > 0
    	plugin.update(log: {"phase1": "#{stderr}"})
    else
    	plugin.update(log: {"phase1": "#{stderr}"})
    end

  end
end
