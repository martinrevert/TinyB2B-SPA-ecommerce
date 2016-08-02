/**
 * Created by martin on 22/07/16.
 */

var app = angular.module('app');

app.factory('pdfSrv', function ($http, config) {
    return {
        async: function (numero) {
            return $http.get(config.apiUrl + "/PdfComprobante?documento=" + numero);  //this returns promise
        }
    };
});
