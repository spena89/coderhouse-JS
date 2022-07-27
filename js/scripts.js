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

//array de cart items
// forEach()  find() filter() some() map()  reduce() sort()
const cart = new Array();

class Product {
    constructor(name, price, id, color, stock) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.color = color;
        this.stock = stock;
    }
}

const product1 = new Product("product1", 500, 1, "black",10)
const product2 = new Product("product2", 200, 2, "white",10)
const product3 = new Product("product3", 100, 3, "green",10)

const catalogoProductos = [product1, product2, product3]

class CartItem {
    constructor(product, qty) {
        this.product = product;
        this.qty = qty;
    }
}

//agregar condicion de si el producto ya se encuentra en el carrito
function addToCart(product, qty) {
    if (product.stock >= qty) {
        cart.push(new CartItem(product, qty));
        product.stock =- qty;
    }
}

function deleteItemFromCart(productID) {
    const index = cart.findIndex((cartItem) => cartItem.product.id == productID);
    console.log(index);
    
    if (index !== -1) {
        const cartItem = cart[index];
        cartItem.product.stock =+ cartItem.qty
        cartItem.qty = 0; 
        cart.splice(index, 1);
    } else {
        alert("El producto no se encuentra en el carrito")
    }
}

function changeProductQty(productID, qty) {
    const index = cart.findIndex((cartItem) => cartItem.product.id === productID);
    if (index !== -1) {
        const cartItem = cart[index];
        if (qty == 0) {
            cartItem.qty = 0;
            cart.splice(index, 1);
        } else {
            const difference = cartItem.qty - qty;
            cartItem.qty = qty;
            cartItem.product.stock =+ difference 
        }
    } else {
        alert("el producto no existe en el carrito")
    }

}

console.log(JSON.parse(JSON.stringify(cart)))

addToCart(product1, 3)

console.log(JSON.parse(JSON.stringify(cart)))

addToCart(product2, 2)

console.log(JSON.parse(JSON.stringify(cart)))

addToCart(product3, 4)

console.log(JSON.parse(JSON.stringify(cart)))

deleteItemFromCart(1);

console.log(JSON.parse(JSON.stringify(cart)))

changeProductQty(2, 10);

console.log(JSON.parse(JSON.stringify(cart)))

changeProductQty(2, 0)

console.log(JSON.parse(JSON.stringify(cart)))