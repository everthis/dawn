class ApisController < ApplicationController
  # before_action :ensure_json_request  
  before_action :logged_in_user, only: [:create, :destroy, :update ]
  before_action :correct_user,   only: :destroy

  after_filter :cors_set_access_control_headers, only: [:generate_data]
  include Tree
  include ReverseProxy::Controller

  def index
    if logged_in?
      @result = Api.paginate(page: params[:page]).order("created_at DESC")
      respond_to do |format|
        if @result.empty?
          format.json { render :json => [], status: 200 }
        else
          @apis  = @result
          format.json { render :json => @apis, :only=> [:name, :section, :uri, :method, :id, :description, :wikiLink] }
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
        @api = Api.where('uri like :search OR method like :search OR section like :search OR description like :search', search: "%#{params[:q]}%")
        format.json { render :json => @api, :only=> [:uri, :section, :description, :method] }
      end
    end
  end

  def token_generate_data
    # take care of custom headers, while rails upcases them and prepends with 'HTTP_'
    @dawn_auth_token = request.headers['HTTP_DAWN_AUTH_TOKEN']
    @user = User.find_by(auth_token: @dawn_auth_token)

    params[:dawn_uri] = params[:dawn_uri][5..-1] if params[:dawn_uri].start_with?('/mock/pc')
    @api = Api.where(uri: params[:dawn_uri]).first

    respond_to do |format|
      if @dawn_auth_token.nil?
        render_obj = { message: "Please use dawn-auth to generate token."}
      elsif @user.nil?
        render_obj = { message: "Invalid token."}
      else
        user_active_config = @user.third_party_accounts.where('is_active = ?', true)
        if user_active_config.length == 0
          active_cookie = ''
        else
          active_cookie = user_active_config[0]['account_cookies']
        end

        if @api.nil?
          render_obj = { message: "This API has not been registered on dawn."}
        else
          @api_json = @api.as_json
          req_method = request.method
          req_params = req_method == "GET" ? request.query_parameters : request.request_parameters
          except_req_params = req_params.except(:format, :dawn_uri)

          req_headers = {"Cookie" => active_cookie || "", "User-Agent" => "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "HOST" => "yi.baidu.com"
          }

          case @api.mode
          when "0"
            render_obj = process_dev_return_data(@api_json)
          when "1"
            render_obj = conditional_proxy(@api.debugAddr, @api.uri, except_req_params, req_method, req_headers)
          when "2"
            render_obj = conditional_proxy("http://yi.baidu.com", @api.uri, except_req_params, req_method, req_headers)
          end
        end

      end

      format.json {
        render :json => render_obj
      }
    end

  end

  def session_generate_data
  end

  def generate_data
    # @api = current_user.apis.where(uri: params[:uri])
    params[:dawn_uri] = params[:dawn_uri][5..-1] if params[:dawn_uri].start_with?('/mock/pc')
    @api = Api.where(uri: params[:dawn_uri]).first
    user_active_config = current_user.third_party_accounts.where('is_active = ?', true)
    puts user_active_config
    if user_active_config.length == 0
      active_cookie = ''
    else
      active_cookie = user_active_config[0]['account_cookies']
    end
    respond_to do |format|
      if @api.nil?
        render_obj = { message: "This API has not been registered on dawn."}
      else
        @api_json = @api.as_json
        # puts request.query_string
        req_method = request.method
        req_params = req_method == "GET" ? request.query_parameters : request.request_parameters
        except_req_params = req_params.except(:format, :dawn_uri)

        req_headers = {"Cookie" => active_cookie || "", "User-Agent" => "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1", "HOST" => "yi.baidu.com"
        }

        # format.json { render :json => {:message => "api found.", :data => @api }, status: 200 }
        # JSON.parse(s,:symbolize_names => true)
        # HashWithIndifferentAccess
        case @api.mode
        when "0"
          render_obj = process_dev_return_data(@api_json)
        when "1"
          render_obj = conditional_proxy(@api.debugAddr, @api.uri, except_req_params, req_method, req_headers)
        when "2"
          render_obj = conditional_proxy("http://yi.baidu.com", @api.uri, except_req_params, req_method, req_headers)
        end
      end
      format.json {
        render :json => render_obj
      }
    end
  end

  private
    def cors_set_access_control_headers
      headers['Access-Control-Allow-Origin'] = '*'
    end

    def max_key_id(column_hash)
      column_hash.keys.max
    end
    def min_key_id(column_hash)
      column_hash.keys.min
    end
    def sort_key_id(column_hash)
      column_hash.keys.sort
    end
    def conditional_proxy(url, uri, except_req_params, req_method, req_headers)
      return_sth = nil
      reverse_proxy url, path: uri, params: except_req_params, method: req_method, headers: req_headers do |config|
        config.on_complete do |code, response|
          return_sth = response.body
        end
      end
      return_sth
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

    def process_dev_return_data(api_json)
      nodes_arr = api_json['nodes']

      root_node = Tree::TreeNode.new("ROOT", "Root Content")
      tree_data_root_node = Tree::TreeNode.new("node-0", "tree root")
      root_node.add(tree_data_root_node)

      column_hash = to_column_hash(nodes_arr)
      max_parent_id = max_key_id(column_hash)
      min_parent_id = min_key_id(column_hash)
      sorted_id_arr = sort_key_id(column_hash)

      nodes_hash = nodes_arr_to_hash(nodes_arr)

      sorted_id_arr.each { |el|
        per_column_arr = column_hash[el]

        tree_data_root_node.breadth_each { |node|
          if node.name == "node-#{el}" then
            per_column_arr.each { |ele|
              node.add(Tree::TreeNode.new("node-#{ele}", nodes_hash[ele]))
            }
          end
        }
      }

      tree_data_root_hash = construct_json(tree_data_root_node)
      tree_data_root_hash.content['node_hash']
    end
    
    def construct_json(subtree)
      return_hash = Hash.new
      subtree.postordered_each { |node| 
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
      when "Integer"
        node_data['dataValue'].to_i
      when "Float"
        node_data['dataValue'].to_f
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
                                   :mode, 
                                   :debugAddr, 
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
                                                    :dataQuantity,
                                                    :hasChild 
                                                   ]
                                            }
                                           ]
                                   }, 
                                   {dimensions: [:hUnit, 
                                                :vUnit
                                               ]
                                   },
                                   :wikiLink 
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

    def token_correct_user
      @user = User.find(params[:token])
      redirect_to root_url if @user.nil?
    end

end

