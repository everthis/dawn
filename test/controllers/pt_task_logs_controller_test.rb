require 'test_helper'

class PtTaskLogsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pt_task_log = pt_task_logs(:one)
  end

  test "should get index" do
    get pt_task_logs_url
    assert_response :success
  end

  test "should get new" do
    get new_pt_task_log_url
    assert_response :success
  end

  test "should create pt_task_log" do
    assert_difference('PtTaskLog.count') do
      post pt_task_logs_url, params: { pt_task_log: { detail: @pt_task_log.detail, status: @pt_task_log.status } }
    end

    assert_redirected_to pt_task_log_url(PtTaskLog.last)
  end

  test "should show pt_task_log" do
    get pt_task_log_url(@pt_task_log)
    assert_response :success
  end

  test "should get edit" do
    get edit_pt_task_log_url(@pt_task_log)
    assert_response :success
  end

  test "should update pt_task_log" do
    patch pt_task_log_url(@pt_task_log), params: { pt_task_log: { detail: @pt_task_log.detail, status: @pt_task_log.status } }
    assert_redirected_to pt_task_log_url(@pt_task_log)
  end

  test "should destroy pt_task_log" do
    assert_difference('PtTaskLog.count', -1) do
      delete pt_task_log_url(@pt_task_log)
    end

    assert_redirected_to pt_task_logs_url
  end
end
