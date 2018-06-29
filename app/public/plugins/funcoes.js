function configurarChosenSelect() {
    $('.chosen-select').chosen();
    $('.chosen-container').width('100%');
}

function atualizarChosenSelect() {
    $('select').trigger('chosen:updated');
}

function adicionarAviso( tipo, texto ) {
	$('#aviso').html(`<div class="alert alert-${tipo}" role="alert">${texto}</div>`);
}

function removerAviso() {
	$('#aviso').html('');
}

configurarChosenSelect();

$('body').tooltip({            
    container: 'body',
    trigger: 'hover',
    html: true,
    animation: false,
    selector: '[data-toggle="tooltip"]'
});

// $( document ).ready( function() {
//     $( '#btnEntrar' ).mouseover( function () {
//         $( "#textoEntrar" ).text( "Enterrar" );
//     });
//     $( '#btnEntrar' ).mouseout(function () {
//         $( "#textoEntrar" ).text( "Entrar" );
//     });
// });
