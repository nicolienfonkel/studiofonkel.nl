$(document).ready(function() {
	$("#contactTextArea").autoGrow({
		extraLine: true // Adds an extra line at the end of the textarea. Try both and see what works best for you.
	});


	$('#contact-form').emailMandrill({
        mandrillKey: 'n7FhK7Fj5IBbME_eZiA_BQ',
        wait: function () {
            $('body').addClass('mandrill-waiting');
            $('#contact-form button').text('Verzenden')
        },
        success: function () {
            $('body').removeClass('mandrill-waiting');
            $('body').addClass('mandrill-success');
            $('#contact-form button').text('Verzonden')
            
        },
        emails: [
            {
                from: 'contact@studiofonkel.nl',
                subject: 'Bericht via studiofonkel.nl',
                to: ['info@studiofonkel.nl'],
                fromNameField: 'name',
                phoneNumber: 'phone',
                replyToField: 'email'
                // fromName: 'John Smith', 
                // toField: '',
                // replyTo: 'mail@domain.com',
            }
        ]
    });
 
}); 