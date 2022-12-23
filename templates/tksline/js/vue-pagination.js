var Pagination = (function (t) {
	var e = {};
	function i(n) {
		if (e[n]) return e[n].exports;
		var a = (e[n] = { i: n, l: !1, exports: {} });
		return t[n].call(a.exports, a, a.exports, i), (a.l = !0), a.exports;
	}
	return (
		(i.m = t),
		(i.c = e),
		(i.d = function (t, e, n) {
			i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
		}),
		(i.r = function (t) {
			"undefined" != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
				Object.defineProperty(t, "__esModule", { value: !0 });
		}),
		(i.t = function (t, e) {
			if ((1 & e && (t = i(t)), 8 & e)) return t;
			if (4 & e && "object" == typeof t && t && t.__esModule) return t;
			var n = Object.create(null);
			if (
				(i.r(n),
				Object.defineProperty(n, "default", { enumerable: !0, value: t }),
				2 & e && "string" != typeof t)
			)
				for (var a in t)
					i.d(
						n,
						a,
						function (e) {
							return t[e];
						}.bind(null, a)
					);
			return n;
		}),
		(i.n = function (t) {
			var e =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return i.d(e, "a", e), e;
		}),
		(i.o = function (t, e) {
			return Object.prototype.hasOwnProperty.call(t, e);
		}),
		(i.p = "/dist/"),
		i((i.s = 0))
	);
})([
	function (t, e, i) {
		"use strict";
		var n =
				"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  },
			a = o(i(1)),
			s = o(i(2));
		function o(t) {
			return t && t.__esModule ? t : { default: t };
		}
		var r = i(4);
		t.exports = {
			render: r.call(void 0),
			model: { prop: "page", event: "paginate" },
			props: {
				page: { type: Number, required: !0 },
				for: { type: String, required: !1 },
				records: { type: Number, required: !0 },
				perPage: { type: Number, default: 25 },
				vuex: { type: Boolean },
				options: { type: Object },
			},
			data: function () {
				return { firstPage: this.page };
			},
			watch: {
				page: function (t) {
					"scroll" === this.opts.chunksNavigation &&
						this.allowedPage(t) &&
						!this.inDisplay(t) &&
						(this.firstPage = t);
				},
			},
			computed: {
				opts: function () {
					return (0, s.default)((0, a.default)(), this.options);
				},
				Theme: function () {
					if ("object" === n(this.opts.theme)) return this.opts.theme;
					var t = { bootstrap3: i(5), bootstrap4: i(6), bulma: i(7) };
					if (void 0 === n(t[this.opts.theme]))
						throw (
							"vue-pagination-2: the theme " +
							this.opts.theme +
							" does not exist"
						);
					return t[this.opts.theme];
				},
				pages: function () {
					return this.records
						? (function (t, e) {
								return Array.apply(0, Array(e)).map(function (e, i) {
									return i + t;
								});
						  })(this.paginationStart, this.pagesInCurrentChunk)
						: [];
				},
				totalPages: function () {
					return this.records ? Math.ceil(this.records / this.perPage) : 1;
				},
				totalChunks: function () {
					return Math.ceil(this.totalPages / this.opts.chunk);
				},
				currentChunk: function () {
					return Math.ceil(this.page / this.opts.chunk);
				},
				paginationStart: function () {
					return "scroll" === this.opts.chunksNavigation
						? this.firstPage
						: (this.currentChunk - 1) * this.opts.chunk + 1;
				},
				pagesInCurrentChunk: function () {
					return this.paginationStart + this.opts.chunk <= this.totalPages
						? this.opts.chunk
						: this.totalPages - this.paginationStart + 1;
				},
				count: function () {
					if (/{page}/.test(this.opts.texts.count))
						return this.totalPages <= 1
							? ""
							: this.opts.texts.count
									.replace("{page}", this.page)
									.replace("{pages}", this.totalPages);
					var t = this.opts.texts.count.split("|"),
						e = (this.page - 1) * this.perPage + 1,
						i =
							this.page == this.totalPages
								? this.records
								: e + this.perPage - 1;
					return t[
						Math.min(
							1 == this.records ? 2 : 1 == this.totalPages ? 1 : 0,
							t.length - 1
						)
					]
						.replace("{count}", this.formatNumber(this.records))
						.replace("{from}", this.formatNumber(e))
						.replace("{to}", this.formatNumber(i));
				},
			},
			methods: {
				setPage: function (t) {
					this.allowedPage(t) && this.paginate(t);
				},
				paginate: function (t) {
					this.$emit("paginate", t);
				},
				next: function () {
					var t = this.page + 1;
					return (
						"scroll" === this.opts.chunksNavigation &&
							this.allowedPage(t) &&
							!this.inDisplay(t) &&
							this.firstPage++,
						this.setPage(t)
					);
				},
				prev: function () {
					var t = this.page - 1;
					return (
						"scroll" === this.opts.chunksNavigation &&
							this.allowedPage(t) &&
							!this.inDisplay(t) &&
							this.firstPage--,
						this.setPage(t)
					);
				},
				inDisplay: function (t) {
					var e = this.firstPage,
						i = e + this.opts.chunk - 1;
					return t >= e && t <= i;
				},
				nextChunk: function () {
					return this.setChunk(1);
				},
				prevChunk: function () {
					return this.setChunk(-1);
				},
				setChunk: function (t) {
					this.setPage((this.currentChunk - 1 + t) * this.opts.chunk + 1);
				},
				allowedPage: function (t) {
					return t >= 1 && t <= this.totalPages;
				},
				allowedChunk: function (t) {
					return (
						(1 == t && this.currentChunk < this.totalChunks) ||
						(-1 == t && this.currentChunk > 1)
					);
				},
				allowedPageClass: function (t) {
					return this.allowedPage(t) ? "" : this.Theme.disabled;
				},
				allowedChunkClass: function (t) {
					return this.allowedChunk(t) ? "" : this.Theme.disabled;
				},
				activeClass: function (t) {
					return this.page == t ? this.Theme.active : "";
				},
				formatNumber: function (t) {
					return this.opts.format
						? t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						: t;
				},
			},
		};
	},
	function (t, e, i) {
		"use strict";
		Object.defineProperty(e, "__esModule", { value: !0 }),
			(e.default = function () {
				return {
					format: !0,
					chunk: 10,
					chunksNavigation: "fixed",
					edgeNavigation: !1,
					theme: "bootstrap3",
					texts: {
						count:
							"Showing {from} to {to} of {count} records|{count} records|One record",
						first: "First",
						last: "Last",
					},
				};
			});
	},
	function (t, e, i) {
		(function (t) {
			!(function (e) {
				var i = function (t) {
					return a(!0 === t, !1, arguments);
				};
				function n(t, e) {
					if ("object" !== s(t)) return e;
					for (var i in e)
						"object" === s(t[i]) && "object" === s(e[i])
							? (t[i] = n(t[i], e[i]))
							: (t[i] = e[i]);
					return t;
				}
				function a(t, e, a) {
					var o = a[0],
						r = a.length;
					(t || "object" !== s(o)) && (o = {});
					for (var u = 0; u < r; ++u) {
						var l = a[u];
						if ("object" === s(l))
							for (var c in l) {
								var h = t ? i.clone(l[c]) : l[c];
								o[c] = e ? n(o[c], h) : h;
							}
					}
					return o;
				}
				function s(t) {
					return {}.toString.call(t).slice(8, -1).toLowerCase();
				}
				(i.recursive = function (t) {
					return a(!0 === t, !0, arguments);
				}),
					(i.clone = function (t) {
						var e,
							n,
							a = t,
							o = s(t);
						if ("array" === o)
							for (a = [], n = t.length, e = 0; e < n; ++e)
								a[e] = i.clone(t[e]);
						else if ("object" === o)
							for (e in ((a = {}), t)) a[e] = i.clone(t[e]);
						return a;
					}),
					e ? (t.exports = i) : (window.merge = i);
			})(
				"object" == typeof t && t && "object" == typeof t.exports && t.exports
			);
		}.call(this, i(3)(t)));
	},
	function (t, e) {
		t.exports = function (t) {
			return (
				t.webpackPolyfill ||
					((t.deprecate = function () {}),
					(t.paths = []),
					t.children || (t.children = []),
					Object.defineProperty(t, "loaded", {
						enumerable: !0,
						get: function () {
							return t.l;
						},
					}),
					Object.defineProperty(t, "id", {
						enumerable: !0,
						get: function () {
							return t.i;
						},
					}),
					(t.webpackPolyfill = 1)),
				t
			);
		};
	},
	function (t, e, i) {
		"use strict";
		t.exports = function () {
			return function (t) {
				var e = this.Theme,
					i = [],
					n = "",
					a = "",
					s = "",
					o = "";
				return (
					this.opts.edgeNavigation &&
						this.totalChunks > 1 &&
						((s = t(
							"li",
							{
								class:
									"VuePagination__pagination-item " +
									e.item +
									" " +
									(1 === this.page ? e.disabled : "") +
									" VuePagination__pagination-item-prev-chunk",
							},
							[
								t(
									"a",
									{
										class: e.link,
										attrs: {
											href: "#",
											disabled: 1 === this.page,
										},
										on: { click: this.setPage.bind(this, 1) },
									},
									[this.opts.texts.first]
								),
							]
						)),
						(o = t(
							"li",
							{
								class:
									"VuePagination__pagination-item " +
									e.item +
									" " +
									(this.page === this.totalPages ? e.disabled : "") +
									" VuePagination__pagination-item-prev-chunk",
							},
							[
								t(
									"a",
									{
										class: e.link,
										attrs: {
											href: "#",
											disabled: this.page === this.totalPages,
										},
										on: { click: this.setPage.bind(this, this.totalPages) },
									},
									[this.opts.texts.last]
								),
							]
						))),
					"fixed" === this.opts.chunksNavigation &&
						((n = t(
							"li",
							{
								class:
									"VuePagination__pagination-item " +
									e.item +
									" " +
									e.prev +
									" VuePagination__pagination-item-prev-chunk " +
									this.allowedChunkClass(-1),
							},
							[
								t(
									"a",
									{
										class: e.link,
										attrs: {
											href: "#",
											disabled: !!this.allowedChunkClass(-1),
										},
										on: { click: this.setChunk.bind(this, -1) },
									},
									["<<"]
								),
							]
						)),
						(a = t(
							"li",
							{
								class:
									"VuePagination__pagination-item " +
									e.item +
									" " +
									e.next +
									" VuePagination__pagination-item-next-chunk " +
									this.allowedChunkClass(1),
							},
							[
								t(
									"a",
									{
										class: e.link,
										attrs: {
											href: "#",
											disabled: !!this.allowedChunkClass(1),
										},
										on: { click: this.setChunk.bind(this, 1) },
									},
									[">>"]
								),
							]
						))),
					this.pages.map(
						function (n) {
							i.push(
								t(
									"li",
									{
										class:
											"VuePagination__pagination-item " +
											e.item +
											" " +
											this.activeClass(n),
									},
									[
										t(
											"a",
											{
												class: e.link + " " + this.activeClass(n),
												attrs: { href: "#", role: "button" },
												on: { click: this.setPage.bind(this, n) },
											},
											[n]
										),
									]
								)
							);
						}.bind(this)
					),
					t("div", { class: "VuePagination " + e.wrapper }, [
						t("nav", { class: "" + e.nav }, [
							t(
								"ul",
								{
									directives: [{ name: "show", value: this.totalPages > 1 }],
									class: e.list + " VuePagination__pagination",
								},
								[
									s,
									n,
									t(
										"li",
										{
											class:
												"VuePagination__pagination-item " +
												e.item +
												" " +
												e.prev +
												" VuePagination__pagination-item-prev-page " +
												this.allowedPageClass(this.page - 1),
										},
										[
											t(
												"a",
												{
													class: e.link,
													attrs: {
														href: "#",
														disabled: !!this.allowedPageClass(this.page - 1),
													},
													on: { click: this.prev.bind(this) },
												},
												["<"]
											),
										]
									),
									i,
									t(
										"li",
										{
											class:
												"VuePagination__pagination-item " +
												e.item +
												" " +
												e.next +
												" VuePagination__pagination-item-next-page " +
												this.allowedPageClass(this.page + 1),
										},
										[
											t(
												"a",
												{
													class: e.link,
													attrs: {
														href: "#",
														disabled: !!this.allowedPageClass(this.page + 1),
													},
													on: { click: this.next.bind(this) },
												},
												[">"]
											),
										]
									),
									a,
									o,
								]
							),
							t(
								"p",
								{
									directives: [{ name: "show", value: parseInt(this.records) }],
									class: "VuePagination__count " + e.count,
								},
								[this.count]
							),
						]),
					])
				);
			};
		};
	},
	function (t, e, i) {
		"use strict";
		t.exports = {
			nav: "",
			count: "",
			wrapper: "",
			list: "pagination",
			item: "page-item",
			link: "page-link",
			next: "",
			prev: "",
			active: "active",
			disabled: "disabled",
		};
	},
	function (t, e, i) {
		"use strict";
		t.exports = {
			nav: "",
			count: "",
			wrapper: "",
			list: "pagination",
			item: "page-item",
			link: "page-link",
			next: "",
			prev: "",
			active: "active",
			disabled: "disabled",
		};
	},
	function (t, e, i) {
		"use strict";
		t.exports = {
			nav: "",
			count: "",
			wrapper: "pagination",
			list: "pagination-list",
			item: "",
			link: "pagination-link",
			next: "",
			prev: "",
			active: "is-current",
			disabled: "",
		};
	},
]);
