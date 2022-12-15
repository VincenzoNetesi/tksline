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
	var nice_Select = $("header select");
	if (nice_Select.length) {
		nice_Select.niceSelect();
	}

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

	// Product img zoom
	var zoomMainProduct = document.getElementById("product-main-img");
	if (zoomMainProduct) {
		$("#product-main-img .product-preview").zoom();
	}

	/////////////////////////////////////////


})(jQuery);
