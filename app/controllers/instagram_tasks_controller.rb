class InstagramTasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  wrap_parameters InstagramTask
  before_action :authenticate_request
  # before_action :set_instagram_task, only: [:show, :edit, :update, :destroy]

  # GET /instagram_tasks
  # GET /instagram_tasks.json
  def index
    @instagram_tasks = InstagramTask.search(status: params[:status], task_type: params[:task_type]).paginate(page: params[:page])
    @task_status = InstagramTask.distinct.pluck(:status)
    @task_types = InstagramTask.distinct.pluck(:task_type)
    @current_status = params[:status]
    @current_task_type = params[:task_type]
  end

  # GET /instagram_tasks/1
  # GET /instagram_tasks/1.json
  def show
  end

  # GET /instagram_tasks/new
  def new
    @instagram_task = InstagramTask.new
  end

  # GET /instagram_tasks/1/edit
  def edit
  end

  # POST /instagram_tasks
  # POST /instagram_tasks.json
  def create
    @instagram_task = InstagramTask.new(instagram_task_params)

    if @instagram_task.save
      render :json => {:status => 'success', :msg => ''}
    else
      render json: @instagram_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /instagram_tasks/1
  # PATCH/PUT /instagram_tasks/1.json
  def update
    @instagram_task = InstagramTask.find(params[:id])
      if @instagram_task.update(instagram_task_params)
        render :json => {:status => 'success', :msg => ''}
      else
        render json: @instagram_task.errors, status: :unprocessable_entity
      end
  end

  def destroy
    @task = InstagramTask.find(params[:id])
    @task.destroy
    render :json => {:status => 'success', :msg => ''}

  end

  def today_success_ids
    task_records = InstagramTask.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day).where(:status => 'success').where(:task_type => 'download')
    user_ids = task_records.map { |el| el.user_id }
    render json: user_ids, status: :ok
  end

  def download_failure
    failed_tasks = InstagramTask.where('status = ? AND task_type = ?', 'failure', 'download')
    render json: failed_tasks, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_instagram_task
      @instagram_task = InstagramTask.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def instagram_task_params
      params.require(:instagram_task).permit(:user_id, :task_type, :status, err_msg: {}, params: {})
    end
end
