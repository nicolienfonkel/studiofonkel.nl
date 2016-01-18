$(document).ready(function() {

	function addClass(position) {
		if (position > 35) {
			if ($('body').hasClass('breakpoint')) {

			} else {
				$('body').addClass('breakpoint');
			}
		} else {
			$('body').removeClass('breakpoint');
		}
	}

	function hideHeader(position) {
		var footerPos = $('.footer').offset().top;
		if (position == footerPos) {
			if ($('body').hasClass('hideHeader')) {

			} else {
				$('body').addClass('hideHeader');
			}
		} else {
			$('body').removeClass('hideHeader');
		}
	}
	
	$(window).scroll(function() {
		var windowPos = $(window).scrollTop();
		var headerPos = $('.header').offset().top;

		hideHeader(headerPos);

		addClass(windowPos)

		window.requestAnimationFrame(navLogo);
		window.requestAnimationFrame(navFooter);
	})

	function navLogo() {

		if ($('.logo.home').length) {
			$('.logo.head').css('top', '10px');

			var logo1 = $('.logo.head')
			var logo2 = $('.logo.home')

			var logo1Offset = logo1.offset().top
			var logo2Offset = logo2.offset().top

			if (logo1Offset >= logo2Offset) {
				logo2.css('opacity','0')
				logo1.css('opacity','1')
			}
			else {
				logo1.css('opacity','0')
				logo2.css('opacity','1')
			}
		}

	}

	scroll = 0;
	function navFooter() {
		var headerOffset = Math.round(jQuery('.header').offset().top + 80)
		var footerOffset = Math.round(jQuery('.footer').offset().top)
		var difference =  headerOffset - footerOffset;
		// console.log('difference: '+difference);
		// console.log('footer: '+footerOffset);
		
		$('body').addClass('footerNav');
	}	

	navLogo();
	navFooter();
	addClass($(window).scrollTop())
})







