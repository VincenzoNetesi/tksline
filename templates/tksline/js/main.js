(function($) {
	("use strict");

	// Mobile Nav toggle
	$(".menu-toggle > a").on("click", function (e) {
		e.preventDefault();
		$("#responsive-nav").toggleClass("active");
	});

	// Fix cart dropdown from closing
	$(".cart-dropdown").on("click", function (e) {
		e.stopPropagation();
	});

	/* 6. Nice Selectorp  */
	var nice_Select = $("#lang");
	if (nice_Select.length) {
		nice_Select.niceSelect();
	}

	/* 1. Language select */
	$("#lang").on("change", function (e) {
		Cookies.set("lang", $(this).val(), { expires: 30 });
		window.location.reload(false);
	});

	$(".your-class").slick({
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: "linear",
		appendDots: false,
	});
	/////////////////////////////////////////

	// Products Widget Slick
	$(".products-widget-slick").each(function () {
		var $this = $(this),
			$nav = $this.attr("data-nav");

		$this.slick({
			infinite: true,
			autoplay: true,
			speed: 300,
			dots: false,
			arrows: true,
			appendArrows: $nav ? $nav : false,
		});
	});

	/////////////////////////////////////////

	// Product Main img Slick
	$("#product-main-img").slick({
		infinite: true,
		speed: 300,
		dots: false,
		arrows: true,
		fade: true,
		asNavFor: "#product-imgs",
	});

	// Product imgs Slick
	$("#product-imgs").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		centerMode: true,
		focusOnSelect: true,
		centerPadding: 0,
		vertical: true,
		asNavFor: "#product-main-img",
		responsive: [
			{
				breakpoint: 991,
				settings: {
					vertical: false,
					arrows: false,
					dots: true,
				},
			},
		],
	});

	/////////////////////////////////////////
	$(".navbar__toggle-menu").click(function () {
		$(".navbar__menu").toggleClass("show");

		if ($(".navbar__menu").hasClass("show")) {
			$(".navbar__toggle-menu i").removeClass("fa-bars");
			$(".navbar__toggle-menu i").addClass("fa-times");
		} else {
			$(".navbar__toggle-menu i").removeClass("fa-times");
			$(".navbar__toggle-menu i").addClass("fa-bars");
		}
	});

	$(".navbar__toggle-dropdown").click(function () {
		$(".navbar__dropdown").toggleClass("show");

		if ($(".navbar__dropdown").hasClass("show")) {
			$(".navbar__toggle-dropdown").addClass("rotate");
		} else {
			$(".navbar__toggle-dropdown").removeClass("rotate");
		}
	});

})(jQuery);
