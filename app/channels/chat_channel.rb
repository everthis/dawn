class ChatChannel < ApplicationCable::Channel
    # Called when the consumer has successfully
    # become a subscriber of this channel.

    def subscribed
      stream_from 'messages'
    end

    def speak(data)
      ActionCable.server.broadcast('messages',
        message: render_message(data['message']))
    end

    def follow(data)
      stop_all_streams
      stream_from "messages:#{data['message_id'].to_i}:comments"
    end

    def unfollow
      stop_all_streams
    end

    private

    def render_message(message)
      ApplicationController.render(partial: 'messages/message',
                                   locals: { message: message })
    end
end
