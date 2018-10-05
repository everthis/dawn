class AddSectionToApis < ActiveRecord::Migration[4.2]
  def change
    add_column :apis, :section, :string
  end
end
