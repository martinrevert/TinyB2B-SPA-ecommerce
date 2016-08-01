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
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            })
            .when('/pedidoporcategoria', {
                templateUrl: 'views/pedidoporcategoria.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidopordescripcion', {
                templateUrl: 'views/pedidopordescripcion.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidoporcodigo', {
                templateUrl: 'views/pedidoporcodigo.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidoofertas', {
                templateUrl: 'views/pedidoofertas.html',
                controller: 'pedidoCtrl'
            })
            .when('/pedidomiscomprasfrecuentes', {
                templateUrl: 'views/pedidomiscomprasfrecuentes.html',
                controller: 'pedidoCtrl'
            })
            .when('/listaprecios', {
                templateUrl: 'views/listaprecios.html',
                controller: 'listapreciosCtrl'
            })
            .when('/checkout', {
                templateUrl: 'views/checkout.html',
                controller: 'checkoutCtrl'
            })
            .when('/consultadepedidos', {
                templateUrl: 'views/consultadepedidos.html',
                controller: 'oldndvCtrl'
            })
            .when('/resumendecuenta', {
                templateUrl: 'views/resumendecuenta.html',
                controller: 'resuCtrl'
            })
            .when('/pdfviewer/:numero', {
                templateUrl: 'views/viewer.html',
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

                if (ruta.current.loadedTemplateUrl == 'views/login.html') {
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