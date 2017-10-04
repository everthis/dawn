class InstagramUsersController < ApplicationController

  skip_before_action :verify_authenticity_token
  # wrap_parameters InstagramUser
  wrap_parameters false
  before_action :authenticate_request, :except => [:queryInstagramUserId]
  # attr_reader :current_user

  def index
    @instagram_users = InstagramUser.paginate(page: params[:page]).order("created_at ASC")
    respond_to do |format|
      if @instagram_users.empty?
        format.html { render 'index'}
        format.json { render :json => [], status: 200 }
      else
        format.html { render 'index'}
        format.json { render :json => @instagram_users, :only=> [:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url] }
      end
    end
  end

  def edit
  end

  def create
    @instagram_users = instagram_users_params.map { |el| InstagramUser.new(el) }
    begin
      ActiveRecord::Base.transaction do
        @instagram_users.each do |user|
          user.save
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

  def all_instagram_users_id
    users = InstagramUser.all.map { |el| el.user_id }
    render json: users, status: :ok
  end

  def media_count
    users_media_count = InstagramUser.all.map { |el| {:id => el.user_id, :count => el.media_count, :username => el.user_name} }
    respond_to do |format|
      format.json {render :json => users_media_count}
    end
  end

  def profile_pics
    users_profile_pics = InstagramUser.all.map { |el| {:id => el.user_id, :profile_pic_url => el.profile_pic_url } }
    render json: users_profile_pics, status: :ok
  end

  def queryInstagramUserId
    respond_to do |format|
      unless params[:q].blank?
        @instagram_users = InstagramUser.where('user_name like :search', search: "%#{params[:q]}%").limit(10)
        format.json { render :json => @instagram_users, :only=> [:account_is_private, :user_id, :user_name, :profile_pic_url] }
      end
    end
  end

  private

    def instagram_users_params
      params.permit(instagram_users: [:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url]).require(:instagram_users)
      # params.require(:instagram_users).map do |p|
        # ActionController::Parameters.new(p.to_unsafe_h).permit(:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url)
        # ActionController::Parameters.new(p.to_hash).permit(:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url)
      # end
    end

end

