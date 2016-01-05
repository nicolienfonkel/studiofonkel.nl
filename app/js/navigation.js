$(document).ready(function() {

	function addClass(position) {
		if (position > 60) {
			if ($('body').hasClass('breakpoint')) {

			} else {
				$('body').addClass('breakpoint');
			}
		} else {
			$('body').removeClass('breakpoint');
		}
	}

	function addLogo(position) {
		if (position > 60) {
			$('body').addClass('showNavLogo');
		} else {
			$('body').removeClass('showNavLogo');
		}
	}
	
	$(window).scroll(function() {
		var windowPos = $(window).scrollTop();

		addClass(windowPos)

		addLogo(windowPos)
	})
})