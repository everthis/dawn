class AccountActivationsController < ApplicationController

  def new
  end

  def edit
    user = User.find_by(email: params[:email])
    if user && !user.activated? && user.authenticated?(:activation, params[:id])
      user.activate
      log_in user
      flash[:success] = "Account activated!"
      redirect_to user
    else
      flash[:danger] = "Invalid activation link"
      redirect_to root_url
    end
  end

  def create
    user = User.find_by(email: user_params[:email])
    if user && !user.activated?
      user.send_activation_email
      flash[:info] = "Please check your email to activate your account."
      redirect_to root_url      
    else
      flash.now[:danger] = 'Email not registered or already activated.'
      render 'new'
    end
  end

  private

    def user_params
      params.require(:account_activations).permit(:email)
    end

end