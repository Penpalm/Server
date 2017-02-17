
exports.getInsert = function(config, table, model) {
	var fields = [];
	var values = [];

	for (i = 0; i < model.length; i++) {
		var fieldName = model[i]['name'];
		var required = model[i]['required'];

		if (config.hasOwnProperty(fieldName)) {
			fields.push(fieldName);
			values.push('"' + config[fieldName] + '"');
			console.log(config[fieldName]);
		} else if (required) {
			return 'Field ' + fieldName + ' missing'
		}
	}

	if (fields.length > 0 && fields.length == values.length) {
		return 'INSERT INTO ' + table + ' (' + fields.join(', ') + ') VALUES (' + values.join(', ') + ')';
	} else {
		return 'Query empty or invalid';
	}
};