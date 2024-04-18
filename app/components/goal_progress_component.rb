# frozen_string_literal: true
# milestones progress percentage
class GoalProgressComponent < ViewComponent::Base
  def initialize(percentage:)
    super
    @percentage = percentage
  end
end
