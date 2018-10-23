require 'test_helper'

class PtTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pt_task = pt_tasks(:one)
  end

  test "should get index" do
    get pt_tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_pt_task_url
    assert_response :success
  end

  test "should create pt_task" do
    assert_difference('PtTask.count') do
      post pt_tasks_url, params: { pt_task: { api_response: @pt_task.api_response, title_cn: @pt_task.title_cn, title_en: @pt_task.title_en } }
    end

    assert_redirected_to pt_task_url(PtTask.last)
  end

  test "should show pt_task" do
    get pt_task_url(@pt_task)
    assert_response :success
  end

  test "should get edit" do
    get edit_pt_task_url(@pt_task)
    assert_response :success
  end

  test "should update pt_task" do
    patch pt_task_url(@pt_task), params: { pt_task: { api_response: @pt_task.api_response, title_cn: @pt_task.title_cn, title_en: @pt_task.title_en } }
    assert_redirected_to pt_task_url(@pt_task)
  end

  test "should destroy pt_task" do
    assert_difference('PtTask.count', -1) do
      delete pt_task_url(@pt_task)
    end

    assert_redirected_to pt_tasks_url
  end
end
