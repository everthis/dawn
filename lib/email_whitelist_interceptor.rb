class EmailWhitelistInterceptor
  def self.delivering_email(message)
    # message.perform_deliveries = false unless WHITELIST.include?(message.to.first)
    message.subject ||= ""
    message.subject.prepend "[dawn]"
  end
end