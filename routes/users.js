var express = require('express');
var router = express.Router();

module.exports = function (connection) {
	router.use(function timeLog(req, res, next) {
		console.log('Time: ', Date.now());
		next();
	});

	router.get('/', function(req, res) {
		res.send('a user');
	});
	router.post('/', function (req, res) {
		res.send('post a user');
	});

	router.get('/:id/pal', function(req, res) {
		var id = req.param('id');

		connection.connect();

		connection.query('SELECT * from USER where fk_pal = ' + id, function(err, rows, fields) {
			if (!err)
				console.log('The solution is: ', rows.get);
			else
				console.log('Error while performing Query.');
		});

		connection.end();

		res.send(id);
	});
};

// module.exports = router;