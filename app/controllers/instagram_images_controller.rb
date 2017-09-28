class InstagramImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # wrap_parameters :instagram_images
  wrap_parameters false
  before_action :authenticate_request
  # attr_reader :current_user

  def index
    @instagram_images = InstagramImage.paginate(page: params[:page]).order("created_at DESC")
    respond_to do |format|
      if @instagram_images.empty?
        format.html { render 'index'}
        format.json { render :json => [], status: 200 }
      else
        format.html { render 'index'}
        format.json { render :json => @instagram_images, :only=> [:code, :url, :dimensions, :type, :owner_id, :owner_name] }
      end
    end
  end

  def edit
  end

  def create
    # @instagram_images = [params] unless params.is_a? Array
    # if params.is_a? Array
    #   @instagram_images = params
    # else
    #   @instagram_images = [params]
    # end
    # @instagram_images = @instagram_images.map { |el| InstagramImage.new(instagram_images_params(el)) }
    @instagram_images = instagram_images_params.map { |el| InstagramImage.new(el) }
    begin
      ActiveRecord::Base.transaction do
        @instagram_images.each do |image|
          image.save
        end
      end
      render :json => {:status => 'success', :msg => ''}
    rescue => ex
      logger.error ex.message
      render :json => {:status => 'error', :msg => ex.message}
    end
  end

  def update
  end

  def destroy
  end

  private

    def instagram_images_params
      # params.require(:instagram_images).permit(:code, :url, { :dimensions => [:height, :width] }, :type, :owner_id, :owner_name)
      params.permit(instagram_images: [:code, :url, {dimensions: [:height, :width]}, :media_type, :owner_id, :thumbnail]).require(:instagram_images)
    end

end
