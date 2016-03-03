class ApisController < ApplicationController
  # before_action :ensure_json_request  

  def index
    @apis = Api.paginate(page: params[:page])
    respond_to do |format|
      format.json { render :json => @apis }
    end
  end

  def create
    @api = Api.new(user_params)
    respond_to do |format|
      if @api.save
        format.json { render :json => @api }
      else
        format.json { render json: @api.errors, status: :unprocessable_entity }
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
      if @api.update_attributes(user_params)
        format.json { render :json => @api }
        # flash[:success] = "api updated"
      else
        format.json { render json: @api.errors, status: :unprocessable_entity }
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

  private

    def user_params
      params.require(:api).permit(:method, :name, :uri, :section, :data )
    end

    def ensure_json_request  
      return if request.format == :json
      render :nothing => true, :status => 406  
    end 

end

