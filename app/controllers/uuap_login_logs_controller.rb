class UuapLoginLogsController < CBaseController
  before_action :set_uuap_login_log, only: [:show, :edit, :update, :destroy]

  # GET /uuap_login_logs
  # GET /uuap_login_logs.json
  def index
    @uuap_login_logs = UuapLoginLog.all
  end

  # GET /uuap_login_logs/1
  # GET /uuap_login_logs/1.json
  def show
  end

  # GET /uuap_login_logs/new
  def new
    @uuap_login_log = UuapLoginLog.new
  end

  # GET /uuap_login_logs/1/edit
  def edit
  end

  # POST /uuap_login_logs
  # POST /uuap_login_logs.json
  def create
    @uuap_login_log = UuapLoginLog.new(uuap_login_log_params)

    respond_to do |format|
      if @uuap_login_log.save
        format.html { redirect_to @uuap_login_log, notice: 'Uuap login log was successfully created.' }
        format.json { render :show, status: :created, location: @uuap_login_log }
      else
        format.html { render :new }
        format.json { render json: @uuap_login_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /uuap_login_logs/1
  # PATCH/PUT /uuap_login_logs/1.json
  def update
    respond_to do |format|
      if @uuap_login_log.update(uuap_login_log_params)
        format.html { redirect_to @uuap_login_log, notice: 'Uuap login log was successfully updated.' }
        format.json { render :show, status: :ok, location: @uuap_login_log }
      else
        format.html { render :edit }
        format.json { render json: @uuap_login_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /uuap_login_logs/1
  # DELETE /uuap_login_logs/1.json
  def destroy
    @uuap_login_log.destroy
    respond_to do |format|
      format.html { redirect_to uuap_login_logs_url, notice: 'Uuap login log was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_uuap_login_log
      @uuap_login_log = UuapLoginLog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def uuap_login_log_params
      params.fetch(:uuap_login_log, {})
    end
end
