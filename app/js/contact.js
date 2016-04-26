$(document).ready(function() {
	$("#contactTextArea").autoGrow({
		extraLine: true // Adds an extra line at the end of the textarea. Try both and see what works best for you.
	});


	$('#contact-form').jsClientMail({
        api: 'https://build.studiofonkel.nl/send-mail',
        wait: function () {
            $('body').addClass('mandrill-waiting');
            $('#contact-form button').text('Verzenden')
        },
        success: function () {
            $('body').removeClass('mandrill-waiting');
            $('body').addClass('mandrill-success');
            $('#contact-form button').text('Verzonden')
        },
        error: function (error) {
            $('#contact-form button').text('Oeps niet gelukt')
        }
    });

});
