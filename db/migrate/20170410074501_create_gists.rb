class CreateGists < ActiveRecord::Migration[5.0]
  def change
    create_table :gists do |t|
      t.references :user, foreign_key: true
      t.text :description
      t.text :content
      t.boolean :hasAnswer
      t.text :answer

      t.timestamps
    end
  end
end
