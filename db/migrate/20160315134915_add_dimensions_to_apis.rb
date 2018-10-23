class AddDimensionsToApis < ActiveRecord::Migration[4.2]
  def change
    add_column :apis, :dimensions, :json, default: {}, null: false
  end
end
