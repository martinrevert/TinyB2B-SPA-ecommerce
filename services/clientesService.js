/**
 * Created by martin on 14/06/16.
 */

var app = angular.module('app');

app.factory('clientesSrv', function ($http, config) {
    return {
        async: function (usuario, pass, tipo, cadena) {
            return $http.get(config.apiUrl + "/Busca_Clientes?usuario=" + usuario + "&pass=" + pass + "&tipo=" + tipo + "&cadena=" + cadena);  //this returns promise
        }
    };
});
