require 'test_helper'

class LogsControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  def setup
    @base_title = "Dawn"
  end
  
  test "should get log" do
    get :index
    assert_response :success
    assert_select "title", "Log | #{@base_title}"
  end
end
