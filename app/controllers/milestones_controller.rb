# frozen_string_literal: true
class MilestonesController < ApplicationController
  before_action :set_milestone, only: %i[show edit update destroy update_progress]
  def create
    @milestone = Milestone.new(description: milestone_params[:description])
    @goal = Goal.find(milestone_params[:goal][:goal_id])
    @goal.milestones << @milestone
    respond_to do |format|
      if @milestone.save
        format.turbo_stream do
          render turbo_stream: [turbo_stream.append(:milestones, partial: "milestone", locals: { milestone: @milestone })]
        end
      end
    end
  end
  def add_milestone
    # respond_to do |format|
    #   format.turbo_stream do
    #     milestone = @goal.milestones.build
    #     render turbo_stream: [turbo_stream.append(:milestones, partial: "milestone_fields", locals: { f: milestone })]
    #   end
    # end
  end

  # def remove_milestone
  #   respond_to do |format|
  #     format.turbo_stream do
  #       milestone = @goal.milestones.find(params[:id])
  #       milestone.mark_for_destruction
  #       render turbo_stream: [turbo_stream.remove(:milestone, milestone)]
  #     end
  #   end
  # end

  # GET /milestones
  def index
    @milestones = Milestone.all
  end

  # GET /milestones/1
  def show; end

  # GET /milestones/new
  def new
    @milestone = Milestone.new
    @goal = Goal.find(params[:goal_id])
  end

  # GET /milestones/1/edit
  def edit
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.update(@milestone,
                              partial: 'milestones/form',
                              locals: { milestone: @milestone })
        ]
      end
    end
  end

  # PATCH/PUT /milestones/1
  def update
    respond_to do |format|
      if @milestone.update(milestone_params)
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.replace(@milestone,
                                 partial: 'milestones/milestone',
                                 locals: { milestone: @milestone }),
            turbo_stream.update('notice', 'Category is Updated')
          ]
        end
      else
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.replace(@milestone,
                                 partial: 'milestones/form',
                                 locals: { milestone: @milestone })
          ]
        end
      end
    end
  end

  def update_progress
    @milestone.update_progress(params[:status])
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(@milestone,
                              partial: 'milestone',
                              locals: { milestone: @milestone })
        ]
      end
    end
  end
  def set_milestone
    @milestone = Milestone.find(params[:id])
  end

  def milestone_params
    params.require(:milestone).permit(:description, goal: [:goal_id])
  end
end