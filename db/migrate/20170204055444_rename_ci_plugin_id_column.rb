class RenameCiPluginIdColumn < ActiveRecord::Migration[5.0]
  def change
    rename_column :ci_package_logs, :ci_plugin_id, :ci_package_id
  end
end
