module.exports = function( app ) {

	//Telas
	app.get('/historicoReservas', function ( request, response ) {
		let connection = app.infra.connectionFactory();
		let historicoReservasDAO = new app.infra.HistoricoReservasDAO(connection);

		historicoReservasDAO.listar(function( resultados ) {
			response.render('historicoReservas/listagem', {
				lista: resultados
			});
		});

		connection.end();
	});

	app.get('/historicoReservas-detalhes', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let historicoReservasDAO = new app.infra.HistoricoReservasDAO(connection);
		let idHistoricoReserva = request.query.idHistoricoReserva;

		historicoReservasDAO.detalhes(idHistoricoReserva, function( infos ) {
			response.render('historicoReservas/detalhes', {
				historicoReservas: {
					idHistoricoReserva: infos.records[0].get('idHistoricoReserva'),
					idUsuario: infos.records[0].get('idUsuario'),
					idSala: infos.records[0].get('idSala'),
					dataReserva: infos.records[0].get('dataReserva'),
					estadoConservacao: infos.records[0].get('estadoConservacao')
				}
			});
		});
	});

	app.get('/historicoReservas-criar', function ( request, response ) {
		response.render('historicoReservas/criar');
	});

	//Ações
	app.post('/historicoReservas', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let historicoReservasDAO = new app.infra.HistoricoReservasDAO(connection);

		let historicoReservas = {
			idUsuario: request.body.idUsuario,
			idSala: request.body.idSala,
			dataReserva: request.body.dataReserva,
			estadoConservacao: request.body.estadoConservacao
		};

		historicoReservasDAO.insert(historicoReservas, function() {
			let idHistoricoReserva = encodeURIComponent( historicoReservas.idHistoricoReserva );
			response.redirect('/historicoReservas-detalhes?idHistoricoReserva=' + idHistoricoReserva);
		});
	});

	app.post('/historicoReservas-update', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let historicoReservasDAO = new app.infra.HistoricoReservasDAO(connection);

		let historicoReservas = {
			idHistoricoReserva: request.body.idHistoricoReserva,
			idUsuario: request.body.idUsuario,
			idSala: request.body.idSala,
			dataReserva: request.body.dataReserva,
			estadoConservacao: request.body.estadoConservacao
		};

		historicoReservasDAO.update(historicoReservas, function() {
			response.redirect('/historicoReservas-detalhes?idHistoricoReserva=' + historicoReservas.idHistoricoReserva);
		});
	});

	app.post('/historicoReservas-delete', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let historicoReservasDAO = new app.infra.HistoricoReservasDAO(connection);

		let idHistoricoReserva = request.body.idHistoricoReserva;

		historicoReservasDAO.delete(idHistoricoReserva, function() {
			response.redirect('/historicoReservas');
		});
	});
}