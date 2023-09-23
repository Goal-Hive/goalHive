# frozen_string_literal: true

class GoalsController < ApplicationController
  before_action :set_goal, only: %i[show edit update destroy update_status], except: %i[filter_by_category]
  before_action :set_goals, only: %i[index filter_by_category filter_by_status]
  has_scope :by_category
  has_scope :by_status

  # GET /goals or /goals.json
  def index; end

  def filter_by_category

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace('goals',
                               template: 'goals/index')
        ]
      end
    end
  end

  def filter_by_status
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace('goals',
                               template: 'goals/index')
        ]
      end
    end
  end

  # GET /goals/1 or /goals/1.json
  def show; end

  # GET /goals/new
  def new
    @goal = Goal.new
    @goal.milestones.build
  end

  # GET /goals/1/edit
  def edit; end

  # POST /goals or /goals.json
  def create
    @goal = Goal.new(goal_params)
    @goal.user = current_user
    respond_to do |format|
      if @goal.save
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.prepend('goals',
                                 partial: 'goals/goal',
                                 locals: { goal: @goal }),
            turbo_stream.update('notice', 'Goal was successfully created.')
          ]
        end
        format.html { redirect_to goal_url(@goal), notice: 'Goal was successfully created.' }
        format.json { render :show, status: :created, location: @goal }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /goals/1 or /goals/1.json
  def update
    respond_to do |format|
      if @goal.update(goal_params)
        format.html { redirect_to goal_url(@goal), notice: 'Goal was successfully updated.' }
        format.json { render :show, status: :ok, location: @goal }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /goals/1 or /goals/1.json
  def destroy
    @goal.destroy

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(@goal),
        ]
      end
    end
  end

  def update_status
    @goal.toggle_status
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(@goal,
                              partial: 'goals/goal',
                              locals: { goal: @goal }),
        ]
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_goal
    @goal = Goal.find(params[:id])
  end

  def set_goals
    @goals = apply_scopes(current_user.goals.order(created_at: :desc)).all
  end


  # Only allow a list of trusted parameters through.
  def goal_params
    params.require(:goal).permit(:description, :motivation, :category_id, :begin_date, :end_date, milestones_attributes: %i[id description _destroy])
  end
end
