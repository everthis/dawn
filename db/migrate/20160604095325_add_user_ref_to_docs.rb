class AddUserRefToDocs < ActiveRecord::Migration
  def change
    add_reference :docs, :user, index: true, foreign_key: true
  end
end
