/**
 * Created by martin on 22/06/16.
 */
angular.module('app').controller('resuCtrl', function ($scope, resuSrv, $storage, $location) {

    var tablausuario = $storage('tablaUsuario');
    var usuario = tablausuario.getItem('usuario');
    var pass = tablausuario.getItem('pass');
    var cliente = tablausuario.getItem('cliente');

    $scope.selected = [];
    resuSrv.async(usuario, pass, cliente).then(function (d) {

        $scope.comprobantes = d.data;

        var saldo = 0;
        var descuento = 0;

        for (var i = 0; i < d.data.length; i++) {
            saldo += (d.data[i].saldo);

        }

        for (var i = 0; i < d.data.length; i++) {
            descuento += (d.data[i].descuento);

        }

        $scope.saldo = saldo - descuento;
    });

    $scope.getPdf = function (numero) {
        console.log(numero);

        $location.path('/pdfviewer/' + numero);


    };
    /* if($scope.selected.length > 0) {
     console.log(selected);
     }*/

});
