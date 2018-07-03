function UsuarioDAO( connection ) {
	this._connection = connection;
}

UsuarioDAO.prototype.listar = function(callback) {
	let sql = "SELECT * FROM Usuario";
	this._connection.query( sql, [], callback );
}

UsuarioDAO.prototype.detalhes = function(id, callback) {
	let sql = "SELECT * FROM Usuario WHERE idUsuario = ?";
	let values = [ id ];
	this._connection.query( sql, values, callback );
}

UsuarioDAO.prototype.insert = function(dados,callback) {
	let sql = `
		INSERT INTO Usuario
			( cpf, nome, sobrenome, departamento, funcao, senha )
		VALUES
			( ?, ?, ?, ?, ?, ? )`;

	let values = [ dados.cpf, dados.nome, dados.sobrenome, dados.departamento, dados.funcao, dados.senha ];
	this._connection.query( sql, values, callback );
}

UsuarioDAO.prototype.update = function(dados, callback) {
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
	this._connection.query( sql, values, callback );
}

UsuarioDAO.prototype.delete = ( id, callback ) => {
	let sql = "DELETE FROM Usuario WHERE idUsuario = ?";
	let values = [ id ];
	this._connection.query( sql, values, callback );
}

module.exports = function() {
	return UsuarioDAO;
}