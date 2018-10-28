require "application_system_test_case"

class PtTaskLogsTest < ApplicationSystemTestCase
  setup do
    @pt_task_log = pt_task_logs(:one)
  end

  test "visiting the index" do
    visit pt_task_logs_url
    assert_selector "h1", text: "Pt Task Logs"
  end

  test "creating a Pt task log" do
    visit pt_task_logs_url
    click_on "New Pt Task Log"

    fill_in "Detail", with: @pt_task_log.detail
    fill_in "Status", with: @pt_task_log.status
    click_on "Create Pt task log"

    assert_text "Pt task log was successfully created"
    click_on "Back"
  end

  test "updating a Pt task log" do
    visit pt_task_logs_url
    click_on "Edit", match: :first

    fill_in "Detail", with: @pt_task_log.detail
    fill_in "Status", with: @pt_task_log.status
    click_on "Update Pt task log"

    assert_text "Pt task log was successfully updated"
    click_on "Back"
  end

  test "destroying a Pt task log" do
    visit pt_task_logs_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Pt task log was successfully destroyed"
  end
end
