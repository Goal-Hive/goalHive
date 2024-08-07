# frozen_string_literal: true

# GoalCardComponent
class GoalCardComponent < ViewComponent::Base
  def initialize(goal:)
    super
    @goal = goal
    generate_goal_data
  end

  def generate_goal_data
    calculate_milestone_stats
    calculate_percentage
    set_next_milestone
    set_message_based_on_milestones
    set_status_icon
  end

  def calculate_milestone_stats
    @all_milestones = @goal.milestones_count
    @achieved_count = @goal.achieved_count
    @milestone_reached = "#{@achieved_count}/#{@all_milestones}"
    @milestone_number = @achieved_count + 1
  end

  def calculate_percentage
    @percentage = @goal.goal_progress_percentage
  end

  def set_next_milestone
    @next_milestone = @goal.milestones.where(status: 'in_progress').rank(:in_progress_row_order).first
  end

  def set_message_based_on_milestones
    case @all_milestones
    when 0
      @message = "You've not set milestones for this goal."
    when @achieved_count
      @message = 'Congratulations 🥳🎉🎊'
    end
  end

  def set_status_icon
    if @goal.status_paused?
      @status_icon = 'resume'
    elsif @goal.status_active? || @goal.status_achieved?
      @status_icon = 'pause'
    end
  end
end
