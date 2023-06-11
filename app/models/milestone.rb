class Milestone < ApplicationRecord
  belongs_to :goal
  enum :status, [ :in_progress, :achieved, :archived ], default: :in_progress, prefix: true

  def update_progress(status)
    case status
    when 'achieved'
      self.status_achieved!
    when 'in_progress'
      self.status_in_progress!
    end
  end
end
