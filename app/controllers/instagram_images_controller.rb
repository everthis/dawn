class InstagramImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  wrap_parameters InstagramImage
  before_action :authenticate_request
  attr_reader :current_user

  def index
    @images = InstagramImage.paginate(page: params[:page])
    respond_to do |format|
      if @images.empty?
        format.json { render :json => [], status: 200 }
      else
        format.json { render :json => @images, :only=> [:code, :url, :dimensions, :type, :owner_id, :owner_name] }
      end
    end
  end

  def edit
  end

  def create
    # @images = [params] unless params.is_a? Array
    # if params.is_a? Array
    #   @images = params
    # else
    #   @images = [params]
    # end
    # @images = @images.map { |el| InstagramImage.new(instagram_images_params(el)) }
    @images = instagram_images_params.map { |el| InstagramImage.new(el) }
    begin
      ActiveRecord::Base.transaction do
        @images.each do |image|
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
      params.permit(instagram_images: [:code, :url, { :dimensions => [:height, :width] }, :type, :owner_id, :owner_name]).require(:instagram_images)
    end

end
