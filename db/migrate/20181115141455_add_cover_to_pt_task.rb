class AddCoverToPtTask < ActiveRecord::Migration[5.2]
  def change
    add_column :pt_tasks, :cover, :string
  end
end
