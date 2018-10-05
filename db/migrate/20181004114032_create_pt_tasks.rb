class CreatePtTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :pt_tasks do |t|
      t.string :title_cn
      t.string :title_en
      t.json :api_response

      t.timestamps
    end
  end
end
