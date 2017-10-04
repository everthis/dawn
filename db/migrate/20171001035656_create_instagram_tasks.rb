class CreateInstagramTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :instagram_tasks do |t|
      t.string :user_id
      t.string :task_type
      t.string :status

      t.timestamps
    end
  end
end
