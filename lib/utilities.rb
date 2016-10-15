require 'uri'
require 'cgi'
class Utilities
  # http://codereview.stackexchange.com/questions/28917/replace-url-parameters-with-ruby
  def self.remove_param_from_url(url, options = {})
	uri = URI.parse(URI.encode(url))
	hquery = CGI::parse(uri.query)
	components = Hash[uri.component.map { |key| [key, uri.send(key)] }]
	new_hquery = hquery.merge(options[:merge_query] || {}).select { |k, v| v }
	new_query = URI.encode_www_form(new_hquery)
	new_components = {path: options[:path] || uri.path, query: new_query}
	new_uri = URI::Generic.build(components.merge(new_components))
	URI.decode(new_uri.to_s)
  end

end