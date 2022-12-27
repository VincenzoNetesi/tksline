new Vue({
	el: "#index",

	delimiters: ["{_", "_}"],

	data: {
		setLogin: true,
		setReset: false,
		submitLogin: false,
		errorsLogin: [],

		formLogin: {
			email: null,
			password: null,
		},

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
		async pushToCompare(item) {
			const oldInfo = JSON.parse(localStorage.getItem("comparison"));
			localStorage.setItem(
				"comparison",
				oldInfo ? JSON.stringify([...oldInfo, item]) : JSON.stringify([item])
			);
			this.comparisonTick = item.id;
			setTimeout(() => {
				this.comparisonTick = false;
			}, 2000);
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

		checkFormLogin: function (e) {
			if (e) {
				e.preventDefault();
			}

			this.errorsLogin = [];

			if (!this.validEmail(this.formLogin.email)) {
				this.errorsLogin.push("Inserisci una email valida perfavore.");

				this.submitLogin = false;
			}

			if (!this.validPassword(this.formLogin.password)) {
				this.errorsLogin.push("Password invalida");

				this.submitLogin = false;
			}

			if (!this.errorsLogin.length) {
				// fetch user data and disappear blocks
				console.log("success");
			}
		},

		validPassword: function (email) {
			var re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\S+$).{6,}$/;
			return re.test(email);
		},

		validEmail: function (email) {
			var re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
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
});
