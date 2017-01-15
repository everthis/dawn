class CiPackagesController < ApplicationController
  before_action :logged_in_user, only: [:index, :create, :new, :show, :edit, :update, :destroy]
  before_action :set_ci_package, only: [:show, :edit, :update, :destroy]

  before_action :admin_user,     only: [:destroy, :update]

  # GET /ci_packages
  # GET /ci_packages.json
  def index
    # @ci_packages = CiPackage.select('content').paginate(page: params[:page], :per_page => 15)
    @ci_packages = CiPackage.paginate(page: params[:page], :per_page => 15).order("created_at DESC")
  end

  # GET /ci_packages/1
  # GET /ci_packages/1.json
  def show
  end

  # GET /ci_packages/new
  def new
    @ci_packages = []
    @ci_packages << CiPackage.new
  end

  # GET /ci_packages/1/edit
  def edit
  end

  # POST /ci_packages
  # POST /ci_packages.json
  def create
    # puts ActiveSupport::JSON.decode(ci_package_params)
    @ci_packages = []
    params["ci_packages"].each do |ci_package|
      if ci_package["input"] != ""
        @ci_packages << current_user.ci_packages.build(ci_package_params(ci_package))
      end
    end

    # @ci_package = current_user.ci_packages.build(ci_package_params)
    # CiPackage.create!(@ci_packages)

    respond_to do |format|

      begin
        # CiPackage.import @ci_packages
        @ci_packages.map {|ci_package| ci_package.save }
        format.html { redirect_to ci_packages_path, notice: ' ci plugin was successfully created.' }
      rescue => ex
        logger.error ex.message
        format.html { render :new }
      end

    end

    # respond_to do |format|
    #   if @ci_packages.save
    #     @ci_packages.download_rename_publish_npm_package
    #     format.html { redirect_to @ci_packages, notice: ' ci plugin was successfully created.' }
    #     format.json { render :show, status: :created, location: @ci_packages }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @ci_packages.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /ci_packages/1
  # PATCH/PUT /ci_packages/1.json
  def update
    respond_to do |format|
      if @ci_package.update(ci_package_params)
        format.html { redirect_to @ci_package, notice: ' ci plugin was successfully updated.' }
        format.json { render :show, status: :ok, location: @ci_package }
      else
        format.html { render :edit }
        format.json { render json: @ci_package.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /ci_packages/1
  # DELETE /ci_packages/1.json
  def destroy
    @ci_package.destroy
    respond_to do |format|
      format.html { redirect_to ci_packages_url, notice: ' ci plugin was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def update_npm_package_bin
  end

  def packages_bin
    params_keys = request.query_parameters.keys
    ci_package_name_arr = []
    params_keys.each_with_index { |val, index| ci_package_name_arr << val.split(':')[1] }
    query_records = CiPackage.where(ciPackageName: ci_package_name_arr, status: "success")
    result_arr = []
    result_str = ""
    query_records.each do |per|
      if per.bin.size > 0
        per.bin.map! { |item|
          item + ":" + item.sub("#{per.ciPackageNamePrefix}#{per.ciPackageName}-", "")
        }
      end
      result_arr += per.bin
    end
    result_arr.uniq.each { |str|
      result_str += (str + "\n")
    }
    render plain: result_str
  end

  def query

    unless params[:q].blank?
      @plugins = CiPackage.where('input like :search OR status like :search OR "packageVersion" like :search OR "ciPackageName" like :search OR "ciPackageVersion" like :search', search: "%#{params[:q]}%")
      render :json => @plugins, :only=> [:input, :status, :packageVersion, :ciPackageName, :ciPackageVersion]
    end

  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ci_package
      @ci_package = CiPackage.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def ci_package_params
      # params.require(:ci_package).permit(:content)
      params.require(:ci_package).permit(:log, :bin, :status, :input, :packageName, :packageVersion, :ciPackageName, :ciPackageNamePrefix)
    end

    def ci_package_params(param)
      # params.require(:ci_package).permit(:content)
      param.permit(:log, :bin, :status, :input, :packageName, :packageVersion, :ciPackageName, :ciPackageNamePrefix, :ciPackageVersion, :ciPackageVersionPatch)
    end

    # Confirms an admin user.
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end

end
