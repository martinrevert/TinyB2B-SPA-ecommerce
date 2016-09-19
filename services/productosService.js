/**
 * Created by martin on 10/05/16.
 */
var app = angular.module('app');

app.factory('productosSrv', function ($http, config) {
    return {
        async: function (usuario, pass, cliente, tipo, cadena) {
            return $http.get(config.apiUrl + "/Busca_Producto_Sin_PE?usuario=" + usuario + "&pass=" + pass + "&cliente=" + cliente +
                "&tipo=" + tipo + "&cadena=" + cadena);  //1. this returns promise
        }
    };
});