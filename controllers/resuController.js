/**
 * Created by martin on 22/06/16.
 */
//Todo lógica sidebar
//Todo service para consumir servicio de resumen
//Todo service para decodificar PDFs

angular.module('app').controller('resuCtrl', function ($scope, resuSrv) {

    resuSrv.async("roberto", "dycsa", "1799").then(function (d) {

            $scope.comprobantes = d.data;
        }
    );


});
