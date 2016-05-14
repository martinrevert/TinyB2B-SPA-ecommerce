/**
 * Created by martin on 09/05/16.
 */

angular.module('app').controller('productosCtrl', function ($scope, productosSrv) {

    // Aqui hay que llamar a un servicio para recuperar usuario, pass y cliente de la session.

    //  $scope.productos = productosSrv.async().getProducts("martin", "dycsa", "1799", "T", "");
    productosSrv.async("martin", "dycsa", "1799", "T", "").then(function (d){
        $scope.productos = d.data;
    });
});
