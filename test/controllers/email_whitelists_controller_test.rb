require 'test_helper'

class EmailWhitelistsControllerTest < ActionController::TestCase
  setup do
    @email_whitelist = email_whitelists(:one)
    @admin = users(:michael)
    @non_admin = users(:archer)
  end

  test "should get index" do
    log_in_as(@non_admin)
    get :index
    assert_response :success
    assert_not_nil assigns(:email_whitelists)
  end

  test "should get new" do
    log_in_as(@admin)
    get :new
    assert_response :success
  end

  test "should create email_whitelist" do
    log_in_as(@admin)
    assert_difference('EmailWhitelist.count') do
      post :create, params: { email_whitelist: { email: @email_whitelist.email } }
    end

    assert_redirected_to email_whitelist_path(assigns(:email_whitelist))
  end

  test "should show email_whitelist" do
    log_in_as(@non_admin)
    get :show, params: { id: @email_whitelist }
    assert_response :success
  end

  test "should get edit" do
    log_in_as(@admin)
    get :edit, params: { id: @email_whitelist }
    assert_response :success
  end

  test "should update email_whitelist" do
    log_in_as(@admin)
    patch :update, params: { id: @email_whitelist, email_whitelist: { email: @email_whitelist.email } }
    assert_redirected_to email_whitelist_path(assigns(:email_whitelist))
  end

  test "should destroy email_whitelist" do
    log_in_as(@admin)
    assert_difference('EmailWhitelist.count', -1) do
      delete :destroy, params: { id: @email_whitelist }
    end

    assert_redirected_to email_whitelists_path
  end
end
