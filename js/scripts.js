function calcularCuota() {
    let salir = false;
    let monto;
    while (salir === false) {
        monto = prompt(
            "Ingrese el valor total del producto, para salir presione la tecla esc"
        )
        if (monto != null) {
            if (!isNaN(monto) && monto > 0) {
                let cuotas = parseInt(prompt("En cuantas cuotas lo quiere pagar?"))
                let totalPorCuota;
                if (!isNaN(cuotas) && cuotas <= 12 && cuotas > 0) {
                    totalPorCuota = monto / cuotas
                    salir = true;
                    alert(
                        "Usted debe pagar " + cuotas + " cuotas de " + totalPorCuota + " pesos"
                    )
                    return totalPorCuota;
                } else {
                    alert("Debe ingresar una cantidad de cuotas menor a 12")
                }
            } else {
                alert("Debe ingresar un número mayor a 0")
            }
        } else {
            alert("Gracias por usar la calculadora de cuotas")
            salir = true;
        }
    }
    return null;
}

const cart = [];

function addToCart(product) {
    cart.push(product);
}
console.log(JSON.parse(JSON.stringify(cart)))
addToCart({
    name: "product 1",
    price: 500,
    stock: 10,
    id: 1111,
    color: "black",
    qty: 1
})
console.log(JSON.parse(JSON.stringify(cart)))
addToCart({
    name: "product 2",
    price: 200,
    stock: 5,
    id: 2222,
    color: "white",
    qty: 1
})
console.log(JSON.parse(JSON.stringify(cart)))
addToCart({
    name: "product 3",
    price: 100,
    stock: 30,
    id: 3333,
    color: "green",
    qty: 1
})
console.log(JSON.parse(JSON.stringify(cart)))

function deleteItemFromCart(productID) {
    const index = cart.findIndex((product) => product.id === productID);
    if (index !== -1) {
        cart.splice(index, 1);
    }
}

deleteItemFromCart(1111);
console.log(JSON.parse(JSON.stringify(cart)))

function changeProductQty(productID, qty) {
    const index = cart.findIndex((product) => product.id === productID);
    if (index !== -1 && qty > 0) {
        cart[index].qty = qty;
    } else {
        if (qty === 0) {
            deleteItemFromCart(productID)
        }
    }
}


changeProductQty(2222, 10);
console.log(JSON.parse(JSON.stringify(cart)))

changeProductQty(2222,0)
console.log(JSON.parse(JSON.stringify(cart)))

