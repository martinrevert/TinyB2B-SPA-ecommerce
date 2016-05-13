/**
 * Created by martin on 09/05/16.
 */

angular.module('app').controller('productosCtrl', function ($scope, productosSrv) {

    /*  // Consulta de cabeceras de NV para controlador de consulta de Notas de Venta
     $http.get("http://200.43.222.67:8080/servicios/eikon.asmx/Consulta_NV_Cabecera?usuario=vallejo&pass=Kmo73700&viaje=&fecha=")
     .then(function(response) {
     $scope.data = response.data;
     }); */

    $scope.fromService = productosSrv.getProducts("martin", "dycsa", "1799", "T", "");


});
