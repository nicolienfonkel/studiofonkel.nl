module Jekyll
  class ConvinceTag < Liquid::Tag

    def initialize(tag_name, convince, tokens)
        super
        @convince = convince
    end

    def render(context)
	    site = context.registers[:site]

	    output = ''

	    site.collections['convince'].docs.each do |convince_item|
	    	      item_output = convince_item.to_liquid
	    	output += item_output['relative_path']
	    end

	    output
    end
  end
end

Liquid::Template.register_tag('convince', Jekyll::ConvinceTag)