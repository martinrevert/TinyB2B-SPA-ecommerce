angular.module('app').controller('pdfviewerlistadepreciosCtrl', function ($scope, pdflistaSrv, $storage) {

    var tablausuario = $storage('tablaUsuario');
    var cliente = tablausuario.getItem('cliente');
    var hoy = moment().format('DD/MM/YYYY');

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

    pdflistaSrv.async('Precios' + cliente).then(function (d) {

        docu = d.data[0].archivo;

        var final = $scope.base64(docu, 'application/pdf');

        $scope.downloadPdf = function () {
            saveAs(final, 'ListaPreciosGrupoSerin' + hoy + '.pdf');
        };

        $scope.pdfUrl = URL.createObjectURL(final);

    });

});

