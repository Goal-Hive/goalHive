# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         # :confirmable,
         # :lockable,
         # :timeoutable,
         # :trackable,
         # :omniauthable

  has_many :goals, dependent: :destroy
  has_many :categories, dependent: :destroy
  after_create :initiate_categories


  def self.from_omniauth(auth)
    find_or_create_by(provider: auth.provider, uid: auth.uid) do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.name = auth.info.name   # assuming the user model has a name
      user.image = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails,
      user.skip_confirmation!
    end
  end

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
