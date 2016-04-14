#!/usr/bin/env ruby

root = {:id => 0, :title => '', :parent_id => nil}

arr = arr = [
  {:id=>1,  :title=>"A",      :parent_id=>nil}, 
  {:id=>2,  :title=>"B",      :parent_id=>nil},
  {:id=>3,  :title=>"A1",     :parent_id=>1}, 
  {:id=>4,  :title=>"A2",     :parent_id=>1},
  {:id=>5,  :title=>"A11",    :parent_id=>3}, 
  {:id=>6,  :title=>"12",     :parent_id=>3},
  {:id=>7,  :title=>"A2=121", :parent_id=>6}, 
  {:id=>8,  :title=>"A21",    :parent_id=>4},
  {:id=>9,  :title=>"B11",    :parent_id=>2}, 
  {:id=>10, :title=>"B12",    :parent_id=>2},
]

map = {}

arr.each do |e|
  map[e[:id]] = e
end

@@tree = {}

arr.each do |e|
  pid = e[:parent_id]
  if pid == nil || !map.has_key?(pid)
    (@@tree[root] ||= []) << e
  else
    (@@tree[map[pid]] ||= []) << e
  end
end

def print_tree(item, level)
  items = @@tree[item]
  unless items == nil
    indent = level > 0 ? sprintf("%#{level * 2}s", " ") : ""
    items.each do |e|
      puts "#{indent}-#{e[:title]}"
      print_tree(e, level + 1)
    end
  end
end

print_tree(root, 0)