function ReservaDAO( connection ) {
	this._connection = connection;
}

ReservaDAO.prototype.listar = callback => {
	let sql = `
		SELECT
			r.*,
			CONCAT( u.nome, ' ', u.sobrenome ) AS usuario,
			CONCAT( s.tipoSala, ': ', s.local, ' ', s.numero ) AS sala
		FROM Reserva AS r
		     INNER JOIN Usuario AS u
		             ON u.idUsuario = r.idUsuario
		     INNER JOIN Sala AS s
		             ON s.idSala = r.idSala`;
	this._connection.query( sql, [], callback );
}

ReservaDAO.prototype.detalhes = ( id, callback ) => {
	let sql = "SELECT * FROM Reserva WHERE idReserva = ?";
	let values = [ id ];
	this._connection.query( sql, values, callback );
}

ReservaDAO.prototype.insert = ( dados, callback ) => {
	let sql = `
		INSERT INTO Reserva
			( idUsuario, idSala, dataReserva )
		VALUES
			( ?, ?, ? )`;
	let values = [ dados.idUsuario, dados.idSala, dados.dataReserva ];
	this._connection.query( sql, values, callback );
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
	this._connection.query( sql, values, callback );
}

ReservaDAO.prototype.delete = ( id, callback ) => {
	let sql = "DELETE FROM Reserva WHERE idReserva = ?";
	let values = [ id ];
	this._connection.query( sql, values, callback );
}

module.exports = function() {
	return ReservaDAO;
}