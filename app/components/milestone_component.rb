# frozen_string_literal: true

class MilestoneComponent < ViewComponent::Base
  def initialize(milestone:)
    @milestone = milestone
    prepare_data
  end

  def prepare_data
    if @milestone.status_in_progress?
      @update_progress = "Mark as achieved"
      @update_progress_img = 'markAchieved'
      @message_img = 'markAchieved'
      @status = 'achieved'
      @message = "Work In Progress"
      @background = "bg-light-bg-secondary"
    elsif @milestone.status_achieved?
      @update_progress = "Undo"
      @update_progress_img = 'undoProgress'
      @message_img = 'inProgress'
      @status = 'in_progress'
      @message = "Achieved"
      @background = "bg-light-bg-achieved"
    end
  end
end
