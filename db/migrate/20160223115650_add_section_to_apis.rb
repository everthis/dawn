class AddSectionToApis < ActiveRecord::Migration
  def change
    add_column :apis, :section, :string
  end
end
