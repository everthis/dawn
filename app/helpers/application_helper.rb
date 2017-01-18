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

  def client_javascript_include_tag(name, name_attr = '')
    filename = "#{name}-bundle.js"
    src = "/assets/#{filename}"

    if Rails.env.development?
    elsif Rails.configuration.webpack[:manifest]
      asset_name = Rails.configuration.webpack[:manifest]["#{name}.js"]
      if asset_name
        src = "/assets/#{asset_name}"
      end
    end
    "<script src=\"#{src}\" name=\"#{name_attr}\"></script>".html_safe
  end

  def c_javascript_include_tag(*sources)
    options = sources.extract_options!.stringify_keys
    path_options = options.extract!('protocol', 'extname', 'host').symbolize_keys
    sources.uniq.map { |source|
      tag_options = {
        "src" => path_to_javascript(source, path_options)
      }.merge!(options)
      content_tag("script".freeze, "", tag_options)
    }.join("\n").html_safe
  end



  def client_stylesheet_link_tag(name)
    filename = "#{name}-bundle.css"
    # asset_url = Rails.application.config.asset_host
    src = "/assets/#{filename}"

    if Rails.env.development?
    elsif Rails.configuration.webpack[:manifest]
      asset_name = Rails.configuration.webpack[:manifest]["#{name}.css"]
      if asset_name
        src = "/assets/#{asset_name}"
      end
    end
    "<link rel=\"stylesheet\" href=\"#{src}\">".html_safe
  end

  def c_stylesheet_link_tag(*sources)
    options = sources.extract_options!.stringify_keys
    path_options = options.extract!('protocol', 'host').symbolize_keys

    sources.uniq.map { |source|
      tag_options = {
        "rel" => "stylesheet",
        "media" => "screen",
        "href" => path_to_stylesheet(source, path_options)
      }.merge!(options)
      tag(:link, tag_options)
    }.join("\n").html_safe
  end

  def webpack_manifest_script
    return '' unless Rails.configuration.webpack[:use_manifest]
    javascript_tag "window.webpackManifest = #{Rails.configuration.webpack[:common_manifest]}"
  end

  def webpack_bundle_tag(bundle)
    src =
      if Rails.configuration.webpack[:use_manifest]
        manifest = Rails.configuration.webpack[:asset_manifest]
        filename = manifest[bundle]

        "#{compute_asset_host}/assets/#{filename}"
      else
        "#{compute_asset_host}/assets/#{bundle}-bundle"
      end

    javascript_include_tag(src)
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

  def secure_path_for(params, *excluded_params)
    url_for(params.except(*excluded_params).merge(only_path: true))
  end

end
