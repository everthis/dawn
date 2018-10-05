class AddModeToApis < ActiveRecord::Migration[4.2]
  def change
  	add_column :apis, :mode, :string
  	add_column :apis, :debugAddr, :string
  end
end
