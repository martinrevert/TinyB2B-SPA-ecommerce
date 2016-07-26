angular.module('app').controller('loginCtrl', function ($scope, $location, $http, $routeParams, config, $storage, clientesSrv, $timeout) {

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
                $location.path("/login");
                console.log("Error login!!");
                $scope.authenticationError = "Error datos login";
            } else {

                clientesSrv.async(usuario, password, "C", cliente).then(function (d) {

                    var respcli = d;
                    var fpago = respcli.data[0].fpago;
                    var nombre = respcli.data[0].Nombre;
                    var domicilio = respcli.data[0].direccion;
                    tablausuario.setItem('fpago', fpago);
                    tablausuario.setItem('nombre', nombre.trim());
                    tablausuario.setItem('direccion', domicilio);

                });

                tablausuario.setItem('usuario', usuario);
                tablausuario.setItem('pass', password);
                tablausuario.setItem('cliente', cliente);
                $timeout(function()
                {
                    $location.path("/pedidoporcategoria");
                }, 1500);
            }
        }).then(function (error) {
            $scope.authenticationError = error;
        });
    };
});