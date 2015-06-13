var mysql = require('mysql');

function getConnection(){
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database:'nodeMsqlTest',
		port: 3306
	});

	connection.connect();
	return connection;
}

module.exports = getConnection;