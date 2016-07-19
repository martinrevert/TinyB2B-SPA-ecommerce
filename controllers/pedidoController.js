/**
 * Created by martin on 09/05/16.
 */

angular.module('app').controller('pedidoCtrl', function ($scope, productosSrv, marcasSrv, cartSrv) {

    // Aqui hay que llamar a un servicio para recuperar usuario, pass y cliente de la session.

    console.log(cartSrv.getProducts());

    $scope.cart = cartSrv.getProducts();

    $scope.eliminarItem = function () {
        cartSrv.removeProduct();
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();
    };

    $scope.marcacolor = '#00FFFF';
    // randomColor({luminosity: 'dark'});
    //randomColor({luminosity: 'dark', count: 27});

    //Inicialización totales OJO FALTA FINANCIACION !!!!
    $scope.itemsummary = cartSrv.getItems();
    $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
    $scope.preneto = cartSrv.getPrecioTotalDescuento();
    $scope.iva = cartSrv.getIva();


    $scope.updatetotales = function () {
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();

    };


    $scope.addProduct = function (codigo, descripcion, bonif, bonifmax, cantidad, emp, factor, iva, medida, medida1, medida2, peso, precioFinalConIva, preneto, prenetoConDescuento, tipo_precio, uventa) {
        cartSrv.addProduct(codigo, descripcion, bonif, bonifmax, cantidad, emp, factor, iva, medida, medida1, medida2, peso, precioFinalConIva, preneto, prenetoConDescuento, tipo_precio, uventa);
        $scope.itemsummary = cartSrv.getItems();
        $scope.total = cartSrv.getPrecioTotalDescuentoIVA();
        $scope.preneto = cartSrv.getPrecioTotalDescuento();
        $scope.iva = cartSrv.getIva();


    };

    $scope.buscarpordescripcion = function () {
        $scope.productos = [];

        $scope.search = function (val) {
            productosSrv.async("martin", "dycsa", "1799", "N", val).then(function (d) {

                $scope.productos = d.data;
            });
        }
    };

    $scope.buscarporcategorias = function () {
        $scope.productos = [];
        $scope.mostrarmarcas = true;
        $scope.mostrarfloat = false;

        marcasSrv.async("martin", "dycsa").then(function (d) {
            $scope.marcas = d.data;
        });

        $scope.prodspormarca = function (codigo) {
            console.log(codigo);
            $scope.mostrarmarcas = false;
            $scope.mostrarfloat = true;
            productosSrv.async("martin", "dycsa", "1799", "M", codigo).then(function (d) {
                $scope.productos = d.data;
            });
        };


    };

    $scope.buscarporcodigo = function () {
        $scope.productos = [];
        $scope.search = function (val) {
            productosSrv.async("martin", "dycsa", "1799", "C", val).then(function (d) {
                $scope.productos = d.data;
            });
        }

    };

    $scope.buscarporoferta = function () {

        $scope.productos = [];

        productosSrv.async("martin", "dycsa", "1799", "O", "A").then(function (d) {
            $scope.productos = d.data;
        });
    };

    $scope.buscarporfrecuentes = function () {

        $scope.productos = [];

        productosSrv.async("martin", "dycsa", "1799", "P", "A").then(function (d) {
            $scope.productos = d.data;
        });
    };

});
