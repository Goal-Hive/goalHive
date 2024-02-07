# frozen_string_literal: true

class GoalsController < ApplicationController
  before_action :set_goal, only: %i[show edit update destroy update_status]
  before_action :set_goals, only: %i[index]
  before_action :set_current_category, only: %i[create filter]
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
    @goal.category = find_or_create_category
    @goal.user = current_user
    respond_to do |format|
      if @goal.save
        format.turbo_stream do
          render turbo_stream:
                   if (@current_category == 'all' ||
                     @current_category.to_i == @goal.category_id) &&
                      @current_status == 'active'
                     [turbo_stream.prepend('goals',
                                           partial: 'goals/goal',
                                           locals: { goal: @goal }),
                      turbo_stream.append('categories',
                                          partial: 'categories/category',
                                          locals: { category: @goal.category })]
                   else
                     [turbo_stream.append('categories',
                                          partial: 'categories/category',
                                          locals: { category: @goal.category })]
                   end
        end
        format.html { redirect_to goal_url(@goal), notice: 'Goal was successfully created.' }
        format.json { render :show, status: :created, location: @goal }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @goal.errors, status: :unprocessable_entity }
      end
    end
  end

  def find_or_create_category
    if goal_params[:category_id].present?
      Category.find(goal_params[:category_id])
    elsif goal_params.dig(:category_attributes, :name).present?
      current_user.categories.build(name: goal_params[:category_attributes][:name])
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
          turbo_stream.remove(@goal)
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
                               locals: { goal: @goal })
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
    params.require(:goal).permit(:description,
                                 :motivation,
                                 :category_id,
                                 :begin_date,
                                 :end_date,
                                 milestones_attributes: %i[id description _destroy],
                                 category_attributes: [:name])
  end

  def filter_params
    params.require(:by_category_and_status).permit(:category, :status)
  end

  def set_current_category
    case action_name
    when 'filter'
      session[:current_category] = filter_params[:category]
      session[:current_status] = filter_params[:status]
    end
    @current_category = session[:current_category].empty? ? 'all' : session[:current_category]
    @current_status = session[:current_status].empty? ? 'active' : session[:current_status]
  end
end
