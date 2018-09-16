# config valid only for current version of Capistrano
lock '3.7.2'

# set :application, 'my_app_name'
# set :repo_url, 'git@example.com:me/my_repo.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, '/var/www/my_app_name'

# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Change these
server 'everthis.com', port: 8022, roles: [:web, :app, :db], primary: true

set :rvm_ruby_version, '2.5.1'
set :repo_url,        'https://github.com/everthis/dawn.git'
set :application,     'dawn'
set :user,            'everthis'
set :puma_threads,    [4, 6]
set :puma_workers,    1
set :rails_env,       "production"

# capistrano-puma
# set :puma_conf,       "./puma.rb"

# Don't change these unless you know what you're doing
set :pty,             false
set :use_sudo,        false
set :stage,           :production
set :deploy_via,      :copy # :remote_cache
set :deploy_to,       "/home/#{fetch(:user)}/deploy/#{fetch(:application)}"
set :puma_bind,       "unix://#{shared_path}/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/pids/puma.state"
set :puma_pid,        "#{shared_path}/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :ssh_options,     { forward_agent: true, user: fetch(:user), keys: %w(~/.ssh/id_rsa.pub) }
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true  # Change to false when not using ActiveRecord

# set :linked_files, fetch(:linked_files, []).push('.env.production')

set :linked_files, fetch(:linked_files, []).push('.env.production')
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'public/uploads')

### sidekiq settings
set :sidekiq_default_hooks, true
set :sidekiq_pid, File.join(shared_path, 'pids', 'sidekiq.pid')
set :sidekiq_env, fetch(:rack_env, fetch(:rails_env, fetch(:stage)))
set :sidekiq_log, File.join(shared_path, 'log', 'sidekiq.log')
set :sidekiq_options, nil
set :sidekiq_require, nil
set :sidekiq_tag, nil
set :sidekiq_config, nil # if you have a config/sidekiq.yml, do not forget to set this.
set :sidekiq_queue, ['default', 'mailers']
set :sidekiq_timeout, 10
set :sidekiq_role, :app
set :sidekiq_processes, 1
set :sidekiq_options_per_process, nil
set :sidekiq_concurrency, 5
# set :sidekiq_monit_templates_path, 'config/deploy/templates'
# set :sidekiq_monit_conf_dir, '/etc/monit/conf.d'
# set :sidekiq_monit_use_sudo, true
# set :monit_bin, '/usr/bin/monit'
# set :sidekiq_monit_default_hooks, true
set :sidekiq_service_name, "sidekiq_#{fetch(:application)}_#{fetch(:sidekiq_env)}"
set :sidekiq_cmd, "#{fetch(:bundle_cmd, "bundle")} exec sidekiq" # Only for capistrano2.5
set :sidekiqctl_cmd, "#{fetch(:bundle_cmd, "bundle")} exec sidekiqctl" # Only for capistrano2.5
set :sidekiq_user, nil #user to run sidekiq as

## Defaults:
# set :scm,           :git
# set :branch,        :master
# set :format,        :pretty
# set :log_level,     :debug
# set :keep_releases, 5

## Linked Files & Directories (Default None):
# set :linked_files, %w{config/database.yml}
# set :linked_dirs,  %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

namespace :puma do
  desc 'Create Directories for Puma Pids and Socket'
  task :make_dirs do
    on roles(:app) do
      execute "mkdir #{shared_path}/sockets -p"
      execute "mkdir #{shared_path}/pids -p"
      execute "mkdir #{shared_path}/log -p"
    end
  end

  # before :start, :make_dirs
end

namespace :deploy do
  desc "Make sure local git is in sync with remote."
  task :check_revision do
    on roles(:app) do
      unless `git rev-parse HEAD` == `git rev-parse origin/master`
        puts "WARNING: HEAD is not the same as origin/master"
        puts "Run `git push` to sync changes."
        exit
      end
    end
  end

  desc 'Initial Deploy'
  task :initial do
    on roles(:app) do
      before 'deploy:restart', 'puma:start'
      invoke 'deploy'
    end
  end

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do
      invoke 'puma:restart'
    end
  end

  desc "Upload .env.production"
  task :upload_env do
    on roles(:all) do
      upload! ".env.production", "#{ shared_path }/.env.production"
    end
  end

  task :check_env do
    # on roles(:all) do |host|
    #   f = "#{ shared_path }/config/secrets.yml"
    #   if test("[ -f #{f} ]")
    #     info "#{f} already exists on #{host}!"
    #   else
    #     execute "echo 'RAILS_ENV=#{ fetch :stage }' > #{f}"
    #     execute "echo 'PATH=/usr/local/rvm/wrappers/ruby-2.2.0:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' >> #{f}"
    #   end
    # end

    on roles(:all) do |host|
      f = "#{ shared_path }/.env.production"
      if test("[ -f #{f} ]")
        info "#{f} already exists on #{host}!"
        invoke "deploy:upload_env"
      else
        invoke "deploy:upload_env"
      end
    end
  end

  task :compile_fe do
    on roles(:app) do
      info "#FEEEEEEEEEEEE"
    end
  end

  desc 'Run rake npm:install'
  task :npm_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && npm install")
      end
    end
  end


  before "deploy:assets:precompile", "deploy:npm_install"
  before 'check:linked_files', :check_env
  before 'assets:precompile', :compile_fe
  before :starting,     :check_revision
  after  :finishing,    :compile_assets
  after  :finishing,    :cleanup
  after  :finishing,    :restart
end

namespace :assets do
  task :precompile_assets do
    run_locally do
      with rails_env: fetch(:stage) do
        execute 'rm -rf public/assets'
        execute :bundle, 'exec rake assets:precompile'
        execute :bundle, 'exec rake webpacker:compile'
      end
    end
  end
end

# ps aux | grep puma    # Get puma pid
# kill -s SIGUSR2 pid   # Restart puma
# kill -s SIGTERM pid   # Stop puma


# namespace :deploy do

#   after :restart, :clear_cache do
#     on roles(:web), in: :groups, limit: 3, wait: 10 do
#       # Here we can do anything such as:
#       # within release_path do
#       #   execute :rake, 'cache:clear'
#       # end
#     end
#   end

# end
