/**
 * Created by martin on 09/05/16.
 */

angular.module('app').controller('pedidoCtrl', function ($scope, productosSrv, marcasSrv, usSpinnerService, cartSrv) {

    // Aqui hay que llamar a un servicio para recuperar usuario, pass y cliente de la session.

    console.log(cartSrv.getProducts());

    $scope.cart = cartSrv.getProducts();

    $scope.eliminarItem = function () {
        cartSrv.removeProduct();
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuento();
        $scope.preneto = cartSrv.getPrecioNeto();
        $scope.iva = cartSrv.getIva();
    };

    $scope.marcacolor = '#00FFFF';
    // randomColor({luminosity: 'dark'});
    //randomColor({luminosity: 'dark', count: 27});

    //Inicialización totales
    $scope.itemsummary = cartSrv.getItems();
    $scope.total = cartSrv.getPrecioTotalDescuento();
    $scope.preneto = cartSrv.getPrecioNeto();
    $scope.iva = cartSrv.getIva();

    $scope.updatetotales = function(){
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuento();
        $scope.preneto = cartSrv.getPrecioNeto();
        $scope.iva = cartSrv.getIva();
    };


    $scope.addProduct = function (codigo, descripcion, bonif, bonifmax, cantidad, emp, factor, iva, medida, medida1, medida2, peso, precioFinalConIva, preneto, prenetoConDescuento, tipo_precio, uventa) {
        cartSrv.addProduct(codigo, descripcion, bonif, bonifmax, cantidad, emp, factor, iva, medida, medida1, medida2, peso, precioFinalConIva, preneto, prenetoConDescuento, tipo_precio, uventa);
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuento();
        $scope.preneto = cartSrv.getPrecioNeto();
        $scope.iva = cartSrv.getIva();

    };

    $scope.buscarpordescripcion = function () {
        $scope.productos = [];
        /*   $scope.startSpin = function () {
         usSpinnerService.spin('spinner-1');
         }; */

        $scope.search = function (val) {
            productosSrv.async("martin", "dycsa", "1799", "N", val).then(function (d) {
                $scope.stopSpin = function () {
                    usSpinnerService.stop('spinner-1');
                };
                $scope.productos = d.data;
            });
        }
    };

    $scope.buscarporcategorias = function () {
        $scope.productos = [];
        $scope.mostrarmarcas = true;

        /*  $scope.startSpin = function () {
         usSpinnerService.spin('spinner-1');
         }; */

        marcasSrv.async("martin", "dycsa").then(function (d) {
            /* $scope.stopSpin = function () {
             usSpinnerService.stop('spinner-1');
             };*/

            $scope.marcas = d.data;
        });

        $scope.prodspormarca = function (codigo) {
            console.log(codigo);
            $scope.mostrarmarcas = false;
            productosSrv.async("martin", "dycsa", "1799", "M", codigo).then(function (d) {
                $scope.stopSpin = function () {
                    usSpinnerService.stop('spinner-1');
                };
                $scope.productos = d.data;
            });
        };


    };

    $scope.buscarporcodigo = function () {
        $scope.productos = [];
        $scope.search = function (val) {
            productosSrv.async("martin", "dycsa", "1799", "C", val).then(function (d) {
                $scope.stopSpin = function () {
                    usSpinnerService.stop('spinner-1');
                };
                $scope.productos = d.data;
            });
        }

    };


    $scope.selectTab = function (tab) {
        console.log(tab);
        switch (tab) {
            case 0:
                $scope.buscarporcategorias();
                break;
            case 1:
                $scope.buscarpordescripcion();
                break;
            case 2:
                $scope.buscarporcodigo();
                break;
            default:
            //DEFAULT
        }

    };

});