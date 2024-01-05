# frozen_string_literal: true

Rails.application.routes.draw do
  root 'goals#index'
  devise_for :users
             # ,controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :goals do
    post 'add_milestone' => 'milestones#add_milestone'
    delete 'remove_milestone/:id' => 'milestones#remove_milestone', as: :remove_milestone
    member do
      post 'update_status(/:status)', to: 'goals#update_status', as: 'update_status'
    end
    collection do
      post :filter_by_category, :filter_by_status
    end
  end

  resources :categories do
    member do
      post :edit, :new
    end
  end

  resources :milestones do
    member do
      post 'update_progress(/:status)', to: 'milestones#update_progress', as: 'update_progress'
      post 'achieve', to: 'milestones#achieve_milestone', as: 'achieve'
      post :edit, :new
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
end
