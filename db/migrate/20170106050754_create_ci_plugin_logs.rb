class CreateCiPluginLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :ci_plugin_logs do |t|
      t.references :fis_ci_plugin, foreign_key: true
      t.json :log

      t.timestamps
    end
  end
end
