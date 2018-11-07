class PtTask < ApplicationRecord
  belongs_to :user
  has_one :pt_task_log, dependent: :destroy
  after_create :create_pt_task_log
  after_commit :add_torrent_to_transmission, on: [ :create ]

  def add_torrent_to_transmission
    PtTaskAddTorrentToTransmissionJob.perform_later(self.source_id)
  end
end
