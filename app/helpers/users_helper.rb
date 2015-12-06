module UsersHelper
	# Returns the Gravatar for the given user.
	def gravatar_for(user, options = { size: 80 })
	  gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
	  size = options[:size]
	  gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
	  image_tag(gravatar_url, alt: user.name, class: "gravatar")
	end

	def avatar_for(user, options = { size: "thumb" })
		img_path = user[:avatars] ? user[:avatars] : "default_avatar.jpg"
		img_prefix = options[:size] == "thumb" ? "thumb_" : "small_thumb_"
		if user[:avatars].nil?
			img_url = img_prefix << img_path 
		else
			url_str_arr = user.avatars.url.rpartition('/') 
			img_url = url_str_arr.first << "/" << img_prefix << url_str_arr.last
		end
    	image_tag(img_url, alt: user.name, class: "avatar")
	end
end