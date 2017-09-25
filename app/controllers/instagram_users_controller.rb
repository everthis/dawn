class InstagramUsersController < ApplicationController

  skip_before_action :verify_authenticity_token
  # wrap_parameters InstagramUser
  wrap_parameters false
  before_action :authenticate_request
  # attr_reader :current_user

  def index
    @instagram_users = InstagramUser.paginate(page: params[:page])
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

  private

    def instagram_users_params
      params.permit(instagram_users: [:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url]).require(:instagram_users)
      # params.require(:instagram_users).map do |p|
        # ActionController::Parameters.new(p.to_unsafe_h).permit(:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url)
        # ActionController::Parameters.new(p.to_hash).permit(:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url)
      # end
    end

end

