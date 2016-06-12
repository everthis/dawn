require 'test_helper'

class ThirdPartyAccountsControllerTest < ActionController::TestCase
  setup do
    @third_party_account = third_party_accounts(:one)
    @user = users(:michael)
  end

  test "should get index" do
    log_in_as(@user)
    get :index
    assert_response :success
    assert_not_nil assigns(:third_party_accounts)
  end

  test "should get new" do
    log_in_as(@user)
    get :new
    assert_response :success
  end

  test "should create third_party_account" do
    log_in_as(@user)
    assert_difference('ThirdPartyAccount.count') do
      post :create, third_party_account: { account: @third_party_account.account, account_cookies: @third_party_account.account_cookies, account_type: @third_party_account.account_type, env: @third_party_account.env, is_active: @third_party_account.is_active, user_id: @third_party_account.user_id }
    end

    assert_redirected_to third_party_account_path(assigns(:third_party_account))
  end

  test "should show third_party_account" do
    log_in_as(@user)
    get :show, id: @third_party_account
    assert_response :success
  end

  test "should get edit" do
    log_in_as(@user)
    get :edit, id: @third_party_account
    assert_response :success
  end

  test "should update third_party_account" do
    log_in_as(@user)
    patch :update, id: @third_party_account, third_party_account: { account: @third_party_account.account, account_cookies: @third_party_account.account_cookies, account_type: @third_party_account.account_type, env: @third_party_account.env, is_active: @third_party_account.is_active, user_id: @third_party_account.user_id }
    assert_redirected_to third_party_account_path(assigns(:third_party_account))
  end

  test "should destroy third_party_account" do
    log_in_as(@user)
    assert_difference('ThirdPartyAccount.count', -1) do
      delete :destroy, id: @third_party_account
    end

    assert_redirected_to third_party_accounts_path
  end
end
