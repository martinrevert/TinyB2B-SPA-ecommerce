/**
 * Created by martin on 29/06/16.
 */

angular.module('app').controller('checkoutCtrl', function ($scope, cartSrv, enviarpedidoSrv, $storage, $mdToast) {

    var tablanotadeventa = $storage('tablanotadeventa');

    $scope.cart = cartSrv.getProducts();

    $scope.direccionentrega = tablanotadeventa.getItem('direccionentrega');

    $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
    $scope.preneto = cartSrv.getPrecioTotalDescuento();
    $scope.iva = cartSrv.getIva();

    $scope.eliminarItem = function (id) {
        cartSrv.removeProduct(id);
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
    };

    $scope.updatetotales = function () {
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
        cartSrv.changeQuantity();

    };

    $scope.checkout = function () {
        //Todo introducir fechas en cart
        var pedido = cartSrv.getPedido();
        enviarpedidoSrv.async(pedido).then(function () {
            //envío de pedido exitoso
            //Todo borrar array memoria
            //Todo borrar tablanotadeventa
            //Todo Toast avisando que el envío fue exitoso

        }).then(function () {
            //envío de pedido no exitoso
            $mdToast.show($mdToast.simple().textContent('Falló el envío, por favor reintente.'));
        });
    };

});
