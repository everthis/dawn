class AddPictureToMicroposts < ActiveRecord::Migration[4.2]
  def change
    add_column :microposts, :picture, :string
  end
end
