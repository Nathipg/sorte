// const router = express.Router();
// router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
// app.use('/', index.ejs);
module.exports = function( app ) {

	//Telas
	app.get('/', function (req, res) {
		res.render('index');
	});
}