# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :goals, dependent: :destroy
  has_many :categories, dependent: :destroy
  after_create :initiate_categories

  def initiate_categories
    categories_attributes = [
      { name: 'Family' },
      { name: 'Spirituality' },
      { name: 'Health' },
      { name: 'Work' },
      { name: 'Community' }
    ]
    categories.build(categories_attributes)
    save
  end
end
