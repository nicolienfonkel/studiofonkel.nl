$(document).ready(function() {
	$('.hamburger').on('click', function() {
		$('body').toggleClass('has-active-menu');
	})

	$("#contactTextArea").autoGrow({
		extraLine: true // Adds an extra line at the end of the textarea. Try both and see what works best for you.
	});

	$(function() {

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
	                fromNameField: 'name',
	                // fromName: 'John Smith',
	                // toField: '',
	                to: ['theobouwman98@gmail.com'],
	                // replyTo: 'mail@domain.com',
	                replyToField: 'email',
	                subject: 'Bericht via studiofonkel.nl',
	                phoneNumber: 'phone'
	            }
	        ]
	    });

	}

	$('#contact-form button').on('click', function() {
		var count = 0;
		$('#contact-form .field').each(function() {
			if (!$(this).val()) {
				$(this).addClass('empty');
				count = count - 1;
			} else {
				$(this).removeClass('empty');
				count = count + 1;
			}
			return count;
		})

		console.log(count);

		// Number of required fields | current 4
		if (count == 4) {
			$('#contact-form').submit();
		};
	});
}); 