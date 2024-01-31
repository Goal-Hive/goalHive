# frozen_string_literal: true

class Milestone < ApplicationRecord
  belongs_to :goal, class_name: 'Goal', foreign_key: 'goal_id'

  enum :status, %i[in_progress achieved archived], default: :in_progress, prefix: true

  include RankedModel
  ranks :row_order,
        with_same: :goal_id

  ranks :in_progress_row_order,
        with_same: :goal_id,
        scope: :status_in_progress


  def update_progress(status)
    case status
    when 'achieved'
      status_achieved!
    when 'in_progress'
      status_in_progress!
    end
  end
end
