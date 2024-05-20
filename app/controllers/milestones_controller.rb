# frozen_string_literal: true

class MilestonesController < ApplicationController
  before_action :set_milestone, only: %i[show edit update destroy
                                         update_progress achieve_milestone sort_all sort_in_progress]
  before_action :set_goal, only: %i[new edit update]

  def create
    @milestone = Milestone.new(description: create_milestone_params[:description])
    @goal = Goal.find(create_milestone_params[:goal][:goal_id])
    @goal.milestones << @milestone
    @goal.status_active! if @goal.status_achieved?
    respond_to do |format|
      if @milestone.save
        flash.now[:notice] = "Milestone #{@milestone.goal.milestones.count} is created"
        format.turbo_stream do
          render turbo_stream: [
            # in case of the milestone creation form
            # turbo_stream.append(:milestones, partial: 'milestone', locals: { milestone: @milestone }),

            # in case of the milestone creation in the goal details page
            turbo_stream.append(:inProgressMilestones, partial: 'milestone', locals: { milestone: @milestone }),
            turbo_stream.append(:allMilestones, partial: 'milestone', locals: { milestone: @milestone }),

            turbo_stream.prepend(:flash, partial: 'partials/common/notification', locals: { style: 'green-flash' })
          ]
        end
      end
    end
  end

  def sort_all
    @milestone.update(row_order_position:
                        params[:row_order_position])
    head :no_content
  end

  def sort_in_progress
    @milestone.update(in_progress_row_order_position:
                        params[:in_progress_row_order_position])
    head :no_content
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
    @milestones = Milestone.rank(:row_order).all
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
    flash.now[:notice] = 'Goal Complete!' if @milestone.goal.status_achieved?

    respond_to do |format|
      format.turbo_stream do
        case params[:status]
        when 'achieved'
          render turbo_stream: [
            turbo_stream.prepend('achievedMilestones', @milestone),
            turbo_stream.prepend(:flash,
                                 partial: 'partials/common/notification',
                                 locals: { style: 'yellow-flash',
                                           image: 'flashCup' })
          ]
        when 'in_progress'
          render turbo_stream: [
            turbo_stream.prepend('inProgressMilestones', @milestone),
            turbo_stream.replace(@milestone,
                                 partial: 'milestone',
                                 locals: { milestone: @milestone })
          ]
        end
      end
    end
  end

  def achieve_milestone
    @milestone.update_progress('achieved')
    flash.now[:notice] = 'Goal Complete!' if @milestone.goal.status_achieved?

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(@milestone.goal,
                               partial: 'goals/goal',
                               locals: { goal: @milestone.goal }),
          turbo_stream.prepend(:flash,
                               partial: 'partials/common/notification',
                               locals: { style: 'yellow-flash', image: 'flashCup' })
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
