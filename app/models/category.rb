# frozen_string_literal: true

class Category < ApplicationRecord
  has_many :goals, dependent: :destroy
  belongs_to :user
  validates :name, presence: true

  include RankedModel
  ranks :row_order,
        with_same: :user_id
end
