class AddDimensionsToApis < ActiveRecord::Migration
  def change
    add_column :apis, :dimensions, :json, default: {}, null: false
  end
end
