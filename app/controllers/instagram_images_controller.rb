class InstagramImagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  # wrap_parameters :instagram_images
  wrap_parameters false
  before_action :authenticate_request
  # attr_reader :current_user

  def index
    @instagram_images = (params[:owner_id] ? InstagramImage.where(owner_id: params[:owner_id]) : InstagramImage).paginate(page: params[:page]).order("created_at DESC")
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

  def notDownloadedImages
    records = InstagramImage.where(downloaded: false).select("id, owner_id, url, thumbnail")
    render json: records, status: :ok
  end

  def userImagesCodes
    records = InstagramImage.where(owner_id: params[:owner_id])
    codes = records.map { |el| el.code }
    render json: codes, status: :ok
  end

  def imagesByOwnerId
    user_images_records = InstagramImage.where(owner_id: params[:owner_id])
    user_images = user_images_records.map { |el| {:url => el.url, :thumbnail => el.thumbnail} }
    render :json => {:ownerId => params[:owner_id], :imgsArr => user_images}
  end

  private

    def instagram_images_params
      # params.require(:instagram_images).permit(:code, :url, { :dimensions => [:height, :width] }, :type, :owner_id, :owner_name)
      params.permit(instagram_images: [:code, :url, {dimensions: [:height, :width]}, :media_type, :owner_id, :thumbnail, :downloaded, :timestamp, :caption]).require(:instagram_images)
    end

    def search_params
      params.
        permit(:owner_id, :page).
        delete_if {|key, value| value.blank? }
    end

end
