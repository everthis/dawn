class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :set_i18n_locale_from_params

  protect_from_forgery with: :exception


  include SessionsHelper


  def hello
    render text: "hello, world!"
  end

  private

    # Confirms a logged-in user.
    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end

    def set_i18n_locale_from_params
      app_default_locale = params[:locale] ||
                       (current_user && current_user.user_preference.locale) ||
                       I18n.default_locale
      app_default_locale = app_default_locale.to_s if app_default_locale.instance_of? Symbol
      if app_default_locale
        if I18n.available_locales.map(&:to_s).include?(app_default_locale)
          I18n.locale = app_default_locale
        else
          flash.now[:notice] =
            "#{params[:locale]} translation not available"
          logger.error flash.now[:notice]
        end
      end
    end
end
