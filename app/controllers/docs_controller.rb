class DocsController < CBaseController
  before_action :logged_in_user, only: [:index, :show, :new, :create, :destroy, :update, :edit ]
  before_action :set_doc, only: [:show, :update, :destroy]
  before_action :correct_user,   only: :destroy
  # GET /docs
  # GET /docs.json
  def index
    if logged_in?
      @docs = Doc.includes(:user).paginate(page: params[:page])
    end
  end

  # GET /docs/1
  # GET /docs/1.json
  def show
  end

  # GET /docs/new
  def new
    @doc = Doc.new
  end

  # GET /docs/1/edit
  def edit
    @doc = Doc.find(params[:id])
    @doc.content = @doc.content.gsub(/(?:\n\r?|\r\n?)/, "\\n")
  end

  # POST /docs
  # POST /docs.json
  def create
    @doc = current_user.docs.build(doc_params)

    begin
      @doc.save
      render :json => {:status => 'success', :url => url_for(@doc) }
    rescue => ex
      logger.error ex.message
      # format.html { render :new }
      render :json => {:status => 'error'}
    end

    # respond_to do |format|
    #   if @doc.save
    #     format.html { redirect_to @doc, notice: 'Doc was successfully created.' }
    #     format.json { render :show, status: :created, location: @doc }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @doc.errors, status: :unprocessable_entity }
    #   end
    # end

  end

  # PATCH/PUT /docs/1
  # PATCH/PUT /docs/1.json
  def update

    begin
      @doc.update(doc_params)
      render :json => {:status => 'success', :url => url_for(@doc) }
    rescue => ex
      logger.error ex.message
      # format.html { render :new }
      render :json => {:status => 'error'}
    end

    # respond_to do |format|
    #   if @doc.update(doc_params)
    #     format.html { redirect_to @doc, notice: 'Doc was successfully updated.' }
    #     format.json { render :show, status: :ok, location: @doc }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @doc.errors, status: :unprocessable_entity }
    #   end
    # end

  end

  # DELETE /docs/1
  # DELETE /docs/1.json
  def destroy
    @doc.destroy
    @docs = Doc.includes(:user).paginate(page: params[:page])
    render :index
    # respond_to do |format|
    #   format.html { redirect_to docs_url, notice: 'Doc was successfully destroyed.' }
    #   format.json { head :no_content }
    # end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_doc
      @doc = Doc.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def doc_params
      params.require(:doc).permit(:title, :content)
    end

    def correct_user
      if current_user.admin?
        true
      else
        @api = current_user.docs.find_by(id: params[:id])
        redirect_to(docs_url, alert: "Not authorized!") if @api.nil?
      end
    end
end
