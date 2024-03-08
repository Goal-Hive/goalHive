# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy sort]

  # GET /categories or /categories.json
  def index
    @categories = current_user.categories
  end

  def sort
    @category.update(row_order_position:
                       params[:row_order_position])
    head :no_content
  end

  # GET /categories/1 or /categories/1.json
  def show; end

  # GET /categories/new
  def new
    @category = Category.new
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.prepend('categories',
                               partial: 'categories/form',
                               locals: { category: @category })
        ]
      end
    end
  end

  # POST /categories or /categories.json
  def create
    @category = Category.new(category_params)
    @category.user = current_user
    respond_to do |format|
      if @category.save
        flash.now[:notice] = "Category #{@category.name} is created"
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.append('categories',
                                partial: 'categories/category',
                                locals: { category: @category }),
            turbo_stream.remove('new_category'),
            turbo_stream.prepend(:flash,
                                 partial: 'partials/common/notification',
                                 locals: {style: 'green-flash'})
          ]
        end
        #   format.html { redirect_to category_url(@category), notice: 'Category was successfully created.' }
        #   format.json { render :show, status: :created, location: @category }
        # else
        #   format.html { render :new, status: :unprocessable_entity }
        #   format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # post /categories/1/edit
  def edit
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.replace(@category,
                               partial: 'categories/form',
                               locals: { category: @category })
        ]
      end
    end
  end

  # PATCH/PUT /categories/1 or /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.replace(@category,
                                 partial: 'categories/category',
                                 locals: { category: @category,
                                           selected: params[:selected].to_boolean
                                 }),
            turbo_stream.update('notice', 'Category is Updated')
          ]
        end
        # format.html { redirect_to category_url(@category), notice: 'Category was successfully updated.' }
        # format.json { render :show, status: :ok, location: @category }
      else
        format.turbo_stream do
          render turbo_stream: [
            turbo_stream.replace(@category,
                                 partial: 'categories/form',
                                 locals: { category: @category })
          ]
        end
        # format.html { render :edit, status: :unprocessable_entity }
        # format.json { render json: @category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /categories/1 or /categories/1.json
  def destroy
    @category.destroy
    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: [
          turbo_stream.remove(@category),
          turbo_stream.update('notice', 'Category is removed'),
          turbo_stream.replace('goals',
                               partial: 'goals/list',
                               locals: { goals: current_user.goals.status_active.all })
        ]
      end
      # format.html { redirect_to categories_url, notice: 'Category was successfully destroyed.' }
      # format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_category
    @category = Category.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def category_params
    params.require(:category).permit(:name)
  end

end
