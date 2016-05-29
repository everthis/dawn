class CreateThirdPartyAccounts < ActiveRecord::Migration
  def change
    create_table :third_party_accounts do |t|
      t.string :account
      t.boolean :is_active
      t.string :cookies
      t.string :type
      t.string :env
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    add_index :third_party_accounts, [:user_id, :created_at]
  end
end
