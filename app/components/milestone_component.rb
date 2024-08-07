# frozen_string_literal: true
# milestones of details page
class MilestoneComponent < ViewComponent::Base
  def initialize(milestone:)
    super
    @milestone = milestone
    prepare_data
  end

  def prepare_data
    if @milestone.status_in_progress?
      @update_progress = 'Mark as achieved'
      @update_progress_img = 'markAchieved.svg'
      @message_img = 'markAchieved.svg'
      @status = 'achieved'
      @message = 'Work In Progress'
      @background = 'bg-zircon'
      @text_color = 'text-blackCoral'
    elsif @milestone.status_achieved?
      @update_progress = 'Undo'
      @update_progress_img = 'undoProgress.svg'
      @message_img = 'achieved.svg'
      @status = 'in_progress'
      @message = 'Achieved'
      @background = 'bg-cornsilk'
      @text_color = 'text-yankeesBlue'
    end
  end
end
