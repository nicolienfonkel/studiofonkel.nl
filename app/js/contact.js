$(document).ready(function() {
    $("#contactTextArea").autoGrow({
        extraLine: true // Adds an extra line at the end of the textarea. Try both and see what works best for you.
    });


    $('#contact-form').emailMandrill({
        mandrillKey: 'kg4HpxglJL9JPtqhAh6O5g',
        wait: function () {
            $('body').addClass('mandrill-waiting');
            $('#contact-form button').text('Verzenden');
        },
        success: function () {
            $('body').removeClass('mandrill-waiting');
            $('body').addClass('mandrill-success');
            $('#contact-form button').text('Verzonden');
            setTimeout(function () {
                window.location.replace("http://studiofonkel.nl/bedankt-voor-je-bericht");
            }, 500);
        },
        emails: [
            {
                from: 'info@studiofonkel.nl',
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