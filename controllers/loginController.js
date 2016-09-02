angular.module('app').controller('loginCtrl', function ($scope, $location, $http, $routeParams, config, $storage, clientesSrv, $timeout, $mdToast, vibrator, ngAudio) {

    $scope.authenticate = function (usuario, pass) {
        $http.get(config.apiUrl + '/Busca_Usuario?usuario=' + usuario + '&pass=' + pass
        ).then(function (data) {
            var tablausuario = $storage('tablaUsuario');
            var resultado = data;
            var resp = resultado.data[0].respuesta;
            var usuario = resultado.data[0].usuario;
            var password = resultado.data[0].pass;
            var tipo = resultado.data[0].tipo;
            var cli = resultado.data[0].cliente;
            var cliente = cli.replace(/['"]+/g, '').trim();

            console.log(resultado.data[0].respuesta);

            if (resp != "1" || tipo != "C") {
                vibrator.vibrate(2000);
                $mdToast.show($mdToast.simple().textContent('Datos incorrectos, verifique y reintente.'));
                ngAudio.play('snd/142608__autistic-lucario__error.mp3');
            } else {
                clientesSrv.async(usuario, password, "C", cliente).then(function (d) {

                    var respcli = d;
                    var fpago = respcli.data[0].fpago;
                    var nombre = respcli.data[0].Nombre;
                    var domicilio = respcli.data[0].direccion;
                    tablausuario.setItem('fpago', fpago);
                    tablausuario.setItem('nombre', nombre.trim());
                    tablausuario.setItem('direccion', domicilio);
                    tablausuario.setItem('usuario', usuario);
                    tablausuario.setItem('pass', password);
                    tablausuario.setItem('cliente', cliente);

                    $scope.$emit('usuario-changed');
                    $scope.$emit('empresa-changed');

                    $location.path("/pedidoporcategoria");

                });

            }

        });
    };

});
