angular.module('app').controller('listapreciosCtrl', function ($scope, productosSrv) {

        productosSrv.async("martin","dycsa","1799","X","A").then(function (d){
            $scope.productos = d.data;
        });

});