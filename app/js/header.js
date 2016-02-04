$(document).ready(function() {
	var mainLogoTop = 0;

	$('.hamburger').on('click', function() {
		$('body').toggleClass('has-active-menu');
	});

	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();

		if (scrollTop > 35) {
			$('body').addClass('has-fixed-menu');
		} else {
			$('body').removeClass('has-fixed-menu');
		}

		var footerPos = $('.footer').offset().top;

		if ($(window).scrollTop() >= footerPos) {
			$('body').addClass('has-hidden-header');
		} else {
			$('body').removeClass('has-hidden-header');
		}

		window.requestAnimationFrame(navLogo);

		if (scrollTop > 0) {
			$('.homepage .site-logo.head').css('display', 'block');
		}
	});

	//function navLogo() {
	//	if ($('.site-logo.home').length) {
	//		if (mainLogoTop == 0) {
	//			mainLogoTop = $('.site-logo.home').offset().top;
	//		}
	//
	//		var logoTop = mainLogoTop - $(window).scrollTop();
	//		if (logoTop < 10) {
	//			logoTop = 10
	//		}
    //
	//		$('.site-logo.head').css('top', logoTop);
	//	}
	//}

	//$(window).scroll()
	//navLogo()
});







