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

    private

    def render_message(message)
      ApplicationController.render(partial: 'messages/message',
                                   locals: { message: message })
    end
end