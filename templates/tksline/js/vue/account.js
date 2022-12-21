// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
	{
		path: "/order-history",
		name: "order_history",
		component: () => import("../../js/vue/components/order_history.min.js"),
	},

	{
		path: "/profile",
		name: "order_history",
		component: () => import("../../js/vue/components/account.min.js"),
	},
	{
		path: "/info-pagamenti",
		name: "pagamenti",
		component: () => import("../../js/vue/components/pagamenti.min.js"),
	},
	{
		path: "/prodotti-scaricabili",
		name: "prodotti_scaricabili",
		component: () =>
			import("../../js/vue/components/prodotti_scaricabili.min.js"),
	},
	{
		path: "/wishlist",
		name: "wishlist",

		component: () => import("../../js/vue/components/wishlist.min.js"),
	},
	{
		path: "/rubrica",
		name: "rubrica",
		component: () => import("../../js/vue/components/rubrica.min.js"),
	},
	{
		path: "/account-edit",
		name: "account_edit",
		component: () => import("../../js/vue/components/account_edit.min.js"),
	},
	{
		path: "/billing-agreement",
		name: "billing_agreement",
		component: () => import("../../js/vue/components/billing_agreement.min.js"),
	},
	{
		path: "/list-action",
		name: "list_action",
		component: () => import("../../js/vue/components/list_action.min.js"),
	},
	{
		path: "/reviews",
		name: "reviews",
		component: () => import("../../js/vue/components/reviews.min.js"),
	},
	{
		path: "/newsletter-manage",
		name: "newsletter_manage",
		component: () => import("../../js/vue/components/newsletter_manage.min.js"),
	},
];

const router = new VueRouter({
	routes, // short for `routes: routes`
});

new Vue({
	el: "#account",
	router,
	delimiters: ["{_", "_}"],

	data: {
		hasUpdatedCart: false,
		typing: null,
		debounce: null,
		searchQuery: null,
		searchResults: null,
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
		goBack() {
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
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
	},

	computed: {
		currentRouteName() {
			return this.$route.name;
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
	//get purchased history
});
