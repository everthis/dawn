class CreateApis < ActiveRecord::Migration
  def change
    create_table :apis do |t|
      t.string :uri
      t.string :method
      t.string :data

      t.timestamps null: false
    end
  end
end
