class AddBeginDateToGoal < ActiveRecord::Migration[7.0]
  def change
    add_column :goals, :begin_date, :datetime
  end
end
