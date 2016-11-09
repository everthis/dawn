require 'test_helper'

class UserPreferenceControllerTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:michael)
    @other_user = users(:archer)
  end

  test "should get set_locale" do
  	log_in_as(@other_user)
    get user_preference_set_locale_url
    assert_response :success
  end

end
