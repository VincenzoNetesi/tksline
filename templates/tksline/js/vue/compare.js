new Vue({
	el: "#index",

	delimiters: ["{_", "_}"],

	data: {
		classes: null,
		typing: null,
		debounce: null,
		searchQuery: null,
		searchResults: null,
		hoverProdotti: [],

		hoverModal: 0,

		hasUpdatedCart: false,

		categorie: null,
		prodotti: [],

		modal: [],

		modalQuantity: 1,

		prodottiUno: [],
		prodottiDue: [],
		prodottiTre: [],

		counterModal: 1,

		loadingIcone: 0,
		comparisonList: [],
	},

	watch: {
		// whenever searchQuery changes, this function will run
		searchQuery(newQuery, oldQuery) {
			if (newQuery) {
				this.searchResults = null;
				fetch(`https://dummyjson.com/products/search?q=${newQuery}`)
					.then((res) => res.json())
					.then((data) => (this.searchResults = data.products));
			} else {
				this.searchResults = null;
			}
		},
	},
	methods: {
		debounceSearch(e) {
			this.typing = "You are typing";
			this.searchResults = null;
			clearTimeout(this.debounce);
			this.debounce = setTimeout(() => {
				this.typing = null;
				this.searchQuery = e.target.value;
			}, 700);
		},

		verifyNumberQty(quantity) {
			q = Number(this.quantity);
			if (isNaN(q) || q < 1) q = 1;
			q = Math.ceil(q);
			return q;
		},
		pushToCompare(item) {
			const oldInfo = JSON.parse(localStorage.getItem("comparison"));
			localStorage.setItem(
				"comparison",
				oldInfo ? JSON.stringify([...oldInfo, item]) : JSON.stringify([item])
			);
		},
		numberFormat(data) {
			const euro = Intl.NumberFormat("it-IT", {
				style: "currency",
				currency: "EUR",
			});
			return euro.format(data);
		},
		getCart() {
			fetch("http://localhost/perseo/cart", {
				// Adding method type
				method: "POST", //anche DELETE ?

				// Adding headers to the request
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => res.json())
				.then((res) => {
					this.cart = res.carrello;
					alert(3);
				});
		},

		removeSingleFromCart(id) {
			fetch("http://localhost/perseo/cart-delete", {
				// Adding method type
				method: "POST", //anche DELETE ?

				// Adding body or contents to send
				body: JSON.stringify({
					id: id,
				}),

				// Adding headers to the request
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => res.json())
				.then((res) => {
					this.hasUpdatedCart = !this.hasUpdatedCart;
					this.getCart();
					console.log(res);
					console.log(this.hasUpdatedCart);
				});
		},

		updateCart(id, operation) {
			console.log(operation);

			fetch("http://localhost/perseo/cart-update", {
				method: "POST",
				/* or PATCH */
				headers: {
					"Content-Type": "application/json",
				},

				body: JSON.stringify({
					id: id,
					quantity: 1,
					operation: operation,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					this.getCart();
					console.log(res);
					this.hasUpdatedCart = !this.hasUpdatedCart;
				});
		},

		async pushToModal(item) {
			await this.modal.push(item);
			console.log(this.modal);
		},

		removeFromModal() {
			this.modal = [];
		},
		removeFromCompare(id) {
			var items = this.comparisonList;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				if (item.id == id) {
					items.splice(i, 1);
				}
			}
			localStorage.setItem("comparison", JSON.stringify(items));
		},
		addtoCart(id, title, price, image) {
			this.loadingIcone = 1;

			fetch("http://localhost/perseo/cart-add", {
				// Adding method type
				method: "POST", //anche DELETE ?

				// Adding body or contents to send
				body: JSON.stringify({
					id: id,
					nome: title,
					price: price,
					immagine: image,
					quantity: 1,
				}),

				// Adding headers to the request
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => console.log(res))
				.then(
					(this.hasUpdatedCart = !this.hasUpdatedCart),
					setTimeout(() => {
						this.loadingIcone = 2;
					}, 1500)
				)
				.then(
					setTimeout(() => {
						this.loadingIcone = 0;
					}, 2500)
				);
		},

		verifyNumberQty() {
			this.modalQuantity = Number(this.modalQuantity);
			if (isNaN(this.modalQuantity) || this.modalQuantity < 1)
				this.modalQuantity = 1;
			this.modalQuantity = Math.ceil(this.modalQuantity);
		},

		modalToCart(id, title, price, image, quantity) {
			this.loadingIcone = 1;
			this.modalQuantity = Number(this.modalQuantity);
			this.verifyNumberQty();
			console.log(this.loadingIcone);

			fetch("http://localhost/perseo/cart-add", {
				// Adding method type
				method: "POST", //anche DELETE ?

				// Adding body or contents to send
				body: JSON.stringify({
					id: id,
					nome: title,
					price: price,
					immagine: image,
					quantity: quantity,
				}),

				// Adding headers to the request
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			})
				.then((res) => console.log(res))
				.then(
					setTimeout(() => {
						this.loadingIcone = 2;
					}, 1500)
				)
				.then(
					(this.hasUpdatedCart = !this.hasUpdatedCart),
					setTimeout(() => {
						this.loadingIcone = 0;
					}, 2500)
				);
		},

		increase() {
			this.counterModal++;
		},

		decrease() {
			this.counterModal > 1 && this.counterModal--;
		},

		hoverOut: function () {
			this.classes = 1;
		},

		removeDuplicates(arr) {
			return arr.filter((item, index) => arr.indexOf(item) === index);
		},
	},
	created: function () {
		window.addEventListener("mouseup", function (event) {
			var pol = document.getElementById("pol");
			if (pol) {
				if (event.target != pol && event.target.parentNode != pol) {
					pol.style.display = "none";
				}
			}
		});
	},
	destroyed: function () {
		window.removeEventListener("mouseup", function (event) {
			var pol = document.getElementById("pol");
			if (pol) {
				if (event.target != pol && event.target.parentNode != pol) {
					pol.style.display = "none";
				}
			}
		});
	},
	async mounted() {
		let comparisonItems = await localStorage.getItem("comparison");
		this.comparisonList = await this.removeDuplicates(
			JSON.parse(comparisonItems)
		);
	},
});
