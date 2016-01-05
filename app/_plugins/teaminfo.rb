require 'json'

module Jekyll
  class TeamInfoTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
    end

    def render(context)
      output = <<-eos
        <script type="text/javascript">var teaminfo = #{context.environments[0]["site"]["data"]["team"].to_json()};</script>
      eos
      output
    end
  end
end

Liquid::Template.register_tag('teaminfo', Jekyll::TeamInfoTag)