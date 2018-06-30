module.exports = function( app ) {

	//Telas
	app.get('/usuario', function ( request, response ) {
		let connection = app.infra.connectionFactory();
		let usuarioDAO = new app.infra.UsuarioDAO(connection);

		usuarioDAO.listar(function( resultados ) {
			response.render('usuario/listagem', {
				lista: resultados
			});
		});

		connection.end();
	});

	app.get('/usuario-detalhes', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let usuarioDAO = new app.infra.UsuarioDAO(connection);
		let idUsuario = request.query.idUsuario;

		usuarioDAO.detalhes(idUsuario, function( infos ) {
			response.render('usuario/detalhes', {
				usuario: {
					idUsuario: infos.records[0].get('idUsuario'),
					cpf: infos.records[0].get('cpf'),
					nome: infos.records[0].get('nome'),
					sobrenome: infos.records[0].get('sobrenome'),
					departamento: infos.records[0].get('departamento'),
					funcao: infos.records[0].get('funcao'),
					senha: infos.records[0].get('senha')
				}
			});
		});
	});

	app.get('/usuario-criar', function ( request, response ) {
		response.render('usuario/criar');
	});

	//Ações
	app.post('/usuario', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let usuarioDAO = new app.infra.UsuarioDAO(connection);

		let usuario = {
			cpf: request.body.cpf,
			nome: request.body.nome,
			sobrenome: request.body.sobrenome,
			departamento: request.body.departamento,
			funcao: request.body.funcao,
			senha: request.body.senha
		};

		usuarioDAO.insert(usuario, function() {
			let idUsuario = encodeURIComponent( usuario.idUsuario );
			response.redirect('/usuario-detalhes?idUsuario=' + idUsuario);
		});
	});

	app.post('/usuario-update', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let usuarioDAO = new app.infra.UsuarioDAO(connection);

		let usuario = {
			idUsuario: request.body.idUsuario,
			cpf: request.body.cpf,
			nome: request.body.nome,
			sobrenome: request.body.sobrenome,
			departamento: request.body.departamento,
			funcao: request.body.funcao,
			senha: request.body.senha
		};

		usuarioDAO.update(usuario, function() {
			response.redirect('/usuario-detalhes?idUsuario=' + usuario.idUsuario);
		});
	});

	app.post('/usuario-delete', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let usuarioDAO = new app.infra.UsuarioDAO(connection);

		let idUsuario = request.body.idUsuario;

		usuarioDAO.delete(idUsuario, function() {
			response.redirect('/usuario');
		});
	});
}