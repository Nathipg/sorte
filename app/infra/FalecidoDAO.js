function FalecidoDAO( connection ) {
	this._connection = connection;
}

FalecidoDAO.prototype.lista = function( callback ) {
	this._connection.run(`
		MATCH (n:Falecido)
		RETURN n.name AS name
		ORDER BY n.name`).then( callback );
}

FalecidoDAO.prototype.cadastrarFalecido = function( dados, callback ) {
	this._connection.run(`
		CREATE (falecido:Falecido {name:"${dados.name}", dataNasc:"${dados.dataNasc}", dataFalec:"${dados.dataFalec}", causaMortis:"${dados.causaMortis}", epitafio:"${dados.epitafio}" })`)
		.then( callback );
}

FalecidoDAO.prototype.cadastrarRelacao = function( dados, callback ) {
	this._connection.run(`
		MATCH (E1:Falecido {name:"${dados.nomeE1}"}), (E2:Tumulo {name:"${dados.nomeE2}"})
		CREATE (E1)-[:jaz]->(E2)-[:jaz]->(E1)`).then( callback );
}

FalecidoDAO.prototype.detalhes = function( nome, callback ) {
	this._connection.run(`
		MATCH (f:Falecido {name: "${nome}"})
        RETURN f.name 	     AS name,
               f.dataNasc    AS dataNasc,
               f.dataFalec   AS dataFalec,
               f.epitafio    AS epitafio,
               f.causaMortis AS causaMortis`).then( callback );
}

FalecidoDAO.prototype.detalhesPorTumulo = function( tumulo, callback ) {
	this._connection.run(`
		MATCH (t:Tumulo {name:"${tumulo}"})-[:jaz]->(f:Falecido)
        RETURN f.name 	     AS name,
               f.dataNasc    AS dataNasc,
               f.dataFalec   AS dataFalec,
               f.epitafio    AS epitafio,
               f.causaMortis AS causaMortis`).then( callback );
}

FalecidoDAO.prototype.editarFalecido = function( dados, callback ) {
	this._connection.run(`
		MATCH (f:Falecido {name:"${dados.name}"})
		SET
			f.name = "${dados.name}",
			f.dataFalec = "${dados.dataFalec}"
			f.dataNasc = "${dados.dataNasc}"
			f.epitafio = "${dados.epitafio}"
			f.causaMortis = "${dados.causaMortis}"
		RETURN f`).then( callback );
}

module.exports = function() {
	return FalecidoDAO;
}