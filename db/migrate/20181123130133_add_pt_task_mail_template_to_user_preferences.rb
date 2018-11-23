class AddPtTaskMailTemplateToUserPreferences < ActiveRecord::Migration[5.2]
  def change
    add_column :user_preferences, :pt_task_mail_template, :string
  end
end
