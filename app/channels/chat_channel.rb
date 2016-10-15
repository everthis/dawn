<<<<<<< HEAD
class ChatChannel < ApplicationCable::Channel
	# Called when the consumer has successfully
	# become a subscriber of this channel.
	def subscribed
		stream_from "chat_#{params[:room]}"
	end
end