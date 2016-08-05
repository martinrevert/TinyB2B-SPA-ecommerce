/**
 * Created by martin on 04/08/16.
 */

var app = angular.module('app');

app.factory('pdflistaSrv', function ($http, config) {
    return {
        async: function (cliente) {
            return $http.get(config.apiUrl + "/PdfComprobante?documento=" + cliente);  //this returns promise
        }
    };
});