# frozen_string_literal: true

class GoalProgressComponent < ViewComponent::Base
  def initialize(percentage:)
    @percentage = percentage
  end

end
