Rails.application.routes.draw do

  resources :third_party_accounts
  resources :docs
  resources :email_whitelists
  root                'static_pages#home'
  get    'help'         => 'static_pages#help'
  get    'about'        => 'static_pages#about'
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

  resources :users do
    member do
      get :following, :followers, :settings, :get_token
    end
  end
  resources :account_activations, only: [:edit]
  resources :password_resets,     only: [:new, :create, :edit, :update]
  resources :microposts,          only: [:create, :destroy]
  resources :relationships,       only: [:create, :destroy]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".


  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
