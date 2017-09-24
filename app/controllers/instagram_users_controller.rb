require 'pagination_list_link_renderer'
class InstagramUsersController < ApplicationController
  before_action :set_instagram_user, only: [:show, :edit, :update, :destroy]

  # GET /instagram_users
  # GET /instagram_users.json
  def index
    # @instagram_users = InstagramUser.all
    if logged_in?
      @instagram_users = InstagramUser.paginate(page: params[:page])
    end
  end

  # GET /instagram_users/1
  # GET /instagram_users/1.json
  def show
  end

  # GET /instagram_users/new
  def new
    @instagram_user = InstagramUser.new
  end

  # GET /instagram_users/1/edit
  def edit
  end

  # POST /instagram_users
  # POST /instagram_users.json
  def create
    @instagram_user = InstagramUser.new(instagram_user_params)

    respond_to do |format|
      if @instagram_user.save
        format.html { redirect_to @instagram_user, notice: 'Instagram user was successfully created.' }
        format.json { render :show, status: :created, location: @instagram_user }
      else
        format.html { render :new }
        format.json { render json: @instagram_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /instagram_users/1
  # PATCH/PUT /instagram_users/1.json
  def update
    respond_to do |format|
      if @instagram_user.update(instagram_user_params)
        format.html { redirect_to @instagram_user, notice: 'Instagram user was successfully updated.' }
        format.json { render :show, status: :ok, location: @instagram_user }
      else
        format.html { render :edit }
        format.json { render json: @instagram_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /instagram_users/1
  # DELETE /instagram_users/1.json
  def destroy
    @instagram_user.destroy
    respond_to do |format|
      format.html { redirect_to instagram_users_url, notice: 'Instagram user was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_instagram_user
      @instagram_user = InstagramUser.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def instagram_user_params
      params.require(:instagram_user).permit(:user_id, :account_is_private, :media_count, :user_name, :profile_pic_url)
    end
end
