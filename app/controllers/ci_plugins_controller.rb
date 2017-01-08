class CiPluginsController < ApplicationController
  before_action :logged_in_user, only: [:index, :create, :new, :show, :edit, :update, :destroy]
  before_action :set_ci_plugin, only: [:show, :edit, :update, :destroy]

  # GET /ci_plugins
  # GET /ci_plugins.json
  def index
    # @ci_plugins = CiPlugin.select('content').paginate(page: params[:page], :per_page => 15)
    @ci_plugins = CiPlugin.paginate(page: params[:page], :per_page => 15).order("created_at DESC")
  end

  # GET /ci_plugins/1
  # GET /ci_plugins/1.json
  def show
  end

  # GET /ci_plugins/new
  def new
    @ci_plugins = []
    @ci_plugins << CiPlugin.new
  end

  # GET /ci_plugins/1/edit
  def edit
  end

  # POST /ci_plugins
  # POST /ci_plugins.json
  def create
    # puts ActiveSupport::JSON.decode(ci_plugin_params)
    @ci_plugins = []
    params["ci_plugins"].each do |ci_plugin|
      if ci_plugin["input"] != ""
        @ci_plugins << current_user.ci_plugins.build(ci_plugin_params(ci_plugin))
      end
    end

    # @ci_plugin = current_user.ci_plugins.build(ci_plugin_params)
    # CiPlugin.create!(@ci_plugins)

    respond_to do |format|

      begin
        # CiPlugin.import @ci_plugins
        @ci_plugins.map {|ci_plugin| ci_plugin.save } 
        format.html { redirect_to ci_plugins_path, notice: ' ci plugin was successfully created.' }
      rescue => ex
        logger.error ex.message
        format.html { render :new }
      end
      
    end
    
    # respond_to do |format|
    #   if @ci_plugins.save
    #     @ci_plugins.download_rename_publish_npm_package
    #     format.html { redirect_to @ci_plugins, notice: ' ci plugin was successfully created.' }
    #     format.json { render :show, status: :created, location: @ci_plugins }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @ci_plugins.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /ci_plugins/1
  # PATCH/PUT /ci_plugins/1.json
  def update
    respond_to do |format|
      if @ci_plugin.update(ci_plugin_params)
        format.html { redirect_to @ci_plugin, notice: ' ci plugin was successfully updated.' }
        format.json { render :show, status: :ok, location: @ci_plugin }
      else
        format.html { render :edit }
        format.json { render json: @ci_plugin.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ci_plugins/1
  # DELETE /ci_plugins/1.json
  def destroy
    @ci_plugin.destroy
    respond_to do |format|
      format.html { redirect_to ci_plugins_url, notice: ' ci plugin was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def update_npm_package_bin

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ci_plugin
      @ci_plugin = CiPlugin.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ci_plugin_params
      # params.require(:ci_plugin).permit(:content)
      params.require(:ci_plugin).permit(:log, :bin, :status, :input, :packageName, :packageVersion, :ciPackageName, :ciPackageNamePrefix)
    end

    def ci_plugin_params(param)
      # params.require(:ci_plugin).permit(:content)
      param.permit(:log, :bin, :status, :input, :packageName, :packageVersion, :ciPackageName, :ciPackageNamePrefix, :ciPackageVersion, :ciPackageVersionPatch)
    end
end
