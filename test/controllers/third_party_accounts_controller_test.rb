require 'test_helper'

class ThirdPartyAccountsControllerTest < ActionController::TestCase
  setup do
    @third_party_account = third_party_accounts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:third_party_accounts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create third_party_account" do
    assert_difference('ThirdPartyAccount.count') do
      post :create, third_party_account: { account: @third_party_account.account, cookies: @third_party_account.cookies, env: @third_party_account.env, is_active: @third_party_account.is_active, type: @third_party_account.type, user_id: @third_party_account.user_id }
    end

    assert_redirected_to third_party_account_path(assigns(:third_party_account))
  end

  test "should show third_party_account" do
    get :show, id: @third_party_account
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @third_party_account
    assert_response :success
  end

  test "should update third_party_account" do
    patch :update, id: @third_party_account, third_party_account: { account: @third_party_account.account, cookies: @third_party_account.cookies, env: @third_party_account.env, is_active: @third_party_account.is_active, type: @third_party_account.type, user_id: @third_party_account.user_id }
    assert_redirected_to third_party_account_path(assigns(:third_party_account))
  end

  test "should destroy third_party_account" do
    assert_difference('ThirdPartyAccount.count', -1) do
      delete :destroy, id: @third_party_account
    end

    assert_redirected_to third_party_accounts_path
  end
end
