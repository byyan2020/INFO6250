const state = {
	products: [
		{
			name: "Fluffball",
			img: "http://placekitten.com/150/150?image=1",
			smallImg: "http://placekitten.com/50/50?image=1",
			price: 0.99,
			count: 0,
		},
		{
			name: "General Mayhem",
			img: "http://placekitten.com/150/150?image=2",
			smallImg: "http://placekitten.com/50/50?image=2",
			price: 3.14,
			count: 0,
		},
		{
			name: "Nyan Cat",
			img: "http://placekitten.com/150/150?image=3",
			smallImg: "http://placekitten.com/50/50?image=3",
			price: 2.73,
			count: 0,
		},
	],

	viewCart: false,

	getCartCount: function () {
		let totalCount = 0;
		state.products.forEach((product) => {
			totalCount += product.count;
		});
		return totalCount;
	},

	getPricePerProduct: function (index) {
		return (state.products[index].count * state.products[index].price).toFixed(2);
	},

	getTotalPrice: function () {
		let totalPrice = 0;
		state.products.forEach((product) => {
			totalPrice += product.count * product.price;
		});
		return totalPrice.toFixed(2);
	},
};

export default state;
