require 'test_helper'

class FisCiPluginsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @fis_ci_plugin = fis_ci_plugins(:one)
  end

  test "should get index" do
    get fis_ci_plugins_url
    assert_response :success
  end

  test "should get new" do
    get new_fis_ci_plugin_url
    assert_response :success
  end

  test "should create fis_ci_plugin" do
    assert_difference('FisCiPlugin.count') do
      post fis_ci_plugins_url, params: { fis_ci_plugin: { user_id: @fis_ci_plugin.user_id } }
    end

    assert_redirected_to fis_ci_plugin_url(FisCiPlugin.last)
  end

  test "should show fis_ci_plugin" do
    get fis_ci_plugin_url(@fis_ci_plugin)
    assert_response :success
  end

  test "should get edit" do
    get edit_fis_ci_plugin_url(@fis_ci_plugin)
    assert_response :success
  end

  test "should update fis_ci_plugin" do
    patch fis_ci_plugin_url(@fis_ci_plugin), params: { fis_ci_plugin: { user_id: @fis_ci_plugin.user_id } }
    assert_redirected_to fis_ci_plugin_url(@fis_ci_plugin)
  end

  test "should destroy fis_ci_plugin" do
    assert_difference('FisCiPlugin.count', -1) do
      delete fis_ci_plugin_url(@fis_ci_plugin)
    end

    assert_redirected_to fis_ci_plugins_url
  end
end
