Rails.application.routes.draw do

  root "static_pages#home"
  get "/signin", to: "sessions#new"
  post "/sessions/create", to: "sessions#create"
  delete "/signout", to: "sessions#destroy"
  get "/nurses/new", to: "nurses#new"
  get "/patients/new", to: "patients#new"
  get "/nurses/most_loaded", to:"nurses#most_loaded"
  get "/patients/most_visits", to:"patients#most_visits"
  get '/nurses/:id/body', to: 'nurses#body'
  
  
  get '/auth/facebook/callback' => 'sessions#create'

  post "/patients/choose_nurse", to: "patients#choose_nurse"
  post "/visits/filter_by_nurse", to: "visits#filter_by_nurse"
    post "/patients/filter_nurses", to: "nurses#filter_nurses"

    resources :patients, only: [:show] do
     resources :visits, only: [:show, :index]
    end

  resources :nurses, only: [:show] do
   resources :patients, only: [:show, :index, :new]
   resources :visits, only: [:show, :index, :new]
  end



  resources :patients
  resources :nurses
  resources :visits
  resources :users
  resources :aids
end
