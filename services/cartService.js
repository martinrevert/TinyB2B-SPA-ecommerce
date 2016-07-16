var app = angular.module('app');

app.factory("cartSrv", function () {

    // var cartData = [];
    var cartData = {
        "pedido": {
            "anticipo": null,
            "area": "C",
            "codigocliente": "1799",
            "direccionentrega": "AVELLANEDA 3183 Bº ALTA CORDOBA CORDOBA - CORDOBA CORDOBA",
            "fechaentrega": "09/06/2016",
            "fechaenvio": "09/06/2016",
            "fpago": "2",
            "observacionserin": null,
            "observacionservet": null,
            "ordendecompraserin": null,
            "ordendecompraservet": null,
            "usuario": "roberto",
            "productos": []
        }
    };


    return {

        addProduct: function (codigo, descripcion, bonif, bonifmax, cantidad, emp, factor, iva, medida, medida1, medida2, peso, precioFinalConIva, preneto, prenetoConDescuento, tipoprecio, uvent) {

            var addedToExistingItem = false;
            console.log("Producto " + codigo + " agregado a cart");
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos[i].codigo == codigo) {
                    //No se agrega, ya existe
                    addedToExistingItem = true;
                    console.log("No se ya agrega, codigo de producto ya existe");
                    break;
                }
            }
            if (!addedToExistingItem) {

                cartData.pedido.productos.push({
                    cantidad: cantidad, codigo: codigo, descripcion: descripcion, bonif: bonif, bonifmax: bonifmax,
                    emp: emp, factor: factor, iva: iva, medida: medida, medida1: medida1, medida2: medida2, peso: peso,
                    precioFinalConIva: precioFinalConIva, preneto: preneto, prenetoConDescuento: prenetoConDescuento,
                    tipo_precio: tipoprecio, uventa: uvent
                });
            }
        },

        removeProduct: function (id) {
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if (cartData.pedido.productos.codigo == id) {
                    cartData.pedido.productos.splice(i, 1);
                    break;
                }
            }
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

        getPrecioTotalDescuento: function (){

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if(cartData.pedido.productos[i].uventa == '1') {
                    total += (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].cantidad);
                }else{
                    total += (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].factor * cartData.pedido.productos[i].cantidad);
                }
            }
            return total;

        },
        getPrecioNeto: function (){

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if(cartData.pedido.productos[i].uventa == '1') {
                    total += (cartData.pedido.productos[i].preneto* cartData.pedido.productos[i].cantidad);
                }else{
                    total += (cartData.pedido.productos[i].preneto * cartData.pedido.productos[i].factor * cartData.pedido.productos[i].cantidad);
                }
            }
            return total;

        },
        getPrecioTotalDescuentoIVA: function (){

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if(cartData.pedido.productos[i].uventa == '1') {
                    total += (cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].cantidad);
                }else{
                    total += (cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].factor * cartData.pedido.productos[i].cantidad);
                }
            }
            return total;

        },
        getIva: function (){

            var total = 0;
            for (var i = 0; i < cartData.pedido.productos.length; i++) {
                if(cartData.pedido.productos[i].uventa == '1') {
                    total += ((cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].cantidad) - (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].cantidad));
                }else{
                    total += ((cartData.pedido.productos[i].precioFinalConIva * cartData.pedido.productos[i].factor * cartData.pedido.productos[i].cantidad) - (cartData.pedido.productos[i].prenetoConDescuento * cartData.pedido.productos[i].factor * cartData.pedido.productos[i].cantidad));
                }
            }
            return total;

        }
    }
});