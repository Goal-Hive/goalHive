# frozen_string_literal: true
class MilestonesController < ApplicationController
  def add_milestone
    respond_to do |format|
      format.turbo_stream do
        milestone = @goal.milestones.build
        render turbo_stream: [turbo_stream.append(:milestones, partial: "milestone_fields", locals: { f: milestone })]
      end
    end
  end

  def remove_milestone
    respond_to do |format|
      format.turbo_stream do
        milestone = @goal.milestones.find(params[:id])
        milestone.mark_for_destruction
        render turbo_stream: [turbo_stream.remove(:milestone, milestone)]
      end
    end
  end
end