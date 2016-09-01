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

        $scope.comprobantesserin = _.where(d.data, {empresa: "SERIN"});
        $scope.comprobantesservet = _.where(d.data, {empresa: "SERVET"});

        var saldo = 0;
        var descuento = 0;
        var saldoserin = 0;
        var descuentoserin = 0;
        var saldoservet = 0;
        var descuentoservet = 0;

        for (var i = 0; i < d.data.length; i++) {
            saldo += (d.data[i].saldo);
            descuento += (d.data[i].descuento);

            if (d.data[i].empresa == "SERIN") {
                saldoserin += (d.data[i].saldo);
                descuentoserin += (d.data[i].descuento);

            } else {
                saldoservet += (d.data[i].saldo);
                descuentoservet += (d.data[i].descuento);
            }

        }

        $scope.saldo = saldo - descuento;
        $scope.saldoserin = saldoserin - descuentoserin;
        $scope.saldoservet = saldoservet - descuentoservet;
    });

    $scope.getPdf = function (numero) {
        console.log(numero);

        $location.path('/pdfviewer/' + numero);


    };
    /* if($scope.selected.length > 0) {
     console.log(selected);
     }*/

});
