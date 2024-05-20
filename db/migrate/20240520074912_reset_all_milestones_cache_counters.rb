class ResetAllMilestonesCacheCounters < ActiveRecord::Migration[7.0]
  def up
    Goal.all.each do |goal|
      Goal.reset_counters(goal.id, :milestones)
    end
  end
end
