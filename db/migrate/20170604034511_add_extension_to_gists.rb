class AddExtensionToGists < ActiveRecord::Migration[5.1]
  def change
    add_column :gists, :extension, :string
  end
end
