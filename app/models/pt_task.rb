class PtTask < ApplicationRecord
  belongs_to :user
  has_one :pt_task_log, dependent: :destroy
  after_create :create_pt_task_log
  after_commit :try_to_add_torrent_to_transmission, on: [ :create ]
  after_commit :try_to_add_torrent_to_transmission_on_update, on: [ :update ]

  def try_to_add_torrent_to_transmission
    pendingSize = PtTask.where("id < ?", self.id).where.not(status: 'completed').size
    if pendingSize == 0
      PtTaskAddTorrentToTransmissionJob.perform_later(self.source_id)
    end
  end

  def try_to_add_torrent_to_transmission_on_update
    pendingSize = PtTask.where(status: 'pending').size
    if pendingSize == 0
      watingTaskArr = PtTask.where(status: 'waiting').order('id ASC').limit(1)
      if watingTaskArr.size > 0
        PtTaskAddTorrentToTransmissionJob.perform_later(watingTaskArr[0].source_id)
      end
    end
  end

end
