require 'test_helper'

class UuapLoginLogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @uuap_login_log = uuap_login_logs(:one)
  end

  test "should get index" do
    get uuap_login_logs_url
    assert_response :success
  end

  test "should get new" do
    get new_uuap_login_log_url
    assert_response :success
  end

  test "should create uuap_login_log" do
    assert_difference('UuapLoginLog.count') do
      post uuap_login_logs_url, params: { uuap_login_log: {  } }
    end

    assert_redirected_to uuap_login_log_url(UuapLoginLog.last)
  end

  test "should show uuap_login_log" do
    get uuap_login_log_url(@uuap_login_log)
    assert_response :success
  end

  test "should get edit" do
    get edit_uuap_login_log_url(@uuap_login_log)
    assert_response :success
  end

  test "should update uuap_login_log" do
    patch uuap_login_log_url(@uuap_login_log), params: { uuap_login_log: {  } }
    assert_redirected_to uuap_login_log_url(@uuap_login_log)
  end

  test "should destroy uuap_login_log" do
    assert_difference('UuapLoginLog.count', -1) do
      delete uuap_login_log_url(@uuap_login_log)
    end

    assert_redirected_to uuap_login_logs_url
  end
end
