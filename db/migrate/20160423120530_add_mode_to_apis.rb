class AddModeToApis < ActiveRecord::Migration
  def change
  	add_column :apis, :mode, :string
  	add_column :apis, :debug_addr, :string
  end
end
