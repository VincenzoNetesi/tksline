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
		comparisonTick: false,
		wishlistTick: false,
		hoverModal: 0,
		selectedQuantity: 1,
		hasUpdatedCart: false,
		cartTick: 1,
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
		changeQty(selectedQuantity) {
			this.selectedQuantity = selectedQuantity;
			if (isNaN(this.selectedQuantity) || this.selectedQuantity < 1)
				this.selectedQuantity = 1;
		},
		verifyNumberQty() {
			this.selectedQuantity = Number(this.selectedQuantity);
			if (isNaN(this.selectedQuantity) || this.selectedQuantity < 1)
				this.selectedQuantity = 1;
			this.selectedQuantity = Math.ceil(this.selectedQuantity);
			return this.selectedQuantity;
		},
		debounceSearch(e) {
			this.typing = "You are typing";
			this.searchResults = null;
			clearTimeout(this.debounce);
			this.debounce = setTimeout(() => {
				this.typing = null;
				this.searchQuery = e.target.value;
			}, 700);
		},
		addToCart() {
			this.cartTick = 2;
			setTimeout(() => {
				this.cartTick = 1;
			}, 3000);
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

		increase() {
			this.counterModal++;
		},

		decrease() {
			this.counterModal > 1 && this.counterModal--;
		},

		hoverOut: function () {
			this.classes = 1;
		},

		swapImage: function (index) {
			this.hoverProdotti[index] = 1;
		},

		swapImageLeave: function (index) {
			this.hoverProdotti[index] = 0;
		},

		swapImageDue: function (index) {
			this.hoverProdottiDue.push((this.hoverProdottiDue[index] = 1));
			console.log(this.hoverProdottiDue);
		},

		swapImageLeaveDue: function (index) {
			this.hoverProdottiDue[index] = 0;
		},

		swapImageTre: function (index) {
			this.hoverProdottiTre.push((this.hoverProdottiTre[index] = 1));
		},

		swapImageLeaveTre: function (index) {
			this.hoverProdottiTre[index] = 0;
		},

		loadCategorie() {
			fetch("https://dummyjson.com/products/categories")
				.then((res) => res.json())
				.then((res) => (this.categorie = res));
		},

		getAllProdotti() {
			fetch("https://dummyjson.com/products")
				.then((response) => response.json())
				.then((res) => {
					if (this.search) {
						this.prodotti = res.products.filter((prodo) =>
							prodo.title.toLowerCase().includes(this.search.toLowerCase())
						);
					} else {
						this.prodotti = res.products;
					}
				});
		},

		mountAllProdotti() {
			//grid indexpage
			fetch("https://dummyjson.com/products")
				.then((response) => response.json())
				.then((res) => {
					const n = 3;
					const result = [[], [], []]; //we create it, then we'll fill it

					const wordsPerLine = Math.ceil(res.limit / 3);

					try {
						console.log(res);
						for (let line = 0; line < n; line++) {
							for (let i = 0; i < wordsPerLine; i++) {
								const value = res.products[i + line * wordsPerLine];
								if (!value) continue; //avoid adding "undefined" values
								result[line].push(value);
							}
						}

						return result;
					} catch (error) {
						console.log(error);
					}
				})
				.then((res) => {
					this.prodottiUno = res[0];
					this.prodottiDue = res[1];
					this.prodottiTre = res[2];
				})
				.then(() => {
					Vue.nextTick(function () {
						$(".products-slick .product") &&
							$(".products-slick").each(function () {
								var $this = $(this),
									$nav = $this.attr("data-nav");

								$this.slick({
									slidesToShow: 4,
									slidesToScroll: 1,
									autoplay: true,
									infinite: true,
									speed: 300,
									dots: false,
									arrows: true,
									appendArrows: $nav ? $nav : false,
									responsive: [
										{
											breakpoint: 991,
											settings: {
												slidesToShow: 2,
												slidesToScroll: 1,
											},
										},
										{
											breakpoint: 480,
											settings: {
												slidesToShow: 1,
												slidesToScroll: 1,
											},
										},
									],
								});
							});
					});
				})
				.catch((error) => console.log(error));
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

	mounted() {
		this.mountAllProdotti();
	},
});
