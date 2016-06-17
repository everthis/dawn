require File.expand_path('../boot', __FILE__)

require 'rails/all'

Dotenv::Railtie.load
# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)


module Dawn
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    config.active_job.queue_adapter = :sidekiq
    
    config.assets.enabled = true
    # Make public assets requireable in manifest files
    config.assets.paths << Rails.root.join(".tmp", "assets", "javascripts")
    config.assets.paths << Rails.root.join(".tmp", "assets", "stylesheets")

    # disable auto generate assets
    config.generators.stylesheets = false
    config.generators.javascripts = false
    
    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
    # Include the authenticity token in remote forms.
    config.action_view.embed_authenticity_token_in_remote_forms = true

    config.autoload_paths << "#{Rails.root}/lib"
  end
end
