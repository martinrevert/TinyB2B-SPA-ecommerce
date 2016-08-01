/**
 * Created by martin on 22/06/16.
 */

//Todo service para decodificar PDFs

angular.module('app').controller('resuCtrl', function ($scope, resuSrv, $storage, $location) {
    
    var tablausuario = $storage('tablaUsuario');
    var usuario = tablausuario.getItem('usuario');
    var pass = tablausuario.getItem('pass');
    var cliente = tablausuario.getItem('cliente');

    $scope.selected = [];
    resuSrv.async(usuario, pass, cliente).then(function (d) {

        $scope.comprobantes = d.data;

    });

    $scope.getPdf = function (numero) {
        console.log(numero);

        $location.path('/pdfviewer/' + numero);


    };
    /* if($scope.selected.length > 0) {
     console.log(selected);
     }*/

});
