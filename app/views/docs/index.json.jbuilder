json.array!(@docs) do |doc|
  json.extract! doc, :id, :title, :content
  json.url doc_url(doc, format: :json)
end
