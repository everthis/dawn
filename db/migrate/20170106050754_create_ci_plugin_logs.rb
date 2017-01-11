class CreateCiPluginLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :ci_plugin_logs do |t|
      t.references :ci_plugin, foreign_key: true
      t.json :log
      t.integer :job_record_id

      t.timestamps
    end
  end
end
