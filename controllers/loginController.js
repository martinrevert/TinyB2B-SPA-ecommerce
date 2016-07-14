angular.module('app').controller('loginCtrl', function ($scope, $location, $http, $routeParams, config, $storage) {

    $scope.authenticate = function (usuario, pass) {
        $http.get(config.apiUrl + '/Busca_Usuario?usuario=' + usuario + '&pass=' + pass
        ).then(function (data) {

            var tablausuario = $storage('tablaUsuario');
            var resultado = data;
            var resp = resultado.data[0].respuesta;

            console.log(resultado.data[0].respuesta);

            if (resp != "1") {
                $location.path("/login");
                console.log("Error login!!");
                $scope.authenticationError = "Error datos login";
            } else {

                tablausuario.setItem('usuario', resultado);
                $location.path("/pedidoporcategoria");

            }
        }).then(function (error) {
            $scope.authenticationError = error;
        });
    };
});