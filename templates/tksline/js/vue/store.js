new Vue({
	el: "#index",

	delimiters: ["{_", "_}"],
	components: {
		Pagination,
	},
	data: {
		classes: null,
		typing: null,
		debounce: null,
		searchQuery: null,
		searchResults: null,

		prodottiUno: [],
		prodottiDue: [],
		prodottiTre: [],

		page: 1,
		perPage: 16,
		records: [],
		recordsLength: 0,
		loading: false,
		step: 1,
		min: Number(0.0).toFixed(2),
		max: Number(500).toFixed(2),
		maxThreshold: 500,
		minThreshold: 0,
		instance: undefined,
		computedLength: null,
		nameFilter: true,
		priceFilter: false,
		hoverProdotti: null,
		selectedFilter: 1,
		//shit
		param: null,
		categoryParam: null,

		classes: null,

		modal: [],

		hoverModal: 0,
		counterModal: 1,

		hasUpdatedCart: false,

		categorie: null,
		prodotti: [],
		product_filters: [],
		selected_filters: [],

		category_filter: null,
		search_filter: null,
		breadcrumb_type: "Ricerca",

		page: 1,
		limit: 15,
		skip: 0,
		totalProducts: 0,

		search: "",

		categorieVal: "",

		triggerCol: 0,

		loadingIcone: 0,

		filtri: [],

		sortedFiltriArray: [],

		filtersAreLoading: false,

		initCollapsed: false,

		cart: [],

		gridViews: 1,
		checkBoxFilters: [],
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

		numberFormat(data) {
			const euro = Intl.NumberFormat("it-IT", {
				style: "currency",
				currency: "EUR",
			});
			return euro.format(data);
		},
		updateValues: function (min, max) {
			this.$emit("update:min", (this.min = min));
			this.$emit("update:max", (this.max = max));
		},

		callback: function (page) {
			// no need for callback here since you have all your data loaded already
		},
		changeSelect(param) {
			if (this.selectedFilter === 1) {
				this.nameFilter = true;
				function SortArray(x, y) {
					if (x.title < y.title) {
						return -1;
					}
					if (x.title > y.title) {
						return 1;
					}
					return 0;
				}
				this.prodotti = this.prodotti.slice(0).sort(SortArray);
			}
			if (this.selectedFilter === 2) {
				this.priceFilter = true;
				function SortArray(x, y) {
					if (x.price < y.price) {
						return -1;
					}
					if (x.price > y.price) {
						return 1;
					}
					return 0;
				}

				this.prodotti = this.prodotti.slice(0).sort(SortArray);
			}
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

		pushToModal(item) {
			this.modal.push(item);
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

		setCheckBoxFilters(valueItem) {
			if (!this.checkBoxFilters.includes(valueItem)) {
				// ✅ only runs if value not in array
				this.checkBoxFilters.push(valueItem);
				console.log(this.checkBoxFilters);
			} else
				this.checkBoxFilters = this.checkBoxFilters.filter(function (el) {
					return el != valueItem;
				});

			console.log(this.checkBoxFilters);
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

		getAllProducts() {
			this.loading = true;
			let url = new URL("https://dummyjson.com/products");

			fetch("https://dummyjson.com/products")
				.then((response) => response.json())
				.then((res) => {
					this.totalProducts = res.products.length;
					this.prodotti = res.products;
				})
				.then(() => (this.loading = false));
		},
	},
	async mounted() {
		// console.log(Math.floor((Math.random() * 100) + 2).toFixed(2))
		//      this.loadCategorie();
		//    this.getFilters();
		//  this.getAllProducts();
		//  console.log(this.prodotti);
		//  alert(2);
		// Gets all url query params
		//const urlSearchParams = new URLSearchParams(window.location.search);
		//onst params = Object.fromEntries(urlSearchParams.entries());
		// this.category_filter = params.category;
		// if (!this.category_filter) this.category_filter = "";
		// this.search_filter = params.s;
		// if (this.search_filter) this.search = this.search_filter;
		// this.getAllProducts(1);
		//  if (this.filtri.length >= 0) {
		//   this.applyFiltri();
		// }
	},

	async created() {
		console.log(window.innerWidth);

		await this.getAllProducts();

		console.log(this.prodotti);

		this.instance = new ZbRangeSlider("my-slider");

		this.instance.onChange = (min, max) => this.updateValues(min, max);
		let uri = await window.location.search;
		let params = await new URLSearchParams(uri);
		this.param = await params.get("s");
		this.categoryParam = await params.get("categoria");

		var anchors =
			document.querySelectorAll(".page-link") &&
			document.querySelectorAll(".page-link");

		for (var i = 0; i < anchors.length; i++) {
			anchors[i].href = "#";
		}
	},

	computed: {
		displayedRecords() {
			if (this.param !== null) {
				this.computedLength = this.prodotti
					.filter((item) => {
						return (
							item.title.toLowerCase().search(this.param.toLowerCase()) >= 0
						);
					})
					.filter((item) => {
						return (
							item.price > Number(this.min) && item.price < Number(this.max)
						);
					}).length;

				const startIndex = this.perPage * (this.page - 1);

				const endIndex = startIndex + this.perPage;

				return this.checkBoxFilters.length > 5
					? this.prodotti

							.filter((item) => {
								return (
									item.title.toLowerCase().search(this.param.toLowerCase()) >= 0
								);
							})
							.filter((item) => {
								return (
									item.price > Number(this.min) && item.price < Number(this.max)
								);
							})
							.filter(
								function (e) {
									return this.indexOf(e.category) == -1;
								},
								[...this.checkBoxFilters]
							)
							.splice(startIndex, endIndex)
					: this.prodotti
							.filter((item) => {
								return (
									item.title.toLowerCase().search(this.param.toLowerCase()) >= 0
								);
							})
							.filter((item) => {
								return (
									item.price > Number(this.min) && item.price < Number(this.max)
								);
							})
							.splice(startIndex, endIndex);
			}

			this.computedLength = this.prodotti
				.filter((item) => {
					return (
						item.price >= Number(this.min) && item.price <= Number(this.max)
					);
				})
				.filter((item) => this.checkBoxFilters.includes(item.category)).length;

			const startIndex = this.perPage * (this.page - 1);

			const endIndex = startIndex + this.perPage;

			return this.checkBoxFilters.length
				? this.prodotti

						.filter((item) => {
							return (
								item.price > Number(this.min) && item.price < Number(this.max)
							);
						})
						.filter((el) => this.checkBoxFilters.includes(el.category))
						.splice(startIndex, endIndex)
				: this.prodotti
						.filter((item) => {
							return (
								item.price > Number(this.min) && item.price < Number(this.max)
							);
						})
						.splice(startIndex, endIndex);
		},

		computedMin() {
			return Number(this.min).toFixed(2);
		},

		computedMax() {
			return Number(this.max).toFixed(2);
		},

		uniqueCheckboxes() {
			const final = {};
			for (const { category } of this.prodotti) {
				final[category] = (final[category] || 0) + 1;
			}
			console.log(final);
			return final;
		},
	},
});
