var database = require('../database');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('a user');
});
router.post('/', function (req, res) {
	res.send('post a user');
});

router.get('/:id/pal', function(req, res) {
	var id = req.param('id');

	database.getPal(id, function(err, results) {
		if (err) {
			res.send(500, "Server Error");
		} else {
			// Respond with results as JSON
			res.send(results);
		}
	});

	// res.send(id);
});

module.exports = router;