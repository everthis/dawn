module GistsHelper
	class RenderWithoutCode < Redcarpet::Render::HTML
	  def block_code(code, language)
	    code
	  end

	  def paragraph(text)
	  	text+'oop'
	  end

	end
end
