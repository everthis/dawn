class ApisController < ApplicationController
  def index
  	@apis = Api.paginate(page: params[:page])
  end

  def api
    @api = Api.find(params[:id])
  end

  def detail
  end

  def show
  	@api = Api.find(params[:id])
    respond_to do |format|
      format.html { render :json => @api }
    end
  end
end
