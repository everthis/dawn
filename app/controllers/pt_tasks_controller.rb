require 'uri'
require 'net/http'
class PtTasksController < CBaseController
  skip_before_action :verify_authenticity_token
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

  def torrentDetail
    res = cfetch('http://localhost:3000/torrentDetail?id=' + params[:id] + '&source=' + params[:source])
    render json: res, status: :ok
  end

  def ttgCover
    res = cfetch('http://localhost:3000/ttgCover?id=' + params[:id] + '&source=' + params[:source])
    render json: res, status: :ok
  end

  def addTask
    @pt_task = PtTask.find_by(source_id: params[:source_id])
    if @pt_task.nil?
      new_pt_task = current_user.pt_tasks.build(pt_task_params(params))
      begin
        new_pt_task.save
      rescue => ex
        logger.error ex.message
        render :json => {:status => 'error'}
      end
      res = cfetch('http://localhost:3000/addTorrent?sourceId=' + params[:source_id])
      obj = JSON.parse(res)
      unless obj['id'].nil?
        new_pt_task.update_attribute(:transmission_id, "#{obj['id']}")
      end
      render json: res, status: :ok
    else
      render json: @pt_task, status: :ok
    end
  end

  def pending
    @pt_tasks = PtTask.where(cdn_url: nil).paginate(page: params[:page]).order("created_at ASC")
  end

  def completed
    @pt_tasks = PtTask.where.not(cdn_url: nil).paginate(page: params[:page]).order("created_at ASC")
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pt_task
      @pt_task = PtTask.find(params[:id])
    end

    def pt_task_params(param)
      param.permit(:source_id, :torrent_base_info, :torrent_detail)
    end

    def cfetch(str)
      # url = URI(str)
      url = URI.parse(URI.escape(str))

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
