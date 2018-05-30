class InstagramImageJob < ApplicationJob
  queue_as :default

  def perform(*args)
    fp = args[0]
    f_str = File.read(fp)
    p_obj = JSON.parse(f_str)
    imgs = p_obj['instagram_images'].map { |el| InstagramImage.where("url LIKE :q OR thumbnail LIKE :q", q: "%#{el['str']}%").where(owner_id: el['owner_id']) }
    imgs.each do |item|
      item.update(downloaded: true) unless item.nil?
    end
  end
end
