require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dawn
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.webpack = {
      asset_manifest: {}
    }

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


    config.nav_lynx.selected_class = 'current'

    config.webpack = {
      :use_manifest => false,
      :asset_manifest => {},
      :common_manifest => {},
    }

    # config.action_cable.mount_path = '/websocket'

  end
end
