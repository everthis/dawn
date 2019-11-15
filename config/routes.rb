Rails.application.routes.draw do
  get 'play_ground/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'play_ground#index'
end
