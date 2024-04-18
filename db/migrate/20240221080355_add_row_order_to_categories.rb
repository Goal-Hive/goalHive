# frozen_string_literal: true

class AddRowOrderToCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :categories, :row_order, :integer
    Milestone.update_all('row_order = EXTRACT(EPOCH FROM created_at)')
  end
end
