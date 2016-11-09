class CreateUserPreferences < ActiveRecord::Migration[5.0]
  def change
    create_table :user_preferences do |t|
      t.string :locale
      t.references :user, foreign_key: true

      t.timestamps
    end

  end
end
