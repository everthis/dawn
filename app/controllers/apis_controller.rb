class ApisController < ApplicationController
  # before_action :ensure_json_request  
  before_action :logged_in_user, only: [:create, :destroy, :update ]
  before_action :correct_user,   only: :destroy

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
    @api = current_user.apis.where(uri: params[:uri])
    @api_json = @api.as_json[0]
    respond_to do |format|
      # format.json { render :json => {:message => "Nothing found.", :data => @api }, status: 200 }
      # JSON.parse(s,:symbolize_names => true)
      # HashWithIndifferentAccess
      arr = Array.new(@api_json['nodes'][0]['data']['dataQuantity'].to_i){ |i| {"#{@api_json['nodes'][0]['data']['dataType']}" => @api_json['nodes'][0]['data']['dataValue']} }
      format.json {
        render :json => arr
        # render :json => {
        #         :"#{@api_json['nodes'][0]['data']['dataType']}" => "#{@api_json['nodes'][0]['data']['dataValue']}"
        #       }
      }
    end
  end

  private

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

