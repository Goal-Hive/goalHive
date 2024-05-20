# frozen_string_literal: true

class GoalsController < ApplicationController
  before_action :set_goal, only: %i[show edit update destroy update_status update_motivation update_category]
  before_action :set_goals, only: %i[index]
  before_action :set_current_filters, only: %i[create filter index]
  before_action :filter_params, only: %i[filter]

  # GET /goals or /goals.json
  def index
    @goals = @goals.status_active
  end

  def filter
    category = filter_params[:category]
    status = filter_params[:status]
    @goals = current_user.goals.order(created_at: :desc).by_category_and_status(status, category)
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace('goals',
                               partial: 'goals/list',
                               locals: { goals: @goals })
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
    @goal.build_category
  end

  # GET /goals/1/edit
  def edit; end

  # POST /goals or /goals.json
  def create
    @goal = Goal.new(goal_params)
    @goal.category = find_or_create_category[:category]
    new_category = find_or_create_category[:new_category]
    @goal.user = current_user
    @goal.milestones_count = @goal.milestones.length
    respond_to do |format|
      if @goal.save
        flash.now[:notice] = 'Goal is created'
        format.turbo_stream do
          actions = []
          # if it is all category or same category and 'active status'
          if (@current_category == 'all' || @current_category.to_i == @goal.category_id) && @current_status == 'active'
            actions << turbo_stream.prepend('goals', partial: 'goals/goal',
                                            locals: { goal: @goal })
          end
          if new_category
            actions << turbo_stream.append('categories', partial: 'categories/category',
                                           locals: { category: @goal.category })
          end
          actions << turbo_stream.prepend(:flash,
                                          partial: 'partials/common/notification',
                                          locals: { style: 'green-flash' })

          render turbo_stream: actions
        end
        # format.html { redirect_to goal_url(@goal), notice: 'Goal was successfully created.' }
        # format.json { render :show, status: :created, location: @goal }
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
        format.turbo_stream do
          render turbo_stream: []
        end
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
    flash.now[:notice] = 'Goal Deleted'

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(@goal),
          turbo_stream.prepend(:flash,
                               partial: 'partials/common/notification',
                               locals: { style: 'red-flash', image: 'flashRemove' })
        ]
      end
    end
  end

  def update_status
    @goal.toggle_status
    flash.now[:notice] = "Goal #{@goal.status.capitalize}"
    image = @goal.status_paused? ? 'flashPause' : 'flashResume'

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(@goal),
          turbo_stream.prepend(:flash,
                               partial: 'partials/common/notification',
                               locals: { style: 'blue-flash', image: image })
        ]
      end
    end
  end

  def update_motivation
    @goal.update(motivation: params[:motivation].strip)
    flash.now[:notice] = 'Motivation has been updated'
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.prepend(:flash,
                               partial: 'partials/common/notification',
                               locals: { style: 'blue-flash' })
        ]
      end
    end
  end

  def update_category
    respond_to do |format|
      if @goal.update(category: find_or_create_category[:category])
        flash.now[:notice] = "Goal has been moved to: #{@goal.category.name.capitalize}"
        format.turbo_stream do
          render turbo_stream:
          turbo_stream.prepend(:flash,
                               partial: 'partials/common/notification',
                               locals: { style: 'blue-flash' })
        end
        format.html { redirect_to goal_url(@goal), notice: 'Goal was successfully updated.' }
        format.json { render :show, status: :ok, location: @goal }
      else
        format.html { render :show, status: :unprocessable_entity }
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_goal
    @goal = Goal.find(params[:id])
  end

  def set_goals
    @goals = current_user.goals.order(created_at: :desc).includes([:category])
  end

  def find_or_create_category
    new_category = false
    category = nil
    if goal_params.dig(:category_attributes, :name).present?
      new_category = true
      category = current_user.categories.build(name: goal_params[:category_attributes][:name])
    elsif goal_params[:category_id].present?
      category = Category.find(goal_params[:category_id])
    end
    { category:, new_category: }
  end

  # Only allow a list of trusted parameters through.
  def goal_params
    params.require(:goal).permit(:description,
                                 :motivation,
                                 :category_id,
                                 :begin_date,
                                 :end_date,
                                 :motivation_media,
                                 milestones_attributes: %i[id description _destroy],
                                 category_attributes: %i[name])
  end

  def filter_params
    params.require(:by_category_and_status).permit(:category, :status)
  end

  def set_current_filters
    case action_name
    when 'filter'
      session[:current_category] = filter_params[:category]
      session[:current_status] = filter_params[:status]
    when 'index'
      session[:current_category] = 'all'
      session[:current_status] = 'active'
    else
      @current_category = session[:current_category].empty? ? 'all' : session[:current_category]
      @current_status = session[:current_status].empty? ? 'active' : session[:current_status]
    end
  end
end
