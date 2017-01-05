require 'test_helper'

class NpmRegistriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @npm_registry = npm_registries(:one)
  end

  test "should get index" do
    get npm_registries_url
    assert_response :success
  end

  test "should get new" do
    get new_npm_registry_url
    assert_response :success
  end

  test "should create npm_registry" do
    assert_difference('NpmRegistry.count') do
      post npm_registries_url, params: { npm_registry: { checked: @npm_registry.checked, registry_url: @npm_registry.registry_url } }
    end

    assert_redirected_to npm_registry_url(NpmRegistry.last)
  end

  test "should show npm_registry" do
    get npm_registry_url(@npm_registry)
    assert_response :success
  end

  test "should get edit" do
    get edit_npm_registry_url(@npm_registry)
    assert_response :success
  end

  test "should update npm_registry" do
    patch npm_registry_url(@npm_registry), params: { npm_registry: { checked: @npm_registry.checked, registry_url: @npm_registry.registry_url } }
    assert_redirected_to npm_registry_url(@npm_registry)
  end

  test "should destroy npm_registry" do
    assert_difference('NpmRegistry.count', -1) do
      delete npm_registry_url(@npm_registry)
    end

    assert_redirected_to npm_registries_url
  end
end
