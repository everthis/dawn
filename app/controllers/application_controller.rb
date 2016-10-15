class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
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
end
