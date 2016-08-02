'use strict';

angular.module('app', ['ngMaterial', 'md.data.table', 'ngRoute', 'localStorageModule', 'ngAnimate', 'pdf', 'angular-loading-bar'])
    .constant('config',
        {
            apiUrl: 'http://gruposerin.dyndns.org:8080/servicios/eikon.asmx'
        })
    .directive('search', function () {
        return function ($scope, element) {
            element.bind("keyup", function (event) {
                var val = element.val();
                if (val.length > 3) {
                    $scope.search(val);
                }
            });
        };
    })/*.config(function($httpProvider){
     $httpProvider.defaults.headers.common = {};
     $httpProvider.defaults.headers.post = {};
     $httpProvider.defaults.headers.put = {};
     $httpProvider.defaults.headers.patch = {};
     })*/
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .config(function ($routeProvider, $locationProvider, $sceProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .when('/pedidoporcategoria', {
                templateUrl: 'partials/pedidoporcategoria.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidopordescripcion', {
                templateUrl: 'partials/pedidopordescripcion.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidoporcodigo', {
                templateUrl: 'partials/pedidoporcodigo.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidoofertas', {
                templateUrl: 'partials/pedidoofertas.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidomiscomprasfrecuentes', {
                templateUrl: 'partials/pedidomiscomprasfrecuentes.html',
                controller: 'pedidoCtrl'
            })
            .when('/listaprecios', {
                templateUrl: 'partials/listaprecios.html',
                controller: 'listapreciosCtrl'
            })
            .when('/checkout', {
                templateUrl: 'partials/checkout.html',
                controller: 'checkoutCtrl'
            })
            .when('/consultadepedidos', {
                templateUrl: 'partials/consultadepedidos.html',
                controller: 'oldndvCtrl'
            })
            .when('/resumendecuenta', {
                templateUrl: 'partials/resumendecuenta.html',
                controller: 'resuCtrl'
            })
            .when('/pdfviewer/:numero', {
                templateUrl: 'partials/pdfviewer.html',
                controller: 'pdfviewerCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });

        $locationProvider.html5Mode(true);
        //$sceProvider.enabled(false);
    })
    .controller('indexCtrl', ['$scope', '$mdSidenav', '$routeParams', '$route','$storage', function ($scope, $mdSidenav, $route, $routeParams, $storage) {

            var tablausuario = $storage('tablaUsuario');

            $scope.usuario = tablausuario.getItem('usuario');
            $scope.empresa = tablausuario.getItem('nombre');

            $scope.showSidebar = function () {

                var ruta = $routeParams;

                if (ruta.current.loadedTemplateUrl == 'partials/login.html') {
                    return false;
                } else {
                    return true;
                }
            };

            $scope.toggleSidenav = function (menuId) {
                $mdSidenav(menuId).toggle();
            };


            $scope.menu = [
                {
                    href: './checkout',
                    title: 'Carro de compras',
                    icon: 'img/ic_shopping_cart_black_24px.svg'

                },
                {
                    href: './pedidoporcategoria',
                    title: 'Pedidos por categoria',
                    icon: 'img/ic_add_shopping_cart_black_24px.svg'

                },
                {
                    href: './pedidopordescripcion',
                    title: 'Pedidos por descripción',
                    icon: 'img/ic_add_shopping_cart_black_24px.svg'

                },
                {
                    href: './pedidoporcodigo',
                    title: 'Pedidos por código',
                    icon: 'img/ic_add_shopping_cart_black_24px.svg'

                },
                {
                    href: './pedidoofertas',
                    title: 'Ofertas!',
                    icon: 'img/ic_add_shopping_cart_black_24px.svg'

                },
                {
                    href: './pedidomiscomprasfrecuentes',
                    title: 'Mis compras frecuentes',
                    icon: 'img/ic_add_shopping_cart_black_24px.svg'

                },
                {
                    href: './listaprecios',
                    title: 'Lista de precios',
                    icon: 'img/ic_attach_money_black_24px.svg'

                },
                {
                    href: './consultadepedidos',
                    title: 'Consulta de pedidos',
                    icon: 'img/ic_assignment_black_24px.svg'

                },
                {
                    href: './resumendecuenta',
                    title: 'Resumen de cuenta',
                    icon: 'img/ic_account_balance_black_24px.svg'

                }

            ];
        }]
    );