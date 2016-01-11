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
	})

	// animatePageTitle()

	// $(window).on('scroll', function(){
	// 	window.requestAnimationFrame(animatePageTitle);
	// });

	// function animatePageTitle() {
	// 	var titleTop = $('.page-heading').offset().top - ($('.header').height() - 30)
	// 	if (window.scrollY > $('.page-heading').offset().top - $('.header').height()) {
	// 		$('.page-title-inside-header').css({
	// 			top: titleTop - window.scrollY
	// 		})

	// 	}

	// 	// Stick
	// 	if (titleTop - window.scrollY <= -6) {
	// 		$('.page-title-inside-header').css({
	// 			top: -6
	// 		})
	// 		console.log('kleiner');
	// 	} 

	// 	// Moving
	// 	if (titleTop - window.scrollY >= -6) {
	// 		console.log('groter');

	// 		$('.page-title-inside-header').css({
	// 			top: titleTop - window.scrollY
	// 		})
	// 	}
	// }
})