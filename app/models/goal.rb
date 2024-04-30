# frozen_string_literal: true

class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category

  has_many :milestones, class_name: 'Milestone', dependent: :destroy

  accepts_nested_attributes_for :milestones, :category


  has_one_attached :motivation_media

  validates :description, presence: true
  validates :milestones, presence: { message: 'must have at least one milestone' }, on: :create

  scope :by_category, ->(category) { where(category: category) }
  scope :by_status, ->(status) { where(status: status) }

  scope :by_category_and_status, lambda { |status, category|
    scope = if status.present?
              by_status(status)
            else
              by_status('active')
            end
    scope = scope.by_category(category) if category.present?
    scope
  }


  enum :status, %i[paused active achieved archived], default: :active, prefix: true

  def toggle_status
    if status_paused?
      status_active!
    else
      status_paused!
    end
  end

  def mark_complete
    status_achieved! if milestones.status_in_progress.empty?
  end

  def all_milestones_count
    milestones.count
  end

  def achieved_count
    milestones.where(status: 'achieved').count
  end

  def goal_progress_percentage
    all_milestones_count != 0 ? (achieved_count * 100) / all_milestones_count : 0
  end
end
