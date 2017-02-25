var database = require('../database/connection');
var userService = require('../services/user-service');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var auth = req.header('Authorization');
	userService.getUser(auth, function(success, user) {
		if (success) {
			if (user) {
				res.status(200).send(user);
			} else {
				res.status(204).send("user not created/fb user not found");
			}
		} else {
			res.status(500).send("system failure");
		}
	});
});

router.get('/:id/pal', function(req, res) {
	var id = req.param('id');

	database.getPal(id, function(err, results) {
		if (err) {
			res.status(500).send("Server Error");
		} else {
			if (results.length) {
				res.status(200).send(results[0]);
			} else {
				res.status(204).send("No results found");
			}
		}
	});
});

router.get('/:id/messages', function(req, res) {
	var id = req.param('id');

	database.getPal(id, function(err, results) {
		if (err) {
			res.status(500).send("Server Error");
		} else {
			if (results.length) {
				res.status(200).send(results[0]);
			} else {
				res.status(204).send("No results found");
			}
		}
	});
});

router.post('/', function (req, res) {
	res.send('post a user');
});

module.exports = router;