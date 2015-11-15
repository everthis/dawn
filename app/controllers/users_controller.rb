class UsersController < ApplicationController
	def show
	  @user = User.find(params[:id])
	  # debugger
	end
	
	def new
	  @user = User.new	
	end

	def edit
	  @user = User.find(params[:id])
	end

	def create
	  # @user = User.new(params[:user]) # don't use this for the sake of security
	  @user = User.new(user_params)
	  if @user.save
	  	log_in @user
	    # Handle a successful save.
	    flash[:success] = "Welcome to the Sample App!"
	    redirect_to @user
	  else
	    render 'new'
	  end
	end

	private

	  def user_params
	    params.require(:user).permit(:name, :email, :password, :password_confirmation)
	  end
end
