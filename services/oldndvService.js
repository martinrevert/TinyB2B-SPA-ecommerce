var app = angular.module('app');

app.factory("oldndvSrv", function ($http, config) {

    return {
        getCabeceraNDV: function (usuario, pass) {
            return $http.get(config.apiUrl + "/Consulta_NV_Cabecera?usuario=" + usuario + "&pass=" + pass + "&viaje=&fecha=");  //1. this returns promise
        },
        getItemsNDV: function (usuario, pass, emp, numero) {

            return $http.get(config.apiUrl + "/Consulta_NV_Items?usuario=" + usuario + "&pass=" + pass + "&emp=" + emp + "&numero=" + numero);

        }

    }
});