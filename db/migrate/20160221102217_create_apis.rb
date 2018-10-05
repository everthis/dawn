class CreateApis < ActiveRecord::Migration[4.2]
  def change
    create_table :apis do |t|
      t.string :uri
      t.string :method
      t.string :data

      t.timestamps null: false
    end
  end
end
