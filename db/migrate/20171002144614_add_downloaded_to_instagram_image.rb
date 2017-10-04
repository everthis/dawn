class AddDownloadedToInstagramImage < ActiveRecord::Migration[5.1]
  def change
    add_column :instagram_images, :downloaded, :boolean, :default => false
  end
end
