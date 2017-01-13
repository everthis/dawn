Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => 'public, max-age=172800'
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # config.action_controller.asset_host = Proc.new { |source, request|
  #     if request && request.ssl?
  #       "#{request.protocol}#{request.host_with_port}"
  #     else
  #       "#{request.protocol}#{request.host_with_port}"
  #     end
  #   }

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = true

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  config.log_level = :debug

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true

  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Asset digests allow you to set far-future HTTP expiration dates on all assets,
  # yet still be able to expire them through the digest params.
  config.assets.digest = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  # config.file_watcher = ActiveSupport::EventedFileUpdateChecker

  # config.action_cable.url = '/cable'
  config.action_cable.mount_path = '/cable'
  # config.action_cable.allowed_request_origins = ['http://rubyonrails.com', %r{http://ruby.*}, 'http://10.0.0.9']
  config.action_cable.disable_request_forgery_protection = true

  # Adds additional error checking when serving assets at runtime.
  # Checks for improperly declared sprockets dependencies.
  # Raises helpful error messages.
  config.assets.raise_runtime_errors = true

  # Automatically inject JavaScript needed for LiveReload
  # config.middleware.insert_after(ActionDispatch::Static, Rack::LiveReload, live_reload_port: 8010)

  config.web_console.whitelisted_ips = '172.20.0.0/16'

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true

  # config.action_mailer.delivery_method = :test
  # config.action_mailer.delivery_method = :letter_opener
  # host = 'localhost:3000'
  # config.action_mailer.default_url_options = { host: host }

  host = ENV["RAILS_HOST"]
  config.action_mailer.default_url_options = { host: host }
  config.action_mailer.delivery_method = :smtp

  config.action_mailer.smtp_settings = {
    address: "smtp.exmail.qq.com",
    port: 25,
    domain: "qq.com",
    authentication: "login",
    user_name: ENV["RAILS_EMAIL_FROM"],
    password: ENV["RAILS_EMAIL_PWD"],
    enable_starttls_auto: true
  }

  config.after_initialize do
    Bullet.enable = true
    Bullet.alert = true
    Bullet.bullet_logger = true
    Bullet.console = true
    # Bullet.growl = true
    # Bullet.rails_logger = true
    # Bullet.honeybadger = true
    # Bullet.bugsnag = true
    # Bullet.airbrake = true
    # Bullet.rollbar = true
    # Bullet.add_footer = true
    # Bullet.stacktrace_includes = [ 'your_gem', 'your_middleware' ]
    # Bullet.stacktrace_excludes = [ 'their_gem', 'their_middleware' ]
    # Bullet.slack = { webhook_url: 'http://some.slack.url', foo: 'bar' }
  end


end
