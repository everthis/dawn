class CreateFisCiPlugins < ActiveRecord::Migration[5.0]
  def change
    create_table :fis_ci_plugins do |t|
      t.references :user, foreign_key: true
      t.json :log
      t.string :status
      t.string :input
      t.string :packageName
      t.string :packageVersion
      t.string :ciPackageName
      t.string :ciPackageNamePrefix

      t.timestamps
    end
  end
end
