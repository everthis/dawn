class AddDescriptionToApis < ActiveRecord::Migration
  def change
    add_column :apis, :description, :string
  end
end
