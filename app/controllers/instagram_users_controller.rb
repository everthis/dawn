class InstagramUsersController < ApplicationController

  skip_before_action :verify_authenticity_token
  # wrap_parameters InstagramUser
  wrap_parameters false
  before_action :authenticate_request
  attr_reader :current_user

  def index
    @users = InstagramUser.paginate(page: params[:page])
    respond_to do |format|
      if @users.empty?
        format.json { render :json => [], status: 200 }
      else
        format.json { render :json => @users, :only=> [:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url] }
      end
    end
  end

  def edit
  end

  def create
    if params['_json'].is_a? Array
      @users = params['_json']
    else
      @users = [params['_json']]
    end
    @users = @users.map { |el| InstagramUser.new(instagram_users_params(el)) }
    begin
      ActiveRecord::Base.transaction do
        @users.each do |user|
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

    def instagram_users_params(param)
      # param.require(:instagram_user).permit(:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url)
      param.permit(:account_is_private, :user_id, :media_count, :user_name, :profile_pic_url)
    end

end

