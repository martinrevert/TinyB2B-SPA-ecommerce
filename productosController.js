/**
 * Created by martin on 09/05/16.
 */

angular.module('app').controller('productosCtrl', function ($scope, productosSrv, usSpinnerService) {

    // Aqui hay que llamar a un servicio para recuperar usuario, pass y cliente de la session.

    $scope.startSpin = function(){
        usSpinnerService.spin('spinner-1');
    };

    productosSrv.async("martin", "dycsa", "1799", "T", "").then(function (d){
        $scope.stopSpin = function(){
            usSpinnerService.stop('spinner-1');
        };
        $scope.productos = d.data;
    });
});
