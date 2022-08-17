let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

class CartItem {
    constructor(product, qty) {
        this.product = product;
        this.qty = qty;
    }
}

/// CART FUNCTIONS /
function addToCart(product, qty) {
    if (product.stock >= qty) {
        let index = cart.findIndex(object => {
            return object.product.id === product.id;
        });
        // if ternario. Si item existe en carrito --> aumentar qty. Sino agregar al carrito
        index != -1 ? cart[index].qty += qty : cart.push(new CartItem(product, qty));
        product.stock -= qty;
        localStorage.setItem("cart", JSON.stringify(cart));
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Looks like we are out of stock"}
            )
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
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "The product is not in the cart anymore"}
            );
    }
}

function emptyCart() {
    cart = [];
    document.getElementById("cartTotal").innerHTML = "";
    localStorage.setItem("cart", JSON.stringify(cart));
}

/// HTML FUNCTIONS /

/// generates cart cards in modal of the cart preview
function generateCartElements() {
    let modal = document.getElementById("cardsModal")
    modal.innerHTML = ``
    cart.forEach((cartItem) => {
        let item = document.createElement("tr")
        item.setAttribute("id",cartItem.product.id.toString())
        item.innerHTML = `            
            <td class = "product-table"><img class = "cart-img" src="${cartItem.product.img}">${cartItem.product.name}</td>
            <td class = "product-table">${cartItem.product.price} </td>
            <td class = "product-table">${cartItem.qty} </td>
            <td class = "product-table">${parseInt(cartItem.qty * cartItem.product.price)} </td>
            <td><button class ="btn-danger"> delete </button></td>
            `
            item.getElementsByClassName("btn-danger")[0].addEventListener('click', deleteItemFromCart, false)
            modal.append(item)
    })
}


function populateContainer() {
    const contenedorProductos = document.getElementById("contenedorProductos");
    contenedorProductos.innerHTML = "";
    fetch("Products.json")
    .then((response) => response.json())
    .then(productsCatalog => {
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
    })
}

//Add to cart button functionality
function payButtonSuccess(){
    document.getElementById("payButton").addEventListener("click", () =>{
        if(cart.length > 0){
            Swal.fire({
                icon: 'success',
                title: 'Thank you',
                text: 'Your order has been placed correctly!',
                })
                emptyCart()
        }else{
            Swal.fire({
                icon: 'error',
                title: 'There are no products on the cart',
                // text: 'Your order has been placed correctly!',
                })
            }
        });
    }

function prepareButtons() {
    fetch("Products.json")
    .then((response) => response.json())
    .then(productsCatalog => {
        productsCatalog.forEach((product) => {
            const idBtn = `AddToCart${product.id}`;
            document.getElementById(idBtn).addEventListener("click", () => {
                addToCart(product, 1);
            });
        })
    });
    document.getElementById("emptyCart").addEventListener("click", () => {
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
        (acumulator, cartItem) => acumulator + cartItem.product.price * cartItem.qty,
        0
    );
    let qty = 0
    cart.forEach((cartItem) => {
        qty += cartItem.qty
    })
    if(qty > 0){
        document.getElementById("cartTotal").innerHTML = qty.toString() + "- $" + total;
    }else{
        emptyCart();
    }

}


/// INITIALIZE SITE /

updateContainer();
updateCartInfo();
payButtonSuccess();