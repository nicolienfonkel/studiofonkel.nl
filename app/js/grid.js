$(document).ready(function() {
	$(document).keypress(";",function(e) {
		if( e.ctrlKey) {
			$('body').toggleClass('has-grid-overlay-enabled');
		}
	});
});