class AddTimestampAndCaptionToInstagramImage < ActiveRecord::Migration[5.1]
  def change
    add_column :instagram_images, :timestamp, :datetime
    add_column :instagram_images, :caption, :text
  end
end
