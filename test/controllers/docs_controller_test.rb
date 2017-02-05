require 'test_helper'

class DocsControllerTest < ActionController::TestCase
  setup do
    @doc = docs(:one)
    @user = users(:michael)
  end

  test "should get index" do
    log_in_as(@user)
    get :index
    assert_response :success
    assert_not_nil assigns(:docs)
  end

  test "should get new" do
    log_in_as(@user)
    get :new
    assert_response :success
  end

  test "should create doc" do
    log_in_as(@user)
    assert_difference('Doc.count') do
      post :create, params: {
          doc: { content: @doc.content, title: @doc.title }
      }
    end

    assert_response :success
    # assert_redirected_to doc_path(assigns(:doc))
  end

  test "should show doc" do
    log_in_as(@user)
    get :show, params: { id: @doc }
    assert_response :success
  end

  test "should get edit" do
    log_in_as(@user)
    get :edit, params: { id: @doc }
    assert_response :success
  end

  test "should update doc" do
    log_in_as(@user)
    patch :update, params: { id: @doc, doc: { content: @doc.content, title: @doc.title } }
    # assert_redirected_to doc_path(assigns(:doc))
    assert_response :success
  end

  test "should destroy doc" do
    log_in_as(@user)
    assert_difference('Doc.count', -1) do
      delete :destroy, params: { id: @doc }
    end

    assert_response :success
    # assert_redirected_to docs_path
  end
end
