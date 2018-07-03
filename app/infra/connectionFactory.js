let mysql = require('mysql');
// let connection = mysql.createConnection({
// 	host     : 'localhost',
// 	port     : 3306,
//     user     : 'root',
// 	password : 'root',
// 	database : 'controlesalas'
// });

// function createDBConnection() {
// 	return connection.connect(function(err) {
//   		if (err) return err
//   		console.log("Conectado ao banco!");
// 	});
// }

function createDBConnection() {
	return mysql.createConnection({
		host     : 'localhost',
		port     : 3306,
	    user     : 'root',
		password : 'root',
		database : 'controlesalas'
	});
}

module.exports = function () {
	return createDBConnection;
}