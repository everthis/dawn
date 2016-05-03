class AddWikiLinkToApis < ActiveRecord::Migration
  def change
  	add_column :apis, :wikiLink, :string
  end
end
