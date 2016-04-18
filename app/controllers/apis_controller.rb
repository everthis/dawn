class ApisController < ApplicationController
  # before_action :ensure_json_request  
  before_action :logged_in_user, only: [:create, :destroy, :update ]
  before_action :correct_user,   only: :destroy

  include Tree
  def index
    if logged_in?
      @result = current_user.apis.paginate(page: params[:page]).order("created_at DESC")
      respond_to do |format|
        if @result.empty?
          format.json { render :json => {:message => "Nothing found." }, status: :unprocessable_entity }
        else
          @apis  = @result
          format.json { render :json => @apis, :only=> [:name, :section, :uri, :method, :id, :description] }
          # format.json { render :json => @apis, :except=> [:nodes, :dimensions] }
        end
      end

      # @apis = Api.paginate(page: params[:page]).order("created_at DESC")
    end 
  end

  def create
    @api = current_user.apis.build(api_params)
    respond_to do |format|
      if @api.save
        format.json { render :json => {:data => @api, :message => "API has been created successfully."} }
      else
        format.json { render :json => {:error => @api.errors.full_messages.to_sentence }, status: :unprocessable_entity }
      end
    end
  end

  def show
    @api = Api.find(params[:id])
    respond_to do |format|
      format.json { render :json => @api }
    end
  end

  def update
    @api = Api.find(params[:id])
    respond_to do |format|
      if @api.update_attributes(api_params)
        format.json { render :json => {:data => @api, :message => "API has been updated successfully."} }
        # flash[:success] = "api updated"
      else
        format.json { render :json => {:error => @api.errors.full_messages.to_sentence }, status: :unprocessable_entity }
        # render 'edit'
      end
    end
  end

  def destroy
    @api = Api.find(params[:id])
    respond_to do |format|
      if @api.destroy
        format.json { render :json => {:status => "Ok", :message => "API has been deleted."} }
      else
        format.json { render json: @api.errors, status: :unprocessable_entity }
      end
    end
  end

  def query
    respond_to do |format|
      unless params[:q].blank?
        @api = current_user.apis.where('uri like :search OR method like :search OR section like :search OR description like :search', search: "%#{params[:q]}%")
        format.json { render :json => @api, :only=> [:uri, :section, :description, :method] }
      end
    end
  end

  def generate_data
    # @api = current_user.apis.where(uri: params[:uri])
    @api = Api.where(uri: params[:uri])
    @api_json = @api.as_json[0]
    respond_to do |format|
      # format.json { render :json => {:message => "api found.", :data => @api }, status: 200 }
      # JSON.parse(s,:symbolize_names => true)
      # HashWithIndifferentAccess
      nodes_arr = @api_json['nodes']

      root_node = Tree::TreeNode.new("ROOT", "Root Content")
      tree_data_root_node = Tree::TreeNode.new(0, "tree root")
      root_node.add(tree_data_root_node)

      column_hash = to_column_hash(nodes_arr)
      max_parent_id = max_key_id(column_hash)
      min_parent_id = min_key_id(column_hash)
      sorted_id_arr = sort_key_id(column_hash)

      nodes_hash = nodes_arr_to_hash(nodes_arr)

      sorted_id_arr.each { |el|
        per_column_arr = column_hash[el]

        tree_data_root_node.breadth_each { |node|
          if node.name == el then
            per_column_arr.each { |ele|
              node.add(Tree::TreeNode.new(ele, nodes_hash[ele]))
            }
          end
        }
      }

      tree_data_root_node.print_tree
      tree_data_root_hash = construct_json(tree_data_root_node)    
      format.json {
        render :json => tree_data_root_hash.content['node_hash']
      }
    end
  end

  private

    def max_key_id(column_hash)
      column_hash.keys.max
    end
    def min_key_id(column_hash)
      column_hash.keys.min
    end
    def sort_key_id(column_hash)
      column_hash.keys.sort
    end
    def nodes_arr_to_hash(nodes_arr)
      nodes_hash = Hash.new
      nodes_arr.each { |el| 
        next if el['nodeId'] == 0
        nodes_hash[el['nodeId']] = el['data']
      }
      nodes_hash
    end

    def is_number? string
      true if Float(string) rescue false
    end

    def to_f_or_i_or_s(v)
      ((float = Float(v)) && (float % 1.0 == 0) ? float.to_i : float) rescue v
    end
    
    def construct_json(subtree)
      return_hash = Hash.new
      subtree.postordered_each { |node| 
        puts node.name
        # next if node.content == "tree root"
        if node.is_leaf? then
          node.content.is_a?(Hash) ? node.content['node_hash'] = node_val(node.content) :  node.content = {"node_hash" => Hash.new }
        else
          node.content.is_a?(Hash) ? node.content['node_hash'] = Hash.new :  node.content = {"node_hash" => Hash.new }
        end
        if node.has_children? then
          node.children { |el| 
            el.parent.content['node_hash']["#{el.content['dataName']}"] = el.content['node_hash']
          }
          if node.content['dataQuantity'].to_i == 1 && node.content['dataType'] == 'Array'
            node.content['node_hash'] = [node.content['node_hash']]
          elsif node.content['dataQuantity'].to_i > 1            
            node.content['node_hash'] = Array.new(node.content['dataQuantity'].to_i, node.content['node_hash'])
          end
        end
      }
      subtree
    end

    def to_column_hash(arr)
      parent_hash = Hash.new
      arr.each { |ele| 
        parent_hash.has_key?(ele['parentId']) ? (parent_hash[ele['parentId']] << ele['nodeId']) : parent_hash[ele['parentId']] = [ele['nodeId']] unless ele['parentId'].nil?
      }
      p parent_hash
      parent_hash
    end

    def to_tree(arr)
      nested_hash = Hash[arr.map{|e| [e[:nodeId], e.merge(children: [])]}]
      nested_hash.each do |id, item|
        parent = nested_hash[item[:parentId]]
        parent[:children] << item if parent
      end
      nested_hash.select { |id, item| item[:parentId].nil? }.values
    end

    def node_val(node_data)
      case node_data['dataType']
      when "String"
        node_data['dataValue'].to_s
      when "Number"
        node_data['dataValue'].to_i
      when "Boolean"
        to_boolean(node_data['dataValue'])
      when "Null"
        nil
      when "Regex"
        str = node_data['dataValue']
        reg = Regexp.new str
        reg.examples(max_repeater_variance: 2, max_group_results: 6, max_results_limit: 10000).sample
      else
        "You gave me #{node_data['dataValue']} -- I have no idea what to do with that."
      end
    end

    def to_boolean(str)
      str.downcase == 'true'
    end

    def api_params
      params.require(:api).permit([:method, 
                                   :name, 
                                   :description, 
                                   :uri, 
                                   :section, 
                                   {nodes: [:nodeId, 
                                            :key, 
                                            :column, 
                                            :childrenlevel, 
                                            :totaloffsetylevel, 
                                            :parentId, 
                                            :quantity, 
                                            :value, 
                                            {data: [:dataType, 
                                                    :dataName, 
                                                    :dataValue, 
                                                    :dataQuantity
                                                   ]
                                            }
                                           ]
                                   }, 
                                   {dimensions: [:hUnit, 
                                                :vUnit
                                               ]
                                   } 
                                  ])
    end

    def ensure_json_request  
      return if request.format == :json
      render :nothing => true, :status => 406  
    end 

    def correct_user
      @api = current_user.apis.find_by(id: params[:id])
      redirect_to root_url if @api.nil?
    end

end

