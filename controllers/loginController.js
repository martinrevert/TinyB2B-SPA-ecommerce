angular.module('app').controller('loginCtrl', function ($scope, $location, $http, config) {

    $scope.authenticate = function (usuario, pass) {
        $http.get(config.apiUrl + '/Busca_Usuario?usuario=' + usuario + '&pass=' + pass
        ).then(function (data) {
            console.log(data);

            if (data != "1") {
                $location.path("/login");
                console.log("Error login!!");
                $scope.authenticationError = "Error datos login";
            } else {
                $location.path("/pedidoporcategoria");
            }
        }).then(function (error) {
            $scope.authenticationError = error;
        });
    };
});