class AddUserToApis < ActiveRecord::Migration
  def change
    add_reference :apis, :user, index: true, foreign_key: true
  end
end
