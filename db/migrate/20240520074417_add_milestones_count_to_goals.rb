class AddMilestonesCountToGoals < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :milestones_count, :integer, default: 0
  end
end
