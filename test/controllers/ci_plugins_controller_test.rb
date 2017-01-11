require 'test_helper'

class CiPluginsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ci_plugin = ci_plugins(:one)
  end

  test "should get index" do
    get ci_plugins_url
    assert_response :success
  end

  test "should get new" do
    get new_ci_plugin_url
    assert_response :success
  end

  test "should create ci_plugin" do
    assert_difference('CiPlugin.count') do
      post ci_plugins_url, params: { ci_plugin: { user_id: @ci_plugin.user_id } }
    end

    assert_redirected_to ci_plugin_url(CiPlugin.last)
  end

  test "should show ci_plugin" do
    get ci_plugin_url(@ci_plugin)
    assert_response :success
  end

  test "should get edit" do
    get edit_ci_plugin_url(@ci_plugin)
    assert_response :success
  end

  test "should update ci_plugin" do
    patch ci_plugin_url(@ci_plugin), params: { ci_plugin: { user_id: @ci_plugin.user_id } }
    assert_redirected_to ci_plugin_url(@ci_plugin)
  end

  test "should destroy ci_plugin" do
    assert_difference('CiPlugin.count', -1) do
      delete ci_plugin_url(@ci_plugin)
    end

    assert_redirected_to ci_plugins_url
  end
end
