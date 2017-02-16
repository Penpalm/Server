var mysql = require('mysql');

var pool = mysql.createPool({
	host: '35.185.61.227',
	user: 'root',
	password: 'palm',
	database: 'penpalm',
	connectionLimit: 10,
	supportBigNumbers: true
});

// Get records from a city
exports.getPal = function(user_id, callback) {
	var sql = "SELECT * FROM USER WHERE fk_pal = ?";
	// get a connection from the pool
	pool.getConnection(function(err, connection) {
		if(err) { console.log(err); callback(true); return; }
		// make the query
		connection.query(sql, [user_id], function(err, results) {
			connection.release();
			if(err) { console.log(err); callback(true); return; }
			callback(false, results);
		});
	});
};