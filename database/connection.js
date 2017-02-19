var models = require('./models');
var queryBuilder = require('./query-builder');
var mysql = require('mysql');

var pool = mysql.createPool({
	host: '35.185.61.227',
	user: 'root',
	password: 'palm',
	database: 'penpalm',
	connectionLimit: 10,
	supportBigNumbers: true
});

exports.getPal = function(user_id, callback) {
	var sql = "SELECT * FROM USER WHERE fk_pal = ? LIMIT 1";

	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		connection.query(sql, [user_id], function(err, results) {
			connection.release();
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false, results);
		});
	});
};

exports.createUser = function(config, callback) {
	var sql = queryBuilder.getInsert(config, "USER", models.getUserModel());

	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}

		connection.query(sql, [config.first_name, config.last_name], function(err, results) {
			connection.release();
			if (err) {
				console.log(err);
				callback(true);
				return;
			}
			callback(false, results);
		});
	});
};