/**
 * Created by martin on 22/06/16.
 */

angular.module('app').controller('oldndvCtrl', function ($scope, oldndvSrv) {

    $scope.selected = [];

    oldndvSrv.getCabeceraNDV("martin", "dycsa").then(function (d) {
        $scope.ndvs = d.data;
    });

    $scope.getItems = function (emp, numero) {
        oldndvSrv.getItemsNDV("martin", "dycsa", emp, numero).then(function (d) {
            $scope.items = d.data;
        });
    };

});
