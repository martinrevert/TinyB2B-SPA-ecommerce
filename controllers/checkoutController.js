/**
 * Created by martin on 29/06/16.
 */

angular.module('app').controller('checkoutCtrl', function ($scope, cartSrv, enviarpedidoSrv, $storage, $mdToast) {

    var tablanotadeventa = $storage('tablanotadeventa');

    $scope.cart = cartSrv.getProducts();
    $scope.direccionentrega = cartSrv.getDomicilio();
    $scope.observaciones = cartSrv.getObservaciones();
    $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
    $scope.preneto = cartSrv.getPrecioTotalDescuento();
    $scope.iva = cartSrv.getIva();

    $scope.cambiarDireccion = function(domicilio){
            cartSrv.setDomicilio(domicilio);
    };

    $scope.setObservacion = function(observaciones){
            cartSrv.setObservaciones(observaciones);
    };

    $scope.eliminarItem = function (id) {
        cartSrv.removeProduct(id);
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
    };

    $scope.borrarTodo = function () {
        //ToDo al menos esto debería borrar productos y notificar al scope para que refresque, a partir de alli activar icono view html
        cartSrv.removeNotadeVenta();
    };

    $scope.updatetotales = function () {
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
        cartSrv.changeQuantity();

    };

    $scope.checkout = function () {

        var hoy = moment().format('DD/MM/YYYY');
        var manana = moment().add(1, 'days').format('DD/MM/YYYY');
        cartSrv.setFechas(hoy, manana);
        var pedido = cartSrv.getPedido();

        enviarpedidoSrv.async(pedido).then(function (response) {
            console.log(response);
            //envío de pedido exitoso
            //Todo borrar array memoria
            //Todo borrar tablanotadeventa
            $mdToast.show($mdToast.simple().textContent('Su pedido ha sido enviado exitosamente.'));

        }).then(function (error) {
            //envío de pedido no exitoso
            console.log(error.data);
            $mdToast.show($mdToast.simple().textContent('Falló el envío, por favor reintente.'));
        });
    };

});
