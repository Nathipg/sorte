module.exports = function( app ) {

	//Telas
	app.get('/reserva', function ( request, response ) {
		let connection = app.infra.connectionFactory();
		let reservaDAO = new app.infra.ReservaDAO(connection);

		reservaDAO.listar(function( resultados ) {
			response.render('reserva/listagem', {
				lista: resultados
			});
		});

		connection.close();
	});

	app.get('/reserva-detalhes', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let reservaDAO = new app.infra.ReservaDAO(connection);
		let idReserva = request.query.idReserva;

		usuarioDAO.listar(function( listaUsuario ) {
			salaDAO.listar(function( listaSala ) {
				reservaDAO.detalhes(idReserva, function( infos ) {
					response.render('reserva/detalhes', {
						reserva: {
							idReserva: infos.records[0].get('idReserva'),
							idUsuario: infos.records[0].get('idUsuario'),
							idSala: infos.records[0].get('idSala'),
							dataReserva: infos.records[0].get('dataReserva')
						},
						listaUsuario: listaUsuario,
                    	listaSala: listaSala
					});
				});
			});
		});
	});

	app.get('/reserva-criar', function ( request, response ) {
		let usuarioDAO = new app.infra.UsuarioDAO(connection);
		let salaDAO = new app.infra.SalaDAO(connection);

		usuarioDAO.listar(function( listaUsuario ) {
			salaDAO.listar(function( listaSala ) {
				connection.close();
				response.render('reserva/criar', {
                    listaUsuario: listaUsuario,
                    listaSala: listaSala
                });
			});
		});
	});

	//Ações
	app.post('/reserva', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let reservaDAO = new app.infra.ReservaDAO(connection);

		let reserva = {
			idUsuario: request.body.idUsuario,
			idSala: request.body.idSala,
			dataReserva: request.body.dataReserva
		};

		reservaDAO.insert(reserva, function() {
			let idReserva = encodeURIComponent( reserva.idReserva );
			response.redirect('/reserva-detalhes?idReserva=' + idReserva);
		});
	});

	app.post('/reserva-update', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let reservaDAO = new app.infra.ReservaDAO(connection);

		let reserva = {
			idReserva: request.body.idReserva,
			idUsuario: request.body.idUsuario,
			idSala: request.body.idSala,
			dataReserva: request.body.dataReserva
		};

		reservaDAO.update(reserva, function() {
			response.redirect('/reserva-detalhes?idReserva=' + reserva.idReserva);
		});
	});

	app.post('/reserva-delete', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let reservaDAO = new app.infra.ReservaDAO(connection);

		let idReserva = request.body.idReserva;

		reservaDAO.delete(idReserva, function() {
			response.redirect('/reserva');
		});
	});
}