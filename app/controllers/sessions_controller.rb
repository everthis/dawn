class SessionsController < CBaseController
	def new
	end

	def create
	  user = User.find_by(email: params[:session][:email].downcase)
	  if user && user.authenticate(params[:session][:password])
	    # # Log the user in and redirect to the user's show page.
	    # log_in user
	    # params[:session][:remember_me] == '1' ? remember(user) : forget(user)
	    # redirect_back_or user
	    
	    if user.activated?
	      log_in user
	      sign_user_id_to_cookie user
	      params[:session][:remember_me] == '1' ? remember(user) : forget(user)
	      # redirect_back_or user
	      redirect_back_or root_url
	    else
	      message  = "Account not activated. "
	      message += "Check your email for the activation link."
	      flash[:danger] = message
	      redirect_to root_url
	    end
	    
	  else
	    # Create an error message.
	    flash.now[:danger] = 'Invalid email/password combination'
	    render 'new'
	  end
	end

	def destroy
		log_out if logged_in?
		redirect_to root_url
	end
end
