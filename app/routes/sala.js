module.exports = function( app ) {

	//Telas
	app.get('/sala', function ( request, response ) {
		let connection = app.infra.connectionFactory();
		let salaDAO = new app.infra.SalaDAO(connection);

		salaDAO.listar(function( resultados ) {
			response.render('sala/listagem', {
				lista: resultados
			});
		});

		connection.close();
	});

	app.get('/sala-criar', function ( request, response ) {
		response.render('sala/criar');
	});

	app.get('/sala-detalhes', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let salaDAO = new app.infra.SalaDAO(connection);
		let idSala = request.query.idSala;

		salaDAO.detalhes(idSala, function( infos ) {
			response.render('sala/detalhes', {
				sala: {
					idSala: infos.records[0].get('idSala'),
					tipoSala: infos.records[0].get('tipoSala'),
					status: infos.records[0].get('status'),
					descricao: infos.records[0].get('descricao'),
					local: infos.records[0].get('local'),
					estadoConservacao: infos.records[0].get('estadoConservacao'),
					numero: infos.records[0].get('numero')
				}
			});
		});
	});

	//Ações
	app.post('/sala', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let salaDAO = new app.infra.SalaDAO(connection);

		let sala = {
			tipoSala: request.body.tipoSala,
			status: request.body.status,
			descricao: request.body.descricao,
			local: request.body.local,
			estadoConservacao: request.body.estadoConservacao,
			numero: request.body.numero
		};

		salaDAO.insert(sala, function() {
			let idSala = encodeURIComponent( sala.idSala );
			response.redirect('/sala-detalhes?idSala=' + idSala);
		});
	});

	app.post('/sala-update', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let salaDAO = new app.infra.SalaDAO(connection);

		let sala = {
			idSala: request.body.idSala,
			tipoSala: request.body.tipoSala,
			status: request.body.status,
			descricao: request.body.descricao,
			local: request.body.local,
			estadoConservacao: request.body.estadoConservacao,
			numero: request.body.numero
		};

		salaDAO.update(sala, function() {
			response.redirect('/sala-detalhes?idSala=' + sala.idSala);
		});
	});

	app.post('/sala-delete', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let salaDAO = new app.infra.SalaDAO(connection);

		let idSala = request.body.idSala;

		salaDAO.delete(idSala, function() {
			response.redirect('/sala');
		});
	});
}