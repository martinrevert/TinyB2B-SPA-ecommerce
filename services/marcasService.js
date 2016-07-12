/**
 * Created by martin on 14/06/16.
 */

var app = angular.module('app');

app.factory('marcasSrv', function ($http, config) {
    return {
        async: function (usuario, pass) {
            return $http.get(config.apiUrl + "/Busca_Marcas?usuario=" + usuario + "&pass=" + pass);  //this returns promise
        }
    };
});
