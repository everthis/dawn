require 'test_helper'

class CiPackagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ci_packages = []
    @ci_package = ci_packages(:one)
    @user = users(:michael)
  end

  test "should get index" do
    log_in_as @user
    get ci_packages_url
    assert_response :success
  end

  test "should get new" do
    log_in_as @user
    get new_ci_package_url
    assert_response :success
  end

  test "should create ci_package" do
    log_in_as @user
    assert_difference('CiPackage.count') do
      post ci_packages_url, params: { ci_packages: [{ input: "vue@2.1.8" }] }
    end

    # assert_redirected_to ci_package_url(CiPackage.last)
    assert_response :success
    assert_equal ci_packages_url, JSON.parse(response.body)['url']
  end

  test "should show ci_package" do
    log_in_as @user
    get ci_package_url(@ci_package)
    assert_response :success
  end

  # test "should get edit" do
  #   log_in_as @user
  #   get edit_ci_package_url(@ci_package)
  #   assert_response :success
  # end

  # test "should update ci_package" do
  #   patch ci_package_url(@ci_package), params: { ci_package: { user_id: @ci_package.user_id } }
  #   assert_redirected_to ci_package_url(@ci_package)
  # end

  # test "should destroy ci_package" do
  #   assert_difference('CiPackage.count', -1) do
  #     delete ci_package_url(@ci_package)
  #   end

  #   assert_redirected_to ci_packages_url
  # end

end
