function UsuarioDAO( connection ) {
	this._connection = connection;
}

UsuarioDAO.prototype.listar = callback => {
	let sql = "SELECT * FROM Usuario";
	conn.query( sql, [], callback );
}

UsuarioDAO.prototype.detalhes = ( id, callback ) => {
	let sql = "SELECT * FROM Usuario WHERE idUsuario = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}

UsuarioDAO.prototype.insert = ( dados, callback ) => {
	let sql = `
		INSERT INTO Usuario
			( cpf, nome, sobrenome, departamento, funcao, senha )
		VALUES
			( ?, ?, ?, ?, ?, ? )`;

	let values = [ dados.cpf, dados.nome, dados.sobrenome, dados.departamento, dados.funcao, dados.senha ];
	conn.query( sql, values, callback );
}

UsuarioDAO.prototype.update = ( dados, callback ) => {
	let sql = `
		UPDATE Usuario
		SET
			cpf = ?,
			nome = ?,
			sobrenome = ?,
			departamento = ?,
			funcao = ?,
			senha = ?
		WHERE idUsuario = ?`;
	let values = [ dados.cpf, dados.nome, dados.sobrenome, dados.departamento, dados.funcao, dados.senha, dados.idUsuario ];
	conn.query( sql, values, callback );
}

UsuarioDAO.prototype.delete = ( id, callback ) => {
	let sql = "DELETE FROM Usuario WHERE idUsuario = ?";
	let values = [ id ];
	conn.query( sql, values, callback );
}

module.exports = function() {
	return UsuarioDAO;
}