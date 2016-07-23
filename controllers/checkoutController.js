/**
 * Created by martin on 29/06/16.
 */

angular.module('app').controller('checkoutCtrl', function ($scope, cartSrv, enviarpedidoSrv) {

    console.log(cartSrv.getProducts());

    $scope.cart = cartSrv.getProducts();

    $scope.eliminarItem = function () {
        cartSrv.removeProduct();
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
        var pedido = cartSrv.getPedido();

        enviarpedidoSrv.async(pedido);
    };


});
