let neo4j = require('neo4j-driver').v1;

function createDBConnection() {
	return neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'temkill1234!@#')).session();
}

module.exports = function () {
	return createDBConnection;
}