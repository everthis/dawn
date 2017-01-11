class CreateNpmRegistries < ActiveRecord::Migration[5.0]
  def change
    create_table :npm_registries do |t|
    	t.string :label
      t.string :registry_url
      t.boolean :checked

      t.timestamps
    end
  end
end
