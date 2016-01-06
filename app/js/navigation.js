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
	
	$(window).scroll(function() {
		var windowPos = $(window).scrollTop();

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