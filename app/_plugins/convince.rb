module Jekyll
  class ConvinceTag < Liquid::Tag
    def initialize(tag_name, convince, tokens)
        super
        @convince = convince.strip
    end

    def render(context)
	    site = context.registers[:site]

	    output = ''
	    items = Array.new

	    site.collections['convince'].docs.each do |convince_item|
	    	item_output = convince_item.to_liquid
	    	relative_path_splitted = item_output['relative_path'].split('/')


	    	if relative_path_splitted[1] == @convince
	    		items.push(item_output)
	    	end
	    end

	    filename = site.source + '/_includes/convince.html'
		file = File.open(filename, "rt")

		@template = Liquid::Template.parse(file.read)

		output = @template.render({
		'items' => items
		}).to_s

	    output
    end
  end
end

Liquid::Template.register_tag('convince', Jekyll::ConvinceTag)