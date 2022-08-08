const cart = JSON.parse(localStorage.getItem("cart")) ?? []
const total = cart.reduce((acumulator, product) => acumulator + product.price, 0)
document.getElementById("cartTotal").innerHTML =  cart.length + "- $"+total

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

//array de cart items forEach()  find() filter() some() map()  reduce() sort()
//const cart = new Array();

class Product {
    constructor(name, img, price, description, id, color, stock) {
        this.name = name;
        this.img = img;
        this.price = price;
        this.description = description
        this.id = id;
        this.color = color;
        this.stock = stock;
    }
}

const product1 = new Product(
    "Nvidia RTX 3080",
    "https://ddtech.mx/assets/uploads/07b9dd6cc5f40598fabc9546c27712b5.png",
    1500,
    "Tarjeta gráfica tope de gama",
    1,
    "black",
    10
)
const product2 = new Product(
    "Nvidia RTX 3070",
    "https://as01.epimg.net/meristation/imagenes/2020/11/04/reportajes/1604481781_2" +
            "48646_1604481912_noticia_normal.jpg",
    1200,
    "tarjeta gráfica de gama media alto rendimiento", 2,
    "black",
    10
)
const product3 = new Product(
    "Nvidia RTX 3060",
    "https://thotcomputacion.com.uy/wp-content/uploads/2021/03/12G-P5-3657-KR_LG_16" +
            "29_7b1e27934adb49418cd71fa64f868981.png",
    1000,
    "tarjeta gráfica de buena correlación precio/rendimiento",
    3,
    "black",
    10
)

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
        product.stock -= qty;
        localStorage.setItem("cart",JSON.stringify(cart))
        const total = cart.reduce((acumulator, product) => acumulator + product.price, 0)
        document.getElementById("cartTotal").innerHTML =  cart.length + "- $"+total
        
    }
}

function deleteItemFromCart(productID) {
    const index = cart.findIndex((cartItem) => cartItem.product.id == productID);
    console.log(index);
    if (index !== -1) {
        const cartItem = cart[index];
        cartItem.product.stock += cartItem.qty
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
            cartItem.product.stock += cartItem.qty;
            cartItem.qty = 0;
            cart.splice(index, 1);
        } else {
            const difference = cartItem.qty - qty;
            cartItem.qty = qty;
            cartItem.product.stock += difference
        }
    } else {
        alert("el producto no existe en el carrito")
    }
}

const contenedorProductos = document.getElementById("contenedorProductos")

//creador de cards
let cardsCreator = ``
catalogoProductos.forEach(product => {
    const idBtn = `AddToCart${product.id}`
    contenedorProductos.innerHTML += `
    <div class="col-md-4 my-4">
        <div class="card" style="width: 18rem;">
        <img src=${product.img} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text color-succes">$${product.price}</p>
            <p class="card-text">Quedan: ${product.stock} disponibles!</p>
            <button class="btn btn-primary" id=${idBtn}>Agregar al Carrito</button>
        </div>
    </div>
    </div>
    `
})

catalogoProductos.forEach((product) => {
    const idBtn = `AddToCart${product.id}`
    document.getElementById(idBtn).addEventListener("click", ()=>{ 
        addToCart(product,1)
        
console.log(cart)
console.log(total)
    })
})

/*  testeo de funciones
console.log(JSON.parse(JSON.stringify(cart)))
addToCart
 * (product1, 3)
console.log(JSON.parse(JSON.stringify(cart)))
addToCart(product
 * 2, 2)
console.log(JSON.parse(JSON.stringify(cart)))
addToCart(product3, 4)
co
 * nsole.log(JSON.parse(JSON.stringify(cart)))
deleteItemFromCart(1);
console.lo
 * g(JSON.parse(JSON.stringify(cart)))
changeProductQty(2, 10);
console.log(JSON
 * .parse(JSON.stringify(cart)))
changeProductQty(2, 0)
console.log(JSON.parse(J
 * SON.stringify(cart))) 
 */