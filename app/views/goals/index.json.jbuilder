# frozen_string_literal: true

json.array! @goals, partial: 'goals/goal', as: :goal
