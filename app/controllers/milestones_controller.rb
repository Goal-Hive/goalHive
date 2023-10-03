# frozen_string_literal: true
class MilestonesController < ApplicationController
  before_action :set_milestone, only: %i[show edit update destroy update_progress achieve_milestone]
  before_action :set_goal, only: %i[new edit update]

  def create
    @milestone = Milestone.new(description: create_milestone_params[:description])
    @goal = Goal.find(create_milestone_params[:goal][:goal_id])
    @goal.milestones << @milestone
    respond_to do |format|
      if @milestone.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.append(:milestones, partial: 'milestone', locals: { milestone: @milestone }),
            turbo_stream.append(:inProgressMilestones, partial: 'milestone', locals: { milestone: @milestone })
          ]
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

  # DELETE /milestones/1
  def destroy
    @milestone.destroy
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(@milestone)
        ]
      end
    end
  end

  def update_progress
    @milestone.update_progress(params[:status])
    respond_to do |format|
      format.turbo_stream do
        if params[:status] == 'achieved'
          render turbo_stream: [
            turbo_stream.prepend('achievedMilestones', @milestone),
            turbo_stream.replace(@milestone, partial: 'milestone', locals: { milestone: @milestone })
          ]
        elsif params[:status] == 'in_progress'
          render turbo_stream: [
            turbo_stream.prepend('inProgressMilestones', @milestone),
            turbo_stream.replace(@milestone, partial: 'milestone', locals: { milestone: @milestone })
          ]
        end
      end
    end
  end

  def achieve_milestone
    @milestone.status_achieved!
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(@milestone.goal,
                               partial: 'goals/goal',
                               locals: { goal: @milestone.goal })
        ]
      end
    end
  end

  def set_milestone
    @milestone = Milestone.find(params[:id])
  end

  def set_goal
    @goal = if @milestone
              @milestone.goal
            else
              Goal.find(params[:goal_id])
            end
  end

  def milestone_params
    params.require(:milestone).permit(:description, :goal_id)
  end

  def create_milestone_params
    params.require(:milestone).permit(:description, goal: [:goal_id])
  end
end