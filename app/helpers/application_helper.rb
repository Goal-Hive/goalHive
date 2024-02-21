# frozen_string_literal: true

module ApplicationHelper
  def active_link_to(text = nil, path = nil, **options, &block)
    path ||= text

    if current_page?(path)
      options[:class] =
        class_names(options[:class], 'active-header-link')
    end

    return link_to(path, options, &block) if block_given?

    link_to text, path, options
  end
end
