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

			if (window.innerWidth >= 768 && !targetElement.closest(".menu__item") && document.querySelectorAll(".menu__item.hover").length > 0) {
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
		if (targetElement.closest(".btn-menu") ) {
			document.querySelector(".btn-menu").classList.toggle("active");
			document.querySelector(".menu__body").classList.toggle("menu__body--active");
			console.log("23332");
		}
		if (targetElement.closest(".menu-footer__title ")|| targetElement.closest(".menu-footer__arrow ") ) {
			targetElement.closest(".menu-footer__column").classList.toggle("menu-footer__column--active");
			// document.querySelector(".menu__body").classList.toggle("menu__body--active");
			console.log("7777");
		}
	}
};

