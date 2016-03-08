class AddNodesToApis < ActiveRecord::Migration
  def change
  	 add_column :apis, :nodes, :json, default: [], null: false
  end
end
