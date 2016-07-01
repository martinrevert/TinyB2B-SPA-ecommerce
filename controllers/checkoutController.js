/**
 * Created by martin on 29/06/16.
 */

angular.module('app').controller('checkoutCtrl', function ($scope, cartSrv, enviarpedidoSrv) {

    $scope.cart = cartSrv.getProducts();

    $scope.eliminarItem = function(){
        cartSrv.removeProduct()
    }
    
    $scope.checkout = function(){
        var pedido = cartSrv.getPedido();

        enviarpedidoSrv.async(pedido);
    }


});
