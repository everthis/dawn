class ChangeContentTypeInDocs < ActiveRecord::Migration[5.0]
  def change
  	change_column :docs, :content, :text
  end
end
