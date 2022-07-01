// const valorIngresado = prompt("ingresa la cantidad de veces que quieres repetir el saludo")

// for (let i=0; i<valorIngresado; i++){
// console.log("hola")
// }

let entradaUsuario = ""
let salida = ""
while (entradaUsuario != "esc") {
    entradaUsuario = prompt("ingreses su palabra")
    salida += entradaUsuario + " "
    if (entradaUsuario != "esc") {
        console.log(salida)
    }
}