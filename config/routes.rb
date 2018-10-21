Rails.application.routes.draw do
  resources :pt_tasks
  resources :instagram_tasks
  resources :instagram_users
  resources :instagram_images
  resources :gists
  resources :uuap_login_logs
  resources :npm_registries
  resources :ci_packages
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :third_party_accounts
  resources :docs
  resources :email_whitelists

  root                     'static_pages#home'
  get    'help'         => 'static_pages#help'
  get    'about'        => 'static_pages#about'
  get    'test'         => 'static_pages#test'
  get    'contact'      => 'static_pages#contact'
  get    'api'          => 'static_pages#api'
  get    'log'          => 'logs#index'
  get    'passport'     => 'static_pages#passport'
  get    'signup'       => 'users#new'
  get    'login'        => 'sessions#new'
  post   'login'        => 'sessions#create'
  delete 'logout'       => 'sessions#destroy'
  get    'clilogin'     => 'users#cli_login'
  get    'instagram'    => 'static_pages#instagram'

  get   'packages_bin' => 'ci_packages#packages_bin'
  get 'plugins_instantsearch'  => 'ci_packages#query'

  # get 'log' => 'logs#index'
  # for the sake of debugging
  get 'demo' => 'demo#home'
  get 'di' => 'demo#index'

  resources :apis
  get 'returnreqcookie' => 'utility#return_req_cookie'
  get 'instantsearch' => 'apis#query'
  get 'pt_task_search' => 'pt_tasks#query'
  get 'pt_task_torrent_detail' => 'pt_tasks#torrentDetail'
  get 'pt_task_ttg_cover' => 'pt_tasks#ttgCover'
  get 'pt_task_add' => 'pt_tasks#addTask'
  get 'pending_pt_task' => 'pt_tasks#pending'
  get 'completed_pt_task' => 'pt_tasks#completed'
  get 'api_response' => 'apis#token_generate_data'
  get 'apiresponse' => 'apis#generate_data'
  post 'apiresponse' => 'apis#generate_data'
  # resources :apis, :defaults => { :format => 'json' } do
    # member do
    #   post :update_api
    #   put :update_api
    #   patch :update_api
    # end
  # end

  get 'get_ci_package_current_log' => 'ci_package_logs#query_current_log'
  get 'front_end_job_interview_questions' => 'static_pages#front_end_job_interview_questions'
  get 'films' => 'static_pages#films'
  get 'film/:name' => 'static_pages#film', :as => :per_film
  # get 'print_c' => 'static_pages#print_c'
  # post 'print_c' => 'static_pages#print_c'

  resources :users do
    member do
      get :following, :followers, :settings, :get_token
    end
  end
  resources :account_activations, only: [:new, :create, :edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]

  get  '/user_preference',  to: 'user_preference#index'
  get  '/user_preference/set_locale',  to: 'user_preference#index'
  post '/user_preference/update', to: 'user_preference#update'

  post 'authenticate', to: 'authentication#authenticate'
  get 'instagram_users_media_count', to: 'instagram_users#media_count'
  get 'queryInstagramUserId', to: 'instagram_users#queryInstagramUserId'
  get 'instagram_profile_pics', to: 'instagram_users#profile_pics'
  get 'imagesByOwnerId', to: 'instagram_images#imagesByOwnerId'
  get 'all_instagram_users_id', to: 'instagram_users#all_instagram_users_id'
  get 'all_instagram_users_info', to: 'instagram_users#all_instagram_users_info'
  patch 'update_instagram_users_info', to: 'instagram_users#update_users_info'
  get 'today_success_ids', to: 'instagram_tasks#today_success_ids'
  get 'instagram_download_failure', to: 'instagram_tasks#download_failure'
  get 'instagram_user_images_codes', to: 'instagram_images#userImagesCodes'
  get 'instagram_user_most_recent_image_in_db', to: 'instagram_images#userMostRecentImage'
  get 'instagram_not_downloaded_images', to: 'instagram_images#notDownloadedImages'
  patch 'update_instagram_img_status', to: 'instagram_images#updateImgStatus'

  post 'instagram_images_urls', to: 'instagram_images#imagesUrl'
  # scope '(:locale)' do
  #   resources :orders
  #   resources :line_items
  #   resources :carts
  #   root 'static_pages#home', as: 'store_index', via: :all
  # end


  # get 'test' => 'test#test'

end
