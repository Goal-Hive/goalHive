# frozen_string_literal: true

class CreateMilestones < ActiveRecord::Migration[7.0]
  def change
    create_table :milestones do |t|
      t.string :description
      t.references :goal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
