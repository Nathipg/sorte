module.exports = function( app ) {
	app.get('/tumulo', function ( request, response ) {
		response.render('tumulo/listagem');
	});

	app.get('/tumulo/form', function ( request, response ) {
		response.render('tumulo/form');
	});

	app.post('/tumulo', function ( request, response ) {
		//Código para cadastrar/editar tumulo
	});
}