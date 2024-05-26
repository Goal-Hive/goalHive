# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  def after_sign_in_path_for(resource)
    # Customize the logic to determine the path after sign in
    if resource.is_a?(User)
      # If the signed-in resource is a user, redirect to a specific page
      # For example, root_path
      goals_path
    else
      # If the signed-in resource is not a user, handle accordingly
      super
    end
  end
end
