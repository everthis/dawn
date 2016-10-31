class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :set_i18n_locale_from_params
  
  protect_from_forgery with: :exception
  include SessionsHelper
  
  def hello
    render text: "hello, world!"
  end

  def default_render(*args)
    if params[:spf] == 'navigate'
      params.delete :spf
      render "#{controller_name}/spf_#{action_name}.json"
    else
      super
    end
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
      if params[:locale]
        if I18n.available_locales.map(&:to_s).include?(params[:locale])
          I18n.locale = params[:locale]
        else
          flash.now[:notice] = 
            "#{params[:locale]} translation not available"
          logger.error flash.now[:notice]
        end
      end
    end
end
