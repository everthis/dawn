class CreateRandomrors < ActiveRecord::Migration
  def change
    create_table :randomrors do |t|

      t.timestamps null: false
    end
  end
end
