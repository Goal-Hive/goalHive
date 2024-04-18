# frozen_string_literal: true

class AddStatusToMilestones < ActiveRecord::Migration[7.0]
  def change
    add_column :milestones, :status, :integer, default: 0
  end
end
