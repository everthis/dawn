class CreatePtTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :pt_tasks do |t|
      t.references :user, foreign_key: true
      t.string :source_id
      t.string :transmission_hash
      t.string :cdn_url
      t.string :status
      t.json :torrent_base_info
      t.text :torrent_detail

      t.timestamps
    end
  end
end
