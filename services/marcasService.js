/**
 * Created by martin on 14/06/16.
 */


var app = angular.module('app');

app.factory('marcasSrv', function ($http, config) {
    return {
        async: function (usuario,pass) {
            return $http.get(config.apiUrl + "/Busca_Marcas?usuario=" + usuario +"&pass=" + pass);  //this returns promise
        }
    };
});

/*
angular.module('app').controller('marcasCtrl', function($scope, $http){
    $http.get("http://200.43.222.67:8080/servicios/eikon.asmx/Busca_Marcas?usuario=martin&pass=dycsa")
        .then(function(response) {
            $scope.data = response.data;
        });
});
*/