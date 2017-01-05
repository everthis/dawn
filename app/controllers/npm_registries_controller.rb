class NpmRegistriesController < ApplicationController
  before_action :set_npm_registry, only: [:show, :edit, :update, :destroy]

  # GET /npm_registries
  # GET /npm_registries.json
  def index
    @npm_registries = NpmRegistry.all
  end

  # GET /npm_registries/1
  # GET /npm_registries/1.json
  def show
  end

  # GET /npm_registries/new
  def new
    @npm_registry = NpmRegistry.new
  end

  # GET /npm_registries/1/edit
  def edit
  end

  # POST /npm_registries
  # POST /npm_registries.json
  def create
    @npm_registry = NpmRegistry.new(npm_registry_params)

    respond_to do |format|
      if @npm_registry.save
        format.html { redirect_to @npm_registry, notice: 'Npm registry was successfully created.' }
        format.json { render :show, status: :created, location: @npm_registry }
      else
        format.html { render :new }
        format.json { render json: @npm_registry.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /npm_registries/1
  # PATCH/PUT /npm_registries/1.json
  def update
    respond_to do |format|
      if @npm_registry.update(npm_registry_params)
        format.html { redirect_to @npm_registry, notice: 'Npm registry was successfully updated.' }
        format.json { render :show, status: :ok, location: @npm_registry }
      else
        format.html { render :edit }
        format.json { render json: @npm_registry.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /npm_registries/1
  # DELETE /npm_registries/1.json
  def destroy
    @npm_registry.destroy
    respond_to do |format|
      format.html { redirect_to npm_registries_url, notice: 'Npm registry was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_npm_registry
      @npm_registry = NpmRegistry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def npm_registry_params
      params.require(:npm_registry).permit(:label, :registry_url, :checked)
    end
end
