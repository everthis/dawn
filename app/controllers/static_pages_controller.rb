class StaticPagesController < CBaseController
  before_action :logged_in_user, only: [:dev]
  # layout :resolve_layout
  # layout Proc.new{ ['index', 'new', 'create'].include?(action_name) ? 'some_layout' : 'other_layout' }
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

  def test
  end

  def contact
  end

  def passport
    @params_obj = params
  end

  def log
    # render :layout => 'blank'
    # respond_to do |format|
    #   format.html {render :layout => 'application'}
    # end
  end

  def dev
  end

  private
    # def resolve_layout
    #   case action_name
    #   when "passport", "haha"
    #     "blank"
    #   when "index"
    #     "other_layout"
    #   else
    #     "application"
    #   end
    # end
end
