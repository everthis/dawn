class CreatePtTaskLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :pt_task_logs do |t|
      t.references :pt_task, foreign_key: true
      t.string :status
      t.json :detail

      t.timestamps
    end
  end
end
