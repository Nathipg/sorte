module.exports = function( app ) {
	app.get('/', function ( request, response ) {
		let erro = request.query.erro != undefined ? request.query.erro : '';
		response.render('index', {
			erro: erro
		});
	});

	app.post('/login', function ( request, response ) {
		let usuario = request.body.usuario;
		let senha = request.body.senha;

		if( usuario == 'd4' && senha =='temkill1234!@#' ) {
			response.redirect('/mapa');
		} else {
			let string = encodeURIComponent('Usuário e/ou senha inválidos');
			response.redirect('/?erro=' + string);
		}
	});

	app.get('/mapa', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);
        let falecidoDAO = new app.infra.FalecidoDAO(connection);

        falecidoDAO.lista(function( listaFalecidos ) {
        	cemiterioDAO.mapa(function( resultados ) {
	            connection.close();
			    let mapaCemiterio = new app.infra.MapaCemiterio(resultados);

	            mapaCemiterio.renderizarMapa( function( nodes ) {
	                response.render('cemiterio/mapa', {
	                    nodes: nodes.nodes,
	                    links: nodes.links,
	                    listaFalecidos: listaFalecidos
	                });
	            });
			});
        });
	});

	app.get('/mapa-ponto', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);
        let falecidoDAO = new app.infra.FalecidoDAO(connection);

        falecidoDAO.lista(function( listaFalecidos ) {
        	cemiterioDAO.mapa(function( resultados ) {
	            connection.close();
			    let mapaCemiterio = new app.infra.MapaCemiterio(resultados);

	            mapaCemiterio.renderizarMapa( function( nodes ) {
	                response.render('cemiterio/mapa-ponto', {
	                    nodes: nodes.nodes,
	                    links: nodes.links,
	                    listaFalecidos: listaFalecidos
	                });
	            });
			});
        });
	});

	app.get('/mapa-pessoa', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);
        let falecidoDAO = new app.infra.FalecidoDAO(connection);

        falecidoDAO.lista(function( listaFalecidos ) {
        	cemiterioDAO.mapa(function( resultados ) {
	            connection.close();
			    let mapaCemiterio = new app.infra.MapaCemiterio(resultados);

	            mapaCemiterio.renderizarMapa( function( nodes ) {
	                response.render('cemiterio/mapa-pessoa', {
	                    nodes: nodes.nodes,
	                    links: nodes.links,
	                    listaFalecidos: listaFalecidos
	                });
	            });
			});
        });
	});

	app.get('/mapa-form', function ( request, response ) {
		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);

        cemiterioDAO.mapa(function( resultados ) {
            connection.close();
		    let mapaCemiterio = new app.infra.MapaCemiterio(resultados);

            mapaCemiterio.renderizarMapa( function( nodes ) {
                response.render('cemiterio/form', {
                    nodes: nodes.nodes,
                    links: nodes.links
                });
            });
		});

	});

	app.get('/mapa/tracarRotaPontoAPonto', function ( request, response ) {
		let informacoes = {
			pontoInicial: request.query.pontoInicial,
			pontoFinal: request.query.pontoFinal,
			tipoPI: request.query.tipoPI,
			tipoPF: request.query.tipoPF
		};

		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);


        cemiterioDAO.rotaPontoAPonto(informacoes, function( resultados ) {
        	response.json( resultados.records[0].get('caminho') );
        });
	});

	app.get('/mapa/tracarRotaPontoAPessoa', function ( request, response ) {
		let dados = {
			pontoInicial: request.query.pontoInicial,
			pontoFinal: request.query.pontoFinal,
			tipoPI: request.query.tipoPI,
			tipoPF: 'Falecido'
		};

		let connection = app.infra.connectionFactory();
        let cemiterioDAO = new app.infra.CemiterioDAO(connection);


        cemiterioDAO.rotaPontoAPessoa(dados, function( resultados ) {
        	let caminho = resultados.records[0].get('caminho');
        	response.json( caminho.slice(0, caminho.length - 1) );
        });
	});

	app.post('/mapa', function ( request, response ) {
		let connection = app.infra.connectionFactory();
		let cemiterioDAO = new app.infra.CemiterioDAO(connection);

		let proximaLetra = { A: 'B', B: 'C', C: 'D', D: 'E', E: 'F', F: 'G', G: 'H', H: 'I' };
		let dados = {
			pontoInicial: JSON.parse(request.body.pontoInicial),
			pontoFinal: JSON.parse(request.body.pontoFinal),
			quadra: request.body.quadra
		};

		let interseccoes = [];
		let tumulos = [];
		let relacoes = [];

		//Relacionando intersecções
		interseccoes.push({
 			name: dados.pontoInicial.letra + (parseInt(dados.pontoInicial.indice) + 1),
 			x: dados.pontoInicial.x,
 			y: dados.pontoInicial.y + 150
 		});

 		interseccoes.push({
 			name: dados.pontoInicial.letra + (parseInt(dados.pontoInicial.indice) + 2),
 			x: dados.pontoInicial.x,
 			y: dados.pontoInicial.y + 300
 		});

 		interseccoes.push({
 			name: proximaLetra[dados.pontoInicial.letra] + (parseInt(dados.pontoInicial.indice) + 2),
 			x: dados.pontoInicial.x + 150,
 			y: dados.pontoInicial.y + 300
 		});

 		interseccoes.push({
 			name: dados.pontoFinal.letra + (parseInt(dados.pontoFinal.indice) + 1),
 			x: dados.pontoFinal.x,
 			y: dados.pontoFinal.y + 150
 		});

 		interseccoes.push({
 			name: dados.pontoFinal.letra + (parseInt(dados.pontoFinal.indice) + 2),
 			x: dados.pontoFinal.x,
 			y: dados.pontoFinal.y + 300
 		});

 		relacoes.push({
 			nomeE1: dados.pontoInicial.letra + dados.pontoInicial.indice,
 			tipoE1: 'Interseccao',
 			nomeE2: interseccoes[0].name,
 			tipoE2: 'Interseccao'
 		});

 		relacoes.push({
 			nomeE1: dados.pontoFinal.letra + dados.pontoFinal.indice,
 			tipoE1: 'Interseccao',
 			nomeE2: interseccoes[3].name,
 			tipoE2: 'Interseccao'
 		});

 		relacoes.push({
 			nomeE1: interseccoes[0].name,
 			tipoE1: 'Interseccao',
 			nomeE2: interseccoes[1].name,
 			tipoE2: 'Interseccao'
 		});

 		relacoes.push({
 			nomeE1: interseccoes[3].name,
 			tipoE1: 'Interseccao',
 			nomeE2: interseccoes[4].name,
 			tipoE2: 'Interseccao'
 		});

 		relacoes.push({
 			nomeE1: interseccoes[2].name,
 			tipoE1: 'Interseccao',
 			nomeE2: interseccoes[1].name,
 			tipoE2: 'Interseccao'
 		});

 		relacoes.push({
 			nomeE1: interseccoes[2].name,
 			tipoE1: 'Interseccao',
 			nomeE2: interseccoes[4].name,
 			tipoE2: 'Interseccao'
 		});

 		tumulos.push({
			name: 'Q' + dados.quadra + '_01',
			x: dados.pontoInicial.x + 50,
			y: dados.pontoInicial.y + 50
		});

 		//Relacionando intersecções
		relacoes.push({
 			nomeE1: dados.pontoInicial.letra + dados.pontoInicial.indice,
 			tipoE1: 'Interseccao',
 			nomeE2: tumulos[0].name,
 			tipoE2: 'Tumulo'
 		});

 		tumulos.push({
			name: 'Q' + dados.quadra + '_02',
			x: dados.pontoInicial.x + 150,
			y: dados.pontoInicial.y + 50
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: proximaLetra[dados.pontoInicial.letra] + dados.pontoInicial.indice,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[1].name,
			tipoE2: 'Tumulo'
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_03',
			x: dados.pontoInicial.x + 250,
			y: dados.pontoInicial.y + 50
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: dados.pontoFinal.letra + dados.pontoFinal.indice,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[2].name,
			tipoE2: 'Tumulo'
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_04',
			x: dados.pontoInicial.x + 50,
			y: dados.pontoInicial.y + 150
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: interseccoes[0].name,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[3].name,
			tipoE2: 'Tumulo'
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_05',
			x: dados.pontoInicial.x + 150,
			y: dados.pontoInicial.y + 150
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_06',
			x: dados.pontoInicial.x + 250,
			y: dados.pontoInicial.y + 150
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: interseccoes[3].name,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[5].name,
			tipoE2: 'Tumulo'
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_07',
			x: dados.pontoInicial.x + 50,
			y: dados.pontoInicial.y + 250
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: interseccoes[1].name,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[6].name,
			tipoE2: 'Tumulo'
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_08',
			x: dados.pontoInicial.x + 150,
			y: dados.pontoInicial.y + 250
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: interseccoes[2].name,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[7].name,
			tipoE2: 'Tumulo'
		});

		tumulos.push({
			name: 'Q' + dados.quadra + '_09',
			x: dados.pontoInicial.x + 250,
			y: dados.pontoInicial.y + 250
		});

		//Relacionando intersecções
		relacoes.push({
			nomeE1: interseccoes[4].name,
			tipoE1: 'Interseccao',
			nomeE2: tumulos[8].name,
			tipoE2: 'Tumulo'
		});

		//Relacionando túmulos

		relacoes.push({
			nomeE1: tumulos[0].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[1].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[0].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[3].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[1].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[2].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[1].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[4].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[2].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[5].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[3].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[4].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[3].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[6].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[4].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[5].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[4].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[7].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[5].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[8].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[6].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[7].name,
			tipoE2: 'Tumulo'
		});

		relacoes.push({
			nomeE1: tumulos[7].name,
			tipoE1: 'Tumulo',
			nomeE2: tumulos[8].name,
			tipoE2: 'Tumulo'
		});

		let numeroInterseccoes = interseccoes.length;
		let numeroTumulos = tumulos.length;
		let numeroRelacoes = relacoes.length;
		let i = 0;
		let j = 0;
		let k = 0;
		interseccoes.forEach(function( interseccao ) {
			cemiterioDAO.cadastrarInterseccao(interseccao, function() {
				i++;
				if(numeroInterseccoes >= i) {
					tumulos.forEach(function( tumulo ) {
						cemiterioDAO.cadastrarTumulo(tumulo, function() {
							j++;
							if(numeroTumulos >= j) {
								relacoes.forEach(function( relacao ) {
									cemiterioDAO.cadastrarRelacao(relacao, function() {
										k++;
										if(numeroRelacoes >= k) {
											connection.close();
											response.redirect('/mapa');
										}
									});
								});
							}
						});
					});
				}
			});
		});
	});
}