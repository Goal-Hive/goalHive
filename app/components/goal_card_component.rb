# frozen_string_literal: true

class GoalCardComponent < ViewComponent::Base
  def initialize(goal:)
    @goal = goal
    generate_goal_data
  end

  def generate_goal_data
    achievedCount = @goal.milestones.where(status: 'achieved').count
    allMilestones = @goal.milestones.count
    if allMilestones != 0
      @percentage = (achievedCount * 100) / allMilestones
    else
      @percentage = 0
    end
    @milestone_reached = "#{achievedCount}/#{allMilestones}"
    @milestone_number = @goal.milestones.count - @goal.milestones.where(status: 'in_progress').count + 1
    if allMilestones == 0
      @message = "You've not set milestones for this goal."
    elsif achievedCount == allMilestones
      @message = "Congratulations 🥳🎉🎊"
    end
  end
end
