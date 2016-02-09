$(document).ready(function() {
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
	});
});







