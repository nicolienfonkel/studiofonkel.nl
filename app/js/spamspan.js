$(document).ready(function() {
    var spamspans = $('.spamspan');

    spamspans.each(function () {
        var unformattedEmail = $(this).text();
        unformattedEmail = unformattedEmail.replace('[at]', '@');
        unformattedEmail = unformattedEmail.replace('[dot]', '.');
        var formattedEmail = unformattedEmail.replace(/\s/g, '');


        var data = $(this).data();

        var params = '';
        $.each(data, function (index, value) {
            var paramName = index.substring(4).toLowerCase();
            var paramValue = value;

            if (params == '') {
                params = '?' + paramName + '=' + paramValue;
            }
            else {
                params = params + '&' + paramName + '=' + paramValue;
            }
        });

        var mailtoValue = formattedEmail

        if (params != '') {
            mailtoValue = formattedEmail + params;
        }

        var newHTML = '<a href="mailto:' + mailtoValue + '">' + formattedEmail + '</a>'

        $(this).html(newHTML);
    });
});
