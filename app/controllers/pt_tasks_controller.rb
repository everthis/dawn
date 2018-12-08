require 'uri'
require 'net/http'
require 'rqrcode'
require 'pagination_list_link_renderer'
class PtTasksController < CBaseController
  skip_before_action :verify_authenticity_token
  before_action :set_pt_task, only: [:show, :edit, :update, :destroy]
  before_action :logged_in_user, only: [:index, :create, :new, :show, :edit, :update, :destroy, :query, :torrentDetail, :ttgCover, :addTask, :pending, :pendingData, :completed, :completedData]

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
    res = cfetch(ENV["PT_TASK_ORIGIN"] + '/query?keyword=' + params[:q])
    render json: res, status: :ok
  end

  def torrentDetail
    res = cfetch(ENV["PT_TASK_ORIGIN"] + '/torrentDetail?id=' + params[:id] + '&source=' + params[:source])
    render json: res, status: :ok
  end

  def ttgCover
    res = cfetch(ENV["PT_TASK_ORIGIN"] + '/ttgCover?id=' + params[:id] + '&source=' + params[:source])
    render json: res, status: :ok
  end

  def addTask
    @pt_task = PtTask.find_by(source_id: params[:source_id])
    if @pt_task.nil?
      new_pt_task = current_user.pt_tasks.build(pt_task_params(params))
      new_pt_task.status = 'waiting'
      begin
        new_pt_task.save
      rescue => ex
        logger.error ex.message
        render :json => {:status => 'error'}
      end
      render json: new_pt_task, status: :ok
    else
      render json: @pt_task, status: :ok
    end
  end

  def pending
    @pt_tasks = PtTask.where('status IN (?)', ['waiting', 'pending']).paginate(page: params[:page], :per_page => 10).order("created_at ASC")
  end

  def pendingData
    @pt_tasks = PtTask.where('status IN (?)', ['waiting', 'pending']).paginate(page: params[:page], :per_page => 10).order("created_at ASC")
    render json: @pt_tasks, status: :ok
  end

  def completed
    @pt_tasks = PtTask.where(status: 'completed').paginate(page: params[:page], :per_page => 10).order("created_at DESC")
  end

  def completedData
    @pt_tasks = PtTask.where(status: 'completed').paginate(page: params[:page], :per_page => 10).order("created_at DESC")
    render json: @pt_tasks, status: :ok
  end

  def checkProgress
    res = cfetch(ENV["PT_TASK_ORIGIN"] + '/checkProgress?id=' + params[:id] + '&source=' + params[:source] + '&hash=' + params[:hash])
    render json: res, status: :ok
  end

  def getSignUrl
    @pt_task = PtTask.find_by(transmission_hash: params[:hash])
    @pt_task_log = @pt_task.pt_task_log
    if @pt_task_log.detail['upload']['fileName'].nil?
      fileName = "Butterfly.Sleep.2017.720p.BluRay.x264-WiKi.mp4"
    else
      fileName = @pt_task_log.detail['upload']['fileName']
    end
    signUrl = cfetch(ENV["PT_TASK_ORIGIN"] + '/getSignUrl?fpath=' + encodeUri(fileName))
    qrcode = RQRCode::QRCode.new(signUrl)
    # fileName = hash + '-' + DateTime.now.to_i.to_s + '.png'
    # @imgPath = 'pt-task/' + fileName
    qrcode_str = qrcode.as_png(
      resize_gte_to: false,
      resize_exactly_to: false,
      fill: 'white',
      color: 'black',
      size: 480,
      border_modules: 2,
      module_px_size: 6,
      # file: Rails.root.join('public', @imgPath)
      file: nil # path to write
    ).to_s
    # if Rails.env.production?
    #   hostPath = 'https://www.everthis.com/'
    # else
    #   hostPath = 'http://192.168.1.209:8678/'
    # end
    @qrcode = Base64.encode64(qrcode_str)
    res = {
      "encodeImg": @qrcode,
      "signUrl": signUrl
    }
    render json: res, status: :ok
  end

  private
    def encodeUri(str)
      URI.escape(str, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_pt_task
      @pt_task = PtTask.find(params[:id])
    end

    def pt_task_params(param)
      param.permit(:source_id, :torrent_base_info, :torrent_detail, :cover)
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
