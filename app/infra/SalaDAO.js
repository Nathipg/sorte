function SalaDAO( connection ) {
	this._connection = connection;
}

SalaDAO.prototype.listar = callback => {
	let sql = "SELECT * FROM Sala";
	conn.query( sql, [], callback );
}

SalaDAO.prototype.detalhes = ( id, callback ) => {
	let sql = "SELECT * FROM Sala WHERE idSala = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}

SalaDAO.prototype.insert = ( dados, callback ) => {
	let sql = `
		INSERT INTO Sala
			( tipoSala, status, descricao, local, estadoConservacao, numero )
		VALUES
			( ?, ?, ?, ?, ?, ? )`;
	let values = [ dados.tipoSala, dados.status, dados.descricao, dados.local, dados.estadoConservacao, dados.numero ];
	conn.query( sql, values, callback );
}

SalaDAO.prototype.update = ( dados, callback ) => {
	let sql = `
		UPDATE Sala
		SET
			tipoSala = ?,
			status = ?,
			descricao = ?,
			local = ?,
			estadoConservacao = ?,
			numero = ?
		WHERE idSala = ?`;
	let values = [ dados.tipoSala, dados.status, dados.descricao, dados.local, dados.estadoConservacao, dados.numero, dados.idSala ];
	conn.query( sql, values, callback );
}

SalaDAO.prototype.delete = ( id, callback ) => {
	let sql = "DELETE FROM Sala WHERE idSala = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}

module.exports = function() {
	return SalaDAO;
}