require 'test_helper'

class CiPackagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ci_package = ci_packages(:one)
  end

  test "should get index" do
    get ci_packages_url
    assert_response :success
  end

  test "should get new" do
    get new_ci_package_url
    assert_response :success
  end

  test "should create ci_package" do
    assert_difference('CiPackage.count') do
      post ci_packages_url, params: { ci_package: { user_id: @ci_package.user_id } }
    end

    assert_redirected_to ci_package_url(CiPackage.last)
  end

  test "should show ci_package" do
    get ci_package_url(@ci_package)
    assert_response :success
  end

  test "should get edit" do
    get edit_ci_package_url(@ci_package)
    assert_response :success
  end

  test "should update ci_package" do
    patch ci_package_url(@ci_package), params: { ci_package: { user_id: @ci_package.user_id } }
    assert_redirected_to ci_package_url(@ci_package)
  end

  test "should destroy ci_package" do
    assert_difference('CiPackage.count', -1) do
      delete ci_package_url(@ci_package)
    end

    assert_redirected_to ci_packages_url
  end
end
