/**
 * Created by martin on 10/05/16.
 */
angular.module('app').controller('marcasCtrl', function($scope, $http){
    $http.get("http://200.43.222.67:8080/servicios/eikon.asmx/Busca_Marcas?usuario=martin&pass=dycsa")
        .then(function(response) {
            $scope.data = response.data;
        });
});