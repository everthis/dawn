class CiPluginLog < ApplicationRecord
  belongs_to :fis_ci_plugin
  after_save :broadcast_log

  def broadcast_log
    ActionCable.server.broadcast("ci_plugin_#{self.fis_ci_plugin_id}", self.log)
  end
end
