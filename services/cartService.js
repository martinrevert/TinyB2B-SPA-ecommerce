var app = angular.module('app');

app.factory("cartSrv", function ($storage, $mdToast, vibrator, ngAudio) {

    var tablausuario = $storage('tablaUsuario');
    var tablanotadeventa = $storage('tablanotadeventa');
    var usuario = tablausuario.getItem('usuario');
    var cliente = tablausuario.getItem('cliente');
    var direccion = tablausuario.getItem('direccion');
    var fpagocli = tablausuario.getItem('fpago');
    var cartData = null;


    function initializeCart(){

         cartData = {
            "pedido": {
                "anticipo": null,
                "area": "C",
                "codigocliente": cliente,
                "direccionentrega": direccion,
                "fechaentrega": null,
                "fechaenvio": null,
                "fpago": fpagocli,
                "observacionserin": null,
                "observacionservet": null,
                "ordendecompraserin": null,
                "ordendecompraservet": null,
                "usuario": usuario,
                "productos": []
            }
        };
        tablanotadeventa.setItem('cartData', cartData);
    }

    if (tablanotadeventa.getItem('cartData') == null) {
        initializeCart();
    } else {
        cartData = tablanotadeventa.getItem('cartData');
    }

    return {

        addProduct: function (codigo, descripcion, bonif, bonifmax, cantidad, emp, factor, iva, medida, medida1, medida2, peso, precioFinalConIva, preneto, prenetoConDescuento, tipoprecio, uvent) {

            var addedToExistingItem = false;
            console.log("Producto " + codigo + " agregado a cart");
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].codigo == codigo) {
                    //No se agrega, ya existe
                    addedToExistingItem = true;
                    $mdToast.show($mdToast.simple().textContent('El producto ya está cargado en su carro de compras.'));
                    ngAudio.play('snd/142608__autistic-lucario__error.mp3');
                    vibrator.vibrate(2000);
                    break;
                }
            }
            if (!addedToExistingItem) {

                if (uvent == "1") {
                    cartData.pedido.productos.push({
                        cantidad: cantidad,
                        codigo: codigo,
                        descripcion: descripcion,
                        bonif: bonif,
                        bonifmax: bonifmax,
                        emp: emp,
                        factor: factor,
                        iva: iva,
                        medida: medida,
                        medida1: medida1,
                        medida2: medida2,
                        peso: peso,
                        precioFinalConIva: precioFinalConIva,
                        preneto: preneto,
                        prenetoConDescuento: prenetoConDescuento,
                        tipo_precio: tipoprecio,
                        uventa: uvent
                    });
                }else{
                    cartData.pedido.productos.push({
                        cantidad: cantidad,
                        codigo: codigo,
                        descripcion: descripcion,
                        bonif: bonif,
                        bonifmax: bonifmax,
                        emp: emp,
                        factor: factor,
                        iva: iva,
                        medida: medida,
                        medida1: medida1,
                        medida2: medida2,
                        peso: peso * factor,
                        precioFinalConIva: precioFinalConIva * factor,
                        preneto: preneto * factor,
                        prenetoConDescuento: prenetoConDescuento * factor,
                        tipo_precio: tipoprecio,
                        uventa: uvent
                    });

                }
                ngAudio.play('snd/74813__sugu14__shoppingcart1.mp3');
                tablanotadeventa.setItem('cartData', cartData);
            }
        },

        removeProduct: function (id) {
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].codigo == id) {
                    cartData.pedido.productos.splice(i, 1);
                    ngAudio.play('snd/349220__natty23__removing-a-cap-from-an-asthma-inhaler.mp3');
                    tablanotadeventa.setItem('cartData', cartData);
                    break;
                }
            }
        },

        removeNotadeVenta: function () {

             initializeCart();

        },

        changeQuantity: function () {

            tablanotadeventa.setItem('cartData', cartData);

        },

        getDomicilio: function () {

            return cartData.pedido.direccionentrega;

        },

        setDomicilio: function (domicilio) {

            cartData.pedido.direccionentrega = domicilio;
            tablanotadeventa.setItem('cartData', cartData);

        },

        getObservaciones: function () {

            return cartData.pedido.observacionserin;

        },

        setObservaciones: function (observacion) {

            cartData.pedido.observacionserin = observacion;
            cartData.pedido.observacionservet = observacion;
            tablanotadeventa.setItem('cartData', cartData);

        },

        setFechas: function (hoy, manana) {

            cartData.pedido.fechaenvio = hoy;
            cartData.pedido.fechaentrega = manana;
            tablanotadeventa.setItem('cartData', cartData);

        },

        getProducts: function () {
            return cartData.pedido.productos;
        },


        getPedido: function () {
            return cartData;
        },

        getItems: function () {
            var ittot = cartData.pedido.productos.length;
            console.log("items totales servicio: " + ittot);
            return ittot;

        },

        getPrecioTotalDescuento: function () {

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].uventa == '1') {
                    total += (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].cantidad);
                } else {
                    total += (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].cantidad);
                }
            }
            return total;

        },
        getPrecioNeto: function () {

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].uventa == '1') {
                    total += (cartData.pedido.productos[i].preneto * cartData.pedido.productos[i].cantidad);
                } else {
                    total += (cartData.pedido.productos[i].preneto * cartData.pedido.productos[i].cantidad);
                }
            }
            return total;

        },
        getPrecioTotalDescuentoIVA: function () {

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].uventa == '1') {
                    total += (cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].cantidad);
                } else {
                    total += (cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].cantidad);
                }
            }
            return total;

        },
        getIva: function () {

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].uventa == '1') {
                    total += ((cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].cantidad) - (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].cantidad));
                } else {
                    total += ((cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].cantidad) - (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].cantidad));
                }
            }
            return total;

        }
    }
});