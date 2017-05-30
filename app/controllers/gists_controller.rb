class GistsController < ApplicationController
  before_action :set_gist, only: [:show, :edit, :update, :destroy]

  before_action :logged_in_user, only: [:index, :show, :new, :create, :destroy, :update, :edit ]
  before_action :correct_user,   only: :destroy

  # GET /gists
  # GET /gists.json
  def index
    @gists = Gist.all
  end

  # GET /gists/1
  # GET /gists/1.json
  def show
  end

  # GET /gists/new
  def new
    @gist = Gist.new
  end

  # GET /gists/1/edit
  def edit
  end

  # POST /gists
  # POST /gists.json
  def create
    @gist = current_user.gists.build(gist_params)

    # respond_to do |format|
    #   if @gist.save
    #     format.html { redirect_to @gist, notice: 'Gist was successfully created.' }
    #     format.json { render :show, status: :created, location: @gist }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @gist.errors, status: :unprocessable_entity }
    #   end
    # end


    if @gist.save
      # render :json => {:status => 'success', :url => url_for(@gist) }
      @c_status = 'success'
      @c_override_url = url_for(@gist)
      render :show
    else
      # format.html { render :new }
      # render :json => {:status => 'error', :errors => @gist.errors.full_messages}
      @c_status = 'error'
      @c_override_url = new_gist_url
      render :new
    end

  end

  # PATCH/PUT /gists/1
  # PATCH/PUT /gists/1.json
  def update
    respond_to do |format|
      if @gist.update(gist_params)
        format.html { redirect_to @gist, notice: 'Gist was successfully updated.' }
        format.json { render :show, status: :ok, location: @gist }
      else
        format.html { render :edit }
        format.json { render json: @gist.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gists/1
  # DELETE /gists/1.json
  def destroy
    @gist.destroy
    respond_to do |format|
      format.html { redirect_to gists_url, notice: 'Gist was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gist
      @gist = Gist.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def gist_params
      params.require(:gist).permit(:description, :content, :hasAnswer, :answer)
    end

    def correct_user
      @gist = current_user.gists.find_by(id: params[:id])
      redirect_to root_url if @gist.nil?
    end
end
