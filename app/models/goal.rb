# frozen_string_literal: true

class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :description, presence: true
  scope :by_category, ->(category) { where(category:) }
end
