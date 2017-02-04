class UserPreferenceController < CBaseController
	before_action :logged_in_user,  only: [:index, :edit, :update, :set_locale]
	before_action :set_user_locale, only: [:update]
	def index
	  @user_pref = current_user.user_preference
    if @user_pref.nil?
      @user_pref = current_user.create_user_preference
    end
	end

	def show
	  @user_pref = current_user.user_preference || UserPreference.new
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
		@user_pref = current_user.user_preference
		@user_pref.update(preference_params)
	end

	def destroy
	  @pref.destroy
	  flash[:success] = "Micropost deleted"
	  redirect_to request.referrer || root_url
	end

	def set_locale
		@user_pref = current_user.user_preference
		@user_pref.update(preference_params)
	end

	def postback
	    puts request.body.read
	end

  private

    def preference_params
      params.require(:user_preference).permit(:locale)
    end

    def set_user_locale
		I18n.locale = params[:user_preference][:locale]
    end

end
