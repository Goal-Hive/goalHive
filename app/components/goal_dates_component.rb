# frozen_string_literal: true
# Dates for goal card and details page
class GoalDatesComponent < ViewComponent::Base
  def initialize(dates:)
    super
    @dates = dates
    generate_dates
    format_dates
  end

  def generate_dates
    @created_at, @begin_date, @end_date = @dates.values_at(:created_at, :begin_date, :end_date)
  end

  def format_dates
    @created_at = @created_at&.strftime('%B %e, %Y')
    @begin_date = @begin_date&.strftime('%B %e, %Y')
    @end_date = @end_date&.strftime('%B %e, %Y')
  end
end
