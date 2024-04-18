# frozen_string_literal: true

class AddEndDateToGoal < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :end_date, :datetime
  end
end
