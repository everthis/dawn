class StaticPagesController < ApplicationController
  before_action :logged_in_user, only: [:dev]
  def home
    if logged_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.includes(:user).paginate(page: params[:page])
    end 
  end

  def help
  end

  def about
  end
  
  def contact
  end

  def log
  end
  
  def dev

  end
end
