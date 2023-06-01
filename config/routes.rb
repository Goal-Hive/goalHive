# frozen_string_literal: true

Rails.application.routes.draw do
  resources :goals do
    post 'add_milestone' => 'milestones#add_milestone'
    delete 'remove_milestone/:id' => 'milestones#remove_milestone', as: :remove_milestone
    collection do
      post :filter_by_category
    end
  end

  resources :categories do
    member do
      post :edit
    end
  end

  devise_for :users

  root 'goals#index'

  resources :milestones

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
end
