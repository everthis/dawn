class EmailWhitelistsController < CBaseController
  before_action :set_email_whitelist, only: [:show, :edit, :update, :destroy]
  before_action :logged_in_user
  before_action :admin_user,     only: [:new, :create, :edit, :update, :destroy]

  # GET /email_whitelists
  # GET /email_whitelists.json
  def index
    @email_whitelists = EmailWhitelist.all
  end

  # GET /email_whitelists/1
  # GET /email_whitelists/1.json
  def show
  end

  # GET /email_whitelists/new
  def new
    @email_whitelist = EmailWhitelist.new
  end

  # GET /email_whitelists/1/edit
  def edit
  end

  # POST /email_whitelists
  # POST /email_whitelists.json
  def create
    @email_whitelist = EmailWhitelist.new(email_whitelist_params)

    respond_to do |format|
      if @email_whitelist.save
        format.html { redirect_to @email_whitelist, notice: 'Email whitelist was successfully created.' }
        format.json { render :show, status: :created, location: @email_whitelist }
      else
        format.html { render :new }
        format.json { render json: @email_whitelist.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /email_whitelists/1
  # PATCH/PUT /email_whitelists/1.json
  def update
    respond_to do |format|
      if @email_whitelist.update(email_whitelist_params)
        format.html { redirect_to @email_whitelist, notice: 'Email whitelist was successfully updated.' }
        format.json { render :show, status: :ok, location: @email_whitelist }
      else
        format.html { render :edit }
        format.json { render json: @email_whitelist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /email_whitelists/1
  # DELETE /email_whitelists/1.json
  def destroy
    @email_whitelist.destroy
    respond_to do |format|
      format.html { redirect_to email_whitelists_url, notice: 'Email whitelist was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_email_whitelist
      @email_whitelist = EmailWhitelist.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def email_whitelist_params
      params.require(:email_whitelist).permit(:email)
    end

    # Confirms an admin user.
    def admin_user
      redirect_to(email_whitelists_url, alert: "Not authorized!") unless current_user.admin?
    end
end
