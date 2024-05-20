class AddMilestonesCountToGoals < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :total_milestones, :integer
  end
end
