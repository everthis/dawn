require 'test_helper'

class InstagramTasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @instagram_task = instagram_tasks(:one)
  end

  test "should get index" do
    get instagram_tasks_url
    assert_response :success
  end

  test "should get new" do
    get new_instagram_task_url
    assert_response :success
  end

  test "should create instagram_task" do
    assert_difference('InstagramTask.count') do
      post instagram_tasks_url, params: { instagram_task: { status: @instagram_task.status, task_type: @instagram_task.task_type, user_id: @instagram_task.user_id } }
    end

    assert_redirected_to instagram_task_url(InstagramTask.last)
  end

  test "should show instagram_task" do
    get instagram_task_url(@instagram_task)
    assert_response :success
  end

  test "should get edit" do
    get edit_instagram_task_url(@instagram_task)
    assert_response :success
  end

  test "should update instagram_task" do
    patch instagram_task_url(@instagram_task), params: { instagram_task: { status: @instagram_task.status, task_type: @instagram_task.task_type, user_id: @instagram_task.user_id } }
    assert_redirected_to instagram_task_url(@instagram_task)
  end

  test "should destroy instagram_task" do
    assert_difference('InstagramTask.count', -1) do
      delete instagram_task_url(@instagram_task)
    end

    assert_redirected_to instagram_tasks_url
  end
end
