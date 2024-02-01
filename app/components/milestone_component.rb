# frozen_string_literal: true

class MilestoneComponent < ViewComponent::Base
  def initialize(milestone:)
    @milestone = milestone
    prepare_data
  end

  def prepare_data
    if @milestone.status_in_progress?
      @update_progress = "Mark as achieved"
      @update_progress_img = 'markAchieved.svg'
      @message_img = 'markAchieved.svg'
      @status = 'achieved'
      @message = "Work In Progress"
      @background = "bg-light-bg-secondary"
      @text_color = "text-light-text-lightGray"
    elsif @milestone.status_achieved?
      @update_progress = "Undo"
      @update_progress_img = 'undoProgress.svg'
      @message_img = 'achieved.svg'
      @status = 'in_progress'
      @message = "Achieved"
      @background = "bg-cornsilk"
      @text_color = "text-light-text-darkGray"
    end
  end
end
