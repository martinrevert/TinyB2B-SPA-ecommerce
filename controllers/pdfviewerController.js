angular.module('app').controller('pdfviewerCtrl', function ($scope, pdfSrv, $routeParams, $mdMedia, $storage) {
    var tablausuario = $storage('tablaUsuario');
    var cliente = tablausuario.getItem('cliente');
    var numero = $routeParams.numero;
    var docu = "";

    $scope.$mdMedia = $mdMedia;

    $scope.base64 = function (base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, {type: contentType});
    };

    pdfSrv.async(numero, cliente).then(function (d) {

        docu = d.data[0].archivo;

        var final = $scope.base64(docu, 'application/pdf');

        $scope.downloadPdf = function (){
            saveAs(final, numero.trim() + '.pdf');
        };

        $scope.pdfUrl = URL.createObjectURL(final);

    });

});

