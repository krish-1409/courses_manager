Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pges#index'

  namespace :api do
    namespace :v1 do
      resources :students, param: :slug, only: [:create]
      resources :courses, param: :slug, only: [:create]
      resources :enrollments, only: [:create,:destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all


end
