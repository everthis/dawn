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
  end
end
