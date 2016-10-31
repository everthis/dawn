class CreateSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :settings do |t|
      t.string :locale
      t.references :user, foreign_key: true

      t.timestamps
    end

    rename_table :settings, :user_preferences
  end
end
