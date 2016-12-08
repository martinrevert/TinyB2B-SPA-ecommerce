/**
 * Created by martin on 07/12/16.
 */

var app = angular.module('app');

app.factory('excellistaSrv', function ($http, config) {
    return {
        async: function (codigo, cliente) {
            return $http.get(config.apiUrl + "/PdfComprobante2?documento=" + codigo  + "&codcliente=" + cliente);  //this returns promise
        }
    };
});