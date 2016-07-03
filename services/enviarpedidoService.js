/**
 * Created by martin on 10/05/16.
 */
var app = angular.module('app');

app.factory('enviarpedidoSrv', function ($http, config) {

    return {
        async: function (notadeventa) {
            var data = angular.copy(notadeventa);
            var conf = {cache: false};
            var url = config.apiUrl + "/RecibeNotadeVenta2";

            return $http.post(
                url,
                data,
                conf
            ).then(function successCallback(response) {
                // ok
            }, function errorCallback(response) {
                console.log(data);
            });  //This returns promise
        }
    };
});