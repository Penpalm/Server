var user = [
	{name: 'first_name', type:'string', required:true},
	{name: 'last_name', type:'string', required:true},
	{name: 'email', type:'string', required:true},
	{name: 'password', type:'string', required:true},
	{name: 'locale', type:'string', required:true},
	{name: 'created_on', type:'date', required:true},
	{name: 'gravatar_path', type:'string', required:false},
	{name: 'gender', type:'string', required:true},
	{name: 'fk_pal', type:'int', required:false}
];

var message = [
	{name: 'fk_from', type:'int', required:true},
	{name: 'fk_to', type:'int', required:true},
	{name: 'body', type:'string', required:true},
	{name: 'sent_on', type:'date', required:true},
	{name: 'read_on', type:'date', required:false}
];

exports.getUserModel = function() {
	return user;
};

exports.getMessageModel = function() {
	return message;
};