/**
 * Created by martin on 10/05/16.
 */
var app = angular.module('app');

app.factory('productosSrv', function ($http, config) {
    return {
        async: function (usuario, pass, cliente, tipo, cadena) {
            return $http.get(config.apiUrl + "/Busca_Producto?usuario=" + usuario + "&pass=" + pass + "&cliente=" + cliente +
                "&tipo=" + tipo + "&cadena=" + cadena);  //1. this returns promise
        }
    };
});

/*
 // Service definition
 app.service('productosSrv', function ($http) {

 this.getProducts = function (usuario, pass, cliente, tipo, cadena) {

 // Habría que configurar como constante global la URL base

 $http.get("http://200.43.222.67:8080/servicios/eikon.asmx/Busca_Producto?usuario=" + usuario + "&pass=" + pass + "&cliente=" + cliente +
 "&tipo=" + tipo + "&cadena=" + cadena)
 .then(function (response) {
 console.log(response.data);
 return response.data;
 });

 };
 });
 */


// AngularJS Controller that uses the service
/*
 function HelloCtrl($scope, testService) {
 $scope.fromService = testService.sayHello("World");

 }*/