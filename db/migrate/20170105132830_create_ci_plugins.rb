class CreateCiPlugins < ActiveRecord::Migration[5.0]
  def change
    create_table :ci_plugins do |t|
      t.references :user, foreign_key: true
      t.string :bin, array: true
      t.string :status
      t.string :input
      t.string :packageName
      t.string :packageVersion
      t.string :ciPackageName
      t.string :ciPackageVersion
      t.string :ciPackageNamePrefix
      t.integer :ciPackageVersionPatch, default: 0

      t.timestamps
    end
  end
end
