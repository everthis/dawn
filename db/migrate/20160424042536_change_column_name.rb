class ChangeColumnName < ActiveRecord::Migration
  def change
  	rename_column :apis, :debug_addr, :debugAddr
  end
end
