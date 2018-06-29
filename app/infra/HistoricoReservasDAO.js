function HistoricoReservasDAO( connection ) {
	this._connection = connection;
}

HistoricoReservasDAO.prototype.listar = callback => {
	let sql = "SELECT * FROM HistoricoReservas";
	conn.query( sql, [], callback );
}

HistoricoReservasDAO.prototype.detalhes = ( id, callback ) => {
	let sql = "SELECT * FROM HistoricoReservas WHERE idHistoricoReserva = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}

HistoricoReservasDAO.prototype.insert = ( dados, callback ) => {
	let sql = `
		INSERT INTO HistoricoReservas
			( idUsuario, idSala, dataReserva, estadoConservacao )
		VALUES
			( ?, ?, ?, ?, ? )`;
	let values = [ dados.idHistoricoReserva, dados.idUsuario, dados.idSala, dados.dataReserva, dados.estadoConservacao ];
	conn.query( sql, values, callback );
}

HistoricoReservasDAO.prototype.update = ( dados, callback ) => {
	let sql = `
		UPDATE HistoricoReservas
		SET
			tipoHistoricoReservas = ?,
			status = ?,
			descricao = ?,
			local = ?,
			estadoConservacao = ?,
			numero = ?
		WHERE idHistoricoReserva = ?`;
	let values = [ dados.tipoHistoricoReservas, dados.status, dados.descricao, dados.local, dados.estadoConservacao, dados.numero, dados.idHistoricoReserva ];
	conn.query( sql, values, callback );
}

HistoricoReservasDAO.prototype.delete = ( id, callback ) => {
	let sql = "DELETE FROM HistoricoReservas WHERE idHistoricoReserva = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}