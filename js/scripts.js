// const valorIngresado = prompt("ingresa la cantidad de veces que quieres
// repetir el saludo") for (let i=0; i<valorIngresado; i++){ console.log("hola")
// } let entradaUsuario = "" let salida = "" while (entradaUsuario != "esc") {
// entradaUsuario = prompt("ingreses su palabra")     salida += entradaUsuario +
// " "     if (entradaUsuario != "esc") {         console.log(salida)     } }

function calcularCuota() {
    let salir = false;
    let monto;
    while (salir === false) {
        monto = prompt(
            "ingrese el valor total del producto, para salir presione la tecla esc"
        )
        if (monto != null) {
            if (!isNaN(monto) && monto > 0) {
                let cuotas = parseInt(prompt("en cuantas cuotas lo quiere pagar?"))
                let totalPorCuota;
                if (cuotas <= 12 && cuotas > 0) {
                    totalPorCuota = monto / cuotas
                    salir = true;
                    alert(
                        "ustede debe pagar " + cuotas + " cuotas de " + totalPorCuota + " pesos"
                    )
                    return totalPorCuota;
                } else {
                    alert("debe ingresar una cantidad de cuotas menor a 12")
                }
            } else {
                alert("debe ingresar un número mayor a 0")
            }
        } else {
            alert("Gracias por usar la calculadora de cuotas")
            salir = true;
        }
    }
}
let valorCuota = calcularCuota();
//scope - importante entenderlo