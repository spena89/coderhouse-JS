// const valorIngresado = prompt("ingresa la cantidad de veces que quieres
// repetir el saludo") for (let i=0; i<valorIngresado; i++){ console.log("hola")
// } let entradaUsuario = "" let salida = "" while (entradaUsuario != "esc") {
// entradaUsuario = prompt("ingreses su palabra")     salida += entradaUsuario +
// " "     if (entradaUsuario != "esc") {         console.log(salida)     } }

function calcularCuota() {
    let i = 1;
    let monto = "esc"
    while (i === 1) {
        monto = prompt(
            "ingrese el valor total del producto, para salir presione la tecla esc"
        )
        if (monto != "esc") {
            console.log(monto)
            let cuotas = parseInt(prompt("en cuantas cuotas lo quiere pagar?"))
            let totalPorCuota;
            if (cuotas <= 12) {
                totalPorCuota = monto / cuotas
                i = 0;
                alert(
                    "ustede debe pagar " + cuotas + " cuotas de " + totalPorCuota + " pesos"
                )
                return totalPorCuota;
            } else {
                alert("debe ingresar una cantidad de cuotas menor a 12")
            }
        } else {
            alert("Gracias por usar la calculadora de cuotas")
            i=0
        }
    }

}
let valorCuota = calcularCuota();
//scope - importante entenderlo