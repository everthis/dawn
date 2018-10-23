class AddNodesToApis < ActiveRecord::Migration[4.2]
  def change
  	 add_column :apis, :nodes, :json, default: [], null: false
  end
end
