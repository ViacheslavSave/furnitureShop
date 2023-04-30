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
	}
};
if (document.querySelector(".slider-main__body")) {
	var swiper = new Swiper(".swiper", {
		// !
		observer: true,
		observerParents: true,
		//! Смотреть ниже
		// slidesPerView:2 ,
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
			el: ".controls-slider-main__dots",
			clickable: true,
		},
	});

	// swiper2.controller.control = swiper;
	// swiper.controller.control = swiper2;
}

window.addEventListener("resize", (e) => {
	const btn = document.querySelector(".content-main__btn");

	if (window.innerWidth <= 991) {
		console.log(btn);
	}
});
