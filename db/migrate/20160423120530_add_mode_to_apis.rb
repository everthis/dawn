class AddModeToApis < ActiveRecord::Migration
  def change
  	add_column :apis, :mode, :string
  	add_column :apis, :debugAddr, :string
  end
end
