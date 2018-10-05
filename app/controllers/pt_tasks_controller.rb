require 'uri'
require 'net/http'
class PtTasksController < CBaseController
  before_action :set_pt_task, only: [:show, :edit, :update, :destroy]

  # GET /pt_tasks
  # GET /pt_tasks.json
  def index
    @pt_tasks = PtTask.paginate(page: params[:page]).order("created_at ASC")
  end

  # GET /pt_tasks/1
  # GET /pt_tasks/1.json
  def show
  end

  # GET /pt_tasks/new
  def new
    @pt_task = PtTask.new
  end

  # GET /pt_tasks/1/edit
  def edit
  end

  # POST /pt_tasks
  # POST /pt_tasks.json
  def create
    @pt_task = PtTask.new(pt_task_params)

    respond_to do |format|
      if @pt_task.save
        format.html { redirect_to @pt_task, notice: 'Pt task was successfully created.' }
        format.json { render :show, status: :created, location: @pt_task }
      else
        format.html { render :new }
        format.json { render json: @pt_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pt_tasks/1
  # PATCH/PUT /pt_tasks/1.json
  def update
    respond_to do |format|
      if @pt_task.update(pt_task_params)
        format.html { redirect_to @pt_task, notice: 'Pt task was successfully updated.' }
        format.json { render :show, status: :ok, location: @pt_task }
      else
        format.html { render :edit }
        format.json { render json: @pt_task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pt_tasks/1
  # DELETE /pt_tasks/1.json
  def destroy
    @pt_task.destroy
    respond_to do |format|
      format.html { redirect_to pt_tasks_url, notice: 'Pt task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def query
    res = cfetch('http://localhost:3000/query?keyword=' + params[:q])
    render json: res, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pt_task
      @pt_task = PtTask.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pt_task_params
      params.require(:pt_task).permit(:title_cn, :title_en, :api_response)
    end

    def cfetch(str)
      url = URI(str)
      
      http = Net::HTTP.new(url.host, url.port)
      # http.use_ssl = true
      # http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      
      request = Net::HTTP::Get.new(url)
      # request["x-api-key"] = ENV["SYGIC_API_KEY"]
      request["cache-control"] = 'no-cache'
      
      response = http.request(request)
      response.read_body

  end
end
