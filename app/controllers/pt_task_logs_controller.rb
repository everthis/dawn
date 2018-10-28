class PtTaskLogsController < ApplicationController
  before_action :set_pt_task_log, only: [:show, :edit, :update, :destroy]

  # GET /pt_task_logs
  # GET /pt_task_logs.json
  def index
    @pt_task_logs = PtTaskLog.all
  end

  # GET /pt_task_logs/1
  # GET /pt_task_logs/1.json
  def show
  end

  # GET /pt_task_logs/new
  def new
    @pt_task_log = PtTaskLog.new
  end

  # GET /pt_task_logs/1/edit
  def edit
  end

  # POST /pt_task_logs
  # POST /pt_task_logs.json
  def create
    @pt_task_log = PtTaskLog.new(pt_task_log_params)

    respond_to do |format|
      if @pt_task_log.save
        format.html { redirect_to @pt_task_log, notice: 'Pt task log was successfully created.' }
        format.json { render :show, status: :created, location: @pt_task_log }
      else
        format.html { render :new }
        format.json { render json: @pt_task_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pt_task_logs/1
  # PATCH/PUT /pt_task_logs/1.json
  def update
    respond_to do |format|
      if @pt_task_log.update(pt_task_log_params)
        format.html { redirect_to @pt_task_log, notice: 'Pt task log was successfully updated.' }
        format.json { render :show, status: :ok, location: @pt_task_log }
      else
        format.html { render :edit }
        format.json { render json: @pt_task_log.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pt_task_logs/1
  # DELETE /pt_task_logs/1.json
  def destroy
    @pt_task_log.destroy
    respond_to do |format|
      format.html { redirect_to pt_task_logs_url, notice: 'Pt task log was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pt_task_log
      @pt_task_log = PtTaskLog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pt_task_log_params
      params.require(:pt_task_log).permit(:status, :detail)
    end
end
