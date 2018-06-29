let neo4j = require('neo4j-driver').v1;

function CemiterioDAO( connection ) {
	this._connection = connection;
}

CemiterioDAO.prototype.mapa = function( callback ) {
	this._connection.run(`
		MATCH (i)<-[:rua]-(i2)
        RETURN i.name AS interseccao,
               i.x AS x,
               i.y AS y,
               collect(i2.name) AS relacionado
        ORDER BY i.name`).then( callback );
}

CemiterioDAO.prototype.rotaPontoAPonto = function( dados, callback ) {
	this._connection.run(`
        MATCH (from:${dados.tipoPI} {name:"${dados.pontoInicial}"}), (to:${dados.tipoPF} {name:"${dados.pontoFinal}"}),
			path =shortestPath((from)-[:rua*]->(to))
		RETURN extract(i IN nodes(path) | i.name) AS caminho`).then( callback );
}

CemiterioDAO.prototype.rotaPontoAPessoa = function( dados, callback ) {
	this._connection.run(`
		MATCH (from:${dados.tipoPI} {name:"${dados.pontoInicial}"}), (to:${dados.tipoPF} {name:"${dados.pontoFinal}"}),
			path =shortestPath((from)-[*]->(to))
		RETURN extract(i IN nodes(path) | i.name) AS caminho`).then( callback );
}

CemiterioDAO.prototype.cadastrarInterseccao = function( dados, callback ) {
	this.verificarInterseccao(dados, function( dadosInteseccao ) {
		if( dadosInteseccao.records.length == 0 ) {
			let connection = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'temkill1234!@#')).session();
			connection.run(`
				CREATE (${dados.name}:Interseccao {name:"${dados.name}", x:${dados.x}, y:${dados.y}})`).then( function(){
					connection.close();
					callback();
				});
		} else {
			callback();
		}
	});
}

CemiterioDAO.prototype.cadastrarTumulo = function( dados, callback ) {
	this._connection.run(`
		CREATE (${dados.name}:Tumulo {name:"${dados.name}", vagas:1, x:${dados.x}, y:${dados.y}})`).then( callback );
}

CemiterioDAO.prototype.cadastrarRelacao = function( dados, callback ) {
	this._connection.run(`
		MATCH (E1:${dados.tipoE1}{name:"${dados.nomeE1}"}), (E2:${dados.tipoE2}{name:"${dados.nomeE2}"})
		CREATE (E1)-[:rua]->(E2)-[:rua]->(E1)`).then( callback );
}

CemiterioDAO.prototype.verificarInterseccao = function( dados, callback ) {
	this._connection.run(`
		MATCH (i:Interseccao {name:"${dados.name}"})
        RETURN
        	i.name AS interseccao,
        	i.x    AS x,
        	i.y    AS y `).then( callback );
}

module.exports = function() {
	return CemiterioDAO;
}