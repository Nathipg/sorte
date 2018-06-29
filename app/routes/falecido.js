module.exports = function( app ) {
	app.get('/falecido', function ( request, response ) {
		let connection = app.infra.connectionFactory();
		let falecidoDAO = new app.infra.FalecidoDAO(connection);

		falecidoDAO.lista(function( resultados ) {
			response.render('falecido/listagem', {
				lista: resultados
			});
		});

		connection.close();
	});

	app.get('/falecido-form', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);

        cemiterioDAO.mapa(function( resultados ) {
            connection.close();
		    let mapaCemiterio = new app.infra.MapaCemiterio(resultados);

            mapaCemiterio.renderizarMapa( function( nodes ) {
                response.render('falecido/form', {
                    nodes: nodes.nodes,
                    links: nodes.links
                });
            });
		});
	});

	app.get('/falecido-form-editar', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let falecidoDAO = new app.infra.FalecidoDAO(connection);
		let falecido = request.query.nome;

		falecidoDAO.detalhes(falecido, function( infos ) {
			response.render('falecido/form-editar', {
				falecido: {
					name: infos.records[0].get('name'),
					epitafio: infos.records[0].get('epitafio'),
					dataNasc: infos.records[0].get('dataNasc'),
					dataFalec: infos.records[0].get('dataFalec'),
					causaMortis: infos.records[0].get('causaMortis')
				}
			});
		});
	});

	app.get('/falecido-detalhes', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let falecidoDAO = new app.infra.FalecidoDAO(connection);
		let tumulo = request.query.nome;

		falecidoDAO.detalhesPorTumulo(tumulo, function( infos ) {
			response.json({
				falecido: {
					name: infos.records[0].get('name'),
					epitafio: infos.records[0].get('epitafio'),
					dataNasc: infos.records[0].get('dataNasc'),
					dataFalec: infos.records[0].get('dataFalec'),
					causaMortis: infos.records[0].get('causaMortis')
				}
			});
		});
	});

	app.post('/falecido', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let falecidoDAO = new app.infra.FalecidoDAO(connection);

		let falecido = {
			name: request.body.name,
			dataNasc: request.body.dataNasc,
			dataFalec: request.body.dataFalec,
			causaMortis: request.body.causaMortis,
			epitafio: request.body.epitafio
		};

		let tumulo = request.body.tumulo;

		falecidoDAO.cadastrarFalecido(falecido, function() {
			falecidoDAO.cadastrarRelacao({
				nomeE1: falecido.name,
				nomeE2: tumulo
			}, function(){
				let nomeFalecido = encodeURIComponent( falecido.name );
				response.redirect('/falecido-form-editar?nome=' + nomeFalecido);
			});
		});
	});

	app.post('/falecido-editar', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let falecidoDAO = new app.infra.FalecidoDAO(connection);

		let falecido = {
			name: request.body.name,
			dataNasc: request.body.dataNasc,
			dataFalec: request.body.dataFalec,
			causaMortis: request.body.causaMortis,
			epitafio: request.body.epitafio
		};

		falecidoDAO.editarFalecido(falecido, function() {
			let nomeFalecido = encodeURIComponent( falecido.name );
			response.redirect('/falecido-form-editar?nome=' + nomeFalecido);
		});
	});
}