import state from "./state";

const productsEl = document.querySelector(".products");
const cartEl = document.querySelector(".cartlist");

function render() {
	if (state.viewCart) {
		renderCart(cartEl);
	} else {
		renderNoCart(cartEl);
	}
	renderProducts(productsEl);
}

function renderProducts(productsEl) {
    const listingHtml = getListingHtml()
    const viewCartBtn = getViewCartBtnHtml()
	const productsHtml = `
        <h2>Cats Listing</h2>
        <ul class="listings">${listingHtml}</ul>
        ${viewCartBtn}
        `;
	productsEl.innerHTML = productsHtml;
}

function renderNoCart(cartEl) {
	cartEl.innerHTML = "";
}

function renderCart(cartEl) {
    const totalCount = state.getCartCount()
	const cartListHtml = totalCount ? getCartHtml() : `<p>Nothing in the cart</p>`
	cartEl.innerHTML = `
    <h2>Shopping Cart</h2>
    ${cartListHtml}
    `;
}

function getViewCartBtnHtml() {
    const totalCount = state.getCartCount()
    const viewCartText = totalCount ? `View Cart (${totalCount})` : "View Cart"
    const btnText = state.viewCart ? "Hide Cart" : viewCartText

    return `
    <button type="button" class="view-cart">
            ${btnText}
    </button>
    `
}

function getListingHtml() {
    const listings = state.products.map((product, index) => {
        return `
        <li class="product">
            <h3 class="product-name" data-index="${index}">${product.name}</h3>
            <img class="product-img" src=${product.img}/>
            <p class="product-price">Price: $${product.price}</p>
            <button 
              data-index="${index}" class="add-cart" type="button">
              Add to cart
            </button>
        </li>
        `
    }).join("");

    return listings;
}

function getCartHtml() {
    let cartHtml = state.products
		.map((product, index) => {
			const inCartClass = product.count ? "in-cart" : "not-in-cart";
			return `
          <li class="cart ${inCartClass}">
            <h4 class="cart-name" data-index="${index}">
              ${product.name}
            </h4>
            <img class="cart-img" src=${product.smallImg}>
            <div class="count-group">
                <button 
                data-index="${index}" class="minus-one" type="button">
                -
                </button>
                <span class="cart-count">${product.count}</span>
                <button 
                data-index="${index}" class="add-one" type="button">
                +
                </button>
            </div>
            <p>Price: $${state.getPricePerProduct(index)}</p>
          </li>
        `;
		})
		.join("");

    cartHtml = `<ul class="carts">${cartHtml}</ul>`
    const totalPriceHtml = `<p>Total Price: $${state.getTotalPrice()}</p>`
    const checkoutBtn = `<button type="button" class="checkout">Checkout</button>`
    cartHtml += totalPriceHtml
    cartHtml += checkoutBtn

    return cartHtml
}


export default render;