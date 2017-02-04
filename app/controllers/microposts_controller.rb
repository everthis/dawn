class MicropostsController < CBaseController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy

  # GET /microposts
  # GET /microposts.json
  def index
    @microposts = Micropost.all.includes(:user)
  end

  # GET /microposts/1
  # GET /microposts/1.json
  def show
  end

  # GET /microposts/new
  def new
    @micropost = Micropost.new
  end

  # GET /microposts/1/edit
  def edit
  end

 
  def create
    @micropost = current_user.microposts.build(micropost_params)
    if @micropost.save
      flash.now[:success] = "Micropost created!"
      if logged_in?
        @micropost  = current_user.microposts.build
        @feed_items = current_user.feed.includes(:user).paginate(page: params[:page])
      end
      render 'static_pages/home'
      
      # redirect_to root_url
    else
      @feed_items = []
      render 'static_pages/home'
    end
  end 

  def update
    respond_to do |format|
      if @micropost.update(micropost_params)
        format.html { redirect_to @micropost, notice: 'Micropost was successfully updated.' }
        format.json { render :show, status: :ok, location: @micropost }
      else
        format.html { render :edit }
        format.json { render json: @micropost.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @micropost.destroy
    if logged_in?
      @micropost  = current_user.microposts.build
      @feed_items = current_user.feed.includes(:user).paginate(page: params[:page])
    end
    render 'static_pages/home'
    # flash[:success] = "Micropost deleted"
    # redirect_to request.referrer || root_url
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_micropost
      @micropost = Micropost.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    # def micropost_params
    #   params.require(:micropost).permit(:content, :user_id)
    # end
    
    def micropost_params
      params.require(:micropost).permit(:content, :picture)
    end

    def correct_user
      @micropost = current_user.microposts.find_by(id: params[:id])
      redirect_to root_url if @micropost.nil?
    end
end
