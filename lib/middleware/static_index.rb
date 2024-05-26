# lib/middleware/static_index.rb
class StaticIndex
  def initialize(app)
    @app = app
  end

  def call(env)
    if env['PATH_INFO'] == '/'
      env['PATH_INFO'] = '/index.html'
    end
    @app.call(env)
  end
end