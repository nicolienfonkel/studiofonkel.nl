module Jekyll
  class ImageTag < Liquid::Tag

    def initialize(tag_name, text, tokens)

      @params = text[1..-3].split('" "')
      @url = @params[0]
      @type = @params[1]
      @description = @params[2]
      @alt = @params[3]

    end

    def render(context)
      if @description
        @caption = "<figcaption class='image-caption'>#{@description}</figcaption>"
      else
        @caption = ''
      end

      if @type == "full"
        @image = "<div class='background-image' style='background-image: url(#{@url})'></div>"
      else
        @image = "<img src='#{@url}' alt='#{@alt}' title='#{@alt}'>"
      end

      "<figure class='image image-#{@type}'><div class='image-inner'>#{@image}</div>#{@caption}</figure>"
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)