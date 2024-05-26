# frozen_string_literal: true

class StaticPagesController < ApplicationController
  skip_before_action :authenticate_user!
  def root
    # render file: "#{Rails.root}/public/root_page/root.html"
    # render file: Rails.root.join('public', 'root_page', 'root.html'), layout: false
  end
end
