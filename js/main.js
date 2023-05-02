// проверко на мобильные устройства
isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
	},
};
window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth >= 320 && isMobile.any()) {
			if (targetElement.classList.contains("menu__arrow") || targetElement.classList.contains("menu__link")) {
				targetElement.closest(".menu__item").classList.toggle("hover");
			}

			if (
				window.innerWidth >= 768 &&
				!targetElement.closest(".menu__item") &&
				document.querySelectorAll(".menu__item.hover").length > 0
			) {
				document.querySelectorAll(".menu__item.hover").forEach((el) => {
					el.classList.remove("hover");
				});
			}
		}
		if (targetElement.classList.contains("search-form__icon")) {
			document.querySelector(".search-form").classList.toggle("active");
			console.log("11`1");
		}
		if (!targetElement.closest(".search-form") && document.querySelector(".search-form.active")) {
			document.querySelector(".search-form.active").classList.remove("active");
			console.log("222");
		}
		if (targetElement.closest(".btn-menu")) {
			document.querySelector(".btn-menu").classList.toggle("active");
			document.querySelector(".menu__body").classList.toggle("menu__body--active");
			document.body.classList.toggle("ovh");
			console.log("23332");
		}
		if (targetElement.closest(".menu-footer__title ") || targetElement.closest(".menu-footer__arrow ")) {
			document.querySelectorAll(".menu-footer__column").forEach((el) => {
				el.classList.remove("menu-footer__column--active");
			});

			targetElement.closest(".menu-footer__column").classList.add("menu-footer__column--active");
			// document.querySelector(".menu__body").classList.toggle("menu__body--active");
			console.log("7777");
		}
		if (targetElement.classList.contains("products__more")) {
			getproducts(targetElement);
			// console.log(targetElement);
			e.preventDefault();
		}
		if (targetElement.classList.contains("actions-product__button")) {
			// getproducts(targetElement);
			const producId = targetElement.closest(".item-product").dataset.pid;
			console.log(producId);
			e.preventDefault();
			addToCart(targetElement, producId);
		}
		if (targetElement.classList.contains("cart-header__icon") || targetElement.closest("cart-header__icon")) {
			if (document.querySelector(".cart-list").children.length > 0) {
				document.querySelector(".cart-header").classList.toggle("active");
			}
			e.preventDefault();
		}
		if (!targetElement.closest(".cart-header") && !targetElement.classList.contains("actions-product__button")) {
			document.querySelector(".cart-header").classList.remove("active");
		}
		if (targetElement.classList.contains("cart-list__delete")) {
			const productId = targetElement.closest(".cart-list__item").dataset.cartPid;
			updateCart(targetElement, productId, false);
			e.preventDefault();
		}
	}

	if (document.querySelector(".slider-main__body")) {
		var swiper = new Swiper(".swiper", {
			// !
			observer: true,
			observerParents: true,
			//! Смотреть ниже
			//! slidesPerView:2 ,
			// slidesPerView: 2,
			// slidesPerView: 4,
			// spaceBetween: 32,
			// watchOverflow: true,
			speed: 800,
			loop: true,
			loopAdditionalSlides: 5,
			preloadImages: false,
			parallax: true,

			// посередине
			// initialSlide: 1,

			// loopedSlides: 3,
			// cssMode:true,
			FollowFinger: true,
			longSwipesMs: 700,
			// mousewheel: {
			// 	//Чувствительность колеса мыши
			// 	sensitivity: 1,
			// 	//Класс обьекта на котором будет срабатывать прокрутка мышью
			// 	eventsTarget: ".swiper", // если у всех  такой класс то будет срабатывать везде
			// },

			breakpoints: {
				0: { slidesPerView: 1 },
				// 992: { slidesPerView: 1, spaceBetween: 32 },
				992: { slidesPerView: 3, spaceBetween: 32 },
			},
			watchOverflow: false,

			navigation: {
				// nextEl: ".swiper-button-next",

				nextEl: ".main-slider .slider-arrows__arrow--next",
				prevEl: ".main-slider .slider-arrows__arrow--prev",
			},
			pagination: {
				el: ".main-slider .controls-slider-main__dots",
				clickable: true,
			},
		});

		// swiper2.controller.control = swiper;
		// swiper.controller.control = swiper2;
	}

	// window.addEventListener("resize", (e) => {
	// 	const btn = document.querySelector(".content-main__btn");

	// 	if (window.innerWidth <= 991) {
	// 		console.log(btn);
	// 	}
	// });
	// !-----------------------
	async function getproducts(targetElement) {
		if (!targetElement.classList.contains("hold")) {
			targetElement.classList.add("hold");
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET",
			});
			if (response.ok) {
				let result = await response.json();
				loadproducts(result);
				// console.log(result);

				targetElement.classList.remove("hold");
				targetElement.remove();
			} else {
				alert("Ошибка");
			}
		}
	}

	// !-----------------------
	function loadproducts(data) {
		const productsitems = document.querySelector(".products__items");
		data.products.forEach((item) => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceOld;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productLabels = item.labels;

			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = "";
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = "";

				productLabels.forEach((labelItem) => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label--${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
				<a href="${productUrl}" class="item-product__image ibg">
					<img src="images/products/${productImage}" alt="${productTitle}">
				</a>
				`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

			let productTemplatePrices = "";
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class=" item-product__price--old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn-block">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link "><span class="icon-share"></span>Share</a>
				<a href="${productLikeUrl}" class="actions-product__link "><span class="icon-favorite"></span>Like</a>
			</div>
		</div>
	`;

			let productTemplateBody = "";
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;
			// console.log(productTemplateBody);

			let productTemplate = "";
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;
			// console.log(productTemplate);
			productsitems.insertAdjacentHTML("beforeend", productTemplate);
		});
	}
	// !-----------------------

	function addToCart(productButton, producId) {
		if (!productButton.classList.contains("hold")) {
			productButton.classList.add("hold");
			productButton.classList.add("fly");
			const cart = document.querySelector(".cart-header__icon");
			const product = document.querySelector(`[data-pid="${producId}"]`);
			const productImage = product.querySelector(".item-product__image");
			const productImageFly = productImage.cloneNode(true);
			const productImageFlyWidth = productImage.offsetWidth;
			const productImageFlyHeight = productImage.offsetHeight;
			const productImageFlyTop = productImage.getBoundingClientRect().top;
			const productImageFlyLeft = productImage.getBoundingClientRect().left;
			productImageFly.setAttribute("class", "flyImage ibg");
			productImageFly.style.cssText = `
		left:${productImageFlyLeft}px;
		top:${productImageFlyTop}px;
		width:${productImageFlyWidth}px;
		height:${productImageFlyHeight}px;
		`;
			document.body.append(productImageFly);
			const contFlyLeft = cart.getBoundingClientRect().left;
			const contFlyTop = cart.getBoundingClientRect().top;
			productImageFly.style.cssText = `
		left:${contFlyLeft + 20}px;
		top:${contFlyTop + 10}px;
		width:0px;
		height:0px;
		opacity: 0;
		`;
			productImageFly.addEventListener("transitionend", () => {
				if (productButton.classList.contains("fly")) {
					productImageFly.remove();
					productButton.classList.remove("fly");
					updateCart(productButton, producId);
				}
			});
		}
	}
	function updateCart(productButton, producId, productAdd = true) {
		const cart = document.querySelector(".cart-header");
		const cartIcon = cart.querySelector(".cart-header__icon");
		const cartQuantity = cartIcon.querySelector("span");
		const cartProduct = document.querySelector(`[data-cart-pid="${producId}"]`);
		const cartList = document.querySelector(".cart-list");
		// добавляем
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
				// cartQuantity.innerHTML  ++
			} else cartIcon.insertAdjacentHTML("beforeend", `<span>1</span>`);

			if (!cartProduct) {
				const product = document.querySelector(`[data-pid="${producId}"]`);
				console.log(product);

				const cartProductImage = product.querySelector(".item-product__image").innerHTML;
				const cartProductTitle = product.querySelector(".item-product__title").innerHTML;
				// const cartProductImage = document.querySelector(`[data-pid="${producId}"] .item-product__image`).innerHTML;
				// const cartProductTitle = document.querySelector(`[data-pid="${producId}"] .item-product__title`).innerHTML;
				const cartProductContent = `
			<a href="" class = "cart-list__image ibg">${cartProductImage}</a>
			<div class="cart-list__body" >
			<a href="" class="cart-list__title">${cartProductTitle}</a>
			<div class="cart-list__quantity">Quantity:<span>1</span> </div>
			<a href="" class="cart-list__delete">Delete</a>
			</div>`;
				cartList.insertAdjacentHTML(
					"beforeEnd",
					`<li data-cart-pid="${producId}" class="cart-list__item">${cartProductContent}</li>`
				);
			} else {
				const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
				cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
			}
				productButton.classList.remove("hold");
		}
		// удаляем
		else {
			const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartProduct.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cart.classList.remove("active");
			}
		}
	}
};
