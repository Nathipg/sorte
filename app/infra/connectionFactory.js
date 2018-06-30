let mysql = require('mysql');
let connection = mysql.createConnection({
	host     : 'localhost',
	port     : 3306,
    user     : 'root',
	password : 'root',
	database : 'testenode'
});

module.exports = function () {
	connection.connect(function(err) {
  		if (err) return err
  		console.log("Conectado ao banco!");
	});
}

// function createDBConnection() {
// 	connection.connect(function(err) {
//   		if (err) return err
//   		console.log("Conectado!");
// 	});
// }