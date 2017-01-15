class RenameCipluginsToCipackages < ActiveRecord::Migration[5.0]
  def change
  	rename_table :ci_plugins, :ci_packages
  	rename_table :ci_plugin_logs, :ci_package_logs
  end
end
