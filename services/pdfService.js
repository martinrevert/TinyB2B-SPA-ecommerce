/**
 * Created by martin on 22/07/16.
 */

var app = angular.module('app');

app.factory('pdfSrv', function ($http, config) {
    return {
        async: function (numero, codcliente) {
            return $http.get(config.apiUrl + "/PdfComprobante2?documento=" + numero + "&codcliente=" + codcliente);  //this returns promise
        }
    };
});
