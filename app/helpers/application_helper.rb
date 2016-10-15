module ApplicationHelper
  # Returns the full title on a per-page basis.
  def full_title(page_title = '')
    base_title = "Dawn"
    if page_title.empty?
      base_title
    else
      page_title + " | " + base_title
    end
  end

  def markdown(text)
    options = [:hard_wrap, :filter_html, :autolink, :no_intraemphasis, :fenced_code, :gh_blockcode]
    syntax_highlighter(Redcarpet.new(text, *options).to_html).html_safe
  end

  def syntax_highlighter(html)
    doc = Nokogiri::HTML(html)
    doc.search("//pre[@lang]").each do |pre|
      pre.replace Albino.colorize(pre.text.rstrip, pre[:lang])
    end
    doc.to_s
  end

  class CodeRayify < Redcarpet::Render::HTML
    def block_code(code, language)
      language = "plain" if language.nil?
      CodeRay.scan(code, language).div
    end
  end

  def markdown2(text)
    options = {
      filter_html: true, 
      hard_wrap: true,
      no_links: false
    }

    coderayified = CodeRayify.new(options)

    extensions = {
      fenced_code_blocks: true,
      no_intra_emphasis: true,
      autolink: true,
      strikethrough: true,
      lax_html_blocks: true,
      superscript: true,
      lax_spacing: true
    }

    # renderer = Redcarpet::Render::HTML.new(options)
    # store the markdown parser in a class variable, it could be used later without having to initialize the renderer and parser again.
    # Using the @class_var ||= Some.new() idiom is a great way to prevent having to init heavy classes later in the request.
    # text_mod = File.read(File.expand_path("../views/static_pages/docs.md", File.dirname(__FILE__)))
    @markdown ||= Redcarpet::Markdown.new(coderayified, extensions)

    @markdown.render(text).html_safe
  end

  def c_current_path(path)
    "current" if current_page?(path)
  end

end
