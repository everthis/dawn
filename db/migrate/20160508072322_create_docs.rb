class CreateDocs < ActiveRecord::Migration[4.2]
  def change
    create_table :docs do |t|
      t.string :title
      t.string :content

      t.timestamps null: false
    end
  end
end
