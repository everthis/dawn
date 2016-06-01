class ThirdPartyAccountsController < ApplicationController
  before_action :logged_in_user, only: [:index, :show, :create, :destroy, :update, :edit ]
  before_action :set_third_party_account, only: [:show, :edit, :update, :destroy]

  # GET /third_party_accounts
  # GET /third_party_accounts.json
  def index
    @third_party_accounts = current_user.third_party_accounts.order("created_at DESC")
  end

  # GET /third_party_accounts/1
  # GET /third_party_accounts/1.json
  def show
  end

  # GET /third_party_accounts/new
  def new
    @third_party_account = ThirdPartyAccount.new
  end

  # GET /third_party_accounts/1/edit
  def edit
  end

  # POST /third_party_accounts
  # POST /third_party_accounts.json
  def create
    @third_party_account = current_user.third_party_accounts.build(third_party_account_params)
    if @third_party_account.is_active
      current_user.third_party_accounts.where('is_active = ?', true).update_all("is_active = 'false'")
    end 

    respond_to do |format|
      if @third_party_account.save
        format.html { redirect_to @third_party_account, notice: 'Third party account was successfully created.' }
        format.json { render :show, status: :created, location: @third_party_account }
      else
        format.html { render :new }
        format.json { render json: @third_party_account.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /third_party_accounts/1
  # PATCH/PUT /third_party_accounts/1.json
  def update
    req_action = params['third_party_account'][:req_action]
    if third_party_account_params[:is_active]
      current_user.third_party_accounts.where('is_active = ?', true).update_all("is_active = 'false'")
    end 

    respond_to do |format|
      if @third_party_account.update(third_party_account_params)
        if req_action == 'index'
          format.html { redirect_to third_party_accounts_url, notice: 'Third party account was successfully updated.' }
        else
          format.html { redirect_to @third_party_account, notice: 'Third party account was successfully updated.' }
        end
        format.json { render :show, status: :ok, location: @third_party_account }
      else
        format.html { render :edit }
        format.json { render json: @third_party_account.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /third_party_accounts/1
  # DELETE /third_party_accounts/1.json
  def destroy
    @third_party_account.destroy
    respond_to do |format|
      format.html { redirect_to third_party_accounts_url, notice: 'Third party account was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_third_party_account
      @third_party_account = ThirdPartyAccount.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def third_party_account_params
      params.require(:third_party_account).permit(:account, :is_active, :account_cookies, :account_type, :env, :user_id)
    end

    def is_active_account?

    end
    
    def deactive_active_account

    end

    def deactive_all_accounts
      self.class.where('id != ? and is_active', self.id).update_all("is_active = 'false'")
    end
end
