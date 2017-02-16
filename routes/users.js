var database = require('../database');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('get a user');
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

router.post('/', function (req, res) {
	res.send('post a user');
});

router.post('/create', function (req, res) {
	database.createUser(req.body, function(err, results) {
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
	// res.send(req.body);
});

module.exports = router;