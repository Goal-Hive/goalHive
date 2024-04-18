# frozen_string_literal: true

class AddInProgressRowOrderToMilestones < ActiveRecord::Migration[7.0]
  def change
    add_column :milestones, :in_progress_row_order, :integer
    Milestone.update_all('in_progress_row_order = EXTRACT(EPOCH FROM created_at)')
  end
end
