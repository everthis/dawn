class AddWikiLinkToApis < ActiveRecord::Migration[4.2]
  def change
  	add_column :apis, :wikiLink, :string
  end
end
