/**
 * Created by martin on 29/06/16.
 */

angular.module('app').controller('checkoutCtrl', function ($scope, cartSrv, enviarpedidoSrv, $storage, $mdToast, $timeout, $location, vibrator, ngAudio) {

    var tablausuario = $storage('tablaUsuario');

    cartSrv.initializeCart();

    $scope.cart = cartSrv.getProducts();
    $scope.direccionentrega = cartSrv.getDomicilio();
    $scope.observaciones = cartSrv.getObservaciones();
    $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
    $scope.preneto = cartSrv.getPrecioTotalDescuento();
    $scope.iva = cartSrv.getIva();

    $scope.cambiarDireccion = function (domicilio) {
        cartSrv.setDomicilio(domicilio);
    };

    $scope.setObservacion = function (observaciones) {
        cartSrv.setObservaciones(observaciones);
    };

    $scope.eliminarItem = function (id) {
        cartSrv.removeProduct(id);
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
        vibrator.vibrate(500);
    };

    $scope.borrarCart = function () {
        cartSrv.resetCart();
    };

    $scope.updatetotales = function () {
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
        cartSrv.changeQuantity();

    };

    $scope.isFpago = function(){

        if (tablausuario.getItem('fpago') != '4'){
            return true;
        }else{
            return false;
        }

    };

    $scope.checkout = function () {

        var hoy = moment().format('DD/MM/YYYY');
        var manana = moment().add(1, 'days').format('DD/MM/YYYY');
        cartSrv.setFechas(hoy, manana);
        var pedido = cartSrv.getPedido();

        enviarpedidoSrv.async(pedido).then(function successCallback(response) {
            //envío de pedido exitoso
            $scope.borrarCart();
            $scope.updatetotales();
            $scope.cart = cartSrv.getProducts();

            $mdToast.show($mdToast.simple().textContent('Su pedido ha sido enviado exitosamente.'));
            vibrator.vibrate(1000);
            ngAudio.play('snd/171670__fins__success-2.mp3');

            $timeout(function() {
                $location.path('/pedidoporcategoria');
            }, 5000);


        }, function errorCallback(error) {
            //envío de pedido no exitoso
            var datos = error.statusText;
            console.log(datos);
            $mdToast.show($mdToast.simple().textContent('Falló el envío, por favor reintente.'));
            vibrator.vibrate(2000);
            ngAudio.play('snd/142608__autistic-lucario__error.mp3');
        });
    };

});