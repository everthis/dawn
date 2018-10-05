class AddAuthenticationTokenToUsers < ActiveRecord::Migration[4.2]
  def change
    add_column :users, :auth_token, :string
    add_index :users, :auth_token, unique: true
  end
end
