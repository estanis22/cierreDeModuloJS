
// requiero el array exportado de autos.js
const autos = require ("./autos.js");

let concesionaria = {
        // Al atributo autos le asigno la variable autos requerida de autos.js
    autos : autos,
        // Le doy como parametro a la funcion, la patente. 
    buscarAuto : function(patente){
        // Creo la variable auto, le asigno el auto encontrado con .find, este se fija si el parametro
        // ingresado coincide con el atributo patente.
        let auto = autos.find(auto => auto.patente == patente)
        // Si no lo encuentra devuelve undefined
        if (auto == undefined){
            return null;
        }else{
        // Si lo encuentra devuelve el objeto auto, con todos sus atributos.
            return auto;
        }
        },

    venderAuto: function (patente){
        // Uso la funcionalidad anterior para buscar el auto y se lo asigno a una nueva variable.
        let auto = this.buscarAuto (patente);
        // Cambio el atributo vendido del auto encontrado de false a true.
        auto.vendido = true;
        },

    autosParaLaVenta : function(){
        // Le asigno a un array de objetos, los autos que pasen el .filter,
        // se fija si el atributo vendido es igual a false.
        let autosVenta = autos.filter (auto => auto.vendido == false);
        return autosVenta;
        },

    autosNuevos : function (){
        // Uso la funcionalidad anterior y filtro el array encontrado.
        // La condicion para pasar es que el atributo km, sea menor a 100.
        let autos0km = this.autosParaLaVenta().filter(auto => auto.km < 100);
        return autos0km;
        },
        
    listaDeVentas : function(){
       // Creo la variable y le asigno los autos con el atributo vendido true.
        let autosVendidos = autos.filter(auto => auto.vendido === true);
        // Devuelve un array de numeros, auto.precio.
        return autosVendidos.map (auto => auto.precio);
            
        },

    totalDeVentas : function (){
        // Creo la variable precio y le asigno la funcionalidad anterior.
        let precios = this.listaDeVentas();
        // Devuelve el numero compuesto por la sumatoria de precios en el array.
        // El cero atras al final es para que el array funcione bien.
        return precios.reduce((acumulador, elemento) => acumulador + elemento,0)

    },
        // Recibe los objeto auto y persona completos.
        /* Ejemplo de persona:
        {
            nombre: "Juan",
            capacidadDePagoEnCuotas: 20000,
            capacidadDePagoTotal: 100000
        }
        */
    puedeComprar : function (auto, persona){
        // Devuelve un booleano a partir de analizar los condicionales.
        // Primero me fijo si que el auto no este vendido.
        return (auto.vendido == false && 
        // Comparo el monto total de la persona con el precio del auto.
            persona.capacidadDePagoTotal >= auto.precio && 
        // Comparo el monto de la cuota a pagar por la persona con el precio del auto dividido las cuotas.
            persona.capacidadDePagoEnCuotas >= (auto.precio/auto.cuotas))

    },

    autosQuePuedeComprar : function (persona){
        // Obtener los autos para la venta
        let autosParaLaVenta = this.autosParaLaVenta();
        // Filtro el array anterior viendo si pueden pagar el total.
        let autosPrecioOk = autosParaLaVenta.filter (auto => persona.capacidadDePagoTotal >= auto.precio);
        // Filtro el array anterior viendo si pueden pagar en cuotas.            
        let autosCuotasOk = autosPrecioOk.filter (auto => 
            persona.capacidadDePagoEnCuotas >= (auto.precio/auto.cuotas));
        return autosCuotasOk;
        }

        }
    
// El objeto auto.
console.log (concesionaria.buscarAuto('APL123'))
// null.
console.log (concesionaria.buscarAuto('APK123'))
// Imprime undefined, cambia el vendido a true.
console.log(concesionaria.venderAuto("APL123"))
// Array con el Honda, el Ford esta vendido justo arriba.
console.log(concesionaria.autosParaLaVenta())
// Array vacio, el Toyota esta vendido.
console.log(concesionaria.autosNuevos())
// Array con el precio del Ford y del Honda.
console.log(concesionaria.listaDeVentas())
// 25000
console.log(concesionaria.totalDeVentas())
// true
console.log(concesionaria.puedeComprar({ marca : "Toyota",
modelo : "Corolla",
precio : 100000, 
km : 0,
color : "Blanco",
cuotas : 14,
anio : 2019,
patente : "JJK116",
vendido : false}, {nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000}))
// Array con el Honda
console.log(concesionaria.autosQuePuedeComprar( {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
}))








