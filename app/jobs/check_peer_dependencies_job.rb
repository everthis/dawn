class CheckPeerDependenciesJob < ApplicationJob
  queue_as :check_peer_dependencies

  def perform(*args)
    id = args[0]
    plugin = CiPackage.find(id)

    download_url = plugin.ci_package_log.log['check_npm_package_existence_in_registry']['detail']

    default_tarball_download_dir = ENV["DOWNLOAD_PATH"]

    ci_package_fullname = "#{plugin['ciPackageNamePrefix']}#{plugin['ciPackageName']}"
    ci_package_version = "#{plugin['ciPackageVersion']}"
    uri = URI.parse(download_url.strip)

    full_name = File.basename(uri.path)
    file_name = File.basename(full_name, ".*")

    shell_commands = <<~HEREDOC
      #!/usr/bin/env bash
      cd #{default_tarball_download_dir}
      mkdir -p #{file_name} && cd #{file_name}
      cp #{default_tarball_download_dir}/#{full_name} ./
      tar --warning=no-unknown-keyword -zxf #{full_name}
      cd package
      cp package.json package.json.bak
      peer_deps=$(cat package.json | jq '.peerDependencies')

      echo "$peer_deps"
    HEREDOC

    stdout, stderr, status = Open3.capture3("sh", :stdin_data=>shell_commands, :binmode=>true)
    plugin.ci_package_log.log["modify_npm_package"] = {} if plugin.ci_package_log.log["modify_npm_package"].nil?

    query_records = CiPackage.where(ciPackageName: ci_package_name_arr, status: "success")

    if stderr.length == 0 && status.success?
      plugin.ci_package_log.log['modify_npm_package']['detail'] = "#{stdout}"
      plugin.ci_package_log.log['modify_npm_package']['status'] = 1
    else
      plugin.ci_package_log.log['modify_npm_package']['detail'] = "#{stderr}"
      plugin.ci_package_log.log['modify_npm_package']['status'] = 0
    end
    plugin.ci_package_log.save!

  end
end
