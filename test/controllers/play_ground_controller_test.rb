require 'test_helper'

class PlayGroundControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get play_ground_index_url
    assert_response :success
  end

end
