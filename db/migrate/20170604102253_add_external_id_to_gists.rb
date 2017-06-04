class AddExternalIdToGists < ActiveRecord::Migration[5.1]
  def change
    add_column :gists, :externalId, :string
  end
end
