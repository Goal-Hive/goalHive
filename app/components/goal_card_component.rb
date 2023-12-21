# frozen_string_literal: true

class GoalCardComponent < ViewComponent::Base
  def initialize(goal:)
    @goal = goal
    generate_goal_data
  end

  def generate_goal_data
    achievedCount = @goal.milestones.where(status: 'achieved').count
    allMilestones = @goal.milestones.count
    @percentage = if allMilestones != 0
                    (achievedCount * 100) / allMilestones
                  else
                    0
                  end
    @milestone_reached = "#{achievedCount}/#{allMilestones}"
    @milestone_number = @goal.milestones.count - @goal.milestones.where(status: 'in_progress').count + 1
    @next_milestone = @goal.milestones.where(status: 'in_progress')&.first
    case allMilestones
    when 0
      @message = "You've not set milestones for this goal."
    when achievedCount
      @message = 'Congratulations 🥳🎉🎊'
    end
    @status_icon = 'resume' if @goal.status_paused?
    @status_icon = 'pause' if @goal.status_active?
  end
end
