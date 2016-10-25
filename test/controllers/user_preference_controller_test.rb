require 'test_helper'

class UserPreferenceControllerTest < ActionDispatch::IntegrationTest
  test "should get set_locale" do
    get user_preference_set_locale_url
    assert_response :success
  end

end
