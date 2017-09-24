require 'test_helper'

class InstagramUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @instagram_user = instagram_users(:one)
  end

  test "should get index" do
    get instagram_users_url
    assert_response :success
  end

  test "should get new" do
    get new_instagram_user_url
    assert_response :success
  end

  test "should create instagram_user" do
    assert_difference('InstagramUser.count') do
      post instagram_users_url, params: { instagram_user: { account_is_private: @instagram_user.account_is_private, media_count: @instagram_user.media_count, user_id: @instagram_user.user_id, user_name: @instagram_user.user_name } }
    end

    assert_redirected_to instagram_user_url(InstagramUser.last)
  end

  test "should show instagram_user" do
    get instagram_user_url(@instagram_user)
    assert_response :success
  end

  test "should get edit" do
    get edit_instagram_user_url(@instagram_user)
    assert_response :success
  end

  test "should update instagram_user" do
    patch instagram_user_url(@instagram_user), params: { instagram_user: { account_is_private: @instagram_user.account_is_private, media_count: @instagram_user.media_count, user_id: @instagram_user.user_id, user_name: @instagram_user.user_name } }
    assert_redirected_to instagram_user_url(@instagram_user)
  end

  test "should destroy instagram_user" do
    assert_difference('InstagramUser.count', -1) do
      delete instagram_user_url(@instagram_user)
    end

    assert_redirected_to instagram_users_url
  end
end
