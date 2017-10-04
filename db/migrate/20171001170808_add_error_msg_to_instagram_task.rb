class AddErrorMsgToInstagramTask < ActiveRecord::Migration[5.1]
  def change
    add_column :instagram_tasks, :err_msg, :json
    add_column :instagram_tasks, :params, :json
  end
end
