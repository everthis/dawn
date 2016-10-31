class UserPreferenceController < ApplicationController

	def index
	  @prefs = UserPreference.all.includes(:user)
	end

	def show
	  @prefs = current_user.user_preference
	end

	def new
	  @micropost = UserPreference.new
	end

	def edit
	  @user = current_user
	end

	
	def create
	  @prefs = current_user.user_preference.build(preference_params)
	  if @prefs.save
	    flash[:success] = "Micropost created!"
	    redirect_to root_url
	  else
	    @feed_items = []
	    render 'static_pages/home'
	  end
	end 

	def update
	  respond_to do |format|

	  end
	end

	def destroy
	  @prefs.destroy
	  flash[:success] = "Micropost deleted"
	  redirect_to request.referrer || root_url
	end

	def set_locale
		@prefs = current_user.user_preference
		flash[:danger] = 'preference nil' if @prefs.nil?
	end

  private

    def preference_params
      params.permit(:locale)
    end


end
