var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(3003, function() {

    console.log('Express server listening on port');

	app.post('/', function (req, res) {
		console.log(req.body)
		res.send('POST request to widget');

		fs.writeFile('app/_data/front.json', req.body['json'], function (err) {
			if (err) throw err;
			console.log('It\'s saved!');
		});
	});

	app.get('/', function (req, res) {
		res.send('Yo');
	});
});