# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# if defined?(Rails::Server) && Rails.env.development?
#   require "debug/open_nonstop"
# end

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module GoalHive
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0
    # Require the custom middleware
    # config.autoload_paths += %W(#{config.root}/lib/middleware)

    # Use custom middleware to serve root.html at root URL
    # config.middleware.use "StaticIndex"
    # config.middleware.use "MyMiddleware"
    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    # config.assets.enabled = true
  end
end
