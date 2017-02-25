var app = require('express')();
var database = require('../database/connection');
var https = require('https');

exports.getUser = function(fb_id, callback) {
	var getUserCallback = function(fbData) {
		var fbUser = JSON.parse(fbData);
		fbUser.gender = "M";
		fbUser.birthday = '2016-01-01';

		database.getUserWithFbUser(fbUser, function(success, data) {
			if (success) {
				var user = data[0][0];
				console.log(user);
				callback(success, user);
			} else {
				callback(success, null);
			}

		});
	};
	this.getFbData(
		"EAAZAaWKZCj7a4BADZAJYHAkCOVbfU20ymfSPRwKj5xIfJcRtIngger4wlDaFena0I8dmHKfsxhj6ZC5yuG8DCLcFXfIf1y6CCZB1HHc9pRnBkTWDzfEx9yx1imIsunZBjvKZBrBZCs1KeCRUGKOaOIFZBlRbNJmGB0bJxwVcZBxho9kZBdrCGjQApuYN0lzmtJuCaekQkrIFBQr7KSzbYaC57nSml1vMrcwjeAZD",
		getUserCallback
	);
};

exports.getFbData = function(token, callback) {
	var optionsget = {
		host: 'graph.facebook.com',
		port: 443,
		path: '/me?fields=id,locale,email,first_name,last_name&access_token=' + token,
		method: 'GET'
	};

	var reqGet = https.request(optionsget, function(res) {
		app.set('statusCode',res.statusCode);
		res.on('data', function(d) {
			var body = d.toString('utf8');
			callback(body);
		});
	});
	reqGet.end();

	reqGet.on('error', function(e) {
		console.error(e);
	});
};
