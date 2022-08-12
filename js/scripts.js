let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

/// CLASSES /
class Product {
    constructor(name, img, price, description, id, color, stock) {
        this.name = name;
        this.img = img;
        this.price = price;
        this.description = description;
        this.id = id;
        this.color = color;
        this.stock = stock;
    }
}

class CartItem {
    constructor(product, qty) {
        this.product = product;
        this.qty = qty;
    }
}

/// CART FUNCTIONS /
function addToCart(product, qty) {
    // falta implementar si item existe en carrito
    if (product.stock >= qty) {
        let index = cart.findIndex(object => {
            return object.product.id === product.id;
        });
        //if ternario. Si item existe en carrito --> aumentar qty. Sino agregar al carrito
        index != -1 ? cart[index].qty += qty : cart.push(new CartItem(product, qty));

        product.stock -= qty;
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        alert("no queda más stock")
    }
    updateCartInfo();
    updateContainer();
}

function deleteItemFromCart() {
    // TODO: update HTML
    let index = cart.findIndex(object => {
        return object.product.id === parseInt(this.parentElement.parentElement.id);
    })
    if (index !== -1) {
        this.parentElement.parentElement.remove()
        const cartItem = cart[index];
        cartItem.product.stock += cartItem.qty;
        cartItem.qty = 0;
        cart.splice(index, 1);
        updateCartInfo();
        updateContainer();
    } else {
        alert("El producto no se encuentra en el carrito");
    }
}

function emptyCart() {
    cart = [];
    document.getElementById("cartTotal").innerHTML = "empty";
    localStorage.setItem("cart", JSON.stringify(cart));
}

/// HTML FUNCTIONS /

function generateCartElements() {
    let modal = document.getElementById("cardsModal")
    modal.innerHTML = ``
    cart.forEach((cartItem) => {
        let item = document.createElement("tr")
        item.setAttribute("id",cartItem.product.id.toString())
        item.innerHTML = `
            <th scope = "row">-  ${cartItem
            .product
            .id} </th>
            <td>-  ${cartItem
            .product
            .name} </td>
            <td>- <img style="width: 50px" src="${cartItem
            .product
            .img}"> </td>
            <td> - ${cartItem
            .product
            .price} </td>
            <td> - ${cartItem
            .qty} </td>
            <td><button class ="btn-danger"> delete </button></td>
            `
            item.getElementsByClassName("btn-danger")[0].addEventListener('click', deleteItemFromCart, false)
            modal.append(item)
    })
}

function populateContainer() {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";
    productsCatalog.forEach((product) => {
        const idBtn = `AddToCart${product.id}`;
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
    `;
    });
}

//Add to cart button functionality
function prepareButtons() {
    productsCatalog.forEach((product) => {
        const idBtn = `AddToCart${product.id}`;
        document
            .getElementById(idBtn)
            .addEventListener("click", () => {
                addToCart(product, 1);
            });
    });
    document
        .getElementById("emptyCart")
        .addEventListener("click", () => {
            emptyCart();
        });
}

//updates stock visible by users on HTML
function updateContainer() {
    populateContainer();
    prepareButtons();
}

function updateCartInfo() {
    const total = cart.reduce(
        (acumulator, cartItem) => acumulator + cartItem.product.price,
        0
    );
    let qty = 0
    cart.forEach((cartItem) => {
        qty += cartItem.qty
    })
    document
        .getElementById("cartTotal")
        .innerHTML = qty.toString() + "- $" + total;
}

/// PRODUCTS CATALOG  /

const product1 = new Product(
    "Nvidia RTX 3080",
    "https://ddtech.mx/assets/uploads/07b9dd6cc5f40598fabc9546c27712b5.png",
    1500,
    "High end graphics card",
    1,
    "black",
    10
);
const product2 = new Product(
    "Nvidia RTX 3070",
    "https://as01.epimg.net/meristation/imagenes/2020/11/04/reportajes/1604481781_2" +
            "48646_1604481912_noticia_normal.jpg",
    1200,
    "High performing mid-range graphics card",
    2,
    "black",
    10
);
const product3 = new Product(
    "Nvidia RTX 3060",
    "https://thotcomputacion.com.uy/wp-content/uploads/2021/03/12G-P5-3657-KR_LG_16" +
            "29_7b1e27934adb49418cd71fa64f868981.png",
    1000,
    "Best bang for the buck graphics card mid-tier",
    3,
    "black",
    10
);

const productsCatalog = [product1, product2, product3];

/// INITIALIZE SITE /

updateContainer();
updateCartInfo();
