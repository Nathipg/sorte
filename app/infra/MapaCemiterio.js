let _ = require('lodash');

function MapaCemiterio( resultados ) {
	this.resultados = resultados;
}

MapaCemiterio.prototype.renderizarMapa = function( callback ) {
	let resultados = this.resultados;
	let nodes = [], relacionamentos = [];

	resultados.records.forEach( resultado => {
	    let tipo = resultado.get('interseccao').indexOf('_') == -1 ? 'interseccao' : 'tumulo';

	    if( resultado.get('x') != null ) {
	        nodes.push({
	            title: resultado.get('interseccao'),
	            label: tipo,
	            x: resultado.get('x').getLowBits(),
	            y: resultado.get('y').getLowBits()
	        });
	    } else {
	        nodes.push({
	            title: resultado.get('interseccao'),
	            label: tipo
	        });
	    }

	    let noAtual = nodes.length - 1;

	    resultado.get('relacionado').forEach( name => {
	        let tipo = name.indexOf('_') == -1 ? 'interseccao' : 'tumulo';
	        let relacionado = {title: name, label: tipo};
	        let indiceRelacionado = _.findIndex(nodes, relacionado);

	        if( indiceRelacionado != -1 ) {
	            let distanciaLink = 30;
	            let source = nodes[indiceRelacionado];
	            let target = nodes[noAtual];

	            if( (source.label == 'tumulo' && target.label == 'interseccao') || (source.label == 'interseccao' && target.label == 'tumulo') ) {
	                distanciaLink = 0;
	            } else if( source.label == 'tumulo' || target.label == 'tumulo' ) {
	                distanciaLink = 60;
	            } else {
	                distanciaLink = 300;
	            }

	            relacionamentos.push({
	            	'fonte': source.title,
	            	'alvo': target.title,
	            	'x1': source.x,
	            	'y1': source.y,
	            	'x2': target.x,
	            	'y2': target.y
	            });
	        }
	    });

	});

	callback({
		nodes: nodes,
		links: relacionamentos
	});
}

module.exports = function() {
	return MapaCemiterio;
}