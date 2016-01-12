$(document).ready(function() {
	$('.hamburger').on('click', function() {
		$('body').toggleClass('has-active-menu');
	})

	$("#contactTextArea").autoGrow({
		extraLine: true // Adds an extra line at the end of the textarea. Try both and see what works best for you.
	});
});