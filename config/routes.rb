Rails.application.routes.draw do

  devise_for :users
  resources :users do
    get  'chat',   to: 'microposts#chat'
    post 'create', to: 'microposts#create'
  end

  root 'users#index'
end
