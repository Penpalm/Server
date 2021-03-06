var database = require('../database/connection');
var database = require('../services/message-service');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('get a message');
});

router.get('/:id/pal', function(req, res) {
	var id = req.param('id');

	database.getUnreadMessages(id, function(err, results) {
		if (err) {
			res.status(500).send("Server Error");
		} else {
			if (results.length) {
				res.status(200).send(results);
			} else {
				res.status(204).send("No results found");
			}
		}
	});
});

router.post('/', function (req, res) {
	res.send('post a user');
});

router.post('/create', function (req, res) {
	database.saveMessage(req.body, function(err, results) {
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

module.exports = router;