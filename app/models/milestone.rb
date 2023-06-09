class Milestone < ApplicationRecord
  belongs_to :goal
  enum :status, [ :in_progress, :achieved, :archived ], default: :in_progress, prefix: true
end
