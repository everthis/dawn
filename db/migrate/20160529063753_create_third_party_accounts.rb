class CreateThirdPartyAccounts < ActiveRecord::Migration[4.2]
  def change
    create_table :third_party_accounts do |t|
      t.string :account
      t.boolean :is_active
      t.string :account_cookies
      t.string :account_type
      t.string :env
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
