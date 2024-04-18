# frozen_string_literal: true

class ExampleComponentPreview < ViewComponent::Preview
  def with_default_title
    render(ExampleComponent.new(title: 'Example component default'))
  end
end
