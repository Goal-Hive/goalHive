# frozen_string_literal: true

class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :milestones, dependent: :destroy
  validates :description, presence: true
  scope :by_category, ->(category) { where(category:category) }
  scope :by_status, ->(status) { where(status: status)}
  accepts_nested_attributes_for :milestones
  enum :status, [ :paused, :active, :achieved, :archived ], default: :paused, prefix: true

  def toggle_status
    if self.status_paused?
      self.status_active!
    else
      self.status_paused!
    end
  end
end
