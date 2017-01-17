class CBaseController < ApplicationController
	layout :resolve_layout

	private
	  def resolve_layout
	  	params['spf'] ? "c_base_spf.json" : "c_base"
	  end
end
