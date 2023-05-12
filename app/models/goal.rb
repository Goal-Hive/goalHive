class Goal < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :description, presence: true
end
