class CreateFisCiPlugins < ActiveRecord::Migration[5.0]
  def change
    create_table :fis_ci_plugins do |t|
      t.references :user, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
