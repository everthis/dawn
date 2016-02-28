class AddNameToApis < ActiveRecord::Migration
  def change
    add_column :apis, :name, :string
  end
end
