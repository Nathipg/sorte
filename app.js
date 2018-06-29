let app = require('./config/express')();

app.listen(3000, function() {
	console.log('Servidor rodando');
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});