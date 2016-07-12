var app = angular.module('app');

app.factory('resuSrv', function ($http, config) {
    return {
        async: function (usuario,pass,codcliente) {
            return $http.get(config.apiUrl + "/ResumenDeCuenta?usuario=" + usuario +"&pass=" + pass + "&codcliente=" + codcliente);  //this returns promise
        }
    };
});