class Category < ApplicationRecord
  has_many :goals, dependent: :destroy
  belongs_to :user
  validates :name, presence: true
end
