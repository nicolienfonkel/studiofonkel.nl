$(document).ready(function() {
	$('body').keydown(function(e) {
		if( e.ctrlKey && (e.keyCode == 186 || e.keyCode == 59)) {
			$('body').toggleClass('has-grid-overlay-enabled');
		}
	});
});