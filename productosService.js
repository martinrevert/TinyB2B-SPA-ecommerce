/**
 * Created by martin on 10/05/16.
 */
var app = angular.module('app', []);

// Service definition
app.service('productosSrv', function () {

    this.getProducts = function (usuario, pass, cliente, tipo, cadena) {

        // Habría que configurar como constante global la URL base

        $http.get("http://200.43.222.67:8080/servicios/eikon.asmx/Busca_Productos?usuario=" + usuario + "&pass=" + pass + "&cliente=" + cliente +
            "&tipo=" + tipo + "&cadena=" + cadena)
            .then(function (response) {
                console.log(data);
                return productos = response.data;
            }).then(function (response) {
            return response.status;
            console.log(status);
        });


    };
});

// AngularJS Controller that uses the service
/*
function HelloCtrl($scope, testService) {
    $scope.fromService = testService.sayHello("World");

}*/