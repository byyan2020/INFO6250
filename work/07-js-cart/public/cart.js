/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");

var productsEl = document.querySelector(".products");
var cartEl = document.querySelector(".cartlist");
function render() {
  if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart) {
    renderCart(cartEl);
  } else {
    renderNoCart(cartEl);
  }
  renderProducts(productsEl);
}
function renderProducts(productsEl) {
  var listingHtml = getListingHtml();
  var viewCartBtn = getViewCartBtnHtml();
  var productsHtml = "\n        <h2>Cats Listing</h2>\n        <ul class=\"listings\">".concat(listingHtml, "</ul>\n        ").concat(viewCartBtn, "\n        ");
  productsEl.innerHTML = productsHtml;
}
function renderNoCart(cartEl) {
  cartEl.innerHTML = "";
}
function renderCart(cartEl) {
  var totalCount = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getCartCount();
  var cartListHtml = totalCount ? getCartHtml() : "<p>Nothing in the cart</p>";
  cartEl.innerHTML = "\n    <h2>Shopping Cart</h2>\n    ".concat(cartListHtml, "\n    ");
}
function getViewCartBtnHtml() {
  var totalCount = _state__WEBPACK_IMPORTED_MODULE_0__["default"].getCartCount();
  var viewCartText = totalCount ? "View Cart (".concat(totalCount, ")") : "View Cart";
  var btnText = _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart ? "Hide Cart" : viewCartText;
  return "\n    <button type=\"button\" class=\"view-cart\">\n            ".concat(btnText, "\n    </button>\n    ");
}
function getListingHtml() {
  var listings = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
    return "\n        <li class=\"product\">\n            <h3 class=\"product-name\" data-index=\"".concat(index, "\">").concat(product.name, "</h3>\n            <img class=\"product-img\" src=").concat(product.img, "/>\n            <p class=\"product-price\">Price: $").concat(product.price, "</p>\n            <button \n              data-index=\"").concat(index, "\" class=\"add-cart\" type=\"button\">\n              Add to cart\n            </button>\n        </li>\n        ");
  }).join("");
  return listings;
}
function getCartHtml() {
  var cartHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
    var inCartClass = product.count ? "in-cart" : "not-in-cart";
    return "\n          <li class=\"cart ".concat(inCartClass, "\">\n            <h4 class=\"cart-name\" data-index=\"").concat(index, "\">\n              ").concat(product.name, "\n            </h4>\n            <img class=\"cart-img\" src=").concat(product.smallImg, ">\n            <div class=\"count-group\">\n                <button \n                data-index=\"").concat(index, "\" class=\"minus-one\" type=\"button\">\n                -\n                </button>\n                <span class=\"cart-count\">").concat(product.count, "</span>\n                <button \n                data-index=\"").concat(index, "\" class=\"add-one\" type=\"button\">\n                +\n                </button>\n            </div>\n            <p>Price: $").concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getPricePerProduct(index), "</p>\n          </li>\n        ");
  }).join("");
  cartHtml = "<ul class=\"carts\">".concat(cartHtml, "</ul>");
  var totalPriceHtml = "<p>Total Price: $".concat(_state__WEBPACK_IMPORTED_MODULE_0__["default"].getTotalPrice(), "</p>");
  var checkoutBtn = "<button type=\"button\" class=\"checkout\">Checkout</button>";
  cartHtml += totalPriceHtml;
  cartHtml += checkoutBtn;
  return cartHtml;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var state = {
  products: [{
    name: "Fluffball",
    img: "http://placekitten.com/150/150?image=1",
    smallImg: "http://placekitten.com/50/50?image=1",
    price: 0.99,
    count: 0
  }, {
    name: "General Mayhem",
    img: "http://placekitten.com/150/150?image=2",
    smallImg: "http://placekitten.com/50/50?image=2",
    price: 3.14,
    count: 0
  }, {
    name: "Nyan Cat",
    img: "http://placekitten.com/150/150?image=3",
    smallImg: "http://placekitten.com/50/50?image=3",
    price: 2.73,
    count: 0
  }],
  viewCart: false,
  getCartCount: function getCartCount() {
    var totalCount = 0;
    state.products.forEach(function (product) {
      totalCount += product.count;
    });
    return totalCount;
  },
  getPricePerProduct: function getPricePerProduct(index) {
    return (state.products[index].count * state.products[index].price).toFixed(2);
  },
  getTotalPrice: function getTotalPrice() {
    var totalPrice = 0;
    state.products.forEach(function (product) {
      totalPrice += product.count * product.price;
    });
    return totalPrice.toFixed(2);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");


var appEl = document.querySelector("#app");
appEl.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-cart")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart = !_state__WEBPACK_IMPORTED_MODULE_0__["default"].viewCart;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("product")) {
    var index = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].added = !_state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index].added;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("delete")) {
    var _index = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.splice(_index, 1);
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("add-cart")) {
    var _index2 = e.target.dataset.index;
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].count === 0) {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].count = 1;
    } else {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index2].count += 1;
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("add-one")) {
    var _index3 = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index3].count += 1;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("minus-one")) {
    var _index4 = e.target.dataset.index;
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[_index4].count -= 1;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
  if (e.target.classList.contains("checkout")) {
    _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.forEach(function (product) {
      product.count = 0;
    });
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
    return;
  }
});
(0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=cart.js.map