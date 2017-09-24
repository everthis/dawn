class CreateInstagramUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :instagram_users do |t|
      t.string :user_id
      t.boolean :account_is_private
      t.integer :media_count
      t.string :user_name
      t.string :profile_pic_url

      t.timestamps
    end
  end
end
