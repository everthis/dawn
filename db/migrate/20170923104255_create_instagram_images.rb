class CreateInstagramImages < ActiveRecord::Migration[5.1]
  def change
    create_table :instagram_images do |t|
      t.string :code
      t.string :url
      t.json :dimensions
      t.string :media_type
      t.string :owner_id
      t.string :thumbnail

      t.timestamps
    end
  end
end
