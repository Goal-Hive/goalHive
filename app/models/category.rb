class Category < ApplicationRecord
  has_many :goals
  belongs_to :user
  validates :name, presence: true
end
