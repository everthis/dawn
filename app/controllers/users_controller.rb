class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy, :following, :followers]
  before_action :correct_user,   only: [:edit, :update, :get_token]
  before_action :admin_user,     only: :destroy
  # before_action :authenticate,   only: [:]

  def index
  	# @users = User.all
      @users = User.includes(:following).paginate(page: params[:page])
  end

	def show
	  @user = User.find(params[:id])
	  @microposts = @user.microposts.paginate(page: params[:page])
	end

	def new
	  @user = User.new
	end

	def edit
	  @user = User.find(params[:id])
	  @user_pref = current_user.user_preference
	end

	def destroy
	  User.find(params[:id]).destroy
	  flash[:success] = "User deleted"
	  redirect_to users_url
	end

	def create
	  # @user = User.new(params[:user]) # don't use this for the sake of security
	  @user = User.new(user_params)
	  if EmailWhitelist.exists?(email: user_params[:email])
		  if @user.save
		    @user.send_activation_email
		    flash[:info] = "Please check your email to activate your account."
		    redirect_to root_url
		  else
		    render 'new'
		  end
	  else
	  	flash.now[:danger] = 'Email address not in whitelist.'
	  	render 'new'
	  end
	end



	def update
	  @user = User.find(params[:id])
	  if @user.update_attributes(user_params)
	    flash[:success] = "Profile updated"
	    redirect_to @user
	  else
	    render 'edit'
	  end
	end

	def following
	  @title = "Following"
	  @user  = User.find(params[:id])
	  @users = @user.following.paginate(page: params[:page])
	  # render 'show_follow'
	end

	def followers
	  @title = "Followers"
	  @user  = User.find(params[:id])
	  @users = @user.followers.paginate(page: params[:page])
	  # render 'show_follow'
	end

	def settings
	  @user_pref = current_user.user_preference
	end

	def get_token
		# @user = User.find(params[:id])
		current_user.set_auth_token if current_user.auth_token.nil?
		# respond_to do |format|
		# 	format.html { render :get_token }
		# 	# format.json { render :get_token }
		# 	format.json { render :json => @user, :only=> [:auth_token] }
		# end
	end

	def del_token
	end

	def new_token
	end

	def cli_login
	  @user = User.find_by(name: params[:name])
	  respond_to do |format|
		  if @user && @user.authenticate(params[:password])
		    if @user.activated?
		      format.json { render :json => @user, only: [:name, :auth_token, :email] }
		    else
		      format.json { render :json => {:message => "Hi, account has not been activated."} }
		    end
		  else
		      format.json { render :json => {:message => "Sorry, username and password not match."} }
		  end
		end
	end

	private

	  def user_params
	    params.require(:user).permit(:name, :email, :password, :password_confirmation, :avatars)
	  end

	  # Confirms the correct user.
	  def correct_user
	    @user = User.find(params[:id])
			redirect_to(root_url) unless current_user?(@user) || current_user.admin?
	  end

	  # Confirms an admin user.
	  def admin_user
	    redirect_to(root_url) unless current_user.admin?
	  end

	  def authenticate
	    authenticate_token || render_unauthorized
	  end

	  def authenticate_token
	    authenticate_with_http_token do |token, options|
	      User.find_by(auth_token: token)
	    end
	  end

	  def render_unauthorized
	    self.headers['WWW-Authenticate'] = 'Token realm="Application"'
	    render json: 'Bad credentials', status: 401
	  end


end
