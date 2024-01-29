# frozen_string_literal: true

class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :milestones, class_name: 'Milestone', dependent: :destroy

  validates :description, presence: true

  scope :by_category, ->(category) { where(category: category) }
  scope :by_status, ->(status) { where(status: status) }

  accepts_nested_attributes_for :milestones, :category

  enum :status, %i[paused active achieved archived], default: :active, prefix: true

  def toggle_status
    if status_paused?
      status_active!
    else
      status_paused!
    end
  end
end
