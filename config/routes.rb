Rails.application.routes.draw do
  resources :npm_registries
  resources :ci_plugins
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :third_party_accounts
  resources :docs
  resources :email_whitelists
  root                'static_pages#home'
  get    'help'         => 'static_pages#help'
  get    'about'        => 'static_pages#about'
  get    'test'        => 'static_pages#test'
  get    'contact'      => 'static_pages#contact'
  get    'dev'          => 'static_pages#dev'
  get    'log'          => 'logs#index'
  get    'passport'     => 'static_pages#passport'
  get    'signup'       => 'users#new'
  get    'login'        => 'sessions#new'
  post   'login'        => 'sessions#create'
  delete 'logout'       => 'sessions#destroy'
  get    'clilogin'     => 'users#cli_login'

  # get 'log' => 'logs#index'
  # for the sake of debugging
  get 'demo' => 'demo#home'

  resources :apis
  get 'returnreqcookie' => 'utility#return_req_cookie'
  get 'instantsearch' => 'apis#query'
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

  get 'get_ci_plugin_current_log' => 'ci_plugin_logs#query_current_log'

  resources :users do
    member do
      get :following, :followers, :settings, :get_token
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
end
