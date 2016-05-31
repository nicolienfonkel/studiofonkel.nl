$(document).ready(function() {
    $(document).keydown(function(e) {
        if (e.which == 59) {
            $('body').toggleClass('has-grid-overlay-enabled')
        }
    });
});
