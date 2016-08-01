/**
 * Created by martin on 10/05/16.
 */
var app = angular.module('app');

app.factory('enviarpedidoSrv', function ($http, config) {

    return {
        async: function (notadeventa) {

            var data = angular.toJson(notadeventa);
            var conf = {
                cache: false,
                ignoreLoadingBar: true,
                headers: {
                    'Content-Type': 'text/plain'
                }
            };
            var url = config.apiUrl + "/RecibeNotadeVenta2";

            return $http.post(
                url,
                data,
                conf
            )
                /*.then(function successCallback(response) {
                 // ok
                 console.log(response.data);
                 }, function errorCallback(response) {
                 console.log(response.data);
                 }
                 )*/
                ;  //This returns promise
        }
    };
});