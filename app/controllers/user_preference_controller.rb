class UserPreferenceController < ApplicationController
	before_action :correct_user,   only: [:edit, :update, :set_locale]
	def index
	  @pref = UserPreference.all.includes(:user)
	end

	def show
	  @pref = current_user.user_preference
	end

	def new
	  @user_pref = current_user.user_preference || UserPreference.new
	end

	def edit
	  @user = current_user
	end

	
	def create
	  @pref = current_user.user_preference.build(preference_params)
	  if @pref.save
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
	  @pref.destroy
	  flash[:success] = "Micropost deleted"
	  redirect_to request.referrer || root_url
	end

	def set_locale
		puts request.body.read
		current_user.user_preference.update(preference_params)
	end
	def postback
	    puts request.body.read    
	end

  private

    def preference_params
      params.require(:user_preference).permit(:locale)
    end


end
