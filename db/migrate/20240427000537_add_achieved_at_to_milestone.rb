class AddAchievedAtToMilestone < ActiveRecord::Migration[7.0]
  def change
    add_column :milestones, :achieved_at, :datetime
  end
end
