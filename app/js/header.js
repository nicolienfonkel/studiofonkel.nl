$(document).ready(function() {

    var logo = $('.site-logo.head');


	$('.hamburger').on('click', function() {
		$('body').toggleClass('has-active-menu');
	});

	$(window).scroll(function() {

		var scrollTop = $(window).scrollTop();

        if (scrollTop <= 70) {
            logo.css({top: 70 - scrollTop + 'px'});
            $('body').removeClass('has-fixed-menu');
        }
        else {
            logo.css({top: 0});
            $('body').addClass('has-fixed-menu');
        }


		var footerPos = $('.footer').offset().top;

		if ($(window).scrollTop() >= footerPos) {
			$('body').addClass('has-hidden-header');
		} else {
			$('body').removeClass('has-hidden-header');
		}
	});
});







