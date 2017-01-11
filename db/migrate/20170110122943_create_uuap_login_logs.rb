class CreateUuapLoginLogs < ActiveRecord::Migration[5.0]
  def change
    create_table :uuap_login_logs do |t|
    	t.string :tail
    	t.boolean :status

      t.timestamps
    end
  end
end
