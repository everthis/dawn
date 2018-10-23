require "application_system_test_case"

class PtTasksTest < ApplicationSystemTestCase
  setup do
    @pt_task = pt_tasks(:one)
  end

  test "visiting the index" do
    visit pt_tasks_url
    assert_selector "h1", text: "Pt Tasks"
  end

  test "creating a Pt task" do
    visit pt_tasks_url
    click_on "New Pt Task"

    fill_in "Api Response", with: @pt_task.api_response
    fill_in "Title Cn", with: @pt_task.title_cn
    fill_in "Title En", with: @pt_task.title_en
    click_on "Create Pt task"

    assert_text "Pt task was successfully created"
    click_on "Back"
  end

  test "updating a Pt task" do
    visit pt_tasks_url
    click_on "Edit", match: :first

    fill_in "Api Response", with: @pt_task.api_response
    fill_in "Title Cn", with: @pt_task.title_cn
    fill_in "Title En", with: @pt_task.title_en
    click_on "Update Pt task"

    assert_text "Pt task was successfully updated"
    click_on "Back"
  end

  test "destroying a Pt task" do
    visit pt_tasks_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Pt task was successfully destroyed"
  end
end
