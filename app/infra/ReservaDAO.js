function ReservaDAO( connection ) {
	this._connection = connection;
}

ReservaDAO.prototype.listar = callback => {
	let sql = "SELECT * FROM Reserva";
	conn.query( sql, [], callback );
}

ReservaDAO.prototype.detalhes = ( id, callback ) => {
	let sql = "SELECT * FROM Reserva WHERE idReserva = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}

ReservaDAO.prototype.insert = ( dados, callback ) => {
	let sql = `
		INSERT INTO Reserva
			( idUsuario, idSala, dataReserva )
		VALUES
			( ?, ?, ? )`;
	let values = [ dados.idUsuario, dados.idSala, dados.dataReserva ];
	conn.query( sql, values, callback );
}

ReservaDAO.prototype.update = ( dados, callback ) => {
	let sql = `
		UPDATE Reserva
		SET
			idUsuario = ?,
			idSala = ?,
			dataReserva = ?
		WHERE idReserva = ?`;
	let values = [ dados.idUsuario, dados.idSala, dados.dataReserva, dados.idReserva ];
	conn.query( sql, values, callback );
}

ReservaDAO.prototype.delete = ( id, callback ) => {
	let sql = "DELETE FROM Reserva WHERE idReserva = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}