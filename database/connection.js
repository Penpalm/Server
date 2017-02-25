var models = require('./models');
var queryBuilder = require('./query-builder');
var messageService = require('../services/message-service');
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
	var sql = "SELECT first_name, last_name, locale, gender FROM USER WHERE fk_pal = ? LIMIT 1";

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

exports.getUserWithFbUser = function(fbUser, callback) {
	var sql = "CALL GET_USER_WITH_FB_ID(?, ?, ?, ?, ?, ?, ?)";

	pool.getConnection(function(err, connection) {
		if (err) {
			callback(false);
			return;
		}

		connection.query(
			sql,
			[
				fbUser.id,
				fbUser.first_name,
				fbUser.last_name,
				fbUser.locale,
				fbUser.gender,
				fbUser.email,
				fbUser.birthday
			],
			function(err, results) {
				connection.release();

				if (err) {
					console.log(err);
					callback(false);

					return;
				}

				console.log(results);
				callback(true, results);
			}
		);
	});
};

exports.getUserWithId = function(id, callback) {
	var sql = "SELECT id, username, fk_pal FROM USER WHERE id = ? LIMIT 1";

	pool.getConnection(function(err, connection) {
		if (err) {
			console.log(err);
			callback(true);
			return;
		}
		connection.query(sql, [id], function(err, results) {
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

exports.getUnreadMessages = function(user_id, callback) {
	var sql = "SELECT first_name, last_name, locale, gender FROM MESSAGES WHERE fk_to = ?";

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

exports.saveMessage = function() {

};