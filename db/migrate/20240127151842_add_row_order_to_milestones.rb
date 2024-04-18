# frozen_string_literal: true

class AddRowOrderToMilestones < ActiveRecord::Migration[7.0]
  def change
    add_column :milestones, :row_order, :integer
    Milestone.update_all('row_order = EXTRACT(EPOCH FROM created_at)')
  end
end
