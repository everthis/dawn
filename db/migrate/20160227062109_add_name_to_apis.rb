class AddNameToApis < ActiveRecord::Migration[4.2]
  def change
    add_column :apis, :name, :string
  end
end
