/**
 * Created by martin on 22/06/16.
 */

angular.module('app').controller('oldndvCtrl', function ($scope, oldndvSrv, $storage) {

    var tablausuario = $storage('tablaUsuario');
    var usuario = tablausuario.getItem('usuario');
    var pass = tablausuario.getItem('pass');

    $scope.selected = [];

    oldndvSrv.getCabeceraNDV(usuario, pass).then(function (d) {
        $scope.ndvs = d.data;
    });

    $scope.getItems = function (emp, numero) {
        oldndvSrv.getItemsNDV(usuario, pass, emp, numero).then(function (d) {
            $scope.items = d.data;
        });
    };

});
