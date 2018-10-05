class CreateEmailWhitelists < ActiveRecord::Migration[4.2]
  def change
    create_table :email_whitelists do |t|
      t.string :email

      t.timestamps null: false
    end
  end
end
