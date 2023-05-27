# frozen_string_literal: true

class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :milestones, dependent: :destroy
  validates :description, presence: true
  scope :by_category, ->(category) { where(category:category) }
  accepts_nested_attributes_for :milestones
end
